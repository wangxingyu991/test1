<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title">查看编码信息</div>
    </div>
    <div class="rh-drawer-body">
      <div class="rh-context">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" label-position="right">
                <el-row>
                    <el-col :span = "11">
                        <el-form-item label="税收商品编码" prop="spbm">
                            <el-input v-model="editForm.spbm" placeholder="" :readonly="true" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span = "11" :offset="1">
                         <el-form-item label="税收商品名称" prop="spmc">
                          <el-input v-model="editForm.spmc" placeholder="" maxlength="100"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span = "11">
                      <el-form-item label="税收分类简称" prop="spbmjc">
                         <el-input v-model="editForm.spbmjc" placeholder="" :readonly="true"></el-input>
                      </el-form-item>
                   </el-col>
                   <el-col :span = "11" :offset="1">
                        <el-form-item label="说明" prop="sm">
                         <el-input type="textarea" v-model="editForm.sm" :readonly="true"></el-input>
                       </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                        <el-col :span = "11">
                            <el-form-item label="增值税税率" prop="zzssl">
                            <el-input v-model="editForm.zzssl" placeholder=""  :readonly="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span = "11" :offset="1">
                        <el-form-item label="关键字" prop="gjz">
                          <el-input type="textarea" v-model="editForm.gjz" :readonly="true"></el-input>
                        </el-form-item>
                      </el-col>
              </el-row>
              <el-row>
                <el-col :span = "11">
                  <el-form-item label="是否汇总项" prop="hzx">
                    <el-input v-model="editForm.hzx" :readonly="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span = "11" :offset="1">
                 <el-form-item label="增值税政策依据" prop="zzszcyj">
                    <el-input type="textarea" v-model="editForm.zzszcyj" :readonly="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                  <el-col :span = "11">
                      <el-form-item label="可用状态" prop="kyzt">
                          <el-input v-model="editForm.kyzt" :readonly="true"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span = "11" :offset="1">
                  <el-form-item label="增值税特殊管理" prop="zzstsgl" >
                       <el-input v-model="editForm.zzstsgl" :readonly="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
             <el-row>
               <el-col :span = "11">
                  <el-form-item label="版本" prop="bb">
                    <el-input v-model="editForm.bb"  :readonly="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span = "11" :offset="1">
                  <el-form-item label="启用时间" prop="qysj">
                      <el-input v-model="editForm.qysj" :readonly="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                  <el-col :span="11" >
                    <el-form-item label="有效标志" prop="yxbz" >
                      <el-input v-model="editForm.yxbz" :readonly="true"></el-input>
                    </el-form-item>
                 </el-col>
                 <el-col :span="11" :offset="1">
                  <el-form-item label="更新时间" prop="gxsj">
                    <el-input v-model="editForm.gxsj" :readonly="true"></el-input>
                 </el-form-item>
                </el-col>
              </el-row>
         </el-form>
        </div>   
      </div>
    <div class="rh-dialog-footer">
      <el-button @click="close('editForm')">关闭</el-button>
    </div>
  </div>
</template>

<script>
import { formateDate } from "@/utils/tools.js";
import validate from "@/utils/validate.js";
export default {
  props: ["searchPageData"],
  data(){
    return {
       editForm:{
                id:"",
                spbm:"",
                spmc:"",
                spbmjc:"",
                sm:"",
                zzssl: "",
                gjz:"",
                hzx: "",
                zzszcyj: '',
                kyzt: "",
                zzstsgl: "",
                bb: "",
                qysj: "",
                yxbz: "",
                gxsj:"",
            },
         boolean:{
            flag:false,
          },
          disabled:{
            flag:true,
          },
          lslbsdisabled:{
            flag:true,
          },
      //校验规则
      rules: {
      },
       flbmList:[], 
    };
  },

  created() {},

  mounted() {
     //根据Id编辑该条信息
    this.getItemsById();
  },
  methods: {
    init_form(){
        let _this = this;
        let params = this.editForm;
        if (params != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(params))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }
      this.$api.post(
        _this.$apis.business +"/basic/items/itemsflbmList",params,
        function (res) {
          if (res.success) {
             _this.flbmList= res.data; 
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
    //根据ID获取表单信息
    getItemsById() {
      let spbm =this.searchPageData.spbm;
      let sf=this.searchPageData.sf
      let _this = this;
      _this.$api.get(
        _this.$apis.icpmanagement +"/basic/taxcode/getTaxCodeById/" +spbm+"/"+sf, {},
        function (res) {
          if (res.success) {
           let list=res.data;
           console.log(list)
              //有效标志
              if (list.yxbz=="Y") {    
                list.yxbz = "有效";
              } else {
                list.yxbz = "无效";
              }
               if (list.hzx=="Y") {    
                list.hzx = "是";
              } else {
                list.hzx = "否";
              }
               if (list.kyzt=="Y") {    
                list.kyzt = "是";
              } else {
                list.kyzt = "否";
              }
                 //日期解析
              if(list.gxsj!== undefined && list.gxsj!== "" && list.gxsj!==null){
               
                 let gxsj=list.gxsj.slice(0,4)+"-"+list.gxsj.slice(4,6)+"-"+list.gxsj.slice(6);
               
                  list.gxsj = gxsj;
              }
              if(list.qysj!== undefined && list.qysj!== "" && list.qysj!==null){
                  let qysj=list.qysj.slice(0,4)+"-"+list.qysj.slice(4,6)+"-"+list.qysj.slice(6);
                  list.qysj = qysj;
              }
            _this.editForm=list;
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
    checkbox(){
      let _this=this;
      let flag=_this.editForm.yhzcbs;
      
      if(flag){
          _this.disabled.flag=false;
          _this.lslbsdisabled.flag=false;
      }else{
          _this.disabled.flag=true;
          _this.lslbsdisabled.flag=true;
          _this.editForm.lslbs="";
          _this.editForm.zzstsgl="";
      }
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