import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState(this)],
  state: {
    // --- Server ---
    serverIP: 'https://wikiric.xyz',
    // --- Cookies ---
    cookieAllowance: false,
    cookies: [
      {
        type: 'Essential',
        allowed: false
      }
    ],
    // --- Tracking ---
    usageTracking: false,
    // --- Authentication ---
    authenticated: false,
    token: '',
    username: 'admin',
    password: 'admin',
    // --- Web Shop ---
    shop: {},
    cart: []
  },
  mutations: {
    logIn (state, user) {
      state.authenticated = true
      state.token = user.token
      state.username = user.email
      state.password = user.password
    },
    logOut (state) {
      state.authenticated = false
      state.token = ''
      state.username = 'admin'
      state.password = 'admin'
    },
    putInCart (state, itemObj) {
      state.cart.push(itemObj)
    },
    clearCart (state) {
      state.cart = []
    },
    putShopItems (state, itemList) {
      state.shop = itemList
    },
    /**
     * Allows a given cookieType and sets the general cookie allowance to true.
     * @param state
     * @param cookieType
     */
    allowCookie (state, cookieType) {
      state.cookieAllowance = true
      for (let i = 0; i < state.cookies.length; i++) {
        if (state.cookies[i].type === cookieType) {
          state.cookies[i].allowed = true
        }
      }
    },
    /**
     * Revokes the allowance of a given cookieType.
     * In case no cookie is allowed, sets the general cookie allowance to false.
     * @param state
     * @param cookieType
     */
    revokeCookieAllowance (state, cookieType) {
      let allDisabled = true
      for (let i = 0; i < state.cookies.length; i++) {
        if (state.cookies[i].type === cookieType) {
          state.cookies[i].allowed = false
        }
        if (this.cookies[i].allowed) {
          allDisabled = false
        }
      }
      if (allDisabled) {
        state.cookieAllowance = false
      }
    },
    revokeAllCookieAllowances (state) {
      state.cookieAllowance = false
      for (let i = 0; i < state.cookies.length; i++) {
        state.cookies[i].allowed = false
      }
    },
    allowUsageTracking (state) {
      state.usageTracking = true
    },
    denyUsageTracking (state) {
      state.usageTracking = false
    },
    setServerIP (state, newServerIP) {
      state.serverIP = newServerIP
    },
    setServerToken (state, newServerToken) {
      state.token = newServerToken
    }
  },
  actions: {},
  modules: {}
})
