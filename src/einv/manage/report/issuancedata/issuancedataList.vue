<template>
  <div>
    <frameleftright>
      <div slot="left">
        <div class="tree-wrap">
          <div class="tree-body">
            <el-tree ref="tree" v-loading="treeload" element-loading-text="加载中..." :data="treeData" :props="defaultProps" @node-click="handleNodeClick" :load="loadNode" lazy highlight-current>
            </el-tree>
          </div>
        </div>
      </div>
      <div slot="right">
        <div class="rh-page-header">
          <div class="rh-head-and-operate">
            <div class="tips-content">
              <span class="rh-helpTip-text">开票数据</span>
            </div>
          </div>
        </div>
        <div class="rh-page-content">
          <div class="rh-operate clearfix">
            <el-button type="primary" @click="excelExport">导出</el-button>
            <div class="rh-pull-right">
              <el-form :model="queryForm" :rules="rules" ref="queryForm" :inline="false" label-width="0px" label-position="right">
                <el-form-item prop="date" style="width: 200px">
                  <el-date-picker v-model="queryForm.date" type="month" :editable="false" size="small" value-format="yyyyMM" placeholder="日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="" prop="source" style="width: 200px">
                  <el-select v-model="queryForm.source" placeholder="系统">
                    <el-option v-for="(item,index) in sysSelect" :key="index" :label="item" :value="item"></el-option>
                    <!-- <el-option label="系统2" value="2"></el-option> -->
                  </el-select>
                </el-form-item>
                <el-form-item label="" prop="invdtype" style="width: 200px">
                  <el-select v-model="queryForm.invdtype" placeholder="发票类型">
                    <el-option label="电子发票" value="E"></el-option>
                    <el-option label="纸质发票" value="Z"></el-option>
                  </el-select>
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
              <el-table-column label="序号" width="50px" align="center" fixed>
                <template slot-scope="scope"> {{ scope.$index + 1 }}</template>
              </el-table-column>
              <!-- 日期 -->
              <el-table-column show-overflow-tooltip align="center" :prop="tableAttributes[0].prop" :label="tableAttributes[0].label" width="150px"></el-table-column>
              <!-- 产品 -->
              <el-table-column show-overflow-tooltip align="left" :prop="tableAttributes[1].prop" :label="tableAttributes[1].label" width="100px"></el-table-column>
              <!-- 商品编码 -->
              <el-table-column show-overflow-tooltip align="center" :prop="tableAttributes[2].prop" :label="tableAttributes[2].label" width="200px"></el-table-column>
              <!-- 应税标志 -->
              <el-table-column show-overflow-tooltip align="center" :prop="tableAttributes[3].prop" :label="tableAttributes[3].label" width="100px">
                <template slot-scope="scope">
                  <span v-if="scope.row.isTaxItem == 0">免税</span>
                  <span v-if="scope.row.isTaxItem == 1">应交税</span>
                </template>
              </el-table-column>
              <!-- 专票金额 -->
              <el-table-column show-overflow-tooltip align="right" :prop="tableAttributes[4].prop" :label="tableAttributes[4].label" width="150px"></el-table-column>
              <!-- 专票税额 -->
              <el-table-column show-overflow-tooltip align="right" :prop="tableAttributes[5].prop" :label="tableAttributes[5].label" width="100px"></el-table-column>
              <!-- 普票金额 -->
              <el-table-column show-overflow-tooltip align="right" :prop="tableAttributes[6].prop" :label="tableAttributes[6].label" width="150px"></el-table-column>
              <!-- 普票税额 -->
              <el-table-column show-overflow-tooltip align="right" :prop="tableAttributes[7].prop" :label="tableAttributes[7].label" width="100px"></el-table-column>
              <!-- 发票类型 -->
              <el-table-column show-overflow-tooltip align="center" :prop="tableAttributes[8].prop" :label="tableAttributes[8].label" width="100px">
                <template slot-scope="scope">
                  <span v-if="scope.row.invdtype == 'E'">电子发票</span>
                  <span v-if="scope.row.invdtype == 'z'">纸质发票</span>
                </template>
              </el-table-column>
              <!-- 城市代码 -->
              <el-table-column show-overflow-tooltip align="center" :prop="tableAttributes[9].prop" :label="tableAttributes[9].label" width="100px"></el-table-column>
              <!-- 系统 -->
              <el-table-column show-overflow-tooltip align="left" :prop="tableAttributes[10].prop" :label="tableAttributes[10].label" width="100px"></el-table-column>
              <el-table-column align="center" label="操作" width="150px" fixed="right">
                <template slot-scope="scope">
                  <el-button class="table_btn" type="text" @click="onDetails(scope)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="rh-pagination">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="page.Size" :page-size="tableData.size">
            </el-pagination>
          </div>
          <!-- 查看抽屉页面 -->
          <div class="drawer-container detailed" :key="1001">
            <el-drawer append-to-body size="61.8%" :visible.sync="drawer">
              <detailPage v-if="drawer" @close="closeDetailed" :updatePageData="updatePageData"></detailPage>
            </el-drawer>
          </div>
        </div>
      </div>
    </frameleftright>
  </div>
