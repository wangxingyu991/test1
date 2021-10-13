<template>
  <div class="drawer-wrap drawxzjfgz">
    <div class="rh-drawer-head">
      <div class="drawer-title">新增计费规则</div>
    </div>
    <div class="rh-drawer-body">
      <el-form :model="form" ref="form" label-width="100px" label-position="right">
        <el-row>
          <el-col :span="24">
            <el-form-item label="计费类型" prop="feeType">
              <el-radio-group v-model='form.feeType' @change="radioChange(form.feeType)">
                <el-radio-button label="0">单项计费</el-radio-button>
                <el-radio-button label="1">组合计费</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="isDxjf=='Y'">
          <el-col :span="12">
            <el-form-item label="产品大类" prop="mainAttrId">
              <el-select v-model="form.mainAttrId" placeholder="产品大类" @change="initDxjfTable()">
                <el-option key="" label="" value=""></el-option>
                <el-option v-for="item in option_mainAttrName" :key="item.mainAttrId" :label="item.mainAttrName" :value="item.mainAttrId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="isZhjf=='Y'">
          <el-col :span="12">
            <el-form-item label="产品大类一" prop="mainAttrId1">
              <el-select v-model="form.mainAttrId1" placeholder="产品大类" @change="mainAttrChange()">
                <el-option key="" label="" value=""></el-option>
                <el-option v-for="item in option_mainAttrName" :key="item.mainAttrId" :label="item.mainAttrName" :value="item.mainAttrId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品大类二" prop="mainAttrId2">
              <el-select v-model="form.mainAttrId2" placeholder="产品大类" @change="mainAttrChange()">
                <el-option key="" label="" value=""></el-option>
                <el-option v-for="item in option_mainAttrName" :key="item.mainAttrId" :label="item.mainAttrName" :value="item.mainAttrId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="isZhjf=='Y'">
          <el-col :span="12">
            <el-form-item label="产品大类三" prop="mainAttrId3">
              <el-select v-model="form.mainAttrId3" placeholder="产品大类" @change="mainAttrChange()">
                <el-option key="" label="" value=""></el-option>
                <el-option v-for="item in option_mainAttrName" :key="item.mainAttrId" :label="item.mainAttrName" :value="item.mainAttrId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品大类四" prop="mainAttrId4">
              <el-select v-model="form.mainAttrId4" placeholder="产品大类" @change="mainAttrChange()">
                <el-option key="" label="" value=""></el-option>
                <el-option v-for="item in option_mainAttrName" :key="item.mainAttrId" :label="item.mainAttrName" :value="item.mainAttrId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="isZhjf=='Y'">
          <el-col :span="24">
            <el-form-item label="" prop="">
              <el-button icon="el-icon-setting" type="primary" @click="priceConfig">配置价格</el-button>
              <span style="color:red">大类改变后请重新点击！</span>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="rh-table table1" style="margin-left:100px" v-show="isDxjf=='Y'">
          <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange">
            <template slot="empty">
              <div class="pic_nodata">
              </div>
            </template>
            <el-table-column show-overflow-tooltip align="left" prop="subAttrName" label="小类"></el-table-column>
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
      <el-button @click="addSubmit('form')" :loading="loading">保存</el-button>
      <el-button @click="close('form')">关闭</el-button>
    </div>
  </div>
</template>

