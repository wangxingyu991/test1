<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">任务执行记录</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
            <el-form-item prop="jobName">
              <el-input v-model="queryForm.jobName" placeholder="任务名称" maxlength="15"></el-input>
            </el-form-item>
             <el-form-item prop="jobGroup">
              <el-input v-model="queryForm.jobGroup" placeholder="任务组名称" maxlength="15"></el-input>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
            <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
          </el-form>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange"  v-loading="loading">
          <template slot="empty">
            <div class="pic_nodata"></div>
          </template>
          <el-table-column
              label="序号"
              width="50px"
              align="center">
            <template slot-scope="scope">
                {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="jobName" width="180px"  label="任务名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="jobGroup"  width="180px" label="任务组名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="jobLogInfo" width="120px"  label="执行结果"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="jobStartTime" width="320px"  label="开始时间"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="jobEndTime" label="结束时间"></el-table-column>
        </el-table>
      </div>
      <div class="rh-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import validate from "@/utils/validate.js";
export default {

  data() {
    return {
      loading: false,
      //查询表单
      queryForm: {
        jobName: "",
        jobGroup: "",
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
      updatePageData: {},
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
      //打开loading
      _this.loading=true;
      this.$api.get(
        _this.$apis.usptask + "/rest/joblog/query", params,
        function (res) {
          //关闭loading
          _this.loading=false;
          if (res.success) {
            _this.tableData = res.data;
          } else {
            _this.$message({
              showClose:true,
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

    //搜索
    searchForm() {
      this.queryForm.pageNo = 1;
      this.init_Table();
    },

    //初始化table
    init() {
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
  },
};
</script>
