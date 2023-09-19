import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login/login'
import Home from '@/views/Home/home'
import Category from '@/views/Category/category'
import Search from '@/views/Search/search'
import Cart from '@/views/Cart/cart'
import User from '@/views/User/user'
import SearchList from '@/views/Search/searchList'
import Detail from '@/views/Detail/detail'
import OrderConfirm from '@/views/Order/orderConfirm'
import EditAddress from '@/views/Address/editAddress'
import AddAddress from '@/views/Address/addAddress'
import OrderList from '@/views/Order/orderList'
import Setting from '@/views/Setting/setting'
import FavourProduct from '@/views/Favour/favourProduct'
import Safe from '@/views/User/safe'
import ChangePayPwd from '@/views/User/changePayPwd'
import ManageAddress from '@/views/Address/manageAddress'
import Edit from '@/views/Address/edit'
import ChangeLoginPwd from '@/views/User/changeLoginPwd'
import ChangeEmail from '@/views/User/changeEmail'
import ChangePhoneNumber from '@/views/User/changePhoneNumber'
import FootMark from '@/views/FootMark/footMark'
import ChangeAvater from '@/views/User/changeAvater'
import AddComment from '@/views/Comment/addComment'
import OrderNow from "@/views/Order/orderNow.vue";

import Test from '@/views/Test/test'

// 获取原型对象push函数
const originalPush = VueRouter.prototype.push

// 获取原型对象replace函数
const originalReplace = VueRouter.prototype.replace

// 修改原型对象中的push函数
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/searchList/:content',
    name: 'SearchList',
    component: SearchList
  },
  {
    path: '/detail/:productId',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/orderConfirm',
    name: 'OrderConfirm',
    component: OrderConfirm
  },
  {
    path: '/editAddress',
    name: 'EditAddress',
    component: EditAddress
  },
  {
    path: '/addAddress',
    name: 'AddAddress',
    component: AddAddress
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: OrderList
  },
  {
    path: '/user/setting',
    name: 'Setting',
    component: Setting
  },
  {
    path: '/favourProduct',
    name: 'FavourProduct',
    component: FavourProduct
  },
  {
    path: '/user/safe',
    name: 'Safe',
    component: Safe
  },
  {
    path: '/user/safe/changePayPwd',
    name: 'ChangePayPwd',
    component: ChangePayPwd
  },
  {
    path: '/user/setting/manageAddress',
    name: 'ManageAddress',
    component: ManageAddress
  },
  {
    path: '/address/edit/:id',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/user/safe/changePwd',
    name: 'ChangeLoginPwd',
    component: ChangeLoginPwd
  },
  {
    path: '/user/safe/changeEmail',
    name: 'ChangeEmail',
    component: ChangeEmail
  },
  {
    path: '/user/safe/changePhone',
    name: 'ChangePhoneNumber',
    component: ChangePhoneNumber
  },
  {
    path: '/footMark',
    name: 'FootMark',
    component: FootMark
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/changeAvater',
    name: 'ChangeAvater',
    component: ChangeAvater
  },
  {
    path: '/addComment/:orderId',
    name: 'AddComment',
    component: AddComment
  },
  {
    path: '/orderNow/:productId',
    name: 'OrderNow',
    component: OrderNow
  },
  { path: "/pay_finish", redirect: "/" },
]
const router = new VueRouter({
  routes
})

export default router
