# Ruan Cantamessa Portfolio

Static portfolio site for GitHub Pages (ruan191.github.io). Built with semantic HTML, accessible components, responsive CSS (no framework), and small vanilla JS enhancements.

## Features
- Hero with dynamic GitHub stats (repos, followers)
- Auto-fetched repositories grid with language + search + filter
- Curated video thumbnails (manual list of YouTube IDs)
- Theme toggle (dark/light saved to localStorage)
- Responsive mobile navigation with focus / escape handling
- Accessible forms + semantic landmark structure
- Progressive enhancement (fallback project list if API offline)

## Customization
1. Replace About section placeholder text with richer biography.
2. Update contact form action with a real Formspree ID or backend endpoint.
3. Add your real email in the contact alt list.
4. Place your resume PDF at `assets/Ruan_CV.pdf` or adjust link.
5. Adjust `videoIds` array in `script.js` as you publish new content.
6. Optionally tune which repos show by altering the slice / sort logic.

## Local Development
Just open `index.html` in a modern browser. No build step required.

## Deploy (GitHub Pages)
1. Push these files to the `main` branch of `Ruan191/ruan191.github.io` repository.
2. Ensure Pages is configured (Settings → Pages → Source: Deploy from Branch / main / root).
3. Wait for build (usually a few minutes), then visit: https://ruan191.github.io

## License
You may treat this specific portfolio code as MIT for personal reuse. Remove or modify personal branding if you fork.

---
Crafted for a clean, fast-loading developer showcase with minimal dependencies.
