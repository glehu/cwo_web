import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState(this)],
  state: {
    authenticated: false,
    username: 'admin',
    password: 'admin',
    cart: []
  },
  mutations: {
    logIn (state, user) {
      state.authenticated = true
      state.username = user.email
      state.password = user.password
    },
    logOut (state) {
      state.authenticated = false
      state.username = 'admin'
      state.password = 'admin'
    },
    putInCart (state, itemObj) {
      state.cart.push(itemObj)
    },
    clearCart (state) {
      state.cart = []
    }
  },
  actions: {},
  modules: {}
})
