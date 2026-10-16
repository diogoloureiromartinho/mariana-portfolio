import "./styles/main.css";
import { projects } from "./data/projects.js";
import { site } from "./data/site.js";
import { applyAssets, escapeHtml, renderFrame, setupNav, setupReveals } from "./lib.js";

const worksRoot = document.querySelector("#works-root");
if (worksRoot) {
  worksRoot.innerHTML = renderWorks(projects);
}

applyAssets();
applyOptionalLinks(site);
setupNav();
setupReveals();

function renderWorks(items) {
  const toc = items
    .map(
      (project, index) => `
        <li class="reveal" style="--reveal-delay: ${index * 50}ms">
          <a class="toc__link" href="${projectHref(project)}">
            <span class="toc__index">${project.index}</span>
            <span class="toc__title">${escapeHtml(project.title)}</span>
            <span class="toc__type">${escapeHtml(project.type)}</span>
            <span class="toc__year">${escapeHtml(project.year)}</span>
          </a>
        </li>`
    )
    .join("");

  const plates = items.map((project) => renderPlate(project)).join("");

  return `
    <section class="contents" id="works" aria-labelledby="works-title">
      <div class="wrap">
        <header class="contents__head reveal">
          <p class="eyebrow">Index</p>
          <h2 id="works-title">Selected Works</h2>
          <p class="contents__range">2020 — 2026</p>
        </header>
        <ol class="toc">
          ${toc}
        </ol>
      </div>
    </section>
    ${plates}`;
}

function renderPlate(project) {
  if (project.layout === "split") return renderSplit(project);
  if (project.layout === "cinema") return renderCinema(project);
  if (project.layout === "research") return renderResearch(project);
  return renderFeature(project);
}

function renderFeature(project) {
  return `
    <section class="plate plate--feature reveal" id="${project.id}" aria-labelledby="${project.id}-title">
      ${linkedFrame(project)}
      <div class="wrap plate__caption">
        <p class="plate__index">${project.index}</p>
        <div class="plate__heading">
          <h3 id="${project.id}-title">${linkedTitle(project)}</h3>
          <p class="meta">${metaLine(project)}</p>
        </div>
        <p class="plate__summary">${escapeHtml(project.summary)}</p>
      </div>
    </section>`;
}

function renderSplit(project) {
  return `
    <section class="plate plate--split reveal" id="${project.id}" aria-labelledby="${project.id}-title">
      <div class="plate--split__visual">
        ${linkedFrame(project)}
      </div>
      <div class="plate--split__copy">
        <p class="plate__index">${project.index}</p>
        <h3 id="${project.id}-title">${linkedTitle(project)}</h3>
        <p class="meta">${metaLine(project)}</p>
        <p class="plate__summary">${escapeHtml(project.summary)}</p>
      </div>
    </section>`;
}

function renderCinema(project) {
  return `
    <section class="plate plate--cinema reveal" id="${project.id}" aria-labelledby="${project.id}-title">
      ${linkedFrame(project)}
      <div class="wrap cinema__caption">
        <div class="cinema__heading">
          <p class="plate__index">${project.index}</p>
          <h3 id="${project.id}-title">${linkedTitle(project)}</h3>
        </div>
        <p class="meta">${metaLine(project)}</p>
        <p class="plate__summary">${escapeHtml(project.summary)}</p>
      </div>
    </section>`;
}

function renderResearch(project) {
  const contexts = (project.contexts || [])
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  return `
    <section class="plate plate--research reveal" id="${project.id}" aria-labelledby="${project.id}-title">
      <div class="wrap">
        <p class="eyebrow">${project.index} — ${escapeHtml(project.type)}</p>
        <h3 class="research__title" id="${project.id}-title">${linkedTitle(project)}</h3>
        <blockquote class="research__question">
          <p>${escapeHtml(project.question || "")}</p>
        </blockquote>
        <div class="research__grid">
          <div class="research__copy">
            <p class="meta">${escapeHtml(project.location)} · ${escapeHtml(project.year)}</p>
            <p class="plate__summary">${escapeHtml(project.summary)}</p>
            <p class="research__contexts-label">Climatic contexts</p>
            <ul class="research__contexts">${contexts}</ul>
          </div>
          <div class="research__figure">
            ${linkedFrame(project)}
          </div>
        </div>
      </div>
    </section>`;
}

function projectHref(project) {
  return `project.html?slug=${project.id}`;
}

function linkedTitle(project) {
  return `<a href="${projectHref(project)}">${escapeHtml(project.title)}</a>`;
}

function linkedFrame(project) {
  return `<a class="plate-link" href="${projectHref(project)}" aria-label="View ${escapeHtml(project.title)}">${renderFrame(project.asset)}</a>`;
}

function metaLine(project) {
  return `${escapeHtml(project.type)} · ${escapeHtml(project.location)} · ${escapeHtml(project.year)}`;
}

function applyOptionalLinks(config) {
  const slot = document.querySelector("[data-optional-links]");
  if (!slot) return;

  const links = [];
  const pdf = typeof config.pdf === "string" ? config.pdf.trim() : "";
  if (isSafeWebPath(pdf)) {
    const link = document.createElement("a");
    link.href = pdf;
    link.textContent = "Portfolio PDF";
    if (/^https?:/i.test(pdf)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.setAttribute("download", "");
    }
    links.push(link);
  }

  const email = typeof config.email === "string" ? config.email.trim() : "";
  const address = email.replace(/^mailto:/i, "");
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
    const link = document.createElement("a");
    link.href = `mailto:${address}`;
    link.textContent = address;
    links.push(link);
  }

  const phone = typeof config.phone === "string" ? config.phone.trim() : "";
  if (isPhone(phone)) {
    const link = document.createElement("a");
    link.href = `tel:${phone.replace(/[^\d+]/g, "")}`;
    link.textContent = phone;
    links.push(link);
  }

  slot.replaceChildren(...links);
}

function isSafeWebPath(value) {
  if (!value || /\s/.test(value)) return false;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isPhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15 && /^[+()\d][\d\s().+-]{6,}$/.test(value);
}
