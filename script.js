// === Verjaardag instellen ===
const MONTH = 6; // 1 = januari, 6 = juni, 12 = december
const DAY = 18;  // dag in de maand

function updateCountdown() {
  const now = new Date();
  const year = now.getFullYear();
  let birthday = new Date(year, MONTH - 1, DAY, 0, 0, 0, 0);
  if (birthday < now) birthday = new Date(year + 1, MONTH - 1, DAY, 0, 0, 0, 0);

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

document.addEventListener("DOMContentLoaded", () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

// === PWA installatieknop ===
let deferredPrompt = null;
const installBtn = document.getElementById("installBtn");

// Ben je al als app geopend?
const isStandalone =
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;

// Toon knop standaard; verberg alleen als standalone
if (installBtn) {
  if (isStandalone) {
    installBtn.style.display = "none";
  } else {
    installBtn.style.display = "inline-block";
  }
}

// Chrome/Edge: onderschep prompt
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // knop blijft zichtbaar
});

// Klik op knop
if (installBtn) {
  installBtn.addEventListener("click", async () => {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (deferredPrompt) {
      installBtn.disabled = true;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
      if (outcome === "accepted") {
        installBtn.textContent = "Geïnstalleerd";
        installBtn.style.display = "none";
      } else {
        installBtn.disabled = false;
      }
      return;
    }

    if (isIOS && isSafari) {
      alert('Open de deelknop, kies "Zet op beginscherm", bevestig de naam.');
      return;
    }

    alert("Installeren wordt niet ondersteund in deze browser. Probeer Chrome of Edge.");
  });
}

// Na installatie: knop verbergen
window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  if (installBtn) installBtn.style.display = "none";
});

// === Service Worker registratie ===
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js")
    .then(() => console.log("Service Worker geregistreerd"))
    .catch(err => console.log("Service Worker fout", err));
}
