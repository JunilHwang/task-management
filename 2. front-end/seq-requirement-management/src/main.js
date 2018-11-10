import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'
import GAuth from 'vue-google-oauth2'
import axios from 'axios'

const googleKey = require('./google.key.json')

const access = Vue.prototype.$access = (bool, msg, url = false) => {
  if (!bool) {
    alert(msg)
    if (url) {
      router.push(url)
    } else {
      router.go(-1)
    }
  }
}
Vue.prototype.$memberChk = () => {
  access(store.state.member, '로그인 후 이용해주세요', '/member/login')
}
Vue.prototype.$notMemberChk = () => {
  access(!store.state.member, '회원은 접근할 수 없습니다')
}
Vue.prototype.contentPreview = (text, len) => {
  if (text.length > len) {
    text = text.substring(0, len) + '...'
  }
  return text
}
Vue.prototype.getDateFormat = (time) => {
  const date = new Date(time)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  let h = date.getHours()
  let i = date.getMinutes()
  if (m < 10) m = "0"+m
  if (d < 10) d = "0"+d
  if (h < 10) h = "0"+h
  if (i < 10) i = "0"+i
  const newDate = `${y}-${m}-${d} ${h}:${i}`
  return newDate
}
Vue.prototype.getFlowDate = time => {
  const computedTime = +new Date() - time
  const s = 60 * 1000
  const i = s * 60
  const h = i * 24
  let newTime
  if (computedTime < s) {
    newTime = computedTime + '초'
  } else if (computedTime < i) {
    newTime = ~~(computedTime / s) + '분'
  } else if (computedTime < h) {
    newTime = ~~(computedTime / i) + '시간'
  } else {
    newTime = ~~(computedTime / h) + '일'
  }
  return newTime
}
Vue.prototype.$http = axios

Vue.use(GAuth, {
  clientId: googleKey.web.client_id,
  scope: 'profile email https://www.googleapis.com/auth/plus.login'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

$(document)
  .on('submit', 'form', () => false)
  .on('click', 'a[href="#"]', () => false)