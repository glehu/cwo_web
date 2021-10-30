import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import chunk from 'chunk'
import Notifications from '@kyvg/vue3-notification'

createApp(App)
  .use(store)
  .use(router)
  .use(chunk)
  .use(Notifications)
  .mount('#app')
