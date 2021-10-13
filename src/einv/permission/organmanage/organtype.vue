<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">机构分类管理</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <div class="rh-pull-left">
          <el-button type="primary" @click="onAdd('operatorForm','新增')">新增机构分类</el-button>
        </div>
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
            <el-form-item prop="organName">
              <el-input v-model="queryForm.organName" placeholder="机构名称" ></el-input>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
            <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
          </el-form>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData.records" stripe border v-loading="tablelaoding">
          <template slot="empty">
            <div class="pic_nodata"></div>
          </template>
          <el-table-column align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="left" prop="organCode" label="机构代码"></el-table-column>
          <el-table-column align="left" prop="organName" label="机构名称"></el-table-column>
          <el-table-column align="center" prop="organReferred" label="机构简称"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="queryById(scope.row.organCode,'operatorForm','详情')">详情</el-button>
              <el-button class="table_btn" type="text" @click="queryById(scope.row.organCode,'operatorForm','修改')">修改</el-button>
              <!-- <el-button class="table_btn" type="text" v-if="scope.row.organCode!='99900000000' && scope.row.createUser!='ADMIN'" @click="delById(scope.row.organTypeId)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rh-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
        </el-pagination>
      </div>
      <el-dialog :title=titlename :visible.sync="showmodel"  width="35%" append-to-body :wrapperClosable = false :with-header=true>
        <el-row>
          <el-form :model="operatorForm" :rules="rules" ref="operatorForm" label-width="80px" label-position="right">
            <el-col :span="24">
              <el-form-item label="机构代码" prop="organCode">
                <el-input v-model.trim="operatorForm.organCode" placeholder="请输入机构代码" :disabled="disflag.dm==0" :maxlength="40" onkeyup="value=value.replace(/[^a-zA-Z0-9]/g,'')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="机构名称" prop="organName">
                <el-input v-model.trim="operatorForm.organName" placeholder="请输入机构名称" :disabled="disflag.other==0" maxlength="300"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="机构简称" prop="organReferred">
                <el-input v-model.trim="operatorForm.organReferred" placeholder="机构简称" :disabled="disflag.other==0" maxlength="150"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="有效标志" prop="valid">
                <el-select v-model="operatorForm.valid" placeholder="请选择" disabled>
                  <el-option v-for="item in optionvalid" :key="item.key" :label="item.label"
                              :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="选用标志" prop="choose">
                <el-select v-model="operatorForm.choose" placeholder="请选择" disabled>
                  <el-option v-for="item in optionchoose" :key="item.key" :label="item.label"
                              :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
          <div class="rh-dialog-footer">
            <el-button type="primary" @click="saveForm('operatorForm')" v-if="disflag.btn==0" :disabled="disflag.click==0">保 存</el-button>
            <el-button  @click="showmodel=false">关 闭 </el-button>
          </div>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { formateDate } from "@/utils/tools.js";
