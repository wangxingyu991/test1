<template>
  <div class="drawer-wrap"  v-loading="loading">
    <div class="rh-drawer-head">
      <div class="drawer-title"><span v-show="!editFlag">修改安全代理信息</span><span v-show="editFlag">新增安全代理信息</span></div>
    </div>
    <div class="rh-drawer-body">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="代理服务器地址" prop="fwqdz">
              <el-input v-model="editForm.fwqdz" placeholder="代理服务器地址" maxlength="15"  onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="代理服务器端口号" prop="fwqdkh">
              <el-input v-model="editForm.fwqdkh" placeholder="代理服务器端口号" maxlength="10" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="VIP地址" prop="vipdz">
              <el-input v-model="editForm.vipdz" placeholder="VIP地址" maxlength="15"  onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="VIP端口号" prop="vipdkh">
              <el-input v-model="editForm.vipdkh" placeholder="VIP端口号" maxlength="10" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" ></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="11">
            <el-form-item label="是否使用平台KEY" prop="sfptkey">
                <el-select v-model="editForm.sfptkey">
                    <el-option label="是" value="Y"></el-option>
                    <el-option label="否" value="N"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="有效标识" prop="yxbz">
                <el-select v-model="editForm.yxbz">
                    <el-option label="有效" value="Y"></el-option>
                    <el-option label="无效" value="N"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>          
        <el-row>
          <el-col :span="11">
            <el-form-item label="代理服务器描述" prop="fwqms">
              <el-input v-model.trim="editForm.fwqms" placeholder="代理服务器描述" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="最大连接数" prop="zdljs">
              <el-input v-model.trim="editForm.zdljs" placeholder="最大连接数" maxlength="10"   onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"  ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="通信协议" prop="tsxy">
              <el-input v-model.trim="editForm.tsxy" placeholder="通信协议" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="文件路径" prop="wjlj">
              <el-input v-model.trim="editForm.wjlj" placeholder="文件路径" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="11">
            <el-form-item label="登录帐号" prop="dlzh">
              <el-input v-model.trim="editForm.dlzh" placeholder="登录帐号" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="登录口令" prop="dlkl">
              <el-input v-model.trim="editForm.dlkl" placeholder="登录口令" type="password" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 	
        <el-row>
          <el-col :span="11">
            <el-form-item label="socket连接个数" prop="ljgs">
              <el-input v-model.trim="editForm.ljgs" placeholder="socket连接个数（整数）" maxlength="10" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="下载时间间隔" prop="lxxzjg">
              <el-input v-model.trim="editForm.lxxzjg" placeholder="离线信息下载时间间隔(小时)" maxlength="10" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"></el-input>
            </el-form-item>
          </el-col>
        </el-row>  
        <el-row>
          <el-col :span="11">
            <el-form-item label="登录描述" prop="dlms">
                <el-select v-model="editForm.dlms">
                    <el-option label="自开" value="1"></el-option>
                    <el-option label="代开" value="2"></el-option>
                </el-select>              
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="日志警报" prop="rzjb">
                 <el-select v-model="editForm.rzjb">
                    <el-option label="全关闭" value="0"></el-option>
                    <el-option label="记录错误" value="1"></el-option>
                    <el-option label="记录错误警告" value="2"></el-option>
                    <el-option label="全部信息" value="3"></el-option>
                </el-select>   
            </el-form-item>
          </el-col>
        </el-row> 				
      </el-form>
    </div>
    <div class="rh-dialog-footer">
      <el-button type="primary" @click="onSubmit('editForm')">保存</el-button>
      <el-button @click="close('editForm')">关闭</el-button>
    </div>


    
  </div>
</template>

<script>
import validate from "@/utils/validate.js";