</template>

<script>
import validate from "@/utils/validate.js";
import detailPage from "./issuancedataInfo.vue";
import frameleftright from "@/einv/tree/frame_lr.vue";

export default {
  components: {
    detailPage,
    frameleftright,
  },
  data() {
    return {
      drawer: false,
      editForm: {
        organId: "",
        organCode: "",
        superiorOrganCode: "",
        organPath: "",
        organTypeId: "",
        organName: "",
        organReferred: "",
        organAddress: "",
        organPostalcode: "",
        fax: "",
        organPhone: "",
        email: "",
        organMark: "",
        effectiveStartTime: "",
        effectiveEndTime: "",
        valid: "",
        choose: "",
      },
      queryForm: {
        orgCode: "",
        source: "",
        invdtype: "",
        pageNo: 1,
        pageSize: 10,
      },
      sysSelect: ["PNR", "OLAS", "IGM", "TA", "RPAS"],
      page: {
        Total: 100,
        Size: [10, 20, 30],
        currentPage: 1,
      },
      tableData: [],
      //表格选择
      tr_sels: [],
      updatePageData: {},
      defaultProps: {
        children: "children",
        label: "organName",
        isLeaf: "isParent",
      },
      treeData: [],
      treeload: true,
      //校验规则
      rules: {},
      tableAttributes: [
        {
          prop: "date",
          label: "日期",
        },
        {
          prop: "productName",
          label: "产品",
        },
        {
          prop: "goodstaxno",
          label: "商品编码",
        },
        {
          prop: "isTaxItem",
          label: "应税标志",
          isCustom: true,
          custom: [
            {
              key: 0,
              val: "免税",
            },
            {
              key: 1,
              val: "应交税",
            },
          ],
        },
        {
          prop: "issueValueSpecial",
          label: "专票金额",
        },
        {
          prop: "issueTaxSpecial",
          label: "专票税额",
        },
        {
          prop: "issueValueCommon",
          label: "普票金额",
        },
        {
          prop: "issueTaxCommon",
          label: "普票税额",
        },
        {
          prop: "invdtype",
          label: "发票类型",
          isCustom: true,
          custom: [
            {
              key: "E",
              val: "电子发票",
            },
            {
              key: "Z",
              val: "普通发票",
            },
          ],
        },
        {
          prop: "orgCode",
          label: "城市代码",
        },
        {
          prop: "source",
          label: "系统",
        },
        {
          prop: "createTime",
          label: "创建时间",
        },
        {
          prop: "modifyTime",
          label: "修改时间",
        },
      ],
      loading: false,
    };
  },

  created() {},

  mounted() {
    this.getTreeRoot();
    //this.init_Table();
  },

  methods: {
    getTreeRoot() {
      this.treeData = [];
      let _this = this;
      _this.treeload = true;
      _this.$api.get(
        this.$apis.icpmanagement + "/rest/permission/organmanage/treeroot",
        {},
        function (res) {
          console.info(JSON.stringify(res));
          if (res.success == true) {
            _this.treeData = res.data;
            _this.treeload = false;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },
    loadNode(node, resolve) {
      let _this = this;
      _this.treeload = true;
      if (node.level >= 1) {
        _this.$api.get(
          this.$apis.icpmanagement +
            "/rest/permission/organmanage/treechild/" +
            node.data.organCode,
          {},
          function (res) {
            let list = res.data;
            for (let i = 0; i < list.length; i++) {
              list[i].isParent = list[i].isParent == "true" ? true : false;
            }
            _this.treeload = false;
            return resolve(list);
          }
        );
      }
    },
    handleNodeClick(data) {
      let _this = this;
      if (_this.$refs["editForm"] != undefined) {
        _this.$refs["editForm"].resetFields();
      }
      _this.editForm.organId = data.organId;
      _this.editForm.organCode = data.organCode;
      _this.editForm.organName = data.organName;
      _this.init_Table();
    },

    //初始化表格
    init_Table() {
      /* let _this = this;
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
      } */
      let _this = this;
      let organCode = _this.editForm.organCode;
      if (organCode == "") {
        _this.$alert("请先选择组织机构", "提示", {
          confirmButtonText: "关闭",
          dangerouslyUseHTMLString: true,
        });
        return;
      }
      let params = this.queryForm;
      _this.$set(params, "orgCode", organCode);
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
      _this.loading = true;
      this.$api.post(
        _this.$apis.icpmanagement + "/taxpayer/issuancedata/listIssuanceData",
        params,
        function (res) {
          //关闭loading
          _this.loading = false;
          if (res.success) {
            _this.tableData = res.data;
            console.info(JSON.stringify(res.data));
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
    onDel(xmbh) {
      let _this = this;
      _this
        .$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          _this.loading = true;
          _this.$api.delete(
            _this.$apis.icpmanagement + "/taxpayer/imptemplate/.../" + xmbh,
            {},
            function (res) {
              _this.loading = false;
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
    onEdit(scope) {
      this.drawer = true;
      this.updatePageData = {
        /* xmbh: scope.row.xmbh,
          xmmc: scope.row.xmmc,
          sfbt: scope.row.sfbt,
          yxbz: scope.row.yxbz, */
      };
    },

    // 弹出详情页面
    onDetails(scope) {
      this.drawer = true;
      this.updatePageData = {
        date: scope.row.date,
        orgCode: scope.row.orgCode,
        source: scope.row.source,
        productName: scope.row.productName,
        goodstaxno: scope.row.goodstaxno,
        isTaxItem: scope.row.isTaxItem,
        issueValueSpecial: scope.row.issueValueSpecial,
        issueTaxSpecial: scope.row.issueTaxSpecial,
        issueValueCommon: scope.row.issueValueCommon,
        issueTaxCommon: scope.row.issueTaxCommon,
        invdtype: scope.row.invdtype,
        createTime: scope.row.createTime,
        modifyTime: scope.row.modifyTime,
      };
    },

    excelExport() {
      var _this = this;
      let params = _this.queryForm;
      params.export = JSON.stringify(this.tableAttributes);
      this.$api.post(
        _this.$apis.icpmanagement + "/taxpayer/issuancedata/export",
        params,
        function (res) {
          if (res.success) {
            _this.$message({
              type: "success",
              showClose: true,
              message: "数据正在导出中，请进入任务下载功能界面查询导出进度!",
            });
          } else {
            _this.$message({
              message: "数据导出失败!",
              showClose: true,
              type: "error",
            });
          }
        }
      );
    },

    //保存成功后关闭抽屉
    back() {
      this.drawer = false;
      this.queryForm.pageNo = 1;
      this.init_Table();
    },

    //子页面关闭调用close方法
    close() {
      this.drawer = false;
      this.queryForm.pageNo = 1;
    },

    //详情子页面关闭调用closeDetailed方法
    closeDetailed() {
      this.drawer = false;
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
