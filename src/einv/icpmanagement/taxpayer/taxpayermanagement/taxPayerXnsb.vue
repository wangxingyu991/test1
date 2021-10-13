<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="rh-drawer-head">
          <div class="drawer-title">纳税人关联设备信息</div>
      </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        
          <el-button type="primary" @click="onAdd">新增</el-button>
        
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
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
          <el-table-column show-overflow-tooltip align="left" prop="nsrmc"  width="120px" label="纳税人名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="swukbh"  width="100px" label="服务器编号"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="fwqdm"  width="100px" label="服务器代码"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="fwqlxmc"  width="120px" label="服务器类型"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="xnsbh"  width="120px" label="虚拟设备"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="fplxdm"  width="80px" label="发票类型"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="ddbh"  width="100px" label="订单编号"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="clztmc"  width="100px" label="设备状态"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="sf" width="60px"  label="省份"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <!-- <el-button class="table_btn" type="text" @click="onEdit(scope.row.id)">修改</el-button> -->
              <el-button class="table_btn" type="text" @click="onDel(scope.row)">删除</el-button>
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
      <el-drawer  append-to-body size="60%" :visible.sync="drawer">
        <editPage v-if="drawer" @back="back" @reload="init_Table" :updatePageData="updatePageData" ></editPage>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import editPage from "./taxPayerDdxx.vue";
import validate from "@/utils/validate.js";

export default {
  props: ["xnsbPageData"],

  components: {
    editPage
  },

  data() {
    return {
      loading: false,
      drawer: false,
      //查询表单
      queryForm: {
        nsrsbh: "",
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
  },

  methods: {
    //初始化表格
    init_Table() {
      let _this = this;
      console.log(JSON.stringify(_this.xnsbPageData));
      _this.queryForm.nsrsbh = _this.xnsbPageData.nsrsbh;
      let params = _this.queryForm;
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
      _this.$api.post(
        _this.$apis.icpmanagement + "/taxpayer/taxpayermanagement/getXnsbList", params,
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


    //删除
    onDel(item) {
      let _this = this;
      let clzt = item.clzt;
      if(clzt == '1' ||clzt == '0' ||clzt == '2'){
        this.$message({
          message: "设备状态不为空，不能删除",
          type: "error",
        });
        return;
      }
      
      _this
        .$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          _this.$api.post(
            _this.$apis.icpmanagement +
              "/taxpayer/taxpayermanagement/deleteXnsb", {item},
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
      this.updatePageData = this.xnsbPageData;
      this.drawer = true;
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
    
  },
};
</script>
