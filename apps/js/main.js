// basic drawing

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

// window.addEventListener("mousemove", (e) =>{
//     console.log("Mouse X: ", e.clientX);
//     console.log("Mouse Y: ", e.clientY);
// });

const brushShapeSelect = document.getElementById('brushShape');

let currentTool = 'brush';
let brushSize = document.getElementById('brushSize').value;
let brushOpacity = document.getElementById('brushOpacity').value;
let trailOpacity = brushOpacity * 0.5; // Make the trail 50% of the brush opacity
let brushShape = 'round';
let currentLayer = ctx;
// document.getElementById('newLayer').onclick = addNewLayer();
// const layersList = document.getElementById('layersList');

// Drawing state
let drawing = false;

const colorPicker = document.getElementById('colorPicker');

colorPicker.addEventListener('input', () => {
  const selectedColor = colorPicker.value;
  ctx.strokeStyle = selectedColor;
});

document.getElementById('brushTool').addEventListener('click', () => {
    currentTool = 'brush';
});

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);


const brushSizeInput = document.getElementById('brushSize');
brushSizeInput.addEventListener('input', () => {
  brushSize = brushSizeInput.value;
});

brushShapeSelect.addEventListener('change', () => {
    brushShape = brushShapeSelect.value;
});


function startDrawing(event) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
    prevMouseX = event.offsetX;
    prevMouseY = event.offsetY;
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
    currentLayer.stroke(); 
}

const brushOpacityInput = document.getElementById('brushOpacity');
brushOpacityInput.addEventListener('input', () => {
    brushOpacity = brushOpacityInput.value / 100;
    document.getElementById('brushOpacityLabel').textContent = brushOpacityInput.value;
  });

  function draw(event) {
    if (!drawing) return;
  
    if (currentTool === 'brush') {
      currentLayer.globalCompositeOperation = 'source-over';
      currentLayer.globalAlpha = brushOpacity;
      currentLayer.lineWidth = brushSize;
      currentLayer.lineCap = brushShape === 'round' ? 'round' : 'square';
      currentLayer.lineJoin = brushShape === 'round' ? 'round' : 'miter';
  
      currentLayer.beginPath();
      currentLayer.moveTo(prevMouseX, prevMouseY);
      currentLayer.lineTo(event.offsetX, event.offsetY);
      currentLayer.stroke();
      currentLayer.closePath(); // Add this line to close the path
      currentLayer.beginPath(); 
  
      prevMouseX = event.offsetX;
      prevMouseY = event.offsetY;
  
      currentLayer.globalAlpha = trailOpacity;
      currentLayer.beginPath();
      currentLayer.moveTo(prevMouseX, prevMouseY);
      currentLayer.lineTo(event.offsetX, event.offsetY);
      currentLayer.stroke();
    } else if (currentTool === 'eraser') {
      currentLayer.globalCompositeOperation = 'destination-out';
      currentLayer.lineWidth = brushSize;
      currentLayer.lineTo(event.offsetX, event.offsetY);
      currentLayer.stroke();
    }
  }
  
  let prevMouseX, prevMouseY;

// other tool
document.getElementById('eraserTool').addEventListener('click', () => {
    currentTool = 'eraser';
});

// Move Tool
const moveTool = document.getElementById('moveTool');
moveTool.addEventListener('click', () => {
  currentTool = 'move';
});

// Move tool properties
const moveToolProperties = document.getElementById('moveToolProperties');
moveToolProperties.style.display = 'none';

moveTool.addEventListener('click', () => {
  moveToolProperties.style.display = 'block';
});

// Rotate clockwise
const rotateClockwiseButton = document.getElementById('rotateClockwiseButton');
rotateClockwiseButton.addEventListener('click', () => {
  // Get the current layer
  const currentLayer = ctx;
  // Get the current layer's canvas
  const currentLayerCanvas = currentLayer.canvas;
  // Rotate the canvas clockwise
  currentLayerCanvas.style.transform = 'rotate(90deg)';
});

