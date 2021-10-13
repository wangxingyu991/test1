<template>
  <div>
    <div class="rh-dialog-body">
      <el-form :model="form" :rules="rules" ref="form" label-width="110px" label-position="right">
        <el-row>
          <el-col :span="24">
            <el-form-item label="短信包类型名称" prop="smsTypeName">
              <el-input v-model="form.smsTypeName" placeholder="短信包类型名称" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="短信包数量" prop="smsNum">
              <el-input v-model="form.smsNum" placeholder="短信包数量" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="短信包价格" prop="smsPrice">
              <el-input v-model="form.smsPrice" placeholder="短信包价格" maxlength="9"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="rh-dialog-footer">
      <el-button @click="addSubmit('form')" :loading="loading">保存</el-button>
      <el-button @click="close('form')">关闭</el-button>
    </div>
  </div>
</template>

<script>
import validate from "@/utils/validate.js";
export default {
  props: ["addPageData"],

  data() {
    var checkJe = (rule, value, callback) => {
      const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if (!reg.test(value)) {
        callback(new Error("金额必须为正数，最多保留两位"));
      } else {
        callback();
      }
    };
    var checkSl = (rule, value, callback) => {
      const reg = /^[0-9]*$/;
      if (!reg.test(value)) {
        callback(new Error("数量只能是正整数"));
      } else {
        callback();
      }
    };
    var isEmpty = (rule, value, callback) => {
      const regu = "^[ ]+$";
      var re = new RegExp(regu);
      if (typeof value == "undefined" || value == null || value == "" || re.test(value)) {
        callback(new Error("短信包类型名称不能为空"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      form: {
        smsTypeName: "",
        smsNum: "",
        smsPrice: "",
      },
      //校验规则
      rules: {
        smsTypeName: [
          { required: true, message: "请输入短信包名称", trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
        smsNum: [
          { required: true, message: "请输入短信包数量", trigger: "blur" },
          { validator: checkSl, trigger: "blur" },
        ],
        smsPrice: [
          { required: true, message: "请输入短信包金额", trigger: "blur" },
          { validator: checkJe, trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    //关闭
    close(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.$emit("back");
    },

    //表单提交
    addSubmit(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
          _this.loading = true;
          let addparams = _this.form;
           if (addparams != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(addparams))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }
          _this.$api.post(
            _this.$apis.manage + "/manage/product/sms/saveSms",
            addparams,
            function (res) {
              if (res.success) {
                _this.$message({
                  message: "保存成功",
                  type: "success",
                });
                _this.loading = false;
                //关闭
                _this.$emit("back");
                //清空表单为下次使用
                _this.resetForm(formName);
              } else {
                _this.loading = false;
                _this.$message({
                  message: "保存失败," + res.errorMsg,
                  type: "error",
                });
              }
            }
          );
        }
      });
    },
  },
};
</script>

<style lang="less">
.el-dialog__headerbtn {
  right: 40px;
}
</style>