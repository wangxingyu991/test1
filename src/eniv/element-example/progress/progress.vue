<style lang="less" scoped>
      .progress{
            background: #fff;
            padding-top:20px;
            padding:20px 20px;
      }
</style>
<template>
  <div class="progress">
      <el-divider content-position="left">线性进度条</el-divider>
      <el-progress :percentage="percentage" :text-inside="true" :stroke-width="26" :color="customColor"></el-progress>
      <el-divider content-position="left">环形进度条</el-divider>
      <el-progress type="circle" :percentage="60" :stroke-width="10" color="#ee3d3d" :show-text=true></el-progress>
     <el-divider content-position="left">圆盘状仪表盘</el-divider>
      <el-progress type="dashboard" :stroke-width="10" :percentage="percentage" :color="colors[0].color"></el-progress>
  </div>
</template>

<script>
export default {
    data() {
      return {
            percentage: 20,
            customColor: '#409eff',
            colors: [
                  {color: '#f56c6c', percentage: 20},
                  {color: '#e6a23c', percentage: 40},
                  {color: '#5cb87a', percentage: 60},
                  {color: '#1989fa', percentage: 80},
                  {color: '#6f7ad3', percentage: 100}
            ],
            customColors: [
                  {color: '#f56c6c', percentage: 20},
                  {color: '#e6a23c', percentage: 40},
                  {color: '#5cb87a', percentage: 60},
                  {color: '#1989fa', percentage: 80},
                  {color: '#6f7ad3', percentage: 100}
            ]
      };
    }
}
</script>

<style>

</style>