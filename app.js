// ARK Painter - Build 2026-03-07-15:20
console.log("=== ARK PAINTER LOADING ===");
console.log("DOM readyState:", document.readyState);

const canvas = document.getElementById("paint-canvas");
console.log("Canvas element:", canvas);

if (!canvas) {
  alert("CRITICAL ERROR: Canvas element not found! The page did not load correctly.");
  throw new Error("Canvas element 'paint-canvas' not found in DOM");
}

const viewCtx = canvas.getContext("2d", { alpha: true });
const guideCanvas = document.getElementById("guide-canvas");
console.log("GuideCanvas element:", guideCanvas);

if (!guideCanvas) {
  alert("CRITICAL ERROR: Guide canvas element not found!");
  throw new Error("Canvas element 'guide-canvas' not found in DOM");
}

const guideCtx = guideCanvas.getContext("2d", { alpha: true });
const stage = document.getElementById("canvas-stage");
const viewport = document.getElementById("canvas-viewport");
const layerThumbnails = document.getElementById("layer-thumbnails");
const colorHistoryContainer = document.getElementById("color-history");
console.log("Color history container:", colorHistoryContainer);

console.log("Stage:", stage, "Viewport:", viewport, "Thumbnails:", layerThumbnails);

const brushButton = document.getElementById("tool-brush");
const eraserButton = document.getElementById("tool-eraser");
const transformButton = document.getElementById("tool-transform");
const fillButton = document.getElementById("tool-fill");
const blurButton = document.getElementById("tool-blur");
const colorPicker = document.getElementById("color-picker");
console.log("Color picker element:", colorPicker);
const presetSelect = document.getElementById("brush-preset");
const sizeInput = document.getElementById("brush-size");
const sizeValue = document.getElementById("brush-size-value");
const opacityInput = document.getElementById("brush-opacity");
const opacityValue = document.getElementById("brush-opacity-value");
const startTaperInput = document.getElementById("start-taper");
const startTaperValue = document.getElementById("start-taper-value");
const endTaperInput = document.getElementById("end-taper");
const endTaperValue = document.getElementById("end-taper-value");
const speedSizeReductionInput = document.getElementById("speed-size-reduction");
const speedSizeReductionValue = document.getElementById("speed-size-reduction-value");
const spacingInput = document.getElementById("spacing");
const spacingValue = document.getElementById("spacing-value");
const jitterInput = document.getElementById("jitter");
const jitterValue = document.getElementById("jitter-value");
const interpolationInput = document.getElementById("interpolation");
const interpolationValue = document.getElementById("interpolation-value");
const stabilizerInput = document.getElementById("stabilizer");
const stabilizerValue = document.getElementById("stabilizer-value");
const openBrushSettingsButton = document.getElementById("open-brush-settings");
const closeBrushSettingsButton = document.getElementById("close-brush-settings");
const brushSettingsModal = document.getElementById("brush-settings-modal");
console.log("BrushSettings elements - Button:", openBrushSettingsButton, "Modal:", brushSettingsModal);

const brushMinSizeInput = document.getElementById("brush-min-size");
const brushMinSizeValue = document.getElementById("brush-min-size-value");
const brushMaxSizeInput = document.getElementById("brush-max-size");
const brushMaxSizeValue = document.getElementById("brush-max-size-value");
const brushMinOpacityInput = document.getElementById("brush-min-opacity");
const brushMinOpacityValue = document.getElementById("brush-min-opacity-value");
const brushMaxOpacityInput = document.getElementById("brush-max-opacity");
const brushMaxOpacityValue = document.getElementById("brush-max-opacity-value");
const symmetrySelect = document.getElementById("symmetry-mode");
const pressureModeSelect = document.getElementById("pressure-mode");
const touchToggleButton = document.getElementById("touch-toggle");
const smoothOpacityToggleButton = document.getElementById("smooth-opacity-toggle");
const layerSelect = document.getElementById("active-layer");
const addLayerButton = document.getElementById("add-layer");
const importImageButton = document.getElementById("import-image");
const importImageInput = document.getElementById("import-image-input");
const layerUpButton = document.getElementById("layer-up");
const layerDownButton = document.getElementById("layer-down");
const toggleLayerButton = document.getElementById("toggle-layer");
const deleteLayerButton = document.getElementById("delete-layer");
const mergeDownButton = document.getElementById("merge-down");
const flattenAllButton = document.getElementById("flatten-all");
const layerBlendModeSelect = document.getElementById("layer-blend-mode");
const layerOpacityInput = document.getElementById("layer-opacity");
const layerOpacityValue = document.getElementById("layer-opacity-value");
const layerClipButton = document.getElementById("layer-clip");
const zoomInButton = document.getElementById("zoom-in");
const zoomOutButton = document.getElementById("zoom-out");
const zoomResetButton = document.getElementById("zoom-reset");
const zoomValue = document.getElementById("zoom-value");
const flipToggleButton = document.getElementById("flip-toggle");
const flipVerticalToggleButton = document.getElementById("flip-vertical-toggle");
const previewToggleButton = document.getElementById("preview-toggle");
const previewModal = document.getElementById("preview-modal");
const previewWindow = document.getElementById("preview-window");
const previewHeader = document.getElementById("preview-header");
const previewCanvas = document.getElementById("preview-canvas");
const closePreviewButton = document.getElementById("close-preview");
const viewWindowModal = document.getElementById("view-window-modal");
const viewWindow = document.getElementById("view-window");
const viewHeader = document.getElementById("view-header");
const minimizeViewButton = document.getElementById("minimize-view");
const newProjectButton = document.getElementById("new-project");
const saveProjectButton = document.getElementById("save-project");
const quickSaveProjectButton = document.getElementById("quick-save-project");
const loadProjectButton = document.getElementById("load-project");
const loadProjectInput = document.getElementById("load-project-input");
const undoButton = document.getElementById("undo");
const redoButton = document.getElementById("redo");
const clearButton = document.getElementById("clear");
const saveButton = document.getElementById("save");
const toggleToolbarButton = document.getElementById("toggle-toolbar");
const toggleLayersButton = document.getElementById("toggle-layers");
const toggleToolsButton = document.getElementById("toggle-tools");
const hardRefreshButton = document.getElementById("hard-refresh");
const fullscreenToggleButton = document.getElementById("fullscreen-toggle");
const quickToolBrushButton = document.getElementById("quick-tool-brush");
const quickToolEraserButton = document.getElementById("quick-tool-eraser");
const quickUndoButton = document.getElementById("quick-undo");
const quickRedoButton = document.getElementById("quick-redo");
const quickSize1Button = document.getElementById("quick-size-1");
const quickSize12Button = document.getElementById("quick-size-12");
const quickSize24Button = document.getElementById("quick-size-24");
const quickSize48Button = document.getElementById("quick-size-48");
const saveStatusElement = document.getElementById("save-status");
const toolbar = document.querySelector(".toolbar");
const layerPanel = document.querySelector(".layer-panel");
const toolsPanel = document.querySelector(".tools-panel");
const statusText = document.getElementById("status-text");

// ========== DIAGNOSTIC LOGGER ==========
const diagnosticLog = [];
let diagnosticOverlay = null;
let diagnosticLogDiv = null;
let pointerEventCount = 0;
let drawingAttempts = 0;

function logDiagnostic(message, isError = false) {
  const timestamp = new Date().toLocaleTimeString();
  const logEntry = "[" + timestamp + "] " + message;
  diagnosticLog.push(logEntry);
  
  if (!diagnosticLogDiv) {
    diagnosticLogDiv = document.getElementById("diagnostic-log");
  }
  
  if (diagnosticLogDiv) {
    try {
      const entries = diagnosticLog.slice(-15).map(function(entry) {
        const entryColor = entry.includes('ERROR') || entry.includes('FAIL') ? '#f00' : 
                           entry.includes('OK') || entry.includes('complete') ? '#0f0' : '#fff';
        return '<div style="color: ' + entryColor + '; margin: 2px 0;">' + entry + '</div>';
      }).join('');
      diagnosticLogDiv.innerHTML = entries;
    } catch (e) {
      console.error("Diagnostic render error:", e);
    }
  }
  
  console.log(logEntry);
}

// Catch all errors
window.addEventListener('error', function(event) {
  logDiagnostic("ERROR: " + event.message + " at " + event.filename + ":" + event.lineno, true);
});

window.addEventListener('unhandledrejection', function(event) {
  logDiagnostic("UNHANDLED PROMISE: " + event.reason, true);
});

logDiagnostic('App.js loaded');
// ========== END DIAGNOSTIC ==========

const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 1000;
const STORAGE_KEY = "ark_painter_document_v1";
const PROJECT_FILE_VERSION = 1;

const BRUSH_PRESETS = {
  hard: { name: "Hard Round", sizeMultiplier: 1, alphaMultiplier: 1, shadowBlur: 0 },
  soft: { name: "Soft Shade", sizeMultiplier: 1.35, alphaMultiplier: 0.42, shadowBlur: 8 },
  ink: { name: "Inker", sizeMultiplier: 0.82, alphaMultiplier: 1, shadowBlur: 0 }
};

const TRANSFORM_MIN_SELECTION = 4;
const TRANSFORM_HANDLE_RADIUS = 8;
const TRANSFORM_ROTATE_HANDLE_OFFSET = 26;
const TRANSFORM_MIN_SCALE = 0.05;

const state = {
  tool: "brush",
  preset: "hard",
  color: colorPicker ? colorPicker.value : "#111111",
  size: Number(sizeInput.value),
  opacity: Number(opacityInput.value) / 100,
  smoothing: Number(stabilizerInput.value) / 100,
  brushMinSize: 0,
  brushMaxSize: 100,
  brushMinOpacity: 1,
  brushMaxOpacity: 100,
  startTaper: 0,
  endTaper: 0,
  speedSizeReduction: 0,
  spacing: 16,
  jitter: 0,
  interpolation: 100,
  symmetry: "off",
  pressureMode: "off",
  touchEnabled: true,
  smoothOpacityStrokes: true,
  currentPressure: 0.5,
  currentVelocity: 0,
  zoom: 1,
  rotation: 0,
  flipped: false,
  flippedVertical: false,
  panX: 0,
  panY: 0,
  spacePressed: false,
  drawing: false,
  panning: false,
  lastPoint: null,
  smoothedPoint: null,
  panStart: null,
  strokeDistance: 0,
  strokeStartTime: 0,
  strokeStartPoint: null,
  strokeStartPressure: 1,
  lastStrokePressure: 1,
  lastStrokeVelocity: 0,
  lastAppliedTaper: 1,
  strokeHasMoved: false,
  strokeHistory: [],
  taperSmoothed: 1,
  layers: [],
  nextLayerId: 1,
  activeLayerId: null,
  history: [],
  future: [],
  maxHistory: 35,
  autosaveTimer: null,
  autoSaveToFileTimer: null,
  thumbnailRaf: 0,
  draggedLayerId: null,
  touchPointers: new Map(),
  touchGesture: null,
  currentProjectFilename: null,
  currentProjectFileHandle: null,
  transformSelection: null,
  hasUnsavedChanges: false,
  colorHistory: [],
  transformBufferCanvas: null,
  transformBaseCanvas: null,
  transformMode: "idle",
  transformDraftStart: null,
  transformDraftCurrent: null,
  transformAction: null,
  transformDirty: false,
  toolbarCollapsed: false,
  layersCollapsed: false,
  toolsCollapsed: false
};

const previewDragState = {
  active: false,
  offsetX: 0,
  offsetY: 0,
  x: 0,
  y: 0,
  initialized: false
};

const viewWindowDragState = {
  active: false,
  offsetX: 0,
  offsetY: 0,
  x: 0,
  y: 0,
  initialized: false
};

const clipCanvas = document.createElement("canvas");
clipCanvas.width = CANVAS_WIDTH;
clipCanvas.height = CANVAS_HEIGHT;
const clipCtx = clipCanvas.getContext("2d", { alpha: true });

function createLayer(name) {
  const layerCanvas = document.createElement("canvas");
  layerCanvas.width = CANVAS_WIDTH;
  layerCanvas.height = CANVAS_HEIGHT;
  const layerCtx = layerCanvas.getContext("2d", { alpha: true });

  const layer = {
    id: `layer-${state.nextLayerId}`,
    name,
    visible: true,
    blendMode: "source-over",
    opacity: 1,
    clipped: false,
    canvas: layerCanvas,
    ctx: layerCtx
  };

  state.nextLayerId += 1;
  return layer;
}

function getActiveLayer() {
  return state.layers.find((layer) => layer.id === state.activeLayerId) || null;
}

function blendModeToLabel(mode) {
  if (mode === "multiply") {
    return "Multiply";
  }
  if (mode === "screen") {
    return "Screen";
  }
  return "Normal";
}

function symmetryToLabel(mode) {
  if (mode === "vertical") {
    return "Vertical";
  }
  if (mode === "horizontal") {
    return "Horizontal";
  }
  if (mode === "both") {
    return "Both";
  }
  return "Off";
}

function updateLayerSelect() {
  layerSelect.innerHTML = "";
  state.layers.forEach((layer) => {
    const option = document.createElement("option");
    option.value = layer.id;
    const hiddenMark = layer.visible ? "" : " (Hidden)";
    const clipMark = layer.clipped ? " [Clip]" : "";
    option.textContent = `${layer.name}${hiddenMark}${clipMark}`;
    if (layer.id === state.activeLayerId) {
      option.selected = true;
    }
    layerSelect.append(option);
  });
}

function updateLayerControls() {
  const layer = getActiveLayer();
  if (!layer) {
    layerBlendModeSelect.value = "source-over";
    layerOpacityInput.value = "100";
    layerOpacityValue.textContent = "100%";
    layerClipButton.textContent = "Clip: Off";
    layerClipButton.classList.remove("active");
    return;
  }

  layerBlendModeSelect.value = layer.blendMode;
  const opacityPercent = Math.round(layer.opacity * 100);
  layerOpacityInput.value = String(opacityPercent);
  layerOpacityValue.textContent = `${opacityPercent}%`;
  layerClipButton.textContent = layer.clipped ? "Clip: On" : "Clip: Off";
  layerClipButton.classList.toggle("active", layer.clipped);
}

function getCanvasPivotInViewportCss() {
  return {
    x: canvas.offsetLeft + canvas.clientWidth / 2,
    y: canvas.offsetTop + canvas.clientHeight / 2
  };
}

function updateViewportTransform() {
  const pivot = getCanvasPivotInViewportCss();
  const flipHorizontal = state.flipped ? "scaleX(-1)" : "";
  const flipVertical = state.flippedVertical ? "scaleY(-1)" : "";
  viewport.style.transform = `translate(${state.panX}px, ${state.panY}px) translate(${pivot.x}px, ${pivot.y}px) rotate(${state.rotation}deg) scale(${state.zoom}) ${flipHorizontal} ${flipVertical} translate(${-pivot.x}px, ${-pivot.y}px)`;
  zoomValue.textContent = `${Math.round(state.zoom * 100)}%`;
}

function updateStatus() {
  const toolLabels = {
    brush: "Brush",
    eraser: "Eraser",
    transform: "Transform",
    fill: "Fill",
    blur: "Blur"
  };
  const toolLabel = toolLabels[state.tool] || "Brush";
  const presetLabel = BRUSH_PRESETS[state.preset].name;
  const activeLayer = getActiveLayer();
  const layerLabel = activeLayer ? activeLayer.name : "None";
  const blendLabel = activeLayer ? blendModeToLabel(activeLayer.blendMode) : "Normal";
  const layerOpacityLabel = activeLayer ? `${Math.round(activeLayer.opacity * 100)}%` : "100%";
  const pressureLabel = state.pressureMode === "off" ? "Off" : state.pressureMode === "size" ? "Size" : state.pressureMode === "opacity" ? "Opacity" : "Both";
  const speedSizeLabel = `${state.speedSizeReduction}%`;
  const interpolationLabel = `${state.interpolation}%`;
  const touchLabel = state.touchEnabled ? "On" : "Off";

  statusText.textContent = `Tool: ${toolLabel} | Preset: ${presetLabel} | Layer: ${layerLabel} | Layer Opacity: ${layerOpacityLabel} | Blend: ${blendLabel} | Symmetry: ${symmetryToLabel(state.symmetry)} | Stabilizer: ${Math.round(state.smoothing * 100)}% | Pressure: ${pressureLabel} | Speed Size: ${speedSizeLabel} | Interpolation: ${interpolationLabel} | Pressure Size Range: ${state.brushMinSize}px-${state.brushMaxSize}px | Touch Gestures: ${touchLabel} | Zoom: ${Math.round(state.zoom * 100)}%`;
}

function openBrushSettings() {
  logDiagnostic('openBrushSettings called');
  if (!brushSettingsModal) {
    logDiagnostic('ERROR: brushSettingsModal element not found!');
    return;
  }
  logDiagnostic('Modal found, opening...');
  brushSettingsModal.classList.remove("hidden");
  brushSettingsModal.setAttribute("aria-hidden", "false");
  logDiagnostic('Modal shown');
}

function closeBrushSettings() {
  if (!brushSettingsModal) {
    return;
  }
  brushSettingsModal.classList.add("hidden");
  brushSettingsModal.setAttribute("aria-hidden", "true");
}

