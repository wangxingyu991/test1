<style lang="less">

.el-input{
      width: 100%;
      font-size: 12px;
    .el-input__inner{
      height: 28px;
      line-height: 28px;
      border-radius: 2px;
    }  
}
</style>
<template>
  <div class="search-container">
      <el-form ref="form" :model="form" label-width="80px">
            <el-row :gutter="10">
                  <el-col :span="5">
                        <el-form-item label="真实姓名">
                              <el-input v-model="form.name"></el-input>
                        </el-form-item>
                  </el-col>
                  <el-col :span="5">
                        <el-form-item label="证件号码">
                              <el-input v-model="form.name"></el-input>
                        </el-form-item>
                  </el-col>
                  <el-col :span="5">
                        <el-form-item label="手机号码">
                              <el-input v-model="form.name"></el-input>
                        </el-form-item>
                  </el-col>
                  <el-col :span="4">
                        <el-button>查询按钮</el-button>
                        <el-button>更多<i class="el-icon-arrow-down"></i></el-button>
                  </el-col>
            </el-row>
            <el-row :gutter="10">
                  <el-col :span="5"><el-input v-model="form.val" placeholder="单位所属机构" @focus="dialogVisible = true"></el-input></el-col>
                  <el-col :span="5"><el-input v-model="form.val" placeholder="单位所属机构" @focus="dialogVisible = true"></el-input></el-col>
                  <el-col :span="5"><el-input v-model="form.val" placeholder="单位所属机构" @focus="dialogVisible = true"></el-input></el-col>
                  <el-col :span="5"><el-input v-model="form.val" placeholder="单位所属机构" @focus="dialogVisible = true"></el-input></el-col>
                  <el-col :span="4">                        
                        <el-button>查询按钮</el-button>
                        <el-button>更多  <i class="el-icon-arrow-down"></i></el-button>
                  </el-col>
            </el-row>
      </el-form>
  </div>
</template>

<script>
export default {
          data(){
              return{
                    form:{
                          name:'',
                          val:'',
                          dialogVisible:true
                    }
              }
          }
}
</script>

<style>

</style>