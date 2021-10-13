
<style lang="less">
@import url("./shop.less");
</style>
<template>
  <div>
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col :span="24">
          <el-form-item :label="keyName" style=" margin-bottom: 0px;">
            <el-row :gutter="12">
              <el-col :span="8" v-for="(item,index) in value" :key="index" style="padding-left: 0px;">
                <div class="border-dotted">
                  <div class="select-item">
                    <el-checkbox v-model="item.checked" :label="item.id" size="mini" @change="setValue">{{item.label}}</el-checkbox>
                  </div>
                  <div class="number-item">
                    <el-input-number size="mini" :min="0" v-model="item.num" :disabled="false" @change="setValue"></el-input-number>
                  </div>
                  <div class="unit-item">
                    <span class="uint">单位/{{item.unit}}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
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
  props: ["shopNumber", "index"],
  data() {
    return {
      labelWidth: "",
      keyName: "",
      value: [],
      detail: "",
    };
  },
  mounted() {
    this.labelWidth = this.shopNumber.labelWidth;
    this.keyName = this.shopNumber.keyName;
    this.detail = this.shopNumber.detail.replace(/[\r\n]/g, "<br/>");
    this.value = this.shopNumber.value;
  },
  methods: {
    setValue() {
      this.shopNumber.value = this.value;
      this.$emit("getNumber", this.shopNumber, this.index);
    },
  },
};
</script>

<style>
</style>