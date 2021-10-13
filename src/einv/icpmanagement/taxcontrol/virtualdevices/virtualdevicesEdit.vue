<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title">
        <div class="tips-content">
          <span class="rh-helpTip-text">虚拟设备发行</span>
          <span class="rh-helpTip-icon">
            <el-tooltip
              class="item"  content="温馨提示：此步骤完成虚拟设备的发行一系列操作">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </span>
        </div>
      </div>
    </div>
    <div class="rh-drawer-body">
     <div class="steps" >
      <el-steps :space="200" :active="active" finish-status="success" >
        <el-step title="虚拟设备发行" description="发行查询和发行"></el-step>
        <el-step title="企业信息下载" description="企业信息下载和获取"></el-step>
        <el-step title="虚拟设备制证"></el-step>
        <el-step title="监控数据获取"></el-step>
        <el-step title="核定税率获取"></el-step>
      </el-steps>
     </div>
     <div class="space20"></div>
      <div class="step" v-if="active == 0">
       <el-form :model="editForm" :rules="rules" ref="editForm" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="税控服务器地址端口" prop="fwqdzdk">
                      <el-select v-model="editForm.fwqdzdk" placeholder="请选择税控服务器" >
                          <el-option 
                          v-for="item in fwqdzList" 
                          :key="item.fwqdzdk"
                          :label="item.fwqmc"
                          :value="item.fwqdzdk">
                          </el-option>
                      </el-select>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="省份" prop="sf">
                      <el-select v-model="editForm.sf" placeholder="请选择省份" >
                          <el-option 
                          v-for="item in provinceList" 
                          :key="item.id"
                          :label="item.sf"
                          :value="item.sf">
                          </el-option>
                      </el-select>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="纳税人识别号" prop="nsrsbh">
              <el-input v-model="editForm.nsrsbh" placeholder="纳税人识别号" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="纳税人名称" prop="nsrmc">
              <el-input v-model="editForm.nsrmc" placeholder="纳税人名称" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="虚拟设备号" prop="xnsbh">
              <el-input v-model="editForm.xnsbh" placeholder="虚拟设备号" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="可发行数量" prop="kfxsl">
              <el-input v-model="editForm.kfxsl" placeholder="可发行数量" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="发票类型代码" prop="fplxdm">
              <el-input v-model="editForm.fplxdm" placeholder="发票类型代码" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
       </el-form>
        <div class="step-bt-group">
          <el-button type="primary" @click="virtualdevicesIssue">虚拟设备发行</el-button>
          <el-button type="primary" @click="nextPage(1,1)">下一步</el-button>
          <el-button @click="close('editForm')">关闭</el-button>
        </div>
      </div> 
 
      <div class="step" v-if="active == 1">
       <el-form :model="editFormTaxplayerInfo" :rules="rules" ref="editFormTaxplayerInfo" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="22" v-show="isShow">
            <el-form-item label="税控服务器地址端口" prop="fwqdzdk" >
               <el-input v-model="editFormTaxplayerInfo.fwqdzdk" placeholder="税控服务器地址端口"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="纳税人识别号" prop="nsrsbh">
              <el-input v-model="editFormTaxplayerInfo.nsrsbh" placeholder="纳税人识别号"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="纳税人名称" prop="nsrmc">
              <el-input v-model="editFormTaxplayerInfo.nsrmc" placeholder="纳税人名称"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="虚拟设备号" prop="xnsbh">
              <el-input v-model="editFormTaxplayerInfo.xnsbh" placeholder="虚拟设备号"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
       </el-form>
        <div class="step-bt-group">
          <el-button type="primary" @click="active=0">上一步</el-button>
          <el-button type="primary" @click="getTaxplayerInfo">企业信息下载和信息获取</el-button>
          <el-button type="primary" @click="nextPage(2)">下一步</el-button>
          <el-button @click="close('editFormTaxplayerInfo')">关闭</el-button>
        </div>
      </div> 

      <div class="step" v-if="active == 2">
       <el-form :model="editFormCert" :rules="rules" ref="editFormCert" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="11" v-show="isShow">
            <el-form-item label="税控服务器地址端口" prop="fwqdzdk">
              <el-input v-model="editFormCert.fwqdzdk" placeholder="税控服务器地址端口"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="纳税人识别号" prop="nsrsbh">
              <el-input v-model="editFormTaxplayerInfo.nsrsbh" placeholder="纳税人识别号"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="纳税人名称" prop="nsrmc">
              <el-input v-model="editFormTaxplayerInfo.nsrmc" placeholder="纳税人名称"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="虚拟设备号" prop="xnsbh">
              <el-input v-model="editFormCert.xnsbh" placeholder="虚拟设备号"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
       </el-form>
        <div class="step-bt-group">
          <el-button type="primary" @click="active=1">上一步</el-button>
          <el-button type="primary" @click="virtualdevicesCert">虚拟设备制证</el-button>
          <el-button type="primary" @click="nextPage(3)">下一步</el-button>
          <el-button @click="close('editFormCert')">关闭</el-button>
        </div>
      </div> 

      <div class="step" v-if="active == 3">
       <el-form :model="editFormMonitorInfo" :rules="rules" ref="editFormMonitorInfo" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="22" v-show="isShow">
            <el-form-item label="税控服务器地址端口" prop="fwqdzdk">
              <el-input v-model="editFormMonitorInfo.fwqdzdk" placeholder="税控服务器地址端口"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="纳税人识别号" prop="nsrsbh">
              <el-input v-model="editFormMonitorInfo.nsrsbh" placeholder="纳税人识别号"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="纳税人名称" prop="nsrmc">
              <el-input v-model="editFormMonitorInfo.nsrmc" placeholder="纳税人名称"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="虚拟设备号" prop="xnsbh">
              <el-input v-model="editFormMonitorInfo.xnsbh" placeholder="虚拟设备号"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="发票类型" prop="fplxdm">
              <el-input v-model="editFormMonitorInfo.fplxdm" placeholder="发票类型"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
       </el-form>
        <div class="step-bt-group">
          <el-button type="primary" @click="active=2">上一步</el-button>
          <el-button type="primary" @click="getMonitorInfo">监控数据获取获取</el-button>
          <el-button type="primary" @click="nextPage(4)">下一步</el-button>
          <el-button @click="close('editFormMonitorInfo')">关闭</el-button>
        </div>
      </div>

      <div class="step" v-if="active == 4">
       <el-form :model="editFormTaxRateInfo" :rules="rules" ref="editFormTaxRateInfo" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="22" v-show="isShow">
            <el-form-item label="税控服务器地址端口" prop="fwqdzdk">
              <el-input v-model="editFormTaxRateInfo.fwqdzdk" placeholder="税控服务器地址端口"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="纳税人识别号" prop="nsrsbh">
              <el-input v-model="editFormMonitorInfo.nsrsbh" placeholder="纳税人识别号"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="纳税人名称" prop="nsrmc">
              <el-input v-model="editFormTaxRateInfo.nsrmc" placeholder="纳税人名称"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="虚拟设备号" prop="xnsbh">
              <el-input v-model="editFormTaxRateInfo.xnsbh" placeholder="虚拟设备号"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="发票类型" prop="fplx">
              <el-input v-model="editFormTaxRateInfo.fplxdm" placeholder="发票类型"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
       </el-form>
        <div class="step-bt-group">
          <el-button type="primary" @click="active=3">上一步</el-button>
          <el-button type="primary" @click="taxRateInfo">核定税率获取</el-button>
          <el-button @click="close('editFormTaxRateInfo')">关闭</el-button>
        </div>
      </div> 


    </div>
  </div>
