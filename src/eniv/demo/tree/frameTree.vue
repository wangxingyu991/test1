<style lang="less" >

</style>
<template>
  <div :style="{ height: frameSize_height-15 + 'px' }" class="clearfix frmtree">
    <div class="rh-page-left" :style="{ height: frameSize_height - 40 + 'px'}">
      <div class="tree-wrap">
        <div class="tree-serach">
          <el-input
            placeholder="请输入内容"
            v-model="filterText"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="tree-body">
          <el-tree
            ref="tree"
            :filter-node-method="filterNode"
            :data="tree_Data"
            :props="defaultProps"
            @node-click="TreeNodeClick"
          ></el-tree>
        </div>
      </div>
    </div>
    <div class="rh-page-right" :style="{ height: frameSize_height -15 + 'px',width: frameSize_width-280-30 + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ["treeData"],
  data() {
    return {
      //框架样式
      frameSize_width: this.$storage.state.frameSize.width,
      frameSize_height:  this.$storage.state.frameSize.height - 15,
      //树型选择器
      filterText: "",
      //菜单树的数据
      tree_Data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  computed: {
    ...mapState({
        width: state => state.frameSize.width,
        height: state => state.frameSize.height,
    }),
    frame_width(){
      return this.$store.state.frameSize.width;
    },
    //vuex参数监听获取页面高度
    frameProps() {
      return this.$storage.state.frameSize.width;
    },
  },
  //vuex参数监听
  watch: {
    //
    frameSize_width(newVal,oldVal){
      //alert(newVal);
      console.log(newVal);
    },
    //树形菜单
    treeData(newVal) {
      this.tree_Data = newVal;
    },
    //监听框架属性
    frameProps: {
      immediate: true,
      handler: function (newval) {
        this.frameSize_width = newval;
        //this.frame_height = newval;
      },
    },
    //过滤数
    filterText: function (val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    //初始化高度
    //this.frame_height = this.$storage.state.frameSize.height - 65; //总高度-头部50px-上边距15px
    this.tree_Data = this.treeData;
    //alert(this.frameSize_height);
  },
  methods: {
    //树形菜单过滤函数
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //树形菜单击后事件
    TreeNodeClick(data, node) {
      if (node.childNodes.length == 0) {
        // this.val_dwssjg = data.label;
        this.dialogVisible = false;
      }
      this.$emit("getnode", node);
    },
  },
};
</script>

<style lang="less">
.frmtree{
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
    z-index: 98;
    transition-duration: 0.5s;
  }
  .rh-page-content {
    margin-bottom: 0px;
  }
  .el-main {
    margin: -40px 0px 0px;
  }
}
</style>