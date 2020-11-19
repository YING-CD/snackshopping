<!--
 * @Description: 首页页面
 * @Author: yingzi
 * @Date: 2020-11-02 13:24:19
 * @LastEditTime: 2020-11-19 16:21:26
 * @LastEditors: yingzi
-->
<template>
  <div id="home" ref="home">
    <div class="feature">
      <recommend :recommend="recommend"></recommend>
      <home-swiper :banners="banners"></home-swiper>
    </div>
    <div class="content">
      <favorite :favorite="favorite"></favorite>
      <group-item :groups="classification"></group-item>
    </div>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/feature/HomeSwiper";
import Recommend from "./childComps/feature/Recommend";
import GroupItem from "./childComps/group/GroupItem";
import Favorite from "./childComps/group/Favorite";

import axios from "axios";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    Recommend,
    GroupItem,
    Favorite,
  },
  data() {
    return {
      banners: [],
      recommend: [],
      classification: [],
      favorite: {},
    };
  },

  computed: {},
  mounted() {
    this.getBanners();
  },

  methods: {
    getBanners() {
      axios
        .get("/home/information")
        .then((res) => {
          console.log(res.data);
          var result = res.data;
          this.banners = result.banners;
          this.recommend = result.recommend;
          this.classification = result.classification;
          this.favorite = result.favorite;
        })
        .catch((err) => {
          console.log(err);
        });
    },
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