<template>
  <div class="drawer-wrap" v-loading="loading">
    <div class="rh-drawer-head">
      <div class="drawer-title">证书管理</div>
    </div>
    <div class="rh-drawer-body">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="税控服务器编号" prop="swukbh">
              <el-input v-model="editForm.swukbh" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="纳税人识别号" prop="nsrsbh">
              <el-input v-model="editForm.nsrsbh" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="虚拟设备编号" prop="xnsbh">
              <el-input v-model="editForm.xnsbh" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="设备类型" prop="sblx">
                <el-select v-model="editForm.sblx" :disabled="true" >
                    <el-option label="税控服务器设备" value="0"></el-option>
                    <el-option label="虚拟设备" value="1"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="截止有效期" prop="jzyxqz">
              <el-input v-model="editForm.jzyxqz" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="平台序号" prop="ptxh">
              <el-input v-model="editForm.ptxh" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="平台名称" prop="ptmc">
              <el-input v-model="editForm.ptmc" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="证书状态" prop="zszt">
                <el-select v-model="editForm.zszt" :disabled="true">
                  <el-option label="正常" value="00"></el-option>
                  <el-option label="挂起" value="01"></el-option>
                  <el-option label="注销" value="02"></el-option>
                  <el-option label="过期" value="03"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="11">
            <el-form-item label="纳税人ID" prop="nsrid">
              <el-input v-model="editForm.nsrid" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="主管税务机关代码" prop="zgswjgdm">
              <el-input v-model="editForm.zgswjgdm" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 	
        <el-row>
          <el-col :span="11">
            <el-form-item label="主管税务机关名称" prop="zgswjgmc">
              <el-input v-model="editForm.zgswjgmc" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="操作人" prop="czr">
              <el-input v-model="editForm.czr" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>  
        <el-row>
          <el-col :span="11">
            <el-form-item label="操作时间" prop="czsj">
              <el-input v-model="editForm.czsj" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="修改人" prop="xgr">
              <el-input v-model="editForm.xgr" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>  
        <el-row>
          <el-col :span="11">
            <el-form-item label="修改时间" prop="xgsj">
              <el-input v-model="editForm.xgsj" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="有效标识" prop="yxbz">
                <el-select v-model="editForm.yxbz" :disabled="true">
                    <el-option label="有效" value="Y"></el-option>
                    <el-option label="无效" value="N"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="rh-dialog-footer">
      <el-button type="primary" @click="updatetaxCert">证书更新</el-button>
      <el-button @click="close('editForm')">关闭</el-button>
    </div>
  </div>
</template>

<script>
import {validator} from '@/utils/validate.js';
import validate from "@/utils/validate.js";

export default {
  props: ["updatePageDatataxCertInfo"],

  data() {
    return {
      editForm: {
        fwqdzdk: "",
        xnsbh: "",
        nsrsbh: "",
        nsrmc: "",
        fplxdm: "",
      },
      //校验规则
      rules: {
      },
      loading: false,
    };
  },

  created() {},

  mounted() {
    this.getCertInfoByXnsbh();
  },

  methods: {
    //根据虚拟设备号获取证书信息
    getCertInfoByXnsbh() {
      let _this = this;
      console.info(JSON.stringify(_this.updatePageDatataxCertInfo.row));
      //打开loading
      _this.loading=true;
      _this.$api.get(
        _this.$apis.icpmanagement + "/taxcontrol/virtualDevices/getCertInfoByXnsbh/" + _this.updatePageDatataxCertInfo.row.xnsbh, {},
        function (res) {
          //关闭loading
          _this.loading=false;
          if (res.success) {
            console.info(JSON.stringify(res.data));
            _this.editForm = res.data;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //证书更新
    updatetaxCert() {
      let _this = this;

      let params = this.editForm;
      _this.$set(params, "fwqdzdk", _this.updatePageDatataxCertInfo.row.fwqdzdk);
      _this.$set(params, "nsrsbh", _this.updatePageDatataxCertInfo.row.nsrsbh);
      _this.$set(params, "xnsbh", _this.updatePageDatataxCertInfo.row.xnsbh);

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
      this.$api.post(
        _this.$apis.icpmanagement + "/taxcontrol/virtualDevices/virtualdevicesCert", params,
        function (res) {
           //关闭loading
           _this.loading=false;
          if (res.success) {
            _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.comment+","+res.data.returnmsg,
              '税控服务器返回提示', {
              confirmButtonText: '关闭',
              dangerouslyUseHTMLString: true
            });
             getCertInfoByXnsbh();
          } else {
            _this.$message({
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