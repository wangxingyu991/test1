<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-body">
        <el-row>
          <el-form :model="operatorForm"  ref="operatorForm" :rules="rules" label-width="100px" label-position="right">
            <el-row>
              <el-col :span="24">
                <el-form-item label="模板代码" prop="messageTemplateCode">
                  <el-input v-model.trim="operatorForm.messageTemplateCode" maxlength="4" onkeyup="value=value.replace(/[^A-Z0-9]/g,'')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="模板名称" prop="messageTemplateName">
                  <el-input v-model.trim="operatorForm.messageTemplateName" maxlength="100"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="模板标题" prop="title">
                  <el-input v-model.trim="operatorForm.title" maxlength="200"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="模板内容" prop="content">
                  <el-input type="textarea" v-model.trim="operatorForm.content" maxlength="1000" :rows="5" ></el-input>
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
      _this.$api.get(_this.$apis.manage+"/rest/manage/messagetemplate/"+value,{},function(res){
        if(res.success) {
          callback(new Error('该模板代码已存在，请重新输入'));
        } else {
          callback();
        }
      });
    };          
    return {
      loading: false, 
      operatorForm: { 
        messageTemplateCode:'',
        messageTemplateName:'',
        title:'',
        content:''
      },
      //校验规则
      rules: {
        messageTemplateCode:[{required:true,message:'请输入模板代码',trigger:'blur'},{validator: queryData, trigger: 'blur'}],
        messageTemplateName:[{required:true,message:'请输入模板名称',trigger:'blur'}],
        title:[{required:true,message:'请输入模板标题',trigger:'blur'}],
        content:[{required:true,message:'请输入模板内容',trigger:'blur'}],
      }
    };
  },

  created() {},

  mounted() {
  },

  methods: {
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
          _this.$api.post(this.$apis.manage+"/rest/manage/messagetemplate", para, function (res) {
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