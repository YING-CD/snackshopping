<!--
 * @Description: 导航控件组件
 * @Author: yingzi
 * @Date: 2020-11-12 00:32:38
 * @LastEditTime: 2020-11-24 17:26:48
 * @LastEditors: yingzi
-->
<template>
  <nav-bar class="nav-control">
    <div slot="left" class="logo">零食陶陶街</div>
    <div slot="center" class="tabControl">
      <div
        link="/home"
        class="home"
        @click="homeLink"
        :class="{ activeClass: homeIndex }"
      >
        首页
      </div>
      <div
        link="/category"
        class="category"
        @click="catLink"
        :class="{ activeClass: categoryIndex }"
      >
        全部商品
      </div>
    </div>
    <div slot="right" class="search">
      <input
        type="text"
        class="search-input"
        placeholder="请输入搜索内容"
        v-model="search"
        @keyup.enter.prevent="searchEnterFun($event)"
      />
      <input type="button" class="search-button" @click="searchClick" />
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "common/navbar/NavBar";

export default {
  name: "NavControl",
  components: {
    NavBar,
  },
  data() {
    return {
      homeIndex: false,
      categoryIndex: false,
      search: "", // 搜索条件
    };
  },
  watch: {
    $route(to, from) {
      if (to.path == "/home") {
        this.homeIndex = true;
        this.categoryIndex = false;
      } else if (to.path == "/category") {
        this.categoryIndex = true;
        this.homeIndex = false;
      } else {
        this.homeIndex = false;
        this.categoryIndex = false;
      }
    },
  },
  methods: {
    homeLink() {
      this.$router.push({ path: "/home" });
    },
    catLink() {
      this.$router.push({ path: "/category" });
    },
    // 点击搜索按钮
    searchClick() {
      if (this.search != "") {
        // 跳转到全部商品页面,并传递搜索条件
        this.$router.push({
          path: "/category",
          query: { search: this.search },
        });
        this.search = "";
      }
    },
    // 通过回车搜索
    searchEnterFun(e) {
      var keyCode = window.event ? e.keyCode : e.which;
      if (keyCode == 13) {
        this.searchClick();
      }
    },
  },
};
</script>
<style scoped>
.nav-control {
  background-color: white;
  width: 1280px;
  margin: 0 auto;
  /* padding-top: 30px; */
  /* border-bottom: 1px rgb(173, 171, 171) solid; */
}

.nav-control .logo {
  font-weight: 700;
  font-size: 32px;
  text-align: left;
  color: rgb(173, 171, 171);
  background: -webkit-linear-gradient(
    45deg,
    #2fd0d8,
    #db7240,
    #d4ba37,
    #6130f3,
    #1050aa
  );
  /* -moz-linear-gradient(45deg, #2fd0d8, #db7240, #d4ba37, #6130f3, #1050aa); */
  /* -ms-linear-gradient(45deg, #2fd0d8, #db7240, #d4ba37, #6130f3, #1050aa); */
  /*设置字体颜色透明*/
  color: transparent;
  /*背景裁剪为文本形式*/
  -webkit-background-clip: text;
  /*动态10s展示*/
  animation: ran 10s linear infinite;
  cursor: pointer;
}

.nav-control .tabControl {
  /* display: flex; */
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  color: rgb(37, 35, 35);
  padding-bottom: 10px;
}

.nav-control .tabControl .home {
  width: 70px;
  height: 60px;
  padding: 10px 10px 0px 10px;
  /* border-bottom: 2px red solid; */
  float: left;
}

.nav-control .tabControl .category {
  width: 70px;
  height: 60px;
  padding: 10px 10px 0px 10px;
  /* border-bottom: 2px red solid; */
  float: left;
}

.nav-control .tabControl .activeClass {
  color: red;
  border-bottom: 1px red solid;
}
.nav-control .search {
  height: 60px;
  padding-top: 10px;
}

.nav-control .search .search-input {
  width: 350px;
  height: 35px;
  padding: 0;
  border: 1px red solid;
  margin-top: 7px;

  float: left;
}

.nav-control .search .search-input:hover {
  outline: 1px red solid;
}

.nav-control .search .search-input:focus {
  outline: 1px red solid;
}

.nav-control .search .search-button {
  width: 50px;
  height: 38px;
  border: 1px red solid;
  margin-top: 6px;
  background: url(~assets/img/head_sprite.png) no-repeat 0 -346px red;
  cursor: pointer;
  float: left;
}
.nav-control .search .search-button:focus {
  outline: 1px red solid;
}
</style>