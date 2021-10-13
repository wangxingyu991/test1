<style lang="less">
  @import url('./login.less');
  .login1631{
    .login-from-box  .el-form-item__content{
       margin-left:0px!important;
     }
  }
</style>
<template>
  <div class="login login1631" :style="{height:WHeight+'px'}">
    <div class="login-head">
      <div class="login-logo"><img src="../../assets/index_logo.png" alt=""></div>
      <div class="login-head-right">
        <span class="login-head-bt">
          <el-button type="text" @click="forTop()">首页</el-button>
        </span>
        <!-- <span class="login-head-bt">
          <el-button type="text">帮助</el-button>
        </span>
        <span class="login-head-bt">
          <el-button type="text">中文简体</el-button>
        </span>
         <el-divider direction="vertical"></el-divider> -->
         <span class="login-head-bt">

         </span>
      </div>
    </div>
    <div class="login-from-box">
      <el-form :model="registerForm" :rules="rules" ref="ruleForm" label-width = "100px" class="loginFrom">
        <el-card class="box-card">
          <div class="rh-login-title clearfix" slot="header" >
            <span class="rh-login-title">欢迎注册</span>
          </div>
          <div class="rh-row">
            <el-form-item prop="tel">
              <el-input prefix-icon="el-icon-user" v-model="registerForm.tel" placeholder="请输入手机号"></el-input>
            </el-form-item>
          </div>
          <div class="rh-row">
            <el-row :gutter="10">
              <el-col :span="14">
                <el-form-item prop="verifCode">
                  <el-input prefix-icon="el-icon-lock" v-model="registerForm.verifCode" placeholder="请输入短信验证码" prop="verifCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="verifCode">
                  <el-button @click="getMessage('ruleForm')" style="width:100%" :disabled="btnDisable">{{btnStr}}</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="rh-row">
            <el-form-item prop="password">
              <el-input prefix-icon="el-icon-lock" v-model="registerForm.password" placeholder="请设置你的密码" prop="password" show-password></el-input>
            </el-form-item>
          </div>
          <div class="rh-row">
            <el-form-item prop="passwordr">
              <el-input prefix-icon="el-icon-lock" v-model="registerForm.passwordr" placeholder="请再次输入您的密码" prop="passwordr" show-password></el-input>
            </el-form-item>
          </div>
          <div class="rh-row" style="display:flex; justify-content:center">
            <el-button type="primary"  size="small" style="width:100px" @click="submitForm('ruleForm')">注 册</el-button>
          </div>
        </el-card>
        <el-dialog :visible.sync = "isDialogShow" width="30%" top="35vh" append-to-body>
          <div class="rh-dialog-body">
            <div>
              <el-row>
                <el-col :span="14">
                  <img :src="'data:image/png;base64,'+ img_show_str" alt="" @click="captcharandom">
                </el-col>
                <el-col :span="6" >
                  <el-input style="margin-top:5px" v-model="verificationCode"></el-input>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="rh-dialog-footer" solt="footer">
                <el-button @click="dialogOk">确 定</el-button>
                <el-button @click="dialogCancel">取 消</el-button>
          </div>
        </el-dialog>
      </el-form>
    </div>
    <!-- <div class="login-head-bottom">
      <div class="copy-right">
        瑞宏科技有限集团
      </div>
    </div> -->
  </div>
