<template>
  <div>
    <frame-left-right>
      <div slot="left">
        <!-- 左侧内容 -->
        <div class="tree-wrap">
          <!-- <div class="tree-serach">
                    <el-input placeholder="请输入内容" v-model="filterText" class="input-with-select">
                          <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
          </div>-->
          <div class="tree-body">
            <el-tree
              ref="tree"
              v-loading="treeload"
              element-loading-text="加载中"
              :filter-node-method="filterNode"
              :data="treeData"
              :props="defaultProps"
              :expand-on-click-node="boolean.flag"
              @node-click="TreeNodeClick"
              :load="loadNode"
              lazy
              highlight-current
            ></el-tree>
          </div>
        </div>
      </div>

      <div slot="right">
        <!-- 右侧内容 -->
        <div class="rh-page-header">
          <div class="rh-head-and-operate">
            <div class="tips-content">
              <span class="rh-helpTip-text">纳税人信息管理</span>
            </div>
          </div>
        </div>
        <div class="rh-page-content">
          <div class="rh-operate clearfix">
            <el-button type="primary" @click="onAdd()">新增</el-button>
            <!-- <el-button type="primary" @click="excelPort()" :loading="excelloading.loadingList">导出</el-button> -->
            <el-button type="primary" @click="excelExport()" :loading="excelloading.loadingList">导出</el-button>
            <div class="rh-pull-right">
              <el-form
                :model="queryForm"
                ref="queryForm"
                :inline="false"
                label-width="0px"
                label-position="right"
              >
                <el-form-item label prop="nsrmc">
                  <el-input v-model="queryForm.nsrmc" placeholder="请输入纳税人名称"></el-input>
                </el-form-item>
                <el-form-item label prop="nsrztDm">
                  <el-select v-model="queryForm.nsrztDm" placeholder="请选择纳税人状态">
                    <el-option
                      v-for="itemZt in NsrztList"
                      :key="itemZt.index"
                      :label="itemZt.nsrztMc"
                      :value="itemZt.nsrztDm"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-tooltip class="item" effect="dark" content="搜索" placement="bottom-start">
                  <el-button class="rh-button" type="primary" icon="el-icon-search" @click="searchForm"></el-button>
                </el-tooltip>
                <el-button type="primary" @click="resetForm('queryForm')" size="small">
                  <i class="ump-zhongzhi"></i>重置
                </el-button>
              </el-form>
            </div>
          </div>
          <div class="rh-table">
            <el-table
              :data="tableData.records"
              stripe
              border
              @selection-change="handleSelectionChange"
              v-loading="loading"
            >
              <template slot="empty">
                <div class="pic_nodata"></div>
              </template>
              <el-table-column label="序号" width="50px" align="center">
                <template slot-scope="scope">{{scope.$index+1}}</template>
              </el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="nsrmc" label="纳税人名称"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="nsrsbh" label="纳税人识别号"></el-table-column>
              <el-table-column show-overflow-tooltip align="left" prop="zzjgMc" label="组织机构名称"></el-table-column>
              <el-table-column show-overflow-tooltip prop="nsrztDm" label="纳税人状态" width="110px">
                <template slot-scope="scope">
                  <span class="cell-red" v-if="scope.row.nsrztDm =='注销'">{{scope.row.nsrztDm}}</span>
                  <span class="cell-green" v-else-if="scope.row.nsrztDm =='正常'">{{scope.row.nsrztDm}}</span>
                  <span class="cell-blue" v-else>{{scope.row.nsrztDm}}</span>
                </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="xgsj" label="录入时间" width="150px"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button class="table_btn" type="text" @click="search(scope)" >{{scope.row.opreaterLook}}</el-button>
                  <el-button class="table_btn" type="text" @click="onEdit(scope)" >{{scope.row.opreaterEdit}}</el-button>
                  <el-button class="table_btn" type="text" @click="onDel(scope.row.nsrsbh)" >{{scope.row.opreaterDel}}</el-button>
                  <el-button class="table_btn" type="text" @click="onXnsb(scope)" >{{scope.row.opreaterXnsb}}</el-button>
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
            ></el-pagination>
          </div>
        </div>
      </div>
    </frame-left-right>
    <!-- 新增页面抽屉 -->
    <div class="drawer-container add">
      <el-drawer
        size="60%"
        :visible.sync="drawer"
        append-to-body
        :wrapperClosable="false"
        :with-header="true"
      >
        <addPage v-if="drawer" @back="back" @load="init_Table" :addPageData="addPageData"></addPage>
      </el-drawer>
    </div>
    <!-- 查看页面抽屉 -->
    <div class="drawer-container lookUp">
      <el-drawer
        size="60%"
        :visible.sync="lookUp"
        append-to-body
        :wrapperClosable="false"
        :with-header="true"
      >
        <searchPage
          v-if="lookUp"
          @back="back"
          @reload="init_Table"
          :updatePageData="updatePageData"
        ></searchPage>
      </el-drawer>
    </div>
    <!-- 编辑页面抽屉 -->
    <div class="drawer-container update">
      <el-drawer
        size="60%"
        :visible.sync="update"
        append-to-body
        :wrapperClosable="false"
        :with-header="true"
      >
        <editPage v-if="update" @back="back" @reload="init_Table" :updatePageData="updatePageData"></editPage>
      </el-drawer>
    </div>

    <!-- 关联设备页面抽屉 -->
    <div class="drawer-container update">
      <el-drawer
        size="60%"
        :visible.sync="onXnsbFlag"
        append-to-body
        :wrapperClosable="false"
        :with-header="true"
      >
        <xnsbPageData v-if="onXnsbFlag" @back="back" @reload="init_Table" :xnsbPageData="xnsbPageData"></xnsbPageData>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import addPage from "./taxPayerAdd.vue";
