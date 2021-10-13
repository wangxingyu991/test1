<style lang="less">
.formStep{

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

  .el-button.el-button--text{
    color:rgb(0, 0, 0);
    display: block;
    font-size: 12px;
  }
  
}
</style>
<template>
  <div class="form-wrap formStep">
    <div class="form1" v-if="propid == 1">
      <el-form ref="form1" :rules="rules" :label-position="'right'" :model="form1" label-width="0px">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="tel">
              <el-input v-model="form1.tel" placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter = "10">
          <el-col :span="10">
            <div class="valify-wrap" style="width:100%">
              <img :src="'data:image/png;base64,'+ img_show_str" alt="" @click="captcharandom">
            </div>
          </el-col>
          <el-col :span="14">
            <el-form-item prop="varify">
              <el-input v-model="form1.varify" placeholder="请输入验证码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="button-group">
              <el-button type="primary"  @click="confirmTel()">下一步</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="form2" v-if="propid == 2">
      <el-form ref="form2" :rules="rules" :label-position="'right'" :model="form2" label-width="0px">
        <!-- <el-row>
          <el-col>
            <div class="rh-hint">
            <p> 向手机号：186******8989发送验证码</p>
            </div>
          </el-col>
        </el-row> -->
        <el-row :gutter = "20">
          <el-col :span="14">
            <el-form-item label="" prop="verifCode">
              <el-input v-model="form2.verifCode" placeholder="请输入验证码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-button type="primary" :disabled="btnDisable" @click="getMessage()">{{btnStr}}</el-button>
          </el-col>
        </el-row>

        <el-row>
          <!-- <el-col :span="24">
            <div class="rh-hint">
              <el-button type="text" class="fontBlue">更改邮箱验证</el-button>
            </div>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="20">
            <div class="button-group" >
              <el-button type="primary" @click="confirmVerifCode()">下一步</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <!-- <div class="rh-hint">
              <p>以上验证方式不可用，请联系人工客服获取帮助:400-428-591</p>
              <el-button type="text" class="fontBlue"> 若已找回密码，可返回登录。</el-button>
            </div> -->
          </el-col>
        </el-row>
      </el-form>  
    </div>
    <div class="form3" v-if="propid==3">
      <el-form ref="form3" :rules="rules" :label-position="'right'" :model="form3" label-wshowIdth="0px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="" prop="password">
              <el-popover placement="right" trigger="focus">
                <el-input v-model="form3.password" placeholder="请输入密码" show-password slot="reference"></el-input>
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
                        <span class="text">密码不能有空格和中文</span>
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
        </el-row>
        <el-row :gutter = "20">
          <el-col :span="24">
            <el-form-item label="" prop="passwordr">
              <el-input v-model="form3.passwordr" placeholder="请输入确认密码" show-password></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="button-group">
              <el-button type="primary" class="self-nextBt"  @click="modifyPassword()">完成</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>   
    </div>
  </div>
</template>

<script>
  import {encryptedData, decryptData} from "@/utils/jsencrypt.js"
  import {checkTel, checkTelPage} from "@/utils/tools.js"
