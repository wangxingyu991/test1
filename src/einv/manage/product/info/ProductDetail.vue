<template>
  <div class="drawer-wrap" v-loading="showLoading">
    <div class="rh-drawer-body">
      <div class="editor-head" v-html="title">
        <!-- {{title}} -->
      </div>
      <div v-html="content">
        <!-- {{content}} -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productId: "",
      title: "",
      content: "",
      showLoading: false
    }
  },

  created() {
    //获取window.open跳转过来并传递过来的参数
    var _this = this;
    _this.productId = _this.$route.query.productId;
    if (_this.productId != null && _this.productId != undefined) {
      _this.$api.get(this.$apis.home + "/rest/home/home/getProductInfoById/" + _this.productId, {},
        function (res) {
          if (res.success) {
            _this.title = res.data.detailsDescTitle;
            _this.content = res.data.detailsWebContent;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    }
  },
  methods: {
  }
}
</script>

<style lang="less">
.editor-head {
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  line-height: 63px;
}
</style>