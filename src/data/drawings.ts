// Illustrative architectural drawings for the pinned "plan" scene on service pages.
// Each drawing has a base that is sketched when the section arrives, and one part
// per point on the page. As a point becomes active its part is drawn and shown in
// orange. All coordinates are in an 800 x 520 sheet.
//
// Classes: w wall · f fitting · f2 heavy fitting · t hatch or fine line · d dimension
// x dashed line · xo orange dashed line · l label · dt orange label.
// A group with class "out" is existing work that is drawn with the base and removed
// when its part is reached (for example, a wall opened up).
// Paths with pathLength are drawn on; text and dashed lines fade in.

export interface Drawing {
  /** Name in the sheet caption. */
  name: string;
  /** What the drawing shows, for screen readers. */
  alt: string;
  base: string;
  parts: string[];
  /** Extra <defs> content, such as clip paths. */
  defs?: string;
}

const r = (v: number) => Math.round(v * 10) / 10;
const box = (x1: number, y1: number, x2: number, y2: number) => `M${x1} ${y1}H${x2}V${y2}H${x1}z`;
const ring = (cx: number, cy: number, rx: number, ry = rx) => `M${r(cx - rx)} ${cy}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0`;
const draw = (d: string, k = 'f') => `<path class="${k}" d="${d}" pathLength="1"/>`;
const dash = (d: string, k = 'x') => `<path class="${k}" d="${d}"/>`;
const text = (x: number, y: number, s: string, k = 'l', anchor = 'middle', rotate = 0) =>
  `<text class="${k}" x="${x}" y="${y}" text-anchor="${anchor}"${rotate ? ` transform="rotate(${rotate} ${x} ${y})"` : ''}>${s}</text>`;
const dimH = (x1: number, x2: number, y: number, s: string) =>
  draw(`M${x1} ${y}H${x2}M${x1} ${y - 7}v14M${x2} ${y - 7}v14`, 'd') + text((x1 + x2) / 2, y - 7, s, 'dt');
const dimV = (y1: number, y2: number, x: number, s: string) =>
  draw(`M${x} ${y1}V${y2}M${x - 7} ${y1}h14M${x - 7} ${y2}h14`, 'd') + text(x - 7, (y1 + y2) / 2, s, 'dt', 'middle', -90);

/** 45° hatch lines clipped to a rectangle, as one path. */
const hatch = (x1: number, y1: number, x2: number, y2: number, gap = 14) => {
  let d = '';
  for (let k = x1 + y1 + gap; k < x2 + y2; k += gap) {
    const a = Math.max(x1, k - y2);
    const b = Math.min(x2, k - y1);
    if (b - a > 1) d += `M${r(a)} ${r(k - a)}L${r(b)} ${r(k - b)}`;
  }
  return d;
};
/** Parallel lines across a rectangle: 'h' horizontal or 'b' the other diagonal. Clip to a shape with clip-path. */
const fill = (x1: number, y1: number, x2: number, y2: number, gap: number, dir: 'h' | 'b') => {
  let d = '';
  if (dir === 'h') for (let y = y1 + gap / 2; y < y2; y += gap) d += `M${x1} ${r(y)}H${x2}`;
  else for (let k = x1 - y2 + gap; k < x2 - y1; k += gap) d += `M${r(Math.max(x1, k + y1))} ${r(Math.max(x1, k + y1) - k)}L${r(Math.min(x2, k + y2))} ${r(Math.min(x2, k + y2) - k)}`;
  return d;
};
/** A smooth curve through points (Catmull-Rom as cubic Béziers). */
const smooth = (p: [number, number][]) => {
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const [x0, y0] = p[Math.max(0, i - 1)];
    const [x1, y1] = p[i];
    const [x2, y2] = p[i + 1];
    const [x3, y3] = p[Math.min(p.length - 1, i + 2)];
    d += `C${r(x1 + (x2 - x0) / 6)} ${r(y1 + (y2 - y0) / 6)} ${r(x2 - (x3 - x1) / 6)} ${r(y2 - (y3 - y1) / 6)} ${x2} ${y2}`;
  }
  return d;
};
/** A stair in section: n risers from (x, y), each rise high and run wide. */
const stair = (x: number, y: number, n: number, rise: number, run: number) => `M${x} ${y}` + `v${-rise}h${run}`.repeat(n);

