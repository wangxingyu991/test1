<template>
  <div class="drawer-wrap xxrdgdwt">
    <div class="rh-drawer-head">
              <div class="drawer-title">
                  新增热点工单问题
              </div>
        </div>
      <div class="rh-drawer-body">
        <el-form :model="tableData" :rules="rules" ref="tableData" label-width="140px" label-position="right">
          <el-row>
            <el-col :span="11">
              <el-form-item label="问题名称" prop="problemName">
                <el-input v-model="tableData.problemName" placeholder="" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="问题解决方案" prop="problemHandling">
                <span style="color:red">提交解决方案可以上传图片内容以用来更加全面的描述问题解决方案！</span>
                <!-- <el-input type="textarea" v-model="tableData.problemHandling"></el-input> -->
                <div class="editor">
                  <div ref="toolbar" class="toolbar">
                  </div>
                  <div ref="editor" class="text" style="height:500px"
                  >
                  </div>
                </div>
                <!-- <span style="color:red">上传图片大小不能超过 1MB，名字不能包含特殊字符！</span>
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
                </el-upload> -->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="rh-dialog-footer">
        <el-button type="primary" @click="addSubmit('tableData')" :loading="loading">保存</el-button>
        <el-button @click="close('tableData')">关闭</el-button>
      </div>
  </div>
</template>

<script>
import { formateDate } from "@/utils/tools.js";
import E from 'wangeditor';
import validate from "@/utils/validate.js";
export default {
  props: ["addPageData"],
  name: 'editoritem',
  data() {
    return {
      editor: null,
      info_: null,
      loading: false,

      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      tableData: {
      },
      form: {},
      //校验规则
      rules: {
        // problemHandling: [
        //   { required: true, message: "请输入问题处理方案", trigger: "blur" },
        // ],
        problemName: [
          { required: true, message: "请输入问题名称", trigger: "blur" },
          { max: 100, message: "最多100个字符", trigger: "blur" },
          { pattern : /^[\u0391-\uFFE5A-Za-z]+$/ ,required: true ,message: "只能包含中文以及大小写英文字母",trigger: "blur"},
        ],
        // systemFlag: [
        //   { required: true, message: "请选择系统标志", trigger: "blur" },
        // ],
        // categoryId: [
        //   { required: true, message: "请选择产品类别", trigger: "blur" },
        // ],
        // sort: [
        //   { required: true, message: "请输入序号", trigger: "blur" },
        //   { validator: checkSort, trigger: "blur" },
        // ],
      },
      workOrderHot: {
        mainClassId:"",
        subClassId: "",
        functionalModuleNum: "",
        problemName: "",
        problemHandling: "",
      },
    };
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear()
        this.info_ = null
      }
    },
    value: function(value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value)
      }
    }
    //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },
  mounted() {
    this.seteditor()
    this.editor.txt.html(this.value)
  },

  methods: {
    seteditor() {
      var _this = this;
      this.editor = new E(this.$refs.toolbar, this.$refs.editor);
      //隐藏插入网络图片的功能
      this.editor.config.showLinkImg = false;
      //一次最多上传10张
      this.editor.config.uploadImgMaxLength = 5;
      this.editor.config.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
      this.editor.config.customUploadImg = (resultFiles, insertImgFn) => {
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法
        // 上传图片，返回结果，将图片插入到编辑器中
        for (var i = 0; i < resultFiles.length; i++) {
          let formData = new FormData();
          formData.append("file", resultFiles[i]);
          if (formData != null) {
                    if (validate.checkForbiddenWordForm(JSON.stringify(formData))) {
                      _this.$message({
                        showClose: true,
                        message: "不允许有特殊字符",
                        type: "error",
                      });
                      return;
                    }
          }
          _this.$api.post( this.$apis.manage+"/manage/workorder/hot/uploadImg", formData,
            function (res) {
              console.log(res);
              if (res.success) {
                // alert(res.data);
                insertImgFn(res.data);
              } else {
                _this.$message({
                  message: "上传失败," + res.errorMsg,
                  type: "error",
                });
              }
            }
          );
        }
      }
      // this.editor.config.uploadImgServer = "/api/upload-img";
      this.editor.create()
    },
    update(workOrderId,statue){
      // let _this = this;
      // _this.workOrderUser.workOrderId = workOrderId;
      // _this.workOrderUser.statue = statue;
      // let updateUrl = _this.$apis.manage + "/manage/workorder/userinfo/updateWorkOrderUser";
      // _this.$api.post(
      //   updateUrl,
      //   _this.workOrderUser,
      //   function(res){
      //     if(res.success){
      //       _this.$message({
      //         message: "处理完成",
      //         type: "success",
      //       });
      //     }else{
      //       _this.$message({
      //         message: "修改失败," + res.errorMsg,
      //         type: "error",
      //       });
      //     }
      //   }
      // );
    },
    addSubmit(form){
      let _this = this;
      let urlHot = _this.$apis.manage+"/manage/workorder/hot/saveWorkOrderHot";
      // alert(_this.tableData.problemHandling);
      let content = _this.editor.txt.html();
      if(content.trim() == ""){
        _this.$message({
          message: '请输入内容',
          type: 'error'
        });
        return false;
      }
      _this.$refs[form].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
          // alert(_this.workOrderHot.problemHandling);
          _this.workOrderHot.mainClassId = _this.addPageData.mainClassId;
          _this.workOrderHot.subClassId = _this.addPageData.subClassId;
          _this.workOrderHot.functionalModuleNum = _this.addPageData.subClassId;
          _this.workOrderHot.problemName = _this.tableData.problemName;
          _this.workOrderHot.problemHandling = content;
          if (_this.workOrderHot != null) {
                    if (validate.checkForbiddenWordForm(JSON.stringify(_this.workOrderHot))) {
                      _this.$message({
                        showClose: true,
                        message: "不允许有特殊字符",
                        type: "error",
                      });
                      return;
                    }
          }
          _this.$api.post(
            urlHot,
            _this.workOrderHot,
            function(res){
              if(res.success){
                _this.$message({
                  message: "保存成功",
                  type: "success",
                });
                _this.$emit("back");
                // _this.update(_this.workOrderHot.workOrderId,"2");
              }else{
                _this.$message({
                  message: "保存失败," + res.errorMsg,
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
      //关闭抽屉
      // this.$refs[formName].resetFields();
      this.$emit("back");
    },
  },
};
</script>

<style lang="less">
  .xxrdgdwt .text {
    border: 1px solid rgb(236, 236, 236);
  }
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
