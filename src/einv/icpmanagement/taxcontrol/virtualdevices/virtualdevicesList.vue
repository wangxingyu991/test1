<template>
  <div>
    <frameleftright>
        <div slot="left">
            <div class="tree-wrap">
                <div class="tree-body">
                    <el-tree ref="tree" v-loading="treeload" element-loading-text="加载中..." :data="treeData" :props="defaultProps" 
                        @node-click="handleNodeClick" :load="loadNode"  lazy  highlight-current>
                    </el-tree>
                </div>
            </div>
        </div>
        <div slot="right">
          <div class="rh-page-header">
              <div class="rh-head-and-operate">
                <div class="tips-content">
                    <span class="rh-helpTip-text">虚拟设备管理</span>
                </div>
                <!-- <div class="operate-btns">
                    <el-button>帮助</el-button>
                </div> -->
              </div>
          </div>
          <div class="rh-page-content">
            <div class="rh-operate clearfix">
              <el-button type="primary" @click="onAdd">虚拟设备发行</el-button>
              <div class="rh-pull-right">
                <el-form :model="queryForm" :rules="rules" ref="queryForm" :inline="false" label-width="0px" label-position="right">
                  <el-form-item prop="nsrmc">
                    <el-input v-model.trim="queryForm.nsrmc" placeholder="纳税人名称"  maxlength="64" ></el-input>
                  </el-form-item>
                  <el-form-item prop="xnsbh">
                    <el-input v-model.trim="queryForm.xnsbh" placeholder="虚拟设备号" maxlength="32"  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"></el-input>
                  </el-form-item>
                  <el-button icon="el-icon-search" type="primary" @click="searchForm('queryForm')"></el-button>
                  <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
                </el-form>
              </div>
            </div>
            <div class="rh-table">
              <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange" v-loading="loading"  style="width: 100%">
                <template slot="empty">
                  <div class="pic_nodata"></div>
                </template>
                <el-table-column label="序号" width="50px" align="center" fixed>
                  <template slot-scope="scope"> {{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column show-overflow-tooltip align="left" prop="sf" label="省份" width="80"></el-table-column>
                <el-table-column show-overflow-tooltip align="left" prop="nsrsbh" label="纳税人识别号" width="160"></el-table-column>
                <el-table-column show-overflow-tooltip align="left" prop="nsrmc" label="纳税人名称" width="160"></el-table-column>
                <el-table-column show-overflow-tooltip align="left" prop="xnsbh" label="虚拟设备号"  width="120"></el-table-column>
                <el-table-column show-overflow-tooltip align="left" label="设备状态" width="150">
                  <template slot-scope="scope">
                    <span class="cell-blue" v-if="scope.row.clzt =='已发行,未制证'">{{scope.row.clzt}}</span>
                    <span class="cell-green" v-if="scope.row.clzt =='已发行,已制证'">{{scope.row.clzt}}</span>
                    <span class="cell-red" v-if="scope.row.clzt =='已注销'">{{scope.row.clzt}}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip align="left" prop="fplxdm" label="发票类型代码"  width="100"></el-table-column>
                <el-table-column show-overflow-tooltip align="left" prop="xgsj" label="修改时间"  width="150"></el-table-column>
                <el-table-column align="center" label="操作"  width="200"  fixed="right">
                  <template slot-scope="scope">
                    <el-button class="table_btn" type="text" @click="quetyTaxCert(scope.row)">证书管理</el-button>
                    <el-button class="table_btn" type="text" @click="updatetaxplayerinfo(scope.row)">企业信息更新</el-button>
                    <el-button class="table_btn" type="text" @click="onCancel(scope.row)">注销</el-button>
                    <!-- <el-dropdown>
                       <el-button class="table_btn" type="text" style="color:#409EFF;font-size:12px;line-height: 10px;">更多</el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                           <el-button class="table_btn" type="text" @click="quetyTaxCert(scope.row.xnsbh)">证书查看</el-button>  
                        </el-dropdown-item>
                        <el-dropdown-item>
                           <el-button class="table_btn" type="text" @click="taxcalibrate(scope.row.fwqdzdkh,scope.row.id)">企业信息查看</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown> -->
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="rh-pagination">
              <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" 
                 :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
              </el-pagination>
            </div>
            <!-- 新增页面抽屉 -->
            <div class="drawer-container add" :key=1000>
              <el-drawer :with-header="false" append-to-body size="70%" :visible.sync="drawer">
                <editPage v-if="drawer" @back="back" @reload="init_Table" :updatePageData="updatePageData" ></editPage>
              </el-drawer>
            </div>
            <!-- 企业信息更新页面抽屉 -->
            <div class="drawer-container add" :key=1001>
              <el-drawer :with-header="false" append-to-body size="70%" :visible.sync="drawertaxplayerInfo">
                <editPagetaxplayerInfo v-if="drawertaxplayerInfo" @back="back" @reload="init_Table" :updatePageDatataxplayerInfo="updatePageDatataxplayerInfo" ></editPagetaxplayerInfo>
              </el-drawer>
            </div>
            <!-- 虚拟设备证书查看页面抽屉 -->
            <div class="drawer-container add" :key=1002>
              <el-drawer :with-header="false" append-to-body size="70%" :visible.sync="drawertaxCertInfo">
                <editPagetaxCertInfo v-if="drawertaxCertInfo" @back="back" @reload="init_Table" :updatePageDatataxCertInfo="updatePageDatataxCertInfo" ></editPagetaxCertInfo>
              </el-drawer>
            </div>
          </div>
      </div>
    </frameleftright>
  </div>
</template>

<script>
import frameleftright from "@/einv/tree/frame_lr.vue";
import editPage from "./virtualdevicesStep.vue";
import editPagetaxplayerInfo from "./taxplayerInfoUpdate.vue";
import editPagetaxCertInfo from "./taxcertInfo.vue";
import validate from "@/utils/validate.js";

export default {
  
  components: {
    frameleftright,
    editPage,
    editPagetaxplayerInfo,
    editPagetaxCertInfo,
  },

  data() {
    return {
      drawer: false,
      drawertaxplayerInfo: false,
      drawertaxCertInfo: false,
      editForm: {
        organId: '',
        organCode: '',
        superiorOrganCode: '',
        organPath: '',
        organTypeId: '',
        organName: '',
        organReferred: '',
        organAddress: '',
        organPostalcode: '',
        fax: '',
        organPhone: '',
        email: '',
        organMark: '',
        effectiveStartTime: '',
        effectiveEndTime: '',
        valid: '',
        choose: '',
      },
      //查询表单
      queryForm: {
        xnsbh: "",
        nsrmc: "",
        fxzt: "",
        pageNo: 1,
        pageSize: 10,
        organCode: "",
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
      updatePageDatataxplayerInfo: {},
      updatePageDatataxCertInfo: {},
      defaultProps: {
        children: 'children',
        label: 'organName',
        isLeaf: 'isParent'
      },
      treeData:[],
      treeload:true,
      //校验规则
      rules: {
        nsrmc: [
          { required: false, message: "请输入纳税人名称", trigger: "blur" },
          { max: 64, message: "最多64个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
      },
      loading: false,
    };
  },

  created() {},

  mounted() {
    this.getTreeRoot();
    //this.init_Table();
  },

  methods: {
    getTreeRoot() {
        this.treeData=[];
        let _this = this;
        _this.treeload=true;
        _this.$api.get(this.$apis.icpmanagement+"/rest/permission/organmanage/treeroot", {}, function (res) {
            console.info(JSON.stringify(res));
            if (res.success == true) {
                _this.treeData = res.data;
                _this.treeload = false;
            } else {
                _this.$message({
                    message: '查询失败,' + res.errorMsg,
                    type: 'error'
                });
            }
        })
    },
    loadNode(node, resolve) {
      let _this = this;
      _this.treeload=true;
      if (node.level >= 1) {
        _this.$api.get(this.$apis.icpmanagement+"/rest/permission/organmanage/treechild/"+node.data.organCode, {}, function (res) {
          let list = res.data;
          for(let i = 0;i < list.length;i++){
            list[i].isParent=(list[i].isParent=='true'?true:false);
          }
          _this.treeload = false;
          return resolve(list);
        });
      }
    },
    handleNodeClick(data) {
      let _this = this;
      if(_this.$refs['editForm'] != undefined){
        _this.$refs['editForm'].resetFields();
      }
      _this.editForm.organId = data.organId;
      _this.editForm.organCode = data.organCode;
      _this.editForm.organName = data.organName;
      _this.init_Table();
    },


    //初始化表格
    init_Table() {
      let _this = this;
      let organCode=_this.editForm.organCode;
      if(organCode==''){
        _this.$alert('请先选择组织机构','提示', {
          confirmButtonText: '关闭',
          dangerouslyUseHTMLString: true
        });
        return;
      }
      let params = this.queryForm;
       _this.$set(params, "organCode", organCode);
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
        _this.$apis.icpmanagement + "/taxcontrol/virtualDevices/listVirtualDevices", params,
        function (res) {
          //关闭loading
          _this.loading=false;
           console.info(JSON.stringify(res));
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
    searchForm(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        //校验完成，进行查询
        if (valid) {
          this.queryForm.pageNo = 1;
          this.queryForm.pageSize = 10;
          this.init_Table();
        }
      });
    },


    //虚拟设备注销
    onCancel(row) {
      let _this = this;
      if(row.clztdm=='2'){
        _this.$alert('此虚拟设备已经注销','提示', {
          confirmButtonText: '关闭',
          dangerouslyUseHTMLString: true
        });
        return;
      }
      _this.$confirm("注销此虚拟设备后，此虚拟设备将不能开票，请谨慎操作！！ 您确定要注销此虚拟设备吗？", "提示", {
        type: "warning",
      }).then(() => {
        _this.loading=true;
        _this.$api.get(
          _this.$apis.icpmanagement + "/taxcontrol/virtualDevices/onCancle/" + row.xnsbh, {},
          function (res) {
            _this.loading=false;
            if (res.success) {
              _this.$message({
                message: "注销成功",
                type: "success",
              });
              _this.init_Table();
            } else {
              _this.$message({
                message: "注销失败," + res.errorMsg,
                type: "error",
              });
            }
          }
        );
      });
    },


    //弹出新增页面抽屉，虚拟设备发行
    onAdd() {
      let _this = this;
      let organCode=_this.editForm.organCode;
      if(organCode==''){
        _this.$alert('请先选择组织机构','提示', {
          confirmButtonText: '关闭',
          dangerouslyUseHTMLString: true
        });
        return;
      }
      //判断当前机构下是否已经关联税号
      _this.$api.get(
        _this.$apis.icpmanagement + "/taxcontrol/virtualDevices/checktaxPlayerInfo/" + organCode, {},
        function (res) {
          if (res.success) {
            console.info(JSON.stringify(res));
            if(res.data.code=='0002'){
             _this.$alert('返回代码：'+res.data.code+'</br>'+'返回描述：'+res.data.msg,
               '返回提示', {
               confirmButtonText: '关闭',
               dangerouslyUseHTMLString: true
             });
             return;
            }
            if(res.data.code=='0001'){
               _this.drawer = true;
               _this.updatePageData = {
                organCode:res.data.organCode,
                nsrsbh:res.data.nsrsbh,
                nsrmc:res.data.nsrmc,
              };
            }
          } else {
            _this.$message({
              message: "失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );

    },

    //弹出修改页面抽屉
    onEdit(id) {
      this.drawer = true;
      this.updatePageData = {
        id: id,
      };
    },

    //弹出更新企业信息页面抽屉
    updatetaxplayerinfo(row) {
      if(row.clztdm=='2'){
        this.$alert('此虚拟设备已经注销','提示', {
          confirmButtonText: '关闭',
          dangerouslyUseHTMLString: true
        });
        return;
      }
      this.drawertaxplayerInfo = true;
      this.updatePageDatataxplayerInfo = {
        row:row,
      };
    },

    //企业证书查看
    quetyTaxCert(row){
      debugger
      if(row.clztdm=='2'){
        this.$alert('此虚拟设备已经注销','提示', {
          confirmButtonText: '关闭',
          dangerouslyUseHTMLString: true
        });
        return;
      }
      this.drawertaxCertInfo = true;
      this.updatePageDatataxCertInfo = {
        row:row,
      };
    },
    

    //保存成功后关闭抽屉
    back() {
      this.drawer = false;
      this.drawertaxplayerInfo = false;
      this.drawertaxCertInfo = false;
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
