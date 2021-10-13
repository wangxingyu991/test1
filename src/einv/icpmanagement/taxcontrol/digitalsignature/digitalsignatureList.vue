
<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">电子签章管理</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <el-button type="primary" @click="onAdd">新增</el-button>
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
            <el-form-item  prop="sf">
              <el-select v-model="queryForm.sf" placeholder="请选择省份" filterable>
                  <el-option 
                  v-for="item in provinceList" 
                  :key="item.id"
                  :label="item.sf"
                  :value="item.sf">
                  </el-option>
              </el-select>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
            <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
          </el-form>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData.records"  border @selection-change="handleSelectionChange" highlight-current-row @current-change="handleCurrentChangeRadioBox" v-loading="loading">
           <template slot="empty">
             <div class="pic_nodata"></div>
           </template>
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope"> {{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="sf" label="省份" width="80"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="jzzmc" label="印章名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="mysy" label="秘钥索引"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" label="处理状态">
             <template slot-scope="scope">
               <span class="cell-red" v-if="scope.row.clzt =='未申请'">{{scope.row.clzt}}</span>
               <span class="cell-blue" v-if="scope.row.clzt =='已申请'">{{scope.row.clzt}}</span>
               <span class="cell-orange" v-if="scope.row.clzt =='已下载'">{{scope.row.clzt}}</span>
               <span class="cell-green" v-if="scope.row.clzt =='印章已上传'">{{scope.row.clzt}}</span>
             </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="jbrxm" label="经办人" ></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="jbrsjh" label="经办人手机"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="yxbz" label="有效标识" width="90" >
             <template slot-scope="scope">
               <span class="cell-red" v-if="scope.row.yxbz =='无效'">{{scope.row.yxbz}}</span>
               <span class="cell-green" v-if="scope.row.yxbz =='有效'">{{scope.row.yxbz}}</span>
             </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="sqsj" label="修改时间"  width="150"></el-table-column>
          <el-table-column align="center" label="操作"  width="150">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="digitalsignatureOperate(scope.row)">签章操作</el-button>
              <el-button class="table_btn" type="text" @click="onDel(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rh-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
        </el-pagination>
      </div>
    </div>
    <!-- 新增页面抽屉 -->
    <div class="drawer-container add" :key=1000>
      <el-drawer :with-header="false" append-to-body size="60%" :visible.sync="drawer">
        <editPage v-if="drawer" @back="back"   @close="close" @reload="init_Table" :updatePageData="updatePageData" ></editPage>
      </el-drawer>
    </div>
    <!--电子签章设置页面抽屉 -->
    <div class="drawer-container add" :key=1001>
      <el-drawer :with-header="false" append-to-body size="70%" :visible.sync="drawerdigitalsignatureStep">
        <editPagedigitalsignatureStep v-if="drawerdigitalsignatureStep" @back="back" @reload="init_Table" :pageDatadigitalsignatureStep="pageDatadigitalsignatureStep" ></editPagedigitalsignatureStep>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import editPage from "./digitalsignatureEdit.vue";
import editPagedigitalsignatureStep from "./digitalsignatureStep.vue";
import validate from "@/utils/validate.js";

export default {
  components: {
    editPage,
    editPagedigitalsignatureStep
  },

  data() {
    return {
      drawer: false,
      drawerdigitalsignatureStep: false,
      //查询表单
      queryForm: {
        sf: "",
        pageNo: 1,
        pageSize: 10,
      },
      page: {
        Total: 100,
        Size: [10, 20, 30],
        currentPage: 1,
      },
      tr_currentRow: {},
      tableData: [],
      provinceList:[],
      //表格选择
      tr_sels: [],
      updatePageData: {},
      pageDatadigitalsignatureStep: {},
      loading: false,
    };
  },


  created() {},

  mounted() {
    this.init_province();
    this.init_Table();
  },

  methods: {
    //初始化表格
    init_Table() {
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
       //打开loading
      _this.loading=true;
      this.$api.post(
        _this.$apis.icpmanagement + "/taxcontrol/digitalsignature/listDigitalsignature", params,
        function (res) {
          //关闭loading
          _this.loading=false;
          if (res.success) {
            _this.tableData = res.data;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

        //初始化省份
    init_province(){
      let _this = this;
      this.$api.get(_this.$apis.icpmanagement +"/taxcontrol/digitalsignature/getProvince",{},
        function (res) {
          if (res.success) {
             _this.provinceList= res.data;
             //console.info(JSON.stringify(_this.provinceList));
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );  
    },


    handleCurrentChangeRadioBox(currentRow){
      //currentRow为一个对象，指的是当前行的数据
      this.tr_currentRow = currentRow;
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

    //搜索
    searchForm() {
      this.queryForm.pageNo = 1;
      this.init_Table();
    },

    //删除
    onDel(id) {
      let _this = this;
      _this
        .$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          //打开loading
          _this.loading=true;
          _this.$api.delete(
            _this.$apis.icpmanagement +
              "/taxcontrol/digitalsignature/deleteDigitalsignature/" + id, {},
            function (res) {
              //关闭loading
              _this.loading=false;
              if (res.success) {
                _this.$message({
                  message: "删除成功",
                  type: "success",
                });
                _this.searchForm();
              } else {
                _this.$message({
                  message: "删除失败," + res.errorMsg,
                  type: "error",
                });
              }
            }
          );
        });
    },

    //弹出电子签章配置页面抽屉
    digitalsignatureOperate(row) {
      this.drawerdigitalsignatureStep = true;
      this.pageDatadigitalsignatureStep = {
        row:row,
      };
    },

    //本地下载
    loaclhostDownload(){
      let _this = this;
        _this.$api.get(
        _this.$apis.icpmanagement +"/taxcontrol/digitalsignature/downloadSeal/" +_this.tr_currentRow.id, {},
        function (res) {
          if (res.success) {
            let downloadUrl = document.createElement('downloadUrl');
            downloadUrl.href = res.data.url;
            downloadUrl.setAttribute('target', '_blank')
            downloadUrl.click();

          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //弹出新增页面抽屉
    onAdd() {
      this.drawer = true;
      this.updatePageData = {};
    },

    //保存成功后关闭抽屉
    back() {
      this.drawer = false;
      this.drawerdigitalsignatureStep= false;
      this.updateConfdrawer = false;
      this.queryForm.pageNo = 1;
      this.init_Table();
    },

    //子页面关闭调用close方法
    close() {
      this.drawer = false;
      this.drawerdigitalsignatureStep= false;
      this.updateConfdrawer = false;
      this.queryForm.pageNo = 1;
    },

    //初始化table
    init() {
      this.init_Table();
    },

    //重置
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.queryForm.pageNo = 1;
      this.init_Table();
    },
  },
};
</script>
