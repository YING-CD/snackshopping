<!--
 * @Description: 轮播图内容组件
 * @Author: yingzi
 * @Date: 2020-11-04 11:28:36
 * @LastEditTime: 2020-11-21 16:40:55
 * @LastEditors: yingzi
-->
<template>
    <div class="slide">
      <slot></slot>
    </div>
</template>

<script>
	export default {
		name: "Slide"
	}
</script>

<style scoped>
  .slide {
    width: 100%;
    /* 收缩 0 :不收缩 1:默认值  */
    flex-shrink: 0;
  }

  .slide img {
    width: 100%;
  }
</style>

