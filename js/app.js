
/* =========================================
   DEVELOPER COMMAND CENTER
   Dashboard Controller
========================================= */

// LIVE CLOCK
const clock = document.getElementById("liveClock");
const dateDisplay = document.getElementById("liveDate");

function updateClock() {
    const now = new Date();

    if (clock) {
        clock.textContent = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    }

    if (dateDisplay) {
        dateDisplay.textContent = now.toLocaleDateString([], {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });
    }
}

updateClock();
setInterval(updateClock, 1000);


// SIDEBAR ACTIVE SECTION
const navLinks = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll(
    "main section[id]"
);

function updateActiveNavigation() {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 180) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation);


// PROJECT CARD INTERACTIONS
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.classList.add("project-active");
    });

    card.addEventListener("mouseleave", () => {
        card.classList.remove("project-active");
    });
});


// COMMAND CONSOLE
const commandInput = document.getElementById("commandInput");
const commandOutput = document.getElementById("commandOutput");

const commands = {
    help: "Available commands: help, projects, skills, about, github, clear",

    projects: "Loading project directory... Explore the Featured Projects section above.",

    skills: "Technology profile: HTML5, CSS3, JavaScript, React, SQL, Node.js, Git and GitHub.",

    about: "Developer profile: Shawn Lawson. Focus: building practical software applications.",

    github: "GitHub: https://github.com/Slawson25",

    clear: ""
};

function runCommand(command) {
    const normalizedCommand = command.trim().toLowerCase();

    if (!normalizedCommand) return;

    if (normalizedCommand === "clear") {
        commandOutput.innerHTML = "";
        return;
    }

    const response = commands[normalizedCommand] ||
        `Command not recognized: ${normalizedCommand}. Type "help" for available commands.`;

    const line = document.createElement("p");

    line.className = "console-line";

    line.textContent = `visitor@shawn:~$ ${normalizedCommand}`;

    const result = document.createElement("p");

    result.className = "console-result";

    result.textContent = response;

    commandOutput.appendChild(line);
    commandOutput.appendChild(result);

    commandOutput.scrollTop = commandOutput.scrollHeight;
}

if (commandInput && commandOutput) {
    commandInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            runCommand(commandInput.value);
            commandInput.value = "";
        }
    });
}


// INITIALIZATION
console.log("Developer Command Center initialized.");
console.log("System status: ONLINE");