export default {
  props: ["updatePageData"],

  data() {
    let editFlag = !this.updatePageData.id
    return {
      editFlag,
      editForm: {
        id: "",
        fwqdz: "",
        fwqdkh: "",
        vipdz: "",
        vipdkh: "",
        sfptkey: "",
        yxbz: "",
      },
      //校验规则
      rules: {
        fwqdz: [
          { required: true, message: "请输入代理服务器地址", trigger: "blur" },
          { max: 15, message: "最多15个字符", trigger: "blur" },
          { validator: this.$validate.isIp, trigger: "blur" },
        ],
        fwqdkh: [
          { required: true, message: "请输入代理服务器端口号", trigger: "blur" },
          { max: 8, message: "最多8个字符", trigger: "blur" },
          { validator: this.$validate.isInteger, trigger: "blur" },
        ],
        vipdz: [
          { required: true, message: "请输入VIP地址", trigger: "blur" },
          { max: 15, message: "最多15个字符", trigger: "blur" },
          { validator: this.$validate.isIp, trigger: "blur" },
        ],
        vipdkh: [
          { required: true, message: "请输入VIP端口号", trigger: "blur" },
          { max: 8, message: "最多8个字符", trigger: "blur" },
          { validator: this.$validate.isInteger, trigger: "blur" },
        ],
        sfptkey: [
          { required: true, message: "请选择是否使用平台KEY", trigger: "blur" },
        ],
        yxbz: [
          { required: true, message: "请选择有效标识", trigger: "blur" },
        ],
        fwqms: [
          { required: false, message: "代理服务器描述", trigger: "blur" },
          { max: 100, message: "最多100个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
        tsxy: [
          { required: false, message: "通信协议", trigger: "blur" },
          { max: 100, message: "最多100个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
        dlzh: [
          { required: false, message: "登录账号", trigger: "blur" },
          { max: 100, message: "最多100个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
        zdljs: [
          { required: false, message: "最大连接数", trigger: "blur" },
          { max: 10, message: "最多10个字符", trigger: "blur" },
          { validator: this.$validate.isInteger, trigger: "blur" },
        ],
        ljgs: [
          { required: false, message: "socket连接个数（整数）", trigger: "blur" },
          { max: 10, message: "最多10个字符", trigger: "blur" },
          { validator: this.$validate.isInteger, trigger: "blur" },
        ],
        lxxzjg: [
          { required: false, message: "离线信息下载时间间隔(小时)", trigger: "blur" },
          { max: 10, message: "最多10个字符", trigger: "blur" },
          { validator: this.$validate.isInteger, trigger: "blur" },
        ],
      },
       loading: false,
    };
  },

  created() {},

  mounted() {
    if(!this.editFlag){
        this.getSecurityproxyById();
        $(".el-upload--picture-card").css("display", "none");
    }
  },

  methods: {
    //根据ID获取表单信息
    getSecurityproxyById() {
      let _this = this;
      _this.loading=true;
      _this.$api.get(
        _this.$apis.icpmanagement + "/taxcontrol/securityproxy/getSecurityproxyById/" + _this.updatePageData.id, {},
        function (res) {
          _this.loading=false;
          if (res.success) {
            _this.editForm = res.data;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //表单提交
    onSubmit(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
          let editParams = _this.editForm;
           if (editParams != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(editParams))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }
          _this.loading=true;
          if(!this.editFlag){
              //修改
              _this.$api.post(
                _this.$apis.icpmanagement + "/taxcontrol/securityproxy/updateSecurityproxy", editParams,
                function (res) {
                _this.loading=false;
                if (res.success) {
                    _this.$message({
                    message: "修改成功",
                    type: "success",
                    });
                    //关闭抽屉
                    _this.$emit("back");
                } else {
                    _this.$message({
                    message: "修改失败," + res.errorMsg,
                    type: "error",
                    });
                }
                }
              );
          }else{
            if (editParams != null) {
              if (validate.checkForbiddenWordForm(JSON.stringify(editParams))) {
                _this.$message({
                  showClose: true,
                  message: "不允许有特殊字符",
                  type: "error",
                });
                return;
              }
            }
              _this.$api.post(
                _this.$apis.icpmanagement + "/taxcontrol/securityproxy/saveSecurityproxy", editParams,
                function (res) {
                _this.loading=false;
                if (res.success) {
                    _this.$message({
                    message: "保存成功",
                    type: "success",
                    });
                    //关闭抽屉
                    _this.$emit("back");
                } else {
                    _this.$message({
                    message: "保存失败," + res.errorMsg,
                    type: "error",
                    });
                }
                }
              );
          }
        }
      });
    },

    //关闭
    close(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      //关闭抽屉
      this.$emit("close");
    },
  },
};
</script>

<style lang="less">
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
</style>