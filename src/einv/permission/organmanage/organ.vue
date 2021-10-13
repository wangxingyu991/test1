<template>
  <div>
    <frameleftright>
        <div slot="left">
            <div class="tree-wrap">
                <div class="tree-body">
                    <el-tree ref="tree" v-loading="treeload" element-loading-text="拼命加载中" :data="treeData" :props="defaultProps" 
                        @node-click="handleNodeClick" :load="loadNode"  lazy  highlight-current>
                    </el-tree>
                </div>
            </div>
        </div>
        <div slot="right">
          <div class="rh-page-header">
              <div class="rh-head-and-operate">
                <div class="tips-content">
                    <span class="rh-helpTip-text">组织机构管理</span>
                </div>
                <!-- <div class="operate-btns">
                    <el-button>帮助</el-button>
                </div> -->
              </div>
          </div>
          <div class="rh-page-content">
            <div class="rh-operate clearfix">
              <el-button type="primary" @click="operatorForm('addForm')" v-bind:disabled="buttonDis.add==0">新 增</el-button>
              <el-button type="primary" @click="operatorForm('updForm')"  v-bind:disabled="buttonDis.edit==0">修 改</el-button>
              <el-button type="primary" @click="saveForm"  v-bind:disabled="buttonDis.save==0">保 存</el-button>
              <!-- <el-button type="primary" @click="del" :disabled="buttonDis.del==0">删 除</el-button> -->
              <div class="rh-page-layout-section">
                  <el-row>
                    <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" label-position="right">
                      <el-row>
                        <el-col :span="12" >
                          <el-form-item label="机构代码" prop="organCode">
                            <el-input v-model.trim="editForm.organId" class="displayNone" v-show="false"></el-input>
                            <el-input v-model.trim="editForm.organCode" placeholder=""  onkeyup="value=value.replace(/[^a-zA-Z0-9]/g,'')" v-bind:disabled="disDm==0" :maxlength="40"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12" >
                          <el-form-item label="上级机构代码" prop="superiorOrganCode">
                            <el-input v-model.trim="editForm.superiorOrganCode" placeholder="" disabled></el-input>
                            <el-input v-model.trim="editForm.organPath" placeholder="" v-show="false"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12" >
                          <el-form-item label="机构名称" prop="organName">
                            <el-input v-model.trim="editForm.organName" placeholder="" maxlength="300" :disabled="disOther==0"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12" >
                          <el-form-item label="机构简称" prop="organReferred">
                            <el-input v-model.trim="editForm.organReferred" placeholder="" maxlength="150" :disabled="disOther==0"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12" >
                          <el-form-item label="机构地址" prop="organAddress">
                            <el-input v-model.trim="editForm.organAddress" placeholder="" maxlength="500" :disabled="disOther==0"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12" >
                          <el-form-item label="机构邮政编码" prop="organPostalcode">
                            <el-input v-model.trim="editForm.organPostalcode" placeholder="" :disabled="disOther==0" :maxlength="6"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12" >
                          <el-form-item label="传真电话" prop="fax">
                            <el-input v-model.trim="editForm.fax" placeholder="" maxlength="20" :disabled="disOther==0"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12" >
                          <el-form-item label="机构电话" prop="organPhone">
                            <el-input v-model.trim="editForm.organPhone" placeholder="" maxlength="60" :disabled="disOther==0"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12" >
                          <el-form-item label="电子信箱" prop="email">
                            <el-input v-model.trim="editForm.email" placeholder="" maxlength="90" :disabled="disOther==0"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12" >
                          <el-form-item label="机构标志" prop="organMark">
                            <el-select v-model="editForm.organMark" placeholder="请选择" :disabled="disOther==0">
                              <el-option label="机关" value="0"></el-option>
                              <el-option label="部门" value="1"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="有效起始日期" prop="effectiveStartTime">
                            <el-date-picker
                              v-model="editForm.effectiveStartTime"
                              type="date"
                              placeholder="选择日期" :disabled="disOther==0">
                            </el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="有效终止日期" prop="effectiveEndTime">
                            <el-date-picker
                              v-model="editForm.effectiveEndTime"
                              type="date"
                              placeholder="选择日期" :disabled="disOther==0">
                            </el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12" >
                          <el-form-item label="有效标志" prop="valid" >
                            <el-select v-model="editForm.valid" placeholder="请选择" :disabled="disOther==0">
                              <el-option v-for="item in optionvalid" :key="item.key" :label="item.label"
                                        :value="item.value"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12" >
                          <el-form-item label="选用标志" prop="choose">
                            <el-select v-model="editForm.choose" placeholder="请选择" :disabled="disOther==0">
                              <el-option v-for="item in optionchoose" :key="item.key" :label="item.label"
                                        :value="item.value"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </el-row>
              </div>
            </div>
          </div>
      </div>
    </frameleftright>
  </div>
