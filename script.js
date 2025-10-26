// === Verjaardag instellen ===
// Pas deze twee waarden aan naar jouw verjaardag
const MONTH = 6; // 1 = januari, 6 = juni, 12 = december
const DAY = 18;  // dag in de maand

function updateCountdown() {
  const now = new Date();
  const year = now.getFullYear();

  // Verjaardag dit jaar
  let birthday = new Date(year, MONTH - 1, DAY, 0, 0, 0, 0);

  // Als verjaardag al geweest is, pak volgend jaar
  if (birthday < now) {
    birthday = new Date(year + 1, MONTH - 1, DAY, 0, 0, 0, 0);
  }

  const distance = birthday - now;
  const days = Math.ceil(distance / (1000 * 60 * 60 * 24));

  const daysEl = document.getElementById("days");
  const messageEl = document.getElementById("message");
  const countdownEl = document.getElementById("countdown");

  if (distance <= 0) {
    countdownEl.style.display = "none";
    messageEl.innerText = "🎉 Gefeliciteerd! 🎉";
  } else {
    countdownEl.style.display = "block";
    daysEl.innerText = days;
    messageEl.innerText = `Nog ${days} dagen tot je verjaardag`;
  }
}

// Start wanneer de DOM klaar is
document.addEventListener("DOMContentLoaded", () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

// Service Worker alleen hier registreren
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js")
    .then(() => console.log("Service Worker geregistreerd"))
    .catch(err => console.log("Service Worker fout", err));
}
