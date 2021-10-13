<template>
  <div class="rh-page">
    <frame-tree :treeData="treeData" :defaultExpandedKeys="defaultExpandedKeys" @getnode="getnode">

        <div class="rh-page-header">
          <div class="rh-head-and-operate">
            <div class="tips-content">
              <span class="rh-helpTip-text">工单类型维护</span>
            </div>
          </div>
        </div>
        <div class="rh-page-content">
          <div class="rh-operate clearfix">
            <div class="rh-pull-left" v-show="addshow == '1'">
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
          <div v-if="tableMap.subClassId !== ''">
            <div class="rh-table">
              <el-table :data="tableData.records" v-loading="loading" stripe border @selection-change="handleSelectionChange">
                <template slot="empty">
                  <div class="pic_nodata"></div>
                </template>
                <el-table-column  show-overflow-tooltip align="left" prop="subClassName"  label="工单小类名称"></el-table-column>
                <el-table-column  show-overflow-tooltip align="center" prop="mainClassName"  label="上级菜单"></el-table-column>
                <el-table-column  show-overflow-tooltip align="center" prop="createTime" label="创建时间"></el-table-column>
                <el-table-column  show-overflow-tooltip align="center" prop="emergencyStatusName" label="工单类型等级"></el-table-column>
                <el-table-column  align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button class="table_btn" type="text" @click="onUpdate(scope.row,'3')">修改</el-button>
                    <el-button class="table_btn" type="text" @click="delate_fn(scope.row,'3')">删除</el-button>
                  </template>
                </el-table-column>
                <!-- <el-table-column show-overflow-tooltip align="center" prop="isRequried" label="必选" width="80"></el-table-column> -->
                <!-- <el-table-column show-overflow-tooltip align="center" prop="feeScale" label="计费规则"></el-table-column> -->
                <!-- <el-table-column show-overflow-tooltip align="center" prop="status" label="有效标志" width="80"></el-table-column> -->
              </el-table>
            </div>
          </div>
          <div v-else>
            <div class="rh-table">
              <el-table :data="tableData.records" v-loading="loading" stripe border @selection-change="handleSelectionChange">
                <template slot="empty">
                  <div class="pic_nodata"></div>
                </template>
                <el-table-column  show-overflow-tooltip align="left" prop="mainClassName"  label="工单大类名称"></el-table-column>
                <el-table-column  show-overflow-tooltip align="center" prop="workOrderUserTypeId"  label="上级菜单" ></el-table-column>
                <el-table-column  show-overflow-tooltip align="center" prop="createTime" label="创建时间"></el-table-column>
                <el-table-column key = "5" align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button class="table_btn" type="text" @click="onUpdate(scope.row,'2')">修改</el-button>
                    <el-button class="table_btn" type="text" @click="delate_fn(scope.row,'2')">删除</el-button>
                  </template>
                </el-table-column>
                <!-- <el-table-column show-overflow-tooltip align="center" prop="isRequried" label="必选" width="80"></el-table-column> -->
                <!-- <el-table-column show-overflow-tooltip align="center" prop="feeScale" label="计费规则"></el-table-column> -->
                <!-- <el-table-column show-overflow-tooltip align="center" prop="status" label="有效标志" width="80"></el-table-column> -->
              </el-table>
            </div>
          </div>
          <div class="rh-pagination">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
            </el-pagination>
          </div>
        </div>
      <!-- 新增页面抽屉 -->
      <div class="drawer-container add" :key=1000>
        <el-dialog title="新增用户工单类型信息" :with-header="false" size="50%" :visible.sync="drawer" append-to-body>
          <AddPage v-if="drawer" @back="back"  :addPageData="addPageData"></AddPage>
        </el-dialog>
      </div>
      <!-- 修改页面抽屉 -->
      <div class="drawer-container add" :key=1001>
        <el-dialog title="修改用户工单类型信息" :with-header="false" size="50%" :visible.sync="drawer2" append-to-body>
          <UpdatePage v-if="drawer2" @back="back"  :updatePageData="updatePageData"></UpdatePage>
        </el-dialog>
      </div>
    </frame-tree>
  </div>
</template>

