<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title">新增产品小类信息</div>
    </div>
    <div class="rh-drawer-body">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品小类名称" prop="subAttrName">
              <el-input v-model="form.subAttrName" placeholder="产品小类名称" maxlength="100"></el-input>
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
            <el-form-item label="必选标志" prop="isRequried">
              <el-select v-model="form.isRequried" placeholder="必选标志">
                <el-option key="Y" label="是" value="Y"></el-option>
                <el-option key="N" label="否" value="N"></el-option>
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
            <el-form-item label="对应业务" prop="serviceId" v-if="businessFlag!=null&&businessFlag!=''">
              <el-select v-model="form.serviceId" placeholder="对应业务">
                <el-option v-for="item in option_service" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="岗位" prop="postId" v-if="isMain == 'Y'">
              <el-select v-model="form.postId" placeholder="岗位">
                <el-option v-for="item in option_post" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
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
      <el-button @click="addSubmit('form')" :loading="loading">保存</el-button>
      <el-button @click="close('form')">关闭</el-button>
    </div>
  </div>
</template>

<script>
//小类新增和修改
//1、判断父类是否为主属性，是主属性的话需要配置岗位
//2、判断父类是否配置了业务标志，配置了业务标志小类必须选择业务代码
import validate from "@/utils/validate.js";
export default {
  props: ["addPageData"],

  data() {
    var checkSort = (rule, value, callback) => {
      const reg = /^[0-9]*$/;
      if (!reg.test(value)) {
        callback(new Error("排序只能是数字"));
      } else {
        callback();
      }
    };
    var isEmpty = (rule, value, callback) => {
      const regu = "^[ ]+$";
      var re = new RegExp(regu);
      if (typeof value == "undefined" || value == null || value == "" || re.test(value)) {
        callback(new Error("产品小类名称不能为空"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      isMain: "",//父类是否为主属性
      businessFlag: "",//父类业务标志
      option_service: [],
      option_post: [],
      form: {
        subAttrName: "",
        sort: "",
        description: "",
        isRequried: "N",
        serviceId: "",
        postId: "",
        unit: "",
        sparefield: "",
      },
      //校验规则
      rules: {
        subAttrName: [
          { required: true, message: "请输入产品小类名称", trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
        serviceId: [
          { required: true, message: "请选择对应业务", trigger: "blur" },
        ],
        postId: [
          { required: true, message: "请选择岗位", trigger: "blur" },
        ],
        sort: [
          { required: true, message: "请输入序号", trigger: "blur" },
          { validator: checkSort, trigger: "blur" },
        ],
        isRequried: [
          { required: true, message: "请选择是否必选", trigger: "blur" },
        ],
      },
    };
  },

  mounted() {
    this.getSort();
    this.getMainClassData();
  },

  methods: {

    //获取产品大类是非为主属性和业务标志
    getMainClassData() {
      let _this = this;
      _this.$api.get(
        _this.$apis.manage + "/manage/product/mainclass/getMainClassById/" + _this.addPageData.mainAttrId,
        {},
        function (res) {
          if (res.success) {
            _this.isMain = res.data.isMain;
            _this.businessFlag = res.data.businessFlag;
            _this.getOption();
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //获取下拉数据
    getOption() {
      let _this = this;
      _this.$api.post(
        _this.$apis.manage + "/manage/product/subclass/getOption",
        { type: _this.businessFlag, subAttrId: '', mainAttrId: _this.addPageData.mainAttrId },
        function (res) {
          if (res.success) {
            _this.option_service = res.data.serviceList;
            _this.option_post = res.data.postList;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //获取默认排序
    getSort() {
      let _this = this;
      _this.$api.get(
        _this.$apis.manage + "/manage/product/subclass/getSort/" + _this.addPageData.mainAttrId,
        {},
        function (res) {
          if (res.success) {
            _this.form.sort = res.data;
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
    addSubmit(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
          _this.loading = true;
          let addparams = _this.form;
          _this.$set(addparams, "productId", _this.addPageData.productId);
          _this.$set(addparams, "mainAttrId", _this.addPageData.mainAttrId);

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
            _this.$apis.manage + "/manage/product/subclass/saveSubClass",
            addparams,
            function (res) {
              if (res.success) {
                _this.$message({
                  message: "保存成功",
                  type: "success",
                });
                _this.loading = false;
                //关闭抽屉
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