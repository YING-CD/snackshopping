<template>
  <div id="home">
    <home-nav></home-nav>
    <home-swiper :banners="banners" class="home-swiper"></home-swiper>
  </div>
</template>

<script>
import HomeNav from "./childComps/HomeNav";
import HomeSwiper from "./childComps/HomeSwiper";
import axios from "axios";
// import Mock from 'mock/index';

export default {
  name: "Home",
  components: {
    HomeNav,
    HomeSwiper
  },
  data() {
    return {
      banners: [],
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
          this.banners = res.data.banners;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.home-swiper {
  margin: 0 auto;
}
</style>