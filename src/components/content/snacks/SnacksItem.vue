<!--
 * @Description: 商品组件
 * @Author: yingzi
 * @Date: 2020-11-05 13:59:23
 * @LastEditTime: 2020-11-21 16:56:14
 * @LastEditors: yingzi
-->
<template>
  <div class="snacks" @click="goToDetail">
    <!-- <img v-lazy="getImg" :key="getImg" alt="零食图片"> -->
    <img :src="$target + snacks.snacks_picture" alt="零食图片"/>
    <div class="snacks-info">
      <p>{{ snacks.snacks_title }}</p>
      <span class="price">¥{{ snacks.snacks_selling_price }}</span>
      <span class="collect">{{ snacks.collections_amount }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SnacksItem",
  props: {
    snacks: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    goToDetail() {
      // 1.获取iid
      let snacks_id = this.snacks.snacks_id;
      // 2.跳转到详情页面
      this.$router.push({ path: "/detail", query: { snacks_id } });
    }
  },
  mounted() {}
};
</script>

<style>
.snacks {
  padding-bottom: 40px;
  position: relative;
  cursor: pointer;
  height: 200px;
  width: 200px;
  background-color: #fff;
}
.snacks img {
  width: 100%;
  padding: 6px;
  overflow: hidden;
  box-sizing: border-box;
}

.snacks-info {
  /* padding: 0 10px; */
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.snacks-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.snacks-info .price {
  color: #ff2832;
  margin-right: 20px;
}

.snacks-info .collect {
  position: relative;
}

.snacks-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>