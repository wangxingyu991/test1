
<template>
  <div class="rh-page-content">
        <div class="el-tr clearfix">
              <div class="float">
                  <el-dropdown trigger="click">
                        <el-button type="primary">
                              更多菜单 <i class="el-icon-arrow-down el-icon-right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown" style="width:105px">
                              <el-dropdown-item @click.native="elDrop1('项目1')">项目一</el-dropdown-item>
                              <el-dropdown-item>项目二</el-dropdown-item>
                              <el-dropdown-item>项目三</el-dropdown-item>
                              <el-dropdown-item>项目四</el-dropdown-item>
                        </el-dropdown-menu>
                  </el-dropdown>
              </div>
              <div class="float">
                  <el-select v-model="select" clearable  placeholder="请选择" style="width:150px">
                        <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                        </el-option>
                  </el-select>
              </div>
              <div class="float">
                        <el-select class="rh-button-primary"  v-model="lableName" placeholder="请选择报表路径" style="width:200px" ref="selectInput">
                              <el-option :value="selectId" :label="lableName" style="width:100%;height:100%;">
                                    <el-tree :data="selectTree" default-expand-all :props="defaultProps" @node-click = "handleNodeClick"></el-tree>
                              </el-option> 
                        </el-select> 
              </div>
        </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
              select:'',
            options:[{value:'1',label:'所有状态'},{value:'2',label:'已启用'},{value:'3',label:'已停用'},{value:'4',label:'删除中'},{value:'5',label:'异常'},{value:'6',label:'已冻结'}],
            lableName:'',
            selectId:'',
            defaultProps: {
                  children: 'children',
                  label: 'label'
            },
            selectTree: [{
                        label: '',
                        children: [{
                        label: '二级 1-1',
                        children: [{
                              label: '三级 1-1-1'
                              }]
                        }]
                  }, {
                        label: '一级 2',
                        children: [{
                        label: '二级 2-1',
                              children: [{
                                    label: '三级 2-1-1'
                              }]
                        }, {
                              label: '二级 2-2',
                              children: [{
                                    label: '三级 2-2-1'
                              }]
                        }]
                  }, {
                        label: '一级 3',
                        children: [{
                              label: '二级 3-1',
                              children: [{
                                    label: '三级 3-1-1'
                              }]
                              }, {
                              label: '二级 3-2',
                              children: [{
                                    label: '三级 3-2-1'
                              }]
                        }]
                  }],
        }
    },
    methods:{
          //树形菜单单击
            handleNodeClick(node){
                console.log(node,'node')
                if(node.children){
 
                }else{
                    this.selectId = node.url
                    this.lableName = node.label
                    this.$refs.selectInput.blur()
                    console.log(node.label);
                }

            },
            elDrop1(val){
                  alert(val);
            }
    }
}
</script>

<style>
      .float{
            margin-left: 10px;
            float:left;
      }
</style>