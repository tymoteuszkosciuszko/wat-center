import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Subject from '@/views/Subject.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Strona Główna' }
  },
  {
    path: '/subject/:path(.*)',
    name: 'Subject',
    component: Subject,
    meta: { title: 'Przedmiot' }
  },
  {
    path: '/pdf-viewer',
    name: 'PdfViewer',
    component: () => import('@/views/PdfViewer.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router