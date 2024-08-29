const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

// ctx.fillStyle = "red";
// ctx.fillRect(0, 0, 800, 300);

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
