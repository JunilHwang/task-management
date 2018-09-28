import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: () => import('./views/main.vue')
    },
    {
      path: '/member/login',
      component: () => import('./views/member/login.vue')
    },
    {
      path: '/member/join',
      component: () => import('./views/member/join.vue')
    },
    {
      path: '/member/pw-search',
      component: () => import('./views/member/pw-search.vue')
    },
    {
      path: '/member/mypage',
      component: () => import('./views/member/mypage.vue')
    },
    {
      path: '/member/info-update',
      component: () => import('./views/member/info-update.vue')
    },
    {
      path: '/member/pw-update',
      component: () => import('./views/member/pw-update.vue')
    },
    {
      path: '/project',
      component: () => import('./views/project/index.vue')
    }
  ]
})