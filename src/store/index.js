import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState(this)],
  state: {
    authenticated: false
  },
  mutations: {
    logIn (state) {
      state.authenticated = true
    },
    logOut (state) {
      state.authenticated = false
    }
  },
  actions: {},
  modules: {}
})
