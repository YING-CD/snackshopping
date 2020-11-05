<template>
  <div id="home" ref="home">
    <home-nav></home-nav>
    <div class="feature">
      <recommend class="recommend" :recommend="recommend"></recommend>
      <home-swiper :banners="banners" class="home-swiper"></home-swiper>
      <classification
        class="classification"
        :classification="classification"
      ></classification>
    </div>
    <div class="content">
      <group-item class="group-item" :groups="classification"></group-item>
    </div>
    <back-top @backTop="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt="回到顶部" />
    </back-top>
  </div>
</template>

<script>
import HomeNav from "./childComps/HomeNav";
import HomeSwiper from "./childComps/HomeSwiper";
import Recommend from "./childComps/Recommend";
import Classification from "./childComps/Classification";
import GroupItem from "./childComps/GroupItem";

import BackTop from "content/backTop/BackTop";

import axios from "axios";
// import Mock from 'mock/index';

export default {
  name: "Home",
  components: {
    HomeNav,
    HomeSwiper,
    Recommend,
    Classification,
    GroupItem,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommend: [],
      classification: [],
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
        .get("/home/bannans")
        .then(res => {
          console.log(res.data);
          var result = res.data;
          this.banners = result.banners;
          this.recommend = result.recommend;
          this.classification = result.classification;
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

.feature {
  width: 1280px;
  margin: 0 auto;
  display: flex;
}

.feature .recommend {
  width: 300px;
  height: 450px;
  padding: 15px 15px;
  border: 2px rgb(221, 171, 43) solid;
  margin-right: 15px;
}

.feature .home-swiper {
  width: 650px;
  height: 450px;
  margin: 0 auto;
}

.feature .classification {
  width: 200px;
  z-index: 9;
  /* border: 2px #db7240 solid; */
}

.content {
  position: absolute;
  width: 1200px;
  top: 620px;
}

.back-top {
  position: fixed;
  right: 100px;
  bottom: 100px;
}
</style>