# I.S Design + Build Website

Website files exported from Sites version 21 (source commit `2007b23d309062917fbc7c025c13a09deb9a8e13`).

## Contents

- `dist/`: website HTML, CSS, JavaScript, images, video, and documents.
- `prepare.py`: original static-site preparation script.
- `.openai/hosting.json`: original Sites hosting configuration.

## Local preview

From the repository root, run:

```sh
python3 -m http.server 8000 --directory dist
```

Then open http://localhost:8000.

This is a static website export. Any forms or services that call external endpoints still depend on those services.
