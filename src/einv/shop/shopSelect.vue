<template>
  <div>
    <el-form :label-width="labelWidth">
      <el-row :gutter="15">
        <el-col :span="6" style="padding-left: 0px; padding-right: 0px;">
          <el-form-item :label="keyName">
            <el-select v-model="value" :placeholder="keyName" @change="setSelect" style="margin-bottom: 10px;">
              <el-option key="" label="未选择" value=""></el-option>
              <el-option v-for="item in label" :key="item.id" :label="item.label" :value="item.id"></el-option>
            </el-select>
            <div class="p-content">
              <p class="content" v-html="detail">
              </p>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
      detail: "",
    };
  },
  mounted() {
    this.labelWidth = this.selectData.data.labelWidth;
    this.keyName = this.selectData.data.keyName;
    this.value = this.selectData.data.value;
    this.label = this.selectData.data.label;
    this.detail = this.selectData.data.detail.replace(/[\r\n]/g, "<br/>");
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