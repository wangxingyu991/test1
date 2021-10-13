<template>
  <div class="rh-page-content">
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">我的工单</span>
        </div>
      </div>
    </div>
    <el-table :data="tableData.records" v-loading="loading" stripe border>
      <el-table-column  show-overflow-tooltip align="left" prop="workOrderName"  label="工单名称"></el-table-column>
      <el-table-column  show-overflow-tooltip align="center" prop="functionalModuleName"  label="问题类型"></el-table-column>
      <el-table-column  show-overflow-tooltip align="center" prop="checkStatusName"  label="检查状态"></el-table-column>
      <el-table-column  show-overflow-tooltip align="center" prop="createTime" label="创建时间"></el-table-column>
      <el-table-column  show-overflow-tooltip align="center" prop="statueName" label="受理状态"></el-table-column>
      <el-table-column  align="center" label="操作">
        <template slot-scope="scope">
          <el-button class="table_btn" type="text" @click="onMyWorkOrder(scope.row)">查看详情</el-button>
          <!-- <el-button class="table_btn" type="text" @click="delate_fn(scope.row,'3')">关闭工单</el-button> -->
        </template>
      </el-table-column>
      <!-- <el-table-column show-overflow-tooltip align="center" prop="isRequried" label="必选" width="80"></el-table-column> -->
      <!-- <el-table-column show-overflow-tooltip align="center" prop="feeScale" label="计费规则"></el-table-column> -->
      <!-- <el-table-column show-overflow-tooltip align="center" prop="status" label="有效标志" width="80"></el-table-column> -->
    </el-table>
    <div class="rh-pagination">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
      </el-pagination>
    </div>
    <div class="drawer-container add" :key=1000>
      <el-drawer :with-header="false" size="70%" :visible.sync="drawer" append-to-body>
        <AddPage v-if="drawer" @back="back"  :addPageData="addPageData"></AddPage>
      </el-drawer>
    </div>
  </div>
</template>

<script>
  import { formateDate } from "@/utils/tools.js";
  import AddPage from "./MyWorkOrderUserAdd.vue";
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
        loading: false,
      };
    },

    mounted() {
      this.queryForm();
      // this.initTree();
      // this.init_Table();
    },

    methods: {
      onMyWorkOrder(data){
        // alert(data.statue);
        let _this = this;
        _this.drawer = true;
        _this.addPageData = {
          tableData : data,
        };


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
        let queryUrl = _this.$apis.workorder + "/rest/workorder/user/listWorkOrderUser";
        _this.$api.post(
          queryUrl,
          _this.form,
          function(res){
            if(res.success){
              _this.tableData = res.data;
              let arr = res.data.records;
              for(let i = 0;i < arr.length;i++){
                if(res.data.records[i].statue == "0"){
                  _this.$set(_this.tableData.records[i],"statueName","待处理");
                }else if(res.data.records[i].statue == "1"){
                  _this.$set(_this.tableData.records[i],"statueName","处理中");
                }else if(res.data.records[i].statue == "2"){
                  _this.$set(_this.tableData.records[i],"statueName","处理完成");
                }else if(res.data.records[i].statue == "3"){
                  _this.$set(_this.tableData.records[i],"statueName","已关闭");
                }
                if(res.data.records[i].checkStatus == "1"){
                  _this.$set(_this.tableData.records[i],"checkStatusName","未读");
                }else if(res.data.records[i].checkStatus == "0"){
                  _this.$set(_this.tableData.records[i],"checkStatusName","已读");
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
    },
  }
</script>

<style>
</style>
