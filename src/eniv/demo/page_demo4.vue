
<template>
<div>
      <div class="rh-page-header">
            <div class="rh-head-and-operate">
                  <div class="tips-content">
                        <span class="rh-helpTip-text">
                        测试页面4
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
      <div class="rh-page-content" >

            <div class="rh-operate clearfix">
                  <div class="rh-pull-left">
                        <el-button type="primary" >新增</el-button>
                        <el-button type="primary">删除</el-button>
                        <el-button type="danger">购买服务</el-button>
                        <el-dropdown trigger="click" >
                              <el-button type="primary">
                                    更多菜单 <i class="el-icon-arrow-down el-icon-right"></i>
                              </el-button>
                              <el-dropdown-menu slot="dropdown" style="width:105px">
                                    <el-dropdown-item @click.native="drawer = true">抽屉式弹出层</el-dropdown-item>
                                    <el-dropdown-item @click.native="Dialog = true">中心弹出层</el-dropdown-item>
                              </el-dropdown-menu>
                        </el-dropdown>
                   </div>
                  <div class="rh-pull-right">
                        <el-form :model="search" ref="search" :inline="false" label-width="0px" style="display: flex;justify-content: flex-end;">
                              <el-form-item label="" prop="selectVal">
                                    <el-select v-model="search.select" clearable  placeholder="请选择" style="width:150px">
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
                <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
                    <el-row :gutter="10">
                        <el-col :span="5">
                            <el-form-item label="" prop="val_dwssjg">
                                  <el-input v-model="queryForm.val_dwssjg" placeholder="单位所属机构" size="small" @focus="dialogVisible = true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                              <el-form-item label="" prop="val_xzqh">
                                    <el-input v-model="queryForm.val_xzqh" placeholder="行政区划" size="small"  @focus="dialogVisible2 = true"></el-input>
                              </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="" prop="val_dwmc">
                                   <el-input v-model="queryForm.val_dwmc" placeholder="单位名称" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="" prop="val_jglx">
                              <el-select v-model="queryForm.val_jglx" placeholder="机构类型" size="small">
                                    <el-option v-for="item in queryForm.opt_jglx" :key="item.value" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                               <el-form-item label="" prop="val_kpfs">
                                    <el-select v-model="queryForm.val_kpfs" placeholder="开票方式" size="small">
                                          <el-option v-for="item in queryForm.opt_kpfs" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                               </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="5">
                            <el-form-item label="" prop="val_sfzclxkj">
                                    <el-select v-model="queryForm.val_sfzclxkj" placeholder="是否支持离线开具" size="small">
                                          <el-option v-for="item in queryForm.opt_sfzclxkj" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                              <el-form-item label="" prop="val_sffsdx">
                                    <el-select v-model="queryForm.val_sffsdx" placeholder="是否发送短信" size="small">
                                          <el-option v-for="item in queryForm.opt_sffsdx" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                              </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="" prop="value">
                                    <el-select v-model="queryForm.value" placeholder="请选择" size="small">
                                          <el-option v-for="item in queryForm.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
                        height="500"
                        @cell-click="cellClick"
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
                              <template  slot-scope="scope">
                                    <el-input v-model="scope.row.td_dwmc"></el-input>
                                    {{scope.row.td_dwmc}}
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
      <div class="rh-page-layout-section">
            <div class="project-info">
                  开通企业项目功能后，您可以根据需要，将资源分类归集使用，比如将具有相同使用目标的资源归属到同一个企业项目，方便对资源进行管理。
            </div>
      </div>
      <div class="drawer-container add" :key=1000>
            <!-- 新增抽屉弹出层 -->
            <el-drawer
            size="50%"
            :visible.sync="drawer"
            :direction="direction"
            append-to-body
            :wrapperClosable = false
            :with-header=true
            :before-close="handleClose">
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
      <div class="dailog">
            <el-dialog 
            title="新增用户"
            :visible.sync = "Dialog"
            width="50%"
            append-to-body
            :close-on-click-modal='false'
            :before-close="handleClose">
                  <!--下面内容是可替换区域-->
                  <div class="rh-dialog-body">
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

                        </el-form> 
                  </div>
                  <div class="rh-dialog-footer" solt="footer">
                        <el-button @click="Dialog = false">取消</el-button>
                        <el-button @click="summitDialog">确定</el-button>
                  </div>
                  <!--上面内容是可替换区域-->
            </el-dialog>
      </div>
