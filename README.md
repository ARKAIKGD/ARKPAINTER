# ARK Painter

A minimal drawing app inspired by CSP/SAI workflows, built with plain HTML, CSS, and JavaScript.

## Features

- Brush and eraser tools
- Brush presets: Hard Round, Soft Shade, Inker
- Stabilizer slider for smoother strokes
- Pressure sensitivity: supports pen/stylus pressure for size, opacity, or both (requires pressure-sensitive hardware)
- Touch input toggle: quickly enable or exclude touch controls while keeping mouse/pen input active
- Color picker
- Brush size and opacity controls
- Brush Settings popup for advanced brush tuning
- Min/Max brush size limits
- Min/Max brush opacity limits
- Start taper: gradually reduces brush size at the beginning of strokes for natural pointed starts (0-100%)
- End taper: gradually reduces brush size when stroke velocity decreases, creating natural tapered endings (0-100%)
- Speed size reduction: makes brush strokes smaller when drawing faster (0-100%)
- Layer controls: add, delete, show/hide, choose active layer
- Import image as layer (PNG/JPG): click Import Image button or drag-and-drop image files onto canvas
- Layer reorder controls: move active layer up/down or drag thumbnails to reorder
- Merge Down: merge active layer with the layer below
- Flatten All: merge all visible layers into a single layer
- Layer blend modes: Normal, Multiply, Screen
- Layer opacity per layer
- Clipping mask toggle (clip active layer to the layer below)
- Symmetry ruler: vertical, horizontal, or both axes
- Symmetry guide lines drawn directly on the canvas viewport
- Layer thumbnail strip for quick layer selection
- Auto-save and auto-load document state via browser localStorage
- Save project as JSON and load project JSON files manually
- New Canvas button to reset the document and start clean
- Zoom controls: button zoom, wheel zoom, reset view
- Pan controls: hold `Space` and drag (or middle mouse drag)
- Undo and redo (document-level, includes layers)
- Clear active layer
- Export to PNG
- Keyboard shortcuts:
  - `B` = brush
  - `E` = eraser
  - `Space + drag` = pan
  - `[` and `]` = decrease/increase brush size
  - `Ctrl+Z` = undo
  - `Ctrl+Y` or `Ctrl+Shift+Z` = redo
  - `Ctrl+S` = save project as JSON
  - `Ctrl+O` = load project from JSON

## Run

Open `index.html` in your browser.

The app auto-loads your last session in the same browser profile.

If you want local serving from PowerShell:

```powershell
cd "c:\Users\joshu\Documents\Coding Stuff\ARKPAINTER"
python -m http.server 8080
```

Then visit `http://localhost:8080`.
