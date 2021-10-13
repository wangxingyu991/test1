
<template>
  <div class="drawer-wrap">
      <div class="rh-drawer-head">
          <div class="drawer-title">新增纳税人印章</div>
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
                                      <el-form-item label="纳税人识别号" prop="nsrsbh" >
                                          <el-input v-model="add_Form.nsrsbh" placeholder="纳税人识别号"  :readonly="true"></el-input>   
                                      </el-form-item>
                                  </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span ="10" :offset="1">
                                 <el-form-item label="印章类型" prop="yzlx">
                                      <el-select v-model="add_Form.yzlx" placeholder="请选择证书类型">
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
                                      <el-form-item label="纳税人名称" prop="nsrmc" >
                                          <el-input v-model="add_Form.nsrmc" placeholder="纳税人名称"  :readonly="true"></el-input>   
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
                            <!-- <el-row>
                                <el-col :span ="10" :offset="1">
                                   <el-form-item label="印章X偏移量" prop="imgXOffset"> 
                                        <el-input v-model="add_Form.imgXOffset" placeholder="印章图片X偏移量" maxlength="120" ></el-input>    
                                   </el-form-item>
                                </el-col> 
                                <el-col :span ="10" :offset="1">
                                     <el-form-item label="印章Y偏移量" prop="imgYOffset"> 
                                        <el-input v-model="add_Form.imgYOffset" placeholder="印章图片Y偏移量" maxlength="120" ></el-input>    
                                   </el-form-item>
                                </el-col>
                            </el-row>
                             <el-row>
                                <el-col :span ="10" :offset="1">
                                   <el-form-item label="印章宽度" prop="imgWidth"> 
                                        <el-input v-model="add_Form.imgWidth" placeholder="印章图片宽度" maxlength="120" ></el-input>    
                                   </el-form-item>
                                </el-col> 
                                <el-col :span ="10" :offset="1">
                                     <el-form-item label="印章高度" prop="imgHeight"> 
                                        <el-input v-model="add_Form.imgHeight" placeholder="印章图片高度" maxlength="120" ></el-input>    
                                   </el-form-item>
                                </el-col>
                            </el-row> -->
                            <el-row>
                              <el-col :span ="10"  :offset="1">
                                <el-form-item label="绑定证书" prop="zsmc" >
                                            <el-input v-model="add_Form.zsmc" placeholder="绑定证书" @click.native="bdzs()" :readonly="true"></el-input>   
                                </el-form-item>
                              </el-col> 
                              <el-col :span ="10" :offset="1" >
                                      <el-form-item label="印章经办人" prop="jbr">
                                          <el-input v-model.trim="add_Form.jbr" placeholder="印章经办人" maxlength="10" ></el-input>    
                                      </el-form-item> 
                               </el-col> 
                            </el-row>
                             <el-row>
                                 <el-col :span ="10" :offset="1">
                                   <el-form-item label="操作原因" prop="czyy"> 
                                        <el-input type="textarea"  autosize v-model="add_Form.czyy" placeholder="操作原因" maxlength="200"></el-input>    
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
                                        :limit="1"
                                        :on-exceed="handleExceed"
                                        :file-list="fileList"
                                         >
                                        <div slot="tip" class="el-upload__tip">只能上传.png文件，且不超过50kb</div>
                                        <i slot="default" class="el-icon-plus"></i>
                                        <div slot="file" slot-scope="{file}">
                                        <img
                                            class="el-upload-list__item-thumbnail"
                                            :src="file.url" alt=""
                                        >
                                         <span class="el-upload-list__item-actions">
                                            <span
                                                v-if="!disabled"
                                                class="el-upload-list__item-delete"
                                                @click="handleRemove(file)"
                                                >
                                                <i class="el-icon-delete"></i>
                                                
                                            </span>
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
            <el-button type="primary" @click="add_submit('add_Form')" :loading="loading.loadingList">保存</el-button>
            <el-button @click="close('add_Form')">关闭</el-button>
        </div>
         <!--绑定证书-->
        <el-dialog 
            title="选择需要绑定的纳税人证书"
            :visible.sync = "isDialogShowAdd"
            width="50%"
           append-to-body
           :before-close="handleCloseAdd">
                <div class="rh-dialog-body">
                    <div class="rh-operate clearfix">
                           <div class="rh-pull-right">
                            <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
        
                              <el-form-item prop="zsNsrmc">
                                <el-input v-model.trim="queryForm.zsNsrmc" placeholder="纳税人证书名称" maxlength="20"></el-input>
                              </el-form-item>
                              <el-button icon="el-icon-search" type="primary" @click="searchForm"></el-button>
                              <el-button type="primary" @click="resetForm('queryForm')" style="margin-left: 0px;">重置</el-button>
                            </el-form>
                          </div>
                      </div>
                       <div class="rh-table">
                          <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange" v-loading="certListLoading">
                              <template slot="empty">
                                <div class="pic_nodata"></div>
                             </template>
                             <el-table-column
                                        label="序号"
                                        width="50px"
                                        align="center">
                                    <template slot-scope="scope">
                                        {{scope.$index+1}}
                                    </template>
                                 </el-table-column>
                            <el-table-column label="" width="50">
                              <template slot-scope="scope">
                                <el-radio :label="scope.row.id" v-model="radio" @change.native="getCurrentRow(scope)">&nbsp;</el-radio>
                              </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip align="left" prop="nsrmc" label="纳税人证书名称"></el-table-column>
                            <el-table-column show-overflow-tooltip align="center" prop="yxqQ" label="有效期起" width="200px"></el-table-column>
                            <el-table-column show-overflow-tooltip align="center" prop="yxqZ" label="有效期止"></el-table-column>
                          </el-table>
                        </div>
                        <div class="rh-pagination">
                          <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="tableData.total" :current-page.sync="tableData.current" :page-sizes="[10, 20, 30, 40]" :page-size="tableData.size">
                          </el-pagination>
                        </div>
                </div>
                <div class="rh-dialog-footer" solt="footer">
                    
                    <el-button type="primary" @click="Confirm()" >确定</el-button>
                </div>
        </el-dialog>
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
            nsrsbh:[{required: true, message:'纳税人识别号不能为空',trigger:'blur'},
             { validator: this.$validate.checkForbiddenWord, trigger: "blur" },],
            yzlx:[{required: true, message:'请选择印章类型',trigger:'blur'},],
            yxqQ:[{required: true, message:'请选择有效期起',trigger:'blur'},],
            yxqZ:[{required: true, message:'请选择有效期止',trigger:'blur'},],
            yxbz:[{required: true, message:'请选择有效标识',trigger:'blur'},],
            sykl:[{required: true, message:'请输入私钥口令',trigger:'blur'},],
            zsmc:[{required: true, message:'请绑定证书',trigger:'blur'},],
            czyy:[{ validator: this.$validate.checkForbiddenWord, trigger: "blur" },],
            jbr:[{ validator: this.$validate.checkForbiddenWord, trigger: "blur" },]
        }
        return{
          radio:"",
          certListLoading:false,
          isDialogShowAdd:false,
           dialogVisible: false,
           disabled: false,
           isDialogShow: false,
           isDialogbankAccount:false,
           isDialogZzjgShow:false,
            add_Form: {
                zsId:"",
                zsmc:"",
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
            queryForm:{
               zsNsrmc:"",
               nsrsbh:"",
               zzjgDm:"",
            },
             loading:{
               loadingList:false,
               dzdkList:false,
             },
            rules: rules,
            searchWrap:false,
            dialogImageUrl:"",
            kpzdList:[], 
            yzlxList:[
              {yzlx:"0",label:"电子发票印章"},
            ],
            fplxList:[],
            fplxDmList:[],
            fileList:[],
            tableData: [],
            //表格选择
            tr_sels: [],
        }
    },
     mounted() {
      this.initGetNsrsbh();
      this.add_Form.zzjgMc=this.addPageData.zzjgMc
      this.add_Form.zzjgDm=this.addPageData.zzjgDm
    //页面初始化的时候动态获取发票类型
 //   this.init_Fplx();
 // this.getTreeRoot();
  },
    methods: {
    Confirm(){
     let _this=this;
     let radio=_this.radio;
     if(radio==""){
        _this.$message({
                showClose:true,
                message: "请选择一条纳税人证书",
                type: "warning",
                });
       }else{
         _this.add_Form.zsId=radio;
         _this.isDialogShowAdd=false;
       }
    },
    getCurrentRow(scope) {
      this.rowObj = scope.row
      this.add_Form.zsmc= this.rowObj.nsrmc+"证书";
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
    searchForm(){
         this.bdzs();
    },
      //重置
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
     handleCloseAdd(){
      this.isDialogShowAdd=false;
    },
    bdzs(){
      let _this=this;
      _this.queryForm.zzjgDm=_this.add_Form.zzjgDm;
      let param=_this.queryForm
      if (param != null) {
                if (validate.checkForbiddenWordForm(JSON.stringify(param))) {
                  _this.$message({
                    showClose: true,
                    message: "不允许有特殊字符",
                    type: "error",
                  });
                  return;
                }
      }
      _this.certListLoading=true;
      _this.$api.post(
            _this.$apis.icpmanagement +
              "/taxpayer/sealmanagement/getNsrcert",param,
            function (res) {
              if (res.success) { 
                _this.tableData = res.data;
                let list = _this.tableData.records;
                 _this.tableData.records = list;
              }
              else{
                _this.$message({
                message: res.errorMsg,
                type: "warning",
                });
               }
                _this.certListLoading=false;
            }
          );
     this.isDialogShowAdd=true;   
    },
    initGetNsrsbh(){
      let _this=this;
      let zzjgDm=this.addPageData.zzjgDm;
       _this.$api.get(
            _this.$apis.icpmanagement +
              "/taxpayer/sealmanagement/getNsrsbh/"+zzjgDm,{},
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
             if (this.fileList.indexOf(this.baseImg + file.url)) {
               this.fileList.splice(this.fileList.indexOf(this.baseImg + file.url), 1);
            }
            // 删除
            for (let key in file) {
                delete file[key];
                this.add_Form.file="";
            }

      },
      //上传时校验图片大小
      handlechange(file,fileList){
       // let isLt2M = file.size / 1024 / 1024 < 1; 不能超过1MB
       let uid = file.uid
       let isLt2M = file.size / 1024 / 50 < 1;   //不能超过50kb
   
     
        if (!isLt2M) {
           this.$message({
                showClose:true,
                message:"图片大小不能超过 50Kb!",
                type: "warning",
                });
          for(var i = 0;i<fileList.length;i++) {
          if(fileList[i].uid == uid) {
            fileList.splice(i,1)
            }
            }
        }else{
               this.add_Form.file = file.raw;
             }
        return;
	      
      },
      //点击文件列表中的文件触发
      handlePreview(file) {
        console.log(file);
      },
       importExcel(param){ 
    //    this.nameExcel=param.file;
     },
      handleExceed(files, fileList) {
        this.$message({
                    showClose: true,
                    message: "当前只能选择1个文件",
                    type: "warning",
                   });
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
              paraForm.append("nsrsbh",para.nsrsbh);
              paraForm.append("zsId",para.zsId);
              paraForm.append("zzjgDm",para.zzjgDm);
              paraForm.append("zzjgMc",para.zzjgMc);
              paraForm.append("yzlx",para.yzlx);
              paraForm.append("jbr",para.jbr);
              paraForm.append("czyy",para.czyy);
              paraForm.append("imgXOffset",para.imgXOffset);
              paraForm.append("imgYOffset",para.imgYOffset);
              paraForm.append("imgWidth",para.imgWidth);
              paraForm.append("imgHeight",para.imgHeight);
              paraForm.append("yxbz",para.yxbz);
              
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
                _this.$apis.icpmanagement + "/taxpayer/sealmanagement/saveSealInfo", paraForm,
                function (res) {
                 
                if (res.success) {
                    _this.$message({
                      message: "保存成功",
                      type: "success",
                      });
                      //关闭抽屉
                      _this.loading.loadingList=false;
                        //清除文件列表
                      _this.$refs.uploadExcel.clearFiles();
                      _this.$emit("back");
                    
                } else {
                    _this.$message({
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

<style  scoped>
    .upload{
      text-align: left;  
    }
    .upload-demo{
         text-align: left; 
         margin-left:15px;
    }
 .yzfiedset{
     width:640px;
     height: 215px;
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