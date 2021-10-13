<template>
  <div class="drawer-wrap" v-loading="loading">
    <div class="rh-drawer-head">
      <div class="drawer-title">
        <span>开票数据详情</span>
      </div>
    </div>
    <div class="rh-drawer-body">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="120px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="日期" prop="date">
              <el-input v-model.trim="editForm.date" placeholder="日期" maxlength="100" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="产品名称" prop="productName">
              <el-input v-model.trim="editForm.productName" placeholder="产品名称" maxlength="256" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="商品编码" prop="goodstaxno">
              <el-input v-model.trim="editForm.goodstaxno" placeholder="商品编码" maxlength="100" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="应税标志" prop="isTaxItem">
              <el-input v-model.trim="editForm.isTaxItem" placeholder="应税标志" maxlength="100" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="专票金额" prop="issueValueSpecial">
              <el-input v-model.trim="editForm.issueValueSpecial" placeholder="专票金额" maxlength="100" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="专票税额" prop="issueTaxSpecial">
              <el-input v-model.trim="editForm.issueTaxSpecial" placeholder="专票税额" maxlength="100" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="普票金额" prop="issueValueCommon">
              <el-input v-model.trim="editForm.issueValueCommon" placeholder="普票金额" maxlength="100" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="普票税额" prop="issueTaxCommon">
              <el-input v-model.trim="editForm.issueTaxCommon" placeholder="普票税额" maxlength="100" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="纸电标志" prop="invdtype">
              <el-input v-model.trim="editForm.invdtype" placeholder="纸电标志" maxlength="100" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="开票点代码" prop="orgCode">
              <el-input v-model.trim="editForm.orgCode" placeholder="开票点代码" maxlength="100" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="系统" prop="source">
              <el-input v-model.trim="editForm.source" placeholder="系统" maxlength="100" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="创建时间" prop="createTime">
              <el-input v-model.trim="editForm.createTime" placeholder="创建时间" maxlength="100" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="修改时间" prop="modifyTime">
              <el-input v-model.trim="editForm.modifyTime" placeholder="修改时间" maxlength="100" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="rh-dialog-footer">
      <el-button @click="close('editForm')">关闭</el-button>
    </div>
  </div>
</template>

<script>
import validate from "@/utils/validate.js";

export default {
  props: ["updatePageData"],

  data() {
    /* let editFlag = !this.updatePageData.xmbh; */
    return {
      /* editFlag, */
      editForm: {
        date: "",
        productName: "",
        goodstaxno: "",
        isTaxItem: "",
        issueValueSpecial: "",
        issueTaxSpecial: "",
        issueValueCommon: "",
        issueTaxCommon: "",
        invdtype: "",
        orgCode: "",
        source: "",
        createTime: "",
        modifyTime: "",
      },
      //校验规则
      rules: {},
      loading: false,
    };
  },

  created() {
    if (this.updatePageData.isTaxItem == 0) {
      this.updatePageData.isTaxItem = "免税";
    } else if (this.updatePageData.isTaxItem == 1) {
      this.updatePageData.isTaxItem = "应交税";
    }

    if (this.updatePageData.invdtype == "E") {
      this.updatePageData.invdtype = "电子发票";
    } else if (this.updatePageData.invdtype == "Z") {
      this.updatePageData.invdtype = "纸质发票";
    }
  },

  mounted() {
    this.editForm.date = this.updatePageData.date;
    this.editForm.productName = this.updatePageData.productName;
    this.editForm.goodstaxno = this.updatePageData.goodstaxno;
    this.editForm.isTaxItem = this.updatePageData.isTaxItem;
    this.editForm.issueValueSpecial = this.updatePageData.issueValueSpecial;
    this.editForm.issueTaxSpecial = this.updatePageData.issueTaxSpecial;
    this.editForm.issueValueCommon = this.updatePageData.issueValueCommon;
    this.editForm.issueTaxCommon = this.updatePageData.issueTaxCommon;
    this.editForm.invdtype = this.updatePageData.invdtype;
    this.editForm.orgCode = this.updatePageData.orgCode;
    this.editForm.source = this.updatePageData.source;
    this.editForm.createTime = this.updatePageData.createTime;
    this.editForm.modifyTime = this.updatePageData.modifyTime;
  },

  methods: {
    //关闭
    close(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      //关闭抽屉
      this.$emit("close");
    },
  },
};
</script>

<style lang="less">
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