import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/IndexPage.vue') }],
  },
  {
    path: '/about',
    component: () => import('../layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/AboutPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFoundPage.vue'),
  },
];

export default routes;