function enforceBrushLimits() {
  if (state.brushMinSize > state.brushMaxSize) {
    state.brushMaxSize = state.brushMinSize;
  }
  if (state.brushMaxSize < state.brushMinSize) {
    state.brushMinSize = state.brushMaxSize;
  }

  if (state.brushMinOpacity > state.brushMaxOpacity) {
    state.brushMaxOpacity = state.brushMinOpacity;
  }
  if (state.brushMaxOpacity < state.brushMinOpacity) {
    state.brushMinOpacity = state.brushMaxOpacity;
  }
}

function updateTouchToggleButton() {
  if (!touchToggleButton) {
    return;
  }
  touchToggleButton.textContent = state.touchEnabled ? "Touch Gestures: On" : "Touch Gestures: Off";
  touchToggleButton.classList.toggle("active", !state.touchEnabled);
}

function updateSmoothOpacityToggleButton() {
  if (!smoothOpacityToggleButton) {
    return;
  }
  smoothOpacityToggleButton.textContent = state.smoothOpacityStrokes ? "Low-Opacity Smooth: On" : "Low-Opacity Smooth: Off";
  smoothOpacityToggleButton.classList.toggle("active", state.smoothOpacityStrokes);
}

function openPreviewModal() {
  if (!previewModal || !previewCanvas || !previewWindow) {
    return;
  }

  // Create a temporary canvas to render the full composite
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext("2d");

  // Render all visible layers
  state.layers.forEach(layer => {
    if (layer.visible) {
      tempCtx.save();
      tempCtx.globalAlpha = layer.opacity;
      tempCtx.globalCompositeOperation = layer.blendMode;
      tempCtx.drawImage(layer.canvas, 0, 0);
      tempCtx.restore();
    }
  });

  // Calculate preview canvas size to fit in viewport while maintaining aspect ratio
  const maxWidth = window.innerWidth * 0.8;
  const maxHeight = window.innerHeight * 0.8;
  const aspectRatio = canvas.width / canvas.height;
  let previewWidth, previewHeight;

  if (canvas.width > canvas.height) {
    previewWidth = Math.min(maxWidth, canvas.width);
    previewHeight = previewWidth / aspectRatio;
    if (previewHeight > maxHeight) {
      previewHeight = maxHeight;
      previewWidth = previewHeight * aspectRatio;
    }
  } else {
    previewHeight = Math.min(maxHeight, canvas.height);
    previewWidth = previewHeight * aspectRatio;
    if (previewWidth > maxWidth) {
      previewWidth = maxWidth;
      previewHeight = previewWidth / aspectRatio;
    }
  }

  previewCanvas.width = previewWidth;
  previewCanvas.height = previewHeight;
  const previewCtx = previewCanvas.getContext("2d");
  previewCtx.drawImage(tempCanvas, 0, 0, previewCanvas.width, previewCanvas.height);

  if (!previewDragState.initialized) {
    previewDragState.x = Math.max(16, (window.innerWidth - previewCanvas.width) / 2);
    previewDragState.y = Math.max(16, (window.innerHeight - previewCanvas.height) / 2 - 24);
    previewDragState.initialized = true;
  }

  previewModal.classList.remove("hidden");
  previewModal.setAttribute("aria-hidden", "false");
  applyPreviewWindowPosition();
}

function closePreviewModal() {
  if (!previewModal) {
    return;
  }
  previewDragState.active = false;
  previewModal.classList.add("hidden");
  previewModal.setAttribute("aria-hidden", "true");
}

function applyPreviewWindowPosition() {
  if (!previewWindow || !previewCanvas) {
    return;
  }

  const maxX = Math.max(0, window.innerWidth - previewWindow.offsetWidth - 10);
  const maxY = Math.max(0, window.innerHeight - previewWindow.offsetHeight - 10);
  previewDragState.x = Math.min(maxX, Math.max(10, previewDragState.x));
  previewDragState.y = Math.min(maxY, Math.max(10, previewDragState.y));
  previewWindow.style.left = `${previewDragState.x}px`;
  previewWindow.style.top = `${previewDragState.y}px`;
}

function startPreviewDrag(event) {
  if (!previewWindow || !previewModal || previewModal.classList.contains("hidden")) {
    return;
  }

  if (event.target instanceof HTMLElement && event.target.closest("button")) {
    return;
  }

  previewDragState.active = true;
  previewDragState.offsetX = event.clientX - previewDragState.x;
  previewDragState.offsetY = event.clientY - previewDragState.y;
  previewHeader?.setPointerCapture(event.pointerId);
  event.preventDefault();
}

function dragPreviewWindow(event) {
  if (!previewDragState.active) {
    return;
  }

  previewDragState.x = event.clientX - previewDragState.offsetX;
  previewDragState.y = event.clientY - previewDragState.offsetY;
  applyPreviewWindowPosition();
}

function stopPreviewDrag(event) {
  if (!previewDragState.active) {
    return;
  }

  previewDragState.active = false;
  if (previewHeader && previewHeader.hasPointerCapture(event.pointerId)) {
    previewHeader.releasePointerCapture(event.pointerId);
  }
}

function applyViewWindowPosition() {
  if (!viewWindow) {
    return;
  }

  if (!viewWindowDragState.initialized) {
    const gap = 12;
    if (toolsPanel) {
      const toolsRect = toolsPanel.getBoundingClientRect();
      viewWindowDragState.x = toolsRect.right + gap;
      viewWindowDragState.y = toolsRect.top;
    } else {
      viewWindowDragState.x = window.innerWidth - viewWindow.offsetWidth - 16;
      viewWindowDragState.y = 16;
    }
    viewWindowDragState.initialized = true;
  }

  const maxX = Math.max(0, window.innerWidth - viewWindow.offsetWidth - 10);
  const maxY = Math.max(0, window.innerHeight - viewWindow.offsetHeight - 10);
  viewWindowDragState.x = Math.min(maxX, Math.max(10, viewWindowDragState.x));
  viewWindowDragState.y = Math.min(maxY, Math.max(10, viewWindowDragState.y));
  viewWindow.style.left = `${viewWindowDragState.x}px`;
  viewWindow.style.top = `${viewWindowDragState.y}px`;
}

function startViewWindowDrag(event) {
  if (!viewWindow) {
    return;
  }

  if (event.target instanceof HTMLElement && event.target.closest("button")) {
    return;
  }

  if (!viewWindowDragState.initialized) {
    const rect = viewWindow.getBoundingClientRect();
    viewWindowDragState.x = rect.left;
    viewWindowDragState.y = rect.top;
    viewWindowDragState.initialized = true;
  }

  viewWindowDragState.active = true;
  viewWindowDragState.offsetX = event.clientX - viewWindowDragState.x;
  viewWindowDragState.offsetY = event.clientY - viewWindowDragState.y;
  viewHeader?.setPointerCapture(event.pointerId);
  event.preventDefault();
}

function dragViewWindow(event) {
  if (!viewWindowDragState.active) {
    return;
  }

  viewWindowDragState.x = event.clientX - viewWindowDragState.offsetX;
  viewWindowDragState.y = event.clientY - viewWindowDragState.offsetY;
  applyViewWindowPosition();
}

function stopViewWindowDrag(event) {
  if (!viewWindowDragState.active) {
    return;
  }

  viewWindowDragState.active = false;
  if (viewHeader && viewHeader.hasPointerCapture(event.pointerId)) {
    viewHeader.releasePointerCapture(event.pointerId);
  }
}

function toggleViewWindowMinimized() {
  if (!viewWindow) {
    return;
  }

  viewWindow.classList.toggle("minimized");
  if (minimizeViewButton) {
    minimizeViewButton.textContent = viewWindow.classList.contains("minimized") ? "+" : "−";
  }
  applyViewWindowPosition();
}

function updateFlipToggleButton() {
  if (!flipToggleButton) {
    return;
  }
  flipToggleButton.textContent = state.flipped ? "Flip H: On" : "Flip H: Off";
  flipToggleButton.classList.toggle("active", state.flipped);

  if (flipVerticalToggleButton) {
    flipVerticalToggleButton.textContent = state.flippedVertical ? "Flip V: On" : "Flip V: Off";
    flipVerticalToggleButton.classList.toggle("active", state.flippedVertical);
  }
}

function toggleToolbar() {
  state.toolbarCollapsed = !state.toolbarCollapsed;
  if (toolbar) {
    toolbar.classList.toggle("collapsed", state.toolbarCollapsed);
  }
  if (toggleToolbarButton) {
    toggleToolbarButton.textContent = state.toolbarCollapsed ? "+" : "−";
  }
  persistDocumentSoon();
}

function toggleLayers() {
  state.layersCollapsed = !state.layersCollapsed;
  if (layerPanel) {
    layerPanel.classList.toggle("collapsed", state.layersCollapsed);
  }
  if (toggleLayersButton) {
    toggleLayersButton.textContent = state.layersCollapsed ? "+" : "−";
  }
  persistDocumentSoon();
}

function toggleTools() {
  state.toolsCollapsed = !state.toolsCollapsed;
  if (toolsPanel) {
    toolsPanel.classList.toggle("collapsed", state.toolsCollapsed);
  }
  if (toggleToolsButton) {
    toggleToolsButton.textContent = state.toolsCollapsed ? "+" : "−";
  }
  persistDocumentSoon();
}

function updatePanelStates() {
  if (toolbar) {
    toolbar.classList.toggle("collapsed", state.toolbarCollapsed);
  }
  if (toggleToolbarButton) {
    toggleToolbarButton.textContent = state.toolbarCollapsed ? "+" : "−";
  }
  if (layerPanel) {
    layerPanel.classList.toggle("collapsed", state.layersCollapsed);
  }
  if (toggleLayersButton) {
    toggleLayersButton.textContent = state.layersCollapsed ? "+" : "−";
  }
  if (toolsPanel) {
    toolsPanel.classList.toggle("collapsed", state.toolsCollapsed);
  }
  if (toggleToolsButton) {
    toggleToolsButton.textContent = state.toolsCollapsed ? "+" : "−";
  }
}

function isTouchDrawingBlocked(event) {
  return event.pointerType === "touch";
}

function isTouchGestureBlocked() {
  return !state.touchEnabled;
}

function setTool(tool) {
  if (state.tool === "transform" && tool !== "transform") {
    clearTransformState();
    renderComposite();
  }

  state.tool = tool;
  canvas.style.cursor = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6' viewBox='0 0 6 6'%3E%3Ccircle cx='3' cy='3' r='1.4' fill='%23000000'/%3E%3C/svg%3E\") 3 3, auto";
  brushButton.classList.toggle("active", tool === "brush");
  eraserButton.classList.toggle("active", tool === "eraser");
  if (transformButton) {
    transformButton.classList.toggle("active", tool === "transform");
  }
  if (fillButton) {
    fillButton.classList.toggle("active", tool === "fill");
  }
  if (blurButton) {
    blurButton.classList.toggle("active", tool === "blur");
  }
  updateStatus();
  persistDocumentSoon();
}

function screenToCanvas(event) {
  const stageRect = stage.getBoundingClientRect();
  const stageX = event.clientX - stageRect.left + stage.scrollLeft;
  const stageY = event.clientY - stageRect.top + stage.scrollTop;

  // Map the pointer through the inverse of the exact viewport transform.
  const viewportX = stageX - viewport.offsetLeft;
  const viewportY = stageY - viewport.offsetTop;
  const pivot = getCanvasPivotInViewportCss();
  const zoom = Math.max(0.0001, state.zoom);
  const scaleX = (state.flipped ? -1 : 1) * zoom;
  const scaleY = (state.flippedVertical ? -1 : 1) * zoom;
  const transformMatrix = new DOMMatrix()
    .translateSelf(state.panX, state.panY)
    .translateSelf(pivot.x, pivot.y)
    .rotateSelf(state.rotation)
    .scaleSelf(scaleX, scaleY)
    .translateSelf(-pivot.x, -pivot.y);
  const invertedPoint = new DOMPoint(viewportX, viewportY).matrixTransform(transformMatrix.inverse());

  // Convert viewport-local coordinates into canvas-local CSS pixels.
  const canvasCssX = invertedPoint.x - canvas.offsetLeft;
  const canvasCssY = invertedPoint.y - canvas.offsetTop;
  const cssWidth = Math.max(1, canvas.clientWidth);
  const cssHeight = Math.max(1, canvas.clientHeight);
  const canvasScaleX = canvas.width / cssWidth;
  const canvasScaleY = canvas.height / cssHeight;

  return {
    x: canvasCssX * canvasScaleX,
    y: canvasCssY * canvasScaleY
  };
}

function getTouchGestureSnapshot() {
  const points = Array.from(state.touchPointers.values());
  if (points.length === 0) {
    return null;
  }

  if (points.length === 1) {
    return {
      centerX: points[0].x,
      centerY: points[0].y,
      distance: 0,
      angle: 0,
      pointCount: 1
    };
  }

  const p0 = points[0];
  const p1 = points[1];
  const centerX = (p0.x + p1.x) / 2;
  const centerY = (p0.y + p1.y) / 2;
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;

  return {
    centerX,
    centerY,
    distance: Math.max(1, Math.sqrt(dx * dx + dy * dy)),
    angle: Math.atan2(dy, dx),
    pointCount: 2
  };
}

function normalizeAngleDelta(angleDelta) {
  let delta = angleDelta;
  while (delta > Math.PI) {
    delta -= Math.PI * 2;
  }
  while (delta < -Math.PI) {
    delta += Math.PI * 2;
  }
  return delta;
}

function getStageCoordinatesFromClient(clientX, clientY) {
  const stageRect = stage.getBoundingClientRect();
  return {
    x: clientX - stageRect.left + stage.scrollLeft,
    y: clientY - stageRect.top + stage.scrollTop
  };
}

function buildViewportTransformMatrix(panX, panY, zoom, rotation) {
  const pivot = getCanvasPivotInViewportCss();
  const safeZoom = Math.max(0.0001, zoom);
  const scaleX = (state.flipped ? -1 : 1) * safeZoom;
  const scaleY = (state.flippedVertical ? -1 : 1) * safeZoom;
  return new DOMMatrix()
    .translateSelf(panX, panY)
    .translateSelf(pivot.x, pivot.y)
    .rotateSelf(rotation)
    .scaleSelf(scaleX, scaleY)
    .translateSelf(-pivot.x, -pivot.y);
}

function stageToViewportLocal(stageX, stageY, panX, panY, zoom, rotation) {
  const viewportX = stageX - viewport.offsetLeft;
  const viewportY = stageY - viewport.offsetTop;
  const matrix = buildViewportTransformMatrix(panX, panY, zoom, rotation);
  const inverted = matrix.inverse();
  const localPoint = new DOMPoint(viewportX, viewportY).matrixTransform(inverted);
  return { x: localPoint.x, y: localPoint.y };
}

function viewportLocalToStage(localX, localY, panX, panY, zoom, rotation) {
  const matrix = buildViewportTransformMatrix(panX, panY, zoom, rotation);
  const transformed = new DOMPoint(localX, localY).matrixTransform(matrix);
  return {
    x: transformed.x + viewport.offsetLeft,
    y: transformed.y + viewport.offsetTop
  };
}

function resetTouchGestureBaseline() {
  const snapshot = getTouchGestureSnapshot();
  if (!snapshot) {
    state.touchGesture = null;
    stage.classList.remove("panning");
    return;
  }

  state.touchGesture = {
    startCenterX: snapshot.centerX,
    startCenterY: snapshot.centerY,
    startDistance: snapshot.distance,
    startAngle: snapshot.angle,
    startZoom: state.zoom,
    startRotation: state.rotation,
    startPanX: state.panX,
    startPanY: state.panY,
    pointCount: snapshot.pointCount,
    focalLocalX: null,
    focalLocalY: null
  };

  if (snapshot.pointCount >= 2) {
    const centerStage = getStageCoordinatesFromClient(snapshot.centerX, snapshot.centerY);
    const focalLocal = stageToViewportLocal(
      centerStage.x,
      centerStage.y,
      state.panX,
      state.panY,
      state.zoom,
      state.rotation
    );
    state.touchGesture.focalLocalX = focalLocal.x;
    state.touchGesture.focalLocalY = focalLocal.y;
  }

  stage.classList.add("panning");
}

function applyTouchGesture() {
  if (!state.touchGesture) {
    return;
  }

  const snapshot = getTouchGestureSnapshot();
  if (!snapshot) {
    resetTouchGestureBaseline();
    return;
  }

  const gesture = state.touchGesture;
  const currentCenterStage = getStageCoordinatesFromClient(snapshot.centerX, snapshot.centerY);

  if (snapshot.pointCount >= 2 && gesture.startDistance > 0) {
    const scaleFactor = snapshot.distance / gesture.startDistance;
    const nextZoom = Math.min(4, Math.max(0.2, gesture.startZoom * scaleFactor));

    const angleDelta = normalizeAngleDelta(snapshot.angle - gesture.startAngle);
    const nextRotation = gesture.startRotation + (angleDelta * 180) / Math.PI;

    state.zoom = nextZoom;
    state.rotation = nextRotation;

    if (gesture.focalLocalX !== null && gesture.focalLocalY !== null) {
      const basePosition = viewportLocalToStage(
        gesture.focalLocalX,
        gesture.focalLocalY,
        0,
        0,
        nextZoom,
        nextRotation
      );
      state.panX = currentCenterStage.x - basePosition.x;
      state.panY = currentCenterStage.y - basePosition.y;
    } else {
      state.panX = gesture.startPanX + (snapshot.centerX - gesture.startCenterX);
      state.panY = gesture.startPanY + (snapshot.centerY - gesture.startCenterY);
    }
  } else {
    state.panX = gesture.startPanX + (snapshot.centerX - gesture.startCenterX);
    state.panY = gesture.startPanY + (snapshot.centerY - gesture.startCenterY);
  }

  updateViewportTransform();
  updateStatus();
}

