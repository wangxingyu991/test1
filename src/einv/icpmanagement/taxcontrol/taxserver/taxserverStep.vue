<template>
  <div class="drawer-wrap" v-loading="loading">
    <div class="rh-drawer-head">
      <div class="drawer-title">
        <div class="tips-content">
          <span class="rh-helpTip-text">税控服务器初始化</span>
          <span class="rh-helpTip-icon">
            <el-tooltip
              class="item"  content="温馨提示：此步骤完成税控服务器信息获取、时钟校准、发行、制证的操作">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </span>
        </div>
      </div>
    </div>
    <div class="rh-drawer-body">
     <div class="steps" >
      <el-steps :space="200" :active="active" finish-status="success">
        <el-step title="同步税控信息"></el-step>
        <el-step title="时钟校准"></el-step>
        <el-step title="发行"></el-step>
        <el-step title="制证"></el-step>
      </el-steps>
     </div>
     <div class="space20"></div>
      <div class="step" v-if="active == 0">
       <el-form :model="editForm" :rules="rules" ref="editForm" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="税控服务器地址" prop="fwqdz">
              <el-input v-model.trim="editForm.fwqdz" placeholder="税控服务器地址" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="税控服务器端口号" prop="fwqdkh">
              <el-input v-model.trim="editForm.fwqdkh" placeholder="税控服务器端口号" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="税控服务器编号" prop="swukbh">
              <el-input v-model.trim="editForm.swukbh" placeholder="税控服务器编号" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="虚拟设备总数" prop="xnsbzs">
              <el-input v-model.trim="editForm.xnsbzs" placeholder="虚拟设备总数" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="11">
            <el-form-item label="剩余可发行数量" prop="sykfxsl">
              <el-input v-model.trim="editForm.sykfxsl" placeholder="剩余可发行数量" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="服务器时间" prop="fwqsj">
              <el-input v-model.trim="editForm.fwqsj" placeholder="服务器时间" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="发行状态" prop="" >
                 <el-select v-model="editForm.fxzt" :disabled="true">
                    <el-option label="未发行，未制证" value="0"></el-option>
                    <el-option label="已发行，未制证" value="1"></el-option>
                    <el-option label="已发行，已制证" value="2"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="税控内核版本号" prop="ljnh">
              <el-input v-model="editForm.ljnh" placeholder="税控内核版本号" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
       </el-form>
       <div class="space20"></div>
        <div class="step-bt-group">
          <el-button type="primary" @click="gettaxServerInfo('editForm')">同步税控信息</el-button>
          <el-button type="primary" @click="nextPage(1)">下一步</el-button>
          <el-button @click="close('editForm')">关闭</el-button>
        </div>
      </div> 
 
      <div class="step" v-if="active == 1">
       <el-form :model="editFormTaxcalibrate" :rules="rules" ref="editFormTaxcalibrate" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="税控服务器地址" prop="fwqdz">
              <el-input v-model.trim="editFormTaxcalibrate.fwqdz" placeholder="税控服务器地址" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="税控服务器端口号" prop="fwqdkh">
              <el-input v-model.trim="editFormTaxcalibrate.fwqdkh" placeholder="税控服务器端口号" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="税控服务器编号" prop="swukbh">
              <el-input v-model.trim="editFormTaxcalibrate.swukbh" placeholder="税控服务器编号" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="服务器时间" prop="fwqsj">
              <el-input v-model.trim="editFormTaxcalibrate.fwqsj" placeholder="服务器时间" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
       </el-form>
        <div class="space20"></div>
        <div class="step-bt-group">
          <el-button type="primary" @click="active=0">上一步</el-button>
          <el-button type="primary" @click="taxcalibrate(editFormTaxcalibrate.fwqdz,editFormTaxcalibrate.fwqdkh)">时钟校准</el-button>
          <el-button type="primary" @click="nextPage(2)">下一步</el-button>
          <el-button @click="close('editFormTaxcalibrate')">关闭</el-button>
        </div>
      </div> 

      <div class="step" v-if="active == 2">
        <el-form :model="editFormIssue" :rules="rules" ref="editFormIssue" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="税控服务器地址" prop="fwqdz">
              <el-input v-model.trim="editFormIssue.fwqdz" placeholder="税控服务器地址" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="税控服务器端口号" prop="fwqdkh">
              <el-input v-model.trim="editFormIssue.fwqdkh" placeholder="税控服务器端口号" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="税控服务器编号" prop="swukbh">
              <el-input v-model.trim="editFormIssue.swukbh" placeholder="税控服务器编号" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="发行状态" prop="" >
                 <el-select v-model="editFormIssue.fxzt" :disabled="true">
                    <el-option label="未发行，未制证" value="0"></el-option>
                    <el-option label="已发行，未制证" value="1"></el-option>
                    <el-option label="已发行，已制证" value="2"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row> 
        </el-form>
         <div class="space20"></div>
        <div class="step-bt-group">
          <el-button type="primary" @click="active=1">上一步</el-button>
          <el-button type="primary" @click="onIssue(editFormIssue.fwqdz,editFormIssue.fwqdkh,editFormIssue.swukbh)">发行</el-button>
          <el-button type="primary" @click="nextPage(3)">下一步</el-button>
          <el-button @click="close('editFormIssue')">关闭</el-button>
        </div>
      </div> 
      <div class="step" v-if="active == 3">
        <el-form :model="editFormCert" :rules="rules" ref="editFormCert" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="税控服务器地址" prop="fwqdz">
              <el-input v-model.trim="editFormCert.fwqdz" placeholder="税控服务器地址" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="税控服务器端口号" prop="fwqdkh">
              <el-input v-model.trim="editFormCert.fwqdkh" placeholder="税控服务器端口号" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="税控服务器编号" prop="swukbh">
              <el-input v-model.trim="editFormCert.swukbh" placeholder="税控服务器编号" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="发行状态" prop="" >
                 <el-select v-model="editFormCert.fxzt" :disabled="true">
                    <el-option label="未发行，未制证" value="0"></el-option>
                    <el-option label="已发行，未制证" value="1"></el-option>
                    <el-option label="已发行，已制证" value="2"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="主管税务机关代码" prop="zgswjgdm">
              <el-input v-model.trim="editFormCert.zgswjgdm" placeholder="主管税务机关代码" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="主管税务机关名称" prop="zgswjgmc">
              <el-input v-model.trim="editFormCert.zgswjgmc" placeholder="主管税务机关名称" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="截止有效期止" prop="jzyxqz">
              <el-input v-model.trim="editFormCert.jzyxqz" placeholder="截止有效期止" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        </el-form>
         <div class="space20"></div>
        <div class="step-bt-group">
          <el-button type="primary" @click="active=2">上一步</el-button>
          <el-button type="primary" @click="onCert(editFormCert.fwqdz,editFormCert.fwqdkh,editFormCert.swukbh)">制证</el-button>
          <el-button @click="close('editFormCert')">关闭</el-button>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import {validator} from '@/utils/validate.js';
