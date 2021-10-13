<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-body">
      <el-card class="box-card">
        <div slot="header">
          <span>基本信息</span>
        </div>
        <el-form :model="userInfo"  ref="userInfo" label-width="100px" label-position="right">
          <el-row style="margin-left:100px">
            <el-col :span="24">
              <el-form-item label="用户账号：" prop="userAccount">
                {{userInfo.userAccount}}
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="注册时间：" prop="createTime">
                  {{userInfo.createTime}}
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="用户名称：" prop="userName">
                  {{userInfo.userName}}
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="用户密码：" prop="password">
                  **************** 
                  <a style="margin-left:150px; color: blue" @click="updatePwd()">修改密码</a>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="用户电话：" prop="phone">
                  {{userInfo.phone}}
              </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="用户邮箱：" prop="email">
                    {{userInfo.email}}
                </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-dialog title="修改密码" :visible.sync="showUpdatePwd" width="40%" append-to-body :wrapperClosable = false :with-header=true>
        <udpatePwdPage v-if="showUpdatePwd" :udpateData="udpateData"></udpatePwdPage>
      </el-dialog>
      </div>
  </div>
</template>

<script>
import udpatePwdPage from "./updatepwd.vue";
export default {
  components: { udpatePwdPage},
  data() {
    return {
      loading: false,
      showUpdatePwd:false,
      udpateData:{},
      userInfo: {},
      //校验规则
      rules: {
      }
    };
  },

  created() {
    this.initPersonnal();
  },

  mounted() {
  },

  methods: {
    //关闭
    initPersonnal(){
        var _this = this;
        _this.$api.get(this.$apis.home + "/rest/home/personnal/getpersonnalinfo", {}, function (res) {
          if (res.success) {
            console.log(res.data);
            _this.userInfo = res.data;
          } else {
          }
        });
    },
    updatePwd(){
      this.udpateData = this.userInfo;
      this.showUpdatePwd = true;
    }
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