// ---------- Kitchen: plan ----------
const kitchen: Drawing = {
  name: 'Kitchen plan',
  alt: 'Plan of a kitchen that develops point by point: the layout, the cabinetry, the surfaces, then the lighting and fixtures.',
  base:
    draw('M250 70H90V450H440M520 450H710V350M710 250V70H470', 'w') +
    draw('M250 64H470M250 76H470') +
    draw('M520 450V370M520 370A80 80 0 0 0 440 450') +
    draw('M704 250h12M704 350h12') +
    text(612, 414, 'Kitchen') +
    text(758, 304, 'Dining'),
  parts: [
    // Layout: island position, seating, work triangle, the way through the room, overall size.
    draw(box(280, 235, 520, 315), 'f2') +
    draw(ring(315, 341, 13) + ring(375, 341, 13) + ring(435, 341, 13) + ring(495, 341, 13)) +
    dash('M360 106L128 270L664 118Z', 'xo') +
    text(388, 186, 'Work triangle', 'dt') +
    dash('M480 432C480 372 560 336 652 304', 'x') +
    draw('M638 296L654 303L642 316') +
    dimH(90, 710, 34, `15'-6"`) +
    dimV(70, 450, 50, `9'-6"`),
    // Cabinetry and storage: base runs, the tall unit and the island's storage side.
    draw(box(96, 76, 610, 140) + 'M168 76V140M240 76V140M312 76V140M408 76V140M480 76V140M552 76V140') +
    draw(box(616, 76, 704, 152)) +
    draw(box(96, 146, 160, 380) + 'M96 196H160M96 232H160M96 308H160M96 344H160') +
    draw('M280 262H520M340 235V262M400 235V262M460 235V262'),
    // Surfaces: counter edges, the island top and the floor.
    draw('M96 147H610M167 146V380', 'f') +
    draw(hatch(280, 235, 520, 315, 15), 't') +
    draw('M180 392H430M180 420H430M180 364H262', 't'),
    // Lighting and fixtures: sink, range, refrigerator, pendants and downlights.
    draw(box(318, 84, 356, 124) + box(362, 84, 400, 124) + ring(359, 80, 4)) +
    draw(box(102, 236, 154, 304) + ring(116, 252, 9) + ring(140, 252, 9) + ring(116, 288, 9) + ring(140, 288, 9)) +
    text(660, 125, 'Ref', 'l') +
    draw(ring(340, 275, 9) + ring(400, 275, 9) + ring(460, 275, 9) + 'M331 275h18M340 266v18M391 275h18M400 266v18M451 275h18M460 266v18') +
    dash(ring(340, 275, 30) + ring(400, 275, 30) + ring(460, 275, 30), 'xo') +
    draw(ring(236, 196, 5) + ring(600, 210, 5) + ring(236, 400, 5) + ring(640, 400, 5)),
  ],
};

