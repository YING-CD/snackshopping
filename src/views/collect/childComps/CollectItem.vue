<!--
 * @Description: 收藏商品组件 
 * @Author: yingzi
 * @Date: 2020-11-16 13:01:53
 * @LastEditTime: 2020-11-22 01:36:54
 * @LastEditors: yingzi
-->
<template>
  <div class="collect-item">
    <el-popover placement="top" width="160" v-model="visible">
      <p>确定删除吗？</p>
      <div style="text-align: right; margin: 10px 0 0">
        <el-button size="mini" type="text" @click="visible = false"
          >取消</el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="deleteCollect(snacks.snacks_id)"
          >确定</el-button
        >
      </div>
      <i class="el-icon-close delete" slot="reference"></i>
    </el-popover>
    <snacks-item :snacks="snacks" class="snacks-item"></snacks-item>
  </div>
</template>

<script>
import SnacksItem from "content/snacks/SnacksItem";
export default {
  name: "CollectItem",
  components: {
    SnacksItem,
  },
  data() {
    return {
      visible: false,
    };
  },
  props: {
    snacks: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    deleteCollect(snacks_id) {
      this.$axios
        .post("/api/user/collect/deleteCollect", {
          user_id: this.$store.getters.getUser.user_id,
          snacks_id: snacks_id,
        })
        .then((res) => {
          switch (res.data.code) {
            case "001":
              // 删除成功
              // 删除删除列表中的该商品信息
              for (let i = 0; i < this.snacks.length; i++) {
                const temp = this.snacks[i];
                if (temp.snacks_id == snacks_id) {
                  this.snacks.splice(i, 1);
                }
              }
              this.visible = false;
               window.location.reload();
              // 提示删除成功信息
              this.notifySucceed(res.data.msg);
              break;
            default:
              // 提示删除失败信息
              this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};
</script>

<style>
.collect-item {
  position: relative;
  width: 200px;
  height: 250px;
  border: 1px goldenrod solid;
  margin-left: 20px;
  margin-bottom: 20px;
  float: left;
}
.collect-item:hover {
  border: 1px whitesmoke solid;
}

.collect-item .snacks-item {
  width: 150px;
  height: 200px;
  padding: 25px;
}
.collect-item .delete {
  position: absolute;
  top: 20px;
  right: 20px;
  display: none;
  z-index: 11;
}

.collect-item:hover .delete {
  display: block;
}

.collect-item .delete:hover {
  color: #ff6700;
}
</style>