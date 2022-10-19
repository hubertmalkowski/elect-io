import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import  Login from '../views/Login.vue'
import  Register from '../views/Register.vue'
import  MyPolls from '../views/MyPolls.vue'
import Settings from '../views/Settings.vue'
import PollDetail from '../views/PollDetail.vue'
import PollVote from '../views/PollVote.vue'
import PollAdd from '../views/PollAdd.vue'
import PollEdit from '../views/PollEdit.vue'
import History from '../views/History.vue'

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
      path: '/history',
      name: 'history',
      component: History
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
    },
    {
      path: '/poll-vote/:id',
      name: 'poll-vote',
      component: PollVote
    },
    {
      path: '/poll-add',
      name: 'poll-add',
      component: PollAdd
    },
    {
      path: '/poll-edit/:id',
      name: 'poll-edit',
      component: PollEdit
    }

  ]
})

export default router
