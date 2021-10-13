<template>
  <div>
    <div class="rh-dialog-body">
      <div class="rh-table">
        <el-table ref="selectedTable" :data="tableData.records" stripe border @selection-change="handleSelectionChange">
          <template slot="empty">
            <div class="pic_nodata">
            </div>
          </template>
          <el-table-column align="center" type="selection" width="40"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="productName" label="产品名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="right" prop="amount" label="金额"></el-table-column>
          <el-table-column show-overflow-tooltip align="right" prop="discountAmount" label="折扣金额"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="purchaseTime" label="购买时长"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="effectTime" label="生效时间"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="endTime" label="到期时间"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="onDetail(scope.row.orderDetailId)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-for="(item,index) in arry" :key="index" style="margin-top: 30px;">
        <shop-radio v-if="item.type=='radio'" @getRadio="getradio" :index="index" :RadioData="item"></shop-radio>
      </div>
    </div>
    <el-divider content-position="right">金&#12288;额</el-divider>
    <div class="rh-page-content" style="padding: 0px;">
      <div class="rh-operate clearfix" style="padding-bottom: 0px;">
        <div class="rh-pull-right" style="width:100%">
          <div class="priceDiv" style="width:20px">
            <div class="priceUnit">元</div>
            <div class="priceUnit">元</div>
            <div class="priceUnit">元</div>
            <div class="priceUnit">元</div>
          </div>
          <div style="height:100px;float:right">
            <div class="priceQuantity">{{totalPrice}}</div>
            <div class="priceQuantity">{{discountPrice}}</div>
            <div class="priceQuantity">{{reductionPrice}}</div>
            <div class="priceQuantity">{{amountsPrice}}</div>
          </div>
          <div class="priceDiv" style="width:20px">
            <div class="priceSymbol">¥</div>
            <div class="priceSymbol">¥</div>
            <div class="priceSymbol">¥</div>
            <div class="priceSymbol">¥</div>
          </div>
          <div class="priceDiv">
            <div class="priceName">商品总价：</div>
            <div class="priceName">折&#12288;&#12288;扣：</div>
            <div class="priceName">满&#12288;&#12288;减：</div>
            <div class="priceName">应付金额：</div>
          </div>
        </div>
      </div>
    </div>
    <div class="rh-dialog-footer" style="padding-bottom: 5px;">
      <el-button type="primary" icon="el-icon-wallet" @click="toPay" :loading="loading">去支付</el-button>
      <el-button @click="close()" :loading="loading">关闭</el-button>
    </div>
    <div class="dailog">
      <el-dialog title="产品详细信息" :visible.sync="detail_Dialog" append-to-body>
        <DetailPage v-if="detail_Dialog" @back="back" :detailData="detailData"></DetailPage>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { formateDate2 } from "@/utils/tools.js";
import DetailPage from "../info/ProductDetail.vue";
import shopRadio from "./shopRadio.vue";
import validate from "@/utils/validate.js";