import editPage from "./taxPayerEdit.vue";
import xnsbPageData from "./taxPayerXnsb.vue";
import searchPage from "./taxPayerLook.vue";
import frameLeftRight from "@/eniv/demo/frame/frame_lr.vue";
import { formateDate,formatExcelCustom} from "@/utils/tools.js";
import Blob from "@/assets/js/Blob.js";
import Export from "@/assets/js/Export2Excel.js";
import validate from "@/utils/validate.js";
export default {
  components: {
    frameLeftRight,
    addPage,
    editPage,
    xnsbPageData,
    searchPage
  },

  data() {
    return {
      isDialogZzjgShow: false,
      drawer: false,
      update: false,
      onXnsbFlag: false,
      lookUp: false,
      jzzjgDm: "",
      jnsrmc: "",
      jnsrztDm: "",
      //查询表单
      queryForm: {
        nsrmc: "",
        nsrztDm: "",
        zzjgMc: "",
        zzjgDm: "",
        zzjgDm2: "",
        pageNo: 1,
        pageSize: 10
      },
      page: {
        Total: 100,
        Size: [10, 20, 30],
        currentPage: 1
      },
      excelloading: {
        loadingList: false
      },
      tableData: [],
      NsrztList: [],
      ZzjgList: [],
      tableExcel: [],
      //搜索条件下拉
      searchWrap: false,
      //表格选择
      tr_sels: [],
      boolean: {
        flag: false
      },
      updatePageData: {},
      xnsbPageData:{},
      addPageData: {},
      sbsjPageData: {},
      defaultProps: {
        children: "children",
        label: "organName",
        isLeaf: "isParent"
      },
      treeData: [],
      treeload: true,
      loading: false,
      //Excel导出
      tableAttributes: [
        {
          prop: "nsrmc",//必填
          label: "纳税人名称",//必填
        },
        {
          prop: "nsrsbh",//必填
          label: "纳税人识别号",//必填
        },{
          prop: "zzjgDm",//必填
          label: "组织机构名称",//必填
          alias:"zzjgMc",
        },{
          prop: "nsrztDm",//必填
          label: "纳税人状态",//必填
          isCustom: true,
          custom:[]
        },{
          prop: "xgsj",//必填
          label: "录入时间",//必填
        },
      ]
    };
  },

  created() {},

  mounted() {
    //页面打开自动加载纳税人状态的数据
    this.init_Nsrzt();
    this.init_Table();
    this.getTreeRoot();
  },

  methods: {
    getTreeRoot() {
      let _this = this;
      _this.$api.get(
        this.$apis.icpmanagement + "/rest/permission/organmanage/treeroot",
        {},
        function(res) {
          if (res.success == true) {
            _this.treeData = res.data;
            _this.treeload = false;
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error"
            });
          }
        }
      );
    },
    loadNode(node, resolve) {
      let _this = this;
      _this.treeload = true;
      if (node.level >= 1) {
        _this.$api.get(
          this.$apis.icpmanagement +
            "/rest/permission/organmanage/treechild/" +
            node.data.organCode,
          {},
          function(res) {
            let list = res.data;
            for (let i = 0; i < list.length; i++) {
              list[i].isParent = list[i].isParent == "true" ? true : false;
            }
            _this.treeload = false;
            return resolve(list);
          }
        );
      }
    },
    excelExport(){
       var _this = this;
      let params = _this.queryForm;

      params.export = JSON.stringify(this.tableAttributes);
      this.$api.post(
       _this.$apis.icpmanagement + "/taxpayer/taxpayermanagement/export", params,
        function (res) {
          if (res.success) {
            _this.$message({
              type:"success",
              showClose: true,
              message: "数据正在导出中，请进入任务下载功能界面查询导出进度!",
            });
          } else {
            _this.$message({
              message: "数据导出失败!",
              showClose: true,
              type: "error",
            });
          }
        }
      );


    },
    //导出数据
    excelPort() {
      let _this = this;
      let data = this.tableData.records;
      let zzjgDm2 = _this.queryForm.zzjgDm2;
      let nsrmc = _this.queryForm.nsrmc;
      let nsrztDm = _this.queryForm.nsrztDm;
      let params = this.queryForm;
      if (data == undefined || data.length == 0) {
        this.$message({
          showClose: true,
          message: "当前列表为空,请查询数据再导出！",
          type: "warning"
        });
        return;
      }
      if (zzjgDm2 != _this.jzzjgDm) {
        _this.$message({
          showClose: true,
          message: "查询条件值已变化，请先查询",
          type: "warning"
        });
        return;
      }
      if (nsrmc != _this.jnsrmc) {
        _this.$message({
          showClose: true,
          message: "查询条件值已变化，请先查询",
          type: "warning"
        });
        return;
      }
      if (nsrztDm != _this.jnsrztDm) {
        _this.$message({
          showClose: true,
          message: "查询条件值已变化，请先查询",
          type: "warning"
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
      _this.excelloading.loadingList = true;
      _this.$api.post(
        _this.$apis.icpmanagement + "/taxpayer/taxpayermanagement/excelList",
        params,
        function(res) {
          if (res.success) {
            let list = res.data;
            //获取到纳税人状态进行循环匹配
            let zt = _this.NsrztList;
            let zzjg = _this.ZzjgList;

            //对数据进行解析处理
            for (let i = 0; i < list.length; i++) {
              //日期解析
              if (
                list[i].xgsj !== undefined &&
                list[i] !== "" &&
                list[i].xgsj !== null
              ) {
                list[i].xgsj = formateDate(list[i].xgsj);
              }
              for (let h = 0; h < zzjg.length; h++) {
                if (list[i].zzjgDm == zzjg[h].organCode) {
                  list[i].zzjgDm = zzjg[h].organName;
                }
              }
              for (let j = 0; j < zt.length; j++) {
                if (list[i].nsrztDm == zt[j].nsrztDm) {
                  list[i].nsrztDm = zt[j].nsrztMc;
                }
              }
            }
            _this.tableExcel = list;
            _this.Export2Excel();
            _this.excelloading.loadingList = false;
          } else {
            _this.$message({
              showClose: true,
              message: "查询失败," + res.errorMsg,
              type: "error"
            });
            _this.excelloading.loadingList = false;
          }
        }
      );
    },
    Export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/assets/js/Export2Excel");
        //这里@映射的是放的.js文件
        const tHeader = [
          "纳税人名称",
          "纳税人识别号",
          "组织机构名称",
          "纳税人状态",
          "录入时间"
        ]; // 导出的excel表头名信息
        const filterVal = ["nsrmc", "nsrsbh", "zzjgDm", "nsrztDm", "xgsj"]; // 导出的excel表头字段名，需要导出表格字段名
        //const list = this.tableData.records;
        const list = this.tableExcel;
        const data = this.formatJson(filterVal, list);

        export_json_to_excel(tHeader, data, "纳税人信息列表"); // 导出的表格名称，根据需要自己命名
      });
    },
    //格式转换，直接复制即可,不需要修改什么
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    
    

    init_Nsrzt() {
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
      this.$api.post(
        _this.$apis.icpmanagement + "/taxpayer/taxpayermanagement/NsrztList",
        params,
        function(res) {
          if (res.success) {
            _this.NsrztList = res.data;
           let formatArr = formatExcelCustom('nsrztDm','nsrztMc',_this.NsrztList);
          _this.tableAttributes[3].custom = formatArr;   
          } else {
            _this.$message({
              showClose: true,
              message: "查询失败," + res.errorMsg,
              type: "error"
            });
          }
        }
      );
    },

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
      _this.loading = true;
      // this.$api.post(
      //   _this.$apis.icpmanagement + "/taxpayer/taxpayermanagement/ZzjgList",
      //   params,
      //   function(res) {
      //     if (res.success) {
      //       _this.ZzjgList = res.data;
      //     } else {
      //       _this.$message({
      //         showClose: true,
      //         message: "查询失败," + res.errorMsg,
      //         type: "error"
      //       });
      //     }
      //     _this.loading = false;
      //   }
      // );
      this.$api.post(
        _this.$apis.icpmanagement + "/taxpayer/taxpayermanagement/taxpayerList",
        params,
        function(res) {
          if (res.success) {
            _this.tableData = res.data;
            let list = _this.tableData.records;
            //获取到纳税人状态进行循环匹配
            let zt = _this.NsrztList;
            let zzjg = _this.ZzjgList;

            //对数据进行解析处理
            for (let i = 0; i < list.length; i++) {
              //日期解析
              if (
                list[i].xgsj !== undefined &&
                list[i] !== "" &&
                list[i].xgsj !== null
              ) {
                list[i].xgsj = formateDate(list[i].xgsj);
              }
              for (let h = 0; h < zzjg.length; h++) {
                if (list[i].zzjgDm == zzjg[h].organCode) {
                  list[i].zzjgDm = zzjg[h].organName;
                }
              }
              for (let j = 0; j < zt.length; j++) {
                if (list[i].nsrztDm == zt[j].nsrztDm) {
                  list[i].nsrztDm = zt[j].nsrztMc;
                  if (zt[j].nsrztMc == "注销") {
                    list[i].opreaterLook = "查看";
                    list[i].opreaterEdit = "修改";
                    list[i].opreaterDel = "删除";
                    list[i].opreaterXnsb = "关联设备";
                  } else {
                    list[i].opreaterLook = "查看";
                    list[i].opreaterEdit = "修改";
                    list[i].opreaterDel = "删除";
                    list[i].opreaterXnsb = "关联设备";
                    list[i].opreaterSbsj = "设备上架管理";
                  }
                }
              }
            }
            _this.tableData.records = list;
          } else {
            _this.$message({
              showClose: true,
              message: "查询失败," + res.errorMsg,
              type: "error"
            });
          }
           _this.loading = false;
        }
      );
    },

    // //初始化分页
    // init_page() {
    //   this.page.total = this.tableData.total;
    //   this.page.size = this.tableData.size;
    //   this.page.current = this.tableData.current;
    // },
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

    //树形菜单过滤函数
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    //树形菜单击后事件
    TreeNodeClick(data, node) {
      //console.log(data.organCode, data.organName);
      let _this = this;
      let zzjgDm = data.organCode;
      let zzjgMc = data.organName;
      _this.queryForm.zzjgDm = zzjgDm;
      _this.queryForm.zzjgMc = zzjgMc;
      let params = { zzjgDm };
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
      _this.loading = true;
      this.$api.post(
        _this.$apis.icpmanagement + "/taxpayer/taxpayermanagement/taxpayerList",
        params,
        function(res) {
          if (res.success) {
            _this.tableData = res.data;
            let list = _this.tableData.records;
            //获取到纳税人状态进行循环匹配
            let zt = _this.NsrztList;
            let zzjg = _this.ZzjgList;

            //对数据进行解析处理
            for (let i = 0; i < list.length; i++) {
              //日期解析
              if (
                list[i].xgsj !== undefined &&
                list[i] !== "" &&
                list[i].xgsj !== null
              ) {
                list[i].xgsj = formateDate(list[i].xgsj);
              }
              for (let h = 0; h < zzjg.length; h++) {
                if (list[i].zzjgDm == zzjg[h].organCode) {
                  list[i].zzjgDm = zzjg[h].organName;
                }
              }
              for (let j = 0; j < zt.length; j++) {
                if (list[i].nsrztDm == zt[j].nsrztDm) {
                  list[i].nsrztDm = zt[j].nsrztMc;
                  if (zt[j].nsrztMc == "注销") {
                    list[i].opreaterLook = "查看";
                    list[i].opreaterEdit = "修改";
                    list[i].opreaterDel = "删除";
                    list[i].opreaterXnsb = "关联设备";
                  } else {
                    list[i].opreaterLook = "查看";
                    list[i].opreaterEdit = "修改";
                    list[i].opreaterDel = "删除";
                    list[i].opreaterXnsb = "关联设备";
                    list[i].opreaterSbsj = "设备上架管理";
                  }
                }
              }
            }
            _this.tableData.records = list;
          } else {
            _this.$message({
              showClose: true,
              message: "查询失败," + res.errorMsg,
              type: "error"
            });
          }
           _this.loading = false;
        }
      );
      if (node.childNodes.length == 0) {
        // this.val_dwssjg = data.label;
        //console.log(data.label);
        this.dialogVisible = false;
      }
      //console.log(node.childNodes.length);
    },
    //搜索
    searchForm() {
      let _this = this;
      //alert(JSON.stringify(_this.queryForm));
      this.queryForm.pageNo = 1;
      let jgdm = this.queryForm.zzjgDm;
      _this.queryForm.zzjgDm2 = _this.queryForm.zzjgDm;
      _this.jzzjgDm = _this.queryForm.zzjgDm2;
      _this.jnsrmc = _this.queryForm.nsrmc;
      _this.jnsrztDm = _this.queryForm.nsrztDm;
      if (jgdm == "") {
        _this.$message({
          showClose: true,
          message: "请先选择组织机构！",
          type: "warning"
        });
      } else {
        this.init_Table();
      }
    },

    //删除
    onDel(nsrsbh) {
      let _this = this;
      _this
        .$confirm("确定要删除记录吗?", "提示", {
          type: "warning"
        })
        .then(() => {
          _this.$api.delete(
            _this.$apis.icpmanagement +
              "/taxpayer/taxpayermanagement/deleteNsrxx/" +
              nsrsbh,
            {},
            function(res) {
              if (res.success) {
                _this.init_Table();
                _this.$message({
                  showClose: true,
                  message: "删除成功",
                  type: "success"
                });
              } else {
                _this.$message({
                  showClose: true,
                  message: "删除失败," + res.errorMsg,
                  type: "error"
                });
              }
            }
          );
        });
    },

    //弹出新增页面抽屉
    onAdd() {
      let _this = this;
      let zzjgDm = _this.queryForm.zzjgDm;
      let zzjgMc = _this.queryForm.zzjgMc;
      //console.log("zzjgDm==" + zzjgDm);

      if (zzjgDm == "") {
        _this.$message({
          showClose: true,
          message: "请先选择组织机构！",
          type: "warning"
        });
      }else {
        this.drawer = true;
        this.addPageData = {
          zzjgMc: zzjgMc,
          zzjgDm: zzjgDm
        };
      }
    },

    //弹出修改页面抽屉
    onEdit(scope) {
      this.update = true;
      let nsrsbh = scope.row.nsrsbh;
      let zzjgDm = scope.row.zzjgDm;
      let zzjgMc = scope.row.zzjgMc;
      this.updatePageData = {
        zzjgMc: zzjgMc,
        nsrsbh: nsrsbh,
        zzjgDm: zzjgDm
      };
    },
    //弹出查看页面
    search(scope) {
      this.lookUp = true;
      let nsrsbh = scope.row.nsrsbh;
      let zzjgDm = scope.row.zzjgDm;
      let zzjgMc = scope.row.zzjgMc;
      this.updatePageData = {
        zzjgMc: zzjgMc,
        nsrsbh: nsrsbh,
        zzjgDm: zzjgDm
      };
    },

    //弹出关联设备页面抽屉
    onXnsb(scope) {
      this.onXnsbFlag = true;
      let nsrsbh = scope.row.nsrsbh;
      let nsrmc = scope.row.nsrmc;
      let sf = scope.row.sf;
      let zzjgDm = scope.row.zzjgDm;
      let zzjgMc = scope.row.zzjgMc;
      this.xnsbPageData = {
        nsrsbh: nsrsbh,
        nsrmc: nsrmc,
        sf:sf,
        zzjgMc: zzjgMc,
        zzjgDm: zzjgDm
      };
    },

    //保存成功后关闭抽屉
    back(count) {
      this.drawer = false;
      this.update = false;
      this.lookUp = false;
      // this.queryForm.zzjgDm = "";
      // this.queryForm.zzjgMc = "";
      // this.queryForm.zzjgDm2 = "";
      if (count == "2") {
        this.init_Table();
      }
    },

    //重置
    resetForm(queryForm) {
      this.queryForm.zzjgDm = "";
      this.queryForm.zzjgMc = "";
      if (this.$refs[queryForm] !== undefined) {
        this.$refs[queryForm].resetFields();
      }
    },
    
  }
};
</script>
<style scoped>
.rh-zzjg {
  width: 100%;
  height: 285px;
  overflow: auto;
  margin-bottom: 25px;
  border: 1px solid #bfbfbf;
}
</style>