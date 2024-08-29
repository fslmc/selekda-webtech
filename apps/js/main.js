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
let brushSize = 10;
let brushOpacity = 1;

// Drawing state
let drawing = false;


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

function draw(event) {
    if (!drawing) return;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.strokeStyle = `rgba(0, 0, 0, ${brushOpacity})`;
    ctx.lineWidth = brushSize;
    ctx.stroke();
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

// Layer
let layers = [];
let currentLayer = null;

const layersList = document.getElementById('layersList');

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
  });
  return layerElement;
}

function addLayer() {
  const newLayer = document.createElement('canvas');
  newLayer.width = 800;
  newLayer.height = 400;
  const layerElement = createLayerElement(newLayer);
  layersList.appendChild(layerElement);
  currentLayer = newLayer;
  currentCtx = newLayer.getContext('2d');
}

document.getElementById('newLayer').addEventListener('click', addLayer);
