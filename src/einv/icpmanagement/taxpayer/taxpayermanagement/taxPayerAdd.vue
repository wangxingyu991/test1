
<template>
  <div class="drawer-wrap">
      <div class="rh-drawer-head">
          <div class="drawer-title">新增纳税人信息</div>
      </div>
      <el-row style="text-align:center">
            <div class="tabs-wrap" >
                  <el-tabs v-model="activeName" @tab-click="handleClick" class="rh-tabs" size="mini" onkeydown="if(event.keyCode==9){event.returnValue=false;} ">
                      <el-tab-pane label="纳税人信息" name="first">
                        <div>
                      <el-form :model="add_Form" :rules="rules" ref="add_Form" label-width="100px" label-position="right">
                          <div class="rh-dialog-body"> 
                          
                              <el-row>
                                  <el-col :span ="10" :offset="1">
                                      <el-form-item label="组织机构" prop="zzjgDm">
                                          <el-input v-model="add_Form.zzjgMc" placeholder="请选择组织机构" maxlength="120"   :readonly="true"></el-input> 
                                          <el-input v-model="add_Form.zzjgDm" placeholder=""  v-show="false"  maxlength="120" ></el-input>   
                                        </el-form-item> 
                                  </el-col >
                                  <el-col :span = "10" :offset="1">
                                      <el-form-item label="纳税人名称" prop="nsrmc">
                                          <el-input v-model.trim="add_Form.nsrmc" placeholder="纳税人名称" maxlength="120"></el-input>   
                                      </el-form-item>
                                  </el-col>
                                  
                              </el-row>
                              <el-row>
                                <el-col :span ="10" :offset="1">
                                    <el-form-item label="纳税人识别号" prop="nsrsbh">
                                      <el-input v-model="add_Form.nsrsbh" onkeyup="value=value.replace(/[^A-Z0-9]/g,'')"  placeholder="纳税人识别号" maxlength="20"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span ="10" :offset="1">
                                    <el-form-item label="所属省份" prop="sf">
                                              <el-select v-model="add_Form.sf" placeholder="请选择省份">
                                                  <el-option 
                                                  v-for="item in NsrsfList" 
                                                  :key="item.sfdm" 
                                                  :label="item.sf"
                                                  :value="item.sf">
                                                  </el-option>
                                              </el-select>
                                      </el-form-item>
                              </el-col> 
                              </el-row>
                              <el-row>
                                      <el-col :span ="10" :offset="1">
                                          <el-form-item label="有效标志" prop="yxbz">
                                            <el-select v-model="add_Form.yxbz">
                                              <el-option label="有效" value="Y"></el-option>
                                              <el-option label="无效" value="N"></el-option>
                                            </el-select>
                                          </el-form-item>
                                      </el-col>
                                      <el-col :span ="10" :offset="1">
                                        <el-form-item label="纳税人状态" prop="nsrztDm">
                                          <el-select v-model= "add_Form.nsrztDm" placeholder="请选择纳税人状态">
                                            <el-option 
                                            v-for="itemZt in NsrztList" 
                                            :key="itemZt.index" 
                                            :label="itemZt.nsrztMc"
                                            :value="itemZt.nsrztDm">
                                            </el-option>
                                          </el-select>
                                        </el-form-item>
                                    </el-col>
                            </el-row>
                          <el-row>
                            <el-col :span ="10" :offset="1">
                                <el-form-item label="是否发送短信" prop="sffsDx">
                                  <el-select v-model="add_Form.sffsDx">
                                    <el-option label="不发送" value="N"></el-option>
                                    <el-option label="发送" value="Y"></el-option>
                                  </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span ="10" :offset="1">
                              <el-form-item label="是否发送邮件" prop="sffsYj">
                                  <el-select v-model="add_Form.sffsYj">
                                    <el-option label="不发送" value="N"></el-option>
                                    <el-option label="发送" value="Y"></el-option>
                                  </el-select>
                                </el-form-item>
                            </el-col>
                          </el-row> 
                        <el-row>
                            <el-col :span ="10" :offset="1">
                              <el-form-item label="电子邮件" prop="dzyj">
                                  <el-input v-model="add_Form.dzyj" placeholder="电子邮件" maxlength="120"></el-input>   
                              </el-form-item>
                          </el-col>
                            <el-col :span ="10" :offset="1">
                              <el-form-item label="" prop="">
                                <el-button v-on:click="searchWrap=!searchWrap">更多信息
                                      <i class="el-icon-arrow-down" v-show="!searchWrap"></i>
                                      <i class="el-icon-arrow-up" v-show="searchWrap"></i>
                                </el-button>
                              </el-form-item>
                          </el-col>
                        </el-row>

                      </div>
                      <div class="rh-search-wrap" v-show= "searchWrap">
                          
                            <el-row>
                              <el-col :span ="10" :offset="1">
                                <el-form-item label="生产经营地址" prop="scjydz">
                                    <el-input v-model="add_Form.scjydz" placeholder="生产经营地址" maxlength="120"></el-input>
                                </el-form-item>
                              </el-col>
                            <el-col :span ="10" :offset="1">
                                <el-form-item label="税务注册地址" prop="swzcDz">
                                  <el-input v-model="add_Form.swzcDz" placeholder="税务注册地址" maxlength="11"></el-input>
                                </el-form-item>
                            </el-col>
                            </el-row> 
                            <el-row>
                              <el-col :span ="10" :offset="1">
                                <el-form-item label="经办人手机号码" prop="sjhm">
                                    <el-input v-model="add_Form.sjhm" placeholder="经办人手机号码" maxlength="11"></el-input>
                                </el-form-item>
                              </el-col>
                            <el-col :span ="10" :offset="1">
                                <el-form-item label="办税人名称" prop="bsrmc">
                                  <el-input v-model="add_Form.bsrmc" placeholder="办税人名称" maxlength="11"></el-input>
                                </el-form-item>
                            </el-col>
                            </el-row> 
                            <el-row>
                              <el-col :span ="10" :offset="1">
                                  <el-form-item label="开票模式" prop="kpms">
                                    <el-select v-model="add_Form.kpms">
                                      <el-option label="同步开票" value="1"></el-option>
                                      <el-option label="异步开票" value="2"></el-option>
                                    </el-select>
                                  </el-form-item>
                              </el-col>
                            <el-col :span ="10" :offset="1">
                                <el-form-item label="建设类型" prop="jslx">
                                    <el-select v-model="add_Form.jslx">
                                      <el-option label="使用自建平台" value="0"></el-option>
                                      <el-option label="使用第三方平台" value="1"></el-option>
                                    </el-select>
                                  </el-form-item>
                            </el-col>
                            </el-row>  
                            <el-row>
                              <el-col :span ="10" :offset="1">
                                  <el-form-item label="数据来源" prop="sjly">
                                    <el-select v-model="add_Form.sjly">
                                      <el-option label="入驻" value="1"></el-option>
                                      <el-option label="租户管理员维护" value="2"></el-option>
                                    </el-select>
                                  </el-form-item>
                              </el-col>
                              <el-col :span ="10" :offset="1">
                                  <el-form-item label="是否达起征点" prop="qzdBz">
                                      <el-select v-model="add_Form.qzdBz">
                                        <el-option label="是" value="Y" ></el-option>
                                        <el-option label="否" value="N"></el-option>
                                      </el-select>
                                    </el-form-item>
                              </el-col>
                              </el-row>
                              
                              </div>
                        
                                </el-form>
                          </div>

                        </el-tab-pane>
                        <el-tab-pane label="销售方地址电话" name="second">
                          <div class="rh_buyer_left">
                               <el-button type="primary"  @click="isDialogShow=true">新增</el-button>
                          </div>
                        
                                  <el-table
                                  border
                                  max-height ="250"
                                  style="width:100%"
                                  :data="dzdhTable"
                                   >
                                  <el-table-column
                                        label="序号"
                                        width="50px"
                                        align="center">
                                    <template slot-scope="scope">
                                        {{scope.$index+1}}
                                    </template>
                                </el-table-column>
                                  <el-table-column  show-overflow-tooltip prop="nsrDz"   align="center" label="销售方地址">  
                                        <template   slot-scope="scope">
                                          <!-- <el-input style="display:none"  placeholder="请输入地址" @blur="hideInput($event,scope.row)" v-model="scope.row.nsrDz"></el-input> 
                                          <div class="inputText" style="display:block" @click="showInput($event,scope.row)">{{ scope.row.nsrDz }}</div> -->
                                          <div class="inputText" style="display:block" >{{ scope.row.nsrDz }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="nsrDh"   align="center" label="销售方电话">  
                                        <template   slot-scope="scope">
                                          <!-- <el-input style="display:none"  placeholder="请输入电话" @blur="hideInput($event,scope.row)" v-model="scope.row.nsrDh"></el-input>
                                          <div class="inputText" style="display:block" @click="showInput($event,scope.row)">{{ scope.row.nsrDh }}</div> -->
                                          <div class="inputText" style="display:block" >{{ scope.row.nsrDh }}</div> 
                                        </template>
                                    </el-table-column>
                                    <el-table-column  align="center" label="操作" prop="opreater"  width="130px">
                                        <template  slot-scope="scope">
                                          
                                          <div>
                                            <!-- <el-button  type="text" size="mini" @click="saveRow(scope)">编辑</el-button> -->
                                            <el-button  type="text" size="mini" @click="deleteRow(scope,dzdhTable)">删除</el-button>
                                          </div> 
                                        </template>
                                      </el-table-column>
                                </el-table>
                           
                        </el-tab-pane>
                        <el-tab-pane label="销售方开户银行及账号" name="third">
                              <div class="rh_buyer_left">
                                <el-button type="primary"  @click="isDialogbankAccount=true">新增</el-button>
                              </div>
                                <el-table
                                  border
                                  max-height ="250"
                                  style="width:100%"
                                  :data="yhzhTable"
                                   >
                                   <el-table-column
                                        label="序号"
                                        width="50px"
                                        align="center">
                                    <template slot-scope="scope">
                                        {{scope.$index+1}}
                                    </template>
                                 </el-table-column>
                                 <el-table-column  show-overflow-tooltip align="center" prop="khhMc" label="销售方开户银行名称">
                                      <template   slot-scope="scope">
                                        <!-- <el-input style="display:none"  placeholder="请输入银行名称" @blur="hideInput($event,scope.row)" v-model="scope.row.khhMc"></el-input>
                                        <div class="inputTextBank" style="display:block" @click="showInput($event,scope.row)">{{ scope.row.khhMc }}</div> -->
                                        <div class="inputTextBank" style="display:block">{{ scope.row.khhMc }}</div>
                                      </template>
                                  </el-table-column>
                                  <el-table-column  align="center" prop="khhZh" label="销售方开户银行账号">
                                      <template   slot-scope="scope">
                                        <!-- <el-input style="display:none"  placeholder="请输入银行账号" @blur="hideInput($event,scope.row)" v-model="scope.row.khhZh"></el-input>
                                        <div class="inputTextBank" style="display:block" @click="showInput($event,scope.row)">{{ scope.row.khhZh }}</div> -->
                                        <div class="inputTextBank" style="display:block">{{ scope.row.khhZh }}</div>
                                      </template>
                                  </el-table-column>
                                  <el-table-column  align="center" label="操作" prop="opreater" width="130px" >
                                      <template  slot-scope="scope">
                                        
                                        <div>
                                          <!-- <el-button  type="text" size="mini" @click="saveyhzhRow(scope)">编辑</el-button> -->
                                          <el-button  type="text" size="mini" @click="deleteyhzhRow(scope,yhzhTable)">删除</el-button>
                                        </div> 
                                      </template>
                                    </el-table-column>
                                </el-table>
                        </el-tab-pane>
                  </el-tabs>
            </div>
      </el-row>
        <div class="rh-dialog-footer" solt="footer">
            <el-button type="primary" @click="add_submit('add_Form')" :loading="loading.loadingList">保存</el-button>
            <el-button @click="close('add_Form_1')">关闭</el-button>
        </div>
          <el-dialog 
            title="新增地址和电话"
            :visible.sync = "isDialogShow"
            width="35%"
           append-to-body
           :before-close="handleClose">
                  <div class="rh-dialog-body">
                        <el-form :model= "dzdhForm" :rules= "rules" ref="dzdhForm" :inline="false" label-width="100px" label-position="right">
                            <el-row>
                                <el-col :span = "20">
                                    <el-form-item label="地址" prop="nsrDz">
                                      <el-input v-model="dzdhForm.nsrDz" placeholder="地址" maxlength="60"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                             <el-row>
                                <el-col :span = "20">
                                      <el-form-item label="电话" prop="nsrDh">
                                          <el-input v-model="dzdhForm.nsrDh" placeholder="电话" maxlength="14"></el-input>
                                      </el-form-item>
                               </el-col> 
                            </el-row>
                        </el-form>
                  </div>
                  <div class="rh-dialog-footer" solt="footer">
                        <el-button @click="cancelAddress()">取消</el-button>
                        <el-button type="primary" @click="Confirm('dzdhForm')" :loading="loading.dzdkList">确定</el-button>
                  </div>
            </el-dialog>
            <el-dialog 
            title="新增开户行名称账号"
            :visible.sync = "isDialogbankAccount"
            width="35%"
           append-to-body
           :before-close="handleCloseBank">
                  <div class="rh-dialog-body">
                        <el-form :model= "yhzhForm" :rules= "rules" ref="yhzhForm" :inline="false" label-width="100px" label-position="right">
                            <el-row>
                                <el-col :span = "20">
                                    <el-form-item label="开户行名称" prop="nsrxxkhhMc">
                                      <el-input v-model="yhzhForm.nsrxxkhhMc" placeholder="开户行名称" maxlength="50"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                             <el-row>
                                <el-col :span = "20">
                                      <el-form-item label="开户行账号" prop="nsrxxkhhZh">
                                          <el-input v-model="yhzhForm.nsrxxkhhZh" placeholder="开户行账号" maxlength="22"></el-input>
                                      </el-form-item>
                               </el-col> 
                            </el-row>
                        </el-form>
                  </div>
                  <div class="rh-dialog-footer" solt="footer">
                        <el-button @click="cancelBank()">取消</el-button>
                        <el-button type="primary" @click="ConfirmBank('yhzhForm')" :loading="loading.dzdkList">确定</el-button>
                  </div>
            </el-dialog>
            <!--组织机构树-->
            <el-dialog 
            title="组织机构"
            :visible.sync = "isDialogZzjgShow"
            width="30%"
           append-to-body
           :before-close="handleClosetree">
           <div class="rh-zzjg">
                  <div class="rh-zzjgtree">
                       <div class="tree-wrap">
                        <div class="tree-body">
                        <el-tree ref="tree"
                         v-loading="treeload" 
                         element-loading-text="拼命加载中" 
                         :data="treeData" :props="defaultProps" 
                          @node-click="handleNodeClick"
                          :load="loadNode"  
                          :expand-on-click-node="false"
                          lazy  highlight-current>
                        </el-tree>
                          </div>
                      </div>
                  </div>  
            </div>
            
      </el-dialog>
  </div>
  
</template>

<script>
import validate from "@/utils/validate.js";
 export default {
   props: ["addPageData"],
    data(){
     
        let rules = {
            zzjgDm:[{ required: true, message: '请选择组织机构', trigger: 'blur' },],
            nsrmc:[{required: true, message:'请输入纳税人名称',trigger:'blur'},],
            nsrsbh:[{required: true, message:'请输入纳税人税号',trigger:'blur'},
              {validator: function(rule, value, callback) {
                
                if (value.length>=15&&value.length<=20) {
                   callback();
                } else {
                   callback(new Error("税号只能是15到20位"));
                }
              }
              }],
            sf:[{required: true, message:'请选择省份',trigger:'blur'},],
            nsrztDm:[{required: true, message:'请选择纳税人状态',trigger:'blur'},],
            yxbz:[{required: true, message:'请选择有效标识',trigger:'blur'},],
            sffsYj:[{required: true, message:'是否发送邮箱',trigger:'blur'},],
            sffsDx:[{required: true, message:'是否发送短信',trigger:'blur'},],
            dzyj:[{required: true, message:'请输入邮箱号',trigger:'blur'},
               {
                validator: function(rule, value, callback) {
                 const reg =/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if (value != null && value != "" && !reg.test(value)) {
                    callback(new Error("电子邮箱格式错误"));
                } else {
                    callback();
                }
              }
            }],
          sjhm:[{
            validator: function(rule, value, callback) {
                 const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
                if (value != null && value != "" && !reg.test(value)) {
                    callback(new Error("请输入正确的手机号码"));
                } else {
                    callback();
                }
              }
          }],
        nsrxxkhhMc:[{required: true, message:'请输入开户行名称',trigger:'blur'}],
        nsrxxkhhZh:[{required: true, message:'请输入开户行账号',trigger:'blur'},
          {
          validator: function(rule, value, callback) {
                var reg = /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/;
                if (value != null && value != "" && !reg.test(value)) {
                    callback(new Error("请输入正确的银行账号"));
                } else {
                    callback();
                }
              }
        }],
        nsrDz:[{required: true, message:'请输入地址',trigger:'blur'}],
        nsrDh:[{required: true, message:'请输入电话',trigger:'blur'},
             {
             validator: function(rule, value, callback) {
                var reg = /^(0[0-9]{2,3}\-)([2-9][0-9]{4,7})+(\-[0-9]{1,4})?$/;
                 if(value.length==12||value.length==13){
                      if (value != null && value != "" && !reg.test(value)) {
                 
                          callback(new Error("请输入正确的座机号码"));
                        
                      } else {
                          callback();
                      }
                   }else{
                     callback(new Error("请输入正确的座机号码"));
                   }
               
              }
        }]
        }
        return{
           isDialogShow: false,
           isDialogbankAccount:false,
           isDialogZzjgShow:false,
            activeName:'first',
            add_Form: {
                zzjgDm:"",
                zzjgMc:"",
                nsrmc:"",
                nsrsbh:"",
                sf:"",
                nsrztDm: "",
                yxbz:"",
                sffsYj: "",
                sffsDx: "",
                dzyj: "",
                scjydz: "",
                swzcDz: "",
                sjhm: "",
                bsrmc: "",
                kpms: "",
                jslx: "",
                sjly: "",
                qzdBz:"Y",
                dzdh:[],
                yhzh:[],
            },
           dzdhForm:{
             nsrsbh:"",
             nsrmc:"",
             nsrDz: "",
             nsrDh: "",
           },
           yhzhForm:{
              nsrsbh:"",
              nsrmc:"",
              nsrxxkhhZh: "",
              nsrxxkhhMc: "",
           },
           dzdhTable:[],
           yhzhTable:[],
             loading:{
               loadingList:false,
               dzdkList:false,
             },
            rules: rules,
            searchWrap:false,
            NsrztList:[], 
            NsrsfList:[],
            defaultProps: {
            children: 'children',
            label: 'organName',
            isLeaf: 'isParent'
            },
             treeData:[],
             treeload:true,
        }
    },
    mounted() {
      //页面初始化的时候动态获取纳税人状态
      this.init_form();
      //页面初始化的时候动态获取省份
      this.init_sf();
      this.getTreeRoot();
    },
    methods: {
     getTreeRoot() {
        let _this = this;
        _this.treeload=true;
        _this.$api.get(this.$apis.icpmanagement+"/taxpayer/taxpayermanagement/treeroot", {}, function (res) {
            if (res.success == true) {
                _this.treeload = false;
                _this.treeData = res.data;
                
            } else {
                _this.$message({
                   showClose:true,
                    message: '查询失败,' + res.errorMsg,
                    type: 'error'
                });
            }
        })
    },
    loadNode(node, resolve) {
      let _this = this;
      _this.treeload=true;
      if (node.level >= 1) {
        _this.$api.get(this.$apis.icpmanagement+"/taxpayer/taxpayermanagement/getOrganTreeOnlytaxPlayer/"+node.data.organCode, {}, function (res) {
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
      // if(_this.$refs['add_Form'] != undefined){
      //   _this.$refs['add_Form'].resetFields();
      // }
      _this.add_Form.zzjgDm = data.organCode;
      _this.add_Form.zzjgMc = data.organName;
      _this.handleClosetree();
    },
    chooseJg(){
      this.isDialogZzjgShow=true;
       this.getTreeRoot();
    },
    handleClosetree(){
      this.isDialogZzjgShow=false;
    },

    deleteRow(scope, rows) {
                let id=scope.row.id;
                let nsrsbh=this.add_Form.nsrsbh;
                if(undefined!=id){
                    let _this = this;
                    _this.$api.delete(
                    _this.$apis.icpmanagement +
                      "/taxpayer/taxpayermanagement/deleteDzdhId/" +id, {},
                    function (res) {
                      if (res.success) {
                        _this.searchDzdh(nsrsbh);
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
                }else{
                let index=scope.$index;
                rows.splice(index, 1);
                }
            },
       deleteyhzhRow(scope, rows) {
                let id=scope.row.id;
                let nsrsbh=this.add_Form.nsrsbh;
                if(undefined!=id){
                    let _this = this;
                    _this.$api.delete(
                    _this.$apis.icpmanagement +
                      "/taxpayer/taxpayermanagement/deleteYhzhId/" +id, {},
                    function (res) {
                      if (res.success) {
                        _this.searchYhzh(nsrsbh);
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
                }else{
                let index=scope.$index;
                rows.splice(index, 1);
                }
            },
       saveyhzhRow(scope){
         let index=(scope.$index);
              let test=document.getElementsByClassName("inputTextBank");
              for (let i = 0; i < test.length; i++) {
                   if(i==index){
                     test[i].style.display="none";
                     test[i].previousElementSibling.style.display = "block";
                       this.$nextTick(function () {
                      test[i].previousElementSibling.firstElementChild.focus();
                    })
                   }
                
            }
      // let id=scope.row.id;
      // let _this=this;
      // if(id!=undefined){
      //   let nsrmc=this.add_Form.nsrmc;
      //   let nsrsbh=this.add_Form.nsrsbh;
      //   let yxbz=this.add_Form.yxbz;
      //   let khhMczh=scope.row.khhMczh;
      
      //   let pdata={id,nsrmc,nsrsbh,yxbz,khhMczh};
      //   _this.$api.post(
      //             _this.$apis.icpmanagement + "/taxpayer/taxpayermanagement/editNsrxxYhzhRow", pdata,
      //             function (res) {
      //             if (res.success) {
      //                 _this.$message({
      //                 message: "修改成功",
      //                 type: "success",
      //                 });
      //               //修改成功以后刷新
      //               _this.searchYhzh(nsrsbh);
      //             } else {
      //                 _this.$message({
      //                 message: "修改失败," + res.errorMsg,
      //                 type: "error",
      //                 });
      //               }
      //             }
      //         );
      // }
    },
      saveRow(scope){
        let index=(scope.$index);
              let test=document.getElementsByClassName("inputText");
              for (let i = 0; i < test.length; i++) {
                   if(i==index){
                     test[i].style.display="none";
                     test[i].previousElementSibling.style.display = "block";
                       this.$nextTick(function () {
                      test[i].previousElementSibling.firstElementChild.focus();
                    })
                   }
                
            }
      // let id=scope.row.id;
      // let _this=this;
      // if(id!=undefined){
      //   let nsrmc=this.add_Form.nsrmc;
      //   let nsrsbh=this.add_Form.nsrsbh;
      //   let yxbz=this.add_Form.yxbz;
      //   let nsrDzdh=scope.row.nsrDzdh;
      //   let pdata={id,nsrmc,nsrsbh,yxbz,nsrDzdh};
      //   _this.$api.post(
      //             _this.$apis.icpmanagement + "/taxpayer/taxpayermanagement/editNsrxxDzdhRow", pdata,
      //             function (res) {
      //             if (res.success) {
      //                 _this.$message({
      //                 message: "修改成功",
      //                 type: "success",
      //                 });
      //               //保存成功以后刷新
      //               _this.searchDzdh(nsrsbh);
      //             } else {
      //                 _this.$message({
      //                 message: "修改失败," + res.errorMsg,
      //                 type: "error",
      //                 });
      //               }
      //             }
      //         );
      //   }
    },
      showInput(event,row) {
               
              //row.show = true;
              event.srcElement.style.display="none";
              event.srcElement.previousElementSibling.style.display = "block";
              //let $event = event;
                this.$nextTick(function () {
                  event.srcElement.previousElementSibling.firstElementChild.focus();
                  console.log(event.srcElement.previousElementSibling);
                })
                
            },
      hideInput(event,row) {
              event.srcElement.parentElement.style.display="none";
              event.srcElement.parentElement.nextElementSibling.style.display = "block";
            },
    cancelBank(){
       this.$refs.yhzhForm.resetFields();
       this.isDialogbankAccount= false;
    },
    cancelAddress(){
       this.$refs.dzdhForm.resetFields();
       this.isDialogShow= false;
    },
    //点击确定保存银行账号并展示出来
    ConfirmBank(formName){
      let _this=this;
      let nsrsbh=_this.add_Form.nsrsbh;
      let nsrmc=_this.add_Form.nsrmc;
      let yxbz=_this.add_Form.yxbz;
      let khhMc=_this.yhzhForm.nsrxxkhhMc;
      let khhZh=_this.yhzhForm.nsrxxkhhZh;
      //let khhMczh=nsrxxkhhMc+nsrxxkhhZh;
       let params={'khhMc':khhMc,"khhZh":khhZh};
     
       _this.$refs[formName].validate((valid) => {
         if(valid){
            _this.yhzhTable.unshift(params);
            _this.loading.dzdkList=false;
            _this.cancelBank();
         }
      })
      //let params={nsrsbh,nsrmc,yxbz,khhMczh};
      // _this.$refs[formName].validate((valid) => {
      //   if(valid){
      //     _this.loading.dzdkList=true;
      //        this.$api.post(
      //         _this.$apis.icpmanagement +"/taxpayer/taxpayermanagement/insertYhzhRow",params,
      //         function (res) {
      //           if (res.success) {
      //              _this.searchYhzh(nsrsbh); 
      //              _this.$refs.yhzhForm.resetFields();
      //              _this.isDialogbankAccount= false;
      //             _this.loading.dzdkList=false;
      //           } else {
      //             _this.$message({
      //               message: "保存失败," + res.errorMsg,
      //               type: "error",
      //             });
      //             _this.loading.dzdkList=false;
      //           }
      //         }
      //       );  
      //   }
      // })

    },
    //点击确定保存地址电话并展示出来
    Confirm(formName){
      let _this=this;
      let nsrsbh=_this.add_Form.nsrsbh;
      let nsrmc=_this.add_Form.nsrmc;
      // let nsrDzdh=_this.dzdhForm.nsrDz+_this.dzdhForm.nsrDh;
      let nsrDz=_this.dzdhForm.nsrDz;
      let nsrDh=_this.dzdhForm.nsrDh;
      let yxbz=_this.add_Form.yxbz;
      let params={'nsrDz':nsrDz,'nsrDh':nsrDh};
    
      _this.$refs[formName].validate((valid) => {
         if(valid){
            _this.dzdhTable.unshift(params);
            _this.$refs.dzdhForm.resetFields();
            _this.isDialogShow= false;
            _this.loading.dzdkList=false;
         }
      })
      // let params={nsrsbh,nsrmc,yxbz,nsrDzdh};
      
      // _this.$refs[formName].validate((valid) => {
      //   if(valid){ 
      //      _this.loading.dzdkList=true;
      //       this.$api.post(
      //         _this.$apis.icpmanagement +"/taxpayer/taxpayermanagement/insertDzdhRow",params,
      //         function (res) {
      //           if (res.success) {
      //              _this.searchDzdh(nsrsbh); 
      //              _this.$refs.dzdhForm.resetFields();
      //              _this.isDialogShow= false;
      //             _this.loading.dzdkList=false;
      //           } else {
      //             _this.$message({
      //               message: "保存失败," + res.errorMsg,
      //               type: "error",
      //             });
      //             _this.loading.dzdkList=false;
      //           }
      //         }
      //       );  
      //    }
      //   })
    },
     searchYhzh(nsrsbh){
      let _this = this;
      this.$api.get(
        _this.$apis.icpmanagement +"/taxpayer/taxpayermanagement/getTaxPayeryhzh/"+nsrsbh,{},
        function (res) {
          if (res.success) {
             let list=res.data;
            //  //对数据进行解析处理
            // for (let i = 0; i < list.length; i++) {
            //    //日期解析
            //      list[i].opreater="删除";
            //      list[i].opreater1="保存";
            // }
            _this.yhzhTable=list;
          } else {
            _this.$message({
               showClose:true,
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );  
    },
    searchDzdh(nsrsbh){
      let _this = this;
      this.$api.get(
        _this.$apis.icpmanagement +"/taxpayer/taxpayermanagement/getTaxPayerdzdh/"+nsrsbh,{},
        function (res) {
          if (res.success) {
             _this.dzdhTable= res.data; 
          } else {
            _this.$message({
               showClose:true,
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );   
    },
    handleClose(){
         this.$refs.dzdhForm.resetFields();
         this.isDialogShow= false;
         this.isDialogbankAccount=false;
    },
    handleCloseBank(){
         this.$refs.yhzhForm.resetFields();
         this.isDialogbankAccount=false;
    },
    handleClick:function(tab,event){
                console.log(tab,event);
                let _this=this;
               if(tab.index==1||tab.index==2){
                  _this.$refs['add_Form'].validate((valid) => {
                      if(valid){
                          event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.transform="translateX("+tab.index*(-100)+"%)";
                      }else{
                        _this.$message({
                           showClose:true,
                            message: "请先完善纳税人信息再进行下面操作",
                            type: "warning",
                          });
                      }
                  })    
               }else{
                     event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.transform="translateX("+tab.index*(-100)+"%)";
               }
          },
    init_sf(){
      let _this = this;
      let params = this.add_Form;
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
      this.$api.post(
        _this.$apis.icpmanagement +"/taxpayer/taxpayermanagement/NsrSf",params,
        function (res) {
          if (res.success) {
             _this.NsrsfList= res.data; 
          } else {
            _this.$message({
               showClose:true,
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );  
    },
    init_form(){
      let _this = this;
      _this.add_Form.zzjgMc =  _this.addPageData.zzjgMc;
      _this.add_Form.zzjgDm =  _this.addPageData.zzjgDm;
      let params = _this.add_Form;
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
      _this.$api.post(
        _this.$apis.icpmanagement +"/taxpayer/taxpayermanagement/NsrztList",params,
        function (res) {
          if (res.success) {
             _this.NsrztList= res.data; 
          } else {
            _this.$message({
               showClose:true,
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );   

    },
       //关闭
        close(formName) {
      
        if (this.$refs[formName] !== undefined) {
            this.$refs[formName].resetFields();
        }
       // this.deleteDzdhAndYhzh();
         this.dzdhTable.splice(0,1);
         this.yhzhTable.splice(0,1);
        //关闭抽屉
        if(formName=='add_Form_1'){
            this.$emit("back",1);
        }else{
            this.$emit("back",2);
        }
       
        },
    deleteDzdhAndYhzh(){
      let _this=this;
      let nsrsbh=_this.add_Form.nsrsbh;
       this.$api.delete(
        _this.$apis.icpmanagement +"/taxpayer/taxpayermanagement/deleteDzdhAndYhzh/"+nsrsbh,{},
        function (res) {
          
        }
      );   
    },
         //表单提交
    add_submit(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
           _this.add_Form.dzdh=_this.dzdhTable;
           _this.add_Form.yhzh=_this.yhzhTable;
           let editParams = _this.add_Form;
           let para = editParams;
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
           _this.loading.loadingList=true;
              _this.$api.post(
                _this.$apis.icpmanagement + "/taxpayer/taxpayermanagement/saveTaxPayerInfo", para,
                function (res) {
                if (res.success) {
                    let list=res.data;
                    if(list.count>0){
                        _this.$message({
                         showClose:true,
                        message: "该纳税人信息已经存在！！",
                        type: "warning",
                        });
                      _this.loading.loadingList=false;
                    }else{
                      _this.$message({
                         showClose:true,
                        message: "保存成功",
                        type: "success",
                        });
                    //关闭抽屉
                      _this.loading.loadingList=false;
                      let zzjgDm=_this.add_Form.zzjgDm
                      _this.close(formName);
                    }
                    
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
       });
    }

       
    }
}
</script>

<style scoped>
    .rh_buyer_left{float:none; text-align: left;  margin-bottom: 10px;}
    .el-tabs__content{
            overflow: inherit;
      }
    .tabs-wrap{
            
            margin-left:20px;
            width:95%;
            overflow: hidden;
      }
    .drawer-title{
        width:100%;
        height:20px;
        font-size: 18px;
        margin-left:-10px; 
    }
.rh-zzjg {
  width: 100%;
  height: 285px;
  overflow: auto;
  margin-bottom: 25px;
  border: 1px solid #BFBFBF;
}
</style>