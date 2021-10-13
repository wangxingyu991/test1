
<template>
      <div  class="clearfix demo3">
            <div class="rh-page-left" :style="{ height: frameSize_height - 40 + 'px'}">
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
            <div class="rh-page-right" :style="{ height: frameSize_height-15  + 'px',width: frameSize_width-280-30 + 'px'}">
                  <div class="rh-page-header">
                        <div class="rh-head-and-operate">
                              <div class="tips-content">
                                    <span class="rh-helpTip-text">
                                    测试页面311111111111
                                    </span>
                                    <span class="rh-helpTip-icon">
                                          <el-tooltip class="item" content="云数据库GaussDB(for MySQL)是华为自研的最新一代企业级高扩展海量存储分布式数据库，完全兼容MySQL">
                                                <i class="el-icon-info"></i>
                                          </el-tooltip>
                                    </span>
                              </div>
                              <div class="operate-btns">
                                    <el-button>帮助</el-button>
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
                        <div class="rh-operate clearfix">
                               <div class="rh-pull-left">
                                    <el-button type="primary">新增</el-button>
                                    <el-button type="primary">删除</el-button>
                                    <el-button type="danger">购买服务</el-button>
                                    <el-dropdown>
                                          <el-button type="primary">
                                                更多菜单 <i class="el-icon-arrow-down el-icon-right"></i>
                                          </el-button>
                                          <el-dropdown-menu slot="dropdown" style="width:105px">
                                                <el-dropdown-item>黄金糕</el-dropdown-item>
                                                <el-dropdown-item>狮子头</el-dropdown-item>
                                                <el-dropdown-item>螺丝粉</el-dropdown-item>
                                                <el-dropdown-item>双皮奶</el-dropdown-item>
                                          </el-dropdown-menu>
                                    </el-dropdown>
                               </div>
                              <div class="rh-pull-right">
                                    <el-form :model="search" ref="search" :inline="false" label-width="0px" style="display: flex;justify-content: flex-end;">
                                          <el-form-item label="" prop="selectVal">
                                                <el-select v-model="search.selectVal" clearable  placeholder="请选择" style="width:150px">
                                                      <el-option
                                                            v-for="item in search.options"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                      </el-option>
                                                </el-select>
                                          </el-form-item>
                                          <el-form-item label="" prop="lableName">
                                                <el-select class="rh-button-primary"  v-model="search.lableName" placeholder="请选择报表路径" style="width:200px" ref="selectInput">
                                                      <el-option :value="search.selectId" :label="search.lableName" style="width:100%;height:100%;">
                                                            <el-tree :data="search.selectTree" default-expand-all :props="defaultProps" @node-click = "handleNodeClick"></el-tree>
                                                      </el-option>
                                                </el-select>
                                          </el-form-item>
                                          <el-button v-on:click="searchWrap=!searchWrap"><i class="el-icon-arrow-down" v-show="!searchWrap"></i><i class="el-icon-arrow-up" v-show="searchWrap"></i></el-button>
                                          <el-tooltip class="item" effect="dark" content="搜索" placement="bottom-start">
                                                <el-button icon="el-icon-search"   type="primary"></el-button>
                                          </el-tooltip>
                                    </el-form>
                              </div>
                        </div>
                        <div class="rh-search-wrap" v-show="searchWrap">
                              <el-form ref="form" :model="form" label-width="0px">
                                    <el-row :gutter="10">
                                          <el-col :span="5">
                                                <el-form-item label="" prop="form_dwssjg">
                                                      <el-input v-model="form.form_dwssjg" placeholder="单位所属机构" size="small" @focus="from.dialogVisible = true"></el-input>
                                                </el-form-item>
                                          </el-col>
                                          <el-col :span="5">
                                                <el-form-item label="" prop="form_xzqh">
                                                      <el-input v-model="form.form_xzqh" placeholder="行政区划" size="small"  @focus="form.dialogVisible2 = true"></el-input>
                                                </el-form-item>
                                          </el-col>
                                          <el-col :span="5">
                                                <el-form-item label="" prop="form_dwmc">
                                                      <el-input v-model="form.form_dwmc" placeholder="单位名称" size="small"></el-input>
                                                </el-form-item>
                                          </el-col>
                                          <el-col :span="5">
                                                <el-form-item label="" prop="form_jglx">
                                                      <el-select v-model="form.form_jglx" placeholder="机构类型" size="small">
                                                            <el-option v-for="item in form.opt_jglx" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                                      </el-select>
                                                </el-form-item>
                                          </el-col>
                                          <el-col :span="4">
                                                 <el-form-item label="" prop="form_kpf">
                                                      <el-select v-model="form.form_kpfs" placeholder="开票方式" size="small">
                                                            <el-option v-for="item in form.opt_kpfs" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                                      </el-select>
                                                 </el-form-item>
                                          </el-col>
                                    </el-row>
                                    <el-row :gutter="10">
                                          <el-col :span="5">
                                                <el-form-item label="" prop="form_sfzclxkj">
                                                      <el-select v-model="form.form_sfzclxkj" placeholder="是否支持离线开具" size="small">
                                                            <el-option v-for="item in form.opt_sfzclxkj" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                                      </el-select>
                                                 </el-form-item>
                                          </el-col>
                                          <el-col :span="5">
                                                <el-form-item label="" prop="">
                                                      <el-select v-model="form.form_sffsdx" placeholder="是否发送短信" size="small">
                                                            <el-option v-for="item in form.opt_sffsdx" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                                      </el-select>
                                                </el-form-item>
                                          </el-col>
                                          <el-col :span="5">
                                                <el-form-item label="" prop="">
                                                      <el-select v-model="form.form_star" placeholder="请选择是否启用" size="small">
                                                            <el-option v-for="item in form.opt_start" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                                      </el-select>
                                                </el-form-item>
                                          </el-col>
                                          <el-col :span="9">
                                                <el-button type="primary" plain size="small" icon="el-icon-search">查询</el-button>
                                                <el-button type="info" plain size="small" icon="el-icon-refresh-left">重置</el-button>
                                          </el-col>
                                    </el-row>
                              </el-form>
                        </div>
                        <div class="rh-table">
                              <el-table
                                    :data="tableData"
                                    height="480"
                                    @selection-change="handleSelectionChange"
                                    style="width: 100%">

                                    <el-table-column 
                                    type="selection" 
                                    align="center">
                                    </el-table-column>

                                    <el-table-column prop="id" 
                                    header-align="center"  
                                    align="center" 
                                    sortable 
                                    label="序号" 
                                    width="90">
                                    </el-table-column>

                                    <el-table-column
                                    prop="td_dwdm"
                                    label="单位代码"
                                    align="center"
                                    header-align="center"
                                    width="250">
                                          <template slot="header">
                                                单位代码
                                                <el-tooltip 
                                                trigger="hover" 
                                                effect = "dark"
                                                content="">
                                                      <div slot="content" style="width:140px;">
                                                            单位代码：请选择一个或多个要设置备份策略的存储库
                                                      </div>
                                                      <i class="el-icon-question" style="font-size:16px;"></i>
                                                </el-tooltip>
                                          </template>

                                          <template slot-scope="scope">
                                                <el-tooltip trigger="hover" placement="left"  effect="light">
                                                      <div slot="content" style="width:140px;">
                                                            机关代码: <a>{{scope.row.td_dwdm}}</a>  
                                                      </div>
                                                      <span class="td_link">{{scope.row.td_dwdm}}</span>
                                                </el-tooltip>
                                          </template>
                                    </el-table-column>

                                    <el-table-column
                                          prop="td_dwmc"
                                          label="单位名称"
                                          header-align="center"
                                          show-overflow-tooltip
                                          width="250">
                                          <template slot="header">
                                                单位名称
                                                <el-tooltip 
                                                trigger="hover" 
                                                effect = "dark"
                                                content="">
                                                      <div slot="content" style="width:140px;">
                                                            单位代码：请选择一个或多个要设置备份策略的存储库
                                                      </div>
                                                      <i class="el-icon-question" style="font-size:16px;"></i>
                                                </el-tooltip>
                                          </template>
                                    </el-table-column>

                                    <el-table-column
                                          prop="td_qxjg"
                                          label="权限机构"
                                          width="200"
                                          >
                                    </el-table-column>

                                          <el-table-column
                                          prop="td_zgjgdm"
                                          label="主管机构代码">
                                    </el-table-column>
                                    <el-table-column
                                    width="150"
                                    label="操作">
                                          <template solt-scope="scope">
                                          <el-button type="text" size="mini">删除</el-button>
                                          <el-divider direction="vertical"></el-divider>
                                          <el-button type="text" size="mini">编辑</el-button>
                                          <el-divider direction="vertical"></el-divider>
                                          <el-button type="text" size="mini">禁用</el-button>
                                          </template>
                                    </el-table-column>
                              </el-table>
                        </div>
                        <div class="rh-pagination">
                              <el-pagination
                              layout="total, sizes, prev, pager, next"
                              @current-change="pageChang"
                              @size-change="handleSizeChange"
                              :total="total"
                              :page-sizes="pageSizes"
                              :page-size="pageSize"
                              >
                              </el-pagination>
                        </div>
                  </div>
            </div>
      </div>
