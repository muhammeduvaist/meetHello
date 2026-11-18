
const html = document.documentElement;

function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("meethello-theme", theme);

    document.querySelectorAll(".theme-toggle").forEach(button => {
        button.textContent = theme === "dark"
            ? "☀️ Light mode"
            : "🌙 Dark mode";
    });
}

// Load saved theme
const savedTheme = localStorage.getItem("meethello-theme") || "dark";
setTheme(savedTheme);

// Toggle theme
document.addEventListener("click", event => {
    const button = event.target.closest(".theme-toggle");

    if (!button) return;

    const currentTheme = html.getAttribute("data-theme");
    setTheme(currentTheme === "dark" ? "light" : "dark");
});
