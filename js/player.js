
// Create our player
export const player = {
    x: 240,
    y: 245,
    width: 16,
    height: 20,
    speed: 2
};

// Draw the player character
export function drawPlayer(ctx) {

    const x = player.x;
    const y = player.y;

    // Hair
    ctx.fillStyle = "#49301f";
    ctx.fillRect(x + 4, y, 8, 4);

    // Face
    ctx.fillStyle = "#e5a36b";
    ctx.fillRect(x + 4, y + 4, 8, 6);

    // Eyes
    ctx.fillStyle = "#222222";
    ctx.fillRect(x + 5, y + 6, 2, 2);
    ctx.fillRect(x + 10, y + 6, 2, 2);

    // Shirt
    ctx.fillStyle = "#2563a6";
    ctx.fillRect(x + 3, y + 10, 10, 6);

    // Arms
    ctx.fillStyle = "#e5a36b";
    ctx.fillRect(x, y + 11, 3, 5);
    ctx.fillRect(x + 13, y + 11, 3, 5);

    // Pants
    ctx.fillStyle = "#303b55";
    ctx.fillRect(x + 4, y + 16, 8, 3);

    // Shoes
    ctx.fillStyle = "#49301f";
    ctx.fillRect(x + 3, y + 19, 4, 1);
    ctx.fillRect(x + 9, y + 19, 4, 1);
}


// Check whether two rectangles overlap
function isColliding(rect1, rect2) {

    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );

}

// Move the player with collision detection
export function updatePlayer(keys, obstacles) {

    let moveX = 0;
    let moveY = 0;

    // Horizontal movement
    if (keys["ArrowLeft"] || keys["a"] || keys["A"]) {
        moveX -= player.speed;
    }

    if (keys["ArrowRight"] || keys["d"] || keys["D"]) {
        moveX += player.speed;
    }

    // Vertical movement
    if (keys["ArrowUp"] || keys["w"] || keys["W"]) {
        moveY -= player.speed;
    }

    if (keys["ArrowDown"] || keys["s"] || keys["S"]) {
        moveY += player.speed;
    }

    // Try horizontal movement
    const nextX = {
        x: player.x + moveX,
        y: player.y,
        width: player.width,
        height: player.height
    };

    const hitHorizontal = obstacles.some(obstacle =>
        isColliding(nextX, obstacle)
    );

    if (!hitHorizontal) {
        player.x = nextX.x;
    }

    // Try vertical movement
    const nextY = {
        x: player.x,
        y: player.y + moveY,
        width: player.width,
        height: player.height
    };

    const hitVertical = obstacles.some(obstacle =>
        isColliding(nextY, obstacle)
    );

    if (!hitVertical) {
        player.y = nextY.y;
    }

    // Keep player inside game boundaries
    player.x = Math.max(0, Math.min(480 - player.width, player.x));

    player.y = Math.max(0, Math.min(272 - player.height, player.y));

}