</div>
</template>

<script>
export default {
      props: {
            default:Object
      },
      components: {

      },
      data() {
            return {
                  drawer:false,//抽屉弹出层
                  Dialog: false,//弹出层信息
                  direction: 'rtl',//抽屉方向
                  HintShow:true,//提示信息框
                  searchWrap:false,//高级收索框
                  searchForm:{},//收索表单
                  dataList:[],//数据列表
                  tableData:[],//表格数据
                  sortList:[],//表格分页数据
                  total:0,//表格总条数
                  pageSizes:[10,20,30],//表格分页数量
                  pageSize:10,//当前分页条数
                  selectVal:'',//下拉树按钮
                  selectId:'',//下拉项目id
                  lableName:'',//下拉内容label
                  radio_Bt:'',//radio按钮
                  defaultProps: {//树型模板
                        children: 'children',
                        label: 'label'
                  },
                  search:{
                        select:"",
                        selectId:"",
                        options:[{value:'1',label:'所有状态'},{value:'2',label:'已启用'},{value:'3',label:'已停用'},{value:'4',label:'删除中'},{value:'5',label:'异常'},{value:'6',label:'已冻结'}],
                  },
                  select:'',
                  selectTree: [{
                        label: '',
                        children: [{
                        label: '济南总局',
                        children: [{
                              label: '历下区分局'
                              }]
                        }]
                  }, {
                        label: '                                                                  ',
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
                  //表单数据
                  queryForm: {
                        val_dwssjg:'',
                        dialogVisible:false,
                        dialogVisible2:false,
                        val_xzqh:'',
                        val_dwmc:'',
                        val_jglx:'',
                        opt_jglx:[{value:'选项1',label:'省直用票单位'},{value:'选项2',label:'其他用票单位'},{value:'选项3',label:'其他'}],
                        val_kpfs:'',
                        opt_kpfs:[{value:'选项1',label:'同步'},{value:'选项2',label:'异步'}],
                        val_sfzclxkj:'',
                        opt_sfzclxkj:[{value:'选项1',label:'支持'},{value:'选项2',label:'不支持'}],
                        val_sffsdx:'',
                        opt_sffsdx:[{value:'选项1',label:'发送'},{value:'选项2',label:'不发送'}],
                        value:'',
                        options: [{
                              value: '选项1',
                              label: '启用'
                              }, {
                              value: '选项2',
                              label: '禁用'
                        }],
                  },
                  //树配置信息
                  defaultProps: {
                        children: 'children',
                        label: 'label'
                  },
                  defaultProps2: {
                        children: 'children',
                        label: 'label'
                  },
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
            };
      },
      mounted() {
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
            //单元格点击函数
            cellClick(row, column, cell, event){
                  console.log("row:");
                  console.log(row);
                  console.log(this.tableData)
            },
            handleCommand(command) {
                  this.drawer = command;
            },
            //弹出层提交信息
            summitDialog(){

            },
            handleClose(done) {
                   done();
                  // this.$confirm('确认关闭？')
                  // .then(_ => {
                  // done();
                  // })
                  // .catch(_ => {});
            },
            //表格多行选择
            handleSelectionChange(){
                  this.multipleSelection = val;
            },
            //下拉树型菜单单击选择
            handleNodeClick(node){
                //console.log(node,'node')
                if(node.children){
 
                }else{
                    this.selectId = node.url
                    this.lableName = node.label
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
            }
      }
}
</script>

<style lang="less" scoped>
      .rh-page-hint{
            margin-bottom:15px;
      }
      .bt-group{
            text-align: center;
      }
</style>