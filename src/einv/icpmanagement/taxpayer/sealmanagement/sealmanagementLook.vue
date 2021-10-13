
<template>
  <div class="drawer-wrap">
      <div class="rh-drawer-head">
          <div class="drawer-title">查看纳税人印章</div>
      </div>
      <el-row style="text-align:center">
            <div class="tabs-wrap" >
                  <div>
                      <el-form :model="add_Form" :rules="rules" ref="add_Form" label-width="100px" label-position="right">
                          <div class="rh-dialog-body"> 
                          
                              <el-row>
                                  <el-col :span ="10" :offset="1">
                                      <el-form-item label="组织机构名称" prop="zzjgMc">
                                          <el-input v-model="add_Form.zzjgMc" placeholder="组织机构名称" maxlength="120" :readonly="true"></el-input>    
                                      </el-form-item> 
                                  </el-col >
                                  <el-col :span ="10" :offset="1">
                                      <el-form-item label="纳税人识别号" prop="nsrsbh">
                                          <el-input v-model="add_Form.nsrsbh" placeholder="纳税人识别号"  :readonly="true"></el-input>   
                                      </el-form-item>
                                  </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span ="10" :offset="1">
                                 <el-form-item label="印章类型" prop="yzlx">
                                      <el-select v-model="add_Form.yzlx" placeholder="请选择证书类型" :disabled="true">
                                            <el-option 
                                            v-for="item in yzlxList" 
                                            :key="item.index" 
                                            :label="item.label"
                                            :value="item.yzlx">
                                            </el-option>
                                        </el-select>
                                  </el-form-item>
                               </el-col> 
                               <el-col :span ="10" :offset="1">
                                      <el-form-item label="纳税人名称" prop="nsrmc">
                                          <el-input v-model="add_Form.nsrmc" placeholder="纳税人名称"  :readonly="true"></el-input>   
                                      </el-form-item>
                                </el-col>
                                
                               
                              </el-row>
                               <el-row>
                              <el-col :span ="10"  :offset="1">
                                <el-form-item label="绑定证书" prop="zsmc" >
                                            <el-input v-model="add_Form.zsmc" placeholder="绑定证书" :readonly="true"></el-input>   
                                </el-form-item>
                              </el-col> 
                              <el-col :span ="10" :offset="1" >
                                      <el-form-item label="印章经办人" prop="jbr">
                                          <el-input v-model="add_Form.jbr" placeholder="印章经办人" maxlength="120" :readonly="true" ></el-input>    
                                      </el-form-item> 
                               </el-col> 
                             </el-row>
                              <!-- <el-row>
                               <el-col :span ="10" :offset="1">
                                    <el-form-item label="有效期起" prop="yxrqQ">
                                        <el-date-picker
                                        v-model="add_Form.yxrqQ"
                                        type="date"
                                        placeholder="选择日期">
                                        </el-date-picker>
                                   </el-form-item>
                                </el-col>
                               <el-col :span ="10" :offset="1">
                                    <el-form-item label="有效期止" prop="yxrqZ">
                                       <el-date-picker
                                        v-model="add_Form.yxrqZ"
                                        type="date"
                                        placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row> -->
                            <el-row>
                                <el-col :span ="10" :offset="1">
                                   <el-form-item label="印章X偏移量" prop="imgXOffset"> 
                                        <el-input v-model="add_Form.imgXOffset" placeholder="印章图片X偏移量" maxlength="120" :readonly="true"></el-input>    
                                   </el-form-item>
                                </el-col> 
                                <el-col :span ="10" :offset="1">
                                     <el-form-item label="印章Y偏移量" prop="imgYOffset"> 
                                        <el-input v-model="add_Form.imgYOffset" placeholder="印章图片Y偏移量" maxlength="120" :readonly="true"></el-input>    
                                   </el-form-item>
                                </el-col>
                            </el-row>
                             <el-row>
                                <el-col :span ="10" :offset="1">
                                   <el-form-item label="印章宽度" prop="imgWidth"> 
                                        <el-input v-model="add_Form.imgWidth" placeholder="印章图片宽度" maxlength="120" :readonly="true"></el-input>    
                                   </el-form-item>
                                </el-col> 
                                <el-col :span ="10" :offset="1">
                                     <el-form-item label="印章高度" prop="imgHeight"> 
                                        <el-input v-model="add_Form.imgHeight" placeholder="印章图片高度" maxlength="120" :readonly="true"></el-input>    
                                   </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span ="10" :offset="1">
                                   <el-form-item label="操作原因" prop="czyy"> 
                                        <el-input type="textarea"  autosize v-model="add_Form.czyy" placeholder="操作原因" maxlength="200" :readonly="true"></el-input>    
                                   </el-form-item>
                                </el-col> 
                                <el-col :span ="10" :offset="1">
                                    <el-form-item label="有效标志" prop="yxbz">
                                         <el-input v-model="add_Form.yxbz" placeholder="有效标志" :readonly="true"></el-input>    
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                               <fieldset class="yzfiedset"> 
                                    <legend>印章上传</legend> 
                                    <div class="upload">
                                     <el-upload
                                        class="upload-demo"
                                        ref="uploadExcel" 
                                        action="/post"
                                        list-type="picture-card"
                                        :http-request= "importExcel"
                                        :on-change="handlechange"
                                        :before-remove="beforeRemove"
                                        accept=".png"
                                        multiple
                                        :auto-upload="false"
                                        :limit="2"
                                        :on-exceed="handleExceed"
                                        :file-list="fileList"
                                         >
                                        <!-- <div slot="tip" class="el-upload__tip">只能上传.png文件，且不超过50kb</div>
                                        <i slot="default" class="el-icon-plus"></i>
                                         -->
                                        <div slot="file" slot-scope="{file}">
                                        <img
                                            class="el-upload-list__item-thumbnail"
                                            :src="file.url" alt=""
                                        >
                                         <span class="el-upload-list__item-actions">
                            
                                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                                <i class="el-icon-zoom-in"></i>
                                              </span>
                                         </span>
                                           
                                        </div>
                                       
                                        </el-upload> 
                                      
                                    </div> 
                                   
                                </fieldset>
                            </el-row>
                           <el-dialog :visible.sync="dialogVisible" append-to-body>
                            <img width="100%" :src="dialogImageUrl" alt="">
                          </el-dialog>
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
 export default {
    props: ["updatePageData"],
    components:{
      formateDate,
    },
    data(){
     
        let rules = {
           
        }
        return{
          dialogImageUrl:"",
           dialogVisible: false,
           disabled:false,
           isDialogShow: false,
           isDialogbankAccount:false,
           isDialogZzjgShow:false,
            add_Form: {
                 zsId:"",
                zsmc:"",
                id:"",
                zzjgDm:"",
                zzjgMc:"",
                nsrsbh:"",
                nsrmc:"",
                yzlx:"",
                jbr:"",
                yxrqQ: "",
                yxrqZ:"",
                czyy:"",
                imgXOffset:"",
                imgYOffset:"",
                imgWidth:"",
                imgHeight:"",
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
            yzlxList:[
              {yzlx:"0",label:"电子发票印章"},
            ],
       
            fplxDmList:[],
            fileList: [{ name:"", url: "" }],
        }
    },
     mounted() {
     //页面初始化根据ID加载要编辑的数据
     this.getSealManagementById();
      //添加一个图片后隐藏图片添加
      $(".el-upload--picture-card").css("display", "none");
  },
    methods: {
       //图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
      handleRemove(file) {
             
             if (this.fileList.indexOf(this.baseImg+file.url)) {
               this.fileList.splice(this.fileList.indexOf(this.baseImg+file.url), 1);
            }
            // 删除
            for (let key in file) {
                delete file[key];
            }

      },
      //上传时校验图片大小
      handlechange(file,fileList){
      // console.log("file"+file);
       // let isLt2M = file.size / 1024 / 1024 < 1; 不能超过1MB
       let uid = file.uid
       let isLt2M = file.size / 1024 / 50 < 1;   //不能超过50kb
        if (!isLt2M) {
          this.$message.warning('图片大小不能超过 50Kb!');
          for(var i = 0;i<fileList.length;i++) {
          if(fileList[i].uid == uid) {
            fileList.splice(i,1)
            }
            }
        }
        return;
	      
      },
      //点击文件列表中的文件触发
      handlePreview(file) {
        console.log(file);
      },
      importExcel(param){ 
       this.nameExcel=param.file;
    },
      handleExceed(files, fileList) {
        this.$message.warning(`当前只能选择1个文件`);
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

getSealManagementById(){
    let _this = this;
     let id=this.updatePageData.id;
     let zzjgDm=_this.updatePageData.zzjgDm;
      _this.$api.get(
        _this.$apis.icpmanagement +"/taxpayer/sealmanagement/getSealmanagementById/" +id+"/"+zzjgDm, {},
        function (res) {
          if (res.success) {
          let list=res.data;
         if(list.yxbz=="Y"){
             list.yxbz="有效"
         }else{
             list.yxbz="无效"
         }
           _this.add_Form=list;
           _this.dialogImageUrl = res.data.productImg;
          _this.fileList[0].name = res.data.fileName;
          _this.fileList[0].url ='data:image/png;base64,'+res.data.fileImg;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
        
    },  
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
 .yzfiedset{
     width:640px;
     height: 190px;
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