<template>
  <div class="drawer-wrap" v-loading="showLoading">
    <div class="rh-drawer-head">
      <div class="drawer-title">产品详情</div>
    </div>
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
  props: ["detailData"],
  data() {
    return {
      title: "",
      content: "",
      showLoading: false
    }
  },
  mounted() {
  },
  created() {
    var _this = this;
    if (_this.detailData.productId != null && _this.detailData.productId != undefined) {
      _this.$api.get(this.$apis.manage + "/manage/product/info/getProductInfoById/" + _this.detailData.productId, {},
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