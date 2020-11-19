<!--
 * @Description: 导航栏组件
 * @Author: yingzi
 * @Date: 2020-11-04 11:01:28
 * @LastEditTime: 2020-11-19 16:10:36
 * @LastEditors: yingzi
-->
<template>
  <div id="navbar">
    <div class="left"><slot name="left">LOGO</slot></div>
    <div class="center"><slot name="center">导航</slot></div>
    <div class="right"><slot name="right">搜索</slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
#navbar {
  display: flex;
  background-color: white;
  height: 70px;
  line-height: 70px;
} 

.left {
  width: 250px;
}

.right {
  width: 500px;
}

.center {
  /*flex:1*/
  /*等价于*/
  flex-grow: 1;
  text-align: center;
}
</style>