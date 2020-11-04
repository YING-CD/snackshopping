<template>
  <swiper class="swiper" v-if="banners.length" ref="swiper">
    <swiper-item
      v-for="(item, index) in banners"
      :key="index"
      class="swiper-item"
    >
      <a :href="item.link">
        <img :src="item.image" alt="轮播图" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "common/swiper";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    stopTimer() {
      this.$refs.swiper.stopTimer();
    },
    startTimer() {
      if (this.$refs.swiper) {
        this.$refs.swiper.startTimer();
      }
    }
  }
};
</script>
<style  scoped>
.swiper {
  width: 650px;
  height: 450px;
  background-color: blueviolet;
}
.swiper-item {
  width: 650px;
  height: 450px;
  background-color: red;
}
</style>