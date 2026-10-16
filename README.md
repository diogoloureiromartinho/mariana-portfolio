# Mariana Silva — Architecture Portfolio

Editorial site for Mariana Silva. The direction is **Architectural Monograph × Digital Gallery**: a quiet printed monograph, not a product landing page.

This file is the handoff. Read it before changing layout, copy, or assets.

## Status

Three tasks are done. Work is paused for creative review.

| Task | Result |
|---|---|
| 01 — Homepage | Editorial homepage with four project previews, About, and footer |
| 02 — Project pages | One shared detail template for all four works |
| 03 — First assets | Five original images integrated, framed, and served as WebP |

Do not redesign the homepage. Do not add pages, dependencies, or deployment unless a new task says so.

## What this is

A static portfolio. Visitors read architectural thinking through a curated sequence of plates, not a gallery carousel.

Four works, in this order:

1. **DTU Building** — educational building, Copenhagen, 2025. Modular construction, daylight, spatial flexibility, structural logic.
2. **TerraVista** — modular housing, Cape Verde, 2024. Environmental thinking: rammed earth, water, ventilation, growth.
3. **Housing in Cascais** — residential, Aldeia da Areia, 2020. Courtyards, privacy, landscape.
4. **Comparative Analysis of Bioclimatic Techniques** — master’s thesis, Lisbon and Copenhagen, 2026. Research, not a dashboard.

The only factual source is `reference/Mariana_Silva_Architecture_Portfolio_2026.pdf` (16-page Illustrator portfolio). Copy already in `src/data/projects.js` was taken from that PDF. Do not invent biography, job title, qualifications, awards, contact details, or drawing labels. Do not reconstruct the thesis frequency chart from memory: the PDF text extraction does not reliably map numbers to cells. That chart waits for `bioclimatic-matrix`.

If a fact is not in the PDF or already in the data files, leave it out.

## Stack

Vite, vanilla JavaScript, one CSS file. No React, no router, no animation library, no UI kit, no backend.

```
npm install
npm run dev      # http://localhost:5173
npm run build    # writes dist/index.html and dist/project.html
npm run preview
```

`vite.config.js` must keep both HTML files as Rollup inputs. Without `project.html` in that input, the production build drops the detail page.

## Art direction

Locked. Refine spacing only when a real image shows that the current frame fails.

- Background `#F8F7F4`
- Type `#252522`
- Accent `#B87C69`
- Rules `#D8D1C9`
- Helvetica Neue, Helvetica, Arial
- Em dashes for year ranges. Typographic apostrophe in Master’s.
- Generous whitespace, strong type hierarchy, hairline rules
- Motion is a short fade and a 20px rise. Honour `prefers-reduced-motion`.
- No sliders, carousels, page-transition libraries, or decorative effects

Homepage structure, top to bottom:

- Fixed nav: Mariana Silva, Selected Works, About
- Split hero: name, “Architecture Portfolio”, 2020—2026, Copenhagen, Denmark, cover watercolour
- Index of the four works, then a preview plate for each
- About: “Selected works, 2020—2026.” and those four works only. No “based in Copenhagen” biography.
- Footer: Mariana Silva, Copenhagen, 2026

`src/data/site.js` holds `pdf`, `email`, and `phone`. All three stay `null` until a real value exists. The homepage already hides them when invalid.

## How the site is built

| Path | Role |
|---|---|
| `index.html` | Homepage shell. Preloads the cover watercolour. |
| `project.html` | Detail shell. Body class `is-detail`. Includes the fullscreen dialog. |
| `src/main.js` | Renders the homepage from `projects`. |
| `src/project.js` | Reads `?slug=` and renders one project. |
| `src/lib.js` | Shared frames, asset binding, nav state, scroll reveals. |
| `src/styles/main.css` | All layout. Detail rules are scoped under `.is-detail`. |
| `src/data/projects.js` | Copy, order, hero layout, and section sequence. |
| `src/data/assets.js` | Every image: path, ratio, fit, alt, placeholder colour. |
| `src/data/site.js` | Optional PDF, email, and phone. |
| `public/assets/projects/` | Files the browser is allowed to request. |
| `reference/source-assets/` | Untouched masters of the five integrated images. |
| `reference/Mariana_Silva_Architecture_Portfolio_2026.pdf` | Factual source. |

Detail URLs:

- `/project.html?slug=dtu`
- `/project.html?slug=terravista`
- `/project.html?slug=cascais`
- `/project.html?slug=bioclimatic`

An unknown slug shows a short missing state and links to the four works. Next-project order is cyclic. “All selected works” returns to `index.html#works`. The browser back button leaves the page; while the fullscreen viewer is open, back closes the viewer and stays on the project.

