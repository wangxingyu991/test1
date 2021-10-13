<template>
  <div class="drawer-wrap" v-loading="loading" >
    <div class="rh-drawer-body">
        <div class="editor-head" v-html="title">
            <!-- {{title}} -->
        </div>
        <div v-html="content">
            <!-- {{content}} -->
        </div>
    </div>
    <div class="rh-dialog-footer">
      <el-button @click="close('tableData')">关闭</el-button>
    </div>
  </div>

</template>

<script>
import { formateDate } from "@/utils/tools.js";

export default {
  props: ["hotPageData"],

  data() {
    return {
      loading: false,
      title:"",
      content:""
    };
  },

  mounted() {
    this.initPage();
  },

  methods: {
    initPage(){
      // alert(this.hotPageData.workOrderHot.problemName)
      let _this = this;
      _this.title = this.hotPageData.workOrderHot.problemName;
      _this.content = this.hotPageData.workOrderHot.problemHandling;
    },

    //关闭
    close(formName) {
      //关闭抽屉
      // this.$refs[formName].resetFields();
      this.$emit("back");
    },
  },
};
</script>

<style lang="less">
    .editor-head{
            font-size: 24px;
            font-weight: 800;
            text-align: center;
            line-height: 63px;
    }
</style>
