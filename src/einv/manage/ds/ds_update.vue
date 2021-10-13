<template>
  <div class="drawer-wrap ds_add">
    <div class="rh-drawer-head">
      <div class="drawer-title">修改数据源</div>
    </div>
    <div class="rh-drawer-body">
        <el-row>
          <el-form :model="operatorForm"  ref="operatorForm" :rules="rules" label-width="140px" label-position="right">
            <!-- <el-row>
                <el-col :span="24">
                    <el-form-item label="数据源类别" prop="dsType">
                        <el-radio-group v-model.trim='operatorForm.dsType' @change="radioChange(operatorForm.dsType)" readonly>
                            <el-radio-button label="0">普通数据源</el-radio-button>
                            <el-radio-button label="1">sharding数据源</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row> -->
            <el-row>
                <el-col :span="12">
                    <el-form-item label="数据源名称" prop="name">
                        <el-input v-model.trim="operatorForm.name" maxlength="200"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="数据源类型" prop="type">
                        <el-select v-model.trim="operatorForm.type">
                            <el-option key="0" label="独立数据库（软件级别）" value="0"></el-option>
                            <el-option key="1" label="独立数据库（schema）" value="1"></el-option>
                            <el-option key="2" label="共享数据库" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="showDs">
                <el-col :span="12">
                    <el-form-item label="所属系统" prop="systemType">
                        <el-select v-model.trim="operatorForm.systemType">
                            <el-option v-for="item in systemTypeOptions" :key="item.id" :label="item.name"
                                    :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-button type="primary" @click="onAddDs()" style="margin-left:30px">新增明细</el-button>
                </el-col>
            </el-row>
            <el-row v-if="showShardingDs">
                <el-col :span="12">
                    <el-form-item label="所属系统" prop="systemType">
                        <el-select v-model.trim="operatorForm.systemType">
                            <el-option v-for="item in systemTypeOptions" :key="item.id" :label="item.name"
                                    :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="默认数据源" prop="defaultDataSourceName">
                      <el-input v-model.trim="operatorForm.defaultDataSourceName" maxlength="100"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="showShardingDs">
                <el-col :span="12">
                  <el-form-item label="单分片列名称-库" prop="defaultDatabaseStrategyStandardShardingColumn">
                      <el-input v-model.trim="operatorForm.defaultDatabaseStrategyStandardShardingColumn" maxlength="100"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="确分片算法类名称-库" prop="defaultDatabaseStrategyStandardPreciseAlgorithmClassName">
                      <el-input v-model.trim="operatorForm.defaultDatabaseStrategyStandardPreciseAlgorithmClassName" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="showShardingDs">
                <el-col :span="12">
                  <el-form-item label="范围分片算法类名称-库" prop="defaultDatabaseStrategyStandardRangeAlgorithmClassName">
                      <el-input v-model.trim="operatorForm.defaultDatabaseStrategyStandardRangeAlgorithmClassName" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="复合分片列名称-库" prop="defaultDatabaseStrategyComplexShardingColumns">
                      <el-input v-model.trim="operatorForm.defaultDatabaseStrategyComplexShardingColumns" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="showShardingDs">
                <el-col :span="12">
                  <el-form-item label="复合分片算法类名称-库" prop="defaultDatabaseStrategyComplexAlgorithmClassName">
                      <el-input v-model.trim="operatorForm.defaultDatabaseStrategyComplexAlgorithmClassName" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Hint分片算法类名称-库" prop="defaultDatabaseStrategyHitAlgorithmClassName">
                      <el-input v-model.trim="operatorForm.defaultDatabaseStrategyHitAlgorithmClassName" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="showShardingDs">
                <el-col :span="12">
                  <el-form-item label="行表达式分片列名称-库" prop="defaultDatabaseStrategyInlineShardingColumn">
                      <el-input v-model.trim="operatorForm.defaultDatabaseStrategyInlineShardingColumn" maxlength="100"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="分片算法行表达式-库" prop="defaultDatabaseStrategyInlineAlgorithmExpression">
                      <el-input v-model.trim="operatorForm.defaultDatabaseStrategyInlineAlgorithmExpression" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="showShardingDs">
                <el-col :span="12">
                  <el-form-item label="不分片-库" prop="defaultDatabaseStrategyNone">
                      <el-input v-model.trim="operatorForm.defaultDatabaseStrategyNone" maxlength="100"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="单分片列名称-表" prop="defaultTableStrategyStandardShardingColumn">
                      <el-input v-model.trim="operatorForm.defaultTableStrategyStandardShardingColumn" maxlength="100"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="showShardingDs">
                <el-col :span="12">
                  <el-form-item label="确分片算法类名称-表" prop="defaultTableStrategyStandardPreciseAlgorithmClassName">
                      <el-input v-model.trim="operatorForm.defaultTableStrategyStandardPreciseAlgorithmClassName" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="范围分片算法类名称-表" prop="defaultTableStrategyStandardRangeAlgorithmClassName">
                      <el-input v-model.trim="operatorForm.defaultTableStrategyStandardRangeAlgorithmClassName" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="showShardingDs">
                <el-col :span="12">
                  <el-form-item label="复合分片列名称-表" prop="defaultTableStrategyComplexShardingColumns">
                      <el-input v-model.trim="operatorForm.defaultTableStrategyComplexShardingColumns" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="复合分片算法类名称-表" prop="defaultTableStrategyComplexAlgorithmClassName">
                      <el-input v-model.trim="operatorForm.defaultTableStrategyComplexAlgorithmClassName" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="showShardingDs">
                <el-col :span="12">
                  <el-form-item label="Hint分片算法类名称-表" prop="defaultTableStrategyHitAlgorithmClassName">
                      <el-input v-model.trim="operatorForm.defaultTableStrategyHitAlgorithmClassName" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="行表达式分片列名称-表" prop="defaultTableStrategyInlineShardingColumn">
                      <el-input v-model.trim="operatorForm.defaultTableStrategyInlineShardingColumn" maxlength="100"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="showShardingDs">
                <el-col :span="12">
                  <el-form-item label="分片算法行表达式-表" prop="defaultTableStrategyInlineAlgorithmExpression">
                      <el-input v-model.trim="operatorForm.defaultTableStrategyInlineAlgorithmExpression" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="不分片-表" prop="defaultTableStrategyNone">
                      <el-input v-model.trim="operatorForm.defaultTableStrategyNone" maxlength="100"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="showShardingDs">
                <el-col :span="12">
                  <el-form-item label="自增列值生成器类型" prop="defaultKeyGeneratorType">
                      <el-input v-model.trim="operatorForm.defaultKeyGeneratorType" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="自增列名称" prop="defaultKeyGeneratorColumn">
                      <el-input v-model.trim="operatorForm.defaultKeyGeneratorColumn" maxlength="100"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="showShardingDs">
                <el-col :span="12">
                  <el-form-item label="属性配置" prop="defaultKeyGeneratorProps">
                      <el-input v-model.trim="operatorForm.defaultKeyGeneratorProps" maxlength="200"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="绑定表规则列表" prop="bindingTables">
                      <el-input v-model.trim="operatorForm.bindingTables" maxlength="200"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="showShardingDs">
                <el-col :span="12">
                  <el-form-item label="广播表规则列表" prop="broadcastTables">
                      <el-input v-model.trim="operatorForm.broadcastTables" maxlength="200"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="sharding基本配置信息" prop="props">
                      <el-input v-model.trim="operatorForm.props" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="showShardingDs">
                <el-col :span="12">
                  <el-form-item label="数据脱敏类型" prop="encryptRuleType">
                      <el-input v-model.trim="operatorForm.encryptRuleType" maxlength="500" @change="initColumnEncrypt"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="数据脱敏key值" prop="encryptRuleProps">
                      <el-input v-model.trim="operatorForm.encryptRuleProps" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="showShardingDs">
                <el-col :span="12">
                  <el-form-item label="读写分离标志" prop="masterSlaveFlag">
                        <el-select v-model.trim="operatorForm.masterSlaveFlag">
                            <el-option key="Y" label="是" value="Y"></el-option>
                            <el-option key="N" label="否" value="N"></el-option>
                        </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="showShardingDs">
                    <el-button type="primary" @click="onAddShardingDs()" style="margin-left:30px">新增明细</el-button>
                </el-col>
            </el-row>
            <el-row v-if="showDs">
                <el-col :span="24">
                        <el-table :data="tableInfo" stripe border height="400">
                            <template slot="empty">
                              <div class="pic_nodata"></div>
                            </template>
                            <el-table-column  align="left" prop="username" label="用户名" width="100"></el-table-column>
                            <el-table-column  align="left" prop="driverClassName" label="驱动名"></el-table-column>
                            <el-table-column  align="left" prop="readWriteType" label="读写标志"></el-table-column>
                             <el-table-column align="center" label="操作">
                                <template slot-scope="scope">
                                <el-button class="table_btn" type="text" @click="onUpdate(scope.row)">修改</el-button>
                                <el-button class="table_btn" type="text" @click="deleteDs(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row v-if="showShardingDs">
                <el-col :span="24">
                        <el-table :data="tableShardingInfo" stripe border height="200">
                            <template slot="empty">
                              <div class="pic_nodata"></div>
                            </template>
                           <el-table-column align="center" type="index" label="序号"></el-table-column>
                            <el-table-column  align="left" prop="groupId" label="组名"></el-table-column>
                             <el-table-column align="center" label="操作">
                                <template slot-scope="scope">
                                <el-button class="table_btn" type="text" @click="onUpdateShardingInfo(scope.row, scope.$index)">修改</el-button>
                                <el-button class="table_btn" type="text" @click="deleteShardingDs(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row v-if="showShardingDs" style="margin-top:10px;margin-left:-30px; margin-bottom:10px;">
                <el-button type="primary" @click="onAddShardingRule()" style="margin-left:30px">新增sharding规则</el-button>
            </el-row>
            <el-row v-if="showShardingDs">
                <el-col :span="24">
                        <el-table :data="tableShardingRuleInfo" stripe border height="200">
                            <template slot="empty">
                              <div class="pic_nodata"></div>
                            </template>
                           <el-table-column align="center" type="index" label="序号"></el-table-column>
                            <el-table-column  align="left" prop="logicTableName" label="逻辑表名称"></el-table-column>
                            <el-table-column  align="left" prop="actualDataNodes" label="数据源名+表名"></el-table-column>
                             <el-table-column align="center" label="操作">
                                <template slot-scope="scope">
                                <el-button class="table_btn" type="text" @click="onUpdateShardingRule(scope.row, scope.$index)">修改</el-button>
                                <el-button class="table_btn" type="text" @click="deleteShardingRule(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row v-if="showEncryptColumns" style="margin-top:10px;margin-left:-30px; margin-bottom:10px;">
                <el-button type="primary" @click="onAddEncryptColumn()" style="margin-left:30px">新增字段加密规则</el-button>
            </el-row>
            <el-row v-if="showEncryptColumns">
                <el-col :span="24">
                        <el-table :data="encryptColumnsInfo" stripe border height="200">
                          <template slot="empty">
                            <div class="pic_nodata"></div>
                          </template>
                           <el-table-column align="center" type="index" label="序号"></el-table-column>
                            <el-table-column  align="left" prop="logicTableName" label="逻辑表名称"></el-table-column>
                            <el-table-column  align="left" prop="logicColumnName" label="逻辑列名"></el-table-column>
                            <el-table-column  align="left" prop="plainColumn" label="存储明文字段"></el-table-column>
                            <el-table-column  align="left" prop="cipherColumn" label="存储密文字段"></el-table-column>
                            <el-table-column  align="left" prop="assistedQueryColumn" label="辅助查询字段"></el-table-column>
                            <el-table-column  align="left" prop="encryptor" label="加密器名称"></el-table-column>
                             <el-table-column align="center" label="操作">
                                <template slot-scope="scope">
                                <el-button class="table_btn" type="text" @click="onUpdateEncryptColumn(scope.row, scope.$index)">修改</el-button>
                                <el-button class="table_btn" type="text" @click="deleteEncryptColumn(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
          </el-form>
        </el-row>
      <div class="rh-dialog-footer">
        <el-button type="primary" @click="save()" v-loading="loading">保 存</el-button>
        <el-button @click="close()">关 闭 </el-button>
      </div>
      <el-drawer size="73%" :close-on-click-modal='false' :visible.sync="showmodel" append-to-body :wrapperClosable = false :with-header=true>
        <addDetailPage v-if="showmodel" @back="pageBack" @loadDetail="loadDetail" @loadUpdateDetail="loadUpdateDetail" :detailData="detailData"></addDetailPage>
      </el-drawer>
      <el-drawer size="73%" :close-on-click-modal='false' :visible.sync="showshardingmodel" append-to-body :wrapperClosable = false :with-header=true>
        <addShardingDetailPage v-if="showshardingmodel" @back="pageBack" @loadShardingDetail="loadShardingDetail" @loadShardingUpdateDetail="loadShardingUpdateDetail" :shardingDetailData="shardingDetailData"></addShardingDetailPage>
      </el-drawer>
      <el-drawer size="73%" :close-on-click-modal='false' :visible.sync="showshardingrulemodel" append-to-body :wrapperClosable = false :with-header=true>
        <addShardingRulePage v-if="showshardingrulemodel" @back="pageBack" @loadShardingRuleDetail="loadShardingRuleDetail" @loadShardingRuleUpdateDetail="loadShardingRuleUpdateDetail" :shardingRuleData="shardingRuleData"></addShardingRulePage>
      </el-drawer>
      <el-drawer size="73%" :close-on-click-modal='false' :visible.sync="showencryptcolumnmodel" append-to-body :wrapperClosable = false :with-header=true>
        <addEncryptColumnPage v-if="showencryptcolumnmodel" @back="pageBack" @loadEncryptColumnDetail="loadEncryptColumnDetail" @loadEncryptColumnUpdateDetail="loadEncryptColumnUpdateDetail" :encryptColumnData="encryptColumnData"></addEncryptColumnPage>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import addDetailPage from "./ds_detail_add.vue";
