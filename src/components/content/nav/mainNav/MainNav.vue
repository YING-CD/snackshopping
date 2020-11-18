<!--
  * @Description: 固定顶部 
  * @Author: yingzi
  * @Date: 2020/11/12 00:03:18
  *-->
<template>
  <div class="nav">
    <ul>
      <li v-if="!this.$store.getters.getUser">
        <span @click="login" class="login">登录</span>
        <span class="sep">|</span>
        <span @click="register = true" class="register">注册</span>
      </li>
      <li v-else>
        欢迎
        <el-popover placement="top" width="180" v-model="visible">
          <p>确定退出登录吗？</p>
          <div style="text-align: right; margin: 10px 0 0">
            <el-button size="mini" type="text" @click="visible = false"
              >取消</el-button
            >
            <el-button type="primary" size="mini" @click="logout"
              >确定</el-button
            >
          </div>
          <el-button type="text" slot="reference">{{
            this.$store.getters.getUser.userName
          }}</el-button>
        </el-popover>
      </li>
      <li>
        <router-link to="/order" class="order">我的订单</router-link>
      </li>
      <li>
        <router-link to="/collect" class="collect">我的收藏</router-link>
      </li>
      <li :class="getNum > 0 ? 'shoppingCart-full' : 'shoppingCart'">
        <router-link to="/shoppingCart">
          <i class="el-icon-shopping-cart-full"></i> 购物车
          <span class="num">({{ getNum }})</span>
        </router-link>
      </li>
    </ul>
    <!-- 登录模块 -->
    <my-login></my-login>
    <!-- 注册模块 -->
    <my-register :register="register" @fromChild="isRegister"></my-register>
    <!-- <svg-icon></svg-icon> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

import MyLogin from "views/login/MyLogin";
import MyRegister from "views/login/MyRegister";

export default {
  name: "MainNav",
  components: {
    MyLogin,
    MyRegister,
  },
  data() {
    return {
      register: false, // 是否显示注册组件
      visible: false, // 是否退出登录
    };
  },
  computed: {
    ...mapGetters(["getUser", "getNum"]),
  },
  created() {
    // 获取浏览器localStorage，判断用户是否已经登录
    if (localStorage.getItem("user")) {
      // 如果已经登录，设置vuex登录状态
      this.setUser(JSON.parse(localStorage.getItem("user")));
    }
  },
  watch: {
    // 获取vuex的登录状态
    getUser: function (val) {
      if (val === "") {
        // 用户没有登录
        this.setShoppingCart([]);
      } else {
        // 用户已经登录,获取该用户的购物车信息
        this.$axios
          .post("/api/user/shoppingCart/getShoppingCart", {
            user_id: val.user_id,
          })
          .then((res) => {
            if (res.data.code === "001") {
              // 001 为成功, 更新vuex购物车状态
              this.setShoppingCart(res.data.shoppingCartData);
            } else {
              // 提示失败信息
              this.notifyError(res.data.msg);
            }
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
    },
  },
  methods: {
    ...mapActions(["setUser", "setShowLogin", "setShoppingCart"]),
    login() {
      // 点击登录按钮, 通过更改vuex的showLogin值显示登录组件
      this.setShowLogin(true);
    },
    // 退出登录
    logout() {
      this.visible = false;
      // 清空本地登录信息
      localStorage.setItem("user", "");
      // 清空vuex登录信息
      this.setUser("");
      this.notifySucceed("成功退出登录");
    },
    // 接收注册子组件传过来的数据
    isRegister(val) {
      this.register = val;
    },
  },
};
</script>

<style scoped>
.nav {
  width: 100%;
  height: 40px;
  background-color: #2f2f2f;
}

.nav ul {
  margin: 0 140px;
  float: right;
}

.nav li {
  float: left;
  height: 40px;
  line-height: 40px;
  color: #b0b0b0;
  font-size: 14px;
  text-align: center;
  margin-left: 20px;

  list-style: none;
}

.nav .sep {
  font-size: 12px;
  margin: 0 5px;
}

.nav .login:hover,
.register:hover {
  color: #fff;
}

.nav .order,
.collect {
  color: #b0b0b0;
  text-decoration: none;
}

.nav .order:hover,
.collect:hover {
  color: #fff;
}

.nav .shoppingCart {
  width: 120px;
}
.nav .shoppingCart a{
  color: #b0b0b0;
  text-decoration: none;
}
.nav .shoppingCart:hover {
  background: #fff;
}

.nav .shoppingCart:hover a {
  color: #ff6700;
}

.nav .shoppingCart-full {
  width: 120px;
  background: #ff6700;
  text-decoration: none;
}

.nav .shoppingCart-full a {
  color: white;
}
</style>