document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("navToggle");
    const navActions = document.querySelector(".nav-actions");
    const themeToggle = document.getElementById("themeToggle");
    const themeLabel = themeToggle?.querySelector(".theme-label");
    const root = document.documentElement;

    // Theme Management
    const applyTheme = (theme) => {
        root.setAttribute("data-theme", theme);
        if (themeLabel) {
            themeLabel.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
        }
    };

    const savedTheme = localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    applyTheme(savedTheme);

    themeToggle?.addEventListener("click", () => {
        const currentTheme = root.getAttribute("data-theme");
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
    });

    // Mobile Nav
    navToggle?.addEventListener("click", () => {
        navActions.classList.toggle("active");
    });
});