<!--
 * @Description: 底部控件 
 * @Author: yingzi
 * @Date: 2020-11-12 14:46:34
 * @LastEditTime: 2020-11-19 16:12:58
 * @LastEditors: yingzi
-->
<template>
  <div class="footer">
    <div class="promise-box">
      <div class="promise">
        <p class="text">
          <a class="icon1" href="javascript:;">7天无理由退换货</a>
          <a class="icon2" href="javascript:;">满99元全场免邮</a>
          <a class="icon3" style="margin-right: 0" href="javascript:;"
            >100%品质保证</a
          >
        </p>
      </div>
    </div>
    <div class="github">
      <a href="javascript:; " target="_blank">
        <div class="github-but"></div>
      </a>
    </div>
    <div class="mod_help">
      <p>
        <router-link to="/">首页</router-link>
        <span>|</span>
        <router-link to="/goods">全部商品</router-link>
        <span>|</span>
        <router-link to="/about">关于我们</router-link>
      </p>
      <p class="coty">商城版权所有 &copy; 2020-2022</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
};
</script>

<style>
/* 底栏容器CSS */
.footer {
  width: 100%;
  height: 340px;
  text-align: center;
  background: #2f2f2f;
  /* padding-bottom: 0px; */
}

.footer .promise-box {
  margin: 0 auto;
  border-bottom: 1px solid #3d3d3d;
  line-height: 105px;
}

.footer .promise-box .promise p a {
  color: #fff;
  font-size: 20px;
  margin-right: 210px;
  padding-left: 44px;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  text-decoration: none;
  background: url("~assets/img/us-icon.png") no-repeat left 0;
}

.footer .github {
  height: 50px;
  line-height: 50px;
  margin-top: 20px;
}

.footer .github .github-but {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  background: url("~assets/img/github.png") no-repeat;
}

.footer .mod_help {
  text-align: center;
  color: #888888;
}

.footer .mod_help p {
  margin: 20px 0 16px 0;
}

.footer .mod_help p a {
  color: #888888;
  text-decoration: none;
}
.footer .mod_help p a:hover {
  color: #fff;
}

.footer .mod_help p span {
  padding: 0 22px;
}
/* 底栏容器CSS END */
</style>