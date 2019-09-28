import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import MusicDashboard from '@/components/MusicDashboard'
import store from '../plugins/store/store.js'

Vue.use(Router)

const requireAuth = (to, from, next) => {
  if (store.state.isLoggedIn) { next() } else { router.push('/') }
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter: requireAuth
    },
    {
      path: '/music',
      name: 'Music',
      component: MusicDashboard,
      beforeEnter: requireAuth
    }
  ]
})

export default router
