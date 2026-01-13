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

// GitHub Pages runs Jekyll by default, which ignores directories like `_next`.
// A `.nojekyll` file at the site root disables that behavior.
writeFile(path.join(OUT_DIR, ".nojekyll"), "");

// Custom domain for GitHub Pages.
writeFile(path.join(OUT_DIR, "CNAME"), `${CNAME}\n`);

console.log(`Prepared ${OUT_DIR} for GitHub Pages (CNAME + .nojekyll).`);
