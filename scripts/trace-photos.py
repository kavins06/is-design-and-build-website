"""Trace the strongest straight edges of each page-top photograph as a line drawing.

Every page opens the way the home page does: an architectural drawing is drafted
first and the photograph is then revealed under it. Because the lines come from
the photograph itself, they sit exactly on the room once it appears.

Usage (needs Python 3 with opencv-python-headless and numpy):
    python3 scripts/trace-photos.py            # writes src/data/traces.json
    python3 scripts/trace-photos.py --preview DIR   # also writes PNG previews

Run it again whenever a page-top photograph is added or replaced. Pages whose
photograph has no trace still work: they simply open without the drawing.
"""
import json, math, sys
from pathlib import Path
import cv2
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / 'src' / 'assets'
OUT = ROOT / 'src' / 'data' / 'traces.json'

# Photographs used at the top of a page, with optional tuning.
#   keep: number of strokes; min: shortest stroke as a fraction of the diagonal;
#   circles: round shapes to add, as (centre x, centre y, radius x, radius y) in photo pixels.
#   Candidates can be listed with cv2.HoughCircles; straight edges are found automatically.
PHOTOS = {
    'photos/kitchen-b': {'keep': 70, 'min': 0.06},
    'photos/kitchen-c': {},
    'photos/kitchen-d': {'keep': 70},
    'photos/kitchen-e': {'keep': 70},
    'photos/kitchen-f': {'keep': 70},
    'photos/bath-a': {'circles': [(758, 553, 317, 297), (1300, 605, 203, 238)]},
    'photos/bath-c': {'keep': 60},
    'photos/bath-d': {'keep': 60},
    'photos/living-a': {},
    'photos/bed-a': {},
    'photos/exterior-a': {'keep': 80},
    'photos/roof-a': {'keep': 55, 'min': 0.07},
    'photos/roof-b': {'keep': 60, 'min': 0.07},
    'photos/roof-c': {'keep': 70, 'min': 0.06},
    'stock/town-05': {'keep': 60},
}

WORK_W = 1600  # detection width in pixels


def merge(segments, w):
    """Join collinear pieces of the same edge into one long stroke."""
    ang_tol = math.radians(1.6)
    off_tol = w * 0.004
    gap_tol = w * 0.03
    groups = []
    for L, x1, y1, x2, y2 in sorted(segments, reverse=True):
        a = math.atan2(y2 - y1, x2 - x1) % math.pi
        for g in groups:
            da = abs(((g['a'] - a) + math.pi / 2) % math.pi - math.pi / 2)
            if da > ang_tol:
                continue
            ux, uy = math.cos(g['a']), math.sin(g['a'])
            nx, ny = -uy, ux
            r1, r2 = nx * x1 + ny * y1, nx * x2 + ny * y2
            if abs(r1 - g['r']) > off_tol or abs(r2 - g['r']) > off_tol:
                continue
            t1, t2 = sorted((ux * x1 + uy * y1, ux * x2 + uy * y2))
            if t1 > g['t2'] + gap_tol or t2 < g['t1'] - gap_tol:
                continue
            g['t1'], g['t2'] = min(g['t1'], t1), max(g['t2'], t2)
            break
        else:
            ux, uy = math.cos(a), math.sin(a)
            nx, ny = -uy, ux
            t1, t2 = sorted((ux * x1 + uy * y1, ux * x2 + uy * y2))
            groups.append({'a': a, 'r': nx * x1 + ny * y1, 't1': t1, 't2': t2})
    out = []
    for g in groups:
        ux, uy = math.cos(g['a']), math.sin(g['a'])
        nx, ny = -uy, ux
        p = lambda t: (nx * g['r'] + ux * t, ny * g['r'] + uy * t)
        (ax, ay), (bx, by) = p(g['t1']), p(g['t2'])
        out.append((g['t2'] - g['t1'], ax, ay, bx, by))
    return out


