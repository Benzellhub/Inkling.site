import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'pages/home.html'),
        cart: resolve(__dirname, 'pages/cart.html'),
      },
    },
  },
});
