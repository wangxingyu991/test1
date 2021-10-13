<template>
  <div>
    <div class="rh-dialog-body"  v-loading="loading">
      <el-form :model="form" :rules="rules" ref="form" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="22">
            <el-form-item label="发票类型名称" prop="fplxmc">
              <el-input v-model="form.fplxmc"  :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="发票类型代码" prop="fplxdm">
              <el-input v-model="form.fplxdm"  :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="纳税人识别号" prop="nsrsbh">
              <el-input v-model="form.nsrsbh"  :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
       <el-row>
          <el-col :span="22">
            <el-form-item label="虚拟设备号" prop="xnsbh">
              <el-input v-model="form.xnsbh"  :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="开票终端名称" prop="kpzdmc">
              <el-input v-model="form.kpzdmc" placeholder="请输入开票终端名称" maxlength="12"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="rh-dialog-footer">
      <el-button type="primary"  @click="saveTerminal('form')" :loading="loading">保存</el-button>
      <el-button @click="close('form')">关闭</el-button>
    </div>
  </div>
</template>

<script>
import validate from "@/utils/validate.js";
export default {
  props: ["pageterminaladdData"],

  data() {
    return {
      loading: false,
      form: {
        fplxdm: "",
        nsrsbh: "",
        xnsbh: "",
        kpzddm: "",
        kpzdmc: "",
        swukbh: "",
      },
      //校验规则
      rules: {
        kpzdmc: [
          { required: true, message: "请输入开票终端名称", trigger: "blur" },
          { max: 12, message: "最多12个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
      },
      loading: false,
    };
  },

  created() {},

  mounted() {
    this.initInfo();
  },

  methods: {

    //初始化页面数据
    initInfo(){
      let _this = this;
      _this.form.fplxmc=_this.pageterminaladdData.fplxmc;
      _this.form.fplxdm=_this.pageterminaladdData.fplxdm;
      _this.form.nsrsbh=_this.pageterminaladdData.nsrsbh;
      _this.form.xnsbh=_this.pageterminaladdData.xnsbh;
      _this.form.swukbh=_this.pageterminaladdData.swukbh;
    },

    //新增开票终端
    saveTerminal(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
      if (valid) {
      _this.$confirm("每个发票类型最多只能新增10个开票终端，您确定新增开票终端吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          let params = this.form;
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
          //打开loading
          _this.loading=true;
          _this.$api.post(
            _this.$apis.icpmanagement + "/taxcontrol/terminal/saveTerminal" ,params,
            function (res) {
              //关闭loading
              _this.loading=false;
              console.info(JSON.stringify(res));
              if (res.success) {
                _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.returnmsg,
                '税控服务器返回提示', {
                  confirmButtonText: '关闭',
                  dangerouslyUseHTMLString: true
                });
                _this.$emit("back");
              } else {
                _this.$message({
                  message: res.errorMsg,
                  type: "error",
                });
              }
              _this.$emit("back");
            }
          );
        });
      }
    });
  },

    //关闭
    close(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.$emit("back");
    },

  },
};
</script>

<style lang="less">
.el-dialog__headerbtn {
  right: 40px;
}
</style>