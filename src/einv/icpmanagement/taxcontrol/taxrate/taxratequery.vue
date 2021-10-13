<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title">查看核定税率</div>
    </div>
    <div class="rh-drawer-body">
    <div class="rh-page-content">
      <div class="rh-table">
        <el-table :data="tableData" stripe border @selection-change="handleSelectionChange"  v-loading="loading">
          <template slot="empty">
            <div class="pic_nodata"></div>
          </template>
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope"> {{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip  prop="fplxmc" label="发票类型名称"></el-table-column>
          <el-table-column show-overflow-tooltip  prop="sl" label="税率"></el-table-column>
          <el-table-column show-overflow-tooltip  prop="slmc" label="税率名称"></el-table-column>
          <el-table-column show-overflow-tooltip  prop="czr" label="操作人"></el-table-column>
          <el-table-column show-overflow-tooltip  prop="czsj" label="操作时间"></el-table-column>
        </el-table>
      </div>
    </div>
    </div>
    <div class="rh-dialog-footer">
      <el-button @click="close('queryForm')">关闭</el-button>
    </div>
  </div>
</template>

<script>
import validate from "@/utils/validate.js";
export default {

  props: ["updatePageData"],

   data() {
    return {
      //查询表单
      queryForm: {
        nsrsbh: "",
        swukbh: "",
        xnsbh: "",
        pageNo: 1,
        pageSize: 10,
      },
      page: {
        Total: 100,
        Size: [10, 20, 30],
        currentPage: 1,
      },
      tableData: [],
      //表格选择
      tr_sels: [],
      pageterminaladdData:{},
      loading: false,
    };
  },

  created() {},

  mounted() {
    this.init_Table();
  },

  methods: {
    //初始化表格
    init_Table() {
      let _this = this;
     
      let params = this.queryForm;
      _this.$set(params, "nsrsbh", _this.updatePageData.row.nsrsbh);
      _this.$set(params, "swukbh", _this.updatePageData.row.swukbh);
      _this.$set(params, "xnsbh", _this.updatePageData.row.xnsbh);
      _this.$set(params, "fplxdm", _this.updatePageData.row.fplxdm);
      if (params != null) {
        if (validate.checkForbiddenWordForm(JSON.stringify(params))) {
          _this.$message({
            showClose: true,
            message: "不允许有特殊字符",
            type: "error",
          });
          return;
        }
      }

      //打开loading
      _this.loading=true;
      this.$api.post(
        _this.$apis.icpmanagement + "/taxcontrol/taxrate/listTaxrateByxnsbh",params,
        function (res) {
          _this.loading=false;
          if (res.success) {
            console.info(JSON.stringify(res.data));
            _this.tableData = res.data;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //搜索
    searchForm() {
      this.queryForm.pageNo = 1;
      this.init_Table();
    },

    //重置
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.queryForm.pageNo = 1;
      this.init_Table();
    },

        //初始化table
    init() {
      this.init_Table();
    },

    //保存成功后关闭抽屉
    back() {
      this.terminaladd_Dialog = false;
      this.queryForm.pageNo = 1;
      this.init_Table();
    },

    //关闭
    close(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      //关闭抽屉
      this.$emit("back");
    },
  },
};
</script>

<style lang="less">
.el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
}
.el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.el-dialog__headerbtn {
  right: 40px;
}
</style>