Homepage index, titles, and preview images link to these URLs. Section ids (`#dtu`, `#terravista`, `#cascais`, `#bioclimatic`) stay on the homepage.

## Detail template

One template. Do not copy a page per project.

Hero layouts, set by `heroLayout`:

- `bleed` — full-width image, then title, place, year, typology, introduction. DTU and Cascais.
- `portrait` — image and text side by side. TerraVista.
- `research` — title, research question, summary, then the map. The thesis.

Section types, set by `sections[].type`. Vary the sequence. Do not give every project the same rhythm.

- **Full bleed** (`full`) — large image, almost the viewport, minimal caption.
- **Editorial split** (`split`) — asymmetric image and text. `flip` swaps sides. `notes` can sit below. `columns` is the Lisbon / Aarhus comparison.
- **Technical plate** (`plate`) — drawing contained, never cropped. `measure: "narrow"` caps a tall detail.

A plate’s image uses `object-fit: contain` even if the asset record says otherwise. See `.band--plate` in the CSS.

## Images

`src/data/assets.js` is the only place that points at a file.

- `src: null` means a drawn placeholder. No `img` is created, so the browser does not request a missing file.
- A broken file removes the image and restores the placeholder.
- `ratio` is the frame’s aspect ratio. Match the file. Do not stretch.
- Renders use `cover`. Because the ratio matches the file, cover does not crop the building.
- Axonometrics, plans, sections, and diagrams use `contain`. Do not crop linework or labels.
- `width` and `height` are the intrinsic size of the largest delivery file.
- `srcset` and `sizes` let the browser pick a smaller file. Fullscreen must open `src`, the largest file, not the responsive candidate.
- The first frame on a page is eager and `fetchpriority="high"`. Later frames are lazy.
- The homepage preloads the cover watercolour. Keep that `imagesrcset` in sync with `heroWatercolor` in `assets.js`.

The five integrated images:

| Key | Delivery | Notes |
|---|---|---|
| `heroWatercolor` | `hero-watercolor.webp` and `-840` | Cover watercolour, 1400×2000. Flattened onto `#FBF7F4` for the web file only. |
| `dtuHero` | `dtu-hero.webp` and `-1280` | 2000×1154 |
| `terraVistaExploded` | `terravista-exploded.webp` and `-1100` | 1752×2000, **lossless** WebP. The canvas has wide white margins; that whitespace is part of the drawing. Do not crop it. |
| `cascaisHero` | `cascais-hero.webp` and `-1400` | 2400×1124 |
| `bioclimaticMap` | `bioclimatic-map.webp` and `-1800` | 3019×2000. A location map, not a chart. The pale continents and empty lower margin are in the artwork. |

Masters, unmodified, are in `reference/source-assets/`:

- `hero-watercolor.png` (about 1.9 MB)
- `dtu-hero.jpg`
- `terravista-exploded.png`
- `cascais-hero.jpg`
- `bioclimatic-map.png`

Do not edit those masters. Do not commit generated stand-in architecture. When a new Illustrator export arrives, copy the master into `reference/source-assets/`, write a WebP into `public/assets/projects/`, and set `src` in `assets.js`. Keep line drawings lossless or near-lossless. Photographs can be lossy WebP if the building edges stay clean.

### Still missing

These keys are `src: null`. Suggested filenames are in the comment at the top of `assets.js`.

DTU: `dtu-concept`, `dtu-plans`, `dtu-section`, `dtu-structure`, `dtu-detail`

TerraVista: `terravista-materials`, `terravista-water`, `terravista-ventilation`, `terravista-growth`

Cascais: `cascais-site`, `cascais-plans`, `cascais-sections`

Thesis: `bioclimatic-matrix`, `bioclimatic-cases`

The thesis methodology section is type only. It has no image key.

## Plan from here

The agreed sequence was homepage, then project pages, then the first five images, then a stop for review. That stop is now.

When the next task arrives, stay inside it. Likely work, only if asked:

1. Drop in the missing drawings through `assets.js`. Check each plate at 1440, 768, and 375. Contain drawings. Do not recrop the homepage heroes to make room.
2. Set `pdf`, `email`, or `phone` in `site.js` only when a real value is supplied.
3. Deploy only when explicitly requested.

Out of scope unless a task asks for it: a new visual system, a framework, a CMS, case-study pages beyond the four works, animation libraries, stock or generated images, and typing the thesis percentages into HTML.

## Checks before handing work back

- `npm run build` emits both `dist/index.html` and `dist/project.html`.
- Homepage and all four detail URLs at 1440, 768, and 375.
- No horizontal overflow.
- No request for an image whose `src` is null.
- Placeholders keep their aspect ratio.
- Reduced motion still shows the text.
- Fullscreen appears only after a real image has loaded, and it uses the large file.
- New copy can be pointed at a sentence in the PDF.
