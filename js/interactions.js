
import { player } from "./player.js";

// Portfolio locations
export const locations = [

    {
        name: "ABOUT",
        x: 50,
        y: 75,
        width: 86,
        height: 50,

        title: "About Shawn",

        content: `
            <p>Welcome to my developer adventure!</p>

            <p>
                I'm Shawn Lawson, an aspiring web developer
                learning to build interactive applications
                and responsive websites.
            </p>

            <p>
                My journey includes HTML, CSS, JavaScript,
                React, and SQL.
            </p>
        `
    },

    {
        name: "SKILLS",
        x: 345,
        y: 75,
        width: 86,
        height: 50,

        title: "Skills & Abilities",

        content: `
            <p>My current technical skill tree:</p>

            <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>React</li>
                <li>SQL</li>
                <li>Git and GitHub</li>
            </ul>
        `
    },

    {
        name: "PROJECTS",
        x: 50,
        y: 150,
        width: 86,
        height: 50,

        title: "Project Collection",

        content: `
            <p>Welcome to my project collection!</p>

            <p>
                This area will showcase my GitHub
                repositories and completed applications.
            </p>

            <p>More projects are coming soon!</p>

            <a href="https://github.com/Slawson25"
               target="_blank"
               rel="noopener noreferrer">
               Visit my GitHub
            </a>
        `
    },

    {
        name: "CONTACT",
        x: 345,
        y: 150,
        width: 86,
        height: 50,

        title: "Contact Shawn",

        content: `
            <p>Thanks for exploring my portfolio!</p>

            <p>
                You can find my development work
                on GitHub.
            </p>

            <a href="https://github.com/Slawson25"
               target="_blank"
               rel="noopener noreferrer">
               Visit my GitHub profile
            </a>
        `
    }

];


// Check whether player is near a building
export function getNearbyLocation() {

    const interactionRange = 12;

    return locations.find(location => {

        const playerCenterX = player.x + player.width / 2;
        const playerCenterY = player.y + player.height / 2;

        const closestX = Math.max(
            location.x,
            Math.min(playerCenterX, location.x + location.width)
        );

        const closestY = Math.max(
            location.y,
            Math.min(playerCenterY, location.y + location.height)
        );

        const distance = Math.hypot(
            playerCenterX - closestX,
            playerCenterY - closestY
        );

        return distance <= interactionRange;

    }) || null;

}


// Find a building that was clicked
export function getClickedLocation(x, y) {

    return locations.find(location => {

        return (
            x >= location.x &&
            x <= location.x + location.width &&
            y >= location.y &&
            y <= location.y + location.height
        );

    }) || null;

}


// Open portfolio window
export function openLocation(location) {

    if (!location) return;

    const windowElement =
        document.getElementById("portfolioWindow");

    const titleElement =
        document.getElementById("windowTitle");

    const contentElement =
        document.getElementById("windowContent");

    titleElement.textContent = location.title;

    contentElement.innerHTML = location.content;

    windowElement.style.display = "block";

}


// Close portfolio window
export function closeLocation() {

    document.getElementById("portfolioWindow")
        .style.display = "none";

}
