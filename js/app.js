
import { drawWorld } from "./world.js";

// Find the game canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set game world dimensions
canvas.width = 480;
canvas.height = 272;

// Disable smoothing for pixel-style graphics
ctx.imageSmoothingEnabled = false;

// Draw the game world
drawWorld(ctx);

// Start button
const startButton = document.getElementById("startButton");
const gameMessage = document.getElementById("gameMessage");

startButton.addEventListener("click", () => {
    gameMessage.style.display = "none";
});

console.log("Developer Quest initialized!");
