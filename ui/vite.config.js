import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  define: {
    "process.env": process.env,
    global: "window",
  },
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
      "@": "/src", // This is a common alias to refer to the "src" directory.
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: "./src/main.js", // Your main entry file
      },
    },
  },
});
