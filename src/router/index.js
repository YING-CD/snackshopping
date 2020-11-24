/*
 * @Description: 路由
 * @Author: yingzi
 * @Date: 2020-11-02 12:40:57
 * @LastEditTime: 2020-11-23 23:07:51
 * @LastEditors: yingzi
 */
import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import('views/home/Home');
const Category = () => import('views/category/Category');
const Detail = () => import('views/detail/Detail');
const Cart = () => import('views/cart/Cart');
const Profile = () => import('views/profile/Profile');
const Order = () => import('views/order/Order');
const Collect = () => import('views/collect/Collect');
const ConfirmOrder = () => import('views/confirmOrder/ConfirmOrder');
const Error = () => import('views/login/Error');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/confirmOrder',
    component: ConfirmOrder
  },
  {
    path: '/shoppingCart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/collect',
    component: Collect
  },
  {
    path: '/error',
    component: Error
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
