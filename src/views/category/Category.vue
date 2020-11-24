<!--
 * @Description: 全部商品页面
 * @Author: yingzi
 * @Date: 2020-11-05 20:55:01
 * @LastEditTime: 2020-11-23 22:45:11
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
            :key="item.category_id"
            :label="item.category_name"
            :name="item.category_name"
          />
        </el-tabs>
      </div>
    </div>
    <!-- 分类标签END -->
    <!-- 主要内容区 -->
    <div class="main">
      <category-item :csnacks="snacksList"></category-item>
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
    </div>
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
      categoryName: "", // 分类名字
      snacksList: [], // 商品列表
      total: 0, // 商品总量
      pageSize: 15, // 每页显示的商品数量
      currentPage: 1, //当前页码
      activeName: "全部", // 分类列表当前选中的名字
      search: "", // 搜索条件
    };
  },
  created() {
    // 获取分类列表
    this.getCategory();
  },
  activated() {
    this.activeName = ""; // 初始化分类列表当前选中为全部商品
    this.total = 0; // 初始化商品总量为0
    this.currentPage = 1; //初始化当前页码为1
    // 如果路由没有传递参数，默认为显示全部商品
    if (Object.keys(this.$route.query).length == 0) {
      console.log("没有传递参数");
      this.categoryName = "";
      this.activeName = "全部";
      this.getData();
      return;
    }
    // 如果路由传递了categoryName，则显示对应的分类商品
    if (this.$route.query.categoryName != undefined) {
      this.categoryName = this.$route.query.categoryName;
      this.activeName = this.categoryName;
      console.log(this.activeName);
      return;
    }
    // 如果路由传递了search，则为搜索，显示对应的分类商品
    if (this.$route.query.search != undefined) {
      this.search = this.$route.query.search;
      console.log(this.search);
    }
  },
  watch: {
    // 监听点击了哪个分类标签，通过修改分类名字，响应相应的商品
    activeName: function (name) {
      if (name == "全部") {
        this.categoryName = "";
      }
      if (name != "全部") {
        this.categoryName = name;
      }
      // 初始化商品总量和当前页码
      this.total = 0;
      this.currentPage = 1;
      // // 更新地址栏链接，方便刷新页面可以回到原来的页面
      // this.$router.push({
      //   path: "/category",
      //   query: { categoryName: this.categoryName },
      // });
    },
    // 监听搜索条件，响应相应的商品
    search(val) {
      console.log(val);
      if (val != "") {
        this.getProductBySearch();
        console.log(typeof val);
      }
    },
    // 监听分类名字，响应相应的商品
    categoryName() {
      console.log("获取数据")
      this.getData();
      this.search = "";
    },
    // 监听路由变化，更新路由传递了搜索条件
    $route: function (val) {
      if (val.path == "/category") {
        if (val.query.search != undefined) {
          this.activeName = "";
          this.currentPage = 1;
          this.total = 0;
          this.search = val.query.search;
        }
      }
    },
  },
  methods: {
    // 向后端请求分类列表数据
    getCategory() {
      this.$axios
        .post("/api/product/getCategory", {})
        .then((res) => {
          const cate = res.data.category;
          const val = {
            category_id: 0,
            category_name: "全部",
          };
          cate.unshift(val);
          this.categoryList = cate;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    // 向后端请求全部商品或分类商品数据
    getData() {
      // 如果分类列表为空则请求全部商品数据，否则请求分类商品数据
      if (this.categoryName == "") {
        this.$axios
          .post("/api/product/getAllProduct", {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          })
          .then((res) => {
            this.snacksList = res.data.snacks;
            this.total = res.data.total;
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      } else if (this.categoryName != "") {
        this.$axios
          .post("/api/product/getProductByCategory", {
            categoryName: this.categoryName,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          })
          .then((res) => {
            this.snacksList = res.data.snacks;
            this.total = res.data.total;
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
    },
    // 通过搜索条件向后端请求商品数据
    getProductBySearch() {
      this.$axios
        .post("/api/product/getProductBySearch", {
          search: this.search,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        })
        .then((res) => {
          console.log(res);
          this.snacksList = res.data.snacks;
          this.total = res.data.total;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    // 返回顶部
    backtop() {
      const timer = setInterval(function () {
        const top =
          document.documentElement.scrollTop || document.body.scrollTop;
        const speed = Math.floor(-top / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          top + speed;

        if (top === 0) {
          clearInterval(timer);
        }
      }, 20);
    },
    // 页码变化调用currentChange方法
    currentChange(currentPage) {
      this.currentPage = currentPage;
      if (this.search != "") {
        this.getProductBySearch();
      } else {
        this.getData();
      }
      this.backtop();
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
  top: 110px;
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

/* 主要内容区CSS */
.goods .main {
  margin: 0 auto;
  max-width: 1280px;
  background-color: #fff;
}
.goods .main .pagination {
  height: 50px;
  text-align: center;
}
.goods .main .none-product {
  color: #333;
  margin-left: 13.7px;
}
/* 主要内容区CSS END */
</style>