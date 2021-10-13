<style lang="less">
  @import url('./login.less');
   .login-from-box .el-form-item__content{
    margin-left:0px!important;
  }
</style>
<template>
  <div class="login" :style="{height:WHeight+'px'}">
    <div class="login-head">
      <div class="login-logo">
        增值税发票管理平台
      </div>
      <div class="login-head-left" style="color:#ffc107">
        （管理端）
      </div>
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
    <div class="login-from-box" v-loading='showLoading'>
      <div class="tabs-wrap">
          <el-tabs v-model="activeName" @tab-click="handleClick" class="rh-tabs" size="mini">
                <el-tab-pane label="密码登录" name="first" @click="initTab('tab1')">
                  <div class="tab-pane-wrap">
                    <el-form :model="loginForm" :rules="rules" ref="ruleForm" label-width = "100px" class="loginFrom">
                        <div class="rh-row">
                          <el-form-item prop="userName">
                            <el-input prefix-icon="el-icon-user" v-model="loginForm.userName" placeholder="请输入用户名" ></el-input>
                          </el-form-item>
                        </div>
                        <div class="rh-row">
                          <el-form-item prop="password">
                            <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" placeholder="请输入密码" prop="password" show-password></el-input>
                          </el-form-item>
                        </div>
                        <div class="rh-row">
                          <el-row :gutter="10">
                            <el-col :span="12">
                              <div class="pic_confirm">
                                <img :src="'data:image/png;base64,'+ img_show_str" alt="" @click="captcharandom">
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item prop="verificationCode">
                                <el-input v-model="loginForm.verificationCode" placeholder="请输入验证码" prop="verificationCode"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                        </div>
                        <div class="rh-row">
                          <div class="buttonGroup">
                            <!-- <el-button type="text" size="small" @click="forRegister()" style="font-color:blue">欢迎注册</el-button> -->
                            <el-button type="text" size="small" @click="forForgetPassword()">找回密码</el-button>
                          </div>
                        </div>
                        <div class="rh-row" style="text-align:center;">
                          <el-button type="primary"  size="small" style="width:100%" @click="submitTest()">登录</el-button>
                          <!-- <el-button type="info"  size="small" style="width:100px" @click="resetForm('ruleForm')">重置</el-button> -->
                        </div>

                    </el-form>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="手机短信" name="second" @click="initTab('tab2')">
                    <div class="tab-pane-wrap">
                      <el-form :model="loginForm1" :rules="rules" ref="ruleForm1" label-width = "100px" class="loginFrom">
                          <div class="rh-row">
                            <el-form-item prop="userName">
                              <el-input prefix-icon="el-icon-user" v-model="loginForm1.userName" placeholder="请输入用户名" ></el-input>
                            </el-form-item>
                          </div>
                          <div class="rh-row">
                            <el-form-item prop="password">
                              <el-input prefix-icon="el-icon-lock" v-model="loginForm1.password" placeholder="请输入密码" prop="password" show-password></el-input>
                            </el-form-item>
                          </div>
                          <div class="rh-row">
                            <el-row :gutter="10">
                              <el-col :span="14">
                                <el-form-item prop="verifCode">
                                  <el-input prefix-icon="el-icon-lock" v-model="loginForm1.verifCode" placeholder="请输入短信验证码" prop="verifCode"></el-input>
                                </el-form-item>
                              </el-col>
                              <el-col :span="10">
                                <el-form-item>
                                  <el-button type="primary" @click="getMessage('ruleForm')" style="width:100%" :disabled="btnDisable">{{btnStr}}</el-button>
                                </el-form-item>
                              </el-col>
                            </el-row>
                          </div>
                          <div class="rh-row">
                            <div class="buttonGroup">
                              <el-button type="text" size="small" @click="forRegister()" style="font-color:blue">欢迎注册</el-button>
                              <el-button type="text" size="small" @click="forForgetPassword()">找回密码</el-button>
                            </div>
                          </div>
                          <div class="rh-row">
                            <el-button type="primary"  size="small" style="width:100%" @click=" submitForm('ruleForm1')">登录</el-button>
                            <!-- <el-button type="info"  size="small" style="width:100px" @click="resetForm('ruleForm')">重置</el-button> -->
                          </div>
                      </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="邮箱登陆" name="third" v-if="false" @click="initTab('tab3')">
                    <div class="tab-pane-wrap">
                    <el-form :model="loginForm2" :rules="rules" ref="ruleForm2" label-width = "100px" class="loginFrom">
                        <div class="rh-row">
                          <el-form-item prop="userName">
                            <el-input prefix-icon="el-icon-user" v-model="loginForm.userName" placeholder="请输入用户名" ></el-input>
                          </el-form-item>
                        </div>
                        <div class="rh-row">
                          <el-form-item prop="password">
                            <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" placeholder="请输入密码" prop="password" show-password></el-input>
                          </el-form-item>
                        </div>
                        <div class="rh-row">
                          <el-form-item prop="email">
                            <el-input prefix-icon="el-icon-user" v-model="loginForm.email" placeholder="请输入邮箱" ></el-input>
                          </el-form-item>
                        </div>
                        <div class="rh-row">
                          <el-button type="primary"  size="small" style="width:100%" @click="submitForm('ruleForm2')">登录</el-button>
                          <!-- <el-button type="info"  size="small" style="width:100px" @click="resetForm('ruleForm')">重置</el-button> -->
                        </div>
                        <div class="rh-row">
                          <div class="buttonGroup">
                            <el-button type="text" size="small" @click="forRegister()" style="font-color:blue">注册</el-button>
                            <el-button type="text" size="small" @click="forForgetPassword()">找回密码</el-button>
                          </div>
                        </div>
                    </el-form>
                  </div>  
                </el-tab-pane>
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
                        <el-button @click="dialogOk">确定</el-button>
                        <el-button @click="dialogCancel">取消</el-button>
                  </div>
                </el-dialog>
          </el-tabs>
      </div>

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
  import auth from '@/utils/auth.js';
  import storage from "@/localstorage/index.js"
  import { v4 as uuidv4 } from 'uuid';
  export default {
    name:'login',
    data () {
      return{
        isDialogShow: false,
        btnDisable:false,
        btnStr: "获取验证码",
        img_show_str:"",
        verificationCode:"",
        activeName:'first',
        currentForm:'ruleForm',
        random: uuidv4(),
        loginForm:{
          userName:'',
          password:'',
          verificationCode:''
        },
        loginForm1:{
          userName:'',
          password:'',
          verifCode:'',
        },
        rules:{
          userName:[
            {required:true,message:'请输入用户名',trigger:'blur'}
          ],
          password:[
            {required:true,message:'请输入密码',trigger:'blur'},
          ],
          verificationCode:[
            {required:true,message:'请输入验证码',trigger:'blur'},
          ]
        },
        rules1:{
          userName:[
            {required:true,message:'请输入用户名',trigger:'blur'}
          ],
          password:[
            {required:true,message:'请输入密码',trigger:'blur'},
          ],
          verifCode:[
            {required:true,message:'请输入短信验证码',trigger:'blur'},
          ]
        },
        WHeight:window.innerHeight,
        msg:'请填写登录信息',
        showLoading: false,
      }
    },
    created() {
      // this.keyupEnter();
      // storage.remove();
      // this.captcharandom();
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
            tel: that.loginForm1.userName,
            random: that.random,
          }
          this.$api.get(this.$apis.home+"/open/home/login/sendMessage", params, function (res) {
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
      initTab(tab){
        if(tab =="tab1"){
          this.currentForm = "ruleForm";
        }else if(tab =="tab2"){
          this.currentForm = "ruleForm1";
        }else if(tab =="tab3"){
          this.currentForm = "ruleForm2";
        }else{
          this.currentForm = "ruleForm";
        }
      },
      getMessage(formName){
        var that = this;
        var tel = that.loginForm1.userName;
        if(tel != "" && checkTelPage(tel)){
          that.$api.get(that.$apis.home+"/open/home/login/checkTelExists", {tel: tel}, function (res) {
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
      keyupEnter(){
        var that = this;
        document.onkeydown = e =>{
          //window.event.keyCode
          if (e.keyCode === 13) {
            that.submitForm(that.currentForm)
          }
        }
      },
      handleClick:function(tab,event){
        // console.log(tab,event);
        //tab节点查找el-tabs__content节点
        event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.transform="translateX("+tab.index*(-100)+"%)";
        //console.log(event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling);
      },
      //测试环境登录函数
      submitTest(){
        let that = this;
        that.$router.push({path:'/main'});
      },
      //提交函数N
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if(valid){
            that.showLoading = true;
            that.$api.post(that.$apis.home+"/open/home/login/getpublickey", {}, function (res) {
              if(res.success){
                var publicKey = res.data;
                let password = encryptedData(publicKey, that.loginForm.password);
                let userinfo = {
                  userName: that.loginForm.userName,
                  password: password,
                  phoneVerificationCode: that.loginForm1.verifCode,
                  verificationCode: that.loginForm.verificationCode,
                  random: that.random,
                };
                let headres = {
                  "www-xxx-dgrhinfo": publicKey
                }
                that.$api.post(that.$apis.home+"/open/home/login/loginmanage", userinfo, function (res) {
                  that.showLoading = false;
                  if (res.success) {
                    auth.setToken(res.data.token);
                    that.$router.push({path:'/main/home'});
                  } else if(res.errorCode=="H00012"){
                    that.$message.error("已开启多因子校验：" + res.errorMsg);
                    // that.activeName = "second";
                    $("#tab-second").click();
                    //document.getElementById("pane-second").parentElement.style.transform="translateX("+1*(-100)+"%)";
                    that.captcharandom();
                  } else {
                    that.$message.error("登录失败：" + res.errorMsg);
                    that.captcharandom();
                  }
                }, headres);
              }
            });   
          }
        });
        // let password = encrypted.toString();
      },
      //清空表单内容
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      forRegister(){
        this.$router.push({path:'/register'});
      },
      forForgetPassword(){
        this.$router.push({path:'/forgetPassword'});
      },
      forTop(){
        this.$router.push({path:'/login'});
      }
    }
  
  }

</script>
