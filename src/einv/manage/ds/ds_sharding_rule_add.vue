<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title">新增sharding规则</div>
    </div>
    <div class="rh-drawer-body">
        <el-row>
          <el-form :model="operatorForm"  ref="operatorForm" :rules="rules" label-width="170px" label-position="right">
             <el-row>
                <el-col :span="12">
                  <el-form-item label="逻辑表名称" prop="logicTableName">
                      <el-input v-model.trim="operatorForm.logicTableName" maxlength="200"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="数据源名+表名，逗号分隔" prop="actualDataNodes">
                      <el-input v-model.trim="operatorForm.actualDataNodes" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                  <el-form-item label="单分片列名称-库" prop="databaseStrategyStandardShardingColumn">
                      <el-input v-model.trim="operatorForm.databaseStrategyStandardShardingColumn" maxlength="100"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="确分片算法类名称-库" prop="databaseStrategyStandardPreciseAlgorithmClassName">
                      <el-input v-model.trim="operatorForm.databaseStrategyStandardPreciseAlgorithmClassName" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                  <el-form-item label="范围分片算法类名称-库" prop="databaseStrategyStandardRangeAlgorithmClassName">
                      <el-input v-model.trim="operatorForm.databaseStrategyStandardRangeAlgorithmClassName" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="复合分片列名称-库" prop="databaseStrategyComplexShardingColumns">
                      <el-input v-model.trim="operatorForm.databaseStrategyComplexShardingColumns" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                  <el-form-item label="复合分片算法类名称-库" prop="databaseStrategyComplexAlgorithmClassName">
                      <el-input v-model.trim="operatorForm.databaseStrategyComplexAlgorithmClassName" maxlength="100"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Hint分片算法类名称-库" prop="databaseStrategyHitAlgorithmClassName">
                      <el-input v-model.trim="operatorForm.databaseStrategyHitAlgorithmClassName" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                  <el-form-item label="行表达式分片列名称-库" prop="databaseStrategyInlineShardingColumn">
                      <el-input v-model.trim="operatorForm.databaseStrategyInlineShardingColumn" maxlength="100"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="分片算法行表达式-库" prop="databaseStrategyInlineAlgorithmExpression">
                      <el-input v-model.trim="operatorForm.databaseStrategyInlineAlgorithmExpression" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                  <el-form-item label="不分片-库" prop="databaseStrategyNone">
                      <el-input v-model.trim="operatorForm.databaseStrategyNone" maxlength="100"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="单分片列名称-表" prop="tableStrategyStandardShardingColumn">
                      <el-input v-model.trim="operatorForm.tableStrategyStandardShardingColumn" maxlength="100"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                  <el-form-item label="确分片算法类名称-表" prop="tableStrategyStandardPreciseAlgorithmClassName">
                      <el-input v-model.trim="operatorForm.tableStrategyStandardPreciseAlgorithmClassName" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="范围分片算法类名称-表" prop="tableStrategyStandardRangeAlgorithmClassName">
                      <el-input v-model.trim="operatorForm.tableStrategyStandardRangeAlgorithmClassName" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                  <el-form-item label="复合分片列名称-表" prop="tableStrategyComplexShardingColumns">
                      <el-input v-model.trim="operatorForm.tableStrategyComplexShardingColumns" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="复合分片算法类名称-表" prop="tableStrategyComplexAlgorithmClassName">
                      <el-input v-model.trim="operatorForm.tableStrategyComplexAlgorithmClassName" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                  <el-form-item label="Hint分片算法类名称-表" prop="tableStrategyHitAlgorithmClassName">
                      <el-input v-model.trim="operatorForm.tableStrategyHitAlgorithmClassName" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="行表达式分片列名称-表" prop="tableStrategyInlineShardingColumn">
                      <el-input v-model.trim="operatorForm.tableStrategyInlineShardingColumn" maxlength="100"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                  <el-form-item label="分片算法行表达式-表" prop="tableStrategyInlineAlgorithmExpression">
                      <el-input v-model.trim="operatorForm.tableStrategyInlineAlgorithmExpression" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="不分片-表" prop="tableStrategyNone">
                      <el-input v-model.trim="operatorForm.tableStrategyNone" maxlength="100"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                  <el-form-item label="自增列值生成器类型" prop="keyGeneratorType">
                      <el-input v-model.trim="operatorForm.keyGeneratorType" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="自增列名称" prop="keyGeneratorColumn">
                      <el-input v-model.trim="operatorForm.keyGeneratorColumn" maxlength="100"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                  <el-form-item label="属性配置" prop="keyGeneratorProps">
                      <el-input v-model.trim="operatorForm.keyGeneratorProps" maxlength="200"></el-input>
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
  props: ["shardingRuleData"],
  data() {       
    return {
      loading: false, 
      operatorForm: {  
      },
      //校验规则
      rules: {
        logicTableName:[{required:true,message:'请输入逻辑表名称',trigger:'blur'}],
        actualDataNodes:[{required:true,message:'请输入数据源名+表名',trigger:'blur'}]
      }
    };
  },

  created() {
  },
  mounted() {
    let _this = this;
    if( _this.shardingRuleData.logicTableName != undefined && _this.shardingRuleData.logicTableName != null && _this.shardingRuleData.logicTableName  != ""){
      _this.operatorForm = _this.shardingRuleData;  
    } else{
      _this.operatorForm = {};
    }
  },

  methods: {
    save(){
      let _this = this;
      _this.$refs.operatorForm.validate((valid) => {
        if (valid) {
          if( _this.shardingRuleData.logicTableName != undefined && _this.shardingRuleData.logicTableName != null && _this.shardingRuleData.logicTableName  != ""){
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
      _this.$emit("loadShardingRuleDetail", _this.operatorForm);
    },
    loadUpdateDetail() {
      let _this = this;
      _this.$emit("loadShardingRuleUpdateDetail", _this.operatorForm);
    },
    reload() {
      this.$emit("reload");
    },
  },
};
</script>