// Load public GitHub repositories
export async function loadProjects(container) {

    // Show a loading message
    container.textContent = "Loading projects...";

    try {

        const response = await fetch(
            "https://api.github.com/users/Slawson25/repos?sort=updated&per_page=100"
        );

        // Check whether GitHub returned an error
        if (!response.ok) {
            throw new Error("Unable to retrieve GitHub projects.");
        }

        const repositories = await response.json();

        // Clear the loading message
        container.textContent = "";

        // Handle an account with no public repositories
        if (repositories.length === 0) {
            container.textContent = "No public repositories found.";
            return;
        }

        // Create a section for each repository
        repositories.forEach(repo => {

            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");

            const projectTitle = document.createElement("h3");
            projectTitle.textContent = repo.name;

            const projectDescription = document.createElement("p");
            projectDescription.textContent =
                repo.description || "No description provided.";

            const projectLanguage = document.createElement("p");
            projectLanguage.textContent =
                `Language: ${repo.language || "Not specified"}`;

            const projectLink = document.createElement("a");
            projectLink.textContent = "View on GitHub";
            projectLink.href = repo.html_url;
            projectLink.target = "_blank";
            projectLink.rel = "noopener noreferrer";

            projectCard.append(
                projectTitle,
                projectDescription,
                projectLanguage,
                projectLink
            );

            container.appendChild(projectCard);

        });

    } catch (error) {

        container.textContent =
            "Sorry, projects could not be loaded. Please try again later.";

        console.error("GitHub project loading error:", error);

    }

}