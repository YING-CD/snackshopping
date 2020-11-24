<!--
 * @Description: 详情页
 * @Author: yingzi
 * @Date: 2020-11-06 14:31:24
 * @LastEditTime: 2020-11-24 17:48:31
 * @LastEditors: yingzi
-->
<template>
  <div id="details">
    <div class="page-header">
      <div class="title">
        <p>{{ snacksDetails.snacks_name }}</p>
        <div class="title-list clearfix">
          <ul>
            <li>
              <router-link to>概述</router-link>
            </li>
            <li>
              <router-link to>参数</router-link>
            </li>
            <li>
              <router-link to>用户评价</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 主要内容 -->
    <div class="main clearfix">
      <div class="block">
        <detail-swiper
          :banners="snacksPicture"
          :snack_picture="snacksDetails.snacks_picture"
        ></detail-swiper>
      </div>
      <!-- 右侧内容区 -->
      <div class="content">
        <h1 class="name">{{ snacksDetails.snacks_title }}</h1>
        <p class="intro">{{ snacksDetails.snacks_intro }}</p>
        <p class="store">自营</p>
        <div class="parameter">
          <div class="price">
            <span>{{ snacksDetails.snacks_selling_price }}元</span>
            <span
              v-show="
                snacksDetails.snacks_price != snacksDetails.snacks_selling_price
              "
              class="del"
              >{{ snacksDetails.snacks_price }}元</span
            >
          </div>
          <div class="num">可售：{{ snacksDetails.snacks_num }}件</div>
          <div class="collect">{{ snacksDetails.collections_amount }}个</div>
        </div>

        <p class="price-sum">
          总计 : {{ snacksDetails.snacks_selling_price }}元
        </p>
        <!-- 内容区底部按钮 -->
        <div class="button">
          <el-button class="shop-cart" :disabled="dis" @click="addShoppingCart"
            >加入购物车</el-button
          >
          <el-button class="buy" @click="buyNow">立即购买</el-button>
          <el-button v-if="!isCollect" @click="addCollect" class="like"
            >收藏</el-button
          >
          <el-button v-else @click="cancelCollect">取消收藏</el-button>
        </div>
        <!-- 内容区底部按钮END -->
        <div class="pro-policy">
          <ul>
            <li><i class="el-icon-circle-check"></i> 合法自营</li>
            <li><i class="el-icon-circle-check"></i> 无忧发货</li>
            <li><i class="el-icon-circle-check"></i> 7天无理由退货</li>
            <li><i class="el-icon-circle-check"></i> 7天价格保护</li>
          </ul>
        </div>
      </div>
      <!-- 右侧内容区END -->
    </div>
    <!-- 主要内容END -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import DetailSwiper from "./childComps/DetailSwiper";

