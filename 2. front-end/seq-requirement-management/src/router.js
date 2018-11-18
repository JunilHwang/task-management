import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)


// path
const view = './views'
const project = `${view}/project`
const task = `${view}/task`
const schedule = `${view}/schedule`

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      redirect: '/project'
    },
    {
      path: '/naver/oauth',
      component: () => import(`${view}/naver-oauth.vue`)
    },
    {
      path: '/project/',
      component: () => import(`${view}/main.vue`),
      children: [
        {
          path: '',
          component: () => import(`${project}/index.vue`)
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
      component: () => import(`${view}/main.vue`),
      children: [
        {
          path: 'view/:tidx',
          component: () => import(`${task}/view.vue`)
        }
      ]
    },
    {
      path: '/schedule',
      component: () => import(`${view}/main.vue`),
      children: [
        {
          path: '',
          component: () => import(`${schedule}/index.vue`)
        }
      ]
    }
  ]
})