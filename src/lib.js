import { assets } from "./data/assets.js";

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function renderFrame(assetKey) {
  const asset = assets[assetKey] || {};
  const ratio = asset.ratio || "16 / 9";
  const background = asset.background || "#E6DFD6";
  const label = asset.label || "Plate";

  return `
    <figure class="frame" data-asset="${escapeHtml(assetKey)}" style="--frame-ratio: ${escapeHtml(ratio)}; --frame-bg: ${escapeHtml(background)}">
      <div class="frame__placeholder">
        <span class="frame__marks" aria-hidden="true"></span>
        <span class="frame__cross" aria-hidden="true"></span>
        <p class="frame__label">${escapeHtml(label)}</p>
      </div>
    </figure>`;
}

export function applyAssets({ onReady } = {}) {
  const figures = [...document.querySelectorAll("[data-asset]")];

  figures.forEach((figure, index) => {
    const asset = assets[figure.dataset.asset];
    if (!asset || typeof asset !== "object") return;

    if (asset.ratio) figure.style.setProperty("--frame-ratio", asset.ratio);
    if (asset.background) figure.style.setProperty("--frame-bg", asset.background);
    if (asset.fit) figure.style.setProperty("--frame-fit", asset.fit);
    if (asset.position) figure.style.setProperty("--frame-position", asset.position);

    const label = figure.querySelector(".frame__label");
    if (label && asset.label) label.textContent = asset.label;

    if (!isConfiguredSrc(asset.src)) return;

    const priority = index === 0;
    const image = document.createElement("img");
    image.alt = asset.alt || "";
    image.decoding = "async";
    image.draggable = false;
    image.loading = priority ? "eager" : "lazy";
    if (priority) image.fetchPriority = "high";
    if (asset.width) image.width = asset.width;
    if (asset.height) image.height = asset.height;
    if (asset.srcset) image.srcset = asset.srcset;
    if (asset.sizes) image.sizes = asset.sizes;
    image.dataset.full = asset.src;

    const placeholder = figure.querySelector(".frame__placeholder");
    const markReady = () => {
      image.classList.add("is-ready");
      onReady?.(figure, image);
    };

    image.addEventListener("error", () => {
      image.remove();
      figure.classList.remove("has-media");
      if (placeholder) placeholder.hidden = false;
    });
    image.addEventListener("load", markReady);

    figure.classList.add("has-media");
    if (placeholder) placeholder.hidden = true;
    figure.append(image);
    image.src = asset.src;

    if (image.complete && image.naturalWidth > 0) markReady();
  });
}

export function setupNav() {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

export function setupReveals() {
  const nodes = [...document.querySelectorAll(".reveal")];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -32px 0px" }
  );

  requestAnimationFrame(() => {
    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.94 && rect.bottom > 0;
      if (inView) node.classList.add("is-visible");
      else observer.observe(node);
    });
  });
}

function isConfiguredSrc(src) {
  return typeof src === "string" && src.trim().length > 0;
}
