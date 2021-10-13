<template>
  <div class="rh-page">
    <frame-tree :treeData="treeData" :defaultExpandedKeys="defaultExpandedKeys" @getnode="getnode">
        <div class="rh-page-header">
          <div class="rh-head-and-operate">
            <div class="tips-content">
              <span class="rh-helpTip-text">工单管理人员配置</span>
            </div>
          </div>
        </div>
        <div class="rh-page-content">
          <div class="rh-operate clearfix">
            <div class="rh-pull-left">
              <el-button type="primary" @click="onAdd">新增</el-button>
            </div>
          </div>
          <div class="rh-table">
            <el-table :data="tableData.records" v-loading="loading" stripe border @selection-change="handleSelectionChange">
              <template slot="empty">
                <div class="pic_nodata"></div>
              </template>
              <el-table-column  show-overflow-tooltip align="left" prop="userId"  label="工单管理人员ID"></el-table-column>
              <el-table-column  show-overflow-tooltip align="center" prop="mainClassId"  label="处理类别ID" ></el-table-column>
              <el-table-column  show-overflow-tooltip align="center" prop="createTime" label="创建时间"></el-table-column>
              <el-table-column key = "5" align="center" label="操作">
                <template slot-scope="scope">
                  <!-- <el-button class="table_btn" type="text" @click="onUpdate(scope.row,'2')">修改</el-button> -->
                  <el-button class="table_btn" type="text" v-if="scope.row.status === 'Y'" @click="changeStatus(scope.row.workOrderUserStaffId,'N')">禁用</el-button>
                  <el-button class="table_btn" type="text" v-if="scope.row.status === 'N'" @click="changeStatus(scope.row.workOrderUserStaffId,'Y')">启用</el-button>
                  <el-button class="table_btn" type="text" @click="delate_fn(scope.row.workOrderUserStaffId)">删除</el-button>
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
          <el-drawer :with-header="false" size="70%" :visible.sync="drawer" append-to-body>
            <AddPage v-if="drawer" @back="back"  :addPageData="addPageData"></AddPage>
          </el-drawer>
        </div>
        <!-- 修改页面抽屉 -->
        <div class="drawer-container add" :key=1001>
          <el-drawer :with-header="false" size="70%" :visible.sync="drawer2" append-to-body>
            <UpdatePage v-if="drawer2" @back="back"  :updatePageData="updatePageData"></UpdatePage>
          </el-drawer>
        </div>
    </frame-tree>
  </div>
</template>

<script>
import frameTree from "@/einv/tree/frameTree.vue";
import AddPage from "./WorkOrderUserStaffAdd.vue";
import UpdatePage from "./WorkOrderUserStaffUpdate.vue";
import { formateDate } from "@/utils/tools.js";

export default {
  components: {
    frameTree,
    AddPage,
    UpdatePage,
  },

  data() {
    return {
      workOrderUserTypeId: "",
      userId: "",
      mainClassId: "",
      mainClassName: "",
      defaultExpandedKeys: [],
      loading: false,
      treeData: [],
      tableData: [],
      drawer: false,
      drawer2: false,
      //查询表单
      queryForm: {
        mainClassId: "",
        pageNo: 1,
        pageSize: 10,
      },
      page: {
        Total: 100,
        Size: [10, 20, 30],
        currentPage: 1,
      },
      //表格选择
      tr_sels: [],
      addPageData: {},
      updatePageData: {},
      workOrderUserStaff: {
        workOrderUserStaffId : "",
        status: "",
      },
    };
  },

  mounted() {
    this.initTree();
    // this.init_Table();
  },

  methods: {
    //初始化树
    initTree() {
      let _this = this;
      this.$api.get(
        _this.$apis.manage + "/manage/workorder/user/getWorkOrderUserTypeList",
        {},
        function (res) {
          if (res.success) {
            _this.treeData = res.data;

          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    getnode(value) {
      let _this = this;
      if(value.data.workOrderUserTypeId != undefined){
        // this.tableMap.level = "2";
        _this.workOrderUserTypeId = "";
        _this.workOrderUserTypeId = value.data.workOrderUserTypeId;
        _this.mainClassId = value.data.id;
        _this.mainClassName = value.data.label;
        _this.init_Table();
      }

    },
    //分页页码操作
    handleSelectionChange(val) {
      this.tr_sels = val;
      this.init_Table();
      // alert(val)
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
    //删除
    delate_fn(staffId) {
      let _this = this;
      _this.workOrderUserStaff.workOrderUserStaffId = staffId;
      let url = _this.$apis.manage +
        "/manage/workorder/user/deleteWorkOrderUserStaff"
      // let url = "";
      // let addparams = "";
      _this.$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          _this.$api.post(
            url,
            _this.workOrderUserStaff,
            function (res) {
              if (res.success == true) {
                // _this.searchForm();
                _this.$message({
                  message: "删除成功",
                  type: "success",
                });
                _this.init_Table();
              } else {
                _this.$message({
                  message: "删除失败," + res.errorMsg,
                  type: "error",
                });
              }

            }
          );
        });

    },

    //弹出新增页面抽屉
    onAdd() {
      let _this = this;
      if(_this.mainClassId == ""){
        _this.$message({
          message: "请选择一个工单大类节点",
          type: "warning",
        });
        return;
      }
      this.addPageData = {
        mainClassId: _this.mainClassId,
        userList: _this.tableData,
      };
      _this.drawer = true;
    },

    //保存成功后关闭抽屉
    back() {
      let _this = this;
      _this.drawer = false;
      _this.drawer2 = false;
      _this.queryForm.pageNo = 1;
      _this.initTree();
      _this.init_Table();
    },


    //修改有效标志
    changeStatus(staffId, status) {
      let _this = this;

      _this.workOrderUserStaff.workOrderUserStaffId = staffId;
      _this.workOrderUserStaff.status = status;

      _this.$api.post(
        _this.$apis.manage +
          "/manage/workorder/user/updateWorkOrderUserStaff",
        _this.workOrderUserStaff,
        function (res) {
          if (res.success) {
            _this.$message({
              message: "状态修改成功",
              type: "success",
            });
            _this.init_Table();
          } else {
            _this.$message({
              message: "状态修改失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },
    init_Table(){
      let _this = this;
      _this.loading = true;
      let url =_this.$apis.manage +  "/manage/workorder/user/queryWorkOrderUserStaffs";
      _this.queryForm.mainClassId = _this.mainClassId;
      _this.$api.post(
        url,
        _this.queryForm,
        function (res) {
          if (res.success == true) {
            _this.tableData = res.data;
              let arr = res.data.records;
              for(let i = 0;i < arr.length;i++){
                _this.$set(_this.tableData.records[i],"createTime",formateDate(_this.tableData.records[i].createTime));
              }
              _this.loading = false;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },
  },
};
</script>
