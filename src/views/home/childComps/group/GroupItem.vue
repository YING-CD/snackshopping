<template>
  <div class="groups-contain">
    <div class="groups" v-for="(item, index) in groups" :key="index"  v-show="(3 - index) > 0 ? true : false">
      <div class="group-title">{{ item.title }}</div>
      <div
        class="group-goods "
        v-for="(sitem, index) in item.snacks"
        :key="index"
        v-show="(11 - index) > 0 ? true : false"
      >
        <snacks-item :snacks="sitem" class="snacks-item"></snacks-item>
      </div>
      <div class="more" @click="grclick(item.cid)">点击浏览更多 ....</div>
    </div>
  </div>
</template>

<script>
import SnacksItem from "content/snacks/SnacksItem";
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
  methods: {
    grclick(cid) {
       this.$router.push({ path: "/category",query:{cid}});
    }
  },
  mounted() {}
};
</script>

<style>
.groups-contain {
  margin-top: 50px;
  background-color: #E9EEF3;
}

.groups-contain .groups {
  height: 560px;
  width: 1280px;
  margin-bottom: 40px;
  /* overflow: hidden; */
  
  position: relative;
  background-color: #dde4ee;
}

.groups-contain .groups .group-title {
  width: 250px;
  padding: 3px 7px;
  margin-top: 5px;

  font-weight: 500;
  font-size: 23px;
  text-align: left;
  font-family: "黑体";
  color: rgb(221, 171, 43);
  /* background-color: rgb(221, 171, 43); */
}

.groups-contain .groups .snacks-item {
  float: left;
  width: 190px;
  height: 200px;
  margin-top: 20px;
  margin-left: 20px;
  /* box-sizing: border-box; */
  border: 1px rgb(221, 171, 43) solid;
}
.groups-contain .groups .snacks-item:hover {
  border: 1px white solid;
}

.groups-contain .groups .more {
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