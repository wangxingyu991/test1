<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">功能集管理</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <div class="rh-pull-left">
          <el-button type="primary" @click="add('operatorForm','新增')">新 增</el-button>
          <el-button type="primary" @click="delGroup">批量删除</el-button>
        </div>
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
            <el-form-item prop="functionListName">
              <el-input v-model="queryForm.functionListName" placeholder="请输入功能集名称"></el-input>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="search"></el-button>
            <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
          </el-form>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange" v-loading = "tablelaoding">
            <template slot="empty">
              <div class="pic_nodata"></div>
            </template>
            <el-table-column align="center" type="selection" width="55"></el-table-column>
            <el-table-column  align="center" prop="functionListId" label="功能集代码"></el-table-column>
            <el-table-column align="left" prop="functionListName" label="功能集名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button class="table_btn" type="text" @click="showlinkedfunction(scope.row.functionListId)">{{ scope.row.functionListName }}</el-button>
              </template>
            </el-table-column>
            <!--<el-table-column align="center" prop="functionListTypeIdmc" label="功能集类型"></el-table-column>
            <el-table-column align="center" prop="aqkzlbmc" label="安全控制类型"></el-table-column>-->
            <el-table-column align="center" prop="createName" label="录入人"></el-table-column>
            <el-table-column align="center" prop="createTime" label="录入日期"></el-table-column>
            <!-- <el-table-column align="center" prop="valid" label="有效标志"></el-table-column>-->
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button class="table_btn" type="text" @click="setFunction(scope.row.functionListId)">功能授权</el-button>
                <el-button class="table_btn" type="text" @click="queryById(scope.row.functionListId,'修改')">修改</el-button>
                <el-button class="table_btn" type="text" @click="delById(scope.row.functionListId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
      </div>
        <!-- 工具条 -->
      <div class="rh-pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.tableData.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="this.tableData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="this.tableData.total"></el-pagination>
      </div>
       <!-- :visible.sync 或v-model-->
      <el-dialog :title=titlename :visible.sync="showmodel"  append-to-body>
        <el-row>
          <el-form :model="operatorForm" :rules="rules" ref="operatorForm" label-position="right" label-width="100px" >
            <el-col :span="12">
              <el-form-item label="功能集名称" prop="functionListName">
                <el-input v-model.trim="operatorForm.functionListName" placeholder="请输入功能集名称" maxlength="150"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="功能集代码" prop="functionListId">
                <el-input v-model.trim="operatorForm.functionListId" placeholder="系统自动生成" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="功能集描述" prop="functionListDescription">
                <el-input type="textarea" v-model.trim="operatorForm.functionListDescription" class="dialog-textarea" placeholder="请输入功能集描述" maxlength="750"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="24">
                <el-form-item label="无权使用功能集机构" prop="jgjcDm" v-if="1==0">
                  <el-checkbox-group v-model="operatorForm.jgjcDm">
                    <el-checkbox v-for="item in checkboxjgjc" :label="item.dm" :key="item.dm">{{item.mc}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item label="功能集类型" prop="functionListTypeId">
                <el-select v-model="operatorForm.functionListTypeId" placeholder="请选择">
                  <el-option v-for="item in optionfunctionlisttype" :key="item.dm" :label="item.mc"
                              :value="item.dm"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="有效标志" prop="valid">
                <el-select v-model="operatorForm.valid" placeholder="请选择">
                  <el-option v-for="item in optionvalid" :key="item.key" :label="item.label"
                              :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="安全控制类别" prop="aqkzlbDm" v-if="1==0">
                <el-select v-model="operatorForm.aqkzlbDm" placeholder="请选择" >
                  <el-option v-for="item in optionaqkzlb" :key="item.dm" :label="item.mc"
                              :value="item.dm"></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item label="所属机关" prop="organName">
                <el-input v-model="operatorForm.organName" placeholder="请输入所属机关" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="录入人" prop="userName">
                <el-input v-model="operatorForm.userName" placeholder="录入人" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div class="rh-dialog-footer">
            <el-button type="primary" @click="saveForm('operatorForm')" :disabled="disflag.click==0">保 存</el-button>
            <el-button @click="showmodel=false">关 闭 </el-button>
        </div>
      </el-dialog>
        <!-- 已关联的系统功能 -->
      <el-drawer :visible.sync="showygltree" append-to-body size="50%" :wrapperClosable = false :with-header=true>
        <div class="drawer-wrap">
          <div class="rh-drawer-head">
            <div class="drawer-title">已关联系统功能</div>
          </div>
          <div class="rh-drawer-body">    
            <el-tree :data="linkedTreeData" :props="defaultProps" highlight-current default-expand-all></el-tree>
          </div>
        </div> 
      </el-drawer>
        <!-- 选择系统功能 -->
      <el-drawer :visible.sync="setFunctiontree" append-to-body size="50%" :wrapperClosable = false :with-header=true>
        <div class="drawer-wrap">
          <div class="rh-drawer-head">
            <div class="drawer-title">功能授权</div>
          </div>
          <div class="rh-drawer-body">
            <div class="form-search par-T5">
              <el-button type="primary" @click="saveCheckedKeys">保 存</el-button>
            </div>
                <el-tree  id="fucntionTree" :data="fucntionTreeData" show-checkbox node-key="id" 
                  :check-strictly="true" :default-checked-keys="defaultCheck"
                  default-expand-all :props="defaultProps" 
                  highlight-current ref="tree" element-loading-text="拼命加载中"></el-tree>
          </div>
        </div>   
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { formateDate } from "@/utils/tools.js";
import validate from "@/utils/validate.js";

export default {
    name: "funtionlist",
    data(){
      return{
        queryForm: {
          functionListId:'',
          functionListName: '',
          functionListTypeId:'',
          pageNo: 1,
          pageSize: 10
        },
        operatorForm: {
          functionListId:'',
          functionListName: '',
          valid: 'Y',
          functionListDescription: '',
          // jgjcDm: [],
          functionListTypeId: '',
          functionListTypeCode: '',
          userName:'',
          organId:'',
          organCode:'',
          organName:'',
          userName:''
        },
        rules:{
          functionListName:[{required:true,message:'请输入功能集名称',trigger:'blur'},
            {min: 1, max: 150, message: '长度最多150个字符', trigger: 'blur' }],
          /*functionListTypeId:[{required:true,message:'请选择功能集类型',trigger:'change'}],*/
          valid:[{required:true,message:'请选择有效标志',trigger:'change'}]
        },
        optionfunctionlisttype:[],
        optionaqkzlb:[],
        checkboxjgjc:[],
        sels:[],
        optionvalid: [
          {
            value:'Y',
            label:'有效',
            key:0
          },
          {
            value:'N',
            label:'无效',
            key:1
          }
        ],
        tableData:[
        ],
        showmodel:false,
        tablelaoding:false,
        titlename:'新增',
        disflag:{
          click:0
        },
        linkedTreeData:[],
        showygltree:false,
        fucntionTreeData:[],
        setFunctiontree:false,
        curfunctionlist:'',
        userName:'',
        organId:'',
        organName:'',
        userName:'',
        defaultCheck:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        },

      }
    },
    created(){
      this.search();
      this.getdmlist();
    },
    mounted(){

    },
    methods: {
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
        _this.$api.post(_this.$apis.permission + "/rest/permission/functionlist/plist", queryForm, function (res) {
          _this.tablelaoding = false;
          if (res.success == true) {
            _this.tableData = res.data;
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
        _this.$api.get(_this.$apis.permission + "/rest/permission/functionlist/getdmlist", {}, function (res) {
          if (res.success == true) {
            let functionlisttype = res.data.functionlisttype;
            // let aqkzlb = res.data.aqkzlb;
            functionlisttype.unshift({'dm':'','mc':'全部'});
            // aqkzlb.unshift({'dm':'','mc':'全部'});
            _this.optionfunctionlisttype = functionlisttype;
            // _this.optionaqkzlb = aqkzlb;
            // _this.checkboxjgjc = res.data.jgjc;
            _this.userName = res.data.userName;
            _this.organId = res.data.organId;
            _this.organName = res.data.organName;
            _this.userName = res.data.userName;
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      showlinkedfunction(val){
        let _this = this;
        _this.showygltree = true;
        _this.linkedTreeData=[];
        _this.$api.get(_this.$apis.permission + "/rest/permission/functionlist/linkedtree", {params:{'functionListId':val}}, function (res) {
          if (res.success == true) {
            _this.linkedTreeData = res.data;
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
        _this.curfunctionlist = val;
        _this.setFunctiontree = true;
        _this.fucntionTreeData=[];
        _this.$api.get(_this.$apis.permission + "/rest/permission/functionlist/fucntiontree", {params:{'functionListId':val}}, function (res) {
          if (res.success == true) {
            _this.fucntionTreeData = res.data;
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
      //递归查询到最顶级节点
      getAllKey(obj,result){
        let _this = this;
        for(let pid of obj){
          if(_this.$refs.tree.getNode(pid).data.pId != undefined && _this.$refs.tree.getNode(pid).data.pId != undefined!=null){
            result.push(_this.$refs.tree.getNode(pid).data.pId);
            _this.getAllKey(new Array(_this.$refs.tree.getNode(pid).data.pId),result)
          }
        }
      },
      saveCheckedKeys() {
        let _this = this;
        let checkTreekey = _this.$refs.tree.getCheckedKeys();
        let checkkey = ''; //获取所有选中行的id组成的字符串，以逗号分隔
        let checkNode = _this.$refs.tree.getCheckedNodes();
        console.log(checkTreekey);
        //查找所有节点的上级节点
        let pidSet=new Set();
        for(let map of checkNode){
          if(map.pId != undefined && map.pId != null && map.pId !=''){
            pidSet.add(map.pId);
          }
        }
        let reslut=[];
        _this.getAllKey([...pidSet],reslut)
        console.log(reslut);
        let cKey = new Set(checkTreekey);
        console.log(cKey);
        let union = [...new Set([...pidSet,...reslut])];
        console.log(union);
        let pidMinusKey = new Set([...union].filter(x => !cKey.has(x)));
         console.log(pidMinusKey);
        //将未被选中的上级节点，放到相应的节点中。
        if(pidMinusKey.size > 0){
          checkkey = (checkTreekey.concat([...pidMinusKey])).join();//获取所有选中行的id组成的字符串，以逗号分隔
        }else{
          checkkey = checkTreekey.join();//获取所有选中行的id组成的字符串，以逗号分隔
        }
        console.log(checkkey);
        _this.$api.post(_this.$apis.permission + "/rest/permission/functionlist/updatefunclistfunc", {'checknote':checkkey,'functionListId':_this.curfunctionlist}, function (res) {
          if (res.success == true) {
            _this.$message({
              message: '功能授权成功',
              type: 'success'
            });
            _this.setFunctiontree = false;
            //_this.search();
          } else {
            _this.$message({
              message: '功能授权失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      handleSelectionChange(val){
        this.sels = val;
      },
      add(formName,title) {
        let _this = this;
        _this.showmodel = true;
        _this.titlename = title;
        _this.disflag.click=1;
        _this.resetForm(formName);
        _this.operatorForm.userName = _this.userName;
        _this.operatorForm.organId = _this.organId;
        _this.operatorForm.organName = _this.organName;
        _this.operatorForm.userName = _this.userName;
      },
      resetForm(formName) {
        let _this = this;
        if (_this.$refs[formName] !== undefined) {
          _this.$refs[formName].resetFields();
        }
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
            _this.$api.post(_this.$apis.permission + "/rest/permission/functionlist", para, function (res) {
              if (res.success == true) {
                _this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                _this.showmodel = false;
                _this.resetForm(formName);
                _this.resetForm('queryForm');
                _this.search();
              } else {
                _this.$message({
                  message: '保存失败,' + res.errorMsg,
                  showClose:true,
            type: 'error'
                });
              }
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
            // _this.operatorForm.jgjcDm = _this.operatorForm.jgjcDm.join();
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
            _this.$api.put(_this.$apis.permission + "/rest/permission/functionlist", para, function (res) {
              if (res.success == true) {
                _this.$message({
                  message: '更新成功',
                  type: 'success'
                });
                _this.showmodel = false;
                _this.resetForm(formName);
                _this.resetForm('queryForm');
                _this.search();
              } else {
                _this.$message({
                  message: '更新失败,' + res.errorMsg,
                  showClose:true,
            type: 'error'
                });
              }
            })
          } else {
            _this.disflag.click=1;
            return false;
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
      queryById(id,title) {
        let _this = this;
        _this.showmodel = true;
        _this.titlename = title;
        _this.disflag.click=1;
        _this.resetForm('operatorForm');
        _this.$api.get(_this.$apis.permission + "/rest/permission/functionlist/" + id, {}, function (res) {
          if (res.success == true) {
            let data = res.data;
            _this.operatorForm.functionListName = data.functionListName;
            _this.operatorForm.functionListId = data.functionListId;
            _this.operatorForm.functionListDescription = data.functionListDescription;
            if(data.jgjcDm!==null && data.jgjcDm!==undefined && data.jgjcDm!==''){//新增的条件判断
              _this.operatorForm.jgjcDm=data.jgjcDm.split(",");
            }
            _this.operatorForm.functionListTypeId = data.functionListTypeId;
            _this.operatorForm.functionListTypeCode = data.functionListTypeCode;
            _this.operatorForm.valid = data.valid;
            _this.operatorForm.valid = data.valid;
            _this.operatorForm.userName = data.userName;
            _this.operatorForm.organName = data.organName;
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      delGroup(){
        var _this = this;
        //功能集删除后，以下信息也会一并删除：<br><font color='red'>* 岗位功能集</font><br><font color='red'>* 功能集系统功能</font><br>
        _this.$confirm("功能集删除后，以下信息也会一并删除：<br><font color='red'>* 岗位功能集</font><br><font color='red'>* 功能集系统功能</font><br>确认删除该记录吗？", '提示', {
          type: 'warning',
          cancelButtonClass: 'btn-custom-cancel',
          dangerouslyUseHTMLString: true
        }).then(() => {
          var ids = _this.sels.map(item => item.functionListId).join(); //获取所有选中行的id组成的字符串，以逗号分隔
          let para = Object.assign({}, {});
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
          _this.$api.delete(_this.$apis.permission + "/rest/permission/functionlist/" + ids, para, function(res) {
            if(res.success == true) {
              _this.$message({
                message: '批量删除成功',
                type: 'success'
              });
              _this.search();
            } else {
              _this.$message({
                message: '批量删除失败,' + res.errorMsg,
                showClose:true,
            type: 'error'
              });
            }
          })
        }).catch(() => {})
      },
      delById(id) {
        let _this = this;
        _this.$confirm('功能集删除后，以下信息也会一并删除：岗位功能集、功能集系统功能，确认删除该记录吗？', '提示', {
          type: 'warning',
          cancelButtonClass: 'btn-custom-cancel'
        }).then(() => {
          _this.$api.delete(_this.$apis.permission + "/rest/permission/functionlist/" + id, {}, function (res) {
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
      renderContent(h, { node, data, store }) {
        if(data.id != undefined){
          if(data.isParent=='false'){
            return (
              <span>
              <span class="tree-tit">
              <i class="file-text"></i>
              <span class="el-tree-node__label">{node.label}</span>
            </span>
              </span>);
          }else{
            return (
              <span>
              <span class="tree-tit">
              <i class="file-close"></i>
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

      }
    }
  }
</script>