<style lang="less">
  h3{
    font-size: 14px;
    font-weight: 700;
    color:#000;
    line-height: 26px;
  }
</style>
<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title"><span>关联设备</span></div>
    </div>
    <div class="rh-drawer-body">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="140px" label-position="right" v-loading="loading">
        <el-row>
          <el-col :span="11">
            <el-form-item label="纳税人识别号" prop="nsrsbh">
              <el-input v-model="editForm.nsrsbh" placeholder="纳税人识别号" maxlength="100" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="纳税人名称" prop="nsrmc">
              <el-input v-model="editForm.nsrmc" placeholder="纳税人名称" maxlength="100" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="服务器类型" prop="fwqlxmc">
              <el-input v-model="editForm.fwqlxmc" placeholder="服务器类型" maxlength="100" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="服务器类型代码" prop="fwqlxdm">
              <el-input v-model="editForm.fwqlxdm" placeholder="服务器类型代码" maxlength="100" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="服务器代码" prop="fwqdm">
              <el-input v-model="editForm.fwqdm" placeholder="服务器代码" maxlength="100" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="订单编号" prop="ddid">
              <el-input v-model="editForm.ddid" placeholder="订单编号" maxlength="100" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="省份" prop="sf">
              <el-input v-model="editForm.sf" placeholder="省份" maxlength="100" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-card class="box-card">
        <div slot="header">
            <h3>订单信息</h3>
        </div>
        <div class="bottom clearfix">
          <el-table :data="tableDataDdxx" stripe border @current-change="clickChangeDdxx" v-loading="loading">
            <template slot="empty">
              <div class="pic_nodata"></div>
            </template>
          <el-table-column
              label="序号"
              width="50px"
              align="center">
            <template slot-scope="scope">
                {{scope.$index+1}}
            </template>
          </el-table-column>
            <el-table-column label="选择" width="50">
                <template slot-scope="scope">
                    <el-radio  v-model="tableRadioDdxx" :label="scope.row"><i></i></el-radio>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="ddid" label="订单编号"></el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="sksblxmc" label="服务器类型"></el-table-column>
            <!-- <el-table-column show-overflow-tooltip align="right" prop="sksbsl" label="税控设备数量"></el-table-column> -->
            <el-table-column show-overflow-tooltip align="right" prop="sksbsysl" label="税控设备剩余数量"></el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="dqsj" label="到期时间"></el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header">
            <h3>服务器信息</h3>
        </div>
        <div class="bottom clearfix">
          <el-table :data="tableDataFwqxx" stripe border  @current-change="clickChangeFwqxx" v-loading="loading">
            <template slot="empty">
              <div class="pic_nodata"></div>
            </template>
          <el-table-column
              label="序号"
              width="50px"
              align="center">
            <template slot-scope="scope">
                {{scope.$index+1}}
            </template>
          </el-table-column>
            <el-table-column label="选择" width="50">
                <template slot-scope="scope">
                    <el-radio  v-model="tableRadioFwqxx" :label="scope.row"><i></i></el-radio>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="fwqmc" label="服务器名称"></el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="fwqdm" label="服务器代码"></el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="fwqlxmc"  label="服务器类型"></el-table-column>
          </el-table>
        </div>
      </el-card>
      <div class="rh-dialog-footer">
        <el-button type="primary" @click="onXnsb('editForm')">关联</el-button>
        <el-button @click="close('editForm')">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import validate from "@/utils/validate.js";
