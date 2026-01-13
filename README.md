# BOUS Persian Cuisine Website

## Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Then open http://localhost:3000

## Deploy (GitHub Pages)

This repo deploys to **GitHub Pages** using the **`gh-pages` branch**.

Deploy (build + publish):

```bash
npm run deploy
```

What it does:
- Builds a static site into `out/`
- Ensures `out/` contains:
  - `CNAME` (custom domain)
  - `.nojekyll` (disables Jekyll so GitHub Pages serves files in underscore-prefixed directories)
- Publishes `out/` to the `gh-pages` branch

### One-time GitHub repo setup

In GitHub:
- Settings → Pages → Build and deployment
  - Source: Deploy from a branch
  - Branch: `gh-pages`
  - Folder: `/` (root)

### Custom domain

The custom domain is set via `public/CNAME` (currently `bous.ca`).
Also set the same domain in GitHub Settings → Pages.
