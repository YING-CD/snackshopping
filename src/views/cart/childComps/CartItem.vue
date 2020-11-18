<!--
  * @Description: 购物车列表子组件 
  * @Author: yingzi
  * @Date: 2020/11/16 19:24:12
  *-->
<template>
  <div>
    <div class="cartItem">
      <ul>
        <!-- 购物车表头 -->
        <li class="header">
          <div class="pro-check">
            <el-checkbox v-model="isAllCheck">全选</el-checkbox>
          </div>
          <div class="pro-img"></div>
          <div class="pro-name">商品名称</div>
          <div class="pro-price">单价</div>
          <div class="pro-num">数量</div>
          <div class="pro-total">小计</div>
          <div class="pro-action">操作</div>
        </li>
        <!-- 购物车表头END -->

        <!-- 购物车列表 -->
        <li
          class="product-list"
          v-for="(item, index) in getShoppingCart"
          :key="item.id"
        >
          <div class="pro-check">
            <el-checkbox
              :value="item.check"
              @change="checkChange($event, index)"
            ></el-checkbox>
          </div>
          <div class="pro-img">
            <router-link
              :to="{
                path: '/goods/details',
                query: { productID: item.productID },
              }"
            >
              <!-- <img :src="$target + item.productImg"/> -->
              <img :src="item.productImg" />
            </router-link>
          </div>
          <div class="pro-name">
            <router-link
              :to="{
                path: '/goods/details',
                query: { productID: item.productID },
              }"
              >{{ item.productName }}</router-link
            >
          </div>
          <div class="pro-price">{{ item.price }}元</div>
          <div class="pro-num">
            <el-input-number
              size="small"
              :value="item.num"
              @change="handleChange($event, index, item.productID)"
              :min="1"
              :max="item.maxNum"
            ></el-input-number>
          </div>
          <div class="pro-total pro-total-in">
            {{ item.price * item.num }}元
          </div>
          <div class="pro-action">
            <el-popover placement="right">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 10px 0 0">
                <el-button
                  type="primary"
                  size="mini"
                  @click="deleteItem($event, item.id, item.productID)"
                  >确定</el-button
                >
              </div>
              <i
                class="el-icon-error"
                slot="reference"
                style="font-size: 18px"
              ></i>
            </el-popover>
          </div>
        </li>
      </ul>
      <!-- 购物车列表END -->
    </div>
    <div style="height: 20px; background-color: #f5f5f5"></div>
    <!-- 购物车底部导航条 -->
    <div class="cart-bar">
      <div class="cart-bar-left">
        <span>
          <router-link to="/goods">继续购物</router-link>
        </span>
        <span class="sep">|</span>
        <span class="cart-total">
          共
          <span class="cart-total-num">{{ getNum }}</span> 件商品，已选择
          <span class="cart-total-num">{{ getCheckNum }}</span> 件
        </span>
      </div>
      <div class="cart-bar-right">
        <span>
          <span class="total-price-title">合计：</span>
          <span class="total-price">{{ getTotalPrice }}元</span>
        </span>
        <router-link :to="getCheckNum > 0 ? '/confirmOrder' : ''">
          <div
            :class="getCheckNum > 0 ? 'btn-primary' : 'btn-primary-disabled'"
          >
            去结算
          </div>
        </router-link>
      </div>
    </div>
    <!-- 购物车底部导航条END -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "CartItem",
  data() {
    return {};
  },
  components: {},
  methods: {
    ...mapActions(["updateShoppingCart", "deleteShoppingCart", "checkAll"]),
    // 修改商品数量的时候调用该函数
    handleChange(currentValue, key, productID) {
      // 当修改数量时，默认勾选
      this.updateShoppingCart({ key: key, prop: "check", val: true });
      // 向后端发起更新购物车的数据库信息请求
      this.$axios
        .post("/api/user/shoppingCart/updateShoppingCart", {
          user_id: this.$store.getters.getUser.user_id,
          product_id: productID,
          num: currentValue,
        })
        .then((res) => {
          switch (res.data.code) {
            case "001":
              // “001”代表更新成功
              // 更新vuex状态
              this.updateShoppingCart({
                key: key,
                prop: "num",
                val: currentValue,
              });
              // 提示更新成功信息
              this.notifySucceed(res.data.msg);
              break;
            default:
              // 提示更新失败信息
              this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    checkChange(val, key) {
      // 更新vuex中购物车商品是否勾选的状态
      this.updateShoppingCart({ key: key, prop: "check", val: val });
    },
    // 向后端发起删除购物车的数据库信息请求
    deleteItem(e, id, productID) {
      this.$axios
        .post("/api/user/shoppingCart/deleteShoppingCart", {
          user_id: this.$store.getters.getUser.user_id,
          product_id: productID,
        })
        .then((res) => {
          switch (res.data.code) {
            case "001":
              // “001” 删除成功
              // 更新vuex状态
              this.deleteShoppingCart(id);
              // 提示删除成功信息
              this.notifySucceed(res.data.msg);
              break;
            default:
              // 提示删除失败信息
              this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
  computed: {
    ...mapGetters([
      "getShoppingCart",
      "getCheckNum",
      "getTotalPrice",
      "getNum",
    ]),
    isAllCheck: {
      get() {
        return this.$store.getters.getIsAllCheck;
      },
      set(val) {
        this.checkAll(val);
      },
    },
  },
};
</script>

<style>
.cartItem ul {
  background-color: #fff;
  color: #424242;
  line-height: 85px;
  list-style: none;
}
/* 购物车表头及CSS */
.cartItem ul .header {
  height: 85px;
  padding-right: 26px;
  color: #424242;
}
.cartItem ul .product-list {
  height: 85px;
  padding: 15px 26px 15px 0;
  border-top: 1px solid #e0e0e0;
}
.cartItem ul .pro-check {
  float: left;
  height: 85px;
  width: 110px;
}
.cartItem ul .pro-check .el-checkbox {
  font-size: 16px;
  margin-left: 24px;
}
.cartItem ul .pro-img {
  float: left;
  height: 85px;
  width: 120px;
}
.cartItem ul .pro-img img {
  height: 80px;
  width: 80px;
}
.cartItem ul .pro-name {
  float: left;
  width: 380px;
}
.cartItem ul .pro-name a {
  color: #424242;
  text-decoration: none;
}
.cartItem ul .pro-name a:hover {
  color: #ff6700;
}
.cartItem ul .pro-price {
  float: left;
  width: 140px;
  padding-right: 18px;
  text-align: center;
}
.cartItem ul .pro-num {
  float: left;
  width: 150px;
  text-align: center;
}
.cartItem ul .pro-total {
  float: left;
  width: 120px;
  padding-right: 81px;
  text-align: right;
}
.cartItem ul .pro-total-in {
  color: #ff6700;
}
.cartItem ul .pro-action {
  float: left;
  width: 80px;
  text-align: center;
}
.cartItem ul .pro-action i:hover {
  color: #ff6700;
}
/* 购物车表头及CSS END */

/* 购物车底部导航条CSS */
.cart-bar {
  width: 1225px;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
}
.cart-bar .cart-bar-left {
  float: left;
}
.cart-bar .cart-bar-left a {
  line-height: 50px;
  margin-left: 32px;
  color: #757575;
  text-decoration: none;
}
.cart-bar .cart-bar-left a:hover {
  color: #ff6700;
}
.cart-bar .cart-bar-left .sep {
  color: #eee;
  margin: 0 20px;
}
.cart-bar .cart-bar-left .cart-total {
  color: #757575;
}
.cart-bar .cart-bar-left .cart-total-num {
  color: #ff6700;
}
.cart-bar .cart-bar-right {
  float: right;
}
.cart-bar .cart-bar-right .total-price-title {
  color: #ff6700;
  font-size: 14px;
}
.cart-bar .cart-bar-right .total-price {
  color: #ff6700;
  font-size: 30px;
}
.cart-bar .cart-bar-right .btn-primary {
  float: right;
  width: 200px;
  text-align: center;
  font-size: 18px;
  margin-left: 50px;
  background: #ff6700;
  color: #fff;
}
.cart-bar .cart-bar-right .btn-primary-disabled {
  float: right;
  width: 200px;
  text-align: center;
  font-size: 18px;
  margin-left: 50px;
  background: #e0e0e0;
  color: #b0b0b0;
  
}
.cart-bar .cart-bar-right .btn-primary:hover {
  background-color: #f25807;
}
/* 购物车底部导航条CSS END */
/* 购物车主要内容区CSS END */
</style>