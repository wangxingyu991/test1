<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title"><span v-show="!editFlag">修改增电子签章信息</span><span v-show="editFlag">新增电子签章信息</span></div>
    </div>
    <div class="rh-drawer-body">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="22">
          <el-form-item label="省份" prop="sf">
              <el-select v-model="editForm.sf" placeholder="请选择省份" @change="provinceChanged" filterable>
                  <el-option 
                  v-for="item in provinceList" 
                  :key="item.id"
                  :label="item.sf"
                  :value="item.sf">
                  </el-option>
              </el-select>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="电子签章名称" prop="jzzmc">
              <el-input v-model="editForm.jzzmc" placeholder="电子签章名称" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="22">
            <el-form-item label="秘钥索引" prop="mysy">
              <el-input v-model="editForm.mysy" placeholder="秘钥索引" :readonly="true" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="经办人姓名" prop="jbrxm">
              <el-input v-model="editForm.jbrxm" placeholder="经办人姓名" maxlength="20" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="经办人手机号" prop="jbrsjh">
              <el-input v-model="editForm.jbrsjh" placeholder="经办人手机号" maxlength="11" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="经办人身份证号" prop="zjhm">
              <el-input v-model="editForm.zjhm" placeholder="经办人身份证号" maxlength="18" onkeyup="value=value.replace(/[\W]/g,'') " 
                  onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="rh-dialog-footer">
      <el-button type="primary"  @click="onSubmit('editForm')">保存</el-button>
      <el-button @click="close('editForm')">关闭</el-button>
    </div>
  </div>
</template>

<script>
import validate from "@/utils/validate.js";

export default {
  props: ["updatePageData"],

  data() {
    let editFlag = !this.updatePageData.id
    return {
      editFlag,
      editForm: {
        id: "",
        sf: "",
        jzzmc: "",
        jbrxm: "",
        jbrsjh: "",
        zjhm: "",
      },
      provinceList:[],
      //校验规则
      rules: {
        sf: [
          { required: true, message: "请先选择省份", trigger: "blur" },
        ],
        jbrxm: [
          { required: true, message: "请输入经办人姓名", transform: value => value ? value.trim() : '',trigger: "blur" },
          { max: 100, message: "最多20个字符", trigger: "blur" },
          { validator: this.$validate.checkForbiddenWord, trigger: "blur" },
        ],
        jbrsjh: [
          { required: true, message: "请输入经办人手机号", trigger: "blur" },
          { max: 15, message: "最多11个字符", trigger: "blur" },
          { validator: this.$validate.isMobileTelephone, trigger: "blur" },
        ],
        zjhm: [
          { required: true, message: "请输入经办人身份证号", trigger: "blur" },
          { max: 18, message: "最多18个字符", trigger: "blur" },
          { validator: this.$validate.isCardNo, trigger: "blur" },
        ],
      },
    };
  },

  created() {},

  mounted() {
    this.init_province();
    if(!this.editFlag){
        this.getSecurityproxyById();
        $(".el-upload--picture-card").css("display", "none");
    }
  },

  methods: {
    //初始化省份
    init_province(){
      let _this = this;
      this.$api.get(_this.$apis.icpmanagement +"/taxcontrol/digitalsignature/getDigitalsignatureProvince",{},
        function (res) {
          if (res.success) {
             _this.provinceList= res.data;
             //console.info(JSON.stringify(_this.provinceList));
          } else {
            _this.$message({
              message: "查询失败," + res.errorMsg,
              type: "error",
            });
          }
        }
      );  
    },
    
    //根据省份获取对应的签章名称
    provinceChanged(sf) {
      console.info(JSON.stringify(this.provinceList));
      for(let item of this.provinceList) {
        if(item.sf==sf) {
          this.editForm.jzzmc=item.yzmc;
          this.editForm.mysy=item.mysy;
        }
      }
    },


    //根据ID获取表单信息
    getSecurityproxyById() {
      let _this = this;
      _this.$api.get(
        _this.$apis.icpmanagement +
          "/taxcontrol/securityproxy/getSecurityproxyById/" + _this.updatePageData.id, {},
        function (res) {
          if (res.success) {
            _this.editForm = res.data;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //表单提交
    onSubmit(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
          let editParams = _this.editForm;
          if(!this.editFlag){
              //修改
              _this.$api.post(
                _this.$apis.icpmanagement + "/taxcontrol/securityproxy/updateSecurityproxy", editParams,
                function (res) {
                if (res.success) {
                    _this.$message({
                    message: "修改成功",
                    type: "success",
                    });
                    //关闭抽屉
                    _this.$emit("back");
                } else {
                    _this.$message({
                    message: "修改失败," + res.errorMsg,
                    type: "error",
                    });
                }
                }
              );
          }else{
              _this.$api.post(
                _this.$apis.icpmanagement + "/taxcontrol/digitalsignature/saveDigitalsignature", editParams,
                function (res) {
                if (res.success) {
                    _this.$message({
                    message: "保存成功",
                    type: "success",
                    });
                    //关闭抽屉
                    _this.$emit("back");
                } else {
                    _this.$message({
                    message: "保存失败," + res.errorMsg,
                    type: "error",
                    });
                }
                }
              );
          }
        }
      });
    },

    //关闭
    close(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      //关闭抽屉
      this.$emit("close");
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