<template>
  <div>
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
              <el-input v-model.number="form.yearStart" placeholder="购买时长起" maxlength="4"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="至" prop="yearEnd" class="yearlabel">
              <el-input v-model.number="form.yearEnd" placeholder="购买时长止" maxlength="4"></el-input>
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
    var checkdiscount = (rule, value, callback) => {
      const reg = /^(0(\.\d{1,2})?|1(\.0{1,2})?)$/;
      if (!reg.test(value)) {
        callback(new Error("折扣只能是0-1之间的小数"));
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
    var checkyear = (rule, value, callback) => {
      const reg = /^[0-9]*$/;
      if (!reg.test(value)) {
        callback(new Error("购买时长只能是整数"));
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
        timeValue: [],
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
          { validator: checkyear, trigger: "blur" },
        ],
        yearEnd: [
          { required: true, message: "请输入购买时长止", trigger: "blur" },
          { validator: checkyear, trigger: "blur" },
          { validator: checkJe1, trigger: "blur" },
        ],
        timeValue: [
          { required: true, message: "请选择有效日期", trigger: "blur" },
        ],
      },
    };
  },

  mounted() {
    this.getDiscountById();
  },

  methods: {
    //根据ID获取表单信息
    getDiscountById() {
      let _this = this;
      _this.$api.get(
        _this.$apis.manage +
        "/manage/product/discount/getDiscountById/" +
        _this.updatePageData.priceDiscountId,
        {},
        function (res) {
          if (res.success) {
            _this.form = res.data;
            _this.form.discount = res.data.discount + "";
            let timeStart = new Date(res.data.timeStart);
            let timeEnd = new Date(res.data.timeEnd);
            _this.$set(_this.form, "timeValue", [timeStart, timeEnd]);
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
          _this.$set(updateparams, "timeStart", updateparams.timeValue[0]);
          _this.$set(updateparams, "timeEnd", updateparams.timeValue[1]);
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
            "/manage/product/discount/updateDiscount/" +
            _this.updatePageData.priceDiscountId,
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

<style lang="less" scoped>
.el-dialog__headerbtn {
  right: 40px;
}
.yearlabel .el-form-item__label {
  width: 30px !important;
}
.yearlabel .el-form-item__content {
  margin-left: 40px !important;
  width: 182px !important;
}
.el-range-editor--small.el-input__inner {
  width: 100%;
}
</style>