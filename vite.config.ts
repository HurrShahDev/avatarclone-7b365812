import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,

    proxy: {
      "/__l5e": {
        target: "https://id-preview--38758152-3020-413a-a96c-9abee3a54eb9.lovable.app",
        changeOrigin: true,
      },
    },
  },

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));