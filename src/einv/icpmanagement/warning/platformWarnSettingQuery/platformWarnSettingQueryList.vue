<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">平台预警信息查询</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
            <el-form-item prop="yjlx">
              <el-select v-model="queryForm.yjlx" placeholder="请选择预警设置类型" >
                    <!-- <el-option key="" label="所有虚拟设备" value=""></el-option> -->
                    <el-option v-for="item in option_yjlx" :key="item.yjszlx" :label="item.yjszlxmc" :value="item.yjszlx"></el-option>
                  </el-select>
            </el-form-item>
            <el-form-item prop="yjsjQ">
              <el-date-picker :editable="false" v-model="queryForm.yjsjQ" type="date" style="width:150px" value-format="yyyy-MM-dd" placeholder="预警时间起">
              </el-date-picker>
            </el-form-item>
             <el-form-item prop="yjsjZ">
              <el-date-picker :editable="false" v-model="queryForm.yjsjZ" type="date" style="width:150px" value-format="yyyy-MM-dd" placeholder="预警时间止">
              </el-date-picker>
             </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
            <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
          </el-form>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData.records" stripe border v-loading="loading" @selection-change="handleSelectionChange">
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
          <el-table-column show-overflow-tooltip align="left" prop="fwqmc"   label="服务器名称"></el-table-column>
          <!-- <el-table-column show-overflow-tooltip align="left" prop="xnsbh"  width="120px" label="虚拟设备"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="fplxmc"  width="150px" label="发票类型"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="kpzdmc"  width="120px" label="开票终端名称"></el-table-column> -->
          <el-table-column show-overflow-tooltip align="left" prop="yjszmc"  label="预警设置类型"></el-table-column>
          <el-table-column show-overflow-tooltip align="right" prop="yjsz" label="预警数值"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="czsj"  label="预警时间"></el-table-column>
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
      drawer: false,
      //查询表单
      queryForm: {
        yjlx: "",
        flag: "",
        yjsjQ: "",
        yjsjZ: "",
        pageNo: 1,
        pageSize: 10,
      },
      page: {
        Total: 100,
        Size: [10, 20, 30],
        currentPage: 1,
      },
      option_yjlx: [],
      tableData: [],
      //表格选择
      tr_sels: [],
    };
  },

  created() {},

  mounted() {
    this.init_Table();
    this.getyjlxSlect();
  },

  methods: {
    //初始化表格
    init_Table() {
      let _this = this;
      let params = this.queryForm;
      let yjlx= params.yjlx;
      if(yjlx==''){
          params.flag='2';
      }else{
          params.flag='';
      }
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
        _this.$apis.icpmanagement + "/warning/warnSettingQuery/listWarnSettingQuery", params,
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
      let _this = this;
      let params = _this.queryForm;
      let yjsjQ = params.yjsjQ;
      let yjsjZ = params.yjsjZ;
      if(yjsjQ!='' && yjsjZ !=''){
        if(yjsjQ>yjsjZ){
            this.$message({
              message: "预警时间止应大于预警时间起",
              type: "error",
            });
            return;
        }
      }
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
    getyjlxSlect() {
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
            _this.option_yjlx = res.data;
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
