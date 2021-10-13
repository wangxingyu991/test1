<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">消息模板管理</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <div class="rh-pull-left">
          <el-button type="primary" @click="onAdd('operatorForm', '新增模板')">新 增</el-button>
        </div>
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
            <el-form-item prop="messageTemplateName">
              <el-input v-model="queryForm.messageTemplateName" placeholder="模板名称" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item prop="status">
              <el-select v-model="queryForm.status" placeholder="模板状态">
                <el-option key="" label="全部" value=""></el-option>
                <el-option key="0" label="有效" value="Y"></el-option>
                <el-option key="1" label="无效" value="N"></el-option>
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
          <el-table-column align="left" prop="messageTemplateCode" label="模板代码"></el-table-column>
          <el-table-column align="left" prop="messageTemplateName" label="模板名称"></el-table-column>
          <el-table-column align="left" prop="title" label="模板标题"></el-table-column>
          <el-table-column align="center" prop="statusName" label="模板状态"></el-table-column>
          <el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="updateById(scope.row.messageTemplateCode)">修改</el-button>
              <el-button class="table_btn" type="text" v-if="scope.row.status=='Y'" @click="enableById(scope.row.messageTemplateCode, 'N', '禁用')">禁用</el-button>
              <el-button class="table_btn" type="text" v-if="scope.row.status=='N'" @click="enableById(scope.row.messageTemplateCode, 'Y', '启用')">启用</el-button>
              <el-button class="table_btn" type="text" @click="deleteById(scope.row.messageTemplateCode)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rh-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
        </el-pagination>
      </div>
    </div>
    <!-- 新增页面dialog -->
    <div class="drawer-container detail" :key=1000>
      <el-dialog title="新增模板" size="73%" :close-on-click-modal='false' :visible.sync="showmodel" append-to-body :wrapperClosable = false :with-header=true>
        <addPage v-if="showmodel" @back="pageBack" @reload="init" :detailData="detailData"></addPage>
      </el-dialog>
    </div>
    <!-- 修改页面dialog -->
    <div class="drawer-container detail" :key=2000>
      <el-dialog title="修改模板" size="73%" :close-on-click-modal='false' :visible.sync="showmodelupdate" append-to-body :wrapperClosable = false :with-header=true>
        <updatePage v-if="showmodelupdate" @back="pageBack" @reload="init" :detailData="detailData"></updatePage>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import validate from "@/utils/validate.js";
import addPage from "./messagetemplate_add.vue";
import updatePage from "./messagetemplate_update.vue";
export default {
    components: { addPage, updatePage },
    data() {
        return {
            //查询表单
            queryForm: { 
              messageTemplateName:'',
              status:'',
                pageNo: 1,
                pageSize: 10
            },
            page: {
                Total: 100,
                Size: [10, 20, 30],
                currentPage: 1,
            },
            detailData:{},
            approveData:{},
            tableData: [],
            //表格选择
            tr_sels: [],
            updatePageData: {},
            showmodel:false,
            showmodelupdate:false,
            tableLoading:false,
            dialogTitle:'',
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
      _this.tableLoading = true;
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
      _this.$api.post(this.$apis.manage+"/rest/manage/messagetemplate/plist",
        params,
        function (res) {
          _this.tableLoading = false;
          if (res.success) {
            let list = res.data.records;
            for(let i = 0;i < list.length;i++){
                if(list[i].status=="Y"){
                    list[i].statusName = "有效";
                }else if(list[i].status=="N"){
                    list[i].statusName = "无效";
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
    //弹出新增页面对话框
    onAdd(formName,title) {
      let _this = this;
      _this.showmodel = true;
      _this.dialogTitle = title;
      _this.resetForm(formName);
    },
    //保存成功后关闭对话框
    pageBack() {
      this.showmodel = false;
      this.showmodelupdate = false;
    },
    updateById(messageTemplateCode){
        this.showmodelupdate = true;
        this.detailData = {
            messageTemplateCode: messageTemplateCode,
        };
    },
    deleteById(messageTemplateCode){
      let _this = this;
      _this.$confirm("是否删除模板", '提示', {
          type: 'warning',
          cancelButtonClass: 'btn-custom-cancel'
        }).then(() => {
          _this.$api.delete(_this.$apis.manage +  "/rest/manage/messagetemplate/" +  messageTemplateCode, {},
            function (res) {
              if (res.success) {
                _this.$message({
                  message: '删除成功',
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
    enableById(messageTemplateCode, status, name){
      let _this = this;
      _this.$confirm("是否"+name+"模板", '提示', {
          type: 'warning',
          cancelButtonClass: 'btn-custom-cancel'
        }).then(() => {
          var params = {
            messageTemplateCode: messageTemplateCode,
            status: status
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
          _this.$api.post(_this.$apis.manage +  "/rest/manage/messagetemplate/enable/", params,
            function (res) {
              if (res.success) {
                _this.$message({
                  message: name +'成功',
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