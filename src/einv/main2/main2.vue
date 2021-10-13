<style lang="less">
  @import url(./css/main2.less);
</style>
<template>
  <div class="main2 sy-wrap" :style="{height:W_height+'px'}">
    <el-container>
      <el-header style="height: 80px;">
        <div class="header-wrap">
          <div class="logo-left"></div>
          <div class="user-info-right">
            <div class="portrait"><img src="./img/portrait.jpg" alt=""></div>
            <div class="user-inof"><span class="user-name">XXXXX</span>用户，您好</div>
            <el-dropdown class="dropdown_bt">
              <span class="drop-select"><i class="el-icon-arrow-down"></i></span>
              <el-dropdown-menu>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>注销</el-dropdown-item>
                <el-dropdown-item>个人中心</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container :style="{height:(W_height-80)+'px'}">
        <el-aside width="200px">
          <el-scrollbar :style="{height:(W_height-80)+'px'}">
            <el-menu router default-active="/main/pay_online">
              <el-menu-item index="/main2/pay_online">
                <i class="el-icon-setting"></i>
                <span slot="title">线上缴费</span>
              </el-menu-item>
              <el-menu-item index="/main2/invoice_application">
                <i class="el-icon-printer"></i>
                <span slot="title">发票申请</span>
              </el-menu-item>
              <el-menu-item index="/main2/my_order">
                <i class="el-icon-c-scale-to-original"></i>
                <span slot="title">我的订单</span>
              </el-menu-item>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-loading"></i><span>demo页面</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/main2/invoice_application"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发票申请</el-menu-item>
                  <el-menu-item index="/main2/system_info">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎页面</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main  :style="{height:(W_height-80)+'px'}">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
      <!-- <div class="sy-head"></div>
      <div class="sy-body">
        <div class="sy-nav-wrap">
        </div>
        <div class="sy-content-wrap">
        </div>
      </div> -->
  </div>
</template>

<script>
export default {
  data(){
      return{
        W_height:0,
      }
  },
  created(){
    let WHeight = window.innerHeight;
    this.W_height = WHeight;
  }
}
</script>

<style>

</style>