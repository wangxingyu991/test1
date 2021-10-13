<style lang="less">
    .el-item-wrap{
        padding:0px 20px;
        .item-icon-text{
          display: flex;
          .left{
              flex-shrink: 0;
              width: 50px;
              line-height: 50px;
              text-align: center;
            .icon{
              font-size: 24px;
            }
          }
          .right{
            .title-name{
              font-size: 14px;
              font-weight: 700;
            }
            .detail-content{
              font-size: 12px;
            }
          }
        }
    }
    .collapse-wrap{
      padding:0px 15px;
        .name{
          cursor: pointer;
        }
    }
    .bar-wrap{
      .bar-item{
        width: 25%;
        float: left;
        input{
          visibility: hidden;
        }
        .row-bar{
          margin:0px 10px 10px 0px;
          &.selected{
            background: #5e6c79;
            color:#FFF;
          }
        }
        &:nth-child(4n){
          .row-bar{
            margin-right:0px;
          }
        };
      }

    }
    .bt-collapse{
      padding: 15px;
      width: 300px;
      height: 40px;
      display: flex;
      justify-content:space-between;
      background: #5e7ce0;
      color:rgb(255, 255, 255);
      float:right;
      cursor: pointer;
      .left{
        flex-shrink: 0;
      }
      .right{
        flex-shrink: 0;
        line-height: 50px;
        text-align: center;
        width:60px;
        i{
            color: #FFF;
            font-size: 35px;
            line-height: 45px;
        }
      }
    }
</style>

