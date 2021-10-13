

<template>
  <div>
    <frame-left-right>
      <div slot="left">
            <!-- 左侧内容 -->
          <div class="tree-wrap">
              <div class="tree-serach">
                     <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
                             
                            <el-form-item label="" prop="sf">
                                <el-select v-model="queryForm.sf" placeholder="请选择省份" @change="chooseSf()" filterable  style="width:100%">
                                    <el-option 
                                    v-for="item in NsrsfList" 
                                    :key="item.sfdm" 
                                    :label="item.sf"
                                    :value="item.sf">
                                    </el-option>
                                    
                                </el-select>
                                 <!-- <el-button type="info" @click="resetForm('queryForm')">重置</el-button> -->
                            </el-form-item>
                            
                        </el-form>
                        
              </div>
              <div class="tree-body">
                    <el-tree ref="tree" 
                    :filter-node-method = "filterNode"  
                    :data="tree_Data"
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
                                税收分类编码维护
                              </span>
                             
                        </div>
                       
                  </div>
            </div>
          
            <div class="rh-page-content">
                    <div class="rh-operate clearfix">
                        <el-button type="primary" @click="lookUp()" :disabled="dis.isFlag">查看</el-button>
                        <el-button type="primary" @click="onUpdate()" :loading="loading.loadingList">更新</el-button>
                        <div class="rh-pull-right">
                         
                         <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
                             
                            <!-- <el-form-item label="" prop="sf">
                                <el-select v-model="queryForm.sf" placeholder="请选择省份" @change="chooseSf()">
                                    <el-option 
                                    v-for="item in NsrsfList" 
                                    :key="item.sfdm" 
                                    :label="item.sf"
                                    :value="item.sf">
                                    </el-option>
                                </el-select>
                            </el-form-item> -->
                             <el-form-item prop="spmc">
                               <el-input v-model="filterText" placeholder="请输入商品名称" maxlength="15"></el-input>
                            </el-form-item>
                          <el-button icon="el-icon-search" type="primary" @click="searchSpmc()"></el-button>
                            <el-button type="primary" @click="resetForm('queryForm')">重置</el-button>
                        </el-form> 
                            <!-- <el-input placeholder="请输入编码名称" v-model="filterText" class="input-with-select">
                                  <el-button slot="append" icon="el-icon-search" @click="searchSpmc()"></el-button>
                            </el-input>  -->
                           
                          </div>
                    </div> 
                     <div class="rh-table">
                    <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange" v-loading="loadingTaxcode"  @current-change="rowCurrentChange">
                    <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->
                    <template slot="empty">
                        <div class="pic_nodata"></div>
                    </template>
                   <el-table-column label="" width="50" align="center" >
                    <template slot-scope="scope">
                          <el-radio :label="scope.row.id" v-model="radioInvoice" @change.native="getCurrentRow2(scope)">&nbsp;</el-radio>
                    </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="left" prop="spbm" label="商品编码"></el-table-column>
                    <el-table-column show-overflow-tooltip align="left" prop="spmc" label="商品名称" ></el-table-column>
                    <el-table-column show-overflow-tooltip align="left" prop="spbmjc" label="商品编码简称"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="bb" label="商品编码版本号"></el-table-column>
                   
                    </el-table>
                </div>
                <div class="rh-pagination">
                    <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
                    </el-pagination>
                </div>
            </div> 
      </div>  
    </frame-left-right>
      <!-- 查看页面抽屉 -->
      <div class="drawer-container search" :key=1000>
        <el-drawer  size="60%"
          :visible.sync="view"
          append-to-body
          :wrapperClosable = false
          :with-header="true">
          <searchPage  v-if="view"  :searchPageData="searchPageData" @back="lookUpback">

          </searchPage>
        </el-drawer>
      </div>
  </div>
</template>

<script>
  import searchPage from './taxcodeLook.vue'
  import frameLeftRight from "@/eniv/demo/frame/frame_lr.vue"
  import validate from "@/utils/validate.js";
