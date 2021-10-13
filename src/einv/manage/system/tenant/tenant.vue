<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">租户信息管理</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
            <el-form-item prop="tenantName">
              <el-input v-model="queryForm.tenantName" placeholder="租户名称" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item prop="companyTaxId">
              <el-input v-model="queryForm.companyTaxId" placeholder="企业税号" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item prop="approStatus">
              <el-select v-model="queryForm.approStatus" placeholder="审批状态">
                <el-option key="" label="全部" value=""></el-option>
                <el-option key="0" label="未审核" value="0"></el-option>
                <el-option key="1" label="审核中" value="1"></el-option>
                <el-option key="2" label="审核失败" value="2"></el-option>
                <el-option key="3" label="审核成功" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="tenantStatus">
              <el-select v-model="queryForm.tenantStatus" placeholder="租户状态">
                <el-option key="" label="全部" value=""></el-option>
                <el-option key="0" label="启用" value="0"></el-option>
                <el-option key="1" label="停用" value="1"></el-option>
                <el-option key="2" label="销毁" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
            <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
          </el-form>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData.records" stripe border v-loading="tableLoading">
          <template slot="empty">
            <div class="pic_nodata"></div>
          </template>
          <el-table-column align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="left" prop="tenantName" label="租户名称"></el-table-column>
          <el-table-column align="center" prop="companyTaxId" label="企业税号"></el-table-column>
          <el-table-column align="center" prop="tenantStatusName" label="租户状态"></el-table-column>
          <el-table-column align="center" prop="submitTime" label="提交时间"></el-table-column>
          <el-table-column align="center" prop="approStatusName" label="审批状态"></el-table-column>
          <el-table-column align="center" prop="approTime" label="审批时间"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="queryById(scope.row.tenantId)">详情</el-button>
              <el-button class="table_btn" type="text" v-if="scope.row.tenantStatus=='0' && scope.row.approStatus=='3'" @click="deleteById(scope.row.tenantId)">作废</el-button>
              <el-button class="table_btn" type="text" v-if="scope.row.tenantStatus=='1' && scope.row.approStatus=='3'" @click="enableById(scope.row.tenantId)">启用</el-button>
              <el-button class="table_btn" type="text" v-if="scope.row.approStatus=='0'" @click="approve(scope.row.tenantId)">审批</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rh-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
        </el-pagination>
      </div>
    </div>
    <!-- 详情页面dialog -->
    <div class="drawer-container detail" :key=1000>
      <el-drawer size="73%" :close-on-click-modal='false' :visible.sync="showDetail" append-to-body :wrapperClosable = false :with-header=true>
        <detailPage v-if="showDetail" @back="back" @reload="init" :detailData="detailData"></detailPage>
      </el-drawer>
    </div>
    <!-- 审批页面抽屉 -->
    <div class="drawer-container approve" :key=2000>
      <el-drawer size="73%" :visible.sync="showApprove" append-to-body :wrapperClosable = false :with-header=true>
        <approvePage v-if="showApprove" @back="back" @reload="init" :approveData="approveData"></approvePage>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import detailPage from "./tenant_detail.vue";
import approvePage from "./tenant_approve.vue";
import { formateDate } from "@/utils/tools.js";
import validate from "@/utils/validate.js";
export default {
    components: { detailPage, approvePage },
    data() {
        return {
            //查询表单
            queryForm: {
                tenantName: "",
                companyTaxId: "",
                approStatus: null,
                tenantStatus: null,
                pageNo: 1,
                pageSize: 10
            },
            page: {
                Total: 100,
                Size: [10, 20, 30],
                currentPage: 1,
            },
            tableLoading:false,
            showDetail:false,
            showApprove:false,
            detailData:{},
            approveData:{},
            tableData: [],
            //表格选择
            tr_sels: [],
            updatePageData: {},
            showmodel:false,
            rules:{
            }
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
      _this.tableLoading = true;
      _this.$api.post(this.$apis.manage+"/rest/manage/system/tenant/plist",
        params,
        function (res) {
          _this.tableLoading = false;
          if (res.success) {
            let list = res.data.records;
            for(let i = 0;i < list.length;i++){
                if(list[i].tenantStatus=="0"){
                    list[i].tenantStatusName = "启用";
                }else if(list[i].tenantStatus=="1"){
                    list[i].tenantStatusName = "停用";
                }else if(list[i].tenantStatus=="2"){
                    list[i].tenantStatusName = "销毁";
                }
                if(list[i].approStatus=="0"){
                    list[i].approStatusName = "未审核";
                }else if(list[i].approStatus=="1"){
                    list[i].approStatusName = "审核中";
                }else if(list[i].approStatus=="2"){
                    list[i].approStatusName = "审核失败";
                }else if(list[i].approStatus=="3"){
                    list[i].approStatusName = "审核成功";
                }
            }
            _this.tableData = res.data;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        });
    },
    queryById(tenantId){
        this.showDetail = true;
        this.detailData = {
            tenantId: tenantId,
        };
    },
    deleteById(tenantId){
      let _this = this;
      _this.$confirm("是否作废租户", '提示', {
          type: 'warning',
          cancelButtonClass: 'btn-custom-cancel'
        }).then(() => {
          _this.$api.delete(_this.$apis.manage +  "/rest/manage/system/tenant/" +  tenantId, {},
            function (res) {
              if (res.success) {
                _this.$message({
                  message: '作废成功',
                  type: 'success'
                });
                _this.init();
              } else {
                _this.$message({
                  message: res.errorMsg,
                  type: "error",
                });
              }
            }
          );
        }).catch(() => {
        });
    },
    enableById(tenantId){
      let _this = this;
      _this.$confirm("是否启用租户", '提示', {
          type: 'warning',
          cancelButtonClass: 'btn-custom-cancel'
        }).then(() => {
          _this.$api.get(_this.$apis.manage +  "/rest/manage/system/tenant/enable/" +  tenantId, {},
            function (res) {
              if (res.success) {
                _this.$message({
                  message: '启用成功',
                  type: 'success'
                });
                _this.init();
              } else {
                _this.$message({
                  message: res.errorMsg,
                  type: "error",
                });
              }
            }
          );
        }).catch(() => {
        });
    },
    approve(tenantId){
      this.showApprove = true;
      this.approveData = {
        tenantId: tenantId,
      };
    },
    //初始化分页
    init_page() {
      this.page.total = this.tableData.total;
      this.page.size = this.tableData.size;
      this.page.current = this.tableData.current;
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
      this.showDetail = false;
      this.showApprove = false;
      // this.queryForm.pageNo = 1;
      // this.init_Table();
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