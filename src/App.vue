<!--
 * @Description: 程序主页面
 * @Author: yingzi
 * @Date: 2020-11-02 12:40:57
 * @LastEditTime: 2020-11-24 16:44:34
 * @LastEditors: yingzi
-->
<template>
  <div id="app">
    <el-container>
      <main-nav></main-nav>
      <el-header class="header">
        <nav-control></nav-control>
      </el-header>
      <el-main>
        <keep-alive exclude="Detail">
          <router-view></router-view>
        </keep-alive>
      </el-main>
      <Footer></Footer>
    </el-container>
    <back-top @backTop="backTop" class="back-top" v-show="isShow">
      <img src="~assets/img/common/top.png" alt="回到顶部" />
    </back-top>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import MainNav from "content/nav/mainNav/MainNav";
import NavControl from "content/nav/navControl/NavControl";
import Footer from "content/footer/Footer";
import BackTop from "content/backTop/BackTop";
export default {
  data() {
    return {
      activeIndex: "", // 头部导航栏选中的标签
      search: "", // 搜索条件
      isShow: false, //回到顶部
    };
  },
  components: {
    MainNav,
    NavControl,
    Footer,
    BackTop,
  },
  beforeUpdate() {
    this.activeIndex = this.$route.path;
  },
  // window对象，所有浏览器都支持window对象。它表示浏览器窗口，监听滚动事件
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },
  methods: {
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },

    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this;
      let scrollTop = window.pageYOffset 
      || document.documentElement.scrollTop 
      || document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 60) {
        that.isShow = true;
      } else {
        that.isShow = false;
      }
    },
  },
};
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
}

.el-header {
  background-color: white;
  height: 69px !important;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  min-height: 1200px;
}

.el-footer {
  background-color: white;
  /* height: 120px !important; */
}

.header {
  position: fixed;
  top: 40px;
  left: 0;
  z-index: 111;
  width: 100%;
}

.back-top {
  position: fixed;
  right: 100px;
  bottom: 100px;
}
</style>
