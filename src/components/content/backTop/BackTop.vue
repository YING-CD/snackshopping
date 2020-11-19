<!--
 * @Description: 回到顶部组件
 * @Author: yingzi
 * @Date: 2020-11-12 09:08:28
 * @LastEditTime: 2020-11-19 16:11:54
 * @LastEditors: yingzi
-->
<template>
  <div class="back-top" @click="topClick">
    <slot></slot>
  </div>
</template>

<script>
	export default {
		name: "BackTop",
    methods: {
		  topClick: function () {
        this.$emit('backTop');
      }
    }
	}
</script>

<style scoped>
  .back-top img {
    width: 43px;
    height: 43px;
    cursor: pointer;
  }
</style>
