<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">制证信息查询</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <div class="rh-pull-left">
        </div>
        <div class="rh-pull-right">
          <el-form :model="queryForm" :rules="rules" ref="queryForm" :inline="false" label-width="0px" label-position="right">
            <el-form-item prop="nsrsbh">
              <el-input v-model.trim="queryForm.nsrsbh" placeholder="纳税人识别号"  onkeyup="value=value.replace(/[\W]/g,'') " 
                        onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" maxlength="20"  ></el-input>
            </el-form-item>
             <el-form-item prop="nsrmc">
              <el-input v-model.trim="queryForm.nsrmc" placeholder="纳税人名称"  maxlength="64"></el-input>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchForm('queryForm')"></el-button>
            <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
          </el-form>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange"  v-loading="loading">
          <template slot="empty">
             <div class="pic_nodata"></div>
          </template>
          <el-table-column label="序号" width="50px" align="center">
             <template slot-scope="scope"> {{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="sblx" label="设备类型" ></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="swukbh" label="税控服务器编号" ></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="nsrsbh" label="纳税人识别号"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="nsrmc" label="纳税人名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="xnsbh" label="虚拟设备号"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="jzyxqz" label="截止有效期"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="xgsj" label="修改时间"></el-table-column>
          <el-table-column align="center" label="操作"  width="90">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="onEdit(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rh-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
        </el-pagination>
      </div>
    </div>
    <!-- 查看页面抽屉 -->
    <div class="drawer-container add" :key=1000>
      <el-drawer :with-header="false" append-to-body size="60%" :visible.sync="drawer">
        <editPage v-if="drawer" @back="back" @close="close"  @reload="init_Table" :updatePageData="updatePageData" ></editPage>
      </el-drawer>
    </div>
 
  </div>
</template>

<script>
import editPage from "./taxcertInfo.vue";
import validate from "@/utils/validate.js";

export default {
  components: {
    editPage,
  },

  data() {
    return {
      drawer: false,
      //查询表单
      queryForm: {
        nsrsbh: "",
        nsrmc: "",
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
      loading:{
        loadingList:false,
      },
      //校验规则
      rules: {
        nsrmc: [
          { required: false, message: "请输入纳税人名称", trigger: "blur" },
          { max: 64, message: "最多64个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
        // nsrsbh: [
        //   { required: false, message: "请输入纳税人识别号", trigger: "blur" },
        //   { max: 20, message: "最多20个字符", trigger: "blur" },
        //   { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        // ],
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
        _this.$apis.icpmanagement + "/taxcontrol/taxcert/listTaxcerts", params,
        function (res) {
          //关闭loading
          _this.loading=false;
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
          this.queryForm.pageSize = 10;
          this.init_Table();
        }
      });
    },


    //弹出修改页面抽屉
    onEdit(id) {
      this.drawer = true;
      this.updatePageData = {
        id: id,
      };
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
