<template>
 <div class="drawer-wrap">
     <div class="rh-drawer-head">
          <div class="drawer-title">修改纳税人信息</div>
      </div>
      <el-row style="text-align:center">
         <div class="tabs-wrap">
                  <el-tabs v-model="activeName" @tab-click="handleClick" class="rh-tabs" size="mini" onkeydown="if(event.keyCode==9){event.returnValue=false;} ">
                        <el-tab-pane label="纳税人信息" name="first">
                        <div>
                          <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" label-position="right">
                              <div class="rh-dialog-body"> 
                              
                                  <el-row>
                                      <el-col :span ="10" :offset="1">
                                          <el-form-item label="组织机构" prop="zzjgDm">
                                            
                                              <!-- <el-select class="rh-button-primary"  v-model= "editForm.zzjgDm" placeholder="请选择组织机构" @click.native="chooseJg()" ref="selectInput">
                                              <el-option 
                                              :label="editForm.zzjgMc"
                                              :value="editForm.zzjgDm">
                                              </el-option>
                                              </el-select> -->
                                               <el-input v-model="editForm.zzjgMc" placeholder="请选择组织机构" maxlength="120"   :readonly="true"></el-input> 
                                               <el-input v-model="editForm.zzjgDm" placeholder=""  v-show="false"  maxlength="120" ></el-input>   
                                            </el-form-item> 
                                      </el-col>
                                      <el-col :span ="10" :offset="1">
                                          <el-form-item label="纳税人名称" prop="nsrmc">
                                              <el-input v-model.trim="editForm.nsrmc" placeholder="纳税人名称" maxlength="120"></el-input>   
                                          </el-form-item>
                                      </el-col>
                                      
                                  </el-row>
                                  <el-row>
                                    <el-col :span ="10" :offset="1">
                                        <el-form-item label="纳税人识别号" prop="nsrsbh">
                                          <el-input v-model="editForm.nsrsbh" onkeyup="value=value.replace(/[^A-Z0-9]/g,'')"  :readonly="true"  :disabled= "true" placeholder="纳税人识别号" maxlength="20"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span ="10" :offset="1">
                                        <el-form-item label="所属省份" prop="sf">
                                                  <el-select v-model="editForm.sf" placeholder="请选择省份">
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
                                                <el-select v-model="editForm.yxbz">
                                                  <el-option label="有效" value="Y"></el-option>
                                                  <el-option label="无效" value="N"></el-option>
                                                </el-select>
                                              </el-form-item>
                                          </el-col>
                                          <el-col :span ="10" :offset="1">
                                            <el-form-item label="纳税人状态" prop="nsrztDm">
                                              <el-select v-model= "editForm.nsrztDm" placeholder="请选择纳税人状态">
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
                                      <el-select v-model="editForm.sffsDx">
                                        <el-option label="不发送" value="N"></el-option>
                                        <el-option label="发送" value="Y"></el-option>
                                      </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span ="10" :offset="1">
                                  <el-form-item label="是否发送邮件" prop="sffsYj">
                                      <el-select v-model="editForm.sffsYj">
                                        <el-option label="不发送" value="N"></el-option>
                                        <el-option label="发送" value="Y"></el-option>
                                      </el-select>
                                    </el-form-item>
                                </el-col>
                              </el-row> 
                            <el-row>
                                <el-col :span ="10" :offset="1">
                                  <el-form-item label="电子邮件" prop="dzyj">
                                      <el-input v-model="editForm.dzyj" placeholder="电子邮件" maxlength="120"></el-input>   
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
                                        <el-input v-model="editForm.scjydz" placeholder="生产经营地址" maxlength="120"></el-input>
                                    </el-form-item>
                                  </el-col>
                                <el-col :span ="10" :offset="1">
                                    <el-form-item label="税务注册地址" prop="swzcDz">
                                      <el-input v-model="editForm.swzcDz" placeholder="税务注册地址" maxlength="11"></el-input>
                                    </el-form-item>
                                </el-col>
                                </el-row> 
                                <el-row>
                                  <el-col :span ="10" :offset="1">
                                    <el-form-item label="经办人手机号码" prop="sjhm">
                                        <el-input v-model="editForm.sjhm" placeholder="经办人手机号码" maxlength="11"></el-input>
                                    </el-form-item>
                                  </el-col>
                                  <el-col :span ="10" :offset="1">
                                      <el-form-item label="办税人名称" prop="bsrmc">
                                        <el-input v-model="editForm.bsrmc" placeholder="办税人名称" maxlength="11"></el-input>
                                      </el-form-item>
                                  </el-col>
                                </el-row> 
                                <el-row>
                                  <el-col :span ="10" :offset="1">
                                      <el-form-item label="开票模式" prop="kpms">
                                        <el-select v-model="editForm.kpms">
                                          <el-option label="同步开票" value="1"></el-option>
                                          <el-option label="异步开票" value="2"></el-option>
                                        </el-select>
                                      </el-form-item>
                                  </el-col>
                                <el-col :span ="10" :offset="1">
                                    <el-form-item label="建设类型" prop="jslx">
                                        <el-select v-model="editForm.jslx">
                                          <el-option label="使用自建平台" value="0"></el-option>
                                          <el-option label="使用第三方平台" value="1"></el-option>
                                        </el-select>
                                      </el-form-item>
                                </el-col>
                                </el-row>  
                                <el-row>
                                  <el-col :span ="10" :offset="1">
                                      <el-form-item label="数据来源" prop="sjly">
                                        <el-select v-model="editForm.sjly">
                                          <el-option label="入驻" value="1"></el-option>
                                          <el-option label="租户管理员维护" value="2"></el-option>
                                        </el-select>
                                      </el-form-item>
                                  </el-col>
                                <el-col :span ="10" :offset="1">
                                    <el-form-item label="是否达起征点" prop="qzdBz">
                                        <el-select v-model="editForm.qzdBz">
                                          <el-option label="是" value="Y" ></el-option>
                                          <el-option label="否" value="N"></el-option>
                                        </el-select>
                                      </el-form-item>
                                </el-col>
                                </el-row>
                                
                              </div>
                            </el-form>
                          </div>
                          <div class="rh-dialog-footer" solt="footer">
                              <el-button type="primary" @click="onSubmit('editForm')" :loading="loading.loadingList">保存</el-button>
                              <el-button @click="close('editForm_1')">关闭</el-button>
                         </div> 
                        </el-tab-pane>
                        <el-tab-pane label="销售方地址电话" name="second">
                            
                          <!-- <div class="address">
                              <div class="rh-page-layout-section"> -->
                                 <div class="rh-addrow">
                                    <el-button type="primary"  @click="isDialogShow=true">新增</el-button>
                                    
                                  </div>
                                  <el-table
                                    border
                                    max-height ="250"
                                    :data="dzdhTable"
                                   v-loading="loadingDzdh">
                                   <el-table-column
                                        label="序号"
                                        width="50px"
                                        align="center">
                                    <template slot-scope="scope">
                                        {{scope.$index+1}}
                                    </template>
                                </el-table-column>
                                  <!-- <el-table-column prop="nsrDzdh"   align="center" label="销售方地址电话">
                                        <template   slot-scope="scope">
                                          <el-input style="display:none"  placeholder="请输入地址电话" @blur="hideInput($event,scope.row)" v-model="scope.row.nsrDzdh"></el-input>
                                           <div class="inputText" style="display:block" @click="showInput($event,scope.row)">{{ scope.row.nsrDzdh }}</div>
                                        </template>
                                    </el-table-column> -->
                                    <el-table-column show-overflow-tooltip prop="nsrDz"   align="center" label="销售方地址">  
                                        <template   slot-scope="scope">
                                          <el-input style="display:none"  placeholder="请输入地址" @blur="hideInput($event,scope.row)" v-model="scope.row.nsrDz" maxlength="60"></el-input>
                                          <div class="inputText" style="display:block" @click="showInput($event,scope.row)">{{ scope.row.nsrDz }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="nsrDh"   align="center" label="销售方电话">  
                                        <template   slot-scope="scope">
                                          <el-input style="display:none"  placeholder="请输入电话" @blur="hideInput($event,scope.row)" v-model="scope.row.nsrDh" maxlength="16"></el-input>
                                          <div class="inputText" style="display:block" @click="showInput($event,scope.row)">{{ scope.row.nsrDh }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  align="center" label="操作" prop="opreater"  width="130px">
                                        <template  slot-scope="scope">
                                          
                                          <div>
                                            <el-button  type="text" size="mini" @click="saveRow(scope)">{{scope.row.opreater1}}</el-button>
                                            <el-button  type="text" size="mini" @click="deleteRow(scope,dzdhTable)">{{scope.row.opreater}}</el-button>
                                             
                                          </div> 
                                        </template>
                                      </el-table-column>
                                  </el-table>
                                     
                                <!-- </div> -->
                            <!-- </div> -->
                             <div class="rh-dialog-footer" solt="footer">
                              <el-button @click="close('editForm')">关闭</el-button>
                             </div>  
                        </el-tab-pane>
                        <el-tab-pane label="销售方开户银行及账号" name="third">
                               <div class="rh-addrow">
                                  <el-button  type="primary" @click="isDialogbankAccount=true">新增</el-button>
                                </div>
                                <el-table
                                  border
                                  max-height ="250"
                                  :data="yhzhTable"
                                  style="width:100%"
                                 v-loading="loadingyhzh">
                                 <el-table-column
                                        label="序号"
                                        width="50px"
                                        align="center">
                                    <template slot-scope="scope">
                                        {{scope.$index+1}}
                                    </template>
                                </el-table-column>
                                  <!-- <el-table-column  align="center" prop="khhMczh" label="销售方开户银行及账号">
                                      <template   slot-scope="scope">
                                        <el-input style="display:none"  placeholder="请输入银行名称和账号" @blur="hideInput($event,scope.row)" v-model="scope.row.khhMczh"></el-input>
                                        <div class="inputText" style="display:block" @click="showInput($event,scope.row)">{{ scope.row.khhMczh }}</div>
                                      </template>
                                  </el-table-column> -->
                                  <el-table-column show-overflow-tooltip align="center" prop="khhMc" label="销售方开户银行名称">
                                      <template   slot-scope="scope">
                                        <el-input style="display:none"  placeholder="请输入银行名称" @blur="hideInput($event,scope.row)" v-model="scope.row.khhMc"></el-input>
                                        <div class="inputText"  style="display:block" @click="showInput($event,scope.row)">{{ scope.row.khhMc }}</div>
                                      </template>
                                  </el-table-column>
                                  <el-table-column  align="center" prop="khhZh" label="销售方开户银行账号">
                                      <template   slot-scope="scope">
                                        <el-input style="display:none"  placeholder="请输入银行账号" @blur="hideInput($event,scope.row)" v-model="scope.row.khhZh" maxlength="22"></el-input>
                                        <div class="inputText" style="display:block" @click="showInput($event,scope.row)">{{ scope.row.khhZh }}</div>
                                      </template>
                                  </el-table-column>
                                  <el-table-column  align="center" label="操作" prop="opreater" width="130px" >
                                      <template  slot-scope="scope">
                                        
                                        <div>
                                          <el-button  type="text" size="mini" @click="saveyhzhRow(scope)">{{scope.row.opreater1}}</el-button>
                                          <el-button  type="text" size="mini" @click="deleteyhzhRow(scope,yhzhTable)">{{scope.row.opreater}}</el-button>
                                        </div> 
                                      </template>
                                    </el-table-column>
                                </el-table>
                          <div class="rh-dialog-footer" solt="footer">
                            <el-button @click="close('editForm')">关闭</el-button>
                          </div> 
                      </el-tab-pane>
                  </el-tabs>
            </div>
       </el-row>
       <!-- <div class="rh-dialog-footer" solt="footer">
                    <el-button type="primary" @click="onSubmit('editForm')" :loading="loading.loadingList">保存</el-button>
                    <el-button @click="close('editForm')">关闭</el-button>
       </div>  -->
       
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
  props: ["updatePageData"],

  data() {
    return {
      isDialogShow: false,
      isDialogbankAccount:false,
      isDialogZzjgShow:false,
      activeName:'first',
      loadingDzdh:false,
      loadingyhzh:false,
      editForm: {
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
                qzdBz: "",
                yhzhid:"",
                nsrxxkhhZh: "",
                nsrxxkhhMc: "",
                dzdhid:"",
                nsrDz: "",
                nsrDh: "",
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
      tishi:{
       flag:false,
      },
      //校验规则
      rules: {
        nsrmc:[{required: true, message:'请输入纳税人名称',trigger:'blur'},],
            nsrsbh:[{required: true, message:'请输入纳税人税号',trigger:'blur'},
              {validator: function(rule, value, callback) {
                
               if (value.length>=15&&value.length<=20) {
                   callback();
                } else {
                   callback(new Error("税号只能是15位到20位"));
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
      },
       flbmList:[],
       dzdhTable:[], 
       yhzhTable:[],
       NsrztList:[], 
       NsrsfList:[], 
       searchWrap:false,
       dzdhWrap:false,
       yhzhWrap:false,
       defaultProps: {
            children: 'children',
            label: 'organName',
            isLeaf: 'isParent'
            },
           treeData:[],
           treeload:true,
    };
  },

  created() {},

  mounted() {
    
     //页面初始化的时候动态获取纳税人状态
    this.init_form();
    //页面初始化的时候动态获取省份
    this.init_sf();
    //根据Id编辑该条信息
    this.getTaxPayerInfoById();
    this.getTreeRoot();
    this.getTaxPayerdzdh();
    this.getTaxPayeryhzh();
   
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
      // if(_this.$refs['editForm'] != undefined){
      //   _this.$refs['editForm'].resetFields();
      // }
      _this.editForm.zzjgDm = data.organCode;
      _this.editForm.zzjgMc = data.organName;
      _this.handleClosetree();
    },
    chooseJg(){
      this.isDialogZzjgShow=true;
      this.getTreeRoot();
    },
    //点击确定保存银行账号并展示出来
    ConfirmBank(formName){
      let _this=this;
      let nsrsbh=_this.editForm.nsrsbh;
      let nsrmc=_this.editForm.nsrmc;
      let yxbz=_this.editForm.yxbz;
      let khhMc=_this.yhzhForm.nsrxxkhhMc;
      let khhZh=_this.yhzhForm.nsrxxkhhZh;
      //let khhMczh=nsrxxkhhMc+nsrxxkhhZh;
        let opreater1="保存";
        let opreater="删除";
       let params={'khhMc':khhMc,"khhZh":khhZh,'opreater1':opreater1,"opreater":opreater,};
     
       _this.$refs[formName].validate((valid) => {
         if(valid){
            _this.yhzhTable.unshift(params);
            _this.loading.dzdkList=false;
            _this.cancelBank();
         }
      })
    },
      cancelBank(){
       this.$refs.yhzhForm.resetFields();
       this.isDialogbankAccount= false;
    },
     //点击确定保存地址电话并展示出来
    Confirm(formName){
      let _this=this;
      let nsrsbh=_this.editForm.nsrsbh;
      let nsrmc=_this.editForm.nsrmc;
      // let nsrDzdh=_this.dzdhForm.nsrDz+_this.dzdhForm.nsrDh;
      let nsrDz=_this.dzdhForm.nsrDz;
      let nsrDh=_this.dzdhForm.nsrDh;
      let yxbz=_this.editForm.yxbz;
      let opreater1="保存";
      let opreater="删除";
      let params={'nsrDz':nsrDz,'nsrDh':nsrDh,'opreater1':opreater1,"opreater":opreater,};
    
      _this.$refs[formName].validate((valid) => {
         if(valid){
            _this.loading.dzdkList=true;
            _this.dzdhTable.unshift(params);
            _this.$refs.dzdhForm.resetFields();
            _this.isDialogShow= false;
            _this.loading.dzdkList=false;
         }
      })
    },
     cancelAddress(){
       this.$refs.dzdhForm.resetFields();
       this.isDialogShow= false;
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
     handleClosetree(){
      this.isDialogZzjgShow=false;
    },
     handleClick:function(tab,event){
                console.log(tab,event);
                event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.transform="translateX("+tab.index*(-100)+"%)";
                // if(tab.index==1||tab.index==2){
                //       this.getTaxPayerdzdh();
                //       this.getTaxPayeryhzh();
                // }
          },
    saveyhzhRow(scope){
      let id=scope.row.id;
      let _this=this;
      let khhMc=scope.row.khhMc;
      let khhZh=scope.row.khhZh;
      
     if(khhMc==""||khhZh==""){
             _this.$message({
              showClose:true,
              message: "请点击行业空白处输入信息",
              type: "warning",
              });
              return;
        }
    var reg = /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/;
    if (khhZh != null && khhZh != "" && !reg.test(khhZh)) {
          _this.$message({
              showClose:true,
              message: "请输入正确的银行账号！",
              type: "warning",
              });
              return;
     } 
      if(id!=undefined){
        let nsrmc=this.editForm.nsrmc;
        let nsrsbh=this.editForm.nsrsbh;
        let yxbz=this.editForm.yxbz;
       
        let pdata={id,nsrmc,nsrsbh,yxbz,khhMc,khhZh};
        if (pdata != null) {
          if (validate.checkForbiddenWordForm(JSON.stringify(pdata))) {
            _this.$message({
              showClose: true,
              message: "不允许有特殊字符",
              type: "error",
            });
            return;
          }
        }
        _this.$api.post(
                  _this.$apis.icpmanagement + "/taxpayer/taxpayermanagement/editNsrxxYhzhRow", pdata,
                  function (res) {
                  if (res.success) {
                      _this.$message({
                      showClose:true,
                      message: "修改成功",
                      type: "success",
                      });
                    //保存成功以后刷新
                    _this.getTaxPayeryhzh();
                  } else {
                      _this.$message({
                      showClose:true,
                      message: "修改失败," + res.errorMsg,
                      type: "error",
                      });
                    }
                  }
              );
      }else{
          
          let nsrmc=this.editForm.nsrmc;
          let nsrsbh=this.editForm.nsrsbh;
          let yxbz=this.editForm.yxbz;
          //let khhMczh=scope.row.khhMczh;
          //let pdata={id,nsrmc,nsrsbh,yxbz,khhMczh};
         
          let pdata={id,nsrmc,nsrsbh,yxbz,khhMc,khhZh};
          if (pdata != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(pdata))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }
          _this.$api.post(
                    _this.$apis.icpmanagement + "/taxpayer/taxpayermanagement/insertYhzhRow", pdata,
                    function (res) {
                    if (res.success) {
                        _this.$message({
                        showClose:true,
                        message: "保存成功",
                        type: "success",
                        });
                      //保存成功以后刷新
                      _this.getTaxPayeryhzh();
                    } else {
                        _this.$message({
                        showClose:true,
                        message: "保存失败," + res.errorMsg,
                        type: "error",
                        });
                      }
                    }
                );
      }
    },
    saveRow(scope){
      let id=scope.row.id;
      let _this=this;
      let nsrDz=scope.row.nsrDz;
      let nsrDh=scope.row.nsrDh;
       if(nsrDz==""||nsrDh==""){
             _this.$message({
              showClose:true,
              message: "请点击行业空白处输入信息",
              type: "warning",
              });
              return;
        }
        let regPone = null;
        let mobile = /^1(3|4|5|6|7|8|9)\d{9}$/; //最新16手机正则
        let tel = /^(0[0-9]{2,3}\-)([2-9][0-9]{4,7})+(\-[0-9]{1,4})?$/; //座机
         if (nsrDh.charAt(0) == 0) {    // charAt查找第一个字符方法，用来判断输入的是座机还是手机号      
           
            if(nsrDh.length==12||nsrDh.length==13){
                regPone = tel; 
            }else{
              _this.$message({
              showClose:true,
              message: "座机号为12位或者13位！",
              type: "warning",
              });
              return;
            }
	        } else {          
	          regPone = mobile;
	        }
        if (!regPone.test(nsrDh)) {
           _this.$message({
              showClose:true,
              message: "请填写纳税人电话(座机格式'区号-座机号码')",
              type: "warning",
              });
	          return;
	        }
      if(id!=undefined){
        let nsrmc=this.editForm.nsrmc;
        let nsrsbh=this.editForm.nsrsbh;
        let yxbz=this.editForm.yxbz;
        //let nsrDzdh=scope.row.nsrDzdh;
       
        let pdata={id,nsrmc,nsrsbh,yxbz,nsrDz,nsrDh};
        if (pdata != null) {
          if (validate.checkForbiddenWordForm(JSON.stringify(pdata))) {
            _this.$message({
              showClose: true,
              message: "不允许有特殊字符",
              type: "error",
            });
            return;
          }
        }
        _this.$api.post(
                  _this.$apis.icpmanagement + "/taxpayer/taxpayermanagement/editNsrxxDzdhRow", pdata,
                  function (res) {
                  if (res.success) {
                      _this.$message({
                       showClose:true,
                      message: "修改成功",
                      type: "success",
                      });
                    //保存成功以后刷新
                    _this.getTaxPayerdzdh();
                  } else {
                      _this.$message({
                      showClose:true,
                      message: "修改失败," + res.errorMsg,
                      type: "error",
                      });
                    }
                  }
              );
      }else{
      
      let nsrmc=this.editForm.nsrmc;
      let nsrsbh=this.editForm.nsrsbh;
      let yxbz=this.editForm.yxbz;
      //let nsrDzdh=scope.row.nsrDzdh;

       let pdata={id,nsrmc,nsrsbh,yxbz,nsrDz,nsrDh};
       if (pdata != null) {
          if (validate.checkForbiddenWordForm(JSON.stringify(pdata))) {
            _this.$message({
              showClose: true,
              message: "不允许有特殊字符",
              type: "error",
            });
            return;
          }
        }
       _this.$api.post(
                _this.$apis.icpmanagement + "/taxpayer/taxpayermanagement/insertDzdhRow", pdata,
                function (res) {
                if (res.success) {
                    _this.$message({
                    showClose:true,
                    message: "保存成功",
                    type: "success",
                    });
                  //保存成功以后刷新
                  _this.getTaxPayerdzdh();
                } else {
                    _this.$message({
                    showClose:true,
                    message: "保存失败," + res.errorMsg,
                    type: "error",
                    });
                  }
                }
             );
      }
    },
    //点击多地址电话，展示动态数据
    getTaxPayerdzdh(){
      
     let nsrsbh =this.updatePageData.nsrsbh;
      let _this = this;
      _this.loadingDzdh=true;
      this.$api.get(
        _this.$apis.icpmanagement +"/taxpayer/taxpayermanagement/getTaxPayerdzdh/"+nsrsbh,{},
        function (res) {
          if (res.success) {
             //_this.dzdhTable= res.data; 
             let list=res.data;
             //对数据进行解析处理
            for (let i = 0; i < list.length; i++) {
               //日期解析
                 list[i].opreater="删除";
                 list[i].opreater1="保存";
            }
           
            _this.dzdhTable=list;
          } else {
            _this.$message({
              showClose:true,
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
           _this.loadingDzdh=false;
        }
      );  
    },
   //点击多银行账号，动态展示数据
     getTaxPayeryhzh(){
     let nsrsbh =this.updatePageData.nsrsbh;
      let _this = this;
      _this.loadingyhzh=true;
      this.$api.get(
        _this.$apis.icpmanagement +"/taxpayer/taxpayermanagement/getTaxPayeryhzh/"+nsrsbh,{},
        function (res) {
          if (res.success) {
             let list=res.data;
             //对数据进行解析处理
            for (let i = 0; i < list.length; i++) {
               //日期解析
                 list[i].opreater="删除";
                 list[i].opreater1="保存";
            }
            _this.yhzhTable=list;
          } else {
            _this.$message({
              showClose:true,
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
          _this.loadingyhzh=false;
        }
      );  
    },
    dzdh(){
     var dz=this.editForm.nsrDz;
    
     if(dz==""||dz==null){
        this.$message({
                  showClose:true,
                  message: "地址电话不能为空",
                  type: "warning",
              });
     }else{
      this.dzdhWrap=!this.dzdhWrap;
      this.getTaxPayerdzdh();
     }
    },
     yhzh(){
     var mc=this.editForm.nsrxxkhhMc;
     if(mc==""||mc==null){
        this.$message({
                   showClose:true,
                  message: "银行名称及账号不能为空",
                  type: "warning",
              });
     }else{
      this.yhzhWrap=!this.yhzhWrap;
      this.getTaxPayeryhzh();
     }
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
    addRow(){
            let oldTable =[];
            oldTable =  this.dzdhTable;
            let newRow = {
                  nsrDz:"",
                  nsrDh:"",
                  opreater1:'保存',
                  opreater:'删除'
              }
            oldTable.push(newRow);
            this.dzdhTable = oldTable;
             this.$message({
              showClose:true,
              message: "请点击行内空白处以输入内容",
              type: 'success'
            });
            //console.log(oldTable);
            },
    addYhzhRow(){
            let oldTable =[];
            oldTable =  this.yhzhTable;
            let newRow = {
                  khhMc:"",
                  khhZh:"",
                  opreater1:'保存',
                  opreater:'删除'
              }
            oldTable.push(newRow);
            this.yhzhTable = oldTable;
            this.$message({
              showClose:true,
              message: "请点击行内空白处以输入内容",
              type: 'success'
            });
            //console.log(oldTable);
            },
    deleteRow(scope, rows) {
                let id=scope.row.id;
                if(undefined!=id){
                    let _this = this;
                    _this.$api.delete(
                    _this.$apis.icpmanagement +
                      "/taxpayer/taxpayermanagement/deleteDzdhId/" +id, {},
                    function (res) {
                      if (res.success) {
                        _this.getTaxPayerdzdh();
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
                if(undefined!=id){
                    let _this = this;
                    _this.$api.delete(
                    _this.$apis.icpmanagement +
                      "/taxpayer/taxpayermanagement/deleteYhzhId/" +id, {},
                    function (res) {
                      if (res.success) {
                        _this.getTaxPayeryhzh();
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
     init_sf(){
      let _this = this;
      let params = this.editForm;
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
        let params = this.editForm;
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
    //根据税号获取表单信息
    getTaxPayerInfoById() {
      let nsrsbh =this.updatePageData.nsrsbh;
      let zzjgMc=this.updatePageData.zzjgMc;
      let zzjgDm=this.updatePageData.zzjgDm;
      let _this = this;
      _this.$api.get(
        _this.$apis.icpmanagement +"/taxpayer/taxpayermanagement/getTaxpayerInfo/" +nsrsbh, {},
        function (res) {
          if (res.success) {
          let list=res.data;
          list.zzjgMc=zzjgMc;
          _this.editForm=list; 
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

    //表单提交
    onSubmit(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
          let editParams = _this.editForm;
          if (editParams != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(editParams))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }
          _this.loading.loadingList=true;
              //修改
              _this.$api.post(
                _this.$apis.icpmanagement + "/taxpayer/taxpayermanagement/updateTaxPayerInfo/", editParams,
                function (res) {
                if (res.success) {
                    _this.$message({
                    showClose:true,
                    message: "修改成功",
                    type: "success",
                    });
                    //关闭抽屉
                     _this.loading.loadingList=false;
                    _this.$emit("back",2);
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
      });
    },

    //关闭
    close(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      //关闭抽屉
        if(formName=='editForm_1'){
            this.$emit("back",1);
        }else{
            this.$emit("back",2);
        }
    },
  },
};
</script>

<style lang="less" scoped>
  .rh-addrow{
    float: none;
    width:140px;
    height: 40px;
    text-align: left;
  }
  
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
.el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
}
.el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.el-dialog__headerbtn {
  right: 40px;
}
.rh-zzjg {
  width: 100%;
  height: 285px;
  overflow: auto;
  margin-bottom: 25px;
  border: 1px solid #BFBFBF;
}

</style>