export default {
    props:["propid", "step", "entity", "random"],
    mounted(){
      // console.log("接受:propid=",this.propid);
    },
    computed:{

    },
    watch:{
      'form3.password'(val,oldV){
        this.checkVal(val);
      },
    },
    created() {
      if(this.step == '1'){
        this.captcharandom();
      }
    },
    data(){
      var checkPassword = (rule, value, callback) => {
        if (this.form3.password != this.form3.passwordr ) {
            callback(new Error("两次密码不符"));
        } else {
            callback(); 
        }
      };
      var checkTelExists = (rule, value, callback) => {
        var that = this;
        that.$api.get(this.$apis.home+"/open/home/retrievePassword/checkTelExists", {tel: that.form1.tel}, function (res) {
          if (res.success) {
            callback(); 
            return true;
          }else{
            callback(new Error(res.errorMsg));
            return false;
          }
        });
      };
      var checkPwdLog  = (rule, value, callback) => {
        var that = this;
        that.$api.post(that.$apis.home+"/open/home/login/getpublickey", {}, function (res) {
          if(res.success){
            var publicKey = res.data;
            let password = encryptedData(publicKey, that.form3.password);
            let checkPwdInfo = { 
              password: password,
              tel:that.form1.tel
            };
            let headres = {
              "www-xxx-dgrhinfo": publicKey
            }
            that.$api.post(that.$apis.home+"/open/home/retrievePassword/checkpwdlog", checkPwdInfo, function (res) {
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
      return{
        flag:false,
        flag2:false,
        flag3:false,
        flag4:false,
        img_show_str:"",
        btnDisable:false,
        btnStr: "获取验证码",
        form1:{
          tel: "",
          varify: ""
        },
        form2:{
          verifCode:''
        },
        form3:{
          password:"",
          passwordr:""
        },
        showId:1,
        rules:{
          tel:[
            {required:true,message:'请输入手机号',trigger:'blur'},
            {validator:checkTel, trigger:'blur'},
            {validator:checkTelExists, trigger:'blur'}
          ],
          varify:[
            {required:true,message:'请输入验证码',trigger:'blur'}
          ],
          verifCode:[
            {required:true,message:'请输入短信验证码',trigger:'blur'}
          ],
          password:[
            {required:true,message:'请输入密码',trigger:'blur'},
            {validator:this.$validate.checkPwd, trigger:'blur'},
            {validator:checkPwdLog, trigger:'blur'}
          ],
          passwordr:[
            {required:true,message:'请再次输入密码',trigger:'blur'},
            {validator:checkPassword, trigger:'blur'}
          ]
        }
      }
    },
    methods:{
      captcharandom(){
        var that = this;
        var id = new Date() + Math.floor(Math.random()*24);
        that.$api.get(this.$apis.home+"/open/home/register/getVerificationCode", {id: id, random: that.random}, function (res) {
          if (res.success) {
            var base64Str = res.data.base64Str;
            that.img_show_str = res.data.base64Str;
          }
        });
      },
      confirmTel(){
        var that = this;
        that.$refs["form1"].validate((valid) => {
          if(valid){
            var params = that.form1;
            params.random = that.random;
            that.$api.get(that.$apis.home+"/open/home/retrievePassword/checkTelVarify", params, function (res) {
              if (res.success) {
                var entity = {};
                entity.tel = that.form1.tel;
                entity.varify= that.form1.varify;
                that.nextStep(2, entity);
              }else{
                that.$message.error(res.errorMsg);
              }
            })
          }
        });
      },
      getMessage(){
        var that = this;
        var params = {
          tel: that.entity.tel,
          varify: that.entity.varify,
          random: that.random,
        }
        this.$api.get(this.$apis.home+"/open/home/retrievePassword/sendMessage", params, function (res) {
          if (res.success) {
            that.btnDisable = true;
            that.sendCode();
          }else{
            that.$message.error(res.errorMsg);
          }
        })
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
      confirmVerifCode(){
        var that = this;
        that.$refs["form2"].validate((valid) => {
          if(valid){
            var params = {
              verifCode: that.form2.verifCode,
              tel: that.entity.tel,
              varify:that.entity.varify,
              random: that.random,
            };
            that.$api.get(that.$apis.home+"/open/home/retrievePassword/checkVerifCode", params, function (res) {
              if (res.success) {
                var params = {};
                params.tel = that.entity.tel;
                params.varify= that.entity.varify;
                params.verifCode= that.form2.verifCode;
                that.nextStep(3, params);
              }else{
                that.$message.error(res.errorMsg);
              }
            })
          }
        });
      },
      modifyPassword(){
        var that = this;
        that.$refs["form3"].validate((valid) => {
          if(valid){
            that.$api.post(that.$apis.home+"/open/home/login/getpublickey", {}, function (res) {
              if(res.success){
                var publicKey = res.data;
                let password = encryptedData(publicKey, that.form3.password);
                var params = {
                  verifCode: that.entity.verifCode,
                  tel: that.entity.tel,
                  varify: that.entity.varify,
                  password: password,
                  random: that.random,
                };
                let headres = {
                  "www-xxx-dgrhinfo": publicKey
                }
                that.$api.post(that.$apis.home+"/open/home/retrievePassword", params, function (res) {
                  if (res.success) {
                    that.$message.success("修改成功");
                    that.$router.push({path:'/login'});
                  }else{
                    that.$message.error(res.errorMsg);
                  }
                }, headres)
              }
            })
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
      if (regEx.test(val)) {
        num = num + 1;
      }
      if (num <= 2) {
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
    },
    nextStep:function(val, entity){
      this.$emit("getId",val, entity);
    }
    }
}
</script>

<style lang="less">
  .form1{
      width:72%;
    }
  .form2{
      width: 88%;
  }
  .form3{
    width: 71%;
  }
  .self-nextBt{
    width:240px;
    text-align: center;
    margin-bottom:15px;
  }
 
  .step-title{
    text-align: center;
    font-size:16px;
    font-weight: 700;
    line-height: 50px;
    color:#4e4e4e;
  }
  .rh-hint{
    margin-bottom:15px;
    p{
      line-height:25px;
    }
  }
  .valify-wrap{
    width:130px;
    height:28px;
  }
  .valify-wrap img{
    width: 100%;
    height:100%;
  }
  .button-group{
    display: flex;
    justify-content: center;
    .el-button{
      width:160px;
    }
  }
  .el-button.el-button--text.fontBlue{
    color:#44b1f9;
  }
</style>