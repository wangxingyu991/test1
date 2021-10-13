<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title">租户信息</div>
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
                        <!-- <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                          <i class="el-icon-delete"></i>
                        </span> -->
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
          <span>租户审批信息</span>
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
      <div class="rh-dialog-footer">
        <el-button  @click="close()">关 闭 </el-button>
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
      fileList: [{ name: "", url: "" }],
      dialogImageUrl: "",
      tableData:[],
      dialogVisible: false,
      disabled: false,
      operatorForm: { 
      },
      //校验规则
      rules: {
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
    //根据ID获取表单信息
    getTanantInfoById() {
      let _this = this;
      _this.$api.get(
        _this.$apis.manage +  "/rest/manage/system/tenant/" +  _this.detailData.tenantId,
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
        _this.$apis.manage +  "/rest/manage/system/tenant/gettenantdeal/" +  _this.detailData.tenantId,
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