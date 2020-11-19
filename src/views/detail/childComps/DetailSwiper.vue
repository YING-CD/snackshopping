<!--
 * @Description: 详情轮播图组件
 * @Author: yingzi
 * @Date: 2020-11-16 14:29:16
 * @LastEditTime: 2020-11-19 16:18:09
 * @LastEditors: yingzi
-->
<template>
  <swiper class="swiper"  ref="detail-swiper">
    <swiper-item
      v-for="(item, index) in banners"
      :key="index"
      class="swiper-item"
    >
      <img :src="item" alt="详情轮播图" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "common/swiper";
export default {
  name: "DetailSwiper",
  components: {
    SwiperItem,
    Swiper,
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    stopTimer() {
      this.$refs.detail - swiper.stopTimer();
    },
    startTimer() {
      if (this.$refs.detail - swiper) {
        this.$refs.detail - swiper.startTimer();
      }
    },
  },
};
</script>

<style>
.swiper {
  width: 350px;
  height: 560px;
  background-color: white;
  border: 2px #616161 dotted;
}
</style>