<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text"> 新建工单 </span>
          <!-- <span class="rh-helpTip-icon">
            <el-tooltip
              class="item"
              content="温馨提示：XXXXXXXX售前咨询请点击这里联系服务团队"
            >
              <i class="el-icon-info"></i>
            </el-tooltip>
          </span> -->
        </div>
        <!-- <div class="operate-btns">
          <el-button>帮助</el-button>
        </div> -->
      </div>
    </div>
    <div class="steps" data-xjgd>
      <el-steps :active="active" finish-status="success"  style="width:50%">
        <el-step title="选择问题所属大类"  ></el-step>
        <el-step title="选择问题类型"  ></el-step>
        <el-step title="新建工单" style="width:140px;"></el-step>
      </el-steps>
    </div>
    <div v-loading = "loading" class="rh-page-content">
      <div class="step" v-if="active == 0">
          <div class="page-title">产品类</div>
          <div class="space20"></div>
          <div class="bar-wrap clearfix">
            <div class="bar-item " v-for="(item,index) in arryMainClassProduct" :key ="index">
                <label class="row-bar" name="" :class="{'selected':radioVal == index}">
                      {{item.mainClassName}}
                      <input type="radio" :value="index" v-model="radioVal" @change="getRadio(1)"  name="p_type">
                </label>
            </div>
          </div>
          <div class="space20"></div>
          <div class="page-title">业务类</div>
          <div class="space20"></div>
          <div class="bar-wrap clearfix">
            <div class="bar-item " v-for="(item,index) in arryMainClassInfo" :key ="index">
                <label class="row-bar" name="" :class="{'selected':radioVal1 == index}">
                      {{item.mainClassName}}
                      <input type="radio" :value="index" v-model="radioVal1" @change="getRadio(2)"  name="p_type">
                </label>
            </div>
          </div>
          <div class="space20"></div>
          <div class="step-bt-group">
            <el-button type="primary" @click="nextPage(1,1)">下一步</el-button>
          </div>
      </div>
      <div class="step" v-if="active ==1">
          <div class="space20"></div>
          <div class="page-title">选择问题类型</div>
          <div class="space20"></div>
          <div class="collapse-wrap">
              <el-collapse v-model = "activeNames" @change="handleChange" accordion>
                  <el-collapse-item  v-for="(item,index) in arrySmallClass" :key = "index" :title="item.subClassName" :name="''+index">
                    <div>
                      为您推荐了<span class="colorGreen">{{arrySmallClass[index].workOrderHots.length}}条</span>热门案例
                    </div>
                    <div>
                        <el-row>
                          <el-col :span="8" v-for="(item1,index1) in item.workOrderHots" :key = "index1">
                            <span class="name colorBlue" @click="onOpen(item1)">
                              {{index1+1}}.{{item1.problemName}}
                            </span>
                          </el-col>
                        </el-row>
                    </div>
                    <div class="space14"></div>
                    <!-- <div class="bar-wrap clearfix">
                      <div class="bar-item" v-for="(item1,index1) in item.workOrderHots" :key = "index1">
                        <div>热点问题：<a style="color:#0000FF" v-text="item1.problemName" @click="onOpen(item1)"></a></div>
                      </div>
                    </div> -->
                    <div class="bt-collapse" @click="nextPage(2,index)">
                      <div class="left">
                        <div class="text">新建工单</div>
                        <div class="text">专业人员为您解答，请您耐心等待</div>
                      </div>
                      <div class="right">
                          <i class="el-icon-folder-add"></i>
                      </div>
                    </div>
                  </el-collapse-item>

              </el-collapse>
          </div>
           <div class="space20"></div>
          <div class="step-bt-group">
            <el-button type="primary" @click="active=0">上一步</el-button>
            <!-- <el-button type="primary" @click="nextPage(2)">下一步</el-button> -->
          </div>
      </div>
      <div class="step" v-if="active ==2">
        <!-- <div class="rh-page-hint">
          <div class="page-hint-content">
            <span class="page-hint-icon">
              <i class="el-icon-info"></i>
            </span>
            <span class="page-hint-text">
              温馨提示：XXXXXXXX售前咨询请点击这里联系服务团队
            </span>
          </div>
          <div class="operate-bts">
            <div class="bt-close" @click="HintShow = false">
              <i class="el-icon-close"></i>
            </div>
          </div>
         </div> -->
         <div class="space20"></div>

         <div class="crad" align="center">
           <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="width:50% ; text-align: left;">
             <el-form-item label="工单名称" prop="workOrderName">
               <span style="color:red">工单名称请填写您所遇到问题大致描述！</span>
               <el-input v-model="form.workOrderName"></el-input>
             </el-form-item>
            <el-form-item label="公司名称" prop="enterpriseName">
               <el-input v-model="form.enterpriseName"></el-input>
             </el-form-item>
             <el-form-item label="公司税号" prop="enterpriseNum">
               <el-input v-model="form.enterpriseNum"></el-input>
             </el-form-item>
             <el-form-item label="手机号" prop="applicantPhone">
               <el-input v-model="form.applicantPhone"></el-input>
             </el-form-item>
             <el-form-item label="邮箱" prop="applicantEmail">
               <el-input v-model="form.applicantEmail"></el-input>
             </el-form-item>
             <el-form-item label="问题描述" prop="workOrderDesc">
               <span style="color:red">提交工单信息可以上传图片内容以用来更加全面的描述问题！</span>
               <el-input type="textarea" v-model="form.workOrderDesc"></el-input>
               <span style="color:red">上传图片大小不能超过 1MB，名字不能包含特殊字符！</span>
               <el-upload action="1" list-type="picture-card" ref="upload" :limit="1" accept="image/jpeg,image/gif,image/png" :multiple="false" :on-change="handleFileUpload" :file-list="this.fileList"
                 :auto-upload="false">
                 <i slot="default" class="el-icon-plus"></i>
                 <div slot="file" slot-scope="{file}">
                   <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                   <span class="el-upload-list__item-actions">
                     <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                       <i class="el-icon-zoom-in"></i>
                     </span>
                     <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                       <i class="el-icon-delete"></i>
                     </span>
                   </span>
                 </div>
               </el-upload>
             </el-form-item>
           </el-form>
         </div>

         <div class="step-bt-group">
           <el-button type="primary" @click="active=1">上一步</el-button>
           <el-button type="primary" @click="nextPage(3,1)">提交工单</el-button>
         </div>
      </div>
      <div class="step" v-if="active==3">
          提交成功，请在我的工单界面查看工单处理详情
      </div>
    </div>
    <!-- 查看页面抽屉 -->
    <div class="drawer-container add" :key=1001>
      <el-dialog title="查看热点问题" :with-header="false" size="70%" :visible.sync="drawer" append-to-body>
        <HotPage v-if="drawer" @back="back"  :hotPageData="hotPageData"></HotPage>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import HotPage from "./WorkOrderHotPage.vue";
