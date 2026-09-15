# EM4Resource website

A static, community-run Emergency 4 / 911: First Responders resource library.

## Open locally

Open `index.html` in a browser. No build step or account is needed. The site also
works with a basic local HTTP server and the existing GitHub Pages workflow.

## Navigation

- Home: `#home`
- Full guide library: `#library`
- Downloads: `#downloads`
- Topic groups: `#topic/maps-terrain`
- Categories: `#category/Getting%20Started`
- Articles: `#article/adding-a-vehicle`
- Search: `#search/missing%20texture`

Use `/` or Ctrl/Cmd+K to search. Search covers titles, topics, tags, and full
article text. Articles have stable links and a generated table of contents.
Phone navigation uses the Menu and Browse topics controls. Wide reference
tables and code blocks scroll within the article.

## Files

- `index.html`: semantic page shell, global navigation, search dialog, footer
- `assets/css/styles.css`: responsive design and print styles
- `assets/js/data.js`: original article database
- `assets/js/script-case-studies.js`: original script reference database
- `assets/js/app.js`: routes, search, article reader, menus, code copying
- `assets/img/`, `reference/`, `docs/`: existing images and reference material

All 280 original articles and 16 existing MEGA download links were preserved.
No release versions, documentation claims, or credits were silently rewritten.
The new home, library, grouped topic pages, reader, and downloads page use a
consistent type scale, narrow reading columns, and plain navigation.

## Homepage and slideshow revision — 13 September 2026

The homepage follows the supplied GTAPoliceMods reference more closely: separate masthead and search navigation, a full-width photo hero, an E4M+ feature, three featured files, three guide columns, and community statistics. Alternating charcoal sections use angled dividers. Downloads retain category filters, search, sorting, and individual file pages.

The homepage rotates six approved community screenshots automatically, starting with a shuffled image on each page load. A new slide starts about every 12 seconds, with a two-second crossfade. There are no play, pause, or navigation buttons. Reduced-motion preferences remove the fade while retaining automatic advancement. Hidden tabs suspend rotation.

Each photo has its own creator and modification credit. Add or update entries in `assets/js/community-gallery.js`; homepage styling is in `assets/css/gpm-home.css`. See `docs/design-asset-credits.md` for all six credits.

Original article data and the file library are unchanged. Existing verification reports document earlier revisions; the current delivery check is `docs/homepage-verification.json`.

Previous design backup: `D:/New project/Backups/EM4 Website/Before refined header 2026-09-13`

Screenshots: `D:/New project/EM4 Website Refined Header 2026-09-13/previews`

No accounts or forum features were added. This revision is saved locally and has not been deployed publicly.

## Header refinement

The headline is “The latest and greatest of EM4 modding.” The upper blue utility bar is removed. The Discord announcement banner is restored in Discord blue (#5865F2), matching the header button. Header community buttons are smaller. Slideshow images span the entire page width. The hero matches the archived GPM desktop sizing rule of 60vh (60% of viewport height), with a 360px minimum on small mobile screens. Images use cover sizing with no empty bands, and text and credits overlay the image. Three screenshots containing game UI receive a 5% edge crop so the HUD stays out of view. See `docs/header-verification.json` for viewport checks.

The top green E4M+ launcher announcement banner was removed on 14 September 2026.

The Get help header tab was removed on 14 September 2026. Troubleshooting articles remain available through the guide library and search.
