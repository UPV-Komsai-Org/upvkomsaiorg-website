const counterEl = document.getElementById("counter");
const incrementBtn = document.getElementById("increment");

let count = 0;

function updateCounter() {
  counterEl.textContent = count;
}

incrementBtn.addEventListener("click", () => {
  count++;
  updateCounter();
});
