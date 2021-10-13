<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title">企业信息同步</div>
    </div>
    <div class="rh-drawer-body">
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <div class="rh-pull-left">
          <div class="rh_nsrMc">纳税人名称：{{updatePageDatataxplayerInfo.nsrmc}}</div>&emsp;&emsp;&emsp;&emsp;
           <div class="rh_nsrMc">纳税人识别号：{{updatePageDatataxplayerInfo.nsrsbh}}</div>
        </div>
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
              <el-form-item prop="fwqdm">
                  <el-select v-model="queryForm.fwqdm" placeholder="请选择税控盘组服务器">
                    <el-option key="002001" label="核心板卡盘组48口2号" value="002001"></el-option>
                    <el-option key="003001" label="UKEY盘组48口3号" value="003001"></el-option>
                  </el-select>
              </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
            <el-button icon="el-icon-search" type="primary" @click="gettaxPlarerInfo">同步</el-button>
          </el-form>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData" stripe border @selection-change="handleSelectionChange"  height="350" v-loading="loading">
          <template slot="empty">
            <div class="pic_nodata"></div>
          </template>
            <el-table-column label="序号" width="50px" align="center">
              <template slot-scope="scope"> {{scope.$index+1}}</template>
            </el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="jqbh" label="机器编号"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="fplxdm" label="全部发票类型代码"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="swjgdm" label="税务机关代码"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="swjgmc" label="税务机关名称"></el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="qysj" label="启用时间"></el-table-column>
          <!-- <el-table-column align="center" label="操作"  width="140">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="updatetaxCert(scope.row)">查看</el-button>
            </template>
          </el-table-column> -->
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
  props: ["updatePageDatataxplayerInfo"],

   data() {
    return {
      //查询表单
      queryForm: {
        fwqdm: "",
        nsrsbh: "",
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
      loading: false,
    };
  },

  created() {},

  mounted() {
    // this.init_Table();
  },

  methods: {
    //初始化表格
    searchForm() {
      let _this = this;
      let params = this.queryForm;
      if(params.fwqdm==''){
         _this.$alert('请选择税控盘组服务器',
          '提示', {
          confirmButtonText: '关闭',
          dangerouslyUseHTMLString: true
        });
        return;
      }
    
       _this.$set(params, "nsrsbh", _this.updatePageDatataxplayerInfo.nsrsbh);
       _this.$set(params, "fwqdm", _this.queryForm.fwqdm);

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
        _this.$apis.icpmanagement + "/taxcontrol/taxSet/getTaxPlayerSetinfo",params,
        function (res) {
          //关闭loading
          _this.loading=false;
          console.info(JSON.stringify(res));
          if (res.success) {
            if(JSON.stringify(res.data[0]).includes('returncode')){
                _this.$alert('返回代码：'+res.data[0].returncode+'</br>'+'返回描述：'+res.data[0].returnmsg,
               '返回提示', {
               confirmButtonText: '关闭',
               dangerouslyUseHTMLString: true
               });
               _this.tableData='';
               return;
            }
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


    //同步
    gettaxPlarerInfo() {
      this.queryForm.pageNo = 1;
      let _this = this;
      let params = this.queryForm;
      if(params.fwqdm==''){
         _this.$alert('请选择税控盘组服务器',
          '提示', {
          confirmButtonText: '关闭',
          dangerouslyUseHTMLString: true
        });
        return;
      }
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
      _this.$set(params, "nsrsbh", _this.updatePageDatataxplayerInfo.nsrsbh);
      this.$api.post(
        _this.$apis.icpmanagement + "/taxcontrol/taxSet/listTaxPlayerSetinfo",params,
        function (res) {
          //关闭loading
          _this.loading=false;
          if (res.success) {
            //console.info(JSON.stringify(res.data[0]));
            if(JSON.stringify(res.data[0]).includes('returncode')){
                _this.$alert('返回代码：'+res.data[0].returncode+'</br>'+'返回描述：'+res.data[0].returnmsg,
               '返回提示', {
               confirmButtonText: '关闭',
               dangerouslyUseHTMLString: true
               });
               _this.tableData='';
               return;
            }
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
      this.$emit("back");
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