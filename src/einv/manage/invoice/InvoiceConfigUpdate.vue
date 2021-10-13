<template>
  <div>
    <div class="rh-dialog-body">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称" prop="xsfMc">
              <el-input v-model="form.xsfMc" placeholder="名称" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纳税人识别号" prop="xsfNsrsbh">
              <el-input v-model="form.xsfNsrsbh" placeholder="账号" maxlength="30"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="地址电话" prop="xsfDzdh">
              <el-input v-model="form.xsfDzdh" placeholder="销售方地址电话" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="银行账户" prop="xsfYhzh">
              <el-input v-model="form.xsfYhzh" placeholder="银行账户" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开票终端代码" prop="kpzddm">
              <el-input v-model="form.kpzddm" placeholder="开票终端代码" maxlength="12"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="虚拟设备号" prop="xnsbh">
              <el-input v-model="form.xnsbh" placeholder="虚拟设备号" maxlength="12"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开票人" prop="kpr">
              <el-input v-model="form.kpr" placeholder="开票人" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款人" prop="skr">
              <el-input v-model="form.skr" placeholder="收款人" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="复核人" prop="fhr">
              <el-input v-model="form.fhr" placeholder="复核人" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="请求地址" prop="makeUrl">
              <el-input v-model="form.makeUrl" placeholder="请求地址" maxlength="200"></el-input>
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
        callback(new Error("账户名称不能为空"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      form: {
        xsfMc: "",
        xsfNsrsbh: "",
        xsfDzdh: "",
        xsfYhzh: "",
        kpr: "",
        skr: "",
        fhr: "",
        kpzddm: "",
        xnsbh: "",
        makeUrl: "",
      },
      //校验规则
      rules: {
        xsfMc: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
        xsfNsrsbh: [
          { required: true, message: "请输入纳税人识别号", trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
        xsfDzdh: [
          { required: true, message: "请输入地址电话", trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
        xsfYhzh: [
          { required: true, message: "请输入银行账户", trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
        kpr: [
          { required: true, message: "请输入开票人", trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
        skr: [
          { required: true, message: "请输入收款人", trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
        fhr: [
          { required: true, message: "请输入复核人", trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
        kpzddm: [
          { required: true, message: "请输入开票终端代码", trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
        xnsbh: [
          { required: true, message: "请输入虚拟设备号", trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
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
        "/manage/invoice/getById/" +
        _this.updatePageData.makeeinvId,
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
          _this.loading = true;

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
            "/manage/invoice/updateInvoiceConfig/" +
            _this.updatePageData.makeeinvId,
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