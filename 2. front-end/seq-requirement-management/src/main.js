import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

$(document)
	.on('submit', 'form', e => false)
	.on('click', 'a[href="#"]', e => false)