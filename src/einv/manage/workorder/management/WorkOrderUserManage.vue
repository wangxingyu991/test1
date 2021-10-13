<template>
<div class="gdgl">
  <div class="rh-page-header">
    <div class="rh-head-and-operate">
      <div class="tips-content">
        <span class="rh-helpTip-text">工单管理</span>
      </div>
    </div>
  </div>
  <div class="rh-page-content">
    <div class="rh-pull-right">
      <el-form :model="form" ref="form" :inline="false" label-width="0px" label-position="right">
        <el-form-item prop="workOrderUserTypeName">
          <el-select v-model="form.statue" placeholder="选择工单处理状态">
            <el-option key="-1" label="所有工单" value="-1"></el-option>
            <el-option key="0" label="新建工单" value="0"></el-option>
            <el-option key="1" label="处理中工单" value="1"></el-option>
            <el-option key="2" label="已完成工单" value="2"></el-option>
            <el-option key="3" label="已关闭工单" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="queryForm"></el-button>
        <!-- <el-button type="info" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button> -->
      </el-form>
    </div>
    <div class="space20"></div>
    <div class="rh-table" style="margin-top: 20px;">
      <el-table :data="tableData.records" v-loading="loading" stripe border>
        <template slot="empty">
          <div class="pic_nodata"></div>
        </template>
        <el-table-column  show-overflow-tooltip align="left" prop="workOrderName"  label="工单名称"></el-table-column>
        <el-table-column  show-overflow-tooltip align="center" prop="functionalModuleName"  label="问题类型"></el-table-column>
        <el-table-column  show-overflow-tooltip align="center" prop="levelName" label="问题等级"></el-table-column>
        <el-table-column  show-overflow-tooltip align="center" prop="createTime" label="创建时间"></el-table-column>
        <!-- <el-table-column  show-overflow-tooltip align="center" prop="modifyTime" label="修改时间"></el-table-column> -->
        <el-table-column  show-overflow-tooltip align="center" prop="statueName" label="受理状态"></el-table-column>
        <el-table-column  align="center" label="操作">
          <template slot-scope="scope">
            <el-button class="table_btn" type="text" @click="onManage(scope.row,'0')">查看详情</el-button>
            <el-button class="table_btn" v-if=" scope.row.statue!=='3' && scope.row.statue!=='2' " type="text" @click="onManage(scope.row,'1')">审批</el-button>
            <el-button class="table_btn" v-if=" scope.row.statue!=='3' " type="text" @click="closeWorkOrder(scope.row)">关闭工单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="rh-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
        </el-pagination>
      </div>
    </div>
    <!-- 新增页面抽屉 -->
    <div class="drawer-container add" :key=1000>
      <el-drawer :with-header="false" size="70%" :visible.sync="drawer" append-to-body>
        <AddPage v-if="drawer" @back="back"  :addPageData="addPageData"></AddPage>
      </el-drawer>
    </div>
  </div>
</div>
</template>

<script>
  import { formateDate } from "@/utils/tools.js";
  import AddPage from "./WorkOrderUserManageAdd.vue";
  import validate from "@/utils/validate.js";
  export default {
    components: {
      AddPage,
    },
    data() {
      return {
        page: {
          Total: 100,
          Size: [10, 20, 30],
          currentPage: 1,
        },
        tableData: [],
        loading: false,
        flag: true,
        form: {
          statue: "-1",
          pageNo: 1,
          pageSize: 10,
        },
        drawer: false,
        workOrderUser: {
          statue : "",
          checkStatus : "",
          workOrderId : "",
        },
      };
    },

    mounted() {
      this.queryForm();
      // this.initTree();
      // this.init_Table();
    },

    methods: {
      onManage(data,num){
        // alert(data.statue);
        // alert(num);
        let _this = this;
        if(num == '1'){
            let statue = data.statue;
            let checkStatus = data.checkStatus;
            if(statue == '0' || checkStatus == '1'){
              _this.workOrderUser = {};
              _this.workOrderUser.workOrderId = data.workOrderId;
              if(statue == '0'){
                _this.workOrderUser.statue = "1";
                _this.workOrderUser.checkStatus = "0";
              }
              if(data.checkStatus == '1'){
                _this.workOrderUser.checkStatus = "0";
              }
              if ( _this.workOrderUser != null) {
                if (validate.checkForbiddenWordForm(JSON.stringify( _this.workOrderUser))) {
                      _this.$message({
                        showClose: true,
                        message: "不允许有特殊字符",
                        type: "error",
                      });
                      return;
                    }
              }
              let updateUrl = _this.$apis.manage + "/manage/workorder/userinfo/updateWorkOrderUser";
              _this.$api.post(
                updateUrl,
                _this.workOrderUser,
                function(res){
                  if(res.success){
                    data.checkStatus = "0";
                  }else{
                    _this.$message({
                      message: "修改失败," + res.errorMsg,
                      type: "error",
                    });
                  }
                }
              );
            }
          }
        _this.addPageData = {
          tableData : data,
          num : num,
        };
        _this.drawer = true;
      },
      back(){
        let _this = this;
        _this.drawer = false;
        this.queryForm();
      },
      //分页操作
      handleCurrentChange(val) {
        this.form.pageNo = val;
        //更改分页后重新初始化页面
        this.queryForm();
      },
      handleSizeChange(val) {
        this.form.pageSize = val;
        //更改分页后重新初始化页面
        this.queryForm();
      },
      queryForm(){
        let _this = this;
        if (_this.form != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(_this.form))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }
        _this.loading = true;
        let queryUrl = _this.$apis.manage + "/manage/workorder/userinfo/queryWaitWorkOrderUsers";
        _this.$api.post(
          queryUrl,
          _this.form,
          function(res){
            if(res.success){
              _this.tableData = res.data;
              let arr = res.data.records;
              for(let i = 0;i < arr.length;i++){
                if(res.data.records[i].statue == "0"){
                  _this.$set(_this.tableData.records[i],"statueName","新建工单");
                }else if(res.data.records[i].statue == "1"){
                  _this.$set(_this.tableData.records[i],"statueName","处理中");
                }else if(res.data.records[i].statue == "2"){
                  _this.$set(_this.tableData.records[i],"statueName","处理完成");
                }else if(res.data.records[i].statue == "3"){
                  _this.$set(_this.tableData.records[i],"statueName","已关闭");
                }
                _this.$set(_this.tableData.records[i],"createTime",formateDate(_this.tableData.records[i].createTime));
              }
              _this.loading = false;
            }else{
              _this.$message({
                message: "查询失败," + res.errorMsg,
                type: "error",
              });
            }
          }
        );
      },
      closeWorkOrder(data){
        let _this = this;
        _this.workOrderUser = {};
        _this.workOrderUser.workOrderId = data.workOrderId;
        _this.workOrderUser.statue = "3";
        let updateUrl = _this.$apis.manage + "/manage/workorder/userinfo/updateWorkOrderUser";


		  _this.$confirm("确定要关闭该工单吗?", "提示", {
		    type: "warning",
		  })
		  .then(() => {
        if (_this.workOrderUser != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(_this.workOrderUser))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }
          _this.$api.post(
            updateUrl,
            _this.workOrderUser,
            function(res){
              if(res.success){
                _this.$message({
                  message: "关闭成功",
                  type: "success",
                });
                _this.queryForm();
              }else{
                _this.$message({
                  message: "关闭失败," + res.errorMsg,
                  type: "error",
                });
              }
            }
          );
        });
      },
    },
  }
</script>

<style>
</style>
