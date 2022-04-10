import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  RouteRecordRaw,
} from 'vue-router';

const pageModule = import.meta.glob('../views/**/**.vue');
const pageKeys = Object.keys(pageModule);
const pages: RouteRecordRaw[] = [];
for (const i of pageKeys) {
  const name: RegExpMatchArray | null = i.match(/\.\.\/views\/(.+)\/(.+)\.vue/);
  if (name) {
    if (/\//.test(name[1])) {
      continue;
    }
    if (name[1] === 'layout') {
      continue;
    }
    pages.push({ path: '/' + name[1], name: name[2], component: pageModule[i] });
  }
}
export function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes: [{ path: '/', redirect: '/home' }, ...pages],
    scrollBehavior: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalizedLoaded,
      savedPosition: any
    ) => {
      if (savedPosition) {
        return savedPosition;
      }
      return { top: 0, behavior: 'smooth' };
    },
  });
}
