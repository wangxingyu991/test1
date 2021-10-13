<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title"><span v-show="!editFlag">修改平台预警设置</span><span v-show="editFlag">新增平台预警设置</span></div>
    </div>
    <div class="rh-drawer-body">
      <el-form :model="editForm" :rules="rules" v-loading="loading" ref="editForm" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="预警设置类型" prop="yjszlx">
                <el-select v-model="editForm.yjszlx" placeholder="请选择预警设置类型" @change="showHideAdd" :disabled="disabledFlag">
                  <!-- <el-option key="" label="所有虚拟设备" value=""></el-option> -->
                  <el-option v-for="item in option_yjszlx" :key="item.yjszlx" :label="item.yjszlxmc" :value="item.yjszlx"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="预警设置数值" prop="yjszsz">
                <el-input v-model="editForm.yjszsz" placeholder="预警设置数值" maxlength="100" onkeyup="value=value.replace(/[^\d]/g,'') " @blur="onblur"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
            <el-col :span="11">
              <el-form-item label="服务器名称 " prop="fwqmc">
                <el-input v-model="editForm.fwqmc" placeholder="服务器名称 " maxlength="100"  v-on:click.native="chooseFwqxx()" :readonly="true" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="信息发送类型" prop="xxfslx">
                  <el-select v-model="editForm.xxfslx">
                    <el-option label="租户下所有人" value="0"></el-option>
                    <el-option label="本级机构所有人员" value="1"></el-option>
                    <el-option label="下级机构所有人员" value="2"></el-option>
                    <el-option label="本级以及下级机构所有人员" value="3"></el-option>
                    <el-option label="自己" value="4"></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="11" v-if="xnsbh">
              <el-form-item label="虚拟设备 " prop="xnsbh">
                <el-input v-model="editForm.xnsbh" placeholder="虚拟设备 " maxlength="100"  v-on:click.native="chooseFwqxx()" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="有效标志" prop="yxbz">
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
    <!-- 设备选择页面抽屉 -->
    <div class="drawer-container add" :key=1000>
      <el-drawer  append-to-body size="65%" :visible.sync="equipmentDrawer">
        <equipmentDrawerPage v-if="equipmentDrawer" @back="backEquipment" @equipmentMessage="equipmentMessage" :equipmentDrawerPageData="equipmentDrawerPageData" ></equipmentDrawerPage>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import equipmentDrawerPage from "./equipmentDrawerList.vue";
import validate from "@/utils/validate.js";

