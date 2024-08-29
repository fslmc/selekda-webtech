const canvas = document.getElementById("canvas");
canvas.height = 400;
canvas.width = 800;

const ctx = canvas.getContext("2d");

ctx.fillStyle = "red";
ctx.fillRect(0, 0, 800, 300);