<template>
  <div :style="{ height: frame_height + 'px' }" class="clearfix framelr">
    <div class="rh-page-left" :style="{ height: framel_height + 'px' }">
      <slot name="left"></slot>
    </div>
    <div class="rh-page-right" :style="{ height: framer_height + 'px' }">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //样式变量
      framel_height: "",
      framer_height: "",
    };
  },
  computed: {
    //vuex参数监听获取页面高度
    frameProps() {
      return this.$storage.state.frameSize.height;
    },
  },
  //vuex参数监听
  watch: {
    frameProps: {
      immediate: true,
      handler: function (newval) {
        alert(newval);
        this.framel_height = newval;
      },
    }
  },
  mounted() {
    //初始化高度
    this.framel_height = this.$storage.state.frameSize.height - 40; //总高度-头部50px-上边距15px
    alert(this.$storage.state.frameSize.height);
    this.framer_height = this.$storage.state.frameSize.height - 15; //总高度-头部50px-上边距15px
  },
  methods: {
  },
};
</script>

<style lang="less">
.framelr{
  .rh-page-hint {
    margin-bottom: 20px;
  }
  .flex {
    display: block;
  }
  .rh-page-left {
    padding: 20px;
    width: 240px;
    overflow: auto;
    background: #fff;
    position: absolute;
    left: 0px;
    top: 0px;
  }
  .rh-page-right {
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 15px;
    position: absolute;
    top: 0px;
    left: 278px;
    right: 0px;
    overflow: auto;
    z-index: 999;
  }
  .rh-page-content {
    margin-bottom: 0px;
  }
  .el-main {
    margin: -40px 0px 0px;
  }
}
</style>