</template>

<script>
import frameleftright from "@/einv/tree/frame_lr.vue";
import validate from "@/utils/validate.js";
export default {
  components: {
    frameleftright
  },
  data() {
    let queryData =  (rule, value, callback) => {
      if(this.editForm.organId != '' && this.editForm.organId != null && this.editForm.organId !=undefined){
        callback();
      }else{
        if(value == "00000000000"){
          callback(new Error('该机构代码已存在，请重新输入'));
        }
        this.$api.get(this.$apis.permission+"/rest/permission/organmanage/"+value,{},function(res){
          if(res.success) {
            callback(new Error('该机构代码已存在，请重新输入'));
          } else {
            callback();
          }
        });
      }
    };
     let dateVali =  (rule, value, callback) => {
        if(this.editForm.effectiveStartTime!=null&&this.editForm.effectiveStartTime!=''&&this.editForm.effectiveEndTime!=null&&this.editForm.effectiveEndTime!='') {
          if(this.editForm.effectiveStartTime > this.editForm.effectiveEndTime){
            callback(new Error("有效起始日期必须小于或等于有效终止日期"));
          }else{
            callback();
          }
        } else {
          callback();
        }
      };
    return {
      editForm: {
        organId: '',
        organCode: '',
        superiorOrganCode: '',
        organPath: '',
        organTypeId: '',
        organName: '',
        organReferred: '',
        organAddress: '',
        organPostalcode: '',
        fax: '',
        organPhone: '',
        email: '',
        organMark: '',
        effectiveStartTime: '',
        effectiveEndTime: '',
        valid: '',
        choose: ''
      },
      optionvalid: [ { value:'Y', label:'有效', key:0 },
                      {value:'N', label:'无效',  key:1 }],
      optionchoose: [ {  value:'Y', label:'选用', key:0 },
                      { value:'N', label:'未选用',  key:1}],
      optionjgjc:[],
      rules: {
        organCode: [{required: true, message: '机构代码', trigger: 'blur'},
         /** {min: 11, max: 11, message: '长度必须为11个字符', trigger: 'blur'},**/
          {validator: queryData, trigger: 'blur'},
          {validator: this.$validate.isCharNum, trigger: 'blur'}],
        organName: [{required: true, message: '请输入机构名称', trigger: 'blur'},
          {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}],
        jgjc: [{required: true, message: '请输入机构名称', trigger: 'blur'},
          {min: 1, max: 150, message: '长度在 1 到 150 个字符', trigger: 'blur'}],
        // effectiveStartTime: [{type: 'date', required: true, message: '请选择有效起始日期', trigger: 'change'},
        //   {validator: dateVali, trigger: 'change'}],
        // effectiveEndTime: [{type: 'date', required: true, message: '请选择有效终止日期', trigger: 'change'},
        //   {validator: dateVali, trigger: 'change'}],
        organPostalcode:[{validator: this.$validate.isChinaPostCode, trigger: 'blur'}],
        effectiveStartTime:[{validator: dateVali, trigger: 'blur'}],
        fax:[{validator: this.$validate.isFixedTelephone, trigger: 'blur'}],
        organPhone:[{validator: this.$validate.isTelephone, trigger: 'blur'}],
        email:[{validator: this.$validate.isEmail, trigger: 'blur'}]
      },
      disDm:0,
      disOther:0,
      //菜单树的数据
      treeData: [],
      drawer: false,
      drawer2: false,
      tableData: [],
      //表格选择
      tr_sels: [],
      addPageData: {},
      updatePageData: {},
      defaultProps: {
          children: 'children',
          label: 'organName',
          isLeaf: 'isParent'
      },
      treeData:[],
      treeload:true,
      buttonDis:{
        add:0,
        edit:0,
        save:0,
        del:0
      }
    };
  },

  mounted() {
  },
  created() {
    this.getTreeRoot();
  },
  methods: {
    getTreeRoot() {
        this.treeData=[];
        let _this = this;
        _this.treeload=true;
        _this.$api.get(this.$apis.permission+"/rest/permission/organmanage/treeroot", {}, function (res) {
            if (res.success == true) {
                _this.treeData = res.data;
                _this.treeload = false;
            } else {
                _this.$message({
                    message: '查询失败,' + res.errorMsg,
                    showClose:true,
            type: 'error'
                });
            }
        })
    },
    loadNode(node, resolve) {
      let _this = this;
      _this.treeload=true;
      if (node.level >= 1) {
        _this.$api.get(this.$apis.permission+"/rest/permission/organmanage/treechild/"+node.data.organCode, {}, function (res) {
          let list = res.data;
          for(let i = 0;i < list.length;i++){
            list[i].isParent=(list[i].isParent=='true'?true:false);
          }
          _this.treeload = false;
          return resolve(list);
        });
      }
    },
    handleNodeClick(data) {
      let _this = this;
      if(_this.$refs['editForm'] != undefined){
        _this.$refs['editForm'].resetFields();
      }
      _this.editForm.organId = data.organId;
      _this.editForm.organCode = data.organCode;
      _this.editForm.superiorOrganCode = data.superiorOrganCode;
      _this.editForm.organPath = data.organPath;
      _this.editForm.organTypeId = data.organTypeId;
      _this.editForm.organName = data.organName;
      _this.editForm.organReferred = data.organReferred;
      _this.editForm.organAddress = data.organAddress;
      _this.editForm.organPostalcode = data.organPostalcode;
      _this.editForm.organPhone = data.organPhone;
      _this.editForm.email = data.email;
      _this.editForm.organMark = data.organMark;
      if(data.effectiveStartTime != null && data.effectiveStartTime != ''){
        _this.editForm.effectiveStartTime = _this.$dateUtil.formatDate.parse(data.effectiveStartTime, 'yyyy-MM-dd');
      }
      if(data.effectiveEndTime != null && data.effectiveEndTime != ''){
        _this.editForm.effectiveEndTime = _this.$dateUtil.formatDate.parse(data.effectiveEndTime, 'yyyy-MM-dd')
      }
      _this.editForm.valid = data.valid;
      _this.editForm.choose = data.choose;
      _this.disDm = 0;
      _this.disOther = 0;
      _this.buttonDis.add = 1;
      _this.buttonDis.edit = 1;
      _this.buttonDis.del = 1;
      _this.buttonDis.save = 0;
    },
    operatorForm(operName){
      let _this = this;
      if(operName == 'updForm'){
        _this.disOther = 1;
        _this.buttonDis.add = 0;
        _this.buttonDis.edit = 0;
        _this.buttonDis.del = 0;
        _this.buttonDis.save = 1;
      }else{
        _this.disDm = 1;
        _this.disOther = 1;
        let tmpjg = _this.editForm.organCode;
        if(_this.$refs['editForm'] != undefined){
          _this.$refs['editForm'].resetFields();
        }
        _this.editForm.organId = '';
        _this.editForm.superiorOrganCode = tmpjg;
        _this.editForm.organMark = '0';
        _this.editForm.valid = 'Y';
        _this.editForm.choose = 'Y';
        _this.editForm.zzjglxDm =  '';
        _this.editForm.bsfwtbz = 'N';
        _this.editForm.ghbz = 'N';
        _this.buttonDis.add = 0;
        _this.buttonDis.edit = 0;
        _this.buttonDis.del = 0;
        _this.buttonDis.save = 1;
      }
    },
    saveForm(){
        let _this = this;
        if(_this.editForm.organId != '' && _this.editForm.organId != null && _this.editForm.organId !=undefined){
          _this.update();
        }else{
          _this.save();
        }
      },
      save(){
        let _this = this;
        _this.$refs.editForm.validate((valid) => {
          if(valid){
            let para = Object.assign({}, this.editForm);
            if(_this.editForm.effectiveStartTime != null && _this.editForm.effectiveStartTime != ''){
              para.effectiveStartTime = _this.$dateUtil.formatDate.format(_this.editForm.effectiveStartTime, 'yyyy-MM-dd');
            }
            if(_this.editForm.effectiveEndTime != null && _this.editForm.effectiveEndTime != ''){
              para.effectiveEndTime = _this.$dateUtil.formatDate.format(_this.editForm.effectiveEndTime, 'yyyy-MM-dd');
            }
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
            _this.$api.post(this.$apis.permission+"/rest/permission/organmanage",para,function (res) {
              if(res.success == true) {
                _this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                _this.resetPage();
                //_this.reload();
                //_this.getTree();
                _this.getTreeRoot();
              } else {
                _this.$message({
                  message: '保存失败,' + res.errorMsg,
                  showClose:true,
            type: 'error'
                });
              }
            })
          }else{
            return false;
          }
        })
      },
      update(){
        let _this = this;
        _this.$refs.editForm.validate((valid) => {
          if(valid){
            let para = Object.assign({}, this.editForm);
            if(_this.editForm.effectiveStartTime != null && _this.editForm.effectiveStartTime != ''){
              para.effectiveStartTime = _this.$dateUtil.formatDate.format(_this.editForm.effectiveStartTime, 'yyyy-MM-dd');
            }
            if(_this.editForm.effectiveEndTime != null && _this.editForm.effectiveEndTime != ''){
              para.effectiveEndTime = _this.$dateUtil.formatDate.format(_this.editForm.effectiveEndTime, 'yyyy-MM-dd');
            }
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
            _this.$api.put(this.$apis.permission+"/rest/permission/organmanage",para,function (res) {
              if(res.success == true) {
                _this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                _this.resetPage();
                _this.buttonDis.add = 1;
                _this.buttonDis.edit = 1;
                _this.buttonDis.del = 1;
                _this.buttonDis.save = 0;
                _this.getTreeRoot();
              } else {
                _this.$message({
                  message: '修改失败,' + res.errorMsg,
                  showClose:true,
                  type: 'error'
                });
              }
            })
          }else{
            return false;
          }
        })
      },
      del() {
        let _this = this;
        //_this.$confirm('请先确认该机构下的人员以及下级机构已删除，<br>机构删除后，以下信息也会一并删除：<br><font color="red">*机构岗位职能树</font>|<font color="red">*机构职能树</font>|<font color="red">*机构岗位</font>，<br>确认删除该记录吗？', '提示', {
        _this.$confirm('请先确认该机构下的下级机构已删除，<br>机构删除后，以下信息也会一并删除：<br><font color="red">*机构岗位</font>|<font color="red">*机构人员身份</font>|<font color="red">*机构人员登录信息</font>，<br>确认删除该记录吗？', '提示', {
          type: 'warning',
          cancelButtonClass: 'btn-custom-cancel',
          dangerouslyUseHTMLString: true
        }).then(() => {
          _this.$api.delete(this.$apis.permission+"/rest/permission/organmanage/" + _this.editForm.organCode, {}, function (res) {
            if (res.success == true) {
              if(res.data==101){
                _this.$message({
                  message: '请先删除下级机关',
                  type: 'warning'
                });
              }else if(res.data==102){
                _this.$message({
                  message: '请先删除机关下所有人员',
                  type: 'warning'});
              }else{
                _this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                _this.resetPage();
                _this.getTreeRoot();
              }

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
      resetPage(){
        if(this.$refs['editForm'] != undefined){
          this.$refs['editForm'].resetFields();
        }
        this.buttonDis.add = 0;
        this.buttonDis.edit = 0;
        this.buttonDis.save = 0;
        this.buttonDis.del = 0;
        this.disOther = 0;
      },
  },
};
</script>