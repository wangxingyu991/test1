<template>
  <div class="drawer-wrap"  v-loading="loading">
    <div class="rh-drawer-head">
      <div class="drawer-title"><span v-show="!editFlag">修改税控服务器信息</span><span v-show="editFlag">新增税控服务器信息</span></div>
    </div>
    <div class="rh-drawer-body">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="税控服务器地址" prop="fwqdz">
              <el-input v-model.trim="editForm.fwqdz" placeholder="税控服务器地址" maxlength="15"  onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="税控服务器端口号" prop="fwqdkh">
              <el-input v-model.trim="editForm.fwqdkh" placeholder="税控服务器端口号" maxlength="10" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="税控服务器编号" prop="swukbh" v-show="isShow" >
              <el-input v-model.trim="editForm.swukbh" placeholder="税控服务器编号" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="虚拟设备总数" prop="xnsbzs" v-show="isShow" >
              <el-input v-model.trim="editForm.xnsbzs" placeholder="虚拟设备总数" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="11">
            <el-form-item label="剩余可发行数量" prop="sykfxsl" v-show="isShow" >
              <el-input v-model.trim="editForm.sykfxsl" placeholder="剩余可发行数量" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="服务器时间" prop="fwqsj" v-show="isShow" >
              <el-input v-model.trim="editForm.fwqsj" placeholder="服务器时间" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="发行状态" prop="" v-show="isShow" >
                 <el-select v-model="editForm.fxzt" :disabled="true">
                    <el-option label="未发行，未制证" value="0"></el-option>
                    <el-option label="已发行，未制证" value="1"></el-option>
                    <el-option label="已发行，已制证" value="2"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="税控内核版本号" prop="ljnh" v-show="isShow" >
              <el-input v-model.trim="editForm.ljnh" placeholder="税控内核版本号" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="22">
            <el-form-item label="服务器名称" prop="fwqmc">
              <el-input v-model.trim="editForm.fwqmc" placeholder="服务器名称" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="服务器厂商" prop="fwqcs">
              <el-input v-model.trim="editForm.fwqcs" placeholder="服务器厂商" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="服务器型号" prop="fwqxh">
              <el-input v-model.trim="editForm.fwqxh" placeholder="服务器型号" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="密码产品型号证书编码" prop="smzsbm">
              <el-input v-model.trim="editForm.smzsbm" placeholder="商用密码产品型号证书编码" maxlength="30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="国密型号" prop="gmxh">
              <el-input v-model.trim="editForm.gmxh" placeholder="国密型号" maxlength="30"></el-input>
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
  props: ["updatePageData"],

  data() {
    let editFlag = !this.updatePageData.id
    return {
      editFlag,
      editForm: {
        id: "",
        fwqdz: "",
        fwqdkh: "",
        swukbh: "",
        xnsbzs: "",
        sykfxsl: "",
        fwqsj: "",
        fxzt: "",
        ljnh: "",
        fwqmc: "",
        fwqcs: "",
        fwqxh: "",
        smzsbm: "",
        gmxh: "",
      },
      isShow: false,
      //校验规则
      rules: {
        fwqdz: [
          { required: true, message: "请输入服务器地址", trigger: "blur" },
          { max: 15, message: "最多15个字符", trigger: "blur" },
          { validator: this.$validate.isIp, trigger: "blur" },
          
        ],
        fwqdkh: [
          { required: true, message: "请输入服务器端口号", trigger: "blur" },
          { max: 10, message: "最多10个字符", trigger: "blur" },
          { validator: this.$validate.isInteger, trigger: "blur" },
        ],
        fwqmc: [
          { required: true, message: "请输入服务器名称", trigger: "blur" },
          { max: 50, message: "最多50个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
        fwqcs: [
          { required: false, message: "服务器厂商", trigger: "blur" },
          { max: 50, message: "最多100个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
        fwqxh: [
          { required: false, message: "服务器型号", trigger: "blur" },
          { max: 50, message: "最多50个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
        smzsbm: [
          { required: false, message: "密码产品型号证书编码", trigger: "blur" },
          { max: 50, message: "最多30个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
        gmxh: [
          { required: false, message: "国密型号", trigger: "blur" },
          { max: 50, message: "最多30个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
      },
      loading: false,
    };
  },

  created() {},

  mounted() {
    if(!this.editFlag){
       this.getTaxServerById();
       $(".el-upload--picture-card").css("display", "none");
    }
  },

  methods: {
    //根据ID获取表单信息
    getTaxServerById() {
      let _this = this;
      _this.loading=true;
      _this.$api.get(
        _this.$apis.icpmanagement + "/taxcontrol/taxServer/getTaxServerById/" + _this.updatePageData.id, {},
        function (res) {
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
          
          if(!this.editFlag){
              //修改
              _this.$api.post(
                _this.$apis.icpmanagement + "/taxcontrol/taxServer/updateTaxServer", editParams,
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
               //关闭loading
               loading.close();                    
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
                _this.$apis.icpmanagement + "/taxcontrol/taxServer/saveTaxServer", editParams,
                function (res) {
                console.info(JSON.stringify(res));
                //关闭loading
                _this.loading=false;
                if (res.success) {
                    _this.$message({
                    message: "保存成功",
                    type: "success",
                    });
                    //关闭抽屉
                    _this.$emit("back");
                   //关闭loading
                   loading.close();
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