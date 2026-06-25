const projectsContainer = document.getElementById("projects");
const GITHUB_USER = "Slawson25"; // <-- your real GitHub username

async function loadProjects() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos`
    );
    const repos = await response.json();

    projectsContainer.innerHTML = "";

    repos.forEach((repo) => {
      const col = document.createElement("div");
      col.className = "col item";

      col.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description provided."}</p>
        <p><strong>Language:</strong> ${repo.language || "N/A"}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;

      projectsContainer.appendChild(col);
    });
  } catch (error) {
    projectsContainer.innerHTML = "<p>Failed to load projects.</p>";
    console.error(error);
  }
}

loadProjects();

