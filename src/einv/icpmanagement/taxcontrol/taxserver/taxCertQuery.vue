<template>
  <div class="drawer-wrap" v-loading="loading">
    <div class="rh-drawer-head">
      <div class="drawer-title"><span v-show="!editFlag">税控服务器证书管理</span><span v-show="editFlag"></span></div>
    </div>
    <div class="rh-drawer-body">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="税控服务器编号" prop="swukbh">
              <el-input v-model="editForm.swukbh" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="设备类型" prop="" >
                 <el-select v-model="editForm.sblx" :disabled="true">
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
              <el-input v-model="editForm.ptxh" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11"> 
            <el-form-item label="证书状态" prop="" >
                 <el-select v-model="editForm.zszt" :disabled="true">
                    <el-option label="正常" value="00"></el-option>
                    <el-option label="挂起" value="01"></el-option>
                    <el-option label="注销" value="02"></el-option>
                    <el-option label="过期" value="03"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="平台名称" prop="ptmc">
              <el-input v-model="editForm.ptmc" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="纳税人ID" prop="nsrid">
              <el-input v-model="editForm.nsrid" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="有效标志" prop="" >
                 <el-select v-model="editForm.yxbz" :disabled="true">
                    <el-option label="有效" value="Y"></el-option>
                    <el-option label="无效" value="N"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="主管税务机关代码" prop="zgswjgdm">
              <el-input v-model="editForm.zgswjgdm" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="主管税务机关名称" prop="zgswjgmc">
              <el-input v-model="editForm.zgswjgmc" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="操作人" prop="czr">
              <el-input v-model="editForm.czr" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="操作时间" prop="czsj">
              <el-input v-model="editForm.czsj" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="修改人" prop="xgr">
              <el-input v-model="editForm.xgr" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="修改时间" prop="xgsj">
              <el-input v-model="editForm.xgsj" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="rh-dialog-footer">
      <el-button type="primary" @click="onUpdate('editForm')">证书更新</el-button>
      <el-button @click="close('editForm')">关闭</el-button>
    </div>
  </div>
</template>

<script>
import {validator} from '@/utils/validate.js';

export default {
  props: ["updatePageDataTaxCert"],

  data() {
    let editFlag = !this.updatePageDataTaxCert.id
    return {
      editFlag,
      editForm: {
        id: "",
        swukbh: "",
        nsrsbh: "",
        xnsbh: "",
        sblx: "",
        jzyxqz: "",
        ptxh: "",
        ptmc: "",
        zszt: "",
        nsrid: "",
        zgswjgdm: "",
        zgswjgmc: "",
        czlx: "",
        zzfs: "",
        yxbz: "",
        czr: "",
        czsj: "",
        xgr: "",
        xgsj: "",
      },
      //校验规则
      rules: {
      },
      loading: false,
    };
  },

  created() {},

  mounted() {
    if(!this.editFlag){
       this.getTaxCertById();
       $(".el-upload--picture-card").css("display", "none");
    }
  },

  methods: {

    //根据ID获取表单信息
    getTaxCertById() {
      let _this = this;
      _this.loading=true;
      _this.$api.get(
        _this.$apis.icpmanagement + "/taxcontrol/taxServer/getTaxCertById/" + _this.updatePageDataTaxCert.id, {},
        function (res) {
          _this.loading=false;
          if (res.success) {
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

    //更新证书信息
    onUpdate(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
          //关闭loading
          _this.loading=true;
          let editParams = _this.editForm;
          _this.$api.get(
            _this.$apis.icpmanagement + "/taxcontrol/taxServer/updateTaxCert/" + editParams.id, {},
            function (res) {
            //关闭loading
            _this.loading=false;
            if (res.success) {
                _this.$message({
                message: "修改成功",
                type: "success",
                });
                //关闭抽屉
                _this.$emit("back");
            } else {
                _this.$message({
                message: "修改失败," + res.errorMsg,
                type: "error",
                });
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
      this.$emit("colse");
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