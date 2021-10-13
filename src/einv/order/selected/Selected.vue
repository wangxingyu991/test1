<style lang="less">
@import url("../../shop/shop.less");
</style>

<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">已选服务列表</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-table">
        <el-table ref="selectedTable" :data="tableData.records" stripe border @selection-change="handleSelectionChange" height="350" v-loading="loading1">
          <template slot="empty">
            <div class="pic_nodata">
            </div>
          </template>
          <el-table-column align="center" type="selection" width="40"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="productName" label="产品名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="right" prop="amount" label="金额"></el-table-column>
          <el-table-column show-overflow-tooltip align="right" prop="discountAmount" label="折扣金额"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="purchaseTime" label="购买时长"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="createTime" label="创建时间"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="onDetail(scope.row.userProductSelectedId)">详情</el-button>
              <el-button class="table_btn" type="text" @click="delate_fn(scope.row.userProductSelectedId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rh-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total"
          :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
        </el-pagination>
      </div>
      <div class="rh-page-content">
        <div class="rh-operate clearfix" style="padding-bottom: 0px;">
          <div class="rh-pull-right" style="width:100%;margin-bottom: 20px;">
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
          <div class="rh-pull-right">
            <el-button type="primary" icon="el-icon-wallet" @click="toPay" :loading="loading">去支付</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="dailog">
      <el-dialog title="已选服务详细信息" :visible.sync="detail_Dialog" append-to-body>
        <DetailPage v-if="detail_Dialog" @back="back" :detailData="detailData"></DetailPage>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import DetailPage from "./SelectedDetail.vue";
import { formateDate } from "@/utils/tools.js";
import validate from "@/utils/validate.js";

export default {
  components: {
    DetailPage,
  },

  data() {
    return {
      loading: true,
      detail_Dialog: false,
      loading1: false,
      totalPrice: 0,//商品总价
      discountPrice: 0,//折扣金额
      reductionPrice: 0,//满减金额
      amountsPrice: 0,//应付金额
      reductionList: [],//所有满减信息
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
      hasSelectList: [],//已经选择的id组成的数组
      //表格选择
      tr_sels: [],
      detailData: {},
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
      _this.loading1 = true;
      this.$api.post(
        _this.$apis.order + "/order/productchoice/listSelected",
        params,
        function (res) {
          if (res.success) {
            _this.tableData = res.data;
            let list = _this.tableData.records;
            //对数据进行解析处理
            for (let i = 0; i < list.length; i++) {
              //日期解析
              if (
                list[i].createTime !== undefined &&
                list[i] !== "" &&
                list[i].createTime !== null
              ) {
                list[i].createTime = formateDate(list[i].createTime);
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
            //默认全选
            _this.$refs.selectedTable.toggleAllSelection(_this.tableData);

          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
          _this.loading1 = false;
        }
      );
    },

    //获取勾选数据并计算价格
    //勾选变动时触发方法
    handleSelectionChange(val) {
      let _this = this;
      _this.tr_sels = val;
      _this.totalPrice = 0;
      _this.discountPrice = 0;
      _this.reductionPrice = 0;
      _this.amountsPrice = 0;
      let totalMoney = 0
      let discountMoney = 0
      let reductionMoney = 0
      let amountsMoney = 0
      //获取满减价格
      _this.$api.get(
        _this.$apis.order + "/order/productchoice/getReduction",
        {},
        function (res) {
          if (res.success) {
            _this.reductionList = res.data;
            let reductionList = _this.reductionList;
            let checkedData = _this.tr_sels;
            for (let i = 0; i < checkedData.length; i++) {
              amountsMoney += parseFloat(checkedData[i].amount);
              discountMoney += parseFloat(checkedData[i].discountAmount);
            }
            for (let j = 0; j < reductionList.length; j++) {
              if (amountsMoney >= parseFloat(reductionList[j].moneyBegin) && amountsMoney < parseFloat(reductionList[j].moneyEnd)) {
                reductionMoney = parseFloat(reductionList[j].reductionMoney);
              }
            }
            totalMoney = amountsMoney + discountMoney;
            amountsMoney -= reductionMoney;
            _this.totalPrice = totalMoney.toFixed(2);
            _this.discountPrice = (0 - discountMoney).toFixed(2);
            _this.reductionPrice = (0 - reductionMoney).toFixed(2);
            _this.amountsPrice = amountsMoney.toFixed(2);
            _this.loading = false;
          } else {
            _this.reductionList = res.data;
            let checkedData = _this.tr_sels;
            for (let i = 0; i < checkedData.length; i++) {
              amountsMoney += parseFloat(checkedData[i].amount);
              discountMoney += parseFloat(checkedData[i].discountAmount);
            }
            totalMoney = amountsMoney + discountMoney;
            _this.totalPrice = totalMoney.toFixed(2);
            _this.discountPrice = (0 - discountMoney).toFixed(2);
            _this.reductionPrice = (0).toFixed(2);
            _this.amountsPrice = amountsMoney.toFixed(2);
            _this.loading = false;
          }
        }
      );
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
        _this.$apis.order + "/order/orderInfo/saveOrder",
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

    //详情
    onDetail(userProductSelectedId) {
      this.detail_Dialog = true;
      this.detailData = {
        userProductSelectedId: userProductSelectedId,
      };
    },

    back() {
      this.detail_Dialog = false;
      this.queryForm.pageNo = 1;
      this.init_Table();
    },

    //删除
    delate_fn(userProductSelectedId) {
      let _this = this;
      _this
        .$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          _this.$api.delete(
            _this.$apis.order + "/order/productchoice/deleteSelected/" + userProductSelectedId,
            {},
            function (res) {
              if (res.success) {
                _this.init_Table();
                _this.$message({
                  message: "删除成功",
                  type: "success",
                });
              } else {
                _this.$message({
                  message: "删除失败," + res.errorMsg,
                  type: "error",
                });
              }
            }
          );
        });
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

  }
}
</script>

<style lang="less" scoped>
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
</style>