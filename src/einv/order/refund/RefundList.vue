<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text"> 退款 </span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="tabs-wrap">
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
            <el-form-item prop="orderId">
              <el-input v-model="queryForm.orderId" placeholder="订单号"></el-input>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
            <el-button type="info" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
          </el-form>
          <div class="space10"></div>
        </div>
        <el-table :data="tableData.records" stripe border height="400" v-loading="loading">
          <template slot="empty">
            <div class="pic_nodata">
            </div>
          </template>
          <el-table-column show-overflow-tooltip align="center" fixed="left" prop="orderId" label="订单号" width="160"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="orderTypeName" label="订单类型" width="100"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="orderIdOld" label="原订单号" width="160"></el-table-column>
          <el-table-column show-overflow-tooltip align="right" prop="orderTotalMoney" label="金额" width="120"></el-table-column>
          <el-table-column show-overflow-tooltip align="right" prop="discountPrice" label="折扣金额" width="100"></el-table-column>
          <el-table-column show-overflow-tooltip align="right" prop="preferentialPrice" label="满减金额" width="100"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="payMethodName" label="支付方式" width="80"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="orderStatusName" label="订单状态" width="100"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="paymentTime" label="支付时间" width="150"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="createTime" label="创建时间" width="150"></el-table-column>
          <el-table-column align="left" label="操作" fixed="right" width="150">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="details(scope.row)">详情</el-button>
              <el-button class="table_btn" type="text" @click="refund(scope.row)">申请退款</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="rh-pagination">
          <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total"
            :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="dailog">
      <div class="dailog">
        <el-dialog title="订单详情" :visible.sync="isProduct" width="60%" append-to-body>
          <Product v-if="isProduct" @back="back" :productData="productData"></Product>
        </el-dialog>
      </div>
    </div>
    <div class="dailog">
      <div class="dailog">
        <el-dialog title="续费" :visible.sync="isRenew" width="60%" append-to-body>
          <Renew v-if="isRenew" @back="back" :renewData="renewData"></Renew>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { formateDate } from "@/utils/tools.js";
import Product from "../info/Product.vue";
import validate from "@/utils/validate.js";

export default {
  components: {
    Product,
  },

  data() {
    return {
      isProduct: false,
      isRenew: false,
      loading: false,
      productData: "",
      renewData: "",
      queryForm: {
        orderId: "",
        pageNo: 1,
        pageSize: 10,
      },
      page: {
        Total: 100,
        Size: [10, 20, 30],
        currentPage: 1,
      },
      tableData: [],
    }
  },

  mounted() {
    this.init_Table();
  },

  methods: {
    //搜索
    searchForm() {
      this.queryForm.pageNo = 1;
      this.init_Table();
    },

    //重置
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.queryForm.pageNo = 1;
      this.init_Table();
    },

    //初始化表格(获取可退费的订单)
    init_Table() {
      let _this = this;
      _this.tableData = [];
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
      _this.loading = true;
      this.$api.post(
        _this.$apis.order + "/order/refund/listReFundOrders/",
        params,
        function (res) {
          if (res.success) {
            _this.tableData = res.data;
            let list = _this.tableData.records;
            //对数据进行解析处理
            for (let i = 0; i < list.length; i++) {
              //订单类型
              if (list[i].orderType == "0") {
                _this.$set(list[i], "orderTypeName", "产品订单");
              } else if (list[i].orderType == "1") {
                _this.$set(list[i], "orderTypeName", "短信包订单");
              } else if (list[i].orderType == "2") {
                _this.$set(list[i], "orderTypeName", "续费订单");
              }
              //金额
              list[i].orderTotalMoney = parseFloat(list[i].orderTotalMoney).toFixed(2);
              list[i].discountPrice = parseFloat(list[i].discountPrice).toFixed(2);
              list[i].preferentialPrice = parseFloat(list[i].preferentialPrice).toFixed(2);
              //支付方式
              if (list[i].payMethod == "1") {
                _this.$set(list[i], "payMethodName", "支付宝");
              } else if (list[i].payMethod == "2") {
                _this.$set(list[i], "payMethodName", "微信");
              } else if (list[i].payMethod == "3") {
                _this.$set(list[i], "payMethodName", "线下支付");
              }
              //订单状态
              if (list[i].orderStatus == "0") {
                _this.$set(list[i], "orderStatusName", "待付款");
              } else if (list[i].orderStatus == "1") {
                _this.$set(list[i], "orderStatusName", "已付款-待审核");
              } else if (list[i].orderStatus == "2") {
                _this.$set(list[i], "orderStatusName", "财务确认");
              } else if (list[i].orderStatus == "3") {
                _this.$set(list[i], "orderStatusName", "完成");
              } else if (list[i].orderStatus == "4") {
                _this.$set(list[i], "orderStatusName", "申请退款");
              } else if (list[i].orderStatus == "5") {
                _this.$set(list[i], "orderStatusName", "退款管理员审核");
              } else if (list[i].orderStatus == "6") {
                _this.$set(list[i], "orderStatusName", "已退款");
              } else if (list[i].orderStatus == "7") {
                _this.$set(list[i], "orderStatusName", "未付款关闭");
              } else if (list[i].orderStatus == "8") {
                _this.$set(list[i], "orderStatusName", "未付款无效订单");
              } else if (list[i].orderStatus == "9") {
                _this.$set(list[i], "orderStatusName", "开票中");
              } else if (list[i].orderStatus == "10") {
                _this.$set(list[i], "orderStatusName", "开票完成");
              }
              //支付时间
              if (
                list[i].paymentTime !== undefined &&
                list[i] !== "" &&
                list[i].paymentTime !== null
              ) {
                list[i].paymentTime = formateDate(list[i].paymentTime);
              }
              //创建时间
              if (
                list[i].createTime !== undefined &&
                list[i] !== "" &&
                list[i].createTime !== null
              ) {
                list[i].createTime = formateDate(list[i].createTime);
              }
            }
            _this.tableData.records = list;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
          _this.loading = false;
        }
      );
    },

    //详情
    details(row) {
      let _this = this;
      let orderId = row.orderId;
      _this.isProduct = true;
      _this.productData = {
        orderId: orderId,
      };
    },

    //退款
    refund(row) {
      let _this = this;
      let orderId = row.orderId;
      let orderType = row.orderType;
      //产品订单判断该订单是否有续费的订单，如果有的话提示先退续费订单
      if (orderType == "0") {
        _this.$api.post(
          _this.$apis.order + "/order/refund/checkHasRenewOrder/" + orderId,
          {},
          function (res) {
            if (res.success) {
              _this.initiateRefund(orderId, orderType);
            } else {
              _this.$message({
                message: res.errorMsg,
                type: "error",
              });
            }
          }
        );
      } else {
        _this.initiateRefund(orderId, orderType);
      }
    },

    //发起退款
    initiateRefund(orderId, orderType) {
      let _this = this;
      _this.$confirm('是否发起退款申请?', '退款申请', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {};
        _this.$set(params, "orderId", orderId);
        _this.$set(params, "orderType", orderType);
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
          _this.$apis.order + "/order/refund/orderRefund",
          params,
          function (res) {
            if (res.success) {
              _this.init_Table();
              _this.$message({
                message: "已发起退款申请",
                type: "success",
              });
            } else {
              _this.$message({
                message: res.errorMsg,
                type: "error",
              });
            }
          }
        );
      }).catch(() => {
      });
    },

    //产品订单详情关闭
    back() {
      this.isProduct = false;
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

    //关闭dialog
    shutDown() {
      this.isSms = false;
    },


  }
}
</script>


<style lang="less">
</style>