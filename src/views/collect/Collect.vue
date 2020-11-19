<!--
 * @Description: 收藏页 
 * @Author: yingzi
 * @Date: 2020-11-12 00:38:57
 * @LastEditTime: 2020-11-19 16:16:51
 * @LastEditors: yingzi
-->
<template>
  <div class="collect">
    <div class="collect-header">
      <div class="collect-title">
        <i class="el-icon-collection-tag" style="color: #ff6700"></i>
        我的收藏
      </div>
    </div>
    <div class="content">
      <div class="goods-list" v-if="collectList.length > 0">
        <div v-for="(item, index) in collectList" :key="index">
          <collect-item :snacks="item" class="item"></collect-item>
        </div>
      </div>
      <!-- 收藏列表为空的时候显示的内容 -->
      <div v-else class="collect-empty">
        <div class="empty">
          <h2>您的收藏还是空的！</h2>
          <p>快去购物吧！</p>
        </div>
      </div>
      <!--  收藏列表为空的时候显示的内容END -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CollectItem from './childComps/CollectItem'
export default {
  name: "Collect",
  data() {
    return {
      collectList: [],
    };
  },
  components: {
    CollectItem,
  },
  activated() {
    // 获取收藏数据
    // this.$axios
    //   .post("/api/user/collect/getCollect", {
    //     user_id: this.$store.getters.getUser.user_id,
    //   })
    //   .then((res) => {
    //     if (res.data.code === "001") {
    //       this.collectList = res.data.collectList;
    //     }
    //   })
    //   .catch((err) => {
    //     return Promise.reject(err);
    //   });
    axios
      .get("/home/information")
      .then((res) => {
        var result = res.data;
        this.collectList = result.collectList;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {},
  mounted() {},
};
</script>

<style>
.collect {
  /* background-color: #f5f5f5; */
  padding-bottom: 20px;
  margin-top: 100px;
}
.collect .collect-header {
  height: 98px;
  background-color: #fff;
  margin-bottom: 20px;
  border-bottom: 2px solid #ff6700;
}
.collect .collect-header .collect-title {
  width: 1225px;
  margin: 0 auto;
  height: 60px;
  line-height: 58px;
  font-size: 28px;
  font-weight: normal;
  color: #424242;
  padding: 20px 0 0 0;
  text-align: left;
}

.collect .content {
  padding: 20px 0;
  /* width: 1280px; */
  margin: 0 auto;
  background-color: #fff;
}

.collect .content .goods-list {
  /* margin-left: -13.7px; */
  overflow: hidden;
}

/* 收藏列表为空的时候显示的内容CSS */
.collect .collect-empty {
  width: 1225px;
  margin: 0 auto;
}
.collect .collect-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url(~assets/img/cart-empty.png) no-repeat 124px 0;
  color: #b0b0b0;
  overflow: hidden;
}
.collect .collect-empty .empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}
.collect .collect-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
/* 收藏列表为空的时候显示的内容CSS END */
</style>