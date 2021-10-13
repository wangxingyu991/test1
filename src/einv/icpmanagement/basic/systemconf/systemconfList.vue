<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">系统参数配置</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <!-- <div class="rh-pull-left"> -->
          <el-button type="primary" @click="onAdd">新增</el-button>
        <!-- </div> -->
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
            <el-form-item prop="pzdm">
              <el-input v-model="queryForm.pzdm" placeholder="配置代码" maxlength="20"></el-input>
            </el-form-item>
             <el-form-item prop="pzxx">
              <el-input v-model="queryForm.pzxx" placeholder="配置名称" maxlength="20"></el-input>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
            <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
          </el-form>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange" v-loading="loadingSystem">
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
          <el-table-column show-overflow-tooltip align="left" prop="pzdm" label="配置代码"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="pzxx" label="配置名称" ></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="pzsm" label="配置说明"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="yxbz" label="有效标志" ></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="xgsj" label="修改时间" ></el-table-column>
          
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="onEdit(scope)">修改</el-button>
              <el-button class="table_btn" type="text" @click="onDel(scope.row.pzdm)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rh-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
        </el-pagination>
      </div>
    </div>
       <!--新增客户分类弹框-->
        <el-dialog 
            title="新增系统参数配置"
            :visible.sync = "isDialogShowAdd"
            width="40%"
           append-to-body
           :before-close="handleCloseAdd">
            <el-row style="text-align:center">
                <div class="rh-dialog-body">
                    <el-form :model="insertForm" :rules="rules"  ref="insertForm" label-width="115px" label-position="right">
                         <el-row>
                            <el-col :span="21">
                              <el-form-item label="配置代码" prop="pzdm" >
                                <el-input v-model.trim="insertForm.pzdm" placeholder="配置代码" maxlength="30"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                          <el-col :span="21">
                            <el-form-item label="配置名称" prop="pzxx">
                              <el-input v-model.trim="insertForm.pzxx" placeholder="配置名称" maxlength="50"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                          <el-row>
                          <el-col :span="21">
                           <el-form-item label="配置说明" prop="pzsm">
                              <el-input v-model.trim="insertForm.pzsm" placeholder="配置说明" maxlength="100"></el-input>
                            </el-form-item>
                          </el-col>
                       
                        </el-row>
                        <el-row>
                          <el-col :span="21">
                            <el-form-item label="有效标志" prop="yxbz">
                                <el-select v-model="insertForm.yxbz">
                                    <el-option label="有效" value="Y"></el-option>
                                    <el-option label="无效" value="N"></el-option>
                                </el-select>
                            </el-form-item>
                          </el-col>
                         </el-row>
                        
                      </el-form>
                  </div>
             </el-row>
                  <div class="rh-dialog-footer" solt="footer">
                        <el-button @click="Systemcanel('insertForm')">取消</el-button>
                        <el-button type="primary" @click="addcus_submit('insertForm')" :loading="loading.loadingList">保存</el-button>
                  </div>
        </el-dialog>
        <el-dialog 
            title="修改系统参数配置"
            :visible.sync = "isDialogShowEdit"
            width="40%"
           append-to-body
           :before-close="handleCloseEdit">
                <div class="rh-dialog-body">
                    <el-form :model="editForm" :rules="rules"  ref="editForm" label-width="115px" label-position="right">
                        <el-row>
                          <el-col :span="21">
                            <el-form-item label="配置代码" prop="pzdm" >
                              <el-input v-model.trim="editForm.pzdm" placeholder="配置代码" maxlength="30" :disabled="true"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="21">
                            <el-form-item label="配置名称" prop="pzxx">
                              <el-input v-model.trim="editForm.pzxx" placeholder="配置名称" maxlength="50"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                         <el-row>
                          <el-col :span="21">
                           <el-form-item label="配置说明" prop="pzsm">
                              <el-input v-model.trim="editForm.pzsm" placeholder="配置说明" maxlength="100"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="21">
                            <el-form-item label="有效标志" prop="yxbz">
                                <el-select v-model="editForm.yxbz">
                                    <el-option label="有效" value="Y"></el-option>
                                    <el-option label="无效" value="N"></el-option>
                                </el-select>
                            </el-form-item>
                          </el-col>
                         </el-row>
                       
                      </el-form>
                  </div>
                  <div class="rh-dialog-footer" solt="footer">
                        <el-button @click="Systemcanel('editForm')">取消</el-button>
                        <el-button type="primary" @click="Eidtcus_submit('editForm')" :loading="loading.loadingList">保存</el-button>
                  </div>
        </el-dialog>
  </div>
</template>

<script>

