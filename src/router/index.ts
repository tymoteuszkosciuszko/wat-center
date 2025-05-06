import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Subject from '@/views/Subject.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  {
    path: '/fizyka',
    name: 'Fizyka',
    component: Subject,
    props: { title: 'Fizyka 1/2 Sprawozdania' },
  },
  { path: '/aok', name: 'AOK', component: Subject, props: { title: 'AOK Materiały' } },
  { path: '/jee', name: 'JEE', component: Subject, props: { title: 'JEE Materiały' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
