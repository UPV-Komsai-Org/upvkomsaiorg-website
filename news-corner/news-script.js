document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const themeToggle = document.getElementById("themeToggle");
    const themeLabel = themeToggle?.querySelector(".theme-label");
    const root = document.documentElement;

    // --- THEME LOGIC ---
    const applyTheme = (theme) => {
        root.setAttribute("data-theme", theme);
        if (themeLabel) themeLabel.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
        localStorage.setItem("theme", theme);
    };

    const savedTheme = localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    applyTheme(savedTheme);

    themeToggle?.addEventListener("click", () => {
        const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(newTheme);
    });

    // --- MOBILE NAV LOGIC ---
    navToggle?.addEventListener("click", () => {
        // Simplified toggle for standalone page
        const actions = document.querySelector('.nav-actions');
        actions.classList.toggle("active");
    });

    // --- SCROLL REVEAL ANIMATION ---
    const cards = document.querySelectorAll('.news-card, .featured-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "all 0.6s ease-out";
        observer.observe(card);
    });
});