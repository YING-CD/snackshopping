<!--
 * @Description: 详情轮播图组件
 * @Author: yingzi
 * @Date: 2020-11-16 14:29:16
 * @LastEditTime: 2020-11-22 21:48:33
 * @LastEditors: yingzi
-->
<template>
  <div class="detail-swiper">
    <el-carousel height="560px" v-if="banners.length > 1">
      <el-carousel-item v-for="item in banners" :key="item.id">
         <img style="height:560px;" :src="$target + item.snacks_picture" :alt="item.intro" />
      </el-carousel-item>
    </el-carousel>
    <div v-else>
       <img style="height:560px;" :src="$target + snack_picture"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
    snack_picture:"",
  },
};
</script>

<style>
.detail-swiper {
  width: 380px;
  height: 560px;
  background-color: rgb(236, 198, 198);
  /* border: 2px #616161 dotted; */
}
.detail-swiper img {
  overflow: hidden;
}

</style>