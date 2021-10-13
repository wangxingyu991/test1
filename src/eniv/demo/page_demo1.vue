<style lang="less">
</style>
<template>
<div >
      <div class="rh-page-header">
            <div class="rh-head-and-operate">
                  <div class="tips-content">
                        <span class="rh-helpTip-text">
                              测试页面1
                        </span>
                        <span class="rh-helpTip-icon">
                              <el-tooltip class="item" content="云数据库GaussDB(for MySQL)是华为自研的最新一代企业级高扩展海量存储分布式数据库，完全兼容MySQL">
                                    <i class="el-icon-info"></i>
                              </el-tooltip>
                        </span>
                  </div>
                  <div class="operate-btns">
                        <el-button>操作</el-button>
                  </div>
            </div>
      </div>
      <div class="rh-page-content">
            <div class="rh-operate clearfix">
                  <div class="rh-pull-left">
                        <el-button >删除</el-button>
                        <el-button >绑定备份策略</el-button>
                        <el-button type="danger">购买服务</el-button>
                        <el-dropdown>
                              <el-button type="primary">
                                    更多菜单 <i class="el-icon-arrow-down el-icon-right"></i>
                              </el-button>
                              <el-dropdown-menu slot="dropdown" style="width:105px">
                                    <el-dropdown-item>菜单一</el-dropdown-item>
                                    <el-dropdown-item>菜单二</el-dropdown-item>
                                    <el-dropdown-item>菜单三</el-dropdown-item>
                                    <el-dropdown-item>菜单四</el-dropdown-item>
                              </el-dropdown-menu>
                        </el-dropdown>
                  </div>
                  <div class="rh-pull-right">
                        <el-select v-model="select" clearable  placeholder="请选择" style="width:150px">
                              <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                              </el-option>
                        </el-select>
                        <el-select class="rh-button-primary"  v-model="lableName" placeholder="请选择报表路径" style="width:200px" ref="selectInput">
                              <el-option :value="selectId" :label="lableName" style="width:100%;height:100%;">
                                    <el-tree :data="selectTree" default-expand-all :props="defaultProps" @node-click = "handleNodeClick"></el-tree>
                              </el-option> 
                        </el-select>
                        <el-tooltip class="item" effect="dark" content="搜索" placement="bottom-start">
                              <el-button icon="el-icon-search"   type="primary"></el-button>
                        </el-tooltip>
                  </div>
            </div>
            <div class="rh-table">
                  <el-table
                        :data="tableData"
                        height="500"
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
                              align="center"
                              show-overflow-tooltip
                              width="250">
                              <template slot-scope="scope">
                                    <el-tooltip trigger="hover">
                                          <div slot="content">{{scope.row.td_dwmc}}</div>
                                          <span class="td_link">***********</span>
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
                        width="300"
                        label="操作">
                              <template solt-scope="scope">
                              <el-button type="text" size="mini">删除</el-button>
                              <el-divider direction="vertical"></el-divider>
                              <el-button type="text" size="mini">编辑</el-button>
                              <el-divider direction="vertical"></el-divider>
                              <el-button type="text" size="mini">应用</el-button>
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
</template>

<script>
import {formateDate,getDate} from "@/utils/tools.js"
import {myMixin} from '@/assets/mixin/mixin_page1.js'
export default {
      mixins:[myMixin],
      props: {
            default:Object
      },
      components: {

      },
      data() {
            return {
                  dataList:[],
                  tableData:[],
                  sortList:[],
                  total:0,
                  pageSizes:[10,20,30],
                  pageSize:10,
                  selectVal:'',
                  selectId:'',
                  lableName:'',
                  defaultProps: {
                        children: 'children',
                        label: 'label'
                  },
                  select:'',
                  options:[{value:'1',label:'所有状态'},{value:'2',label:'已启用'},{value:'3',label:'已停用'},{value:'4',label:'删除中'},{value:'5',label:'异常'},{value:'6',label:'已冻结'}],
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
                  multipleSelection: [],
                  tableData2: [{
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                        date: '2016-05-08',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                        date: '2016-05-06',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                        date: '2016-05-07',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                        }],
            };
      },
      mounted() {
            //var date = new Date('2021-03-04T00:48:58.000+00:00');
            this.$http.get("http://table-api.com").then(res=>{
                  this.dataList = res.data.array;
                  this.total = res.data.array.length;
                  this.sortList = ( _ => {
                        const data = [];
                        const table = this.dataList;
                        const step = this.pageSize;
                        
                        for(var i = 0,j= table.length; i<j; i+=step){
                              data.push(table.slice(i,i+step));
                        }
                        return data
                  })();
                  this.tableData = this.sortList[0];
            })
      },
      methods:{
            handleSelectionChange(){
                  this.multipleSelection = val;
            },
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
            handleCurrentChange(val){
                  console.log(val)
            },
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
            pageChang(val){
                  this.tableData = this.sortList[val-1]; 
            }
      }
};
</script>