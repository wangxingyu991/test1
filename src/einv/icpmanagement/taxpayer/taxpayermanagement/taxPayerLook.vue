<template>
 <div class="drawer-wrap">
     <div class="rh-drawer-head">
          <div class="drawer-title">查看纳税人信息</div>
      </div>
      <el-row style="text-align:center">
         <div class="tabs-wrap">
                  <el-tabs v-model="activeName" @tab-click="handleClick" class="rh-tabs" size="mini">
                        <el-tab-pane label="纳税人信息" name="first">
                        <div>
                          <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" label-position="right">
                              <div class="rh-dialog-body"> 
                              
                                  <el-row>
                                      <el-col :span ="10" :offset="1">
                                          <el-form-item label="组织机构" prop="zzjgMc">
                                               <el-input v-model="editForm.zzjgMc" placeholder="" maxlength="120" :readonly="true"></el-input>   
                                            </el-form-item> 
                                      </el-col>
                                      <el-col :span ="10" :offset="1">
                                          <el-form-item label="纳税人名称" prop="nsrmc">
                                              <el-input v-model="editForm.nsrmc" placeholder="" maxlength="120" :readonly="true"></el-input>   
                                          </el-form-item>
                                      </el-col>
                                      
                                  </el-row>
                                  <el-row>
                                    <el-col :span ="10" :offset="1">
                                        <el-form-item label="纳税人识别号" prop="nsrsbh">
                                          <el-input v-model="editForm.nsrsbh" onkeyup="value=value.replace(/[^A-Z0-9]/g,'')"  :readonly="true"  placeholder="纳税人识别号" maxlength="20"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span ="10" :offset="1">
                                        <el-form-item label="所属省份" prop="sf">
                                                  <!-- <el-select v-model="editForm.sf" placeholder="" :readonly="true" :disabled="true">
                                                      <el-option 
                                                      v-for="item in NsrsfList" 
                                                      :key="item.sfdm" 
                                                      :label="item.sf"
                                                      :value="item.sf">
                                                      </el-option>
                                                  </el-select> -->
                                                   <el-input v-model="editForm.sf" placeholder="" maxlength="120" :readonly="true"></el-input>   
                                          </el-form-item>
                                    </el-col> 
                                  </el-row>
                                  <el-row>
                                          <el-col :span ="10" :offset="1">
                                              <el-form-item label="有效标志" prop="yxbz" >
                                                <!-- <el-select v-model="editForm.yxbz" :readonly="true" :disabled="true">
                                                  <el-option label="有效" value="Y"></el-option>
                                                  <el-option label="无效" value="N"></el-option>
                                                </el-select> -->
                                                 <el-input v-model="editForm.yxbz" placeholder="" :readonly="true"></el-input>   
                                              </el-form-item>
                                          </el-col>
                                          <el-col :span ="10" :offset="1">
                                            <el-form-item label="纳税人状态" prop="nsrztDm">
                                              <el-select v-model= "editForm.nsrztDm" placeholder="" :readonly="true" :disabled="true">
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
                                      <!-- <el-select v-model="editForm.sffsDx" :readonly="true" :disabled="true">
                                        <el-option label="不发送" value="0"></el-option>
                                        <el-option label="发送" value="1"></el-option>
                                      </el-select> -->
                                       <el-input v-model="editForm.sffsDx" placeholder="" :readonly="true"></el-input>   
                                    </el-form-item>
                                </el-col>
                                <el-col :span ="10" :offset="1">
                                  <el-form-item label="是否发送邮件" prop="sffsYj">
                                      <!-- <el-select v-model="editForm.sffsYj" :readonly="true" :disabled="true">
                                        <el-option label="不发送" value="0"></el-option>
                                        <el-option label="发送" value="1"></el-option>
                                      </el-select> -->
                                        <el-input v-model="editForm.sffsYj" placeholder="" :readonly="true"></el-input>   
                                    </el-form-item>
                                </el-col>
                              </el-row> 
                            <el-row>
                                <el-col :span ="10" :offset="1">
                                  <el-form-item label="电子邮件" prop="dzyj">
                                      <el-input v-model="editForm.dzyj" placeholder="" maxlength="120" :readonly="true"></el-input>   
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
                                        <el-input v-model="editForm.scjydz" placeholder="" maxlength="120" :readonly="true"></el-input>
                                    </el-form-item>
                                  </el-col>
                                <el-col :span ="10" :offset="1">
                                    <el-form-item label="税务注册地址" prop="swzcDz">
                                      <el-input v-model="editForm.swzcDz" placeholder="" maxlength="11" :readonly="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                </el-row> 
                                <el-row>
                                  <el-col :span ="10" :offset="1">
                                    <el-form-item label="经办人手机号码" prop="sjhm">
                                        <el-input v-model="editForm.sjhm" placeholder="" maxlength="11" :readonly="true"></el-input>
                                    </el-form-item>
                                  </el-col>
                                  <el-col :span ="10" :offset="1">
                                      <el-form-item label="办税人名称" prop="bsrmc">
                                        <el-input v-model="editForm.bsrmc" placeholder="" maxlength="11" :readonly="true"> </el-input>
                                      </el-form-item>
                                  </el-col>
                                </el-row> 
                                <el-row>
                                  <el-col :span ="10" :offset="1">
                                      <el-form-item label="开票模式" prop="kpms">
                                        <el-select v-model="editForm.kpms" :disabled="true">
                                          <el-option label="同步开票" value="1"></el-option>
                                          <el-option label="异步开票" value="2"></el-option>
                                        </el-select>
                                      </el-form-item>
                                  </el-col>
                                <el-col :span ="10" :offset="1">
                                    <el-form-item label="建设类型" prop="jslx">
                                        <el-select v-model="editForm.jslx" :disabled="true">
                                          <el-option label="使用自建平台" value="0"></el-option>
                                          <el-option label="使用第三方平台" value="1"></el-option>
                                        </el-select>
                                      </el-form-item>
                                </el-col>
                                </el-row>  
                                <el-row>
                                  <el-col :span ="10" :offset="1">
                                      <el-form-item label="数据来源" prop="sjly">
                                        <el-select v-model="editForm.sjly" :disabled="true">
                                          <el-option label="入驻" value="1"></el-option>
                                          <el-option label="租户管理员维护" value="2"></el-option>
                                        </el-select>
                                      </el-form-item>
                                  </el-col>
                                <el-col :span ="10" :offset="1">
                                    <el-form-item label="是否达起征点" prop="qzdBz">
                                        <el-select v-model="editForm.qzdBz" :disabled="true">
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
                           
                          <div class="address">
                                  <el-table
                                    border
                                    max-height ="250"
                                    :data="dzdhTable"
                                    style="width:100%"
                                  >
                                  <el-table-column
                                        label="序号"
                                        width="70px"
                                        align="center">
                                    <template slot-scope="scope">
                                        {{scope.$index+1}}
                                    </template>
                                  </el-table-column>
                                  <!-- <el-table-column prop="nsrDzdh"   align="center" label="销售方地址电话">
                                        <template   slot-scope="scope">
                                         
                                           <div class="inputText" style="display:block">{{ scope.row.nsrDzdh }}</div> 
                                        </template>
                                    </el-table-column> -->
                                    <el-table-column prop="nsrDz"   align="center" label="销售方地址">  
                                        <template   slot-scope="scope">
                                
                                          <div class="inputText" style="display:block">{{ scope.row.nsrDz }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="nsrDh"   align="center" label="销售方电话">  
                                        <template   slot-scope="scope">
                                        
                                          <div class="inputText" style="display:block">{{ scope.row.nsrDh }}</div>
                                        </template>
                                    </el-table-column>
                                  </el-table>
                            </div> 
                        </el-tab-pane>
                        <el-tab-pane label="销售方开户银行及账号" name="third">
                            
                         <div class="address">
                           
                                <el-table
                                  border
                                  max-height ="250"
                                  :data="yhzhTable"
                                  style="width:100%"
                                >
                                 <el-table-column
                                        label="序号"
                                        width="70px"
                                        align="center">
                                    <template slot-scope="scope">
                                        {{scope.$index+1}}
                                    </template>
                                 </el-table-column>
                                  <!-- <el-table-column  align="center" prop="khhMczh" label="销售方开户银行及账号">
                                      <template   slot-scope="scope">
                                        
                                        <div class="inputText" style="display:block">{{ scope.row.khhMczh }}</div>
                                      </template>
                                  </el-table-column> -->
                                   <el-table-column  align="center" prop="khhMc" label="销售方开户银行名称">
                                      <template   slot-scope="scope">
                                        <div class="inputTextBank" style="display:block" >{{ scope.row.khhMc }}</div>
                                      </template>
                                  </el-table-column>
                                  <el-table-column  align="center" prop="khhZh" label="销售方开户银行账号">
                                      <template   slot-scope="scope">
                                       
                                        <div class="inputTextBank" style="display:block">{{ scope.row.khhZh }}</div>
                                      </template>
                                  </el-table-column>
                
                                </el-table>
                               
                         </div> 
                      </el-tab-pane>
                  </el-tabs>
            </div>
       </el-row>
       <div class="rh-dialog-footer" solt="footer">
                    <el-button @click="close('editForm')">关闭</el-button>
       </div> 
 </div> 
</template>

<script>
import validate from "@/utils/validate.js";
export default {
  props: ["updatePageData"],

  data() {
    return {
      activeName:'first',
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
      loading:{
        loadingList:false,
      },
      //校验规则
      rules: {
        gmfMc: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
          //{ max: 100, message: "最多100个字符", trigger: "blur" },
        ],
       lxrYx:[
            {required: true, message:'请输入联系人邮箱',trigger:'blur'},
            { 
              validator: function(rule, value, callback) {
              if (
                /^\w{1,64}@[a-z0-9\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(
                  value
                ) == false
              ) {
                callback(new Error("请输入正确格式的邮箱！"));
              } else {
                callback();
              }
            },
            trigger: "blur"
            },],
        yxbz: [
          { required: true, message: "请选择有效标志", trigger: "blur" },
        ],
        // sort: [
        //   { required: true, message: "请输入序号", trigger: "blur" },
        //   { validator: checkSort, trigger: "blur" },
        // ],
      },
       flbmList:[],
       dzdhTable:[], 
       yhzhTable:[],
       NsrztList:[], 
       NsrsfList:[], 
       searchWrap:false,
       dzdhWrap:false,
       yhzhWrap:false,
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
    this.getTaxPayerdzdh();
    this.getTaxPayeryhzh();
   
  },

  methods: {
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
      if(id!=undefined){
        let nsrmc=this.editForm.nsrmc;
        let nsrsbh=this.editForm.nsrsbh;
        let yxbz=this.editForm.yxbz;
        let khhMczh=scope.row.khhMczh;
      
        let pdata={id,nsrmc,nsrsbh,yxbz,khhMczh};

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
                      message: "修改成功",
                      type: "success",
                      });
                    //保存成功以后刷新
                    _this.getTaxPayeryhzh();
                  } else {
                      _this.$message({
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
          let khhMczh=scope.row.khhMczh;
          
          let pdata={id,nsrmc,nsrsbh,yxbz,khhMczh};
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
                        message: "保存成功",
                        type: "success",
                        });
                      //保存成功以后刷新
                      _this.getTaxPayeryhzh();
                    } else {
                        _this.$message({
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
      if(id!=undefined){
        let nsrmc=this.editForm.nsrmc;
        let nsrsbh=this.editForm.nsrsbh;
        let yxbz=this.editForm.yxbz;
        let nsrDzdh=scope.row.nsrDzdh;
        let pdata={id,nsrmc,nsrsbh,yxbz,nsrDzdh};
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
                      message: "修改成功",
                      type: "success",
                      });
                    //保存成功以后刷新
                    _this.getTaxPayerdzdh();
                  } else {
                      _this.$message({
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
      let nsrDzdh=scope.row.nsrDzdh;
    
      let pdata={nsrmc,nsrsbh,yxbz,nsrDzdh};
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
                    message: "保存成功",
                    type: "success",
                    });
                  //保存成功以后刷新
                  _this.getTaxPayerdzdh();
                } else {
                    _this.$message({
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
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );  
    },
   //点击多银行账号，动态展示数据
     getTaxPayeryhzh(){
     let nsrsbh =this.updatePageData.nsrsbh;
      let _this = this;
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
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );  
    },
    dzdh(){
     var dz=this.editForm.nsrDz;
    
     if(dz==""||dz==null){
        this.$message({
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
                 // nsrDh:"",
                  opreater1:'保存',
                  opreater:'删除'
              }
            oldTable.push(newRow);
            this.dzdhTable = oldTable;
            console.log(oldTable);
            },
    addYhzhRow(){
            let oldTable =[];
            oldTable =  this.yhzhTable;
            let newRow = {
                  khhMc:"",
                //  khhZh:"",
                  opreater1:'保存',
                  opreater:'删除'
              }
            oldTable.push(newRow);
            this.yhzhTable = oldTable;
            console.log(oldTable);
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
                          message: "删除成功",
                          type: "success",
                        });
                      } else {
                        _this.$message({
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
                          message: "删除成功",
                          type: "success",
                        });
                      } else {
                        _this.$message({
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
      let zzjgDm=this.updatePageData.zzjgDm;
      let zzjgMc=this.updatePageData.zzjgMc;
      let _this = this;
      _this.$api.get(
        _this.$apis.icpmanagement +"/taxpayer/taxpayermanagement/getTaxpayerInfo/" +nsrsbh, {},
        function (res) {
          if (res.success) {
          let list=res.data;
          list.zzjgDm=zzjgDm;
          list.zzjgMc=zzjgMc;
          if(list.yxbz=="Y"){
            list.yxbz="有效"
           }else{
            list.yxbz="无效"
           }
           if(list.sffsDx=="Y"){
            list.sffsDx="发送"
           }else{
            list.sffsDx="不发送"
           }
           if(list.sffsYj=="Y"){
            list.sffsYj="发送"
           }else{
            list.sffsYj="不发送"
           }
          _this.editForm=list;
          } else {
            _this.$message({
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
                    message: "修改成功",
                    type: "success",
                    });
                    //关闭抽屉
                     _this.loading.loadingList=false;
                    _this.$emit("back");
                } else {
                    _this.$message({
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
      this.$emit("back");
    },
  },
};
</script>

<style lang="less" scoped>
  .rh-addrow{
    width:140px;
    height: 40px;
    margin-top:-15px;
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

</style>