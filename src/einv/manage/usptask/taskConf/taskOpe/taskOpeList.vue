<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">定时任务管理</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        
          <el-button type="primary" @click="onAdd">新增</el-button>
        
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
        <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange" v-loading="loading">
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
          <el-table-column show-overflow-tooltip align="left" prop="jobGroup"  width="150px" label="任务组名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="cronExpression" width="120px"  label="任务表达式"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="jobClassName" width="320px"  label="任务全路径"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="triggerStateStr" width="120px"  label="任务状态"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="onEdit(scope.row)">修改</el-button>
              <el-button class="table_btn" type="text" @click="onDel(scope.row)">删除</el-button>
              <el-button class="table_btn" type="text" @click="qdTask(scope.row)" v-if="scope.row.qdFlag">启动</el-button>
              <el-button class="table_btn" type="text" @click="ztTask(scope.row)" v-if="scope.row.ztFlag">暂停</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rh-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
        </el-pagination>
      </div>
    </div>
    <!-- 新增页面抽屉 -->
    <div class="drawer-container add" :key=1000>
         <el-drawer 
         size="60%" 
        :visible.sync="drawer" 
        append-to-body
        :wrapperClosable = false
        :with-header="true" 
       >
        <editPage v-if="drawer" @back="back" @reload="init_Table" :updatePageData="updatePageData" ></editPage>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import editPage from "./taskOpeEdit.vue";
import validate from "@/utils/validate.js";
export default {
  components: {
    editPage
  },

  data() {
    return {
      loading: false,
      drawer: false,
      //查询表单
      queryForm: {
        jobName: "",
        jobGroup: "",
        pageNo: 1,
        pageSize: 10,
      },
      deleteForm: {
        jobName: "",
        jobGroup: "",
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
        _this.$apis.usptask + "/rest/job/query", params,
        function (res) {
          //关闭loading
          _this.loading=false;
          if (res.success) {
            var arr = res.data.records;
            let triggerStateStr ="";
            let triggerState = "";
            let qdFlag = "false";
            let ztFlag = "false";
            for(var i=0; i<arr.length;i++){
              triggerState = arr[i].triggerState;
              if(triggerState == 'WAITING'){
                  triggerStateStr='等待';
                  qdFlag = false;
                  ztFlag = true;
              }
              if(triggerState == 'PAUSED'){
                  triggerStateStr='暂停';
                  qdFlag = true;
                  ztFlag = false;
              }
              if(triggerState == 'ACQUIRED'){
                  triggerStateStr='正常执行';
                  qdFlag = false;
                  ztFlag = true;
              }
              if(triggerState == 'BLOCKED'){
                  triggerStateStr='阻塞';
                  qdFlag = false;
                  ztFlag = true;
              }
              if(triggerState == 'ERROR'){
                  triggerStateStr='错误';
                  qdFlag = true;
                  ztFlag = false;
              }
              _this.$set(res.data.records[i],"triggerStateStr",triggerStateStr);
              _this.$set(res.data.records[i],"qdFlag",qdFlag);
              _this.$set(res.data.records[i],"ztFlag",ztFlag);
            }
            _this.tableData = res.data;
            //console.log("11>>"+JSON.stringify(_this.tableData));
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

    //删除
    onDel(item) {
      let _this = this;
      _this.deleteForm.jobGroup = item.jobGroup;
      _this.deleteForm.jobName = item.jobName;
      // console.log(JSON.stringify(item));
      // console.log(JSON.stringify(_this.deleteForm));
      _this
        .$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          _this.$api.post(
                _this.$apis.usptask + "/rest/job/deletejson/", _this.deleteForm,
            function (res) {
              if (res.success) {
                _this.searchForm();
                _this.$message({
                  showClose:true,
                  message: "删除成功",
                  type: "success",
                });
              } else {
                _this.$message({
                   showClose:true,
                  message: "删除失败," + res.errorMsg,
                  type: "error",
                });
              }
            }
          );
        });
    },

    //启动
    qdTask(item) {
      let _this = this;
      _this.deleteForm.jobGroup = item.jobGroup;
      _this.deleteForm.jobName = item.jobName;
      // console.log(JSON.stringify(item));
      // console.log(JSON.stringify(_this.deleteForm));
      _this
        .$confirm("确定要启动定时任务吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          _this.$api.post(
                _this.$apis.usptask + "/rest/job/resumejson/", _this.deleteForm,
            function (res) {
              if (res.success) {
                _this.searchForm();
                _this.$message({
                  showClose:true,
                  message: "启动成功",
                  type: "success",
                });
              } else {
                _this.$message({
                   showClose:true,
                  message: "启动失败," + res.errorMsg,
                  type: "error",
                });
              }
            }
          );
        });
    },

    //暂停
    ztTask(item) {
      let _this = this;
      _this.deleteForm.jobGroup = item.jobGroup;
      _this.deleteForm.jobName = item.jobName;
      // console.log(JSON.stringify(item));
      // console.log(JSON.stringify(_this.deleteForm));
      _this
        .$confirm("确定要暂停定时任务吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          _this.$api.post(
                _this.$apis.usptask + "/rest/job/pausejson/", _this.deleteForm,
            function (res) {
              if (res.success) {
                _this.searchForm();
                _this.$message({
                  showClose:true,
                  message: "暂停成功",
                  type: "success",
                });
              } else {
                _this.$message({
                   showClose:true,
                  message: "暂停失败," + res.errorMsg,
                  type: "error",
                });
              }
            }
          );
        });
    },

    //弹出新增页面抽屉
    onAdd() {
      this.drawer = true;
      this.updatePageData = {};
    },

    //弹出修改页面抽屉
    onEdit(item) {
      this.drawer = true;
      this.updatePageData = {
        jobName: item.jobName,
        jobGroup: item.jobGroup,
        jobClassName: item.jobClassName,
        cronExpression: item.cronExpression,
      };
    },

    //保存成功后关闭抽屉
    back() {
      this.drawer = false;
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
