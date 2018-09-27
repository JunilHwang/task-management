import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/member/login',
      name: 'login',
      component: () => import('./views/member/login.vue')
    },
    {
      path: '/member/join',
      name: 'join',
      component: () => import('./views/member/join.vue')
    },
    {
      path: '/member/pw-search',
      name: 'pw-search',
      component: () => import('./views/member/pw-search.vue')
    },
    {
      path: '/member/mypage',
      name: 'mypage',
      component: () => import('./views/member/mypage.vue')
    },
    {
      path: '/project',
      name: 'project',
      component: () => import('./views/project/index.vue')
    }
  ]
})