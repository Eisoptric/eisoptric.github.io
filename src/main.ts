import { createApp, createSSRApp } from 'vue'
import './styles/index.css'
import App from './App.vue'
import { router } from './router'

const app = import.meta.env.PROD ? createSSRApp(App) : createApp(App)
app.use(router)
router.isReady().then(() => {
  app.mount('#app')
})