import { formateDate } from "@/utils/tools.js";
import validate from "@/utils/validate.js";
export default {
  data() {
    return {
      loadingSystem:false,
      isDialogShowAdd:false,
      isDialogShowEdit:false,
      //查询表单
      queryForm: {
        pzdm:"",
        pzxx:"",
        pageNo: 1,
        pageSize: 10,
      },
      loading:{
        loadingList:false,
      },
       //校验规则
      rules: {
        pzdm: [
          { required: true, message: "请输入配置代码", trigger: "blur" },
          { max: 100, message: "最多30个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
         ],
         pzxx: [
          { required: true, message: "请输入配置名称", trigger: "blur" },
          { max: 100, message: "最多50个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
         ],
          pzsm: [
          { required: true, message: "请输入配置说明", trigger: "blur" },
          { max: 100, message: "最多100个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
         ],
          yxbz: [
          { required: true, message: "请选择有效标志", trigger: "blur" },
         ],
        
      },
      insertForm: {
        pzdm: "",
        pzxx: "",
        pzsm: "",
        yxbz: "",
      },
      editForm: {
        id:"",
        pzdm: "",
        pzxx: "",
        pzsm: "",
        yxbz: "",
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
    handleCloseAdd(){
      this.isDialogShowAdd=false;
    },
    handleCloseEdit(){
      this.isDialogShowEdit=false;
    },
    //表单提交
    addcus_submit(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
          let insertParams = _this.insertForm;
          if (insertParams != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(insertParams))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }
          _this.loading.loadingList=true;
          
              _this.$api.post(
                _this.$apis.icpmanagement+"/basic/systemconf/saveSystemconf/", insertParams,
                function (res) {
                if (res.success) {
                    _this.$message({
                    showClose:true,
                    message: "保存成功",
                    type: "success",
                    });
                    //关闭抽屉
                   _this.loading.loadingList=false;
                   _this.canel(formName);
                   
                } else {
                    _this.$message({
                    showClose:true,
                    message: res.errorMsg,
                    type: "error",
                    });
                    _this.loading.loadingList=false;
                }
                }
              );
          }
        
        })
              
    },
  //修改发票类型
  Eidtcus_submit(formName){
      let _this = this;
      _this.editForm.id=_this.editForm.id;
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
          let EditParams = _this.editForm;
          if (EditParams != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(EditParams))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }
          _this.loading.loadingList=true;
          
              _this.$api.post(
                _this.$apis.icpmanagement+"/basic/systemconf/updateSystemconf/", EditParams,
                function (res) {
                if (res.success==true) {
                    _this.$message({
                    showClose:true,
                    message: "修改成功",
                    type: "success",
                    });
                    //关闭抽屉
                   _this.loading.loadingList=false;
                   _this.canel(formName);
                   
                } else {
                    _this.$message({
                    showClose:true,
                    message: "修改失败," + res.errorMsg,
                    type: "error",
                    });
                    _this.loading.loadingList=false;
                }
                }
              );
          }
        
        })
  },
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
      _this.loadingSystem=true;
      this.$api.post(
        _this.$apis.icpmanagement+"/basic/systemconf/listSystemconf", params,
        function (res) {
          if (res.success==true) {
            _this.tableData = res.data;
            let list = _this.tableData.records;
            //对数据进行解析处理
            for (let i = 0; i < list.length; i++) {
              
               //日期解析
              if(list[i].xgsj!== undefined && list[i]!== "" && list[i].xgsj!==null){
                  list[i].xgsj = formateDate(list[i].xgsj);
              }
            }
            _this.tableData.records = list;
          } else {
            _this.$message({
              showClose:true,
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
           _this.loadingSystem=false;
        }
      );
    },

    // //初始化分页
    // init_page() {
    //   this.page.total = this.tableData.total;
    //   this.page.size = this.tableData.size;
    //   this.page.current = this.tableData.current;
    // },
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
    onDel(pzdm) {
      let _this = this;
      _this
        .$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          _this.$api.delete(
            _this.$apis.icpmanagement +
              "/basic/systemconf/deleteSystemconf/" +pzdm, {},
            function (res) {
              if (res.success) {
                _this.searchForm();
                _this.$message({
                  showClose:true,
                  message: "删除成功",
                  type: "success",
                });
              } else {
                _this.$message({
                  showClose:true,
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
      this.isDialogShowAdd = true;
    },
    canel(formName){
       this.isDialogShowAdd=false;
       this.isDialogShowEdit=false;
       if (this.$refs[formName] !== undefined) {
         this.$refs[formName].resetFields();
      }
      this.searchForm();
    },
    Systemcanel(formName){
      this.isDialogShowAdd=false;
       this.isDialogShowEdit=false;
       if (this.$refs[formName] !== undefined) {
         this.$refs[formName].resetFields();
      }
    },
    //弹出修改页面抽屉
    onEdit(scope) {
      this.isDialogShowEdit = true;
       let yxbz="";
      if(scope.row.yxbz=="有效"){
        yxbz="Y"
      }else{
        yxbz="N"
      }
      this.editForm = {
       
        pzdm: scope.row.pzdm,
        pzxx: scope.row.pzxx,
        yxbz: yxbz,
        pzsm: scope.row.pzsm,
      };
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
      
     this.queryForm.pzdm="";
     this.queryForm.pzxx="";
      this.queryForm.pageNo = 1;
      this.init_Table();
    },
  },
};
</script>
