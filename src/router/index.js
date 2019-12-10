import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    props:true,
    meta : {
      requiresAuth : true
    }
  },
  {
    path: '/login/:params?',
    name: 'login',
    component: Login,
    props : true
  },
]

const router = new VueRouter({
  mode : "history",
  routes,
  base: process.env.BASE_URL
})

export default router
