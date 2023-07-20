import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Register',
      component: RegisterView,
      meta: { title: "Register"}
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView,
      meta: { title: "Home"}
    }
  ]
})

export default router
