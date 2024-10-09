import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import css from "vite-plugin-css";

export default defineConfig({
  plugins: [react(), css],
  server: {
    proxy: {
      "/api": {
        target: "https://flathub.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
