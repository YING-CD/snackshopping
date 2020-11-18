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