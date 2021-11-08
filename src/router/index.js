import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Categories from '../views/store/Categories'
import Articles from '../views/store/Articles'
import Sales from '../views/sales/Sales'
import Customers from '../views/sales/Customers'
import Incomes from '../views/purchases/Incomes'
import Providers from '../views/purchases/Providers'
import ConsultPurchases from '../views/inquiries/ConsultPurchases'
import ConsultSales from '../views/inquiries/ConsultSales'
import Users from '../views/access/Users'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/articles',
    name: 'Articles',
    component:Articles
  },
  {
    path: '/sales',
    name: 'Sales',
    component: Sales
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers
  },
  {
    path: '/incomes',
    name: 'Incomes',
    component: Incomes
  },
  {
    path: '/providers',
    name: 'Providers',
    component: Providers
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/consultPurchases',
    name: 'ConsultPurchases',
    component: ConsultPurchases
  },
  {
    path: '/consultSales',
    name: 'ConsultSales',
    component: ConsultSales
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
