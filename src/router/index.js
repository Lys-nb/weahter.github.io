import { createRouter, createWebHistory } from 'vue-router'
import { useCityStore } from '@/stores/counter'
import HomeView from '../views/HomeView/HomeView.vue'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView/AboutView.vue')
    }
  ],
  
})

export default router