<script>
import frameTree from "@/einv/tree/frameTree.vue";
import AddPage from "./WorkOrderClassAdd.vue";
import UpdatePage from "./WorkOrderClassUpdate.vue";
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
      workOrderUserTypeId: "",
      workOrderUserTypeName: "",
      mainClassId: "",
      mainClassName: "",
      subClassId: "",
      subClassName: "",
      defaultExpandedKeys: [],
      treeData: [],
      drawer: false,
      drawer2: false,
      addshow: "1",
      //查询表单
      queryForm: {
        mainAttrName: "",
        pageNo: 1,
        pageSize: 10,
      },
      page: {
        Total: 100,
        Size: [10, 20, 30],
        currentPage: 1,
      },
      tableData: [],
      tableList: [],
      tableArr: [],
      tableMap: {
        subClassId: "",
        level: "",
      },
      //表格选择
      tr_sels: [],
      addPageData: {},
      updatePageData: {},
      workOrderUserMainClass: {
        status: "N",
      },
      workOrderUserSmallcls:{
        status: "N",
      },
      loading: false,
      treeLoading: false,
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
      _this.treeLoading = true;
      this.$api.get(
        _this.$apis.manage + "/manage/workorder/type/getWorkOrderUserTypeList",
        {},
        function (res) {
          if (res.success) {
            _this.treeData = res.data;
            _this.treeLoading = false;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
            _this.treeLoading = false;
          }
        }
      );
    },

    getnode(value) {
      this.addshow = '1';
      this.tableData = []
      this.mainClassId = "";
      this.tableMap.level = "";
      this.workOrderUserTypeId = value.data.id;
      this.workOrderUserTypeName = value.data.label;
      this.tableMap.level = "1";
      if(value.data.workOrderUserTypeId != undefined){
        this.tableMap.level = "2";
        this.workOrderUserTypeId = "";
        this.workOrderUserTypeId = value.data.workOrderUserTypeId;
        this.mainClassId = value.data.id;
        this.mainClassName = value.data.label;
      }
      if(value.data.mainClassId != undefined){
        this.addshow = "3";
        this.tableMap.level = "3";
        this.workOrderUserTypeId = "";
        this.mainClassId = "";
        this.mainClassName = "";
      }
      // this.workOrderUserTypeName = value.data.label;
      this.init_Table();
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

    //搜索
    searchForm() {
      this.queryForm.pageNo = 1;
      this.back();
    },

    //删除
    delate_fn(data,level) {
      let _this = this;
      let mainurl = "/manage/workorder/type/delWorkOrderUserMainClass";
      let suburl = "/manage/workorder/type/delWorkOrderUserSmlclass";
      let url = "";
      let addparams = "";
      if(level == "2"){
        url = _this.$apis.manage + mainurl;
        addparams = _this.workOrderUserMainClass;
        _this.$set(addparams,"mainClassId",data.mainClassId)
      }
      else if(level == "3"){
        url = _this.$apis.manage + suburl;
        addparams = _this.workOrderUserSmallcls;
        _this.$set(addparams,"subClassId",data.subClassId)
      }
      _this
        .$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        })
        .then(() => {

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

          _this.$api.post(
            url,
            addparams,
            function (res) {
              if (res.success) {
                _this.searchForm();
                _this.$message({
                  message: "删除成功",
                  type: "success",
                });

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
      if(_this.workOrderUserTypeId == "" && _this.mainClassId == ""){
        _this.$message({
          message: "请选择一个节点",
          type: "warning",
        });
        return;
      }


      if(_this.addshow == "3"){

      }else{
        _this.drawer = true;
        _this.addPageData = {
          workOrderUserTypeId: _this.workOrderUserTypeId,
          mainClassId: _this.mainClassId,
          mainClassName: _this.mainClassName,
        };
      }
    },

    //弹出修改页面抽屉
    onUpdate(data,level) {
      let str = this.tableData;
      let arr = str.records;
      // alert(id.mainClassId)
      if(level == "2"){
        // alert(1)
        for(let i = 0;i < arr.length;i++){

          // alert(arr[i].mainClassId);
          if(data.mainClassId == arr[i].mainClassId){
            // alert(2)
            this.updatePageData = {
              level: level,
              id: arr[i].mainClassId,
              name: arr[i].mainClassName,
              depict: arr[i].depict,
            };
          }
        }
      }
      if(level == "3"){
        for(let i = 0;i < arr.length;i++){
          if(data.subClassId == arr[i].subClassId){
            this.updatePageData = {
              level: level,
              id: arr[i].subClassId,
              name: arr[i].subClassName,
              depict: arr[i].depict,
              emergencyStatus: arr[i].emergencyStatus,
            };
          }
        }
      }
      // alert(this.updatePageData.id)
      this.drawer2 = true;
      //
      // let v = data.emergencyStatus;
      // if(v == undefined){

      // }else{
      //   this.updatePageData = {
      //     level: data.level,
      //     id: data.subClassId,
      //     name: data.subClassName,
      //     emergencyStatus: data.emergencyStatus,
      //     depict: data.depict,
      //   };
      // }

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
    changeStatus(mainAttrId, status) {
      let _this = this;
      _this.$api.post(
        _this.$apis.manage +
          "/manage/product/mainclass/changeStatus/" +
          mainAttrId,
        { status: status },
        function (res) {
          if (res.success == true) {
            _this.$message({
              message: "状态修改成功",
              type: "success",
            });
            _this.searchForm();
          } else {
            _this.$message({
              message: "状态修改失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //重置
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.queryForm.pageNo = 1;
      this.init_Table();
    },




    init_Table(){
      let _this = this;
     
      let mainurl = "/manage/workorder/type/listWorkOrderUserMainClass/"+this.workOrderUserTypeId;
      let suburl = "/manage/workorder/type/listWorkOrderUserSmallcls/"+this.mainClassId;
      let addparam = "";
      let url = "";
      let arrTree = this.treeData;
      if(_this.tableMap.level == "2"){
        url = _this.$apis.manage + suburl;
        addparam = _this.queryForm;
        _this.tableMap.subClassId = "1";
        _this.$set(addparam,"mainClassId",this.mainClassId);
        for(let i = 0;i < arrTree.length;i++){
          for(let j = 0;j<arrTree[i].children.length;j++){

            if(this.mainClassId == arrTree[i].children[j].id){
              _this.defaultExpandedKeys = [];
              _this.defaultExpandedKeys.push(arrTree[i].children[j].id);
              // _this.$nextTick().then(() => {
              //   $(".el-tree-node").childNodes[i].eq(j).click();
              // });

            }
          }
        }

      }else if(_this.tableMap.level == "1"){
        url = _this.$apis.manage + mainurl;
        addparam = _this.queryForm;

        _this.tableMap.subClassId = "";
        _this.$set(addparam,"workOrderUserTypeId",this.workOrderUserTypeId);
        for(let i = 0;i < arrTree.length;i++){
          if(arrTree[i].id == this.workOrderUserTypeId){
            _this.defaultExpandedKeys = [];
            _this.defaultExpandedKeys.push(arrTree[i].id);
            // _this.$nextTick().then(() => {
            //   $(".el-tree-node").eq(i).click();
            // });
          }
        }
      }else{
        _this.loading = false;
        return;
      }
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
      _this.loading = true;
      // let _this = this;
      _this.$api.post(
        url,
        addparam,
        function (res) {
          if (res.success == true) {
            _this.tableData = res.data;

              let arr = res.data.records;
              for(let i = 0;i < arr.length;i++){
                if(_this.mainClassId != ""){
                  if(res.data.records[i].emergencyStatus == "1"){
                    _this.$set(_this.tableData.records[i],"emergencyStatusName","一般");
                  }else if(res.data.records[i].emergencyStatus == "2"){
                    _this.$set(_this.tableData.records[i],"emergencyStatusName","紧急");
                  }else if(res.data.records[i].emergencyStatus == "3"){
                    _this.$set(_this.tableData.records[i],"emergencyStatusName","非常紧急");
                  }
                }
                _this.$set(_this.tableData.records[i],"createTime",formateDate(_this.tableData.records[i].createTime));
              }
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
  },
};
</script>
