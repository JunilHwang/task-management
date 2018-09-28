import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    member: JSON.parse(localStorage.getItem('member')) || null
  },
  mutations: {
    loggedIn (state, data) {
      state.member = data
      localStorage.setItem('member', JSON.stringify(data))
    },
    logout (state) {
      state.member = null
      localStorage.removeItem('member')
    }
  },
  actions: {

  }
})
