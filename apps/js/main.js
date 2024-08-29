// basic drawing

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

window.addEventListener("mousemove", (e) =>{
    console.log("Mouse X: ", e.clientX);
    console.log("Mouse Y: ", e.clientY);
});

const brushShapeSelect = document.getElementById('brushShape');

let currentTool = 'brush';
let brushSize = document.getElementById('brushSize').value;
let brushOpacity = document.getElementById('brushOpacity').value;
let trailOpacity = brushOpacity * 0.5; // Make the trail 50% of the brush opacity
let brushShape = 'round';
let currentLayer = ctx;
document.getElementById('newLayer').onclick = addNewLayer();
const layersList = document.getElementById('layersList');

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

const brushSizeInput = document.getElementById('brushSize');
brushSizeInput.addEventListener('input', () => {
  brushSize = brushSizeInput.value;
});

brushShapeSelect.addEventListener('change', () => {
    brushShape = brushShapeSelect.value;
});

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

        if (brushShape === 'round') {
            currentLayer.lineCap = 'round';
            currentLayer.lineJoin = 'round';
        } else if (brushShape === 'square') {
            currentLayer.lineCap = 'butt';
            currentLayer.lineJoin = 'miter';
        }

        currentLayer.lineTo(event.offsetX, event.offsetY);
        currentLayer.stroke();

        currentLayer.globalAlpha = trailOpacity;
        currentLayer.moveTo(event.offsetX, event.offsetY);
        currentLayer.lineTo(event.offsetX, event.offsetY);
        currentLayer.stroke();
    } else if (currentTool === 'eraser') {
        currentLayer.globalCompositeOperation = 'destination-out';
        currentLayer.lineWidth = brushSize;
        currentLayer.lineTo(event.offsetX, event.offsetY);
        currentLayer.stroke();
    }
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

// other tool
document.getElementById('eraserTool').addEventListener('click', () => {
    currentTool = 'eraser';
});

// layer
// Update layer list
function updateLayerList() {
    layersList.innerHTML = '';
    layers.forEach((layer) => {
      const layerElement = document.createElement('div');
      layerElement.textContent = layer.name;
      layersList.appendChild(layerElement);
    });
  }
  
  // Add new layer function
  function addNewLayer() {
    const newLayer = {
      id: layers.length + 1,
      name: `Layer ${layers.length + 1}`,
      canvas: document.createElement('canvas'),
      ctx: null
    };
    newLayer.canvas.width = canvas.width;
    newLayer.canvas.height = canvas.height;
    newLayer.ctx = newLayer.canvas.getContext('2d');
    layers.push(newLayer);
    updateLayerList();
  }