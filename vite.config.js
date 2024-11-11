import { defineConfig } from 'vite';

export default defineConfig({
  base: '/dmh-gaming/',
  server: {
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          background: ['./src/js/background.js'],
          gallery: ['./src/js/gallery.js'],
          gameSlideshow: ['./src/js/gameSlideshow.js'],
          modal: ['./src/js/modal.js']
        }
      }
    }
  }
});