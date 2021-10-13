<template>
  <div class="drawer-wrap"  v-loading="loading">
    <div class="rh-drawer-head">
      <div class="drawer-title">监控管理数据</div>
    </div>
    <div class="rh-drawer-body">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="税控服务器编号" prop="swukbh">
              <el-input v-model="editForm.swukbh" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="纳税人识别号" prop="nsrsbh">
              <el-input v-model="editForm.nsrsbh" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="虚拟设备编号" prop="xnsbh">
              <el-input v-model="editForm.xnsbh" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="发票类型" prop="fplxmc">
              <el-input v-model="editForm.fplxmc" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" v-show="isShow" >
            <el-form-item label="开票启用时间" prop="kpqysj">
              <el-input v-model="editForm.kpqysj" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" v-show="isShow">
            <el-form-item label="开票截止时间" prop="kpjzsj">
              <el-input v-model="editForm.kpjzsj" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="数据报送起始日期" prop="bsqsrq">
              <el-input v-model="editForm.bsqsrq" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="数据报送终止日期" prop="bszzrq">
              <el-input v-model="editForm.bszzrq" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="单张开票限额(元)" prop="dzkpxe">
              <el-input v-model="editForm.dzkpxe" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="正数发票累计限额(元)" prop="zsljxe">
              <el-input v-model="editForm.zsljxe" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="负数发票累计限额(元)" prop="fsljxe">
              <el-input v-model="editForm.fsljxe" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="发票累计张数限制" prop="fpljzsxz">
              <el-input v-model="editForm.fpljzsxz" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" v-show="isShow" >
            <el-form-item label="正数发票累计张数限制" prop="zsfpljzsxz">
              <el-input v-model="editForm.zsfpljzsxz" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" v-show="isShow" >
            <el-form-item label="负数发票累计张数限制" prop="fsfpljzsxz">
              <el-input v-model="editForm.fsfpljzsxz" :readonly="true" ></el-input>
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
            <el-form-item label="离线开票时长(小时)" prop="lxkpsc">
              <el-input v-model="editForm.lxkpsc" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="离线开票张数" prop="lxkpzs">
              <el-input v-model="editForm.lxkpzs" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="离线正数累计金额(元)" prop="lxzsljje">
              <el-input v-model="editForm.lxzsljje" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="最新报税日期" prop="zxbsrq">
              <el-input v-model="editForm.zxbsrq" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" v-show="isShow" >
            <el-form-item label="最新报税时间" prop="zxbssj">
              <el-input v-model="editForm.zxbssj" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" v-show="isShow" >
            <el-form-item label="最新回送时间" prop="zxhssj">
              <el-input v-model="editForm.zxhssj" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="rh-dialog-footer">
      <el-button type="primary" @click="updatetype">更新</el-button>
      <el-button @click="close('editForm')">关闭</el-button>
    </div>
  </div>
</template>

<script>
import {validator} from '@/utils/validate.js';
import { formateDate2 } from "@/utils/tools.js";

export default {
  props: ["updatePageData"],

  data() {
    return {
      editForm: {
        fwqdzdk: "",
        xnsbh: "",
        nsrsbh: "",
        nsrmc: "",
        fplxdm: "",
      },
      isShow: true,
      //校验规则
      rules: {
      },
      loading: false,
    };
  },

  created() {},

  mounted() {
    this.getType();
  },

  methods: {
    //获取监控管理数据
    getType() {
      let _this = this;

     if(_this.updatePageData.row.fwqlxdm=='001'){
        _this.isShow=true;
     }
    if(_this.updatePageData.row.fwqlxdm=='002'){
        _this.isShow=false;
     }
    if(_this.updatePageData.row.fwqlxdm=='003'){
        _this.isShow=false;
     }

      let params = this.editForm;
      _this.$set(params, "nsrsbh", _this.updatePageData.row.nsrsbh);
      _this.$set(params, "swukbh", _this.updatePageData.row.swukbh);
      _this.$set(params, "xnsbh", _this.updatePageData.row.xnsbh);
      _this.$set(params, "fplxdm", _this.updatePageData.row.fplxdm);
      _this.$api.post(
        _this.$apis.icpmanagement +"/taxcontrol/typesearch/gettype/", params,
        function (res) {
          if (res.success) {
            console.info(JSON.stringify(res.data));
            _this.editForm = res.data;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //更新
    updatetype() {
      let _this = this;
      //打开loading
      _this.loading=true;

      _this.isShow=true;
      let params = this.editForm;
      _this.$set(params, "nsrsbh", _this.updatePageData.row.nsrsbh);
      _this.$set(params, "swukbh", _this.updatePageData.row.swukbh);
      _this.$set(params, "xnsbh", _this.updatePageData.row.xnsbh);
      _this.$set(params, "fplxdm", _this.updatePageData.row.fplxdm);
      _this.$set(params, "fwqdzdk", _this.updatePageData.row.fwqdzdk);
      _this.$set(params, "fwqlxdm", _this.updatePageData.row.fwqlxdm);

      if(_this.updatePageData.row.fwqlxdm=='001'){
        //税控服务器
        this.$api.post(
          _this.$apis.icpmanagement + "/taxcontrol/typesearch/updatetype/", params,
          function (res) {
            //关闭loading
            _this.loading=false;
            console.info(JSON.stringify(res));
            if (res.success) {
              _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.returnmsg,
                '税控服务器返回提示', {
                confirmButtonText: '关闭',
                dangerouslyUseHTMLString: true
              });
              _this.getType();
            } else {
              _this.$message({
                message: "查询失败," + res.errorMsg,
                type: "error",
              });
            }
          }
        );
      }
      if(_this.updatePageData.row.fwqlxdm=='002'){
        _this.isShow=false;
        //核心板卡
        this.$api.post(
          _this.$apis.icpmanagement + "/taxcontrol/typesearch/updatetypecard/", params,
          function (res) {
            //关闭loading
            _this.loading=false;
            console.info(JSON.stringify(res));
            if (res.success) {
              _this.editForm=res.data.returndata;
              _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.returnmsg,
                '税控服务器返回提示', {
                confirmButtonText: '关闭',
                dangerouslyUseHTMLString: true
              });
              _this.getType();
            } else {
              _this.$message({
                message: "查询失败," + res.errorMsg,
                type: "error",
              });
            }
          }
        );
      }
      if(_this.updatePageData.row.fwqlxdm=='003'){
        _this.isShow=false;
        //UKEY
        this.$api.post(
          _this.$apis.icpmanagement + "/taxcontrol/typesearch/updatetypeukey/", params,
          function (res) {
            //关闭loading
            _this.loading=false;
            console.info(JSON.stringify(res));
            if (res.success) {
              _this.editForm=res.data.returndata;
              _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.returnmsg,
                '税控服务器返回提示', {
                confirmButtonText: '关闭',
                dangerouslyUseHTMLString: true
              });
              _this.getType();
            } else {
              _this.$message({
                message: "查询失败," + res.errorMsg,
                type: "error",
              });
            }
          }
        );
      }
    },

    //关闭
    close(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
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