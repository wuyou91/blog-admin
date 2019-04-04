import Vue from 'vue';
import Router from 'vue-router';
import login from '../views/login.vue';
import store from '../store';

Vue.use(Router);

const router = new Router({
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
          meta:'个人信息'
        },
        {
          path: '/home/articleList',
          name: 'articleList',
          component: () => import('../views/articleList.vue'),
          meta:'文章列表'
        },
        {
          path: '/home/write',
          name: 'write',
          component: () => import('../views/write.vue'),
          meta:'添加文章'
        },
        {
          path: '/home/visitor',
          name: 'visitor',
          component: () => import('../views/visitorCount.vue'),
          meta:'访客统计'
        },
        {
          path: '/home/authority',
          name: 'authority',
          component: () => import('../views/authority.vue'),
          meta:'权限管理'
        },
        {
          path: '/home/recycle',
          name: 'recycle',
          component: () => import('../views/recycle.vue'),
          meta:'回收站'
        },
      ],
    },
  ],
});
router.beforeEach((to,from,next) => {
  if(to.name==='login'){
    next()
  }else{
    if(localStorage.getItem('adminInfo')){
       next()
    }else{
      next('/')
    }
  }
})
export default router