<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">历史消息查询</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
        <div class="rh-operate clearfix">
            <div class="rh-pull-left">
                <el-button type="primary" @click="operatorForm('part')" >标记已读</el-button>
                   <el-button type="primary" @click="operatorForm('all')" >全部已读</el-button>
            </div>
            <div class="rh-pull-right">
                <el-form :rules="rules" :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
                    <el-form-item prop="title">
                        <el-input v-model="queryForm.title" placeholder="消息标题"></el-input>
                    </el-form-item>
                    <el-form-item prop="month">
                       <el-date-picker v-model="queryForm.month" type="month" placeholder="所属月份" format="yyyy-MM" value-format="yyyy-MM"></el-date-picker>
                    </el-form-item>
                    <el-form-item prop="state">
                        <el-select v-model="queryForm.state" placeholder="消息状态">
                            <el-option value=""></el-option>
                            <el-option key="0" value="0" label="未读"></el-option>
                            <el-option key="1" value="1" label="已读"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="messageCateId">
                        <el-select v-model="queryForm.messageCateId" placeholder="消息类别">
                            <el-option value="" key="" label="全部"></el-option>
                            <el-option key="1" value="1" label="产品消息"></el-option>
                            <el-option key="2" value="2" label="财务消息"></el-option>
                            <el-option key="3" value="3" label="运维消息"></el-option>
                            <el-option key="4" value="4" label="安全消息"></el-option>
                            <el-option key="5" value="5" label="活动消息"></el-option>
                            <el-option key="6" value="6" label="系统消息"></el-option>
                            <el-option key="7" value="7" label="其他消息"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
                    <el-button type="primary" @click="resetForm('queryForm')" >重置</el-button>
                </el-form>
            </div>
        </div>
        <div class="rh-table">
            <el-table ref="table" :data="tableData.records" stripe border height="400" v-loading="tableLoading"  @row-click="on_select" @selection-change="changeSelection">
            <template slot="empty">
                <div class="pic_nodata">
                </div>
            </template>
            <el-table-column align="center" type="selection" width="55"></el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="title" label="消息标题" width="600"></el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="createTime" label="消息时间"></el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="stateName" label="状态" width="80"></el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="messageCateName" label="消息类别"></el-table-column>
            <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
                <el-button class="table_btn" type="text" @click="details(scope.row)">详情</el-button>
                <el-button class="table_btn" type="text" v-if="scope.row.state == 0" @click="setMessageState(scope.row.messageReceiverId)">标记为已读</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <div class="rh-pagination">
          <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total"
            :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
          </el-pagination>
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
        tableLoading:'false',
        showDetail:false,
        detailData:{},
        queryForm: {
          title:'',
          state:'',
          messageCateId: null,
          month: new Date().getFullYear()+"-"+ (new Date().getMonth()< 10 ? "0" + (new Date().getMonth()+1) : new Date().getMonth()+1)
        },
        page: {
            Total: 100,
            Size: [10, 20, 30],
            currentPage: 1,
        },
        tableData: [],
        sels:{},
        multipleSelection:[],
        rules:{
            month:[{required:true,message:'请选择查询月份',trigger:'change'}]
        }
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
            _this.searchForm();
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
              _this.searchForm();
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
              _this.searchForm();
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
        _this.$refs.queryForm.validate((valid) => {
            if(valid){
                
                _this.tableData = [];
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
                this.$api.post(
                _this.$apis.workorder+ "/rest/message/messageinfo/querymessagebymonth/",
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
            }
        });
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
              var messageNum = _this.$storage.state.messageNum;
              _this.$storage.commit('setMessageNum', messageNum-1);
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