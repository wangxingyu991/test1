<template>
  <div class="drawer-wrap" v-loading="loading">
    <div class="rh-drawer-head">
      <div class="drawer-title">
        <span v-show="!editFlag">修改导入模板信息</span
        ><span v-show="editFlag">新增导入模板信息</span>
      </div>
    </div>
    <div class="rh-drawer-body">
      <el-form
        :model="editForm"
        :rules="rules"
        ref="editForm"
        label-width="140px"
        label-position="right"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item label="项目编号" prop="xmbh">
              <el-input v-model.trim="editForm.xmbh" placeholder="项目编号" maxlength="100" :disabled="!editFlag"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="项目名称" prop="xmmc">
              <el-input
                v-model.trim="editForm.xmmc"
                placeholder="项目名称"
                maxlength="256"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="模板必填项" prop="sfbt">
              <el-select v-model="editForm.sfbt">
                <el-option label="是" value="Y"></el-option>
                <el-option label="否" value="N"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="有效标识" prop="yxbz">
              <el-select v-model="editForm.yxbz">
                <el-option label="有效" value="Y"></el-option>
                <el-option label="无效" value="N"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="rh-dialog-footer">
      <el-button type="primary" @click="onSubmit('editForm')">保存</el-button>
      <el-button @click="close('editForm')">关闭</el-button>
    </div>
  </div>
</template>

<script>
import validate from "@/utils/validate.js";

export default {
  props: ["updatePageData"],

  data() {
    let editFlag = !this.updatePageData.xmbh;
    return {
      editFlag,
      editForm: {
        xmbh: "",
        xmmc: "",
        sfbt: "",
        yxbz: "",
      },
      //校验规则
      rules: {
        xmbh: [
          { required: true, message: "请输入项目编号", trigger: "blur" },
          { max: 100, message: "最多100个字符", trigger: "blur" },
          { validator: this.$validate.isLegalStr, trigger: "blur" },
        ],
        xmmc: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          { max: 256, message: "最多256个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
        sfbt: [
          {
            required: true,
            message: "请选择是否为模板必填项",
            trigger: "blur",
          },
        ],
        yxbz: [{ required: true, message: "请选择有效标识", trigger: "blur" }],
      },
      loading: false,
    };
  },

  created() {},

  mounted() {
    /* if (!this.editFlag) {
      this.getSecurityproxyById();
      $(".el-upload--picture-card").css("display", "none");
    } */
    this.editForm.xmbh =this.updatePageData.xmbh;
    this.editForm.xmmc =this.updatePageData.xmmc;
    this.editForm.sfbt =this.updatePageData.sfbt;
    this.editForm.yxbz =this.updatePageData.yxbz;

  },

  methods: {
    //根据ID获取表单信息
    /* getSecurityproxyById() {
      let _this = this;
      _this.loading = true;
      _this.$api.get(
        _this.$apis.icpmanagement +
          "/taxpayer/imptemplate/getImpTemplateInfoByXh/" +
          _this.updatePageData.xmbh,
        {},
        function (res) {
          _this.loading = false;
          if (res.success) {
            _this.editForm = res.data;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    }, */

    //表单提交
    onSubmit(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
          let editParams = _this.editForm;
          if (editParams != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(editParams))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }
          _this.loading = true;
          if (!this.editFlag) {
            //修改
            _this.$api.post(
              _this.$apis.icpmanagement + "/taxpayer/imptemplate/updateImpTemplateInfo",
              editParams,
              function (res) {
                _this.loading = false;
                if (res.success) {
                  _this.$message({
                    message: "修改成功",
                    type: "success",
                  });
                  //关闭抽屉
                  _this.$emit("back");
                } else {
                  _this.$message({
                    message: "修改失败," + res.errorMsg,
                    type: "error",
                  });
                }
              }
            );
          } else {
            if (editParams != null) {
              if (validate.checkForbiddenWordForm(JSON.stringify(editParams))) {
                _this.$message({
                  showClose: true,
                  message: "不允许有特殊字符",
                  type: "error",
                });
                return;
              }
            }
            _this.$api.post(
              _this.$apis.icpmanagement + "/taxpayer/imptemplate/insertImpTemplateInfo",
              editParams,
              function (res) {
                _this.loading = false;
                if (res.success) {
                  _this.$message({
                    message: "保存成功",
                    type: "success",
                  });
                  //关闭抽屉
                  _this.$emit("back");
                } else {
                  _this.$message({
                    message: "保存失败," + res.errorMsg,
                    type: "error",
                  });
                }
              }
            );
          }
        }
      });
    },

    //关闭
    close(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      //关闭抽屉
      this.$emit("close");
    },
  },
};
</script>

<style lang="less">
.el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
}

.el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}

.el-dialog__headerbtn {
  right: 40px;
}
</style>