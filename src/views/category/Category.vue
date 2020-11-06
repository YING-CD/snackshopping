<template>
  <div class="category">
    <div class="ct-title">分类页</div>
    <div class="ct-content"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Category",
  data() {
    return {
      cid: ""
    };
  },

  components: {},

  methods: {
    getData() {
      this.cid = this.$route.query.id;
      var id = this.cid;
      axios({
        method: "get",
        url: "/category/message",
        data: {
          id
        }
      }).then(res => {
        console.log(res);
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style>
</style>