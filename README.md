# hallosethu-website
Hallosethu Official Website

## Project structure

The site is plain HTML/CSS/JS (no framework, no npm dependencies). It used
to be one ~7,700-line `index.html`; it's now split into focused files, with
a tiny build script that reassembles the single `index.html` GitHub Pages
actually serves.

```
pages/home/home.html   Master template: <head>, CSS <link> tags, and
                        @include / @script markers marking where each
                        component/section's markup and script belong.
components/            Pieces reused across the page (or standalone
                        overlays): navbar, announcement-bar, footer,
                        login-modal, welcome-popup, coming-soon-modal,
                        education-inquiry-modal, chatbot.
sections/               Each major landing-page section: hero, promo-strip,
                        services, about, ai-assistant, faq, contact,
                        education-overlay.
styles/                 Site-wide CSS: variables.css (design tokens),
                        reset.css, global.css (shared base classes,
                        animations, cross-section responsive rules).
scripts/main.js         Page-wide behaviour: logo-placeholder swap,
                        scroll-reveal animation, global Escape-key handler.
assets/images/          logo.png / favicon.png (the site's own real
                        images — see note below).
build.js                Assembles pages/home/home.html + every
                        component/section file into the root index.html.
index.html              Generated output — this is what GitHub Pages
                        serves. Don't hand-edit it; edit the source files
                        and run `node build.js` instead.
firebase-auth.js        Unchanged, already-standalone Firebase module.
login.html              Unchanged, separate page (not part of this pass).
```

Each component/section folder has an `.html` and `.css` file, and a `.js`
file only where that piece actually needs one (no empty stubs).

## Making a change

1. Edit the relevant file under `components/`, `sections/`, `styles/` or
   `scripts/` (or `pages/home/home.html` for `<head>` tags, marker order,
   or CSS `<link>` order).
2. Run `node build.js` to regenerate `index.html`.
3. Commit both the source file(s) and the regenerated `index.html`.

`build.js` has no dependencies — it just does string substitution, so any
Node install works.

## Note on assets

`logo.png` and `favicon.png` also still exist at the repo root (unchanged)
because `index-main.html` — an unrelated leftover file, not part of the
served site — references them at that path. `assets/images/` holds the
copies the live site actually uses now; new images should go there.
