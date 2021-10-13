<template>
  <div>
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col :span="24">
          <el-form-item :label="keyName">
            <el-radio-group v-model="value" @change="setRadio">
              <el-radio-button :label="item.id" v-for="(item,index) in label" :key="index">{{item.label}}</el-radio-button>
            </el-radio-group>
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
  props: ["RadioData", "index"],
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
    this.labelWidth = this.RadioData.labelWidth;
    this.keyName = this.RadioData.keyName;
    this.value = this.RadioData.value;
    this.label = this.RadioData.label;
    this.detail = this.RadioData.detail.replace(/[\r\n]/g, "<br/>");
  },
  methods: {
    setRadio() {
      this.RadioData.data.value = this.value;
      this.$emit("getRadio", this.RadioData, this.index);
    },
  },
};
</script>

<style>
</style>