# abbasizhr.github.io

Academic homepage for Zahra Abbasi, Ph.D. — optics and photonics, computational
imaging, optical metrology.

Static site, no build step. Deployed to GitHub Pages by
`.github/workflows/static.yml` on every push to `main`.

## Layout

```
index.html                              Profile, selected projects, featured
                                        projects overview, experience, awards
projects/computational-optics.html      Featured project: Fourier-optics simulator
projects/bioimage.html                  Featured project: bioimage measurement
style.css                               All styling, shared by every page
script.js                               Scroll reveal + click-to-enlarge lightbox
resources/                              Figures and the CV PDF
```

Both project pages reuse `style.css` and `script.js`, so the reveal animations
and the figure lightbox work on them without any extra code. Relative links go
up one level (`../style.css`, `../resources/...`).

## Editing

- **A new project page** — copy either file in `projects/`, keep the `<header
  class="project-hero">` / `section.section` structure, and add a card to the
  `.featured-grid` in `index.html`.
- **Figures** — drop a PNG in `resources/` and reference it from a
  `figure.figure-card`; the lightbox picks it up automatically from the
  `.figure-zoom` button wrapper.
- **Colours and spacing** — the custom properties at the top of `style.css`.
