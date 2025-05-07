import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Subject from '@/views/Subject.vue'


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/subject/:subject', name: 'Subject', component: Subject }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router