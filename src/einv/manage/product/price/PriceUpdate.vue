<template>
  <div class="drawer-wrap drawer-xgjfgz">
    <div class="rh-drawer-head">
      <div class="drawer-title">修改计费规则</div>
    </div>
    <div class="rh-drawer-body">
      <el-form :model="form" ref="form" label-width="100px" label-position="right">
        <el-row>
          <el-col :span="24">
            <el-form-item label="计费类型" prop="feeType">
              <el-radio-group v-model='form.feeType' disabled>
                <el-radio-button label="0">单项计费</el-radio-button>
                <el-radio-button label="1">组合计费</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="isDxjf=='Y'">
          <el-col :span="12">
            <el-form-item label="产品大类" prop="mainAttrId">
              <el-select v-model="form.mainAttrId" placeholder="产品大类" disabled>
                <el-option key="" label="" value=""></el-option>
                <el-option v-for="item in option_mainAttrName" :key="item.mainAttrId" :label="item.mainAttrName" :value="item.mainAttrId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="isZhjf=='Y'">
          <el-col :span="12">
            <el-form-item label="产品大类一" prop="mainAttrId1">
              <el-select v-model="form.mainAttrId1" placeholder="产品大类" disabled>
                <el-option key="" label="" value=""></el-option>
                <el-option v-for="item in option_mainAttrName" :key="item.mainAttrId" :label="item.mainAttrName" :value="item.mainAttrId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品大类二" prop="mainAttrId2">
              <el-select v-model="form.mainAttrId2" placeholder="产品大类" disabled>
                <el-option key="" label="" value=""></el-option>
                <el-option v-for="item in option_mainAttrName" :key="item.mainAttrId" :label="item.mainAttrName" :value="item.mainAttrId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="isZhjf=='Y'">
          <el-col :span="12">
            <el-form-item label="产品大类三" prop="mainAttrId3">
              <el-select v-model="form.mainAttrId3" placeholder="产品大类" disabled>
                <el-option key="" label="" value=""></el-option>
                <el-option v-for="item in option_mainAttrName" :key="item.mainAttrId" :label="item.mainAttrName" :value="item.mainAttrId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品大类四" prop="mainAttrId4">
              <el-select v-model="form.mainAttrId4" placeholder="产品大类" disabled>
                <el-option key="" label="" value=""></el-option>
                <el-option v-for="item in option_mainAttrName" :key="item.mainAttrId" :label="item.mainAttrName" :value="item.mainAttrId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="rh-table table1" style="margin-left:100px" v-show="isDxjf=='Y'">
          <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange">
            <template slot="empty">
              <div class="pic_nodata">
              </div>
            </template>
            <el-table-column show-overflow-tooltip align="left" prop="subAttrName1" label="小类"></el-table-column>
            <el-table-column align="center" prop="price" label="价格">
              <template slot-scope="scope">
                <el-input v-model="scope.row.price" placeholder="请输入价格" maxlength="15"></el-input>
              </template>
            </el-table-column>
          </el-table>
          <div class="rh-pagination" style="margin-bottom: 20px;">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total"
              :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
            </el-pagination>
          </div>
        </div>
        <div class="rh-table table1" style="margin-left:100px" v-show="isZhjfTable=='Y'">
          <el-table :data="tableDataZhjf.records" stripe border height="300" @selection-change="handleSelectionChange1">
            <template slot="empty">
              <div class="pic_nodata">
              </div>
            </template>
            <el-table-column show-overflow-tooltip align="left" prop="subAttrName1" label="小类一"></el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="subAttrName2" label="小类二"></el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="subAttrName3" label="小类三"></el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="subAttrName4" label="小类四"></el-table-column>
            <el-table-column align="center" prop="price" label="价格" width="170">
              <template slot-scope="scope">
                <el-input v-model="scope.row.price" placeholder="请输入价格" style="width: 140px;" maxlength="15"></el-input>
              </template>
            </el-table-column>
          </el-table>
          <!-- <div class="rh-pagination" style="margin-bottom: 20px;">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange1" @size-change="handleSizeChange1" :total="tableDataZhjf.total"
              :current-page.sync="tableDataZhjf.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableDataZhjf.size">
            </el-pagination>
          </div> -->
        </div>
      </el-form>
    </div>
    <div class="rh-dialog-footer">
      <el-button @click="updateSubmit('form')" :loading="loading">保存</el-button>
      <el-button @click="close('form')">关闭</el-button>
    </div>
  </div>
</template>

