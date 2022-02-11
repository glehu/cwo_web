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
  },
  {
    path: '/apimanager',
    name: 'API Manager',
    component: () =>
      import('../views/APIManager.vue')
  },
  {
    path: '/invoices',
    name: 'Invoices',
    component: () =>
      import('../views/Invoices.vue')
  },
  {
    path: '/artists/graffitifalls',
    name: 'Graffiti Falls',
    component: () =>
      import('../views/GraffitiFalls.vue')
  },
  {
    path: '/artists',
    name: 'Artists',
    component: () =>
      import('../views/ArtistOverview.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404 Shadow Realms',
    component: () =>
      import('../views/NotFoundErrorPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // If the route requires authentication and the user is not authenticated, show log-in screen
  document.title = to.name
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
