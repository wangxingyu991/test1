<template>
  <div>
    <frameleftright>
      <div slot="left">
          <div class="tree-wrap">
              <div class="tree-body">
                  <el-tree ref="tree" :data="treeData" :props="defaultProps" node-key = "id" @node-click="handleNodeClick"
                    highlight-current :expand-on-click-node="true" :default-expand-all="true"></el-tree>
              </div>
          </div>
      </div>
      <div slot="right" v-if="formshow==1">
        <div class="rh-page-header">
            <div class="rh-head-and-operate">
                <div class="tips-content">
                    <span class="rh-helpTip-text">岗位维护管理</span>
                </div>
            </div>
        </div>
        <div class="rh-page-content">
          <div class="rh-operate clearfix">
              <div class="rh-pull-left">
                  <el-button  type="primary" @click="add('operatorForm','新增')">新 增</el-button>
                  <el-button  type="primary" @click="btnoper('upd')">修 改</el-button>
                  <el-button  type="primary" @click="btnoper('gnj')">功能集授权</el-button>
                  <el-button  type="primary" @click="btnoper('xtgn')">系统功能授权</el-button>
                  <!-- <el-button  type="primary" @click="btnoper('gncz')">功能操作授权</el-button>
                  <el-button  type="primary" @click="btnoper('mh')">门户授权</el-button> -->
              </div>
              <div class="rh-pull-right">
                <el-form :model="queryForm" ref="queryForm" :inline="true" label-width="0px" label-position="right">
                  <el-form-item prop="postName" style="width:150px">
                    <el-input v-model="queryForm.postName" placeholder="请输入岗位名称"></el-input>
                  </el-form-item>
                  <el-form-item prop="valid" style="width:150px">
                    <el-select v-model="queryForm.valid" placeholder="请选择">
                      <el-option v-for="item in optionvalid" :key="item.key" :label="item.label"
                                :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                    <el-form-item>
                      <el-button icon="el-icon-search" type="primary" @click="search"></el-button>
                      <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
          </div>
          <div class="rh-table">
              <el-table :data="tableData.records" stripe border highlight-current-row @current-change="handleSelectionChange" v-loading = "tablelaoding">
                <template slot="empty">
                  <div class="pic_nodata"></div>
                </template>
                <el-table-column label="" width="50" align="center" >
                  <template slot-scope="scope">
                    <el-radio :label="scope.row.postId" v-model="radioPost">&nbsp;</el-radio>
                  </template>
                </el-table-column>
                <el-table-column  align="center" prop="postId" label="岗位代码" width="180"></el-table-column>
                <el-table-column align="left" prop="postName" label="岗位名称" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-button class="table_btn" type="text" @click="showlinkedfunction(scope.row)">{{ scope.row.postName }}</el-button>
                  </template>
                </el-table-column>
                <el-table-column align="left" prop="postDescription" label="岗位职责描述" show-overflow-tooltip></el-table-column>
                <el-table-column align="center" prop="valid" label="有效标志" width="100"></el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button class="table_btn" type="text" v-if="scope.row.authType !== '2' && sqbz=='false'" @click="onAllPermission(scope.row)">全部授权</el-button>
                    <el-button class="table_btn" type="text" v-if="scope.row.authType === '2' && sqbz=='false'" @click="onCancelPermission(scope.row)">取消授权</el-button>
                    <el-button class="table_btn" type="text" @click="onPartPermission(scope.row)">部分授权</el-button>
                    <el-button class="table_btn" type="text" v-if="scope.row.valid === '有效'" @click="onDisRow(scope.row.postId)">禁用</el-button>
                    <el-button class="table_btn" type="text" v-if="scope.row.valid === '无效'" @click="onEnaRow(scope.row.postId)">启用</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="rh-pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.tableData.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="this.tableData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="this.tableData.total"></el-pagination>
              </div>
          </div>
        </div>
        <el-dialog :title=titlename :visible.sync="showmodel" append-to-body width="30%" :wrapperClosable = false :with-header=true>
          <el-row>
            <el-form :model="operatorForm" :rules="rules" ref="operatorForm" label-position="right" label-width="80px" >
              <el-col :span="24">
                <el-form-item label="岗位名称" prop="postName">
                  <el-input v-model.trim="operatorForm.postName" placeholder="请输入岗位名称" maxlength="120"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="岗位描述" prop="postDescription">
                  <el-input type="textarea" v-model.trim="operatorForm.postDescription" class="dialog-textarea" placeholder="请输入岗位描述" maxlength="300"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="岗位分类" prop="postTypeId">
                  <el-select v-model="operatorForm.postTypeId" placeholder="请选择" disabled>
                    <el-option v-for="item in optionposttype" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <div class="rh-dialog-footer">
            <el-button type="primary" @click="saveForm" :disabled="disflag.click==0">保 存</el-button>
            <el-button @click="showmodel=false">关 闭 </el-button>
          </div>
        </el-dialog>
        <!--关联组织机构树 -->
        <el-dialog title='授权机构' :visible.sync="showpageorgan" width="35%" append-to-body @close='inittree=false' :wrapperClosable = false :with-header=true>
          <div>
            <div>
              <el-tree  v-loading = "organtreeload" v-if="inittree" :load="loadNode" lazy :default-expanded-keys = "defaultOpen" style="height:230px;"
                        :props="defaultOrganProps"  show-checkbox node-key="id" :check-strictly="true" :default-checked-keys="postorgan"
                        highlight-current :expand-on-click-node="true" :default-expand-all="false"  @check-change="handleCheckChange" ref="organtree"></el-tree>
            </div>
            <div class="rh-dialog-footer">
              <el-button type="primary" @click="saveOrganCheckedKeys">保存</el-button>
              <el-button @click="showpageorgan=false">关 闭 </el-button> 
            </div>
          </div>
        </el-dialog>
        <!--Tabs-->
        <el-drawer :visible.sync="dialogFormTabs" size="50%" append-to-body :wrapperClosable = false :with-header=true>
          <div class="drawer-wrap">
            <div class="rh-drawer-head">
              <div class="drawer-title">{{tabtitle}}</div>
            </div>
            <div class="rh-drawer-body">
              <div class="tabs-wrap">
                <el-tabs v-model="activeName" @tab-click="handleClick" class="rh-tabs" size="mini">
                  <el-tab-pane label="系统功能树" name="0">
                    <el-tree :data="linkedAllTree" :props="defaultProps"  highlight-current  :default-expand-all="true"></el-tree>
                  </el-tab-pane>
                  <el-tab-pane label="功能集授权功能树" name="1">
                    <el-tree :data="linkedPostFunctionlistTree" :props="defaultProps"  highlight-current   :default-expand-all="true"></el-tree>
                  </el-tab-pane>
                  <el-tab-pane label="独立授权功能树" name="2">
                    <el-tree :data="linkedPostFunctionTree" :props="defaultProps" highlight-current   :default-expand-all="true"></el-tree>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </div>
        </el-drawer>
        <el-dialog title="功能集授权" :visible.sync="showfunlistauth" width="69%" append-to-body :wrapperClosable = false :with-header=true>
          <el-transfer class="par-10"
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入功能集名称"
            v-model="yszgnjvalue"
            :props="{
              key: 'functionListId',
              label: 'functionListName'
            }"
            :titles="['当前岗位待添加功能集', '当前岗位已添加功能集']"
            :data="datafunlist"
            @change="handleChange">
          </el-transfer>
        </el-dialog>
        <!-- 选择系统功能 -->
        <el-drawer :visible.sync="setfunctiontree" append-to-body size="50%" :wrapperClosable = false :with-header=true>
           <div class="drawer-wrap">
              <div class="rh-drawer-head">
                <div class="drawer-title">系统功能授权</div>
              </div>
              <div class="rh-drawer-body">
                  <div class="form-search par-T5">
                    <el-button type="primary" @click="saveCheckedKeys">保 存</el-button>
                  </div>
                    <el-tree id="xtgnTree" :data="functionTreeData" show-checkbox node-key="id" :check-strictly="true" :default-checked-keys="defaultCheck"
                            default-expand-all :props="defaultProps"  highlight-current ref="tree" element-loading-text="拼命加载中"></el-tree>
              </div>
           </div>
        </el-drawer>
      </div>
      
    </frameleftright>
  </div>
