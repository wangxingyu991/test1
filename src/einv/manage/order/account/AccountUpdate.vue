<template>
  <div>
    <div class="rh-dialog-body">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px" label-position="right">
        <el-row>
          <el-col :span="24">
            <el-form-item label="账户名称" prop="accountName">
              <el-input v-model="form.accountName" placeholder="账户名称" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="账号" prop="accountNo">
              <el-input v-model="form.accountNo" placeholder="账号" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="开户行地址" prop="accountAddress">
              <el-input v-model="form.accountAddress" placeholder="开户行地址" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="联系方式" prop="accountTel">
              <el-input v-model="form.accountTel" placeholder="联系方式" maxlength="50"></el-input>
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
    var checkTel = (rule, value, callback) => {
      const reg = /^((\d{11})|(\d{7,8})|(\d{4}|\d{3})-(\d{7,8}))$/;
      if (!reg.test(value)) {
        callback(new Error("联系方式格式不正确！"));
      } else {
        callback();
      }
    };
    var checkNo = (rule, value, callback) => {
      const reg = /^[0-9]*$/;
      if (!reg.test(value)) {
        callback(new Error("账号格式不正确！"));
      } else {
        callback();
      }
    };
    var isEmpty = (rule, value, callback) => {
      const regu = "^[ ]+$";
      var re = new RegExp(regu);
      if (typeof value == "undefined" || value == null || value == "" || re.test(value)) {
        callback(new Error("账户名称不能为空"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      form: {
        accountName: "",
        accountNo: "",
        accountAddress: "",
        accountTel: "",
      },
      //校验规则
      rules: {
        accountName: [
          { required: true, message: "请输入账户名称", trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
        accountNo: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { validator: checkNo, trigger: "blur" },
        ],
        accountTel: [{ validator: checkTel, trigger: "blur" }],
      },
    };
  },

  mounted() {
    this.getAccountById();
  },

  methods: {
    //根据ID获取表单信息
    getAccountById() {
      let _this = this;
      _this.$api.get(
        _this.$apis.manage +
        "/manage/order/account/getAccountById/" +
        _this.updatePageData.accountId,
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
          _this.loading = true;
          _this.$api.post(
            _this.$apis.manage +
            "/manage/order/account/updateAccount/" +
            _this.updatePageData.accountId,
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