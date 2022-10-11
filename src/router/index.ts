import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import  Login from '../views/Login.vue'
import  Register from '../views/Register.vue'
import  MyPolls from '../views/MyPolls.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login

    },
    {
      path: '/register',
      name: 'register',
      component: Register

    },
    {
      path: '/my-polls',
      name: 'my-polls',
      component: MyPolls
    }

  ]
})

export default router
