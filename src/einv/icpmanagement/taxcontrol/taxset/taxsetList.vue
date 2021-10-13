<template>
  <div>
    <frameleftright>
        <div slot="left">
            <div class="tree-wrap">
                <div class="tree-body">
                    <el-tree ref="tree" v-loading="treeload" element-loading-text="加载中" :data="treeData" :props="defaultProps" 
                        @node-click="handleNodeClick" :load="loadNode"  lazy  highlight-current>
                    </el-tree>
                </div>
            </div>
        </div>
        <div slot="right">
          <div class="rh-page-header">
              <div class="rh-head-and-operate">
                <div class="tips-content">
                    <span class="rh-helpTip-text">盘组设备管理</span>
                </div>
                <div class="operate-btns">
                    <el-button>帮助</el-button>
                </div>
              </div>
          </div>
          <div class="rh-page-content">
            <div class="rh-operate clearfix">
              <el-button type="primary" @click="onAdd">企业信息同步</el-button>
              <div class="rh-pull-right">
                <el-form :model="queryForm" :rules="rules" ref="queryForm" :inline="false" label-width="0px" label-position="right">
                  <el-form-item prop="nsrmc">
                    <el-input v-model.trim="queryForm.nsrmc" placeholder="纳税人名称"  maxlength="64" ></el-input>
                  </el-form-item>
                  <el-form-item prop="xnsbh">
                    <el-input v-model.trim="queryForm.xnsbh" placeholder="税控设备号/机器编号" maxlength="32"  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" ></el-input>
                  </el-form-item>
                  <el-button icon="el-icon-search" type="primary" @click="searchForm('queryForm')"></el-button>
                  <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
                </el-form>
              </div>
            </div>
            <div class="rh-table">
              <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange" v-loading="loading">
                <template slot="empty">
                  <div class="pic_nodata"></div>
                </template>
                <el-table-column label="序号" width="50px" align="center">
                  <template slot-scope="scope"> {{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column show-overflow-tooltip align="left" prop="nsrsbh" label="纳税人识别号"></el-table-column>
                <el-table-column show-overflow-tooltip align="left" prop="nsrmc" label="纳税人名称"></el-table-column>
                <el-table-column show-overflow-tooltip align="left" prop="xnsbh" label="税控设备号" ></el-table-column>
                <el-table-column show-overflow-tooltip align="left" prop="fplxdm" label="发票类型代码" ></el-table-column>
                <el-table-column show-overflow-tooltip align="left" prop="fwqdm" label="服务器代码" width="100"></el-table-column>
                <el-table-column show-overflow-tooltip align="left" prop="fwqmc" label="盘组服务器名称" ></el-table-column>
                <!-- <el-table-column show-overflow-tooltip align="left" prop="fwdz" label="服务地址"></el-table-column> -->
                <el-table-column align="center" label="操作"  width="100">
                  <template slot-scope="scope">
                    <!-- <el-button class="table_btn" type="text" @click="updatetaxCert(scope.row)">信息查看</el-button> -->
                    <el-button class="table_btn" type="text" @click="updatetaxsetinfo(scope.row)">信息同步</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="rh-pagination">
              <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" 
                 :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
              </el-pagination>
            </div>
            <!-- 企业信息同步页面抽屉 -->
            <div class="drawer-container add" :key=1000>
              <el-drawer :with-header="false" append-to-body size="70%" :visible.sync="drawertaxplayerInfo">
                <editPagetaxplayerInfo v-if="drawertaxplayerInfo" @back="back" @reload="init_Table" :updatePageDatataxplayerInfo="updatePageDatataxplayerInfo" ></editPagetaxplayerInfo>
              </el-drawer>
            </div>
            <!-- 税控UKEY盘组页面抽屉 -->
            <!-- <div class="drawer-container add" :key=1001>
              <el-drawer :with-header="false" append-to-body size="70%" :visible.sync="drawer">
                <editPage v-if="drawer" @back="back" @reload="init_Table" :updatePageData="updatePageData" ></editPage>
              </el-drawer>
            </div> -->
            <!-- 税控核心板卡页面抽屉 -->
            <div class="drawer-container add" :key=1002>
              <el-drawer :with-header="false" append-to-body size="70%" :visible.sync="drawertaxcardset">
                <editPagetaxcardset v-if="drawertaxcardset" @back="back" @reload="init_Table" :updatePageDatataxcardset="updatePageDatataxcardset" ></editPagetaxcardset>
              </el-drawer>
            </div>
          </div>
      </div>
    </frameleftright>
  </div>
</template>


<script>
import frameleftright from "@/einv/tree/frame_lr.vue";
//import editPage from "./taxsetEdit.vue";
import editPagetaxcardset from "./taxcardsetEdit.vue";
import editPagetaxplayerInfo from "./taxplayerInfo.vue";
import validate from "@/utils/validate.js";

export default {
  
  components: {
    frameleftright,
    //editPage,
    editPagetaxcardset,
    editPagetaxplayerInfo,
  },

  data() {
    return {
      //drawer: false,
      drawertaxcardset: false,
      drawertaxplayerInfo: false,
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
        swukbh: "",
        fxzt: "",
        pageNo: 1,
        pageSize: 10,
        organCode: "",
        nsrsbh: "",
        nsrmc: "",
      },
      page: {
        Total: 100,
        Size: [10, 20, 30],
        currentPage: 1,
      },
      tableData: [],
      //表格选择
      tr_sels: [],
      //updatePageData: {},
      updatePageDatataxcardset: {},
      updatePageDatataxplayerInfo: {},
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
        _this.$apis.icpmanagement + "/taxcontrol/taxSet/listTaxSet", params,
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

    //更新
    updatetaxCert(fwqdzdk,nsrsbh,xnsbh) {
      let _this = this;
      let params = {fwqdzdk:fwqdzdk,nsrsbh:nsrsbh,xnsbh:xnsbh};
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
        _this.$apis.icpmanagement + "/taxcontrol/virtualDevices/virtualdevicesCert",params,
        function (res) {
          //关闭loading
          _this.loading=false;
          if (res.success) {
             _this.$alert('返回代码：'+res.data.returncode+'</br>'+'返回描述：'+res.data.comment+","+res.data.returnmsg,
               '税控服务器返回提示', {
               confirmButtonText: '关闭',
               dangerouslyUseHTMLString: true
             });
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


    //删除
    onDel(id) {
      let _this = this;
      _this .$confirm("确定要删除记录吗?", "提示", {
        type: "warning",
       }) .then(() => {
        //打开loading
        _this.loading=true;
        _this.$api.delete(
          _this.$apis.icpmanagement + "/taxcontrol/taxServer/deleteTaxServer/" + id, {},
          function (res) {
            _this.loading=false;
            if (res.success) {
              _this.searchForm();
              _this.$message({
                message: "删除成功",
                type: "success",
              });
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


    //弹出新增页面抽屉
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
      //打开loading
      _this.loading=true;
      //判断当前机构下是否已经关联税号
      _this.$api.get(
        _this.$apis.icpmanagement + "/taxcontrol/virtualDevices/checktaxPlayerInfo/" + organCode, {},
        function (res) {
          //关闭loading
          _this.loading=false;
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
               _this.drawertaxplayerInfo = true;
               _this.updatePageDatataxplayerInfo = {
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
      //this.drawer = true;
      this.updatePageData = {
        id: id,
      };
    },

    //弹出更新税UKEY盘组页面抽屉
    updatetaxsetinfo(row) {
      this.drawertaxcardset = true;
      this.updatePageDatataxcardset = {
        row:row,
      };
    },

    //企业证书查看
    quetyTaxCert(xnsbh){
      this.drawertaxCertInfo = true;
      this.updatePageDatataxCertInfo = {
        xnsbh:xnsbh,
      };
    },
    

    //保存成功后关闭抽屉
    back() {
      //this.drawer = false;
      this.drawertaxcardset = false;
      this.drawertaxplayerInfo = false;
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
