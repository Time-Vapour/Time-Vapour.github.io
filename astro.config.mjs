import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://Time-Vapour.github.io",
  output: "static"
});