import addShardingDetailPage from "./ds_detail_sharding_add.vue";
import addShardingRulePage from "./ds_sharding_rule_add.vue";
import addEncryptColumnPage from "./ds_encrypt_column_add.vue";
import validate from "@/utils/validate.js";
export default { 
  components: { addDetailPage, addShardingDetailPage, addShardingRulePage, addEncryptColumnPage},
  props: ["updateData"],
  data() {      
    return {
      loading: false, 
      showmodel:false,
      showshardingmodel:false,
      showshardingrulemodel:false,
      showencryptcolumnmodel:false,
      showDs:true,
      showShardingDs:false,
      showEncryptColumns:false,
      updateIndex:'',
      updateRuleIndex:'',
      updatEncryptColumnIndex:'',
      detailData:{},
      shardingDetailData:{},
      shardingRuleData:{},
      encryptColumnData:{},
      operatorForm: { 
          dsType:'0',
      },
      systemTypeOptions:[],
      tableInfo: [],
      tableShardingInfo: [],
      tableShardingRuleInfo: [],
      encryptColumnsInfo: [],
      shadrdingDsInfo:{},
      //校验规则
      rules: {
        name:[{required:true,message:'请输入数据源名称',trigger:'blur'}],
        type:[{required:true,message:'请选择数据源类型',trigger:'blur'}],
        systemType:[{required:true,message:'请选择所属系统',trigger:'blur'}]
      }
    };
  },

  created() {},

  mounted() {
    var _this = this;
    _this.getPageInfo();
    var dsType = this.updateData.dsType;
    _this.$api.post(this.$apis.manage+"/rest/manage/ds/getdsbyid", this.updateData, function (res) {
        if (res.success == true) {
          if(dsType == "0"){
            console.log(res);
            var basicMap = res.data.basicMap;
            var dsList = res.data.dsList;
            _this.operatorForm = basicMap;
            for(var i=0; i<dsList.length; i++){
              if(dsList[i].poolPreparedStatements == true){
                dsList[i].poolPreparedStatements = '1';
              }else{
                dsList[i].poolPreparedStatements = '0';
              }
              if(dsList[i].connectPropertiesConfigDecrypt == true){
                dsList[i].connectPropertiesConfigDecrypt = '1';
              }else{
                dsList[i].connectPropertiesConfigDecrypt = '0';
              }
            }
            _this.tableInfo = dsList;
          }else{
            var basicMap = res.data.basicMap;
            var dsList = res.data.dsList;
            var tableShardingRuleInfo = res.data.tableShardingRuleInfo;
            var encryptColumnsInfo = res.data.encryptColumnsInfo;
            var tableShardingInfo = res.data.tableShardingInfo;
            _this.operatorForm = basicMap;
            _this.shadrdingDsInfo = dsList;
            _this.tableShardingInfo = tableShardingInfo;
            _this.tableShardingRuleInfo = tableShardingRuleInfo;
            _this.encryptColumnsInfo = encryptColumnsInfo;
            if(basicMap.encryptRuleType != undefined && basicMap.encryptRuleType != null && basicMap.encryptRuleType != "" ){
              _this.showEncryptColumns = true;
            }else{
              _this.showEncryptColumns = false;
            }
          }
          if(dsType=="0"){
            _this.operatorForm.dsType = "0";
            _this.radioChange("0");
          }else if(dsType=="1"){
            _this.operatorForm.dsType = "1";
            _this.radioChange("1");
          }
        } else {
            _this.$message({
            message: '查询失败',
            type: 'error'
            });
        }
    })
  },

  methods: {
    getPageInfo(){
        var _this = this;
        _this.$api.get(this.$apis.manage+"/rest/manage/ds/getpagedm", {}, function (res) {
            if (res.success == true) {
                _this.systemTypeOptions = res.data.systemType;
            } else {
                _this.$message({
                message: '查询失败',
                type: 'error'
                });
            }
        })
    },
    //radio改变时展示不同页面
    radioChange(dsType) {
      var _this = this;
      if (dsType == "0") {
        _this.showShardingDs = false;
        _this.showDs = true;
      } else {
        _this.showShardingDs = true;
        _this.showDs = false;
      }
    },
    initColumnEncrypt(){
      var _this = this;
      if(_this.operatorForm.encryptRuleType != undefined && _this.operatorForm.encryptRuleType != null && _this.operatorForm.encryptRuleType != "" ){
        _this.showEncryptColumns = true;
      }else{
        _this.showEncryptColumns = false;
      }
    },  
    onAddDs(){
      this.showmodel = true;
      this.detailData = {};
    },
    onAddShardingDs(){
      this.showshardingmodel = true;
      this.shardingDetailData = {};
    },
    onAddShardingRule(){
      this.showshardingrulemodel = true;
      this.shardingRuleData = {};
    },
    onAddEncryptColumn(){
      this.showencryptcolumnmodel = true;
      this.encryptColumnData = {};
    },
    onUpdate(row, index){
      this.showmodel = true;
      this.detailData = row;
      this.updateIndex = index;
    },
    onUpdateShardingInfo(row, index){
      var _this = this;
      var groupId = row.groupId;
      this.showshardingmodel = true;
      this.shardingDetailData = {
        "tableShardingInfo": _this.shadrdingDsInfo[groupId]
      };
      this.updateIndex = index;
    },
    onUpdateShardingRule(row, index){
      this.showshardingrulemodel = true;
      this.shardingRuleData = row;
      this.updateRuleIndex = index;
    },
    onUpdateEncryptColumn(row, index){
      this.showencryptcolumnmodel = true;
      this.encryptColumnData = row;
      this.updatEncryptColumnIndex = index;
    },
    save(){
      let _this = this;
      console.log(_this.operatorForm);
      if(_this.operatorForm.dsType == "0"){
        if(_this.tableInfo.length <= 0){
          _this.$message({
              message: '请填写数据源明细',
              type: 'error'
            });
          return;
        }else{
          var flag1 = false, flag2 = false;
          for(var i = 0; i<_this.tableInfo.length; i++){
            if(_this.tableInfo[i].readWriteType == "write"){
              flag1 = true;
            }
            if(_this.tableInfo[i].readWriteType == "read"){
              flag2 = true;
            }
            if(flag1 && flag2){
              break;
            }
          }
          if(!flag1 || !flag2){
            _this.$message({
              message: '数据源明细中至少存在一个读一个写',
              type: 'error'
            });
            return;
          }
        }
        _this.$refs.operatorForm.validate((valid) => {
          if (valid) {
            _this.operatorForm.dsList = _this.tableInfo;
            let para = Object.assign({}, _this.operatorForm);
            _this.loading = true;
            _this.$api.post(this.$apis.manage+"/rest/manage/ds/updateds", para, function (res) {
              _this.loading = false;
              if (res.success == true) {
                _this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                _this.close();
                _this.reload();
              } else {
                _this.$message({
                  message: '保存失败',
                  type: 'error'
                });
              }
            })
          } else {
            return false;
          }
        })
      }else{
        if(this.tableShardingInfo.length <= 0){
          _this.$message({
              message: '请填写数据源明细',
              type: 'error'
            });
          return;
        }else{
          _this.$refs.operatorForm.validate((valid) => {
          if (valid) {
            _this.operatorForm.dsList = _this.shadrdingDsInfo;
            _this.operatorForm.shardingRuleList = _this.tableShardingRuleInfo;
            _this.operatorForm.encryptColumnsList = _this.encryptColumnsInfo;
            let para = Object.assign({}, _this.operatorForm);
            _this.loading = true;
            _this.$api.post(this.$apis.manage+"/rest/manage/ds/updateshardingds", para, function (res) {
              _this.loading = false;
              if (res.success == true) {
                _this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                _this.close();
                _this.reload();
              } else {
                _this.$message({
                  message: '保存失败',
                  type: 'error'
                });
              }
            })
          } else {
            return false;
          }
        })
        }
      }
    },
    //关闭
    close() {
      this.$emit("back");
    },
    //关闭
    reload() {
      this.$emit("reload");
    },
    pageBack(){
      this.showmodel = false;
      this.showshardingmodel = false;
      this.showshardingrulemodel = false;
      this.showencryptcolumnmodel = false;
    },
    loadDetail(data){
      this.tableInfo.push(data);
    },
    loadShardingDetail(data){
      var groupId = data[0].groupId;
      var shardingGroupInfo = {
        "groupId":groupId
      }
      this.shadrdingDsInfo[groupId] = data;
      this.tableShardingInfo.push(shardingGroupInfo);
    },
    loadShardingRuleDetail(data){
      this.tableShardingRuleInfo.push(data);
    },
    loadEncryptColumnDetail(data){
      this.encryptColumnsInfo.push(data);
    },
    loadUpdateDetail(data){
      var _this = this;
      _this.tableInfo[_this.updateIndex]=data;
    },
    loadShardingUpdateDetail(data){
      var groupId = data[0].groupId;
      var shardingGroupInfo = {
        "groupId":groupId
      }
      this.shadrdingDsInfo[groupId] = data;
    },
    loadShardingRuleUpdateDetail(data){
      var _this = this;
      _this.tableShardingRuleInfo[_this.updateRuleIndex]=data;
    },
    loadEncryptColumnUpdateDetail(data){
      var _this = this;
      _this.encryptColumnsInfo[_this.updatEncryptColumnIndex]=data;
    },
    deleteDs(index){
      this.tableInfo.splice(index, 1);
    },
    deleteShardingDs(index){
      this.tableShardingInfo.splice(index, 1);
    },
    deleteShardingRule(index){
      this.tableShardingRuleInfo.splice(index, 1);
    },
    deleteEncryptColumn(index){
      this.encryptColumnsInfo.splice(index, 1);
    }
  },
};
</script>