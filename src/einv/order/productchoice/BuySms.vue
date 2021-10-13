<style lang="less">
@import url("../../shop/shop.less");
</style>

<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">短信包购买</span>
        </div>
      </div>
    </div>
    <div class="shop" style="height:500px">
      <div class="imgDiv"><img src="../../../assets/images/sms.gif" alt="" height="270" width="330" style="margin-left:10px;margin-top:40px"></div>
      <div class="smsDiv">
        <div class="smstitle">短信包</div>
        <div class="smsdetail">帮助企业实现纸电一体化，适用各种开票场景和终端，为轻量化、自动化、集中化、智能化而打造</div>
        <div class="sldiv">请选择：</div>
        <div v-for="(item,index) in arry" :key="index">
          <shop-radio v-if="item.type=='radio'" @getRadio="getradio" :index="index" :RadioData="item"></shop-radio>
        </div>
        <div class="sldiv">数量：{{smsNum}}条</div>
        <div class="money">
          <span class="rmb">¥</span>
          <span class="moneyspan">{{smsPrice}}</span>
          <span style="color: #7d7b7b;" v-show="this.reductionPrice!=0">
            &#12288;(已优惠 {{reductionPrice}} 元)
          </span>
        </div>
        <div class="rh-operate clearfix">
          <div class="rh-pull-left">
            <el-button type="primary" icon="el-icon-shopping-bag-2" @click="buyNow" :loading="loading">立即购买</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shopRadio from "@/einv/shop/shopRadio.vue";
import validate from "@/utils/validate.js";
export default {
  components: {
    shopRadio,
  },
  data() {
    return {
      loading: false,
      productName: "",
      productId: "",
      smsList: [],
      smsTypeId: "",
      smsPrice: 0,
      reductionPrice: 0,//满金金额
      reductionList: [],//所有满减信息
      smsNum: 0,
      arry: [],
    };
  },

  mounted() {
    this.getSmsOption();
    this.getReduction();
  },

  methods: {

    //立即购买
    buyNow() {
      let _this = this;
      _this.loading = true;
      if (_this.smsTypeId == "") {
        _this.loading = false;
        _this.$message({
          message: "请选择短信包！",
          type: "error",
        });
        return false;
      }
      let params = {};
      _this.$set(params, "smsTypeId", _this.smsTypeId);
      _this.$set(params, "smsPrice", _this.smsPrice);
      _this.$set(params, "reductionPrice", _this.reductionPrice);
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
      this.$api.post(
        _this.$apis.order + "/order/orderInfo/saveSMSOrder",
        params,
        function (res) {
          if (res.success) {
            _this.loading = false;
            //跳转支付页面
            _this.$router.push({
              path: '/main/Pay',
              query: {
                orderId: res.data,
                amountsPrice: _this.smsPrice,
              }
            });
          } else {
            _this.loading = false;
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //获取满减信息
    getReduction() {
      let _this = this;
      _this.reductionPrice = 0;
      let reductionMoney = 0
      //获取满减价格
      _this.$api.get(
        _this.$apis.order + "/order/productchoice/getReduction",
        {},
        function (res) {
          if (res.success) {
            _this.reductionList = res.data;
          }
        }
      );
    },

    //获取短信包数据
    getSmsOption() {
      let _this = this;
      _this.$api.get(
        _this.$apis.order + "/order/productchoice/getSmsOption",
        {},
        function (res) {
          if (res.success) {
            _this.smsList = res.data;
            for (let i = 0; i < _this.smsList.length; i++) {
              _this.smsList[i].label = _this.smsList[i].smsTypeName;
            }
            _this.arry.push({
              type: "radio",
              data: {
                labelWidth: "0px",
                keyName: "",
                id: "sms",
                value: "",
                label: _this.smsList,
                detail: "",
              },
            });
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    getradio(value, index) {
      let _this = this;
      _this.arry[index] = value;
      _this.smsTypeId = value.data.value;
      _this.reductionPrice = 0;
      for (let i = 0; i < _this.smsList.length; i++) {
        if (_this.smsTypeId == _this.smsList[i].id) {
          _this.smsPrice = _this.smsList[i].smsPrice.toFixed(2);
          _this.smsNum = _this.smsList[i].smsNum;
        }
      }
      let list = _this.reductionList;
      for (let j = 0; j < list.length; j++) {
        if (_this.smsPrice >= parseFloat(list[j].moneyBegin) && _this.smsPrice < parseFloat(list[j].moneyEnd)) {
          _this.reductionPrice = parseFloat(list[j].reductionMoney).toFixed(2);
        }
      }
      _this.smsPrice -= _this.reductionPrice;
    },

  },
};
</script>

<style lang="less" scoped>
.imgDiv {
  width: 350px;
  height: 350px;
  float: left;
  border: 1px solid #bbbaba;
  margin-left: 30px;
  margin-top: 30px;
}
.smsDiv {
  width: 500px;
  height: 350px;
  float: left;
  margin-left: 30px;
  margin-top: 30px;
}
.smstitle {
  color: #6c7180;
  letter-spacing: 0;
  line-height: 28px;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 20px;
}
.smsdetail {
  max-width: 444px;
  min-height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 14px;
  color: #6c7180;
  letter-spacing: 0;
  line-height: 24px;
  font-weight: 400;
  margin-bottom: 30px;
}
.sldiv {
  max-width: 444px;
  min-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 12px;
  color: #6c7180;
  letter-spacing: 0;
  font-weight: 400;
}
.money {
  height: 40px;
  width: 350px;
  float: left;
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 30px;
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
