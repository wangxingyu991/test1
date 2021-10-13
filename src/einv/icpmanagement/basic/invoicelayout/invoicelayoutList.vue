<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">发票票样配置</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <div class="rh-pull-left">
          <el-button type="primary" @click="onAdd">新增</el-button>
        </div>
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
           <el-form-item label="" prop="sf">
                <el-select v-model="queryForm.sf" placeholder="请选择税务省份" filterable @change="chooseSf()">
                    <el-option 
                    v-for="item in NsrsfList" 
                    :key="item.sfdm" 
                    :label="item.sf"
                    :value="item.sf">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
            <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
          </el-form>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange" v-loading="loadingLayout">
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
          <el-table-column show-overflow-tooltip align="left" prop="pymc" label="票样名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="yxbz" label="有效标志"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="xgsj" label="创建时间"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="onEdit(scope)">修改</el-button>
              <el-button class="table_btn" type="text" @click="onDel(scope)">删除</el-button>
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
      <div class="drawer-container add">
        <el-drawer  size="70%"
          :visible.sync="drawerAdd"
          append-to-body
          :wrapperClosable = false
          :with-header="true">
          <addPage  v-if="drawerAdd"  @reload="init_Table" @back="Addback">

          </addPage>

        </el-drawer>
      </div>
      <!-- 编辑页面抽屉 -->
     <div class="drawer-container update">
      <el-drawer 
        size="70%" 
        :visible.sync="update" 
        append-to-body
        :wrapperClosable = false
        :with-header="true" >
        <editPage v-if="update" @back="Addback" @reload="init_Table" :updatePageData="updatePageData"></editPage>
      </el-drawer>
    </div> 
  </div>
</template>

<script>

import { formateDate } from "@/utils/tools.js";
import addPage from "./invoicelayoutAdd.vue";
import editPage from "./invoicelayoutEdit.vue";
import validate from "@/utils/validate.js";
export default {
   components:{
      formateDate,
      addPage,
      editPage,
    
    },
  data() {
    return {
      loadingLayout:false,
       drawerAdd:false,//抽屉弹出层
       update:false,//弹出抽屉
      isDialogShowAdd:false,
      isDialogShowEdit:false,
      //查询表单
      queryForm: {
        sf:"",
        pageNo: 1,
        pageSize: 10,
      },
      loading:{
        loadingList:false,
      },
       //校验规则
      rules: {
        fplxdm: [
          { required: true, message: "请输入发票类型代码", trigger: "blur" },
         ],
         fplxmc: [
          { required: true, message: "请输入发票类型名称", trigger: "blur" },
         ],
          yxbz: [
          { required: true, message: "请选择有效标志", trigger: "blur" },
         ],
        
      },
      insertForm: {
        fplxdm: "",
        fplxmc: "",
        cyfplxdm: "",
        fplxjc: "",
        yxbz: "",
        zpbz: "",
      },
      editForm: {
        fplxdm: "",
        fplxmc: "",
        cyfplxdm: "",
        fplxjc: "",
        yxbz: "",
        zpbz: "",
      },
      page: {
        Total: 100,
        Size: [10, 20, 30],
        currentPage: 1,
      },
      tableData: [],
      NsrsfList:[],
      //表格选择
      tr_sels: [],
      updatePageData: {},
    };
  },

  created() {},

  mounted() {
     //页面初始化的时候动态获取省份
    this.init_sf();
    //页面初始化的时候加载数据
    this.init_Table();
  },

  methods: {
     //保存成功后关闭抽屉
    Addback() {
       this.drawerAdd=false;
       this.update=false;
       this.init_Table()
    },
    init_sf(){
      let _this = this;
      this.$api.post(
        _this.$apis.icpmanagement +"/basic/taxcode/getAllSf",{},
        function (res) {
          if (res.success) {
             _this.NsrsfList= res.data; 
          } else {
            _this.$message({
               showClose:true,
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );  
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
                _this.$apis.icpmanagement+"/basic/invoicetype/updateInvoiceType/", EditParams,
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
      _this.loadingLayout=true;
      this.$api.post(
        _this.$apis.icpmanagement+"/basic/invoicelayout/listInvoicelayout", params,
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
           _this.loadingLayout=false;
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
    onDel(scope) {
      let _this = this;
      let pybh=scope.row.pybh;
      let yzlj=scope.row.yzlj;
      let para={pybh,yzlj}
      _this.$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          _this.$api.post(
            _this.$apis.icpmanagement +
              "/basic/invoicelayout/deleteInvoicelayout", para,
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
      this.drawerAdd = true;
    },
    canel(formName){
       this.isDialogShowAdd=false;
       this.isDialogShowEdit=false;
       if (this.$refs[formName] !== undefined) {
         this.$refs[formName].resetFields();
      }
      this.searchForm();
    },
    //弹出修改页面抽屉
    onEdit(scope) {
      this.update = true;
       let yxbz="";
      if(scope.row.yxbz=="有效"){
        yxbz="Y"
      }else{
        yxbz="N"
      }
      
      this.updatePageData = {
        pymc: scope.row.pymc,
        yxbz: yxbz,
        pybh:scope.row.pybh,
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
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.queryForm.pageNo = 1;
      this.init_Table();
    },
  },
};
</script>
