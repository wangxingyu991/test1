<template>
  <div>
    <frame-tree :treeData="treeData" :defaultExpandedKeys="defaultExpandedKeys" @getnode="getnode">
      <div>
        <div class="rh-page-header">
          <div class="rh-head-and-operate">
            <div class="tips-content">
              <span class="rh-helpTip-text" :v-model="mainAttrName">产品小类配置{{mainAttrName}}</span>
            </div>
          </div>
        </div>
        <div class="rh-page-content">
          <div class="rh-operate clearfix">
            <div class="rh-pull-left">
              <el-button type="primary" :disabled="isAdd" @click="onAdd">新增</el-button>
            </div>
            <div class="rh-pull-right">
              <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
                <el-form-item prop="subAttrName">
                  <el-input v-model="queryForm.subAttrName" placeholder="产品小类名称"></el-input>
                </el-form-item>
                <el-button icon="el-icon-search" :disabled="isAdd" type="primary" @click="searchForm"></el-button>
                <el-button type="primary" :disabled="isAdd" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
              </el-form>
            </div>
          </div>
          <div class="rh-table">
            <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange" v-loading="loading">
              <template slot="empty">
                <div class="pic_nodata">
                </div>
              </template>
              <el-table-column show-overflow-tooltip align="left" prop="subAttrName" label="产品小类名称"></el-table-column>
              <el-table-column show-overflow-tooltip align="center" prop="isRequried" label="必选" width="80"></el-table-column>
              <el-table-column show-overflow-tooltip align="center" prop="sort" width="60" label="序号"></el-table-column>
              <el-table-column show-overflow-tooltip align="center" prop="statue" label="有效标志" width="80"></el-table-column>
              <el-table-column show-overflow-tooltip align="center" prop="createTime" label="创建时间"></el-table-column>
              <el-table-column show-overflow-tooltip align="center" label="操作">
                <template slot-scope="scope">
                  <el-button class="table_btn" type="text" @click="onUpdate(scope.row.subAttrId)">修改</el-button>
                  <el-button class="table_btn" type="text" v-if="scope.row.statue === '有效'" @click="changeStatus(scope.row.subAttrId,'N')">禁用</el-button>
                  <el-button class="table_btn" type="text" v-if="scope.row.statue === '无效'" @click="changeStatus(scope.row.subAttrId,'Y')">启用</el-button>
                  <el-button class="table_btn" type="text" @click="delate_fn(scope.row.subAttrId)">删除</el-button>
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
import AddPage from "./SubclassAdd.vue";
import UpdatePage from "./SubclassUpdate.vue";
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
      mainAttrName: "",
      mainAttrId: "",
      defaultExpandedKeys: [],
      treeData: [],
      drawer: false,
      drawer2: false,
      loading: false,
      isAdd: true,
      //查询表单
      queryForm: {
        subAttrName: "",
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
        _this.$apis.manage + "/manage/product/subclass/getProductClassTree",
        {},
        function (res) {
          if (res.success) {
            _this.treeData = res.data;
            //默认展开
            _this.defaultExpandedKeys.push(res.data[0].children[0].id);
            //模拟点击
            _this.$nextTick().then(() => {
              $(".el-tree-node").eq(2).click();
            });
            _this.isAdd = false;
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
      let _this = this;
      if (value.data.xh == "2") {
        _this.isAdd = false;
        //产品大类节点xh为"2"
        if (value.data.hasChild == "Y") {
          //是否有下级
          _this.productId = value.data.pid;
          _this.mainAttrId = value.data.id;
          this.mainAttrName =
            "(" + value.parent.data.label + "-" + value.data.label + ")";
          _this.init_Table();
        } else {
          _this.isAdd = true;
          _this.$message({
            message: "该产品大类不能配置下级！",
            type: "warning",
          });
        }
      } else if (value.data.xh == "1") {
        _this.isAdd = true;
        _this.$message({
          message: "请选择产品大类！",
          type: "warning",
        });
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
        "/manage/product/subclass/listSubClass/" + _this.mainAttrId,
        params,
        function (res) {
          if (res.success) {
            _this.tableData = res.data;
            let list = _this.tableData.records;
            //对数据进行解析处理
            for (let i = 0; i < list.length; i++) {
              if (list[i].isRequried == "Y") {
                list[i].isRequried = "是";
              } else {
                list[i].isRequried = "否";
              }
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
    delate_fn(subAttrId) {
      let _this = this;
      _this.$confirm("确定要删除记录吗?", "提示", { type: "warning", }).then(() => {
        _this.$api.delete(
          _this.$apis.manage +
          "/manage/product/subclass/deleteSubClass/" + subAttrId,
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
      if (_this.mainAttrId == "") {
        _this.$message({
          message: "请您先选择产品大类",
          type: "warning",
        });
        return;
      }
      _this.drawer = true;
      _this.addPageData = {
        productId: _this.productId,
        mainAttrId: _this.mainAttrId,
      };
    },

    //弹出修改页面抽屉
    onUpdate(subAttrId) {
      let _this = this;
      _this.drawer2 = true;
      _this.updatePageData = {
        subAttrId: subAttrId,
        mainAttrId: _this.mainAttrId,
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
    changeStatus(subAttrId, status) {
      let _this = this;
      _this.$api.post(
        _this.$apis.manage +
        "/manage/product/subclass/changeStatus/" +
        subAttrId,
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