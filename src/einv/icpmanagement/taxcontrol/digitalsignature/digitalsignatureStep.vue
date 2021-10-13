<template>
  <div class="drawer-wrap" v-loading="loading">
    <div class="rh-drawer-head">
      <div class="drawer-title">
        <div class="tips-content">
          <span class="rh-helpTip-text">电子签章信息同步</span>
          <span class="rh-helpTip-icon">
            <el-tooltip
              class="item"  content="温馨提示：此步骤完成电子签章设置">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </span>
        </div>
      </div>
    </div>
    <div class="rh-drawer-body">
     <div class="steps" >
      <el-steps :space="200" :active="active" finish-status="success">
        <el-step title="获取签名公钥"></el-step>
        <el-step title="税局申请"></el-step>
        <el-step title="税局下载"></el-step>
        <el-step title="签章上传"></el-step>
      </el-steps>
     </div>
     <div class="space20"></div>
      <div class="step" v-if="active == 0">
       <el-form :model="editForm" :rules="rules" ref="editForm" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="20">
            <el-form-item label="省份" prop="sf">
              <el-input v-model="editForm.sf" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="印章名称" prop="jzzmc">
              <el-input v-model="editForm.jzzmc" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="处理状态" prop="clzt">
              <el-input v-model="editForm.clzt" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="签名公钥" prop="qmgy">
              <el-input type="textarea" v-model="editForm.qmgy" placeholder="展示签名公钥" rows="5" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
       </el-form>
       <div class="space20"></div>
        <div class="step-bt-group">
          <el-button type="primary" @click="getPublickey">获取签名公钥</el-button>
          <el-button type="primary" @click="nextPage(1)">下一步</el-button>
          <el-button @click="close('editForm')">关闭</el-button>
        </div>
      </div> 
 
      <div class="step" v-if="active == 1">
       <el-form :model="editFormApply" :rules="rules" ref="editFormApply" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="20">
            <el-form-item label="省份" prop="sf">
              <el-input v-model="editFormApply.sf" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="印章名称" prop="jzzmc">
              <el-input v-model="editFormApply.jzzmc" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="处理状态" prop="clzt">
              <el-input v-model="editFormApply.clzt" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
       </el-form>
        <div class="space20"></div>
        <div class="step-bt-group">
          <el-button type="primary" @click="active=0">上一步</el-button>
          <el-button type="primary" @click="digitalsignatureApply">税局申请</el-button>
          <el-button type="primary" @click="nextPage(2)">下一步</el-button>
          <el-button @click="close('editFormTaxplayerInfo')">关闭</el-button>
        </div>
      </div> 

      <div class="step" v-if="active == 2">
        <el-form :model="editFormDownload" :rules="rules" ref="editFormDownload" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="20">
            <el-form-item label="省份" prop="sf">
              <el-input v-model="editFormDownload.sf" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="印章名称" prop="jzzmc">
              <el-input v-model="editFormDownload.jzzmc" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="处理状态" prop="clzt">
              <el-input v-model="editFormDownload.clzt" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        </el-form>
         <div class="space20"></div>
        <div class="step-bt-group">
          <el-button type="primary" @click="active=1">上一步</el-button>
          <el-button type="primary" @click="taxationDownload">税局下载</el-button>
          <el-button type="primary" @click="nextPage(3)">下一步</el-button>
          <el-button @click="close('editFormCert')">关闭</el-button>
        </div>
      </div> 
      <div class="step" v-if="active == 3">
        <el-form :model="editFormUpload" :rules="rules" ref="editFormUpload" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="20">
            <el-form-item label="省份" prop="sf">
              <el-input v-model="editFormUpload.sf" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="印章名称" prop="jzzmc">
              <el-input v-model="editFormUpload.jzzmc" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="处理状态" prop="clzt">
              <el-input v-model="editFormUpload.clzt" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        </el-form>
         <div class="space20"></div>
        <div class="step-bt-group">
          <el-button type="primary" @click="active=2">上一步</el-button>
          <el-button type="primary" @click="digitalsignatureUpload">签章上传</el-button>
          <el-button @click="close('editFormCert')">关闭</el-button>
        </div>
      </div> 
    </div>
  </div>
