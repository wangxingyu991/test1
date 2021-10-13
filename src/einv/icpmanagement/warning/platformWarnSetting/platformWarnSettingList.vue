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
            <el-form-item prop="yjszlx">
              <el-select v-model="queryForm.yjszlx" placeholder="请选择预警设置类型" >
                    <!-- <el-option key="" label="所有虚拟设备" value=""></el-option> -->
                    <el-option v-for="item in option_yjszlx" :key="item.yjszlx" :label="item.yjszlxmc" :value="item.yjszlx"></el-option>
                  </el-select>
            </el-form-item>
            <el-form-item prop="yxbz">
              <el-select v-model="queryForm.yxbz" placeholder="请选择有效标识">
                <!-- <el-option key="" label="所有有效标识" value=""></el-option> -->
                <el-option label="有效" value="Y"></el-option>
                <el-option label="无效" value="N"></el-option>
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
          <el-table-column
              label="序号"
              width="50px"
              align="center">
            <template slot-scope="scope">
                {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="fwqmc"  width="150px" label="服务器名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="xnsbh"  width="120px" label="虚拟设备"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="fplxmc"  width="150px" label="发票类型"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="kpzdmc"  width="120px" label="开票终端名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="yjszmc"  width="200px" label="预警设置类型"></el-table-column>
          <el-table-column show-overflow-tooltip align="right" prop="yjszsz" width="100px"  label="预警设置数值"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="yxbz"  width="80px" label="有效标志"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="onEdit(scope.row.id)">修改</el-button>
              <el-button class="table_btn" type="text" @click="onDel(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rh-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
        </el-pagination>
      </div>
    </div>
    <!-- 新增修改页面抽屉 -->
    <div class="drawer-container add" :key=1000>
      <el-drawer  append-to-body size="65%" :visible.sync="drawer">
        <editPage v-if="drawer" @back="back" @reload="init_Table" :updatePageData="updatePageData" ></editPage>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import editPage from "./platformWarnSettingEdit.vue";
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
        yjszlx: "",
        yxbz: "",
        pageNo: 1,
        pageSize: 10,
      },
      page: {
        Total: 100,
        Size: [10, 20, 30],
        currentPage: 1,
      },
      option_yjszlx: [],
      tableData: [],
      //表格选择
      tr_sels: [],
      updatePageData: {},
    };
  },

  created() {},

  mounted() {
    this.init_Table();
    this.getYjszlxSlect();
  },

  methods: {
    //初始化表格
    init_Table() {
      let _this = this;
      let params = this.queryForm;
      params.flag='2';
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
        _this.$apis.icpmanagement + "/warning/warnSetting/listWarnSetting", params,
        function (res) {
          //关闭loading
          _this.loading=false;
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

    //搜索
    searchForm() {
      this.queryForm.pageNo = 1;
      this.init_Table();
    },

    //删除
    onDel(id) {
      let _this = this;
      _this
        .$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          _this.$api.delete(
            _this.$apis.icpmanagement +
              "/warning/warnSetting/deleteWarnSetting/" +id, {},
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
      this.drawer = true;
      this.updatePageData = {};
    },

    //弹出修改页面抽屉
    onEdit(id) {
      this.drawer = true;
      this.updatePageData = {
        id: id,
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
    //获取预警设置类型下拉数据
    getYjszlxSlect() {
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
      _this.$api.post(
        _this.$apis.icpmanagement + "/common/selectCommon/listPtYjSzLx",
        params,
        function (res) {
          if (res.success) {
            _this.option_yjszlx = res.data;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },
  },
};
</script>
