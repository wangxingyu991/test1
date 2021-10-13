<template>
  <div>
    <frame-tree :treeData="treeData" :defaultExpandedKeys="defaultExpandedKeys" @getnode="getnode">
      <div>
        <div class="rh-page-header">
          <div class="rh-head-and-operate">
            <div class="tips-content">
              <span class="rh-helpTip-text" :v-model="productName">计费规则配置{{productName}}</span>
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
                <el-form-item prop="mainAttrId">
                  <el-select v-model="queryForm.mainAttrId" placeholder="产品大类">
                    <el-option key="" label="所有产品大类" value=""></el-option>
                    <el-option v-for="item in queryForm.option_mainAttrName" :key="item.mainAttrId" :label="item.mainAttrName" :value="item.mainAttrId"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="feeType">
                  <el-select v-model="queryForm.feeType" placeholder="计费类型">
                    <el-option key="" label="所有计费类型" value=""></el-option>
                    <el-option key="0" label="单项计费" value="0"></el-option>
                    <el-option key="1" label="组合计费" value="1"></el-option>
                  </el-select>
                </el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
                <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
              </el-form>
            </div>
          </div>
          <div class="rh-table">
            <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange" @row-click="handleRowClick" ref="handSelectTest_multipleTable" v-loading="loading">
              <template slot="empty">
                <div class="pic_nodata">
                </div>
              </template>
              <el-table-column show-overflow-tooltip align="center" prop="feeTypeName" label="计费类型" width="100"></el-table-column>
              <el-table-column show-overflow-tooltip align="right" prop="price" label="价格" width="120"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="mainAttrName1" label="大类一" width="120"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="subAttrName1" label="小类一" width="120"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="mainAttrName2" label="大类二" width="120"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="subAttrName2" label="小类二" width="120"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="mainAttrName3" label="大类三" width="120"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="subAttrName3" label="小类三" width="120"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="mainAttrName4" label="大类四" width="120"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="subAttrName4" label="小类四" width="120"></el-table-column>
              <el-table-column align="center" label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button class="table_btn" type="text" @click="onUpdate(scope.row)">修改</el-button>
                  <el-button class="table_btn" type="text" @click="delate_fn(scope.row.productPriceConfigId)">删除</el-button>
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
          <el-drawer size="61.8%" :visible.sync="drawer" append-to-body>
            <AddPage v-if="drawer" @back="back" @reload="init" :addPageData="addPageData"></AddPage>
          </el-drawer>
        </div>
        <!-- 修改页面抽屉 -->
        <div class="drawer-container add" :key=1001>
          <el-drawer size="61.8%" :visible.sync="drawer2" append-to-body>
            <UpdatePage v-if="drawer2" @back="back" @reload="init" :updatePageData="updatePageData"></UpdatePage>
          </el-drawer>
        </div>
      </div>
    </frame-tree>
  </div>
</template>

<script>
import frameTree from "@/einv/tree/frameTree.vue";
import AddPage from "./PriceAdd.vue";
import UpdatePage from "./PriceUpdate.vue";
import { formateDate } from "@/utils/tools.js";
import validate from "@/utils/validate.js";

export default {
  components: {
    frameTree,
    AddPage,
    UpdatePage,
  },

  data() {
    return {
      productId: "",
      productName: "",
      defaultExpandedKeys: [],
      treeData: [],
      drawer: false,
      drawer2: false,
      loading: false,
      //查询表单
      queryForm: {
        mainAttrId: "",
        option_mainAttrName: [],
        feeType: [],
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
      addPageData: {},
      updatePageData: {},
    };
  },

  mounted() {
    this.initTree();
  },

  methods: {
    //初始化树
    initTree() {
      let _this = this;
      _this.loading=true;
      this.$api.get(
        _this.$apis.manage + "/manage/product/mainclass/getProductTree",
        {},
        function (res) {
          if (res.success) {
            _this.treeData = res.data;
            //默认展开
            _this.defaultExpandedKeys.push(res.data[0].id);
            //模拟点击
            _this.$nextTick().then(() => {
              $(".el-tree-node").eq(1).click();
            });
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
          _this.loading=false;
        }
      );
    },

    getnode(value) {
      this.tableData = [];
      if (value.data.xh == "1") {
        //产品节点xh为"1"
        this.productId = value.data.id;
        this.productName = "(" + value.data.label + ")";
        this.init_Table();
        this.getOption();
      }
    },

    //获取下拉数据
    getOption() {
      let _this = this;
      let params;
      _this.$api.get(
        _this.$apis.manage +
        "/manage/product/price/getOption/" +
        _this.productId,
        params,
        function (res) {
          if (res.success) {
            _this.queryForm.option_mainAttrName = res.data;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //初始化表格
    init_Table() {
      let _this = this;
      let params = this.queryForm;
      _this.$set(params, "productId", _this.productId);
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
        _this.$apis.manage + "/manage/product/price/listPrice/",
        params,
        function (res) {
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
    //点击行触发，改变复选框选中状态
    handleRowClick(row, column, event) {
      this.$refs.handSelectTest_multipleTable.toggleRowSelection(row);
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
    delate_fn(productPriceConfigId) {
      let _this = this;
      _this
        .$confirm("删除记录会删除该大类的所有组合，确定删除吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          _this.$api.delete(
            _this.$apis.manage +
            "/manage/product/price/deletePrice/" +
            productPriceConfigId,
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
      let _this = this;
      if (_this.productId == "") {
        _this.$message({
          message: "请您先选择产品",
          type: "warning",
        });
        return;
      }
      _this.drawer = true;
      _this.addPageData = {
        productId: _this.productId,
      };
    },

    //弹出修改页面抽屉
    onUpdate(row) {
      let _this = this;
      _this.drawer2 = true;
      _this.updatePageData = {
        productId: _this.productId,
        row: row,
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