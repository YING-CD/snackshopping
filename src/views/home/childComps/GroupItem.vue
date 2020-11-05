<template>
  <div>
    <div class="groups clearfix" v-for="(item, index) in groups" :key="index">
      <div class="group-title">{{ item.title }}</div>
      <div class="more">点击更多 ....</div>
      <div
        class="group-goods "
        v-for="(sitem, index) in item.snacks"
        :key="index"
      >
        <snacks-item :snacks="sitem" class="snacks-item"></snacks-item>
      </div>
    </div>
  </div>
</template>

<script>
import SnacksItem from "./SnacksItem";
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
  margin-top: 30px;
  position: relative;
}

.groups .group-title {
  width: 250px;
  font-weight: 500;
  font-size: 23px;
  text-align: left;
  font-family: "黑体";
  color: white;
  background-color:rgb(221, 171, 43);
}

.groups .more {
  position: absolute;
  right: 150px;
  top: 12px;

  font-weight: 700;
  font-size: 16px;
  font-family: "黑体";
  color:rgb(211, 158, 26);
  cursor: pointer;
}

.groups .group-goods {
  float: left;
}

/* 给父元素设置after元素和zoom样式 ,zoom兼容IE*/
 .clearfix::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
}
.groups .clearfix {
  zoom: 1;
}

.groups .snacks-item {
  width: 190px;
  height: 200px;
  margin-top: 20px;
  margin-right: 20px;
  /* box-sizing: border-box; */
  border: 2px rgb(221, 171, 43) solid;
}
</style>