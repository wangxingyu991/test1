<template>
  <div>
    <frameleftright>
      <div slot="left">
          <div class="tree-wrap">
              <div class="tree-body">
                  <el-tree  v-loading = "organtreeload"  :load="loadNode" lazy :props="defaultProps"
                  @node-click="handleNodeClick" node-key = "id" :default-expanded-keys="treeExpand"
                 highlight-current :default-expand-all="false"></el-tree>
              </div>
          </div>
      </div>
      <div slot="right" v-if="formshow==1">
        <div class="rh-page-header">
            <div class="rh-head-and-operate">
                <div class="tips-content">
                    <span class="rh-helpTip-text">机构岗位设置</span>
                </div>
            </div>
        </div>
        <div class="rh-page-content">
          <div class="rh-operate clearfix">
            <div class="rh-pull-left">
                <el-button  type="primary" @click="add">新 增</el-button>
                <el-button  type="primary" @click="delGroup">批量删除</el-button>
            </div>
            <div class="rh-pull-right">
              <el-form :model="queryForm" ref="queryForm" :inline="true" label-width="0px" label-position="right">
                <el-form-item prop="postId">
                  <el-input v-model="queryForm.postId" placeholder="请输入岗位代码"></el-input>
                </el-form-item>
                <el-form-item prop="postName">
                  <el-input v-model="queryForm.postName" placeholder="请输入岗位名称"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button icon="el-icon-search"  type="primary" @click="search"></el-button>
                  <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="rh-table">
              <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange" v-loading = "tablelaoding">
                <template slot="empty">
                  <div class="pic_nodata"></div>
                </template>
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column  align="center" prop="postId" label="岗位代码"></el-table-column>
                <el-table-column align="left" prop="postName" label="岗位名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center" prop="valid" label="有效标志"></el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button class="table_btn" type="text" @click="delPost(scope.row.postId,'删除')">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="rh-pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.tableData.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="this.tableData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="this.tableData.total"></el-pagination>
              </div>
          </div>
        </div>
         <el-dialog title="机构岗位维护" :visible.sync="showmodel"  width="70%" append-to-body>
            <el-form label-width="60px" label-position="right">
              <el-row>
                <el-col :span="24" >
                  <el-form-item label="岗位分类" prop="postName">
                    <el-select v-model="posttypevalue" placeholder="请选择" @change="showPost(currentorganid)">
                      <el-option
                        v-for="item in optionposttype"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row> 
            </el-form>
            <el-transfer
              filterable
              :filter-method="filterMethod"
              filter-placeholder="请输入岗位名称"
              v-model="yszpostvalue"
              :props="{ key: 'postId', label: 'postName' }"
              :titles="['当前机关待添加岗位', '当前机关已添加岗位']"
              :data="datapost"
              @change="handleChange">
            </el-transfer>
        </el-dialog>
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
    name: "organpost",
    data() {
      return {
        queryForm: {
          organId:'',
          organCode:'',
          postId:'',
          postName:'',
          pageNo: 1,
          pageSize: 10
        },
        treeData: [],
        yglznTree:[],
        showygltree:false,
        tablelaoding:false,
        treeExpand:[],
        defaultProps: {
          children: 'children',
          label: 'organName',
          isLeaf:'isParent'
        },
        tableData:[
        ],
        showmodel:false,
        optionposttype:[],
        optionzn:[],
        currentorgancode:'',
        currentorganid:'',
        currentgwdm:'',
        currentgwxh:'',
        posttypevalue:'',
        znvalue:'',
        sels:[],
        formshow:0,
        datapost: [],
        yszpostvalue: [],
        defaultCheck:[],
        znTreeData:[],
        showpage:false,
        pagetitle:'',
        tabtitle:'',
        organtreeload:true,
        zntreeload:false
      }
    },
    created() {
      this.getdmlist();
    },
    mounted() {
    },
    methods: {
      getTree() {
        this.treeData=[];
        let _this = this;
        _this.organtreeload = true;
        _this.$api.get(_this.$apis.permission + "/rest/permission/organmanage/tree", {}, function (res) {
          if (res.success == true) {
            _this.treeData = res.data;
            _this.organtreeload = false;
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
        _this.organtreeload=true;
        if (node.level == 0) {
          _this.$api.get(_this.$apis.permission + "/rest/permission/organmanage/treerooteffect", {}, function (res) {
            _this.organtreeload = false;
            resolve(res.data);
            _this.treeExpand = [];
            _this.treeExpand.push(res.data[0].id);
            _this.formshow = 1;
            _this.queryForm.organCode = res.data[0].organCode;
            _this.queryForm.organId = res.data[0].organId;
            _this.currentorgancode = res.data[0].organCode;
            _this.currentorganid = res.data[0].organId;
            _this.search();
            return ;
          });
        }
        if (node.level >= 1) {
          _this.$api.get(_this.$apis.permission + "/rest/permission/organmanage/treechildeffect/"+node.data.organCode, {}, function (res) {
            let list = res.data;
            for(let i = 0;i < list.length;i++){
              list[i].isParent=list[i].isParent=='true'?true:false;
            }
            _this.organtreeload = false;
            return resolve(list);
          });
        }
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
        _this.$api.post(_this.$apis.permission + "/rest/permission/organpost/plist", queryForm, function (res) {
          _this.tablelaoding = false;
          if (res.success == true) {
            _this.tableData = res.data;
            let list = _this.tableData.records;
            for(let i = 0; i < list.length; i++) {
              if (list[i].valid == 'Y') {
                list[i].valid = "有效";
              } else {
                list[i].valid = "无效";
              }
            }
            _this.tableData.records = list;
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
        _this.$api.get(_this.$apis.permission +"/rest/permission/organpost/getdmlist", {}, function (res) {
          if (res.success == true) {
            // let zn = res.data.zn;
            // zn.unshift({'dm':'','mc':'请选择职能'});
            let posttypelist = res.data.posttype;
            posttypelist.unshift({'dm':'','mc':'请选择岗位'});
            _this.optionposttype = posttypelist;
            // _this.optionzn = zn;
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
      yglzns(val){
        let _this = this;
        _this.showygltree = true;
        _this.currentgwxh = val.gwxh;
        _this.znvalue = '';
        _this.yglznTree = [];
        _this.pagetitle = val.postName + " - - 已关联职能树";
      },
      showPost(val){
        let _this = this;
        _this.datapost=[];
        _this.yszpostvalue = [];
        _this.$api.post(this.$apis.permission+"/rest/permission/organpost/postinfo", {'organId':val,'postTypeId':_this.posttypevalue}, function (res) {
          if (res.success == true) {
            _this.datapost = res.data.allpost;
            console.log( res.data.allpost);
            let linked = res.data.linkedpost;
            for(let i = 0; i < linked.length; i++){
              _this.yszpostvalue.push(linked[i].postId);
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
        return item.postName.indexOf(query) > -1;
      },
      //value 为右边值，左右标志，移动的key
      handleChange(value, direction, movedKeys) {
        if(direction=='right'){//add
          this.saveGw(movedKeys)
        }else{//del
          this.delPost(movedKeys.join(),'取消关联');
        }
        //console.log(value, direction, movedKeys);
      },
      saveGw(val){
        let _this = this;
        var params = {
          'organId':_this.currentorganid,
          'organCode':_this.currentorgancode,
          'postId':val.join()
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
        _this.$api.post(this.$apis.permission+"/rest/permission/organpost/savepost",params,function (res) {
          if(res.success == true) {
            _this.$message({
              message: '关联成功',
              type: 'success'
            });
            _this.queryForm.pageNo = 1;
            _this.search();
          } else {
            _this.$message({
              message: '关联失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      delPost(val,message){
        let _this = this;
        _this.$api.post(this.$apis.permission+"/rest/permission/organpost/delpost",{'organId':_this.currentorganid,'postId':val},function (res) {
          if(res.success == true) {
            _this.$message({
              message: message+'成功',
              type: 'success'
            });
            _this.queryForm.pageNo = 1;
            _this.search();
          } else {
            _this.$message({
              message: message+'失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      delGroup(){
        let _this = this;
        if(_this.sels.length > 0){
          _this.$confirm('是否批量删除？', '提示', {
            type: 'warning',
            cancelButtonClass: 'btn-custom-cancel',
            dangerouslyUseHTMLString: true
          }).then(() => {
            let ids = _this.sels.map(item => item.postId).join(); //获取所有选中行的id组成的字符串，以逗号分隔
            _this.delPost(ids,'批量删除')
          }).catch(() => {})
        }else{
           _this.$message({
              message: '请选择删除数据',
              showClose:true,
            type: 'error'
            });
        }
      },
      handleSelectionChange(val){
        this.sels = val;
      },
      add() {
        let _this = this;
        _this.showmodel = true;
        _this.showPost(_this.currentorganid);
      },
      handleNodeClick(data) {
        let _this = this;
        _this.$refs['queryForm']!=undefined? _this.$refs['queryForm'].resetFields():1
        if(data.id!=undefined && data.id !=null && data.id !=''){
          _this.formshow = 1;
          _this.queryForm.organCode = data.organCode;
          _this.queryForm.organId = data.organId;
          _this.currentorgancode = data.organCode;
          _this.currentorganid = data.organId;
          _this.search();
        }else{
          _this.formshow = 0;
        }
      } ,
      //重置
      resetForm(formName) {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        }
      }
    }
  }
</script>