
<template>
  <div class="drawer-wrap">
      <div class="rh-drawer-head">
          <div class="drawer-title">查看纳税人证书</div>
      </div>
      <el-row style="text-align:center">
            <div class="tabs-wrap" >
                  <div>
                      <el-form :model="add_Form" :rules="rules" ref="add_Form" label-width="100px" label-position="right">
                          <div class="rh-dialog-body"> 
                          
                              <el-row>
                                  <el-col :span ="10" :offset="1">
                                      <el-form-item label="纳税人名称" prop="nsrmc">
                                          <el-input v-model="add_Form.nsrmc" placeholder="纳税人名称" maxlength="120" :readonly="true"></el-input>    
                                      </el-form-item> 
                                  </el-col >
                                  <el-col :span ="10" :offset="1">
                                      <el-form-item label="纳税人识别号" prop="nsrsbh">
                                          <el-input v-model="add_Form.nsrsbh" placeholder="纳税人识别号" onkeyup="value=value.replace(/[^A-Z0-9]/g,'')" maxlength="20" :readonly="true"></el-input>   
                                      </el-form-item>
                                  </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span ="10" :offset="1">
                                 <el-form-item label="证书类型" prop="zslx">
                                    <el-input v-model="add_Form.zslx" placeholder=""  maxlength="20" :readonly="true"></el-input>   
                                  </el-form-item>
                               </el-col> 
                        
                                <el-col :span ="10" :offset="1" >
                                 <el-form-item label="私钥口令" prop="sykl">
                                      <el-input v-model="add_Form.sykl"  placeholder="私钥口令" show-password maxlength="12"></el-input>
                                  </el-form-item>
                               </el-col> 
                              </el-row>
                              <el-row>
                               <el-col :span ="10" :offset="1">
                                    <el-form-item label="有效期起" prop="yxqQ" >
                                         <el-input v-model="add_Form.yxqQ" placeholder=""  maxlength="20" :readonly="true"></el-input>   
                                   </el-form-item>

                                </el-col>
                               <el-col :span ="10" :offset="1">
                                    <el-form-item label="有效期止" prop="yxqZ">
                                      <el-input v-model="add_Form.yxqZ" placeholder=""  maxlength="20" :readonly="true"></el-input>   
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                               <el-col :span ="10" :offset="1">
                                   <el-form-item label="操作人" prop="czrDm"> 
                                        <el-input v-model="add_Form.czrDm" placeholder="" maxlength="120" :readonly="true"></el-input>    
                                   </el-form-item>
                                </el-col>
                                <el-col :span ="10" :offset="1">
                                    <el-form-item label="有效标志" prop="yxbz">
                                      <el-input v-model="add_Form.yxbz" placeholder=""  maxlength="20" :readonly="true"></el-input>   
                                    </el-form-item>
                                </el-col>
                            </el-row>
                           <!-- <el-row>
                               <el-col :span ="21" :offset="1">
                                   <el-form-item label="私钥文件路径" prop=""> 
                                        <el-input v-model="add_Form.sywjLj" placeholder="" maxlength="120" :readonly="true"></el-input>    
                                   </el-form-item>
                                </el-col> 
                            </el-row> -->
                       </div>

                    </el-form>
                  </div>
            </div>
      </el-row>
        <div class="rh-dialog-footer" solt="footer">
            
            <el-button @click="close('add_Form')">关闭</el-button>
        </div>
  </div>
  
</template>
  
<script>
import { formateDate } from "@/utils/tools.js";
import validate from "@/utils/validate.js";
 export default {
    props: ["updatePageData"],
    data(){
     
        let rules = {
            nsrmc:[{ required: true, message: '请填写纳税人税号', trigger: 'blur' },],
            nsrsbh:[{required: true, message:'请填写纳税人税号',trigger:'blur'},],
            zslx:[{required: true, message:'请选择证书类型',trigger:'blur'},],
            yxqQ:[{required: true, message:'请选择有效期起',trigger:'blur'},],
            yxqZ:[{required: true, message:'请选择有效期止',trigger:'blur'},],
            yxbz:[{required: true, message:'请选择有效标识',trigger:'blur'},],
            sykl:[{required: true, message:'请输入私钥口令',trigger:'blur'},],
          
        }
        return{
           
           isDialogShow: false,
           isDialogbankAccount:false,
           isDialogZzjgShow:false,
            add_Form: {
                 id:"",
                nsrmc:"",
                nsrsbh:"",
                zslx:"",
                sykl:"",
                yxqQ: "",
                yxqZ:"",
                sywjLj:"",
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
   
    //页面初始化根据ID加载要编辑的数据
     this.getcertManagementById();
  },
    methods: {
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
      handlechange(file){
       
	      
      },
      //点击文件列表中的文件触发
      handlePreview(file) {
        console.log(file);
      },
      importExcel(param){ 
       this.nameExcel=param.file;
    },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
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
    getcertManagementById(){
      let _this = this;
     let id=this.updatePageData.id;
     console.log("ID="+id);
      _this.$api.get(
        _this.$apis.icpmanagement +"/taxpayer/certmanagement/getcertManagementById/" +id, {},
        function (res) {
          if (res.success) {
          let list=res.data;
          if(list.zslx=="1"){
             list.zslx="数字证书(pfx)";
           }
           else if(list.zslx=="2"){
            list.zslx="其他证书(jks)";
           }
           else if(list.zslx=="3"){
            list.zslx="其他证书(P12)";
           }
           if(list.yxbz=='Y'){
             list.yxbz="有效"
           }else{
             list.yxbz="无效"
           }
          _this.add_Form=list; 
        
          } else {
            _this.$message({
              showClose:true,
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
        
    },
            //表单提交 
    add_submit(formName) {
      let _this = this;
      this.$refs.uploadExcel.submit();
      let file=this.nameExcel;
      // console.log(file.name);
    
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
           if(file==undefined){
                 _this.$message({
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
              paraForm.append("id",para.id);
              paraForm.append("nsrmc",para.nsrmc);
              paraForm.append("nsrsbh",para.nsrsbh);
              paraForm.append("zslx",para.zslx);
              paraForm.append("sykl",para.sykl);
              paraForm.append("yxqQ",yxqQ);
              paraForm.append("yxqZ",yxqZ);
              paraForm.append("sywjLj",para.sywjLj);
              paraForm.append("yxbz",para.yxbz);
              console.log("paraForm="+paraForm);
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
                _this.$apis.icpmanagement + "/taxpayer/certmanagement/editCertInfo", paraForm,
                function (res) {
                  console.log("res="+res);
                if (res.success) {
                   
                    _this.$message({
                      message: "修改成功",
                      type: "success",
                      });
                      //关闭抽屉
                      _this.loading.loadingList=false;
                        //清除文件列表
                      _this.$refs.uploadExcel.clearFiles();
                      _this.$emit("back");
                    
                } else {
                    _this.$message({
                    message: "修改失败," + res.errorMsg,
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