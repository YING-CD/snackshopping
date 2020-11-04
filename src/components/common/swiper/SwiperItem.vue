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
