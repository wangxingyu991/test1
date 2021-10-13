<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title">监控管理数据查看</div>
    </div>
    <div class="rh-drawer-body">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="发票类型名称" prop="fplxmc">
              <el-input v-model="editForm.fplxmc" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="单张开票限额" prop="dzkpxe">
              <el-input v-model="editForm.dzkpxe" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="报税起始日期" prop="bsqsrq">
              <el-input v-model="editForm.bsqsrq" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="报税终止日期" prop="bszzrq">
              <el-input v-model="editForm.bszzrq" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="开票启用时间" prop="kpqysj">
              <el-input v-model="editForm.kpqysj" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="开票截止时间" prop="kpjzsj">
              <el-input v-model="editForm.kpjzsj" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="离线开票时长" prop="lxkpsc">
              <el-input v-model="editForm.lxkpsc" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="离线开票张数" prop="lxkpzs">
              <el-input v-model="editForm.lxkpzs" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 	
        <el-row>
          <el-col :span="11">
            <el-form-item label="正数发票累计限额" prop="zsljxe">
              <el-input v-model="editForm.zsljxe" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="负数发票累计限额" prop="fsljxe">
              <el-input v-model="editForm.fsljxe" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>  
        <el-row>
          <el-col :span="11">
            <el-form-item label="发票累计张数限制" prop="fpljzsxz">
              <el-input v-model="editForm.fpljzsxz" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="正数发票累计张数限制" prop="zsfpljzsxz">
              <el-input v-model="editForm.zsfpljzsxz" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>  
        <el-row>
          <el-col :span="11">
            <el-form-item label="上传截止日期" prop="scjzrq">
              <el-input v-model="editForm.scjzrq" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="离线正数累计金额" prop="lxzsljje">
              <el-input v-model="editForm.lxzsljje" :readonly="true"></el-input>
            </el-form-item>
          </el-col>          
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="最新报税日期" prop="zxbsrq">
              <el-input v-model="editForm.zxbsrq" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="最新报税时间" prop="zxbssj">
              <el-input v-model="editForm.zxbssj" :readonly="true"></el-input>
            </el-form-item>
          </el-col>          
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="最新回送时间" prop="zxhssj">
              <el-input v-model="editForm.zxhssj" :readonly="true"></el-input>
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
import {validator} from '@/utils/validate.js';

export default {
  props: ["updatePageData"],

  data() {
    return {
      editForm: {
      },
      //校验规则
      rules: {
      },
    };
  },

  created() {},

  mounted() {
    this.queryTaxMonitorInfo();
  },

  methods: {
    //获取监控管理信息
    queryTaxMonitorInfo() {
      let _this = this;
      _this.editForm = _this.updatePageData.row;
    },

    //关闭
    close(formName) {
      // if (this.$refs[formName] !== undefined) {
      //   this.$refs[formName].resetFields();
      // }
      //关闭抽屉
      this.$emit("back");
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