import "./styles/main.css";
import { projects } from "./data/projects.js";
import { applyAssets, escapeHtml, renderFrame, setupNav, setupReveals } from "./lib.js";

const root = document.querySelector("#project");
const slug = new URLSearchParams(window.location.search).get("slug");
const index = projects.findIndex((item) => item.id === slug);
const project = index >= 0 ? projects[index] : null;

if (!project) {
  document.title = "Selected Works — Mariana Silva";
  root.innerHTML = renderMissing();
} else {
  document.title = `${project.title} — Mariana Silva`;
  const description = document.querySelector('meta[name="description"]') || document.head.appendChild(document.createElement("meta"));
  description.setAttribute("name", "description");
  description.setAttribute("content", project.summary);
  root.innerHTML = renderProject(project, projects[(index + 1) % projects.length]);
}

applyAssets({
  onReady(figure, image) {
    mountViewerControl(figure, image);
  },
});
setupNav();
setupReveals();
setupViewer();

function renderProject(item, next) {
  return `
    ${renderHero(item)}
    ${(item.sections || []).map((section, sectionIndex) => renderSection(section, sectionIndex)).join("")}
    ${renderEnd(next)}`;
}

function renderHero(item) {
  if (item.heroLayout === "portrait") return renderPortraitHero(item);
  if (item.heroLayout === "research") return renderResearchHero(item);
  return renderBleedHero(item);
}

function renderBleedHero(item) {
  return `
    <article class="detail-hero detail-hero--bleed">
      <div class="reveal">${renderFrame(item.asset)}</div>
      <div class="wrap detail-hero__intro reveal">
        ${renderIdentity(item)}
        <p class="detail-hero__summary">${escapeHtml(item.summary)}</p>
      </div>
    </article>`;
}

function renderPortraitHero(item) {
  return `
    <article class="detail-hero detail-hero--portrait">
      <div class="detail-hero__grid">
        <div class="detail-hero__visual reveal">${renderFrame(item.asset)}</div>
        <div class="detail-hero__copy reveal">
          ${renderIdentity(item)}
          <p class="detail-hero__summary">${escapeHtml(item.summary)}</p>
        </div>
      </div>
    </article>`;
}

function renderResearchHero(item) {
  return `
    <article class="detail-hero detail-hero--research">
      <div class="wrap">
        ${renderIdentity(item)}
        <blockquote class="research__question reveal">
          <p>${escapeHtml(item.question || "")}</p>
        </blockquote>
        <div class="detail-hero__grid detail-hero__grid--research">
          <p class="detail-hero__summary reveal">${escapeHtml(item.summary)}</p>
          <div class="detail-hero__visual reveal">${renderFrame(item.asset)}</div>
        </div>
      </div>
    </article>`;
}

function renderIdentity(item) {
  return `
    <p class="detail-hero__back"><a href="index.html#works">Selected Works</a></p>
    <p class="plate__index">${escapeHtml(item.index)}</p>
    <h1 class="detail-hero__title">${escapeHtml(item.title)}</h1>
    <p class="meta">${escapeHtml(item.type)} · ${escapeHtml(item.location)} · ${escapeHtml(item.year)}</p>`;
}

function renderSection(section, sectionIndex) {
  const delay = `style="--reveal-delay: ${Math.min(sectionIndex * 40, 120)}ms"`;
  if (section.type === "full") return renderFull(section, delay);
  if (section.type === "plate") return renderPlate(section, delay);
  return renderSplit(section, delay);
}

function renderFull(section, delay) {
  return `
    <section class="band band--full reveal" ${delay}>
      ${section.asset ? renderFrame(section.asset) : ""}
      <div class="wrap band__caption-row">
        ${section.kicker ? `<p class="meta">${escapeHtml(section.kicker)}</p>` : ""}
        ${section.caption ? `<p>${escapeHtml(section.caption)}</p>` : ""}
      </div>
    </section>`;
}

function renderPlate(section, delay) {
  return `
    <section class="band band--plate${section.measure === "narrow" ? " band--narrow" : ""} reveal" ${delay}>
      <div class="wrap">
        ${renderCopy(section, "h2")}
        ${section.asset ? `<div class="band__figure">${renderFrame(section.asset)}</div>` : ""}
        ${section.caption ? `<p class="band__caption">${escapeHtml(section.caption)}</p>` : ""}
        ${section.notes?.length ? renderNotes(section.notes) : ""}
      </div>
    </section>`;
}

