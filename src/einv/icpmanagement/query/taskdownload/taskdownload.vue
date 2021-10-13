<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">任务下载</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <div class="rh-pull-right">
          <el-form
            :model="queryForm"
            ref="queryForm"
            :inline="false"
            label-width="0px"
            label-position="right"
          >
            <el-form-item label="" prop="rwmc">
              <el-input
                v-model="queryForm.rwmc"
                placeholder="请输入功能名称或任务名称"
              ></el-input>
            </el-form-item>
            <el-form-item prop="wjzt">
              <el-select v-model="queryForm.wjzt" placeholder="请选择任务状态">
                <el-option
                  v-for="item in rwzt_array"
                  :key="item.rwztdm"
                  :label="item.rwztmc"
                  :value="item.rwztdm"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="tjsj" class="rangDate">
              <el-date-picker
                v-model="queryForm.tjsj"
                type="daterange"
                range-separator="-"
                start-placeholder="提交开始日期"
                end-placeholder="提交结束日期"
                size="mini"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="wcsj" class="rangDate">
              <el-date-picker
                v-model="queryForm.wcsj"
                type="daterange"
                range-separator="-"
                start-placeholder="完成开始日期"
                end-placeholder="完成结束日期"
                size="mini"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>

            <el-button
              icon="el-icon-search"
              type="primary"
              @click="searchForm"
            ></el-button>
            <el-button
              type="primary"
              @click="resetForm('queryForm')"
              style="margin-left: 0px"
              >重置</el-button
            >
          </el-form>
        </div>
      </div>
      <div class="rh-table" id="fpqdData">
        <!-- <el-row>
            <el-col :span="24">
                <el-button type="primary" size="small" icon="el-icon-plus" @click="exportExcel">导出</el-button>
            </el-col>
        </el-row> -->
        <el-table
          :data="tableData.records"
          stripe
          border
          @selection-change="handleSelectionChange"
          v-loading="loading"
        >
          <template slot="empty">
            <div class="pic_nodata"></div>
          </template>
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="left"
            prop="rwmc"
            min-width="220px"
            label="任务名称"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="tjrmc"
            min-width="80px"
            label="提交人员"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="wjzt"
            min-width="80px"
            label="任务状态"
            :formatter="wjztFoematter"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="tjsj"
            min-width="130px"
            label="提交时间"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="wcsj"
            min-width="130px"
            label="完成时间"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="left"
            prop="wjlj"
            min-width="300px"
            label="下载地址"
          >
            <template slot-scope="scope">
              <el-link
                type="primary"
                :href="scope.row.wjlj"
                :underline="false"
                >{{ scope.row.wjmc}}</el-link
              >
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="操作"
            min-width="100px"
          >
            <template slot-scope="scope">
              <el-button
                class="table_btn"
                type="text"
                @click="onDel(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rh-pagination" id="fpqdDataPage">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :total="tableData.total"
          :current-page.sync="tableData.current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="tableData.size"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 新增页面抽屉 
    <div class="drawer-container add" :key=1000>
      <el-drawer :with-header="false" size="50%" :visible.sync="drawer">
        <editPage v-if="drawer" @back="back" @reload="init_Table" :updatePageData="updatePageData" ></editPage>
      </el-drawer>
    </div>-->
  </div>
</template>

<script>
//import editPage from "./emailtemplateEdit.vue";

export default {
  components: {
    //editPage
  },

  data() {
    return {
      loading: false,
      drawer: false,
      //查询表单
      queryForm: {
        rwmc: "",
        wjzt: "",
        tjsj: "",
        wcsj: "",
        pageNo: 1,
        pageSize: 10,
      },
      startTime: "",
      page: {
        Total: 100,
        Size: [10, 20, 30],
        currentPage: 1,
      },
      rwzt_array: [
        { rwztdm: "1", rwztmc: "已完成" },
        { rwztdm: "2", rwztmc: "执行中" },
        { rwztdm: "3", rwztmc: "未完成" },
      ],
      tableData: [],
      tableDataFphz: [],
      tableHeadFphz: [],
      fpkctjMap: [],
      //表格选择
      tr_sels: [],
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
      this.queryForm.tjsjksrq = null;
      this.queryForm.tjsjjsrq = null;
      this.queryForm.wcsjksrq = null;
      this.queryForm.wcsjjsrq = null;
      let params = this.queryForm;
      let tjsj = this.queryForm.tjsj;
      let wcsj = this.queryForm.wcsj;
      if (tjsj != "" && tjsj.length > 0) {
        let tjsjksrq = tjsj[0];
        let tjsjjsrq = tjsj[1];
        this.queryForm.tjsjksrq = tjsjksrq;
        this.queryForm.tjsjjsrq = tjsjjsrq;
      }

      if (wcsj != "" && wcsj.length > 0) {
        let wcsjksrq = wcsj[0];
        let wcsjjsrq = wcsj[1];
        this.queryForm.wcsjksrq = wcsjksrq;
        this.queryForm.wcsjjsrq = wcsjjsrq;
      }

      //打开loading
      _this.loading = true;
      this.$api.post(
        _this.$apis.icpmanagement + "/query/taskdownload/listTaskDownload",
        params,
        function (res) {
          //关闭loading
          _this.loading = false;
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
    wjztFoematter(row, column) {
      let wjzt = row.wjzt;
      console.log("wjzt.." + wjzt);
      console.log(row.wjzt);
      console.log(column);
      let wjztmc = "";
      for (let i = 0; i < this.rwzt_array.length; i++) {
        if (this.rwzt_array[i].rwztdm == wjzt) {
          wjztmc = this.rwzt_array[i].rwztmc;
        }
      }
      return wjztmc;
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

    //查询
    searchForm() {
      let _this = this;
      let params = this.queryForm;
      let sbtjxxdm = params.sbtjxxdm;
      let kprqyf = params.kprqyf;
      let fplxdm = params.fplxdm;
      if (kprqyf == "") {
        this.$message({
          message: "请选择开票日期月份",
          type: "error",
        });
      } else {
        if (fplxdm == "") {
          this.$message({
            message: "请选择发票类型",
            type: "error",
          });
        } else {
          if (sbtjxxdm == "") {
            this.$message({
              message: "请选择查询选项",
              type: "error",
            });
          }
        }
      }

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
      this.tableData = [];
      this.init_Table();
    },
    onDel(id) {
        let _this = this;
      _this
        .$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          _this.$api.delete(
            _this.$apis.icpmanagement + "/query/taskdownload/deleteTaskDownload/" + id,
            {},
            function (res) {
              if (res.success) {
                _this.init_Table();
                _this.$message({
                  showClose: true,
                  message: "删除成功",
                  type: "success",
                });
              } else {
                _this.$message({
                  showClose: true,
                  message: "删除失败," + res.errorMsg,
                  type: "error",
                });
              }
            }
          );
        });
    },
  },
};
</script>
<style lang="less">
.rh-root .rh-pull-right .el-form .el-form-item.rangDate .el-form-item__content {
  max-width: 350px;
}
</style>