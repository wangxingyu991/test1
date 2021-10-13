<style lang="less">
@import url("./home.less");
</style>
<template>
  <div>
    <div class="rh-page-content">
      <div class="tabs-wrap">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          class="rh-tabs"
          size="mini"
        >
          <el-tab-pane label="我的控制台" name="first">
            <div class="tab-item-wrap">
              <div class="box-item-wrap">
                <div class="box-item-section w70">
                  <div class="box-item-content">
                    <div class="page-title">云产品</div>
                    <div class="item-content">
                      <div
                        class="item-card"
                        v-for="item in option"
                        :key="item.productId"
                      >
                        <div class="margin">
                          <div class="item-title">{{ item.productName }}</div>
                          <div
                            class="p-context"
                            v-html="
                              item.description.replace(/[\r\n]/g, '<br/>')
                            "
                          ></div>
                          <div class="bt-group">
                            <!-- <el-button type="danger" @click="buyNow(item.productId)">立即购买</el-button> -->
                            <el-button @click="seeDetails(item.productId)"
                              >查看详情</el-button
                            >
                          </div>
                        </div>
                      </div>
                      <div class="item-card">
                        <div class="margin">
                          <div class="item-title">短信包购买</div>
                          <div class="p-context">平台业务提供短信服务</div>
                          <div class="bt-group">
                            <!-- <el-button type="danger" @click="buySMS()">立即购买</el-button> -->
                          </div>
                        </div>
                      </div>
                      <div class="clear"></div>
                    </div>
                  </div>
                </div>
                <div class="box-item-section w30">
                  <div class="box-item-content right">
                    <div class="top">
                      <div class="thumb left">
                        <img src="../../assets/logo.png" alt="" />
                      </div>
                      <div class="info right">
                        <span class="p">上午好</span>
                        <span class="userNumber"
                          >登录账号：{{ loginAccount }}</span
                        >
                        <span class="text"> 所属租户：{{ loginTenant }} </span>
                      </div>
                    </div>
                    <div class="bottom">
                      <table>
                        <tr>
                          <td class="align-right">机构名称：</td>
                          <td>{{ loginOrganName }}</td>
                        </tr>
                        <tr>
                          <td class="align-right">机构号码：</td>
                          <td>{{ loginCompanyTaxId }}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="box-item-section w30">
                  <div class="box-item-content right">
                    <div class="head">
                      <div class="h-title">通知公告</div>
                      <div class="h-more">
                        <router-link to="/main/notice_list">更多</router-link>
                      </div>
                      <div class="clear"></div>
                    </div>
                    <div class="content">
                      <ul>
                        <li v-for="item in noticelist" :key="item.notifyId">
                          <span class="icon">
                            <i class="el-icon-document"></i>
                          </span>
                          <span class="context"
                            ><a
                              @click="
                                forNotice(item.notifyId, item.releaseTime)
                              "
                            >
                              {{ item.title }}</a
                            ></span
                          >
                        </li>
                      </ul>
                    </div>
                    <div class="head">
                      <div class="h-title">新手入门</div>
                      <div class="h-more">
                        <router-link to="/main/newguide_list">更多</router-link>
                      </div>
                      <div class="clear"></div>
                    </div>
                    <div class="content">
                      <ul>
                        <li v-for="item in newGuideList" :key="item.newGuideId">
                          <span class="icon">
                            <i class="el-icon-document"></i>
                          </span>
                          <span class="context"
                            ><a
                              @click="
                                forNewguide(item.newGuideId, item.releaseTime)
                              "
                            >
                              {{ item.title }}</a
                            ></span
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="企业服务管理" name="second" v-if="false">
            <div class="rh-page-content">
              <el-form
                :model="queryForm"
                ref="queryForm"
                :inline="true"
                label-width="0px"
                label-position="right"
              >
                <el-form-item prop="tenantName">
                  <el-input
                    v-model="queryForm.tenantName"
                    placeholder="企业名称"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    icon="el-icon-search"
                    type="primary"
                    @click="searchForm"
                  ></el-button>
                  <el-button
                    type="primary"
                    @click="resetForm('queryForm')"
                    style="margin-left: 0px"
                    >重置</el-button
                  >
                </el-form-item>
              </el-form>
              <div class="rh-table">
                <el-table :data="tableData" stripe border>
                  <template slot="empty">
                    <div class="pic_nodata"></div>
                  </template>
                  <el-table-column
                    align="center"
                    type="index"
                    label="序号"
                  ></el-table-column>
                  <el-table-column
                    align="left"
                    prop="companyTaxId"
                    label="企业税号"
                    width="180"
                  ></el-table-column>
                  <el-table-column
                    align="left"
                    prop="companyName"
                    label="企业名称"
                    width="250"
                  ></el-table-column>
                  <el-table-column
                    align="left"
                    prop="createTime"
                    label="创建时间"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    align="left"
                    prop="defaultTentantName"
                    label="默认租户"
                    width="80"
                  ></el-table-column>
                  <el-table-column
                    align="center"
                    prop="tenantStatusName"
                    label="状态"
                  ></el-table-column>
                  <el-table-column
                    align="center"
                    prop="factorLoginStatusName"
                    label="双因子登陆"
                  ></el-table-column>
                  <el-table-column
                    align="center"
                    prop="approStatusName"
                    label="审批状态"
                  ></el-table-column>
                  <el-table-column
                    align="left"
                    prop="approTime"
                    label="审批时间"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    align="center"
                    prop="contact"
                    label="联系人"
                  ></el-table-column>
                  <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        class="table_btn"
                        type="text"
                        @click="queryById(scope.row.tenantId)"
                        >详情</el-button
                      >
                      <el-button
                        class="table_btn"
                        type="text"
                        v-if="scope.row.factorLoginStatus == '0'"
                        @click="enableSms(scope.row.tenantId, '1', '启用')"
                        >启用双因子</el-button
                      >
                      <el-button
                        class="table_btn"
                        type="text"
                        v-if="scope.row.factorLoginStatus == '1'"
                        @click="enableSms(scope.row.tenantId, '0', '禁用')"
                        >禁用双因子</el-button
                      >
                      <el-button
                        class="table_btn"
                        type="text"
                        v-if="scope.row.approStatus == '2'"
                        @click="updateTenant(scope.row.tenantId)"
                        >编辑</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="rh-pagination">
                <el-pagination
                  layout="total, sizes, prev, pager, next, jumper"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  :total="tableData.total"
                  :current-page.sync="tableData.current"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="tableData.size"
                >
                </el-pagination>
              </div>
              <!-- 详情页面dialog -->
              <div class="drawer-container detail" :key="1000">
                <el-drawer
                  size="73%"
                  :close-on-click-modal="false"
                  :visible.sync="showDetail"
                  append-to-body
                  :wrapperClosable="false"
                  :with-header="true"
                >
                  <detailPage
                    v-if="showDetail"
                    @back="back"
                    @reload="init"
                    :detailData="detailData"
                  ></detailPage>
                </el-drawer>
              </div>
              <!-- 修改页面dialog -->
              <div class="drawer-container detail" :key="2000">
                <el-drawer
                  size="73%"
                  :close-on-click-modal="false"
                  :visible.sync="showUpdate"
                  append-to-body
                  :wrapperClosable="false"
                  :with-header="true"
                >
                  <updatePage
                    v-if="showUpdate"
                    @back="back"
                    @reload="init"
                    :updateData="updateData"
                  ></updatePage>
                </el-drawer>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import detailPage from "./tenant_detail.vue";
