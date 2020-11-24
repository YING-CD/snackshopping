<!--
 * @Description: 热门推荐组件
 * @Author: yingzi
 * @Date: 2020-11-05 13:51:08
 * @LastEditTime: 2020-11-22 22:46:04
 * @LastEditors: yingzi
-->
<template>
  <div class="recommend">
    <div class="recomend-title">热门推荐</div>
    <snacks-item
      v-for="(item, index) in recommend"
      :key="index"
      :snacks="item"
      class="snacks-item"
    ></snacks-item>
  </div>
</template>

<script>
import SnacksItem from "content/snacks/SnacksItem";

export default {
  name: "Recommend",
  components: {
    SnacksItem,
  },
  data() {
    return {
      recommend:[],
    };
  },
  created() {
    this.getHotSnacks();
  },
  methods: {
    getHotSnacks() {
      // 获取热门推荐商品数据
    this.$axios
      .post("/api/product/getHotSnacks", {})
      .then(res => {
        this.recommend = res.data.snacks;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
    }
  }
};
</script>
<style  scoped>
.recommend {
  width: 300px;
  height: 450px;
  padding: 15px 15px;
  border: 2px rgb(221, 171, 43) solid;
  margin: 10px;
  float: left;
}

.recomend-title {
  font-weight: 500;
  font-size: 23px;
  font-family: "黑体";
  color: white;
  background: -webkit-linear-gradient(
    45deg,
    #2fd0d8,
    #db7240,
    #d4ba37,
    #6130f3,
    #234e8a
  );
  /* -moz-linear-gradient(45deg, #2fd0d8, #db7240, #d4ba37, #6130f3, #1050aa); */
  /* -ms-linear-gradient(45deg, #2fd0d8, #db7240, #d4ba37, #6130f3, #1050aa); */
}

.snacks-item {
  height: 80px;
  width: 95px;
  display: flex;
  float: left;
  margin: 20px 0 0 4px;
}
</style>