<template>
   <nav-bar class="nar-bar">
    <div slot="left" class="logo">零食陶陶街</div>
    <div slot="center" class="search">
      <input type="text" id="search-in" class="search-input" >
      <input type="button" for="search-in" class="search-button" >
    </div>
    <div slot="right" class="profile">
      <div class="profile-icon">
        <img src="~assets/img/profile-icon3.jpg" alt="账号图标" class="profile-img">
      </div>
      <div class="profile-text">我的账号</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'common/navbar/NavBar'

export default {
  name: "HomeNav",
  components: {
    NavBar,
  },
}

</script>
<style scoped>
.nar-bar {
    height: 100px;
    width: 1200px;
    margin: 0 auto;

    position: relative;
  }

  .nar-bar .logo {
      font-weight: 700;
      font-size: 32px;
      font-family: "黑体";
      color: #696468;
      background: -webkit-linear-gradient(45deg, #2fd0d8, #db7240, #d4ba37, #6130f3, #1050aa);
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

  .nar-bar .search {
    /* height: 40px; */
    /* border: 1px  red solid; */
    margin-left:180px;
  }

  .nar-bar .search .search-input {
    width: 480px;
    height: 38px;
    padding: 0;
    border: 2px red solid;
    margin-top: 0;
    
    float: left;
  }

  .nar-bar .search .search-input:hover{
   outline: 1px red solid; 
  }
  .nar-bar .search .search-input:focus{
   outline: 1px red solid; 
  }

   .nar-bar .search .search-button {
    width: 60px;
    height: 42px;
    border: 1px red solid;
    /* background: url(http://img63.ddimg.cn/upload_img/00459/home/head_sprite.png) no-repeat 0 -346px; */
    background: url(~assets/img/head_sprite.png) no-repeat 0 -346px red;
    cursor: pointer;
    float: left;
  }

  .nar-bar .profile {
    font-size: 14px;
    font-family: "黑体";
    text-align: center;
    cursor: pointer;
  }

  .nar-bar .profile:hover {
    color: red;
  }

   .profile-icon .profile-img {
    height: 40px;
    width: 40px;
  }

</style>