</template>

<script>
import frameleftright from "@/einv/tree/frame_lr.vue";
import {getMd5} from '@/utils/md5.js';
import validate from "@/utils/validate.js";

export default {
    components: {frameleftright },
    name: "post",
    data() {
      let queryData =  (rule, value, callback) => {
        let reg = /^\d{1,4}$/;
        if(value!=null&&!reg.test(value)&&value.toString().length>0) {
          callback(new Error("显示序号最大为4位数字"));
        } else {
          callback();
        }
      };
      return {
        queryForm: {
          postName:'', 
          valid:'',
          postTypeId:'',
          pageNo: 1,
          pageSize: 10
        },
        operatorForm: {
          postId:'',
          postName: '',
          postDescription: '',
          // jgjcDm: [],
          postTypeId: '',
          postTypeCode: ''
        },
        optionvalid: [
          {
            value:'',
            label:'全部',
            key:0
          },
          {
            value:'Y',
            label:'有效',
            key:1
          },
          {
            value:'N',
            label:'无效',
            key:2
          }
        ],
        treeData: [],
        linkedAllTree:[],
        linkedPostFunctionlistTree:[],
        linkedPostFunctionTree:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        tableData:[
        ],
        disflag:{
          click:0
        },
        showmodel:false,
        tablelaoding:false,
        titlename:'新增',
        tabtitle:'',
        sels:{},
        optionposttype:[],
        optionaqkzlb:[],
        checkboxjgjc:[],
        rules: {
          postName: [{required: true, message: '请输入岗位名称', trigger: 'blur'},
            {min: 1, max: 90, message: '长度在 1 到 120 个字符', trigger: 'blur'}],
          xsxh: [{validator: queryData, trigger: 'blur'}],
          postTypeId:[{required:true,message:'请选择岗位分类',trigger:'change'}],
          aqkzlbDm:[{required:true,message:'请选择安全控制类别',trigger:'change'}]
        },
        rulespage: {
          pageId:[{required:true,message:'请选择门户页面',trigger:'change'}],
        },
        formshow:0,
        currentorgantype:'',
        currentorgantypecode:'',
        currentpostid:'',
        dialogFormTabs:false,
        activeName: 'first',
        showfunlistauth:false,
        datafunlist: [],
        yszgnjvalue: [],
        setfunctiontree:false,
        defaultCheck:[],
        functionTreeData:[],
        setgncztree:false,
        gnczTreeData:[],
        gnczqueryForm: {
          xtgnDm: '',
          postId: '',
          pageNo: 1,
          pageSize: 10
        },
        gncztableData:[],
        gnczsels:[],
        currentxtgndm:'',
        pagelist:[],
        pageForm:{
          pageId:''
        },
        showpage:false,
        pagetitle:'',
        sqbz:'false',//该标志的作用主要是为了防止恶意点击全部授权，因为该操作业务量大太
        showpageorgan:false,
        organtreeload:true,
        radioPost:'',
        defaultOrganProps: {
          children: 'children',
          label: 'organName',
          isLeaf:'isParent'
        },
        defaultOpen: [],
        postorgan:[],
        inittree:false, //该标志为异常加载树时，每次处理完将tree显示设置为false，以保证每次打开时都重新加载树
        clickCancel:[],
        currentorgan:'',
        usedpostorgan:[]
      }
    },
    created() {
      this.getTree();
      this.getdmlist();
    },
    mounted() {
    },
    methods: {
      getTree() {
        this.treeData=[];
        let _this = this;
        _this.formshow = 1;
        _this.$api.get(_this.$apis.permission+"/rest/permission/post/tree", {}, function (res) {
          if (res.success == true) {
            _this.treeData = res.data;
            if(res.data != null && res.data.length >0){
              _this.formshow = 1;
              _this.queryForm.postTypeId = res.data[0].children[0].id;
              _this.currentorgantype = res.data[0].children[0].id;
              _this.currentorgantypecode = res.data[0].children[0].postTypeCode
              _this.$refs.tree.setCurrentKey(res.data[0].children[0].id)
              _this.search();
            }
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      search() {
        let _this = this;
        let queryForm = Object.assign({}, this.queryForm);
        if (queryForm != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(queryForm))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
        }
        _this.tablelaoding = true;
        _this.$api.post(_this.$apis.permission+"/rest/permission/post/plist", queryForm, function (res) {
          _this.tablelaoding = false;
          if (res.success == true) {
            _this.tableData = res.data;
            _this.sels = {};
            _this.radioPost = "";
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
        _this.$api.get(_this.$apis.permission+"/rest/permission/post/getdmlist", {}, function (res) {
          if (res.success == true) {
            // let aqkzlb = res.data.aqkzlb;
            // aqkzlb.unshift({'dm':'','mc':'全部'});
            _this.optionposttype = res.data.gwfl;
            // _this.optionaqkzlb = aqkzlb;
            // _this.checkboxjgjc = res.data.jgjc;
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        this.search();
        //console.log('每页'+val+'条');
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val;
        this.search();
        //console.log('当前页:'+val+'页');
      },
      showlinkedfunction(val){
        let _this = this;
        _this.dialogFormTabs = true;
        _this.tabtitle = val.postName + " - - 已关联系统功能";
        _this.activeName = 'first';
        _this.linkedAllTree=[];
        let params =  {params:{'postId':val.postId}};
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
        _this.$api.get(_this.$apis.permission+"/rest/permission/post/linkedalltree",params, function (res) {
          if (res.success == true) {
           _this.linkedAllTree = res.data.linkedAllTree;
           _this.linkedPostFunctionlistTree = res.data.linkedPostFunctionlistTree;
           _this.linkedPostFunctionTree = res.data.linkedPostFunctionTree;
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      showfunlist(val){
        let _this = this;
        _this.datafunlist=[];
        _this.yszgnjvalue = [];
        let params = {params:{'postId':val.postId}};
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
        _this.$api.get(_this.$apis.permission+"/rest/permission/post/funlistinfo",params , function (res) {
          if (res.success == true) {
            _this.datafunlist = res.data.allfunlist;
            let ygj = res.data.linkedfunlist;
            for(let i = 0; i < ygj.length; i++){
              _this.yszgnjvalue.push(ygj[i].functionListId);
            }
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      filterMethod(query, item) {
        return item.functionListName.indexOf(query) > -1;
      },
      //value 为右边值，左右标志，移动的key
      handleChange(value, direction, movedKeys) {
        if(direction=='right'){//add
          this.saveFunlist(movedKeys)
        }else{//del
          this.delFunlist(movedKeys);
        }
        //console.log(value, direction, movedKeys);
      },
      saveFunlist(val){
        let _this = this;
        let params = {'postId':_this.currentpostid,'functionListId':val.join()};
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
        _this.$api.post(_this.$apis.permission+"/rest/permission/post/savefunlist",params,function (res) {
          if(res.success == true) {
            _this.$message({
              message: '关联成功',
              type: 'success'
            });
          } else {
            _this.$message({
              message: '关联失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      delFunlist(val){
        let _this = this;
        let params = {'postId':_this.currentpostid,'functionListId':val.join()};
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
        _this.$api.post(_this.$apis.permission+"/rest/permission/post/delfunlist",params,function (res) {
          if(res.success == true) {
            _this.$message({
              message: '取消关联成功',
              type: 'success'
            });
          } else {
            _this.$message({
              message: '取消关联失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      handleSelectionChange(val){
        this.sels = val;
        this.radioPost = val.postId;
      },
      add(formName,title) {
        let _this = this;
        _this.showmodel = true;
        _this.titlename = title;
        _this.disflag.click=1;
        _this.resetForm(formName);
        _this.operatorForm.postTypeId = _this.currentorgantype;
        _this.operatorForm.postTypeCode = _this.currentorgantypecode;
      },
      btnoper(flag){
        let _this = this;
        if(_this.sels == null || _this.sels==undefined || _this.sels.postId == null ){
          _this.$message({
            message: '请选择要进行操作的数据且只能选择一条',
            showClose:true,
            type: 'error'
          });
        }else{
          _this.currentpostid = _this.sels.postId;
          if(flag == 'upd'){
            _this.showmodel = true;
            _this.titlename = '修改';
            _this.disflag.click=1;
            _this.resetForm('operatorForm');
            _this.queryById(_this.sels.postId);
          }else if(flag == 'gnj'){
            _this.showfunlistauth = true;
            _this.showfunlist(_this.sels);
          }else if(flag == 'xtgn'){
            _this.setfunctiontree = true;
            _this.setFunction(_this.sels.postId)
          }else if(flag == 'mh'){
            _this.showpage = true;
            _this.getpageinfo(_this.sels[0])
          }else if(flag == 'gncz'){
            _this.setgncztree = true;
            _this.setgncz(_this.sels[0].postId)
          }
        }
      },
      resetForm(formName) {
        let _this = this;
        if (_this.$refs[formName] !== undefined) {
          _this.$refs[formName].resetFields();
        }
      },
      saveForm(){
        let _this = this;
        _this.disflag.click=0;
        if(_this.titlename == '新增'){
          _this.save();
        }else if(_this.titlename == '修改'){
          _this.update();
        }else{
          return false;
        }
      },
      save(){
        let _this = this;
        _this.$refs.operatorForm.validate((valid) => {
          if(valid){
            // _this.operatorForm.jgjcDm = _this.operatorForm.jgjcDm.join();
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
            _this.$api.post(_this.$apis.permission + "/rest/permission/post",para,function (res) {
              if(res.success == true) {
                _this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                _this.showmodel = false;
                _this.resetForm('operatorForm');
                _this.search();
              } else {
                _this.$message({
                  message: '保存失败,' + res.errorMsg,
                  showClose:true,
            type: 'error'
                });
              }
            })
          }else{
            _this.disflag.click=1;
            return false;
          }
        })
      },
      update(){
        let _this = this;
        _this.$refs.operatorForm.validate((valid) => {
          if(valid){
            // _this.operatorForm.jgjcDm = _this.operatorForm.jgjcDm.join();
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
            _this.$api.put(_this.$apis.permission + "/rest/permission/post",para,function (res) {
              if(res.success == true) {
                _this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                _this.showmodel = false;
                _this.resetForm('operatorForm');
                _this.search();
              } else {
                _this.$message({
                  message: '修改失败,' + res.errorMsg,
                  showClose:true,
            type: 'error'
                });
              }
            })
          }else{
            _this.disflag.click=1;
            return false;
          }
        })
      },
      onAllPermission(data){
        let _this = this;
        if(data.valid=='无效'){
          _this.$message({
            message: '该岗位无效，无法授权，请先启用该岗位！',
            showClose:true,
            type: 'error'
          });
          return;
        }
        _this.sqbz = 'true';
        let param = {'postId':data.postId,'authType':'2'}
        if (param != null) {
              if (validate.checkForbiddenWordForm(JSON.stringify(param))) {
                _this.$message({
                  showClose: true,
                  message: "不允许有特殊字符",
                  type: "error",
                });
                return;
              }
            }
        _this.$api.post(_this.$apis.permission + "/rest/permission/post/allpermission", param, function(res) {
          if(res.success == true) {
            _this.$message({
              message: '授权成功',
              type: 'success'
            });
            _this.search();
            _this.sqbz = 'false';
          } else {
            _this.sqbz = 'false';
            _this.$message({
              message: '授权失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      onCancelPermission(data){
        let _this = this;
        _this.getUsedPost(data.postId)
          .then(res => {
            if (_this.usedpostorgan.length === 0) {
              _this.sqbz = 'true';
              let param = {'postId':data.postId,'authType':'0'}
              if (param != null) {
                if (validate.checkForbiddenWordForm(JSON.stringify(param))) {
                  _this.$message({
                    showClose: true,
                    message: "不允许有特殊字符",
                    type: "error",
                  });
                  return;
                }
              }
              _this.$api.post(_this.$apis.permission + "/rest/permission/post/cancelallpermission", param, function(res) {
                if(res.success == true) {
                  _this.$message({
                    message: '取消授权成功',
                    type: 'success'
                  });
                  _this.search();
                  _this.sqbz = 'false';
                } else {
                  _this.sqbz = 'false';
                  _this.$message({
                    message: '取消授权失败,' + res.errorMsg,
                    showClose:true,
            type: 'error'
                  });
                }
              })
            }else{
              _this.$message({
                message: '该岗位已经被其他机构使用，无法取消全部授权，可在部分授权功能中尝试！',
                showClose:true,
            type: 'error'
              });
            }
          });

      },
      onPartPermission(data){
        let _this = this;
        _this.getUsedPost(data.postId);
        _this.currentpostid = data.postId;
        _this.currentorgan = data.organId;
        _this.showpageorgan = true;
        _this.inittree=true;
        _this.clickCancel=[];
        let params = {params:{'postId':data.postId}};
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
        //查询已选择该岗位的机关
        _this.$api.get(_this.$apis.permission + "/rest/permission/post/getpostorgan", params, function (res) {
          if (res.success == true) {
            _this.postorgan = res.data;
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      onDisRow(id) {
        let _this = this;
        //Promise.all([_this.getUsedPost(id)]) //多个可以放在组件中调用用Promise.all([f1,f2,f3]).then()
        _this.getUsedPost(id)
          .then(res => {
            if (_this.usedpostorgan.length === 0) {
              _this.$api.post(_this.$apis.permission + "/rest/permission/post/disable/" + id, {}, function (res) {
                if (res.success == true) {
                  _this.$message({
                    message: '禁用成功',
                    type: 'success'
                  });
                  _this.search();
                } else {
                  _this.$message({
                    message: '禁用失败,' + res.errorMsg,
                    showClose:true,
            type: 'error'
                  });
                }
              });
            } else {
              _this.$message({
                message: '该岗位已经被其他机构使用，无法停用',
                showClose:true,
            type: 'error'
              });
            }
          });
      },
      onEnaRow(id){
        let _this = this;
        _this.$api.post(_this.$apis.permission + "/rest/permission/post/enable/" + id, {}, function(res) {
          if(res.success == true) {
            _this.$message({
              message: '启用成功',
              type: 'success'
            });
            _this.search();
          } else {
            _this.$message({
              message: '启用失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      handleNodeClick(data) {
        console.log(data);
        let _this = this;
        _this.$refs['queryForm']!=undefined? _this.$refs['queryForm'].resetFields():1
        if(data.id!=undefined && data.id !=null && data.id !=''){
          _this.formshow = 1;
          _this.queryForm.postTypeId = data.id;
          _this.currentorgantype = data.id;
          _this.currentorgantypecode = data.postTypeCode
          _this.search();
        }else{
          _this.formshow = 0;
        }
      },
      queryById(id) {
        let _this = this;
        _this.$api.get(_this.$apis.permission + "/rest/permission/post/" + id, {}, function (res) {
          if (res.success == true) {
            let data = res.data;
            _this.operatorForm.postId = data.postId;
            _this.operatorForm.postName = data.postName;
            _this.operatorForm.xsxh = data.xsxh;
            _this.operatorForm.postDescription = data.postDescription;
            // if(data.jgjcDm!==null && data.jgjcDm!==undefined && data.jgjcDm!==''){//新增的条件判断
            //   _this.operatorForm.jgjcDm=data.jgjcDm.split(",");
            // }
            _this.operatorForm.postTypeId = data.postTypeId;
            _this.operatorForm.aqkzlbDm = data.aqkzlbDm;
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      setFunction(val){
        let _this = this;
        _this.functionTreeData=[];
        let params = {params:{'postId':val}};
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
        _this.$api.get(_this.$apis.permission + "/rest/permission/post/fucntiontree", params, function (res) {
          if (res.success == true) {
            _this.functionTreeData = res.data;
            _this.defaultCheck = res.data[0].checkList;
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      saveCheckedKeys() {
        let _this = this;
        let node = _this.$refs.tree.getCheckedKeys();
        let parentNode = [];
        for(let tnode of _this.$refs.tree.getCheckedNodes()){
          if(tnode.pId!=undefined && tnode.pId!=null && tnode.pId!='')
            parentNode.push(tnode.pId)
        }
        parentNode= [...new Set(parentNode)];
        let tmpaddnode=[],addnode=[];
        for(let n of parentNode){
          if(!node.includes(n)){
            tmpaddnode.push(n)
          }
        }
        for(let ne of tmpaddnode){
          _this.filterKeys(ne,addnode);
        }
        node = node.concat(addnode,tmpaddnode);
        node = [...new Set(node)];
        let checknote = node.join(); //获取所有选中行的id组成的字符串，以逗号分隔
        let params = {'checknote':checknote,'postId':_this.currentpostid};
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
        _this.$api.post(_this.$apis.permission + "/rest/permission/post/updatepostfunction", params, function (res) {
          if (res.success == true) {
            _this.$message({
              message: '功能授权成功',
              type: 'success'
            });
            _this.setfunctiontree = false;
          } else {
            _this.$message({
              message: '功能授权失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      filterKeys(key,result){
        let _this = this;
        let pId = this.$refs.tree.getNode(key).data.pId;
        if(pId==null||pId==undefined||pId==''){
          return;
        }else{
          result.push(pId);
          _this.filterKeys(pId,result);
        }
      },
      getpageinfo(val) {
        let _this = this;
        _this.pagetitle = val.postName + " - - 门户授权";
        _this.pagelist = [];
        _this.$api.get("/rest/permission/post/getpageinfo", {params:{'postId':val.postId}}, function (res) {
          if (res.success == true) {
            let page  = res.data.pagelist;
            page.unshift({'id':'','name':'全部'});
            _this.pagelist = page;
            _this.pageForm.pageId = res.data.gwpage[0].pageId;
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      savePage() {
        let _this = this;
        _this.$refs.pageForm.validate((valid) => {
          if(valid){
            _this.$api.post("/rest/permission/post/updatepage",{'pageId':_this.pageForm.pageId,'postId':_this.currentpostid},function (res) {
              if(res.success == true) {
                _this.$message({
                  message: '授权成功',
                  type: 'success'
                });
                _this.showpage = false;
              } else {
                _this.$message({
                  message: '授权失败,' + res.errorMsg,
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
      handleClick(tab, event) {
        //console.log(tab, event);
              event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.transform =
        "translateX(" + tab.index * -100 + "%)";
      },
      gnczRenderContent(h, { node, data, store }){
        if(data.id != undefined){
          if(data.type=='gn'){
            return (
              <span>
              <span class="tree-tit">
              <i class="file-text"></i>
              <span class="el-tree-node__label">{node.label}</span>
            </span>
            </span>);
          }else if(data.type=='cd'){
            return (
              <span>
              <span class="tree-tit">
              <i class="file-close"></i>
              <span class="el-tree-node__label">{node.label}</span>
            </span>
            </span>);
          }else if(data.type=='cz'){
            return (
              <span>
              <span class="tree-tit">
              <i class="file-caozuo"></i>
              <span class="el-tree-node__label">{node.label}</span>
            </span>
            </span>);
          }
        }else{
          return (
            <span>
            <span class="tree-tit">
            <i class="file-home"></i>
            <span class="el-tree-node__label">{node.label}</span>
          </span>
          </span>);
        }
      },
      setgncz(val){
        let _this = this;
        // 置空列表
        _this.gnczqueryForm.xtgnDm = '';
        _this.gnczqueryForm.postId = '';
        _this.gncztableData = [],
          _this.gnczsels = [],
          _this.currentxtgndm = '',
          // 查询树
          _this.gnczTreeData=[];
        _this.$httpclient.get("/rest/gncz/getYglalltree", {params:{'postId':val}}, function (res) {
          if (res.success == true) {
            _this.gnczTreeData = res.data.yglall;
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      gnczhandleNodeClick(data){
        let _this = this;
        _this.currentxtgndm = data.id;
        _this.gnczqueryForm.xtgnDm = data.id;
        _this.gnczqueryForm.postId = _this.currentpostid;
        _this.searchGncz();
      },
      searchGncz(){
        let _this = this;
        _this.$httpclient.get("/rest/gncz/getGnczByXtgndm", _this.gnczqueryForm, function (res) {
          if (res.success == true) {
            _this.gncztableData = res.data;
            let list = _this.gncztableData.list;
            for (let i = 0; i < list.length; i++) {
              if (list[i].valid == 'Y') {
                list[i].valid = "有效";
              } else {
                list[i].valid = "无效";
              }
            }
            _this.gncztableData.list = list;
            // 默认勾选已授权项
            for (let j = 0; j < list.length; j++) {
              if (list[j].uuid != null) {
                _this.$nextTick(function () {
                  _this.$refs.gncztable.toggleRowSelection(_this.gncztableData.list[j]);
                })
              }
            }

          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      gnczhandleSizeChange(val){
        this.gnczqueryForm.pageSize = val;
        this.searchGncz();
      },
      gnczhandleCurrentChange(val){
        this.gnczqueryForm.pageNo = val;
        this.searchGncz();
      },
      gnczhandleSelectionChange(val){
        this.gnczsels = val;
      },
      gnczsaveCheckedKeys(){
        let _this = this;
        _this.$httpclient.post("/rest/gncz/setGwGncz", {'gnczsels':_this.gnczsels,'postId':_this.currentpostid,'xtgnDm':_this.currentxtgndm}, function (res) {
          if (res.success == true) {
            _this.$message({
              message: '功能操作授权成功',
              type: 'success'
            });
            _this.setfunctiontree = false;
          } else {
            _this.$message({
              message: '功能授权失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      loadNode(node, resolve) {
        let _this = this;
        _this.organtreeload=true;
        if (node.level === 0) {
          _this.$api.get(_this.$apis.permission + "/rest/permission/organmanage/treeroot", {}, function (res) {
            //不可操作的为岗位所属机构及已使用的机构
            if(res.data[0].organId==_this.currentorgan || _this.usedpostorgan.includes(res.data[0].organId)){
              res.data[0].disabled=true;
            }
            _this.organtreeload = false;
            _this.defaultOpen.push(res.data[0].id);
            return resolve(res.data);
          });
        }
        if (node.level >= 1) {
          _this.$api.get(_this.$apis.permission + "/rest/permission/organmanage/treechild/"+node.data.organCode, {}, function (res) {
            let list = res.data;
            for(let i = 0;i < list.length;i++){
              list[i].isParent=list[i].isParent=='true'?true:false;
              if(list[i].organId ==_this.currentorgan || _this.usedpostorgan.includes(list[i].organId)){
                list[i].disabled=true;
              }
            }
            _this.organtreeload = false;
            return resolve(list);
          });
        }
      },
      handleCheckChange(data, checked, indeterminate) {
        let _this = this;
        if(!checked){
          _this.clickCancel.push(data.organId);
        }
        //console.log(data, checked, indeterminate);
      },
      saveOrganCheckedKeys() {
        let _this = this;
        let node = _this.$refs.organtree.getCheckedKeys();
        //删除岗位所属机关
        node.splice(node.findIndex(item => item ===_this.currentorgan),1);
        let cancelnode = [...new Set(_this.clickCancel)];//取消的节点
        let checknote = node.join(); //获取所有选中行的id组成的字符串，以逗号分隔
        //console.log('node',node,cancelnode);return;
        if(cancelnode.length===0 && node.length===0){
          _this.$message({
            message: '没有做任务操作',
            type: 'success'
          });
          _this.showpageorgan = false;
          return;
        }
        let params = {'checknote':checknote,'cancelnote':cancelnode.join(),'postId':_this.currentpostid,'authType':'1'};
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
        
        _this.$api.post(_this.$apis.permission + "/rest/permission/post/savepartpermission", params, function (res) {
          if (res.success == true) {
            _this.$message({
              message: '部分授权成功',
              type: 'success'
            });
            _this.showpageorgan = false;
            _this.inittree=false;
            _this.search();
          } else {
            _this.$message({
              message: '部分授权失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      getUsedPost(val){
        return new Promise((resolve, reject) => {
          let _this = this;
          let params = {params:{'postId':val}};
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
          _this.$api.get(_this.$apis.permission + "/rest/permission/post/getusedpost", params, function (res) {
            if (res.success == true) {
              _this.usedpostorgan = res.data;
              resolve();
            } else {
              _this.$message({
                message: '查询已使用该岗位的机关失败,' + res.errorMsg,
                showClose:true,
            type: 'error'
              });
              reject();
            }
          });
        });
      }
    }
  }
</script>