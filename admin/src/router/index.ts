import { createRouter, createWebHashHistory } from 'vue-router';
const Layout = () => import('@/views/layout/Layout.vue');
const Workbench = () => import('@/views/workbench/Workbench.vue');
const Article = () => import('@/views/articles/Article.vue');
const Edit = () => import('@/views/articles/Edit.vue');
const Tag = () => import('@/views/tag/Tag.vue');
const Login = () => import('@/views/login/Login.vue');
const Config = () => import('@/views/config/Config.vue');
const Message = () => import('@/views/message/Message.vue');
const Account = () => import('@/views/account/Account.vue');

const routes = [
  { path: '/', redirect: '/workbench' },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/workbench',
    name: 'Workbench',
    component: Layout,
    children: [
      { path: '', component: Workbench },
      { path: '/config', name: 'Config', component: Config },
      { path: '/account', name: 'Account', component: Account },
      { path: '/message', name: 'Message', component: Message },
      { path: '/article', name: 'Article', component: Article },
      { path: '/article/create', name: 'ArticleCreate', component: Edit },
      { path: '/article/edit', name: 'ArticleUpdate', component: Edit },
      { path: '/tag', name: 'Tag', component: Tag },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
