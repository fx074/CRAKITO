import { createRouter, createWebHistory } from 'vue-router';
import home from '../views/home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
  },
  {
    path: '/receive',
    name: 'receive-main',
    component: () => import('../views/receive-main.vue'),
  },
  {
    path: '/upload',
    name: 'upload-main',
    component: () => import('../views/upload-main.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