</template>
<script>
  import {encryptedData, decryptData} from "@/utils/jsencrypt.js"
  import {checkTel, checkTelPage} from "@/utils/tools.js"
  import { v4 as uuidv4 } from 'uuid';
  export default {
    name:'login',
    data () {
      var checkPassword = (rule, value, callback) => {
        if (this.registerForm.password != this.registerForm.passwordr ) {
            callback(new Error("两次密码不符"));
        } else {
            callback(); 
        }
      };
      var checkTelExists = (rule, value, callback) => {
        var that = this;
        that.$api.get(this.$apis.home+"/open/home/register/checkTelExists", {tel: that.registerForm.tel}, function (res) {
          if (res.success) {
            callback(); 
            return true;
          }else{
            callback(new Error(res.errorMsg));
            return false;
          }
        });
      };
      return{
        random: uuidv4(),
        isDialogShow: false,
        btnDisable:false,
        btnStr: "获取验证码",
        img_show_str:"",
        verificationCode:"",
        registerForm:{
          tel:'18266416093',
          password:'',
          passwordr:'',
          verifCode:''
        },
        rules:{
          tel:[
            {required:true,message:'请输入手机号',trigger:'blur'},
            {validator:checkTel, trigger:'blur'},
            {validator:checkTelExists, trigger:'blur'}
          ],
          verifCode:[
            {required:true,message:'请输入短信验证码',trigger:'blur'}
          ],
          password:[
            {required:true,message:'请输入密码',trigger:'blur'},
            {validator:this.$validate.checkPwd, trigger:'blur'}
          ],
          passwordr:[
            {required:true,message:'请再次输入密码',trigger:'blur'},
            {validator:checkPassword, trigger:'blur'}
          ]
        },
        WHeight:window.innerHeight,
        msg:'请填写登录信息',
      }
    },
    created() {
    },
    methods:{
      captcharandom(){
        var that = this
        var id = new Date() + Math.floor(Math.random()*24);
        that.random = uuidv4();
        that.$api.get(this.$apis.home+"/open/home/register/getVerificationCode", {id: id, random: that.random}, function (res) {
          if (res.success) {
            var base64Str = res.data.base64Str;
            that.img_show_str = res.data.base64Str;
          }
        });
      },
      dialogOk(){
        var that = this;
        if(that.verificationCode == ""){
          that.$message.error("请输入验证码");
        }else{
          var params = {
            verificationCode: that.verificationCode,
            tel: that.registerForm.tel,
            random: that.random,
          }
          this.$api.get(this.$apis.home+"/open/home/register/sendMessage", params, function (res) {
            if (res.success) {
              that.isDialogShow = false;
              that.btnDisable = true;
              that.sendCode();
            }else{
              that.$message.error(res.errorMsg);
            }
          })
        }
      },
      sendCode() {
        var that = this;
        var timer_num = 60;
        that.btnStr = timer_num+"秒后重试";
        var timeClock=setInterval(function(){
            timer_num--;
            // $('.clock').html(timer_num);
            that.btnStr = timer_num+"秒后重试";
            if (timer_num == 0) {
              clearInterval(timeClock);
                that.btnStr = "短信验证码";
                that.btnDisable = false;
            } 
        },1000)
      },
      dialogCancel(){
        this.isDialogShow = false;
      },
      handleClose(){
        this.isDialogShow = false;
      },
      forTop(){
        this.$router.push({path:'/login'});
      },
      getMessage(formName){
        var that = this;
        var tel = that.registerForm.tel;
        if(tel != "" && checkTelPage(tel)){
          that.$api.get(that.$apis.home+"/open/home/register/checkTelExists", {tel: that.registerForm.tel}, function (res) {
            if (res.success) {
              that.verificationCode = "";
              that.isDialogShow = true;
              that.captcharandom();
            }else{
              that.$message.error(res.errorMsg);
              return false;
            }
          });
        }else{
          that.$message.error("手机号格式错误");
        }
      },
      //提交函数N
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if(valid){
            that.$api.post(that.$apis.home+"/open/home/login/getpublickey", {}, function (res) {
              if(res.success){
                var publicKey = res.data;
                let password = encryptedData(publicKey, that.registerForm.password);
                let registerInfo = {
                  tel: that.registerForm.tel,
                  password: password,
                  verifCode: that.registerForm.verifCode
                };
                let headres = {
                  "www-xxx-dgrhinfo": publicKey
                }
                that.$api.post(that.$apis.home+"/open/home/register", registerInfo, function (res) {
                  if (res.success) {
                    that.$message({ message: "注册成功",  type: 'success' });
                    that.$router.push({path:'/login'});
                  } else {
                    that.$message.error("注册失败：" + res.errorMsg);
                  }
                }, headres);
              }
            });
          }
        });
      },
      //清空表单内容
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }

  }

</script>
<style scoped>
.el-dialog .el-dialog__headerbtn{
  display: none;
}
.el-dialog .el-dialog__header {
    padding: 0px 32px 18px;
}
.rh-dialog-footer {
    padding: 0px 32px 0px;
}
</style>