import Vue from 'vue';
import Router from 'vue-router';
import login from '../views/login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/home',
      name: 'home',
      redirect: '/home/admin',
      component: () => import('../views/home.vue'),
      children: [
        {
          path: '/home/admin',
          name: 'admin',
          component: () => import('../views/admin.vue'),
        },
        {
          path: '/home/articleList',
          name: 'articleList',
          component: () => import('../views/articleList.vue'),
        },
        {
          path: '/home/authority',
          name: 'authority',
          component: () => import('../views/authority.vue'),
        },
      ],
    },
  ],
});
