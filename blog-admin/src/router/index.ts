import { createRouter, createWebHashHistory } from 'vue-router';
const Layout = () => import('@/views/layout/Layout.vue');
const Workbench = () => import('@/views/workbench/Workbench.vue');
const Article = () => import('@/views/articles/Article.vue');
const Edit = () => import('@/views/articles/Edit.vue');
const Tag = () => import('@/views/tag/Tag.vue');
const Login = () => import('@/views/login/Login.vue');

const routes = [
  { path: '/', redirect: '/workbench' },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/workbench',
    name: 'Workbench',
    component: Layout,
    children: [
      { path: '', component: Workbench },
      { path: '/article', name: 'Article', component: Article },
      { path: '/article/create', name: 'ArticleCreate', component: Edit },
      { path: '/article/edit', name: 'ArticleUpdate', component: Edit },
      { path: '/tag', component: Tag },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
