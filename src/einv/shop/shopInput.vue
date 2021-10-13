<template>
  <div>
    <el-form :label-width="labelWidth">
      <el-row :gutter="15">
        <el-col :span="6" style="padding-left: 0px; padding-right: 0px;">
          <el-form-item :label="keyName">
            <el-input v-model="value" @change="setInput" maxlength="4"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <div class="total-unit">单位/{{unit}}</div>
        </el-col>
      </el-row>
      <div class="p-content">
        <p class="content" v-html="detail">
        </p>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["InputData", "index"],
  data() {
    return {
      labelWidth: "",
      keyName: "",
      value: "",
      detail: "",
      unit: "",
    };
  },
  mounted() {
    this.labelWidth = this.InputData.data.labelWidth;
    this.keyName = this.InputData.data.keyName;
    this.value = this.InputData.data.value;
    this.detail = this.InputData.data.detail.replace(/[\r\n]/g, "<br/>");
    this.unit = this.InputData.data.unit;
  },
  methods: {
    setInput() {
      this.InputData.data.value = this.value;
      this.$emit("getInput", this.InputData, this.index);
    },
  },
};
</script>

<style>
</style>