<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title">新增字段加密规则</div>
    </div>
    <div class="rh-drawer-body">
        <el-row>
          <el-form :model="operatorForm"  ref="operatorForm" :rules="rules" label-width="150px" label-position="right">
             <el-row>
                <el-col :span="12">
                  <el-form-item label="逻辑表名称" prop="logicTableName">
                      <el-input v-model.trim="operatorForm.logicTableName" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="逻辑列名" prop="logicColumnName">
                      <el-input v-model.trim="operatorForm.logicColumnName" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                  <el-form-item label="存储明文字段" prop="plainColumn">
                      <el-input v-model.trim="operatorForm.plainColumn" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="存储密文字段" prop="cipherColumn">
                      <el-input v-model.trim="operatorForm.cipherColumn" maxlength="200"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                  <el-form-item label="辅助查询字段" prop="assistedQueryColumn">
                      <el-input v-model.trim="operatorForm.assistedQueryColumn" maxlength="200"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="加密器名称" prop="encryptor">
                      <el-input v-model.trim="operatorForm.encryptor" maxlength="200"></el-input>
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
  props: ["encryptColumnData"],
  data() {       
    return {
      loading: false, 
      operatorForm: {  
      },
      //校验规则
      rules: {
        logicTableName:[{required:true,message:'请输入逻辑表名称',trigger:'blur'}],
        cipherColumn:[{required:true,message:'请输入存储密文字段',trigger:'blur'}],
        encryptor:[{required:true,message:'请输入加密器名称',trigger:'blur'}],
        logicColumnName:[{required:true,message:'请输入逻辑列名',trigger:'blur'}]
      }
    };
  },

  created() {
  },
  mounted() {
    let _this = this;
    if( _this.encryptColumnData.logicTableName != undefined && _this.encryptColumnData.logicTableName != null && _this.encryptColumnData.logicTableName  != ""){
      _this.operatorForm = _this.encryptColumnData;  
    } else{
      _this.operatorForm = {};
    }
  },

  methods: {
    save(){
      let _this = this;
      _this.$refs.operatorForm.validate((valid) => {
        if (valid) {
          if( _this.encryptColumnData.logicTableName != undefined && _this.encryptColumnData.logicTableName != null && _this.encryptColumnData.logicTableName  != ""){
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
    loadDetail() {
      let _this = this;
      _this.$emit("loadEncryptColumnDetail", _this.operatorForm);
    },
    loadUpdateDetail() {
      let _this = this;
      _this.$emit("loadEncryptColumnUpdateDetail", _this.operatorForm);
    },
    reload() {
      this.$emit("reload");
    },
  },
};
</script>