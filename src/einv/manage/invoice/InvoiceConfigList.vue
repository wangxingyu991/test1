<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">销售方基本信息配置</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <div class="rh-pull-left">
          <el-button type="primary" @click="onAdd">新增</el-button>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange" v-loading="loading">
          <el-table-column show-overflow-tooltip align="left" prop="xsfMc" label="销售方名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="xsfNsrsbh" label="销售方纳税人识别号"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="kpzddm" label="开票终端代码"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="xnsbh" label="虚拟设备号" ></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="status" label="有效标志" width="100"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="onUpdate(scope.row.makeeinvId)">修改</el-button>
              <el-button class="table_btn" type="text" v-if="scope.row.status === '有效'" @click="changeStatus(scope.row.makeeinvId,'N')">禁用</el-button>
              <el-button class="table_btn" type="text" v-if="scope.row.status === '无效'" @click="changeStatus(scope.row.makeeinvId,'Y')">启用</el-button>
              <el-button class="table_btn" type="text" @click="delate_fn(scope.row.makeeinvId)">删除</el-button>
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
    <div class="dailog">
      <el-dialog title="新增销售方信息" :visible.sync="add_Dialog" width="60%" append-to-body>
        <AddPage v-if="add_Dialog" @back="back" :addPageData="addPageData"></AddPage>
      </el-dialog>
    </div>
    <div class="dailog">
      <el-dialog title="修改销售方信息" :visible.sync="update_Dialog" width="60%" append-to-body>
        <UpdatePage v-if="update_Dialog" @back="back" :updatePageData="updatePageData"></UpdatePage>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import AddPage from "./InvoiceConfigAdd.vue";
import UpdatePage from "./InvoiceConfigUpdate.vue";
import validate from "@/utils/validate.js";

export default {
  components: {
    AddPage,
    UpdatePage,
  },

  data() {
    return {
      add_Dialog: false,
      update_Dialog: false,
      loading: false,
      //查询表单
      queryForm: {
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
    this.init_Table();
  },

  methods: {
    //搜索
    searchForm() {
      this.queryForm.pageNo = 1;
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
        _this.$apis.manage + "/manage/invoice/listInvoiceConfig",
        params,
        function (res) {
          if (res.success) {
            _this.tableData = res.data;
            let list = _this.tableData.records;
            //对数据进行解析处理
            for (let i = 0; i < list.length; i++) {
              if (list[i].status == "Y") {
                list[i].status = "有效";
              } else {
                list[i].status = "无效";
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

    //删除
    delate_fn(makeeinvId) {
      let _this = this;
      _this
        .$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          _this.$api.delete(
            _this.$apis.manage +
            "/manage/invoice/deleteInvoiceConfig/" +
            makeeinvId,
            {},
            function (res) {
              if (res.success) {
                _this.init_Table();
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

    //弹出新增页面
    onAdd() {
      let _this = this;
      _this.$api.get(
        _this.$apis.manage + "/manage/invoice/checkOnly",
        {},
        function (res) {
          if (res.success == true) {
            _this.add_Dialog = true;
            _this.addPageData = {};
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //弹出修改页面
    onUpdate(makeeinvId) {
      this.update_Dialog = true;
      this.updatePageData = {
        makeeinvId: makeeinvId,
      };
    },

    //保存成功后关闭
    back() {
      this.add_Dialog = false;
      this.update_Dialog = false;
      this.queryForm.pageNo = 1;
      this.init_Table();
    },

    //修改有效标志
    changeStatus(makeeinvId, status) {
      let _this = this;
      _this.$api.get(
        _this.$apis.manage + "/manage/invoice/checkOnly",
        {},
        function (res) {
          if (res.success == true || status == "N") {
            _this.$api.post(
              _this.$apis.manage +
              "/manage/invoice/changeStatus/" +
              makeeinvId,
              { status: status },
              function (res) {
                if (res.success == true) {
                  _this.$message({
                    message: "状态修改成功",
                    type: "success",
                  });
                  _this.init_Table();
                } else {
                  _this.$message({
                    message: "状态修改失败," + res.errorMsg,
                    type: "error",
                  });
                }
              }
            );
          } else {
            _this.$message({
              message: "系统已存在一条有效的销售方信息！",
              type: "error",
            });
          }
        }
      );
    },
  },
};
</script>