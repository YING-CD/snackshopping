<template>
  <div>
    <div class="cl-title">全部分类</div>
    <div class="classification" v-for="item in classification" :key="item.name">
      <ul>
        <li class="cl-item">{{ item.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Classification",
  props: {
    classification: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {},
  methods: {},
  mounted() {}
};
</script>
  
<style>
.cl-title {
  font-weight: 700;
  font-size: 23px;
  font-family: "黑体";
  text-align: left;
  color: white;
  background: -webkit-linear-gradient(
    45deg,
    #2fd0d8,
    #db7240,
    #d4ba37,
    #6130f3,
    #234e8a
  );
  /* -moz-linear-gradient(45deg, #2fd0d8, #db7240, #d4ba37, #6130f3, #1050aa); */
  /* -ms-linear-gradient(45deg, #2fd0d8, #db7240, #d4ba37, #6130f3, #1050aa); */
  /*设置字体颜色透明*/
  color: transparent;
  /*背景裁剪为文本形式*/
  -webkit-background-clip: text;
  /*动态10s展示*/
  animation: ran 10s linear infinite;
  padding-left: 20px;
  cursor: pointer;
}

.cl-item {
  line-height: 10px;
  text-align: left;
  padding-left: 10px;
  font-family: "黑体";
  color: #1b4f97;
  font-size: 14px;
  cursor: pointer;
  
}

.cl-item:hover {
  color: red;
  text-decoration: underline;
}
</style>