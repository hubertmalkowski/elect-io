import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import  Login from '../views/Login.vue'
import  Register from '../views/Register.vue'
import  MyPolls from '../views/MyPolls.vue'
import Settings from '../views/Settings.vue'
import PollDetail from '../views/PollDetail.vue'

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
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/poll-detail/:id',
      name: 'poll-detail',
      component: PollDetail
    }
  ]
})

export default router
