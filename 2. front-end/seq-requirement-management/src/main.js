import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

$(document)
  .on('submit', 'form', () => false)
  .on('click', 'a[href="#"]', () => false)