export default {
  components: {
    DetailPage,
    shopRadio,
  },

  props: ["renewData"],

  data() {
    return {
      loading: true,
      detail_Dialog: false,
      queryForm: {
        pageNo: 1,
        pageSize: 10,
      },
      page: {
        Total: 100,
        Size: [10, 20, 30],
        currentPage: 1,
      },
      tableData: [],
      detailData: {},
      hasSelectList: [],//已经选择的数据
      productList: [],//产品信息
      reductionList: [],//满减信息
      arry: [],
      totalPrice: 0,//商品总价
      discountPrice: 0,//折扣金额
      reductionPrice: 0,//满减金额
      amountsPrice: 0,//应付金额
      tr_sels: [],
    };
  },

  mounted() {
    this.init_Table();
  },

  methods: {

    //初始化表格
    init_Table() {
      let _this = this;
      let params = this.queryForm;
      _this.$set(params, "orderId", _this.renewData.orderId);
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
        _this.$apis.order + "/order/orderInfo/listProduct",
        params,
        function (res) {
          if (res.success) {
            _this.tableData = res.data;
            let list = _this.tableData.records;
            //对数据进行解析处理
            for (let i = 0; i < list.length; i++) {
              //日期解析
              if (
                list[i].endTime !== undefined &&
                list[i] !== "" &&
                list[i].endTime !== null
              ) {
                list[i].endTime = formateDate2(list[i].endTime);
              }
              //日期解析
              if (
                list[i].effectTime !== undefined &&
                list[i] !== "" &&
                list[i].effectTime !== null
              ) {
                list[i].effectTime = formateDate2(list[i].effectTime);
              }
              //购买时长解析
              if (list[i].purchaseTime != "") {
                list[i].purchaseTime = list[i].purchaseTime + " 年";
              }
              //金额解析
              if (list[i].amount != "") {
                list[i].amount = parseFloat(list[i].amount).toFixed(2);
              }
              //折扣金额解析
              if (list[i].discountAmount != "") {
                list[i].discountAmount = parseFloat(list[i].discountAmount).toFixed(2);
              }
            }
            _this.tableData.records = list;
            //购买时长
            _this.arry.push({
              type: "radio",
              data: {
                labelWidth: "120px",
                keyName: "购买时长",
                id: "time",
                value: "1",
                label: [
                  { id: "1", label: "1年" },
                  { id: "2", label: "2年" },
                  { id: "3", label: "3年" },
                  { id: "4", label: "4年" },
                  { id: "5", label: "5年" },
                  { id: "6", label: "6年" },
                  { id: "7", label: "7年" },
                  { id: "8", label: "8年" },
                  { id: "9", label: "9年" },
                  { id: "10", label: "10年" },
                ],
                detail: "",
              },
            });
            //默认全选
            _this.$refs.selectedTable.toggleAllSelection(_this.tableData);
            _this.getData();
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //获取订单产品信息、产品详细信息、计费规则、折扣信息、满减信息
    getData() {
      let _this = this;
      let orderId = _this.renewData.orderId;
      _this.$api.get(
        _this.$apis.order + "/order/renew/getData/" + orderId,
        {},
        function (res) {
          if (res.success) {
            _this.productList = res.data.productList;
            _this.reductionList = res.data.reductionList;
            _this.CalculateThePrice();
            _this.loading = false;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //获取勾选数据并计算价格
    //勾选变动时触发方法
    handleSelectionChange(val) {
      let _this = this;
      _this.tr_sels = val;
      _this.hasSelectList = val;
      _this.CalculateThePrice();
    },

    //计算价格
    //总价格=（组合加法*乘法+加法）*购买时间*折扣+短信包
    //续费无短信包
    CalculateThePrice() {
      let _this = this;
      let hasSelectList = _this.hasSelectList;//已经选择的数据
      let productList = _this.productList;//产品信息
      let reductionList = _this.reductionList;//满减信息
      let year = _this.arry[0].data.value;//购买时长
      _this.totalPrice = 0;//商品总价
      _this.discountPrice = 0;//折扣金额
      _this.reductionPrice = 0;//满减金额
      _this.amountsPrice = 0;//应付金额
      for (let i = 0; i < hasSelectList.length; i++) {
        let orderDetailId = hasSelectList[i].orderDetailId;
        let discount = 1;
        for (let j = 0; j < productList.length; j++) {
          if (orderDetailId == productList[j].orderDetailId) {
            let unitPrice = productList[j].unitPrice;
            //获取折扣（取符合要求的最小值）
            let discountTemp = [];
            let discountList = productList[j].discountList;
            if (discountList.length > 0) {
              for (let i = 0; i < discountList.length; i++) {
                if (year >= discountList[i].yearStart && year <= discountList[i].yearEnd) {
                  discountTemp.push(discountList[i].discount);
                }
              }
              if (discountTemp.length > 0) {
                if (discountTemp.length == 1) {
                  _this.discount = discountTemp[0];
                } else {
                  let arrTemp = discountTemp.sort((a, b) => a - b)
                  _this.discount = arrTemp[0];
                }
              }
            }

            let productTotalPrice = parseFloat(unitPrice) * parseInt(year);
            let productDiscountPrice = parseFloat(productTotalPrice) * (1 - parseFloat(_this.discount));
            _this.totalPrice += parseFloat(productTotalPrice);
            _this.discountPrice += parseFloat(productDiscountPrice);
            _this.$set(productList[j], "productTotalPrice", productTotalPrice);
            _this.$set(productList[j], "productDiscountPrice", productDiscountPrice);
          }
        }
      }
      let amountsMoney = parseFloat(_this.totalPrice) - parseFloat(_this.discountPrice);
      let reductionMoney = 0;
      //满减
      for (let j = 0; j < reductionList.length; j++) {
        if (amountsMoney >= parseFloat(reductionList[j].moneyBegin) && amountsMoney < parseFloat(reductionList[j].moneyEnd)) {
          reductionMoney = parseFloat(reductionList[j].reductionMoney);
        }
      }
      _this.amountsPrice = (parseFloat(amountsMoney) - parseFloat(reductionMoney)).toFixed(2);
      _this.totalPrice = _this.totalPrice.toFixed(2);
      _this.discountPrice = (0 - _this.discountPrice).toFixed(2);
      _this.reductionPrice = (0 - reductionMoney).toFixed(2);
    },

    //去支付
    toPay() {
      let _this = this;
      _this.loading = true;
      let checkedData = _this.tr_sels;
      let params = {};
      _this.$set(params, "checkedData", checkedData);
      _this.$set(params, "amountsPrice", _this.amountsPrice);
      _this.$set(params, "discountPrice", -_this.discountPrice);
      _this.$set(params, "reductionPrice", -_this.reductionPrice);
      _this.$set(params, "orderIdOld", _this.renewData.orderId);
      _this.$set(params, "year", _this.arry[0].data.value);
      _this.$set(params, "productList", _this.productList);
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
        _this.$apis.order + "/order/orderInfo/saveRenewOrder",
        params,
        function (res) {
          if (res.success) {
            _this.loading = false;
            //跳转支付页面
            _this.$router.push({
              path: '/main/Pay',
              query: {
                orderId: res.data,
                amountsPrice: _this.amountsPrice
              }
            });
          } else {
            _this.loading = false;
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    getradio(value, index) {
      this.arry[index] = value;
      this.CalculateThePrice();
    },

    //关闭
    close(formName) {
      this.detail_Dialog = false;
      this.$emit("back");
    },

    //详情
    onDetail(orderDetailId) {
      this.detail_Dialog = true;
      this.detailData = {
        orderDetailId: orderDetailId,
      };
    },

    back() {
      this.detail_Dialog = false;
    },

    //初始化分页
    init_page() {
      this.page.total = this.tableData.total;
      this.page.size = this.tableData.size;
      this.page.current = this.tableData.current;
    },

    //分页操作
    handleCurrentChange(val) {
      this.queryForm.pageNo = val;
      //更改分页后重新初始化页面
      this.init_Table();
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      //更改分页后重新初始化页面
      this.init_Table();
    },

  },
};
</script>

<style lang="less" scoped>
.el-dialog__headerbtn {
  right: 40px;
}
.priceDiv {
  width: 100px;
  height: 100px;
  float: right;
}
.priceUnit {
  float: right;
  font-size: 13px;
  width: 20px;
  margin-top: 5px;
  line-height: 20px;
}
.priceQuantity {
  font-size: 20px;
  text-align: right;
  color: #f53434;
  line-height: 26px;
}
.priceSymbol {
  float: right;
  width: 30px;
  font-size: 14px;
  margin-top: 5px;
  line-height: 20px;
}
.priceName {
  float: right;
  width: 100px;
  text-align: right;
  font-size: 13px;
  margin-top: 5px;
  font-weight: 500;
  line-height: 20px;
}
.rh-dialog-body {
  padding-bottom: 0px;
}
</style>