import updatePage from "./tenant_update.vue";
import validate from "@/utils/validate.js";
export default {
  components: { detailPage, updatePage },
  data() {
    return {
      HintShow: true,
      activeName: "first",
      loginAccount: "",
      loginTenant: "",
      loginOrganName: "",
      loginCompanyTaxId: "",
      userInfo: {},
      tenantInfo: {},
      option: [],
      noticelist: [],
      newGuideList: [],
      showDetail: false,
      showUpdate: false,
      detailData: {},
      updateData: {},
      queryForm: {
        tenantName: "",
      },
      tableData: [],
    };
  },

  mounted() {
    // this.getProduct();
    this.getHomeData();
  },

  methods: {
    //保存成功后关闭抽屉
    back() {
      this.showDetail = false;
      this.showUpdate = false;
    },
    //初始化table
    init() {
      this.init_Table();
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.queryForm.pageNo = 1;
      this.init_Table();
    },
    //获取home页面所有数据
    getHomeData() {
      let _this = this;
      _this.$api.get(
        _this.$apis.home + "/rest/home/home/gethomedata",
        {},
        function (res) {
          if (res.success) {
            _this.option = res.data.productList;
            console.log(_this.option);
            _this.noticelist = res.data.noticeList;
            _this.newGuideList = res.data.newGuideList;
            //.replace(/[\r\n]/g, "<br/>")
            var userInfo = res.data.userInfo;
            var tenantInfo = res.data.tenantInfo;
            if (
              userInfo.personnelCode != null &&
              userInfo.personnelCode != ""
            ) {
              _this.loginAccount = userInfo.personnelCode;
            } else {
              _this.loginAccount = userInfo.userAccount;
            }
            if (tenantInfo.tenantName != null && tenantInfo.tenantName != "") {
              _this.loginTenant = tenantInfo.tenantName;
            } else {
              _this.loginTenant = "没有租户";
            }
            _this.loginOrganName =
              userInfo.organName == null || userInfo.organName == ""
                ? tenantInfo.companyName
                : userInfo.organName;
            _this.loginCompanyTaxId = tenantInfo.companyTaxId;
            _this.userInfo = userInfo;
            _this.tenantInfo = tenantInfo;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },
    // //获取产品下拉信息
    // getProduct() {
    //   let _this = this;
    //   _this.$api.get(
    //     _this.$apis.home + "/rest/home/home/getoption",
    //     {},
    //     function (res) {
    //       if (res.success) {
    //         _this.option = res.data;
    //         //.replace(/[\r\n]/g, "<br/>")
    //       } else {
    //         _this.$message({
    //           message: res.errorMsg,
    //           type: "error",
    //         });
    //       }
    //     }
    //   );
    // },

    //立即购买
    buyNow(productId) {
      let _this = this;
      _this.$router.push({
        path: "/main/ProductChoice",
        query: {
          productId: productId,
        },
      });
    },

    //查看详情
    seeDetails(productId) {
      let routeData = this.$router.resolve({
        path: "/ProductDetail",
        query: { productId: productId },
      });
      window.open(routeData.href, "_blank");
    },

    //短信包购买
    buySMS() {
      let _this = this;
      _this.$router.push({
        path: "/main/BuySMS",
      });
    },

    handleClick: function (tab, event) {
      var _this = this;
      //tab节点查找el-tabs__content节点
      event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.transform =
        "translateX(" + tab.index * -100 + "%)";
      if (tab.name == "second") {
        let params = this.queryForm; //表单提交的时候，统一校验特殊字符

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
          _this.$apis.home + "/rest/home/home/getloginusertenant",
          params,
          function (res) {
            if (res.success) {
              var list = res.data.records;
              for (let i = 0; i < list.length; i++) {
                list[i].defaultTentantName =
                  list[i].defaultTentant == "Y" ? "是" : "否";
                if (list[i].tenantStatus == "0") {
                  list[i].tenantStatusName = "启用";
                } else if (list[i].tenantStatus == "1") {
                  list[i].tenantStatusName = "停用";
                } else if (list[i].tenantStatus == "2") {
                  list[i].tenantStatusName = "销毁";
                }
                if (list[i].approStatus == "0") {
                  list[i].approStatusName = "未审核";
                } else if (list[i].approStatus == "1") {
                  list[i].approStatusName = "审核中";
                } else if (list[i].approStatus == "2") {
                  list[i].approStatusName = "审核失败";
                } else if (list[i].approStatus == "3") {
                  list[i].approStatusName = "审核成功";
                }
                if (list[i].factorLoginStatus == 0) {
                  list[i].factorLoginStatusName = "禁用";
                } else if (list[i].factorLoginStatus == 1) {
                  list[i].factorLoginStatusName = "启用";
                }
              }
              _this.tableData = list;
            } else {
              _this.$message({
                message: res.errorMsg,
                type: "warning",
              });
              _this.activeName = "first";
            }
          }
        );
      }
      //console.log(event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling);
    },
    queryById(tenantId) {
      this.showDetail = true;
      this.detailData = {
        tenantId: tenantId,
      };
    },
    enableSms(tenantId, factorLoginstatus, operateName) {
      let _this = this;
      _this
        .$confirm(
          "是否将" + operateName + "双因子（短信验证码+密码）登陆",
          "提示",
          {
            type: "warning",
            cancelButtonClass: "btn-custom-cancel",
          }
        )
        .then(() => {
          _this.$api.post(
            this.$apis.home + "/rest/home/home/enablefactorloginstatus",
            { tenantId: tenantId, factorLoginstatus: factorLoginstatus },
            function (res) {
              if (res.success == true) {
                _this.$message({
                  message: operateName + "成功",
                  type: "success",
                });
                _this.init_Table();
              } else {
                _this.$message({
                  message: operateName + "失败," + res.errorMsg,
                  type: "error",
                });
              }
            }
          );
        })
        .catch(() => {});
    },
    updateTenant(tenantId) {
      this.showUpdate = true;
      this.updateData = {
        tenantId: tenantId,
      };
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
    searchForm() {
      this.queryForm.pageNo = 1;
      this.init_Table();
    },
    init_Table() {
      let _this = this;
      let params = this.queryForm;
      //表单提交的时候，统一校验特殊字符
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
        _this.$apis.home + "/rest/home/home/getloginusertenant",
        params,
        function (res) {
          if (res.success) {
            var list = res.data.records;
            for (let i = 0; i < list.length; i++) {
              list[i].defaultTentantName =
                list[i].defaultTentant == "Y" ? "是" : "否";
              if (list[i].tenantStatus == "0") {
                list[i].tenantStatusName = "启用";
              } else if (list[i].tenantStatus == "1") {
                list[i].tenantStatusName = "停用";
              } else if (list[i].tenantStatus == "2") {
                list[i].tenantStatusName = "销毁";
              }
              if (list[i].approStatus == "0") {
                list[i].approStatusName = "未审核";
              } else if (list[i].approStatus == "1") {
                list[i].approStatusName = "审核中";
              } else if (list[i].approStatus == "2") {
                list[i].approStatusName = "审核失败";
              } else if (list[i].approStatus == "3") {
                list[i].approStatusName = "审核成功";
              }
              if (list[i].factorLoginStatus == 0) {
                list[i].factorLoginStatusName = "禁用";
              } else if (list[i].factorLoginStatus == 1) {
                list[i].factorLoginStatusName = "启用";
              }
            }
            _this.tableData = list;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "warning",
            });
          }
        }
      );
    },
    forNotice(id, releaseTimeFull) {
      this.$router.push({
        name: "notice_detail",
        params: {
          notifyId: id,
          releaseTimeFull: releaseTimeFull,
        },
      });
    },
    forNewguide(id, releaseTimeFull) {
      this.$router.push({
        name: "newguide_detail",
        params: {
          newGuideId: id,
          releaseTimeFull: releaseTimeFull,
        },
      });
    },
  },
  created() {
    var _this = this;
    // _this.$api.get(_this.$apis.home + "/rest/home/home/getloginuserinfo", {}, function (res) {
    //   if (res.success) {
    //     var userInfo = res.data.userInfo;
    //     var tenantInfo = res.data.tenantInfo;
    //     if (userInfo.personnelCode != null && userInfo.personnelCode != "") {
    //       _this.loginAccount = userInfo.personnelCode;
    //     } else {
    //       _this.loginAccount = userInfo.userAccount;
    //     }
    //     if (tenantInfo.tenantName != null && tenantInfo.tenantName != "") {
    //       _this.loginTenant = tenantInfo.tenantName;
    //     } else {
    //       _this.loginTenant = "没有租户";
    //     }
    //     _this.loginOrganName = (userInfo.organName == null || userInfo.organName == "") ? tenantInfo.companyName : userInfo.organName;
    //     _this.loginCompanyTaxId = tenantInfo.companyTaxId;
    //     _this.userInfo = userInfo;
    //     _this.tenantInfo = tenantInfo;
    //   }
    // });
  },
};
</script>