
<template>
  <div class="drawer-wrap">
      <div class="rh-drawer-head">
          <div class="drawer-title">修改发票票样</div>
      </div>
      <el-row style="text-align:center">
            <div class="tabs-wrap" >
                  <div>
                      <el-form :model="add_Form" :rules="rules" ref="add_Form" label-width="100px" label-position="right">
                          <div class="rh-dialog-body"> 
                              <el-row>
                                <el-col :span ="8">
                                 <el-form-item label="税务省份" prop="sf">
                                      <el-select v-model="add_Form.sf" placeholder="请选择税务省份" @change="selectSf()">
                                            <el-option 
                                            v-for="item in NsrsfList" 
                                            :key="item.sfdm" 
                                            :label="item.sf"
                                            :value="item.sf">
                                            </el-option>
                                        </el-select>
                                  </el-form-item>
                               </el-col> 
                                <!-- <el-col :span ="8" >
                                       <el-form-item label="发票类型" prop="fplxmc">
                                        <el-select v-model="add_Form.fplxmc" placeholder="请选择发票类型" style="width:200px" @change="onchangeImg()">
                                            <el-option 
                                            v-for="item in fplxList" 
                                            :key="item.index" 
                                            :label="item.fplxmc"
                                            :value="item.fplxdm">
                                            </el-option>
                                        </el-select>
                                   </el-form-item>
                               </el-col>  -->
                               <el-col :span ="8" style="width:150px;margin-left:20px">
                                    <div>
                                     <el-upload
                                        class="upload-demo"
                                        ref="uploadExcel" 
                                        action="/post"
                                        :http-request= "importExcel"
                                        :on-change="handlechange"
                                        :before-remove="beforeRemove"
                                        accept=".png"
                                        multiple
                                        list-type="picture"
                                        :on-exceed="handleExceed"
                                        :file-list="fileList"
                                        :show-file-list="false"
                                         >
                                         <el-button size="small" type="primary">上传税务监制章</el-button>
                                        
                                        </el-upload> 
                                 
                                    </div> 
                                  
                               </el-col>
                                <el-col :span="8" style="width:80px">
                                    
                                   <el-button type="primary" @click="add_submit('add_Form')" :loading="loading.loadingList" style="margin-left:20px;">保存</el-button>
                                    
                                </el-col>
                              </el-row>
                               
                            <el-row>
                               <fieldset class="yzfiedset"> 
                                  <legend>票样</legend> 
                        
                                  <div id="div_perview" style="position:relative; margin: 5px; background-color: ;">
                                    <img id="img_template" style="position: absolute; top:0; left: 0;">
                                    <div id="div_title" style="position: absolute; text-align: center;color: #9E520A;"></div>
                                    <div id="div_tax" style="position: absolute;overflow: hidden;">
                                      <img :src="'data:image/png;base64,'+imgurl" id="img_tax" style="height: 100%; width: 100%;"/>
                                    </div>
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
        
  </div>
  
</template>
  
