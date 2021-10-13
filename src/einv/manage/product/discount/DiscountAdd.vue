<template>
  <div class="discountAdd_1615">
    <div class="rh-dialog-body">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="折扣" prop="discount">
              <el-input v-model="form.discount" placeholder="折扣" maxlength="4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="购买时长" prop="yearStart">
              <el-input v-model="form.yearStart" placeholder="购买时长起" maxlength="4"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="至" prop="yearEnd" class="yearlabel">
              <el-input v-model="form.yearEnd" placeholder="购买时长止" maxlength="4"></el-input>
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
    var checkyear = (rule, value, callback) => {
      const reg = /^[0-9]*$/;
      if (!reg.test(value)) {
        callback(new Error("购买时长只能是整数"));
      } else {
        callback();
      }
    };
    var checkJe1 = (rule, value, callback) => {
      if (value <= this.form.yearEnd) {
        callback(new Error("购买时长止必须大于购买时长起！"));
      } else {
        callback();
      }
    };
    var checkdiscount = (rule, value, callback) => {
      const reg = /^0\.(?!0+$)\d+$/;
      if (!reg.test(value)) {
        callback(new Error("折扣只能是0-1之间的小数"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      form: {
        discount: "",
        yearStart: "",
        yearEnd: "",
        timeValue: "",
      },
      //校验规则
      rules: {
        discount: [
          { required: true, message: "请输入产品折扣", trigger: "blur" },
          { max: 5, message: "最多5个字符", trigger: "blur" },
          { validator: checkdiscount, trigger: "blur" },
        ],
        yearStart: [
          { required: true, message: "请输入购买时长起", trigger: "blur" },
          { max: 4, message: "最多4个字符", trigger: "blur" },
          { validator: checkyear, trigger: "blur" },
        ],
        yearEnd: [
          { required: true, message: "请输入购买时长止", trigger: "blur" },
          { max: 4, message: "最多4个字符", trigger: "blur" },
          { validator: checkyear, trigger: "blur" },
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
          let addparams = _this.form;
          _this.$set(addparams, "productId", _this.addPageData.productId);
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
           _this.loading = true;
          _this.$api.post(
            _this.$apis.manage + "/manage/product/discount/saveDiscount",
            addparams,
            function (res) {
              if (res.success) {
                _this.$message({
                  message: "保存成功",
                  type: "success",
                });
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
.discountAdd_1615{
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