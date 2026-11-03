
// Player information
export const player = {
    x: 240,
    y: 245,
    width: 16,
    height: 20,
    speed: 2,

    // Character direction
    direction: "down",

    // Animation information
    walkFrame: 0,
    moving: false
};


// Draw the player character
export function drawPlayer(ctx) {

    const x = Math.round(player.x);
    const y = Math.round(player.y);

    // Animation leg positions
    const walking = player.moving;
    const frame = walking ? Math.floor(player.walkFrame / 8) % 2 : 0;

    // Shadow
    ctx.fillStyle = "#46613d";
    ctx.fillRect(x + 2, y + 19, 12, 3);

    // Hair
    ctx.fillStyle = "#49301f";
    ctx.fillRect(x + 4, y, 8, 4);

    // Face
    ctx.fillStyle = "#e5a36b";
    ctx.fillRect(x + 4, y + 4, 8, 6);

    // Eyes
    ctx.fillStyle = "#222222";

    if (player.direction === "down") {
        ctx.fillRect(x + 5, y + 6, 2, 2);
        ctx.fillRect(x + 10, y + 6, 2, 2);
    }

    if (player.direction === "left") {
        ctx.fillRect(x + 4, y + 6, 2, 2);
    }

    if (player.direction === "right") {
        ctx.fillRect(x + 11, y + 6, 2, 2);
    }

    // Back of head when facing up
    if (player.direction === "up") {
        ctx.fillStyle = "#49301f";
        ctx.fillRect(x + 4, y + 3, 8, 7);
    }

    // Shirt
    ctx.fillStyle = "#2563a6";
    ctx.fillRect(x + 3, y + 10, 10, 6);

    // Arms
    ctx.fillStyle = "#e5a36b";
    ctx.fillRect(x, y + 11, 3, 5);
    ctx.fillRect(x + 13, y + 11, 3, 5);

    // Pants
    ctx.fillStyle = "#303b55";

    if (walking && frame === 1) {
        ctx.fillRect(x + 3, y + 16, 4, 3);
        ctx.fillRect(x + 10, y + 16, 4, 3);
    } else {
        ctx.fillRect(x + 4, y + 16, 8, 3);
    }

    // Shoes
    ctx.fillStyle = "#49301f";

    if (walking && frame === 1) {
        ctx.fillRect(x + 2, y + 19, 4, 1);
        ctx.fillRect(x + 10, y + 18, 4, 1);
    } else {
        ctx.fillRect(x + 3, y + 19, 4, 1);
        ctx.fillRect(x + 9, y + 19, 4, 1);
    }

}


// Collision detection
function isColliding(rect1, rect2) {

    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );

}


// Update player movement
export function updatePlayer(keys, obstacles) {

    let moveX = 0;
    let moveY = 0;

    // Horizontal movement
    if (keys["ArrowLeft"] || keys["a"] || keys["A"]) {
        moveX -= player.speed;
        player.direction = "left";
    }

    if (keys["ArrowRight"] || keys["d"] || keys["D"]) {
        moveX += player.speed;
        player.direction = "right";
    }

    // Vertical movement
    if (keys["ArrowUp"] || keys["w"] || keys["W"]) {
        moveY -= player.speed;
        player.direction = "up";
    }

    if (keys["ArrowDown"] || keys["s"] || keys["S"]) {
        moveY += player.speed;
        player.direction = "down";
    }

    // Prevent faster diagonal movement
    if (moveX !== 0 && moveY !== 0) {
        moveX *= Math.SQRT1_2;
        moveY *= Math.SQRT1_2;
    }

    // Check horizontal collision
    const nextX = {
        x: player.x + moveX,
        y: player.y,
        width: player.width,
        height: player.height
    };

    if (!obstacles.some(obstacle => isColliding(nextX, obstacle))) {
        player.x = nextX.x;
    }

    // Check vertical collision
    const nextY = {
        x: player.x,
        y: player.y + moveY,
        width: player.width,
        height: player.height
    };

    if (!obstacles.some(obstacle => isColliding(nextY, obstacle))) {
        player.y = nextY.y;
    }

    // Keep player inside the map
    player.x = Math.max(0, Math.min(480 - player.width, player.x));
    player.y = Math.max(0, Math.min(272 - player.height, player.y));

    // Track movement for animation
    player.moving = moveX !== 0 || moveY !== 0;

    if (player.moving) {
        player.walkFrame++;
    } else {
        player.walkFrame = 0;
    }

}
