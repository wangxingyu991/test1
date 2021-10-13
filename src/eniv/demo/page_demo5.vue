<style lang="less">
@import url("./shop/shop.less");
</style>
<template>
  <div class="shop">
    <div v-for="(item,index) in arry" :key="index">
      <shop-radio v-if="item.type=='radio'" @getRadio="getradio" :index="index" :RadioData="item.data"></shop-radio>
      <shop-check v-if="item.type=='checkgroup'" @getCheck="getcheck" :index="index" :checkGroupData="item.data"></shop-check>
      <shop-number v-if="item.type=='number'" @getNumber="getnumber" :index="index" :shopNumber="item.data"></shop-number>
      <shop-input v-if="item.type=='input'" @getInput="getinput" :index="index" :InputData="item.data"></shop-input>
      <shop-select v-if="item.type=='select'" @getSelect="getselect" :index="index" :selectData="item.data"></shop-select>
    </div>
    <shop-total :total="total"></shop-total>
  </div>
</template>

<script>
import shopRadio from "./shop/shopRadio.vue";
import shopCheck from "./shop/shopCheck.vue";
import shopNumber from "./shop/shopNumber.vue";
import shopInput from "./shop/shopInput.vue";
import shopTotal from "./shop/shopTotal.vue";
import shopSelect from "./shop/shopSelect.vue";
export default {
  components: {
    shopRadio,
    shopCheck,
    shopNumber,
    shopInput,
    shopTotal,
    shopSelect
  },
  data() {
    return {
      arry: [
        {
          type: "radio", //radio
          data: {
            labelWidth: "120px",
            keyName: "产品名称：",
            value: "",
            label: [
              { id: "1", label: "基础版" },
              { id: "2", label: "专业版" },
              { id: "3", label: "专家版" },
              { id: "4", label: "Plus版" },
            ],
            detail:
              "我的资源当前仅支持如下服务类型及区域的查询，更多服务及区域持续上线中。",
          },
        },
        {
          type: "checkgroup",
          data: {
            labelWidth: "120px",
            keyName: "产品年限选择：",
            checkboxsVal: [],
            label: [
              { id: "1", label: "虚拟UKEY" },
              { id: "2", label: "报税盘" },
              { id: "3", label: "UKEY" },
              { id: "4", label: "金税卡" },
              { id: "5", label: "金税盘" },
              { id: "6", label: "税控盘" },
              { id: "7", label: "其他盘" },
              { id: "8", label: "金税U盾" },
            ],
            detail:
              "我的资源当前仅支持如下服务类型及区域的查询，更多服务及区域持续上线中。",
          },
        },
        {
          type: "input",
          data: {
            labelWidth: "120px",
            keyName: "购买税号数量：",
            value: "",
            detail:
              "我的资源当前仅支持如下服务类型及区域的查询，更多服务及区域持续上线中",
          },
        },
        {
          type: "number",
          data: {
            labelWidth: "120px",
            keyName: "我的",
            detail: "11111111111111",
            value: [
              {
                id: "1",
                label: "虚拟UKEY",
                checked: false,
                num: 0,
                unit: "单位/个",
              },
              {
                id: "2",
                label: "UKEY",
                checked: false,
                num: 0,
                unit: "单位/个",
              },
              {
                id: "2",
                label: "金税卡",
                checked: false,
                num: 0,
                unit: "单位/个",
              },
              {
                id: "4",
                label: "金税盘",
                checked: false,
                num: 0,
                unit: "单位/个",
              },
              {
                id: "5",
                label: "报税盘",
                checked: false,
                num: 0,
                unit: "单位/个",
              },
            ],
          },
        },
        {
          type: "select", //radio
          data: {
            labelWidth: "120px",
            keyName: "短信包类型：",
            value: "",
            label: [
              { id: "1", label: "200条" },
              { id: "2", label: "500条" },
              { id: "3", label: "1000条" },
              { id: "4", label: "5000条" },
            ],
            detail:
              "我的资源当前仅支持如下服务类型及区域的查询，更多服务及区域持续上线中。/n撒旦发生发 第三个发射点发顺丰 ",
          },
        },
      ],
      total: 1000,
    };
  },

  methods: {
    getradio(value, index) {
      this.arry[index] = value;
      console.log(this.arry);
    },
    getcheck(value, index) {
      this.arry[index] = value;
      console.log(this.arry);
    },
    getinput(value, index) {
      this.arry[index] = value;
      console.log(this.arry);
    },
    getnumber(value, index) {
      this.arry[index] = value;
      console.log(this.arry);
    },
    gettotal(value) {
      console.log("总计金额" + this.arry);
    },
    getselect(value, index) {
      this.arry[index] = value;
      console.log(this.arry);
    },
  },
};
</script>

<style>
</style>