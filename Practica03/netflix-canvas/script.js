import { canvasData } from "./data.js";

const canvas = document.querySelector("#canvas");
const backdrop = document.querySelector("#backdrop");
const announcer = document.querySelector("#announcer");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let activeCard = null;
let activeSlot = null;
let returnFocus = null;
let closeButton = null;
let animationToken = 0;

const iconPaths = {
  partners: '<path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8-1a3.5 3.5 0 1 0 0-7M2 20a6 6 0 0 1 12 0m1-5a5 5 0 0 1 7 4v1"/>',
  activities: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/><path d="M8 7h8M8 11h6"/>',
  resources: '<path d="M12 3 3.5 7.5 12 12l8.5-4.5L12 3Z"/><path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5"/>',
  value: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>',
  relationship: '<path d="M20.8 8.6c0 4.4-8.8 10-8.8 10S3.2 13 3.2 8.6A4.6 4.6 0 0 1 12 6.4a4.6 4.6 0 0 1 8.8 2.2Z"/>',
  channels: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4m-5-12 3 2-3 2m5 0h3"/>',
  segments: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0m2-12a3.5 3.5 0 0 1 0 7m1 2a5 5 0 0 1 3 4"/>',
  costs: '<circle cx="12" cy="12" r="9"/><path d="M16 8.5c-.8-.9-2-1.4-3.6-1.4-2 0-3.4 1-3.4 2.5 0 3.7 6.8 1.4 6.8 5 0 1.5-1.4 2.6-3.7 2.6-1.7 0-3.1-.5-4.1-1.5M12 5v14"/>',
  revenue: '<path d="M3 18h18M5 15l4-4 3 2 6-7"/><path d="M14 6h4v4"/>'
};

