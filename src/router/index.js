import Vue from 'vue';
import Router from 'vue-router';
import login from '../views/login.vue';
import register from '../views/register.vue';
import noPage from '../views/404.vue'
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
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue'),
      children: [
        {
          path: '/admin',
          name: 'admin',
          component: () => import('../views/admin.vue'),
          meta:'个人信息'
        },
        {
          path: '/articleList',
          name: 'articleList',
          component: () => import('../views/articleList.vue'),
          meta:'文章列表'
        },
        {
          path: '/write',
          name: 'write',
          component: () => import('../views/write.vue'),
          meta:'添加文章'
        },
        {
          path: '/photoList',
          name: 'photoList',
          component: () => import('../views/photoList.vue'),
          meta:'图片管理'
        },
        {
          path: '/uploadPhotos',
          name: 'uploadPhotos',
          component: () => import('../views/uploadPhotos.vue'),
          meta:'上传图片'
        },
        {
          path: '/visitor',
          name: 'visitor',
          component: () => import('../views/visitorCount.vue'),
          meta:'访客统计'
        },
        {
          path: '/authority',
          name: 'authority',
          component: () => import('../views/authority.vue'),
          meta:'权限管理'
        },
        {
          path: '/recycle',
          name: 'recycle',
          component: () => import('../views/recycle.vue'),
          meta:'回收站'
        },
      ],
    },
    {
      path: '*',
      name: '404',
      component: noPage,
    },
  ],
});
router.beforeEach((to,from,next) => {
  if(to.name==='login' || to.name==='register'){
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