function handleTouchPointerDown(event) {
  if (isTouchGestureBlocked()) {
    return;
  }

  event.preventDefault();
  canvas.setPointerCapture(event.pointerId);
  state.touchPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  resetTouchGestureBaseline();
}

function handleTouchPointerMove(event) {
  if (isTouchGestureBlocked() || !state.touchPointers.has(event.pointerId)) {
    return;
  }

  event.preventDefault();
  state.touchPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  applyTouchGesture();
}

function handleTouchPointerUp(event) {
  if (!state.touchPointers.has(event.pointerId)) {
    return;
  }

  event.preventDefault();
  state.touchPointers.delete(event.pointerId);
  if (canvas.hasPointerCapture(event.pointerId)) {
    canvas.releasePointerCapture(event.pointerId);
  }

  if (state.touchPointers.size === 0) {
    state.touchGesture = null;
    stage.classList.remove("panning");
    persistDocumentSoon();
    updateStatus();
    return;
  }

  // Rebaseline so lifting one finger does not cause a transform jump.
  resetTouchGestureBaseline();
}

function interpolatePoint(from, to, amount) {
  return {
    x: from.x + (to.x - from.x) * amount,
    y: from.y + (to.y - from.y) * amount
  };
}

function quadraticPoint(from, control, to, amount) {
  const t = Math.min(1, Math.max(0, amount));
  const it = 1 - t;
  return {
    x: it * it * from.x + 2 * it * t * control.x + t * t * to.x,
    y: it * it * from.y + 2 * it * t * control.y + t * t * to.y
  };
}

function getSymmetryPoints(point) {
  if (state.symmetry === "off") {
    return [point];
  }

  if (state.symmetry === "vertical") {
    return [point, { x: CANVAS_WIDTH - point.x, y: point.y }];
  }

  if (state.symmetry === "horizontal") {
    return [point, { x: point.x, y: CANVAS_HEIGHT - point.y }];
  }

  return [
    point,
    { x: CANVAS_WIDTH - point.x, y: point.y },
    { x: point.x, y: CANVAS_HEIGHT - point.y },
    { x: CANVAS_WIDTH - point.x, y: CANVAS_HEIGHT - point.y }
  ];
}

function applyBrushStyle(layerCtx, pressure = 0.5, taper = 1.0, velocity = 0, segmentLength = 0) {
  const preset = BRUSH_PRESETS[state.preset];
  let size = state.size * preset.sizeMultiplier;
  let opacity = state.opacity * preset.alphaMultiplier;
  const minSize = Math.min(state.brushMinSize, state.brushMaxSize);
  const maxSize = Math.max(state.brushMinSize, state.brushMaxSize);
  const minOpacity = Math.min(state.brushMinOpacity, state.brushMaxOpacity) / 100;
  const maxOpacity = Math.max(state.brushMinOpacity, state.brushMaxOpacity) / 100;

  if (state.pressureMode === "size" || state.pressureMode === "both") {
    // Pressure size range is independent from the base brush size control.
    // Use a curve so low pressure stays very close to min size (including 0px)
    // and ramps up toward the chosen brush size more naturally.
    const pressureClamped = Math.min(1, Math.max(0, pressure));
    const pressureMinSize = minSize;
    const pressureMaxSize = Math.max(pressureMinSize, Math.min(maxSize, size));
    const pressureCurveExponent = 1.9;
    const curvedPressure = Math.pow(pressureClamped, pressureCurveExponent);
    size = pressureMinSize + (pressureMaxSize - pressureMinSize) * curvedPressure;
  }

  if (state.pressureMode === "opacity" || state.pressureMode === "both") {
    const minPressure = 0.1;
    const pressureScale = minPressure + (pressure * (1 - minPressure));
    opacity = opacity * pressureScale;
  }

  // Apply taper to size
  size = Math.max(0, size * taper);

  // Reduce brush size at higher speed when enabled.
  if (state.speedSizeReduction > 0) {
    const velocityMax = 35;
    const normalizedVelocity = Math.min(1, Math.max(0, velocity / velocityMax));
    const minScale = Math.max(0.08, 1 - state.speedSizeReduction / 100);
    const speedScale = 1 - normalizedVelocity * (1 - minScale);
    size = Math.max(0, size * speedScale);
  }

  layerCtx.lineWidth = Math.max(0, size);
  layerCtx.lineJoin = "round";
  layerCtx.shadowColor = state.tool === "brush" ? state.color : "rgba(0,0,0,0)";
  layerCtx.shadowBlur = preset.shadowBlur;

  if (state.tool === "eraser") {
    layerCtx.globalCompositeOperation = "destination-out";
    const eraserOpacity = state.pressureMode === "opacity" || state.pressureMode === "both" ? opacity : state.opacity;
    const effectiveAlpha = Math.min(maxOpacity, Math.max(minOpacity, eraserOpacity));
    layerCtx.globalAlpha = effectiveAlpha;
    layerCtx.lineCap = "round";
    layerCtx.strokeStyle = "rgba(0,0,0,1)";
    layerCtx.fillStyle = "rgba(0,0,0,1)";
  } else {
    layerCtx.globalCompositeOperation = "source-over";
    const effectiveAlpha = Math.min(maxOpacity, Math.max(minOpacity, Math.min(1, opacity)));
    let blendedAlpha = effectiveAlpha;

    // Normalize alpha by covered distance so tiny interpolated segments do not stack into visible steps.
    if (state.smoothOpacityStrokes && blendedAlpha < 0.98) {
      const referenceLength = Math.max(0.45, layerCtx.lineWidth * 0.7);
      const actualLength = Math.max(0.08, segmentLength || referenceLength);
      blendedAlpha = 1 - Math.pow(1 - blendedAlpha, actualLength / referenceLength);
    }

    layerCtx.globalAlpha = Math.min(maxOpacity, Math.max(0.001, blendedAlpha));
    // Keep caps round so interpolated micro-segments blend into a continuous curve at speed.
    layerCtx.lineCap = "round";
    layerCtx.strokeStyle = state.color;
    layerCtx.fillStyle = state.color;
  }
}

function drawLayerToTarget(targetCtx, layer, layerIndex) {
  targetCtx.save();
  targetCtx.globalCompositeOperation = layer.blendMode;
  targetCtx.globalAlpha = layer.opacity;

  if (layer.clipped && layerIndex > 0) {
    const baseLayer = state.layers[layerIndex - 1];
    clipCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    clipCtx.globalCompositeOperation = "source-over";
    clipCtx.globalAlpha = 1;
    clipCtx.drawImage(layer.canvas, 0, 0);
    clipCtx.globalCompositeOperation = "destination-in";
    clipCtx.drawImage(baseLayer.canvas, 0, 0);
    clipCtx.globalCompositeOperation = "source-over";
    targetCtx.drawImage(clipCanvas, 0, 0);
  } else {
    targetCtx.drawImage(layer.canvas, 0, 0);
  }

  targetCtx.restore();
}

function renderSymmetryGuides() {
  guideCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  if (state.symmetry !== "off") {
    guideCtx.save();
    guideCtx.strokeStyle = "rgba(242, 107, 29, 0.8)";
    guideCtx.lineWidth = 2;
    guideCtx.setLineDash([10, 8]);

    if (state.symmetry === "vertical" || state.symmetry === "both") {
      const centerX = CANVAS_WIDTH / 2;
      guideCtx.beginPath();
      guideCtx.moveTo(centerX, 0);
      guideCtx.lineTo(centerX, CANVAS_HEIGHT);
      guideCtx.stroke();
    }

    if (state.symmetry === "horizontal" || state.symmetry === "both") {
      const centerY = CANVAS_HEIGHT / 2;
      guideCtx.beginPath();
      guideCtx.moveTo(0, centerY);
      guideCtx.lineTo(CANVAS_WIDTH, centerY);
      guideCtx.stroke();
    }

    guideCtx.restore();
  }

  drawTransformOverlay();
}

function reorderLayerById(draggedId, targetId) {
  if (!draggedId || !targetId || draggedId === targetId) {
    return;
  }

  const from = state.layers.findIndex((layer) => layer.id === draggedId);
  const to = state.layers.findIndex((layer) => layer.id === targetId);
  if (from === -1 || to === -1) {
    return;
  }

  const [draggedLayer] = state.layers.splice(from, 1);
  state.layers.splice(to, 0, draggedLayer);
  renderComposite();
  updateLayerSelect();
  updateStatus();
  snapshotHistory();
}

function renderLayerThumbnails() {
  layerThumbnails.innerHTML = "";

  const ordered = [...state.layers].reverse();
  
  // Helper to create a layer card
  function createLayerCard(layer) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "layer-thumb";
    card.dataset.layerId = layer.id;
    card.draggable = true;
    if (layer.id === state.activeLayerId) {
      card.classList.add("active");
    }

    // Add clipped class for indentation and grouping
    if (layer.clipped) {
      card.classList.add("clipped");
    }

    const thumbCanvas = document.createElement("canvas");
    thumbCanvas.width = 104;
    thumbCanvas.height = 72;
    const thumbCtx = thumbCanvas.getContext("2d", { alpha: true });

    thumbCtx.fillStyle = "#ffffff";
    thumbCtx.fillRect(0, 0, thumbCanvas.width, thumbCanvas.height);
    thumbCtx.globalAlpha = layer.opacity;
    thumbCtx.drawImage(layer.canvas, 0, 0, thumbCanvas.width, thumbCanvas.height);
    thumbCtx.globalAlpha = 1;

    const label = document.createElement("div");
    label.className = "layer-thumb-label";
    const visibility = layer.visible ? "Visible" : "Hidden";
    const clip = layer.clipped ? " | Clip" : "";
    label.textContent = `${layer.name} | ${visibility}${clip}`;

    card.append(thumbCanvas, label);

    card.addEventListener("click", () => {
      state.activeLayerId = layer.id;
      updateLayerSelect();
      updateLayerControls();
      updateStatus();
      renderLayerThumbnails();
    });

    card.addEventListener("dragstart", () => {
      state.draggedLayerId = layer.id;
      card.classList.add("dragging");
    });

    card.addEventListener("dragend", () => {
      state.draggedLayerId = null;
      card.classList.remove("dragging");
      const cards = layerThumbnails.querySelectorAll(".layer-thumb.drag-over");
      cards.forEach((entry) => entry.classList.remove("drag-over"));
    });

    card.addEventListener("dragover", (event) => {
      event.preventDefault();
      if (state.draggedLayerId && state.draggedLayerId !== layer.id) {
        card.classList.add("drag-over");
      }
    });

    card.addEventListener("dragleave", () => {
      card.classList.remove("drag-over");
    });

    card.addEventListener("drop", (event) => {
      event.preventDefault();
      card.classList.remove("drag-over");
      reorderLayerById(state.draggedLayerId, layer.id);
    });

    return card;
  }

  // Render layers with grouping for clipped layers.
  // A clipped layer should be grouped with the first non-clipped layer below it.
  for (let index = 0; index < ordered.length;) {
    const layer = ordered[index];

    if (layer.clipped && index + 1 < ordered.length) {
      const clipGroup = document.createElement("div");
      clipGroup.className = "layer-clip-group";

      let cursor = index;
      while (cursor < ordered.length) {
        const current = ordered[cursor];
        const card = createLayerCard(current);
        if (!current.clipped) {
          card.classList.add("clip-base");
        }
        clipGroup.append(card);

        if (!current.clipped) {
          break;
        }

        cursor += 1;
      }

      layerThumbnails.append(clipGroup);
      index = cursor + 1;
      continue;
    }

    const card = createLayerCard(layer);
    layerThumbnails.append(card);
    index += 1;
  }
}

function scheduleLayerThumbnailsRefresh() {
  if (state.thumbnailRaf) {
    return;
  }

  state.thumbnailRaf = window.requestAnimationFrame(() => {
    state.thumbnailRaf = 0;
    renderLayerThumbnails();
  });
}

function renderComposite() {
  viewCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  state.layers.forEach((layer, index) => {
    if (layer.visible) {
      drawLayerToTarget(viewCtx, layer, index);
    }
  });
  renderSymmetryGuides();
  scheduleLayerThumbnailsRefresh();
}

function calculateTaper() {
  if (state.startTaper === 0 && state.endTaper === 0) {
    state.taperSmoothed = 1;
    return 1.0;
  }

  const taperDistance = Math.max(8, state.size * 4);
  let taper = 1.0;

  const smoothstep = (value) => {
    const t = Math.min(1, Math.max(0, value));
    return t * t * (3 - 2 * t);
  };

  // Apply start taper
  if (state.startTaper > 0 && state.strokeDistance < taperDistance) {
    const startProgress = smoothstep(state.strokeDistance / taperDistance);
    const minSize = 1 - (state.startTaper / 100);
    const startScale = minSize + startProgress * (1 - minSize);
    taper = Math.min(taper, startScale);
  }

  // Apply end taper based on velocity
  if (state.endTaper > 0 && state.strokeHistory.length >= 2) {
    const recent = state.strokeHistory.slice(-7);
    if (recent.length >= 2) {
      // Calculate average velocity
      let totalVelocity = 0;
      for (let i = 1; i < recent.length; i++) {
        totalVelocity += recent[i].velocity || 0;
      }
      const avgVelocity = totalVelocity / (recent.length - 1);
      
      // If velocity is dropping, apply end taper
      const velocityThreshold = 15; // pixels per frame
      if (avgVelocity < velocityThreshold) {
        const endTaperProgress = smoothstep(1 - (avgVelocity / velocityThreshold));
        const minSize = 1 - (state.endTaper / 100);
        const endTaperScale = 1 - (endTaperProgress * (1 - minSize));
        taper = Math.min(taper, endTaperScale);
      }
    }
  }

  // Blend taper over time to avoid abrupt width jumps.
  const blend = 0.28 + state.smoothing * 0.32;
  state.taperSmoothed += (taper - state.taperSmoothed) * blend;

  return Math.max(0, Math.min(1, state.taperSmoothed));
}

function stamp(point, pressure = 0.5, velocity = 0) {
  const layer = getActiveLayer();
  if (!layer || !layer.visible) {
    return;
  }

  const taper = calculateTaper();
  state.lastAppliedTaper = taper;
  const points = getSymmetryPoints(point);
  const layerCtx = layer.ctx;
  layerCtx.save();
  applyBrushStyle(layerCtx, pressure, taper, velocity, Math.max(0.5, state.size * 0.5));

  points.forEach((entry) => {
    layerCtx.beginPath();
    layerCtx.arc(entry.x, entry.y, layerCtx.lineWidth / 2, 0, Math.PI * 2);
    layerCtx.fill();
  });

  layerCtx.restore();
  renderComposite();
}

function stroke(from, to, pressure = 0.5, velocity = 0, renderNow = true) {
  const layer = getActiveLayer();
  if (!layer || !layer.visible) {
    return;
  }

  // Apply jitter to points
  let jitteredFrom = from;
  let jitteredTo = to;
  if (state.jitter > 0) {
    const jitterAmount = (state.jitter / 100) * state.size;
    jitteredFrom = {
      x: from.x + (Math.random() - 0.5) * 2 * jitterAmount,
      y: from.y + (Math.random() - 0.5) * 2 * jitterAmount
    };
    jitteredTo = {
      x: to.x + (Math.random() - 0.5) * 2 * jitterAmount,
      y: to.y + (Math.random() - 0.5) * 2 * jitterAmount
    };
  }

  const taper = calculateTaper();
  state.lastAppliedTaper = taper;
  const fromPoints = getSymmetryPoints(jitteredFrom);
  const toPoints = getSymmetryPoints(jitteredTo);
  const pairs = Math.min(fromPoints.length, toPoints.length);

  const layerCtx = layer.ctx;
  layerCtx.save();
  const segmentLength = Math.sqrt(
    (jitteredTo.x - jitteredFrom.x) * (jitteredTo.x - jitteredFrom.x) +
      (jitteredTo.y - jitteredFrom.y) * (jitteredTo.y - jitteredFrom.y)
  );
  applyBrushStyle(layerCtx, pressure, taper, velocity, segmentLength);

  for (let i = 0; i < pairs; i += 1) {
    layerCtx.beginPath();
    layerCtx.moveTo(fromPoints[i].x, fromPoints[i].y);
    layerCtx.lineTo(toPoints[i].x, toPoints[i].y);
    layerCtx.stroke();
  }

  layerCtx.restore();
  if (renderNow) {
    renderComposite();
  }
}

