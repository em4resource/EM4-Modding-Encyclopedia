# Community portal revision

The design adapts the two-row branded header, persistent search, full-width image banner, blue download categories, file listings, and sidebar structure observed on the GTAPoliceMods archive. No GTAPoliceMods artwork, code, user data, file content, or statistics were imported.

References inspected:
- Homepage: https://web.archive.org/web/20220301041855/https://gtapolicemods.com/
- Downloads (archive redirected to this capture): https://web.archive.org/web/20220114035210/https://gtapolicemods.com/files/category/73-grand-theft-auto-v/

The only mod screenshot remains the user-supplied image, credited **Steve_S — 999 OTF Modification**. Its source file is unchanged. CSS crops it to fit the homepage banner and download thumbnail; the file page displays the full image. Other file listings use a document icon and their actual category, without fabricated preview images.

Download records are parsed from the existing Modification Downloads article. All 16 destinations, descriptions, release metadata, and supplied credits remain intact. The new file pages have stable #file/ links. The library supports category filtering, keyword search, sorting, and shareable filter URLs. Dates not present in the original content are not invented; undated entries follow dated entries when sorting by newest dated releases.

The global search covers guides and file records. Keyboard search remains available through / and Ctrl/Cmd+K. The existing slideshow configuration remains in assets/js/community-gallery.js with per-image credits and no controls for a single image.

No accounts, forum, comments, uploads, or backend were implemented. This is a local static website compatible with the existing GitHub Pages workflow; no public deployment was performed.
