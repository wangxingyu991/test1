<style lang="less">
.list_wrap {
  padding: 20px;
  .list_li {
    display: flex;
    color: #2192ae;
    line-height: 29px;

    .li_title {
      flex-wrap: 1;
      width: 80%;
      font-size: 14px;
      cursor: pointer;
    }
    .li_data {
      text-align: right;
      width: 20%;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text"> 新手指导列表 </span>
          <!-- <span class="rh-helpTip-icon">
                          <el-tooltip class="item" content="云数据库GaussDB(for MySQL)是华为自研的最新一代企业级高扩展海量存储分布式数据库，完全兼容MySQL">
                                <i class="el-icon-info"></i>
                          </el-tooltip>
                    </span> -->
        </div>
        <!-- <div class="operate-btns">
                    <el-button>操作</el-button>
              </div> -->
      </div>
    </div>
    <div class="rh-page-content">
      <div class="tabs-wrap" style="min-height: 500px">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          class="rh-tabs"
          size="mini"
        >
          <el-tab-pane label="新手指导" name="first">
            <div class="list_wrap" style="min-height: 350px">
              <div
                class="list_li"
                v-for="item in tableData.records"
                :key="item.newGuideId"
              >
                <div
                  class="li_title"
                  @click="open(item.newGuideId, item.releaseTimeFull)"
                >
                  {{ item.title }}
                </div>
                <div class="li_data">{{ item.releaseTime }}</div>
              </div>
              <!-- <div class="list_li">
                                          <div class="li_title">通告：关于瑞宏云进项服务升级维护的通知</div>
                                          <div class="li_data">2021-01-08</div>
                                    </div>
                                    <div class="list_li">
                                          <div class="li_title">通告：关于瑞宏云进项服务升级维护的通知</div>
                                          <div class="li_data">2021-01-08</div>
                                    </div>
                                    <div class="list_li">
                                          <div class="li_title">通告：关于瑞宏云进项服务升级维护的通知</div>
                                          <div class="li_data">2021-01-08</div>
                                    </div> -->
            </div>
            <div class="rh-pagination">
              <el-pagination
                layout="total, sizes, prev, pager, next, jumper"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :total="tableData.total"
                :current-page.sync="tableData.current"
                :page-sizes="[10]"
                :page-size="tableData.size"
              >
              </el-pagination>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="缴费公告" name="second">
                              <div class="list_wrap">
                                    <div class="list_li">
                                          <div class="li_title" @click="open('111111')">缴费公告：关于瑞宏云进项服务升级维护的通知</div>
                                          <div class="li_data">2021-01-08</div>
                                    </div>
                                    <div class="list_li">
                                          <div class="li_title">缴费公告：关于瑞宏云进项服务升级维护的通知</div>
                                          <div class="li_data">2021-01-08</div>
                                    </div>
                                    <div class="list_li">
                                          <div class="li_title">缴费公告：关于瑞宏云进项服务升级维护的通知</div>
                                          <div class="li_data">2021-01-08</div>
                                    </div>
                                    <div class="list_li">
                                          <div class="li_title">缴费公告：关于瑞宏云进项服务升级维护的通知</div>
                                          <div class="li_data">2021-01-08</div>
                                    </div>
                              </div>
                        </el-tab-pane>
                        <el-tab-pane label="升级公告" name="third">
                              <div class="list_wrap">
                                    <div class="list_li">
                                          <div class="li_title">升级公告：关于瑞宏云进项服务升级维护的通知</div>
                                          <div class="li_data">2021-01-08</div>
                                    </div>
                                    <div class="list_li">
                                          <div class="li_title">升级公告：关于瑞宏云进项服务升级维护的通知</div>
                                          <div class="li_data">2021-01-08</div>
                                    </div>
                                    <div class="list_li">
                                          <div class="li_title">升级公告：关于瑞宏云进项服务升级维护的通知</div>
                                          <div class="li_data">2021-01-08</div>
                                    </div>
                                    <div class="list_li">
                                          <div class="li_title">升级公告：关于瑞宏云进项服务升级维护的通知</div>
                                          <div class="li_data">2021-01-08</div>
                                    </div>
                              </div>
                        </el-tab-pane> -->
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import validate from "@/utils/validate.js";
export default {
  data() {
    return {
      activeName: "first",
      page: {
        Total: 100,
        Size: [10],
        currentPage: 1,
      },
      queryForm: {},
      tableData: [],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      //tab节点查找el-tabs__content节点
      event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.transform =
        "translateX(" + tab.index * -100 + "%)";
      //console.log(event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling);
    },
    open(id, releaseTimeFull) {
      this.$router.push({
        name: "newguide_detail",
        params: {
          newGuideId: id,
          releaseTimeFull: releaseTimeFull,
        },
      });
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
    //初始化表格
    init_Table() {
      let _this = this;
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
      this.$api.post(
        _this.$apis.home + "/rest/home/newguide/plist/",
        params,
        function (res) {
          if (res.success) {
            _this.tableData = res.data;
            var list = _this.tableData.records;
            // for(var i=0; i<list.length; i++){
            //       if(list[i].state == '0'){
            //             list[i].stateName = '未读';
            //       }else{
            //             list[i].stateName = '已读';
            //       }
            //       list[i].messageCateName = _this.messageCateArray[list[i].messageCateId];
            // }
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },
  },
  mounted() {
    this.init_Table();
  },
};
</script>

<style>
</style>