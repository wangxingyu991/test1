<style lang="less">
  .container{
    .head{
      text-align: center;
      font-size:24px;
      font-weight:700;
      line-height: 60px;
    }
    .form{
      width:300px;
      margin:0 auto;
    }
  }
  .list{
    li{
      line-height:24px;
      color:rgb(9, 172, 9);
      i{
        font-size:14px;
      }
      .text{
        margin-left:0px;
      }
      &.wrong{
            color:rgb(231, 36, 36);
          }
      &.correct{
            color:rgb(37, 180, 24);
          }
      &.normal{
            color:rgb(51, 51, 51);
          }
      .td{
        float:left;
      }
      .td_1{
        width:6%;
      }
      .td_2{
        width:94%;
      }
    }
  }
</style>
<template>
    <div class="rh-page-content">
        <div class="rh-operate clearfix">
            <el-form :model="updateForm" :rules="rules" ref="ruleForm" label-width = "0px" class="loginFrom">
                <el-col :span="24">
                    <el-form-item prop="opassword">
                      <el-input prefix-icon="el-icon-user" v-model="updateForm.opassword" placeholder="请输入原密码" show-password></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item prop="password">
                      <el-popover placement="right" trigger="focus">
                        <!-- <el-input v-model="form.password" placeholder="登录密码由8-20位数字+字母组成，字母区分大小写" @change="test(form.password)" slot="reference" ></el-input>   -->
                        <el-input prefix-icon="el-icon-lock" v-model="updateForm.password" placeholder="请输入您想要设置的新密码" prop="password" show-password slot="reference" ></el-input>
                        <div style="width:300px;">
                          <ul class="list">
                            <li :class="flag?'correct':'wrong'">
                              <div class="td td_1"><i class="el-icon-circle-check" v-if="flag"></i><i class="el-icon-circle-close" v-if="!flag"></i></div>
                              <div class="td td_2"><span class="text">包含8-20个字符</span></div>
                              <div class="clear"></div>
                            </li>
                            <li :class="flag2?'correct':'wrong'"> 
                              <div class="td td_1">
                                  <i class="el-icon-circle-check" v-if="flag2"></i>
                                  <i class="el-icon-circle-close" v-if="!flag2"></i>
                              </div>
                              <div class="td td_2">
                                <span class="text">必须有特殊字符且有数字大小写字母中的二种</span>
                              </div>
                              <div class="clear"></div>
                            </li>
                            <li  :class="flag3?'correct':'wrong'"> 
                              <div class="td td_1">
                                  <i class="el-icon-circle-check" v-if="flag3"></i>
                                  <i class="el-icon-circle-close" v-if="!flag3"></i>
                              </div>
                              <div class="td td_2">
                                <span class="text">不能有空格和中文</span>
                              </div>
                              <div class="clear"></div>
                            </li>
                            <li  :class="flag4?'correct':'wrong'"> 
                              <div class="td td_1">
                                  <i class="el-icon-circle-check" v-if="flag4"></i>
                                  <i class="el-icon-circle-close" v-if="!flag4"></i>
                              </div>
                              <div class="td td_2">
                                <span class="text">不能包含连续三个或者三个以上的字符</span>
                              </div>
                              <div class="clear"></div>
                            </li>
                          </ul>
                        </div>
                      </el-popover>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item prop="passwordr">
                        <el-input prefix-icon="el-icon-lock" v-model="updateForm.passwordr" placeholder="请再次输入您的新密码" prop="passwordr" show-password></el-input>
                    </el-form-item>
                </el-col>
                <el-col class="rh-row" style="display:flex; justify-content:center">
                    <el-button type="primary"  size="small" style="width:100px" @click="submitForm('ruleForm')" :loading="showLoading">修改密码</el-button>
                </el-col>
            </el-form>
        </div>
  </div>
</template>

<script>
import {encryptedData, decryptData} from "@/utils/jsencrypt.js"
import myauth from "@/utils/auth.js";
import storage from "@/localstorage/index.js"
import validate from "@/utils/validate.js";

