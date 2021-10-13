<style lang="less" >
</style>
<template>
  <div class="clearfix ftb">
    <div class="rh-page-left" :style="{ height: frame_height- 40 + 'px' }">
      <div class="tree-wrap">
        <div class="tree-serach">
          <el-input placeholder="请输入内容" v-model="filterText" class="input-with-select" maxlength="100">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="tree-body">
          <el-tree ref="tree" :filter-node-method="filterNode" :data="tree_Data" :props="defaultProps" node-key="id" :highlight-current="true" :default-expanded-keys="defaultExpandedKeys"
            @node-click="TreeNodeClick"></el-tree>
        </div>
      </div>
    </div>
    <div class="rh-page-right" :style="{ height: frame_height-15  + 'px' }">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ["treeData", "defaultExpandedKeys"],
  data() {
    return {
      //树型选择器
      filterText: "",
      tree_Data: [],//菜单树的数据
      defaultProps: {
        children: "children",
        label: "label",
      },
      //样式变量
      frame_height: this.$storage.state.frameSize.height,
    };
  },
  //vuex参数监听
  watch: {
    '$storage.state.frameSize.height'() {
      this.frame_height = this.$storage.state.frameSize.height;
    },
    treeData(newVal) {
      this.tree_Data = newVal;
    },
    filterText: function (val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    //初始化高度
    this.frame_height = this.$storage.state.frameSize.height; //内容区高度
    this.tree_Data = this.treeData;
    this.dragControllerDiv();
  },
  methods: {
    dragControllerDiv: function () {
      var resize = document.getElementsByClassName("resize");
      var left = document.getElementsByClassName("left");
      var mid = document.getElementsByClassName("right");
      var box = document.getElementsByClassName("box");
      for (let i = 0; i < resize.length; i++) {
        // 鼠标按下事件
        resize[i].onmousedown = function (e) {
          //颜色改变提醒
          resize[i].style.background = "#818181";
          var startX = e.clientX;
          // 鼠标拖动事件
          document.onmousemove = function (e) {
            resize[i].left = startX;
            var endX = e.clientX;
            var moveLen = resize[i].left + (endX - startX); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
            var maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
            if (moveLen < 32) moveLen = 32; // 左边区域的最小宽度为32px
            if (moveLen > maxT - 150) moveLen = maxT - 150; //右边区域最小宽度为150px
            resize[i].style.left = moveLen; // 设置左侧区域的宽度
            for (let j = 0; j < left.length; j++) {
              left[j].style.width =
                (moveLen / document.body.clientWidth) * 100 - 8.5 + "%";
              mid[j].style.width =
                ((box[i].clientWidth - moveLen) / document.body.clientWidth -
                  0.008) *
                100 +
                "%";
            }
          };
          // 鼠标松开事件
          document.onmouseup = function (evt) {
            //颜色恢复
            resize[i].style.background = "#d6d6d6";
            document.onmousemove = null;
            document.onmouseup = null;
            resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
          };
          resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
          return false;
        };
      }
    },
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
.ftb {
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