function strokeInterpolated(
  from,
  to,
  pressureFrom = 0.5,
  pressureTo = 0.5,
  velocityFrom = 0,
  velocityTo = 0,
  density = 1
) {
  if (!from || !to) {
    return;
  }

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const baseStepPixels = Math.max(0.6, state.size * (state.spacing / 180));
  const lowOpacityBoost = state.smoothOpacityStrokes && state.tool === "brush" && state.opacity < 0.95 ? 1.35 : 1;
  const normalizedDensity = Math.max(1, density * lowOpacityBoost);
  const stepPixels = Math.max(0.35, baseStepPixels / normalizedDensity);
  const segments = Math.max(1, Math.ceil(distance / stepPixels));

  if (segments <= 1) {
    stroke(from, to, pressureTo, velocityTo, true);
    return;
  }

  for (let i = 1; i <= segments; i += 1) {
    const a = (i - 1) / segments;
    const b = i / segments;
    const segmentPressure = pressureFrom + (pressureTo - pressureFrom) * b;
    const segmentVelocity = velocityFrom + (velocityTo - velocityFrom) * b;
    const segmentFrom = interpolatePoint(from, to, a);
    const segmentTo = interpolatePoint(from, to, b);
    stroke(segmentFrom, segmentTo, segmentPressure, segmentVelocity, false);
  }

  renderComposite();
}

function strokeQuadraticInterpolated(
  from,
  control,
  to,
  pressureFrom = 0.5,
  pressureTo = 0.5,
  velocityFrom = 0,
  velocityTo = 0,
  density = 1
) {
  if (!from || !control || !to) {
    return;
  }

  const chordDx = to.x - from.x;
  const chordDy = to.y - from.y;
  const chordDistance = Math.sqrt(chordDx * chordDx + chordDy * chordDy);
  const controlDx = control.x - (from.x + to.x) * 0.5;
  const controlDy = control.y - (from.y + to.y) * 0.5;
  const curvature = Math.sqrt(controlDx * controlDx + controlDy * controlDy);

  const baseStepPixels = Math.max(0.55, state.size * (state.spacing / 210));
  const lowOpacityBoost = state.smoothOpacityStrokes && state.tool === "brush" && state.opacity < 0.95 ? 1.45 : 1;
  const normalizedDensity = Math.max(1, density * lowOpacityBoost);
  const stepPixels = Math.max(0.3, baseStepPixels / normalizedDensity);
  const estimatedArc = chordDistance + curvature * 0.9;
  const segments = Math.max(2, Math.ceil(estimatedArc / stepPixels));

  for (let i = 1; i <= segments; i += 1) {
    const a = (i - 1) / segments;
    const b = i / segments;
    const segmentPressure = pressureFrom + (pressureTo - pressureFrom) * b;
    const segmentVelocity = velocityFrom + (velocityTo - velocityFrom) * b;
    const segmentFrom = quadraticPoint(from, control, to, a);
    const segmentTo = quadraticPoint(from, control, to, b);
    stroke(segmentFrom, segmentTo, segmentPressure, segmentVelocity, false);
  }

  renderComposite();
}

function renderStrokeReleaseTaper(pressure = 0.5, velocity = 0) {
  const layer = getActiveLayer();
  if (!layer || !layer.visible || state.endTaper <= 0 || state.strokeHistory.length < 2) {
    return;
  }

  // Skip synthetic tail on high-speed lift-offs to prevent needle spikes.
  if (velocity > 18) {
    return;
  }

  const lastEntry = state.strokeHistory[state.strokeHistory.length - 1];
  if (!lastEntry?.point) {
    return;
  }

  // Blend direction from the latest segments to avoid a sharp spike from the final sample.
  const recent = state.strokeHistory.slice(-5);
  let dx = 0;
  let dy = 0;
  let weight = 0;
  let avgStep = 0;
  let stepCount = 0;
  for (let i = 1; i < recent.length; i += 1) {
    const current = recent[i]?.point;
    const previous = recent[i - 1]?.point;
    if (!current || !previous) {
      continue;
    }
    const segDx = current.x - previous.x;
    const segDy = current.y - previous.y;
    const segLength = Math.sqrt(segDx * segDx + segDy * segDy);
    if (segLength < 0.001) {
      continue;
    }
    const segmentWeight = i;
    dx += segDx * segmentWeight;
    dy += segDy * segmentWeight;
    weight += segmentWeight;
    avgStep += segLength;
    stepCount += 1;
  }

  if (weight > 0) {
    dx /= weight;
    dy /= weight;
  }

  if (stepCount > 0) {
    avgStep /= stepCount;
  }

  // Final jump too large means pointer ended abruptly; skip extra tail to avoid spikes.
  if (avgStep > Math.max(2.5, state.size * 0.55)) {
    return;
  }

  const directionLength = Math.sqrt(dx * dx + dy * dy);
  if (directionLength < 0.001) {
    return;
  }

  const ux = dx / directionLength;
  const uy = dy / directionLength;
  const velocityScale = 1 + Math.min(0.35, Math.max(0, velocity) / 120);
  const baseTail = state.size * (0.18 + (state.endTaper / 100) * 0.45) * velocityScale;
  const adaptiveTail = Math.max(0.9, avgStep * 1.1);
  const maxTail = Math.max(2.4, state.size * 1.0);
  const tailLength = Math.min(maxTail, Math.max(1.2, Math.min(baseTail, adaptiveTail)));
  const segmentLength = Math.max(0.8, state.size * Math.max(0.04, state.spacing / 260));
  const segments = Math.max(6, Math.ceil(tailLength / segmentLength));
  const minScale = Math.max(0.03, 1 - state.endTaper / 100);
  const startScale = Math.max(minScale, Math.min(1, state.lastAppliedTaper || 1));

  const smoothstep = (value) => {
    const t = Math.min(1, Math.max(0, value));
    return t * t * (3 - 2 * t);
  };

  const origin = lastEntry.point;
  const layerCtx = layer.ctx;
  layerCtx.save();

  for (let i = 1; i <= segments; i += 1) {
    const a = (i - 1) / segments;
    const b = i / segments;
    const from = {
      x: origin.x + ux * tailLength * a,
      y: origin.y + uy * tailLength * a
    };
    const to = {
      x: origin.x + ux * tailLength * b,
      y: origin.y + uy * tailLength * b
    };
    const taperScale = startScale - smoothstep(b) * (startScale - minScale);

    const tailSegmentLength = tailLength / segments;
    applyBrushStyle(layerCtx, pressure, taperScale, velocity * (1 - b * 0.88), tailSegmentLength);
    layerCtx.lineCap = "round";
    layerCtx.lineJoin = "round";
    const fromPoints = getSymmetryPoints(from);
    const toPoints = getSymmetryPoints(to);
    const pairs = Math.min(fromPoints.length, toPoints.length);

    for (let p = 0; p < pairs; p += 1) {
      layerCtx.beginPath();
      layerCtx.moveTo(fromPoints[p].x, fromPoints[p].y);
      layerCtx.lineTo(toPoints[p].x, toPoints[p].y);
      layerCtx.stroke();
    }
  }

  layerCtx.restore();
  renderComposite();
}

function serializeSnapshot() {
  return {
    activeLayerId: state.activeLayerId,
    layers: state.layers.map((layer) => ({
      id: layer.id,
      name: layer.name,
      visible: layer.visible,
      blendMode: layer.blendMode,
      opacity: layer.opacity,
      clipped: layer.clipped,
      data: layer.canvas.toDataURL("image/png")
    }))
  };
}

function buildProjectPayload() {
  return {
    version: PROJECT_FILE_VERSION,
    snapshot: serializeSnapshot(),
    ui: {
      tool: state.tool,
      preset: state.preset,
      color: state.color,
      size: state.size,
      opacity: state.opacity,
      smoothing: state.smoothing,
      brushMinSize: state.brushMinSize,
      brushMaxSize: state.brushMaxSize,
      brushMinOpacity: state.brushMinOpacity,
      brushMaxOpacity: state.brushMaxOpacity,
      startTaper: state.startTaper,
      endTaper: state.endTaper,
      speedSizeReduction: state.speedSizeReduction,
      spacing: state.spacing,
      jitter: state.jitter,
      interpolation: state.interpolation,
      symmetry: state.symmetry,
      pressureMode: state.pressureMode,
      touchEnabled: state.touchEnabled,
      smoothOpacityStrokes: state.smoothOpacityStrokes,
      zoom: state.zoom,
      rotation: state.rotation,
      flipped: state.flipped,
      flippedVertical: state.flippedVertical,
      panX: state.panX,
      panY: state.panY,
      toolbarCollapsed: state.toolbarCollapsed,
      layersCollapsed: state.layersCollapsed,
      toolsCollapsed: state.toolsCollapsed,
      colorHistory: state.colorHistory
    }
  };
}

function persistDocumentSoon() {
  if (state.autosaveTimer) {
    window.clearTimeout(state.autosaveTimer);
  }

  state.autosaveTimer = window.setTimeout(() => {
    state.autosaveTimer = null;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(buildProjectPayload()));
    } catch {
      // Ignore storage failures.
    }
  }, 240);
}

function loadPersistedDocument() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== PROJECT_FILE_VERSION || !parsed.snapshot || !Array.isArray(parsed.snapshot.layers)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function applyUiState(ui) {
  if (!ui) {
    return;
  }

  state.tool = ["brush", "eraser", "transform", "fill", "blur"].includes(ui.tool) ? ui.tool : "brush";
  state.preset = BRUSH_PRESETS[ui.preset] ? ui.preset : "hard";
  state.color = typeof ui.color === "string" ? ui.color : state.color;
  state.size = typeof ui.size === "number" ? Math.min(100, Math.max(1, ui.size)) : state.size;
  state.opacity = typeof ui.opacity === "number" ? Math.min(1, Math.max(0.01, ui.opacity)) : state.opacity;
  state.smoothing = typeof ui.smoothing === "number" ? Math.min(1, Math.max(0, ui.smoothing)) : state.smoothing;
  state.brushMinSize = typeof ui.brushMinSize === "number" ? Math.min(100, Math.max(0, ui.brushMinSize)) : 0;
  state.brushMaxSize = typeof ui.brushMaxSize === "number" ? Math.min(100, Math.max(1, ui.brushMaxSize)) : 100;
  state.brushMinOpacity = typeof ui.brushMinOpacity === "number" ? Math.min(100, Math.max(1, ui.brushMinOpacity)) : 1;
  state.brushMaxOpacity = typeof ui.brushMaxOpacity === "number" ? Math.min(100, Math.max(1, ui.brushMaxOpacity)) : 100;
  state.startTaper = typeof ui.startTaper === "number" ? Math.min(100, Math.max(0, ui.startTaper)) : 0;
  state.endTaper = typeof ui.endTaper === "number" ? Math.min(100, Math.max(0, ui.endTaper)) : 0;
  state.speedSizeReduction = typeof ui.speedSizeReduction === "number" ? Math.min(100, Math.max(0, ui.speedSizeReduction)) : 0;
  state.spacing = typeof ui.spacing === "number" ? Math.min(100, Math.max(1, ui.spacing)) : 16;
  state.jitter = typeof ui.jitter === "number" ? Math.min(100, Math.max(0, ui.jitter)) : 0;
  state.interpolation = typeof ui.interpolation === "number" ? Math.min(300, Math.max(50, ui.interpolation)) : 100;
  state.symmetry = ["off", "vertical", "horizontal", "both"].includes(ui.symmetry) ? ui.symmetry : "off";
  state.pressureMode = ["off", "size", "opacity", "both"].includes(ui.pressureMode) ? ui.pressureMode : "off";
  state.touchEnabled = typeof ui.touchEnabled === "boolean" ? ui.touchEnabled : true;
  state.smoothOpacityStrokes = typeof ui.smoothOpacityStrokes === "boolean" ? ui.smoothOpacityStrokes : true;
  state.zoom = typeof ui.zoom === "number" ? Math.min(4, Math.max(0.2, ui.zoom)) : 1;
  state.rotation = typeof ui.rotation === "number" ? Math.min(180, Math.max(-180, ui.rotation)) : 0;
  state.flipped = typeof ui.flipped === "boolean" ? ui.flipped : false;
  state.flippedVertical = typeof ui.flippedVertical === "boolean" ? ui.flippedVertical : false;
  state.panX = typeof ui.panX === "number" ? ui.panX : 0;
  state.panY = typeof ui.panY === "number" ? ui.panY : 0;
  state.toolbarCollapsed = typeof ui.toolbarCollapsed === "boolean" ? ui.toolbarCollapsed : false;
  state.layersCollapsed = typeof ui.layersCollapsed === "boolean" ? ui.layersCollapsed : false;
  state.toolsCollapsed = typeof ui.toolsCollapsed === "boolean" ? ui.toolsCollapsed : false;
  state.colorHistory = Array.isArray(ui.colorHistory) ? ui.colorHistory.slice(0, 10) : [];
  enforceBrushLimits();
}

function syncUiControlsFromState() {
  if (colorPicker) {
    colorPicker.value = state.color;
  }
  presetSelect.value = state.preset;
  sizeInput.value = String(state.size);
  sizeValue.textContent = String(state.size);
  if (brushMinSizeInput) {
    brushMinSizeInput.value = String(state.brushMinSize);
  }
  if (brushMinSizeValue) {
    brushMinSizeValue.textContent = `${state.brushMinSize}px`;
  }
  if (brushMaxSizeInput) {
    brushMaxSizeInput.value = String(state.brushMaxSize);
  }
  if (brushMaxSizeValue) {
    brushMaxSizeValue.textContent = `${state.brushMaxSize}px`;
  }
  if (brushMinOpacityInput) {
    brushMinOpacityInput.value = String(state.brushMinOpacity);
  }
  if (brushMinOpacityValue) {
    brushMinOpacityValue.textContent = `${state.brushMinOpacity}%`;
  }
  if (brushMaxOpacityInput) {
    brushMaxOpacityInput.value = String(state.brushMaxOpacity);
  }
  if (brushMaxOpacityValue) {
    brushMaxOpacityValue.textContent = `${state.brushMaxOpacity}%`;
  }
  opacityInput.value = String(Math.round(state.opacity * 100));
  opacityValue.textContent = `${Math.round(state.opacity * 100)}%`;
  if (startTaperInput) {
    startTaperInput.value = String(state.startTaper);
  }
  if (startTaperValue) {
    startTaperValue.textContent = `${state.startTaper}%`;
  }
  if (endTaperInput) {
    endTaperInput.value = String(state.endTaper);
  }
  if (endTaperValue) {
    endTaperValue.textContent = `${state.endTaper}%`;
  }
  if (speedSizeReductionInput) {
    speedSizeReductionInput.value = String(state.speedSizeReduction);
  }
  if (speedSizeReductionValue) {
    speedSizeReductionValue.textContent = `${state.speedSizeReduction}%`;
  }
  if (spacingInput) {
    spacingInput.value = String(state.spacing);
  }
  if (spacingValue) {
    spacingValue.textContent = `${state.spacing}%`;
  }
  if (jitterInput) {
    jitterInput.value = String(state.jitter);
  }
  if (jitterValue) {
    jitterValue.textContent = `${state.jitter}%`;
  }
  if (interpolationInput) {
    interpolationInput.value = String(state.interpolation);
  }
  if (interpolationValue) {
    interpolationValue.textContent = `${state.interpolation}%`;
  }
  if (stabilizerInput) {
    stabilizerInput.value = String(Math.round(state.smoothing * 100));
  }
  if (stabilizerValue) {
    stabilizerValue.textContent = `${Math.round(state.smoothing * 100)}%`;
  }
  symmetrySelect.value = state.symmetry;
  if (pressureModeSelect) {
    pressureModeSelect.value = state.pressureMode;
  }
  updateTouchToggleButton();
  updateSmoothOpacityToggleButton();
  updateFlipToggleButton();
  updatePanelStates();
  setTool(state.tool);
  updateLayerControls();
  updateLayerSelect();
  updateViewportTransform();
  updateStatus();
}

async function loadProjectPayload(payload) {
  if (!payload || payload.version !== PROJECT_FILE_VERSION || !payload.snapshot || !Array.isArray(payload.snapshot.layers)) {
    throw new Error("Invalid project file format.");
  }

  applyUiState(payload.ui);
  await applySnapshot(payload.snapshot);
  syncUiControlsFromState();
  updateColorHistoryUI();
  state.history = [serializeSnapshot()];
  state.future = [];
  persistDocumentSoon();
}

async function saveProjectFile() {
  const jsonContent = JSON.stringify(buildProjectPayload(), null, 2);

  // Try to use File System Access API for writable handle
  if (window.showSaveFilePicker) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: state.currentProjectFilename || `ark-project-${Date.now()}.json`,
        types: [{
          description: "ARK Painter Project",
          accept: { "application/json": [".json"] }
        }]
      });
      
      const writable = await handle.createWritable();
      await writable.write(jsonContent);
      await writable.close();
      
      state.currentProjectFileHandle = handle;
      state.currentProjectFilename = handle.name;
      markAsSaved();
      logDiagnostic("Project saved via File System Access API with writable handle");
      return;
    } catch (err) {
      if (err.name !== "AbortError") {
        logDiagnostic("showSaveFilePicker failed: " + err.message);
      }
      // User cancelled or error, will fall through to download
      return;
    }
  }

  // Fallback: use download API (no writable handle)
  const blob = new Blob([jsonContent], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ark-project-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
  logDiagnostic("Project saved via download API (no writable handle)");
  markAsSaved();
}

