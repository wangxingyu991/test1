<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">通知公告管理</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <div class="rh-pull-left">
          <el-button type="primary" @click="onAdd('operatorForm')">新 增</el-button>
          <el-button type="primary" @click="publish()">批量发布</el-button>
        </div>
        <div class="rh-pull-right">
          <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
            <el-form-item prop="title">
              <el-input v-model="queryForm.title" placeholder="标题" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item prop="state">
              <el-select v-model="queryForm.state">
                <el-option key="" value="" label="全部"></el-option>
                <el-option key="0" value="0" label="未发布"></el-option>
                <el-option key="1" value="1" label="已发布"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="status">
              <el-select v-model="queryForm.status">
                <el-option key="" value="" label="全部"></el-option>
                <el-option key="Y" value="Y" label="有效"></el-option>
                <el-option key="N" value="N" label="无效"></el-option>
              </el-select>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
            <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
          </el-form>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData.records" stripe border  v-loading="tableLoading" @selection-change="handleSelectionChange">
          <template slot="empty">
            <div class="pic_nodata"></div>
          </template>
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="left" prop="title" label="标题" width="400"></el-table-column>
          <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
          <el-table-column align="center" prop="stateName" label="发布状态" width="80"></el-table-column>
          <el-table-column align="center" prop="statusName" label="有效标志" width="80"></el-table-column>
          <el-table-column align="center" prop="releaseTime" label="发布时间"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button class="table_btn" type="text" @click="forDetail(scope.row)">预览</el-button>
              <el-button class="table_btn" type="text" @click="onUpdate(scope.row)">修改</el-button>
              <el-button class="table_btn" type="text" v-if="scope.row.state=='0'" @click="doPublish(scope.row.notifyId,'发布')">发 布</el-button>
              <el-button class="table_btn" type="text" v-if="scope.row.status=='N'" @click="enableNotyfy(scope.row.notifyId, 'Y', '启用')">启用</el-button>
              <el-button class="table_btn" type="text" v-if="scope.row.status=='Y'" @click="enableNotyfy(scope.row.notifyId, 'N', '禁用')">禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rh-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
        </el-pagination>
      </div>
      <el-drawer :visible.sync="showmodel" size="73%" append-to-body :wrapperClosable = false :with-header=true>
        <noticeeditor v-if="showmodel" @back="back" @reload="init" :noticeinfo="noticeinfo"></noticeeditor>
      </el-drawer>
      <el-drawer :visible.sync="showDetail" size="73%" append-to-body :wrapperClosable = false :with-header=true>
        <noticedetail v-if="showDetail" @back="back" @reload="init" :noticeinfo="noticeinfo"></noticedetail>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import noticeeditor from  './noticeeditor.vue'
import noticedetail from  './noticedetail.vue'
import validate from "@/utils/validate.js";

export default {
  name: 'editoritem',
  components: {noticeeditor, noticedetail},
  data() {
    return {
      tableLoading: false,
      //查询表单
      queryForm: {
        title: "",
        state:'',
        status:'',
        pageNo: 1,
        pageSize: 10
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
      showmodel:false,
      showDetail:false,
      noticeinfo: {},
    };
  },
  created() {},

  mounted() {
    this.init_Table();
  },

  methods: {
    //保存成功后关闭抽屉
    back() {
      this.showmodel = false;
    },
    //初始化table
    init() {
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
      _this.tableLoading = true;
      _this.$api.post(this.$apis.manage+"/rest/manage/notice/plist", params,
        function (res) {
          _this.tableLoading = false;
          if (res.success) {
            _this.tableData = res.data;
            let list = _this.tableData.records;
            for(let i = 0; i < list.length; i++) {
              if (list[i].state == '0') {
                list[i].stateName = "未发布";
              } else {
                list[i].stateName = "已发布";
              }
              if (list[i].status == 'Y') {
                list[i].statusName = "有效";
              } else {
                list[i].statusName = "无效";
              }
            }
            _this.tableData.records = list;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        });
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
    publish(){
        let _this = this;
        _this.$confirm('是否批量发布？', '提示', {
          type: 'warning',
          cancelButtonClass: 'btn-custom-cancel',
          dangerouslyUseHTMLString: true
        }).then(() => {
          console.log(_this.tr_sels);
          let ids = _this.tr_sels.map(function (currentValue,index,arr){
              if(currentValue.state != 1){
                  return currentValue.notifyId
              }
          }).join(); //获取所有选中行的id组成的字符串，以逗号分隔
          if(ids.length > 0){
            _this.doPublish(ids,'批量发布');
          }else{
             _this.$message({
              message: '请选择待发布的公告',
              type: 'error'
            });
          }
        }).catch(() => {})
    },
    doPublish(val,message){
      let _this = this;
      _this.$api.post(this.$apis.manage+"/rest/manage/notice/publish",{'notifyIds':val},function (res) {
        if(res.success == true) {
          _this.$message({
            message: message+'成功',
            type: 'success'
          });
          _this.queryForm.pageNo = 1;
          _this.init_Table();
        } else {
          _this.$message({
            message: message+'失败,' + res.errorMsg,
            type: 'error'
          });
        }
      })
    },
    enableNotyfy(notifyId, status,message){
       let _this = this;
       var params = {
          notifyId: notifyId,
          status: status
       };
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
      _this.$api.post(this.$apis.manage+"/rest/manage/notice/enablenotyfy",params,function (res) {
        if(res.success == true) {
          _this.$message({
            message: message+'成功',
            type: 'success'
          });
          _this.queryForm.pageNo = 1;
          _this.init_Table();
        } else {
          _this.$message({
            message: message+'失败,' + res.errorMsg,
            type: 'error'
          });
        }
      })
    },
    //弹出新增页面抽屉
    onAdd(formName,title) {
      let _this = this;
      _this.showmodel = true;
      _this.noticeinfo = {};
      _this.resetForm(formName);
    },

    //弹出修改页面抽屉
    onUpdate(row) {
      let _this = this;
      _this.noticeinfo = row;
      _this.showmodel = true;
    },
    forDetail(row){
      let _this = this;
      _this.noticeinfo = row;
      _this.showDetail = true;
    },
    update(formName) {
      let _this = this;
      _this.$refs.operatorForm.validate((valid) => {
        if (valid) {
          let para = Object.assign({}, this.operatorForm);
          if (para != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(para))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }
          _this.$api.put(this.$apis.permission+"/rest/permission/organtype", para, function (res) {
            if (res.success == true) {
              _this.$message({
                message: '更新成功',
                type: 'success'
              });
              _this.showmodel = false;
              // _this.resetForm(formName);
              _this.resetForm('queryForm');
              _this.search();
            } else {
              _this.$message({
                message: '更新失败,' + res.errorMsg,
                type: 'error'
              });
            }
          })
        } else {
          _this.disflag.click=1;
          return false;
        }
      })
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