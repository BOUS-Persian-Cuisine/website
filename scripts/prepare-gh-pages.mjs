import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.resolve(process.cwd(), "out");
const CNAME = "bous.ca";

function ensureOutDir() {
  if (!fs.existsSync(OUT_DIR)) {
    throw new Error(
      `Expected static export output directory at ${OUT_DIR}. ` +
        `Run \`next build\` (with next.config output: \"export\") first.`,
    );
  }
}

function writeFile(dest, contents) {
  fs.writeFileSync(dest, contents, { encoding: "utf8" });
}

ensureOutDir();

// List only exported public pages. Each language version has its own canonical URL.
const sitePages = JSON.parse(fs.readFileSync(new URL("../src/constants/sitePages.json", import.meta.url), "utf8"));
const entries = sitePages.flatMap(({ en, fr }) => [en, fr]).map(({ path: route }) => {
  if (!fs.existsSync(path.join(OUT_DIR, route, "index.html"))) {
    throw new Error(`Missing exported page for sitemap: ${route}`);
  }
  return `  <url><loc>https://bous.ca${route}</loc></url>`;
});
writeFile(path.join(OUT_DIR, "sitemap.xml"),
  ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...entries, '</urlset>', ''].join("\n"));

// GitHub Pages runs Jekyll by default, which ignores directories like `_next`.
// A `.nojekyll` file at the site root disables that behavior.
writeFile(path.join(OUT_DIR, ".nojekyll"), "");

// Custom domain for GitHub Pages.
writeFile(path.join(OUT_DIR, "CNAME"), `${CNAME}\n`);

console.log(`Prepared ${OUT_DIR} for GitHub Pages (CNAME + .nojekyll).`);
