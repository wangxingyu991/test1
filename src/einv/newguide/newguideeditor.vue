<template>
  <div class="drawer-wrap" v-loading="showLoading" >
    <div class="rh-drawer-head">
      <div class="drawer-title">新手指导信息</div>
    </div>
    <div class="rh-drawer-body">
      <div>
          <el-form ref="operatorForm" :model="operatorForm" :rules="rules" :inline="true" label-width="55px" label-position="right">
              <el-form-item label="标题" prop="title">
                  <el-input v-model.trim="operatorForm.title"  placeholder="请输入标题" style="width:600px;" maxlength="100"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="save">保 存</el-button>
              </el-form-item>
          </el-form>
      </div>
      <div class="editor">
          <div ref="toolbar" class="toolbar">
          </div>
          <div ref="editor" class="text" style="height:500px">
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  import myauth from "@/utils/auth.js";
  import validate from "@/utils/validate.js";
  export default {
    name: 'editoritem',
    props: ["newguideinfo"],
    data() {
      return {
        showLoading: false,
        // uploadPath,
        editor: null,
        info_: null,
        operatorForm:{title:""},
        rules: {
          title:[{required:true,message:'请输入标题',trigger:'blur'}]
        },
      }
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
      this.seteditor();
    },
    created(){
      var _this  = this;
      if(_this.newguideinfo.newGuideId != null && _this.newguideinfo.newGuideId != undefined){
        _this.showLoading = true;
        _this.$api.get( this.$apis.manage+"/rest/manage/newguide/getbyid/"+_this.newguideinfo.newGuideId, {},
          function (res) {
            _this.showLoading = false;
            if (res.success) {
              _this.editor.txt.html(res.data.content);
              _this.operatorForm.title = res.data.title;  
            } else {
              _this.$message({
                message: "查询失败," + res.errorMsg,
                type: "error",
              });
            }
          }
        );
      }
    },
    methods: {
      seteditor() {
        var _this = this;
        this.editor = new E(this.$refs.toolbar, this.$refs.editor);
        //隐藏插入网络图片的功能
        this.editor.config.showLinkImg = false
          // this.editor.config.uploadImgShowBase64 = true;
        // this.editor.config.uploadImgServer = this.$apis.manage+"/rest/manage/newguide/uploadimg";
        // this.editor.config.uploadFileName = 'file';//参数名字
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
            _this.$api.post( this.$apis.manage+"/rest/manage/newguide/uploadimg", formData,
              function (res) {
                console.log(res);
                if (res.success) {
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
        };
      //  this.editor.config.uploadImgHooks = {
      //     // 上传图片之前
      //     before: function(xhr) {
      //     },
      //     // 图片上传并返回了结果，图片插入已成功
      //     success: function(xhr) {
      //         console.log('success', xhr)
      //     },
      //     // 图片上传并返回了结果，但图片插入时出错了
      //     fail: function(xhr, editor, resData) {
      //         console.log('fail', resData)
      //     },
      //     // 上传图片出错，一般为 http 请求的错误
      //     error: function(xhr, editor, resData) {
      //         console.log('error', xhr, resData)
      //     },
      //     // 上传图片超时
      //     timeout: function(xhr) {
      //         console.log('timeout')
      //     },
      //     // 图片上传并返回了结果，想要自己把图片插入到编辑器中
      //     // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
      //     customInsert: function(insertImgFn, result) {
      //         // result 即服务端返回的接口
      //         console.log('customInsert', result)
      //         // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
      //         insertImgFn(result.data[0])
      //     }
      //   }
        this.editor.create()
      },
      save(){
        var _this = this;
        _this.$refs.operatorForm.validate((valid) => {
          if(valid){
            var content = _this.editor.txt.html();
            if(content.trim() == ""){
                _this.$message({
                  message: '请输入内容',
                  type: 'error'
                });
            }else{
              if(_this.newguideinfo.newGuideId != null && _this.newguideinfo.newGuideId != undefined){
                var params = {
                    newGuideId:this.newguideinfo.newGuideId,
                    content: content,
                    title: _this.operatorForm.title
                };
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
                _this.showLoading = true;
                _this.$api.post(_this.$apis.manage + "/rest/manage/newguide/updatenewguide", params, function (res) {
                    _this.showLoading = false;
                    if (res.success == true) {
                      _this.$message({
                        message: '修改成功',
                        type: 'success'
                      });
                      _this.$emit("back");
                      _this.$emit("reload"); 
                    } else {
                      _this.$message({
                      message: '保存失败,' + res.errorMsg,
                      type: 'error'
                      });
                    }
                })
              }else{
                var params = {
                    content: content,
                    title: _this.operatorForm.title
                };
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
                _this.$api.post(_this.$apis.manage + "/rest/manage/newguide/savenewguide", params, function (res) {
                    if (res.success == true) {
                      _this.$message({
                        message: '保存成功',
                        type: 'success'
                      });
                      _this.$emit("back");
                      _this.$emit("reload"); 
                    } else {
                      _this.$message({
                      message: '保存失败,' + res.errorMsg,
                      type: 'error'
                      });
                    }
                })
              }
            }
          }
        })
      }
    }
  }
</script>

<style lang="css" scoped>
  .text {
    border: 1px solid rgb(236, 236, 236);
  }
</style>