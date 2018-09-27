import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('./views/Main.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
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
    }
  ]
})