
<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title">管理员审核 - {{showName}}</div>
    </div>
    <div class="rh-drawer-body">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="订单信息" name="1">
          <div>
            <el-row>
              <el-col :span="8">
                <span class="name">
                  订单号：{{reviewDetailData.orderId}}
                </span>
              </el-col>
              <el-col :span="8">
                <span class="name">
                  订单类型：{{reviewDetailData.orderTypeName}}
                </span>
              </el-col>
              <el-col :span="8">
                <span class="name">
                  订单状态：{{reviewDetailData.orderStatusName}}
                </span>
                <el-button style="padding-left: 0px;float:right;line-height: 20px;color: #5b77e0;border: none;" class="table_btn" type="text" @click="details()">订单详情</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <span class="name">
                  应付金额：{{reviewDetailData.orderTotalMoney}}元
                </span>
              </el-col>
              <el-col :span="8">
                <span class="name">
                  折扣金额：{{reviewDetailData.discountPrice}}元
                </span>
              </el-col>
              <el-col :span="8">
                <span class="name">
                  满减金额：{{reviewDetailData.preferentialPrice}}元
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span class="name">
                  租&#12288;&#12288;户：{{tenantName}}
                </span>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="支付信息" name="2">
          <el-row>
            <el-col :span="8">
              <span class="name">
                支付方式：{{reviewDetailData.payMethodName}}
              </span>
            </el-col>
            <el-col :span="8">
              <span class="name" v-if="reviewDetailData.payMethod == '1'||reviewDetailData.payMethod == '2'">
                支付流水号：{{payNo}}
              </span>
            </el-col>
            <el-col :span="8">
              <span class="name">
                支付时间：{{reviewDetailData.paymentTime}}
              </span>
            </el-col>
            <el-col :span="8" v-if="reviewDetailData.payMethod == '3'">
              <span class="name">
                入账金额：{{reviewDetailData.orderTotalMoney}}元
              </span>
            </el-col>
          </el-row>
          <el-row v-if="reviewDetailData.payMethod == '1'||reviewDetailData.payMethod == '2'">
            <el-col :span="8" v-if="reviewDetailData.payMethod == '2'">
              <span class="name">
                微信账号：{{wechatId}}
              </span>
            </el-col>
            <el-col :span="8" v-if="reviewDetailData.payMethod == '1'">
              <span class="name">
                支付宝账号：{{alipayId}}
              </span>
            </el-col>
            <el-col :span="8">
              <span class="name">
                费&#12288;&#12288;&#12288;率：{{payRate}}
              </span>
            </el-col>
            <el-col :span="8">
              <span class="name">
                入账金额：{{preferentialPrice}}
              </span>
            </el-col>
          </el-row>
          <el-row v-if="reviewDetailData.payMethod == '3'">
            <el-col :span="8">
              <span class="name">
                账&#12288;&#12288;号：{{accountNo}}
              </span>
            </el-col>
            <el-col :span="8">
              <span class="name">
                账户名称：{{accountName}}
              </span>
            </el-col>
            <el-col :span="8">
              <span class="name">
                联系方式：{{phone}}
              </span>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="财务审核" name="3" v-if="reviewDetailData.orderStatus != '4'&&reviewDetailData.orderStatus != '5'&&reviewDetailData.orderStatus != '6'">
          <el-col :span="24">
            <span class="name" style="float:left">
              审核意见：
            </span>
            <div class="name" style="float:left" v-html="operateIdea"></div>
          </el-col>
        </el-collapse-item>
        <el-collapse-item title="管理员审核" name="4">
          <el-col :span="24">
            <span class="name" style="float:left">
              审核意见：
            </span>
            <div class="name" style="float:left" v-html="operateIdea1"></div>
          </el-col>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="rh-dialog-footer">
      <el-button @click="close()">关闭</el-button>
    </div>
    <div class="dailog">
      <el-dialog title="订单详情" :visible.sync="isProduct" width="60%" append-to-body>
        <Product v-if="isProduct" @back="back" :productData="productData"></Product>
      </el-dialog>
    </div>
    <el-dialog title="短信包信息" :visible.sync="isSms" width="40%" style="margin-top: 15vh;" append-to-body>
      <div class="priceDiv" style="padding-bottom: 20px;">
        <div class="priceName">名称：</div>
        <div class="priceName" style="text-align: left;">{{smsTypeName}}</div>
        <div class="space20" style="margin-bottom: 10px;"></div>
        <div class="priceName">数量：</div>
        <div class="priceName" style="width: 180px;font-size: 14px;margin-top: 3px;text-align: left;">{{smsNum}}
        </div>
        <div class="space20" style="margin-bottom: 10px;"></div>
        <div class="priceName">价格：</div>
        <div class="priceQuantity" style="text-align: left;">{{smsPrice}}</div>
        <div class="priceUnit" style="text-align: left;">元</div>
      </div>
      <div class="space20" style="margin-bottom: 15px;"></div>
      <div class="rh-dialog-footer" style="padding-bottom: 5px;">
        <el-button @click="shutDown()">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Product from "./Product.vue";
