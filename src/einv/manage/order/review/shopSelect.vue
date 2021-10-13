<template>
  <div>
    <span class="name" style="float:left;margin-top: 4px;font-size: 12px; color: #858688;margin-left: 30px;margin-bottom: 10px;">
      {{keyName}}
    </span>
    <el-select v-model="value" :placeholder="keyName" @change="setSelect" style="float: left;width: 180px;margin-bottom: 10px;">
      <el-option key="" label="未选择" value=""></el-option>
      <el-option v-for="item in label" :key="item.id" :label="item.label" :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: ["selectData", "index"],
  data() {
    return {
      labelWidth: "",
      keyName: "",
      value: "",
      label: [],
    };
  },
  mounted() {
    this.labelWidth = this.selectData.data.labelWidth;
    this.keyName = this.selectData.data.keyName;
    this.value = this.selectData.data.value;
    this.label = this.selectData.data.label;
  },
  methods: {
    setSelect() {
      this.selectData.data.value = this.value;
      this.$emit("getSelect", this.selectData, this.index);
    },
  },
};
</script>

<style>
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  box-shadow: 0px 0 0 0 #409eff;
}
</style>