<!--
 * @Description: 首页页面
 * @Author: yingzi
 * @Date: 2020-11-02 13:24:19
 * @LastEditTime: 2020-11-22 22:57:37
 * @LastEditors: yingzi
-->
<template>
  <div id="home" ref="home">
    <div class="feature">
      <recommend></recommend>
      <home-swiper></home-swiper>
    </div>
    <div class="content">
      <favorite></favorite>
      <group></group>
    </div>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/feature/HomeSwiper";
import Recommend from "./childComps/feature/Recommend";
import Group from "./childComps/group/Group";
import Favorite from "./childComps/group/Favorite";

import axios from "axios";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    Recommend,
    Group,
    Favorite,
  },
};
</script>

<style scoped>
#home {
  width: 1280px;
  /* position: relative; */
  /* top: 100px; */
  margin: 0 auto;
}

.feature {
  width: 1280px;
  height: 510px;
  margin-top: 106px;
  /* display: flex; */
  background-color: white;
}

.content {
  width: 1280px;
  background-color: white;
  margin-top: 50px;
}
</style>