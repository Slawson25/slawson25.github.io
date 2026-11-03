
import { drawWorld, obstacles } from "./world.js";

import {
    player,
    drawPlayer,
    updatePlayer
} from "./player.js";

// Find the game canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set game dimensions
canvas.width = 480;
canvas.height = 272;

ctx.imageSmoothingEnabled = false;

// Track keyboard input
const keys = {};

// Game state
let gameStarted = false;

// Start button
const startButton = document.getElementById("startButton");
const gameMessage = document.getElementById("gameMessage");

startButton.addEventListener("click", () => {

    gameStarted = true;

    gameMessage.style.display = "none";

});

// Listen for keyboard presses
window.addEventListener("keydown", (event) => {

    keys[event.key] = true;

    if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "]
        .includes(event.key)
    ) {
        event.preventDefault();
    }

});

// Listen for keyboard releases
window.addEventListener("keyup", (event) => {

    keys[event.key] = false;

});

// Game loop
function gameLoop() {

    // Clear previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw world
    drawWorld(ctx);

    if (gameStarted) {

        // Update player position
        updatePlayer(keys, obstacles);

    }

    // Draw player
    drawPlayer(ctx);

    // Repeat game loop
    requestAnimationFrame(gameLoop);

}

// Start game loop
gameLoop();

console.log("Developer Quest initialized!");