export default {
  name: "CollectItem",
  components: {
    DetailSwiper,
  },
  data() {
    return {
      dis: false, // 控制“加入购物车按钮是否可用”
      snacksID: 0, // 商品id
      snacksDetails: "", // 商品详细信息
      snacksPicture: [], // 商品图片
      isCollect: false, //是否已收藏
    };
  },
  // 通过路由获取商品id
  activated() {
    if (this.$route.query.snacks_id != undefined) {
      this.snacksID = this.$route.query.snacks_id;
    }
  },
  watch: {
    // 监听商品id的变化，请求后端获取商品数据
    snacksID(val) {
      val = Number(val);
      this.getDetails(val);
      this.getDetailsPicture(val);
      this.getCollectState(val);
    },
  },
  computed: {
    ...mapGetters(["getShoppingCart"]),
  },
  methods: {
    ...mapActions([
      "updateShoppingCart",
      "unshiftShoppingCart",
      "addShoppingCartNum",
    ]),
    // 获取商品详细信息
    getDetails(val) {
      this.$axios
        .post("/api/product/getDetails", {
          snacksID: val,
        })
        .then((res) => {
          this.snacksDetails = res.data.snacks[0];
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    // 获取商品图片
    getDetailsPicture(val) {
      this.$axios
        .post("/api/product/getDetailsPicture", {
          snacksID: val,
        })
        .then((res) => {
          this.snacksPicture = res.data.snacksPicture;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    //判断是否已经收藏
    getCollectState(val) {
      if (this.$store.getters.getUser) {
        this.$axios
          .post("/api/user/collect/findCollect", {
            user_id: this.$store.getters.getUser.user_id,
            snacks_id: val,
          })
          .then((res) => {
            this.isCollect = res.data.isCollect;
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
    },
    // 加入购物车
    addShoppingCart() {
      // 判断是否登录,没有登录则显示登录组件
      if (!this.$store.getters.getUser) {
        this.$store.dispatch("setShowLogin", true);
        return;
      }
      this.$axios
        .post("/api/user/shoppingCart/addShoppingCart", {
          user_id: this.$store.getters.getUser.user_id,
          snacks_id: this.snacksID,
        })
        .then((res) => {
          switch (res.data.code) {
            case "001":
              // 新加入购物车成功
              this.unshiftShoppingCart(res.data.shoppingCartData[0]);
              this.notifySucceed(res.data.msg);
              break;
            case "002":
              // 该商品已经在购物车，数量+1
              this.addShoppingCartNum(this.snacksID);
              this.notifySucceed(res.data.msg);
              break;
            case "003":
              // 商品数量达到限购数量
              this.dis = true;
              this.notifyError(res.data.msg);
              break;
            default:
              this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    //添加收藏
    addCollect() {
      // 判断是否登录,没有登录则显示登录组件
      if (!this.$store.getters.getUser) {
        this.$store.dispatch("setShowLogin", true);
        return;
      }
      this.$axios
        .post("/api/user/collect/addCollect", {
          user_id: this.$store.getters.getUser.user_id,
          snacks_id: this.snacksID,
        })
        .then((res) => {
          if (res.data.code == "001") {
            // 添加收藏成功
            this.isCollect = true;
            this.notifySucceed(res.data.msg);
          } else {
            // 添加收藏失败
            this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    //取消收藏
    cancelCollect() {
      this.$axios
        .post("/api/user/collect/deleteCollect", {
          user_id: this.$store.getters.getUser.user_id,
          snacks_id: this.snacksID,
        })
        .then((res) => {
          console.log(res);
          switch (res.data.code) {
            case "001":
              // 删除成功
              // 提示删除成功信息
              this.isCollect = false;
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
    // 立刻购买
    buyNow() {
      var cart = this.getShoppingCart;
      var dindex;
      var tag = false;
      for (let index in cart) {
        if (cart[index].snacksID == this.snacksID) {
          dindex = index;
          tag = true;
          break;
        }
      }
      console.log(tag);
      if (tag == false) {
        this.addShoppingCart();
      }
      this.updateShoppingCart({ key: dindex, prop: "check", val: true });
      this.$router.push({ path: "/confirmOrder" });
    },
  },
};
</script>
<style>
#details {
  margin-top: 70px;
}

/* 头部CSS */
#details .page-header {
  height: 74px;
  z-index: 4;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
}

#details .page-header .title {
  width: 1280px;
  height: 64px;
  line-height: 64px;
  font-size: 18px;
  font-weight: 400;
  color: #212121;
  margin: 0 auto;
}

#details .page-header .title p {
  float: left;
}

#details .page-header .title .title-list {
  /* display: inline; */
  height: 64px;
  float: right;
}
#details .page-header .title .clearfix::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
}
#details .page-header .title .clearfix {
  zoom: 1;
}

#details .page-header .title .title-list li {
  float: left;
  margin-left: 20px;
  list-style: none;
}

#details .page-header .title .title-list li a {
  font-size: 14px;
  color: #616161;
  text-decoration: none;
}

#details .page-header .title .title-list li a:hover {
  font-size: 14px;
  color: #ff6700;
}
/* 头部CSS END */

/* 主要内容CSS */
#details .main {
  width: 100%;
  padding-top: 30px;
  background-color: #fff;
  display: flex;
}

#details .main .block {
  margin-left: 30px;
  width: 380px;
  height: 560px;
  overflow: hidden;
}

#details .main .content {
  margin: 0 55px;
  flex: 1;
  /* width: 850px; */
  text-align: left;
}

#details .main .content .name {
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  font-weight: normal;
  color: #212121;
}

#details .main .content .intro {
  color: #b0b0b0;
  padding-top: 10px;
}

#details .main .content .store {
  color: #ff6700;
  padding-top: 10px;
}
#details .main .content .parameter {
  display: flex;
  font-size: 18px;
  border-bottom: 1px solid #e0e0e0;
  padding: 25px 0 25px;
}

#details .main .content .parameter .price {
  font-size: 18px;
  color: #ff6700;
  width: 350px;
}
#details .main .content .parameter .num {
  flex: 1;
}
#details .main .content .parameter .collect {
  width: 200px;
  position: relative;
}
#details .main .content .parameter .collect::before {
  content: "";
  position: absolute;
  left: -20px;
  top: 3px;
  width: 20px;
  height: 20px;
  background: url("~assets/img/common/collect.jpg") 0 0/20px 20px;
}
#details .main .content .price .del {
  font-size: 14px;
  margin-left: 10px;
  color: #b0b0b0;
  text-decoration: line-through;
}

#details .main .content .price .num {
  float: left;
}
#details .main .content .price-sum {
  color: #ff6700;
  font-size: 24px;
  padding-top: 20px;
}
#details .main .content .button {
  height: 55px;
  margin: 10px 0 20px 0;
}
#details .main .content .button .el-button {
  width: 100px;
  height: 55px;
  border: none;
  margin-right: 20px;
  color: #fff;
  text-align: center;
  background-color: #b0b0b0;
  /* float: left; */
}

#details .main .content .button .shop-cart {
  width: 150px;
  background-color: #f5883f;
}
#details .main .content .button .shop-cart:hover {
  background-color: #f25807;
}

#details .main .content .button .buy {
  width: 150px;
  background-color: #f5883f;
}
#details .main .content .button .buy:hover {
  background-color: #f25807;
}

#details .main .content .button .like {
  background-color: #f5883f;
}
#details .main .content .button .like:hover {
  background-color: #f25807;
}
#details .main .content .pro-policy li {
  float: left;
  margin-right: 20px;
  color: #b0b0b0;
  list-style: none;
}
/* 主要内容CSS END */
</style>