<script>
import validate from "@/utils/validate.js";
export default {
  props: ["updatePageData"],

  data() {
    return {
      loading: false,
      isDxjf: "Y",
      isZhjf: "N",
      isZhjfTable: "N",
      option_mainAttrName: [],
      form: {
        feeType: "0",
        mainAttrId: "",
        mainAttrId1: "",
        mainAttrId2: "",
        mainAttrId3: "",
        mainAttrId4: "",
        pageNo: 1,
        pageSize: 50,
      },
      page: {
        Total: 100,
        Size: [10, 20, 30],
        currentPage: 1,
      },
      tableData: [],
      //表格选择
      tr_sels: [],
      tableDataZhjf: [],
      //表格选择
      tr_sels1: [],
    };
  },

  mounted() {
    this.getOptionMainAttrName();
    this.initData();
  },

  methods: {
    //初始化修改页面数据
    initData() {
      let _this = this;
      let row = _this.updatePageData.row;
      _this.form.feeType = row.feeType;
      if (row.feeType == "0") {
        _this.isDxjf = "Y";
        _this.isZhjf = "N";
        _this.isZhjfTable = "N";
        _this.form.mainAttrId = row.mainAttrId1;
      } else {
        _this.isDxjf = "N";
        _this.isZhjf = "Y";
        _this.isZhjfTable = "Y";
        _this.form.mainAttrId1 = row.mainAttrId1;
        _this.form.mainAttrId2 = row.mainAttrId2;
        _this.form.mainAttrId3 = row.mainAttrId3;
        _this.form.mainAttrId4 = row.mainAttrId4;
      }
      _this.initTable();
    },

    //获取产品大类下拉数据（未筛选）
    getOptionMainAttrName() {
      let _this = this;
      let params;
      _this.$api.get(
        _this.$apis.manage +
        "/manage/product/price/getOptionMainAttr/" +
        _this.updatePageData.productId,
        params,
        function (res) {
          if (res.success) {
            _this.option_mainAttrName = res.data;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //初始化table
    initTable() {
      let _this = this;
      let params = _this.form;
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
      _this.$api.post(
        _this.$apis.manage + "/manage/product/price/listForUpdate/",
        params,
        function (res) {
          if (res.success) {
            if (_this.updatePageData.row.feeType == "0") {
              //单项计费tableDate
              _this.tableData = res.data;
            } else {
              //组合计费tableDate
              _this.tableDataZhjf = res.data;
            }
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //单项计费
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
      this.initDxjfTable();
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      //更改分页后重新初始化页面
      this.initDxjfTable();
    },
    //组合计费
    //初始化分页
    init_page1() {
      this.page.total = this.tableDataZhjf.total;
      this.page.size = this.tableDataZhjf.size;
      this.page.current = this.tableDataZhjf.current;
    },
    //分页页码操作
    handleSelectionChange1(val) {
      this.tr_sels1 = val;
    },
    //分页操作
    handleCurrentChange1(val) {
      this.form.pageNo = val;
      //更改分页后重新初始化页面
      this.initZhjfTable();
    },
    handleSizeChange1(val) {
      this.form.pageSize = val;
      //更改分页后重新初始化页面
      this.initZhjfTable();
    },

    //关闭
    close(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      //关闭抽屉
      this.$emit("back");
    },

    //表单提交
    updateSubmit(formName) {
      let _this = this;
      let tableList = [];
      let params = _this.form;
      if (params.feeType == "0") {
        tableList = _this.tableData.records;
      } else {
        tableList = _this.tableDataZhjf.records;
      }
      let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      for (let i = 0; i < tableList.length; i++) {
        if (!reg.test(tableList[i].price)) {
          _this.$message({
            message: "价格必须为非负整数，最多保留两位小数！",
            type: "warning",
          });
          return;
        }
      }
      _this.loading = true;
      _this.$set(params, "tableList", tableList);
      _this.$set(params, "productId", _this.updatePageData.productId);
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
      _this.$api.post(
        _this.$apis.manage + "/manage/product/price/updatePrice",
        params,
        function (res) {
          if (res.success) {
            _this.$message({
              message: "修改成功",
              type: "success",
            });
            _this.loading = false;
            //关闭抽屉
            _this.$emit("back");
          } else {
             _this.loading = false;
            _this.$message({
              message: "修改失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },
  },
};
</script>

<style lang="less">
.drawer-xgjfgz{
  .el-dialog__headerbtn {
    right: 40px;
  }
  .table1 .el-table__body-wrapper .el-table__body tbody tr td {
    padding: 5px 0px;
  }
}
</style>