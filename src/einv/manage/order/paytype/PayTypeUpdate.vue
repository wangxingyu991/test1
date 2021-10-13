<template>
  <div>
    <div class="rh-dialog-body">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="账号" prop="appId">
              <el-input v-model="form.appId" placeholder="账号" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账户类型" prop="appType">
              <el-select v-model="form.appType" placeholder="账户类型" disabled>
                <el-option key="1" label="微信" value="1"></el-option>
                <el-option key="2" label="支付宝" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="账户名称" prop="appName">
              <el-input v-model="form.appName" placeholder="账户名称" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商户号" prop="appCode">
              <el-input v-model="form.appCode" placeholder="商户号" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="账户公钥" prop="appPublicKey">
              <el-input v-model="form.appPublicKey" placeholder="账户公钥" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账户私钥" prop="appPrivateKey">
              <el-input v-model="form.appPrivateKey" placeholder="账户私钥" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="服务地址" prop="appUrl">
              <el-input v-model="form.appUrl" placeholder="服务地址" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="回调地址" prop="notifyUrl">
              <el-input v-model="form.notifyUrl" placeholder="回调地址" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="rh-dialog-footer">
      <el-button @click="updateSubmit('form')" :loading="loading">保存</el-button>
      <el-button @click="close('form')">关闭</el-button>
    </div>
  </div>
</template>

<script>
import validate from "@/utils/validate.js";
export default {
  props: ["updatePageData"],

  data() {
    var isEmpty = (rule, value, callback) => {
      const regu = "^[ ]+$";
      var re = new RegExp(regu);
      if (typeof value == "undefined" || value == null || value == "" || re.test(value)) {
        callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      form: {
        appId: "",
        appName: "",
        appCode: "",
        appType: "",
        appPublicKey: "",
        appPrivateKey: "",
        appUrl: "",
        notifyUrl: "",
      },
      //校验规则
      rules: {
        appId: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
        appName: [
          { required: true, message: "请输入账户名称", trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
        appCode: [
          { required: true, message: "请输入商户号", trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
        appType: [
          { required: true, message: "请选择账户类型", trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
        appUrl: [
          { required: true, message: "请输入服务地址", trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
        notifyUrl: [
          { required: true, message: "请输入回调地址", trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
      },
    };
  },

  mounted() {
    this.getPayTypeById();
  },

  methods: {
    //根据ID获取表单信息
    getPayTypeById() {
      let _this = this;
      _this.$api.get(
        _this.$apis.manage +
        "/manage/order/paytype/getPayTypeById/" +
        _this.updatePageData.appId,
        {},
        function (res) {
          if (res.success) {
            _this.form = res.data;
          } else {
            _this.$message({
              message: res.errorMsg,
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

    //表单提交
    updateSubmit(formName) {
      let _this = this;
      _this.loading = true;
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
          let updateparams = _this.form;
          if (updateparams != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(updateparams))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }
          _this.$api.post(
            _this.$apis.manage +
            "/manage/order/paytype/updatePayType/" +
            _this.updatePageData.appId,
            updateparams,
            function (res) {
              if (res.success) {
                _this.$message({
                  message: "修改成功",
                  type: "success",
                });
                _this.loading = false;
                //关闭抽屉
                _this.$emit("back");
              } else {
                _this.loading = false;
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
  },
};
</script>

<style lang="less">
.el-dialog__headerbtn {
  right: 40px;
}
</style>