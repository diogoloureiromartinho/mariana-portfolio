/**
 * Central media registry.
 *
 * Leave `src` as null until the original export is placed in `public/`.
 * Setting `src` replaces the editorial placeholder without layout changes.
 *
 * Supported files: .png, .jpg, .jpeg, .webp, .svg
 *
 * Untouched masters live in `reference/source-assets/`. The site serves the
 * WebP files below. `width` and `height` match the largest delivery file.
 * Ratios match those files, so cover does not crop a render.
 *
 *   heroWatercolor      /assets/projects/hero-watercolor.webp     1400 × 2000
 *   dtuHero             /assets/projects/dtu-hero.webp            2000 × 1154
 *   terraVistaExploded  /assets/projects/terravista-exploded.webp 1752 × 2000
 *   cascaisHero         /assets/projects/cascais-hero.webp        2400 × 1124
 *   bioclimaticMap      /assets/projects/bioclimatic-map.webp     3019 × 2000
 *   dtuConcept          /assets/projects/dtu-concept.png         2400 × 1600   3:2
 *   dtuPlans            /assets/projects/dtu-plans.png           2400 × 1600   3:2
 *   dtuSection          /assets/projects/dtu-section.png         2800 × 1400   2:1
 *   dtuStructure        /assets/projects/dtu-structure.png       2000 × 1500   4:3
 *   dtuDetail           /assets/projects/dtu-detail.png          1600 × 2000   4:5
 *   terraVistaMaterials /assets/projects/terravista-materials.png 2000 × 1500  4:3
 *   terraVistaWater     /assets/projects/terravista-water.png    1600 × 2000   4:5
 *   terraVistaVentilation /assets/projects/terravista-ventilation.png 2400 × 1350 16:9
 *   terraVistaGrowth    /assets/projects/terravista-growth.png   2400 × 1350   16:9
 *   cascaisSite         /assets/projects/cascais-site.png        2800 × 1400   2:1
 *   cascaisPlans        /assets/projects/cascais-plans.png       2000 × 1500   4:3
 *   cascaisSections     /assets/projects/cascais-sections.png    2800 × 1400   2:1
 *   bioclimaticMatrix   /assets/projects/bioclimatic-matrix.svg  2400 × 1350   16:9
 *   bioclimaticCases    /assets/projects/bioclimatic-cases.svg   2400 × 1500   8:5
 *
 * `ratio` is width / height. `fit` maps to object-fit. `position` maps to
 * object-position. `background` shows behind contained artwork and as the
 * placeholder field.
 */