// ---------- Bathroom: plan ----------
const bathroom: Drawing = {
  name: 'Bathroom plan',
  alt: 'Plan of a bathroom that develops point by point: the layout, the shower and bath, storage and lighting, then the services behind the walls.',
  base:
    draw('M650 190V70H150V450H230M310 450H650V310', 'w') +
    draw('M644 190V310M656 190V310') +
    text(470, 300, 'Bath'),
  parts: [
    // Layout: door swing, the toilet's position and clearances, overall size.
    draw('M310 450V370M310 370A80 80 0 0 0 230 450', 'f2') +
    draw(box(156, 290, 184, 350) + ring(214, 320, 30, 21)) +
    dash('M214 278V362', 'xo') +
    dimH(150, 214, 392, '15"') +
    dimH(150, 650, 36, `12'-6"`) +
    dimV(70, 450, 110, `9'-0"`),
    // Shower and bath: glass, drain and bench; a freestanding tub.
    draw('M330 76V200', 'f2') +
    draw(box(156, 76, 190, 230) + ring(250, 153, 8) + 'M242 153h16M250 145v16M330 200L306 222') +
    draw('M400 80H600a20 20 0 0 1 20 20V160a20 20 0 0 1 -20 20H400a20 20 0 0 1 -20 -20V100a20 20 0 0 1 20 -20z') +
    draw('M424 94H576a30 30 0 0 1 30 30V136a30 30 0 0 1 -30 30H424a30 30 0 0 1 -30 -30V124a30 30 0 0 1 30 -30z' + ring(424, 130, 6)),
    // Storage and lighting: double vanity, linen cabinet, ceiling lights.
    draw(box(340, 384, 600, 444) + ring(410, 412, 34, 20) + ring(530, 412, 34, 20) + ring(410, 438, 4) + ring(530, 438, 4)) +
    draw(box(606, 318, 644, 444) + 'M606 318L644 444') +
    draw(ring(300, 262, 7) + ring(480, 246, 7) + 'M293 262h14M300 255v14M473 246h14M480 239v14') +
    dash(ring(300, 262, 38) + ring(480, 246, 38), 'xo'),
    // Behind the walls: supply runs, extraction and waterproofing in the shower.
    dash('M158 400V152M646 446H360M340 75H600', 'xo') +
    draw(box(404, 196, 434, 226) + 'M404 196L434 226M434 196L404 226') +
    text(396, 215, 'Extract', 'dt', 'end') +
    draw(hatch(196, 77, 328, 89, 8), 't') +
    text(266, 116, 'Waterproofing', 'dt'),
  ],
};

// ---------- Whole home: section through a rowhouse ----------
const flights = stair(300, 400, 8, 13.75, 10) + stair(380, 290, 8, 13.75, -10) + stair(380, 490, 8, 11.25, -10);
const floorTicks = (y: number) => {
  let d = '';
  for (let x = 150; x < 656; x += 12) d += `M${x} ${y - 2}v-6`;
  return d;
};
const wholeHome: Drawing = {
  name: 'House section',
  alt: 'Section through a three-storey house that develops point by point: the layout, structure and systems, materials, then the order of work.',
  base:
    draw('M140 490V70M660 490V70', 'w') +
    draw('M140 70H660M140 180H660M140 290H660M140 400H660M140 490H660', 'w') +
    draw('M40 410H140M660 410H760') +
    draw(box(124, 50, 152, 62) + 'M140 62V70') +
    draw(box(134, 100, 146, 152) + box(134, 210, 146, 262) + box(134, 320, 146, 372) + box(654, 100, 666, 152) + box(654, 210, 666, 262) + box(654, 320, 666, 372)),
  parts: [
    // Layout: partitions, stairs and rooms.
    draw('M430 400V352M400 290V250M400 214V180M460 180V140M460 104V70M520 490V420', 'f2') +
    draw(flights) +
    text(222, 378, 'Living') + text(560, 378, 'Kitchen') + text(250, 268, 'Bedroom') + text(530, 268, 'Bath') +
    text(250, 158, 'Study') + text(570, 158, 'Bedroom') + text(230, 462, 'Lower level'),
    // Structure and systems: a beam, the duct riser and branches, the soil stack, heating plant.
    draw('M418 402h34M418 416h34M435 402v14', 'f2') +
    dash('M615 486V80M615 186H520M615 296H520M615 406H540', 'xo') +
    dash('M500 486V54', 'x') +
    draw(box(560, 440, 640, 486)) +
    text(600, 468, 'HVAC', 'dt'),
    // Materials: one floor finish carried through every level, tile in the bath, the roof membrane.
    draw(floorTicks(180) + floorTicks(290) + floorTicks(400), 't') +
    draw('M406 270H652M406 254H652M430 254V290M460 254V290M490 254V290M520 254V290M550 254V290M580 254V290M610 254V290M640 254V290', 't') +
    draw('M140 64H660', 't'),
    // Sequence: the order the work is done in.
    draw(ring(460, 452, 16) + ring(250, 336, 16) + ring(470, 222, 16) + ring(250, 118, 16), 'f2') +
    text(460, 457, '1', 'dt') + text(250, 341, '2', 'dt') + text(470, 227, '3', 'dt') + text(250, 123, '4', 'dt') +
    dash('M444 450C360 446 250 412 250 352M266 332C360 326 470 286 470 238M454 218C360 212 250 178 250 134', 'xo'),
  ],
};

