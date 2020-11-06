<template>
  <div class="favorite clearfix">
    <div class="favorite-title">{{ favorite.ftitle }}</div>
    <div
      class="favorite-goods "
      v-for="(sitem, index) in favorite.snacks"
      :key="index"
      v-show="19 - index > 0 ? true : false"
    >
      <snacks-item :snacks="sitem" class="snacks-item"></snacks-item>
    </div>
    <div class="more">点击浏览更多 ....</div>
  </div>
</template>

<script>
import SnacksItem from "./../SnacksItem";
export default {
  name: "Favorite",
  components: {
    SnacksItem
  },
  props: {
    favorite: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {},
  mounted() {}
};
</script>

<style>
.favorite {
  height: 1120px;
  width: 1200px;
  overflow: hidden;
  margin-bottom: 30px;
  position: relative;
}

.favorite .favorite-title {
  width: 1050px;
  font-weight: 500;
  font-size: 23px;
  text-align: center;
  padding: 2px 0;
  font-family: "黑体";
  color: white;
  border-radius: 30%;
  background-color: rgb(221, 43, 58);
}

.favorite .favorite-goods {
  float: left;
}

.favorite .snacks-item {
  width: 190px;
  height: 200px;
  margin-top: 20px;
  margin-right: 20px;
  /* box-sizing: border-box; */
  border: 2px rgb(221, 43, 58) solid;
}

.favorite .more {
  width: 190px;
  margin-top: 120px;
  float: left;
  font-weight: 600;
  text-align: center;
  color: gray;
  cursor: pointer;
}

.favorite .more:hover {
  font-weight: 700;
  color: rgb(221, 43, 58);
}
</style>