async function quickSaveProjectFile() {
  if (!state.currentProjectFilename) {
    window.alert("No project loaded. Please load a project first, or use Save Project to create a new one.");
    return;
  }

  const jsonContent = JSON.stringify(buildProjectPayload(), null, 2);

  // Try to use File System Access API if available and we have a handle
  if (state.currentProjectFileHandle && "createWritable" in state.currentProjectFileHandle) {
    try {
      const writable = await state.currentProjectFileHandle.createWritable();
      await writable.write(jsonContent);
      await writable.close();
      logDiagnostic("Quick saved via File System Access API (no dialog)");
      markAsSaved();
      return;
    } catch (err) {
      logDiagnostic("File System Access write failed, falling back to download");
    }
  }

  // Fallback: Try to get a writable handle using showSaveFilePicker
  if (window.showSaveFilePicker) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: state.currentProjectFilename,
        types: [{
          description: "ARK Painter Project",
          accept: { "application/json": [".json"] }
        }]
      });
      const writable = await handle.createWritable();
      await writable.write(jsonContent);
      await writable.close();
      state.currentProjectFileHandle = handle;
      state.currentProjectFilename = handle.name;
      logDiagnostic("Quick saved via File System Access API with save dialog");
      markAsSaved();
      return;
    } catch (err) {
      if (err.name !== "AbortError") {
        logDiagnostic("showSaveFilePicker failed: " + err.message);
      }
      // User cancelled or error, will fall through to download
    }
  }

  // Final fallback: use download API
  const blob = new Blob([jsonContent], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = state.currentProjectFilename;
  link.click();
  URL.revokeObjectURL(url);
  logDiagnostic("Quick saved via download API (browser save dialog)");
  markAsSaved();
}

async function loadProjectWithHandle() {
  // Try to use File System Access API for writable handle
  if (window.showOpenFilePicker) {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [{
          description: "ARK Painter Project",
          accept: { "application/json": [".json"] }
        }],
        multiple: false
      });
      
      const file = await handle.getFile();
      const text = await file.text();
      const payload = JSON.parse(text);
      
      state.currentProjectFileHandle = handle;
      state.currentProjectFilename = handle.name;
      await loadProjectPayload(payload);
      markAsSaved();
      logDiagnostic("Project loaded via File System Access API with writable handle");
      return;
    } catch (err) {
      if (err.name !== "AbortError") {
        logDiagnostic("showOpenFilePicker failed: " + err.message);
        window.alert("Could not load project file. Please choose a valid ARK Painter JSON file.");
      }
      return;
    }
  }
  
  // Fallback: use traditional file input
  loadProjectInput.click();
}

async function handleProjectFileSelect(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    const payload = JSON.parse(text);
    state.currentProjectFilename = file.name;
    state.currentProjectFileHandle = null; // No writable handle from input
    await loadProjectPayload(payload);
    markAsSaved();
    logDiagnostic("Project loaded via file input (no writable handle)");
  } catch {
    window.alert("Could not load project file. Please choose a valid ARK Painter JSON file.");
  } finally {
    event.target.value = "";
  }
}

function newCanvas() {
  state.layers = [];
  state.nextLayerId = 1;
  state.activeLayerId = null;
  state.zoom = 1;
  state.panX = 0;
  state.panY = 0;
  state.currentProjectFilename = null;
  state.currentProjectFileHandle = null;
  clearAutoSave();

  const firstLayer = createLayer("Layer 1");
  state.layers.push(firstLayer);
  state.activeLayerId = firstLayer.id;

  updateLayerSelect();
  updateLayerControls();
  updateViewportTransform();
  renderComposite();

  state.history = [serializeSnapshot()];
  state.future = [];

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures.
  }

  persistDocumentSoon();
  updateStatus();
  markAsUnsaved();
}

async function applySnapshot(snapshot) {
  const oldActive = snapshot.activeLayerId;
  state.layers = [];

  for (const incomingLayer of snapshot.layers) {
    const layer = createLayer(incomingLayer.name);
    layer.id = incomingLayer.id;
    layer.visible = incomingLayer.visible;
    layer.blendMode = incomingLayer.blendMode || "source-over";
    layer.opacity = typeof incomingLayer.opacity === "number" ? incomingLayer.opacity : 1;
    layer.clipped = Boolean(incomingLayer.clipped);

    const img = new Image();
    await new Promise((resolve) => {
      img.onload = resolve;
      img.src = incomingLayer.data;
    });

    layer.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    layer.ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    state.layers.push(layer);
  }

  const idNumbers = state.layers
    .map((layer) => Number(layer.id.replace("layer-", "")))
    .filter((value) => !Number.isNaN(value));
  state.nextLayerId = idNumbers.length ? Math.max(...idNumbers) + 1 : 1;
  state.activeLayerId = state.layers.some((layer) => layer.id === oldActive)
    ? oldActive
    : state.layers[0].id;

  updateLayerSelect();
  updateLayerControls();
  renderComposite();
  updateStatus();
}

function snapshotHistory() {
  state.history.push(serializeSnapshot());
  if (state.history.length > state.maxHistory) {
    state.history.shift();
  }
  state.future = [];
  persistDocumentSoon();
  markAsUnsaved();
}

function markAsUnsaved() {
  state.hasUnsavedChanges = true;
  updateSaveStatus();
  scheduleAutoSave();
}

function markAsSaved() {
  state.hasUnsavedChanges = false;
  updateSaveStatus();
  clearAutoSave();
}

function scheduleAutoSave() {
  // Clear any existing autosave timer
  if (state.autoSaveToFileTimer) {
    window.clearTimeout(state.autoSaveToFileTimer);
  }

  // Only schedule autosave if we have a file handle
  if (state.currentProjectFileHandle) {
    state.autoSaveToFileTimer = window.setTimeout(() => {
      state.autoSaveToFileTimer = null;
      void performAutoSave();
    }, 300000); // 5 minutes = 300000ms
    logDiagnostic("Autosave scheduled for 5 minutes");
  }
}

function clearAutoSave() {
  if (state.autoSaveToFileTimer) {
    window.clearTimeout(state.autoSaveToFileTimer);
    state.autoSaveToFileTimer = null;
    logDiagnostic("Autosave timer cleared");
  }
}

async function performAutoSave() {
  if (!state.hasUnsavedChanges || !state.currentProjectFileHandle) {
    return;
  }

  const jsonContent = JSON.stringify(buildProjectPayload(), null, 2);

  try {
    const writable = await state.currentProjectFileHandle.createWritable();
    await writable.write(jsonContent);
    await writable.close();
    markAsSaved();
    logDiagnostic("Auto-saved successfully");
    
    // Show brief notification
    if (saveStatusElement) {
      const originalText = saveStatusElement.textContent;
      saveStatusElement.textContent = "Auto-Saved!";
      saveStatusElement.className = "save-status saved";
      window.setTimeout(() => {
        if (saveStatusElement.textContent === "Auto-Saved!") {
          saveStatusElement.textContent = "Saved";
        }
      }, 2000);
    }
  } catch (err) {
    logDiagnostic("Auto-save failed: " + err.message);
  }
}

function updateSaveStatus() {
  if (!saveStatusElement) return;
  
  if (state.hasUnsavedChanges) {
    saveStatusElement.textContent = "Unsaved Changes";
    saveStatusElement.className = "save-status unsaved";
  } else {
    saveStatusElement.textContent = "Saved";
    saveStatusElement.className = "save-status saved";
  }
}

function addColorToHistory(color) {
  // Remove if already exists
  const index = state.colorHistory.indexOf(color);
  if (index !== -1) {
    state.colorHistory.splice(index, 1);
  }
  
  // Add to front
  state.colorHistory.unshift(color);
  
  // Keep only last 10
  if (state.colorHistory.length > 10) {
    state.colorHistory = state.colorHistory.slice(0, 10);
  }
  
  updateColorHistoryUI();
}

function updateColorHistoryUI() {
  if (!colorHistoryContainer) return;
  
  colorHistoryContainer.innerHTML = "";
  console.log('Updating color history UI with', state.colorHistory.length, 'colors:', state.colorHistory);
  
  state.colorHistory.forEach(color => {
    const swatch = document.createElement("button");
    swatch.className = "color-swatch";
    swatch.style.backgroundColor = color;
    swatch.title = color;
    swatch.type = "button";
    swatch.addEventListener("click", (e) => {
      e.preventDefault();
      console.log('Swatch clicked:', color);
      state.color = color;
      if (colorPicker) {
        colorPicker.value = color;
        console.log('Updated color picker to:', color);
      } else {
        console.error('Color picker not available to update');
      }
      updateStatus();
      markAsUnsaved();
      persistDocumentSoon();
    });
    colorHistoryContainer.appendChild(swatch);
  });
}

async function undo() {
  if (state.history.length <= 1) {
    return;
  }

  const current = state.history.pop();
  state.future.push(current);
  const previous = state.history[state.history.length - 1];
  await applySnapshot(previous);
  persistDocumentSoon();
}

async function redo() {
  if (state.future.length === 0) {
    return;
  }

  const next = state.future.pop();
  state.history.push(next);
  await applySnapshot(next);
  persistDocumentSoon();
}

function clearActiveLayer() {
  const layer = getActiveLayer();
  if (!layer) {
    return;
  }

  layer.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  renderComposite();
  snapshotHistory();
}

function exportCanvas() {
  const exportCanvasElement = document.createElement("canvas");
  exportCanvasElement.width = CANVAS_WIDTH;
  exportCanvasElement.height = CANVAS_HEIGHT;
  const exportCtx = exportCanvasElement.getContext("2d", { alpha: false });

  exportCtx.fillStyle = "#ffffff";
  exportCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  state.layers.forEach((layer, index) => {
    if (layer.visible) {
      drawLayerToTarget(exportCtx, layer, index);
    }
  });

  const url = exportCanvasElement.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = url;
  link.download = `ark-painting-${Date.now()}.png`;
  link.click();
}

function shouldPan(event) {
  return state.spacePressed || event.button === 1;
}

function getEventPressure(event) {
  // Mouse has no real pressure, so keep it at full pressure for predictable size.
  if (event.pointerType === "mouse") {
    return 1;
  }

  if (event.pointerType === "pen") {
    if (typeof event.pressure === "number" && Number.isFinite(event.pressure)) {
      const penPressure = Math.min(1, Math.max(0, event.pressure));

      // Some tablet drivers briefly report 0 while the pen is still in contact.
      // Reuse last known pressure (or a tiny floor) so stroke start is not lost.
      if (penPressure === 0 && event.buttons !== 0) {
        return Math.max(0.01, Math.min(1, state.currentPressure || 0.01));
      }

      return penPressure;
    }

    return Math.max(0.01, Math.min(1, state.currentPressure || 0.01));
  }

  if (typeof event.pressure === "number" && Number.isFinite(event.pressure)) {
    return Math.min(1, Math.max(0, event.pressure));
  }

  return state.currentPressure;
}

function parseHexColor(hex) {
  const normalized = typeof hex === "string" ? hex.replace("#", "") : "000000";
  if (normalized.length !== 6) {
    return { r: 0, g: 0, b: 0 };
  }

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16)
  };
}

function floodFillAt(point) {
  const layer = getActiveLayer();
  if (!layer || !layer.visible) {
    return;
  }

  const width = layer.canvas.width;
  const height = layer.canvas.height;
  const x = Math.max(0, Math.min(width - 1, Math.round(point.x)));
  const y = Math.max(0, Math.min(height - 1, Math.round(point.y)));
  const imageData = layer.ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const startIndex = (y * width + x) * 4;

  const targetR = data[startIndex];
  const targetG = data[startIndex + 1];
  const targetB = data[startIndex + 2];
  const targetA = data[startIndex + 3];

  const fillRgb = parseHexColor(state.color);
  const fillA = Math.round(Math.min(1, Math.max(0, state.opacity)) * 255);

  if (targetR === fillRgb.r && targetG === fillRgb.g && targetB === fillRgb.b && targetA === fillA) {
    return;
  }

  const tolerance = 8;
  const stack = [x, y];
  while (stack.length > 0) {
    const cy = stack.pop();
    const cx = stack.pop();
    const idx = (cy * width + cx) * 4;

    const dr = Math.abs(data[idx] - targetR);
    const dg = Math.abs(data[idx + 1] - targetG);
    const db = Math.abs(data[idx + 2] - targetB);
    const da = Math.abs(data[idx + 3] - targetA);
    if (dr > tolerance || dg > tolerance || db > tolerance || da > tolerance) {
      continue;
    }

    data[idx] = fillRgb.r;
    data[idx + 1] = fillRgb.g;
    data[idx + 2] = fillRgb.b;
    data[idx + 3] = fillA;

    if (cx > 0) {
      stack.push(cx - 1, cy);
    }
    if (cx < width - 1) {
      stack.push(cx + 1, cy);
    }
    if (cy > 0) {
      stack.push(cx, cy - 1);
    }
    if (cy < height - 1) {
      stack.push(cx, cy + 1);
    }
  }

  layer.ctx.putImageData(imageData, 0, 0);
}

function blurImageDataRgba(imageData, radius) {
  const width = imageData.width;
  const height = imageData.height;
  const src = imageData.data;
  const r = Math.max(1, Math.min(20, Math.round(radius)));

  const tmpPr = new Float32Array(width * height);
  const tmpPg = new Float32Array(width * height);
  const tmpPb = new Float32Array(width * height);
  const tmpA = new Float32Array(width * height);

  // Horizontal pass (premultiplied RGBA).
  for (let y = 0; y < height; y += 1) {
    let sumPr = 0;
    let sumPg = 0;
    let sumPb = 0;
    let sumA = 0;
    let count = 0;

    for (let ix = -r; ix <= r; ix += 1) {
      const sx = Math.min(width - 1, Math.max(0, ix));
      const sidx = (y * width + sx) * 4;
      const a = src[sidx + 3] / 255;
      sumPr += (src[sidx] / 255) * a;
      sumPg += (src[sidx + 1] / 255) * a;
      sumPb += (src[sidx + 2] / 255) * a;
      sumA += a;
      count += 1;
    }

    for (let x = 0; x < width; x += 1) {
      const tidx = y * width + x;
      tmpPr[tidx] = sumPr / count;
      tmpPg[tidx] = sumPg / count;
      tmpPb[tidx] = sumPb / count;
      tmpA[tidx] = sumA / count;

      const removeX = Math.min(width - 1, Math.max(0, x - r));
      const addX = Math.min(width - 1, Math.max(0, x + r + 1));
      const ridx = (y * width + removeX) * 4;
      const aidx = (y * width + addX) * 4;
      const removeA = src[ridx + 3] / 255;
      const addA = src[aidx + 3] / 255;

      sumPr -= (src[ridx] / 255) * removeA;
      sumPg -= (src[ridx + 1] / 255) * removeA;
      sumPb -= (src[ridx + 2] / 255) * removeA;
      sumA -= removeA;

      sumPr += (src[aidx] / 255) * addA;
      sumPg += (src[aidx + 1] / 255) * addA;
      sumPb += (src[aidx + 2] / 255) * addA;
      sumA += addA;
    }
  }

  // Vertical pass (premultiplied RGBA), then unpremultiply.
  const out = new Uint8ClampedArray(src.length);
  for (let x = 0; x < width; x += 1) {
    let sumPr = 0;
    let sumPg = 0;
    let sumPb = 0;
    let sumA = 0;
    let count = 0;

    for (let iy = -r; iy <= r; iy += 1) {
      const sy = Math.min(height - 1, Math.max(0, iy));
      const sidx = sy * width + x;
      sumPr += tmpPr[sidx];
      sumPg += tmpPg[sidx];
      sumPb += tmpPb[sidx];
      sumA += tmpA[sidx];
      count += 1;
    }

    for (let y = 0; y < height; y += 1) {
      const didx = (y * width + x) * 4;
      const avgPr = sumPr / count;
      const avgPg = sumPg / count;
      const avgPb = sumPb / count;
      const avgA = Math.min(1, Math.max(0, sumA / count));

      if (avgA > 0.000001) {
        out[didx] = Math.round((avgPr / avgA) * 255);
        out[didx + 1] = Math.round((avgPg / avgA) * 255);
        out[didx + 2] = Math.round((avgPb / avgA) * 255);
      } else {
        out[didx] = 0;
        out[didx + 1] = 0;
        out[didx + 2] = 0;
      }
      out[didx + 3] = Math.round(avgA * 255);

      const removeY = Math.min(height - 1, Math.max(0, y - r));
      const addY = Math.min(height - 1, Math.max(0, y + r + 1));
      const ridx = removeY * width + x;
      const aidx = addY * width + x;
      sumPr -= tmpPr[ridx];
      sumPg -= tmpPg[ridx];
      sumPb -= tmpPb[ridx];
      sumA -= tmpA[ridx];
      sumPr += tmpPr[aidx];
      sumPg += tmpPg[aidx];
      sumPb += tmpPb[aidx];
      sumA += tmpA[aidx];
    }
  }

  return out;
}

