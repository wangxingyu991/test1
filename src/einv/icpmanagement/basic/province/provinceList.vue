<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">省份编码信息管理</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <!-- <el-button type="primary" @click="onEdit" :disabled="dis.isFlag">编辑</el-button> -->
        <el-button type="primary" @click="onUpdateAll" :loading="loadingUp.loadingUpdate">更新全部</el-button>
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
             <el-form-item prop="fplxmc">
              <el-input v-model="queryForm.sf" placeholder="省份" maxlength="15"></el-input>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
            <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
          </el-form>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange" v-loading="loadingProvince">
       <!-- <el-table-column label="" width="50" align="center" >
                    <template slot-scope="scope">
                          <el-radio :label="scope.row.id" v-model="radioInvoice" @change.native="getCurrentRow2(scope)">&nbsp;</el-radio>
                    </template>
        </el-table-column> -->
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
          
          <el-table-column show-overflow-tooltip align="left" prop="sf" label="省份"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="yzmc" width="310px" label="印章名称" ></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="sjdz" width="200px" label="税局地址"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="spbmbbh" width="130px" label="商品编码版本号"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="yxbz" label="有效标志"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="onEdit(scope)">修改</el-button>
              <!-- <el-button class="table_btn" type="text" @click="onDel(scope.row.fplxdm)">删除</el-button> -->
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
            title="新增发票类型"
            :visible.sync = "isDialogShowAdd"
            width="50%"
           append-to-body
           :before-close="handleCloseAdd">
                <div class="rh-dialog-body">
                    <el-form :model="insertForm" :rules="rules"  ref="insertForm" label-width="115px" label-position="right">
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="省份名称" prop="sf" >
                              <el-input v-model="insertForm.sf" placeholder="" maxlength="3"></el-input>
                            </el-form-item>
                          </el-col>
            
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                          <el-form-item label="发票类型名称" prop="fplxmc">
                              <el-input v-model="insertForm.fplxmc" placeholder="" maxlength="100"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                          <el-form-item label="发票类型简称" prop="fplxjc">
                              <el-input v-model="insertForm.fplxjc" :precision="1"  placeholder=""></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12">
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
                  <div class="rh-dialog-footer" solt="footer">
                        <el-button @click="canel('insertForm')">取消</el-button>
                        <el-button type="primary" @click="addcus_submit('insertForm')" :loading="loading.loadingList">保存</el-button>
                  </div>
        </el-dialog>
        <el-dialog 
            title="修改省份信息"
            :visible.sync = "isDialogShowEdit"
            width="35%"
           append-to-body
           :before-close="handleCloseEdit">
             <el-row style="text-align:center">
                <div class="rh-dialog-body">
                    <el-form :model="editForm" :rules="rules"  ref="editForm" label-width="115px" label-position="right">
                        <el-row>
                          <el-col :span="20">
                            <el-form-item label="省份名称" prop="sf" >
                              <el-input v-model.trim="editForm.sf" placeholder="" maxlength="5" ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="20">
                          <el-form-item label="印章名称" prop="yzmc">
                              <el-input v-model.trim="editForm.yzmc" type="textarea" placeholder="" maxlength="100"></el-input>
                            </el-form-item>
                          </el-col>
                         
                        </el-row>
                         <el-row>
                           <el-col :span="20">
                          <el-form-item label="税局地址" prop="sjdz">
                              <el-input v-model.trim="editForm.sjdz" :precision="1"  placeholder=""></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="20">
                            <el-form-item label="商品编码版本号" prop="spbmbbh">
                                 <el-input v-model="editForm.spbmbbh" :precision="1"  placeholder="" :disabled="true"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="20">
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
             </el-row>
                  <div class="rh-dialog-footer" solt="footer">
                        <el-button @click="Prvicecanel('editForm')">取消</el-button>
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
      loadingProvince:"",
      radioInvoice:"",
      isDialogShowAdd:false,
      isDialogShowEdit:false,
      //查询表单
      queryForm: {
        id:"",
        fplxdm:"",
        fplxmc:"",
        pageNo: 1,
        pageSize: 10,
      },
      loading:{
        loadingList:false,
      },
      loadingUp:{
        loadingUpdate:false,
      },
       //校验规则
      rules: {
        sf: [
          { required: true, message: "请输入省份", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
         ],
         yzmc: [
          { required: true, message: "请输入印章名称", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
         ],
          yxbz: [
          { required: true, message: "请选择有效标志", trigger: "blur" },
         ],
          sjdz: [ { required: true, message: "请输入税局地址", trigger: "blur" },
                { validator: this.$validate.checkIpAnddkh, trigger: "blur" },
            ],
      },
      editForm: {
        id: "",
        sfdm: "",
        sf: "",
        yzmc: "",
        sjdz: "",
        spbmbbh: "",
        yxbz:"",
      },
       insertForm: {
        fplxdm: "",
        fplxmc: "",
        cyfplxdm: "",
        fplxjc: "",
        yxbz: "",
        zpbz: "",
      },
        dis:{
        isFlag:true,
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
      getCurrentRow2(scope){
         this.dis.isFlag=false;
         this.queryForm.id=scope.row.id;
    },
    onUpdateAll(){
      let _this=this;
     _this
        .$confirm("确定要更新全部省份信息吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          _this.loadingUp.loadingUpdate=true;
        _this.$api.post(
              _this.$apis.icpmanagement +
                "/basic/province/getUpdateAllProvince", {},
              function (res) {
                _this.init_Table();
                if (res.success) {
                  _this.$message({
                    showClose:true,
                    message: "更新成功" ,
                    type: "success",
                  });
              _this.loadingUp.loadingUpdate=false;
                } else {
                  _this.$message({
                    showClose:true,
                    message: res.errorMsg,
                    type: "error",
                  });
                }
               _this.loadingUp.loadingUpdate=false;
              }
            );
        })
    },
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
                _this.$apis.icpmanagement+"/basic/invoicetype/insertInvoiceType/", insertParams,
                function (res) {
                if (res.success==true) {
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
                    message: "保存失败," + res.errorMsg,
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
                _this.$apis.icpmanagement+"/basic/province/updateProvince/", EditParams,
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
      _this.loadingProvince=true;
      this.$api.post(
        _this.$apis.icpmanagement+"/basic/province/listProvince", params,
        function (res) {
          if (res.success) {
            _this.tableData = res.data;
            let list = _this.tableData.records;
            //对数据进行解析处理
            for (let i = 0; i < list.length; i++) {
              //有效标志
              if (list[i].yxbz == "Y") {
                list[i].yxbz = "有效";
              } else {
                list[i].yxbz = "无效";
              } //有效标志
              if (list[i].zpbz == "Y") {
                list[i].zpbz = "有效";
              } else {
                list[i].zpbz = "无效";
              }
               //日期解析
              if(list[i].czsj!== undefined && list[i]!== "" && list[i].czsj!==null){
                  list[i].czsj = formateDate(list[i].czsj);
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
           _this.loadingProvince=false;
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
    onDel(fplxdm) {
      let _this = this;
      _this
        .$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          _this.$api.delete(
            _this.$apis.icpmanagement +
              "/basic/invoicetype/deleteInvoiceType/" +fplxdm, {},
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
      //this.isDialogShowAdd = true;
      let _this=this;
    

    },
    canel(formName){
       this.isDialogShowAdd=false;
       this.isDialogShowEdit=false;
       if (this.$refs[formName] !== undefined) {
         this.$refs[formName].resetFields();
      }
      this.searchForm();
    },
    Prvicecanel(formName){
        this.isDialogShowAdd=false;
       this.isDialogShowEdit=false;
       if (this.$refs[formName] !== undefined) {
         this.$refs[formName].resetFields();
      }
    },
    //弹出修改页面抽屉
    onEdit(scope) {
      let _this=this;
      
     //let ids=_this.queryForm.id;
     let ids=scope.row.id;
           this.isDialogShowEdit = true;
           _this.$api.post(
            _this.$apis.icpmanagement +
              "/basic/province/getProviceByid/"+ids, {},
            function (res) {
              if (res.success) {
                _this.editForm=res.data;
              } else {
                _this.$message({
                  showClose:true,
                  message: res.errorMsg,
                  type: "error",
                });
              }
            }
          );
      //  let yxbz="";
      //  let zpbz="";
      // if(scope.row.yxbz=="有效"){
      //   yxbz="Y"
      // }else{
      //   yxbz="N"
      // }
      // if(scope.row.zpbz=="有效"){
      //   zpbz="Y"
      // }else{
      //   zpbz="N"
      // }
      // this.editForm = {
      //   fplxdm: scope.row.fplxdm,
      //   fplxmc: scope.row.fplxmc,
      //   cyfplxdm: scope.row.cyfplxdm,
      //   fplxjc: scope.row.fplxjc,
      //   yxbz: yxbz,
      //   zpbz: zpbz,
      //   bz: scope.row.bz,
      // };
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
      this.queryForm.sf="";
    },
  },
};
</script>
