<template>
  <div class="drawer-wrap drawer_wdgdxx">
    <el-card>
      <div class="rh-drawer-head">
        <div class="drawer-title">我的工单信息</div>
      </div>
      <div class="rh-drawer-body">
        <el-form :model="tableData" :rules="rules" ref="tableData" label-width="140px" label-position="right">
          <el-row>
            <el-col :span="11">
              <el-form-item label="工单名称" prop="workOrderName">
                <el-input v-model="tableData.workOrderName" placeholder="" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="工单类型" prop="functionalModuleName">
                <el-input v-model="tableData.functionalModuleName" placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="公司名称" prop="enterpriseName">
                <el-input v-model="tableData.enterpriseName" placeholder="" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="公司税号" prop="enterpriseNum">
                <el-input v-model="tableData.enterpriseNum" placeholder="" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="提交人" prop="applicant">
                <el-input v-model="tableData.applicant" placeholder="" ></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="问题描述" prop="workOrderDesc">
                <el-input type="textarea" v-model="tableData.workOrderDesc"></el-input>
                <el-image
                    style="width: 100px; height: 100px"
                    :src="dialogImageUrl" lazy
                    :preview-src-list="fileList">
                </el-image>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="再次反馈" prop="handleIdea">
                <el-input type="textarea" v-model="tableData.handleIdea" :disabled="flag"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="rh-dialog-footer">
        <el-button v-show="isShow" @click="addSubmit('tableData')" :loading="loading">保存</el-button>
        <el-button @click="close('tableData')">关闭</el-button>
      </div>
    </el-card>
    <el-card>
      <div class="rh-drawer-head">
        <div class="drawer-title">我的工单处理记录</div>
      </div>
      <div class="rh-drawer-body">
        <div class="rh-table" style="margin-top: 20px;">
          <el-table :data="tableData1.records" stripe border>
            <el-table-column  show-overflow-tooltip align="left" prop="workOrderName"  label="工单名称"></el-table-column>
            <el-table-column  show-overflow-tooltip align="center" prop="handlerId"  label="提交人"></el-table-column>
            <el-table-column  show-overflow-tooltip align="center" prop="handleIdea" label="回复记录"></el-table-column>
            <!-- <el-table-column  show-overflow-tooltip align="center" prop="functionalModuleName"  label="问题类型"></el-table-column> -->
            <!-- <el-table-column  show-overflow-tooltip align="center" prop="levelName" label="问题等级"></el-table-column> -->
            <el-table-column  show-overflow-tooltip align="center" prop="handleTime" label="回复时间"></el-table-column>
            <!-- <el-table-column  show-overflow-tooltip align="center" prop="modifyTime" label="修改时间"></el-table-column> -->
            <!-- <el-table-column  show-overflow-tooltip align="center" prop="statue" label="受理状态"></el-table-column> -->
            <!-- <el-table-column  align="center" label="操作">
              <template slot-scope="scope">
                <el-button class="table_btn" type="text" @click="onManage(scope.row)">查看详情</el-button>
                <el-button class="table_btn" type="text" @click="delate_fn(scope.row)">关闭工单</el-button>
              </template>
            </el-table-column> -->
            <!-- <el-table-column show-overflow-tooltip align="center" prop="isRequried" label="必选" width="80"></el-table-column> -->
            <!-- <el-table-column show-overflow-tooltip align="center" prop="feeScale" label="计费规则"></el-table-column> -->
            <!-- <el-table-column show-overflow-tooltip align="center" prop="status" label="有效标志" width="80"></el-table-column> -->
          </el-table>
          <div class="rh-pagination">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData1.total" :current-page.sync="tableData1.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData1.size">
            </el-pagination>
          </div>
        </div>
      </div>
    </el-card>

  </div>
</template>

<script>
import validate from "@/utils/validate.js";
import { formateDate } from "@/utils/tools.js";

