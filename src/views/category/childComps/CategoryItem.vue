<!--
 * @Description: 分类项组件
 * @Author: yingzi
 * @Date: 2020-11-13 11:25:12
 * @LastEditTime: 2020-11-19 16:16:30
 * @LastEditors: yingzi
-->
<template>
  <div class="main">
    <div class="list">
      <div v-if="snacks.length > 0">
        <div v-for="(item, index) in snacks" :key="index">
          <snacks-item :snacks="item" class="snacks-item"></snacks-item>
        </div>
      </div>
      <div v-else class="none-product">
        抱歉没有找到相关的商品，请看看其他的商品
      </div>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="currentChange"
      ></el-pagination>
    </div>
    <!-- 分页END -->
  </div>
</template>

<script>
import SnacksItem from "content/snacks/SnacksItem";
export default {
  name: "CategoryItem",
  components: {
    SnacksItem,
  },
  data() {
    return {
      pageSize: 10, // 每页显示的商品数量
      currentPage: 1, //当前页码
      total: 0, // 商品总量
    };
  },
  props: {
    snacks: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    // 页码变化调用currentChange方法
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.$emit(getDta())
    },
  },
  mounted() {},
};
</script>

<style>
/* 主要内容区CSS */
.main {
  margin: 0 auto;
  max-width: 1280px;
  background-color: #fff;
}

.main .list {
  /* min-height: 650px; */
  max-width: 1280px;
  padding-top: 14.5px;
  /* margin-left: -13.7px; */
  overflow: auto;
}

.main .list .snacks-item {
  width: 227px;
  height: 280px;
  margin-left: 20px;
  margin-bottom: 20px;
  padding: 25px;
  box-sizing: border-box;
  float: left;
  border: 2px rgb(111, 169, 226) solid;
}
.main .list .snacks-item:hover {
  border: 2px white solid;
}

.main .pagination {
  height: 50px;
  text-align: center;
  position: relative;
  top: 0;
  left: 0;
}
.main .none-product {
  color: #333;
  margin-left: 13.7px;
}
/* 主要内容区CSS END */
</style>