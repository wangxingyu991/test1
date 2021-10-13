<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title">新增数据源明细</div>
    </div>
    <div class="rh-drawer-body">
        <el-row>
          <el-form :model="operatorForm"  ref="operatorForm" :rules="rules" label-width="150px" label-position="right">
            <el-row>
              <el-col :span="12">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model.trim="operatorForm.username" maxlength="32"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="密码" prop="password">
                  <el-input v-model.trim="operatorForm.password" maxlength="200" show-password></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="连接url" prop="url">
                  <el-input v-model.trim="operatorForm.url" maxlength="200"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="12">
                <el-form-item label="驱动名称" prop="driverClassName">
                  <el-input  v-model.trim="operatorForm.driverClassName" maxlength="80" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="初始化大小" prop="initialSize">
                  <el-input v-model.trim="operatorForm.initialSize" maxlength="11"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最小空闲数" prop="minIdle">
                  <el-input  v-model.trim="operatorForm.minIdle" maxlength="11" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最大活动数" prop="maxActive">
                  <el-input v-model.trim="operatorForm.maxActive" maxlength="11"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="获取连接等待超时时间" prop="maxWait">
                  <el-input  v-model.trim="operatorForm.maxWait" maxlength="20" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检测时间间隔" prop="timeBetweenEvictionRunsMillis">
                  <el-input v-model.trim="operatorForm.timeBetweenEvictionRunsMillis" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最小生成时间" prop="minEvictableIdleTimeMillis">
                  <el-input  v-model.trim="operatorForm.minEvictableIdleTimeMillis" maxlength="20" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="PSCache打开标志" prop="poolPreparedStatements">
                  <el-select v-model.trim="operatorForm.poolPreparedStatements">
                    <el-option key="1" label="打开" value="1"></el-option>
                    <el-option key="0" label="关闭" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="PSCache大小" prop="maxPoolPreparedStatementPerConnectionSize">
                  <el-input  v-model.trim="operatorForm.maxPoolPreparedStatementPerConnectionSize" maxlength="11" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="filters,多个逗号隔开" prop="filters">
                  <el-input v-model.trim="operatorForm.filters" maxlength="200"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="密码加密标志" prop="connectPropertiesConfigDecrypt">
                  <el-select v-model.trim="operatorForm.connectPropertiesConfigDecrypt">
                    <el-option key="1" label="打开" value="1"></el-option>
                    <el-option key="0" label="关闭" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="读写标志" prop="readWriteType">
                  <el-select v-model.trim="operatorForm.readWriteType">
                    <el-option key="write" label="write" value="write"></el-option>
                    <el-option key="read" label="read" value="read"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
               <el-col :span="12">
                <el-form-item label="密码加密key" prop="connectPropertiesConfigDecryptKey">
                  <el-input  v-model.trim="operatorForm.connectPropertiesConfigDecryptKey" maxlength="200" ></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="序号" prop="sort">
                  <el-input  v-model.trim="operatorForm.sort" maxlength="20" ></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item label="负载均衡类型" prop="loadBalanceType">
                  <el-input  v-model.trim="operatorForm.loadBalanceType" maxlength="50" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      <div class="rh-dialog-footer">
        <el-button type="primary" @click="save()" v-loading="loading">保 存</el-button>
        <el-button @click="close()">关 闭 </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default { 
  props: ["detailData"],
  data() {       
    return {
      loading: false, 
      operatorForm: { 
        groupId:''
      },
      //校验规则
      rules: {
        username:[{required:true,message:'请输入用户名',trigger:'blur'}],
        password:[{required:true,message:'请输入密码',trigger:'blur'}],
        url:[{required:true,message:'请输入连接url',trigger:'blur'}],
        driverClassName:[{required:true,message:'请输入驱动名称',trigger:'blur'}],
        readWriteType:[{required:true,message:'请选择读写标志',trigger:'blur'}]
      }
    };
  },

  created() {
  },
  mounted() {
    let _this = this;
    if( _this.detailData.username != undefined && _this.detailData.username != null && _this.detailData.username  != ""){
      _this.operatorForm = _this.detailData;  
    } else{
      _this.operatorForm = {};
    }
  },

  methods: {
    save(){
      let _this = this;
      _this.$refs.operatorForm.validate((valid) => {
        if (valid) {
          if(_this.detailData.username != undefined && _this.detailData.username != null && _this.detailData.username  != ""){
            _this.loadUpdateDetail();
          }else{
            _this.loadDetail();
          }
          _this.close();
        }
      })
    },
    //关闭
    close() {
      this.$emit("back");
    },
    //关闭
    loadDetail() {
      let _this = this;
      _this.$emit("loadDetail", _this.operatorForm);
    },
    //关闭
    loadUpdateDetail() {
      let _this = this;
      _this.$emit("loadUpdateDetail", _this.operatorForm);
    },
    //关闭
    reload() {
      this.$emit("reload");
    },
  },
};
</script>