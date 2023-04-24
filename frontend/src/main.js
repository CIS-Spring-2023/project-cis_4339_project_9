import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './index.css'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.min.js'

// Pinia
const pinia = createPinia()
const app = createApp(App)

// Pinia x Router
pinia.use(({ store }) => {
  store.$router = markRaw(router)
})

app.use(pinia)
app.use(router)
app.mount('#app')
