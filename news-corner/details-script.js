document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("navToggle");
    const navActions = document.querySelector(".nav-actions");
    const themeToggle = document.getElementById("themeToggle");
    const themeLabel = themeToggle?.querySelector(".theme-label");
    const root = document.documentElement;

    // Theme Management
    const applyTheme = (theme) => {
        root.setAttribute("data-theme", theme);
        const moonIcon = themeToggle?.querySelector(".theme-icon-moon");
        const sunIcon = themeToggle?.querySelector(".theme-icon-sun");
        if (moonIcon && sunIcon) {
            if (theme === "dark") {
                moonIcon.style.opacity = "1";
                sunIcon.style.opacity = "0";
            } else {
                moonIcon.style.opacity = "0";
                sunIcon.style.opacity = "1";
            }
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