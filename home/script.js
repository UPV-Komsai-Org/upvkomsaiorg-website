// Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle");
const navActions = document.querySelector(".nav-actions");

if (navToggle && navActions) {
  navToggle.addEventListener("click", () => {
    navActions.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  // Close menu when clicking on a link
  const navLinks = navActions.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navActions.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !navToggle.contains(e.target) &&
      !navActions.contains(e.target) &&
      navActions.classList.contains("active")
    ) {
      navActions.classList.remove("active");
      navToggle.classList.remove("active");
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const themeLabel = themeToggle?.querySelector(".theme-label");
const root = document.documentElement;

// Check for saved theme preference or default to system preference
const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// Set theme
const setTheme = (theme) => {
  root.setAttribute("data-theme", theme);
  if (theme === "dark") {
    if (themeLabel) themeLabel.textContent = "Light";
  } else {
    if (themeLabel) themeLabel.textContent = "Dark";
  }
  localStorage.setItem("theme", theme);
};

// Initialize theme
setTheme(getPreferredTheme());

// Toggle theme
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });
}
