import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Main.vue'
import Increase from './views/Increase.vue'
import Check from './views/Check.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/', redirect: '/main'},
    {
      path: '/main',
      name: 'home',
      component: Home
    },
    {
      path: '/increase',
      name: 'increase',
      component: Increase,
      meta: {
        auth: true
      }
    }, 
    {
      path: '/check',
      name: 'check',
      component: Check
    },   
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

/* router.beforeEach((to, from, next) => {
  console.log(to.path);
  if (to.path === '/increase') {
    if (window.isLogin) {
        next()
    } else {
        next('/main')
    }
  } else {
      next()
  }  
}) */

export default router
