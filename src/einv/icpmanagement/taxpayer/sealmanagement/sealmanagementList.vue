<template>
  <div>
    <frame-left-right>
      <div slot="left">
            <!-- 左侧内容 -->
          <div class="tree-wrap">
              <!-- <div class="tree-serach">
                    <el-input placeholder="请输入内容" v-model="filterText" class="input-with-select">
                          <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
              </div> -->
              <div class="tree-body">
                     <el-tree ref="tree"
                      v-loading="treeload" 
                     element-loading-text="加载中"  
                    :filter-node-method = "filterNode"  
                    :data="treeData"
                    :props="defaultProps" 
                    :expand-on-click-node="boolean.flag"
                    @node-click="TreeNodeClick"
                    :load="loadNode"
                     lazy  highlight-current>
                    </el-tree>
              </div>
          </div>
      </div>

      <div slot="right">
            <!-- 右侧内容 -->
            <div class="rh-page-header">
                  <div class="rh-head-and-operate">
                        <div class="tips-content">
                            <span class="rh-helpTip-text">
                              纳税人印章管理
                            </span>
                            
                        </div>
                        <!-- <div class="operate-btns">
                              <el-button @click=" drawer = true">帮助</el-button>
                        </div> -->
                  </div>
            </div>
            <div class="rh-page-content">
                  <div class="rh-operate clearfix">
                        <div class="rh-pull-left">
                        <el-button type="primary" @click="onAdd" :loading="loading.Addloading">新增</el-button>
                        </div>
                        <!-- <div class="rh-pull-right">
                        <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
                            <el-form-item prop="zzjgMc">
                            <el-input v-model="queryForm.zzjgMc" placeholder="组织机构名称"></el-input>
                            </el-form-item>
                            <el-form-item prop="nsrsbh">
                            <el-input v-model="queryForm.nsrsbh" placeholder="纳税人识别号"></el-input>
                            </el-form-item>
                            <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
                            <el-button type="info" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
                        </el-form>
                        </div> -->
                </div>
                 <div class="rh-table">
                        <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange" v-loading="loadingSeal">
                            <template slot="empty">
                            <div class="pic_nodata"></div>
                        </template>
                        <el-table-column
                              label="序号"
                              width="50px"
                              align="center" fixed>
                          <template slot-scope="scope">
                              {{scope.$index+1}}
                          </template>
                        </el-table-column>
                          <el-table-column show-overflow-tooltip align="left" prop="zzjgDm" label="组织机构代码" v-if="showNsrsbh"></el-table-column>
                        <el-table-column show-overflow-tooltip align="left" prop="zzjgMc" label="组织机构名称"></el-table-column>
                        <!-- <el-table-column show-overflow-tooltip align="left" prop="fpzyzLj" label="印章路径"></el-table-column> -->
                        <el-table-column show-overflow-tooltip align="left" prop="yzlx" label="印章类型" ></el-table-column>
                        <el-table-column show-overflow-tooltip align="left" prop="jbr" label="经办人" ></el-table-column>
                        <el-table-column show-overflow-tooltip align="center" prop="yxbz" label="有效标志"></el-table-column>
                        <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                            <el-button class="table_btn" type="text" @click="onLook(scope)">查看</el-button>
                            <el-button class="table_btn" type="text" @click="onEdit(scope)">修改</el-button>
                            <el-button class="table_btn" type="text" @click="onDel(scope)">删除</el-button>
                            </template>
                        </el-table-column>
                        </el-table>
                    </div>
                    <div class="rh-pagination">
                        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
                        </el-pagination>
                    </div>
            </div>
      </div>
    </frame-left-right>
    <!-- 新增页面抽屉 -->
      <div class="drawer-container add">
        <el-drawer  size="60%"
          :visible.sync="drawerAdd"
          append-to-body
          :wrapperClosable = false
          :with-header="true">
          <addPage  v-if="drawerAdd"  @reload="init_Table" @back="Addback" :addPageData="addPageData">

          </addPage>
        </el-drawer>
      </div>
       <!-- 编辑页面抽屉 -->
     <div class="drawer-container update">
      <el-drawer 
        size="60%" 
        :visible.sync="update" 
        append-to-body
        :wrapperClosable = false
        :with-header="true" >
        <editPage v-if="update" @back="editback" @reload="init_Table" :updatePageData="updatePageData"></editPage>
      </el-drawer>
    </div> 
       <!-- 查看页面抽屉 -->
     <div class="drawer-container look">
      <el-drawer 
        size="60%" 
        :visible.sync="look" 
        append-to-body
        :wrapperClosable = false
        :with-header="true" >
        <lookPage v-if="look" @back="lookback" :updatePageData="updatePageData"></lookPage>
      </el-drawer>
     </div>
  </div>
</template>

