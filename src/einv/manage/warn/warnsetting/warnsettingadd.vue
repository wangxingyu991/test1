<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-body">
        <el-row>
          <el-form :model="operatorForm"  ref="operatorForm" :rules="rules" label-width="100px" label-position="right">
            <el-row>
              <el-col :span="24">
                <el-form-item label="预警类型名称" prop="warnConfigName">
                  <el-input v-model.trim="operatorForm.warnConfigName" maxlength="100"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="预警类别" prop="warnType">
                  <el-select v-model.trim="operatorForm.warnType" placeholder="" >
                    <el-option label="产品预警" value="0" key="0"></el-option>
                    <el-option label="短信包预警" value="1" key="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="预警等级" prop="warnLevelId">
                  <el-radio v-for="item in warnLevelList" :key="item.warnLevelId" v-model.trim="operatorForm.warnLevelId" :label="item.warnLevelId">{{item.warnLevelName}}</el-radio>
                  <!-- <el-select v-model.trim="operatorForm.warnLevelId" placeholder="请选择预警等级">
                      <el-option v-for="item in warnLevelList"  :key="item.warnLevelId"  :label="item.warnLevelName" :value="item.warnLevelId">
                      </el-option>
                  </el-select> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="预警值起" prop="warnDataBegin">
                  <el-input v-model.trim="operatorForm.warnDataBegin" maxlength="10"  onkeyup="value=value.replace(/[^0-9]/g,'')"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="预警值止" prop="warnDataEnd">
                  <el-input v-model.trim="operatorForm.warnDataEnd" maxlength="10"  onkeyup="value=value.replace(/[^0-9]/g,'')"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="有效标志" prop="statue">
                  <el-select v-model.trim="operatorForm.statue" placeholder="请选择">
                    <el-option key="Y" value="Y" label="有效"></el-option>
                    <el-option key="N" value="N" label="无效"></el-option>
                  </el-select>
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
import validate from "@/utils/validate.js";
export default { 
  data() {
    let queryData =  (rule, value, callback) => {
      var _this = this;
      var warnLevelId = _this.operatorForm.warnLevelId;
      var warnType = _this.operatorForm.warnType;
      var parms = {
        warnLevelId:warnLevelId,
        warnType: warnType
      };
      if (parms != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(parms))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
      }
      _this.$api.post(_this.$apis.manage+"/rest/warn/warnsetting/querywarnsettingbytype",parms,function(res){
        if(res.success) {
          callback(new Error('该预警类型和预警等级下的预警值已经配置'));
        } else {
          callback();
        }
      });
    };          
    return {
      loading: false, 
      warnLevelList:[],
      operatorForm: { 
        warnConfigName:'',
        warnType:'',
        warnLevelId:'',
        warnDataBegin:'',
        warnDataEnd:'',
        statue:'Y'
      },
      //校验规则
      rules: {
        warnConfigName:[{required:true,message:'请输入预警类型名称',trigger:'blur'}],
        warnType:[{required:true,message:'请选择预警类型',trigger:'change'},{validator: queryData, trigger: 'change'}],
        warnDataBegin:[{required:true,message:'请输入预警值起',trigger:'blur'}],
        warnDataEnd:[{required:true,message:'请输入预警值值止',trigger:'blur'}],
      }
    };
  },

  created() {
    this.initWarnLevelList();
  },

  mounted() {
  },

  methods: {
    initWarnLevelList(){
      let _this = this;
      _this.$api.get(this.$apis.manage+"/rest/warn/warnsetting/getwarnlevellist", null, function (res) {
        if (res.success == true) {
          let list = res.data;
           for(let i = 0;i < list.length;i++){
              if(list[i].warnLevel=="1"){
                  list[i].warnLevelName = "橙色";
              }else if(list[i].warnLevel=="2"){
                  list[i].warnLevelName = "黄色";
              }else if(list[i].warnLevel=="3"){
                  list[i].warnLevelName = "红色";
              }
            }
          _this.operatorForm.warnLevelId = res.data[0].warnLevelId;
          _this.warnLevelList = res.data;
        } else {
          _this.$message({
            message: '保存失败',
            type: 'error'
          });
        }
      })
    },
    save(){
      let _this = this;
      _this.$refs.operatorForm.validate((valid) => {
        if (valid) {
          let para = Object.assign({}, _this.operatorForm);
          if (para != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(para))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }
          _this.loading = true;
          _this.$api.post(this.$apis.manage+"/rest/warn/warnsetting/", para, function (res) {
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
          _this.disflag.click=1;
          return false;
        }
      })
    },
    //关闭
    close() {
      this.$emit("back");
    },
    //关闭
    reload() {
      this.$emit("reload");
    },
  },
};
</script>