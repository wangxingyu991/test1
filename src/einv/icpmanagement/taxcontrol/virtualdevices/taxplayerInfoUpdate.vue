<template>
  <div class="drawer-wrap" v-loading="loading">
    <div class="rh-drawer-head">
      <div class="drawer-title">
        <div class="tips-content">
          <span class="rh-helpTip-text">企业信息更新</span>
          <span class="rh-helpTip-icon">
            <el-tooltip
              class="item"  content="温馨提示：此步骤完成虚拟设备的发行一系列操作">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </span>
        </div>
      </div>
    </div>
    <div class="rh-drawer-body">
     <div class="steps" >
      <el-steps :space="200" :active="active" finish-status="success" >
        <el-step title="企业信息更新"></el-step>
        <el-step title="发票类型更新"></el-step>
        <el-step title="核定税率更新"></el-step>
      </el-steps>
     </div>
     <div class="space10"></div>
      <div class="step" v-if="active == 0">
       <el-form :model="editFormTaxplayerInfo" :rules="rules" ref="editFormTaxplayerInfo" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="22" v-show="isShow" >
            <el-form-item label="税控服务器地址端口" prop="fwqdzdk" >
               <el-input v-model="editFormTaxplayerInfo.fwqdzdk" placeholder="税控服务器地址端口"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="纳税人识别号" prop="nsrsbh">
              <el-input v-model="editFormTaxplayerInfo.nsrsbh" placeholder="纳税人识别号"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="纳税人名称" prop="nsrmc">
              <el-input v-model="editFormTaxplayerInfo.nsrmc" placeholder="纳税人名称"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="虚拟设备号" prop="xnsbh">
              <el-input v-model="editFormTaxplayerInfo.xnsbh" placeholder="虚拟设备号"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="发票类型代码" prop="fplxdm">
              <el-input v-model="editFormTaxplayerInfo.fplxdm" placeholder="发票类型"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="税务机关代码" prop="swjgdm">
              <el-input v-model="editFormTaxplayerInfo.swjgdm" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="税务机关名称" prop="swjgmc">
              <el-input v-model="editFormTaxplayerInfo.swjgmc" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="登记时间" prop="djsj">
              <el-input v-model="editFormTaxplayerInfo.djsj" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="版本号" prop="bbh">
              <el-input v-model="editFormTaxplayerInfo.bbh" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="登记序号" prop="djxh">
              <el-input v-model="editFormTaxplayerInfo.djxh" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="企业类型" prop="qylx" >
                 <el-select v-model="editFormTaxplayerInfo.qylx" :disabled="true">
                    <el-option label="一般纳税人" value="01"></el-option>
                    <el-option label="小规模纳税人" value="02"></el-option>
                    <el-option label="转登记纳税人" value="03"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="开票标志" prop="kpbz" >
                 <el-select v-model="editFormTaxplayerInfo.kpbz" :disabled="true">
                    <el-option label="允许" value="00"></el-option>
                    <el-option label="禁止" value="01"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="特定企业" prop="tdqy" >
                 <el-select v-model="editFormTaxplayerInfo.tdqy" :disabled="true">
                    <el-option label="不是" value="00"></el-option>
                    <el-option label="是" value="01"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="农产品企业" prop="ncpqy" >
                 <el-select v-model="editFormTaxplayerInfo.ncpqy" :disabled="true">
                    <el-option label="允许" value="00"></el-option>
                    <el-option label="收购企业" value="01"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="电信企业" prop="dxqy" >
                 <el-select v-model="editFormTaxplayerInfo.dxqy" :disabled="true">
                    <el-option label="非电信企业" value="00"></el-option>
                    <el-option label="电信企业" value="01"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="小规模开具专票标识" prop="xgmkjzpbs" >
                 <el-select v-model="editFormTaxplayerInfo.xgmkjzpbs" :disabled="true">
                    <el-option label="不可开具专票" value="00"></el-option>
                    <el-option label="可以开具专票" value="01"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="二手机动车标识" prop="esjdcbz" >
                 <el-select v-model="editFormTaxplayerInfo.esjdcbz" :disabled="true">
                    <el-option label="非二手机动车纳税人" value="00"></el-option>
                    <el-option label="经营单位" value="01"></el-option>
                    <el-option label="拍卖单位" value="02"></el-option>
                    <el-option label="二手车市场" value="03"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="成品油标识" prop="xgmkjzpbs" >
                 <el-select v-model="editFormTaxplayerInfo.xgmkjzpbs" :disabled="true">
                    <el-option label="非成品油企业" value="00"></el-option>
                    <el-option label="生产企业" value="01"></el-option>
                    <el-option label="经销企业" value="02"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="成品油标识有效期" prop="cpybsyxq">
              <el-input v-model="editFormTaxplayerInfo.cpybsyxq" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="成品油白名单标识" prop="cpybmdbs" >
                 <el-select v-model="editFormTaxplayerInfo.cpybmdbs" :disabled="true">
                    <el-option label="非成品油白名单企业" value="00"></el-option>
                    <el-option label="成品油白名单企业" value="01"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="成品油白名单有效期 " prop="cpybmdbsyxq">
              <el-input v-model="editFormTaxplayerInfo.cpybmdbsyxq" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="稀土企业" prop="xtqy" >
                 <el-select v-model="editFormTaxplayerInfo.xtqy" :disabled="true">
                    <el-option label="非稀土企业" value="00"></el-option>
                    <el-option label="稀土企业-矿产品" value="01"></el-option>
                    <el-option label="稀土企业-冶炼分离" value="02"></el-option>
                    <el-option label="稀土企业-其它" value="03"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
       </el-form>
        <div class="step-bt-group">
          <el-button type="primary" @click="getTaxplayerInfo">企业信息更新</el-button>
          <el-button type="primary" @click="nextPage(1)">下一步</el-button>
          <el-button @click="close('editFormTaxplayerInfo')">关闭</el-button>
        </div>
      </div> 

      <div class="step" v-if="active == 1">
       <el-form :model="editFormMonitorInfo" :rules="rules" ref="editFormMonitorInfo" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="22" v-show="isShow" >
            <el-form-item label="税控服务器地址端口" prop="fwqdzdk">
              <el-input v-model="editFormMonitorInfo.fwqdzdk" placeholder="税控服务器地址端口"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="纳税人识别号" prop="nsrsbh">
              <el-input v-model="editFormMonitorInfo.nsrsbh" placeholder="纳税人识别号"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="纳税人名称" prop="nsrmc">
              <el-input v-model="editFormMonitorInfo.nsrmc" placeholder="纳税人名称"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="虚拟设备号" prop="xnsbh">
              <el-input v-model="editFormMonitorInfo.xnsbh" placeholder="虚拟设备号"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="发票类型代码" prop="fplxdm">
              <el-input v-model="editFormMonitorInfo.fplxdm" placeholder="发票类型"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="rh-table">
          <el-table :data="tableDataTaxMonitorInfo" stripe border height="350">
            <template slot="empty">
                <div class="pic_nodata"></div>
            </template>
            <el-table-column label="序号" width="50px" align="center">
              <template slot-scope="scope"> {{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="fplxdm" label="发票类型代码" width="100"></el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="fplxmc" label="发票类型名称"></el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="kpjzsj" label="截止开票时间"></el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="dzkpxe" label="单张开票限额"></el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="bsqsrq" label="报送起始日期"></el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="bszzrq" label="报送终止日期"></el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="lxkpsc" label="离线开票时长(小时)"></el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="lxkpzs" label="离线开票张数"></el-table-column>
            <el-table-column align="center" label="操作"  width="60">
              <template slot-scope="scope">
                <el-button class="table_btn" type="text" @click="queryTaxMonitorInfo(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
       </el-form>
        <div class="step-bt-group">
          <el-button type="primary" @click="active=0">上一步</el-button>
          <el-button type="primary" @click="getMonitorInfo">发票类型获取</el-button>
          <el-button type="primary" @click="nextPage(2)">下一步</el-button>
          <el-button @click="close('editFormMonitorInfo')">关闭</el-button>
        </div>
      </div>

      <div class="step" v-if="active == 2">
       <el-form :model="editFormTaxRateInfo" :rules="rules" ref="editFormTaxRateInfo" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="22" v-show="isShow">
            <el-form-item label="税控服务器地址端口" prop="fwqdzdk">
              <el-input v-model="editFormTaxRateInfo.fwqdzdk" placeholder="税控服务器地址端口"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="纳税人识别号" prop="nsrsbh">
              <el-input v-model="editFormTaxRateInfo.nsrsbh" placeholder="纳税人识别号"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="纳税人名称" prop="nsrmc">
              <el-input v-model="editFormTaxRateInfo.nsrmc" placeholder="纳税人名称"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="虚拟设备号" prop="xnsbh">
              <el-input v-model="editFormTaxRateInfo.xnsbh" placeholder="虚拟设备号"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="发票类型代码" prop="fplxdm">
              <el-input v-model="editFormTaxRateInfo.fplxdm" placeholder="发票类型"  :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="rh-table">
          <el-table :data="tableDatataxrate" stripe border height="350">
            <template slot="empty">
                <div class="pic_nodata"></div>
            </template>
            <el-table-column label="序号" width="50px" align="center">
              <template slot-scope="scope"> {{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="fplxdm" label="发票类型代码"></el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="fplxmc" label="发票类型名称"></el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="sl" label="税率"></el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="slmc" label="税率名称"></el-table-column>
          </el-table>
        </div>
       </el-form>
        <div class="step-bt-group">
          <el-button type="primary" @click="active=1">上一步</el-button>
          <el-button type="primary" @click="taxRateInfo">核定税率获取</el-button>
          <el-button @click="close('editFormTaxRateInfo')">关闭</el-button>
        </div>
      </div>

      <!--监控管理数据查看-->
      <div class="drawer-container add" :key=1000>
        <el-drawer :with-header="false" append-to-body size="70%" :visible.sync="drawer">
          <editPage v-if="drawer" @back="back" :updatePageData="updatePageData" ></editPage>
        </el-drawer>
      </div>

    </div>
  </div>
</template>

<script>
import {validator} from '@/utils/validate.js';
import editPage from "./taxmonitorInfo.vue";
import validate from "@/utils/validate.js";

export default {

  components: {
    editPage,
  },

  props: ["updatePageDatataxplayerInfo"],

  data() {
    return {
      drawer: false,
      active:0,
      isShow:false,
      //企业信息下载和获取
      editFormTaxplayerInfo: {
        fwqdzdk: "",
        xnsbh: "",
        nsrsbh: "",
        nsrmc: "",
        fplxdm: "",
      },
      //监控数据获取
      editFormMonitorInfo: {
        fwqdzdk: "",
        xnsbh: "",
        nsrsbh: "",
        nsrmc: "",
        fplxdm: "",
      },
      //核定税率
      editFormTaxRateInfo: {
        fwqdzdk: "",
        xnsbh: "",
        nsrsbh: "",
        nsrmc: "",
        fplxdm: "",
      },
      tableDataTaxMonitorInfo: [],
      tableDatataxrate: [],
      updatePageData: {},
      //校验规则
      rules: {
      },
      loading: false,
    };
  },

  created() {},

  mounted() {
    this.initTaxServerinfo();
  },

  methods: {

    //初始化页面信息
    initTaxServerinfo(){
      let _this = this;
      _this.editFormTaxplayerInfo.fwqdzdk=_this.updatePageDatataxplayerInfo.row.fwqdzdk;
      _this.editFormTaxplayerInfo.nsrsbh=_this.updatePageDatataxplayerInfo.row.nsrsbh;
      _this.editFormTaxplayerInfo.nsrmc=_this.updatePageDatataxplayerInfo.row.nsrmc;
      _this.editFormTaxplayerInfo.xnsbh=_this.updatePageDatataxplayerInfo.row.xnsbh;
      _this.editFormTaxplayerInfo.fplxdm=_this.updatePageDatataxplayerInfo.row.fplxdm;

      let params = this.editFormTaxplayerInfo;
       _this.$set(params, "fwqdzdk", _this.updatePageDatataxplayerInfo.row.fwqdzdk);

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
      this.$api.post(_this.$apis.icpmanagement +"/taxcontrol/virtualDevices/getTaxPlayerExtendInfo",params,
        function (res) {
          if (res.success) {
            console.info(JSON.stringify(res));
            _this.editFormTaxplayerInfo=res.data;
            _this.editFormTaxplayerInfo.swjgmc=res.data.zgswjgmc;
            _this.editFormTaxplayerInfo.swjgdm=res.data.zgswjgdm;
            _this.editFormTaxplayerInfo.fwqdzdk=_this.updatePageDatataxplayerInfo.row.fwqdzdk;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      ); 
    },    
          
    //企业信息下载和获取
    getTaxplayerInfo() {
      let _this = this;
      let params = this.editFormTaxplayerInfo;
      // if (params != null) {
      //   if (validate.checkForbiddenWordForm(JSON.stringify(params))) {
      //     _this.$message({
      //       showClose: true,
      //       message: "不允许有特殊字符",
      //       type: "error",
      //     });
      //     return;
      //   }
      // }
      //打开loading
      _this.loading=true;
      this.$api.post(
        _this.$apis.icpmanagement + "/taxcontrol/virtualDevices/getTaxplayerInfo", params,
        function (res) {
          //关闭loading
          _this.loading=false;
          if (res.success) {
             console.info(JSON.stringify(_this.editFormTaxplayerInfo));
             _this.editFormTaxplayerInfo=res.data.returndata.jbxx.group;
             _this.editFormTaxplayerInfo.fwqdzdk=_this.updatePageDatataxplayerInfo.row.fwqdzdk;
             _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.comment+","+res.data.returnmsg,
               '税控服务器返回提示', {
               confirmButtonText: '关闭',
               dangerouslyUseHTMLString: true
             });
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },


    //调用接口，监控管理数据获取
    getMonitorInfo() {
      let _this = this;
      let params = this.editFormMonitorInfo;
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
        _this.$apis.icpmanagement + "/taxcontrol/virtualDevices/monitorInfo", params,
        function (res) {
          //关闭loading
          _this.loading=false;
          if (res.success) {
            console.info(JSON.stringify(res));
            _this.tableDataTaxMonitorInfo = res.data;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });

          }
        }
      );
    },

    //核定税率
    taxRateInfo() {
      let _this = this;
      let params = this.editFormTaxRateInfo;
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
        _this.$apis.icpmanagement + "/taxcontrol/virtualDevices/taxRateInfo", params,
        function (res) {
          //关闭loading
          _this.loading=false;
          if (res.success) {
             console.info(JSON.stringify(res));
             _this.tableDatataxrate = res.data;
            //  _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.comment+","+res.data.returnmsg,
            //    '税控服务器返回提示', {
            //    confirmButtonText: '关闭',
            //    dangerouslyUseHTMLString: true
            //  });
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });

          }
        }
      );
    },

    //监控管理数据查看面抽屉
    queryTaxMonitorInfo(row) {
      this.drawer = true;
      this.updatePageData = {
        row: row,
      };
    },

    //查询监控管理数据获取
    listMonitorInfo() {
      let _this = this;
      let params = this.editFormMonitorInfo;
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
        _this.$apis.icpmanagement + "/taxcontrol/virtualDevices/listMonitorInfo", params,
        function (res) {
          //关闭loading
          _this.loading=false;
          if (res.success) {
            console.info(JSON.stringify("查询："+res));
            _this.tableDataTaxMonitorInfo = res.data;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //查询，核定税率
    listTaxRateInfo() {
      let _this = this;
      let params = this.editFormTaxRateInfo;
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
        _this.$apis.icpmanagement + "/taxcontrol/virtualDevices/listTaxRateInfo", params,
        function (res) {
          //关闭loading
          _this.loading=false;
          if (res.success) {
             console.info(JSON.stringify(res));
             _this.tableDatataxrate = res.data;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

  nextPage(num,index){
    let _this = this;
    if(num == 1){
      _this.editFormMonitorInfo.fwqdzdk=_this.editFormTaxplayerInfo.fwqdzdk;
      _this.editFormMonitorInfo.xnsbh=_this.editFormTaxplayerInfo.xnsbh;
      _this.editFormMonitorInfo.nsrsbh=_this.editFormTaxplayerInfo.nsrsbh;
      _this.editFormMonitorInfo.nsrmc=_this.editFormTaxplayerInfo.nsrmc;
      _this.editFormMonitorInfo.fplxdm=_this.editFormTaxplayerInfo.fplxdm;
      _this.listMonitorInfo();
      _this.active = 1;
    }
    if(num == 2){
      _this.editFormTaxRateInfo.fwqdzdk=_this.editFormTaxplayerInfo.fwqdzdk;
      _this.editFormTaxRateInfo.xnsbh=_this.editFormTaxplayerInfo.xnsbh;
      _this.editFormTaxRateInfo.nsrsbh=_this.editFormTaxplayerInfo.nsrsbh;
      _this.editFormTaxRateInfo.nsrmc=_this.editFormTaxplayerInfo.nsrmc;
      _this.editFormTaxRateInfo.fplxdm=_this.editFormTaxplayerInfo.fplxdm;
      _this.listTaxRateInfo();
      _this.active = 2;
    }
  },

    //关闭抽屉
    back() {
      this.drawer = false;
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