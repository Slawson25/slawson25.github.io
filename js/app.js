
import { drawWorld, obstacles } from "./world.js";

import {
    player,
    drawPlayer,
    updatePlayer
} from "./player.js";

import {
    getNearbyLocation,
    getClickedLocation,
    openLocation,
    closeLocation
} from "./interactions.js";

// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 480;
canvas.height = 272;

ctx.imageSmoothingEnabled = false;

// Game elements
const gameMessage = document.getElementById("gameMessage");
const startButton = document.getElementById("startButton");

const interactionPrompt =
    document.getElementById("interactionPrompt");

const closeButton =
    document.getElementById("closeWindow");

const portfolioWindow =
    document.getElementById("portfolioWindow");

// Keyboard tracking
const keys = {};

let gameStarted = false;
let windowOpen = false;
let nearbyLocation = null;

// Start adventure
startButton.addEventListener("click", () => {

    gameStarted = true;

    gameMessage.style.display = "none";

});

// Keyboard controls
window.addEventListener("keydown", (event) => {

    keys[event.key] = true;

    if (
        ["ArrowUp", "ArrowDown", "ArrowLeft",
         "ArrowRight", " ", "Enter"].includes(event.key)
    ) {
        event.preventDefault();
    }

    if (!gameStarted) return;

    // Close window with Escape
    if (event.key === "Escape" && windowOpen) {

        closeLocation();

        windowOpen = false;

        return;
    }

    // Interact with nearby building
    if (
        (event.key === " " || event.key === "Enter") &&
        !windowOpen &&
        nearbyLocation
    ) {

        openLocation(nearbyLocation);

        windowOpen = true;

    }

});

// Keyboard release
window.addEventListener("keyup", (event) => {

    keys[event.key] = false;

});

// Clear keys when browser loses focus
window.addEventListener("blur", () => {

    Object.keys(keys).forEach(key => {
        keys[key] = false;
    });

});

// Close portfolio window
closeButton.addEventListener("click", () => {

    closeLocation();

    windowOpen = false;

});

// Click-to-explore
canvas.addEventListener("click", (event) => {

    if (!gameStarted || windowOpen) return;

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;

    const clickedLocation =
        getClickedLocation(mouseX, mouseY);

    if (clickedLocation) {

        openLocation(clickedLocation);

        windowOpen = true;

    }

});

// Game loop
function gameLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw map
    drawWorld(ctx);

    if (gameStarted && !windowOpen) {

        updatePlayer(keys, obstacles);

    }

    // Draw player
    drawPlayer(ctx);

    // Check nearby buildings
    nearbyLocation = gameStarted && !windowOpen
        ? getNearbyLocation()
        : null;

    // Show interaction prompt
    if (nearbyLocation) {

        interactionPrompt.style.display = "block";

        interactionPrompt.textContent =
            `SPACE / ENTER: ${nearbyLocation.name}`;

    } else {

        interactionPrompt.style.display = "none";

    }

    requestAnimationFrame(gameLoop);

}

// Start rendering
gameLoop();

console.log("Developer Quest initialized!");
