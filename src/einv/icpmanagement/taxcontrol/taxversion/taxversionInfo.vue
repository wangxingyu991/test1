<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title">税控服务器版本信息查看</div>
    </div>
    <div class="rh-drawer-body">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="服务器地址" prop="fwqdz">
              <el-input v-model="editForm.fwqdz"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="服务器端口号" prop="fwqdkh">
              <el-input v-model="editForm.fwqdkh"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
       <el-row>
          <el-col :span="11">
            <el-form-item label="税控服务器编号" prop="swukbh">
              <el-input v-model="editForm.swukbh"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="当前版本号" prop="dqbbh">
              <el-input v-model="editForm.dqbbh"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="最新版本号" prop="zxbbh">
              <el-input v-model="editForm.zxbbh"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="发布日期" prop="fbrq">
              <el-input v-model="editForm.fbrq"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="11">
            <el-form-item label="启用时间" prop="qysj">
              <el-input v-model="editForm.qysj"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="升级时间" prop="sjsj">
              <el-input v-model="editForm.sjsj"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="操作人" prop="czr">
              <el-input v-model="editForm.czr"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="操作时间" prop="czsj">
              <el-input v-model="editForm.czsj" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="11">
            <el-form-item label="有效标识" prop="yxbz" :readonly="true" >
                <el-select v-model="editForm.yxbz">
                    <el-option label="有效" value="Y"></el-option>
                    <el-option label="无效" value="N"></el-option>
                </el-select>
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
    let editFlag = !this.updatePageData.id
    return {
      editFlag,
      editForm: {
        id: "",
        fwqdz: "",
        fwqdkh: "",
        vipdz: "",
        vipdkh: "",
        sfptkey: "",
        yxbz: "",
      },
      //校验规则
      rules: {
      },
    };
  },

  created() {},

  mounted() {
    this.init_table();
  },

  methods: {
    //根据ID获取表单信息
    init_table() {
      let _this = this;
      console.info(JSON.stringify(_this.updatePageData.row));
      _this.editForm = _this.updatePageData.row;
    },

    //关闭
    close(formName) {
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