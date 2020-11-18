import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios';

Vue.use(ElementUI);
// Vue.prototype.$axios = Axios;

// // 全局拦截器,在进入需要用户权限的页面前校验是否已经登录
// router.beforeResolve((to, from, next) => {
//   const loginUser = store.state.user.user;
//   // 判断路由是否设置相应校验用户权限
//   if (to.meta.requireAuth) {
//     if (!loginUser) {
//       // 没有登录，显示登录组件
//       store.dispatch("setShowLogin", true);
//       if (from.name == null) {
//         //此时，是在页面没有加载，直接在地址栏输入链接，进入需要登录验证的页面
//         next("/");
//         return;
//       }
//       // 终止导航
//       next(false);
//       return;
//     }
//   }
//   next();
// });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
