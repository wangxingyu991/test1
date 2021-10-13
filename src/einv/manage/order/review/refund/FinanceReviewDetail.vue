<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title">财务审核 - 退款</div>
    </div>
    <div class="rh-drawer-body">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="订单信息" name="1">
          <div>
            <el-row>
              <el-col :span="8">
                <span class="name">
                  订单号：{{refundReviewDetailData.orderId}}
                </span>
              </el-col>
              <el-col :span="8">
                <span class="name">
                  订单类型：{{refundReviewDetailData.orderTypeName}}
                </span>
              </el-col>
              <el-col :span="8">
                <span class="name">
                  订单状态：{{refundReviewDetailData.orderStatusName}}
                </span>
                <el-button style="padding-left: 0px;float:right;line-height: 20px;color: #5b77e0;border: none;" class="table_btn" type="text" @click="details()">订单详情</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <span class="name">
                  应付金额：{{refundReviewDetailData.orderTotalMoney}}元
                </span>
              </el-col>
              <el-col :span="8">
                <span class="name">
                  折扣金额：{{refundReviewDetailData.discountPrice}}元
                </span>
              </el-col>
              <el-col :span="8">
                <span class="name">
                  满减金额：{{refundReviewDetailData.preferentialPrice}}元
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
                支付方式：{{refundReviewDetailData.payMethodName}}
              </span>
            </el-col>
            <el-col :span="8">
              <span class="name" v-if="refundReviewDetailData.payMethod == '1'||refundReviewDetailData.payMethod == '2'">
                支付流水号：{{payNo}}
              </span>
            </el-col>
            <el-col :span="8">
              <span class="name">
                支付时间：{{refundReviewDetailData.paymentTime}}
              </span>
            </el-col>
            <el-col :span="8" v-if="refundReviewDetailData.payMethod == '3'">
              <span class="name">
                入账金额：{{refundReviewDetailData.orderTotalMoney}}元
              </span>
            </el-col>
          </el-row>
          <el-row v-if="refundReviewDetailData.payMethod == '1'||refundReviewDetailData.payMethod == '2'">
            <el-col :span="8" v-if="refundReviewDetailData.payMethod == '2'">
              <span class="name">
                微信账号：{{wechatId}}
              </span>
            </el-col>
            <el-col :span="8" v-if="refundReviewDetailData.payMethod == '1'">
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
          <el-row v-if="refundReviewDetailData.payMethod == '3'">
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
        <el-collapse-item title="管理员审核" name="4">
          <el-col :span="24">
            <span class="name" style="float:left">
              审核意见：
            </span>
            <div class="name" style="float:left" v-html="operateIdea1"></div>
          </el-col>
        </el-collapse-item>
        <el-collapse-item title="财务审核" name="3">
          <el-col :span="20">
            <span class="name">
              支付凭证：
            </span>
            <el-upload action="1" list-type="picture-card" ref="upload" :limit="1" accept="image/jpeg,image/gif,image/png" :multiple="false" :on-change="handleFileUpload" :file-list="this.fileList"
              :auto-upload="false" style="margin-left: 68px;margin-top: -20px;">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-col>
          <el-col :span="24">
            <span class="name" style="float:left">
              审核意见：
            </span>
            <div class="name" style="float:left" v-html="operateIdea"></div>
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
import Product from "../Product.vue";
import validate from "@/utils/validate.js";

export default {
  components: {
    Product,
  },

  props: ["refundReviewDetailData"],

  data() {
    return {
      loading: false,
      isProduct: false,
      isSms: false,
      showName: "",
      activeNames: ['1', '2', '3','4'],
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
      operateIdea1:"",
      smsTypeName: "",
      smsNum: "",
      smsPrice: "",

      fileList: [{ name: "", url: "" }],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileBase64: "",
      fileName: "",
    };
  },

  mounted() {
    this.getDate();
    this.getFinanceReview();
    this.getAdminReview();
    //添加一个图片后隐藏图片添加
    $(".el-upload--picture-card").css("display", "none");
  },

  methods: {
    //图片上传
    handleFileUpload(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 1MB!");
        this.$refs.upload.clearFiles();
        return false;
      }
      this.fileName = file.name;
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
      this.getBase64(file.raw)
        .then((res) => {
          this.fileBase64 = res;
          //this.$refs["form"].validateField("fileName");
        })
        .catch((e) => {
          console.log(e);
        });
      if (fileList.length >= 1) {
      }
    },
    //图片转bas64
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },
    //图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //订单详情
    details() {
      let _this = this;
      let orderId = _this.refundReviewDetailData.orderId;
      if (_this.refundReviewDetailData.orderType == "0" || _this.refundReviewDetailData.orderType == "2") {//0、产品订单2、续费订单
        _this.isProduct = true;
        _this.productData = {
          orderId: orderId,
          orderType: _this.refundReviewDetailData.orderType,
        };
      } else if (_this.refundReviewDetailData.orderType == "1") {
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
      _this.$api.get(
        _this.$apis.manage + "/manage/order/financeReview/getDataRefund/" +
        _this.refundReviewDetailData.orderId,
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
            _this.dialogImageUrl = res.data.productImg;
            _this.fileList[0].name = res.data.fileName;
            _this.fileList[0].url = res.data.productImg;
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
        _this.$apis.manage + "/manage/order/adminReview/getFinanceReviewRefund/" +
        _this.refundReviewDetailData.orderId,
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
        _this.$apis.manage + "/manage/order/financeReview/getAdminReview/" +
        _this.refundReviewDetailData.orderId,
        {},
        function (res) {
          if (res.success) {
            _this.operateIdea1 = res.data.operateIdea.replace(/[\r\n]/g, "<br/>");
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
.el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
}
</style>