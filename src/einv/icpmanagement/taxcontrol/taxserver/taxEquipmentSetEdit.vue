<template>
  <div class="drawer-wrap" v-loading="loading">
    <div class="rh-drawer-head">
      <div class="drawer-title"><span v-show="!editFlag">修改税控盘组信息</span><span v-show="editFlag">新增税控盘组信息</span></div>
    </div>
    <div class="rh-drawer-body">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="盘组服务器类型" prop="fwqlxdm" >
                 <el-select v-model="editForm.fwqlxdm">
                    <el-option label="核心板卡盘组服务器" value="002"></el-option>
                    <el-option label="UKEY盘组服务器" value="003"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="盘组服务器代码" prop="fwqdm">
              <el-input v-model.trim="editForm.fwqdm" placeholder="盘组服务器代码" maxlength="32" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="盘组服务器名称" prop="fwqmc">
              <el-input v-model.trim="editForm.fwqmc" placeholder="盘组服务器名称" maxlength="64" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="盘组服务器型号" prop="fwqxh">
              <el-input v-model.trim="editForm.fwqxh" placeholder="盘组服务器型号" maxlength="32" ></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="22">
            <el-form-item label="服务地址" prop="fwdz">
              <el-input v-model.trim="editForm.fwdz" placeholder="核心板、UKEY或者单盘的税控应用开票地址；地址格式以http开头" maxlength="64"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="卡槽总数" prop="kczs">
              <el-input v-model.trim="editForm.kczs" placeholder="卡槽总数" maxlength="10" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="卡槽剩余数" prop="kcsyl">
              <el-input v-model.trim="editForm.kcsyl" placeholder="卡槽剩余数" maxlength="10" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="服务IP" prop="fwip">
              <el-input v-model.trim="editForm.fwip" placeholder="服务IP" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="服务端口" prop="fwport">
              <el-input v-model.trim="editForm.fwport" placeholder="服务端口" maxlength="10" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="有效标识" prop="yxbz" >
                <el-select v-model="editForm.yxbz">
                  <el-option label="有效" value="Y"></el-option>
                  <el-option label="无效" value="N"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="备注" prop="bz">
              <el-input type="textarea" :rows="5" v-model.trim="editForm.bz" placeholder="备注" maxlength="100"></el-input>
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
import {validator} from '@/utils/validate.js';
import validate from "@/utils/validate.js";

export default {
  props: ["updatePageDataTaxEquipmentSet"],

  data() {
    let editFlag = !this.updatePageDataTaxEquipmentSet.id
    return {
      editFlag,
      editForm: {
        id: "",
        fwqlxdm: "",
        fwqdm: "",
        fwqmc: "",
        fwqxh: "",
        fwdz: "",
        kczs: "",
        kcsyl: "",
        fwip: "",
        fwport: "",
        fwqcs: "",
        fwqxh: "",
        smzsbm: "",
        bz: "",
      },
      //校验规则
      rules: {
        fwqlxdm: [
          { required: true, message: "请输入盘组类型", trigger: "blur" },
        ],
        fwqdm: [
          { required: true, message: "请输入盘组代码", trigger: "blur" },
          { max: 15, message: "最多32个字符", trigger: "blur" },
          { validator: this.$validate.isInteger, trigger: "blur" },
        ],
        fwqmc: [
          { required: true, message: "请输入盘组名称", trigger: "blur" },
          { max: 64, message: "最多64个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
        fwqxh: [
          { required: true, message: "请输入盘组型号", trigger: "blur" },
          { max: 15, message: "最多15个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
        fwdz: [
          { required: true, message: "请输入服务地址", trigger: "blur" },
          { max: 64, message: "最多64个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
        kczs: [
          { required: true, message: "请输入卡槽总数", trigger: "blur" },
          { max: 10, message: "最多10个字符", trigger: "blur" },
          { validator: this.$validate.isInteger, trigger: "blur" },
        ],
        kcsyl: [
          { required: true, message: "请输入卡槽剩余数", trigger: "blur" },
          { max: 10, message: "最多10个字符", trigger: "blur" },
          { validator: this.$validate.isInteger, trigger: "blur" },
        ],
        fwip: [
          { required: false, message: "请输入服务IP", trigger: "blur" },
          { max: 15, message: "最多15个字符", trigger: "blur" },
          { validator: this.$validate.isIp, trigger: "blur" },
        ],
        fwport: [
          { required: false, message: "请输入服务端口", trigger: "blur" },
          { max: 10, message: "最多10个字符", trigger: "blur" },
          { validator: this.$validate.isInteger, trigger: "blur" },
        ],
        yxbz: [
          { required: true, message: "请选择有效标识", trigger: "blur" },
        ],
        bz: [
          { required: false, message: "请输入备注", trigger: "blur" },
          { max: 100, message: "最多100个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
      },
      loading: false,
    };
  },

  created() {},

  mounted() {
    if(!this.editFlag){
       this.getTaxEquipmentSetById();
       $(".el-upload--picture-card").css("display", "none");
    }
  },

  methods: {
    //根据服务器地址和端口号获取税控服务器信息
    gettaxServerInfo(formName) {
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
          //关闭loading
          _this.loading=true;
          _this.$api.post(
            _this.$apis.icpmanagement + "/taxcontrol/taxServer/getTaxServerInfo",editParams,
            function (res) {
               //关闭loading
               _this.loading=false;
            if (res.success) {
                _this.editForm.swukbh=res.data.body.returndata.swukbh;
                _this.editForm.xnsbzs=res.data.body.returndata.xnsbzs;
                _this.editForm.sykfxsl=res.data.body.returndata.sykfxsl;
                _this.editForm.fwqsj=res.data.body.returndata.fwqsj;
               console.info(JSON.stringify(res.data));
              _this.$alert('返回代码：'+res.data.body.returncode+'</br>'+'返回描述：'+res.data.body.returnmsg,
              '税控服务器返回提示', {
                confirmButtonText: '关闭',
                dangerouslyUseHTMLString: true
              });
            } else {
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

    //根据ID获取表单信息
    getTaxEquipmentSetById() {
      let _this = this;
      //关闭loading
      _this.loading=true;
      _this.$api.get(
        _this.$apis.icpmanagement + "/taxcontrol/taxServer/getTaxEquipmentSetById/" + _this.updatePageDataTaxEquipmentSet.id, {},
        function (res) {
          //关闭loading
          _this.loading=false;
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
    },


    //表单提交
    onSubmit(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
          //关闭loading
          _this.loading=true;
          //卡槽总数应大于等于剩余总数
          if(_this.editForm.kcsyl>_this.editForm.kczs){
            _this.$message({
              message: "卡槽总数应大于等于卡槽剩余总数",
              type: "error",
            });
            //关闭loading
            _this.loading=false;
            return;
          }

          let editParams = _this.editForm;
          if (editParams != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(editParams))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
               _this.loading=false;
              return;
            }
          }
          if(!this.editFlag){
              //修改
              _this.$api.post(
                _this.$apis.icpmanagement + "/taxcontrol/taxServer/updateTaxEquipmentSet", editParams,
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
              _this.$api.post(
                _this.$apis.icpmanagement + "/taxcontrol/taxServer/saveTaxEquipmentSet", editParams,
                function (res) {
                //关闭loading
                _this.loading=false;
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
      this.$emit("colse");
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