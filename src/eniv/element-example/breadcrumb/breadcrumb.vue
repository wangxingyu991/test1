<style lang="less">
@import url('./breadcrumb.less');
</style>
<template>
<div>
      <div class="rh-page-header">
        <div class="rh-head-and-operate">
              <div class="tips-content">
                    <span class="rh-helpTip-text">
                    面包屑
                    </span>
                    <span class="rh-helpTip-icon">
                          <el-tooltip class="item" content="云数据库GaussDB(for MySQL)是华为自研的最新一代企业级高扩展海量存储分布式数据库，完全兼容MySQL">
                                <i class="el-icon-info"></i>
                          </el-tooltip>
                    </span>
              </div>
              <div class="operate-btns">
                    <el-button>操作</el-button>
              </div>
        </div>
    </div>
  <div class="breadcrumb brd">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>组件1</el-breadcrumb-item>
            <el-breadcrumb-item>按钮</el-breadcrumb-item>
        </el-breadcrumb>
  </div>
</div>
</template>

<script>
export default {
      data(){
            return{
                  breadCrumbData:['首页','组件1','按钮'],
                  navData:{title:'首页',path:'/',children:{

                  }
                  }
            }
      },
}
</script>

<style>

</style>