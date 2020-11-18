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
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
