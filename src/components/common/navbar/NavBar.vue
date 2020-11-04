<template>
  <div id="navbar">
    <div class="left"><slot name="left">LOGO</slot></div>
    <div class="center"><slot name="center">搜索</slot></div>
    <div class="right"><slot name="right">个人</slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style scoped>
  #navbar {
    display: flex;
  }

  .left {
    width: 200px;
  }

  .right {
    width: 150px;
  }

  .center {
    flex: 1;
  }
</style>