function blurStamp(point, renderNow = true) {
  const layer = getActiveLayer();
  if (!layer || !layer.visible) {
    return;
  }

  const radius = Math.max(1.25, state.size * 0.62);
  const sampleRadius = Math.ceil(Math.min(96, radius * 2.4));
  const left = Math.max(0, Math.floor(point.x - sampleRadius));
  const top = Math.max(0, Math.floor(point.y - sampleRadius));
  const right = Math.min(CANVAS_WIDTH, Math.ceil(point.x + sampleRadius));
  const bottom = Math.min(CANVAS_HEIGHT, Math.ceil(point.y + sampleRadius));
  const width = Math.max(1, right - left);
  const height = Math.max(1, bottom - top);

  const source = layer.ctx.getImageData(left, top, width, height);
  const original = source.data;
  const blurred = blurImageDataRgba(source, Math.max(1, state.size * 0.12));
  const centerX = point.x - left;
  const centerY = point.y - top;
  const strength = Math.min(1, Math.max(0.05, state.opacity));

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > radius) {
        continue;
      }

      const falloff = 1 - dist / Math.max(0.0001, radius);
      const localStrength = strength * falloff * falloff;
      const idx = (y * width + x) * 4;

      original[idx] += (blurred[idx] - original[idx]) * localStrength;
      original[idx + 1] += (blurred[idx + 1] - original[idx + 1]) * localStrength;
      original[idx + 2] += (blurred[idx + 2] - original[idx + 2]) * localStrength;
      original[idx + 3] += (blurred[idx + 3] - original[idx + 3]) * localStrength;
    }
  }

  layer.ctx.putImageData(source, left, top);

  if (renderNow) {
    renderComposite();
  }
}

function blurInterpolated(from, to, density = 1) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const stepPixels = Math.max(0.45, Math.max(1.2, state.size * 0.18) / Math.max(1, density));
  const segments = Math.max(1, Math.ceil(distance / stepPixels));

  for (let i = 1; i <= segments; i += 1) {
    const t = i / segments;
    const segmentPoint = interpolatePoint(from, to, t);
    const points = getSymmetryPoints(segmentPoint);
    points.forEach((entry) => blurStamp(entry, false));
  }

  renderComposite();
}

function clearTransformState() {
  state.transformSelection = null;
  state.transformBufferCanvas = null;
  state.transformBaseCanvas = null;
  state.transformMode = "idle";
  state.transformDraftStart = null;
  state.transformDraftCurrent = null;
  state.transformAction = null;
  state.transformDirty = false;
}

function normalizeSelectionRect(from, to) {
  const x = Math.min(from.x, to.x);
  const y = Math.min(from.y, to.y);
  const width = Math.abs(to.x - from.x);
  const height = Math.abs(to.y - from.y);
  return { x, y, width, height };
}

function ensureTransformBuffers() {
  const layer = getActiveLayer();
  const selection = state.transformSelection;
  if (!layer || !selection) {
    return false;
  }

  if (state.transformBufferCanvas && state.transformBaseCanvas) {
    return true;
  }

  const sourceX = Math.round(selection.sourceRect.x);
  const sourceY = Math.round(selection.sourceRect.y);
  const sourceW = Math.max(1, Math.round(selection.sourceRect.width));
  const sourceH = Math.max(1, Math.round(selection.sourceRect.height));

  const buffer = document.createElement("canvas");
  buffer.width = sourceW;
  buffer.height = sourceH;
  const bufferCtx = buffer.getContext("2d", { alpha: true });
  bufferCtx.drawImage(layer.canvas, sourceX, sourceY, sourceW, sourceH, 0, 0, sourceW, sourceH);

  const base = document.createElement("canvas");
  base.width = CANVAS_WIDTH;
  base.height = CANVAS_HEIGHT;
  const baseCtx = base.getContext("2d", { alpha: true });
  baseCtx.drawImage(layer.canvas, 0, 0);
  baseCtx.clearRect(sourceX, sourceY, sourceW, sourceH);

  state.transformBufferCanvas = buffer;
  state.transformBaseCanvas = base;
  return true;
}

function transformLocalToWorld(localX, localY, selection) {
  const sx = localX * selection.scaleX;
  const sy = localY * selection.scaleY;
  const cosR = Math.cos(selection.rotation);
  const sinR = Math.sin(selection.rotation);
  return {
    x: selection.centerX + sx * cosR - sy * sinR,
    y: selection.centerY + sx * sinR + sy * cosR
  };
}

function transformWorldToLocal(point, selection) {
  const cosR = Math.cos(-selection.rotation);
  const sinR = Math.sin(-selection.rotation);
  const dx = point.x - selection.centerX;
  const dy = point.y - selection.centerY;
  const rx = dx * cosR - dy * sinR;
  const ry = dx * sinR + dy * cosR;
  return {
    x: rx / Math.max(0.0001, selection.scaleX),
    y: ry / Math.max(0.0001, selection.scaleY)
  };
}

function getTransformGeometry(selection) {
  if (!selection) {
    return null;
  }

  const halfW = selection.sourceRect.width / 2;
  const halfH = selection.sourceRect.height / 2;
  const corners = {
    nw: transformLocalToWorld(-halfW, -halfH, selection),
    ne: transformLocalToWorld(halfW, -halfH, selection),
    se: transformLocalToWorld(halfW, halfH, selection),
    sw: transformLocalToWorld(-halfW, halfH, selection)
  };
  const edgeHandles = {
    n: transformLocalToWorld(0, -halfH, selection),
    e: transformLocalToWorld(halfW, 0, selection),
    s: transformLocalToWorld(0, halfH, selection),
    w: transformLocalToWorld(-halfW, 0, selection)
  };
  const rotateHandle = transformLocalToWorld(0, -halfH - TRANSFORM_ROTATE_HANDLE_OFFSET, selection);
  return { corners, edgeHandles, rotateHandle };
}

function detectTransformHit(point) {
  const selection = state.transformSelection;
  if (!selection) {
    return { type: "none" };
  }

  const geometry = getTransformGeometry(selection);
  if (!geometry) {
    return { type: "none" };
  }

  const handlePoints = {
    ...geometry.corners,
    ...geometry.edgeHandles
  };
  const handles = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
  for (const handle of handles) {
    const hp = handlePoints[handle];
    const dx = point.x - hp.x;
    const dy = point.y - hp.y;
    if (Math.sqrt(dx * dx + dy * dy) <= TRANSFORM_HANDLE_RADIUS + 2) {
      return { type: "scale", handle };
    }
  }

  const rdx = point.x - geometry.rotateHandle.x;
  const rdy = point.y - geometry.rotateHandle.y;
  if (Math.sqrt(rdx * rdx + rdy * rdy) <= TRANSFORM_HANDLE_RADIUS + 2) {
    return { type: "rotate" };
  }

  const local = transformWorldToLocal(point, selection);
  const halfW = selection.sourceRect.width / 2;
  const halfH = selection.sourceRect.height / 2;
  if (Math.abs(local.x) <= halfW && Math.abs(local.y) <= halfH) {
    return { type: "move" };
  }

  return { type: "none" };
}

function getTransformCursor(hit) {
  const dotCursor = "url(\\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6' viewBox='0 0 6 6'%3E%3Ccircle cx='3' cy='3' r='1.4' fill='%23000000'/%3E%3C/svg%3E\\\") 3 3, auto";
  
  if (hit.type === "rotate") {
    return "crosshair";
  }
  if (hit.type === "move") {
    return "move";
  }
  if (hit.type === "scale") {
    const cursorMap = {
      nw: "nwse-resize",
      n: "ns-resize",
      ne: "nesw-resize",
      e: "ew-resize",
      se: "nwse-resize",
      s: "ns-resize",
      sw: "nesw-resize",
      w: "ew-resize"
    };
    return cursorMap[hit.handle] || dotCursor;
  }
  return dotCursor;
}

function renderTransformSelection() {
  const layer = getActiveLayer();
  const selection = state.transformSelection;
  if (!layer || !selection || !ensureTransformBuffers()) {
    return;
  }

  layer.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  layer.ctx.drawImage(state.transformBaseCanvas, 0, 0);
  layer.ctx.save();
  layer.ctx.translate(selection.centerX, selection.centerY);
  layer.ctx.rotate(selection.rotation);
  layer.ctx.scale(selection.scaleX, selection.scaleY);
  layer.ctx.drawImage(
    state.transformBufferCanvas,
    -selection.sourceRect.width / 2,
    -selection.sourceRect.height / 2,
    selection.sourceRect.width,
    selection.sourceRect.height
  );
  layer.ctx.restore();
  renderComposite();
}

function beginTransformSelection(point) {
  clearTransformState();
  state.transformMode = "selecting";
  state.transformDraftStart = point;
  state.transformDraftCurrent = point;
  renderComposite();
}

function updateTransformSelection(point) {
  if (state.transformMode !== "selecting") {
    return;
  }
  state.transformDraftCurrent = point;
  renderComposite();
}

function finalizeTransformSelection() {
  if (state.transformMode !== "selecting" || !state.transformDraftStart || !state.transformDraftCurrent) {
    clearTransformState();
    renderComposite();
    return;
  }

  const rect = normalizeSelectionRect(state.transformDraftStart, state.transformDraftCurrent);
  if (rect.width < TRANSFORM_MIN_SELECTION || rect.height < TRANSFORM_MIN_SELECTION) {
    clearTransformState();
    renderComposite();
    return;
  }

  state.transformSelection = {
    sourceRect: rect,
    centerX: rect.x + rect.width / 2,
    centerY: rect.y + rect.height / 2,
    scaleX: 1,
    scaleY: 1,
    rotation: 0
  };
  state.transformMode = "ready";
  state.transformDraftStart = null;
  state.transformDraftCurrent = null;
  ensureTransformBuffers();
  renderComposite();
}

function beginTransformAction(point, hit) {
  if (!state.transformSelection) {
    return;
  }

  if (!ensureTransformBuffers()) {
    return;
  }

  const selection = state.transformSelection;
  state.transformMode = "transforming";
  state.transformDirty = false;
  state.transformAction = {
    type: hit.type,
    handle: hit.handle || null,
    startPoint: point,
    startCenterX: selection.centerX,
    startCenterY: selection.centerY,
    startScaleX: selection.scaleX,
    startScaleY: selection.scaleY,
    startRotation: selection.rotation,
    moveOffsetX: point.x - selection.centerX,
    moveOffsetY: point.y - selection.centerY,
    rotateOffset: Math.atan2(point.y - selection.centerY, point.x - selection.centerX) - selection.rotation
  };
}

function updateTransformAction(point, constrainProportions = false) {
  const selection = state.transformSelection;
  const action = state.transformAction;
  if (!selection || !action) {
    return;
  }

  if (action.type === "move") {
    selection.centerX = point.x - action.moveOffsetX;
    selection.centerY = point.y - action.moveOffsetY;
    state.transformDirty = true;
  } else if (action.type === "rotate") {
    const angle = Math.atan2(point.y - selection.centerY, point.x - selection.centerX);
    const unsnapped = angle - action.rotateOffset;
    const snapStep = Math.PI / 12;
    selection.rotation = Math.round(unsnapped / snapStep) * snapStep;
    state.transformDirty = true;
  } else if (action.type === "scale") {
    const local = transformWorldToLocal(point, {
      ...selection,
      rotation: action.startRotation,
      scaleX: 1,
      scaleY: 1
    });
    const halfW = selection.sourceRect.width / 2;
    const halfH = selection.sourceRect.height / 2;
    const handle = action.handle || "se";

    let nextScaleX = action.startScaleX;
    let nextScaleY = action.startScaleY;

    if (handle.includes("e") || handle.includes("w")) {
      nextScaleX = Math.max(TRANSFORM_MIN_SCALE, Math.abs(local.x) / Math.max(0.001, halfW));
    }

    if (handle.includes("n") || handle.includes("s")) {
      nextScaleY = Math.max(TRANSFORM_MIN_SCALE, Math.abs(local.y) / Math.max(0.001, halfH));
    }

    if (constrainProportions) {
      if (handle === "n" || handle === "s") {
        nextScaleX = nextScaleY;
      } else if (handle === "e" || handle === "w") {
        nextScaleY = nextScaleX;
      } else {
        const uniform = Math.max(nextScaleX, nextScaleY);
        nextScaleX = uniform;
        nextScaleY = uniform;
      }
    }

    selection.scaleX = Math.max(TRANSFORM_MIN_SCALE, nextScaleX);
    selection.scaleY = Math.max(TRANSFORM_MIN_SCALE, nextScaleY);
    selection.rotation = action.startRotation;
    state.transformDirty = true;
  }

  renderTransformSelection();
}

function endTransformAction() {
  if (state.transformMode === "transforming") {
    state.transformMode = "ready";
  }
  state.transformAction = null;
}

function drawTransformOverlay() {
  const selection = state.transformSelection;

  if (state.tool === "transform" && state.transformMode === "selecting" && state.transformDraftStart && state.transformDraftCurrent) {
    const rect = normalizeSelectionRect(state.transformDraftStart, state.transformDraftCurrent);
    guideCtx.save();
    guideCtx.strokeStyle = "rgba(242, 107, 29, 0.95)";
    guideCtx.lineWidth = 1.5;
    guideCtx.setLineDash([6, 4]);
    guideCtx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    guideCtx.restore();
    return;
  }

  if (state.tool !== "transform" || !selection) {
    return;
  }

  const geometry = getTransformGeometry(selection);
  if (!geometry) {
    return;
  }

  const { corners, edgeHandles, rotateHandle } = geometry;

  guideCtx.save();
  guideCtx.strokeStyle = "rgba(242, 107, 29, 0.95)";
  guideCtx.lineWidth = 1.5;
  guideCtx.setLineDash([6, 4]);
  guideCtx.beginPath();
  guideCtx.moveTo(corners.nw.x, corners.nw.y);
  guideCtx.lineTo(corners.ne.x, corners.ne.y);
  guideCtx.lineTo(corners.se.x, corners.se.y);
  guideCtx.lineTo(corners.sw.x, corners.sw.y);
  guideCtx.closePath();
  guideCtx.stroke();

  const topCenter = {
    x: (corners.nw.x + corners.ne.x) / 2,
    y: (corners.nw.y + corners.ne.y) / 2
  };

  guideCtx.setLineDash([]);
  guideCtx.beginPath();
  guideCtx.moveTo(topCenter.x, topCenter.y);
  guideCtx.lineTo(rotateHandle.x, rotateHandle.y);
  guideCtx.stroke();

  guideCtx.fillStyle = "#f26b1d";
  for (const point of [corners.nw, corners.ne, corners.se, corners.sw]) {
    guideCtx.beginPath();
    guideCtx.arc(point.x, point.y, TRANSFORM_HANDLE_RADIUS * 0.65, 0, Math.PI * 2);
    guideCtx.fill();
  }

  guideCtx.fillStyle = "#f79b4a";
  for (const point of [edgeHandles.n, edgeHandles.e, edgeHandles.s, edgeHandles.w]) {
    guideCtx.beginPath();
    guideCtx.arc(point.x, point.y, TRANSFORM_HANDLE_RADIUS * 0.52, 0, Math.PI * 2);
    guideCtx.fill();
  }

  guideCtx.fillStyle = "#ffd27f";
  guideCtx.beginPath();
  guideCtx.arc(rotateHandle.x, rotateHandle.y, TRANSFORM_HANDLE_RADIUS * 0.72, 0, Math.PI * 2);
  guideCtx.fill();

  guideCtx.restore();
}

function startPan(event) {
  state.panning = true;
  stage.classList.add("panning");
  state.panStart = {
    x: event.clientX,
    y: event.clientY,
    panX: state.panX,
    panY: state.panY
  };
}

function startDrawing(event) {
  pointerEventCount++;
  drawingAttempts++;
  logDiagnostic('startDrawing called (attempt #' + drawingAttempts + ') - type: ' + event.pointerType + ', pressure: ' + event.pressure);
  
  if (isTouchDrawingBlocked(event)) {
    handleTouchPointerDown(event);
    return;
  }

  if (shouldPan(event)) {
    logDiagnostic('Pan mode active');
    startPan(event);
    return;
  }

  const activeLayer = getActiveLayer();
  if (!activeLayer || !activeLayer.visible) {
    logDiagnostic('No active layer or layer not visible');
    return;
  }

  logDiagnostic('Drawing started successfully');
  event.preventDefault();
  canvas.setPointerCapture(event.pointerId);
  const point = screenToCanvas(event);

  if (state.tool === "fill") {
    const fillPoints = getSymmetryPoints(point);
    fillPoints.forEach((entry) => floodFillAt(entry));
    renderComposite();
    snapshotHistory();
    return;
  }

  if (state.tool === "transform") {
    state.drawing = true;
    const hit = detectTransformHit(point);
    if (state.transformSelection && hit.type !== "none") {
      beginTransformAction(point, hit);
    } else {
      beginTransformSelection(point);
    }
    return;
  }

  if (state.tool === "blur") {
    state.drawing = true;
    state.strokeHasMoved = true;
    state.lastPoint = point;
    state.smoothedPoint = point;
    state.strokeHistory = [{ point, time: Date.now(), velocity: 0 }];
    const blurPoints = getSymmetryPoints(point);
    blurPoints.forEach((entry) => blurStamp(entry, false));
    renderComposite();
    return;
  }

  state.drawing = true;
  state.strokeDistance = 0;
  state.strokeHasMoved = false;
  state.firstSegmentRendered = false;
  state.strokeHistory = [];
  state.taperSmoothed = 1;
  const pressure = getEventPressure(event);
  state.currentPressure = pressure;
  state.currentVelocity = 0;
  state.strokeStartPoint = point;
  state.strokeStartPressure = pressure;
  state.lastStrokePressure = pressure;
  state.lastStrokeVelocity = 0;
  state.lastPoint = point;
  state.smoothedPoint = point;
  state.strokeHistory.push({ point, time: Date.now(), velocity: 0 });
}