export default {
  props: ["updatePageData"],

  data() {
    return {
      loading: false,
      editForm: {
        nsrsbh: "",
        nsrmc: "",
        zzjgDm: "",
        zzjgMc: "",
        ddid: "",
        fwqlxdm: "",
        fwqlx: "",
        fwqdm: "",
        ddbh: "",
        sf: "",
      },
      tableRadioFwqxx: [],
      tableRadioDdxx: [],

      tableDataDdxx: [],
      tableDataFwqxx: [],
      //校验规则
      rules: {
      },
    };
  },

  created() {},

  mounted() {
    this.listDdxx();
    //$(".el-upload--picture-card").css("display", "none");
  },

  methods: {
    //进入页面后，显示订单信息 TENANTID、DDZT、YXBZ、DQSJ
    listDdxx() {
      let _this = this;
      _this.editForm.sf = _this.updatePageData.sf;
      _this.editForm.nsrsbh = _this.updatePageData.nsrsbh;
      _this.editForm.nsrmc = _this.updatePageData.nsrmc;
      _this.editForm.zzjgDm = _this.updatePageData.zzjgDm;
      _this.editForm.zzjgMc = _this.updatePageData.zzjgMc;
      let params = _this.editForm;
      if (params != null) {
        if (validate.checkForbiddenWordForm(JSON.stringify(params))) {
          _this.$message({
            showClose: true,
            message: "不允许有特殊字符",
            type: "error",
          });
          return;
        }
      }
      _this.$api.post(
        _this.$apis.icpmanagement + "/taxpayer/taxpayermanagement/getDdxxList", params,
        function (res) {
          if (res.success) {
            _this.tableDataDdxx = res.data;
          } else {
            _this.$message({
              message: "订单信息查询失败",
              type: "error",
            });
          }
        }
      );
    },
    //选择一条订单信息后调用，根据选择的订单信息的税控设备类型，查询不同的结果集
    //设备为新税控时查询t_xxgl_skgl_sbxx_skfwq
    ///设备为核心板、UK时查询t_dm_fwqxx
    listFwqxx() {
      let _this = this;
      let params = _this.editForm;
      if (params != null) {
        if (validate.checkForbiddenWordForm(JSON.stringify(params))) {
          _this.$message({
            showClose: true,
            message: "不允许有特殊字符",
            type: "error",
          });
          return;
        }
      }
      _this.$api.post(
        _this.$apis.icpmanagement + "/taxpayer/taxpayermanagement/getFwqxxList", params,
        function (res) {
          if (res.success) {
            _this.tableDataFwqxx = res.data;
          } else {
            _this.$message({
              message: "服务器信息查询失败",
              type: "error",
            });
          }
        }
      );
    },
    //选择一条订单信息时调用的方法
    clickChangeDdxx (item) {
        let _this = this;
        _this.tableRadioDdxx = item;
        if(_this.tableRadioDdxx){
          _this.$set(_this.editForm,'ddid',_this.tableRadioDdxx.ddid);
          _this.$set(_this.editForm,'fwqlxdm',_this.tableRadioDdxx.sksblx);
          _this.$set(_this.editForm,'fwqlxmc',_this.tableRadioDdxx.sksblxmc);
          _this.listFwqxx();
        }
        return;
    },
    //选择一条服务器信息时调用的方法
    clickChangeFwqxx (item) {
        let _this = this;
        _this.tableRadioFwqxx = item;
        if(_this.tableRadioFwqxx){
          _this.$set(_this.editForm,'fwqdm',_this.tableRadioFwqxx.fwqdm);
        }
        return;
    },
    
    //关联设备
    onXnsb(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
          let editParams = _this.editForm;
          let ddid = editParams.ddid;
          if(ddid==''){
            this.$message({
              message: "请选择一条订单信息",
              type: "error",
            });
            return;
          }
          let fwqdm = editParams.fwqdm;
          if(fwqdm==''){
            this.$message({
              message: "请选择一条服务器信息",
              type: "error",
            });
            return;
          }
          if (editParams != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(editParams))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }
          //打开loading
          _this.loading=true;
          
          _this.$api.post(
            _this.$apis.icpmanagement + "/taxpayer/taxpayermanagement/insertXnsb", editParams,
            function (res) {
              //关闭loading
              _this.loading=false;
              if (res.success) {
                  _this.$message({
                    message: "设备关联成功",
                    type: "success",
                  });

                  _this.$emit("back");
              } else {
                  _this.$message({
                  message: "设备关联失败," + res.errorMsg,
                  type: "error",
                  });
              }
            }
          );
        }
      });
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