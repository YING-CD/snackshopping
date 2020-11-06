<template>
  <div>
    <div class="groups clearfix" v-for="(item, index) in groups" :key="index"  v-show="(6 - index) > 0 ? true : false">
      <div class="group-title">{{ item.title }}</div>
      <div
        class="group-goods "
        v-for="(sitem, index) in item.snacks"
        :key="index"
        v-show="(9 - index) > 0 ? true : false"
      >
        <snacks-item :snacks="sitem" class="snacks-item"></snacks-item>
      </div>
      <div class="more">点击浏览更多 ....</div>
    </div>
  </div>
</template>

<script>
import SnacksItem from "./../SnacksItem";
export default {
  name: "GroupItem",
  components: {
    SnacksItem
  },
  props: {
    groups: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  methods: {},
  mounted() {}
};
</script>

<style>
.groups {
  height: 560px;
  width: 1200px;
  overflow: hidden;
  margin-bottom: 40px;
  position: relative;
}

.groups .group-title {
  width: 250px;
  padding: 3px 7px;
  font-weight: 500;
  font-size: 23px;
  text-align: left;
  font-family: "黑体";
  color: white;
  background-color:rgb(221, 171, 43);
}

.groups .group-goods {
  float: left;
}

/* 给父元素设置after元素和zoom样式 ,zoom兼容IE*/
 /* .clearfix::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
}
.groups .clearfix {
  zoom: 1;
} */

.groups .snacks-item {
  width: 190px;
  height: 200px;
  margin-top: 20px;
  margin-right: 20px;
  /* box-sizing: border-box; */
  border: 2px rgb(221, 171, 43) solid;
}
.groups .more {
  width: 190px;
  margin-top: 120px;
  float: left;
  font-weight: 600;
  text-align: center;
  color: gray;
  cursor: pointer;
}

.groups .more:hover {
  font-weight: 700;
  color: rgb(221, 171, 43);
}
</style>