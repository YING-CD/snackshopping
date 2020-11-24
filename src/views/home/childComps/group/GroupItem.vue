<!--
 * @Description: 热门分类组件
 * @Author: yingzi
 * @Date: 2020-11-05 21:01:10
 * @LastEditTime: 2020-11-23 12:41:33
 * @LastEditors: yingzi
-->
<template>
  <div class="group-item">
    <div
      class="group-goods"
      v-for="(item, index) in gsnacks"
      :key="index"
      v-show="11 - index > 0 ? true : false"
    >
      <snacks-item :snacks="item" class="snacks-item"></snacks-item>
    </div>
  </div>
</template>

<script>
import SnacksItem from "content/snacks/SnacksItem";
export default {
  name: "GroupItem",
  components: {
    SnacksItem,
  },
  props: {
    gsnacks: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
 .group-item .snacks-item {
  float: left;
  width: 190px;
  height: 230px;
  padding: 35px;
  margin-top: 20px;
  margin-left: 20px;
  box-sizing: border-box;
  border: 1px rgb(221, 171, 43) solid;
}

 .group-item .snacks-item:hover {
  border: 1px white solid;
}
</style>