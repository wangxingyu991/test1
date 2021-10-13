<template>
  <div>
    <frameleftright>
      <div slot="left">
          <div class="tree-wrap">
              <div class="tree-body">
                  <!-- <el-tree  v-loading = "organtreeload"  :load="loadNode" lazy :props="defaultProps"
                  @node-click="handleNodeClick" node-key = "id" :default-expanded-keys="treeExpand"
                 highlight-current :expand-on-click-node="false" :default-expand-all="false"></el-tree> -->
                  <el-tree :data="treeData" :props="defaultProps" node-key = "id" :default-expanded-keys="treeExpand"
                    @node-click="handleNodeClick" highlight-current :expand-on-click-node="false"  :render-content="renderContent"
                    draggable @node-drop="handleDrop" :allow-drop="allowDrop" :allow-drag="allowDrag" ref="tree"></el-tree>
              </div>
          </div>
      </div>
      <div slot="right" v-if="formshow==1">
        <div class="rh-page-header">
            <div class="rh-head-and-operate">
                <div class="tips-content">
                    <span class="rh-helpTip-text">系统功能管理</span>
                </div>
            </div>
        </div>
        <div class="rh-page-content">
          <div class="rh-operate clearfix">
            <el-button  type="primary" @click="operatorForm('updForm')" v-if="btnshow==0">编 辑</el-button>
            <el-button  type="primary" @click="saveForm" v-if="btnshow==1">保 存</el-button> 
            <div class="rh-page-layout-section">
              <el-row>
                <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" label-position="right">
                  <el-row>
                    <el-col :span="12" >
                      <el-form-item label="上级功能代码" prop="superFunctionId">
                        <el-input v-model.trim="editForm.superFunctionId" placeholder="0" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                      <el-form-item label="上级功能名称" prop="superFunctionName">
                        <el-input v-model.trim="editForm.superFunctionName" placeholder="功能树" disabled></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" >
                      <el-form-item label="功能代码" prop="functionId">
                        <el-input v-model.trim="editForm.functionId" placeholder="系统自动产生" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                      <el-form-item label="功能名称" prop="functionName">
                        <el-input v-model.trim="editForm.functionName" placeholder="请输入内容" v-bind:disabled="disOther==0"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" >
                      <el-form-item label="功能简称" prop="functionReferred">
                        <el-input v-model.trim="editForm.functionReferred" placeholder="请输入内容" v-bind:disabled="disOther==0"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                      <el-form-item label="所属应用" prop="appConfigId">
                        <el-select v-model="editForm.appConfigId" placeholder="请选择" v-bind:disabled="disOther==0" @change="setBusinessType">
                          <el-option v-for="item in optionapp" :key="item.dm" :label="item.mc"
                                    :value="item.dm"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" >
                      <el-form-item label="业务分类" prop="businessTypeCode">
                        <el-select v-model="editForm.businessTypeCode" placeholder="请选择" v-bind:disabled="disOther==0">
                          <el-option v-for="item in optionbusinesstype" :key="item.dm" :label="item.mc"
                                    :value="item.dm"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                      <el-form-item label="菜单序号" prop="sortno">
                        <el-input v-model="editForm.sortno" placeholder="请输入内容" v-bind:disabled="disOther==0" onkeyup="value=value.replace(/[^0-9]/g,'')"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" >
                      <el-form-item label="菜单类型" prop="functionType">
                        <el-radio-group v-model="editForm.functionType" v-bind:disabled="disOther==0" @change="radioChange">
                          <el-radio class="radio" label="0">菜单</el-radio>
                          <el-radio class="radio" label="1">功能</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="功能url(以/开始)" prop="functionUrl">
                        <el-input v-model.trim="editForm.functionUrl" placeholder="请输入内容" v-bind:disabled="disOther==0"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="模块地址(以/开始)" prop="componentUrl">
                        <el-input v-model.trim="editForm.componentUrl" placeholder="对应系统vue页面路径" v-bind:disabled="disOther==0"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                      <el-form-item label="有效标志" prop="valid">
                        <el-select v-model="editForm.valid" placeholder="请选择" v-bind:disabled="disOther==0">
                          <el-option v-for="item in optionvalid" :key="item.key" :label="item.label"
                                    :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" >
                      <el-form-item label="功能图标" prop="functionIcon">
                        <el-select v-model="editForm.functionIcon" placeholder="请选择" v-bind:disabled="disOther==0" @change="filenameChanged">
                          <el-option label="请选择" value=""></el-option>
                          <el-option v-for="item in optionfunctionicon" :key="item.id" :label="item.fileName"
                                    :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <!-- <el-col :span="12" >
                      <el-form-item label="菜单显示平台" prop="menuPlatformCode">
                        <el-select v-model="editForm.menuPlatformCode" placeholder="请选择" v-bind:disabled="menuplatformshow==0">
                          <el-option v-for="item in optionmenuplatform" :key="item.dm" :label="item.mc"
                                    :value="item.dm"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col> -->
                  </el-row>
                  <el-row>
                    <el-col :span="12" >
                      <el-form-item label="图标预览" v-if="editForm.functionIcon != ''">
                        <!-- <span style="margin-left: 20px; margin-top: 5px;" class="tbyl"><img :src="iconClass" /></span> -->
                        <i :class="iconClass" style="font-size:50px"></i>
                      </el-form-item>   
                    </el-col>
                  </el-row>
                </el-form>
              </el-row>
            </div>
            <div v-if="0==1">
              <div class="form-search">
                <el-button  type="success" @click="addGncz('operatorGnczForm','新增操作')" v-bind:disabled="editForm.functionId==''">新增操作</el-button>
              </div>
              <div class="mar-T10">
                <el-table :data="cztableData.list" stripe border @selection-change="czhandleSelectionChange">
                  <!--<el-table-column align="center" type="selection" width="55"></el-table-column>-->
                  <el-table-column align="center" prop="gnczDm" label="操作代码"></el-table-column>
                  <el-table-column align="center" prop="gnczmc" label="操作名称"></el-table-column>
                  <el-table-column align="center" prop="valid" label="有效标志"></el-table-column>
                  <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                      <el-button class="table_btn" type="text" @click="queryGnczById(scope.row,'operatorGnczForm','修改操作')">修改</el-button>
                      <el-button class="table_btn" type="text" @click="delGnczByById(scope.row.gnczDm)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 工具条 -->
                <div class="rh-pagination">
                  <el-pagination @size-change="czhandleSizeChange" @current-change="czhandleCurrentChange" :current-page="cztableData.pageNo" :page-sizes="[10, 20, 30, 40]" :page-size="cztableData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="cztableData.total"></el-pagination>
                </div>
              </div>
            </div>
          </div>
          <!-- 新增功能操作 -->
          <el-dialog :title=titlename :visible.sync="showmodel" class="el-dialog-mini">
            <el-row>
              <el-form :model="operatorGnczForm" :rules="gnczRules" ref="operatorGnczForm" :inline="true" label-position="right" class="par-T10">
                <el-col :lg="24">
                  <el-form-item label="操作代码" prop="gnczDm">
                    <el-input v-model="operatorGnczForm.gnczDm" placeholder="系统自动产生" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="24">
                  <el-form-item label="操作名称" prop="gnczmc">
                    <el-input v-model="operatorGnczForm.gnczmc" placeholder="请输入子职能名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="24">
                  <el-form-item label="有效标志" prop="valid">
                    <el-select v-model="operatorGnczForm.valid" placeholder="请选择">
                      <el-option v-for="item in optionvalid" :key="item.key" :label="item.label"
                                :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col class="form-search colum-center">
                  <el-button class="clearMarginLeft" @click="saveGnczForm('operatorGnczForm')" >保 存</el-button>
                  <el-button @click="showmodel=false" v-if="disflag.btn==0">关 闭 </el-button>
                </el-col>
              </el-form>
            </el-row>
          </el-dialog>
        </div>
      </div>
    </frameleftright>
  </div>
