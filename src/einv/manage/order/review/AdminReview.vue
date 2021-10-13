<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text"> 系统工单--管理员审核 </span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="tabs-wrap">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="rh-tabs" size="mini">
          <el-tab-pane label="待审核" name="0"></el-tab-pane>
          <el-tab-pane label="已审核" name="1"></el-tab-pane>
        </el-tabs>
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
            <el-form-item prop="workOrderSystemId">
              <el-input v-model="queryForm.workOrderSystemId" placeholder="工单编号" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item prop="workOrderSystemName">
              <el-input v-model="queryForm.workOrderSystemName" placeholder="工单名称" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item prop="orderId">
              <el-input v-model="queryForm.orderId" placeholder="订单号" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item prop="orderType">
              <el-select v-model="queryForm.orderType" placeholder="订单类型">
                <el-option key="" label="" value=""></el-option>
                <el-option key="0" label="产品订单" value="0"></el-option>
                <el-option key="1" label="短信包订单" value="1"></el-option>
                <el-option key="2" label="续费订单" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
            <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
          </el-form>
          <div class="space10"></div>
        </div>
        <el-table :data="tableData.records" stripe border height="400" v-loading="loading">
          <template slot="empty">
            <div class="pic_nodata">
            </div>
          </template>
          <el-table-column show-overflow-tooltip align="center" prop="workOrderSystemId" label="工单编号" width="170"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="workOrderSystemName" label="工单名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="stateName" label="工单状态" width="120"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="createTime" label="工单发起时间"></el-table-column>
          <el-table-column v-if="activeName == '1'" show-overflow-tooltip align="center" prop="modifyTime" label="审核时间"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="orderId" label="订单号" width="170"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="orderTypeName" label="订单类型" width="100"></el-table-column>
          <el-table-column align="left" label="操作" width="120">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" v-if="activeName == '0'" @click="review(scope.row)">审核
              </el-button>
              <el-button class="table_btn" type="text" v-if="activeName == '1'" @click="reviewDetail(scope.row)">审核详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="rh-pagination">
          <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total"
            :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
          </el-pagination>
        </div>
        <div class="space10"></div>
      </div>
    </div>
    <div class="dailog">
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
      <!-- 审核页面 -->
      <div class="drawer-container add" :key=1000>
        <el-drawer size="61.8%" :visible.sync="drawer" append-to-body>
          <Review v-if="drawer" @back="back" :reviewData="reviewData"></Review>
        </el-drawer>
      </div>
      <!-- 退款审核页面 -->
      <div class="drawer-container add" :key=1002>
        <el-drawer size="61.8%" :visible.sync="refundDrawer" append-to-body>
          <RefundReview v-if="refundDrawer" @back="back" :refundReviewData="refundReviewData"></RefundReview>
        </el-drawer>
      </div>
      <!-- 审核详情 -->
      <div class="drawer-container add" :key=1001>
        <el-drawer size="61.8%" :visible.sync="drawer1" append-to-body>
          <ReviewDetail v-if="drawer1" @back="back" :reviewDetailData="reviewDetailData"></ReviewDetail>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import { formateDate } from "@/utils/tools.js";
import Product from "./Product.vue";
import Review from "./ReviewTwo.vue";
import ReviewDetail from "./ReviewTwoDetail.vue";
import RefundReview from "./refund/AdminReview";
import validate from "@/utils/validate.js";

export default {
  components: {
    Product,
    Review,
    ReviewDetail,
    RefundReview,
  },

  data() {
    return {
      drawer: false,
      drawer1: false,
      refundDrawer: false,
      loading: false,
      activeName: '0',
      isSms: false,
      isProduct: false,
      smsTypeName: "",
      smsNum: "",
      smsPrice: "",
      productData: "",
      queryForm: {
        workOrderSystemId: "",
        workOrderSystemName: "",
        orderId: "",
        orderType: "",
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

    //tab页点击事件
    handleClick: function (tab, event) {
      this.activeName = tab.name;
      this.init_Table();
    },

    //初始化表格
    init_Table() {
      let _this = this;
      _this.tableData = [];
      let params = this.queryForm;
      _this.$set(params, "activeName", _this.activeName);
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
      _this.$api.post(
        _this.$apis.manage + "/manage/order/adminReview/listOrder ",
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
              } else {
                _this.$set(list[i], "payMethodName", "线下支付");
              }
              //工单状态
              if (list[i].state == "0") {
                _this.$set(list[i], "stateName", "新建");
              } else if (list[i].state == "1") {
                _this.$set(list[i], "stateName", "处理中");
              } else if (list[i].state == "2") {
                _this.$set(list[i], "stateName", "完成");
              } else {
                _this.$set(list[i], "stateName", "关闭工单");
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
              //审核时间
              if (
                list[i].modifyTime !== undefined &&
                list[i] !== "" &&
                list[i].modifyTime !== null
              ) {
                list[i].modifyTime = formateDate(list[i].modifyTime);
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
      if (row.orderType == "0") {
        _this.isProduct = true;
        _this.productData = {
          orderId: orderId,
        };
      } else if (row.orderType == "1") {
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

    //管理员审核
    review(row) {
      let _this = this;
      if (row.orderStatus == "4") {
        _this.refundDrawer = true;
        _this.refundReviewData = row;
      } else {
        _this.drawer = true;
        _this.reviewData = row;
      }
    },

    //审核详情
    reviewDetail(row) {
      this.drawer1 = true;
      this.reviewDetailData = row;
    },

    back() {
      this.drawer = false;
      this.drawer1 = false;
      this.refundDrawer = false;
      this.queryForm.pageNo = 1;
      this.init_Table();
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


<style lang="less" scoped>
.priceDiv {
  width: 100%;
  height: 25px;
}
.priceUnit {
  float: left;
  font-size: 12px;
  margin-top: 4px;
  margin-left: 5px;
}
.priceQuantity {
  float: left;
  font-size: 21px;
  text-align: right;
  margin-top: -2px;
  color: #f53434;
}
.priceName {
  float: left;
  width: 100px;
  text-align: right;
  font-size: 13px;
  font-weight: 600;
  margin-top: 2px;
}
</style>