import validate from "@/utils/validate.js";
export default {
  data() {
    let queryData =  (rule, value, callback) => {
      var _this = this;
      if(_this.titlename != '新增'){
        callback();
      }else{
        _this.$api.get(_this.$apis.permission+"/rest/permission/organtype/"+value,{},function(res){
          if(res.success == true) {
            callback(new Error('该机构代码已存在，请重新输入'));
          } else {
            callback();
          }
        });
      }
    };
    return {
      //查询表单
      queryForm: {
        organName: "",
        pageNo: 1,
        pageSize: 10
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
      showmodel:false,
      tablelaoding:false,
      operatorForm: {
        organCode: '',
        organName: '',
        organReferred: '',
        organMark: '0',//默认为机构
        superiorOrganCode:'00000000000',
        zzjglxDm:'',
        valid: 'Y',
        choose: 'Y'
      },
      optionvalid: [ { value:'Y', label:'有效', key:0 },
                {value:'N', label:'无效',  key:1 }],
      optionchoose: [ {  value:'Y', label:'选用', key:0 },
                      { value:'N', label:'未选用',  key:1}],
      rules:{
        organCode:[{required:true,message:'请输入机构代码',trigger:'blur'},
         /** {min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' },**/
          {validator: queryData, trigger: 'blur'},
          {validator: this.$validate.isCharNum, trigger: 'blur'}],
        organName:[{required:true,message:'请输入机构名称',trigger:'blur'}],
        valid:[{required:true,message:'请选择有效标志',trigger:'change'}],
        choose:[{required:true,message:'请选择选用标志',trigger:'change'}]
      },
      titlename:'新增',
      disflag:{
        btn:0,
        dm:0,
        other:0,
        click:0
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
      _this.tablelaoding = true;
      _this.$api.post(this.$apis.permission+"/rest/permission/organtype/plist",
        params,
        function (res) {
          _this.tablelaoding = false;
          if (res.success) {
            _this.tableData = res.data;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
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
    queryById(id, formName,title) {
      let _this = this;
      _this.showmodel = true;
      _this.titlename = title;
      if(title=='修改'){
        _this.disflag.dm=0;
        _this.disflag.other=1;
        _this.disflag.btn=0;
        _this.disflag.click=1;
      }else{
        _this.disflag.dm=0;
        _this.disflag.other=0;
        _this.disflag.btn=0;
        _this.disflag.click=0;
      }
      _this.resetForm('operatorForm');
      _this.$api.get( _this.$apis.permission + "/rest/permission/organtype/" + id, {}, function (res) {
        if (res.success == true) {
          let data = res.data;
          _this.operatorForm.organId = data.organId;
          _this.operatorForm.organCode = data.organCode;
          _this.operatorForm.organName = data.organName;
          _this.operatorForm.organReferred = data.organReferred;
          _this.operatorForm.organMark = data.organMark;
          _this.operatorForm.choose = data.choose;
          _this.operatorForm.valid = data.valid;
          _this.operatorForm.superiorOrganCode = data.superiorOrganCode
          _this.operatorForm.organTypeId = data.organTypeId;
        } else {
          _this.$message({
            message: '查询失败,' + res.errorMsg,
            showClose:true,
            type: 'error'
          });
        }
      })
    },
    //删除
    delById(id) {
      let _this = this;
      _this.$confirm('该机构类型信息删除后，以下信息也会一并删除：<br><font color="red">*机构岗位</font>|<font color="red">*机构人员身份</font>|<font color="red">*机构人员登录信息</font>，<br>确认删除该记录吗？', '提示', {
        type: 'warning',
        cancelButtonClass: 'btn-custom-cancel',
        dangerouslyUseHTMLString: true
      }).then(() => {
        _this.$api.delete( _this.$apis.permission + "/rest/permission/organtype/" + id, {}, function (res) {
          if (res.success == true) {
            _this.$message({
              message: '删除成功',
              type: 'success'
            });
            _this.resetForm('queryForm');
            _this.search();
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      });
    },

    //弹出新增页面抽屉
    onAdd(formName,title) {
      let _this = this;
      _this.showmodel = true;
      _this.titlename = title;
      _this.disflag.dm=1;
      _this.disflag.other=1;
      _this.disflag.btn=0;
      _this.disflag.click=1;
      _this.resetForm(formName);
    },

    //弹出修改页面抽屉
    onUpdate(productId) {
      this.updatePageData = {
        productId: productId,
      };
    },

    //保存成功后关闭抽屉
    back() {
      this.queryForm.pageNo = 1;
      this.init_Table();
    },

    //初始化table
    init() {
      this.init_Table();
    },

    saveForm(formName) {
      let _this = this;
      _this.disflag.click=0;
      if(_this.titlename == '新增'){
        _this.save(formName);
      }else if(_this.titlename == '修改'){
        _this.update(formName);
      }else{
        return false;
      }
    },
    save(formName) {
      let _this = this;
      _this.$refs.operatorForm.validate((valid) => {
        if (valid) {
          let para = Object.assign({}, _this.operatorForm);
          if (para != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(para))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }
          _this.$api.post(this.$apis.permission+"/rest/permission/organtype", para, function (res) {
            if (res.success == true) {
              _this.$message({
                message: '保存成功',
                type: 'success'
              });
              _this.showmodel = false;
              // _this.resetForm(formName);
              _this.resetForm('queryForm');
              _this.search();
            } else {
              _this.$message({
                message: '保存失败,' + res.errorMsg,
                showClose:true,
                type: 'error'
              });
            }
            _this.disflag.click=1;
          })
        } else {
          _this.disflag.click=1;
          return false;
        }
      })
    },
    update(formName) {
      let _this = this;
      _this.$refs.operatorForm.validate((valid) => {
        if (valid) {
          let para = Object.assign({}, this.operatorForm);
          if (para != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(para))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }
          _this.$api.put(this.$apis.permission+"/rest/permission/organtype", para, function (res) {
            if (res.success == true) {
              _this.$message({
                message: '更新成功',
                type: 'success'
              });
              _this.showmodel = false;
              // _this.resetForm(formName);
              _this.resetForm('queryForm');
              _this.search();
            } else {
              _this.$message({
                message: '更新失败,' + res.errorMsg,
                showClose:true,
                type: 'error'
              });
            }
            _this.disflag.click=0;
          })
        } else {
          _this.disflag.click=1;
          return false;
        }
      })
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