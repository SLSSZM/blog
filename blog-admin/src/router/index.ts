import { createRouter, createWebHashHistory } from 'vue-router';
const Layout = () => import('@/views/layout/Layout.vue');
const Workbench = () => import('@/views/workbench/Workbench.vue');
const Post = () => import('@/views/post/Post.vue');
const Edit = () => import('@/views/post/Edit.vue');
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
      { path: '/post', name: 'Post', component: Post },
      { path: '/post/create', name: 'PostCreate', component: Edit },
      { path: '/post/edit', name: 'PostUpdate', component: Edit },
      { path: '/tag', component: Tag },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