import validate from "@/utils/validate.js";
export default {
  components: {
    HotPage,
  },
      data(){
          return{
              active:0,
              activeNames:["0"],
              radioVal: '-1',
              radioVal1: '-1',
              arryMainClassProduct : [],
              arryMainClassInfo : [],
              arrySmallClass : [
                // {"subClassName" : "123"},{"subClassName" : "123"},{"subClassName" : "123"},{"subClassName" : "123"},{"subClassName" : "123"},
                ],
              workOrderUserTypeId : "",
              fileList : [],
              dialogVisible: false,
              drawer: false,
              loading: false,
              hotPageData: {},
              // arryRadio:[
              // {
              //   keyName:'弹性云服务器',
              //   data:'1',
              //   value:'',
              // },{
              //   keyName:'华为云WeLink',
              //   data:'2',
              //   value:'',
              // },{
              //   keyName:'云速建站',
              //   data:'3',
              //   value:'',
              // },{
              //   keyName:'对象存储服务器',
              //   data:'4',
              //   value:'',
              // },{
              //   keyName:'云容器引擎',
              //   data:'5',
              //   value:'',
              // },{
              //   keyName:'云数据库MySQL',
              //   data:'6',
              //   value:'',
              // },{
              //   keyName:'弹性公网IP',
              //   data:'7',
              //   value:'',
              // },{
              //   keyName:'内容发布网络',
              //   data:'8',
              //   value:'',
              // }]
              form: {
                description:'',
                workOrderName: '',
                enterpriseName: '',
                enterpriseNum: '',
                applicantPhone: '',
                applicantEmail: '',
                workOrderMainClassId: '',
                functionalModuleId: '',
                functionalModuleName: '',
                workOrderDesc: '',
                fileBase64: "",
                fileName: "",
                ruleForm:{
                  name:'',
                },
              },
              info:"",
              rules:{
                workOrderName: [
                  { required: true, message: "请输入工单名称", trigger: "blur" },
                  { max: 100, message: "最多100个字符", trigger: "blur" },
                ],
                enterpriseName: [
                  { required: true, message: "请输入企业名称", trigger: "blur" },
                  { max: 100, message: "最多100个字符", trigger: "blur" },
                ],
                enterpriseNum: [
                  { required: true, message: "请输入企业税号", trigger: "blur" },
                  { max: 100, message: "最多20个字符", trigger: "blur" },
                ],
                workOrderDesc: [
                  { required: true, message: "请输入问题描述", trigger: "blur" },
                ],
              },
          }
      },
      mounted() {
        // this.initTree();
        // this.init_Table();
        // this.loading = true;
        this.initMainClassProductRadio();
        this.initMainClassInfoRadio();
        // this.loading = false;
      },
      methods:{
          handleChange(){

          },
          a(n){
            this.active = n;
          },
          nextPage(num,index){
            let _this = this;
            if(num == 1){
              if(_this.radioVal == "-1" && _this.radioVal1 == "-1"){
                _this.$message({
                  message: "请选择一个问题类型",
                  type: "warning",
                });
              }else{
                _this.loading = true;
                _this.form.workOrderMainClassId = "";
                _this.arrySmallClass = [];
                let mainClassData = "";
                if(_this.radioVal == "-1"){
                  mainClassData = _this.arryMainClassInfo[_this.radioVal1];
                }else{
                  mainClassData = _this.arryMainClassProduct[_this.radioVal];
                }
                _this.form.workOrderMainClassId = mainClassData.mainClassId;
                let urlSmallCls = _this.$apis.workorder+"/rest/workorder/type/querySmallcls/"+mainClassData.mainClassId;
                _this.$api.get(
                  urlSmallCls,
                  "",
                  function (res) {
                    if(res.success){
                      // console.log(res.data);
                      _this.arrySmallClass = res.data;
                      // alert(res.data)
                      _this.loading = false;
                    }else{
                      _this.$message({
                        message: "系统维护中，暂时不能发起该大类工单",
                        type: "error",
                      });
                      _this.loading = false;
                      _this.active = 0;
                      return false;
                    }
                  }
                );
                _this.active = 1;
              }
            }
            if(num == 2){
              _this.form.functionalModuleId = "";
              _this.form.functionalModuleName = "";
              let smallClassData = _this.arrySmallClass[index];
              // alert(index);
              _this.form.functionalModuleId = smallClassData.subClassId;
              _this.form.functionalModuleName = smallClassData.subClassName;
              _this.active = 2;
            }
            if(num == 3){
              _this.$refs["form"].validate((valid) => {
                //校验完成后进行提交
                if (valid) {
                  if (_this.form != null) {
                    if (validate.checkForbiddenWordForm(JSON.stringify(_this.form))) {
                      _this.$message({
                        showClose: true,
                        message: "不允许有特殊字符",
                        type: "error",
                      });
                      return;
                    }
                  }
                  _this.loading = true;
                  let urlWorkOrderUser = _this.$apis.workorder+"/rest/workorder/user/workOrderAdd";
                  _this.$api.post(
                    urlWorkOrderUser,
                    _this.form,
                    function (res) {
                      if(res.success){
                        // console.log(res.data);
                        _this.active = 3;
                        // alert(res.data)
                        _this.loading = false;
                      }else{
                        _this.active = 2;
                        _this.$message({
                          message: "系统异常," + res.errorMsg,
                          type: "error",
                        });
                      }
                    }
                  );
                }
              });
              // alert(_this.form.functionalModuleId);
              // alert(_this.form.functionalModuleName);
              // alert(_this.form.workOrderMainClassId);
              // _this.active = 3;
            }
          },
          getRadio(num){
            let _this = this;
            if(num == 1){
              _this.radioVal1 = "-1";
            }else{
              _this.radioVal = "-1";
            }
            console.log(num);
          },
          initMainClassProductRadio(){
            let _this = this;
            _this.loading = true;
            let urlMainClass = _this.$apis.workorder+"/rest/workorder/type/queryMainClass/"+"100000000000";
            _this.$api.get(
              urlMainClass,
              "",
              function (res) {
                if(res.success){
                  // console.log(res.data);
                  _this.arryMainClassProduct = res.data;
                  // alert(res.data)
                  _this.loading = false;
                }else{
                  _this.$message({
                    message: "系统异常," + res.errorMsg,
                    type: "error",
                  });
                }
              }
            );
          },
          initMainClassInfoRadio(){
            let _this = this;
            let urlMainClass = _this.$apis.workorder+"/rest/workorder/type/queryMainClass/"+"100000000001";
            _this.$api.get(
              urlMainClass,
              "",
              function (res) {
                if(res.success){
                  _this.arryMainClassInfo = res.data ;
                }else{
                  _this.$message({
                    message: "系统异常," + res.errorMsg,
                    type: "error",
                  });
                }
              }
            );
          },
          //图片上传
          handleFileUpload(file, fileList) {
            const isLt2M = file.size / 1024 / 1024 < 1;
            if (!isLt2M) {
              this.$message.error("上传图片大小不能超过 1MB!");
              this.$refs.upload.clearFiles();
              return false;
            }
            let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
            if(file.name.split(".").length == 2){
              if(pattern.test(file.name.split(".")[0])){
                this.$message.error("图片文件名称不能包含特殊字符！");
                this.$refs.upload.clearFiles();
                return false;
              }
            }else{
              this.$message.error("图片文件名称不能包含特殊字符！");
              this.$refs.upload.clearFiles();
              return false;
            }


            this.form.fileName = file.name;
            if (fileList.length > 1) {
              fileList.splice(0, 1);
            }
            this.getBase64(file.raw)
              .then((res) => {
                this.form.fileBase64 = res;
                this.$refs["form"].validateField("fileName");
              })
              .catch((e) => {
                console.log(e);
              });
            if (fileList.length >= 1) {
              //添加一个图片后隐藏图片添加
              $(".el-upload--picture-card").css("display", "none");
            }
          },
          //图片转bas64
          getBase64(file) {
            return new Promise(function (resolve, reject) {
              let reader = new FileReader();
              let imgResult = "";
              reader.readAsDataURL(file);
              reader.onload = function () {
                imgResult = reader.result;
              };
              reader.onerror = function (error) {
                reject(error);
              };
              reader.onloadend = function () {
                resolve(imgResult);
              };
            });
          },
          //移除图片
          handleRemove(file) {
            this.fileList = [];
            this.dialogImageUrl = "";
            //移除图片后显示图片添加
            $(".el-upload--picture-card").css("display", "block");
          },
          handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
          },
          back(){
            let _this = this;
            _this.drawer = false;
          },
          onOpen(data){
            let _this = this;
            _this.drawer = true;
            _this.hotPageData = {
              workOrderHot : data,
            };
          }
      }
};
</script>

<style scoped>
    .steps{
        margin-bottom: 0px;
        height: 22px;
        margin-top: -10px;
        background: #ffffff;
        padding: 20px;
        padding-left: 15px;
        border-bottom:1px solid #dcdfe6
    }
    .step-bt-group{
      text-align: center;
    }
    .card{
      text-align: center;
    }
</style>
