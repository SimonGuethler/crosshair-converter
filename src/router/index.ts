import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'crosshair-converter',
      component: () => import('../views/CrosshairConverter.vue')
    }
  ]
})

export default router