</template>

<script>
export default {
      data(){
            return{
                  //框架高度
                  frameSize_width:0,
                  frameSize_height: 0,
                  //树型过滤器
                  filterText:'',
                  //样式变量
                  frame_height:'',
                  // 布尔开关变量
                  HintShow:true,
                  searchWrap:false,
                  //表单组件变量
                  form:{ 
                        form_dwssjg:'',
                        form_xzqh:'',
                        form_dwmc:'',
                        form_jglx:'',
                        opt_jglx:[{value:'选项1',label:'省直用票单位'},{value:'选项2',label:'其他用票单位'},{value:'选项3',label:'其他'}],
                        form_kpfs:'',
                        opt_kpfs:[{value:'选项1',label:'同步'},{value:'选项2',label:'异步'}],
                        form_sfzclxkj:'',
                        opt_sfzclxkj:[{value:'选项1',label:'支持'},{value:'选项2',label:'不支持'}],
                        form_sffsdx:'',
                        opt_sffsdx:[{value:'选项1',label:'发送'},{value:'选项2',label:'不发送'}],
                        form_star:'',
                        opt_star: [{
                              value: '选项1',
                              label: '启用'
                        }, {
                              value: '选项2',
                              label: '禁用'
                        }],
                        //表单弹出层
                        dialogVisible:false,
                        dialogVisible2:false,
                  },
                  //search输入框数据
                  search:{
                        selectVal:'',
                        selectId:'',
                        lableName:'',
                         options:[{value:'1',label:'所有状态'},{value:'2',label:'已启用'},{value:'3',label:'已停用'},{value:'4',label:'删除中'},{value:'5',label:'异常'},{value:'6',label:'已冻结'}],
                        defaultProps: {
                              children: 'children',
                              label: 'label'
                        },
                        select:'',
                        selectTree: [{
                              label: '省局',
                              children: [{
                              label: '市局',
                              children: [{
                                    label: '区级'
                                    }]
                              }]
                        }, 
                        {
                              label: '北京总局',
                              children: [{
                              label: '海淀区分局',
                                    children: [{
                                          label: '中关村街道办事处'
                                    }]
                              }, {
                                    label: '昌平区分局',
                                    children: [{
                                          label: '昌平平安街道办事处'
                                    }]
                              }]
                        }, {
                              label: '山东局',
                              children: [{
                                    label: '济南总局',
                                    children: [{
                                          label: '历下区分局'
                                    }]
                                    }, {
                                    label: '潍坊分局',
                                    children: [{
                                          label: '潍坊坊子区分局'
                                    }]
                              }]
                        }],
                  },
                  input1:'',
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
                  //表格变量
                  dataList: [],//后台获取的全部数据
                  tableData: [],//表格需要显示的数据
                  sortList: [],//分页封装后的数据
                  total: 0,//分页总条数
                  pageSizes:[10,20,30],//分页条数下拉数据
                  pageSize:10,//当前条数数据
                  multipleSelection: [],
            }
      },
      computed: {
            //vuex参数监听获取页面高度
            frameProps() {
                  return this.$storage.state.frameProp.height
            },
            frame_width(){
            return this.$store.state.frameSize.width;
            },

      },
      //vuex参数监听
      watch: {
            frameProps: {
                  immediate: true,
                  handler: function (newval) {
                        this.frame_height = newval;
                  }
            },
            filterText:function(val){
                  console.log(val);
                  this.$refs.tree.filter(val);
            },
      },
      mounted() {
            //初始化高度
            this.frame_height = this.$storage.state.frameProp.height;//总高度-头部50px-上边距15px
            this.frameSize_height =this.$storage.state.frameSize.height;
            this.frameSize_width = this.$storage.state.frameSize.width;
            //后台获取初始化表格数据
            this.$http.get("http://table-api.com").then(res=>{
                  this.dataList = res.data.array;
                  this.total = res.data.array.length;
                  //将表格数据分页存储
                  this.sortList = ( _ => {
                        const data = [];
                        const table = this.dataList;
                        const step = this.pageSize;
                        
                        for(var i = 0,j= table.length; i<j; i+=step){
                              data.push(table.slice(i,i+step));
                        }
                        return data
                  })();
                  //初始化显示第一页数据
                  this.tableData = this.sortList[0];
            })
      },
      methods: {
            //表格多行选择
            handleSelectionChange(){
                  this.multipleSelection = val;
            },
            //下拉树型菜单单击选择
            handleNodeClick(node){
                //console.log(node,'node')
                if(node.children){
 
                }else{
                    this.search.selectId = node.url
                    this.search.lableName = node.label
                    this.$refs.selectInput.blur()
                    console.log(node.label);
                }

            },
            //分页页数下拉按钮单击事件
            handleSizeChange(val){
                  const sortData = [];
                  this.sortList = ( _ => {
                        const data = [];
                        const table = this.dataList;
                        const step = val;
                        for(var i = 0,j= table.length; i<j; i+=step){
                              data.push(table.slice(i,i+step));
                        }
                        return data
                  })();
                  this.tableData = this.sortList[0];
            },
            //分页页面按钮单击事件
            pageChang(val){
                  this.tableData = this.sortList[val-1]; 
            },
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

<style lang="less">
      .demo3{
      .rh-page-hint{
                  margin-bottom:20px;
            }
            .flex{
                  display: block;
            }
            .rh-page-left{
                  padding:20px;
                  width:240px;
                  height: 100%;
                  background: #fff;
                  float:left;

            }
            .rh-page-right{
                  /* 膨胀 */
                  height:calc(100% + 40px);
                  width:calc(100% - 281px);
                  float:left;
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
                  left: 280px;
                  right: 0px;
                  overflow: auto;
                  z-index: 999;
                  transition-duration: 0.5s;
            }
            .rh-page-content{
                  margin-bottom:0px;
            }
            .el-main{
                  margin: -40px 0px 0px;
            }
      }
   
</style>