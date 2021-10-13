<template>
  <div class="reduction1641">
    <div class="rh-dialog-body">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="满减金额" prop="reductionMoney">
              <el-input v-model="form.reductionMoney" placeholder="满减金额" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="金额" prop="moneyBegin">
              <el-input v-model="form.moneyBegin" placeholder="金额起" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="至" prop="moneyEnd" class="yearlabel">
              <el-input v-model="form.moneyEnd" placeholder="金额止" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="有效日期" prop="timeValue">
              <el-date-picker v-model="form.timeValue" type="daterange" size="small" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
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
        callback(new Error("金额必须为正数，最多保留两位!"));
      } else {
        callback();
      }
    };
    var checkJe1 = (rule, value, callback) => {
      if (value <= this.form.moneyBegin) {
        callback(new Error("金额止必须大于金额起！"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      form: {
        reductionMoney: "",
        moneyBegin: "",
        moneyEnd: "",
        timeValue: "",
      },
      //校验规则
      rules: {
        reductionMoney: [
          { required: true, message: "请输入满减金额", trigger: "blur" },
          { validator: checkJe, trigger: "blur" },
        ],
        moneyBegin: [
          { required: true, message: "请输入金额", trigger: "blur" },
          { validator: checkJe, trigger: "blur" },
        ],
        moneyEnd: [
          { required: true, message: "请输入金额", trigger: "blur" },
          { validator: checkJe, trigger: "blur" },
          { validator: checkJe1, trigger: "blur" },
        ],
        timeValue: [
          { required: true, message: "请选择有效日期", trigger: "blur" },
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
          _this.$set(addparams, "timeStart", addparams.timeValue[0]);
          _this.$set(addparams, "timeEnd", addparams.timeValue[1]);
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
            _this.$apis.manage + "/manage/product/reduction/saveReduction",
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

<style lang="less" scoped>
.reduction1641{
  .el-dialog__headerbtn {
    right: 40px;
  }
  .yearlabel .el-form-item__label {
    width: 30px !important;
  }
  .yearlabel .el-form-item__content {
    margin-left: 40px !important;
    width: 252px !important;
  }
  .el-range-editor--small.el-input__inner {
    width: 100%;
  }
}
</style>