export const assets = {
  heroWatercolor: {
    src: "/assets/projects/hero-watercolor.webp",
    srcset:
      "/assets/projects/hero-watercolor-840.webp 840w, /assets/projects/hero-watercolor.webp 1400w",
    sizes: "(max-width: 700px) 86vw, (max-width: 900px) min(24rem, 72vw), 34rem",
    width: 1400,
    height: 2000,
    alt: "Architectural watercolour from the portfolio cover",
    label: "Watercolour — Cover",
    ratio: "1400 / 2000",
    fit: "cover",
    position: "center center",
    background: "#FBF7F4",
  },
  dtuHero: {
    src: "/assets/projects/dtu-hero.webp",
    srcset: "/assets/projects/dtu-hero-1280.webp 1280w, /assets/projects/dtu-hero.webp 2000w",
    sizes: "100vw",
    width: 2000,
    height: 1154,
    alt: "DTU Building, educational building in Copenhagen",
    label: "01 — Architectural view",
    ratio: "2000 / 1154",
    fit: "cover",
    position: "center center",
    background: "#D5D8DC",
  },
  terraVistaExploded: {
    src: "/assets/projects/terravista-exploded.webp",
    srcset:
      "/assets/projects/terravista-exploded-1100.webp 1100w, /assets/projects/terravista-exploded.webp 1752w",
    sizes: "(max-width: 900px) 92vw, 54vw",
    width: 1752,
    height: 2000,
    alt: "TerraVista exploded architectural axonometric",
    label: "02 — Exploded axonometric",
    ratio: "1752 / 2000",
    fit: "contain",
    position: "center center",
    background: "#FFFFFF",
  },
  cascaisHero: {
    src: "/assets/projects/cascais-hero.webp",
    srcset:
      "/assets/projects/cascais-hero-1400.webp 1400w, /assets/projects/cascais-hero.webp 2400w",
    sizes: "100vw",
    width: 2400,
    height: 1124,
    alt: "Housing in Cascais, residential project",
    label: "03 — Wide view",
    ratio: "2400 / 1124",
    fit: "cover",
    position: "center center",
    background: "#E7D2C6",
  },
  bioclimaticMap: {
    src: "/assets/projects/bioclimatic-map.webp",
    srcset:
      "/assets/projects/bioclimatic-map-1800.webp 1800w, /assets/projects/bioclimatic-map.webp 3019w",
    sizes: "(max-width: 900px) 92vw, 62vw",
    width: 3019,
    height: 2000,
    alt: "World map locating the residential projects studied in the bioclimatic thesis",
    label: "04 — Map / diagram",
    ratio: "3019 / 2000",
    fit: "contain",
    position: "center center",
    background: "#F7F7F7",
  },
  dtuConcept: {
    src: null,
    alt: "DTU Building concept development diagrams",
    label: "Concept development",
    ratio: "3 / 2",
    fit: "contain",
    position: "center center",
    background: "#DDD4C8",
  },
  dtuPlans: {
    src: null,
    alt: "DTU Building ground floor plan and office floor plan",
    label: "Plans · 1:500",
    ratio: "3 / 2",
    fit: "contain",
    position: "center center",
    background: "#E4E0D8",
  },
  dtuSection: {
    src: null,
    alt: "DTU Building longitudinal section",
    label: "Longitudinal section · 1:200",
    ratio: "2 / 1",
    fit: "contain",
    position: "center center",
    background: "#D9D3CB",
  },
  dtuStructure: {
    src: null,
    alt: "DTU Building structural system of CLT slabs, timber frame and future expansion",
    label: "Structural system",
    ratio: "4 / 3",
    fit: "contain",
    position: "center center",
    background: "#E0D5CB",
  },
  dtuDetail: {
    src: null,
    alt: "DTU Building typical façade-to-floor connection detail",
    label: "Façade detail · 1:10",
    ratio: "4 / 5",
    fit: "contain",
    position: "center center",
    background: "#E6DDD4",
  },
  terraVistaMaterials: {
    src: null,
    alt: "TerraVista local material palette of rammed earth, carriço, lime plaster and eucalyptus",
    label: "Local material palette",
    ratio: "4 / 3",
    fit: "contain",
    position: "center center",
    background: "#E2D3C6",
  },
  terraVistaWater: {
    src: null,
    alt: "TerraVista rainwater collection and storage section",
    label: "Water collection · 1:25",
    ratio: "4 / 5",
    fit: "contain",
    position: "center center",
    background: "#DDD6CE",
  },
  terraVistaVentilation: {
    src: null,
    alt: "TerraVista natural ventilation section and floor plan",
    label: "Natural ventilation",
    ratio: "16 / 9",
    fit: "contain",
    position: "center center",
    background: "#E4E1D9",
  },
  terraVistaGrowth: {
    src: null,
    alt: "TerraVista incremental modular growth from a base unit to two added modules",
    label: "Modular growth · 1:200",
    ratio: "16 / 9",
    fit: "contain",
    position: "center center",
    background: "#E0D6CC",
  },
  cascaisSite: {
    src: null,
    alt: "Housing in Cascais site plan and longitudinal section",
    label: "Site plan · 1:1000",
    ratio: "2 / 1",
    fit: "contain",
    position: "center center",
    background: "#D7D8D2",
  },
  cascaisPlans: {
    src: null,
    alt: "Housing in Cascais floor plan",
    label: "Plan · 1:200",
    ratio: "4 / 3",
    fit: "contain",
    position: "center center",
    background: "#E3DDD4",
  },
  cascaisSections: {
    src: null,
    alt: "Housing in Cascais sections, including natural ventilation",
    label: "Sections · 1:200",
    ratio: "2 / 1",
    fit: "contain",
    position: "center center",
    background: "#DCD6CE",
  },
  bioclimaticMatrix: {
    src: null,
    alt: "Matrix of bioclimatic strategies by climatic context across 38 residential projects",
    label: "Strategies by climate",
    ratio: "16 / 9",
    fit: "contain",
    position: "center center",
    background: "#E4E1D9",
  },
  bioclimaticCases: {
    src: null,
    alt: "Comparison of Torre Verde in Lisbon and Sneglehusene in Aarhus",
    label: "Lisbon and Aarhus",
    ratio: "8 / 5",
    fit: "contain",
    position: "center center",
    background: "#E6DFD6",
  },
};
