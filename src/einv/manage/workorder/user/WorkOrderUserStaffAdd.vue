<template>
  <div class="drawer-wrap">
      <!-- <el-card> -->
        <div class="rh-drawer-head">
          <div class="drawer-title">工单管理员添加</div>
        </div>
        <div class="rh-drawer-body">
          <el-form :model="tableData" ref="tableData" label-width="140px" label-position="right">
            <el-card>
              <el-row>
                <!-- <el-col :span="11"> -->
                  <div class="rh-table">
                    <el-table :data="data" v-loading="loading" stripe border @selection-change="handleSelectionChange">
                      <el-table-column  type="selection" width="55"></el-table-column>
                      <el-table-column  show-overflow-tooltip align="left" prop="personnelId"  label="工单管理人员ID"></el-table-column>
                      <el-table-column  show-overflow-tooltip align="center" prop="personnelName"  label="工单管理人员姓名" ></el-table-column>
                      <!-- <el-table-column  show-overflow-tooltip align="center" prop="createTime" label="创建时间"></el-table-column> -->

                    </el-table>
                  </div>
                <!-- </el-col> -->

              </el-row>
              <el-row>
                <div class="rh-dialog-footer">
                  <el-button type="primary" @click="addSubmit">保存</el-button>
                  <el-button @click="close('tableData')">关闭</el-button>
                </div>
              </el-row>
            </el-card>
          </el-form>

        </div>

      <!-- </el-card> -->
    </div>
</template>

<script>
import validate from "@/utils/validate.js";
  export default {
    props: ["addPageData"],

    data() {
      return {
        tableData: [],
        staffList: [],
        defaultExpandedKeys: [],
        mainClassId: "",
        data:[
        ],
        loading: false,
      };
    },
    mounted() {
      // this.loading = true;
      this.initData();

      // this.loading = false;
    },
    methods: {

      handleSelectionChange(data){
        let _this = this;
        _this.staffList = data;
        console.log(data);
      },
      initData(){
        let _this = this;

        _this.mainClassId = this.addPageData.mainClassId;
        this.$api.get(
          _this.$apis.manage + "/manage/workorder/userinfo/getworkorderhanderpersonnel",
          {},
          function (res) {
            if (res.success) {
              // _this.data = res.data;
              // alert(1)
              // alert(_this.addPageData.userList.records[0].userId)
              for(let i = 0;i < res.data.length;i++){
                for(let j = 0;j < _this.addPageData.userList.records.length;j++){
                  if(_this.addPageData.userList.records[j].userId == res.data[i].personnelId){
                    _this.$set(res.data[i],"isLoad","N");
                  }
                }
              }
              for(let i = 0;i < res.data.length;i++){
                if(res.data[i].isLoad != "N"){
                  _this.data.push(res.data[i]);
                }
              }
              // _this.data[i].id = res.data[i].personnelId;
              // _this.data[i].label = res.data[i].personnelName;
            } else {
              _this.$message({
                message: "查询失败," + res.errorMsg,
                type: "error",
              });
            }
          }
        );
      },
      itemChange(hasAddItem) {
        this.hasItem = hasAddItem;
        this.form.addItemName = "";
        this.form.addItemUnit = "";
      },

      //关闭
      close(formName) {

        this.$refs[formName].resetFields();

        //关闭抽屉
        this.$emit("back");
      },

      //表单提交
      addSubmit() {
        let _this = this;


        if(_this.staffList.length == 0){
          _this.$message({
            message: "请选择至少一位人员",
            type: "warning",
          });
          return;
        }
        
        var url = _this.$apis.manage + "/manage/workorder/user/addWorkOrderUserStaffs";
        let addparams = _this.staffList;
        for(let i = 0;i < addparams.length;i++){
          _this.$set(addparams[i],"userId",addparams[i].personnelId);
          _this.$set(addparams[i],"mainClassId",_this.mainClassId);
        }
        if (addparams != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(addparams))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }

          _this.loading = true;
            _this.$api.post(
              url,
              addparams,
              function (res) {
                if (res.success) {
                  _this.$message({
                    message: "保存成功",
                    type: "success",
                  });
                  _this.loading = false;
                  //关闭抽屉
                  _this.staffList = [];
                  _this.$emit("back");
                  //清空表单为下次使用
                  // _this.resetForm(formName);
                } else {
                  _this.$message({
                    message: "保存失败," + res.errorMsg,
                    type: "error",
                  });
                  // _this.loading = false;
                }
              }
            );

      },
    },
  };
</script>

<style>
</style>
