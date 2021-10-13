<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">安全代理管理</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <el-button type="primary" @click="onAdd">新增</el-button>
        <div class="rh-pull-right">
          <el-form :model="queryForm" :rules="rules" ref="queryForm" :inline="false" label-width="0px" label-position="right">
            <el-form-item prop="fwqdz">
              <el-input v-model="queryForm.fwqdz" placeholder="代理服务器地址" maxlength="15"  onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" ></el-input>
            </el-form-item>
             <el-form-item prop="fwqms">
              <el-input v-model.trim="queryForm.fwqms" placeholder="服务描述" maxlength="100"></el-input>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchForm('queryForm')"></el-button>
            <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
          </el-form>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange" v-loading="loading">
          <template slot="empty">
            <div class="pic_nodata"></div>
          </template>
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope"> {{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="fwqdz" label="代理服务器地址" ></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="fwqdkh" label="代理服务器端口号" ></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="fwqms" label="服务描述"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="sfptkey" label="是否使用平台KEY">
             <template slot-scope="scope">
               <span class="cell-red" v-if="scope.row.sfptkey =='否'">{{scope.row.sfptkey}}</span>
               <span class="cell-green" v-if="scope.row.sfptkey =='是'">{{scope.row.sfptkey}}</span>
             </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="zdljs" prop="zdljs" label="最大连接数" width="110"></el-table-column>
          <el-table-column show-overflow-tooltip align="yxbz" prop="yxbz" label="有效标识" width="90">
             <template slot-scope="scope">
               <span class="cell-red" v-if="scope.row.yxbz =='无效'">{{scope.row.yxbz}}</span>
               <span class="cell-green" v-if="scope.row.yxbz =='有效'">{{scope.row.yxbz}}</span>
             </template>
          </el-table-column>
           <el-table-column show-overflow-tooltip align="xgsj" prop="xgsj" label="修改时间"></el-table-column>
          <el-table-column align="center" label="操作"  width="150">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="onEdit(scope.row.id)">修改</el-button>
              <el-button class="table_btn" type="text" @click="onDel(scope.row.id)">删除</el-button>
              <el-button class="table_btn" type="text" @click="onUpdate(scope.row.id)">更新配置</el-button>
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
        <editPage v-if="drawer" @back="back" @close="close"  @reload="init_Table" :updatePageData="updatePageData" ></editPage>
      </el-drawer>
    </div>

<!-- 新增更新配置页面 -->
    <div class="drawer-container add" :key=1001>
      <el-drawer :with-header="false" append-to-body size="60%" :visible.sync="updateConfdrawer">
        <updateConfPage v-if="updateConfdrawer" @back="back" @close="close" @reload="init_Table" :updateConfPageData="updateConfPageData" ></updateConfPage>
      </el-drawer>
    </div>
 
  </div>
</template>

<script>
import validate from "@/utils/validate.js";
import editPage from "./securityproxyEdit.vue";
import updateConfPage from "./securityproxyUpdateConf.vue";

export default {
  components: {
    editPage,
    updateConfPage
  },

  data() {
    return {
      drawer: false,
      updateConfdrawer: false,
      //查询表单
      queryForm: {
        fwqdz: "",
        fwqms: "",
        pageNo: 1,
        pageSize: 10,
      },
      page: {
        Total: 100,
        Size: [10, 20, 30],
        currentPage: 1,
      },
      tableData: [],
      //表格选择
      tr_sels: [],
      updatePageData: {},
      updateConfPageData: {},
      loading:{
        loadingList:false,
      },
      //校验规则
      rules: {
        fwqdz: [
          { required: false, message: "请输入代理服务器地址", trigger: "blur" },
          { max: 15, message: "最多15个字符", trigger: "blur" },
          { validator: this.$validate.isIp, trigger: "blur" },
        ],
        fwqms: [
          { required: false, message: "请输入代理服务器描述", trigger: "blur" },
          { max: 100, message: "最多100个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
      },
      loading: false,
    };
  },

  created() {},

  mounted() {
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
        _this.$apis.icpmanagement + "/taxcontrol/securityproxy/listSecurityproxy", params,
        function (res) {
          //关闭loading
          _this.loading=false;
          if (res.success) {
            _this.tableData = res.data;
            console.info(JSON.stringify(_this.tableData));
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
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
      this.init_Table();
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      //更改分页后重新初始化页面
      this.init_Table();
    },

    //搜索
    searchForm(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        //校验完成，进行查询
        if (valid) {
         this.queryForm.pageNo = 1;
         this.init_Table();
        }
      });
    },

    //删除
    onDel(id) {
      let _this = this;
      _this.$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        }).then(() => {
          _this.loading=true;
          _this.$api.delete(
            _this.$apis.icpmanagement + "/taxcontrol/securityproxy/deleteSecurityproxy/" + id, {},
            function (res) {
              _this.loading=false;
               _this.init_Table();
              if (res.success) {
                _this.$message({
                  message: "删除成功",
                  type: "success",
                });
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

    //弹出新增页面抽屉
    onAdd() {
      this.drawer = true;
      this.updatePageData = {};
    },

    //弹出修改页面抽屉
    onEdit(id) {
      this.drawer = true;
      this.updatePageData = {
        id: id,
      };
    },

    onUpdate(id) {
      this.updateConfdrawer = true;
      this.updateConfPageData = {
        id: id,
      };
    },
 

    //保存成功后关闭抽屉
    back() {
      this.drawer = false;
      this.updateConfdrawer = false;
      this.queryForm.pageNo = 1;
      this.init_Table();
    },

    //子页面关闭调用close方法
    close() {
      this.drawer = false;
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
