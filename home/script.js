const navToggle = document.getElementById("navToggle");
const navActions = document.querySelector(".nav-actions");
const themeToggle = document.getElementById("themeToggle");
const themeLabel = themeToggle?.querySelector(".theme-label");
const root = document.documentElement;
const THEME_KEY = "theme";
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

const getSavedTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Ignore storage errors and keep session-level theme only.
  }
};

const applyTheme = (theme) => {
  const nextTheme = theme === "dark" ? "dark" : "light";
  root.setAttribute("data-theme", nextTheme);
  if (themeLabel) {
    themeLabel.textContent = nextTheme === "dark" ? "Light Mode" : "Dark Mode";
  }
};

const initialTheme = getSavedTheme() ?? (darkQuery.matches ? "dark" : "light");
applyTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });
}

const handleSystemThemeChange = (event) => {
  if (!getSavedTheme()) {
    applyTheme(event.matches ? "dark" : "light");
  }
};

if (typeof darkQuery.addEventListener === "function") {
  darkQuery.addEventListener("change", handleSystemThemeChange);
} else if (typeof darkQuery.addListener === "function") {
  darkQuery.addListener(handleSystemThemeChange);
}

if (navToggle && navActions) {
  navToggle.addEventListener("click", () => {
    navActions.classList.toggle("active");
  });

  const navLinks = navActions.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navActions.classList.remove("active");
    });
  });

  document.addEventListener("click", (event) => {
    const clickedOutsideMenu =
      !navToggle.contains(event.target) && !navActions.contains(event.target);

    if (clickedOutsideMenu && navActions.classList.contains("active")) {
      navActions.classList.remove("active");
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") {
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
