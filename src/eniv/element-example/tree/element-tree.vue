<template>
      <div :style="{'height':frame_height+'px',}">
            <div class="tree float">
                  <div class="title">
                       check选择框
                  </div>
                  <el-tree
                        ref="tree"
                        :data = "data"
                        :props = "defaultProps" 
                        show-checkbox
                        :default-expanded-keys = "[0]"
                        node-key="id"
                        :default-expand-all="true"
                        @node-click = "handleNodeClick">
                  </el-tree>
            </div>
            <div class="tree float">
                  <div class="title">
                        带图标选择框
                  </div>
                  <el-tree
                  ref="tree2"
                  :data = "data2"
                  :props = "defaultProps" 
                  :render-content="renderContent"
                  node-key="id" 
                  :highlight-current = "true"
                  :default-expanded-keys = "[4]"
                   :default-checked-keys = "[4]" 
                  @node-click = "handleNodeClick"></el-tree>
            </div>
            <div class="tree float">
                  <div class="title">
                        可编辑树型组件
                  </div>
                  <div class="el-tree">
                        <el-tree
                        :data = "data"
                        show-checkbox
                        node-key="id"
                        default-expand-all
                        :expand-on-click-node = "false"
                        :render-content = "renderContent2">

                        </el-tree>
                  </div>
            </div>
      </div>
</template>

<script>
      let id = 1000;
      export default {
            data(){
                  return{
                        data:[{
                              id: 0,
                              label: '全国',
                              isEdit:false,
                              children: [
                              {
                                    id: "1111111111111111111",
                                    label: '山东省',
                                    isEdit:false,
                                    children: [
                                    {
                                          id: 4,
                                          label: '济南市',
                                          isEdit:false,
                                    },
                                    {
                                          id: 5,
                                          label: '聊城市',
                                          isEdit:false,

                                    },
                                    {
                                          id: 6,
                                          label: '青岛市',
                                          isEdit:false,

                                    },
                                    {
                                          id: 7,
                                          label: '潍坊市',
                                          isEdit:false,
                                    },
                                    {
                                          id: 8,
                                          label: '烟台市', 
                                          isEdit:false,
                                    },
                                    ]
                              },{
                                    id: "2222222222222222222",
                                    label:'河北省',
                                    isEdit:false,
                                    children:[
                                          {
                                                id:9,
                                                label: '石家庄',
                                                isEdit:false,
                                          },               
                                    ]
                              }]
                        }],
                        data1:[{
                              id: 0,
                              label: '全国'
                        }],
                        data11:[{
                                    id: 1,
                                    label: '山东省'
                              },{
                                    id: 2,
                                    label:'河北省'
                              }],
                        frame_height:100,
                        defaultProps: {
                        children: 'children',
                        label: 'label'
                        },
                        data2:[{
                              id: 0,
                              label: '全国',
                              children: [
                              {
                                    id: 1,
                                    label: '山东省',
                                    children: [
                                    {
                                          id: 4,
                                          label: '济南市'
                                    },
                                    {
                                          id: 5,
                                          label: '聊城市'  
                                    },
                                    {
                                          id: 6,
                                          label: '青岛市'  
                                    },
                                    {
                                          id: 7,
                                          label: '潍坊市'  
                                    },
                                    {
                                          id: 8,
                                          label: '烟台市'  
                                    },
                                    ]
                              },{
                                    id: 2,
                                    label:'河北省',
                                    children:[
                                          {
                                                id: 9,
                                                label: '石家庄'
                                          },               
                                    ]
                              }]
                        }]
                  }
            },
            //vuex参数监听获取页面高度
            computed: {
                  frameProps() {
                        return this.$storage.state.frameProp.height
                  }
            },
            //vuex参数监听
            watch: {
                  frameProps: {
                        immediate: true,
                        handler: function (newval) {
                              this.frame_height = newval;
                        }
                  }
            },
            mounted(){
                  this.frame_height = this.$storage.state.frameProp.height;
                  this.$nextTick(function() {
                        this.$refs.tree2.setCurrentKey(6)
                  })
            },
            methods: {
                  loadNode(node, resolve) {
                        console.log(node);
                        let _this = this;
                        _this.organtreeload=true;
                        if (node.level === 0) {
                              // resolve(_this.data1);
                              _this.$api.get(_this.$apis.permission+"/rest/permission/organmanage/treeroot", {}, function (res) {
                                    _this.organtreeload = false;
                                    resolve(res.data);
                                    return;
                              });
                        }
                        if (node.level >= 1) {
                              resolve(_this.data11);
                        }
                  },
                  handleNodeClick(data) {
                        console.log(data);
                  },
                  append(data) {
                        const newChild = { id: id++, label: '新增按扭', isEdit:false , children: [] };
                        if (!data.children) {
                              this.$set(data, 'children', []);
                        }
                        data.children.push(newChild);
                  },
                  remove(node,data){
                        console.log(node);
                        const parent = node.parent;
                        const children = parent.data.children || parent.data;
                        const index =  children.findIndex(d => d.id === data.id);
                        children.splice(index,1);
                  },
                  edit(event,data,node){
                        node.data.isEdit = true ;
                         console.log(this.data);
                         console.log(event);
                        //  console.log(node);
                  },
                  renderContent(h,{node,data,store}){
                        console.log(node.level);
                        if(node.level<3){
                              return (
                              <span class="custom-tree-node">
                                    <i class="el-icon-s-shop"></i>
                                    <span  class="label">{node.label}</span>
                              </span>
                              )
                        } else {
                              return (
                              <span class="custom-tree-node">
                                    <i class="el-icon-s-marketing"></i>
                                    <span class="label">{node.label}</span>
                              </span>
                              )    
                        }
                  }, 
                  show_html(event,data){

                  },
                  renderContent2(h,{node,data,store}){//isEdit编辑判断标识位，控制显示span标签还是显示input输入框
                        return(
                              <span class="custom-tree-node2">
                                    { (node.data.isEdit) ? <span class="input"> <input on-blur = {(obj) =>{ node.data.label = obj.target.value; node.data.isEdit = false;}} value={node.data.label}/></span> :''}
                                    {!(node.data.isEdit) ? <span class="label" >{node.data.label}</span> :''}
                                    <span class="btn-group">
                                          <i class="el-icon-plus"     on-click = {() => this.append(data)}></i>
                                          <i class="el-icon-minus"    on-click = {() => this.remove(node,data)}></i>
                                          <i class="el-icon-edit"  on-click = {() => this.edit(event,data,node)}></i>
                                    </span>
                              </span>
                        )
                  }
                  // vModel={this.newTodoText} jsx模板语法
            }
      }
</script>

<style lang="less" scoped>
      .title{
            font-size:14px;
            font-weight:700;
            line-height:42px;
      }
      .tree{
            width:200px;
            margin-right:20px;
            padding:20px;
            height:800px;
            background:#FFF;
      }
</style>