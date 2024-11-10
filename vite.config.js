import { defineConfig } from 'vite';

export default defineConfig({
  base: '/dmh-gaming/',
  server: {
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});