<script>
  import addPage from "./sealmanagementAdd.vue";
  import editPage from "./sealmanagementEdit.vue";
  import lookPage from "./sealmanagementLook.vue";
  import frameLeftRight from "@/eniv/demo/frame/frame_lr.vue"
  import { formateDate } from "@/utils/tools.js";
  import validate from "@/utils/validate.js";
export default {
    components:{
      frameLeftRight,
      formateDate,
      addPage,
      editPage,
      lookPage,
    },
    data(){
        return{
              defaultProps: {
                children: 'children',
                label: 'organName',
                isLeaf: 'isParent'
               },
              treeData:[],
              showNsrsbh:false,
              drawerAdd:false,//抽屉弹出层
              update:false,
              look:false,
            //弹出层表单内容
            labelPosition:'right',
            //查询表单
            queryForm: {
                zzjgDm:"",
                zzjgMc:"",
                pageNo: 1,
                pageSize: 10,
            },
            boolean:{
            flag:false,
            },
            loading:{
                loadingList:false,
            },
            //Addloading
            loading:{
                Addloading:false,
            },
            //校验规则
            rules: {
                fplxdm: [
                { required: true, message: "请输入发票类型代码", trigger: "blur" },
                ],
                fplxmc: [
                { required: true, message: "请输入发票类型名称", trigger: "blur" },
                ],
                yxbz: [
                { required: true, message: "请选择有效标志", trigger: "blur" },
                ],
                
            },
            insertForm: {
                fplxdm: "",
                fplxmc: "",
                cyfplxdm: "",
                fplxjc: "",
                yxbz: "",
                zpbz: "",
            },
            page: {
                Total: 100,
                Size: [10, 20, 30],
                currentPage: 1,
             },
            tableData: [],
            updatePageData: {},
            addPageData:{},
            treeload:true,
            loadingSeal:false,
            //表格选择
            tr_sels: [],
        }
    },
      //vuex参数监听
    watch: {
          filterText:function(val){
               
                this.$refs.tree.filter(val);
          },
      },
     mounted() {
    //页面打开自动加载纳税人状态的数据
      this.init_Table();
      this.getTreeRoot();
  },
    methods:{
     getTreeRoot() {
        let _this = this;
        _this.$api.get(this.$apis.icpmanagement+"/rest/permission/organmanage/treeroot", {}, function (res) {
            if (res.success == true) {
                _this.treeData = res.data;
                _this.treeload = false;
            } else {
                _this.$message({
                    message: '查询失败,' + res.errorMsg,
                    type: 'error'
                });
            }
        })
    },
    loadNode(node, resolve) {
      let _this = this;
      _this.treeload=true;
      if (node.level >= 1) {
        _this.$api.get(this.$apis.icpmanagement+"/rest/permission/organmanage/treechild/"+node.data.organCode, {}, function (res) {
          let list = res.data;
          for(let i = 0;i < list.length;i++){
            list[i].isParent=(list[i].isParent=='true'?true:false);
          }
          _this.treeload = false;
          return resolve(list);
        });
      }
    },
    init_Table(){
       let _this = this;
       let params = this.queryForm;
       if (params != null) {
                if (validate.checkForbiddenWordForm(JSON.stringify(params))) {
                  _this.$message({
                    showClose: true,
                    message: "不允许有特殊字符",
                    type: "error",
                  });
                  return;
                }
       }
       _this.loadingSeal=true;
        this.$api.post(
            _this.$apis.icpmanagement +"/taxpayer/sealmanagement/sealManageMentList",params,
            function (res) {
            if (res.success) {
                 _this.tableData = res.data;
                 let list = _this.tableData.records;
                  //对数据进行解析处理
            for (let i = 0; i < list.length; i++) {
              //  //日期解析
              // if(list[i].xgsj!== undefined && list[i]!== "" && list[i].xgsj!==null){
              //     list[i].xgsj = formateDate(list[i].xgsj);
              // }
              // if(list[i].yxqZ!== undefined && list[i]!== "" && list[i].yxqZ!==null){
              //     list[i].yxqZ = formateDate(list[i].yxqZ);
              // }
              if(list[i].yzlx=="0"){
                  list[i].yzlx="电子发票专用章"
              }
              if(list[i].yxbz=="Y"){
                  list[i].yxbz="有效"
              }else{
                  list[i].yxbz="无效"
              }
             
            }
             _this.tableData.records = list;
            } else {
                _this.$message({
                message: "查询失败," + res.errorMsg,
                type: "error",
                });
            }
             _this.loadingSeal=false;
          }
        )
    },
    onDel(scope){
      let _this=this;
      let id=scope.row.id;
      let fpzyzLj=scope.row.fpzyzLj;
     
      let para={id,fpzyzLj}
      _this
        .$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          if (para != null) {
                if (validate.checkForbiddenWordForm(JSON.stringify(para))) {
                  _this.$message({
                    showClose: true,
                    message: "不允许有特殊字符",
                    type: "error",
                  });
                  return;
                }
          }
          _this.$api.post(
            _this.$apis.icpmanagement +
              "/taxpayer/sealmanagement/deleteSealInfo", para,
            function (res) {
              if (res.success) {
                _this.searchForm();
                _this.$message({
                  showClose:true,
                  message: "删除成功",
                  type: "success",
                });
              } else {
                _this.$message({
                  showClose:true,
                  message: "删除失败," + res.errorMsg,
                  type: "error",
                });
              }
            }
          );
        });

    },
    //保存成功后关闭抽屉
    Addback() {
       this.drawerAdd=false;
       this.init_Table()
    },
    editback(zzjgDm){
      let _this=this;
      if(zzjgDm==undefined){
         this.update=false;
      }else{
         this.update=false;
         _this.queryForm.zzjgDm=zzjgDm;
          this.init_Table();
      }
     
      
    },
    lookback(){
      this.look=false;
    },
     //搜索
    searchForm() {
       this.init_Table();  
    },
     //重置
    resetForm(queryForm){
       if (this.$refs[queryForm] !==undefined) { 
           this.$refs[queryForm].resetFields();
       }
      
    },
    onLook(scope){
       this.look= true;
      let id=scope.row.id;
      let zzjgDm=scope.row.zzjgDm;
      this.updatePageData = {
        id:id,
        zzjgDm:zzjgDm,
      };
    },
    //弹出新增页面抽屉
    onAdd() {
      let _this=this;
      let zzjgDm=_this.queryForm.zzjgDm;
      let zzjgMc=_this.queryForm.zzjgMc; 
      console.log("zzjgDm=="+zzjgDm);
     
      if(zzjgDm==""){
           _this.$message({
                showClose:true,
                message: "请先选择组织机构！",
                type: "warning",
                });
      }else{
         _this.loading.Addloading=true;
          _this.$api.post(
            _this.$apis.icpmanagement +
              "/taxpayer/sealmanagement/getSeal/"+zzjgDm,{},
            function (res) {
              if (res.success) { 
                 _this.drawerAdd = true;
                 _this.addPageData={
                   zzjgDm:zzjgDm,
                   zzjgMc:zzjgMc,
                 }
              }
              else{
                _this.$message({
                showClose:true,
                message: res.errorMsg,
                type: "warning",
                });
               }
               _this.loading.Addloading=false;
            }
          );
         

      }
    },
     //弹出修改页面抽屉
    onEdit(scope) {
      this.update = true;
      let id=scope.row.id;
      let zzjgDm=scope.row.zzjgDm;
      this.updatePageData = {
        id:id,
        zzjgDm:zzjgDm,
      };
    },
        //分页页码操作
    handleSelectionChange(val) {
      this.tr_sels = val;
    },
    //分页操作
    handleCurrentChange(val) {
      this.queryForm.pageNo = val;
      //更改分页后重新初始化页面
      this.init_Table();
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      //更改分页后重新初始化页面
      this.init_Table();
    },

        //树形菜单过滤函数
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        //树形菜单击后事件
        TreeNodeClick(data,node){
        console.log(data.organCode,data.organName);
        let _this = this;
        let zzjgDm = data.organCode;
        let zzjgMc= data.organName;
        _this.queryForm.zzjgDm=zzjgDm;
        _this.queryForm.zzjgMc=zzjgMc;
        let params={zzjgDm}
        if (params != null) {
                if (validate.checkForbiddenWordForm(JSON.stringify(params))) {
                  _this.$message({
                    showClose: true,
                    message: "不允许有特殊字符",
                    type: "error",
                  });
                  return;
                }
          }
        _this.loadingSeal=true;
        this.$api.post(
            _this.$apis.icpmanagement +"/taxpayer/sealmanagement/sealManageMentList",params,
            function (res) {
            if (res.success) {
                 _this.tableData = res.data;
                 let list = _this.tableData.records;
                  //对数据进行解析处理
            for (let i = 0; i < list.length; i++) {
               //日期解析
              if(list[i].yxqQ!== undefined && list[i]!== "" && list[i].yxqQ!==null){
                  list[i].yxqQ = formateDate(list[i].yxqQ);
              }
              if(list[i].yxqZ!== undefined && list[i]!== "" && list[i].yxqZ!==null){
                  list[i].yxqZ = formateDate(list[i].yxqZ);
              }
             
              if(list[i].yzlx=="0"){
                  list[i].yzlx="电子发票专用章"
              }
              if(list[i].yxbz=="Y"){
                  list[i].yxbz="有效"
              }else{
                  list[i].yxbz="无效"
              }
               
            }
             _this.tableData.records = list;
            } else {
                _this.$message({
                showClose:true,
                message: "查询失败," + res.errorMsg,
                type: "error",
                });
            }
            _this.loadingSeal=false;
            }
         )
              if(node.childNodes.length==0){
                    // this.val_dwssjg = data.label;
                   
                      this.dialogVisible = false;
              }
             // console.log(node.childNodes.length);

        },
    }
}
</script>

<style>

</style>