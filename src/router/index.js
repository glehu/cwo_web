import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/core/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'More Than A Dream',
    component: Home
  },
  {
    path: '/discover',
    name: 'Discover',
    component: () => import('../views/core/Discover.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/info/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/forms/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/forms/Register')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/core/Account'),
    meta: { logout: true }
  },
  {
    path: '/songs',
    name: 'Songs',
    component: () => import('../views/core/SongFinder'),
    meta: { requiresAuth: true }
  },
  {
    path: '/apps/planner/:id',
    name: 'Planner',
    component: () => import('../views/apps/Planner'),
    meta: { requiresAuth: true }
  },
  {
    path: '/apps/clarifier',
    name: 'Clarifier',
    component: () => import('../views/apps/Clarifier'),
    meta: { requiresAuth: true }
  },
  {
    path: '/apps/clarifier/wss/:id',
    name: 'Clarifier Session',
    component: () => import('../views/apps/ClarifierChatroom'),
    meta: { requiresAuth: true }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('../views/core/Shop.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/core/Cart.vue')
  },
  {
    path: '/preferences',
    name: 'Preferences',
    component: () => import('../views/settings/UserPreferences.vue')
  },
  {
    path: '/dev/api',
    name: 'API Manager',
    component: () => import('../views/dev/api/APIManager.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/invoices',
    name: 'Invoices',
    component: () => import('../views/core/Invoices.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/artists/graffitifalls',
    name: 'Graffiti Falls',
    component: () => import('../views/artists/GraffitiFalls.vue')
  },
  {
    path: '/artists',
    name: 'Artists',
    component: () => import('../views/core/Artists.vue')
  },
  {
    path: '/submissions/artist',
    name: 'E1: Becoming one of us',
    component: () => import('../views/forms/ArtistSubmission')
  },
  {
    path: '/vision',
    name: 'Vision',
    component: () => import('../views/info/Vision')
  },
  // 404 NOT FOUND ERROR PAGE --- MUST BE AT THE VERY BOTTOM ---
  {
    path: '/:pathMatch(.*)*',
    name: '404 Shadow Realms',
    component: () => import('../views/errors/NotFoundErrorPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  strict: true,
  sensitive: true,
  scrollBehavior (to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  }
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
      // Handle Planner Route and fill in the path depending on the user logged in
      if (
        to.fullPath === '/planner' ||
        to.fullPath === '/apps/planner' ||
        to.fullPath === '/apps/planner/' ||
        to.fullPath === '/apps/planner/_user'
      ) {
        next({
          path: '/apps/planner/' + encodeURIComponent(Buffer.from(store.state.username).reverse().toString('base64'))
        })
      } else {
        // #### Any Other Route
        next()
      }
    }
  }
})

export default router