</template>

<script>
import {validator} from '@/utils/validate.js';
import validate from "@/utils/validate.js";

export default {
  props: ["updatePageData"],

  data() {
    let editFlag = !this.updatePageData.id
    return {
      active:0,
      editFlag,
      provinceList:[],
      fwqdzList:[],
      isShow:false,
      editForm: {
        id: "",
        fwqdzdk: "",
        sf: "",
        nsrsbh: "",
        nsrmc: "",
        kfxsl: "",
        fplxdm: "",
        xnsbh: "",
        organCode: "",
      },
      //企业信息下载和获取
      editFormTaxplayerInfo: {
        fwqdzdk: "",
        xnsbh: "",
        nsrsbh: "",
        nsrmc: "",
      },
      //虚拟设备制证
      editFormCert: {
        fwqdzdk: "",
        xnsbh: "",
        nsrsbh: "",
        nsrmc: "",
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
      editFormTaxRateInfo: {
        fwqdzdk: "",
        xnsbh: "",
        nsrsbh: "",
        nsrmc: "",
        fplxdm: "",
      },
      //校验规则
      rules: {
      },
    };
  },

  created() {},

  mounted() {
    this.initTaxServerinfo();
    this.init_province();
    this.init_taxService();
  },

  methods: {

    //初始化纳税人信息
    initTaxServerinfo(){
      let _this = this;
      _this.editForm.xnsbh=_this.updatePageData.organCode;
      _this.editForm.nsrsbh=_this.updatePageData.nsrsbh;
      _this.editForm.nsrmc=_this.updatePageData.nsrmc;
    },


    // 获取税控服务器地址：端口：税务UKEY编号
    init_taxService(){
      let _this = this;
      this.$api.get(_this.$apis.icpmanagement +"/taxcontrol/virtualDevices/getTaxServerService",{},
        function (res) {
          if (res.success) {
             _this.fwqdzList= res.data;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );  
    },

    // 获取省份
    init_province(){
      let _this = this;
      this.$api.get(_this.$apis.icpmanagement +"/taxcontrol/digitalsignature/getProvince",{},
        function (res) {
          if (res.success) {
             _this.provinceList= res.data;
             //console.info(JSON.stringify(_this.provinceList));
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );  
    },

    //虚拟设备发行
    virtualdevicesIssue() {
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
      const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'})
      this.$api.post(
        _this.$apis.icpmanagement + "/taxcontrol/virtualDevices/virtualdevicesIssue", params,
        function (res) {
          if (res.success) {
            _this.editForm.kfxsl = res.data.kfxsl;
            _this.editForm.fplxdm = res.data.fplxdm;
            _this.editForm.xnsbh = res.data.xnsbh;
             console.info(JSON.stringify(_this.editForm));
             _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.comment+","+res.data.returnmsg,
               '税控服务器返回提示', {
               confirmButtonText: '关闭',
               dangerouslyUseHTMLString: true
             });
            //关闭loading
            loading.close();
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
            //关闭loading
            loading.close();
          }
        }
      );
    },
          
    //企业信息下载和获取
    getTaxplayerInfo() {
      let _this = this;
      let params = this.editFormTaxplayerInfo;
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
      const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'})
      this.$api.post(
        _this.$apis.icpmanagement + "/taxcontrol/virtualDevices/getTaxplayerInfo", params,
        function (res) {
          if (res.success) {
            _this.editFormTaxplayerInfo.kfxsl = res.data.kfxsl;
            _this.editFormTaxplayerInfo.fplxdm = res.data.fplxdm;
             console.info(JSON.stringify(_this.editFormTaxplayerInfo));
             _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.comment+","+res.data.returnmsg,
               '税控服务器返回提示', {
               confirmButtonText: '关闭',
               dangerouslyUseHTMLString: true
             });
            //关闭loading
            loading.close();
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
            //关闭loading
            loading.close();
          }
        }
      );
    },

    //虚拟设备制证
    virtualdevicesCert() {
      let _this = this;
      let params = this.editFormCert;
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
      const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'})
      this.$api.post(
        _this.$apis.icpmanagement + "/taxcontrol/virtualDevices/virtualdevicesCert", params,
        function (res) {
          if (res.success) {
             console.info(JSON.stringify(_this.editFormCert));
             _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.comment+","+res.data.returnmsg,
               '税控服务器返回提示', {
               confirmButtonText: '关闭',
               dangerouslyUseHTMLString: true
             });
            //关闭loading
            loading.close();
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
            //关闭loading
            loading.close();
          }
        }
      );
    },

    //监控管理数据获取
    getMonitorInfo() {
      let _this = this;
      let params = this.editFormMonitorInfo;
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
      const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'})
      this.$api.post(
        _this.$apis.icpmanagement + "/taxcontrol/virtualDevices/monitorInfo", params,
        function (res) {
          if (res.success) {
             console.info(JSON.stringify(_this.editFormMonitorInfo));
             _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.returnmsg,
               '税控服务器返回提示', {
               confirmButtonText: '关闭',
               dangerouslyUseHTMLString: true
             });
            //关闭loading
            loading.close();
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
            //关闭loading
            loading.close();
          }
        }
      );
    },

    //核定税率
    taxRateInfo() {
      let _this = this;
      let params = this.editFormTaxRateInfo;
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
      const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'})
      this.$api.post(
        _this.$apis.icpmanagement + "/taxcontrol/virtualDevices/taxRateInfo", params,
        function (res) {
          if (res.success) {
             console.info(JSON.stringify(_this.editFormTaxRateInfo));
             _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.comment+","+res.data.returnmsg,
               '税控服务器返回提示', {
               confirmButtonText: '关闭',
               dangerouslyUseHTMLString: true
             });
            //关闭loading
            loading.close();
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
            //关闭loading
            loading.close();
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
      _this.editFormTaxplayerInfo.fwqdzdk=_this.editForm.fwqdzdk;
      _this.editFormTaxplayerInfo.xnsbh=_this.editForm.xnsbh;
      _this.editFormTaxplayerInfo.nsrsbh=_this.editForm.nsrsbh;
      _this.editFormTaxplayerInfo.nsrmc=_this.editForm.nsrmc;
      _this.active = 1;
    }
    if(num == 2){
      _this.editFormCert.fwqdzdk=_this.editForm.fwqdzdk;
      _this.editFormCert.xnsbh=_this.editForm.xnsbh;
      _this.editFormCert.nsrsbh=_this.editForm.nsrsbh;
      _this.editFormCert.nsrmc=_this.editForm.nsrmc;
      _this.active = 2;
    }
    if(num == 3){
      _this.editFormMonitorInfo.fwqdzdk=_this.editForm.fwqdzdk;
      _this.editFormMonitorInfo.xnsbh=_this.editForm.xnsbh;
      _this.editFormMonitorInfo.nsrsbh=_this.editForm.nsrsbh;
      _this.editFormMonitorInfo.nsrmc=_this.editForm.nsrmc;
      _this.editFormMonitorInfo.fplxdm=_this.editForm.fplxdm;
      _this.active = 3;
    }
    if(num == 4){
      _this.editFormTaxRateInfo.fwqdzdk=_this.editForm.fwqdzdk;
      _this.editFormTaxRateInfo.xnsbh=_this.editForm.xnsbh;
      _this.editFormTaxRateInfo.nsrsbh=_this.editForm.nsrsbh;
      _this.editFormTaxRateInfo.nsrmc=_this.editForm.nsrmc;
      _this.editFormTaxRateInfo.fplxdm=_this.editForm.fplxdm;
      _this.active = 4;
    }
  },


//============================================================================
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