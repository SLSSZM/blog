import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(createPinia());
app.mount('#app');

// "dev": "node server",
// "bulid": "yarn build:client && yarn build:server",
// "build:client": "vite build --outDir dist/client",
// "build:server": "vite build --outDir dist/server --ssr src/entry-server.js ",
// "serve": ""cross-env NODE_ENV=production node server",
// "preview": "yarn build && yarn server"