export default {
  props: ["addPageData"],

  data() {
    var checkSort = (rule, value, callback) => {
      const reg = /^[0-9]*$/;
      if (!reg.test(value)) {
        callback(new Error("排序只能是数字"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      flag: true,
      //下拉产品类别
      option_categoryName: [],
      //下拉系统标志
      option_system: [],
      tableData: {
      },
      tableData1: [],
      queryParam: {
        pageNo: 1,
        pageSize: 10,
        workOrderId : "",
      },
      //校验规则
      rules: {
        handleIdea: [
          { required: true, message: "请输入问题意见", trigger: "blur" },
          { max: 200, message: "最多200个字符", trigger: "blur" },
        ],
        // systemFlag: [
        //   { required: true, message: "请选择系统标志", trigger: "blur" },
        // ],
        // categoryId: [
        //   { required: true, message: "请选择产品类别", trigger: "blur" },
        // ],
        // sort: [
        //   { required: true, message: "请输入序号", trigger: "blur" },
        //   { validator: checkSort, trigger: "blur" },
        // ],
      },
      reverse: true,
      isShow: true,
      activities: [],
      workOrderTimeline: {
        workOrderMainClassId:"",
        workOrderName: "",
        workOrderId: "",
        handleIdea: "",
        workOrderUser: {
          statue : "",
          workOrderId : "",
          checkStatus : "",
        },
      },
      workOrderUser: {
        statue : "",
        workOrderId : "",
        checkStatus : "",
      },
    };
  },

  mounted() {
    this.initPage();
    this.initTimeline();
  },

  methods: {
    initPage() {
      let _this = this;
      _this.tableData = _this.addPageData.tableData;
      _this.dialogImageUrl = _this.addPageData.tableData.appendix;
      _this.fileList.push(_this.addPageData.tableData.appendix);
      if(_this.tableData.statue == "3" || _this.tableData.statue == "0" || _this.tableData.statue == "1"){
        _this.isShow = false;
        _this.flag = true;
      }else{
        _this.isShow = true;
        _this.flag = false;
      }
    },
    initTimeline(){
      let _this = this;
      _this.queryParam.workOrderId = _this.tableData.workOrderId;
      if (_this.queryParam != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(_this.queryParam))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
      }
      let urlTimeline = _this.$apis.workorder+"/rest/workorder/timeline/queryTimeline";
      _this.$api.post(
        urlTimeline,
        _this.queryParam,
        function(res){
          if(res.success){
            _this.tableData1 = res.data;
            let arr = res.data.records;
            for(let i = 0;i < arr.length;i++){
              _this.$set(_this.tableData1.records[i],"handleTime",formateDate(_this.tableData1.records[i].handleTime));
            }
          }else{
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },
    update(workOrderId,statue,checkStatus){
      let _this = this;
      _this.workOrderUser.workOrderId = workOrderId;
      _this.workOrderUser.statue = statue;
      _this.workOrderUser.checkStatus = checkStatus;
      if (_this.workOrderUser != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(_this.workOrderUser))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
      }
      let updateUrl = _this.$apis.workorder + "/rest/workorder/user/updateWorkOrderUser";
      _this.$api.post(
        updateUrl,
        _this.workOrderUser,
        function(res){
          if(res.success){
            _this.$message({
              message: "提交成功",
              type: "success",
            });
          }else{
            _this.$message({
              message: "修改失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },
    addSubmit(form){
      let _this = this;
      _this.$refs[form].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
          _this.workOrderTimeline.handleIdea = _this.tableData.handleIdea;
          _this.workOrderTimeline.workOrderMainClassId = _this.tableData.workOrderMainClassId;
          _this.workOrderTimeline.workOrderName = _this.tableData.workOrderName;
          _this.workOrderTimeline.workOrderId = _this.tableData.workOrderId;
          _this.workOrderTimeline.workOrderUser.statue = "1";
          _this.workOrderTimeline.workOrderUser.checkStatus = "1";
          let urlTimeline = _this.$apis.workorder+"/rest/workorder/timeline/addTimeline";
          if (_this.workOrderTimeline != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(_this.workOrderTimeline))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }
          _this.$api.post(
            urlTimeline,
            _this.workOrderTimeline,
            function(res){
              if(res.success){
                _this.tableData.handleIdea = "";
                _this.workOrderTimeline.handleIdea = "";
                // _this.update(_this.workOrderTimeline.workOrderId,"1","1");
                _this.$message({
                  message: "提交成功",
                  type: "success",
                });
                _this.initTimeline(); //初始化
              }else{
                _this.$message({
                  message: "保存失败," + res.errorMsg,
                  type: "error",
                });
              }
            }
          );
        }
      });
    },
    //关闭
    close(formName) {
      //关闭抽屉
      // this.$refs[formName].resetFields();
      this.$emit("back");
    },
    //分页操作
    handleCurrentChange(val) {
      this.queryParam.pageNo = val;
      //更改分页后重新初始化页面
      this.initTimeline();
    },
    handleSizeChange(val) {
      this.queryParam.pageSize = val;
      //更改分页后重新初始化页面
      this.initTimeline();
    },
  },
};
</script>

<style lang="less">
.drawer_wdgdxx{
  .el-card__body{
    padding:0px;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 100px;
  }
  .el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
  .el-dialog__headerbtn {
    right: 40px;
  }
}
</style>
