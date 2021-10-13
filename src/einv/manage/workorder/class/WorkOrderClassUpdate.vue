<template>
  <div class="rh-dialog">
    <div class="rh-dialog-body" >
      <el-form v-show="isShow" v-loading="loading" :model="workOrderUserMainClass" :rules="rules" ref="form" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="用户工单大类名称" prop="mainClassName">
              <el-input v-model="workOrderUserMainClass.mainClassName" maxlength="10" placeholder="用户工单大类名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="属性描述" prop="depict">
              <el-input type="textarea" v-model="workOrderUserMainClass.depict" placeholder="属性描述"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <div class="rh-dialog-footer">
              <el-button  type="primary" @click="addSubmit('form')">保存</el-button>
              <el-button @click="close('form')">关闭</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-form v-show="isShow1" v-loading="loading" :model="workOrderUserSmallcls" :rules="rules1" ref="form1" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="用户工单小类名称" prop="subClassName">
              <el-input v-model="workOrderUserSmallcls.subClassName" maxlength="10" label-width="20" placeholder="用户工单小类名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="属性描述" prop="depict">
              <el-input type="textarea" v-model="workOrderUserSmallcls.depict" placeholder="属性描述"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="选择工单类型等级" prop="emergencyStatus">
              <el-select v-model="workOrderUserSmallcls.emergencyStatus" placeholder="选择工单类型等级">
                <el-option key="1" label="一般" value="1"></el-option>
                <el-option key="2" label="紧急" value="2"></el-option>
                <el-option key="3" label="非常紧急" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <div class="rh-dialog-footer">
              <el-button @click="addSubmit('form1')">保存</el-button>
              <el-button @click="close('form1')">关闭</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

  </div>
</template>

<script>
import validate from "@/utils/validate.js";
export default {
  props: ["updatePageData"],

  data() {
    // var checkSort = (rule, value, callback) => {
    //   const reg = /^[0-9]*$/;
    //   if (!reg.test(value)) {
    //     callback(new Error("排序只能是数字"));
    //   } else {
    //     callback();
    //   }
    // };
    // var checkItem = (rule, value, callback) => {
    //   if (this.form.hasAddItem == "Y" && this.form.addItemName == "") {
    //     callback(new Error("含有附加项，请填写附加项名称"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      hasItem: "N",
      workOrderUserMainClass: {
        mainClassName: "",
        depict: "",
      },
      workOrderUserSmallcls:{
        subClassName: "",
        depict: "",
        emergencyStatus: "",
      },
      isShow: false,
      isShow1: false,
      //校验规则
      rules1: {
        subClassName: [
          { required: true, message: "请输入工单小类名称", trigger: "blur" },
          { max: 100, message: "最多100个字符", trigger: "blur" },
        ],
        emergencyStatus: [
          { required: true, message: "请选择工单类型等级", trigger: "blur" },
        ],
      },
      rules: {
        mainClassName: [
          { required: true, message: "请输入工单大类名称", trigger: "blur" },
          { max: 100, message: "最多100个字符", trigger: "blur" },
        ],
        // sort: [
        //   { required: true, message: "请输入序号", trigger: "blur" },
        //   { validator: checkSort, trigger: "blur" },
        // ],
        // isMain: [
        //   { required: true, message: "请选择是否为主属性", trigger: "blur" },
        // ],
        // isRequried: [
        //   { required: true, message: "请选择是否必选", trigger: "blur" },
        // ],
        // isMultiple: [
        //   { required: true, message: "请选择是否可多选", trigger: "blur" },
        // ],
        // hasSuperior: [
        //   { required: true, message: "请选择是否有下级", trigger: "blur" },
        // ],
        // feeScale: [
        //   { required: true, message: "请选择计费规则", trigger: "blur" },
        // ],
        // hasAddItem: [
        //   { required: true, message: "请选择是否有附加项", trigger: "blur" },
        // ],
        // addItemName: [{ validator: checkItem, trigger: "blur" }],
      },
      loading: false,
    };
  },
  mounted() {
    this.loading = true;
    this.formInit();
    this.loading = false;
  },
  methods: {
    formInit(){
      // alert(this.updatePageData.emergencyStatus);
      let _this = this;
      var level = this.updatePageData.level;
      // alert(level)
      if(level == "3"){
        this.isShow1 = true;
        this.isShow = false;

        this.workOrderUserSmallcls.subClassName = this.updatePageData.name;
        this.workOrderUserSmallcls.depict = this.updatePageData.depict;
        this.workOrderUserSmallcls.emergencyStatus = this.updatePageData.emergencyStatus;
      }else if(level == "2"){
        this.isShow = true;
        this.isShow1 = false;
        this.workOrderUserMainClass.mainClassName = this.updatePageData.name;
        this.workOrderUserMainClass.depict = this.updatePageData.depict;
      }
    },
    itemChange(hasAddItem) {
      this.hasItem = hasAddItem;
      this.form.addItemName = "";
      this.form.addItemUnit = "";
    },

    //关闭
    close(formName) {

      this.$refs[formName].resetFields();

      //关闭抽屉
      this.$emit("back");
    },

    //表单提交
    addSubmit(formName) {
      let _this = this;
      _this.loading = true;
      var mainurl = "/manage/workorder/type/updateWorkOrderUserMainClass";
      var suburl = "/manage/workorder/type/updateWorkOrderUserSmlclass";
      var level = _this.updatePageData.level;

      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
          let addparams = "";
          var url = "";
          if(level == "3"){
            addparams = _this.workOrderUserSmallcls;
            _this.$set(addparams, "subClassId", _this.updatePageData.id);
            url = _this.$apis.manage + suburl;
          }else if(level == "2"){
            addparams = _this.workOrderUserMainClass;
            _this.$set(addparams, "mainClassId", _this.updatePageData.id);
            url = _this.$apis.manage + mainurl;
          }
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
            url,
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
                _this.$message({
                  message: "保存失败," + res.errorMsg,
                  type: "error",
                });
                _this.loading = false;
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
