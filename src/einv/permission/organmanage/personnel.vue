<template>
  <div>
    <frameleftright>
        <div slot="left">
            <div class="tree-wrap">
                <div class="tree-body">
                    <el-tree ref="organTree" v-loading = "organtreeload" :load="loadNode" lazy
                        @node-click="handleNodeClick"
                        node-key="id" :highlight-current = "true"
                        :default-expanded-keys = "defaultOpen" ></el-tree>
                </div>
            </div>
        </div>
        <div slot="right" v-if="formshow==1">
            <div class="rh-page-header">
                <div class="rh-head-and-operate">
                    <div class="tips-content">
                        <span class="rh-helpTip-text">机构人员管理</span>
                    </div>
                </div>
            </div>
            <div class="rh-page-content">
                <div class="pull-right">
                    <el-form :model="queryForm" ref="queryForm" :inline="true" label-width="0px" label-position="right">
                        <el-form-item prop="personnelCode" style="width:150px">
                            <el-input v-model="queryForm.personnelCode" placeholder="请输入人员代码"></el-input>
                        </el-form-item>
                        <el-form-item prop="personnelName" style="width:150px">
                            <el-input v-model="queryForm.personnelName" placeholder="请输入人员名称"></el-input>
                        </el-form-item>
                        <el-form-item prop="valid" style="width:150px">
                            <el-select v-model="queryForm.valid" placeholder="请选择">
                                <el-option v-for="item in optionvalid" :key="item.key" :label="item.label"
                                        :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button  icon="el-icon-search" type="primary" @click="search('btn')"></el-button>
                            <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="rh-operate clearfix">
                    <div class="rh-pull-left">
                        <el-button type="primary" @click="add('operatorForm','新增')">新增人员</el-button>
                        <el-button type="primary" @click="btnoper('upd')">修改人员</el-button>
                        <!-- <el-button type="primary" @click="btnoper('resetpwd')">密码初始化</el-button> -->
                        <el-button type="primary" @click="btnoper('freeze')">人员冻结</el-button>
                        <el-button type="primary" @click="btnoper('del')">删 除</el-button>
                        <font color="red" style="margin-top:5px">*双击人员显示身份列表</font>
                    </div>
                </div>
                <div class="rh-operate clearfix">
                    <div class="rh-table">
                        <el-table :data="tableData.records" border highlight-current-row @current-change="handleSelectionChange" @row-dblclick="showPersonnelIdentity">
                            <template slot="empty">
                              <div class="pic_nodata"></div>
                            </template>
                            <el-table-column label="" width="50" align="center" >
                              <template slot-scope="scope">
                                <el-radio :label="scope.row.personnelId" v-model="radioPersonnel">&nbsp;</el-radio>
                              </template>
                            </el-table-column>
                            <el-table-column align="center" prop="personnelCode" label="人员代码"></el-table-column>
                            <el-table-column align="center" prop="personnelName" label="人员姓名" show-overflow-tooltip></el-table-column>
                            <el-table-column align="center" prop="organName" label="所属单位" show-overflow-tooltip></el-table-column>
                            <el-table-column align="center" prop="valid" label="有效标志"></el-table-column>
                        </el-table>
                        <div class="rh-pagination">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.tableData.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="this.tableData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="this.tableData.total"></el-pagination>
                        </div>
                    </div>
                </div>
                <div class="rh-operate clearfix">
                    <div class="rh-pull-left">
                        <el-button  type="primary" @click="add('identityForm','新增身份','sf')" v-if="sfFlag">新增身份</el-button>
                        <el-button  type="primary" @click="btnoperIdentity('upd')" >修改身份</el-button>
                        <el-button  type="primary" @click="btnoperIdentity('gljggw')" >关联机构岗位</el-button>
                        <el-button  type="primary" @click="btnoperIdentity('bgzsf')">变更主身份</el-button>
                    </div>
                </div>
                <div class="rh-table">
                    <el-table :data="tableDataIdentity.records" tripe border highlight-current-row @current-change="handleSelectionChangeIdentity">
                        <template slot="empty">
                          <div class="pic_nodata"></div>
                        </template>
                        <el-table-column label="" width="50" align="center" >
                          <template slot-scope="scope">
                            <el-radio :label="scope.row.identityId" v-model="radioPersonnelIdentity">&nbsp;</el-radio>
                          </template>
                        </el-table-column>
                        <el-table-column  align="center" prop="identityCode" label="身份代码"></el-table-column>
                        <el-table-column align="center" prop="personnelName" label="人员姓名" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="identityName" label="身份姓名" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="organName" label="所属单位" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="mainIdentity" label="主身份标志"></el-table-column>
                        <el-table-column align="center" prop="valid" label="有效标志"></el-table-column>
                    </el-table>
                    <div class="rh-pagination">
                        <el-pagination @size-change="handleSizeChangeSf" @current-change="handleCurrentChangeSf" :current-page="this.tableDataIdentity.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="this.tableDataIdentity.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="this.tableDataIdentity.total"></el-pagination>
                    </div>
                </div>
            </div>

        </div>
    </frameleftright>
    <!-- 新增人员页面抽屉 -->
    <el-drawer size="80%" :visible.sync="showmodel" append-to-body :wrapperClosable = false :with-header=true>
      <div class="drawer-wrap">
        <div class="rh-drawer-head">
              <div class="drawer-title">
                  {{titlename}}
              </div>
        </div>
        <div class="rh-drawer-body">
            <el-card class="box-card">
              <div slot="header">
                <span>人员信息维护</span>
              </div>
              <div class="bottom clearfix">
                <el-form label-width="140px" :model="operatorForm" :rules="rules" ref="operatorForm">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="人员代码" prop="personnelCode">
                        <el-input v-model.trim="operatorForm.personnelCode" placeholder="请输入人员代码" onkeyup="value=value.replace(/[^a-zA-Z0-9]/g,'')"  @blur="initAccountIndetify" :disabled="disDm==0"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="人员姓名" prop="personnelName">
                        <el-input v-model.trim="operatorForm.personnelName" placeholder="请输入人员姓名" ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="手机电话" prop="phone">
                        <el-input v-model.trim="operatorForm.phone" placeholder="请输入手机电话"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="电子邮箱" prop="email">
                        <el-input v-model="operatorForm.email" placeholder="请输入电子邮箱" maxlength="90"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="身份证号码" prop="identityCard">
                        <el-input v-model.trim="operatorForm.identityCard" placeholder="请输入身份证号码" :maxlength="18"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="性别" prop="sex">
                        <el-select v-model="operatorForm.sex" placeholder="请选择">
                          <el-option v-for="item in optionxb" :key="item.key" :label="item.label"
                                    :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="进入单位时间" prop="startworkTime">
                        <el-date-picker
                          v-model="operatorForm.startworkTime"
                          type="date"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" class="dialog-form-block">
                      <el-form-item label="离开单位时间" prop="endworkTime">
                        <el-date-picker
                          v-model="operatorForm.endworkTime"
                          type="date"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="职务" prop="position">
                        <el-input v-model.trim="operatorForm.position" placeholder="请输入职务" maxlength="300"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="有效标志" prop="valid" >
                        <el-select v-model="operatorForm.valid" placeholder="请选择">
                          <el-option v-for="item in optionvalid2" :key="item.key" :label="item.label"
                                    :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-card>
            <el-card class="box-card">
              <div slot="header">
                <span>人员登录账户信息维护</span>
              </div>
              <div class="bottom clearfix">
                <el-form :model="operatorForm1" :rules="rules1" ref="operatorForm1" label-width="140px">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="登录帐号" prop="accountCode">
                        <el-input v-model.trim="operatorForm1.accountCode" placeholder="请输入登录帐号" :maxlength="75" readonly="readonly"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="有效标志" prop="accountValid">
                        <el-select v-model="operatorForm1.accountValid" placeholder="请选择">
                          <el-option v-for="item in optionvalid2" :key="item.key" :label="item.label"
                                    :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" v-if="disDm==1">
                      <el-form-item label="登录密码" prop="password">
                        <el-input type="password" v-model.trim="operatorForm1.password" placeholder="请输入登录密码" :maxlength="75" show-password></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="disDm==1">
                      <el-form-item label="重新输入密码" prop="passwordr">
                        <el-input type="password" v-model.trim="operatorForm1.passwordr" placeholder="重新输入密码" :maxlength="75" show-password></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                   <el-row>
                    <el-col :span="12" v-if="disDm==0">
                      <el-form-item label="登录密码" prop="npassword">
                        <el-input type="password" v-model.trim="operatorForm1.password" placeholder="请输入登录密码" :maxlength="75" show-password></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="disDm==0">
                      <el-form-item label="重新输入密码" prop="npasswordr">
                        <el-input type="password" v-model.trim="operatorForm1.passwordr" placeholder="重新输入密码" :maxlength="75" show-password></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-card>
            <el-card class="box-card">
              <div slot="header">
                <span>人员主身份信息维护</span>
              </div>
              <div class="bottom clearfix">
                <el-form :model="operatorForm2" :rules="rules2" ref="operatorForm2" label-width="140px">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="身份名称" prop="identityName">
                        <el-input v-model="operatorForm2.identityName" placeholder="请输入身份名称" readonly="readonly"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="有效标志" prop="identityValid" >
                        <el-select v-model="operatorForm2.identityValid" placeholder="请选择">
                          <el-option v-for="item in optionvalid2" :key="item.key" :label="item.label"
                                    :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="身份有效期始" prop="termStart">
                        <el-date-picker
                          v-model="operatorForm2.termStart"
                          type="date"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="身份有效期止" prop="termEnd">
                        <el-date-picker
                          v-model="operatorForm2.termEnd"
                          type="date"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-card>
        </div>
        <div class="rh-dialog-footer" style="text-align:center">
            <el-button type="primary" @click="saveForm" :loading="disflag.click==0">保 存</el-button>
            <el-button @click="showmodel=false">关 闭 </el-button>
        </div>
      </div>
    </el-drawer>
    <!-- 身份新增-->
    <el-dialog title='可选人员' :visible.sync="showpersonneltree" width="50%" append-to-body>
      <div>
        <div class="rh-dialog-body">
          <el-form ref="form" label-width="90px" label-position="right">
            <el-row :gutter="20">
              <el-col :span="21">
                <el-form-item label="人员姓名或代码" prop="filterText">
                  <el-input v-model="filterText"  placeholder="请输入" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" @click="getPersonnelTree()">查 询</el-button>
              </el-col>
            </el-row>
            <el-tree v-loading = "personneltreeload"  element-loading-text="拼命加载中" style="height:230px;margin-top:5px" :data="personnelTreeData"
                      :props="defaultRyProps" show-checkbox node-key="name" :check-strictly="true"
                      highlight-current :expand-on-click-node="true" :default-expand-all="true" ref="personneltree"></el-tree>
            <div class="rh-dialog-footer" style="text-align:center">
              <el-button type="primary" @click="savePersonnelCheckedKeys">保 存</el-button>
              <el-button @click="showpersonneltree=false">关 闭 </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </el-dialog>

    <!-- 身份维护-->
    <el-dialog :title="identitytitle" :visible.sync="identitymodel" width="60%" append-to-body>
      <div class="bottom clearfix">
        <el-form :model="identityForm" :rules="sfrules" ref="identityForm"  label-width="140px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="人员代码" prop="personnelCode">
                <el-input v-model="identityForm.personnelCode" placeholder="请输入人员代码" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登录帐号" prop="accountCode">
                <el-input v-model="identityForm.accountCode" placeholder="请输入登录帐号" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="身份名称" prop="identityName">
                <el-input v-model="identityForm.identityName" placeholder="请输入身份名称" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="人员姓名" prop="personnelName">
                <el-input v-model="identityForm.personnelName" placeholder="请输入人员姓名" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="身份所属机构" prop="organName">
                <el-input v-model="identityForm.organId" v-show="false"></el-input> <!-- :readonly="true" @focus="identitytitle=='新增身份'?showjgtree=true:0"-->
                <el-input v-model="identityForm.organCode" v-show="false"></el-input> <!-- :readonly="true" @focus="identitytitle=='新增身份'?showjgtree=true:0"-->
                <el-input v-model="identityForm.organName" placeholder="请选择身份所属机构" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="有效标志" prop="identityValid" >
                <el-select v-model="identityForm.identityValid" placeholder="请选择">
                  <el-option v-for="item in optionvalid2" :key="item.key" :label="item.label"
                              :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="身份有效期始" prop="termStart">
                <el-date-picker
                  v-model="identityForm.termStart"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份有效期止" prop="termEnd">
                <el-date-picker
                  v-model="identityForm.termEnd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="rh-dialog-footer" style="text-align:center">
              <el-button type="primary" @click="saveIdentityForm"  :disabled="disflag.click==0">保 存</el-button>
              <el-button @click="identitymodel=false">关 闭 </el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>

    <!-- 人员岗位关联 -->
    <el-dialog title="人员身份岗位关联" :visible.sync="showpostgl" width="69%" append-to-body>
      <div>
        <div class="rh-dialog-body">
          <el-transfer 
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入功能集名称"
            v-model="personnelpostvalue"
            :props="{ key: 'postId', label: 'postName' }"
            :titles="['待添加岗位', '已添加岗位']"
            :data="datapost"
            @change="handleChange">
          </el-transfer>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import frameleftright from "@/einv/tree/frame_lr.vue";
