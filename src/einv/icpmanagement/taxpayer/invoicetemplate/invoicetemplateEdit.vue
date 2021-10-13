
<template>
  <div class="drawer-wrap xxfpmb">
      <div class="rh-drawer-head">
          <div class="drawer-title">修改发票模板</div>
      </div>
      <el-row style="text-align:center">
            <div class="tabs-wrap">
                  <div>
                      <el-form :model="add_Form" :rules="rules" ref="add_Form" label-width="100px" label-position="right">
                          <div class="rh-dialog-body" style="height: 613px;"> 
                              <el-row>
                                <el-col :span ="8">
                                 <el-form-item label="票样名称" prop="pybh">
                                      <el-select v-model="add_Form.pybh" placeholder="请选择票样" @change="selectSf()">
                                            <el-option 
                                            v-for="item in pymcList" 
                                            :key="item.pybh" 
                                            :label="item.pymc"
                                            :value="item.pybh">
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
                                      <el-button size="small" type="primary" @click="chooseFpz()">选择发票章</el-button>
                                    </div> 

                               </el-col>
                                <el-col :span="8" style="width:80px">
                                    
                                   <el-button type="primary" @click="add_submit('add_Form')" :loading="loading.loadingList" style="margin-left:20px;">保存</el-button>
                                    
                                </el-col>
                              </el-row>
                            <el-row>
                               <fieldset class="yzfiedset"  @mousemove="mouseMove" @mouseup = "flag_up" @mousedown="flag_down" > 
                                  <legend>票样</legend> 
                                    <div id="div_perview" draggable="false">
                                          <img id="img_template" style="position: absolute; top:0; left: 0;width: 890px;height: 504px;"/>
                                          <div id="div_title" style="position: absolute; text-align: center;color: #9E520A;"></div>
                                          <div id="div_tax" style="position: absolute;overflow: hidden;">
                                            <img id="img_tax" style="height: 100%; width: 100%;"/>
                                          </div>
                                          <div id="signature" @mousedown = "onMouseDown"  @mouseup = "onmouseUp" :style="{left:left+'px',top:top+'px'}"> 
                                              <div id="signature_img_cover" style="">
                                              </div>
                                              <img id="signature_img" 
                                                  style="height: 100%; width: 100%; "/>
                                              <div id="signature_coor"></div>
                                          </div>
                                    </div>
                                </fieldset>
                            </el-row>
                       </div>
                    </el-form>
                  </div>
            </div>
      </el-row>
        <!--绑定证书-->
        <el-dialog 
            title="选择发票章"
            :visible.sync = "isDialogShow"
            width="40%"
           append-to-body
           :before-close="handleCloseAdd">
                <div class="rh-dialog-body">
                        <!-- <el-row style="border:1px solid #000;height:130px">
                                  <el-col :span ="10" :offset="1" style="border-right:1px solid #000;height:130px">
                                     <input type="radio" name="ipt"/>
                                  </el-col >
                                  <el-col :span = "11" style="height:50px">
                                      <img id="fpzImg" height="120px" />
                                  </el-col> 
                        </el-row> -->
                      <el-table :data="tableData" stripe border>
                        <el-table-column label="选择按钮" width="100" align="center" >
                              <template slot-scope="scope">
                                  <el-radio :label="scope.row.qzbh" v-model="radioInvoice" @change.native="getCurrentRow2(scope)">&nbsp;</el-radio>
                              </template>
                         </el-table-column>
                        <el-table-column prop="fileImg" align="center" label="发票章图片">
                      　　<template slot-scope="scope">
                      <!-- 　　　　<img v-for="item in scope.row.fileImg" :key="item.index" :src="scope.row.fileImg" width="40" height="40" class="head_pic"/> -->
                               <img  :src="scope.row.fileImg"   width="140"  height="110" class="head_pic"/>
                      　　</template>
                      </el-table-column>
                    </el-table>
                </div>
                <div class="rh-dialog-footer" solt="footer">
                    <el-button type="primary" @click="Confirm()" >确定</el-button>
                </div>
        </el-dialog>
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
            pybh:[{required: true, message:'请选择票样名称',trigger:'blur'},],
        }
        return{
          radioInvoice:"",
            dialogVisible: false,
            disabled: false,
            isDialogShow: false,
            add_Form: {
            id:"",
            nsrsbh:"",
            pymc:"",
            pybh:"",
            zsbh:"",
            qzbh:"",
            yxbz:"Y",
            imgXOffset:"",
            imgYOffset:"",
            imgWidth:"",
            imgHeight:"",
            srcUrl:"",
            },
            loading:{
            loadingList:false,
            dzdkList:false,
            },
            rules: rules,
            searchWrap:false,
            NsrsfList:[], 
            yzlxList:[
              {yzlx:"0",label:"电子发票印章"},
            ],
            fplxList:[],
            pymcList:[],
            fileList:[],
            tableData:[],
            left:720,
            top:418,
            start_left:0,
            start_top:0,
            start_mouseX:0,
            start_mouseY:0,
            end_mouseX:0,
            end_mouseY:0,
            x_length:530,
            y_length:180,
            flag:'',

        }
    },
     mounted() {
    // this.init_Fplx();
     this.init_pymc();
     this.previewInitImg();
     //页面初始化根据ID加载要编辑的数据
     this.getInvoicetemplateById();
  },
    methods: {
    getInvoicetemplateById(){
        let _this = this;
        let id=this.updatePageData.id;
        let nsrsbh=_this.updatePageData.nsrsbh;
        _this.$api.get(
            _this.$apis.icpmanagement +"/taxpayer/invoicetemplate/getInvoicetemplateById/" +id, {},
            function (res) {
            if (res.success) {
             let list=res.data;
            _this.add_Form=list;
            //监制章
            _this.setPrerviewImg(list.fileImg)
            _this.py_title(list.pymc)
            //发票章
             _this.left=list.imgXOffset;
             _this.top=list.imgYOffset;
            _this.initFpzimg(list.fileFpzImg);
            } else {
                _this.$message({
                message: res.errorMsg,
                type: "error",
                });
            }
            }
        );
            
    },
      onMouse(event){
         
      },
      flag_down(){
        this.flag = "down";
      },
      flag_up(){
          this.flag = "up";
      },
      onMouseDown(event){
          this.flag = "down";
          this.start_left = this.left;
          this.start_top = this.top;
          this.start_mouseX = event.clientX;
          this.start_mouseY = event.clientY;

      },
      onmouseUp(event){
        this.flag = "up";
        // this.end_mouseX = event.clientX;
        // this.end_mouseY = event.clientY;
      
      },
      mouseMove(event){
        var lenth_X = 0;
        var lenth_Y = 0;
        if(this.flag=="down"){
          lenth_X = event.clientX - this.start_mouseX;
          lenth_Y = event.clientY - this.start_mouseY;
          if((this.left>=0)&&(this.left<=750)){
            this.left = this.start_left + lenth_X; 
          }else if(this.left<0){
            this.left = 0;
          }else if(this.left>750){
            this.left = 750
          }

          if((this.top>=0)&&(this.top<=435)){
            this.top = this.start_top + lenth_Y; 
          }else if(this.top<0){
            this.top = 0;
          }else if(this.top>435){
            this.top = 435
          }
        }else if(this.flag=="up"){
          // this.left = this.end_mouseX - this.start_mouseX;
          // this.top = this.end_mouseY  - this.start_mouseY;
        }else if(this.flag==""){

        }
        console.log("aa="+this.left+":"+this.top);
        this.add_Form.imgXOffset=this.left;
        this.add_Form.imgYOffset=this.top;   
      },
      initFpzimg(fpzurl){
        
        $('#signature').css({
          'display' : 'block'
          });
          $('#signature_img').attr('src', 'data:image/png;base64,'+fpzurl);
      },
    getCurrentRow2(scope){
       this.add_Form.srcUrl=scope.row.fileImg;
    },
     Confirm(){
      // let imgsrc=$('#fpzImg')[0].src;
      let _this=this;
      let imgsrc=this.add_Form.srcUrl;
      if(imgsrc==""){
            _this.$message({
               showClose:true,
                message: "请选择发票章图片",
                type: "warning",
                });
      }else{
           $('#signature').css({
          'display' : 'block'
          });
          $('#signature_img').attr('src', imgsrc);
          //获取图片的高度和宽度
           let img =new Image()
           img.src=imgsrc
           console.log('图片原始高度', img.height)
           console.log('图片原始宽度',img.width)
           _this.add_Form.imgWidth=img.width;
           _this.add_Form.imgHeight=img.height;

           this.isDialogShow=false;
          //清空数组
          this.tableData.length=0;
      }
       
    },
     handleCloseAdd(){
      this.isDialogShow=false;
      this.tableData.length=0;
    },
    chooseFpz(){
     let _this=this;
        let nsrsbh=_this.updatePageData.nsrsbh;
        this.$api.post(
            _this.$apis.icpmanagement +"/taxpayer/invoicetemplate/getSeal/"+nsrsbh, {},
            function (res) {
            if (res.success) {
               let list=res.data;
              // _this.chooseFpzimg(res.data.fileImg)
              let qzbh=list.qzbh;
               let imgurl='data:image/png;base64,'+list.fileImg
               let params={'qzbh':qzbh,"fileImg":imgurl};
              _this.tableData.unshift(params)
               _this.add_Form.qzbh=list.qzbh;
               _this.add_Form.zsbh=list.zsbh;
               _this.add_Form.nsrsbh=nsrsbh;
              
            } else {
                _this.$message({
                showClose:true,
                message: "查询失败," + res.errorMsg,
                type: "error",
                });
            }
            }
        );    
     this.isDialogShow=true;
    },
      init_pymc(){
      let _this = this;
       //查询到的票样名称放入到数组
       this.$api.post(
        _this.$apis.icpmanagement +"/taxpayer/invoicetemplate/pymcList", {},
        function (res) {
          if (res.success) {
             _this.pymcList= res.data;
            //  //页面初始化的时候动态获取省份
             
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
      selectSf(){
        let _this=this;
        let pybh=_this.add_Form.pybh;
        this.$api.post(
            _this.$apis.icpmanagement +"/taxpayer/invoicetemplate/getInvoicelayout/"+pybh, {},
            function (res) {
            if (res.success) {
               let list=res.data;
               _this.setPrerviewImg(res.data.fileImg)
               _this.py_title(res.data.pymc)
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
     //下拉省份选择
      py_title(titleJzh){
        $('#div_title').html(titleJzh);
      },
      //初始化设置标签属性值
      previewInitImg(){ 
        let _this=this;
        $('#img_template').css({
                'width' : 890+ 'px',
                'height' : 540+ 'px',
                'user-select': 'none'
              }).attr('src', require('./fppy-template/fppy_template.png')).on('mousedown', e => {
                e.preventDefault()
              });
        $('#div_title').css({
          'top' : 30+ 'px',
          'left' : 295+ 'px',
          'width' : 300 + 'px',
          'font-size' : 22+ 'px'
        });
          $('#div_tax').css({
              'top' : 10+ 'px',
              'left' : 375 + 'px',
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
      let pymcList=_this.pymcList;
      this.$api.post(
        _this.$apis.icpmanagement +"/basic/taxcode/getAllSf",{},
        function (res) {
          if (res.success) {
             let list=res.data;
          for (let j = 0; j < pymcList.length; j++) {
              for (let i = 0; i < list.length; i++) {
                if(pymcList[j].pymc.indexOf(list[i].sf)==0){
                     list.splice(i,1)
                }
             }
            
          }
             _this.NsrsfList= list;

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
      $('#img_tax').attr('src', 'data:image/png;base64,'+imgrul);
      
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
      this.add_Form.file = file.raw;
        if (!isLt2M) {
          this.$message.warning('图片大小不能超过 30Kb!');
          for(var i = 0;i<fileList.length;i++) {
          if(fileList[i].uid == uid) {
            fileList.splice(i,1)
            }
            }
        }
         let imgurl=file.url;
         this.setPrerviewImg(imgurl)
        return;
	      
      },
      //点击文件列表中的文件触发
      handlePreview(file) {
        
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
      let qzbh=_this.add_Form.qzbh;
      _this.add_Form.id=_this.updatePageData.id;
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
           if(qzbh==""){
                 _this.$message({
                   showClose:true,
                    message: "请选择发票章!!" ,
                    type: "warning",
                    });
           }else{ 
              let editParams = _this.add_Form;
              let para = editParams;
              // if (para != null) {
              //   if (validate.checkForbiddenWordForm(JSON.stringify(para))) {
              //     _this.$message({
              //       showClose: true,
              //       message: "不允许有特殊字符",
              //       type: "error",
              //     });
              //     return;
              //   }
              // }
              _this.loading.loadingList=true;
              _this.$api.post(
                _this.$apis.icpmanagement + "/taxpayer/invoicetemplate/editInvoicetemplate", para,
                function (res) {
                if (res.success) {
                    _this.$message({
                      showClose:true,
                      message: "修改成功",
                      type: "success",
                      });
                      //关闭抽屉
                      _this.loading.loadingList=false;
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

<style lang="less" scoped>
.xxfpmb{

      #div_perview {
      position: relative;
      margin: 5px;
      }
      #signature {
          width: 140px;
          height: 110px;
          cursor: move;
          position: absolute;
          background-color: transparent;
          border: 0px solid #CCCCCC;
          -webkit-box-shadow: 10px 10px 25px #ccc;
          -moz-box-shadow: 10px 10px 25px #ccc;
          box-shadow: 10px 10px 25px #ccc;
          display: none;
      }

      #signature_img_cover{
      position: absolute;
      top: 0;left:0;
      bottom: 0;
      right: 0;
      z-index: 20;
      width: 100%;
      height: 100%;
      /*IE 兼容*/
      background-color: #FFF;
      opacity:0;
      /*IE8*/
      filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0);
      }

      #signature_coor {
      width: 14px;
      height: 11px;
      /* 	overflow: hidden; */
      /* 	cursor: se-resize; */
      /* 	position: absolute; */
      /* 	right: 0; */
      /* 	bottom: 0; */
      /* 	background-color: #09C; */
      /* 	z-index: 21; */
      }
      .yzfiedset{
      width: 900px;
      height: 579px;
      border: 1px solid #e6e1e1;
      margin: 0 auto;
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
  
}
</style>