function svgIcon(name, className = "") {
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]}</svg>`;
}

function createCard(item) {
  const slot = document.createElement("div");
  slot.className = "slot";
  slot.dataset.id = item.id;
  const panel = document.createElement("div");
  panel.className = "panel";
  const card = document.createElement("button");
  card.className = "card";
  card.type = "button";
  card.setAttribute("aria-expanded", "false");
  card.setAttribute("aria-label", `${item.titulo}: ${item.resumen}`);
  card.innerHTML = `${svgIcon(item.icono, "card-icon")}<h2 class="card-title">${item.titulo}</h2><p class="card-summary">${item.resumen}</p>`;
  const content = document.createElement("div");
  content.className = "expanded-content";
  const list = item.puntos.map(point => `<li class="point">${svgIcon("arrow", "point-arrow")}<div><h3>${point.encabezado}</h3><p>${point.descripcion}</p></div></li>`).join("");
  content.innerHTML = `<p class="expanded-subtitle">${item.subtitulo}</p><p class="metric">${item.metrica}</p><p class="detail-label">DETALLE COMPLETO</p><ul class="point-list">${list}</ul>`;
  card.append(content);
  panel.append(card);
  slot.append(panel);
  card.addEventListener("click", () => openCard(card, slot, item));
  return slot;
}

iconPaths.arrow = '<path d="M4 12h15m-6-6 6 6-6 6"/>';
canvasData.forEach(item => canvas.append(createCard(item)));

function setOtherCardsInert(openCard) {
  canvas.querySelectorAll(".card").forEach(card => {
    if (card !== openCard) {
      card.inert = true;
      card.classList.add("is-dimmed");
    }
  });
}

function releaseOtherCards() {
  canvas.querySelectorAll(".card").forEach(card => {
    card.inert = false;
    card.classList.remove("is-dimmed");
  });
}

function focusableElements() {
  return [closeButton].filter(element => element && !element.disabled);
}

function trapFocus(event) {
  if (!activeCard || event.key !== "Tab") return;
  const focusable = focusableElements();
  if (!focusable.length) return;
  event.preventDefault();
  focusable[0].focus();
}

function makeCloseButton() {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "close-button";
  button.setAttribute("aria-label", "Cerrar detalle");
  button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
  button.addEventListener("click", closeCard);
  return button;
}

function openCard(card, slot, item) {
  if (activeCard) return;
  activeCard = card;
  activeSlot = slot;
  returnFocus = card;
  const start = card.getBoundingClientRect();
  slot.style.setProperty("--slot-h", `${start.height}px`);
  setOtherCardsInert(card);
  card.setAttribute("aria-expanded", "true");
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-modal", "true");
  card.setAttribute("aria-labelledby", `title-${item.id}`);
  card.querySelector(".card-title").id = `title-${item.id}`;
  card.classList.add("is-open");
  document.body.classList.add("has-open-card");
  backdrop.classList.add("is-visible");
  backdrop.setAttribute("aria-hidden", "false");
  closeButton = makeCloseButton();
  document.body.append(closeButton);
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("focusin", keepFocusInside);
  announcer.textContent = `Detalle de ${item.titulo} abierto`;
  closeButton.focus({ preventScroll: true });
  const end = card.getBoundingClientRect();
  animateFlip(card, start, end, true);
}

function animateFlip(card, from, to, opening) {
  const token = ++animationToken;
  if (reduceMotion.matches) {
    card.animate([{ opacity: opening ? 0 : 1 }, { opacity: opening ? 1 : 0 }], { duration: 160, easing: "ease-in-out" });
    if (!opening) finishClose(token);
    return;
  }

  const frames = opening
    ? [
        { opacity: 0, transform: "scale(0.9) translateY(16px)" },
        { opacity: 1, transform: "scale(1) translateY(0)" }
      ]
    : [
        { opacity: 1, transform: "scale(1) translateY(0)" },
        { opacity: 0, transform: "scale(0.92) translateY(12px)" }
      ];

  const animation = card.animate(frames, {
    duration: 260,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    fill: "both"
  });

  if (!opening) animation.onfinish = () => finishClose(token);
}

function closeCard() {
  if (!activeCard || activeCard.classList.contains("is-closing")) return;
  const card = activeCard;
  const slot = activeSlot;
  const start = card.getBoundingClientRect();
  const end = slot.getBoundingClientRect();
  card.classList.add("is-closing");
  backdrop.classList.remove("is-visible");
  backdrop.setAttribute("aria-hidden", "true");
  if (reduceMotion.matches) {
    const fade = card.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, easing: "ease-in-out", fill: "both" });
    const token = ++animationToken;
    fade.onfinish = () => finishClose(token);
  } else {
    animateFlip(card, start, end, false);
  }
}

function finishClose(token) {
  if (token !== animationToken || !activeCard) return;
  const card = activeCard;
  card.getAnimations().forEach(animation => animation.cancel());
  card.classList.remove("is-closing", "is-open");
  card.removeAttribute("role");
  card.removeAttribute("aria-modal");
  card.removeAttribute("aria-labelledby");
  card.setAttribute("aria-expanded", "false");
  card.querySelector(".card-title").removeAttribute("id");
  closeButton?.remove();
  activeSlot.style.removeProperty("--slot-h");
  document.body.classList.remove("has-open-card");
  document.removeEventListener("keydown", onKeyDown);
  document.removeEventListener("focusin", keepFocusInside);
  releaseOtherCards();
  activeCard = null;
  activeSlot = null;
  closeButton = null;
  returnFocus?.focus({ preventScroll: true });
  returnFocus = null;
  announcer.textContent = "Detalle cerrado";
}

function keepFocusInside(event) {
  if (activeCard && !activeCard.contains(event.target)) closeButton?.focus({ preventScroll: true });
}

function onKeyDown(event) {
  if (event.key === "Escape") {
    event.preventDefault();
    closeCard();
  } else {
    trapFocus(event);
  }
}

backdrop.addEventListener("click", closeCard);
