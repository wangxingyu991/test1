<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text"> 支付信息 </span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="page-title">产品支付</div>
      <div class="space20"></div>
      <div class="priceDiv" style="padding-bottom: 20px;">
        <div class="priceName">支付金额：</div>
        <div class="priceSymbol">¥</div>
        <div class="priceQuantity">{{amountsPrice}}</div>
        <div class="priceUnit">元</div>
        <div class="priceName">订单号：</div>
        <div class="priceSymbol">{{orderId}}</div>
      </div>
      <div class="remarks">温馨提示：订单提交成功，请您在30分钟内完成支付，否则订单会被取消。</div>
      <div class="space20"></div>
    </div>
    <div class="rh-page-content" style="height: 350px;">
      <div class="page-title">支付渠道</div>
      <div class="space20"></div>
      <el-button type="primary" @click="WeChatPay" style="margin-left: 50px;margin-right: 50px;">微信支付</el-button>
      <el-button type="primary" @click="aliPay">支付宝支付</el-button>
      <div class="space20"></div>
      <div class="remarks">如果您选择第三方支付机构账户支付时，请遵守第三方机构的规定进行操作。您在第三方支付机构页面上进行的任何操作及其产生的任何<br />法律后果，将按照您于第三方支付机构之间签订的合同处理。本网站不承担任何责任。</div>
      <el-divider></el-divider>
      <el-button type="primary" @click="offlinePayments" style="margin-left: 50px;margin-right: 50px;">线下支付</el-button>
      <div class="space20"></div>
      <div class="remarks">如果您选择第三方支付机构账户支付时，请遵守第三方机构的规定进行操作。您在第三方支付机构页面上进行的任何操作及其产生的任何<br />法律后果，将按照您于第三方支付机构之间签订的合同处理。本网站不承担任何责任。</div>
      <div class="space20"></div>
    </div>
    <div class="dailog">
      <el-dialog title="请付款到该账户！" :visible.sync="isDialog" width="40%" style="margin-top: 15vh;" append-to-body>
        <div class="priceDiv" style="padding-bottom: 20px;">
          <div class="priceName">账户名称：</div>
          <div class="priceName" style="text-align: left;">{{accountName}}</div>
          <div class="priceName">账号：</div>
          <div class="priceName" style="width: 180px;font-size: 14px;margin-top: 4px;text-align: left;">{{accountNo}}</div>
        </div>
        <div class="priceDiv" style="padding-bottom: 20px;">
          <div class="priceName">开户行：</div>
          <div class="priceName" style="text-align: left;">{{accountAddress}}</div>
        </div>
        <div class="space20"></div>
        <div class="rh-dialog-footer">
          <el-button @click="confirm()" :loading="loading">确认</el-button>
        </div>
      </el-dialog>
      <div class="dailog">
        <el-dialog title="微信支付" :visible.sync="isWxDialog" width="35%" style="margin-top: 10vh;" append-to-body @close="closeDialog">
          <el-card class="box-card" style="width: 480px;margin-bottom: 35px;">
            <div slot="header">
              <span>扫码支付<span style="color:#8d8b8b;float:right;font-size: 10px;margin-top: 2px">使用微信APP扫码完成支付</span></span>
            </div>
            <div class="bottom clearfix" style="float:left">
              <img :src="'data:image/png;base64,'+imgurl" alt="">
            </div>
            <div class="nrDiv">
              <div class="priceName" style="width: 55px; height:10px">订单号：</div>
              <div class="priceName" style="text-align: left;margin-top: 3px;width: 160px;">{{orderId}}</div>
              <div class="countdown">支付剩余时间：<br />{{minute}}:{{second}}</div>
              <div class="priceName" style="text-align:left">支付金额</div>
              <div class="money">
                <span class="rmb">¥</span>
                <span class="moneyspan">{{amountsPrice}}</span>
              </div>
            </div>
          </el-card>
        </el-dialog>
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
      isDialog: false,
      isWxDialog: false,
      orderId: '',
      amountsPrice: 0,
      accountNo: '',
      accountName: '',
      accountAddress: '',
      imgurl: '',
      timer: '',
      time: '',
      num: 0,
      minutes: 5,
      seconds: 0
    };
  },
  created() {
    this.getParams();
  },

  mounted() {
    this.getAccount();
    this.num = 0;
  },

  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams',
    second: {
      handler(newVal) {
        this.numm(newVal)
      }
    },
    minute: {
      handler(newVal) {
        this.numm(newVal)
      }
    }
  },

  computed: {
    second: function () {
      return this.numm(this.seconds)
    },
    minute: function () {
      return this.numm(this.minutes)
    }
  },

  methods: {
    // 取到路由带过来的参数
    getParams() {
      var routerParams = this.$route.query;
      this.orderId = routerParams.orderId;
      this.amountsPrice = routerParams.amountsPrice;
    },

    //获取收款账户信息
    getAccount() {
      let _this = this;
      _this.$api.get(
        _this.$apis.manage + "/manage/order/account/getAccount",
        {},
        function (res) {
          if (res.success) {
            _this.accountNo = res.data.accountNo;
            _this.accountName = res.data.accountName;
            _this.accountAddress = res.data.accountAddress;
          }
        }
      );
    },

    //支付宝支付
    aliPay() { },

    //微信支付
    WeChatPay() {
      let _this = this;
      _this.minutes = 5;
      _this.seconds = 0;
      _this.imgurl = "";
      _this.add();
      _this.$api.get(
        _this.$apis.order + "/order/orderInfo/wechatQueryOrder/" + _this.orderId,
        {},
        function (res) {
          if (res.success) {
            _this.$message({
              message: "该订单已支付！",
              type: "success",
            });
            _this.$router.push({ path: '/main/OrderInfo' });
          } else {
            _this.num = 0;
          
            let params = {};
            _this.$set(params, "orderId", _this.orderId);
            _this.$set(params, "amountsPrice", _this.amountsPrice);

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
              _this.isWxDialog = true;
            _this.$api.post(
              _this.$apis.order + "/order/orderInfo/getQRcode",
              params,
              function (res) {
                if (res.success) {
                  _this.isWxDialog = true;
                  _this.imgurl = res.data;
                  _this.timer = setInterval(_this.checkPayment, 3000);
                } else {
                  _this.$message({
                    message: res.errorMsg,
                    type: "error",
                  });
                }
              }
            );
          }
        }
      );
    },

    //dialog关闭停止定时器
    closeDialog() {
      let _this = this;
      _this.imgurl = "";
      clearInterval(_this.timer);
      clearInterval(_this.time);
    },

    //检测微信是否支付成功,成功后跳转订单页面
    //每三秒检测一次，若微信支付一直未回调，检测超过指定次数后，就手动查询微信订单是否支付成功
    checkPayment() {
      let _this = this;
      if (_this.num < 98) {
        _this.num++;
        _this.$api.get(
          _this.$apis.order + "/order/orderInfo/checkPayment/" + _this.orderId,
          {},
          function (res) {
            if (res.success) {
              clearInterval(_this.timer);
              clearInterval(_this.time);
              _this.$message({
                message: "支付成功！",
                type: "success",
              });
              _this.$router.push({ path: '/main/OrderInfo' });
            }
          }
        );
      } else {
        clearInterval(_this.timer);
        clearInterval(_this.time);
        _this.$api.get(
          _this.$apis.order + "/order/orderInfo/wechatQueryOrder/" + _this.orderId,
          {},
          function (res) {
            if (res.success) {
              _this.$message({
                message: "支付成功！",
                type: "success",
              });
              _this.$router.push({ path: '/main/OrderInfo' });
            }
          }
        );
      }
    },

    //线下支付
    offlinePayments() {
      let _this = this;
      let params = {};
      _this.$set(params, "orderId", _this.orderId);
      _this.$set(params, "amountsPrice", _this.amountsPrice);
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
        _this.$apis.order + "/order/orderInfo/offlinePayments",
        params,
        function (res) {
          if (res.success) {
            _this.isDialog = true;
          } else {
            _this.$message({
              message: "支付失败" + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //线下支付确认支付后保存支付信息，跳转订单页面
    confirm() {
      let _this = this;
      _this.$router.push({ path: '/main/OrderInfo' });
    },

    numm(n) {
      return n < 10 ? '0' + n : '' + n
    },

    add() {
      var _this = this
      _this.time = window.setInterval(function () {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59
          _this.minutes -= 1
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          _this.seconds = 0
          window.clearInterval(_this.time)
          _this.$message({
            message: "支付超时！",
            type: "error",
          });
          _this.isWxDialog = false;
        } else {
          _this.seconds -= 1
        }
      }, 1000)
    },
  },

}
</script>

<style lang="less" scoped>
.priceDiv {
  width: 100%;
  height: 25px;
}
.priceUnit {
  float: left;
  font-size: 12px;
  margin-top: 3px;
  margin-left: 5px;
}
.priceQuantity {
  float: left;
  font-size: 21px;
  text-align: right;
  margin-top: -2px;
  color: #f53434;
}
.priceSymbol {
  float: left;
  width: 20px;
  font-size: 14px;
  margin-top: 3px;
}
.priceName {
  float: left;
  width: 100px;
  text-align: right;
  font-size: 13px;
  font-weight: 600;
  margin-top: 2px;
}
.remarks {
  font-size: 12px;
  margin-left: 35px;
  color: #7d7d7d;
}
.el-card__body {
  padding: 10px;
  height: 180px;
}
.el-dialog .el-dialog__body {
  border-bottom: 0px solid transparent;
}
.nrDiv {
  float: right;
  height: 180px;
  width: 250px;
}
.countdown {
  height: 40px;
  width: 200px;
  float: left;
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 10px;
  color: #ff6300;
  text-align: center;
}
.money {
  height: 40px;
  width: 200px;
  float: left;
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 10px;
}
.rmb {
  line-height: 61px;
  font-family: PingFangSC-Regular;
  font-size: 22px;
  color: #f7603e;
  vertical-align: 1px;
}
.moneyspan {
  font-family: Impact;
  color: #f7603e;
  font-size: 36px;
}
</style>