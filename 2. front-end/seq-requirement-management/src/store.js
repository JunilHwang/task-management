import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    member: JSON.parse(sessionStorage.getItem('member')) || null,
    layerState: false,
    categoryList: [],
    selectedCategory: -1,
    pidx: null,
    cardList: [],
    cardNow: {},
    projectData: {},
    projectList: [],
  },
  mutations: {
    loggedIn (state, data) {
      state.member = data
      sessionStorage.setItem('member', JSON.stringify(data))
    },
    logout (state) {
      state.member = null
      sessionStorage.removeItem('member')
    },
    openLayer (state, val) {
      state.layerState = val
    },
    closeLayer (state) {
      state.layerState = false
    },
    setState (state, data) {
      state[data[0]] = data[1]
      if (data[2]) data[2]()
    }
  },
  actions: {

  }
})
