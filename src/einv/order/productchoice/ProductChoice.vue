<style lang="less">
@import url("../../shop/shop.less");
</style>

<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text" :v-model="productName">{{productName}}购买</span>
        </div>
      </div>
    </div>
    <div class="shop">
      <div v-for="(item,index) in arry" :key="index">
        <shop-radio v-if="item.type=='radio'" @getRadio="getradio" :index="index" :RadioData="item"></shop-radio>
        <shop-check v-if="item.type=='checkgroup'" @getCheck="getcheck" :index="index" :checkGroupData="item">
        </shop-check>
        <shop-number v-if="item.type=='number'" @getNumber="getnumber" :index="index" :shopNumber="item"></shop-number>
        <shop-input v-if="item.type=='input'" @getInput="getinput" :index="index" :InputData="item"></shop-input>
        <shop-select v-if="item.type=='select'" @getSelect="getselect" :index="index" :selectData="item"></shop-select>
      </div>
      <shop-total :total="total" :discount="discount" :discountAmount="discountAmount"></shop-total>
      <div class="rh-page-content">
        <div class="rh-operate clearfix">
          <div class="rh-pull-right">
            <el-button type="primary" icon="el-icon-shopping-cart-2" @click="addShoppingCart" :loading="loading">加入购物车</el-button>
            <el-button type="primary" icon="el-icon-shopping-bag-2" @click="buyNow" :loading="loading">立即购买</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shopRadio from "@/einv/shop/shopRadio.vue";
