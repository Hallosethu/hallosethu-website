// Build script: assembles the single index.html that GitHub Pages serves
// from the modular source files under pages/, components/, sections/ and
// scripts/. GitHub Pages has no server-side includes, so this tiny script
// is the "include" mechanism — run it after editing any partial:
//
//   node build.js
//
// It looks for two kinds of marker comments in pages/home/home.html:
//   <!-- @include: path/to/file.html -->   -> replaced with that file's HTML
//   <!-- @script: path/to/file.js -->      -> replaced with <script>...</script>
//
// No dependencies, no framework — just string concatenation. The output
// (index.html) is a plain static file; nothing about how the site runs in
// the browser changes.

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TEMPLATE = path.join(ROOT, 'pages', 'home', 'home.html');
const OUTPUT = path.join(ROOT, 'index.html');

function readPartial(relativePath) {
  const fullPath = path.join(ROOT, relativePath);
  return fs.readFileSync(fullPath, 'utf8').replace(/\s+$/, '');
}

function build() {
  let html = fs.readFileSync(TEMPLATE, 'utf8');

  html = html.replace(/[ \t]*<!--\s*@include:\s*(.+?)\s*-->/g, (match, relPath) => {
    return readPartial(relPath);
  });

  html = html.replace(/[ \t]*<!--\s*@script:\s*(.+?)\s*-->/g, (match, relPath) => {
    return `<script>\n${readPartial(relPath)}\n</script>`;
  });

  fs.writeFileSync(OUTPUT, html);
  console.log('Built index.html from pages/home/home.html');
}

build();