function draw(event) {
  if (isTouchDrawingBlocked(event)) {
    handleTouchPointerMove(event);
    return;
  }

  if (state.panning && state.panStart) {
    event.preventDefault();
    state.panX = state.panStart.panX + (event.clientX - state.panStart.x);
    state.panY = state.panStart.panY + (event.clientY - state.panStart.y);
    updateViewportTransform();
    return;
  }

  if (!state.drawing) {
    if (state.tool === "transform" && state.transformMode === "ready" && state.transformSelection) {
      const point = screenToCanvas(event);
      const hit = detectTransformHit(point);
      canvas.style.cursor = getTransformCursor(hit);
    }
    return;
  }

  if (state.tool === "transform") {
    event.preventDefault();
    const point = screenToCanvas(event);
    if (state.transformMode === "selecting") {
      updateTransformSelection(point);
    } else if (state.transformMode === "transforming") {
      updateTransformAction(point, Boolean(event.shiftKey));
    }
    state.lastPoint = point;
    return;
  }

  if (state.tool === "blur") {
    event.preventDefault();
    const point = screenToCanvas(event);
    const now = Date.now();
    const fromPoint = state.lastPoint || point;
    const dx = point.x - fromPoint.x;
    const dy = point.y - fromPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 0.05) {
      return;
    }

    const prevTime = state.strokeHistory.length > 0 ? state.strokeHistory[state.strokeHistory.length - 1].time : now;
    const timeDelta = Math.max(1, now - prevTime);
    const velocity = (distance / timeDelta) * 16.67;
    const density = (state.interpolation / 100) * (1 + Math.min(4.2, velocity / 7));
    blurInterpolated(fromPoint, point, density);
    state.strokeHistory.push({ point, time: now, velocity });
    if (state.strokeHistory.length > 10) {
      state.strokeHistory.shift();
    }
    state.lastPoint = point;
    state.currentVelocity = velocity;
    return;
  }

  event.preventDefault();
  const point = screenToCanvas(event);
  const pressure = getEventPressure(event);
  state.currentPressure = pressure;
  const lerpFactor = Math.max(0.12, 1 - state.smoothing * 0.88);
  const nextPoint = interpolatePoint(state.smoothedPoint || state.lastPoint || point, point, lerpFactor);
  const now = Date.now();

  // Prevent a start blob by requiring a small movement before first rendered segment,
  // and skipping that first segment once movement begins.
  if (!state.strokeHasMoved && state.strokeStartPoint) {
    const startDx = point.x - state.strokeStartPoint.x;
    const startDy = point.y - state.strokeStartPoint.y;
    const startDistance = Math.sqrt(startDx * startDx + startDy * startDy);
    const startDeadZone = Math.min(3, Math.max(0.75, state.size * 0.03));

    if (startDistance < startDeadZone) {
      state.lastPoint = nextPoint;
      state.smoothedPoint = nextPoint;
      return;
    }

    state.strokeHasMoved = true;
    state.lastPoint = nextPoint;
    state.smoothedPoint = nextPoint;
    state.lastStrokePressure = pressure;
    state.lastStrokeVelocity = 0;
    state.strokeHistory = [{ point: nextPoint, time: now, velocity: 0 }];
    return;
  }
  
  // Calculate distance and velocity for taper
  let velocity = 0;
  let distance = 0;
  if (state.lastPoint && state.strokeHistory.length > 0) {
    const dx = nextPoint.x - state.lastPoint.x;
    const dy = nextPoint.y - state.lastPoint.y;
    distance = Math.sqrt(dx * dx + dy * dy);
    state.strokeDistance += distance;
    
    const prevTime = state.strokeHistory[state.strokeHistory.length - 1].time;
    const timeDelta = Math.max(1, now - prevTime);
    velocity = (distance / timeDelta) * 16.67; // Normalize to ~60fps
  }
  
  state.strokeHistory.push({ point: nextPoint, time: now, velocity });
  if (state.strokeHistory.length > 10) {
    state.strokeHistory.shift(); // Keep only recent history
  }
  
  state.currentVelocity = velocity;
  if (velocity > 0.01) {
    state.strokeHasMoved = true;
  }
  
  // Skip rendering the very first segment to avoid start blob
  if (!state.firstSegmentRendered) {
    state.firstSegmentRendered = true;
    state.lastPoint = nextPoint;
    state.smoothedPoint = nextPoint;
    state.lastStrokePressure = pressure;
    state.lastStrokeVelocity = velocity;
    return;
  }
  
  const pressureFrom = state.lastStrokePressure ?? pressure;
  const velocityFrom = state.lastStrokeVelocity ?? velocity;
  const interpolationScale = state.interpolation / 100;

  let curveBoost = 1;
  const historySamples = state.strokeHistory.length;
  if (historySamples >= 3) {
    const p0 = state.strokeHistory[historySamples - 3].point;
    const p1 = state.strokeHistory[historySamples - 2].point;
    const p2 = state.strokeHistory[historySamples - 1].point;
    const v1x = p1.x - p0.x;
    const v1y = p1.y - p0.y;
    const v2x = p2.x - p1.x;
    const v2y = p2.y - p1.y;
    const m1 = Math.sqrt(v1x * v1x + v1y * v1y);
    const m2 = Math.sqrt(v2x * v2x + v2y * v2y);

    if (m1 > 0.0001 && m2 > 0.0001) {
      const dot = v1x * v2x + v1y * v2y;
      const cosTheta = Math.min(1, Math.max(-1, dot / (m1 * m2)));
      const turnRatio = Math.acos(cosTheta) / Math.PI;
      curveBoost += turnRatio * 2.2;
    }
  }

  const speedBoost = 1 + Math.min(4.5, velocity / 6.5);
  const gapBaseline = Math.max(1.2, state.size * (state.spacing / 120) + 1.2);
  const gapRatio = Math.max(1, distance / gapBaseline);
  const gapBoost = 1 + Math.min(1.8, Math.pow(gapRatio, 0.55) - 1);
  const interpolationDensity = speedBoost * curveBoost * gapBoost * interpolationScale;

  const historyCount = state.strokeHistory.length;
  if (historyCount >= 3) {
    const p0 = state.strokeHistory[historyCount - 3].point;
    const p1 = state.strokeHistory[historyCount - 2].point;
    const p2 = state.strokeHistory[historyCount - 1].point;
    const curveFrom = interpolatePoint(p0, p1, 0.5);
    const curveTo = interpolatePoint(p1, p2, 0.5);
    strokeQuadraticInterpolated(
      curveFrom,
      p1,
      curveTo,
      pressureFrom,
      pressure,
      velocityFrom,
      velocity,
      interpolationDensity
    );
  } else {
    strokeInterpolated(
      state.lastPoint,
      nextPoint,
      pressureFrom,
      pressure,
      velocityFrom,
      velocity,
      interpolationDensity
    );
  }
  state.lastPoint = nextPoint;
  state.smoothedPoint = nextPoint;
  state.lastStrokePressure = pressure;
  state.lastStrokeVelocity = velocity;
}

function stopPointer(event) {
  if (isTouchDrawingBlocked(event)) {
    handleTouchPointerUp(event);
    return;
  }

  if (state.panning) {
    event.preventDefault();
    state.panning = false;
    state.panStart = null;
    stage.classList.remove("panning");
    persistDocumentSoon();
    return;
  }

  if (!state.drawing) {
    return;
  }

  event.preventDefault();

  if (state.tool === "transform") {
    if (state.transformMode === "selecting") {
      finalizeTransformSelection();
    } else if (state.transformMode === "transforming") {
      const changed = state.transformDirty;
      endTransformAction();
      if (changed) {
        snapshotHistory();
      }
    }

    state.drawing = false;
    state.lastPoint = null;
    state.smoothedPoint = null;
    return;
  }

  if (state.tool === "blur") {
    state.drawing = false;
    state.lastPoint = null;
    state.smoothedPoint = null;
    state.strokeHistory = [];
    snapshotHistory();
    return;
  }

  // Only place a single dot when the pointer was pressed without movement.
  if (!state.strokeHasMoved && state.strokeStartPoint) {
    stamp(state.strokeStartPoint, state.strokeStartPressure, 0);
  }

  if (state.strokeHasMoved && state.endTaper > 0) {
    renderStrokeReleaseTaper(state.currentPressure, state.currentVelocity);
  }

  state.drawing = false;
  state.strokeDistance = 0;
  state.strokeStartPoint = null;
  state.strokeStartPressure = 1;
  state.lastStrokePressure = 1;
  state.lastStrokeVelocity = 0;
  state.lastAppliedTaper = 1;
  state.strokeHasMoved = false;
  state.strokeHistory = [];
  state.taperSmoothed = 1;
  state.lastPoint = null;
  state.smoothedPoint = null;
  snapshotHistory();
}

function zoomBy(delta, anchorX, anchorY) {
  const oldZoom = state.zoom;
  const nextZoom = Math.min(4, Math.max(0.2, oldZoom + delta));
  if (nextZoom === oldZoom) {
    return;
  }

  if (typeof anchorX === "number" && typeof anchorY === "number") {
    const logicalX = (anchorX - state.panX) / oldZoom;
    const logicalY = (anchorY - state.panY) / oldZoom;
    state.zoom = nextZoom;
    state.panX = anchorX - logicalX * nextZoom;
    state.panY = anchorY - logicalY * nextZoom;
  } else {
    state.zoom = nextZoom;
  }

  updateViewportTransform();
  updateStatus();
  persistDocumentSoon();
}

function resetView() {
  state.zoom = 1;
  state.rotation = 0;
  state.panX = 0;
  state.panY = 0;
  updateViewportTransform();
  updateStatus();
  persistDocumentSoon();
}

function addLayer() {
  const layer = createLayer(`Layer ${state.layers.length + 1}`);
  state.layers.push(layer);
  state.activeLayerId = layer.id;
  updateLayerSelect();
  updateLayerControls();
  renderComposite();
  updateStatus();
  snapshotHistory();
}

function deleteActiveLayer() {
  if (state.layers.length <= 1) {
    return;
  }

  const index = state.layers.findIndex((layer) => layer.id === state.activeLayerId);
  if (index === -1) {
    return;
  }

  state.layers.splice(index, 1);
  const nextIndex = Math.max(0, index - 1);
  state.activeLayerId = state.layers[nextIndex].id;
  updateLayerSelect();
  updateLayerControls();
  renderComposite();
  updateStatus();
  snapshotHistory();
}

function toggleActiveLayerVisibility() {
  const layer = getActiveLayer();
  if (!layer) {
    return;
  }

  layer.visible = !layer.visible;
  updateLayerSelect();
  renderComposite();
  updateStatus();
  snapshotHistory();
}

function toggleActiveLayerClip() {
  const layer = getActiveLayer();
  if (!layer) {
    return;
  }

  layer.clipped = !layer.clipped;
  updateLayerSelect();
  updateLayerControls();
  renderComposite();
  updateStatus();
  snapshotHistory();
}

function moveLayer(direction) {
  const index = state.layers.findIndex((layer) => layer.id === state.activeLayerId);
  if (index === -1) {
    return;
  }

  const target = index + direction;
  if (target < 0 || target >= state.layers.length) {
    return;
  }

  const [layer] = state.layers.splice(index, 1);
  state.layers.splice(target, 0, layer);
  updateLayerSelect();
  renderComposite();
  updateStatus();
  snapshotHistory();
}

async function importImageAsLayer(file) {
  if (!file || !file.type.startsWith("image/")) {
    return;
  }

  const img = new Image();
  const url = URL.createObjectURL(file);
  
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  });

  const layer = createLayer(`Imported ${state.layers.length + 1}`);
  layer.ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
  state.layers.push(layer);
  state.activeLayerId = layer.id;
  
  URL.revokeObjectURL(url);
  
  updateLayerSelect();
  updateLayerControls();
  renderComposite();
  updateStatus();
  snapshotHistory();
}

async function handleImageFileSelect(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) {
    return;
  }

  try {
    await importImageAsLayer(file);
  } catch {
    window.alert("Could not load image file. Please choose a valid PNG or JPG file.");
  } finally {
    event.target.value = "";
  }
}

function mergeDown() {
  const activeIndex = state.layers.findIndex((layer) => layer.id === state.activeLayerId);
  
  if (activeIndex === -1 || activeIndex === 0) {
    return;
  }

  const activeLayer = state.layers[activeIndex];
  const belowLayer = state.layers[activeIndex - 1];
  
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = CANVAS_WIDTH;
  tempCanvas.height = CANVAS_HEIGHT;
  const tempCtx = tempCanvas.getContext("2d", { alpha: true });
  
  tempCtx.globalAlpha = belowLayer.opacity;
  tempCtx.globalCompositeOperation = belowLayer.blendMode;
  tempCtx.drawImage(belowLayer.canvas, 0, 0);
  
  tempCtx.globalAlpha = activeLayer.opacity;
  tempCtx.globalCompositeOperation = activeLayer.blendMode;
  tempCtx.drawImage(activeLayer.canvas, 0, 0);
  
  belowLayer.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  belowLayer.ctx.drawImage(tempCanvas, 0, 0);
  belowLayer.opacity = 1;
  belowLayer.blendMode = "source-over";
  belowLayer.clipped = false;
  
  state.layers.splice(activeIndex, 1);
  state.activeLayerId = belowLayer.id;
  
  updateLayerSelect();
  updateLayerControls();
  renderComposite();
  updateStatus();
  snapshotHistory();
}

function flattenAll() {
  if (state.layers.length <= 1) {
    return;
  }
  
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = CANVAS_WIDTH;
  tempCanvas.height = CANVAS_HEIGHT;
  const tempCtx = tempCanvas.getContext("2d", { alpha: true });
  
  for (const layer of state.layers) {
    if (!layer.visible) {
      continue;
    }
    
    const targetCtx = layer.clipped ? clipCtx : tempCtx;
    
    if (layer.clipped) {
      clipCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      clipCtx.globalCompositeOperation = "source-over";
      clipCtx.globalAlpha = 1;
      
      const clippedIndex = state.layers.indexOf(layer);
      if (clippedIndex > 0) {
        clipCtx.drawImage(state.layers[clippedIndex - 1].canvas, 0, 0);
      }
      
      clipCtx.globalCompositeOperation = "source-in";
      clipCtx.globalAlpha = layer.opacity;
      clipCtx.drawImage(layer.canvas, 0, 0);
      
      tempCtx.globalCompositeOperation = "source-over";
      tempCtx.globalAlpha = 1;
      tempCtx.drawImage(clipCanvas, 0, 0);
    } else {
      tempCtx.globalAlpha = layer.opacity;
      tempCtx.globalCompositeOperation = layer.blendMode;
      tempCtx.drawImage(layer.canvas, 0, 0);
    }
  }
  
  const flatLayer = createLayer("Flattened");
  flatLayer.ctx.drawImage(tempCanvas, 0, 0);
  
  state.layers = [flatLayer];
  state.activeLayerId = flatLayer.id;
  
  updateLayerSelect();
  updateLayerControls();
  renderComposite();
  updateStatus();
  snapshotHistory();
}

function setActiveLayerBlendMode(mode) {
  const layer = getActiveLayer();
  if (!layer) {
    return;
  }

  layer.blendMode = mode;
  renderComposite();
  updateStatus();
  snapshotHistory();
}

function setActiveLayerOpacity(opacityPercent) {
  const layer = getActiveLayer();
  if (!layer) {
    return;
  }

  layer.opacity = Math.min(1, Math.max(0, opacityPercent / 100));
  layerOpacityValue.textContent = `${Math.round(layer.opacity * 100)}%`;
  renderComposite();
  updateStatus();
  snapshotHistory();
}

function isControlTarget(event) {
  return event.target instanceof HTMLElement && Boolean(event.target.closest("input, select, textarea, button"));
}

function handleKeyboardShortcuts(event) {
  if (event.key === "Escape" && brushSettingsModal && !brushSettingsModal.classList.contains("hidden")) {
    closeBrushSettings();
    return;
  }

  if (isControlTarget(event)) {
    return;
  }

  const key = event.key.toLowerCase();

  if (key === " ") {
    event.preventDefault();
    state.spacePressed = true;
    return;
  }

  if (key === "b") {
    setTool("brush");
    return;
  }

  if (key === "e") {
    setTool("eraser");
    return;
  }

  if (key === "f12") {
    event.preventDefault();
    if (!diagnosticOverlay) {
      diagnosticOverlay = document.getElementById("diagnostic-overlay");
    }
    if (diagnosticOverlay) {
      const isHidden = diagnosticOverlay.style.display === "none";
      diagnosticOverlay.style.display = isHidden ? "block" : "none";
    }
    return;
  }

  if (key === "[") {
    event.preventDefault();
    state.size = Math.max(1, state.size - 1);
    sizeInput.value = String(state.size);
    sizeValue.textContent = String(state.size);
    updateStatus();
    persistDocumentSoon();
    return;
  }

  if (key === "]") {
    event.preventDefault();
    state.size = Math.min(100, state.size + 1);
    sizeInput.value = String(state.size);
    sizeValue.textContent = String(state.size);
    updateStatus();
    persistDocumentSoon();
    return;
  }

  if (event.ctrlKey && !event.shiftKey && key === "z") {
    event.preventDefault();
    undo();
    return;
  }

  if ((event.ctrlKey && key === "y") || (event.ctrlKey && event.shiftKey && key === "z")) {
    event.preventDefault();
    redo();
    return;
  }

  if (event.ctrlKey && key === "s") {
    event.preventDefault();
    quickSaveProjectFile();
    return;
  }

  if (event.ctrlKey && key === "o") {
    event.preventDefault();
    void loadProjectWithHandle();
    return;
  }

  if (event.ctrlKey && key === "F5") {
    event.preventDefault();
    location.reload(true);
    return;
  }
}

