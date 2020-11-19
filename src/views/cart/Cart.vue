<!--
 * @Description: 购物车页面
 * @Author: yingzi
 * @Date: 2020-11-06 14:31:53
 * @LastEditTime: 2020-11-19 16:15:46
 * @LastEditors: yingzi
-->
<template>
  <div class="shoppingCart">
    <!-- 购物车头部 -->
    <div class="cart-header">
      <div class="cart-header-content">
        <p>
          <i
            class="el-icon-shopping-cart-full"
            style="color: #ff6700; font-weight: 600"
          ></i>
          我的购物车
        </p>
        <span class="tips"
          >温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </div>
    </div>
    <div class="content" v-if="getShoppingCart.length > 0">
      <cart-item></cart-item>
    </div>
    <div v-else class="cart-empty">
      <div class="empty">
        <h2>您的购物车还是空的！</h2>
        <p>快去购物吧！</p>
      </div>
    </div>
    <!-- 购物车为空的时候显示的内容END -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import CartItem from './childComps/CartItem.vue';
export default {
  name: "Cart",
  data() {
    return {};
  },
  components: {
    CartItem
  },
  computed: {
    ...mapGetters(["getShoppingCart"]),
  },
};
</script>
<style scoped>
.shoppingCart {
  background-color: #f5f5f5;
  padding-bottom: 20px;
  margin-top: 100px;
}
/* 购物车头部CSS */
.shoppingCart .cart-header {
  height: 98px;
  border-bottom: 2px solid #ff6700;
  background-color: #fff;
  margin-bottom: 20px;
}
.shoppingCart .cart-header .cart-header-content {
  width: 1225px;
  margin: 0 auto;
}
.shoppingCart .cart-header p {
  font-size: 28px;
  line-height: 58px;
  float: left;
  font-weight: normal;
  color: #424242;
}
.shoppingCart .cart-header .tips {
  color: #757575;
  font-size: 12px;
  float: left;
  height: 20px;
  line-height: 20px;
  margin-top: 55px;
  margin-left: 15px;
}
/* 购物车头部CSS END */

/* 购物车主要内容区CSS */
.shoppingCart .content {
  width: 1280px;
  margin: 0 auto;
  background-color: #fff;
}

/* 购物车为空的时候显示的内容CSS */
.shoppingCart .cart-empty {
  width: 1225px;
  margin: 0 auto;
}
.shoppingCart .cart-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url(~assets/img/cart-empty.png) no-repeat 124px 0;
  color: #b0b0b0;
  overflow: hidden;
}
.shoppingCart .cart-empty .empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}
.shoppingCart .cart-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
/* 购物车为空的时候显示的内容CSS END */
</style>