export default {
    components:{
      searchPage,
      frameLeftRight,
    
    },
    data(){
      return{
      loadingTaxcode:false,
      radioInvoice:"",
      view:false,
      isDialogShowAdd:false,
      isDialogShowEdit:false,
      //查询表单
      queryForm: {
        sf:"北京",
        spmc:"",
        spbm:"",
        pageNo: 1,
        pageSize: 10,
      },
      boolean:{
            flag:false,
          },
      loading:{
        loadingList:false,
      },
      dis:{
        isFlag:true,
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
      page: {
        Total: 100,
        Size: [10, 20, 30],
        currentPage: 1,
      },
      tableData: [],
      //表格选择
      tr_sels: [],
      NsrsfList:[],
      treeData:[], 
      searchPageData:{},
      //树型选择器
      filterText: "",
      //菜单树的数据
      tree_Data: [],
      defaultProps: {
        children: "children",
        label: "spmc",
        isLeaf: 'isParent'
      },
              drawer:false,//抽屉弹出层
            //弹出层表单内容
            labelPosition:'right',
           
        }
    },
      //vuex参数监听
    watch: {
        filterText:function(val){
            console.log(val);
            this.$refs.tree.filter(val);
        },
         //树形菜单
      treeData(newVal) {
        this.tree_Data = newVal;
      },
      },
    mounted() {
  
    //页面初始化的时候动态获取省份
    this.init_sf();
    this.chooseSf();//初始化加载
    //this.getTreeRoot();
    },
  methods:{
     getCurrentRow2(scope){
         this.dis.isFlag=false;
         this.queryForm.spbm=scope.row.spbm;
    },
    loadNode(node, resolve){
    let _this = this;
    let sf=_this.queryForm.sf
     //_this.treeload=true;
      if (node.level >= 1) {
        _this.$api.get(_this.$apis.icpmanagement+"/basic/taxcode/treechild/"+node.data.spbm+"/"+sf, {}, function (res) {
          let list = res.data;
          for(let i = 0;i < list.length;i++){
            
            list[i].isParent=(list[i].isParent=='true'?true:false);
          }
          //_this.treeload = false;
          return resolve(list);
        });
      }
    },
     rowCurrentChange(row){
           //如果没有row,终止
         if(!row) return
         //把当前行label绑定的值和v-model绑定的值相同时,单选按钮就可以选中
         this.radioInvoice = row.id;
         this.dis.isFlag=false;
         this.queryForm.spbm=row.spbm;
       
      },
    chooseSf(){
      let _this=this;
      let spmc=this.filterText;
      _this.queryForm.spmc=spmc;
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
       this.$api.post(
        _this.$apis.icpmanagement +"/basic/taxcode/SpbmList",params,
        function (res) {
          if (res.success) {
             _this.treeData= res.data;
            // _this.treeload = false; 
          } else {
            _this.$message({
               showClose:true,
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
      _this.loadingTaxcode=true;
       this.$api.post(
        _this.$apis.icpmanagement+"/basic/taxcode/listTaxCode", params,
        function (res) {
          if (res.success) {
            _this.tableData = res.data;
            let list = _this.tableData.records;
            _this.tableData.records = list;
             _this.queryForm.spmc=""
          } else {
             _this.queryForm.spmc=""
            _this.$message({
               showClose:true,
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
           _this.loadingTaxcode=false;
        }
      );      

    },
    //搜索
    searchSpmc(){
      let sf = this.queryForm.sf;
      let _this=this;
      if(sf ==""){
        _this.$message({
           showClose:true,
              message: "请先选择省份！",
              type: "warning",
            });
      }else{
       this.chaxunSpmc();
      }
    },
     
    chaxunSpmc() {
      let _this=this;
      let spmc= _this.filterText;
      _this.queryForm.spmc=spmc;
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
        this.$api.post(
        _this.$apis.icpmanagement +"/basic/taxcode/SpbmList",params,
        function (res) {
          if (res.success) {
                let list = res.data;
                  for(let i = 0;i < list.length;i++){
                    list[i].isParent=(list[i].isParent=='true'? true:false);
                  }
                 // _this.treeload=false;
                _this.treeData= list; 
          } else {
            _this.$message({
              showClose:true,
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
          
        }
      );
      _this.loadingTaxcode=true;
       this.$api.post(
        _this.$apis.icpmanagement+"/basic/taxcode/listTaxCode", params,
        function (res) {
          if (res.success) {
            _this.tableData = res.data;
            let list = _this.tableData.records;
            _this.tableData.records = list;
            _this.queryForm.spmc=""; 
          } else {
             _this.queryForm.spmc=""
            _this.$message({
              showClose:true,
              message: "查询失败," + res.errorMsg,
              type: "error",
              
            });
          }
           _this.loadingTaxcode=false;
        }
      );  
          
    },

    page_Table(){
      let _this=this;
       let spmc= _this.filterText;
      _this.queryForm.spmc=spmc;
      let params =_this.queryForm;
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
       this.$api.post(
        _this.$apis.icpmanagement+"/basic/taxcode/listTaxCode", params,
        function (res) {
          if (res.success) {
            _this.tableData = res.data;
            let list = _this.tableData.records;
            _this.tableData.records = list;
          } else {
            _this.$message({
              showClose:true,
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );      
    },
    lookUp(){
      let _this=this;
      let sf=_this.queryForm.sf;
      let spbm=_this.queryForm.spbm;
      _this.view = true;
       _this.searchPageData={
             spbm:spbm,
             sf:sf,
        }
      // let spbm =_this.tr_sels.map(item => item.spbm);
      // if(spbm.length>1){
      //   _this.$message({
      //             message: "请选中一个进行查看!",
      //             type: "warning",
      //          });
      //  }
      //  else{
      //      _this.view = true;
      //      _this.searchPageData={
      //        spbm:spbm,
      //        sf:sf,
      //      }
      //  }
    },
    lookUpback(){
        this.view=false;
    },
    onUpdate(){
        let _this=this;
        let sf=_this.queryForm.sf;
        if(sf==""){
            _this.$message({
                  showClose:true,
                  message: "请先选择省份",
                  type: "warning",
                }); 
            return;
        }
         _this.$confirm("税收分类编码数量较多，更新时间稍长，确定更新"+sf+"这个省份下的编码？", "提示", {
              type: "warning",
           })
            .then(() => {
           _this.loading.loadingList=true;
                this.$api.post(
                _this.$apis.icpmanagement +"/basic/taxcode/getUpdateTaxCode/"+sf,{},
                function (res) {
                if (res.success) {
                     let list=res.data;
                     console.log("返回list"+list.returncode);
                     console.log("返回list"+list.returnmsg);
                      _this.loading.loadingList=false;
                     if(list.returncode=="0"){
                            _this.chooseSf();
                            _this.$message({
                            showClose:true,
                            message: "更新成功！",
                            type: "success",
                            });
                      }else{
                            _this.$message({
                            showClose:true,
                            message: "更新失败！"+list.returnmsg,
                            type: "error",
                            });
                      }
                 } else {
                   _this.loading.loadingList=false;
                    _this.$message({
                    showClose:true,
                    message: res.errorMsg,
                    type: "error",
                    });
                }
                }
             );  
         })
    },
      init_sf(){
      let _this = this;
      this.$api.post(
        _this.$apis.icpmanagement +"/basic/taxcode/getAllSf",{},
        function (res) {
          if (res.success) {
             _this.NsrsfList= res.data; 
          } else {
            _this.$message({
              showClose:true,
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );  
    },
    //分页页码操作
    handleSelectionChange(val) {
      this.tr_sels = val;
    },
    //分页操作
    handleCurrentChange(val) {
      this.queryForm.pageNo = val;
      //更改分页后重新初始化页面
      this.page_Table();
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      //更改分页后重新初始化页面
      this.page_Table();
    },

        //树形菜单过滤函数
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        //树形菜单击后事件
        TreeNodeClick(data,node){
          let _this=this;
           let spbm=data.spbm;
            _this.view = true;
           let sf=_this.queryForm.sf;
           _this.searchPageData={
             spbm:spbm,
             sf:sf,
           }
              if(node.childNodes.length==0){
                    console.log(data.label);
                    this.dialogVisible = false;
              }
              console.log(node.childNodes.length);
           

        },
        //重置
    resetForm(queryForm){
       this.filterText="";
      //  this.queryForm.sf="";
      //  if (this.$refs[queryForm] !==undefined) { 
      //      this.$refs[queryForm].resetFields();
      //  }
      
    },
    }
}

</script>

<style>

</style>