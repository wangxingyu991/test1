<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title"><span v-show="!editFlag">修改定时任务</span><span v-show="editFlag">新增定时任务</span></div>
    </div>
    <div class="rh-drawer-body">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="140px" label-position="right" v-loading="loading">
        <el-row>
          <el-col :span="11">
            <el-form-item label="任务名称" prop="jobName">
              <el-input v-model="editForm.jobName" placeholder="任务名称" maxlength="150" :readonly="!editFlag"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="任务组名称" prop="jobGroup">
              <el-input v-model="editForm.jobGroup" placeholder="任务组名称" maxlength="150" :readonly="!editFlag"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="任务表达式" prop="cronExpression">
              <el-input v-model="editForm.cronExpression" placeholder="任务表达式" maxlength="150"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="任务全路径" prop="jobClassName">
              <el-input v-model="editForm.jobClassName" placeholder="任务全路径" maxlength="100" :readonly="!editFlag"></el-input>
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
    var checkSort = (rule, value, callback) => {
        if(value!=""){
					value=value.replace(/(^\s*)|(\s*$)/g, ""); //去掉前后空白
		      var arr=value.split(/\s+/); //用空白分割
		      
		      if(arr.length!=6 && arr.length!=7){
		          callback(new Error("表达式由5个或者6个空格隔开"));
		          //callback(new Error("表达式必须是 由5个或者6个空格隔开，如 0 0 12 * * ?"));
		      }else{
				      // 为了清晰起见，我将规则拆分来写
		          var reg1=/^([0-5]?\d)([\/\-][0-5]?\d)?$/;      //形如23 23/34 45-59
		          var reg2=/^[0-5]?\d(,[0-5]?\d)*$/ ;         //形如 12,43,56  
		          var reg3=/^\*$/;                            //匹配 *
		          
		          if(!(reg1.test(arr[0])||reg2.test(arr[0])||reg3.test(arr[0]))){
                  callback(new Error("第1位是秒"));
                  //callback(new Error("第1位是秒，允许的值（0-59 ,-*/）如 （2,47,23-45,5/6）"));
		          }
		          if(!(reg1.test(arr[1])||reg2.test(arr[1])||reg3.test(arr[1]))){
		              callback(new Error("第2位是分"));
		              //callback(new Error("第2位是分，允许的值（0-59 ,-*/）如 （2,47,23-45,5/6）"));
		          }
		          //reg1=/^(([0-1]?\d)|(2[0-3]))$/;   //ok的 0-23 注意最外层有一个括号
		          reg1=/^(([0-1]?\d)|(2[0-3]))([\/\-](([0-1]?\d)|(2[0-3])))?$/;  //形如23 12/18 7-19
		          reg2=/^(([0-1]?\d)|(2[0-3]))(,(([0-1]?\d)|(2[0-3])))*$/;       //形如12,15,20
		          if(!(reg1.test(arr[2])||reg2.test(arr[2])||reg3.test(arr[2]))){
		              callback(new Error("第3位是小时"));
		              //callback(new Error("第3位是小时，允许的值（0-23 ,-*/）如 （3,8,21-23,4/7,*）"));
		          }
		          //reg1=/^(([1-9])|([12]\d)|(3[01]))$/;  ok 1-31
		          reg1=/^(([1-9])|([12]\d)|(3[01]))([\/\-](([1-9])|([12]\d)|(3[01])))?$/;  //形如1 12/18 7-26
		          reg2=/^(([1-9])|([12]\d)|(3[01]))(,(([1-9])|([12]\d)|(3[01])))*$/;       //形如23,25,30
		          reg3=/^(\*|\?)$/;                                                        //形如 *  ?
		          var reg4=/^(((([1-9])|([12]\d)|(3[01]))[WC])|(LW?))$/;                   //形如12W 13C L LW
		          if(!(reg1.test(arr[3])||reg2.test(arr[3])||reg3.test(arr[3])||reg4.test(arr[3]))){
		              callback(new Error("第4位是日"));
		              //callback(new Error("第4位是日，允许的值（1-31 ,-*/？L W C）如 （1,20,4-8,3/5,2C,8W,L,LW等）"));
		          } 
		          //reg1=/^(([1-9])|(1[0-2]))$/;  ok 1-12
		          reg1=/^(([1-9])|(1[0-2]))([\/\-](([1-9])|(1[0-2])))?$/;                //形如1 3/6 7-10
		          reg2=/^(([1-9])|(1[0-2]))(,(([1-9])|(1[0-2])))*$/ ;                    //形如3,5,8
		          reg3=/^\*$/;　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　//形如 * 
		          reg4=/^((JAN)|(FEB)|(MAR)|(APR)|(MAY)|(JUN)|(JUL)|(AUG)|(SEPT)|(OCT)|(NOV)|(DEC))(\-((JAN)|(FEB)|(MAR)|(APR)|(MAY)|(JUN)|(JUL)|(AUG)|(SEPT)|(OCT)|(NOV)|(DEC)))?$/i; //12个月份
		          var reg5=/^((JAN)|(FEB)|(MAR)|(APR)|(MAY)|(JUN)|(JUL)|(AUG)|(SEPT)|(OCT)|(NOV)|(DEC))(,((JAN)|(FEB)|(MAR)|(APR)|(MAY)|(JUN)|(JUL)|(AUG)|(SEPT)|(OCT)|(NOV)|(DEC)))*$/i; //12个月份
		          
		          if(!(reg1.test(arr[4])||reg2.test(arr[4])||reg3.test(arr[4])||reg4.test(arr[4])||reg5.test(arr[4]))){
		              callback(new Error("第5位是月"));
		              //callback(new Error("第5位是月，允许的值（1-12 ,-*/ JAN-DEC）如 （1,10,2-6,JAN,MAY-JUN等）"));
		          }
		          reg1=/^[1-7]([\/\-][1-7])?$/;               //形如1 3/6 2-5
		          reg2=/^[1-7](,[1-7])*$/;                    //形如3,5,6
		          reg3=/^(\*|\?|L)$/;                         //形如 * ? L
		          reg4=/^((MON)|(TUES)|(WED)|(THUR)|(FRI)|(SAT)|(SUN))([\-]((MON)|(TUES)|(WED)|(THUR)|(FRI)|(SAT)|(SUN)))?$/i; //形如 7个星期 -连接
		          reg5=/^((MON)|(TUES)|(WED)|(THUR)|(FRI)|(SAT)|(SUN))(,((MON)|(TUES)|(WED)|(THUR)|(FRI)|(SAT)|(SUN)))*$/i;    //形如 7个星期 ，枚举
		          var reg6=/^[1-7][LC]$/;                     //形如 3L 4C
		          var reg7=/^[1-7]?#[1-5]$/;                  //形如 #4 6#3
		      
		          if(!(reg1.test(arr[5])||reg2.test(arr[5])||reg3.test(arr[5])||reg4.test(arr[5])||reg5.test(arr[5])||reg6.test(arr[5])||reg7.test(arr[5]))){
                  callback(new Error("第6位是星期"));
                  //callback(new Error("第6位是星期，允许的值（1-7 ,-*/? L C # SUN-SAT）如 （1,2,1-5,?,3C,4L,4#2,SUN等）"));
		          } 
		          if(arr.length==7){
		              //reg1=/^((19[7-9]\d)|(20\d\d))$/; //  1979-2099
		              reg1=/^((19[7-9]\d)|(20\d\d))([\/\-]((19[7-9]\d)|(20\d\d)))?$/; 
		              reg2=/^((19[7-9]\d)|(20\d\d))(,((19[7-9]\d)|(20\d\d)))*$/; 
		              reg3=/^(\*|(empty))$/i;
		              if(!(reg1.test(arr[6])||reg2.test(arr[6])||reg3.test(arr[6]))){
		                  callback(new Error("第7位是年(可选字段)"));
		                  //callback(new Error("第7位是年(可选字段)，允许的值（empty,1979-2099 ,-*/）如 (2013,empty,2012,2013 2012-2013等)"));
		              }
		          }
		          callback();
		      }
        }
    };
    let editFlag = !this.updatePageData.jobName
    return {
      loading: false,
      editFlag,
      editForm: {
        jobName: "",
        jobGroup: "",
        jobClassName: "",
        cronExpression: "",
      },
      //校验规则
      rules: {
        jobName: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
          //{ max: 100, message: "最多100个字符", trigger: "blur" },
        ],
        jobGroup: [
          { required: true, message: "请输入任务组名称", trigger: "blur" },
          //{ max: 100, message: "最多100个字符", trigger: "blur" },
        ],
        jobClassName: [
          { required: true, message: "请输入任务全路径", trigger: "blur" },
          //{ max: 3000, message: "最多3000个字符", trigger: "blur" },
        ],
        cronExpression: [
          { required: true, message: "请输入任务表达式", trigger: "blur" },
          //{ validator: checkSort, trigger: "blur" },
        ],
        // sort: [
        //   { required: true, message: "请输入序号", trigger: "blur" },
        //   { validator: checkSort, trigger: "blur" },
        // ],
      },
    };
  },

  created() {},

  mounted() {
    if(!this.editFlag){
        //this.getEmailTemplateInfoById();
        this.editForm = this.updatePageData;
        $(".el-upload--picture-card").css("display", "none");
    }
  },

  methods: {
    //根据ID获取表单信息
    // getEmailTemplateInfoById() {
    //   let _this = this;
    //   _this.$api.get(
    //     _this.$apis.usptask +
    //       "/basic/emailTemplate/getEmailTemplateInfoById/" + _this.updatePageData.id, {},
    //     function (res) {
    //       if (res.success) {
    //         _this.editForm = res.data;
    //       } else {
    //         _this.$message({
    //            showClose:true,
    //           message: res.errorMsg,
    //           type: "error",
    //         });
    //       }
    //     }
    //   );
    // },

    //表单提交
    onSubmit(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
          let editParams = _this.editForm;
          this.$api.get(
            _this.$apis.usptask + "/rest/job/cron?cron="+editParams.cronExpression, {},
            function (res) {
              if (res.success) {
                    if(!_this.editFlag){
                    //打开loading
                    _this.loading=true;
                    //修改
                    _this.$api.post(
                      _this.$apis.usptask + "/rest/job/reschedulejson/", editParams,
                      function (res) {
                          //关闭loading
                          _this.loading=false;
                          if (res.success) {
                              _this.$message({
                              showClose:true,
                              message: "修改成功",
                              type: "success",
                              });
                              //关闭抽屉
                              _this.$emit("back");
                          } else {
                              _this.$message({
                              showClose:true,
                              message: "修改失败," + res.errorMsg,
                              type: "error",
                              });
                          }
                      }
                    );
                }else{
                    //打开loading
                    _this.loading=true;
                    _this.$api.post(
                      _this.$apis.usptask + "/rest/job/addjson/", editParams,
                      //_this.$apis.icpmanagement + '/taxcontrol/terminal/add?jobName='+123+'&jobClassName='+456,{},
                      //_this.$apis.usptask + "/rest/job/add?jobName=1&jobClassName=1&jobClassName=1&cronExpression=22", {},
                      //_this.$apis.usptask + "/rest/job/query", editParams,
                      function (res) {
                          //关闭loading
                          _this.loading=false;
                          if (res.success) {
                              _this.$message({
                              showClose:true,
                              message: "保存成功",
                              type: "success",
                              });
                              //关闭抽屉
                              _this.$emit("back");
                          } else {
                              _this.$message({
                              showClose:true,
                              message: "保存失败," + res.errorMsg,
                              type: "error",
                              });
                          }
                      }
                    );
                }
              } else {
                _this.$message({
                  showClose:true,
                  message: res.errorMsg,
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
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      //关闭抽屉
      this.$emit("back");
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