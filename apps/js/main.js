// basic drawing

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

window.addEventListener("mousemove", (e) =>{
    console.log("Mouse X: ", e.clientX);
    console.log("Mouse Y: ", e.clientY);
});

let currentTool = 'brush';
let brushSize = document.getElementById('brushSize').value;
let brushOpacity = document.getElementById('brushOpacity').value;
let trailOpacity = brushOpacity * 0.5; // Make the trail 50% of the brush opacity



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

function startDrawing(event) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

// Add a range input element for brush size
const brushSizeInput = document.getElementById('brushSize');
brushSizeInput.addEventListener('input', () => {
  brushSize = brushSizeInput.value;
});

// Add a range input element for brush opacity
const brushOpacityInput = document.getElementById('brushOpacity');
brushOpacityInput.addEventListener('input', () => {
    brushOpacity = brushOpacityInput.value / 100;
    document.getElementById('brushOpacityLabel').textContent = brushOpacityInput.value;
  });

  function draw(event) {
    if (!drawing) return;
  
    if (currentTool === 'brush') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = colorPicker.value;
      ctx.globalAlpha = brushOpacity; // Use the selected brush opacity
      ctx.lineWidth = brushSize;
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
  
      // Draw the trail with the trail opacity
      ctx.globalAlpha = trailOpacity;
      ctx.moveTo(event.offsetX, event.offsetY);
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
    } else if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize;
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
    }
  }

function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

// Layer
let layers = [];
let currentLayer = null;
let currentCtx = null;

document.getElementById('layersList').addEventListener('click', (event) => {
    if (event.target.tagName === 'DIV') {
      const layerId = event.target.textContent.replace('Layer ', '');
      const layer = layers.find((layer) => layer.id === layerId);
      if (layer) {
        currentLayer = layer;
        currentCtx = layer.getContext('2d');
        ctx = currentCtx;
      }
    }
  });

function createLayerElement(layer) {
    const layerElement = document.createElement('div');
    layerElement.textContent = `Layer ${layer.id}`;
    layerElement.addEventListener('click', () => {
      currentLayer = layer;
      currentCtx = layer.getContext('2d');
      layerElement.classList.add('selected');
      Array.from(layersList.children).forEach((child) => {
        if (child !== layerElement) {
          child.classList.remove('selected');
        }
      });
      // Update the canvas element to draw on
      ctx = currentCtx;
    });
    return layerElement;
  }
  
  function addLayer() {
    const newLayer = document.createElement('canvas');
    newLayer.width = 800;
    newLayer.height = 400;
    const layerElement = createLayerElement(newLayer);
    layersList.appendChild(layerElement);
    layers.push(newLayer);
    currentLayer = newLayer;
    currentCtx = newLayer.getContext('2d');
    // Update the canvas element to draw on
    ctx = currentCtx;
  }

document.getElementById('newLayer').addEventListener('click', addLayer);

// other tool
document.getElementById('eraserTool').addEventListener('click', () => {
    currentTool = 'eraser';
});