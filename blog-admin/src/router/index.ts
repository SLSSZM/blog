import { createRouter, createWebHashHistory } from 'vue-router';
const Layout = () => import('@/views/layout/Layout.vue');
const Workbench = () => import('@/views/workbench/Workbench.vue');
const Article = () => import('@/views/article/Article.vue');
const Edit = () => import('@/views/article/Edit.vue');
const Tag = () => import('@/views/tag/Tag.vue');
const Login = () => import('@/views/login/Login.vue');

const routes = [
  { path: '/', redirect: '/workbench' },
  { path: '/login', component: Login },
  {
    path: '/workbench',
    component: Layout,
    children: [
      { path: '', component: Workbench },
      { path: '/article', component: Article },
      { path: '/article/:type', component: Edit },
      { path: '/tag', component: Tag },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
