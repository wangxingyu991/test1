
<template>
  <div class="drawer-wrap">
      <div class="rh-drawer-head">
          <div class="drawer-title">新增纳税人证书</div>
      </div>
      <el-row style="text-align:center">
            <div class="tabs-wrap" >
                  <div>
                      <el-form :model="add_Form" :rules="rules" ref="add_Form" label-width="100px" label-position="right">
                          <div class="rh-dialog-body"> 
                          
                              <el-row>
                                  <el-col :span ="10" :offset="1">
                                      <el-form-item label="纳税人名称" prop="nsrmc">
                                          <el-input v-model="add_Form.nsrmc" placeholder="纳税人名称" maxlength="120" :disabled="true"></el-input>    
                                      </el-form-item> 
                                  </el-col >
                                  <el-col :span = "10" :offset="1">
                                      <el-form-item label="纳税人识别号" prop="nsrsbh" >
                                          <el-input v-model="add_Form.nsrsbh" placeholder="纳税人识别号" onkeyup="value=value.replace(/[^A-Z0-9]/g,'')" maxlength="20" :disabled="true"></el-input>   
                                      </el-form-item>
                                  </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span ="10" :offset="1">
                                 <el-form-item label="证书类型" prop="zslx">
                                      <el-select v-model="add_Form.zslx" placeholder="请选择证书类型">
                                            <el-option 
                                            v-for="item in zslxList" 
                                            :key="item.index" 
                                            :label="item.label"
                                            :value="item.zslx">
                                            </el-option>
                                        </el-select>
                                  </el-form-item>
                               </el-col> 
                        
                                <el-col :span ="10" :offset="1" >
                                 <el-form-item label="私钥口令" prop="sykl">
                                      <el-input v-model="add_Form.sykl"  placeholder="私钥口令" show-password maxlength="12" ></el-input>
                                  </el-form-item>
                               </el-col> 
                              </el-row>
                              <el-row>
                               <el-col :span ="10" :offset="1">
                                    <el-form-item label="有效期起" prop="yxqQ">
                                        <el-date-picker
                                        v-model="add_Form.yxqQ"
                                        type="date"
                                        placeholder="选择日期" :readonly="true">
                                        </el-date-picker>
                                   </el-form-item>
                                </el-col>
                               <el-col :span ="10" :offset="1">
                                    <el-form-item label="有效期止" prop="yxqZ" >
                                       <el-date-picker
                                        v-model="add_Form.yxqZ"
                                        type="date"
                                        placeholder="选择日期" :readonly="true">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                               <el-col :span ="10" :offset="1">
                                   <el-form-item label="颁发者" prop="bfz"> 
                                        <el-input v-model="add_Form.bfz" placeholder="颁发者" maxlength="120" :readonly="true"></el-input>    
                                   </el-form-item>
                                </el-col>
                                <el-col :span ="10" :offset="1">
                                    <el-form-item label="有效标志" prop="yxbz">
                                      <el-select v-model="add_Form.yxbz">
                                        <el-option label="有效" value="Y"></el-option>
                                        <el-option label="无效" value="N"></el-option>
                                      </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                               <fieldset class="fiedset"> 
                                    <legend>证书上传</legend> 
                                
                                    <div class="upload">
                                     <el-upload
                                        class="upload-demo"
                                        ref="uploadExcel" 
                                        action="/post"
                                        :http-request= "importExcel"
                                       :before-upload="beforeUpload"
                                        :on-change="handlechange"
                                        :on-remove="handleRemove"
                                        :before-remove="beforeRemove"
                                        accept=".pfx,.jks,.p12"
                                        multiple
                                        :limit="1"
                                        :on-exceed="handleExceed"
                                        :file-list="fileList">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                       
                                        </el-upload> 
                                    
                                    </div> 
                                   
                                </fieldset>
                            </el-row>
                           
                       </div>

                    </el-form>
                  </div>
            </div>
      </el-row>
        <div class="rh-dialog-footer" solt="footer">
            <el-button type="primary" @click="add_submit('add_Form')" :loading="loading.loadingList">保存</el-button>
            <el-button @click="close('add_Form')">关闭</el-button>
        </div>
  </div>
  
</template>
  
