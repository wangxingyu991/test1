<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">产品信息配置</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <div class="rh-pull-left">
          <el-button type="primary" @click="onAdd">新增</el-button>
        </div>
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
            <el-form-item prop="productName">
              <el-input v-model="queryForm.productName" placeholder="产品名称"></el-input>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
            <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
          </el-form>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange" v-loading="loading">
          <template slot="empty">
            <div class="pic_nodata">
            </div>
          </template>
          <el-table-column show-overflow-tooltip align="left" prop="productName" label="产品名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="keywords" label="关键字"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="statue" label="有效标志"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="createTime" label="创建时间"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="forDetail(scope.row)">预览</el-button>
              <el-button class="table_btn" type="text" @click="onUpdate(scope.row.productId)">修改</el-button>
              <el-button class="table_btn" type="text" v-if="scope.row.statue === '有效'" @click="changeStatus(scope.row.productId,'N')">禁用</el-button>
              <el-button class="table_btn" type="text" v-if="scope.row.statue === '无效'" @click="changeStatus(scope.row.productId,'Y')">启用</el-button>
              <el-button class="table_btn" type="text" @click="delate_fn(scope.row.productId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rh-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total"
          :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
        </el-pagination>
      </div>
    </div>
    <!-- 新增页面抽屉 -->
    <div class="drawer-container add" :key=1000>
      <el-drawer size="73%" :visible.sync="drawer" append-to-body>
        <AddPage v-if="drawer" @back="back" @reload="init"></AddPage>
      </el-drawer>
    </div>
    <!-- 修改页面抽屉 -->
    <div class="drawer-container add" :key=1001>
      <el-drawer size="73%" :visible.sync="drawer2" append-to-body>
        <UpdatePage v-if="drawer2" @back="back" @reload="init" :updatePageData="updatePageData"></UpdatePage>
      </el-drawer>
    </div>
    <el-drawer :visible.sync="showDetail" size="73%" append-to-body :wrapperClosable=false :with-header=true>
      <Detail v-if="showDetail" @back="back" @reload="init" :detailData="detailData"></Detail>
    </el-drawer>
  </div>
</template>

<script>
import AddPage from "./InfoAdd.vue";
import UpdatePage from "./InfoUpdate.vue";
import Detail from './Detail.vue'
import { formateDate } from "@/utils/tools.js";
import validate from "@/utils/validate.js";

export default {
  components: {
    AddPage,
    UpdatePage,
    Detail,
  },

  data() {
    return {
      drawer: false,
      drawer2: false,
      showDetail: false,
      loading: false,
      //查询表单
      queryForm: {
        productName: "",
        categoryId: "",
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
    };
  },

  created() { },

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
      _this.loading = true;
      this.$api.post(
        _this.$apis.manage + "/manage/product/info/listProductInfo",
        params,
        function (res) {
          if (res.success) {
            _this.tableData = res.data;
            let list = _this.tableData.records;
            //对数据进行解析处理
            for (let i = 0; i < list.length; i++) {
              //标志位解析
              if (list[i].statue == "Y") {
                list[i].statue = "有效";
              } else {
                list[i].statue = "无效";
              }
              //日期解析
              if (
                list[i].createTime !== undefined &&
                list[i] !== "" &&
                list[i].createTime !== null
              ) {
                list[i].createTime = formateDate(list[i].createTime);
              }
            }
            _this.tableData.records = list;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
          _this.loading = false;
        }
      );
    },

    //详情页预览
    forDetail(row) {
      let _this = this;
      _this.detailData = row;
      _this.showDetail = true;
    },

    //初始化分页
    init_page() {
      this.page.total = this.tableData.total;
      this.page.size = this.tableData.size;
      this.page.current = this.tableData.current;
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
    delate_fn(productId) {
      let _this = this;

      _this
        .$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          _this.$api.delete(
            _this.$apis.manage +
            "/manage/product/info/deleteProductInfo/" +
            productId,
            {},
            function (res) {
              if (res.success) {
                _this.searchForm();
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
    },

    //弹出修改页面抽屉
    onUpdate(productId) {
      this.drawer2 = true;
      this.updatePageData = {
        productId: productId,
      };
    },

    //保存成功后关闭抽屉
    back() {
      this.drawer = false;
      this.drawer2 = false;
      this.queryForm.pageNo = 1;
      this.init_Table();
    },

    //初始化table
    init() {
      this.init_Table();
    },

    //修改有效标志
    changeStatus(productId, status) {
      let _this = this;
      _this.$api.post(
        _this.$apis.manage + "/manage/product/info/changeStatus/" + productId,
        { status: status },
        function (res) {
          if (res.success == true) {
            _this.$message({
              message: "状态修改成功",
              type: "success",
            });
            _this.searchForm();
          } else {
            _this.$message({
              message: "状态修改失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
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