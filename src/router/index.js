import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account'),
    meta: { logout: true }
  },
  {
    path: '/m1',
    name: 'Songs',
    component: () => import('../views/SongFinder'),
    meta: { requiresAuth: true }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () =>
      import('../views/Shop.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () =>
      import('../views/Cart.vue')
  },
  {
    path: '/preferences',
    name: 'Preferences',
    component: () =>
      import('../views/UserPreferences.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // If the route requires authentication and the user is not authenticated, show log-in screen
  document.title = 'CWO ' + to.name
  if ((to.matched.some(record => record.meta.requiresAuth)) && (to.name !== 'Login' && !store.state.authenticated)) {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    // Only show preferences if we're not going to the Preferences or About page
    if ((to.name !== 'Preferences' && to.name !== 'About') && !store.state.cookieAllowance) {
      next({
        path: '/preferences',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  }
})

export default router
