import { createRouter, createWebHistory } from 'vue-router'
import Account from '@/views/AccountView.vue'

const routes = [
  {
    path: '/:id?',
    name: 'account',
    component: Account,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/invoice',
    name: 'invoice',
    component: () => import('@/views/InvoiceView.vue')
  },
  {
    path: '/special',
    name: 'special',
    component: () => import('@/views/SpecialView.vue')
  },
  {
    path: '/finish',
    name: 'finish',
    component: () => import('@/views/Finish_time.vue')
  },
  {
    path: '/no-param',
    name: 'no-param',
    component: () => import('@/views/No_param.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router