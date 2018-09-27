import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMember: JSON.parse(localStorage.getItem('member'))
  },
  mutations: {
  	loggedIn (state, data) {
  		state.isMember = data
  		localStorage.setItem('member', JSON.stringify(data))
  	}
  },
  actions: {

  }
})
