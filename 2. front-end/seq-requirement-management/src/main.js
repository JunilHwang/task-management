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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

$(document)
  .on('submit', 'form', () => false)
  .on('click', 'a[href="#"]', () => false)