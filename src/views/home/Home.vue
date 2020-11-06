<template>
  <div id="home" ref="home">
    <home-nav class="home-nav"></home-nav>
    <div class="feature">
      <recommend :recommend="recommend"></recommend>
      <home-swiper :banners="banners"></home-swiper>
      <classification :classification="classification"></classification>
    </div>
    <div class="content">
      <favorite :favorite="favorite"></favorite>
      <group-item :groups="classification"></group-item>
    </div>
    <div class="foot"></div>
    <back-top @backTop="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt="回到顶部" />
    </back-top>
  </div>
</template>

<script>
import HomeNav from "./childComps/HomeNav";
import Classification from "./childComps/Classification";
import HomeSwiper from "./childComps/feature/HomeSwiper";
import Recommend from "./childComps/feature/Recommend";
import GroupItem from "./childComps/group/GroupItem";
import Favorite from "./childComps/group/Favorite";

import BackTop from "content/backTop/BackTop";

import axios from "axios";

export default {
  name: "Home",
  components: {
    HomeNav,
    HomeSwiper,
    Recommend,
    Classification,
    GroupItem,
    Favorite,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommend: [],
      classification: [],
      favorite: {},
      showBackTop: true
      // groups: [],
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
        .then(res => {
          console.log(res.data);
          var result = res.data;
          this.banners = result.banners;
          this.recommend = result.recommend;
          this.classification = result.classification;
          this.favorite = result.favorite;
          // this.groups = result.groups;
        })
        .catch(err => {
          console.log(err);
        });
    },

    backTop() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style scoped>
#home {
  width: 1200px;
  position: relative;
  margin: 0 auto;
}

.home-nav {
  position: fixed;
  top: 0px;
  padding-top: 20px;
  z-index: 99;
  background-color: white;
}

.feature {
  width: 1280px;
  margin-top: 50px;
  display: flex;
}

.content {
  position: absolute;
  width: 1200px;
  top: 555px;
}

.foot {
  position: absolute;
  width: 1260px;
  top: 5295px;
  color: red;
  border: 2px red dotted;
}

.back-top {
  position: fixed;
  right: 100px;
  bottom: 100px;
}
</style>