// Rotate counter clockwise
const rotateCounterClockwiseButton = document.getElementById('rotateCounterClockwiseButton');
rotateCounterClockwiseButton.addEventListener('click', () => {
  // Get the current layer
  const currentLayer = ctx;
  // Get the current layer's canvas
  const currentLayerCanvas = currentLayer.canvas;
  // Rotate the canvas counter clockwise
  currentLayerCanvas.style.transform = 'rotate(-90deg)';
});

// Flip horizontal
const flipHorizontalButton = document.getElementById('flipHorizontalButton');
flipHorizontalButton.addEventListener('click', () => {
  // Get the current layer
  const currentLayer = ctx;
  // Get the current layer's canvas
  const currentLayerCanvas = currentLayer.canvas;
  // Flip the canvas horizontally
  currentLayerCanvas.style.transform = 'scaleX(-1)';
});

// Flip vertical
const flipVerticalButton = document.getElementById('flipVerticalButton');
flipVerticalButton.addEventListener('click', () => {
  // Get the current layer
  const currentLayer = ctx;
  // Get the current layer's canvas
  const currentLayerCanvas = currentLayer.canvas;
  // Flip the canvas vertically
  currentLayerCanvas.style.transform = 'scaleY(-1)';
});

// Move tool functionality
let startX, startY, endX, endY;
let isDragging = false;
let selectionRect;

canvas.addEventListener('mousedown', (event) => {
    if (currentTool === 'move') {
      startX = event.clientX;
      startY = event.clientY;
      isDragging = true;
    }
  });



canvas.addEventListener('mousemove', (event) => {
  if (currentTool === 'move' && isDragging) {
    endX = event.clientX;
    endY = event.clientY;
    // Update the selection rectangle
    selectionRect = {
      x: Math.min(startX, endX),
      y: Math.min(startY, endY),
      width: Math.abs(endX - startX),
      height: Math.abs(endY - startY)
    };
    // Draw the selection rectangle (optional)
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(selectionRect.x, selectionRect.y, selectionRect.width, selectionRect.height);
  }
});

canvas.addEventListener('mouseup', () => {
  if (currentTool === 'move' && isDragging) {
    isDragging = false;
    // Get the selected region's coordinates
    const selectedRegion = selectionRect;
    // Move the selected region (TO DO: implement this part)
    // ...
  }
});
canvas.addEventListener('mousedown', (event) => {
    if (currentTool === 'move' && selectionRect) {
      // Get the mouse position
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      // Move the selected region to the new position
      // ...
    }
  });
// layer
// function updateLayerList() {
//     layersList.innerHTML = '';
//     layers.forEach((layer) => {
//       const layerElement = document.createElement('div');
//       layerElement.textContent = layer.name;
//       layersList.appendChild(layerElement);
//     });
//   }
  
//   function addNewLayer() {
//     const newLayer = {
//       id: layers.length + 1,
//       name: `Layer ${layers.length + 1}`,
//       canvas: document.createElement('canvas'),
//       ctx: null
//     };
//     newLayer.canvas.width = canvas.width;
//     newLayer.canvas.height = canvas.height;
//     newLayer.ctx = newLayer.canvas.getContext('2d');
//     layers.push(newLayer);
//     updateLayerList();
//   }


// cursor
// ...

// Add a shape to the cursor
function updateCursor() {
    const cursorSize = brushSize;
    const cursorShape = brushShape === 'round' ? 'circle' : 'square';
  
    const cursorCanvas = document.createElement('canvas');
    cursorCanvas.width = cursorSize * 2;
    cursorCanvas.height = cursorSize * 2;
    const cursorCtx = cursorCanvas.getContext('2d');
  
    if (cursorShape === 'circle') {
      cursorCtx.beginPath();
      cursorCtx.arc(cursorSize, cursorSize, cursorSize, 0, 2 * Math.PI);
      cursorCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      cursorCtx.fill();
    } else if (cursorShape === 'square') {
      cursorCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      cursorCtx.fillRect(0, 0, cursorSize * 2, cursorSize * 2);
    }
  
    const cursorUrl = cursorCanvas.toDataURL();
    canvas.style.cursor = `url(${cursorUrl}) ${cursorSize} ${cursorSize}, auto`;
  }
  
  // Update the cursor when the brush size or shape changes
  brushSizeInput.addEventListener('input', updateCursor);
  brushShapeSelect.addEventListener('change', updateCursor);
  
  // ...