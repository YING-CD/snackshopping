/*
 * @Description: 入口
 * @Author: yingzi
 * @Date: 2020-11-02 12:40:57
 * @LastEditTime: 2020-11-19 16:23:35
 * @LastEditors: yingzi
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