function renderSplit(section, delay) {
  const flip = section.flip ? " band--flip" : "";
  const textOnly = section.asset ? "" : " band--text";
  const wide = [];
  if (section.notesPlace === "below" && section.notes?.length) wide.push(renderNotes(section.notes));
  if (section.columns?.length) wide.push(renderColumns(section.columns));

  return `
    <section class="band band--split${flip}${textOnly} reveal" ${delay}>
      ${
        section.asset
          ? `<div class="band__visual">
              ${renderFrame(section.asset)}
              ${section.caption ? `<p class="band__caption">${escapeHtml(section.caption)}</p>` : ""}
            </div>`
          : ""
      }
      <div class="band__copy">
        ${renderCopy(section, "h2")}
        ${section.notesPlace !== "below" && section.notes?.length ? renderNotes(section.notes) : ""}
      </div>
      ${wide.length ? `<div class="band__wide">${wide.join("")}</div>` : ""}
    </section>`;
}

function renderCopy(section, heading) {
  return `
    ${section.kicker ? `<p class="eyebrow">${escapeHtml(section.kicker)}</p>` : ""}
    ${section.title ? `<${heading} class="band__title">${escapeHtml(section.title)}</${heading}>` : ""}
    ${section.text ? `<p class="band__text">${escapeHtml(section.text)}</p>` : ""}`;
}

function renderNotes(notes) {
  return `
    <ol class="steps">
      ${notes
        .map(
          (note) => `
          <li>
            <span class="steps__index">${escapeHtml(note.index)}</span>
            <p class="steps__title">${escapeHtml(note.title)}</p>
            ${note.text ? `<p class="steps__text">${escapeHtml(note.text)}</p>` : ""}
          </li>`
        )
        .join("")}
    </ol>`;
}

function renderColumns(columns) {
  return `
    <div class="compare">
      ${columns
        .map(
          (column) => `
          <article class="compare__col">
            ${column.kicker ? `<p class="meta">${escapeHtml(column.kicker)}</p>` : ""}
            <h3>${escapeHtml(column.title)}</h3>
            ${column.meta ? `<p class="compare__meta">${escapeHtml(column.meta)}</p>` : ""}
            ${column.label ? `<p class="compare__label">${escapeHtml(column.label)}</p>` : ""}
            ${column.text ? `<p class="band__text">${escapeHtml(column.text)}</p>` : ""}
            ${
              column.points?.length
                ? `<ol class="points">
                    ${column.points
                      .map(
                        (point) => `
                        <li>
                          <span>${escapeHtml(point.index)}</span>
                          <p><span class="points__name">${escapeHtml(point.title)}</span> ${escapeHtml(point.text)}</p>
                        </li>`
                      )
                      .join("")}
                  </ol>`
                : ""
            }
          </article>`
        )
        .join("")}
    </div>`;
}

function renderEnd(next) {
  return `
    <nav class="detail-end" aria-label="Continue">
      <a class="detail-end__back" href="index.html#works">All selected works</a>
      <a class="detail-end__next" href="project.html?slug=${next.id}">
        <span class="meta">Next · ${escapeHtml(next.index)}</span>
        <span class="detail-end__title">${escapeHtml(next.title)}</span>
        <span class="meta">${escapeHtml(next.type)} · ${escapeHtml(next.location)} · ${escapeHtml(next.year)}</span>
      </a>
    </nav>`;
}

function renderMissing() {
  const links = projects
    .map(
      (item) =>
        `<li><a href="project.html?slug=${item.id}"><span>${escapeHtml(item.index)}</span> ${escapeHtml(item.title)}</a></li>`
    )
    .join("");

  return `
    <article class="detail-missing wrap">
      <p class="eyebrow">Selected Works</p>
      <h1 class="detail-hero__title">This project is not in the portfolio.</h1>
      <p class="band__text">The address does not match one of the four selected works.</p>
      <ol class="missing-list">${links}</ol>
      <p><a href="index.html#works">Back to selected works</a></p>
    </article>`;
}

function mountViewerControl(figure, image) {
  if (figure.querySelector(".frame__view")) return;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "frame__view";
  button.textContent = "View";
  const open = () => openViewer(image.dataset.full || image.currentSrc || image.src, image.alt);
  button.addEventListener("click", open);
  image.addEventListener("click", open);
  figure.append(button);
}

function setupViewer() {
  const dialog = document.querySelector("#viewer");
  if (!dialog) return;
  const stage = dialog.querySelector(".viewer__stage");

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    if (history.state?.viewer) history.back();
    else closeViewer();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog && history.state?.viewer) history.back();
  });

  dialog.querySelector("[data-viewer-close]")?.addEventListener("click", () => {
    if (history.state?.viewer) history.back();
    else closeViewer();
  });

  window.addEventListener("popstate", () => {
    if (dialog.open) closeViewer();
  });

  function closeViewer() {
    dialog.close();
    stage.replaceChildren();
  }

  window.__openViewer = (src, alt) => {
    const picture = document.createElement("img");
    picture.alt = alt || "";
    picture.src = src;
    stage.replaceChildren(picture);
    if (!dialog.open) dialog.showModal();
    if (!history.state?.viewer) history.pushState({ viewer: true }, "");
  };
}

function openViewer(src, alt) {
  if (!src) return;
  window.__openViewer?.(src, alt);
}