import {getMd5} from '@/utils/md5.js';
import validate from "@/utils/validate.js";
import {encryptedData, decryptData} from "@/utils/jsencrypt.js"
export default {
    components: {frameleftright },
    name: "personnel",
    data() {
      let queryData =  (rule, value, callback) => {
        let data ={'personnelCode':this.operatorForm.personnelCode};
        let senddata = {}
        if(this.disDm==0){//修改状态下，不需要验证id
          senddata = Object.assign({'flag':'update'}, data);
        }else{
          senddata = Object.assign({'flag':'add'}, data);
        }
        let _this = this;
        _this.$api.post(_this.$apis.permission+"/rest/permission/personnel/isexistaccount",senddata,function(res){
            if(res.success == true) {
              if(res.data=='102'){
                callback(new Error('系统中存在相同的租户代码，请重新输入'));
              }else if(res.data=='101'){
                callback(new Error('该租户下用户已存在，请重新输入'));
              }else{
                callback();
              }
            } else {
              callback();
            }
          });
      };
      let queryPhone =  (rule, value, callback) => {
        if(value == "" || this.oldVal.phone == value){
          callback();
        }else{
          let data ={'loginAccountCode': this.operatorForm.phone, 'loginType': '02'};
          let senddata = {}
          if(this.disDm==0){//修改状态下，不需要验证id
            senddata = Object.assign({'flag':'update'}, data);
          }else{
            senddata = Object.assign({'flag':'add'}, data);
          }
          let _this = this;
          _this.$api.post(_this.$apis.permission+"/rest/permission/personnel/isexistloginaccount",senddata,function(res){
              if(res.success == true) {
                callback(new Error('系统中存在相同的手机号，请重新输入'));
              } else {
                callback();
              }
            });
        }
      };
      let queryEmail =  (rule, value, callback) => {
        if(value == "" || this.oldVal.email == value){
          callback();
        }else{
          let data ={'loginAccountCode':this.operatorForm.email, 'loginType': '03'};
          let senddata = {}
          if(this.disDm==0){//修改状态下，不需要验证id
            senddata = Object.assign({'flag':'update'}, data);
          }else{
            senddata = Object.assign({'flag':'add'}, data);
          }
          let _this = this;
          _this.$api.post(_this.$apis.permission+"/rest/permission/personnel/isexistloginaccount",senddata,function(res){
              if(res.success == true) {
                callback(new Error('系统中存在相同的邮箱，请重新输入'));
              } else {
                callback();
              }
            });
        }
      };
      let checkPassword = (rule, value, callback) => {
        if (this.operatorForm1.password != this.operatorForm1.passwordr ) {
            callback(new Error("两次密码不符"));
        } else {
            callback(); 
        }
      };
      let checkPasswordN = (rule, value, callback) => {
        if (this.operatorForm1.npassword != this.operatorForm1.npasswordr ) {
            callback(new Error("两次密码不符"));
        } else {
            callback(); 
        }
      };
      let checkPasswordDict = (rule, value, callback) => {
        let _this = this;
        _this.$api.post(_this.$apis.permission+"/rest/permission/personnel/getpublickey", {}, function (res) {
          if(res.success){
            var publicKey = res.data;
            let password = encryptedData(publicKey, value);
            let checkInfo = {
              password: password,
            };
            _this.$api.post(_this.$apis.permission+"/rest/permission/personnel/checkpassworddict", checkInfo, function (res) {
              if(res.success == true) {
                callback(new Error('密码不合规范，请重新输入'));
              } else {
                callback();
              }
            });
          }
        });
      };
      let dateVali =  (rule, value, callback) => {
        if(this.operatorForm.endworkTime!=null&&this.operatorForm.endworkTime!=''&&this.operatorForm.startworkTime!=null&&this.operatorForm.startworkTime!='') {
          if(this.operatorForm.startworkTime > this.operatorForm.endworkTime){
            callback(new Error("进入单位时间必须小于或等于离开单位时间"));
          }else{
            callback();
          }
        } else {
          callback();
        }
      };
      let identityDateVali =  (rule, value, callback) => {
        if(this.operatorForm2.termStart!=null&&this.operatorForm2.termStart!=''&&this.operatorForm2.termEnd!=null&&this.operatorForm2.termEnd!='') {
          if(this.operatorForm2.termStart > this.operatorForm2.termEnd){
            callback(new Error("身份有效期始必须小于或等于身份有效期止"));
          }else{
            callback();
          }
        } else {
          callback();
        }
      };
      let identityDateVali2 =  (rule, value, callback) => {
        if(this.identityForm.termStart!=null&&this.identityForm.termStart!=''&&this.identityForm.termEnd!=null&&this.identityForm.termEnd!='') {
          if(this.identityForm.termStart > this.identityForm.termEnd){
            callback(new Error("身份有效期始必须小于或等于身份有效期止"));
          }else{
            callback();
          }
        } else {
          callback();
        }
      };
      let checkAccountName = (rule, value, callback) => {
        let reg = /^[\u4e00-\u9fa5]{1,25}$|^[\A-Za-z]{1,75}$/;
        if(reg.test(value) === false) {
          return callback(new Error('请输入最长75位英文或者25位汉字'));
        }else{
          callback();
        }
      };
      let querySfData =  (rule, value, callback) => {
        if(this.identitytitle=='修改身份'){//修改状态下，不需要验证id
          callback();
        }else{
          this.$permissionhttpclient.get("/rest/permission/personnel/isexistjgsf",{params:{'personnelCode':this.identityForm.personnelCode,'organCode':this.identityForm.organCode}},function(res){
            if(res.success == true) {
              if(res.data=='101'){
                callback(new Error('该机关下已存在该人员身份，请重新输入'));
              }else{
                callback();
              }
            } else {
              callback(new Error('无法取得验证参数，请联系管理员'));
            }
          });
        }
      };
      return {
        queryForm: {
          personnelCode:'',
          personnelName: '',
          organCode: '',
          valid:'',
          pageNo: 1,
          pageSize: 5
        },
        oldVal: {
          phone: '',
          email: ''
        },
        queryIdentityForm: {
          personnelId:'',
          personnelCode:'',
          pageNo: 1,
          pageSize: 5
        },
        operatorForm: {
          personnelId:'',
          personnelCode:'',
          personnelName: '',
          identityCard: '',
          position: '',
          phone: '',
          email: '',
          startworkTime:'',
          endworkTime:'',
          sex:'',
          valid:'Y' 
        },
        operatorForm1: {
          accountCode:'',
          password:'',
          passwordr:'',
          npassword:'',
          npasswordr:'',
          accountValid:'Y'
        },
        operatorForm2: {
          identityId:'',
          organId:'',
          organCode:'',
          identityCode:'',
          identityName:'',
          identityValid:'Y',
          termStart: new Date(),
          termEnd: ''
        },
        identityForm: {
          personnelCode:'',
          organCode:'',
          organName:'',
          accountCode:'',
          identityId:'',
          identityCode:'',
          identityName:'',
          personnelName:'',
          identityValid:'Y',
          termStart:'',
          termEnd:''
        },
        defaultOpen: [],
        defaultCheck: [],
        checkedKeys : [],
        identitymodel:false,
        showjgtree:false,
        identitytitle:'新增身份',
        tmpjgdata:[],
        selidentity:{},
        optionvalid: [ { value:'', label:'全部',  key:0 },
          { value:'Y', label:'有效', key:1 },
          { value:'N', label:'无效', key:2 }
        ],
        optionvalid2: [ { value:'Y',  label:'有效', key:1  },
          { value:'N', label:'无效', key:2 }
        ],
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label',
          isLeaf: 'isParent'
        },
        tableData:[
        ],
        tableDataIdentity:[
        ],
        optionxb:[{
          value:'1',
          label:'男',
          key:1
        },
        {
          value:'2',
          label:'女',
          key:2
        }],
        disflag:{
          click:0
        },
        disDm:1,
        formshow:0,
        currentOrganId:'',
        currentOrganCode:'',
        currentOrganName:'',
        showmodel:false,
        titlename:'新增',
        sels:{},
        showpostgl:false,
        datapost: [],
        personnelpostvalue: [],
        organtreeload:true,
        radioPersonnel:'',
        radioPersonnelIdentity:'',
        rules: {
          personnelName: [{required:true,message:'请输入人员姓名',trigger:'blur'}],
          personnelCode:[{required:true,message:'请输入人员代码',trigger:'blur'},
                        {validator: queryData, trigger: 'blur'}],
          phone:[{validator: this.$validate.isMobileTelephone, trigger: 'blur'},
              {validator: queryPhone, trigger: 'blur'}],
          email:[{validator: this.$validate.isEmail, trigger: 'blur'},
              {validator: queryEmail, trigger: 'blur'}],
          identityCard:[ {validator:this.$validate.isCardNo,trigger:'blur'}],
          startworkTime: [{validator: dateVali, trigger: 'change'}],
          endworkTime: [{validator: dateVali, trigger: 'change'}],
        },
        rules1: {
          password:[{required:true,message:'请输入登录密码',trigger:'blur'},
            {validator:this.$validate.checkPwd, trigger:'blur'},
            {validator: checkPasswordDict, trigger: 'blur'}],
          passwordr:[{required:true,message:'请重新输入密码',trigger:'blur'},
            {validator: checkPassword, trigger: 'blur'}],
          npassword:[{validator:this.$validate.checkPwd, trigger:'blur'},
            {validator: checkPasswordDict, trigger: 'blur'}],
          npasswordr:[ {validator: checkPasswordN, trigger: 'blur'}]
        },
        rules2: {
          identityName:[{required:true,message:'请输入身份名称',trigger:'blur'}],
          termStart: [
            {required: true, message: '身份有效期始', trigger: 'change'},
            {validator: identityDateVali, trigger: 'change'}],
          termEnd: [
            {required: true, message: '身份有效期止', trigger: 'change'},
            {validator: identityDateVali, trigger: 'change'}]
        },
        sfrules: {
          personnelCode: [{required: true, message: '请输入人员代码', trigger: 'blur'}],
          accountCode:[{required:true,message:'请输入登录帐号',trigger:'blur'}],
          identityName:[{required:true,message:'请输入身份名称',trigger:'blur'}],
          personnelName: [{required: true, message: '请输入人员姓名', trigger: 'blur'}],
          organName: [{required: true, message: '请选择身份所属机构', trigger: 'change'},
            {validator: querySfData, trigger: 'change'}],
          termStart: [{required: true, message: '身份有效期始', trigger: 'change'},
            {validator: identityDateVali2, trigger: 'change'}],
          termEnd: [{required: true, message: '身份有效期止', trigger: 'change'},
            {validator: identityDateVali2, trigger: 'change'}]
        },
        // 登录页标题参数控制
        csForm: {
          gscsMkid: 'ZCPT',
          gscsDwbh: 'usp',
          gscsKey: 'ZCPT_ryAddSf'
        },
        sfFlag: true,
        filterText:'',//人员树过滤条件
        personneltreeload:false,
        defaultRyProps: {
          children: 'children',
          label: 'name'
        },
        personnelTreeData:[],
        showpersonneltree:false
      }
    },
    created() {
      //身份所属机构，该方法目前是全量查询机关，新版本的新增身份功能调整为选择人员，该代码包括页面中的树未修改，但不再使用
      //this.getTree();
      this.getdmlist();
      this.getGscsByIdBhKey();
    },
    mounted() {
    },
    methods: {
      getTree() {
        this.treeData=[];
        let _this = this;
        _this.organtreeload=true;
        _this.$permissionhttpclient.get("/rest/permission/jg/tree", {}, function (res) {
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
        if (node.level === 0) {
            _this.$api.get(_this.$apis.permission+"/rest/permission/organmanage/treerooteffect", {}, function (res) {
                _this.organtreeload = false;
                resolve(res.data);
                _this.defaultOpen = [];
                _this.defaultOpen.push(res.data[0].id);
                _this.formshow = 1;
                _this.queryForm.organCode = res.data[0].organCode;
                _this.currentOrganId = res.data[0].organId;
                _this.currentOrganCode = res.data[0].organCode;
                _this.currentOrganName = res.data[0].organName;
                _this.operatorForm2.organCode = res.data[0].organCode;
                _this.operatorForm2.organId = res.data[0].organId;
                _this.search();
                return;
            });
        }
        if (node.level >= 1) {
             _this.$api.get(this.$apis.permission+"/rest/permission/organmanage/treechildeffect/"+node.data.organCode, {}, function (res) {
                let list = res.data;
                for(let i = 0;i < list.length;i++){
                  list[i].isParent=list[i].isParent=='true'?true:false;
                }
                _this.organtreeload = false;
                return resolve(list);
            });
        }
      },
      getdmlist() {
        // let _this = this;
        // _this.$permissionhttpclient.get("/rest/permission/personnel/getdmlist", {}, function (res) {
        //   if (res.success == true) {
        //     let zc = res.data.zc;
        //     let xb = res.data.xb;
        //     zc.unshift({'dm':'','mc':'全部'});
        //     xb.unshift({'dm':'','mc':'全部'});
        //     _this.optionzc = zc;
        //     _this.optionxb = xb;
        //   } else {
        //     _this.$message({
        //       message: '查询失败,' + res.errorMsg,
        //       showClose:true,
            type: 'error'
        //     });
        //   }
        // })
      },
      getGscsByIdBhKey(){
        // let _this = this;
        // _this.$httpclient.get("/open/cspzApi/getGscsByIdBhKey",{params:_this.csForm}, function (res) {
        //   if (res.success == true) {
        //     let data = res.data;
        //     if(data.gscsValue == 1){
        //       _this.sfFlag = true;
        //     } else if(data.gscsValue == 0){
        //       _this.sfFlag = false;
        //     }
        //   } else {
        //     _this.$message({
        //       message: '查询失败,' + res.errorMsg,
        //       showClose:true,
            type: 'error'
        //     });
        //   }
        // })
      },
      search(flag) {
        let _this = this;
        if(flag == 'btn'){
          _this.queryForm.pageNo = 1;
        }
        let queryForm = Object.assign({}, _this.queryForm);
        _this.$api.post(_this.$apis.permission + "/rest/permission/personnel/plist", queryForm, function (res) {
          if (res.success == true) {
            _this.tableData = res.data;
            let list = res.data.records;
            for(let i = 0; i < list.length; i++) {
              if(list[i].valid == 'Y') {
                list[i].valid = "有效";
              } else {
                list[i].valid = "无效";
              }
            }
            _this.tableData.list = list;
            _this.radioPersonnel = '';
            _this.radioPersonnelIdentity = '';
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
        _this.queryIdentityForm.personnelId='';
        _this.queryIdentityForm.personnelCode='';
        _this.searchIdenfity();
        _this.selidentity={};
        _this.sels={};
      },
      searchIdenfity() {
        let _this = this;
        let queryForm = Object.assign({}, this.queryIdentityForm);
        _this.$api.post(_this.$apis.permission + "/rest/permission/personnel/plistidentity", queryForm, function (res) {
          if (res.success == true) {
            _this.tableDataIdentity = res.data;
            let list = res.data.records;
            for(let i = 0; i < list.length; i++) {
              if(list[i].valid == 'Y') {
                list[i].valid = "有效";
              } else {
                list[i].valid = "无效";
              }
              if(list[i].mainIdentity == 'Y') {
                list[i].mainIdentity = "主身份";
              } else {
                list[i].mainIdentity = "普通身份";
              }
            }
            _this.tableDataIdentity.list = list;
            _this.radioPersonnelIdentity = '';
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      initAccountIndetify(){
        let _this = this;
        if(_this.operatorForm.personnelCode != null && _this.operatorForm.personnelCode != ""){
            let personnelCode = _this.operatorForm.personnelCode;
            _this.operatorForm1.accountCode = personnelCode;
            _this.operatorForm2.identityName = _this.currentOrganName+personnelCode;
        }
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        this.search();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val;
        this.search();
      },
      handleSizeChangeSf(val) {
        this.queryIdentityForm.pageSize = val;
        this.searchIdenfity();
      },
      handleCurrentChangeSf(val) {
        this.queryIdentityForm.pageNo = val;
        this.searchIdenfity();
      },
      showPersonnelIdentity(row, event){
        let _this = this;
        _this.queryIdentityForm.personnelCode = row.personnelCode;
        _this.queryIdentityForm.personnelId = row.personnelId;
        _this.searchIdenfity();
        _this.selidentity = {};
      },
     /* savePost(val){
        let _this = this;
        _this.$permissionhttpclient.post("/rest/permission/gw/savegw",{'postId':_this.currentgwdm,'postId':val.join()},function (res) {
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
      delPost(val){
        let _this = this;
        _this.$permissionhttpclient.post("/rest/permission/gw/delgw",{'postId':_this.currentgwfl,'postId':val.join()},function (res) {
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
      },*/
      handleSelectionChange(val){
        this.sels = val;
        if(val != null){
          this.radioPersonnel = val.personnelId;
        }
        // this.radioPersonnelIdentity = '';
      },
      handleSelectionChangeIdentity(val){
        this.selidentity = val;
        if(val != null){
          this.radioPersonnelIdentity = val.identityId;
        }
      },
      add(formName, title, operflag) {
        let _this = this;
        if(operflag == 'sf'){
          //新增逻辑改为：选择人员增加到左边的组织机构中
          _this.showpersonneltree = true;
          _this.filterText = '';
          _this.personnelTreeData=[];
        }else{
          _this.showmodel = true;
          _this.titlename = title;
          _this.disflag.click=1;
          _this.disDm = 1;
          _this.resetForm(formName);
          _this.resetForm('operatorForm1');
          _this.resetForm('operatorForm2');
        }
      },
      btnoper(flag){
        let _this = this;
        if(_this.sels==null || JSON.stringify(_this.sels) == "{}") {
          _this.$message({
            message: '请点击需要进行操作的行',
            showClose:true,
            type: 'error'
          });
          return;
        }
        if(flag == 'upd'){
          _this.showmodel = true;
          _this.titlename = '修改';
          _this.disflag.click=1;
          _this.disDm = 0;
          _this.resetForm('operatorForm');
          _this.resetForm('operatorForm1');
          _this.resetForm('operatorForm2');
          _this.queryById(_this.sels.personnelId);
        }else if(flag == 'resetpwd'){
          _this.resetPwd(_this.sels);
        }else if(flag == 'freeze'){
          _this.freezeUser(_this.sels)
        }else if(flag =='del'){
          _this.del(_this.sels)
        }
      },
      btnoperIdentity(flag){
        let _this = this;
        if(_this.selidentity==null || JSON.stringify(_this.selidentity) == "{}") {
          _this.$message({
            message: '请点击需要进行操作身份',
            showClose:true,
            type: 'error'
          });
          return;
        }
        if(flag == 'upd'){
          _this.identitymodel = true;
          _this.identitytitle = '修改身份';
          _this.disflag.click=1;
          _this.resetForm2('identityForm');
          _this.queryIdentityById(_this.selidentity.identityId);
        }else if(flag == 'gljggw'){
          _this.showpostgl = true;
          _this.showpost(_this.selidentity);
        }else if(flag == 'bgzsf'){
          _this.updateMainIdentity(_this.selidentity)
        }
      },
      resetForm(formName) {
        let _this = this;
        if (_this.$refs[formName] !== undefined) {
          _this.$refs[formName].resetFields();
        }
        if (_this.$refs[formName+"1"] !== undefined) {
          _this.$refs[formName+"1"].resetFields();
        }
        if (_this.$refs[formName+"2"] !== undefined) {
          _this.$refs[formName+"2"].resetFields();
        }
      },
      resetForm2(formName) {
        let _this = this;
        if (_this.$refs[formName] !== undefined) {
          _this.$refs[formName].resetFields();
        }
      },
      saveForm(){
        let _this = this;
        _this.disflag.click=0;
        _this.$refs.operatorForm.validate((valid) => {
          if(valid){
            _this.$refs.operatorForm1.validate((valid) => {
              if(valid){
                _this.$refs.operatorForm2.validate((valid) => {
                  if(valid){
                    _this.operatorForm.startworkTime = _this.formatDate(_this.operatorForm.startworkTime,'date');
                    _this.operatorForm.endworkTime = _this.formatDate(_this.operatorForm.endworkTime,'date');
                    _this.operatorForm2.termStart = _this.formatDate(_this.operatorForm2.termStart,'date');
                    _this.operatorForm2.termEnd = _this.formatDate(_this.operatorForm2.termEnd,'date');
                    if(_this.titlename == '新增'){
                      _this.save();
                    }else if(_this.titlename == '修改'){
                      _this.update();
                    }else{
                      return false;
                    }
                  }else{
                    _this.disflag.click=1;
                    return false;
                  }
                });
              }else{
                _this.disflag.click=1;
                return false;
              }
            });
          }else{
            _this.disflag.click=1;
            return false;
          }
        });
      },
      save(){
        let _this = this;
        let para = Object.assign({}, _this.operatorForm,_this.operatorForm1,_this.operatorForm2);
        _this.$api.post(_this.$apis.permission+"/rest/permission/personnel/getpublickey", {}, function (res) {
          if(res.success){
            var publicKey = res.data;
            let password = encryptedData(publicKey, _this.operatorForm1.password);
            para["password"] = password;
            para["passwordr"] = password;
            _this.$api.post(_this.$apis.permission + "/rest/permission/personnel", para, function (res) {
              if (res.success == true) {
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
                _this.disflag.click=1;
              }
            })
          }
        });
      },
      update(){
        let _this = this;
        let para = Object.assign({}, _this.operatorForm,_this.operatorForm1,_this.operatorForm2);
        _this.$api.post(_this.$apis.permission+"/rest/permission/personnel/getpublickey", {}, function (res) {
          if(res.success){
            var publicKey = res.data;
            let password = encryptedData(publicKey, _this.operatorForm1.password);
            para["password"] = password;
            para["passwordr"] = password;
            _this.$api.put(_this.$apis.permission +"/rest/permission/personnel", para, function (res) {
              if (res.success == true) {
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
                _this.disflag.click=1;
              }
            })
          }
        });
      },
      resetPwd(obj){
        let _this = this;
        _this.$confirm('是否将['+obj.personnelName+"|"+obj.personnelCode+"]密码初始化", '提示', {
          type: 'warning',
          cancelButtonClass: 'btn-custom-cancel'
        }).then(() => {
          _this.$api.post(this.$apis.permission +"/rest/permission/personnel/resetpwd", {'personnelCode':obj.personnelCode}, function(res) {
            if(res.success == true) {
              _this.$message({
                message: '密码初始化成功',
                type: 'success'
              });
              _this.search();
            } else {
              _this.$message({
                message: '密码初始化失败,' + res.errorMsg,
                showClose:true,
                type: 'error'
              });
            }
          })
        }).catch(() => {
        });
      },
      freezeUser(obj){
        let _this = this;
        _this.$confirm('是否将['+obj.personnelName+"|"+obj.personnelCode+"]冻结", '提示', {
          type: 'warning',
          cancelButtonClass: 'btn-custom-cancel'
        }).then(() => {
          var parms = {
            'personnelCode':obj.personnelCode,
            'personnelId':obj.personnelId
          };
          _this.$api.post(this.$apis.permission +"/rest/permission/personnel/freeze", parms, function(res) {
            if(res.success == true) {
              _this.$message({
                message: '冻结成功',
                type: 'success'
              });
              _this.search();
            } else {
              _this.$message({
                message: '冻结失败,' + res.errorMsg,
                showClose:true,
                type: 'error'
              });
            }
          })
        }).catch(() => {
        });
      },
      del(obj){
        let _this = this;
        var identityCate = obj.identityCate;
        if(identityCate == 0){
          _this.$message({
            message: '管理员不能删除',
            showClose:true,
            type: 'error'
          });
          return;
        }
        _this.$confirm('是否将['+obj.personnelName+"|"+obj.personnelCode+"]删除，删除后以下信息也会一并删除：<br><font color='red'>*人员身份</font><br><font color='red'>*登录帐号信息</font>", '提示', {
          type: 'warning',
          cancelButtonClass: 'btn-custom-cancel',
          dangerouslyUseHTMLString: true
        }).then(() => {
          var parms = {
            'personnelCode':obj.personnelCode,
            'personnelId':obj.personnelId
          };
          _this.$api.post(this.$apis.permission +"/rest/permission/personnel/del", parms, function(res) {
            if(res.success == true) {
              _this.$message({
                message: '删除成功',
                type: 'success'
              });
              _this.search();
            } else {
              _this.$message({
                message: '删除失败,' + res.errorMsg,
                showClose:true,
            type: 'error'
              });
            }
          })
        }).catch(() => {
        });
      },
      handleNodeClick(data) {
        let _this = this;
        _this.$refs['queryForm']!=undefined? _this.$refs['queryForm'].resetFields():1
        if(data.organCode!=undefined && data.organCode !=null && data.organCode !=''){
          _this.formshow = 1;
          _this.queryForm.organCode = data.organCode;
          _this.currentOrganId = data.organId;
          _this.currentOrganCode = data.organCode;
          _this.currentOrganName = data.organName;
          _this.operatorForm2.organCode = data.organCode;
          _this.operatorForm2.organId = data.organId;
          _this.search();
        }else{
          _this.formshow = 0;
        }
      },
      handleJgNodeClick(data) {
        this.tmpjgdata = data;
      },
      handleJgNodeClick2(data){
        this.tmpjgdata = data;
      },
      saveCheckedKeys(){
        let _this = this;
        if(_this.tmpjgdata != null && _this.tmpjgdata != '' && _this.tmpjgdata != undefined){
          _this.identityForm.organCode = _this.tmpjgdata.id;
          _this.identityForm.organName = _this.tmpjgdata.name;
          _this.showjgtree = false;
          _this.tmpjgdata = [];
        }else{
          _this.$message({
            message: '请选择（单击）一个机构',
            showClose:true,
            type: 'error'
          });
          return;
        }
      },
      queryById(id) {
        let _this = this;
        _this.$api.get(_this.$apis.permission + "/rest/permission/personnel/" + id, {}, function (res) {
          if (res.success == true) {
            let data = res.data;
            _this.operatorForm.personnelId = id;
            _this.operatorForm.personnelCode = data.personnelCode;
            _this.operatorForm.personnelName= data.personnelName;
            _this.operatorForm.identityCard = data.identityCard;
            _this.operatorForm.position = data.position;
            _this.operatorForm.phone = data.phone;
            _this.operatorForm.email = data.email;
            _this.oldVal.phone = data.phone;
            _this.oldVal.email = data.email;
            _this.operatorForm.startworkTime = _this.formatDate(data.startworkTime,'char');
            _this.operatorForm.endworkTime = _this.formatDate(data.endworkTime,'char');
            _this.operatorForm.sex = data.sex;
            _this.operatorForm.valid = data.valid;
            _this.operatorForm1.accountCode = data.accountCode;
            _this.operatorForm1.accountValid = data.accountValid;
            _this.operatorForm2.identityId = data.identityId;
            _this.operatorForm2.identityCode = data.identityCode;
            _this.operatorForm2.identityName = data.identityName;
            _this.operatorForm2.identityValid = data.identityValid;
            _this.operatorForm2.termStart = _this.formatDate(data.termStart,'char');
            _this.operatorForm2.termEnd = _this.formatDate(data.termEnd,'char');
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
              type: 'error'
            });
          }
        })
      },
      formatDate(val,flag) {
        if(val==undefined || val =='' || val==null){
          return '';
        }
        if(flag=='char'){//char->date
          return this.$dateUtil.formatDate.parse(val, 'yyyy-MM-dd');
        }else{//date->char
          return this.$dateUtil.formatDate.format(val, 'yyyy-MM-dd');
        }
      },
      saveIdentityForm(){
        let _this = this;
        _this.disflag.click=0;
        _this.$refs.identityForm.validate((valid) => {
          if (valid) {
            _this.identityForm.termStart = _this.formatDate(_this.identityForm.termStart, 'date');
            _this.identityForm.termEnd = _this.formatDate(_this.identityForm.termEnd, 'date');
            if (_this.identitytitle == '新增身份') {
              _this.saveIdentity();
            } else if (_this.identitytitle == '修改身份') {
              _this.updateIdentity();
            } else {
              return false;
            }
          } else {
            _this.disflag.click = 1;
            return false;
          }
        });
      },
      saveIdentity(){
        let _this = this;
        let para = Object.assign({}, _this.identityForm);
        _this.$api.put(_this.$apis.permission + "/rest/permission/personnel/saveIdentity", para, function (res) {
          if (res.success == true) {
            _this.$message({
              message: '保存身份成功',
              type: 'success'
            });
            _this.identitymodel = false;
            _this.queryIdentityForm.personnelCode = _this.identityForm.personnelCode;
            _this.queryIdentityForm.pageNo = 1;
            _this.searchIdenfity();
          } else {
            _this.$message({
              message: '保存身份失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
            _this.disflag.click=1;
          }
        })
      },
      updateIdentity(){
        let _this = this;
        let para = Object.assign({}, _this.identityForm);
        _this.$api.put(_this.$apis.permission + "/rest/permission/personnel/updateidentity", para, function (res) {
          if (res.success == true) {
            _this.$message({
              message: '修改身份成功',
              type: 'success'
            });
            _this.identitymodel = false;
            _this.queryIdentityForm.personnelCode = _this.identityForm.personnelCode;
            _this.queryIdentityForm.pageNo = 1;
            _this.searchIdenfity();
          } else {
            _this.$message({
              message: '修改身份失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
            _this.disflag.click=1;
          }
        })
      },
      queryIdentityById(id) {
        let _this = this;
        _this.$api.get(_this.$apis.permission+"/rest/permission/personnel/identity/" + id, {}, function (res) {
          if (res.success == true) {
            let data = res.data;
            _this.identityForm.personnelCode = data.personnelCode;
            _this.identityForm.organCode= data.organCode;
            _this.identityForm.organName= data.organName;
            _this.identityForm.accountCode = data.accountCode;
            _this.identityForm.identityId = data.identityId;
            _this.identityForm.identityCode = data.identityCode;
            _this.identityForm.identityName = data.identityName;
            _this.identityForm.personnelName= data.personnelName;
            _this.identityForm.identityValid = data.identityValid;
            _this.identityForm.termStart = _this.formatDate(data.termStart,'char');
            _this.identityForm.termEnd = _this.formatDate(data.termEnd,'char');
          } else {
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      showpost(val){
        let _this = this;
        _this.datapost=[];
        _this.personnelpostvalue = [];
        _this.$api.get(_this.$apis.permission+"/rest/permission/personnel/postinfo", {params:{'organId':val.organId,'identityId':val.identityId}}, function (res) {
          if (res.success == true) {
            _this.datapost = res.data.allPost;
            let linked = res.data.linkedPost;
            for(let i = 0; i < linked.length; i++){
              _this.personnelpostvalue.push(linked[i].postId);
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
          this.savePost(movedKeys)
        }else{//del
          this.delPost(movedKeys);
        }
      },
      savePost(val){
        let _this = this;
        let params = {
          'organCode':_this.selidentity.organCode,
          'organId':_this.selidentity.organId,
          'identityCode':_this.selidentity.identityCode,
          'identityId':_this.selidentity.identityId,
          'postId':val.join()
        };
        _this.$api.post(_this.$apis.permission+"/rest/permission/personnel/savepost",params,function (res) {
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
      delPost(val){
        let _this = this;
         let params = {
          'organCode':_this.selidentity.organCode,
          'organId':_this.selidentity.organId,
          'identityCode':_this.selidentity.identityCode,
          'identityId':_this.selidentity.identityId,
          'postId':val.join()
        };
        _this.$api.post(_this.$apis.permission+"/rest/permission/personnel/delpost", params,function (res) {
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
      updateMainIdentity(val){
        let _this = this;
        _this.$confirm('是否将【'+val.identityName+'|'+val.identityCode+'】变更为主身份？', '提示', {
          type: 'warning',
          cancelButtonClass: 'btn-custom-cancel'
        }).then(() => {
          _this.$api.post(_this.$apis.permission + "/rest/permission/personnel/updatemainidentity",{'personnelId':val.personnelId,'personnelCode':val.personnelCode,'identityId':val.identityId},function (res) {
            if(res.success == true) {
              _this.$message({
                message: ' 变更主身份成功',
                type: 'success'
              });
              _this.queryIdentityForm.personnelCode = val.personnelCode;
              _this.queryIdentityForm.pageNo = 1;
              _this.searchIdenfity();
            } else {
              _this.$message({
                message: '变更主身份关联失败,' + res.errorMsg,
                showClose:true,
            type: 'error'
              });
            }
          })
        }).catch(() => {
        });
      },
      getPersonnelTree() {
        let _this = this;
        if(_this.filterText=='' ||_this.filterText==null){
          _this.$message({
            message: '姓名不能为空',
            showClose:true,
            type: 'error'
          });
          return;
        }
       
        let params = {
          'organCode':_this.currentOrganCode,
          'personnelName':_this.filterText
        };
         _this.personneltreeload = true;
        _this.$api.post(_this.$apis.permission + "/rest/permission/personnel/personneltree", params, function (res) {
          if (res.success == true) {
            _this.personnelTreeData = res.data;
            _this.personneltreeload = false;
          } else {
            _this.personneltreeload = false;
            _this.$message({
              message: '查询失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      },
      savePersonnelCheckedKeys() {
        let _this = this;
        let node = _this.$refs.personneltree.getCheckedNodes();
        if( node.length===0){
          _this.$message({
            message: '没有做任务操作',
            type: 'success'
          });
          _this.showpersonneltree = false;
          return;
        }
        var params = {
          'node':node,
          'organCode':_this.currentOrganCode,
          'organId':_this.currentOrganId,
          'organName':_this.currentOrganName
        }
        _this.$api.post(_this.$apis.permission + "/rest/permission/personnel/savemorepersonnelidentity", params, function (res) {
          if (res.success == true) {
            _this.$message({
              message: '增加身份成功',
              type: 'success'
            });
            _this.showpersonneltree = false;
            _this.search();
          } else {
            _this.$message({
              message: '增加身份失败,' + res.errorMsg,
              showClose:true,
            type: 'error'
            });
          }
        })
      }
    }
  }
</script>