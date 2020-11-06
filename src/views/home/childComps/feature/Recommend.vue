<template>
  <div class="recommend">
    <div class="recomend-title">热门推荐</div>
    <snacks-item
      v-for="(item, index) in recommend"
      :key="index"
      :snacks="item"
      class="snacks-item"
    ></snacks-item>
  </div>
</template>

<script>
import SnacksItem from "./../SnacksItem";

export default {
  name: "Recommend",
  components: {
    SnacksItem
  },
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {}
};
</script>
<style  scoped>
.recommend {
  width: 300px;
  height: 450px;
  padding: 15px 15px;
  border: 2px rgb(221, 171, 43) solid;
  margin-right: 15px;
}


.recomend-title {
  font-weight: 500;
  font-size: 23px;
  font-family: "黑体";
  color: white;
  background: -webkit-linear-gradient(
    45deg,
    #2fd0d8,
    #db7240,
    #d4ba37,
    #6130f3,
    #234e8a
  );
  /* -moz-linear-gradient(45deg, #2fd0d8, #db7240, #d4ba37, #6130f3, #1050aa); */
  /* -ms-linear-gradient(45deg, #2fd0d8, #db7240, #d4ba37, #6130f3, #1050aa); */
}

.snacks-item {
  height: 80px;
  width: 95px;
  display: flex;
  float: left;
  align-items: space-around;
  margin-top: 20px;
}
</style>