const ARTBOARD_WIDTH = 1440;

function updateScale() {
  const scale = Math.min(window.innerWidth / ARTBOARD_WIDTH, 1);
  document.documentElement.style.setProperty("--page-scale", `${scale}`);
}

updateScale();
window.addEventListener("resize", updateScale);
window.addEventListener("orientationchange", updateScale);