export default {
  props: ["updatePageData"],
  components: {
    equipmentDrawerPage
  },

  data() {
    // var checkSort = (rule, value, callback) => {
    //   const reg = /^[0-9]*$/;
    //   if (!reg.test(value)) {
    //     callback(new Error("排序只能是数字"));
    //   } else {
    //     callback();
    //   }
    // };
    let editFlag = !this.updatePageData.id
    return { 
      loading: false,
      disabledFlag: false,
      equipmentDrawerPageData: {},
      equipmentDrawer: false,
      editFlag,
      xnsbh: false,
      editForm: {
        id: "",
        yjszlx: "",
        yjszsz: "",

        swukbh: "",
        fwqmc: "",
        xnsbh: "",

        fplxmc: "",
        fplxdm: "",
        kpzdmc: "",
        kpzddm: "",

        yxbz: "",
        yxbz01: "",
        yxbz02: "",
        xxfslx: "",
      },
      option_yjszlx: [],
      //校验规则
      rules: {
        yjszsz: [
          { required: true, message: "请输入预警设置数值", trigger: "blur" },
          //{ max: 100, message: "最多100个字符", trigger: "blur" },
        ],
        yjszlx: [
          { required: true, message: "请选择预警设置类型", trigger: "blur" },
          //{ max: 100, message: "最多100个字符", trigger: "blur" },
        ],
        fwqmc: [
          { required: true, message: "请选择服务器名称", trigger: "blur" },
          //{ max: 3000, message: "最多3000个字符", trigger: "blur" },
        ],
        xxfslx: [
          { required: true, message: "请选择信息发送类型", trigger: "blur" },
        ],
        yxbz: [
          { required: true, message: "请选择有效标志", trigger: "blur" },
        ],
        // sort: [
        //   { required: true, message: "请输入序号", trigger: "blur" },
        //   { validator: checkSort, trigger: "blur" },
        // ],
      },
    };
  },

  created() {},

  mounted() {
    this.getYjszlxSlect();
    if(!this.editFlag){
        this.disabledFlag = true;
        this.getEmailTemplateInfoById();
        $(".el-upload--picture-card").css("display", "none");
    }
  },

  methods: {
    onblur(event){
        //alert("1>>"+this.editForm.yjszsz);
        this.editForm.yjszsz = this.editForm.yjszsz.replace(/\D|^0/g,'');
        //alert("2>>"+this.editForm.yjszsz);
        //console.log(this.editForm.fpfffs);
    },
    chooseFwqxx() {
      if(!this.disabledFlag){
        let _this = this;
        let params = this.editForm;
        let yjszlx = params.yjszlx;
        if(yjszlx==""){
          this.$message({
            message: "请选择预警设置类型",
            type: "error",
          });
          return;
        }
        this.equipmentDrawer = true;
        this.equipmentDrawerPageData = {};
      }
    },
    //获取预警设置类型下拉数据
    getYjszlxSlect() {
      let _this = this;
      let params = this.editForm;
      if (params != null) {
        if (validate.checkForbiddenWordForm(JSON.stringify(params))) {
          _this.$message({
            showClose: true,
            message: "不允许有特殊字符",
            type: "error",
          });
          return;
        }
      }
      _this.$api.post(
        _this.$apis.icpmanagement + "/common/selectCommon/listPtYjSzLx",
        params,
        function (res) {
          if (res.success) {
            _this.option_yjszlx = res.data;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },
    //根据ID获取表单信息
    getEmailTemplateInfoById() {
      let _this = this;
      //打开loading
      _this.loading=true;
      _this.$api.get(
        _this.$apis.icpmanagement +
          "/warning/warnSetting/getWarnSettingInfoById/" + _this.updatePageData.id, {},
        function (res) {
          //关闭loading
          _this.loading=false;
          if (res.success) {
            _this.editForm = res.data;
            let yjszlx = res.data.yjszlx;
            if(yjszlx == "01"){
              _this.xnsbh = true;
            }
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //表单提交
    onSubmit(formName) {
        let _this = this;
        _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
          let editParams = _this.editForm;
          let yjszsz = editParams.yjszsz;
          if (!(/(^[1-9]\d*$)/.test(yjszsz))) {
              this.$message({
              message: "预警设置数值不正确，必须是正整数",
              type: "error",
            });
            return;
          }
          if(!this.editFlag){
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
              //打开loading
              _this.loading=true;
              //修改
              _this.$api.post(
                _this.$apis.icpmanagement + "/warning/warnSetting/updateWarnSettingInfo/", editParams,
                function (res) {
                //关闭loading
                _this.loading=false;
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
          }else{
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
            //打开loading
            _this.loading=true;
            _this.$api.post(
              _this.$apis.icpmanagement + "/warning/warnSetting/checkYjsz/", editParams,
              function (res) {
                //关闭loading
                _this.loading=false;
                if (res.success) {
                      _this.$api.post(
                        _this.$apis.icpmanagement + "/warning/warnSetting/saveWarnSetting/", editParams,
                        function (res) {
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
                } else {
                    _this.$message({
                    message: res.errorMsg,
                    type: "error",
                    });
                }
              }
            );
          }
        }
      });
    },
    showHideAdd() {
      let _this = this;
      let params = this.editForm;
      let yjszlx = params.yjszlx;
      if(yjszlx == "01"){
        _this.xnsbh = true;
      }else{
        _this.xnsbh = false;
      }
      _this.editForm.yjszsz = "";
      _this.editForm.swukbh = "";
      _this.editForm.fwqmc = "";
      _this.editForm.xnsbh = "";
    },
    //选择设备后关闭抽屉
    backEquipment() {
      this.equipmentDrawer = false;
    },

    //选择设备后关闭抽屉
    equipmentMessage(data) {
      let _this = this;
      let params = this.editForm;
      _this.equipmentDrawer = false;
      let yjszlx = params.yjszlx;
      if(yjszlx == "01"){
          _this.$set(_this.editForm,'xnsbh',data.xnsbh);
      }
      _this.$set(_this.editForm,'swukbh',data.swukbh);
      _this.$set(_this.editForm,'fwqmc',data.fwqmc);

      

    },

    //关闭
    close(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      //关闭抽屉
      this.$emit("back");
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