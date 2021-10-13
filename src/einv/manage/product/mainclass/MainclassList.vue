<template>
  <div>
    <frame-tree :treeData="treeData" :defaultExpandedKeys="defaultExpandedKeys" @getnode="getnode">
      <div>
        <div class="rh-page-header">
          <div class="rh-head-and-operate">
            <div class="tips-content">
              <span class="rh-helpTip-text" :v-model="productName">产品大类配置{{productName}}</span>
              <span class="rh-helpTip-icon">
                <el-tooltip class="item" content="每个产品的产品大类，有且只有一个可以为主属性">
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </span>
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
                <el-form-item prop="mainAttrName">
                  <el-input v-model="queryForm.mainAttrName" placeholder="产品大类名称"></el-input>
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
              <el-table-column show-overflow-tooltip align="left" prop="mainAttrName" label="产品大类名称"></el-table-column>
              <el-table-column show-overflow-tooltip align="center" prop="isMain" label="主属性" width="80"></el-table-column>
              <el-table-column show-overflow-tooltip align="center" prop="isRequried" label="必选" width="80"></el-table-column>
              <el-table-column show-overflow-tooltip align="center" prop="feeScale" label="计费规则"></el-table-column>
              <el-table-column show-overflow-tooltip align="center" prop="sort" width="60" label="序号"></el-table-column>
              <el-table-column show-overflow-tooltip align="center" prop="statue" label="有效标志" width="80"></el-table-column>
              <el-table-column show-overflow-tooltip align="center" prop="createTime" label="创建时间"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button class="table_btn" type="text" @click="onUpdate(scope.row.mainAttrId)">修改</el-button>
                  <el-button class="table_btn" type="text" v-if="scope.row.statue === '有效'" @click="changeStatus(scope.row.mainAttrId,'N')">禁用</el-button>
                  <el-button class="table_btn" type="text" v-if="scope.row.statue === '无效'" @click="changeStatus(scope.row.mainAttrId,'Y')">启用</el-button>
                  <el-button class="table_btn" type="text" @click="delate_fn(scope.row.mainAttrId)">删除</el-button>
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
import AddPage from "./MainclassAdd.vue";
import UpdatePage from "./MainclassUpdate.vue";
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
      loading: false,
      productId: "",
      productName: "",
      defaultExpandedKeys: [],
      treeData: [],
      drawer: false,
      drawer2: false,
      //查询表单
      queryForm: {
        mainAttrName: "",
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
      }
    },

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
      this.$api.post(
        _this.$apis.manage +
        "/manage/product/mainclass/listMainClass/" +
        _this.productId,
        params,
        function (res) {
          if (res.success) {
            _this.tableData = res.data;
            let list = _this.tableData.records;
            //对数据进行解析处理
            for (let i = 0; i < list.length; i++) {
              if (list[i].feeScale == "0") {
                list[i].feeScale = "加法";
              } else if (list[i].feeScale == "1") {
                list[i].feeScale = "乘法";
              } else {
                list[i].feeScale = "组合加法";
              }
              if (list[i].isRequried == "Y") {
                list[i].isRequried = "是";
              } else {
                list[i].isRequried = "否";
              }
              if (list[i].isMain == "Y") {
                list[i].isMain = "是";
              } else {
                list[i].isMain = "否";
              }
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
        }
      );
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
    delate_fn(mainAttrId) {
      let _this = this;

      _this
        .$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          _this.$api.delete(
            _this.$apis.manage +
            "/manage/product/mainclass/deleteMainClass/" +
            mainAttrId,
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
    onUpdate(mainAttrId) {
      this.drawer2 = true;
      this.updatePageData = {
        mainAttrId: mainAttrId,
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
    changeStatus(mainAttrId, status) {
      let _this = this;
      _this.$api.post(
        _this.$apis.manage +
        "/manage/product/mainclass/changeStatus/" +
        mainAttrId,
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