
// Collision areas for trees and buildings
export const obstacles = [

    // Trees
    { x: 28, y: 25, width: 24, height: 29 },
    { x: 68, y: 65, width: 24, height: 29 },
    { x: 113, y: 20, width: 24, height: 29 },
    { x: 168, y: 45, width: 24, height: 29 },
    { x: 303, y: 25, width: 24, height: 29 },
    { x: 368, y: 55, width: 24, height: 29 },
    { x: 428, y: 20, width: 24, height: 29 },
    { x: 28, y: 135, width: 24, height: 29 },
    { x: 78, y: 145, width: 24, height: 29 },
    { x: 353, y: 140, width: 24, height: 29 },
    { x: 423, y: 130, width: 24, height: 29 },
    { x: 68, y: 235, width: 24, height: 29 },
    { x: 148, y: 240, width: 24, height: 29 },
    { x: 333, y: 235, width: 24, height: 29 },
    { x: 423, y: 235, width: 24, height: 29 },

    // Buildings
    { x: 50, y: 75, width: 86, height: 50 },
    { x: 345, y: 75, width: 86, height: 50 },
    { x: 50, y: 150, width: 86, height: 50 },
    { x: 345, y: 150, width: 86, height: 50 }

];



export function drawWorld(ctx) {

    // Game world dimensions
    const tileSize = 16;
    const columns = 30;
    const rows = 17;

    // Grass background
    ctx.fillStyle = "#70a85b";
    ctx.fillRect(0, 0, 480, 272);

    // Draw grass details
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {

            const variation = (x * 7 + y * 13) % 5;

            if (variation === 0) {
                ctx.fillStyle = "#639c50";
                ctx.fillRect(
                    x * tileSize + 4,
                    y * tileSize + 5,
                    3,
                    3
                );
            }

            if (variation === 2) {
                ctx.fillStyle = "#83b96a";
                ctx.fillRect(
                    x * tileSize + 10,
                    y * tileSize + 9,
                    2,
                    2
                );
            }
        }
    }

    // Walking paths
    ctx.fillStyle = "#c9a46a";

    // Main horizontal path
    ctx.fillRect(0, 192, 480, 32);

    // Main vertical path
    ctx.fillRect(224, 96, 32, 128);

    // Path details
    ctx.fillStyle = "#b48b55";

    for (let x = 0; x < 480; x += 32) {
        ctx.fillRect(x, 204, 12, 2);
    }

    // Tree drawing function
    function drawTree(x, y) {

        // Tree shadow
        ctx.fillStyle = "#466b3d";
        ctx.fillRect(x + 3, y + 18, 24, 7);

        // Tree trunk
        ctx.fillStyle = "#79502e";
        ctx.fillRect(x + 11, y + 13, 8, 16);

        // Tree leaves
        ctx.fillStyle = "#28623b";
        ctx.fillRect(x + 3, y + 5, 24, 16);

        ctx.fillStyle = "#347d46";
        ctx.fillRect(x + 7, y, 16, 17);

        ctx.fillStyle = "#4b9652";
        ctx.fillRect(x + 11, y + 4, 8, 8);
    }

    // Place trees around the map
    const trees = [
        [25, 25],
        [65, 65],
        [110, 20],
        [165, 45],
        [300, 25],
        [365, 55],
        [425, 20],
        [25, 135],
        [75, 145],
        [350, 140],
        [420, 130],
        [65, 235],
        [145, 240],
        [330, 235],
        [420, 235]
    ];

    trees.forEach(([x, y]) => {
        drawTree(x, y);
    });

    // Building drawing function
    function drawBuilding(x, y, name, color) {

        // Building shadow
        ctx.fillStyle = "#46613d";
        ctx.fillRect(x + 4, y + 42, 72, 8);

        // Building walls
        ctx.fillStyle = color;
        ctx.fillRect(x, y + 15, 76, 32);

        // Roof
        ctx.fillStyle = "#85452f";
        ctx.fillRect(x - 5, y + 5, 86, 15);

        ctx.fillStyle = "#a95c3b";
        ctx.fillRect(x + 5, y, 66, 8);

        // Door
        ctx.fillStyle = "#563722";
        ctx.fillRect(x + 31, y + 27, 14, 20);

        // Windows
        ctx.fillStyle = "#a9dce5";
        ctx.fillRect(x + 9, y + 24, 13, 10);
        ctx.fillRect(x + 54, y + 24, 13, 10);

        // Building name
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 8px monospace";
        ctx.textAlign = "center";
        ctx.fillText(name, x + 38, y + 59);
    }

    // Portfolio buildings
    drawBuilding(55, 75, "ABOUT", "#d8ae72");
    drawBuilding(350, 75, "SKILLS", "#83a7bd");

    drawBuilding(55, 150, "PROJECTS", "#b98d65");
    drawBuilding(350, 150, "CONTACT", "#a77dba");

    // Starting area sign
    ctx.fillStyle = "#79502e";
    ctx.fillRect(215, 232, 50, 5);

    ctx.fillStyle = "#f4d35e";
    ctx.fillRect(220, 215, 40, 20);

    ctx.fillStyle = "#263c30";
    ctx.font = "7px monospace";
    ctx.textAlign = "center";
    ctx.fillText("START", 240, 228);

}
