import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState(this)],
  state: {
    authenticated: false,
    username: '',
    password: ''
  },
  mutations: {
    logIn (state, user) {
      state.authenticated = true
      state.username = user.email
      state.password = user.password
    },
    logOut (state) {
      state.authenticated = false
      state.username = ''
      state.password = ''
    }
  },
  actions: {},
  modules: {}
})
