import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welecome from '../components/Welecome.vue'
import Users from '../components/user/Users.vue'
import List from '../components/equipment/List.vue'
import Add from '../components/equipment/Add.vue'
import Order from '../components/order/Order.vue'
import Report from '../components/report/Report.vue'
import cookie from 'js-cookie'
import callback from '../components/user/callback'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login', hidden: true},
  { path: '/login', component: Login },
  {
    path: '/Home',
    component: Home,
    redirect: '/welecome',
    children: [
      {
        path: '/welecome',
        component: Welecome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/equipment',
        component: List
      },
      {
        path: '/equipment/add',
        component: Add
      },
      {
        path: '/orders',
        component: Order
      },
      {
        path: '/reports',
        component: Report
      },
      {
        path: '/callback',
        component: callback
      }

    ]
  }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  if(to.path === '/callback') return next()
  const tokenstr = cookie.get('token')
  if (!tokenstr) return next('/login')
  next()
})
export default router
