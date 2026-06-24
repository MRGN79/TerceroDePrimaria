import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base path para GitHub Pages: el sitio se sirve desde
// https://<usuario>.github.io/TerceroDePrimaria/ (ver ADR-001 §6).
// HashRouter evita 404 en rutas de cliente sobre Pages.
export default defineConfig({
  base: "/TerceroDePrimaria/",
  plugins: [react()],
});
