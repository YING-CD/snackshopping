<!--
 * @Description: 首页轮播图组件
 * @Author: yingzi
 * @Date: 2020-11-04 14:05:29
 * @LastEditTime: 2020-11-22 22:38:40
 * @LastEditors: yingzi
-->
<template>
  <div class="home-swiper" >
    <el-carousel height="480px">
        <el-carousel-item v-for="item in carousel" :key="item.carousel_id">
          <a :href="item.link" target="_black">
          <img :src="$target + item.imgPath" alt="轮播图" class="home-img" />
        </a>
        </el-carousel-item>
      </el-carousel>
  </div>
</template>

<script>
export default {
  name: "HomeSwiper",
  data() {
    return {
      carousel: [],
    };
  },
  created() {
    // 获取轮播图数据
    this.$axios
      .post("/api/resources/carousel", {})
      .then((res) => {
        this.carousel = res.data.carousel;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  },
};
</script>
<style  scoped>
.home-swiper {
  width: 850px;
  height: 480px;
  margin: 10px 25px;
  float: right;
  background-color: rgb(226, 222, 219);
  /* border: 2px sandybrown solid; */
}

.home-img {
  width: 850px;
  height: 480px;
  overflow: hidden;
}
</style>