import validate from "@/utils/validate.js";

export default {
  props: ["updatePageDataTaxserverInit"],

  data() {
    return {
      active:0,
      isShow:false,
      //同步税控信息
      editForm: {
        id: "",
        fwqdz: "",
        fwqdkh: "",
        swukbh: "",
        xnsbzs: "",
        sykfxsl: "",
        fwqsj: "",
        fxzt: "",
        ljnh: "",
      },
      //时钟校准
      editFormTaxcalibrate: {
        id: "",
        fwqdz: "",
        fwqdkh: "",
        swukbh: "",
        xnsbzs: "",
        sykfxsl: "",
        fwqsj: "",
      },
      //发行
      editFormIssue: {
        id: "",
        fwqdz: "",
        fwqdkh: "",
        swukbh: "",
        fxzt: "",
      },
      //制证
      editFormCert: {
        id: "",
        fwqdz: "",
        fwqdkh: "",
        swukbh: "",
        zgswjgdm: "",
        zgswjgmc: "",
        jzyxqz: "",
        fxzt: "",
      },
      tableData: [],
      tableDataTaxMonitorInfo: [],
      tableDatataxrate: [],
      //校验规则
      rules: {
      },
      loading: false,
    };
  },

  created() {},

  mounted() {
    this.initInfo();
  },

  methods: {
    //初始化页面数据
    initInfo(){
      let _this = this;
        _this.editForm.id=_this.updatePageDataTaxserverInit.row.id;
        _this.editForm.fwqdz=_this.updatePageDataTaxserverInit.row.fwqdzdkh.split(':')[0].trim();
        _this.editForm.fwqdkh=_this.updatePageDataTaxserverInit.row.fwqdzdkh.split(':')[1].trim();
        _this.editForm.swukbh=_this.updatePageDataTaxserverInit.row.swukbh;
        _this.editForm.xnsbzs=_this.updatePageDataTaxserverInit.row.xnsbzs;
        _this.editForm.sykfxsl=_this.updatePageDataTaxserverInit.row.sykfxsl;
        _this.editForm.fxzt=_this.updatePageDataTaxserverInit.row.fxzt;

        _this.editFormTaxcalibrate.fwqdz=_this.updatePageDataTaxserverInit.row.fwqdzdkh.split(':')[0].trim();
        _this.editFormTaxcalibrate.fwqdkh=_this.updatePageDataTaxserverInit.row.fwqdzdkh.split(':')[1].trim();
        _this.editFormTaxcalibrate.swukbh=_this.editForm.swukbh;

        _this.editFormIssue.fwqdz=_this.updatePageDataTaxserverInit.row.fwqdzdkh.split(':')[0].trim();
        _this.editFormIssue.fwqdkh=_this.updatePageDataTaxserverInit.row.fwqdzdkh.split(':')[1].trim();
        _this.editFormIssue.swukbh=_this.updatePageDataTaxserverInit.row.swukbh;
        _this.editFormIssue.fxzt=_this.updatePageDataTaxserverInit.row.fxzt;

        _this.editFormCert.fwqdz=_this.updatePageDataTaxserverInit.row.fwqdzdkh.split(':')[0].trim();
        _this.editFormCert.fwqdkh=_this.updatePageDataTaxserverInit.row.fwqdzdkh.split(':')[1].trim();
        _this.editFormCert.swukbh=_this.editForm.swukbh;
    },

    //根据服务器地址和端口号获取税控服务器信息
    gettaxServerInfo(formName) {
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
          //打开loading
          _this.loading=true;

          _this.$api.post(
            _this.$apis.icpmanagement + "/taxcontrol/taxServer/getTaxServerInfo",editParams,
            function (res) {
              _this.loading=false;
            console.info(JSON.stringify(res));
            if (res.success) {
              if(res.data.body.returncode=='0'){
                _this.editForm.swukbh=res.data.body.returndata.swukbh;
                _this.editForm.xnsbzs=res.data.body.returndata.xnsbzs;
                _this.editForm.sykfxsl=res.data.body.returndata.sykfxsl;
                _this.editForm.fwqsj=res.data.body.returndata.fwqsj;
                _this.editForm.fxzt=res.data.body.returndata.fxzt;
                _this.editFormTaxcalibrate.fwqsj=res.data.body.returndata.fwqsj;
              }
              if(res.data.body.returncode!='0'){
                _this.$alert('返回代码：'+res.data.body.returncode+'</br>'+'返回描述：'+res.data.body.returnmsg,
               '税控服务器返回提示', {
                 confirmButtonText: '关闭',
                dangerouslyUseHTMLString: true
               });
              }
            } else {
              _this.$message({
              message: "失败," + res.errorMsg,
              type: "error",
              });
            }
            }
          );
        }
      });
    },

    //税控服务器时钟校准
    taxcalibrate(fwqdz,fwqdkh) {
      let _this = this;
      //打开loading
      _this.loading=true;

      _this.$api.post(
        _this.$apis.icpmanagement + "/taxcontrol/taxServer/getTaxServerInfoTaxcalibrate" , {fwqdz:fwqdz,fwqdkh:fwqdkh,id:_this.updatePageDataTaxserverInit.row.id},
        function (res) {
          _this.loading=false;
          console.info(JSON.stringify(res));
          if (res.success) {
          if(res.data.body.returncode=='0'){
            _this.editFormTaxcalibrate.fwqsj=res.data.body.returndata.fwqsj;
          }
            _this.$alert('返回代码：'+res.data.body.returncode+'</br>'+'返回描述：'+res.data.body.returnmsg,
            '税控服务器返回提示', {
              confirmButtonText: '关闭',
              dangerouslyUseHTMLString: true
            });
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

     //税控服务器发行
    onIssue(fwqdz,fwqdkh,swukbh) {
      let _this = this;
      let params = _this.editFormIssue;
      _this.$set(params, "fwqdz",fwqdz);
      _this.$set(params, "fwqdkh", fwqdkh);
      _this.$set(params, "swukbh", swukbh);
      _this.$set(params, "id", _this.updatePageDataTaxserverInit.row.id);
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

      _this.$api.post(
        _this.$apis.icpmanagement + "/taxcontrol/taxServer/onIssue" , params,
        function (res) {
          _this.loading=false;
          console.info(JSON.stringify(res));
          if (res.success) {
            if(res.data.body.returncode=='0'){
              _this.editFormIssue.fxzt='1';
            }
            _this.$alert('返回代码：'+res.data.body.returncode+'</br>'+'返回描述：'+res.data.body.returnmsg,
            '税控服务器返回提示', {
              confirmButtonText: '关闭',
              dangerouslyUseHTMLString: true
            });
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

     //税控服务器制证
    onCert(fwqdz,fwqdkh,swukbh) {
      let _this = this;
      let params = _this.editFormCert;
      _this.$set(params, "fwqdz",fwqdz);
      _this.$set(params, "fwqdkh", fwqdkh);
      _this.$set(params, "swukbh", swukbh);
      _this.$set(params, "sblx", '0');
      _this.$set(params, "id", _this.updatePageDataTaxserverInit.row.id);
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

      _this.$api.post(
        _this.$apis.icpmanagement + "/taxcontrol/taxServer/onCert" , params,
        function (res) {
          _this.loading=false;
          console.info(JSON.stringify(res));
          if (res.success) {
            if(res.data.body.returncode=='0'){
              _this.editFormCert.zgswjgdm=res.data.zgswjgdm;
              _this.editFormCert.zgswjgmc=res.data.zgswjgmc;
              _this.editFormCert.jzyxqz=res.data.jzyxqz;
              _this.editFormCert.fxzt=res.data.fxzt;
            }
            _this.$alert('返回代码：'+res.data.body.returncode+'</br>'+'返回描述：'+res.data.body.returnmsg,
            '税控服务器返回提示', {
              confirmButtonText: '关闭',
              dangerouslyUseHTMLString: true
            });
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },


    // 下一步操作
    nextPage(num,index){
      let _this = this;
      if(num == 1){
        if(_this.editForm.swukbh==''||_this.editForm.swukbh==null){
          _this.$alert('请先点击【同步税控信息】按钮',
            '提示', {
            confirmButtonText: '关闭'
          });
          return;
        }
        _this.editFormTaxcalibrate.swukbh=_this.editForm.swukbh;
        //获取最新的服务器时间
        _this.taxcalibrate(_this.editForm.fwqdz,_this.editForm.fwqdkh) 
        _this.active = 1;
      }
      if(num == 2){
        _this.editFormIssue.swukbh=_this.editForm.swukbh;
        _this.active = 2;
      }
      if(num == 3){
        if(_this.editFormIssue.fxzt==''||_this.editFormIssue.fxzt=='未发行，未制证'){
          _this.$alert('请先进行税控服务器发行',
            '提示', {
            confirmButtonText: '关闭'
          });
          return;
        }
        _this.editFormCert.swukbh=_this.editForm.swukbh;
         _this.editFormCert.fxzt=_this.editFormIssue.fxzt;
        _this.active = 3;
      }
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