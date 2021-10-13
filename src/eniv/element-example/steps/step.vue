<style lang="less">
      .steps{
            background:#Fff;
            padding:20px;
      }
      .el-steps{
            .el-step__head{
                 margin-left:6px;
            }
            .el-step__main{
                  .el-step__title{
                        font-size:14px;
                        font-weight:700;
                        
                  }
            }
      }
</style>
<template>
  <div class="steps">
        <el-divider></el-divider>
      <el-divider content-position="left">横向步进条</el-divider>
      <el-steps   :active = "active" finish-status="success">
            <el-step title='步骤 1'></el-step>
            <el-step title='步骤 2'></el-step>
            <el-step title='步骤 3' style="width:100px"></el-step>
      </el-steps>
      <el-divider content-position="left">纵向步进条</el-divider>
       <el-steps :space="150"  direction="vertical" :active = "active" finish-status="success">
            <el-step title='步骤 1'></el-step>
            <el-step title='步骤 2'></el-step>
            <el-step title='步骤 3'></el-step>
      </el-steps>   
       <el-divider>卡片式步进条</el-divider>
       <div class="card">
             
       </div>
  </div>
</template>

<script>
export default {
      data(){
            return{
                  active:2
            }
      }
}
</script>

<style>

</style>