function handleKeyUp(event) {
  if (event.key === " ") {
    state.spacePressed = false;
  }
}

brushButton.addEventListener("click", () => setTool("brush"));
eraserButton.addEventListener("click", () => setTool("eraser"));
if (transformButton) {
  transformButton.addEventListener("click", () => setTool("transform"));
}
if (fillButton) {
  fillButton.addEventListener("click", () => setTool("fill"));
}
if (blurButton) {
  blurButton.addEventListener("click", () => setTool("blur"));
}

if (colorPicker) {
  console.log('Color picker found, attaching listener');
  colorPicker.addEventListener("input", (event) => {
    console.log('Color picker input event:', event.target.value);
    state.color = event.target.value;
    addColorToHistory(state.color);
    updateStatus();
    markAsUnsaved();
    persistDocumentSoon();
  });
  colorPicker.addEventListener("change", (event) => {
    console.log('Color picker change event:', event.target.value);
    state.color = event.target.value;
    addColorToHistory(state.color);
    updateStatus();
    markAsUnsaved();
    persistDocumentSoon();
  });
} else {
  console.error('Color picker element not found!');
}

presetSelect.addEventListener("input", (event) => {
  state.preset = event.target.value;
  updateStatus();
  persistDocumentSoon();
});

sizeInput.addEventListener("input", (event) => {
  state.size = Math.min(100, Math.max(1, Number(event.target.value)));
  sizeInput.value = String(state.size);
  sizeValue.textContent = String(state.size);
  updateStatus();
  persistDocumentSoon();
});

if (brushMinSizeInput) {
  brushMinSizeInput.addEventListener("input", (event) => {
    state.brushMinSize = Number(event.target.value);
    enforceBrushLimits();
    if (brushMinSizeInput) {
      brushMinSizeInput.value = String(state.brushMinSize);
    }
    if (brushMaxSizeInput) {
      brushMaxSizeInput.value = String(state.brushMaxSize);
    }
    if (brushMinSizeValue) {
      brushMinSizeValue.textContent = `${state.brushMinSize}px`;
    }
    if (brushMaxSizeValue) {
      brushMaxSizeValue.textContent = `${state.brushMaxSize}px`;
    }
    updateStatus();
    persistDocumentSoon();
  });
}

if (brushMaxSizeInput) {
  brushMaxSizeInput.addEventListener("input", (event) => {
    state.brushMaxSize = Number(event.target.value);
    enforceBrushLimits();
    if (brushMinSizeInput) {
      brushMinSizeInput.value = String(state.brushMinSize);
    }
    if (brushMaxSizeInput) {
      brushMaxSizeInput.value = String(state.brushMaxSize);
    }
    if (brushMinSizeValue) {
      brushMinSizeValue.textContent = `${state.brushMinSize}px`;
    }
    if (brushMaxSizeValue) {
      brushMaxSizeValue.textContent = `${state.brushMaxSize}px`;
    }
    updateStatus();
    persistDocumentSoon();
  });
}

if (brushMinOpacityInput) {
  brushMinOpacityInput.addEventListener("input", (event) => {
    state.brushMinOpacity = Number(event.target.value);
    enforceBrushLimits();
    if (brushMinOpacityInput) {
      brushMinOpacityInput.value = String(state.brushMinOpacity);
    }
    if (brushMaxOpacityInput) {
      brushMaxOpacityInput.value = String(state.brushMaxOpacity);
    }
    if (brushMinOpacityValue) {
      brushMinOpacityValue.textContent = `${state.brushMinOpacity}%`;
    }
    if (brushMaxOpacityValue) {
      brushMaxOpacityValue.textContent = `${state.brushMaxOpacity}%`;
    }
    updateStatus();
    persistDocumentSoon();
  });
}

if (brushMaxOpacityInput) {
  brushMaxOpacityInput.addEventListener("input", (event) => {
    state.brushMaxOpacity = Number(event.target.value);
    enforceBrushLimits();
    if (brushMinOpacityInput) {
      brushMinOpacityInput.value = String(state.brushMinOpacity);
    }
    if (brushMaxOpacityInput) {
      brushMaxOpacityInput.value = String(state.brushMaxOpacity);
    }
    if (brushMinOpacityValue) {
      brushMinOpacityValue.textContent = `${state.brushMinOpacity}%`;
    }
    if (brushMaxOpacityValue) {
      brushMaxOpacityValue.textContent = `${state.brushMaxOpacity}%`;
    }
    updateStatus();
    persistDocumentSoon();
  });
}

opacityInput.addEventListener("input", (event) => {
  const numericValue = Number(event.target.value);
  state.opacity = numericValue / 100;
  opacityValue.textContent = `${numericValue}%`;
  updateStatus();
  persistDocumentSoon();
});

if (startTaperInput) {
  startTaperInput.addEventListener("input", (event) => {
    const numericValue = Number(event.target.value);
    state.startTaper = numericValue;
    if (startTaperValue) {
      startTaperValue.textContent = `${numericValue}%`;
    }
    persistDocumentSoon();
  });
}

if (endTaperInput) {
  endTaperInput.addEventListener("input", (event) => {
    const numericValue = Number(event.target.value);
    state.endTaper = numericValue;
    if (endTaperValue) {
      endTaperValue.textContent = `${numericValue}%`;
    }
    persistDocumentSoon();
  });
}

if (speedSizeReductionInput) {
  speedSizeReductionInput.addEventListener("input", (event) => {
    const numericValue = Number(event.target.value);
    state.speedSizeReduction = numericValue;
    if (speedSizeReductionValue) {
      speedSizeReductionValue.textContent = `${numericValue}%`;
    }
    updateStatus();
    persistDocumentSoon();
  });
}

if (spacingInput) {
  spacingInput.addEventListener("input", (event) => {
    const numericValue = Number(event.target.value);
    state.spacing = numericValue;
    if (spacingValue) {
      spacingValue.textContent = `${numericValue}%`;
    }
    updateStatus();
    persistDocumentSoon();
  });
}

if (jitterInput) {
  jitterInput.addEventListener("input", (event) => {
    const numericValue = Number(event.target.value);
    state.jitter = numericValue;
    if (jitterValue) {
      jitterValue.textContent = `${numericValue}%`;
    }
    updateStatus();
    persistDocumentSoon();
  });
}

if (interpolationInput) {
  interpolationInput.addEventListener("input", (event) => {
    const numericValue = Number(event.target.value);
    state.interpolation = numericValue;
    if (interpolationValue) {
      interpolationValue.textContent = `${numericValue}%`;
    }
    updateStatus();
    persistDocumentSoon();
  });
}

if (stabilizerInput) {
  stabilizerInput.addEventListener("input", (event) => {
    const numericValue = Number(event.target.value);
    state.smoothing = numericValue / 100;
    if (stabilizerValue) {
      stabilizerValue.textContent = `${numericValue}%`;
    }
    updateStatus();
    persistDocumentSoon();
  });
}

symmetrySelect.addEventListener("change", (event) => {
  state.symmetry = event.target.value;
  renderSymmetryGuides();
  updateStatus();
  persistDocumentSoon();
});

if (pressureModeSelect) {
  pressureModeSelect.addEventListener("change", (event) => {
    state.pressureMode = event.target.value;
    updateStatus();
    persistDocumentSoon();
  });
}

if (touchToggleButton) {
  touchToggleButton.addEventListener("click", () => {
    state.touchEnabled = !state.touchEnabled;
    updateTouchToggleButton();
    updateStatus();
    persistDocumentSoon();
  });
}

if (smoothOpacityToggleButton) {
  smoothOpacityToggleButton.addEventListener("click", () => {
    state.smoothOpacityStrokes = !state.smoothOpacityStrokes;
    updateSmoothOpacityToggleButton();
    updateStatus();
    persistDocumentSoon();
  });
}

if (openBrushSettingsButton) {
  openBrushSettingsButton.addEventListener("click", openBrushSettings);
  logDiagnostic('Brush Settings button listener bound');
} else {
  logDiagnostic('ERROR: openBrushSettingsButton element not found!');
}

if (closeBrushSettingsButton) {
  closeBrushSettingsButton.addEventListener("click", closeBrushSettings);
}

if (brushSettingsModal) {
  brushSettingsModal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.closeBrushSettings === "true") {
      closeBrushSettings();
    }
  });
}

layerSelect.addEventListener("change", (event) => {
  state.activeLayerId = event.target.value;
  updateLayerControls();
  updateStatus();
  renderLayerThumbnails();
  persistDocumentSoon();
});

addLayerButton.addEventListener("click", addLayer);
importImageButton.addEventListener("click", () => importImageInput.click());
importImageInput.addEventListener("change", (event) => {
  void handleImageFileSelect(event);
});
layerUpButton.addEventListener("click", () => moveLayer(1));
layerDownButton.addEventListener("click", () => moveLayer(-1));
deleteLayerButton.addEventListener("click", deleteActiveLayer);
mergeDownButton.addEventListener("click", mergeDown);
flattenAllButton.addEventListener("click", flattenAll);
toggleLayerButton.addEventListener("click", toggleActiveLayerVisibility);
layerBlendModeSelect.addEventListener("change", (event) => setActiveLayerBlendMode(event.target.value));
layerOpacityInput.addEventListener("input", (event) => setActiveLayerOpacity(Number(event.target.value)));
layerClipButton.addEventListener("click", toggleActiveLayerClip);

newProjectButton.addEventListener("click", () => {
  if (window.confirm("Create a new blank canvas? Unsaved progress in this tab will be replaced.")) {
    newCanvas();
  }
});
saveProjectButton.addEventListener("click", saveProjectFile);
quickSaveProjectButton.addEventListener("click", quickSaveProjectFile);
loadProjectButton.addEventListener("click", loadProjectWithHandle);
loadProjectInput.addEventListener("change", (event) => {
  void handleProjectFileSelect(event);
});

zoomInButton.addEventListener("click", () => zoomBy(0.1));
zoomOutButton.addEventListener("click", () => zoomBy(-0.1));
zoomResetButton.addEventListener("click", resetView);

if (toggleToolbarButton) {
  toggleToolbarButton.addEventListener("click", toggleToolbar);
}

if (toggleLayersButton) {
  toggleLayersButton.addEventListener("click", toggleLayers);
}

if (toggleToolsButton) {
  toggleToolsButton.addEventListener("click", toggleTools);
}

if (hardRefreshButton) {
  hardRefreshButton.addEventListener("click", () => {
    location.reload(true);
  });
}

if (fullscreenToggleButton) {
  fullscreenToggleButton.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log("Fullscreen error:", err);
      });
    } else {
      document.exitFullscreen();
    }
  });
}

if (quickToolBrushButton) {
  quickToolBrushButton.addEventListener("click", () => {
    setTool("brush");
  });
}

if (quickToolEraserButton) {
  quickToolEraserButton.addEventListener("click", () => {
    setTool("eraser");
  });
}

if (quickUndoButton) {
  quickUndoButton.addEventListener("click", undo);
}

if (quickRedoButton) {
  quickRedoButton.addEventListener("click", redo);
}

if (quickSize1Button) {
  quickSize1Button.addEventListener("click", () => {
    state.size = 1;
    sizeInput.value = "1";
    sizeValue.textContent = "1";
    updateStatus();
    persistDocumentSoon();
  });
}

if (quickSize12Button) {
  quickSize12Button.addEventListener("click", () => {
    state.size = 12;
    sizeInput.value = "12";
    sizeValue.textContent = "12";
    updateStatus();
    persistDocumentSoon();
  });
}

if (quickSize24Button) {
  quickSize24Button.addEventListener("click", () => {
    state.size = 24;
    sizeInput.value = "24";
    sizeValue.textContent = "24";
    updateStatus();
    persistDocumentSoon();
  });
}

if (quickSize48Button) {
  quickSize48Button.addEventListener("click", () => {
    state.size = 48;
    sizeInput.value = "48";
    sizeValue.textContent = "48";
    updateStatus();
    persistDocumentSoon();
  });
}

if (flipToggleButton) {
  flipToggleButton.addEventListener("click", () => {
    state.flipped = !state.flipped;
    updateFlipToggleButton();
    updateViewportTransform();
    persistDocumentSoon();
  });
}

if (flipVerticalToggleButton) {
  flipVerticalToggleButton.addEventListener("click", () => {
    state.flippedVertical = !state.flippedVertical;
    updateFlipToggleButton();
    updateViewportTransform();
    persistDocumentSoon();
  });
}

if (previewToggleButton) {
  previewToggleButton.addEventListener("click", openPreviewModal);
}

if (closePreviewButton) {
  closePreviewButton.addEventListener("click", closePreviewModal);
}

if (previewHeader) {
  previewHeader.addEventListener("pointerdown", startPreviewDrag);
  previewHeader.addEventListener("pointermove", dragPreviewWindow);
  previewHeader.addEventListener("pointerup", stopPreviewDrag);
  previewHeader.addEventListener("pointercancel", stopPreviewDrag);
}

if (viewHeader) {
  viewHeader.addEventListener("pointerdown", startViewWindowDrag);
  viewHeader.addEventListener("pointermove", dragViewWindow);
  viewHeader.addEventListener("pointerup", stopViewWindowDrag);
  viewHeader.addEventListener("pointercancel", stopViewWindowDrag);
}

if (minimizeViewButton) {
  minimizeViewButton.addEventListener("click", toggleViewWindowMinimized);
}

if (viewWindowModal) {
  applyViewWindowPosition();
}

window.addEventListener("resize", () => {
  applyPreviewWindowPosition();
  applyViewWindowPosition();
  updateViewportTransform();
});

if (window.ResizeObserver) {
  const viewportResizeObserver = new ResizeObserver(() => {
    updateViewportTransform();
  });
  viewportResizeObserver.observe(stage);
  viewportResizeObserver.observe(canvas);
}

undoButton.addEventListener("click", undo);
redoButton.addEventListener("click", redo);
clearButton.addEventListener("click", clearActiveLayer);
saveButton.addEventListener("click", exportCanvas);

canvas.addEventListener("pointerdown", startDrawing);
canvas.addEventListener("pointermove", draw);
canvas.addEventListener("pointerup", stopPointer);
canvas.addEventListener("pointerleave", stopPointer);
canvas.addEventListener("pointercancel", stopPointer);
canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});
logDiagnostic('Canvas pointer listeners bound');

stage.addEventListener("dragover", (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
});

stage.addEventListener("drop", async (event) => {
  event.preventDefault();
  
  const file = event.dataTransfer.files && event.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    try {
      await importImageAsLayer(file);
    } catch {
      window.alert("Could not load dropped image file.");
    }
  }
});

stage.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    const delta = event.deltaY < 0 ? 0.1 : -0.1;
    zoomBy(delta, event.clientX - stage.getBoundingClientRect().left, event.clientY - stage.getBoundingClientRect().top);
  },
  { passive: false }
);

window.addEventListener("keydown", handleKeyboardShortcuts);
window.addEventListener("keyup", handleKeyUp);
logDiagnostic('Keyboard listeners bound');

async function initializeCanvas() {
  logDiagnostic('initializeCanvas started');
  
  // Initialize diagnostic overlay
  if (!diagnosticOverlay) {
    diagnosticOverlay = document.getElementById("diagnostic-overlay");
    if (diagnosticOverlay) {
      logDiagnostic('Diagnostic overlay initialized (toggle with F12)');
    }
  }
  
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  guideCanvas.width = CANVAS_WIDTH;
  guideCanvas.height = CANVAS_HEIGHT;
  logDiagnostic('Canvas dimensions set');

  const persisted = loadPersistedDocument();

  if (persisted) {
    applyUiState(persisted.ui);
    await applySnapshot(persisted.snapshot);
  } else {
    const firstLayer = createLayer("Layer 1");
    state.layers.push(firstLayer);
    state.activeLayerId = firstLayer.id;
    updateLayerSelect();
    updateLayerControls();
  }

  logDiagnostic('Layers initialized');
  syncUiControlsFromState();
  logDiagnostic('UI controls synced');
  renderComposite();
  logDiagnostic('Composite rendered');

  state.history = [serializeSnapshot()];
  state.future = [];
  persistDocumentSoon();
  updateStatus();
  updateSaveStatus();
  updateColorHistoryUI();
  logDiagnostic('Initialization complete!');
  
  // Check critical elements
  logDiagnostic('Canvas: ' + (canvas ? 'OK' : 'MISSING'));
  logDiagnostic('BrushSettingsModal: ' + (brushSettingsModal ? 'OK' : 'MISSING'));
  logDiagnostic('OpenBrushSettingsBtn: ' + (openBrushSettingsButton ? 'OK' : 'MISSING'));
}

void initializeCanvas();
