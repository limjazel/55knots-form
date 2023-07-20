import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Register',
      component: LoginView
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView
    }
  ]
})

export default router
