<!--
 * @Description: 你可能喜欢组件
 * @Author: yingzi
 * @Date: 2020-11-05 21:00:42
 * @LastEditTime: 2020-11-23 12:00:22
 * @LastEditors: yingzi
-->
<template>
  <div class="favorite clearfix">
    <div class="favorite-header">
      <div class="favorite-title">你可能喜欢</div>
      <img src="~assets/img/home/favorite.jpg" alt="图片" class="fa-img" />
    </div>
    <div class="favorite-containt">
      <div
        class="favorite-goods"
        v-for="(item, index) in favorite"
        :key="index"
        v-show="14 - index > 0 ? true : false"
      >
        <snacks-item :snacks="item" class="snacks-item"></snacks-item>
      </div>
      <div class="more" @click="fclick()">点击浏览更多 ....</div>
    </div>
  </div>
</template>

<script>
import SnacksItem from "content/snacks/SnacksItem";
export default {
  name: "Favorite",
  components: {
    SnacksItem,
  },
  data() {
    return {
      favorite: [],
    };
  },
  created() {
    // 获取轮播图数据
    this.$axios
      .post("/api/product/getAllProduct", {
        currentPage: 1,
        pageSize:20
      })
      .then((res) => {
        this.favorite = res.data.snacks;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  },
  methods: {
    fclick() {
      this.$router.push({ path: "/category"});
    }
  }
};
</script>

<style>
.favorite {
  height: 800px;
  overflow: hidden;
  display: flex;
}

.favorite .favorite-header {
  width: 200px;
  overflow: hidden;
}

.favorite .favorite-header .favorite-title {
  /* width: 200px; */
  height: 40px;
  margin-top: 10px;

  font-weight: 500;
  font-size: 23px;
  text-align: center;
  padding: 2px 0;
  font-family: "黑体";
  color: rgb(226, 135, 141);
}

.favorite .favorite-header .fa-img {
  /* width: 200px; */
  height: 750px;
}

.favorite .favorite-containt {
  /* height: 700px; */
  flex: 1;
  margin-left: 40px;
}

.favorite .snacks-item {
  flex: 1;
  width: 190px;
  height: 244px;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 20px;
  margin-right: 15px;
  border: 1px rgb(226, 135, 141) solid;
  float: left;
}
.favorite .snacks-item:hover {
  border: 1px white solid;
}

.favorite .more {
  width: 190px;
  margin-top: 120px;
  float: left;
  font-weight: 600;
  text-align: center;
  color: gray;
  cursor: pointer;
}

.favorite .more:hover {
  font-weight: 700;
  color: rgb(221, 43, 58);
}
</style>