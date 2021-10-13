<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">预警信息查询</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
            <el-form-item prop="warnType">
              <el-select v-model="queryForm.warnType" placeholder="请选择预警类型" >
                <el-option label="产品预警" value="0" key="0"></el-option>
                <el-option label="短信包预警" value="1" key="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="warnLevelId">
                <el-select v-model="queryForm.warnLevelId" placeholder="请选择预警等级">
                    <el-option v-for="item in warnLevelList"  :key="item.warnLevelId"  :label="item.warnLevelName"
                     :value="item.warnLevelId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="warnTimeBegin">
              <el-date-picker :editable="false" v-model="queryForm.warnTimeBegin" type="date" style="width:150px" value-format="yyyy-MM-dd" placeholder="预警时间起">
              </el-date-picker>
            </el-form-item>
             <el-form-item prop="warnTimeEnd">
              <el-date-picker :editable="false" v-model="queryForm.warnTimeEnd" type="date" style="width:150px" value-format="yyyy-MM-dd" placeholder="预警时间止">
              </el-date-picker>
             </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
            <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
          </el-form>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData.records" v-loading="loading" stripe border @selection-change="handleSelectionChange">
          <template slot="empty">
            <div class="pic_nodata"></div>
          </template>
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
                {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="left" prop="warnContent"  width="400px" label="预警内容"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="warnLevel" width="150px"  label="预警等级">
            <template slot-scope="scope">
              <span class="cell-orange" v-if="scope.row.warnLevel ==1">橙色</span>
              <span class="cell-yellow" v-else-if="scope.row.warnLevel ==2">黄色</span>
              <span class="cell-red" v-else-if="scope.row.warnLevel ==3">红色</span> 
            </template> 
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="warnTime"  width="200px"  label="预警时间"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="warnTypeName"   width="150px"  label="预警类别"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="warnConfigName"  label="预警类型"></el-table-column>
        </el-table>
      </div>
      <div class="rh-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import validate from "@/utils/validate.js";
export default {

  data() {
    return {
      loading: false,
      warnLevelList:[],
      //查询表单
      queryForm: {
        warnType: "",
        warnLevelId: "",
        warnTimeBegin: "",
        warnTimeEnd: "",
        pageNo: 1,
        pageSize: 10,
      },
      page: {
        Total: 100,
        Size: [10, 20, 30],
        currentPage: 1,
      },
      option_yjlx: [],
      tableData: [],
      //表格选择
      tr_sels: [],
    };
  },

  created() {},

  mounted() {
    this.initWarnLevelList();
    this.init_Table();
  },

  methods: {
    initWarnLevelList(){
      let _this = this;
      _this.$api.get(this.$apis.manage+"/rest/warn/warnsetting/getwarnlevellist", null, function (res) {
        if (res.success == true) {
            let list = res.data;
            for(let i = 0;i < list.length;i++){
                if(list[i].warnLevel=="1"){
                    list[i].warnLevelName = "橙色";
                }else if(list[i].warnLevel=="2"){
                    list[i].warnLevelName = "黄色";
                }else if(list[i].warnLevel=="3"){
                    list[i].warnLevelName = "红色";
                }
            }
            _this.warnLevelList = res.data;
        } else {
          _this.$message({
            message: '保存失败',
            type: 'error'
          });
        }
      })
    },
    //初始化表格
    init_Table() {
      let _this = this;
      let params = _this.queryForm;
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
        _this.$apis.manage + "/rest/warn/warnquery/plist", params,
        function (res) {
          //关闭loading
          _this.loading=false;
          if (res.success) {
            let list = res.data.records;
            for(let i = 0;i < list.length;i++){
                if(list[i].warnType=="0"){
                    list[i].warnTypeName = "产品预警";
                }else if(list[i].warnType=="1"){
                    list[i].warnTypeName = "短信包预警";
                }
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

    //搜索
    searchForm() {
      let _this = this;
      let params = _this.queryForm;
      let warnTimeBegin = params.warnTimeBegin;
      let warnTimeEnd = params.warnTimeEnd;
      if(warnTimeBegin!='' && warnTimeEnd !=''){
        if(warnTimeBegin>warnTimeEnd){
            this.$message({
              message: "预警时间止应大于预警时间起",
              type: "error",
            });
            return;
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
      this.init_Table();
    },
  },
};
</script>