def trace(name, keep=90, min_frac=0.05, circles=()):
    img = cv2.imread(str(ASSETS / f'{name}.jpg'))
    h0, w0 = img.shape[:2]
    s = WORK_W / w0
    small = cv2.resize(img, (WORK_W, round(h0 * s)), interpolation=cv2.INTER_AREA)
    gray = cv2.GaussianBlur(cv2.cvtColor(small, cv2.COLOR_BGR2GRAY), (3, 3), 0)
    lines = cv2.createLineSegmentDetector(cv2.LSD_REFINE_STD).detect(gray)[0]
    segs = []
    for x1, y1, x2, y2 in ([] if lines is None else lines.reshape(-1, 4)):
        segs.append((math.hypot(x2 - x1, y2 - y1), x1 / s, y1 / s, x2 / s, y2 / s))
    merged = merge(segs, w0)
    diag = math.hypot(w0, h0)
    merged = [m for m in merged if m[0] >= diag * min_frac]
    merged.sort(reverse=True)
    merged = merged[:keep]
    # A small overshoot at each end reads as hand drafting rather than a broken edge.
    over = w0 * 0.006
    strokes = []
    for L, ax, ay, bx, by in merged:
        ux, uy = (bx - ax) / L, (by - ay) / L
        ax, ay, bx, by = ax - ux * over, ay - uy * over, bx + ux * over, by + uy * over
        strokes.append(f'M{ax:.0f} {ay:.0f}L{bx:.0f} {by:.0f}')
    for cx, cy, rx, ry in circles:
        # Two arcs, so an ellipse draws like the straight strokes. Drawn early: it is a main feature.
        strokes.insert(min(len(strokes), 6),
                       f'M{cx - rx:.0f} {cy:.0f}a{rx:.0f} {ry:.0f} 0 1 0 {2 * rx:.0f} 0a{rx:.0f} {ry:.0f} 0 1 0 {-2 * rx:.0f} 0')
    return {'w': w0, 'h': h0, 'd': strokes}


def preview(name, data, out_dir):
    img = cv2.imread(str(ASSETS / f'{name}.jpg'))
    h, w = img.shape[:2]
    canvas = np.full_like(img, 12)
    over = (img * 0.4).astype(np.uint8)
    t = max(2, w // 800)
    for d in data['d']:
        nums = [float(v) for v in d.replace('M', ' ').replace('L', ' ').replace('a', ' ').split()[:4]]
        if 'a' in d:
            x0, cy, rx, ry = nums
            for target, col in ((canvas, (255, 255, 255)), (over, (24, 84, 255))):
                cv2.ellipse(target, (int(x0 + rx), int(cy)), (int(rx), int(ry)), 0, 0, 360, col, t, cv2.LINE_AA)
            continue
        p1, p2 = (int(nums[0]), int(nums[1])), (int(nums[2]), int(nums[3]))
        cv2.line(canvas, p1, p2, (255, 255, 255), t, cv2.LINE_AA)
        cv2.line(over, p1, p2, (24, 84, 255), t, cv2.LINE_AA)
    both = np.hstack([canvas, over])
    width = 1400
    both = cv2.resize(both, (width, round(width * h / (2 * w))), interpolation=cv2.INTER_AREA)
    cv2.imwrite(str(Path(out_dir) / (name.replace('/', '_') + '.png')), both)


if __name__ == '__main__':
    preview_dir = sys.argv[sys.argv.index('--preview') + 1] if '--preview' in sys.argv else None
    result = {}
    for name, opts in PHOTOS.items():
        data = trace(name, keep=opts.get('keep', 90), min_frac=opts.get('min', 0.05), circles=opts.get('circles', ()))
        result[name] = data
        if preview_dir:
            preview(name, data, preview_dir)
        print(f'{name}: {len(data["d"])} strokes')
    OUT.write_text(json.dumps(result, separators=(',', ':')) + '\n')
    print(f'wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB)')