<script>
import { formateDate } from "@/utils/tools.js";
import validate from "@/utils/validate.js";
 export default {
    props: ["updatePageData"],
    components:{
      formateDate,
    },
    data(){
     
        let rules = {
            sf:[{required: true, message:'请选择税务省份',trigger:'blur'},],
        }
        return{
           dialogVisible: false,
           disabled: false,
           isDialogShow: false,
           isDialogbankAccount:false,
           isDialogZzjgShow:false,
            add_Form: {
                pybh:"",
                sf:"",
                fplxmc:"",
                pymc:"",
                yxbz:"",
                file:"",
            },
             loading:{
               loadingList:false,
               dzdkList:false,
             },
            rules: rules,
            searchWrap:false,
            dialogImageUrl:"",
            NsrsfList:[], 
            yzlxList:[
              {yzlx:"0",label:"电子发票印章"},
            ],
            fplxList:[],
            pymcList:[],
            fileList: [{ name:"", url: "" }],
            imgurl:"",
        }
    },
     mounted() {
    // this.init_Fplx();
     this.init_sf();
     this.getInvoicelayoutById();
     this.previewInitImg();
  },
    methods: {
    getInvoicelayoutById(){
        let _this=this;
        let pybh=_this.updatePageData.pybh;
        this.$api.post(
            _this.$apis.icpmanagement +"/basic/invoicelayout/getInvoicelayoutById/"+pybh, {},
            function (res) {
            if (res.success) {
              console.info(JSON.stringify(res));
               let list=res.data;
               _this.setPrerviewImg(res.data.fileImg)
               _this.py_title(res.data.pymc)
               _this.fileList[0].name = res.data.fileName;
               _this.imgurl =res.data.fileImg;
              //  _this.fileList[0].url = res.data.fileImg;
               _this.add_Form.pymc=list.pymc;
               _this.add_Form.pybh=list.pybh;
            } else {
                _this.$message({
                 showClose:true,
                message: "查询失败," + res.errorMsg,
                type: "error",
                });
            }
            }
        ); 
    },
      init_pymc(){
      let _this = this;
       //查询到的票样名称放入到数组
       this.$api.post(
        _this.$apis.icpmanagement +"/basic/invoicelayout/pymcList", {},
        function (res) {
          if (res.success) {
             _this.pymcList= res.data;
             //页面初始化的时候动态获取省份
             _this.init_sf(); 
          } else {
            _this.$message({
               showClose:true,
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      ); 
      },
      //下拉省份选择
      py_title(titleJzh){
        $('#div_title').html(titleJzh);
      },
      //初始化设置标签属性值
      previewInitImg(){ 
        let _this=this;
        $('#img_template').css({
                'width' : 785+ 'px',
                'height' : 450+ 'px'
              }).attr('src', require('./fppy-template/fppy_template.png'));
        $('#div_title').css({
          'top' : 18 + 'px',
          'left' : 242+ 'px',
          'width' : 300 + 'px',
          'font-size' : 22+ 'px'
        });
          $('#div_tax').css({
          'top' : -2+ 'px',
          'left' : 325 + 'px',
          'width' : 135 + 'px',
          'height' : 94 + 'px',
          'display' : 'none'
  });

      },
     init_Fplx(){
      let _this = this;
       //查询到的发票类型放入到数组
       this.$api.post(
        _this.$apis.icpmanagement +"/basic/invoicelayout/fplxList", {},
        function (res) {
          if (res.success) {
             _this.fplxList= res.data;
            
          } else {
            _this.$message({
               showClose:true,
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      ); 
     },
     init_sf(){
      let _this = this;
      let pymc={"pymc":_this.updatePageData.pymc}
      _this.pymcList.push(pymc)
      let pymcList=_this.pymcList;
      this.$api.post(
        _this.$apis.icpmanagement +"/basic/taxcode/getAllSf",{},
        function (res) {
          if (res.success) {
             let list=res.data;
             let sf=""
            for (let j = 0; j < pymcList.length; j++) {
                for (let i = 0; i < list.length; i++) {
                    if(pymcList[j].pymc.indexOf(list[i].sf)==0){
                        sf=list[i].sf
                            break; 
                    }  
                }
                
            }
           _this.add_Form.sf=sf; 
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
    //设置发票监制章图片
    setPrerviewImg(imgrul){
      $('#div_tax').css({
        'display' : 'block'
      });
      $('#img_tax').attr('src', imgrul);
      
    },
      handleRemove(file) {
             if (this.fileList.indexOf(this.baseImg + file.url)) {
               this.fileList.splice(this.fileList.indexOf(this.baseImg + file.url), 1);
            }
            // 删除
            for (let key in file) {
                delete file[key];
            }

      },
      //上传时校验图片大小
      handlechange(file,fileList){
       // let isLt2M = file.size / 1024 / 1024 < 1; 不能超过1MB
       let uid = file.uid
       let isLt2M = file.size / 1024 / 30 < 1;   //不能超过50kb
        if (!isLt2M) {
          this.$message.warning('图片大小不能超过 30Kb!');
          for(var i = 0;i<fileList.length;i++) {
          if(fileList[i].uid == uid) {
            fileList.splice(i,1)
            }
            }
        }
        else{
                 this.add_Form.file = file.raw;
                 let imgurl=file.url;
                this.setPrerviewImg(imgurl)
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
        this.$message.warning(`当前只能选择1个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
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
      _this.add_Form.yxbz=_this.updatePageData.yxbz;
      let file=this.add_Form.file;
      let pybh=this.add_Form.pybh;
      
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
           if(file==""){
                 _this.$message({
                    showClose:true,
                    message: "请上传监制章图片!!" ,
                    type: "warning",
                    });
           }else{ 
              let editParams = _this.add_Form;
              if (editParams!= null) {
                        if (validate.checkForbiddenWordForm(JSON.stringify(editParams))) {
                              _this.$message({
                              showClose: true,
                              message: "不允许有特殊字符",
                              type: "error",
                              });
                              return;
                        }
              }
              let para = editParams;
              _this.loading.loadingList=true;
              let paraForm = new FormData();
              paraForm.append("file", file);
              paraForm.append("pymc",para.pymc);
              paraForm.append("yxbz",para.yxbz);
              paraForm.append("pybh",pybh);
              paraForm.append("sf",para.sf);
              console.log("paraForm="+paraForm)
              _this.$api.post(
                _this.$apis.icpmanagement + "/basic/invoicelayout/editInvoicelayout", paraForm,
                function (res) {
                  console.log("res="+res);
                if (res.success) {
                    _this.$message({
                       showClose:true,
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
                     showClose:true,
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
    .upload-demo{
         
         text-align: left; 
         margin-left:20px;
    }
 .yzfiedset{
     width:800px;
     height: 480px;
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