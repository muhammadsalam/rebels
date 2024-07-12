import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "assets": '/src/assets/',
      "icons": '/src/assets/icons/',
      "app": '/src/app/',
      "pages": '/src/pages/',
      "widgets": '/src/widgets/',
      "features": '/src/features/',
      "entities": '/src/entities/',
      "shared": '/src/shared/',
    }
  },
  plugins: [
    react(),
    svgr(),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer({}) // add options if needed
      ],
    }
  }
})
