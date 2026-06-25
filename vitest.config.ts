import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";

// Configuración de Vitest. Reutiliza los alias del proyecto (@/, @content, @locales).
// Entorno por defecto: node (lógica pura). Los tests que tocan localStorage o el
// DOM declaran `// @vitest-environment jsdom` en su cabecera.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@content": fileURLToPath(new URL("./content", import.meta.url)),
      "@locales": fileURLToPath(new URL("./locales", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.{test,spec}.{ts,tsx}", "tests/**/*.{test,spec}.{ts,tsx}"],
    globals: false,
    coverage: {
      provider: "v8",
      include: ["src/lib/**", "src/state/**"],
      reporter: ["text", "text-summary"],
    },
  },
});
