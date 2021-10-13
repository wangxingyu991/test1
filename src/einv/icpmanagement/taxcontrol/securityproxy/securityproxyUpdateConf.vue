<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title">更新安全代理配置</div>
    </div>
    <div class="rh-drawer-body">
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <div class="rh-pull-left">
          <el-button type="primary" @click="onUpdateConf">更新安全代理配置</el-button>
        </div>
        <div class="rh-pull-right">
          <el-form :model="queryForm" :rules="rules" ref="queryForm" :inline="false" label-width="0px" label-position="right">
             <el-form-item prop="sf">
              <el-input v-model="queryForm.sf" placeholder="省份" maxlength="10" ></el-input>
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
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope"> {{scope.$index+1}}</template>
          </el-table-column>          
          <el-table-column show-overflow-tooltip align="center" prop="sf" label="省份"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="sjdz" label="税局地址"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="czsj" label="操作时间"></el-table-column>
        </el-table>
      </div>
      <div class="rh-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
        </el-pagination>
      </div>
    </div>


    </div>
    <div class="rh-dialog-footer">
      <el-button @click="close('queryForm')">关闭</el-button>
    </div>
  </div>
</template>

<script>
import validate from "@/utils/validate.js";

export default {
  props: ["updateConfPageData"],

   data() {
    return {
      //查询表单
      queryForm: {
        sf: "",
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
            //校验规则
      rules: {
        sf: [
          { required: false, message: "省份", trigger: "blur" },
          { max: 100, message: "最多10个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
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
        _this.$apis.icpmanagement + "/taxcontrol/securityproxy/listProvince",params,
        function (res) {
          if (res.success) {
            _this.tableData = res.data;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
          //关闭loading
          _this.loading=false;
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


    //远程更新安全代理配置
    onUpdateConf() {
      let _this = this;
      _this.$confirm("确定要更新安全代理配置信息吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          //打开loading
          _this.loading=true;
          _this.$api.get(
            _this.$apis.icpmanagement +"/taxcontrol/securityproxy/UpdateSecurityproxyConf/" + _this.updateConfPageData.id, {},
            function (res) {
              console.info(JSON.stringify(res));
              //关闭loading
              _this.loading=false;
              if (res.success) {
               _this.$alert('返回代码：'+res.data.body.returncode+'</br>'+'返回描述：'+res.data.body.returnmsg,
              '安全代理地址更新', {
                confirmButtonText: '关闭',
                dangerouslyUseHTMLString: true
              });
              } else {
                _this.$message({
                  message: "失败," + res.errorMsg,
                  type: "error",
                });
              }
              
            }
          );
        });
        
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

    //重置
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.queryForm.pageNo = 1;
      this.init_Table();
    },

        //初始化table
    init() {
      this.init_Table();
    },

    //关闭
    close(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      //关闭抽屉
      this.$emit("close");
    },
  },
};
</script>

<style lang="less">
.el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
}
.el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.el-dialog__headerbtn {
  right: 40px;
}
</style>