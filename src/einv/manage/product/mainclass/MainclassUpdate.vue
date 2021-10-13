<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title">修改产品大类信息</div>
    </div>
    <div class="rh-drawer-body">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品大类名称" prop="productName">
              <el-input v-model="form.mainAttrName" placeholder="产品大类名称" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input v-model="form.sort" placeholder="排序" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="主属性标志" prop="isMain">
              <el-select v-model="form.isMain" placeholder="主属性标志" disabled>
                <el-option key="Y" label="是" value="Y"></el-option>
                <el-option key="N" label="否" value="N"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="必选标志" prop="isRequried">
              <el-select v-model="form.isRequried" placeholder="必选标志">
                <el-option key="Y" label="是" value="Y"></el-option>
                <el-option key="N" label="否" value="N"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="下级标志" prop="hasSuperior">
              <el-select v-model="form.hasSuperior" placeholder="下级标志" disabled>
                <el-option key="Y" label="是" value="Y"></el-option>
                <el-option key="N" label="否" value="N"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="多选标志" prop="isMultiple" >
              <el-select v-model="form.isMultiple" placeholder="多选标志" disabled>
                <el-option key="Y" label="是" value="Y"></el-option>
                <el-option key="N" label="否" value="N"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="计费规则" prop="feeScale">
              <el-select v-model="form.feeScale" placeholder="计费规则" disabled>
                <el-option key="0" label="加法" value="0"></el-option>
                <el-option key="1" label="乘法" value="1"></el-option>
                <el-option key="2" label="组合加法" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="unit">
              <el-input v-model="form.unit" placeholder="单位" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="附加项标志" prop="hasAddItem">
              <el-select v-model="form.hasAddItem" placeholder="附加项标志" @change="itemChange(form.hasAddItem)" disabled>
                <el-option key="N" label="否" value="N"></el-option>
                <el-option key="Y" label="是" value="Y"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务标志" prop="businessFlag">
              <el-select v-model="form.businessFlag" placeholder="业务标志" disabled>
                <el-option key="" label="" value=""></el-option>
                <el-option v-for="item in option_business" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="hasItem=='Y'">
          <el-col :span="12">
            <el-form-item label="附加项名称" prop="addItemName">
              <el-input v-model="form.addItemName" placeholder="附加项名称" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="附加项单位" prop="addItemUnit">
              <el-input v-model="form.addItemUnit" placeholder="附加项单位" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="属性描述" prop="description">
              <el-input type="textarea" v-model="form.description" placeholder="属性描述"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="sparefield">
              <el-input type="textarea" v-model="form.sparefield" placeholder="备注"></el-input>
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
    var checkSort = (rule, value, callback) => {
      const reg = /^[0-9]*$/;
      if (!reg.test(value)) {
        callback(new Error("排序只能是数字"));
      } else {
        callback();
      }
    };
    var checkItem = (rule, value, callback) => {
      if (this.form.hasAddItem == "Y" && this.form.addItemName == "") {
        callback(new Error("含有附加项，请填写附加项名称"));
      } else {
        callback();
      }
    };
    var checkMul = (rule, value, callback) => {
      if (this.form.hasAddItem == "Y" && this.form.isMultiple == "N") {
        callback(new Error("含有附加项，请选择可多选"));
      } else {
        callback();
      }
    };
    var checkHasSub = (rule, value, callback) => {
      if (this.form.hasAddItem == "Y" && this.form.hasSuperior == "N") {
        callback(new Error("含有附加项，请选择有下级"));
      } else {
        callback();
      }
    };
    var checkSub = (rule, value, callback) => {
      if (this.form.feeScale == "1" && this.form.hasSuperior == "Y") {
        callback(new Error("计费规则为乘法，不能有下级"));
      } else {
        callback();
      }
    };
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
      hasItem: "Y",
      option_business: [],
      form: {
        mainAttrName: "",
        sort: "",
        description: "",
        isMain: "N",
        isRequried: "Y",
        isMultiple: "N",
        hasSuperior: "Y",
        feeScale: "0",
        unit: "",
        hasAddItem: "N",
        addItemName: "",
        addItemUnit: "",
        sparefield: "",
        businessFlag: "",
      },
      //校验规则
      rules: {
        mainAttrName: [
          { required: true, message: "请输入产品大类名称", trigger: "blur" },
        ],
        sort: [
          { required: true, message: "请输入序号", trigger: "blur" },
          { validator: checkSort, trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
        isMain: [
          { required: true, message: "请选择是否为主属性", trigger: "blur" },
        ],
        isRequried: [
          { required: true, message: "请选择是否必选", trigger: "blur" },
        ],
        isMultiple: [
          { required: true, message: "请选择是否可多选", trigger: "blur" },
          { validator: checkMul, trigger: "blur" },
        ],
        hasSuperior: [
          { required: true, message: "请选择是否有下级", trigger: "blur" },
          { validator: checkSub, trigger: "blur" },
          { validator: checkHasSub, trigger: "blur" },
        ],
        feeScale: [
          { required: true, message: "请选择计费规则", trigger: "blur" },
          { validator: checkSub, trigger: "blur" },
        ],
        hasAddItem: [
          { required: true, message: "请选择是否有附加项", trigger: "blur" },
          { validator: checkMul, trigger: "blur" },
        ],
        addItemName: [{ validator: checkItem, trigger: "blur" }],
        unit: [
          { validator: isEmpty, trigger: "blur" },
        ],
      },
    };
  },

  mounted() {
    this.getMainClassById();
    this.getOption();
  },

  methods: {
    //获取下拉数据
    getOption() {
      let _this = this;
      _this.$api.get(
        _this.$apis.manage + "/manage/product/mainclass/getOption",
        {},
        function (res) {
          if (res.success) {
            _this.option_business = res.data;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    itemChange(hasAddItem) {
      this.hasItem = hasAddItem;
      this.form.addItemName = "";
      this.form.addItemUnit = "";
    },
    //根据ID获取表单信息
    getMainClassById() {
      let _this = this;
      _this.$api.get(
        _this.$apis.manage + "/manage/product/mainclass/getMainClassById/" +
        _this.updatePageData.mainAttrId,
        {},
        function (res) {
          if (res.success) {
            _this.form = res.data;
            _this.hasItem = res.data.hasAddItem;
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
            _this.$apis.manage + "/manage/product/mainclass/updateMainClass/" +
            _this.updatePageData.mainAttrId,
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