<template>
  <div class="drawer-wrap" v-loading="loading">
    <div class="rh-drawer-head">
      <div class="drawer-title">
        <div class="tips-content">
          <span class="rh-helpTip-text">税控信息同步</span>
          <span class="rh-helpTip-icon">
            <el-tooltip
              class="item"  content="温馨提示：此步骤完成税控核心板盘组设置">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </span>
        </div>
      </div>
    </div>
    <div class="rh-drawer-body">
     <div class="steps" >
      <el-steps :space="200" :active="active" finish-status="success" >
        <el-step title="开票终端"></el-step>
        <el-step title="发票类型"></el-step>
        <el-step title="核定税率"></el-step>
      </el-steps>
     </div>
     <div class="space20"></div>
      <div class="step" v-if="active == 0">
       <el-form :model="editForm" :rules="rules" ref="editForm" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="纳税人识别号" prop="nsrsbh">
              <el-input v-model="editForm.nsrsbh" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="纳税人名称" prop="nsrmc">
              <el-input v-model="editForm.nsrmc" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="机器编号" prop="xnsbh">
              <el-input v-model="editForm.xnsbh" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="所有发票类型代码" prop="fplxdm">
              <el-input v-model="editForm.fplxdm" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="rh-table">
          <el-table :data="tableData" stripe border height="350">
            <template slot="empty">
              <div class="pic_nodata"></div>
            </template>
            <el-table-column label="序号" width="50px" align="center">
              <template slot-scope="scope"> {{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="fplxdm" label="发票类型代码"></el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="fplxmc" label="发票类型名称"></el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="kpddm" label="开票终端代码"></el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="kpdmc" label="开票终端名称"></el-table-column>
            <!-- <el-table-column show-overflow-tooltip align="left" prop="kpdlx" label="开票终端类型"></el-table-column> -->
          </el-table>
        </div>
       </el-form>
       <div class="space20"></div>
        <div class="step-bt-group">
          <el-button type="primary" @click="getterminalInfo">开票终端同步</el-button>
          <el-button type="primary" @click="nextPage(1,1)">下一步</el-button>
          <el-button @click="close('editForm')">关闭</el-button>
        </div>
      </div> 
 
      <div class="step" v-if="active == 1">
        <el-form :model="editFormTaxMonitorInfo" :rules="rules" ref="editFormTaxMonitorInfo" label-width="140px" label-position="right">
          <el-row>
            <el-col :span="11">
              <el-form-item label="纳税人识别号" prop="nsrsbh">
                <el-input v-model="editFormTaxMonitorInfo.nsrsbh" :readonly="true" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="纳税人名称" prop="nsrmc">
                <el-input v-model="editFormTaxMonitorInfo.nsrmc" :readonly="true" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="机器编号" prop="xnsbh">
                <el-input v-model="editFormTaxMonitorInfo.xnsbh" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="所有发票类型代码" prop="fplxdm">
                <el-input v-model="editFormTaxMonitorInfo.fplxdm" :readonly="true" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="rh-table">
            <el-table :data="tableDataTaxMonitorInfo" stripe border height="350" style="width: 97%">
              <template slot="empty">
                  <div class="pic_nodata"></div>
              </template>
                <el-table-column label="序号" width="50px" align="center" fixed>
                  <template slot-scope="scope"> {{scope.$index+1}}</template>
                </el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="fplxmc" label="发票类型代码" width="130"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="fplxdm" label="发票类型代码" width="100"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="bszzrq" label="截止开票时间"  width="100"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="dzkpxe" label="单张开票限额"  width="100"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="kpjzsj" label="开票截止日期" width="100"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="bsqsrq" label="报送起始日期" width="100"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="bszzrq" label="报送终止日期" width="100"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="lxkpsc" label="离线开票时长(小时)" width="150"></el-table-column>
              <el-table-column align="center" label="操作"  width="60" fixed="right">
                <template slot-scope="scope">
                  <el-button class="table_btn" type="text" @click="queryTaxMonitorInfo(scope.row)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
         <div class="space20"></div>
        <div class="step-bt-group">
          <el-button type="primary" @click="active=0">上一步</el-button>
          <el-button type="primary" @click="getTaxMonitorInfo">发票类型同步</el-button>
          <el-button type="primary" @click="nextPage(2)">下一步</el-button>
          <el-button @click="close('editFormTaxplayerInfo')">关闭</el-button>
        </div>
      </div> 

      <div class="step" v-if="active == 2">
        <el-form :model="editFormtaxrate" :rules="rules" ref="editFormtaxrate" label-width="140px" label-position="right">
          <el-row>
            <el-col :span="11">
              <el-form-item label="纳税人识别号" prop="nsrsbh">
                <el-input v-model="editFormtaxrate.nsrsbh" :readonly="true" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="纳税人名称" prop="nsrmc">
                <el-input v-model="editFormtaxrate.nsrmc" :readonly="true" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="机器编号" prop="xnsbh">
                <el-input v-model="editFormtaxrate.xnsbh" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="所有发票类型代码" prop="fplxdm">
                <el-input v-model="editFormtaxrate.fplxdm" :readonly="true" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="rh-table">
            <el-table :data="tableDatataxrate" stripe border height="350">
              <template slot="empty">
                  <div class="pic_nodata"></div>
              </template>
              <el-table-column label="序号" width="50px" align="center">
                  <template slot-scope="scope"> {{scope.$index+1}}</template>
              </el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="fplxmc" label="发票类型名称"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="fplxdm" label="发票类型代码"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="sl" label="税率"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="slmc" label="税率名称"></el-table-column>
            </el-table>
          </div>
        </el-form>
         <div class="space20"></div>
        <div class="step-bt-group">
          <el-button type="primary" @click="active=1">上一步</el-button>
          <el-button type="primary" @click="getTaxRateInfo">核定税率同步</el-button>
          <el-button @click="close('editFormCert')">关闭</el-button>
        </div>
      </div> 
      <!--监控管理数据查看-->
      <div class="drawer-container add" :key=1000>
        <el-drawer :with-header="false" append-to-body size="70%" :visible.sync="drawer">
          <editPage v-if="drawer" @back="back" :updatePageData="updatePageData" ></editPage>
        </el-drawer>
      </div>

    </div>
  </div>
</template>

<script>
import {validator} from '@/utils/validate.js';
import editPage from "./taxmonitorInfo.vue";
import validate from "@/utils/validate.js";

export default {
  components: {
    editPage,
  },


  props: ["updatePageDatataxcardset"],

  data() {
    return {
      drawer: false,
      active:0,
      isShow:false,
      //开票终端同步
      editForm: {
        nsrsbh: "",
        nsrmc: "",
        xnsbh: "",
        fplxdm: "",
        fwdz: "",
        fwqdm: "",
      },
      //监控管理数据同步
      editFormTaxMonitorInfo: {
        nsrsbh: "",
        nsrmc: "",
        xnsbh: "",
        fplxdm: "",
        fwdz: "",
        fwqdm: "",
      },
      //监控数据获取
      editFormMonitorInfo: {
        fwqdzdk: "",
        xnsbh: "",
        nsrsbh: "",
        nsrmc: "",
        fplxdm: "",
      },
      //核定税率
      editFormtaxrate: {
        fwqdzdk: "",
        xnsbh: "",
        nsrsbh: "",
        nsrmc: "",
        fplxdm: "",
      },
      tableData: [],
      tableDataTaxMonitorInfo: [],
      tableDatataxrate: [],
      updatePageData: {},
      //校验规则
      rules: {
      },
      loading: false,
    };
  },

  created() {},

  mounted() {
    this.initTaxSetinfo();
  },

  methods: {

    //初始化纳税人信息
    initTaxSetinfo(){
      let _this = this;
      _this.editForm.xnsbh=_this.updatePageDatataxcardset.row.xnsbh;
      _this.editForm.nsrsbh=_this.updatePageDatataxcardset.row.nsrsbh;
      _this.editForm.nsrmc=_this.updatePageDatataxcardset.row.nsrmc;
      _this.editForm.fwdz=_this.updatePageDatataxcardset.row.fwdz;
      _this.editForm.fplxdm=_this.updatePageDatataxcardset.row.fplxdm;
      _this.editForm.fwqdm=_this.updatePageDatataxcardset.row.fwqdm;
      _this.listTerminalInfo();
    },


    //开票终端同步，同步
    getterminalInfo() {
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
      //打开loading
      _this.loading=true;
      if(_this.updatePageDatataxcardset.row.fwqlxdm=='002'){
        //核心板
        this.$api.post(
          _this.$apis.icpmanagement + "/taxcontrol/taxSet/getTerminalInfo", params,
          function (res) {
            //关闭loading
            _this.loading=false;
            if (res.success) {
              console.info(JSON.stringify(res.data));
              _this.tableData = res.data;
              //console.info(JSON.stringify(res));
              //  _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.comment+","+res.data.returnmsg,
              //    '税控核心板盘组返回提示', {
              //    confirmButtonText: '关闭',
              //    dangerouslyUseHTMLString: true
              //  });
            } else {
              _this.$message({
                message: "查询失败," + res.errorMsg,
                type: "error",
              });
            }
          }
        );
      }
      if(_this.updatePageDatataxcardset.row.fwqlxdm=='003'){
        //UKEY
        this.$api.post(
          _this.$apis.icpmanagement + "/taxcontrol/taxSet/getTerminalUkeyInfo", params,
          function (res) {
            //关闭loading
            _this.loading=false;
            if (res.success) {
              _this.tableData = res.data;
              //console.info(JSON.stringify(res));
              //  _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.comment+","+res.data.returnmsg,
              //    '税控核心板盘组返回提示', {
              //    confirmButtonText: '关闭',
              //    dangerouslyUseHTMLString: true
              //  });
            } else {
              _this.$message({
                message: "查询失败," + res.errorMsg,
                type: "error",
              });
            }
          }
        );
      }
    },


    //查询数据库，开票终端同步
    listTerminalInfo() {
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
      //打开loading
      _this.loading=true;
      if(_this.updatePageDatataxcardset.row.fwqlxdm=='002'){
        //核心板
        this.$api.post(
          _this.$apis.icpmanagement + "/taxcontrol/taxSet/listTerminalInfo", params,
          function (res) {
            //关闭loading
            _this.loading=false;
            if (res.success) {
              console.info(JSON.stringify(res.data));
              _this.tableData = res.data;
              //console.info(JSON.stringify(res));
              //  _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.comment+","+res.data.returnmsg,
              //    '税控核心板盘组返回提示', {
              //    confirmButtonText: '关闭',
              //    dangerouslyUseHTMLString: true
              //  });
            } else {
              _this.$message({
                message: "查询失败," + res.errorMsg,
                type: "error",
              });
            }
          }
        );
      }
      if(_this.updatePageDatataxcardset.row.fwqlxdm=='003'){
        //UKEY
        this.$api.post(
          _this.$apis.icpmanagement + "/taxcontrol/taxSet/listTerminalUkeyInfo", params,
          function (res) {
            //关闭loading
             _this.loading=false;
            if (res.success) {
              _this.tableData = res.data;
              //console.info(JSON.stringify(res));
              //  _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.comment+","+res.data.returnmsg,
              //    '税控核心板盘组返回提示', {
              //    confirmButtonText: '关闭',
              //    dangerouslyUseHTMLString: true
              //  });
            } else {
              _this.$message({
                message: "查询失败," + res.errorMsg,
                type: "error",
              });
            }
          }
        );
      }
    },


    //监控管理数据同步，发票类型
    getTaxMonitorInfo() {
      let _this = this;
      let params = this.editFormTaxMonitorInfo;
      _this.$set(params, "tableData", _this.tableData);
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
      //打开loading
      _this.loading=true;
      if(_this.updatePageDatataxcardset.row.fwqlxdm=='002'){
        //税控核心板
        this.$api.post(
          _this.$apis.icpmanagement + "/taxcontrol/taxSet/getTaxMonitorInfo", params,
          function (res) {
            //关闭loading
            _this.loading=false;
            console.info(JSON.stringify(res));
            if (res.success) {
              _this.tableDataTaxMonitorInfo = res.data;
              //  _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.comment+","+res.data.returnmsg,
              //    '税控核心板盘组返回提示', {
              //    confirmButtonText: '关闭',
              //    dangerouslyUseHTMLString: true
              //  });
            } else {
              _this.$message({
                message: "查询失败," + res.errorMsg,
                type: "error",
              });
            }
          }
        );
      }
      if(_this.updatePageDatataxcardset.row.fwqlxdm=='003'){
        //UKEY
        this.$api.post(
          _this.$apis.icpmanagement + "/taxcontrol/taxSet/getTaxMnitorUkeyInfo", params,
          function (res) {
            //关闭loading
            _this.loading=false;
             console.info(JSON.stringify(res));
              // _this.$alert('返回代码：'+res.data[0].returncode+'</br>'+'返回描述：'+res.data[0].returnmsg,
              //   'UKEY盘组返回提示', {
              //   confirmButtonText: '关闭',
              //   dangerouslyUseHTMLString: true
              // });
            if (res.success) {
              _this.tableDataTaxMonitorInfo = res.data;
              loading.close();
            } else {
              // _this.$message({
              //   message: "查询失败," + res.errorMsg,
              //   type: "error",
              // });
              loading.close();
            }
          }
        );
      }
    },

    
    //查询数据库，监控管理数据，发票类型
    listTaxMonitorInfo() {
      let _this = this;
      let params = this.editFormTaxMonitorInfo;
      _this.$set(params, "tableData", _this.tableData);
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
      //打开loading
      _this.loading=true;
      if(_this.updatePageDatataxcardset.row.fwqlxdm=='002'){
        //税控核心板
        this.$api.post(
          _this.$apis.icpmanagement + "/taxcontrol/taxSet/listTaxMonitorInfo", params,
          function (res) {
            //关闭loading
            _this.loading=false;
            console.info(JSON.stringify(res));
            if (res.success) {
              _this.tableDataTaxMonitorInfo = res.data;
              //  _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.comment+","+res.data.returnmsg,
              //    '税控核心板盘组返回提示', {
              //    confirmButtonText: '关闭',
              //    dangerouslyUseHTMLString: true
              //  });
            } else {
              _this.$message({
                message: "查询失败," + res.errorMsg,
                type: "error",
              });
            }
          }
        );
      }
      
      if(_this.updatePageDatataxcardset.row.fwqlxdm=='003'){
        //UKEY
        this.$api.post(
          _this.$apis.icpmanagement + "/taxcontrol/taxSet/listTaxMnitorUkeyInfo", params,
          function (res) {
            //关闭loading
            _this.loading=false;
             console.info(JSON.stringify(res));
              // _this.$alert('返回代码：'+res.data[0].returncode+'</br>'+'返回描述：'+res.data[0].returnmsg,
              //   'UKEY盘组返回提示', {
              //   confirmButtonText: '关闭',
              //   dangerouslyUseHTMLString: true
              // });
            if (res.success) {
              _this.tableDataTaxMonitorInfo = res.data;
              loading.close();
            } else {
              // _this.$message({
              //   message: "查询失败," + res.errorMsg,
              //   type: "error",
              // });
              loading.close();
            }
          }
        );
      }
    },

    //同步核定税率
    getTaxRateInfo() {
      let _this = this;
      let params = this.editFormtaxrate;
      // _this.$set(params, "tableData", _this.tableData);
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
      //打开loading
      _this.loading=true;
     if(_this.updatePageDatataxcardset.row.fwqlxdm=='002'){
       //税控核心板
        this.$api.post(
          _this.$apis.icpmanagement + "/taxcontrol/taxSet/getTaxRateInfo", params,
          function (res) {
            //关闭loading
            _this.loading=false;
            if (res.success) {
              _this.tableDatataxrate = res.data;
              //console.info(JSON.stringify(res));
              //  _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.comment+","+res.data.returnmsg,
              //    '税控核心板盘组返回提示', {
              //    confirmButtonText: '关闭',
              //    dangerouslyUseHTMLString: true
              //  });
            } else {
              _this.$message({
                message: "查询失败," + res.errorMsg,
                type: "error",
              });
            }
          }
        );
     }
     if(_this.updatePageDatataxcardset.row.fwqlxdm=='003'){
       //UKEY
        this.$api.post(
          _this.$apis.icpmanagement + "/taxcontrol/taxSet/getTaxRateUkeyInfo", params,
          function (res) {
            console.info(JSON.stringify(res));
            //关闭loading
            _this.loading=false;
            if (res.success) {
              _this.tableDatataxrate = res.data;
              //  _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.comment+","+res.data.returnmsg,
              //    '税控核心板盘组返回提示', {
              //    confirmButtonText: '关闭',
              //    dangerouslyUseHTMLString: true
              //  });
            } else {
              _this.$message({
                message: "查询失败," + res.errorMsg,
                type: "error",
              });
            }
          }
        );
     }
    },



    //查询数据库，核定税率
    listTaxRateInfo() {
      let _this = this;
      let params = this.editFormtaxrate;
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
      // _this.$set(params, "tableData", _this.tableData);
      //打开loading
      _this.loading=true;
      this.$api.post(
        _this.$apis.icpmanagement + "/taxcontrol/taxSet/listTaxRateInfo", params,
        function (res) {
          //关闭loading
          _this.loading=false;
          if (res.success) {
            _this.tableDatataxrate = res.data;
            //console.info(JSON.stringify(res));
            //  _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.comment+","+res.data.returnmsg,
            //    '税控核心板盘组返回提示', {
            //    confirmButtonText: '关闭',
            //    dangerouslyUseHTMLString: true
            //  });
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },


  nextPage(num,index){
    let _this = this;
    if(num == 1){
      if(_this.editForm.xnsbh==undefined){
        _this.$alert('虚拟设备号不能为空，请先进行虚拟设备发行',
          '提示', {
          confirmButtonText: '关闭'
        });
        return;
      }
      _this.editFormTaxMonitorInfo.xnsbh=_this.updatePageDatataxcardset.row.xnsbh;
      _this.editFormTaxMonitorInfo.nsrsbh=_this.updatePageDatataxcardset.row.nsrsbh;
      _this.editFormTaxMonitorInfo.nsrmc=_this.updatePageDatataxcardset.row.nsrmc;
      _this.editFormTaxMonitorInfo.fwdz=_this.updatePageDatataxcardset.row.fwdz;
      _this.editFormTaxMonitorInfo.fplxdm=_this.updatePageDatataxcardset.row.fplxdm;
      _this.editFormTaxMonitorInfo.fwqdm=_this.updatePageDatataxcardset.row.fwqdm;
      _this.listTaxMonitorInfo();
      _this.active = 1;
    }
    if(num == 2){
      _this.editFormtaxrate.xnsbh=_this.updatePageDatataxcardset.row.xnsbh;
      _this.editFormtaxrate.nsrsbh=_this.updatePageDatataxcardset.row.nsrsbh;
      _this.editFormtaxrate.nsrmc=_this.updatePageDatataxcardset.row.nsrmc;
      _this.editFormtaxrate.fwdz=_this.updatePageDatataxcardset.row.fwdz;
      _this.editFormtaxrate.fplxdm=_this.updatePageDatataxcardset.row.fplxdm;
      _this.editFormtaxrate.fwqdm=_this.updatePageDatataxcardset.row.fwqdm;
      _this.listTaxRateInfo();
      _this.active = 2;
    }
  },

    //监控管理数据查看面抽屉
    queryTaxMonitorInfo(row) {
      this.drawer = true;
      this.updatePageData = {
        row: row,
      };
    },

    //关闭抽屉
    back() {
      this.drawer = false;
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

<style lang="less">
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