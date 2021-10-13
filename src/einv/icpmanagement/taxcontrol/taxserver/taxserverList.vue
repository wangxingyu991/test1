<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text">税控服务器管理</span>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="tabs-wrap" >
        <el-tabs v-model="activeName" @tab-click="handleClick" class="rh-tabs" size="mini">
          <el-tab-pane label="税控服务器" name="first">
            <div class="rh-operate clearfix">
              <el-button type="primary" @click="onAdd">新增</el-button>
              <div class="rh-pull-right">
                <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
                    <el-form-item prop="fwqmcsk">
                      <el-input v-model.trim="queryForm.fwqmcsk" placeholder="税控服务器名称" maxlength="50" ></el-input>
                    </el-form-item>
                  <el-form-item prop="swukbh">
                    <el-input v-model="queryForm.swukbh" placeholder="税控服务器编号" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" maxlength="20" ></el-input>
                  </el-form-item>
                  <el-form-item prop="fxzt">
                    <el-select v-model="queryForm.fxzt">
                        <el-option label="未发行，未制证" value="0"></el-option>
                        <el-option label="已发行，未制证" value="1"></el-option>
                        <el-option label="已发行，已制证" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
                  <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
                </el-form>
              </div>
            </div>
            <div class="rh-table">
              <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange"  v-loading="loading"  style="width: 100%">
                <template slot="empty">
                  <div class="pic_nodata"></div>
                </template>
                <el-table-column label="序号" width="50px" align="center" fixed>
                  <template slot-scope="scope"> {{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column show-overflow-tooltip align="left" prop="fwqmc" label="税控服务器名称" width="150"></el-table-column>
                <el-table-column show-overflow-tooltip align="left" prop="fwqdzdkh" label="税控服务器地址端口" width="150"></el-table-column>
                <el-table-column show-overflow-tooltip align="left" prop="swukbh" label="税控服务器编号" width="150"></el-table-column>
                <el-table-column show-overflow-tooltip align="center" prop="xnsbzsfxsl" label="虚拟设备数（已发行/总数）" width="200"></el-table-column>
                <el-table-column show-overflow-tooltip align="left" prop="scjzsj" label="上次校准时间" width="150"></el-table-column>
                <el-table-column show-overflow-tooltip align="left" label="发行状态" width="150">
                  <template slot-scope="scope">
                    <span class="cell-red" v-if="scope.row.fxzt =='未发行，未制证'">{{scope.row.fxzt}}</span>
                    <span class="cell-blue" v-if="scope.row.fxzt =='已发行，未制证'">{{scope.row.fxzt}}</span>
                    <span class="cell-green" v-if="scope.row.fxzt =='已发行，已制证'">{{scope.row.fxzt}}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip align="left" prop="xgsj" label="修改时间" width="150"></el-table-column>
                <el-table-column align="center" label="操作"  width="260" fixed="right">
                  <template slot-scope="scope">
                    <el-button class="table_btn" type="text" @click="onEdit(scope.row.id)">修改</el-button>
                    <el-button class="table_btn" type="text" @click="taxserverInit(scope.row)">初始化</el-button>
                    <el-button class="table_btn" type="text" @click="getTaxServerInfo(scope.row)">时钟校准</el-button>
                    <el-button class="table_btn" type="text" @click="quetyTaxCert(scope.row.id)">证书管理</el-button>
                    <el-button class="table_btn" type="text" @click="deleteTaxserver(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="rh-pagination">
              <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
              </el-pagination>
            </div>
            <!-- 新增页面抽屉 -->
            <div class="drawer-container add" :key=1000>
              <el-drawer :with-header="false" append-to-body size="60%" :visible.sync="drawer">
                <editPage v-if="drawer" @back="back" @colse="colse" @reload="init_Table" :updatePageData="updatePageData" ></editPage>
              </el-drawer>
            </div>
            <!-- 税控服务器初始化 -->
            <div class="drawer-container add" :key=1002>
              <el-drawer :with-header="false" append-to-body size="60%" :visible.sync="drawerTaxserverInit">
                <editPageTaxserverInit v-if="drawerTaxserverInit" @back="back" @reload="init_Table" :updatePageDataTaxserverInit="updatePageDataTaxserverInit" ></editPageTaxserverInit>
              </el-drawer>
            </div>
            <!-- 证书查看抽屉 -->
            <div class="drawer-container add" :key=1005>
              <el-drawer :with-header="false" append-to-body size="60%" :visible.sync="drawerTaxCert">
                <editPageTaxCert v-if="drawerTaxCert" @back="back" @colse="colse" @reload="init_Table" :updatePageDataTaxCert="updatePageDataTaxCert" ></editPageTaxCert>
              </el-drawer>
            </div>
            <!-- 时钟校准Dialog -->
          <div class="dailog">
            <el-dialog title="时钟校准" :visible.sync="taxcalibrate_Dialog" width="50%" append-to-body>
              <pagetaxcalibrate v-if="taxcalibrate_Dialog" @back="back" :pagetaxcalibrateData="pagetaxcalibrateData"></pagetaxcalibrate>
            </el-dialog>
          </div>
          </el-tab-pane>
          <el-tab-pane label="税控盘组服务器" name="second" style="line-height:24px" >
              <div>
                <div class="rh-operate clearfix">
                  <el-button type="primary" @click="onAddTaxEquipmentSet">新增</el-button>
                  <div class="rh-pull-right">
                    <el-form :model="queryFormTaxEquipmentSet" :rules="rules" ref="queryFormTaxEquipmentSet" :inline="false" label-width="0px" label-position="right">
                      <el-form-item prop="fwqdm">
                        <el-input v-model.trim="queryFormTaxEquipmentSet.fwqdm" placeholder="盘组服务器代码" maxlength="32" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" ></el-input>
                      </el-form-item>
                      <el-form-item prop="fwqmc">
                        <el-input v-model.trim="queryFormTaxEquipmentSet.fwqmc" placeholder="盘组服务器名称" maxlength="50" ></el-input>
                      </el-form-item>
                      <el-button icon="el-icon-search" type="primary" @click="searchFormTaxEquipmentSet('queryFormTaxEquipmentSet')"></el-button>
                      <el-button type="primary" @click="resetForm('queryFormTaxEquipmentSet')" style="margin-left: 0px;">重置</el-button>
                    </el-form>
                  </div>
                </div>
                <div class="rh-table">
                  <el-table :data="tableDataTaxEquipmentSet.records" stripe border @selection-change="handleSelectionChange"  v-loading="loading"  style="width: 100%">
                    <template slot="empty">
                      <div class="pic_nodata"></div>
                    </template>
                    <el-table-column label="序号" width="50" align="center" fixed>
                      <template slot-scope="scope"> {{scope.$index+1}}</template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="left" prop="fwqlxmc" label="盘组服务器类型"  width="150"></el-table-column>
                    <el-table-column show-overflow-tooltip align="left" prop="fwqdm" label="盘组服务器代码"  width="150"></el-table-column>
                    <el-table-column show-overflow-tooltip align="left" prop="fwqmc" label="盘组服务器名称" width="150"></el-table-column>
                    <el-table-column show-overflow-tooltip align="left" prop="fwdz" label="服务地址"  width="300"></el-table-column>
                    <el-table-column show-overflow-tooltip align="left" prop="kczs" label="卡槽(剩余/总数)"  width="130"></el-table-column>
                    <el-table-column show-overflow-tooltip align="left" prop="fwdzdk" label="服务地址端口"  width="200"></el-table-column>
                    <el-table-column show-overflow-tooltip align="left" prop="xgsj" label="修改时间"  width="200"></el-table-column>
                    <el-table-column align="center" label="操作"  width="150" fixed="right">
                      <template slot-scope="scope">
                        <el-button class="table_btn" type="text" @click="onEditTaxEquipmentSet(scope.row.id)">修改</el-button>
                        <el-button class="table_btn" type="text" @click="onDelTaxEquipmentSet(scope.row.id)">删除</el-button>
                      </template>
                    </el-table-column>

                  </el-table>
                </div>
                <div class="rh-pagination">
                  <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
                  </el-pagination>
                </div>
                <!-- 新增页面抽屉，税控盘组 -->
                <div class="drawer-container add" :key=1002>
                  <el-drawer :with-header="false" append-to-body size="60%" :visible.sync="drawerTaxEquipmentSet">
                    <editPageTaxEquipmentSet v-if="drawerTaxEquipmentSet" @back="back" @colse="colse"  @reload="init_Table" :updatePageDataTaxEquipmentSet="updatePageDataTaxEquipmentSet" ></editPageTaxEquipmentSet>
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
import editPage from "./taxserverEdit.vue";
import editPageTaxEquipmentSet from "./taxEquipmentSetEdit.vue";
import editPageTaxCert from "./taxCertQuery.vue";
import editPageTaxserverInit from "./taxserverStep.vue";
import pagetaxcalibrate from "./taxcalibrate.vue";
import validate from "@/utils/validate.js";


export default {
  
  components: {
    editPage,
    editPageTaxEquipmentSet,
    editPageTaxCert,
    editPageTaxserverInit,
    pagetaxcalibrate,
  },

  data() {
    return {
      drawer: false,
      drawerTaxEquipmentSet: false,
      drawerTaxCert: false,
      drawerTaxserverInit: false,
      taxcalibrate_Dialog: false,
      activeName:'first',
      //查询表单
      queryForm: {
        fwqmcsk: "",
        swukbh: "",
        fxzt: "",
        pageNo: 1,
        pageSize: 10,
      },
      queryFormTaxEquipmentSet: {
        fwqdm: "",
        fwqmc: "",
        pageNo: 1,
        pageSize: 10,
      },
      page: {
        Total: 100,
        Size: [10, 20, 30],
        currentPage: 1,
      },
      tableData: [],
      tableDataTaxEquipmentSet:[],
      //表格选择
      tr_sels: [],
      updatePageData: {},
      updatePageDataTaxEquipmentSet: {},
      updatePageDataTaxCert: {},
      updatePageDataTaxserverInit:{},
      pagetaxcalibrateData:{},
     //校验规则
      rules: {
        fwqmcsk: [
          { required: false, message: "请输入税控服务器名称", trigger: "blur" },
          { max: 50, message: "最多50个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
        fwqmc: [
          { required: false, message: "请输入税控服务器名称", trigger: "blur" },
          { max: 50, message: "最多50个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
        fwqdm: [
          { required: false, message: "请输入税控服务器代码", trigger: "blur" },
          { max: 15, message: "最多32个字符", trigger: "blur" },
          { validator: this.$validate.isInteger, trigger: "blur" },
        ],
      },
      loading: false,
    };
  },

  created() {},

  mounted() {
    this.init_Table();
    this.init_TableTaxEquipmentSet();
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
      //关闭loading
      _this.loading=true;
      this.$api.post(
        _this.$apis.icpmanagement + "/taxcontrol/taxServer/listTaxServer", params,
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

    //时钟校准    
    getTaxServerInfo(row) {
      let _this = this;
      if(row.fxztdm!='2'){
        _this.$alert('请先完成税控服务器初始化',
        '提示', {
          confirmButtonText: '关闭',
        dangerouslyUseHTMLString: true
        });
        return;
      }
      _this.$api.post(
        _this.$apis.icpmanagement + "/taxcontrol/taxServer/getTaxServerInfoTaxcalibrate",{fwqdz:row.fwqdzdkh.split(':')[0],fwqdkh:row.fwqdzdkh.split(':')[1],id:row.id},
        function (res) {
        if (res.success) {
          if(res.data.body.returncode=='0'){
            console.info(JSON.stringify(res.data.body.returndata));
            _this.taxcalibrate_Dialog = true;
            _this.pagetaxcalibrateData = {
              returndata: res.data.body.returndata,
              fwqdz:row.fwqdzdkh.split(':')[0],
              fwqdkh:row.fwqdzdkh.split(':')[1],
              id:row.id,
            };
          }
          if(res.data.body.returncode!='0'){
            _this.$alert('返回代码：'+res.data.body.returncode+'</br>'+'返回描述：'+res.data.body.returnmsg,
            '税控服务器返回提示', {
              confirmButtonText: '关闭',
            dangerouslyUseHTMLString: true
            });
          }
          //关闭loading
          loading.close();
        } else {
          _this.$message({
          message: "失败," + res.errorMsg,
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
      this.queryFormTaxEquipmentSet.pageNo = val;
      //更改分页后重新初始化页面
      this.init_Table();
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      this.queryFormTaxEquipmentSet.pageSize = val;
      //更改分页后重新初始化页面
      this.init_Table();
    },

    //搜索
    searchForm() {
      this.queryForm.pageNo = 1;
      this.queryForm.pageSize = 10;
      this.init_Table();
    },


    //弹出初始化页面
    taxserverInit(row) {
    //如果已经发行和制证，则不允许在初始化
      let _this = this;
      if(row.fxzt=='已发行，已制证'){
        _this.$alert(''+'该税控服务器已经发行制证，不允许再次初始化',
        '', {
          confirmButtonText: '关闭',
        dangerouslyUseHTMLString: true
        });
        return;
      }

      this.drawerTaxserverInit = true;
      this.updatePageDataTaxserverInit = {
        row: row,
      };
    },
    

    //删除
    deleteTaxserver(row) {
      let _this = this;
      if(row.fxztdm!='0'){
        _this.$alert('只有【未发行，未制证】的数据才能删除',
        '', {
          confirmButtonText: '关闭',
        dangerouslyUseHTMLString: true
        });
        return;
      }

      _this.$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        }).then(() => {
          //打开loading
          _this.loading=true;
          _this.$api.delete(
            _this.$apis.icpmanagement +"/taxcontrol/taxServer/deleteTaxServer/" + row.id, {},
            function (res) {
            //打开loading
            _this.loading=false;
              if (res.success) {
                _this.searchForm();
                _this.$message({
                  message: "删除成功",
                  type: "success",
                });
                _this.init_TableTaxEquipmentSet();
              } else {
                _this.$message({
                  message: "删除失败," + res.errorMsg,
                  type: "error",
                });
              }
            }
          );
        });
    },


    //弹出修改页面抽屉
    quetyTaxCert(id) {
      this.drawerTaxCert = true;
      this.updatePageDataTaxCert = {
        id: id,
      };
    },


    //弹出新增页面抽屉
    onAdd() {
      this.drawer = true;
      this.updatePageData = {};
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
      this.drawerTaxCert = false;
      this.drawerTaxEquipmentSet = false;
      this.drawerTaxserverInit = false;
      this.taxcalibrate_Dialog = false;
      this.queryForm.pageNo = 1;
      this.queryFormTaxEquipmentSet.pageNo = 1;
      this.init_Table();
      this.init_TableTaxEquipmentSet();
    },

    //保存成功后关闭抽屉
    colse() {
      this.drawer = false;
      this.drawerTaxCert = false;
      this.drawerTaxEquipmentSet = false;
      this.drawerTaxserverInit = false;
      this.taxcalibrate_Dialog = false;
      this.queryForm.pageNo = 1;
      this.queryFormTaxEquipmentSet.pageNo = 1;
    },

     handleClick:function(tab,event){
        console.log(tab,event);
        //tab节点查找el-tabs__content节点
        event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.transform="translateX("+tab.index*(-100)+"%)";
        console.log(event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling);
        if(tab.index==1){
            // this.customSort();
          }else{
            //this.init_Table();
          }
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
      this.queryFormTaxEquipmentSet.pageNo = 1;
      this.init_Table();
    },

  //=======税控服务器，核心板卡盘组和税务UKEY管理=============================
    //初始化税控盘组表格
    init_TableTaxEquipmentSet() {
      let _this = this;
      let params = this.queryFormTaxEquipmentSet;
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
        _this.$apis.icpmanagement + "/taxcontrol/taxServer/listTaxEquipmentSet", params,
        function (res) {
          //打开loading
          _this.loading=false;
          if (res.success) {
            _this.tableDataTaxEquipmentSet = res.data;
             console.info(JSON.stringify(_this.tableDataTaxEquipmentSet));
            //关闭loading
            loading.close();
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },


    //搜索
    searchFormTaxEquipmentSet(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        //校验完成，进行查询
        if (valid) {
          this.queryFormTaxEquipmentSet.pageNo = 1;
          this.queryFormTaxEquipmentSet.pageSize = 10;
          this.init_TableTaxEquipmentSet();
        }
      });
    },

    //弹出新增页面抽屉
    onAddTaxEquipmentSet() {
      this.drawerTaxEquipmentSet = true;
      this.updatePageDataTaxEquipmentSet = {};
    },

    //弹出修改页面抽屉
    onEditTaxEquipmentSet(id) {
      this.drawerTaxEquipmentSet = true;
      this.updatePageDataTaxEquipmentSet = {
        id: id,
      };
    },
    
    //删除
    onDelTaxEquipmentSet(id) {
      let _this = this;
      _this.$confirm("确定要删除记录吗?", "提示", {
          type: "warning",
        })
        .then(() => {
          //打开loading
          _this.loading=true;
          _this.$api.delete(
            _this.$apis.icpmanagement +"/taxcontrol/taxServer/deleteTaxEquipmentSet/" + id, {},
            function (res) {
            //打开loading
            _this.loading=false;
              if (res.success) {
                _this.searchForm();
                _this.$message({
                  message: "删除成功",
                  type: "success",
                });
                _this.init_TableTaxEquipmentSet();
              } else {
                _this.$message({
                  message: "删除失败," + res.errorMsg,
                  type: "error",
                });
              }
            }
          );
        });
    },
  },
};
</script>
