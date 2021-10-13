<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">租户列表</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
          <div class="rh-page-hint" v-show="HintShow">
            <div class="page-hint-content">
                  <span class="page-hint-icon">
                        <i class="el-icon-info"></i>
                  </span>
                  <span class="page-hint-text">
                      {{showMsg}}
                  </span>
            </div>
      </div>
      <div class="space20"></div>
      <div class="rh-operate clearfix">
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
            <el-form-item prop="tenantName">
              <el-input v-model="queryForm.tenantName" placeholder="租户名称"></el-input>
            </el-form-item>
             <el-form-item prop="companyName">
              <el-input v-model="queryForm.companyName" placeholder="企业名称"></el-input>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
            <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
          </el-form>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange" v-loading="loadingInvoice">
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
          <el-table-column show-overflow-tooltip align="center" prop="tenantId" label="租户ID"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="tenantdsid" label="租户数据源ID"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="tenantName" label="租户名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="tenantPhone" label="租户手机号" width="130px"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="companyName" label="企业名称" width="130px"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="contact" label="联系人" width="130px"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="onSelectEd(scope.row)">选择</el-button>
            </template>
          </el-table-column>
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
  components: {
  },
  data() {
    return {
      showMsg:"【销项租户管理】模块未选中租户，本模块下所有功能将不能使用，请选择租户。",
      HintShow:true,
      drawer: false,
      loadingInvoice:false,
      //查询表单
      queryForm: {
        tenantName:"",
        companyName:"",
        pageNo: 1,
        pageSize: 10,
      },
      loading:{
        loadingList:false,
      },
       //校验规则
      rules: {
        tenantName: [
          { required: true, message: "请输入租户名称", trigger: "blur" },
         ],
         companyName: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
         ],
        
      },
      page: {
        Total: 100,
        Size: [10, 20, 30],
        currentPage: 1,
      },
      tableData: [],
      //表格选择
      tr_sels: [],
    };
  },

  created() {
  },

  mounted() {
    this.init_Table();
    this.getTenantInfo();
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
      _this.loadingInvoice=true;
      this.$api.post( _this.$apis.icpmanagement+"/basic/tenant/listTenant", params,
        function (res) {
          if (res.success==true) {
            console.info(JSON.stringify(res));
            _this.tableData = res.data;
          } else {
            _this.$message({
              showClose:true,
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
           _this.loadingInvoice=false;
        }
        
      );
    },

   //获取租户信息
    getTenantInfo() {
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
      _this.loadingInvoice=true;
      this.$api.post( _this.$apis.icpmanagement+"/basic/tenant/getTenantInfo", params,
        function (res) {
          if (res.success==true) {
            _this.showMsg="您所选择租户为:"+res.data.tenantName+"，您在【销项租户管理】模块下可对"+res.data.tenantName+"数据进行操作";
          } else {
            _this.$message({
              showClose:true,
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
           _this.loadingInvoice=false;
        }
        
      );
    },

    
    //选中
    onSelectEd(row) {
      let _this = this;
      _this.$confirm("确定要选定该租户吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          let params = _this.queryForm;
          _this.$set(params, "tenantId", row.tenantId);
          _this.$set(params, "tenantdsid", row.tenantdsid);
          _this.$set(params, "tenantName",  row.tenantName);
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
          _this.$api.post(_this.$apis.icpmanagement + "/basic/tenant/onSelectEd/",params,
            function (res) {
              if (res.success) {
                // _this.searchForm();
                //修改显示
                _this.showMsg="您所选择租户为:"+row.tenantName+"，您在【销项租户管理】模块下可对"+row.tenantName+"数据进行操作";
                _this.$message({
                  showClose:true,
                  message: "选中成功",
                  type: "success",
                });
              } else {
                _this.$message({
                  showClose:true,
                  message: "选中失败," + res.errorMsg,
                  type: "error",
                });
              }
            }
          );
        });
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
 

    //保存成功后关闭抽屉
    back() {
      this.drawer = false;
      this.update=false;
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

    //子页面关闭调用close方法
    close() {
      this.drawer = false;
      this.queryForm.pageNo = 1;
    },

  },
};
</script>