</template>
<script>
import validate from "@/utils/validate.js";

export default {
  props: ["pageDatadigitalsignatureStep"],

  data() {
    return {
      active:0,
      isShow:false,
      //获取签名公钥
      editForm: {
        sf: "",
        jzzmc: "",
        clzt: "",
        qmgy: "",
      },
      //税局申请
      editFormApply: {
        sf: "",
        jzzmc: "",
        clzt: "",
      },
      //税局下载
      editFormDownload: {
        sf: "",
        jzzmc: "",
        clzt: "",
      },
      //签章上传
      editFormUpload: {
        sf: "",
        jzzmc: "",
        clzt: "",
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
        _this.editForm.sf=_this.pageDatadigitalsignatureStep.row.sf;
        _this.editForm.jzzmc=_this.pageDatadigitalsignatureStep.row.jzzmc;
        _this.editForm.clzt=_this.pageDatadigitalsignatureStep.row.clzt;
        _this.editForm.qmgy=_this.pageDatadigitalsignatureStep.row.qmgy;
        _this.editFormApply.sf=_this.pageDatadigitalsignatureStep.row.sf;
        _this.editFormApply.jzzmc=_this.pageDatadigitalsignatureStep.row.jzzmc;
        _this.editFormApply.clzt=_this.pageDatadigitalsignatureStep.row.clzt;
        _this.editFormDownload.sf=_this.pageDatadigitalsignatureStep.row.sf;
        _this.editFormDownload.jzzmc=_this.pageDatadigitalsignatureStep.row.jzzmc;
        _this.editFormDownload.clzt=_this.pageDatadigitalsignatureStep.row.clzt;
        _this.editFormUpload.sf=_this.pageDatadigitalsignatureStep.row.sf;
        _this.editFormUpload.jzzmc=_this.pageDatadigitalsignatureStep.row.jzzmc;
        _this.editFormUpload.clzt=_this.pageDatadigitalsignatureStep.row.clzt;
      //0 未申请；1已申请；2已下载；3印章已上传
      if(_this.editForm.clzt=='未申请'){
        _this.active = 0;
      }
      if(_this.editForm.clzt=='已申请'){

        _this.active = 1;
      }
      if(_this.editForm.clzt=='已下载'){

        _this.active = 2;
      }
      if(_this.editForm.clzt=='印章已上传'){

        _this.active = 3;
      }

    },

    //获取签名公钥
    getPublickey(){
      let _this = this;
        _this.loading=true;
        _this.$api.post(
        _this.$apis.icpmanagement +"/taxcontrol/digitalsignature/getDigitalsignaturePublicKey/", {mysy:_this.pageDatadigitalsignatureStep.row.mysy,id:_this.pageDatadigitalsignatureStep.row.id},
        function (res) {
          _this.loading=false;
          if (res.success) {
            if( res.data.code=='0'){
              //返回公钥信息
              _this.editForm.qmgy=res.data.gy;
            }
            if( res.data.code!='0'){

              _this.$alert('返回描述：'+res.data.msg,
              '返回提示', {
                confirmButtonText: '关闭',
                dangerouslyUseHTMLString: true
              });
            }
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //电子印章申请
    digitalsignatureApply() {
      let _this = this;
       //空 未申请，0：已申请 1：已下载 2：印章已上传
       if(_this.editFormApply.clzt!='未申请'){
        _this.$alert('处理状态为未申请才能申请电子签章',
          '提示', {
            confirmButtonText: '关闭',
            dangerouslyUseHTMLString: true
          });
          return;
       }       
      //打开loading
         _this.loading=true;
        _this.$api.get(
        _this.$apis.icpmanagement +"/taxcontrol/digitalsignature/digitalsignatureApply/" +_this.pageDatadigitalsignatureStep.row.id, {},
        function (res) {
          //关闭loading
          _this.loading=false;
          console.info(JSON.stringify(res));
          if (res.success) {
              if(res.data.code=='0'){
                _this.editForm.clzt='已申请';
                _this.editFormApply.clzt='已申请';
              }
              _this.$alert('返回代码：'+res.data.code+'</br>'+'返回描述：'+res.data.msg,
              '电子签章系统返回提示', {
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

    //税局下载电子签章
    taxationDownload(){
      let _this = this;
       //空 未申请，0：已申请 1：已下载 2：签章已上传
       if(_this.editFormDownload.clzt!='已申请'){
            _this.$alert('处理状态为已申请才能在税局下载电子签章',
              '提示', {
                confirmButtonText: '关闭',
                dangerouslyUseHTMLString: true
              });
              return;
       }
      //打开loading
       _this.loading=true;
        _this.$api.get(
        _this.$apis.icpmanagement +"/taxcontrol/digitalsignature/taxationDownload/" +_this.pageDatadigitalsignatureStep.row.id, {},
        function (res) {
          //关闭loading
           _this.loading=false;
          if (res.success) {
              if(res.data.code=='0'){
                _this.editForm.clzt='已下载';
                _this.editFormApply.clzt='已下载';
                _this.editFormDownload.clzt='已下载';
              }
              _this.$alert('返回代码：'+res.data.code+'</br>'+'返回描述：'+res.data.msg,
              '电子签章系统返回提示', {
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

    //签章上传
    digitalsignatureUpload(){
      let _this = this;
      //打开loading
      _this.loading=true;
        _this.$api.get(
        _this.$apis.icpmanagement +"/taxcontrol/digitalsignature/digitalsignatureUpload/" +_this.pageDatadigitalsignatureStep.row.id, {},
        function (res) {
          //关闭loading
          _this.loading=false;
          if (res.success) {
                if(res.data.code=='0'){
                _this.editForm.clzt='签章已上传';
                _this.editFormApply.clzt='签章已上传';
                _this.editFormDownload.clzt='签章已上传';
                _this.editFormUpload.clzt='签章已上传';
              }
              _this.$alert('返回代码：'+res.data.code+'</br>'+'返回描述：'+res.data.msg,
              '电子签章系统返回提示', {
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
        if(_this.editForm.qmgy==''||_this.editForm.qmgy==null){
          _this.$alert('签名公钥不能为空',
            '提示', {
            confirmButtonText: '关闭'
          });
          return;
        }
        _this.editFormApply.sf=_this.editForm.sf;
        _this.editFormApply.jzzmc=_this.editForm.jzzmc;
        _this.editFormApply.clzt=_this.editForm.clzt;
        _this.active = 1;
      }
      if(num == 2){
        if(_this.editForm.clzt=='未申请'){
          _this.$alert('请先进行税局申请',
            '提示', {
            confirmButtonText: '关闭'
          });
          return;
        }
        _this.editFormDownload.sf=_this.editForm.sf;
        _this.editFormDownload.jzzmc=_this.editForm.jzzmc;
        _this.editFormDownload.clzt=_this.editForm.clzt;
        _this.active = 2;
      }
      if(num == 3){
        if(_this.editForm.clzt!='已下载'){
          _this.$alert('请先进行税局下载',
            '提示', {
              confirmButtonText: '关闭'
          });
          return;
        }
        _this.editFormUpload.sf=_this.editForm.sf;
        _this.editFormUpload.jzzmc=_this.editForm.jzzmc;
        _this.editFormUpload.clzt=_this.editForm.clzt;
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
  .el-steps--horizontal.el-steps .el-step__main .el-step__title{
    background: #fff;
    padding:0px 10px;
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