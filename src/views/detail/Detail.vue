<!--
 * @Description: 详情页
 * @Author: yingzi
 * @Date: 2020-11-06 14:31:24
 * @LastEditTime: 2020-11-19 16:18:18
 * @LastEditors: yingzi
-->
<template>
  <div id="details">
    <div class="page-header">
      <div class="title">
        <p>{{ productDetails.name }}</p>
        <div class="list">
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
        <detail-swiper :banners="productDetails.image"></detail-swiper>
      </div>
      <!-- 右侧内容区 -->
      <div class="content">
        <h1 class="name">{{ productDetails.name }}</h1>
        <p class="intro">{{ productDetails.cparagraph }}</p>
        <p class="store">自营</p>
        <div class="price">
          <span>{{ productDetails.sell_price }}元</span>
          <span
            v-show="productDetails.price != productDetails.sell_price"
            class="del"
            >{{ productDetails.price }}元</span
          >
        </div>
        <p class="price-sum">总计 : {{ productDetails.sell_price }}元</p>
        <!-- 内容区底部按钮 -->
        <div class="button">
          <el-button class="shop-cart" :disabled="dis" @click="addShoppingCart"
            >加入购物车</el-button
          >
          <el-button class="buy" @click="buy">立即购买</el-button>
          <el-button class="like" @click="addCollect">收藏</el-button>
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
import axios from "axios";
import DetailSwiper from "./childComps/DetailSwiper";
export default {
  name: "CollectItem",
  components: {
    DetailSwiper,
  },
  data() {
    return {
      dis: false, // 控制“加入购物车按钮是否可用”
      productID: "", // 商品id
      productDetails: "", // 商品详细信息
    };
  },
  // 通过路由获取商品id
  activated() {
    if (this.$route.query.iid != undefined) {
      this.productID = this.$route.query.productID;
    }
  },
  watch: {
    // 监听商品id的变化，请求后端获取商品数据
    productID: function (val) {
      this.getDetails();
      // this.getDetailsPicture(val);
    },
  },
  mounted() {
    this.getDetails();
  },
  methods: {
    ...mapActions(["unshiftShoppingCart", "addShoppingCartNum"]),
    // 获取商品详细信息
    getDetails() {
      axios
        .get("/home/information")
        .then((res) => {
          var result = res.data;
          console.log(result);

          this.productDetails = result.goodDtetail;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addShoppingCart() {
      // 判断是否登录,没有登录则显示登录组件
      if (!this.$store.getters.getUser) {
        this.$store.dispatch("setShowLogin", true);
        return;
      }
      this.$axios
        .post("/api/user/shoppingCart/addShoppingCart", {
          user_id: this.$store.getters.getUser.user_id,
          product_id: this.productID,
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
              this.addShoppingCartNum(this.productID);
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
    // //添加收藏
    // addCollect() {
    //   // 判断是否登录,没有登录则显示登录组件
    //   if (!this.$store.getters.getUser) {
    //     this.$store.dispatch("setShowLogin", true);
    //     return;
    //   }
    //   this.$axios
    //     .post("/api/user/collect/addCollect", {
    //       user_id: this.$store.getters.getUser.user_id,
    //       product_id: this.productID,
    //     })
    //     .then((res) => {
    //       if (res.data.code == "001") {
    //         // 添加收藏成功
    //         this.notifySucceed(res.data.msg);
    //       } else {
    //         // 添加收藏失败
    //         this.notifyError(res.data.msg);
    //       }
    //     })
    //     .catch((err) => {
    //       return Promise.reject(err);
    //     });
    // },
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

#details .page-header .title .list {
  height: 64px;
  float: right;
}

#details .page-header .title .list li {
  float: left;
  margin-left: 20px;
  list-style: none;
}

#details .page-header .title .list li a {
  font-size: 14px;
  color: #616161;
  text-decoration: none;
}

#details .page-header .title .list li a:hover {
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
#details .main .content .price {
  display: block;
  font-size: 18px;
  color: #ff6700;
  border-bottom: 1px solid #e0e0e0;
  padding: 25px 0 25px;
}
#details .main .content .price .del {
  font-size: 14px;
  margin-left: 10px;
  color: #b0b0b0;
  text-decoration: line-through;
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

#details .main .content .button .like:hover {
  background-color: #757575;
}
#details .main .content .pro-policy li {
  float: left;
  margin-right: 20px;
  color: #b0b0b0;
  list-style: none;
}
/* 主要内容CSS END */
</style>