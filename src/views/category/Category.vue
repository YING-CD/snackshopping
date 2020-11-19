<!--
 * @Description: 全部商品页面
 * @Author: yingzi
 * @Date: 2020-11-05 20:55:01
 * @LastEditTime: 2020-11-19 16:16:20
 * @LastEditors: yingzi
-->
<template>
  <div class="goods" name="goods">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全部商品</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">搜索</el-breadcrumb-item>
        <el-breadcrumb-item v-else>分类</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">{{ search }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 面包屑END -->
    <!-- 分类标签 -->
    <div class="nav">
      <div class="product-nav">
        <div class="title">分类</div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane
            v-for="item in categoryList"
            :key="item.cid"
            :label="item.title"
            :name="'' + item.cid"
          >
          <div class="contain">
            <category-item :snacks="snacks"></category-item>
          </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 分类标签END -->
  </div>
</template>

<script>
import CategoryItem from "./childComps/CategoryItem";
import axios from "axios";
export default {
  name: "Category",
  components: {
    CategoryItem,
  },
  data() {
    return {
      categoryList: [], //分类列表
      // snacks: [],//
      categoryID: [], // 分类id
      product: [], // 商品列表
      productList: "",
      activeName: "0", // 分类列表当前选中的id
      search: "", // 搜索条件
    };
  },
  computed: {
    snacks() {
      var index = Number(this.activeName);
      console.log(index);
      return this.categoryList[index].snacks;
    }
  },
  created() {
    // 获取分类列表
    this.getCategory();
  },
  activated() {
    this.activeName = "0"; // 初始化分类列表当前选中的id为-1
    // this.total = 0; // 初始化商品总量为0
    // this.currentPage = 1; //初始化当前页码为1
    // 如果路由没有传递参数，默认为显示全部商品
    if (Object.keys(this.$route.query).length == 0) {
      this.categoryID = [];
      this.activeName = "0";
      return;
    }
    // 如果路由传递了categoryID，则显示对应的分类商品
    if (this.$route.query.categoryID != undefined) {
      this.categoryID = this.$route.query.cid;
      console.log(categoryID);
      if (this.categoryID.length == 1) {
        this.activeName = "" + this.categoryID[0];
      }
      return;
    }
    // 如果路由传递了search，则为搜索，显示对应的分类商品
    if (this.$route.query.search != undefined) {
      this.search = this.$route.query.search;
    }
  },
  watch: {
    // 监听点击了哪个分类标签，通过修改分类id，响应相应的商品
    activeName: function (val) {
      if (val == 0) {
        this.categoryID = [];
      }
      if (val > 0) {
        this.categoryID = [Number(val)];
      }
      // 初始化商品总量和当前页码
      // this.total = 0;
      // this.currentPage = 1;
      // 更新地址栏链接，方便刷新页面可以回到原来的页面
      this.$router.push({
        path: "/category",
        query: { categoryID: this.categoryID },
      });
    },
    // 监听搜索条件，响应相应的商品
    // search: function (val) {
    //   if (val != "") {
    //     this.getProductBySearch(val);
    //   }
    // },
    // 监听分类id，响应相应的商品
    categoryID: function () {
      // this.getCategory();
      this.search = "";
    },
    // 监听路由变化，更新路由传递了搜索条件
    $route: function (val) {
      if (val.path == "/category") {
        if (val.query.search != undefined) {
          this.activeName = "-1";
          // this.currentPage = 1;
          // this.total = 0;
          this.search = val.query.search;
        }
      }
    },
  },
  methods: {
    // 向后端请求分类列表数据
    getCategory() {
      axios
        .get("/home/information")
        .then((res) => {
          var result = res.data;
          this.categoryList = result.classification;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.goods {
  width: 1280px;
  background-color: #f5f5f5;
  margin: 0 auto;
  position: relative;
  top: 100px;
}

.goods .el-tab-pane {
  overflow: hidden;
}

.goods .breadcrumb {
  height: 50px;
  background-color: white;
}
.goods .breadcrumb .el-breadcrumb {
  width: 1280px;
  line-height: 30px;
  font-size: 16px;
  margin: 0 auto;
}
/* 面包屑CSS END */

/* 分类标签CSS */
.goods .nav {
  background-color: white;
}
.goods .nav .product-nav {
  width: 1280px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
}
.nav .product-nav .title {
  width: 50px;
  font-size: 16px;
  font-weight: 700;
  float: left;
}
/* 分类标签CSS END */
</style>