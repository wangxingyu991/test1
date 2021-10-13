<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">平台预警设置</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        
          <el-button type="primary" @click="onAdd">新增</el-button>
        
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
            <el-form-item prop="warnType">
              <el-select v-model="queryForm.warnType" placeholder="请选择预警类型" >
                <el-option label="产品预警" value="0" key="0"></el-option>
                <el-option label="短信包预警" value="1" key="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="statue">
              <el-select v-model="queryForm.statue" placeholder="请选择有效标识">
                <!-- <el-option key="" label="所有有效标识" value=""></el-option> -->
                <el-option label="有效" value="Y" key="Y"></el-option>
                <el-option label="无效" value="N" key="N"></el-option>
              </el-select>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
            <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
          </el-form>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData.records" v-loading="loading" stripe border @selection-change="handleSelectionChange">
          <template slot="empty">
            <div class="pic_nodata"></div>
          </template>
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
                {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="warnConfigName"  width="220px" label="预警类型名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="warnTypeName"  width="180px" label="类别"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="warnData"  width="200px" label="预警数量范围"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="warnLevel"  width="120px" label="预警等级">
            <template slot-scope="scope">
              <span class="cell-orange" v-if="scope.row.warnLevel ==1">橙色</span>
              <span class="cell-yellow" v-else-if="scope.row.warnLevel ==2">黄色</span>
              <span class="cell-red" v-else-if="scope.row.warnLevel ==3">红色</span> 
            </template> 
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="statueName"  width="120px" label="有效标志"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="onEdit(scope.row.warnConfigId)">修改</el-button>
              <el-button class="table_btn" type="text" v-if="scope.row.statue=='N'"  @click="enable(scope.row.warnConfigId,'Y')">启用</el-button>
              <el-button class="table_btn" type="text" v-if="scope.row.statue=='Y'"  @click="enable(scope.row.warnConfigId,'N')">禁用</el-button>
              <el-button class="table_btn" type="text" @click="onDel(scope.row.warnConfigId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rh-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
        </el-pagination>
      </div>
    </div>
    <!-- 新增修改页面dialog -->
    <div class="drawer-container add" :key=1000>
      <el-dialog title="新增预警设置" size="73%" :close-on-click-modal='false' :visible.sync="showmodel" append-to-body :wrapperClosable = false :with-header=true>
        <addPage v-if="showmodel" @back="pageBack" @reload="init"></addPage>
      </el-dialog>
    </div>
   <!-- 修改页面dialog -->
    <div class="drawer-container detail" :key=2000>
      <el-dialog title="修改预警设置" size="73%" :close-on-click-modal='false' :visible.sync="showmodelupdate" append-to-body :wrapperClosable = false :with-header=true>
        <updatePage v-if="showmodelupdate" @back="pageBack" @reload="init" :detailData="detailData"></updatePage>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import addPage from "./warnsettingadd.vue";
import updatePage from "./warnsettingupdate.vue";
import validate from "@/utils/validate.js";


export default {
  components: {
    addPage,updatePage
  },

  data() {
    return {
      loading: false,
      drawer: false,
      showmodel:false,
      showmodelupdate:false,
      detailData:{},
      //查询表单
      queryForm: {
        warnType: "",
        valid: "",
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
        _this.$apis.manage + "/rest/warn/warnsetting/plist", params,
        function (res) {
          //关闭loading
          _this.loading=false;
          if (res.success) {
            let list = res.data.records;
            for(let i = 0;i < list.length;i++){
                if(list[i].statue=="Y"){
                    list[i].statueName = "有效";
                }else if(list[i].statue=="N"){
                    list[i].statueName = "无效";
                }
                if(list[i].warnType=="0"){
                    list[i].warnTypeName = "产品预警";
                }else if(list[i].warnType=="1"){
                    list[i].warnTypeName = "短信包预警";
                }
                list[i].warnData = list[i].warnDataBegin + "-" + list[i].warnDataEnd;
            }
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

    //搜索
    searchForm() {
      this.queryForm.pageNo = 1;
      this.init_Table();
    },

    //删除
    onDel(id) {
      let _this = this;
      _this.$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          _this.$api.delete(_this.$apis.manage + "/rest/warn/warnsetting/" +id, {},
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
    enable(warnConfigId, statue){
      var _this = this;
      var params = {
        warnConfigId: warnConfigId,
        statue:statue
      };
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
      _this.$api.post(_this.$apis.manage + "/rest/warn/warnsetting/enablewarnsetting/", params,
        function (res) {
          if (res.success) {
            _this.searchForm();
            _this.$message({
              message: "修改成功",
              type: "success",
            });
          } else {
            _this.$message({
              message: "修改失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },
    //弹出新增页面抽屉
    onAdd() {
      this.showmodel = true;
    },

    //弹出修改页面抽屉
    onEdit(warnConfigId) {
      this.showmodelupdate = true;
      this.detailData = {
        warnConfigId: warnConfigId,
      };
    },

    //保存成功后关闭抽屉
    back() {
      this.showmodel = false;
      this.showmodelupdate = false;
    },
    //保存成功后关闭对话框
    pageBack() {
      this.showmodel = false;
      this.showmodelupdate = false;
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
