<template>
  <div>
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col :span="24">
          <el-form-item :label="keyName">
            <el-checkbox-group v-model="checkboxsVal" size="mini" @change="setCheckbox">
              <el-checkbox-button v-for="(item,index) in label" :label="item.id" :key="index">{{item.label}} </el-checkbox-button>
            </el-checkbox-group>
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
  props: ["checkGroupData", "index"],
  data() {
    return {
      labelWidth: "",
      keyName: "",
      checkboxsVal: [],
      label: [],
      detail: "",
    };
  },
  mounted() {
    this.labelWidth = this.checkGroupData.data.labelWidth;
    this.keyName = this.checkGroupData.data.keyName;
    this.checkboxsVal = this.checkGroupData.data.checkboxsVal;
    this.label = this.checkGroupData.data.label;
    this.detail = this.checkGroupData.data.detail.replace(/[\r\n]/g, "<br/>");
  },
  methods: {
    setCheckbox() {
      this.checkGroupData.data.checkboxsVal = this.checkboxsVal;
      this.$emit("getCheck", this.checkGroupData, this.index);
    },
  },
};
</script>

<style>
</style>