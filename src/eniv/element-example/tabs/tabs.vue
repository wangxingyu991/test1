<style lang="less">
      .rh-tabs-wrap{
            background: #fff;
            padding:20px;
      }
</style>
<template>
<div class="_root">
      <div class="rh-head-title">
            tabs
      </div>
      <div class="rh-tabs-wrap">
            <el-tabs v-model="activeName" @tab-click="handleClick" class="rh-tabs">
                  <el-tab-pane label="裸金属服务器" name="first">
                        <div class="info">您还可以购买200台裸金属服务器</div>
                  </el-tab-pane>
                  <el-tab-pane label="自定义网络" name="second" style="padding:10px;line-height: 24px">
                        <div class="info">通过创建自定义网络，使得裸金属服务器的自定义网络和vpc互通；通过创建自定义网络ACL，进行对子网的访问控制。了解更多</div>
                        <p>1、开通回收站功能后，删除的磁盘将放入到回收站中最多保存7天，以防止误操作导致数据丢失。您可以从回收站内恢复或彻底销毁已删除的磁盘。</p>
                        <p>2、在公测期间，可免费使用磁盘回收站功能。</p>
                        <el-row style="padding-top:20px;">
                              <el-button class="rh-button" type="danger">申请公测</el-button>
                        </el-row>
                  </el-tab-pane>
            </el-tabs>
      </div>
</div>
</template>

<script>
export default {
          data(){
              return{
                    activeName:'first'
              }
          },
          methods:{
                handleClick(tab,event){
                      console.log(tab,event);
                },
                handleClose(){

                }
          }
}
</script>

<style>

</style>