import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)


// path
const view = './views'
const member = `${view}/member`
const project = `${view}/project`
const task = `${view}/task`

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: () => import(`${view}/main.vue`)
    },
    {
      path: '/google',
      component: () => import(`${view}/google.vue`)
    },
    {
      path: '/github',
      component: () => import(`${view}/github.vue`)
    },
    {
      path: '/naver/oauth',
      component: () => import(`${view}/naver-oauth.vue`)
    },
    {
      path: '/member/login',
      component: () => import(`${member}/login.vue`)
    },
    {
      path: '/member/join',
      component: () => import(`${member}/join.vue`)
    },
    {
      path: '/member/pw-search',
      component: () => import(`${member}/pw-search.vue`)
    },/*
    {
      path: '/member/mypage',
      component: () => import(`${member}/mypage.vue`)
    },*/
    {
      path: '/member/info-update',
      component: () => import(`${member}/info-update.vue`)
    },
    {
      path: '/member/pw-update',
      component: () => import(`${member}/pw-update.vue`)
    },
    {
      path: '/project/',
      component: () => import(`${project}/index.vue`),
      children: [
        {
          path: '',
          component: () => import(`${project}/main.vue`)
        },
        {
          path: 'create',
          component: () => import(`${project}/create.vue`)
        },
        {
          path: 'view/:pidx',
          component: () => import(`${project}/view.vue`)
        },
        {
          path: 'setting/:pidx',
          component: () => import(`${project}/setting.vue`)
        }
      ]
    },
    {
      path: '/task/',
      component: () => import(`${project}/index.vue`),
      children: [
        {
          path: 'view/:tidx',
          component: () => import(`${task}/view.vue`)
        }
      ]
    }
  ]
})