<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">税控服务器版本信息</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <el-button type="primary" @click="checkNewVersion">新版本查询</el-button>
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
             <el-form-item prop="dqbbh">
              <el-input v-model.trim="queryForm.dqbbh" placeholder="当前版本号" maxlength="20" ></el-input>
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
          <el-table-column label="序号" width="50px" align="center">
             <template slot-scope="scope"> {{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="fwqdz" label="服务器地址" ></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="fwqdkh" label="服务器端口号" ></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="swukbh" label="税控服务器编号"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="dqbbh" label="当前版本号"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="zxbbh" label="最新版本号"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="fbrq" label="发布日期"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="qysj" label="启用时间"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="sjsj" label="升级时间"></el-table-column>
          <el-table-column align="center" label="操作"  width="90">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="onQuery(scope.row)">查看</el-button>
              <el-button class="table_btn" type="text" @click="onUpgrade(scope.row)">升级</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rh-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
        </el-pagination>
      </div>
    </div>
    <!-- 查看页面抽屉 -->
    <div class="drawer-container add" :key=1000>
      <el-drawer :with-header="false" append-to-body size="60%" :visible.sync="drawer">
        <editPage v-if="drawer" @back="back" @close="close"  @reload="init_Table" :updatePageData="updatePageData" ></editPage>
      </el-drawer>
    </div>
 
  </div>
</template>

<script>
import editPage from "./taxversionInfo.vue";
import validate from "@/utils/validate.js";


export default {
  components: {
    editPage,
  },

  data() {
    return {
      drawer: false,
      //查询表单
      queryForm: {
        dqbbh: "",
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
      loading:{
        loadingList:false,
      },
      loading: false,
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
        _this.$apis.icpmanagement + "/taxcontrol/taxversion/listTaxversion", params,
        function (res) {
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

    //检查新版本
    checkNewVersion(){
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
        _this.$apis.icpmanagement + "/taxcontrol/taxversion/checkNewVersion",params,
        function (res) {
          _this.loading=false;
          if (res.success) {
            _this.init_Table();
            _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.returnmsg,
              '税控服务器返回提示', {
              confirmButtonText: '关闭',
              dangerouslyUseHTMLString: true
            });            
            console.info(JSON.stringify(res.data));
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },


    
    //升级
    onUpgrade(row){
      let _this = this;
      let params = this.queryForm;
      _this.$set(params, "id", row.id);
      _this.$set(params, "fwqdz", row.fwqdz);
      _this.$set(params, "fwqdkh", row.fwqdkh);
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
        _this.$apis.icpmanagement + "/taxcontrol/taxversion/taxUpgrade",params,
        function (res) {
          _this.loading=false;
          if (res.success) {
            _this.init_Table();
            _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.returnmsg,
              '税控服务器返回提示', {
              confirmButtonText: '关闭',
              dangerouslyUseHTMLString: true
            });            
            console.info(JSON.stringify(res.data));
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

    //弹出查看页面抽屉
    onQuery(row) {
      this.drawer = true;
      this.updatePageData = {
        row: row,
      };
    },
 
    //保存成功后关闭抽屉
    back() {
      this.drawer = false;
      this.queryForm.pageNo = 1;
      this.init_Table();
    },

    //子页面关闭调用close方法
    close() {
      this.drawer = false;
      this.queryForm.pageNo = 1;
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
