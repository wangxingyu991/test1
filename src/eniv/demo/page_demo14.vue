<style lang="less" scoped>
  .container{
    .head{
      text-align: center;
      font-size:24px;
      font-weight:700;
      line-height: 60px;
    }
    .form{
      width:400px;
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
  <div>
      <div class="rh-page-header">
        <div class="rh-head-and-operate">
              <div class="tips-content">
                    <span class="rh-helpTip-text">
                          注册页面
                    </span>
                    <span class="rh-helpTip-icon">
                          <el-tooltip class="item" content="注册页面包含用户名注册规则提示，密码设置规则以及校验">
                                <i class="el-icon-info"></i>
                          </el-tooltip>
                    </span>
              </div>
              <div class="operate-btns">
                    <el-button>操作</el-button>
              </div>
        </div>
      </div>
      <div class="rh-page-content">
          <div class="container register">
            <el-tooltip placement="top">
                <div slot="content">多行信息<br/>第二行信息</div>
                <el-button>Top center</el-button>
            </el-tooltip>
            <div class="head">欢迎注册瑞宏云</div>
            <div class="form">
              <el-form>
                <el-form-item prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item prop="passowrd">
                  <el-popover placement="right" trigger="focus">
                      <el-input v-model="form.password" placeholder="登录密码由8-20位数字+字母组成，字母区分大小写" @change="test(form.password)" slot="reference" ></el-input>  
                      <div style="width:300px;">
                        <ul class="list">
                          <li :class="flag?'correct':'wrong'">
                            <div class="td td_1"><i class="el-icon-circle-check" v-if="flag"></i><i class="el-icon-circle-close" v-if="!flag"></i></div>
                            <div class="td td_2"><span class="text">包含6-20个字符，用户名不能相同</span></div>
                            <div class="clear"></div>
                          </li>
                          <li :class="flag2?'correct':'wrong'"> 
                            <div class="td td_1">
                                <i class="el-icon-circle-check" v-if="flag2"></i>
                                <i class="el-icon-circle-close" v-if="!flag2"></i>
                            </div>
                            <div class="td td_2">
                              <span class="text">密码必须包含大小写</span>
                            </div>
                            <div class="clear"></div>
                          </li>
                          <li  :class="flag3?'correct':'wrong'"> 
                            <div class="td td_1">
                                <i class="el-icon-circle-check" v-if="flag3"></i>
                                <i class="el-icon-circle-close" v-if="!flag3"></i>
                            </div>
                            <div class="td td_2">
                              <span class="text">密码必须包含数字</span>
                            </div>
                            <div class="clear"></div>
                          </li>
                        </ul>
                      </div>
                  </el-popover>
                  
                </el-form-item>
                <el-form-item prop="passowrd">
                  <el-input v-model="form.repeat_password"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
      data(){
          return{
            flag:false,
            flag2:false,
            flag3:false,
            aaa:'',
            form:{
              name:'',
              password:'',
              repeat_password:'',
            }
          }
      },
      watch:{
            'form.password'(newV,oldV){
                this.test(newV);
            }
      },
      methods:{
        onChange(val){

        },
        test(val){
          if(val.length>8&&val.length<20){
            this.flag = true;
          }else{
            this.flag = false;
          }
          if (val.match(/[a-z]+/)&&val.match(/[A-Z]+/)) {
            this.flag2 = true;
          }else{
            this.flag2 = false;
          }
          let arr = [];
          for(var i =0 ;i<val.length;i++){
            let  str = val.substr(i,1);
            arr.push(str);
          }
          var len = 0;
          for(var j=0;j<val.length;j++){
            var temp = Number(arr[j]);
            if(temp>=0){
              len = len+1;
              console.log(len)
            }
          }
          if(len>0){
            this.flag3=true;
          }else{
            this.flag3 = false;
          }
        }
      }
}
</script>

<style>

</style>