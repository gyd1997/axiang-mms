import Vue from "vue"
import Router from "vue-router"
import Login from './views/login'
import Layout from './components/Layout'
import Home from './views/home/home.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: Home,
          meta: {title: '首页'}
        }
      ]
    }
  ]
});