import validate from "@/utils/validate.js";

export default {
  components: {
    Product,
  },

  props: ["reviewDetailData"],

  data() {
    return {
      loading: false,
      isProduct: false,
      isSms: false,
      showName: "",
      activeNames: ['1', '2', '3', '4'],
      tenantName: "",
      payNo: "",
      wechatId: "",
      alipayId: "",
      payRate: "",
      preferentialPrice: "",
      accountNo: "",
      accountName: "",
      phone: "",
      operateIdea: "",
      operateIdea1: "",
      smsTypeName: "",
      smsNum: "",
      smsPrice: "",
    };
  },

  mounted() {
    this.getDate();
    this.getFinanceReview();
    this.getAdminReview();
  },

  methods: {
    //订单详情
    details() {
      let _this = this;
      let orderId = _this.reviewDetailData.orderId;
      if (_this.reviewDetailData.orderType == "0" || _this.reviewDetailData.orderType == "2") {//0、产品订单2、续费订单
        _this.isProduct = true;
        _this.productData = {
          orderId: orderId,
          orderType: _this.reviewDetailData.orderType,
        };
      } else if (_this.reviewDetailData.orderType == "1") {
        //获取短信包详情
        _this.$api.post(
          _this.$apis.order + "/order/orderInfo/getSms/" + orderId,
          {},
          function (res) {
            if (res.success) {
              _this.smsTypeName = res.data.smsTypeName;
              _this.smsNum = res.data.smsNum;
              _this.smsPrice = parseFloat(res.data.smsPrice).toFixed(2);
              _this.isSms = true;
            } else {
              _this.$message({
                message: res.errorMsg,
                type: "error",
              });
            }
          }
        );
      }
    },

    //产品订单详情关闭
    back() {
      this.isProduct = false;
    },

    //关闭dialog
    shutDown() {
      this.isSms = false;
    },

    //获取支付信息和租户信息
    getDate() {
      let _this = this;
      if (_this.reviewDetailData.orderStatus == "4" || _this.reviewDetailData.orderStatus == "5" || _this.reviewDetailData.orderStatus == "6") {
        _this.showName = "退款";
      } else {
        if (_this.reviewDetailData.orderType == "0") {
          _this.showName = "产品购买";
        } else if (_this.reviewDetailData.orderType == "1") {
          _this.showName = "短信包购买";
        } else if (_this.reviewDetailData.orderType == "2") {
          _this.showName = "续费";
        }
      }
      _this.$api.get(
        _this.$apis.manage + "/manage/order/financeReview/getData/" +
        _this.reviewDetailData.orderId,
        {},
        function (res) {
          if (res.success) {
            let orderPay = res.data.orderPay;
            let tenant = res.data.tenant;
            _this.payNo = orderPay.payNo;
            _this.wechatId = orderPay.wechatId;
            _this.alipayId = orderPay.alipayId;
            _this.payRate = (orderPay.payRate * 100) + '%';
            _this.preferentialPrice = orderPay.preferentialPrice;
            _this.accountNo = orderPay.accountNo;
            _this.accountName = orderPay.accountName;
            _this.phone = orderPay.phone;
            _this.tenantName = tenant.tenantName;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //获取财务审核意见
    getFinanceReview() {
      let _this = this;
      _this.$api.get(
        _this.$apis.manage + "/manage/order/adminReview/getFinanceReview/" +
        _this.reviewDetailData.orderId,
        {},
        function (res) {
          if (res.success) {
            _this.operateIdea = res.data.operateIdea.replace(/[\r\n]/g, "<br/>");
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //获取管理员审核意见
    getAdminReview() {
      let _this = this;
      _this.$api.get(
        _this.$apis.manage + "/manage/order/adminReview/getAdminReview/" +
        _this.reviewDetailData.workOrderSystemId,
        {},
        function (res) {
          if (res.success) {
            _this.operateIdea1 = res.data.resolution.replace(/[\r\n]/g, "<br/>");
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //关闭
    close() {
      //关闭抽屉
      this.$emit("back");
    },

  },
};
</script>

<style lang="less">
.el-dialog__headerbtn {
  right: 40px;
}
.el-row {
  margin-bottom: 5px;
}
.el-collapse-item__content {
  padding-bottom: 0px;
}
</style>