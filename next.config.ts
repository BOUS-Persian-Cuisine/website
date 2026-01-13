import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for GitHub Pages (static hosting) since there's no Node server.
  output: "export",

  // Ensures routes like `/about` get exported as `/about/` (served as `/about/index.html`).
  trailingSlash: true,

  // `next/image` optimization requires a server; disable it for static export.
  images: { unoptimized: true },

  reactStrictMode: true,
  devIndicators: false,
};

export default nextConfig;