import shopCheck from "@/einv/shop/shopCheck.vue";
import shopNumber from "@/einv/shop/shopNumber.vue";
import shopInput from "@/einv/shop/shopInput.vue";
import shopSelect from "@/einv/shop/shopSelect.vue";
import shopTotal from "@/einv/shop/shopTotal.vue";
import ShopSelect from "@/einv/shop/shopSelect.vue";
import validate from "@/utils/validate.js";
export default {
  components: {
    shopRadio,
    shopCheck,
    shopNumber,
    shopInput,
    shopTotal,
    shopSelect,
  },
  data() {
    ShopSelect;
    return {
      loading: false,
      productName: "",
      productId: "",
      arry: [],
      total: 0,//总价格
      smsOption: [],
      priceConfig: [], //单项计费价格配置信息
      priceConfig1: [], //组合计费价格配置信息
      singlePrice1: 0, //单项计费、加法价格
      singlePrice2: 0, //单项计费、组合加法价格
      combinedPrice1: 0, //组合计费、加法价格
      combinedPrice2: 0, //组合计费、组合加法价格
      discountArry: [],//折扣信息
      discount: 1,//折扣
      discountAmount: 0,//折扣金额
    };
  },

  created() {
    this.getParams();
  },

  mounted() {
    this.getPriceConfig();
    this.getProductChoice();
    this.getSmsOption();
    this.getDiscount();
  },

  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  },

  methods: {

    // 取到路由带过来的参数
    getParams() {
      var routerParams = this.$route.query;
      this.productId = routerParams.productId;
      this.getName();
      this.getPriceConfig();
      this.getProductChoice();
      this.getSmsOption();
      this.getDiscount();
    },

    //  获取产品名字
    getName() {
      let _this = this;
      _this.$api.get(
        _this.$apis.manage + "/manage/product/info/getName/" + _this.productId,
        {},
        function (res) {
          if (res.success) {
            _this.productName = res.data;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //加入购物车
    addShoppingCart() {
      let _this = this;
      if (_this.checkChoice()) {
        _this.loading = true;
        let params = {};
        _this.$set(params, "productId", _this.productId);
        _this.$set(params, "amount", _this.total);
        _this.$set(params, "discountAmount", _this.discountAmount);
        _this.$set(params, "arry", _this.arry);
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
          _this.$apis.order + "/order/productchoice/addShoppingCart",
          params,
          function (res) {
            if (res.success) {
              _this.$message({
                message: "加入购物车成功",
                type: "success",
              });
              _this.loading = false;
            } else {
              _this.loading = false;
              _this.$message({
                message: res.errorMsg,
                type: "error",
              });
            }
          }
        );
      }
    },

    //立即购买
    buyNow() {
      let _this = this;
      if (_this.checkChoice()) {
       
        let params = {};
        _this.$set(params, "productId", _this.productId);
        _this.$set(params, "amount", _this.total);
        _this.$set(params, "discountAmount", _this.discountAmount);
        _this.$set(params, "arry", _this.arry);
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
          _this.$apis.order + "/order/productchoice/addShoppingCart",
          params,
          function (res) {
            if (res.success) {
              _this.loading = false;
              //跳转已选服务列表
              _this.$router.push({ path: '/main/Selected' });
            } else {
              _this.loading = false;
              _this.$message({
                message: res.errorMsg,
                type: "error",
              });
            }
          }
        );
      }
    },

    //计算总价格
    //总价格=（组合加法*乘法+加法）*购买时间*折扣+短信包
    calculateTotal() {
      let _this = this;
      let arry = _this.arry;
      _this.singlePrice1 = 0;
      _this.singlePrice2 = 0;
      _this.combinedPrice1 = 0;
      _this.combinedPrice2 = 0;
      _this.total = 0;
      _this.discount = 1;
      _this.discountAmount = 0;
      _this.singlePriceTotal();
      _this.combinedPriceGroup();
      let timeObj = {};
      let smsObj = {};
      //取出购买时间和短信包
      for (let i = 0; i < arry.length; i++) {
        if (arry[i].data.id == "time") {
          timeObj = arry[i];
        }
        if (arry[i].data.id == "sms") {
          smsObj = arry[i];
        }
      }
      _this.total += _this.singlePrice2 + _this.combinedPrice2;//组合价法
      for (let i = 0; i < arry.length; i++) {
        if (arry[i].data.feeScale == "1") {//乘法
          _this.total *= parseInt(arry[i].data.value);
        }
      }
      _this.total += _this.singlePrice1 + _this.combinedPrice1;//加法
      let year = parseFloat(timeObj.data.value);
      _this.total *= year;//购买时间
      //获取折扣（取符合要求的最小值）
      let discountTemp = [];
      if (_this.discountArry.length > 0) {
        for (let i = 0; i < _this.discountArry.length; i++) {
          if (year >= _this.discountArry[i].yearStart && year <= _this.discountArry[i].yearEnd) {
            discountTemp.push(_this.discountArry[i].discount);
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
      _this.discountAmount = (parseFloat(_this.total) * (1 - parseFloat(_this.discount))).toFixed(2);//折扣金额
      _this.total = _this.total - _this.discountAmount;//折扣后的总金额
      if (smsObj.data.value != "") {
        for (let i = 0; i < smsObj.data.label.length; i++) {
          if (smsObj.data.value == smsObj.data.label[i].id) {
            _this.total += parseFloat(smsObj.data.label[i].smsPrice);//短信包
          }
        }
      }
      _this.total = _this.total.toFixed(2);
    },

    //获取产品选择详细信息
    getProductChoice() {
      let _this = this;
      _this.$api.post(
        _this.$apis.order +
        "/order/productchoice/getProductChoice/" +
        _this.productId,
        {},
        function (res) {
          if (res.success) {
            _this.arry = res.data;
            //时间
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
            //短信包
            _this.arry.push({
              type: "select",
              data: {
                labelWidth: "120px",
                keyName: "短信包",
                id: "sms",
                value: "",
                label: _this.smsOption,
                detail: "短信包不参与折扣和满减！",
              },
            });
            _this.calculateTotal();
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //获取折扣信息
    getDiscount() {
      let _this = this;
      let params = {};
      _this.$set(params, "productId", _this.productId);
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
        _this.$apis.order + "/order/productchoice/getDiscount",
        params,
        function (res) {
          if (res.success) {
            _this.discountArry = res.data;
             _this.calculateTotal();
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
            _this.smsOption = res.data;
             _this.calculateTotal();
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //获取全部价格配置信息
    getPriceConfig() {
      let _this = this;
      _this.$api.get(
        _this.$apis.order +
        "/order/productchoice/getPriceConfig/" +
        _this.productId,
        {},
        function (res) {
          if (res.success) {
            _this.priceConfig = res.data.priceConfig;
            _this.priceConfig1 = res.data.priceConfig1;
             _this.calculateTotal();
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //单项计费价格计算
    singlePriceTotal() {
      let _this = this;
      let arry = _this.arry;
      let priceConfig = _this.priceConfig;
      for (let i = 0; i < arry.length; i++) {
        let obj = arry[i].data;
        if (obj.feeType == "0") {//单项计费
          if (obj.hasSuperior == "Y") {//有下级（无下级,计费规则一定为乘法）
            if (obj.hasAddItem == "Y") {//有附加项
              for (let j = 0; j < obj.value.length; j++) {
                let value = obj.value[j];
                if (value.num != 0 && value.checked) {
                  //计算价格
                  for (let n = 0; n < priceConfig.length; n++) {
                    if (value.id == priceConfig[n].subAttrId1) {
                      _this.calculateThePrice("0", obj.feeScale, priceConfig[n], value.num);
                    }
                  }
                }
              }
            } else {//有下级,无附加项
              if (obj.isMultiple == "Y") { //多选
                let checkboxsVal = obj.checkboxsVal;
                for (let m = 0; m < checkboxsVal.length; m++) {
                  //计算价格
                  for (let n = 0; n < priceConfig.length; n++) {
                    if (checkboxsVal[m] == priceConfig[n].subAttrId1) {
                      _this.calculateThePrice("0", obj.feeScale, priceConfig[n], 0);
                    }
                  }
                }
              } else { //单选
                //计算价格
                for (let n = 0; n < priceConfig.length; n++) {
                  if (obj.value == priceConfig[n].subAttrId1) {
                    _this.calculateThePrice("0", obj.feeScale, priceConfig[n], 0);
                  }
                }
              }
            }
          }
        }
      }
    },

    //组合计费价格分组、计算(组合计费一定有下级)
    combinedPriceGroup() {
      let _this = this;
      let arry = _this.arry;
      let priceConfig1 = _this.priceConfig1;
      for (let i = 0; i < arry.length; i++) {
        arry[i].data.tag = "N";
      }
      for (let i = 0; i < arry.length; i++) {
        let obj = arry[i].data;
        if (obj.tag == "N") {
          for (let j = 0; j < priceConfig1.length; j++) {
            let arryTemp = [];
            if (
              obj.id == priceConfig1[j].mainAttrId1 ||
              obj.id == priceConfig1[j].mainAttrId2 ||
              obj.id == priceConfig1[j].mainAttrId3 ||
              obj.id == priceConfig1[j].mainAttrId4
            ) {
              for (let n = 0; n < arry.length; n++) {
                if (priceConfig1[j].mainAttrId1 == arry[n].data.id && arry[n].data.tag == "N") {
                  arryTemp.push(arry[n]);
                  arry[n].data.tag = "Y";
                }
              }
              for (let n = 0; n < arry.length; n++) {
                if (priceConfig1[j].mainAttrId2 == arry[n].data.id && arry[n].data.tag == "N") {
                  arryTemp.push(arry[n]);
                  arry[n].data.tag = "Y";
                }
              }
              if (priceConfig1[j].mainAttrId3 != "") {
                for (let n = 0; n < arry.length; n++) {
                  if (priceConfig1[j].mainAttrId3 == arry[n].data.id && arry[n].data.tag == "N") {
                    arryTemp.push(arry[n]);
                    arry[n].data.tag = "Y";
                  }
                }
              }
              if (priceConfig1[j].mainAttrId4 != "") {
                for (let n = 0; n < arry.length; n++) {
                  if (priceConfig1[j].mainAttrId4 == arry[n].data.id && arry[n].data.tag == "N") {
                    arryTemp.push(arry[n]);
                    arry[n].data.tag = "Y";
                  }
                }
              }
              if (arryTemp.length > 0) {
                this.combinedPriceTotal(arryTemp);
              }
            }
          }
        }
      }
    },

    //组合计费价格计算
    combinedPriceTotal(arryTemp) {
      let _this = this;
      let num = arryTemp.length;
      let flag = false;
      let priceConfig1 = _this.priceConfig1;
      //判断数组里有没有可多选的（最多只有一个可多选的）
      for (let i = 0; i < num; i++) {
        if (arryTemp[i].data.isMultiple == "Y") {
          flag = true;
        }
      }
      if (flag) {//有可多选的（最多只有一个可多选）
        for (let i = 0; i < num; i++) {
          if (arryTemp[i].data.isMultiple == "Y") {
            //取出可多选的对象
            let objTemp = arryTemp[i];
            this.$delete(arryTemp, i);
            //判断是否有附加项
            if (objTemp.data.hasAddItem == "Y") {//有附加项
              //找到匹配成功的规则,取出价格
              for (let n = 0; n < priceConfig1.length; n++) {
                let configObj = priceConfig1[n];
                for (let m = 0; m < objTemp.data.value.length; m++) {
                  let childObjTemp = objTemp.data.value[m];
                  if (childObjTemp.checked && childObjTemp.num != 0) {
                    if (
                      _this.checkConfig(objTemp.data.id, configObj) &&
                      _this.checkConfig(childObjTemp.id, configObj) &&
                      _this.checkConfig(arryTemp[0].data.id, configObj) &&
                      _this.checkConfig(arryTemp[0].data.value, configObj)
                    ) {
                      if (num == 3) {
                        if (
                          _this.checkConfig(arryTemp[1].data.id, configObj) &&
                          _this.checkConfig(arryTemp[1].data.value, configObj)
                        ) {
                          if (num == 4) {
                            if (
                              _this.checkConfig(arryTemp[1].data.id, configObj) &&
                              _this.checkConfig(arryTemp[1].data.value, configObj)
                            ) {
                              _this.calculateThePrice("1", arryTemp[0].data.feeScale, configObj, childObjTemp.num);
                            }
                          } else {
                            _this.calculateThePrice("1", arryTemp[0].data.feeScale, configObj, childObjTemp.num);
                          }
                        }
                      } else {
                        _this.calculateThePrice("1", arryTemp[0].data.feeScale, configObj, childObjTemp.num);
                      }
                    }
                  }
                }
              }
            } else {//无附加项
              //找到匹配成功的规则,取出价格
              for (let n = 0; n < priceConfig1.length; n++) {
                let configObj = priceConfig1[n];
                let checkboxsVal = objTemp.data.checkboxsVal;//选中的数组，里面存的小类ID
                for (let j = 0; j < checkboxsVal.length; j++) {
                  if (
                    _this.checkConfig(objTemp.data.id, configObj) &&
                    _this.checkConfig(checkboxsVal[j], configObj) &&
                    _this.checkConfig(arryTemp[0].data.id, configObj) &&
                    _this.checkConfig(arryTemp[0].data.value, configObj)
                  ) {
                    if (num == 3) {
                      if (
                        _this.checkConfig(arryTemp[1].data.id, configObj) &&
                        _this.checkConfig(arryTemp[1].data.value, configObj)
                      ) {
                        if (num == 4) {
                          if (
                            _this.checkConfig(arryTemp[2].data.id, configObj) &&
                            _this.checkConfig(arryTemp[2].data.value, configObj)
                          ) {
                            _this.calculateThePrice("1", arryTemp[0].data.feeScale, configObj, 0);
                          }
                        } else {
                          _this.calculateThePrice("1", arryTemp[0].data.feeScale, configObj, 0);
                        }
                      }
                    } else {
                      _this.calculateThePrice("1", arryTemp[0].data.feeScale, configObj, 0);
                    }
                  }
                }
              }
            }
          }
        }
      } else {//全是单选
        //找到匹配成功的规则,取出价格
        for (let j = 0; j < priceConfig1.length; j++) {
          let configObj = priceConfig1[j];
          if (
            _this.checkConfig(arryTemp[0].data.id, configObj) &&
            _this.checkConfig(arryTemp[0].data.value, configObj) &&
            _this.checkConfig(arryTemp[1].data.id, configObj) &&
            _this.checkConfig(arryTemp[1].data.value, configObj)
          ) {
            if (num == 3) {
              if (
                _this.checkConfig(arryTemp[2].data.id, configObj) &&
                _this.checkConfig(arryTemp[2].data.value, configObj)
              ) {
                if (num == 4 &&
                  _this.checkConfig(arryTemp[3].data.id, configObj) &&
                  _this.checkConfig(arryTemp[3].data.value, configObj)
                ) {
                  _this.calculateThePrice("1", arryTemp[0].data.feeScale, configObj, 0);
                }
              }
            } else {
              _this.calculateThePrice("1", arryTemp[0].data.feeScale, configObj, 0);
            }
          }
        }
      }
    },

    //匹配价格配置规则
    checkConfig(id, configObj) {
      if (
        id == configObj.mainAttrId1 ||
        id == configObj.mainAttrId2 ||
        id == configObj.mainAttrId3 ||
        id == configObj.mainAttrId4 ||
        id == configObj.subAttrId1 ||
        id == configObj.subAttrId2 ||
        id == configObj.subAttrId3 ||
        id == configObj.subAttrId4
      ) {
        return true;
      } else {
        return false;
      }
    },

    //计算价格
    calculateThePrice(feeType, feeScale, configObj, quantity) {
      let _this = this;
      if (feeType == "0") {//单项计费
        if (feeScale == "0") {//加法（组合计费都为加法或者都为组合加法）
          if (quantity == 0) {
            _this.singlePrice1 += parseFloat(configObj.price);
          } else {
            _this.singlePrice1 +=
              parseFloat(configObj.price) * parseInt(quantity);
          }
        } else if (feeScale == "2") {//组合加法
          if (quantity == 0) {
            _this.singlePrice2 += parseFloat(configObj.price);
          } else {
            _this.singlePrice2 += parseFloat(configObj.price) * parseInt(quantity);
          }
        }
      } else if (feeType == "1") {//组合计费
        if (feeScale == "0") {//加法（组合计费都为加法或者都为组合加法）
          if (quantity == 0) {//没有附加项
            _this.combinedPrice1 += parseFloat(configObj.price);
          } else {
            _this.combinedPrice1 += parseFloat(configObj.price) * parseInt(quantity);
          }
        } else if (feeScale == "2") {//组合加法
          if (quantity == 0) {
            _this.combinedPrice2 += parseFloat(configObj.price);
          } else {
            _this.combinedPrice2 += parseFloat(configObj.price) * parseInt(quantity);
          }
        }
      }
    },

    //对用户选择情况进行校验
    checkChoice() {
      let _this = this;
      let arry = _this.arry;
      for (let i = 0; i < arry.length; i++) {
        let obj = arry[i];
        if (obj.type == "radio") {
          let objTemp = obj.data;
          if (objTemp.value == "") {
            _this.$message({
              message: "请选择" + objTemp.keyName,
              type: "error",
            });
            return false;
          }
        }
        if (obj.type == "checkgroup") {
          let objTemp = obj.data;
          if (objTemp.checkboxsVal.length == 0) {
            _this.$message({
              message: "请选择" + objTemp.keyName,
              type: "error",
            });
            return false;
          }
        }
        if (obj.type == "input") {
          const reg = /^[1-9]\d*$/;
          let objTemp = obj.data;
          if (objTemp.value == "") {
            _this.$message({
              message: "请填写" + objTemp.keyName,
              type: "error",
            });
            return false;
          }
          if (!reg.test(objTemp.value)) {
            _this.$message({
              message: objTemp.keyName + "只能输入大于0的整数",
              type: "error",
            });
            return false;
          }
        }
        if (obj.type == "number") {
          let objTemp = obj.data.value;
          let num = 0;
          for (let j = 0; j < objTemp.length; j++) {
            let valueTemp = objTemp[j];
            if (valueTemp.checked && valueTemp.num != 0) {
              num++;
            }
          }
          if (num == 0) {
            _this.$message({
              message: "请添加" + obj.data.keyName,
              type: "error",
            });
            return false;
          }
        }
      }
      return true;
    },

    getradio(value, index) {
      this.arry[index] = value;
      this.calculateTotal();
    },
    getcheck(value, index) {
      this.arry[index] = value;
      this.calculateTotal();
    },
    getinput(value, index) {
      this.arry[index] = value;
      let _this = this;
      const reg = /^[1-9]\d*$/;
      if (!reg.test(value.data.value)) {
        _this.$message({
          message: value.data.keyName + "只能输入大于0的整数",
          type: "error",
        });
        return false;
      } else {
        this.calculateTotal();
      }
    },
    getnumber(value, index) {
      this.arry[index] = value;
      this.calculateTotal();
    },
    gettotal(value) { },

    getselect(value, index) {
      this.arry[index] = value;
      this.calculateTotal();
    },
  },
};
</script>
