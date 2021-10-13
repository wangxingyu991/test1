<template>
  <div>
    <frame-left-right>
      <div slot="left">
            <!-- 左侧内容 -->
          <div class="tree-wrap">
              <div class="tree-serach">
                    <el-input placeholder="请输入内容" v-model="filterText" class="input-with-select">
                          <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
              </div>
              <div class="tree-body">
                    <el-tree ref="tree" :filter-node-method = "filterNode"  :data="data" :props="defaultProps" @node-click="TreeNodeClick"></el-tree>
              </div>
          </div>
      </div>

      <div slot="right">
            <!-- 右侧内容 -->
            <div class="rh-page-header">
                  <div class="rh-head-and-operate">
                        <div class="tips-content">
                              <span class="rh-helpTip-text">
                              测试页面3-2
                              </span>
                              <span class="rh-helpTip-icon">
                                    <el-tooltip class="item" content="云数据库GaussDB(for MySQL)是华为自研的最新一代企业级高扩展海量存储分布式数据库，完全兼容MySQL">
                                          <i class="el-icon-info"></i>
                                    </el-tooltip>
                              </span>
                        </div>
                        <div class="operate-btns">
                              <el-button @click=" drawer = true">帮助</el-button>
                        </div>
                  </div>
            </div>
            <div class="rh-page-hint" v-show="HintShow">
                  <div class="page-hint-content">
                        <span class="page-hint-icon">
                              <i class="el-icon-info"></i>
                        </span>
                        <span class="page-hint-text">
                              我的资源当前仅支持如下服务类型及区域的查询，更多服务及区域持续上线中。
                        </span>
                  </div>
                  <div class="operate-bts">
                        <div class="bt-close" @click="HintShow=false"><i class="el-icon-close"></i></div>
                  </div>
            </div>
            <div class="rh-page-content">
            </div>
      </div>
    </frame-left-right>
      <div class="drawer-container add" :key=1000>
            <!-- 新增抽屉弹出层 -->
            <el-drawer
            size="50%"
            :visible.sync="drawer"
            :direction="direction"
            append-to-body
            :with-header="false"
            >
            <div class="drawer-wrap">
                  <div class="rh-drawer-head">
                        <div class="drawer-title">
                              新增页面
                        </div>
                  </div>
                  <div class="rh-drawer-body">
                        <el-form ref="form2" :model="form2" label-width="100px" :label-position="labelPosition">
                              <el-row>
                              <el-col :span = "12">
                                    <el-form-item label="单位代码">
                                    <el-input v-model="form2.val_dwdm"></el-input>
                                    </el-form-item>
                              </el-col>
                              <el-col :span = "12">
                                    <el-form-item label="单位名称">
                                    <el-input v-model="form2.val_dwmc"></el-input>
                                    </el-form-item>
                              </el-col>
                              </el-row>
                              <el-row>
                              <el-col :span = "12">
                                    <el-form-item label="权限机关">
                                    <el-input v-model="form2.val_qxjg"></el-input>
                                    </el-form-item>
                              </el-col>
                              <el-col :span = "12">
                                    <el-form-item label="主管机关代码">
                                    <el-input v-model="form2.val_zgjgdm"></el-input>
                                    </el-form-item>
                              </el-col>
                              </el-row>
                              <el-row>
                              <el-col :span = "12">
                                    <el-form-item label="单位所属机构">
                                    <el-input v-model="form2.val_dwssjg"></el-input>
                                    </el-form-item>
                              </el-col>
                              <el-col :span = "12">
                                    <el-form-item label="行政区划">
                                    <el-input v-model="form2.val_xzqh"></el-input>
                                    </el-form-item>
                              </el-col>
                              </el-row>
                              <el-row>
                              <el-col :span = "12">
                                    <el-form-item label="机关类型">
                                    <el-input v-model="form2.val_jglx"></el-input>
                                    </el-form-item>
                              </el-col>
                              <el-col :span = "12">
                                    <el-form-item label="开票方式">
                                    <el-input v-model="form2.val_kpfs"></el-input>
                                    </el-form-item>
                              </el-col>
                              </el-row>
                                    <el-row>
                                          <el-col :span="24">
                                                <div class="bt-group">
                                                      <el-button type="primary">提交</el-button>
                                                      <el-button type="success">取消</el-button>
                                                </div>
                                          </el-col>
                                    </el-row>
                        </el-form> 
                  </div>
            </div>
            </el-drawer>
      </div>
  </div>
</template>

<script>
  import frameLeftRight from "@/eniv/demo/frame/frame_lr.vue"
export default {
    components:{
      frameLeftRight
    },
    data(){
        return{
              HintShow:true,
              //树型过滤器
              filterText:'',
              //菜单树的数据
              data:[{
                    label: '北京市',
                    children: [{
                          label: '海淀区',
                          children: [{
                          label: '中关村'
                          }]
                    }]
                    }, {
                    label: '山东省',
                    children: [{
                          label: '济南市',
                          children: [{
                          label: '历下区'
                          }]
                    }, {
                          label: '聊城市',
                          children: [{
                          label: '东昌府区'
                          }]
                    }]
                    }, {
                    label: '河南省',
                    children: [{
                          label: '郑州市',
                          children: [{
                                label: '金水区'
                          }
                          ]
                    },{
                          label: '开封市',
                          children: [{
                                label: '兰考县'
                          }]
                    }]
              }],
              defaultProps: {
                    children: 'children',
                    label: 'label'
              },
              drawer:false,//抽屉弹出层
            //弹出层表单内容
            labelPosition:'right',
            form2:{
                  val_dwdm: '',//单位代码
                  val_dwmc: '',//单位名称
                  val_qxjg: '',//权限机关
                  val_zgjgdm: '',//主管机关代码
                  val_dwssjg: '',//单位所属机构
                  val_xzqh: '',//行政区划
                  val_jglx: '',//机关类型
                  val_kpfs: ''//开票方式
            }
        }
    },
      //vuex参数监听
    watch: {
          filterText:function(val){
                console.log(val);
                this.$refs.tree.filter(val);
          },
      },
    methods:{
        //树形菜单过滤函数
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        //树形菜单击后事件
        TreeNodeClick(data,node){
              if(node.childNodes.length==0){
                    // this.val_dwssjg = data.label;
                    console.log(data.label);
                      this.dialogVisible = false;
              }
              console.log(node.childNodes.length);
        },
    }
}
</script>

<style>

</style>