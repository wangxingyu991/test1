<template>
  <div>
    <div class="rh-dialog-body">
      <div class="rh-table">
        <el-table ref="selectedTable" :data="tableData.records" stripe border height="350" v-loading="loading">
          <template slot="empty">
            <div class="pic_nodata">
            </div>
          </template>
          <el-table-column show-overflow-tooltip align="left" prop="productName" label="产品名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="right" prop="amount" label="金额"></el-table-column>
          <el-table-column show-overflow-tooltip align="right" prop="discountAmount" label="折扣金额"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="purchaseTime" label="购买时长"></el-table-column>
          <!-- <el-table-column show-overflow-tooltip align="center" prop="effectTime" label="生效时间"></el-table-column> -->
          <el-table-column show-overflow-tooltip align="center" prop="endTime" label="到期时间"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="onDetail(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rh-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total"
          :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
        </el-pagination>
      </div>
    </div>
    <div class="rh-dialog-footer" style="padding-bottom: 5px;">
      <el-button @click="close()">关闭</el-button>
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
import DetailPage from "./ProductDetail.vue";
import validate from "@/utils/validate.js";

export default {
  components: {
    DetailPage,
  },

  props: ["productData"],

  data() {
    return {
      detail_Dialog: false,
      loading: false,
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
      _this.$set(params, "orderId", _this.productData.orderId);
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

    //关闭
    close(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.$emit("back");
    },

    //详情
    onDetail(row) {
      let _this = this;
      _this.detail_Dialog = true;
      let orderType = _this.productData.orderType;
      if (orderType == "2") {//续费订单
        _this.detailData = {
          orderDetailId: row.orderDetailIdOld,
        };
      } else {
        _this.detailData = {
          orderDetailId: row.orderDetailId,
        };
      }
    },

    back() {
      this.detail_Dialog = false;
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

  },
};
</script>

<style lang="less">
.el-dialog__headerbtn {
  right: 40px;
}
</style>