export default {
  props: ["udpateData"],
  data() {
    var checkPassword = (rule, value, callback) => {
        if (this.updateForm.password != this.updateForm.passwordr ) {
            callback(new Error("两次密码不符"));
        } else {
            callback(); 
        }
    };
    var comparePassword = (rule, value, callback) => {
        if (this.updateForm.password == this.updateForm.opassword ) {
            callback(new Error("新密码不能与原密码相同"));
        } else {
            callback(); 
        }
    };
    var checkPwdLog  = (rule, value, callback) => {
      var that = this;
      that.$api.post(that.$apis.home+"/open/home/login/getpublickey", {}, function (res) {
        if(res.success){
          var publicKey = res.data;
          let password = encryptedData(publicKey, that.updateForm.password);
          let checkPwdInfo = { 
            password: password
          };
          let headres = {
            "www-xxx-dgrhinfo": publicKey,
            "X-API-TOKEN": myauth.getToken()
          }
          that.$api.post(that.$apis.home+"/rest/home/home/checkpwdlog", checkPwdInfo, function (res) {
            if (res.success) {
              callback(); 
              return true;
            }else{
              callback(new Error(res.errorMsg));
              return false;
            }
          }, headres);
        }
      })
    };
    return {
        flag:false,
        flag2:false,
        flag3:false,
        flag4:false,
        loading: false,
        showUpdatePwd:false,
        showLoading:false,
        userInfo: { },
        updateForm:{
            password:'',
            passwordr:'',
            opassword:''
        },
        btnDisable:false,
        btnStr: "获取验证码",
        rules:{
            opassword:[
                {required:true,message:'请输入原密码',trigger:'blur'}
            ],
            password:[ {required:true,message:'请输入密码',trigger:'blur'},
              {validator:this.$validate.checkPwd, trigger:'blur'},
              {validator:comparePassword, trigger:'blur'},
              {validator:checkPwdLog, trigger:'blur'}
              ],
            passwordr:[ {required:true,message:'请再次输入密码',trigger:'blur'},
            {validator:checkPassword, trigger:'blur'} ]
        },
    };
  },

  created() {
      // console.log(this.udpateData);
  },

  mounted() {
  },
  watch:{
    'updateForm.password'(val,oldV){
      this.checkVal(val);
    }
  },
  methods: {
    submitForm(formName){
      var that = this;
      that.$refs[formName].validate((valid) => {
        if(valid){
          that.showLoading = true;
          that.$api.post(that.$apis.home+"/open/home/login/getpublickey", {}, function (res) {
            if(res.success){
              var publicKey = res.data;
              let password = encryptedData(publicKey, that.updateForm.password);
              let opassword = encryptedData(publicKey, that.updateForm.opassword);
              let registerInfo = { 
                password: password, 
                opassword: opassword 
              };
              that.$api.post(that.$apis.home+"/rest/home/home/udpatepwd", registerInfo, function (res) {
                that.showLoading = false;
                if (res.success) {
                  that.$message({ message: "修改成功，请重新登陆",  type: 'success' });
                  myauth.removeToken();
                  storage.remove(); 
                  that.$router.push({path:'/login'});
                } else {
                  that.$message.error("修改失败：" + res.errorMsg);
                }
              });
            }
          });
        }
      });
    },
    checkVal(val){
      if( val.length >= 8 && val.length <20 ){
        this.flag = true;
      }else{
        this.flag = false;
      }
      // 是数字
      var isDigit = /^.*[0-9]+.*/;
      // isLowerCase 小写字母
      var isLowerCase = /^.*[a-z]+.*/;
      // isUpperCase 大写字母
      var isUpperCase = /^.*[A-Z]+.*/;
      // 特殊字符
      var regEx = /^.*[~!@#\$%\^&\*.\?_]+.*/;
      // 记录匹配的次数
      var num = 0;
      if (isDigit.test(val)) {
        num = num + 1;
      }
      if (isLowerCase.test(val)) {
        num = num + 1;
      }
      if (isUpperCase.test(val)) {
        num = num + 1;
      }
      if (num <= 1 || !regEx.test(val)) {
        this.flag2 = false;
      }else{
        this.flag2 = true;
      }
      var spaceEx = /^.*[^a-zA-Z0-9~!@#\$%\^&\*.\?_]+.*/
      if(spaceEx.test(val)){
        this.flag3 = false;
      }else{
        this.flag3 = true;
      }
      //3个或3个以上重复字符
      var res1 = /(\w)*(\w)\2{2}(\w)*/g;
      if(res1.test(val)){
        this.flag4=false;
      }else{
        this.flag4=true;
      }
    }
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