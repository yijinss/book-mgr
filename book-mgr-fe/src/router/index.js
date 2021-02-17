import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "about" */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import(/* webpackChunkName: "BasicLayout" */ '../layout/BasicLayout/index.vue'),
    children: [{
      path: '/books',
      name: 'Books',
      component: () => import(/* webpackChunkName: "Books" */ '../views/Books/index.vue'),
    }],

  },
  
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
