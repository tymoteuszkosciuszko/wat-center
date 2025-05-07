import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

router.afterEach((to) => {
  const defaultTitle = 'WAT Center'
  document.title = to.meta.title ? `${to.meta.title} – ${defaultTitle}` : defaultTitle
})

app.mount('#app')
