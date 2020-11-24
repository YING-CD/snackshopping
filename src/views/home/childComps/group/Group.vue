<!--
 * @Description: 热门分类组件组件
 * @Author: yingzi
 * @Date: 2020-11-22 22:56:08
 * @LastEditTime: 2020-11-24 15:41:39
 * @LastEditors: yingzi
-->
<template>
  <div class="groups-contain">
    <!-- <div v-for="(item, index) in gropus" :key="index" class="groups"> -->
    <div class="groups">
      <div class="group-title">甜甜糖果</div>
      <group-item :gsnacks="candy"></group-item>
      <div class="more" @click="grclick('甜甜糖果')">点击浏览更多 ....</div>
    </div>
    <div class="groups">
      <div class="group-title">方便即食</div>
      <group-item :gsnacks="instantFood"></group-item>
      <div class="more" @click="grclick('方便即食')">点击浏览更多 ....</div>
    </div>
  </div>
</template>

<script>
import GroupItem from "./GroupItem";
export default {
  name: "Group",
  components: {
    GroupItem,
  },
  data() {
    return {
      gropus: ["甜甜糖果", "方便即食"],
      candy: [],
      instantFood: [],
    };
  },
  created() {
    this.getDate("甜甜糖果");
    this.getDate("方便即食");
  },
  methods: {
    //根据分类名字获取数据
    getDate(categoryName) {
      this.$axios
        .post("/api/product/getPromoProduct", { categoryName })
        .then((res) => {
          if (categoryName == "甜甜糖果") {
            this.candy = res.data.snacks;
          } else if (categoryName == "方便即食") {
            this.instantFood = res.data.snacks;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    grclick(categoryName) {
      this.$router.push({ path: "/category", query: { categoryName } });
    },
  },
};
</script>

<style>
.groups-contain {
  margin-top: 50px;
  padding-top: 10px;
  background-color: #e9eef3;
}

.groups-contain .groups {
  height: 560px;
  width: 1280px;
  margin: 30px 0;
  /* position: relative; */
  background-color: #dde4ee;
}

.groups-contain .groups .group-title {
  width: 550px;
  padding: 3px 7px;
  margin-top: 5px;

  font-weight: 500;
  font-size: 23px;
  text-align: left;
  font-family: "黑体";
  color: rgb(221, 171, 43);
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