// ---------- Addition: site plan ----------
const addition: Drawing = {
  name: 'Site plan',
  alt: 'Site plan of a rowhouse that develops point by point: the new space, what the lot allows, then how old and new connect.',
  base:
    draw('M40 492H760') +
    draw('M40 470H760', 't') +
    draw('M40 260H200M600 290H760M40 450H200M600 450H760', 't') +
    draw('M330 270H200V450H600V270H470', 'w') +
    draw(box(380, 450, 420, 462)) +
    text(400, 372, 'Existing home') + text(400, 512, 'Street') + text(120, 360, 'Neighbor', 'l') + text(680, 376, 'Neighbor', 'l'),
  parts: [
    // Purpose: the new room and what it is for.
    draw('M240 270V140H560V270', 'w') +
    draw(box(280, 160, 400, 196) + 'M292 160V196M388 160V196' + ring(476, 206, 26) + box(290, 135, 350, 145) + box(450, 135, 510, 145)) +
    text(400, 246, 'New space'),
    // Feasibility: lot lines, setbacks, the tree to protect.
    dash('M200 470V40H600V470', 'x') +
    dimV(40, 140, 636, `20'-0"`) +
    dimH(200, 240, 108, `5'`) + dimH(560, 600, 108, `5'`) +
    draw(ring(300, 84, 30) + ring(300, 84, 5)) +
    text(400, 30, 'Lot line', 'l'),
    // Connection: the rear wall opens, a beam carries it, and the rooms join.
    `<g class="out">${draw('M330 270H470', 'w')}</g>` +
    dash('M330 270H470', 'xo') +
    draw('M400 340V266M390 278L400 264L410 278', 'f2') +
    text(486, 300, 'New opening', 'dt', 'start'),
  ],
};

// ---------- Roofing: house elevation ----------
const course = (() => {
  let d = '';
  for (let y = 110; y <= 262; y += 16) {
    const a = 150 + (278 - y) / 0.784;
    const b = 650 - (278 - y) / 0.784;
    if (b - a > 20) d += `M${r(a + 6)} ${y}H${r(b - 6)}`;
  }
  return d;
})();
const roofing: Drawing = {
  name: 'House elevation',
  alt: 'Elevation of a house and its roof that develops point by point: a repair, a full replacement, then the path of a leak.',
  base:
    draw('M60 470H740') +
    draw('M190 470V250M610 470V250M190 250H610', 'w') +
    draw('M150 278L400 82L650 278', 'w') +
    draw('M150 278v10M650 278v10M500 160V112H540V192') +
    draw(box(250, 310, 330, 400) + 'M290 310V400M250 355H330' + box(470, 310, 550, 400) + 'M510 310V400M470 355H550' + box(372, 380, 428, 470)),
  parts: [
    // Roof repairs: a detail at one problem area.
    draw(ring(290, 168, 34), 'f2') +
    draw('M266 144L232 110H170M276 180L304 158M282 190L312 166M268 168L292 150') +
    text(170, 102, 'Detail A', 'dt', 'start'),
    // Roof replacement: new courses across the whole roof.
    draw(course, 't') +
    draw('M168 278L400 96L632 278') +
    draw('M390 82h20'),
    // Water damage: where water travels and where it shows inside.
    dash('M560 210V248', 'xo') +
    dash(ring(560, 262, 30, 8), 'xo') +
    draw('M560 282q7 10 0 14q-7 -4 0 -14zM560 312q7 10 0 14q-7 -4 0 -14z') +
    text(584, 300, 'Water path', 'dt', 'start'),
  ],
};

