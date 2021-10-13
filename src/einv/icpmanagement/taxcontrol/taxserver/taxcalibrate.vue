<template>
  <div>
    <div class="rh-dialog-body">
      <el-form :model="form" :rules="rules" ref="form" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="22">
            <el-form-item label="当前时钟" prop="fwqsj">
              <el-input v-model="form.fwqsj" placeholder="当前时钟" :readonly="true" value-format="yyyy-MM-dd HH:mm:ss"  ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="rh-dialog-footer">
      <el-button type="primary"  @click="taxcalibrate()" :loading="loading">时钟校准</el-button>
      <el-button @click="close('form')">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["pagetaxcalibrateData"],

  data() {
    return {
      loading: false,
      form: {
        id: "",
        fwqdz: "",
        fwqdkh: "",
        swukbh: "",
        fwqsj: "",
      },
      //校验规则
      rules: {},
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
      console.info(JSON.stringify(_this.pagetaxcalibrateData.returndata));
      _this.form.fwqsj=_this.pagetaxcalibrateData.returndata.fwqsj;
    },

    //税控服务器时钟校准
    taxcalibrate() {
      let _this = this;
      
      _this.$confirm("确定校准税控服务器时钟吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          //打开loading
          const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'})

          let params =  {fwqdz:_this.pagetaxcalibrateData.fwqdz,fwqdkh:_this.pagetaxcalibrateData.fwqdkh,id:_this.pagetaxcalibrateData.id};
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
            _this.$apis.icpmanagement + "/taxcontrol/taxServer/getTaxcalibrateById" ,params,
            function (res) {
              console.info(JSON.stringify(res));
              if (res.success) {
              if(res.data.body.returncode=='0'){
                _this.form.fwqsj=res.data.body.returndata.fwqsj;
              }
                _this.$alert('返回代码：'+res.data.body.returncode+'</br>'+'返回描述：'+res.data.body.returnmsg,
                '税控服务器返回提示', {
                  confirmButtonText: '关闭',
                  dangerouslyUseHTMLString: true
                });
              } else {
                _this.$message({
                  message: res.errorMsg,
                  type: "error",
                });
              }
                //关闭loading
                loading.close();
            }
          );
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