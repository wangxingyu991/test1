<template>
  <div>
    <div class="rh-drawer-head">
      <div class="drawer-title">
        选择服务器信息
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <div class="rh-pull-right">
          <el-form :model="queryFormEquipment" ref="queryFormEquipment" :inline="false" label-width="0px" label-position="right">
            <el-form-item prop="fwqmc">
              <el-input v-model="queryFormEquipment.fwqmc" placeholder="服务器名称" maxlength="100" ></el-input>
            </el-form-item>
            <el-form-item prop="xnsbh">
              <el-input v-model="queryFormEquipment.xnsbh" placeholder="虚拟设备号" maxlength="100" ></el-input>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
            <el-button type="primary" @click="resetForm('queryFormEquipment')" style="margin-left: 0px;">重置</el-button>
          </el-form>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData" stripe border v-loading="loading" @current-change="clickEquipment">
          <template slot="empty">
            <div class="pic_nodata"></div>
          </template>
          <el-table-column label="选择" width="50">
                <template slot-scope="scope">
                    <el-radio  v-model="tableRadioEquipment" :label="scope.row"><i></i></el-radio>
                </template>
            </el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="swukbh" label="服务器编号"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="fwqmc" label="服务器名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="xnsbh" label="虚拟设备"></el-table-column>
        </el-table>
      </div>
      <div class="rh-dialog-footer">
        <el-button type="primary" @click="onSubmit()">确定</el-button>
        <el-button @click="close('queryFormEquipment')">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import validate from "@/utils/validate.js";
export default {
  data() {
    return {
      loading: false,
      chooseFlag: false,
      //查询表单
      queryFormEquipment: {
        fwqmc: "",
        xnsbh: "",
        fplxdm: "",
        kpzdmc: "",
      },
      tableRadioEquipment: [],
      option_fplxdm: [],
      tableData: [],
      //表格选择
      tr_sels: [],
    };
  },

  created() {},

  mounted() {
    this.init_TableEquipment();
    //this.getFplxdm();
  },

  methods: {
    //获取发票类型下拉数据
    getFplxdm() {
      let _this = this;
      let params = _this.queryFormEquipment;
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
        _this.$apis.icpmanagement + "/common/selectCommon/listFplx",
        params,
        function (res) {
          if (res.success) {
            _this.option_fplxdm = res.data;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },
    //初始化表格
    init_TableEquipment() {
      let _this = this;
      let params = this.queryFormEquipment;
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
      //打开loading
      _this.loading=true;
      this.$api.post(
        _this.$apis.icpmanagement + "/warning/warnSetting/listEquipment", params,
        function (res) {
          //关闭loading
          _this.loading=false;
          if (res.success) {
            _this.tableData = res.data;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

        //搜索
    searchForm() {
      this.init_TableEquipment();
    },

    //初始化table
    init() {
      this.init_TableEquipment();
    },

    //重置
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.init_TableEquipment();
    },

    clickEquipment (item) {
        this.tableRadioEquipment = item;
        this.chooseFlag = true;
    },
    onSubmit() {
      if(this.chooseFlag){
        this.$emit("equipmentMessage",this.tableRadioEquipment);
      }else{
        this.$message({
          message: "请选择一条服务器信息",
          type: "error",
        });
      };
    },
    //关闭
    close(formName) {
      //关闭抽屉
      this.$emit("back");
    },
  },
};
</script>
