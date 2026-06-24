import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// Base path para GitHub Pages: el sitio se sirve desde
// https://<usuario>.github.io/TerceroDePrimaria/ (ver ADR-001 §6).
// HashRouter evita 404 en rutas de cliente sobre Pages.
export default defineConfig({
  base: "/TerceroDePrimaria/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@content": fileURLToPath(new URL("./content", import.meta.url)),
      "@locales": fileURLToPath(new URL("./locales", import.meta.url)),
    },
  },
});
