import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [vue()],
  base: command === 'build' ? '/admin/' : './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '#': resolve(__dirname, 'types'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/veriable.scss";`,
      },
    },
  },
  build: {
    outDir: command === 'build' ? resolve(__dirname, '../server/public/admin') : 'dist',
  },
}));
