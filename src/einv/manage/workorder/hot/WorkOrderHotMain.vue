<template>
  <div>
    <frame-tree :treeData="treeData" :defaultExpandedKeys="defaultExpandedKeys" @getnode="getnode">
      <div>
        <div class="rh-page-header">
          <div class="rh-head-and-operate">
            <div class="tips-content">
              <span class="rh-helpTip-text">工单热点问题配置</span>
            </div>
          </div>
        </div>
        <div class="rh-page-content">
          <div class="rh-operate clearfix">
            <div class="rh-pull-left">
              <el-button type="primary" @click="onAdd">新增</el-button>
            </div>
            <div class="rh-pull-right">
              <!-- <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
                <el-form-item prop="workOrderUserTypeName">
                  <el-input v-model="workOrderUserTypeName" placeholder="工单类型维护"></el-input>
                </el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
                <el-button type="info" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
              </el-form> -->
            </div>
          </div>
          <div class="rh-table">
            <el-table :data="tableData.records" v-loading="tabLoading" stripe border @selection-change="handleSelectionChange">
              <template slot="empty">
                <div class="pic_nodata"></div>
              </template>
              <el-table-column  show-overflow-tooltip align="center" prop="problemName"  label="热点问题名称" ></el-table-column>
              <el-table-column  show-overflow-tooltip align="center" prop="createTime" label="创建时间"></el-table-column>
              <el-table-column key = "5" align="center" label="操作">
                <template slot-scope="scope">
                  <el-button class="table_btn" type="text" @click="onUpdate(scope.row)">修改</el-button>
                  <el-button class="table_btn" type="text" v-if="scope.row.status === '有效'" @click="changeStatus(scope.row,'N')">禁用</el-button>
                  <el-button class="table_btn" type="text" v-if="scope.row.status === '无效'" @click="changeStatus(scope.row,'Y')">启用</el-button>
                  <el-button class="table_btn" type="text" @click="delate_fn(scope.row)">删除</el-button>
                </template>
              </el-table-column>
              <!-- <el-table-column show-overflow-tooltip align="center" prop="isRequried" label="必选" width="80"></el-table-column> -->
              <!-- <el-table-column show-overflow-tooltip align="center" prop="feeScale" label="计费规则"></el-table-column> -->
              <!-- <el-table-column show-overflow-tooltip align="center" prop="status" label="有效标志" width="80"></el-table-column> -->
            </el-table>
          </div>
          <div class="rh-pagination">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
            </el-pagination>
          </div>
        </div>
      </div>
    </frame-tree>
    <!-- 新增页面抽屉 -->
    <div class="drawer-container add" :key=1000>
      <el-drawer title="" :with-header="true" size="70%" :visible.sync="drawer" append-to-body :wrapperClosable = false>
        <AddPage v-if="drawer" @back="back"  :addPageData="addPageData"></AddPage>
      </el-drawer>
    </div>
    <!-- 修改页面抽屉 -->
    <div class="drawer-container add" :key=1001>
      <el-drawer title="" :with-header="true" size="70%" :visible.sync="drawer2" append-to-body :wrapperClosable = false>
        <UpdatePage v-if="drawer2" @back="back"  :updatePageData="updatePageData"></UpdatePage>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import frameTree from "@/einv/tree/frameTree.vue";
import AddPage from "./WorkOrderHotAdd.vue";
import UpdatePage from "./WorkOrderHotUpdate.vue";
import { formateDate } from "@/utils/tools.js";
import validate from "@/utils/validate.js";

