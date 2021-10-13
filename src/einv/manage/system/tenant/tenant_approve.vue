<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title">租户审批</div>
    </div>
    <div class="rh-drawer-body">
      <el-card class="box-card">
         <div slot="header">
          <span>租户基本信息</span>
        </div>
        <el-row>
          <el-form :model="operatorForm"  ref="operatorForm" label-width="100px" label-position="right">
            <el-row>
              <el-col :span="12">
                <el-form-item label="企业税号" prop="companyTaxId">
                  <el-input v-model="operatorForm.companyTaxId" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业名称" prop="tenantName">
                  <el-input v-model="operatorForm.tenantName" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="企业电话" prop="companyPhone">
                  <el-input v-model="operatorForm.companyPhone" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业地址" prop="companyAddress">
                  <el-input v-model="operatorForm.companyAddress" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人名称" prop="contact">
                  <el-input v-model="operatorForm.contact" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人手机" prop="contactPhone">
                  <el-input v-model="operatorForm.contactPhone" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人邮箱" prop="contactEmail">
                  <el-input v-model="operatorForm.contactEmail" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="资质文件" prop="qualificationId">
                  <!-- <el-input v-model="operatorForm.qualificationId" placeholder="资质文件"></el-input> -->
                  <el-upload action="1" list-type="picture-card" ref="upload" :limit="1" accept="image/jpeg,image/gif,image/png"
                    :multiple="false" :file-list="this.fileList"  :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                      <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                          <i class="el-icon-zoom-in"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible" append-to-body>
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" prop="remark">
                  <el-input type="textarea" v-model="operatorForm.remark" placeholder="请输入备注" maxlength="200" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              </el-row>
          </el-form>
        </el-row>
      </el-card>
       <el-card class="box-card">
        <div slot="header">
          <span>历史审批信息</span>
        </div>
        <el-table :data="tableData" stripe border>
          <template slot="empty">
            <div class="pic_nodata"></div>
          </template>
          <el-table-column align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="left" prop="handleTime" label="操作时间" width="200"></el-table-column>
          <el-table-column align="left" prop="handleResultName" label="结果" width="100"></el-table-column>
          <el-table-column align="left" prop="handleIdea" label="意见"></el-table-column>
        </el-table>
      </el-card>
      <el-card class="box-card">
         <div slot="header">
          <span>审批意见</span>
        </div>
        <el-row>
          <el-form :model="operatorForm1" ref="operatorForm1" :rules="rules1"  label-width="100px" label-position="right">
            <el-row>
              <el-col :span="12">
                <el-form-item label="审核状态" prop="approStatus">
                  <el-select v-model="operatorForm1.approStatus" @change="initReason">
                    <el-option key="3" value="3" label="同意"></el-option>
                    <el-option key="2" value="2" label="不同意"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
               <el-col :span="12" v-if="showDbindepdent">
                <el-form-item label="数据独立性" prop="dbindepdent">
                  <el-select v-model="operatorForm1.dbindepdent" placeholder="请选择">
                    <el-option key="0" value="0" label="独立数据库（软件级别）"></el-option>
                    <el-option key="1" value="1" label="独立数据库（schema）"></el-option>
                    <el-option key="2" value="2" label="共享数据库"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" v-if="showReason">
                <el-form-item label="意见" prop="suggestion">
                  <el-input type="textarea" v-model="operatorForm1.suggestion" placeholder="请输入意见" maxlength="200"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </el-card>
      <div class="rh-dialog-footer">
        <el-button type="primary" @click="approveTenant()" :loading="loading">审 批</el-button>
        <el-button @click="close()">关 闭 </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import validate from "@/utils/validate.js";
export default {
  props: ["approveData"],
  data() {          
    let checkReason = (rule, value, callback) => {
      if(this.operatorForm1.approStatus=='1'&&this.operatorForm1.suggestion=='') {
        callback(new Error("请填写审核意见"));
      }else{
        callback();
      }
    };
    return {
      loading: false,
      fileList: [{ name: "", url: "" }],
      dialogImageUrl: "",
      tableData:[],
      dialogVisible: false,
      disabled: false,
      showReason:false,
      showDbindepdent:true,
      operatorForm: { 
      },
      operatorForm1: {
        tenantId: this.approveData.tenantId,
        dbindepdent: "0",
        approStatus: "3",
        suggestion: ""
      },
      //校验规则
      rules: {
      },
      rules1: {
        suggestion:[{validator: checkReason, trigger: 'blur'}]
      }
    };
  },

  created() {},

  mounted() {
    this.getTanantInfoById();
    this.getTenantDeal();
    // if (this.fileList.length >= 1) {
      //添加一个图片后隐藏图片添加
      $(".el-upload--picture-card").css("display", "none");
    // }
  },

  methods: {
    initReason(){
      if(this.operatorForm1.approStatus=="2"){
        this.showReason = true;
        this.showDbindepdent = false;
      }else{
        this.showReason = false;
        this.showDbindepdent = true;
      }
    },
    //根据ID获取表单信息
    getTanantInfoById() {
      let _this = this;
      _this.$api.get(
        _this.$apis.manage +  "/rest/manage/system/tenant/" +  _this.approveData.tenantId,
        {},
        function (res) {
          if (res.success) {
            _this.operatorForm = res.data;
            _this.dialogImageUrl = res.data.productImg;
            _this.fileList[0].name = res.data.fileName;
            _this.fileList[0].url = res.data.productImg;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },
    getTenantDeal() {
      let _this = this;
      _this.$api.get(
        _this.$apis.manage +  "/rest/manage/system/tenant/gettenantdeal/" +  _this.approveData.tenantId,
        {},
        function (res) {
          if (res.success) {
            var list = res.data;
            for(let i = 0;i < list.length;i++){
              if(list[i].handleResult == '0'){
                list[i].handleResultName = '通过';
              }else{
                list[i].handleResultName = '不通过';
              }
            }
            _this.tableData = list;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },
    approveTenant(){
      let _this = this;
      _this.$refs.operatorForm1.validate((valid) => {
        if(valid){
        
          if (_this.operatorForm1 != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(_this.operatorForm1))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }

          _this.loading = true;
          _this.$api.post( _this.$apis.manage +  "/rest/manage/system/tenant/approvetenant", _this.operatorForm1,
            function (res) {
              if (res.success) {
                _this.$message({
                  message: '审批成功',
                  type: 'success'
                });
                _this.$emit("back");
                _this.$emit("reload");
              } else {
                _this.$message({
                  message: res.errorMsg,
                  type: "error",
                });
              }
              _this.loading = false;
            }
          );
        }
      })
    },
    //图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //关闭
    close(formName) {
      this.$emit("back");
    },
  },
};
</script>

<style lang="less" scoped>
.el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
}
.el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.el-dialog__headerbtn {
  right: 40px;
}
</style>