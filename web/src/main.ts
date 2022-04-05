import App from './App.vue';
import { createSSRApp } from 'vue';
import { createRouter } from './router';
import { createPinia } from 'pinia';
import '@/assets/scss/index.scss';

export function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();
  app.use(router);
  app.use(createPinia());
  return { app, router };
}
