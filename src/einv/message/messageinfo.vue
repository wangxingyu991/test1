<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text"> 我的消息</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <el-button type="primary" @click="operatorForm('part')" >标记已读</el-button>
        <el-button type="primary" @click="operatorForm('all')" >全部已读</el-button>
        <div class="tabs-wrap">
          <el-tabs v-model="activeName" @tab-click="handleClick" class="rh-tabs" size="mini">
            <el-tab-pane label="全部" name="0"></el-tab-pane>
            <el-tab-pane label="产品消息" name="1"></el-tab-pane>
            <el-tab-pane label="财务消息" name="2"></el-tab-pane>
            <el-tab-pane label="运维消息" name="3"></el-tab-pane>
            <el-tab-pane label="安全消息" name="4"></el-tab-pane>
            <el-tab-pane label="活动消息" name="5"></el-tab-pane>
            <el-tab-pane label="系统消息" name="6"></el-tab-pane>
            <el-tab-pane label="其他消息" name="7"></el-tab-pane>
          </el-tabs>
          <el-table ref="table" :data="tableData.records" stripe border height="400" v-loading="tableLoading"  @row-click="on_select" @selection-change="changeSelection">
            <template slot="empty">
              <div class="pic_nodata">
              </div>
            </template>
            <el-table-column align="center" type="selection" width="55"></el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="title" label="消息标题" width="700"></el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="createTime" label="消息时间"></el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="stateName" label="状态" width="80"></el-table-column>
            <el-table-column align="center" label="操作" width="200">
              <template slot-scope="scope">
                <el-button class="table_btn" type="text" @click="details(scope.row)">详情</el-button>
                <el-button class="table_btn" type="text" v-if="scope.row.state == 0" @click="setMessageState(scope.row.messageReceiverId)">标记为已读</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="rh-pagination">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total"
              :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-drawer :visible.sync="showDetail" size="40%" append-to-body :wrapperClosable = false :with-header=true>
      <detailPage v-if="showDetail" @back="back" @reload="init" :detailData="detailData"></detailPage>
    </el-drawer>
  </div>
</template>

<script>
import { formateDate } from "@/utils/tools.js";
import detailPage from "./message_detail.vue";
import validate from "@/utils/validate.js";
export default {
   components: { detailPage},
   data() {
    return {
      messageCateArray: {
        "1":"产品消息",
        "2":"财务消息",
        "3":"运维消息",
        "4":"安全消息",
        "5":"活动消息",
        "6":"系统消息",
        "7":"其他消息"
      },
      activeName: '0',
      tableLoading:false,
      showDetail:false,
      detailData:{},
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
      sels:{},
      multipleSelection:[]
    }
  },

  mounted() {
    this.init_Table();
  },

  methods: {
    on_select(val){
      this.$refs.table.toggleRowSelection(val);
    },
    changeSelection(val) {
      this.multipleSelection = val;
    },
    setMessageState(messageReceiverId){
      var _this  = this;
      let params = {
        messageReceiverIds:messageReceiverId
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
      _this.$api.post( _this.$apis.workorder+ "/rest/message/messageinfo/setmessagestate/", params,
        function (res) {
          if (res.success) {
            _this.init_Table();
          } else {
            _this.$message({
              message: "修改失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },
    operatorForm(operateName){
      var _this = this;
      if(operateName == 'all'){
        this.$api.post( _this.$apis.workorder+ "/rest/message/messageinfo/setmessageallstate/", {},
          function (res) {
            if (res.success) {
              _this.init_Table();
            } else {
              _this.$message({
                message: "修改失败," + res.errorMsg,
                type: "error",
              });
            }
          }
        );
      }else if(operateName == 'part'){
        let messageReceiverIds = _this.multipleSelection.map(item => item.messageReceiverId).join();
        let params = {
          messageReceiverIds:messageReceiverIds
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
        this.$api.post( _this.$apis.workorder+ "/rest/message/messageinfo/setmessagestate/", params,
          function (res) {
            if (res.success) {
              _this.init_Table();
            } else {
              _this.$message({
                message: "修改失败," + res.errorMsg,
                type: "error",
              });
            }
          }
        );
      }
    },
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

    //tab页点击事件
    handleClick: function (tab, event) {
      this.activeName = tab.name;
      this.init_Table();
    },

    //初始化表格
    init_Table() {
      let _this = this;
     
      _this.tableData = [];
      let params = this.queryForm;
      _this.$set(params, "activeName", _this.activeName);
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
      this.$api.post(
      _this.$apis.workorder+ "/rest/message/messageinfo/messagelist/",
        params,
        function (res) {
          if (res.success) {
            _this.tableData = res.data;
            var list = _this.tableData.records;
            for(var i=0; i<list.length; i++){
              if(list[i].state == '0'){
                list[i].stateName = '未读';
              }else{
                list[i].stateName = '已读';
              }
              list[i].messageCateName = _this.messageCateArray[list[i].messageCateId];
            }
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
          _this.tableLoading = false;
        }
      );
    },
     //详情
    details(row) {
      var _this = this ;
      if(row.state==0){
        let params = {
          messageReceiverIds:row.messageReceiverId
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
        _this.$api.post( _this.$apis.workorder+ "/rest/message/messageinfo/setmessagestate/", params,
          function (res) {
            if (res.success) {
              _this.showDetail = true;
              _this.detailData = row;
              _this.init_Table();
            } else {
              _this.$message({
                message: "修改失败," + res.errorMsg,
                type: "error",
              });
            }
          }
        );
      }else{
        _this.showDetail = true;
        _this.detailData = row;
      }
    },


    //产品订单详情关闭
    back() {
      this.isProduct = false;
    },

    //取消订单
    cancelOrder(orderId) {
      let _this = this;
      _this
        .$confirm("确定要取消该订单吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          _this.$api.post(
            _this.$apis.order + "/order/orderInfo/cancelOrder",
            { orderId: orderId },
            function (res) {
              if (res.success) {
                _this.$message({
                  message: "订单取消成功",
                  type: "success",
                });
                _this.init_Table();
              } else {
                _this.$message({
                  message: res.errorMsg,
                  type: "error",
                });
              }
            }
          );
        });
    },

    //初始化分页
    init_page() {
      this.page.total = this.tableData.total;
      this.page.size = this.tableData.size;
      this.page.current = this.tableData.current;
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
   //保存成功后关闭抽屉
    back() {
      this.showDetail = false;
    },

    //初始化table
    init() {
      this.init_Table();
    }

  }
}
</script>


<style lang="less" scoped>
.priceDiv {
  width: 100%;
  height: 25px;
}
.priceUnit {
  float: left;
  font-size: 12px;
  margin-top: 4px;
  margin-left: 5px;
}
.priceQuantity {
  float: left;
  font-size: 21px;
  text-align: right;
  margin-top: -2px;
  color: #f53434;
}
.priceName {
  float: left;
  width: 100px;
  text-align: right;
  font-size: 13px;
  font-weight: 600;
  margin-top: 2px;
}
</style>