<script>
import validate from "@/utils/validate.js";
export default {
  props: ["addPageData"],

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
  },

  methods: {
    //点击价格配置按钮，加载组合计费小类table
    priceConfig() {
      if (this.checkMainClass() && this.checkMul()) {
        this.isZhjfTable = "Y";
        this.initZhjfTable();
      }
    },


    //radio改变时展示不同页面
    radioChange(feeType) {
      if (feeType == "0") {
        this.isDxjf = "Y";
        this.isZhjf = "N";
        this.isZhjfTable = "N";
      } else {
        this.isDxjf = "N";
        this.isZhjf = "Y";
        this.isZhjfTable = "N";
      }
    },

    //获取产品大类下拉数据
    getOptionMainAttrName() {
      let _this = this;
      let params;
      _this.$api.get(
        _this.$apis.manage +
        "/manage/product/price/getOptionMainAttrName/" +
        _this.addPageData.productId,
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

    //初始化单项计费table
    initDxjfTable() {
      let _this = this;
      if (_this.form.mainAttrId != "") {
        let params = _this.form;
        _this.$set(params, "productId", _this.addPageData.productId);
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
          _this.$apis.manage + "/manage/product/price/listSubclass/",
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
      }
    },

    //组合计费大类改变后清空table并隐藏
    mainAttrChange() {
      this.tableDataZhjf = [];
      this.isZhjfTable = "N";
    },

    //初始化组合计费table
    initZhjfTable() {
      let _this = this;
      //初始化表格
      let params = _this.form;
      _this.$set(params, "productId", _this.addPageData.productId);
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
        _this.$apis.manage + "/manage/product/price/initZhjfTable/",
        params,
        function (res) {
          if (res.success) {
            _this.tableDataZhjf = res.data;
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
    addSubmit(formName) {
      let _this = this;
      let tableList = [];
      let params = _this.form;
      if (_this.tableDataZhjf.length == 0 && _this.form.feeType == "1") {
        _this.$message({
          message: "请点击价格配置按钮配置价格！",
          type: "error",
        });
        return false;
      }
      if (params.feeType == "0") {
        if (_this.form.mainAttrId == "") {
          _this.$message({
            message: "请选择产品大类！",
            type: "error",
          });
          return false;
        }
        tableList = _this.tableData.records;
      } else {
        tableList = _this.tableDataZhjf.records;
      }
      let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      for (let i = 0; i < tableList.length; i++) {
        if (!reg.test(tableList[i].price)) {
          _this.$message({
            message: "价格必须为正数，最多保留两位小数！",
            type: "warning",
          });
          return;
        }
      }
      _this.loading = true;

      _this.$set(params, "tableList", tableList);
      _this.$set(params, "productId", _this.addPageData.productId);
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
        _this.$apis.manage + "/manage/product/price/savePrice",
        params,
        function (res) {
          if (res.success) {
            _this.$message({
              message: "保存成功",
              type: "success",
            });
            _this.loading = false;
            //关闭抽屉
            _this.$emit("back");
            //清空表单为下次使用
            _this.resetForm(formName);
          } else {
            _this.loading = false;
            _this.$message({
              message: "保存失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //组合计费，最多可以选择一个可以多选的大类！
    checkMul() {
      let _this = this;
      let option_mainAttrName = _this.option_mainAttrName;
      let num = 0;
      for (let i = 0; i < option_mainAttrName.length; i++) {
        if (_this.form.mainAttrId1 == option_mainAttrName[i].mainAttrId && option_mainAttrName[i].isMultiple == "Y") {
          num++;
        }
        if (_this.form.mainAttrId2 == option_mainAttrName[i].mainAttrId && option_mainAttrName[i].isMultiple == "Y") {
          num++;
        }
        if (_this.form.mainAttrId3 == option_mainAttrName[i].mainAttrId && option_mainAttrName[i].isMultiple == "Y") {
          num++;
        }
        if (_this.form.mainAttrId4 == option_mainAttrName[i].mainAttrId && option_mainAttrName[i].isMultiple == "Y") {
          num++;
        }
      }
      if (num > 1) {
        _this.$message({
          message: "最多选择一个可以多选的大类！",
          type: "error",
        });
        return false;
      } else {
        return true;
      }
    },

    checkMainClass() {
      let _this = this;
      let m1 = _this.form.mainAttrId1;
      let m2 = _this.form.mainAttrId2;
      let m3 = _this.form.mainAttrId3;
      let m4 = _this.form.mainAttrId4;
      if (m1 == "" || m2 == "") {
        _this.$message({
          message: "请至少选择两个大类！",
          type: "error",
        });
        return false;
      }
      if (m1 == m2) {
        _this.$message({
          message: "产品大类不能相同！",
          type: "error",
        });
        return false;
      } else {
        if (m3 != "" && m4 == "") {
          if (m1 != m3 && m2 != m3) {
            return true;
          } else {
            _this.$message({
              message: "产品大类不能相同！",
              type: "error",
            });
            return false;
          }
        } else if (m4 != "" && m3 == "") {
          if (m1 != m4 && m2 != m4) {
            return true;
          } else {
            _this.$message({
              message: "产品大类不能相同！",
              type: "error",
            });
            return false;
          }
        } else if (m3 == "" && m4 == "") {
          return true;
        } else if (m3 != "" && m4 != "") {
          if (m1 != m3 && m1 != m4 && m2 != m3 && m2 != m4 && m3 != m4) {
            return true;
          } else {
            _this.$message({
              message: "产品大类不能相同！",
              type: "error",
            });
            return false;
          }
        }
      };
    },

  },
};
</script>

<style lang="less">
.drawxzjfgz {
  .el-dialog__headerbtn {
    right: 40px;
  }
  .table1 .el-table__body-wrapper .el-table__body tbody tr td {
    padding: 5px 0px;
  }
  .table1 .el-table__body-wrapper .el-table__body tbody tr:last-child td {
    border-bottom: none;
  }
}
</style>