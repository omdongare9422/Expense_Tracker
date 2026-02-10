// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "static", // Changed to static for Vercel/GitHub Pages compatibility
  integrations: [
    tailwind(),
    react(),
  ],
  server: {
    port: 3000,
  }
});
