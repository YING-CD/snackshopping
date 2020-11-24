<!--
 * @Description: 分类项组件
 * @Author: yingzi
 * @Date: 2020-11-13 11:25:12
 * @LastEditTime: 2020-11-23 14:50:53
 * @LastEditors: yingzi
-->
<template>
  <div class="list">
    <div v-if="csnacks.length > 0">
      <div v-for="(item, index) in csnacks" :key="index">
        <snacks-item :snacks="item" class="snacks-item"></snacks-item>
      </div>
    </div>
    <div v-else class="none-product">
      抱歉没有找到相关的商品，请看看其他的商品
    </div>
  </div>
</template>

<script>
import SnacksItem from "content/snacks/SnacksItem";
export default {
  name: "CategoryItem",
  components: {
    SnacksItem,
  },
  props: {
    csnacks: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.list {
  min-height: 650px;
  max-width: 1280px;
  padding-top: 14.5px;
  /* margin-left: -13.7px; */
  overflow: auto;
  background-color: #fff;
}
.list .snacks-item {
  width: 227px;
  height: 280px;
  margin-left: 20px;
  margin-bottom: 20px;
  padding: 25px 25px 0 25px;
  box-sizing: border-box;
  float: left;
  border: 2px rgb(170, 200, 230) solid;
}
.list .snacks-item:hover {
  border: 2px white solid;
}
</style>