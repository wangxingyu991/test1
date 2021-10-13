<style lang="less">
  @import url('./login.less');
</style>
<template>
  <div class="login" :style="{height:WHeight+'px'}">
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
    <!-- 忘记密码 -->
    <div class="getback-pass-step">
      <div class="step-wrap">
        <el-steps :space="300" :active = "active" finish-status="success">
              <el-step title='手机号验证'></el-step>
              <el-step title='短信验证'></el-step>
              <el-step title='密码修改'></el-step>
        </el-steps>
      </div>
      <div class="step-content" v-show="active==1">
        <div class="step-title">
          <span class="title-text"><br/></span>
        </div>
        <div class="step-wrap">
          <form-step v-bind:propid= "active" v-bind:step= "1" v-bind:random="random" v-on:getId = "getId"></form-step>
        </div>
      </div>
      <div class="step-content" v-show="active==2">
        <div class="step-title">
          <span class="title-text"><br/></span>
        </div>
        <div class="step-wrap">
          <form-step  v-bind:propid= "active" v-bind:step= "2" v-bind:random="random"  v-bind:entity= "entity" v-on:getId = "getId"></form-step>
        </div>
      </div>
      <div class="step-content" v-show="active==3">
        <div class="step-title">
          <span class="title-text"><br/></span>
        </div>
        <div class="step-wrap">
          <form-step  v-bind:propid = "active" v-bind:step= "3" v-bind:random="random"  v-bind:entity= "entity" v-on:getId = "getId"> </form-step>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import formStep from "./form/formStep.vue" 
  import { v4 as uuidv4 } from 'uuid';
  export default {
    name:'login',
    components:{
      formStep
    },
    data () {
      return{
        random: uuidv4(),
        img_show_str:"",
        WHeight:window.innerHeight,
        active:1,
        success:1,
        entity:{
          tel:""
        }
      }
    },
    created() {
    },
    methods:{
      getId(val, entity){
        this.active = val ;
        this.entity = entity ;
      },
      forTop(){
        this.$router.push({path:'/login'});
      },
    },
  }

</script>
