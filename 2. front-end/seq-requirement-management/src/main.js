import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'
import GAuth from 'vue-google-oauth2'
import axios from 'axios'
import moment from 'moment'

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

const digit = Vue.prototype.digit = num => {
  num = ('0' + num).slice(-2)
  return num
}

Vue.prototype.$memberChk = () => { access(store.state.member, '로그인 후 이용해주세요', '/member/login') }
Vue.prototype.$notMemberChk = () => { access(!store.state.member, '회원은 접근할 수 없습니다') }
Vue.prototype.contentPreview = (text, len) => {
  if (text.length > len) {
    text = text.substring(0, len) + '...'
  }
  return text
}
Vue.prototype.moment = moment
Vue.prototype.getDateFormat = time => {
  const date = new Date(time)
  return moment(date).format('YYYY-MM-DD HH:mm')
}
const getFlowDate = Vue.prototype.getFlowDate = time => {
  const computedTime = +new Date() - (+new Date(time))
  const abs = Math.abs(computedTime)
  const s = 60 * 1000
  const i = s * 60
  const h = i * 24
  let newTime
  if (abs < s) {
    newTime = ~~(computedTime / 1000) + '초'
  } else if (abs < i) {
    newTime = ~~(computedTime / s) + '분'
  } else if (abs < h) {
    newTime = ~~(computedTime / i) + '시간'
  } else {
    newTime = ~~(computedTime / h) + '일'
  }
  return newTime
}
Vue.prototype.$http = axios
Vue.prototype.getRange = (start_date, limit_date, limit_time) => {
  const start = moment(start_date).format('MM. DD HH:mm')
  const limit = moment(limit_date).format('MM. DD HH:mm')
  return `${start} ~ ${limit}`
}
Vue.prototype.getRemaining = (date, toString = true) => {
  const toSecond = new Date(date)
  if (!toString) return toSecond - (+new Date())
  const remaining = getFlowDate(toSecond)
  return parseInt(remaining) > 0 ? `${remaining} 지남` : `${remaining.replace('-', '')} 남음`
}

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