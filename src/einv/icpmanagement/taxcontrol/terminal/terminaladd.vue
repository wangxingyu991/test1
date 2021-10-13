<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title">新增开票终端</div>
    </div>
    <div class="rh-drawer-body">
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <div class="rh-pull-left">
          <el-button type="primary" @click="foraddTerminal">新增</el-button>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData" stripe border @selection-change="handleSelectionChange">
          <template slot="empty">
            <div class="pic_nodata"></div>
          </template>
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope"> {{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="left"  prop="kpzddm" label="开票终端代码"></el-table-column>
          <el-table-column show-overflow-tooltip align="left"  prop="kpzdmc" label="开票终端名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="yxbz" label="有效标识">
             <template slot-scope="scope">
               <span class="cell-red" v-if="scope.row.yxbz =='无效'">{{scope.row.yxbz}}</span>
               <span class="cell-green" v-if="scope.row.yxbz =='有效'">{{scope.row.yxbz}}</span>
             </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip  align="left" prop="czr" label="操作人"></el-table-column>
          <el-table-column show-overflow-tooltip  align="center" prop="czsj" label="操作时间"></el-table-column>
        </el-table>
      </div>
      <div class="rh-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
        </el-pagination>
      </div>
    </div>
    <!-- 新增开票终端Dialog -->
    <div class="dailog">
      <el-dialog title="新增开票终端" :visible.sync="terminaladd_Dialog" width="50%" append-to-body>
        <pageterminaladd v-if="terminaladd_Dialog" @back="back" :pageterminaladdData="pageterminaladdData"></pageterminaladd>
      </el-dialog>
    </div>

    </div>
    <div class="rh-dialog-footer">
      <el-button @click="close('queryForm')">关闭</el-button>
    </div>
  </div>
</template>

<script>
import pageterminaladd from "./terminaldoadd.vue";
import validate from "@/utils/validate.js";

export default {
  components: {
    pageterminaladd,
  },

  props: ["updatePageData"],

   data() {
    return {
      terminaladd_Dialog: false,
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
    };
  },

  created() {},

  mounted() {
    this.init_Table();
  },

  methods: {
    //初始化表格
    init_Table() {
      //打开loading
      let _this = this;
      let params = this.queryForm;
      _this.$set(params, "nsrsbh", _this.updatePageData.row.nsrsbh);
      _this.$set(params, "swukbh", _this.updatePageData.row.swukbh);
      _this.$set(params, "xnsbh", _this.updatePageData.row.xnsbh);

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
      
      this.$api.post(
        _this.$apis.icpmanagement + "/taxcontrol/terminal/listTerminalByxnsbh",params,
        function (res) {
          console.info(JSON.stringify(res));
          if (res.success) {
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

   //分页页码操作
    handleSelectionChange(val) {
      this.tr_sels = val;
    },
    //分页操作
    handleCurrentChange(val) {
      this.queryForm.pageNo = val;
      //更改分页后重新初始化页面
      this.init_Table();
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      //更改分页后重新初始化页面
      this.init_Table();
    },


    //进入到新增开票终端页面
    foraddTerminal() {
      let _this = this;
      this.terminaladd_Dialog = true;
        console.info(JSON.stringify(_this.updatePageData.row));
      this.pageterminaladdData = {
        fplxmc: _this.updatePageData.row.fplxmc,
        fplxdm: _this.updatePageData.row.fplxdm,
        nsrsbh: _this.updatePageData.row.nsrsbh,
        xnsbh: _this.updatePageData.row.xnsbh,
        swukbh: _this.updatePageData.row.swukbh,
      };
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