</template>

<script>
import frameleftright from "@/einv/tree/frame_lr.vue";
import { checkRealNum } from "@/utils/tools.js";
import {getMd5} from '@/utils/md5.js';
import validate from "@/utils/validate.js";
export default {
    components: {frameleftright },
    name: "function",
    data() {
      let queryData =  (rule, value, callback) => {
        if(this.editForm.functionType == 0){
          callback();
        }else{
          if (value == null || value =='') {
            callback(new Error('请输入功能url'));
          } else {
            callback();
          }
        }
      };
      return {
        iconClass: '../../../static/img/default/icon_default_menu.png',
        editForm: {
          superFunctionId: '',
          superFunctionName: '',
          functionId: '',
          functionName: '',
          functionReferred: '',
          menuPlatformCode:'',
          appConfigId: '',
          businessTypeCode: '',
          sortno: '',
          functionType: '',
          functionUrl: '',
          componentUrl:'',
          valid: '',
          functionIcon: '',
          childnode: ''//20200918 增加孩子节点，主要作用处理一级菜单修改菜单显示平台，所有子节点都更新
        },
        optionvalid: [ { value:'Y', label:'有效', key:0  },
          { value:'N', label:'无效',  key:1 }  ],
        optionfunctionicon: [],
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        treeExpand:['0'],
        rules: {
          functionName: [{required: true, message: '请输入功能名称', trigger: 'blur'},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}],
          functionReferred: [{required: true, message: '请输入功能简称', trigger: 'blur'},
            {min: 1, max: 120, message: '长度在 1 到 120 个字符', trigger: 'blur'}],
          // znDm: [{required: true, message: '请选择职能', trigger: 'blur'}],
          appConfigId: [{required: true, message: '请选择所属应用', trigger: 'blur'}],
          businessTypeCode: [{required: true, message: '请选择业务分类', trigger: 'blur'}],
          sortno: [{required: true, message: '请填写菜单序号', trigger: 'blur'},
                   {validator: checkRealNum, trigger: 'blur'} ],
          functionType: [{required: true, message: '请选择菜单类型', trigger: 'blur'}],
          functionUrl: [{min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur'},
            {validator: queryData, trigger: 'blur'}],
          componentUrl: [{min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur'},
            {validator: queryData, trigger: 'blur'}]/*,
          valid:[{required:true,message:'请选择有效标志',trigger:'change'}] */
        },
        disOther:0,
        btnshow:0,
        formshow:0,
        optionbusinesstype:[],
        optionapp:[],
        optionmenuplatform:[],//20200917增加菜单显示平台选项
        treebtnclickflag:1,
        cztableData:[],
        czsels:[],
        czqueryForm: {
          xtfunctionId:'',
          pageNo: 1,
          pageSize: 10
        },
        operatorGnczForm: {
          xtfunctionId:'',
          gnczDm:'',
          gnczmc: '',
          valid: 'Y'
        },
        showmodel:false,
        titlename:'新增操作',
        gnczRules:{
          gnczmc:[{required:true,message:'请输入操作名称',trigger:'blur'}],
          valid:[{required:true,message:'请选择有效标志',trigger:'change'}],
        },
        disflag:{
          btn:0,
          dm:0,
          other:0,
          click:0
        },
        menuplatformshow: 0,//20200917增加显示平台是否可选标志0不可选，1：可选
        currentmenuplatform: ''//当前选择的显示平台
      }
    },
    created() {
      // this.initimg();
      this.getTree(); 
      this.getdmlist();
      this.getFuncIconllist();
    },
    mounted() {
    },
    methods: {
      //20200927 ymw 增加functionType 0:菜单，1：功能，主要处理增加皮肤后所有的处理在一个方法中处理，避免修改多处的问题
      // initimg(functionType){
      //   var _this = this;
      //   if(functionType==1){
      //     if(this.$skins=='blue'){
      //       _this.editForm.functionIcon = 'blue_icon_default_gntb'
      //       _this.iconClass = '../../../static/img/blue/icon_default_gntb.png'
      //     }else{
      //       _this.editForm.functionIcon = '0000_icon_default_gntb'
      //       _this.iconClass = '../../../static/img/default/icon_default_gntb.png'
      //     }
      //   }else{//除了功能外，其他默认为菜单
      //     if(_this.$skins=='blue'){
      //       _this.iconClass= '../../../static/img/blue/icon_default_menu.png';
      //       _this.editForm.functionIcon= 'blue_icon_default_menu';
      //     }else {
      //       _this.iconClass= '../../../static/img/default/icon_default_menu.png';
      //       _this.editForm.functionIcon= '0000_icon_default_menu';
      //     }
      //   }
      // },
      getTree(id) {
        this.treeData=[];
        let _this = this;
        _this.$api.get(_this.$apis.permission + "/rest/permission/function/tree", {}, function (res) {
          if (res.success == true) {
            _this.treeData = res.data;
            _this.$nextTick(() => {//防止页面dom还没有加载完成出现异常
              if(id != null && id !='' && id !=undefined){
                _this.treeExpand = [];
                _this.treeExpand.push(id)
                _this.$refs.tree.setCurrentKey(id)
                _this.defaultCheck(id);
              }
            });
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      getdmlist() {
        let _this = this;
        _this.$api.get(_this.$apis.permission + "/rest/permission/function/getdmlist", {}, function (res) {
          if (res.success == true) {
            _this.optionbusinesstype = res.data.optionBusinesstype;
            _this.optionapp = res.data.app;
            _this.optionmenuplatform = res.data.optionMenuPlatform;
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      getFuncIconllist(){
        let _this = this;
        _this.$api.get(_this.$apis.permission + "/rest/permission/function/getfunciconlist", {}, function (res) {
          if (res.success == true) {
            _this.optionfunctionicon = res.data;
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      filenameChanged(value){
        let _this = this;
        let id = value;
        if(id != null && id != undefined && id != ''){
          _this.optionfunctionicon.some(function (val) {
            if(val.id==value){
              _this.iconClass = val.filePath;
              return true;
            }
          })
          //20200927 ymw 取消从数据库中查询图标src改为直接用数组中获取
          /*_this.$permissionhttpclient.get("/rest/permission/function/getGntbUrl/"+id,{},function (res) {
            if(res.success == true){
              let data = res.data;
              _this.iconClass = data.filePath;
            } else {
              _this.$message({
                message: '查询失败,' + res.errorMsg,
                showClose:true,
            type: 'error'
              });
            }
          })*/
        } else {
          _this.iconClass = "";
        }
      },
      setBusinessType(item) {
        if(item == null || item == '' || item==undefined){
          return;
        }
        let _this = this;
        _this.editForm.businessTypeCode ="";
        _this.$api.get(_this.$apis.permission +"/rest/permission/function/getbusinesstype/"+item, {}, function (res) {
          if (res.success == true) {
            _this.optionbusinesstype = res.data;
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      operatorForm(operName,store, data){
        let _this = this;
        if(store!=undefined){//表示是通过树进入方法的
          _this.treebtnclickflag = 0;
          if(operName == 'updForm'){
            if(data.pId == undefined){//修改时只有一级菜单才能修改菜单显示平台
              _this.menuplatformshow = 1;
            }else{
              _this.menuplatformshow = 0;
            }
          }else{
            if(data.id == '0'){//新增时只有虚拟功能树的下级才能修改菜单显示平台
              _this.menuplatformshow = 1;
            }else{
              _this.menuplatformshow = 0;
            }
          }
        }else{//表示是通过页面中的按钮进入方法的
          if(_this.editForm.superFunctionId == undefined||_this.editForm.superFunctionId ==''){//修改时只有一级菜单才能修改菜单显示平台
            _this.menuplatformshow = 1;
          }else{
            _this.menuplatformshow = 0;
          }
        }
        if(operName == 'updForm'){
          _this.disOther = 1;
          _this.btnshow = 1;
        }else{
          _this.disOther = 1;
          _this.btnshow = 1;
          _this.formshow = 1;
          _this.editForm.superFunctionId = data.id;
          _this.editForm.superFunctionName = data.name;
          _this.editForm.functionId = '';
          _this.editForm.functionName = '';
          _this.editForm.functionReferred = '';
          _this.editForm.znDm = '04';
          _this.editForm.menuPlatformCode = data.menuPlatformCode;
          _this.editForm.appConfigId = '';
          _this.editForm.businessTypeCode = '';
          _this.editForm.sortno = '';
          _this.editForm.functionType = '0';
          _this.editForm.functionUrl = '';
          _this.editForm.componentUrl = '';
          _this.editForm.valid = 'Y';
          // this.initimg();
        }
      },
      saveForm(){
        let _this = this;
        if(_this.editForm.functionType == 0){
          _this.editForm.functionUrl = '';
          _this.editForm.componentUrl = '';
        }
        // 判断功能树类型，增加默认图标
        // if(_this.editForm.functionIcon == ''){//根据类型自动选择图标
        //   _this.initimg(_this.editForm.functionType)
        // }
        if(_this.editForm.functionId != '' && _this.editForm.functionId != null && _this.editForm.functionId !=undefined){
          _this.update();
        }else{
          _this.save();
        }
        _this.treebtnclickflag = 1;
      },
      save(){
        let _this = this;
        _this.$refs.editForm.validate((valid) => {
          if(valid){
            let para = Object.assign({}, this.editForm);
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
            _this.$api.post(_this.$apis.permission + "/rest/permission/function",para,function (res) {
              if(res.success == true) {
                _this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                _this.resetPage();
                _this.getTree(res.data);
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
        //只有一级菜单可以修改菜单显示平台，同时菜单显示平台进行了修改，才会更新其子节点的显示平台代码
        if((_this.editForm.superFunctionId==undefined ||_this.editForm.superFunctionId=='') && _this.currentmenuplatform!=_this.editForm.menuPlatformCode){
          let node = [];
          let treenode = _this.$refs.tree.getCurrentNode();
          if (treenode.isParent == "TRUE") {
            _this.filterKeys(treenode.children, node)
          }
          _this.editForm.childnode = node.join();
        }else{
          _this.editForm.childnode = '';
        }
        _this.$refs.editForm.validate((valid) => {
          if(valid){
            let para = Object.assign({}, this.editForm);
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
            _this.$api.put(_this.$apis.permission + "/rest/permission/function",para,function (res) {
              if(res.success == true) {
                _this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                _this.resetPage();
                _this.getTree(res.data);
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
      del(store, data) {
        console.log(data);
        let _this = this;
        let node = [];
        if(data.isParent=="TRUE"){
          _this.filterKeys(data.children,node)
        }
        node.push(data.id);
        let delnode = node.join();
        _this.$confirm( "请确认是否删除【"+data.name+"】及下级功能菜单?", '提示', {
          type: 'warning',
          cancelButtonClass: 'btn-custom-cancel'
        }).then(() => {
          _this.$api.delete(_this.$apis.permission + "/rest/permission/function/" + delnode, {}, function (res) {
            if (res.success == true) {
              _this.$message({
                message: '删除成功',
                type: 'success'
              });
              _this.resetPage();
              _this.getTree();
            } else {
              _this.$message({
                message: '查询失败,' + res.errorMsg,
                showClose:true,
            type: 'error'
              });
            }
          })
        }).catch(() => {
        });
      },
      filterKeys(childnode,result){
        let _this = this;
        for(let cnode of childnode){
          result.push(cnode.id);
          if(cnode.isParent=="false"){
            continue;
          }else{
            _this.filterKeys(cnode.children,result);
          }
        }
      },
      resetPage(){
        if(this.$refs['editForm'] != undefined){
          this.$refs['editForm'].resetFields();
        }
        this.disOther = 0;
        this.btnshow = 0;
        this.formshow = 0;
        this.menuplatformshow = 0;
      },
      renderContent(h, { node, data, store }) {
        if(data.id !== '0'){
          if(data.isParent=='false'){
            return (
              <span class="custom-tree-node2">
                <span class="label">{node.label}</span>
                <span  class="btn-group">
                  <i class="el-icon-edit" on-click={ () => this.operatorForm('updForm',store, data) } ></i>
                  <i class="el-icon-minus" on-click={ () => this.del(store, data) } ></i>
                </span>
              </span>);
          }else{
            return (
              <span class="custom-tree-node2">
                <span class="label">{node.label}</span>
                <span  class="btn-group">
                  <i class="el-icon-plus" on-click={ () => this.operatorForm('addForm',store, data) } ></i>
                  <i class="el-icon-edit" on-click={ () => this.operatorForm('updForm',store, data) } ></i>
                  <i class="el-icon-minus" on-click={ () => this.del(store, data) } ></i>
                </span>
              </span>);
          }
        }else{
          return (
              <span class="custom-tree-node2">
                <span class="label">{node.label}</span>
                <span  class="btn-group">
                  <i class="el-icon-plus" on-click={ () => this.operatorForm('addForm',store, data) } ></i>
                </span>
            </span>);
        }
      },
      handleNodeClick(data) {
        if(this.treebtnclickflag==0){
          this.treebtnclickflag = 1;
          return;
        }
        this.$refs['editForm']!=undefined? this.$refs['editForm'].resetFields():1;
        if(data.id!=undefined && data.id !=null && data.id !='' && data.id !='0'){
          this.formshow = 1;
          this.queryById(data.id);
        }else{
          this.formshow = 0;
        }
        this.disOther = 0;
        this.btnshow = 0;
        this.menuplatformshow = 0;
      },
      defaultCheck(id) {
        this.$refs['editForm']!=undefined? this.$refs['editForm'].resetFields():1;
        if(id!=undefined && id !=null && id !=''){
          this.formshow = 1;
          this.queryById(id);
        }else{
          this.formshow = 0;
        }
        this.disOther = 0;
        this.btnshow = 0;
      },
      queryById(id) {
        let _this = this;
        _this.iconClass = "";
        _this.$api.get(_this.$apis.permission + "/rest/permission/function/" + id, {}, function (res) {
          if (res.success == true) {
            let data = res.data;
            // _this.optionbusinesstype = data.businessTypeCode;
            _this.editForm.superFunctionId = data.superFunctionId;
            _this.editForm.superFunctionName = data.superFunctionName;
            _this.editForm.functionId = data.functionId;
            _this.editForm.functionName = data.functionName;
            _this.editForm.functionReferred = data.functionReferred;
            _this.editForm.znDm = data.znDm;
            _this.editForm.menuPlatformCode = data.menuPlatformCode;
            _this.editForm.appConfigId = data.appConfigId;
            _this.editForm.businessTypeCode = data.businessTypeCode;
            _this.editForm.sortno = data.sortno;
            _this.editForm.functionType = data.functionType;
            _this.editForm.functionUrl = data.functionUrl;
            _this.editForm.componentUrl = data.componentUrl;
            _this.editForm.valid = data.valid;
            _this.editForm.functionIcon = data.functionIcon;
            _this.optionfunctionicon.some(function (val) {
              if(val.id==data.functionIcon){
                _this.iconClass = val.filePath;
              }
            })
            // _this.iconClass = data.filePath;//图片地址
            _this.currentmenuplatform = data.menuPlatformCode;//记住默认的菜单显示平台
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      radioChange(val){
        let _this = this;
        // _this.initimg(val);
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        // alert(dropType);
        let _this = this;
        let superFunctionId = '';
        let sortno = 0;
        if(dropType=='inner'){
          superFunctionId = dropNode.data.id;
        }else if(dropType=='before'){
          sortno = parseInt(dropNode.data.sortno==undefined?0:dropNode.data.sortno)-1;
          superFunctionId = dropNode.data.pId;
        }else{//after
          sortno = parseInt(dropNode.data.sortno==undefined?0:dropNode.data.sortno)+1;
          superFunctionId = dropNode.data.pId;
        }
        // alert(dropType);
        // if(dropType=='before'){
          var params = {
            'functionId':draggingNode.data.id,
            'superFunctionId':superFunctionId,
            'sortno':sortno
          };
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
          _this.$api.put(_this.$apis.permission+"/rest/permission/function/functiondrag",params,function (res) {
            if(res.success == true) {
              _this.editForm.sortno = sortno;
              /*_this.$message({
                message: '修改成功',
                type: 'success'
              });*/
            } else {
              _this.$message({
                message: '拖动失败,' + res.errorMsg,
                showClose:true,
            type: 'error'
              });
            }
          })
        // }
      },
      allowDrop(draggingNode, dropNode, type) {
        // if(draggingNode.data.menuPlatformCode != dropNode.data.menuPlatformCode){
        //   return false;
        // }
        if (dropNode.data.nodeType === 'operation') {
          return type !== 'inner';
        } else {
          return true;
        }
      },
      allowDrag(draggingNode) {
        return draggingNode.data.id !== '0';
      },
      // initCz(){

      // },
      // czhandleSelectionChange(val){
      //   this.czsels = val;
      // },
      // czhandleSizeChange(val) {
      //   this.czqueryForm.pageSize = val;
      //   this.searchCz();
      // },
      // czhandleCurrentChange(val) {
      //   this.czqueryForm.pageNo = val;
      //   this.searchCz();
      // },
      // searchCz(){
      //   let _this = this;
      //   _this.czqueryForm.xtfunctionId = _this.editForm.functionId;
      //   _this.$httpclient.get("/rest/gncz/getGnczByXtgndm", _this.czqueryForm, function (res) {
      //     if (res.success == true) {
      //       _this.cztableData = res.data;
      //       let list = _this.cztableData.list;
      //       for(let i = 0; i < list.length; i++) {
      //         if(list[i].valid == 'Y') {
      //           list[i].valid = "有效";
      //         } else {
      //           list[i].valid = "无效";
      //         }
      //       }
      //       _this.cztableData.list = list;
      //     } else {
      //       _this.$message({
      //         message: '查询失败,' + res.errorMsg,
      //         showClose:true,
            // type: 'error'
      //       });
      //     }
      //   })
      // },
      // addGncz(formName,title) {
      //   let _this = this;
      //   _this.showmodel = true;
      //   _this.titlename = title;
      //   _this.resetForm(formName);
      // },
      // queryGnczById(obj, formName, title) {
      //   let _this = this;
      //   _this.showmodel = true;
      //   _this.titlename = title;
      //   if(title=='修改操作'){
      //     _this.disflag.dm=0;
      //     _this.disflag.other=1;
      //     _this.disflag.btn=0;
      //     _this.disflag.click=1;
      //   }else{
      //     _this.disflag.dm=0;
      //     _this.disflag.other=0;
      //     _this.disflag.btn=1;
      //     _this.disflag.click=0;
      //   }
      //   _this.resetForm('operatorGnczForm');
      //   _this.$httpclient.get("/rest/gncz/queryGnczById/" + obj.gnczDm, {}, function (res) {
      //     if (res.success == true) {
      //       let data = res.data;
      //       _this.operatorGnczForm.xtfunctionId = data.xtfunctionId;
      //       _this.operatorGnczForm.gnczDm = data.gnczDm;
      //       _this.operatorGnczForm.gnczmc = data.gnczmc;
      //       _this.operatorGnczForm.valid = data.valid;
      //     } else {
      //       _this.$message({
      //         message: '查询失败,' + res.errorMsg,
      //         showClose:true,
            // type: 'error'
      //       });
      //     }
      //   })
      // },
      resetForm(formName) {
        let _this = this;
        if (_this.$refs[formName] !== undefined) {
          _this.$refs[formName].resetFields();
        }
      },
    //   saveGnczForm(formName){
    //     let _this = this;
    //     _this.disflag.click=1;
    //     _this.operatorGnczForm.xtfunctionId = _this.editForm.functionId;
    //     if(_this.titlename == '新增操作'){
    //       _this.saveGncz(formName);
    //     }else if(_this.titlename == '修改操作'){
    //       _this.updateGncz(formName);
    //     }else{
    //       return false;
    //     }
    //   },
    //   saveGncz(formName) {
    //     let _this = this;
    //     _this.$refs.operatorGnczForm.validate((valid) => {
    //       if (valid) {
    //         let para = Object.assign({}, _this.operatorGnczForm);
    //         _this.$httpclient.post("/rest/gncz/saveGncz", para, function (res) {
    //           if (res.success == true) {
    //             _this.$message({
    //               message: '保存成功',
    //               type: 'success'
    //             });
    //             _this.showmodel = false;
    //             _this.resetForm('operatorGnczForm');
    //             _this.searchCz();
    //           } else {
    //             _this.$message({
    //               message: '保存失败,' + res.errorMsg,
    //               showClose:true,
            // type: 'error'
    //             });
    //           }
    //         })
    //       } else {
    //         _this.disflag.click=1;
    //         return false;
    //       }
    //     })
    //   },
    //   updateGncz(formName){
    //     let _this = this;
    //     _this.$refs.operatorGnczForm.validate((valid) => {
    //       if (valid) {
    //         let para = Object.assign({}, _this.operatorGnczForm);
    //         _this.$httpclient.post("/rest/gncz/updateGncz", para, function (res) {
    //           if (res.success == true) {
    //             _this.$message({
    //               message: '更新成功',
    //               type: 'success'
    //             });
    //             _this.showmodel = false;
    //             _this.resetForm('operatorGnczForm');
    //             _this.searchCz();
    //           } else {
    //             _this.$message({
    //               message: '保存失败,' + res.errorMsg,
    //               showClose:true,
            // type: 'error'
    //             });
    //           }
    //         })
    //       } else {
    //         _this.disflag.click=1;
    //         return false;
    //       }
    //     })
    //   },
    //   delGnczByById(id){
    //     let _this = this;
    //     _this.$confirm('确认删除该记录吗?', '提示', {
    //       type: 'warning',
    //       cancelButtonClass: 'btn-custom-cancel'
    //     }).then(() => {
    //       _this.$httpclient.del("/rest/gncz/delGnczById/" + id, {}, function (res) {
    //         if (res.success == true) {
    //           _this.$message({
    //             message: '删除成功',
    //             type: 'success'
    //           });
    //           _this.resetForm('operatorGnczForm');
    //           _this.searchCz();
    //         } else {
    //           _this.$message({
    //             message: '删除成功,' + res.errorMsg,
    //             showClose:true,
            // type: 'error'
    //           });
    //         }
    //       })
    //     });
    //   }
    }
  }
</script>