export default {
  components: {
    frameTree,
    AddPage,
    UpdatePage,
  },

  data() {
    return {
      mainClassId: "",
      subClassId: "",
      defaultExpandedKeys: [],
      treeData: [],
      drawer: false,
      drawer2: false,
      //查询表单
      queryForm: {
        subClassId: "",
        pageNo: 1,
        pageSize: 10,
      },
      tableData: [],
      //表格选择
      tr_sels: [],
      addPageData: {},
      updatePageData: {},
      workOrderHot: {},
      loading: false,
      tabLoading: false,
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
      _this.loading = true;
      this.$api.get(
        _this.$apis.manage + "/manage/workorder/type/getWorkOrderUserTypeListBySmls",
        {},
        function (res) {
          if (res.success) {
            _this.treeData = res.data;
            _this.loading = false;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
            _this.loading = false;
          }
        }
      );
    },

    getnode(value) {
      this.mainClassId = "";
      this.subClassId = "";
      this.defaultExpandedKeys.push(value.data.id);
      if(value.data.mainClassId != undefined){
        this.mainClassId = value.data.mainClassId;
        this.subClassId = value.data.id;
        this.init_Table();
      }
    },
    //分页页码操作
    handleSelectionChange(val) {
      this.tr_sels = val;
      this.init_Table();
      // // alert(val)
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
    delate_fn(data) {
      let _this = this;
      _this.workOrderHot = {};
      _this.workOrderHot.workOrderHotId = data.workOrderHotId;
      let hotUrl = _this.$apis.manage+"/manage/workorder/hot/deleteWorkOrderHot";
      _this.$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          if (_this.workOrderHot != null) {
                    if (validate.checkForbiddenWordForm(JSON.stringify(_this.workOrderHot))) {
                      _this.$message({
                        showClose: true,
                        message: "不允许有特殊字符",
                        type: "error",
                      });
                      return;
                    }
          }
          _this.$api.post(
            hotUrl,
            _this.workOrderHot,
            function (res) {
              if (res.success) {
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
      if(_this.subClassId == ""){
        _this.$message({
          message: "请选择工单小类节点",
          type: "warning",
        });
        return;
      }
      _this.drawer = true;
      _this.addPageData = {
        mainClassId: _this.mainClassId,
        subClassId: _this.subClassId,
      };
    },

    //弹出修改页面抽屉
    onUpdate(data) {
      let _this = this;
      _this.drawer2 = true;
      _this.updatePageData = {
        workOrderHot : data,
      }
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
    changeStatus(data, status) {

      let _this = this;
      
      _this.workOrderHot = {};
      _this.workOrderHot.status = status;
      _this.workOrderHot.workOrderHotId = data.workOrderHotId;
      if (_this.workOrderHot != null) {
                    if (validate.checkForbiddenWordForm(JSON.stringify(_this.workOrderHot))) {
                      _this.$message({
                        showClose: true,
                        message: "不允许有特殊字符",
                        type: "error",
                      });
                      return;
                    }
      }
      _this.tabLoading = true;
      _this.$api.post(
        _this.$apis.manage +
          "/manage/workorder/hot/updateWorkOrderHot",
        _this.workOrderHot,
        function (res) {
          if (res.success == true) {
            _this.$message({
              message: "状态修改成功",
              type: "success",
            });
            // _this.tabLoading = false;
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
      let suburl = "/manage/workorder/hot/queryWorkOrderHot";
      let _this = this;
      
      let arrTree = this.treeData;
      let url = _this.$apis.manage + suburl;
      _this.queryForm.subClassId = _this.subClassId;
      let addparam = _this.queryForm;
      if (addparams != null) {
                    if (validate.checkForbiddenWordForm(JSON.stringify(addparams))) {
                      _this.$message({
                        showClose: true,
                        message: "不允许有特殊字符",
                        type: "error",
                      });
                      return;
                    }
      }
      _this.tabLoading = true;
      _this.$api.post(
        url,
        addparam,
        function (res) {
          if (res.success == true) {
            _this.tableData = res.data;
              let arr = res.data.records;
              for(let i = 0;i < arr.length;i++){
                if(arr[i].status == "Y"){
                  _this.$set(_this.tableData.records[i],"status","有效");
                }else{
                  _this.$set(_this.tableData.records[i],"status","无效");
                }
                _this.$set(_this.tableData.records[i],"createTime",formateDate(_this.tableData.records[i].createTime));
              }
            _this.tabLoading = false;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
            _this.tabLoading = false;
          }
        }
      );

    },
  },
};
</script>