// ---------- Service areas: map ----------
const river: [number, number][] = [[30, 76], [160, 130], [250, 190], [318, 236], [380, 300], [452, 368], [480, 440], [492, 520]];
const bank = (dx: number, dy: number) => smooth(river.map(([x, y]) => [x + dx, y + dy] as [number, number]));
const riverPath = smooth(river);
const dcPath = `M440 120L572 252L452 368` + smooth([[452, 368], [380, 300], [318, 236]]).replace(/^M[^C]+/, '') + 'L440 120Z';
// Maryland: everything north and east of the Potomac except DC itself.
const moPath = smooth([[30, 76], [160, 130], [250, 190], [318, 236]]) + 'L440 120L572 252L452 368' + smooth([[452, 368], [480, 440], [492, 520]]).replace(/^M[^C]+/, '') + 'L800 520L800 0L30 0Z';
const vaPath = riverPath + 'L30 520Z';
const map: Drawing = {
  name: 'Area map',
  alt: 'Illustrative map of the Washington, DC area that develops point by point: Washington, DC, Maryland, then Northern Virginia.',
  defs: `<clipPath id="dw-dc"><path d="${dcPath}"/></clipPath><clipPath id="dw-mo"><path d="${moPath}"/></clipPath><clipPath id="dw-va"><path d="${vaPath}"/></clipPath>`,
  base:
    draw(bank(-5, 4) + bank(5, -4)) +
    draw('M720 92V44M710 58L720 42L730 58') +
    text(720, 110, 'N', 'dt'),
  parts: [
    // Washington, DC, with the office in Georgetown.
    draw(dcPath, 'f2') +
    `<g clip-path="url(#dw-dc)">${draw(hatch(300, 110, 580, 380, 16), 't')}</g>` +
    draw(ring(352, 252, 7), 'f2') + draw(ring(352, 252, 2)) +
    text(486, 258, 'Washington, DC') +
    text(366, 248, 'Office', 'dt', 'start'),
    // Maryland, north and east of DC.
    draw(moPath, 'f2') +
    `<g clip-path="url(#dw-mo)">${draw(fill(30, 0, 800, 520, 14, 'h'), 't')}</g>` +
    text(560, 120, 'Maryland'),
    // Northern Virginia, across the Potomac.
    draw(riverPath, 'f2') +
    `<g clip-path="url(#dw-va)">${draw(fill(20, 60, 500, 520, 16, 'b'), 't')}</g>` +
    text(200, 400, 'Northern Virginia'),
  ],
};

// ---------- Lead paint: rowhouse facade ----------
const windows = [box(280, 120, 340, 200), box(460, 120, 520, 200), box(280, 230, 340, 320), box(460, 230, 520, 320), box(280, 350, 340, 440)];
const leadPaint: Drawing = {
  name: 'Facade',
  alt: 'Front of a pre-1978 rowhouse that develops point by point: the age of the home, the painted surfaces affected by the work, then a contained work area.',
  base:
    draw('M60 470H740') +
    draw('M240 470V90H560V470', 'w') +
    draw(box(226, 72, 574, 90) + 'M260 90v14M330 90v14M400 90v14M470 90v14M540 90v14') +
    draw(windows.join('') + 'M280 160H340M460 160H520M280 275H340M460 275H520M280 395H340' + box(440, 360, 500, 470) + box(440, 340, 500, 356) + 'M420 470V458H520V470') +
    draw('M60 470V112H236M564 104H740V470', 't'),
  parts: [
    // The home: its age decides the precautions.
    `<g class="dw-stamp" transform="translate(400 210) rotate(-8)"><rect x="-104" y="-30" width="208" height="60"/>${text(0, 0, 'PRE-1978', 'st')}${text(0, 18, 'PLAN FOR LEAD', 'st2')}</g>`,
    // The work: trim, sills and doors, where old paint is disturbed.
    draw(box(274, 114, 346, 206) + box(454, 114, 526, 206) + box(274, 224, 346, 326) + box(454, 224, 526, 326) + box(274, 344, 346, 446) + box(434, 334, 506, 470), 'f2') +
    draw('M290 214l4 4l4 -4l4 4M470 214l4 4l4 -4l4 4M300 334l4 4l4 -4l4 4', 't'),
    // The household: the work area is sealed off from the rest of the home.
    dash(box(252, 334, 548, 466), 'xo') +
    draw('M262 334V466M538 334V466', 't') +
    text(400, 494, 'Contained work area', 'dt'),
  ],
};

export const drawings: Record<string, Drawing> = { kitchen, bathroom, 'whole-home': wholeHome, addition, roofing, map, 'lead-paint': leadPaint };