<script>
import { formateDate } from "@/utils/tools.js";
import {validator} from '@/utils/validate.js';
import validate from "@/utils/validate.js";

 export default {
    props: ["addPageData"],
    components:{
      formateDate,
    },
    data(){
     
        let rules = {
            nsrmc:[{ required: true, message: '请填写纳税人名称', trigger: 'blur' },
             { validator: this.$validate.checkForbiddenWord, trigger: "blur" },],
            nsrsbh:[{required: true, message:'请填写纳税人税号',trigger:'blur'},
            { validator: this.$validate.checkForbiddenWord, trigger: "blur" },],
            zslx:[{required: true, message:'请选择证书类型',trigger:'blur'},],
            // yxqQ:[{required: true, message:'请选择有效期起',trigger:'blur'},],
            // yxqZ:[{required: true, message:'请选择有效期止',trigger:'blur'},],
            yxbz:[{required: true, message:'请选择有效标识',trigger:'blur'},],
            sykl:[{required: true, message:'请输入私钥口令',trigger:'blur'},],
          
        }
        return{
           
           isDialogShow: false,
           isDialogbankAccount:false,
           isDialogZzjgShow:false,
            add_Form: {
                nsrmc:"",
                nsrsbh:"",
                zslx:"",
                sykl:"",
                yxqQ: "",
                yxqZ:"",
                bfz:"",
                yxbz:"",
                file:"",
               
            },
             loading:{
               loadingList:false,
               dzdkList:false,
             },
            rules: rules,
            searchWrap:false,
            kpzdList:[], 
            zslxList:[
              // {zslx:"0",label:"虚拟证书(cer)"},
              {zslx:"1",label:"数字证书(pfx)"},
              {zslx:"2",label:"其他证书(jks)"},
              {zslx:"3",label:"其他证书(P12)"}
            ],
            fplxList:[],
            fplxDmList:[],
            fileList:[],
        }
    },
     mounted() {
    this.init_nsrsbh();
    //页面初始化的时候动态获取发票类型
 //   this.init_Fplx();
 // this.getTreeRoot();
  },
    methods: {
      init_nsrsbh(){
      let _this=this;
      let zzjgDm=this.addPageData.zzjgDm;
       _this.$api.get(
            _this.$apis.icpmanagement +
              "/taxpayer/certmanagement/getNsrsbh/"+zzjgDm,{},
            function (res) {
              if (res.success) { 
                let listMap=res.data;
                _this.add_Form.nsrsbh=res.data.nsrsbh;
                _this.add_Form.nsrmc=res.data.nsrmc;
            
              }
              else{
                _this.$message({
                showClose:true,
                message:"请先维护纳税人信息！",
                type: "warning",
                });
               }
            }
          );
         
    },
    handleNodeClick(data) {
      let _this = this;
      // if(_this.$refs['add_Form'] != undefined){
      //   _this.$refs['add_Form'].resetFields();
      // }
      _this.add_Form.zzjgDm = data.organCode;
      _this.add_Form.zzjgMc = data.organName;
      _this.add_Form.nsrsbh = data.organCode;
      _this.LoadKpzdmc();
      _this.handleClosetree();
    },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
       beforeUpload(file){
      // //  let sykl=this.add_Form.sykl
      // //  if(sykl==""){
      // //      this.$message({
      // //           showClose:true,
      // //           message: "请输入证书口令！",
      // //           type: "warning",
      // //        });
      // //   }
      //   let isLimit = file.size / 1024 / 1< 1
      //   if (!isLimit) {
      //     this.$message.error('文件不能超过10kb');
      //   }
      //   return;
       },
      handlechange(file){
        let _this=this;
           this.add_Form.file=file.raw;
           let sykl=this.add_Form.sykl
           if(sykl==""){
             this.$message({
                showClose:true,
                message: "请输入证书口令！",
                type: "warning",
             });
             _this.fileList.splice(0);
             return ;
           }
           let filestr=this.add_Form.file;
           let paraForm = new FormData();
           paraForm.append("file", filestr);
           paraForm.append("sykl",sykl);
           if (paraForm != null) {
              if (validate.checkForbiddenWordForm(JSON.stringify(paraForm))) {
                _this.$message({
                  showClose: true,
                  message: "不允许有特殊字符",
                  type: "error",
                });
                return;
              }
            }
          _this.$api.post(
            _this.$apis.icpmanagement +
              "/taxpayer/certmanagement/getCertTime",paraForm,
            function (res) {
              if (res.data.msg=="0000") { 
                 _this.add_Form.yxqQ=res.data.beforeTime;
                 _this.add_Form.yxqZ=res.data.afterTime;
                 _this.add_Form.bfz=res.data.bfz;
              }
              else{
                _this.$message({
                showClose:true,
                message: "请输入正确得证书口令,再重新上传！",
                type: "warning",
                });
                 _this.fileList.splice(0);
                 _this.add_Form.file="";
               }
            }
          );
      },
      //点击文件列表中的文件触发
      handlePreview(file) {
        console.log(file);
      },
      importExcel(param){ 
       this.nameExcel=param.file;
    },
      handleExceed(files, fileList) {
         this.$message({
                   showClose:true,
                    message: "只能选择一个文件!!" ,
                    type: "warning",
                    });
      },
      beforeRemove(file, fileList) {
        let is=this.$confirm(`确定移除 ${ file.name }？` ,'提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.add_Form.file="";
      })
        return is;
      },
    chooseJg(){
       this.isDialogZzjgShow=true;
       this.getTreeRoot();
    },
    handleClosetree(){
      this.isDialogZzjgShow=false;
    },
    
    handleClose(){
         this.$refs.dzdhForm.resetFields();
         this.isDialogShow= false;
         this.isDialogbankAccount=false;
    },
       //关闭
        close(formName) {
        if (this.$refs[formName] !== undefined) {
            this.$refs[formName].resetFields();
        }
       
        //关闭抽屉
        this.$emit("back");
        },
         //表单提交 
    add_submit(formName) {
      let _this = this;
      this.$refs.uploadExcel.submit();
      let file=this.add_Form.file;
      // console.log(file.name);
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
           if(file==""){
                 _this.$message({
                   showClose:true,
                    message: "请上传文件!!" ,
                    type: "warning",
                    });
           }else{ 
              let editParams = _this.add_Form;
              let para = editParams;
              let yxqQ = formateDate(para.yxqQ);
              let yxqZ=formateDate(para.yxqZ);
              _this.loading.loadingList=true;
              let paraForm = new FormData();
              paraForm.append("file", file);
              paraForm.append("nsrmc",para.nsrmc);
              paraForm.append("nsrsbh",para.nsrsbh);
              paraForm.append("zslx",para.zslx);
              paraForm.append("sykl",para.sykl);
              paraForm.append("yxqQ",yxqQ);
              paraForm.append("yxqZ",yxqZ);
              paraForm.append("bfz",para.bfz);
              paraForm.append("yxbz",para.yxbz);
              console.log("paraForm="+paraForm)
              if (paraForm != null) {
                if (validate.checkForbiddenWordForm(JSON.stringify(paraForm))) {
                  _this.$message({
                    showClose: true,
                    message: "不允许有特殊字符",
                    type: "error",
                  });
                  return;
                }
              }
              _this.$api.post(
                _this.$apis.icpmanagement + "/taxpayer/certmanagement/saveCertInfo", paraForm,
                function (res) {
                  console.log("res="+res);
                if (res.success) {
                    let list=res.data
                    let msg=list.length
                    console.log("msg="+msg);
                    if(msg>0){
                          _this.$message({
                          showClose:true,
                          message: "纳税人证书信息已经存在！",
                          type: "warning",
                          });
                        _this.loading.loadingList=false;
                    }else{
                      _this.$message({
                      showClose:true,
                      message: "保存成功",
                      type: "success",
                      });
                      //关闭抽屉
                      _this.loading.loadingList=false;
                        //清除文件列表
                      _this.$refs.uploadExcel.clearFiles();
                      _this.$emit("back");
                    }
                } else {
                    _this.$message({
                    showClose:true,
                    message: "保存失败," + res.errorMsg,
                    type: "error",
                    });
                    _this.loading.loadingList=false;
                }
                }
             
              );
           }
           
          }
       });
    }

       
    }
}
</script>

<style scoped>
    .upload{
      text-align: left;  
    }
    .upload-demo{
         text-align: left; 
         margin-left:15px;
    }
 .fiedset{
     width:640px;
     height: 100px;
     border: 1px solid rgb(230, 225, 225);
     margin:0 auto;
 }
legend {
    color:#606266;
    padding:5px 10px;
    text-align: left;
} 
    .drawer-title{
        width:100%;
        height:20px;
        font-size: 18px;
        margin-left:-10px; 
    }

</style>