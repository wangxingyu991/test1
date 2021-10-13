<template>
  <div class="drawer-wrap">
    <div class="rh-drawer-head">
      <div class="drawer-title">新增产品信息</div>
    </div>
    <div class="rh-drawer-body">
      <div class="tabs-wrap">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="rh-tabs" size="mini">
          <el-tab-pane label="基本信息" name="0">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="right">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="产品名称" prop="productName">
                    <el-input v-model="form.productName" placeholder="产品名称" maxlength="100"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="产品类别" prop="categoryId">
                    <el-select v-model="form.categoryId" placeholder="产品类别">
                      <el-option v-for="item in option_categoryName" :key="item.categoryId" :label="item.categoryName" :value="item.categoryId"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="产品简称" prop="productNameAbbr">
                    <el-input v-model="form.productNameAbbr" placeholder="产品简称" maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="系统标志" prop="systemFlag">
                    <el-select v-model="form.systemFlag" placeholder="系统标志">
                      <el-option v-for="item in option_system" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="关键字" prop="keywords">
                    <el-input v-model="form.keywords" placeholder="关键字" maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="产品描述" prop="description">
                    <el-input type="textarea" v-model="form.description" placeholder="产品描述"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="排序" prop="sort">
                    <el-input v-model="form.sort" placeholder="排序" maxlength="10"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="产品图片" prop="fileName">
                    <span style="color:red">上传图片大小不能超过 1MB，名字不能包含特殊字符！</span>
                    <el-upload action="1" list-type="picture-card" ref="upload" :limit="1" accept="image/jpeg,image/gif,image/png" :multiple="false" :on-change="handleFileUpload"
                      :file-list="this.fileList" :auto-upload="false">
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
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="备注" prop="sparefield">
                    <el-input type="textarea" v-model="form.sparefield" placeholder="备注"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="详情" name="1">
            <div>
              <el-form ref="operatorForm" :model="operatorForm" :inline="true" label-width="45px" label-position="right">
                <el-form-item label="标题" prop="title">
                  <el-input v-model="operatorForm.title" placeholder="请输入标题" style="width:500px;"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="editor">
              <div ref="toolbar" class="toolbar">
              </div>
              <div ref="editor" class="text" style="height:400px">
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="rh-dialog-footer">
      <el-button @click="addSubmit('form')" :loading="loading">保存</el-button>
      <el-button @click="close('form')">关闭</el-button>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
import validate from "@/utils/validate.js";
export default {

  data() {
    var checkSort = (rule, value, callback) => {
      const reg = /^[0-9]*$/;
      if (!reg.test(value)) {
        callback(new Error("排序只能是数字"));
      } else {
        callback();
      }
    };
    var isEmpty = (rule, value, callback) => {
      const regu = "^[ ]+$";
      var re = new RegExp(regu);
      if (typeof value == "undefined" || value == null || value == "" || re.test(value)) {
        callback(new Error("产品名称不能为空"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      //下拉产品类别
      option_categoryName: [],
      activeName: '0',
      //下拉系统标志
      option_system: [],
      form: {
        productName: "",
        categoryId: "",
        productNameAbbr: "",
        systemFlag: "",
        keywords: "",
        description: "",
        sort: "",
        sparefield: "",
        fileBase64: "",
        fileName: "",
      },
      operatorForm: {
        title: ""
      },
      editor: null,
      info_: null,
      //校验规则
      rules: {
        productName: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          { validator: isEmpty, trigger: "blur" },
        ],
        systemFlag: [
          { required: true, message: "请选择系统标志", trigger: "blur" },
        ],
        categoryId: [
          { required: true, message: "请选择产品类别", trigger: "blur" },
        ],
        sort: [
          { required: true, message: "请输入序号", trigger: "blur" },
          { validator: checkSort, trigger: "blur" },
        ],
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
    value: function (value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value)
      }
    }
    //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },

  mounted() {
    this.getCategoryName();
    this.getSort();
    this.seteditor();
  },

  created() {
  },

  methods: {

    seteditor() {
      var _this = this;
      this.editor = new E(this.$refs.toolbar, this.$refs.editor);
      //隐藏插入网络图片的功能
      this.editor.config.showLinkImg = false
      // this.editor.config.uploadImgShowBase64 = true;
      // this.editor.config.uploadImgServer = this.$apis.manage+"/rest/manage/notice/uploadimg";
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
          _this.$api.post(this.$apis.manage + "/manage/product/info/uploadImg", formData,
            function (res) {
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
      this.editor.create()
    },

    //tab页点击事件
    handleClick: function (tab, event) {
      //tab节点查找el-tabs__content节点
      event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.transform =
        "translateX(" + tab.index * -100 + "%)";
    },

    //获取默认排序
    getSort() {
      let _this = this;
      _this.$api.get(
        _this.$apis.manage + "/manage/product/info/getSort",
        {},
        function (res) {
          if (res.success) {
            _this.form.sort = res.data;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //图片上传
    handleFileUpload(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 1MB!");
        this.$refs.upload.clearFiles();
        return false;
      }
      this.form.fileName = file.name;
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
      this.getBase64(file.raw)
        .then((res) => {
          this.form.fileBase64 = res;
          this.$refs["form"].validateField("fileName");
        })
        .catch((e) => {
          console.log(e);
        });
      if (fileList.length >= 1) {
        //添加一个图片后隐藏图片添加
        $(".el-upload--picture-card").css("display", "none");
      }
    },
    //图片转bas64
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },
    //移除图片
    handleRemove(file) {
      this.fileList = [];
      this.dialogImageUrl = "";
      //移除图片后显示图片添加
      $(".el-upload--picture-card").css("display", "block");
    },
    //图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //获取下拉数据
    getCategoryName() {
      let _this = this;
      _this.$api.post(
        _this.$apis.manage + "/manage/product/info/getCategoryName",
        { productId: '' },
        function (res) {
          if (res.success) {
            _this.option_categoryName = res.data.categoryList;
            _this.form.categoryId = res.data.categoryList[0].categoryId;
            _this.option_system = res.data.systemList;
          } else {
            _this.$message({
              message: res.errorMsg,
              type: "error",
            });
          }
        }
      );
    },

    //关闭
    close(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      this.fileList = [];
      this.dialogImageUrl = "";
      //关闭抽屉
      this.$emit("back");
    },

    //表单提交
    addSubmit(formName) {
      let _this = this;
      var content = _this.editor.txt.html();
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
          _this.loading = true;
          let addparams = _this.form;
          _this.$set(addparams, "detailsWebContent", content);
          _this.$set(addparams, "detailsDescTitle", _this.operatorForm.title);
          if (addparams != null) {
            if (validate.checkForbiddenWordForm(JSON.stringify(addparams))) {
              _this.$message({
                showClose: true,
                message: "不允许有特殊字符",
                type: "error",
              });
              return;
            }
          }
          _this.$api.post(
            _this.$apis.manage + "/manage/product/info/saveProductInfo",
            addparams,
            function (res) {
              if (res.success) {
                _this.$message({
                  message: "保存成功",
                  type: "success",
                });
                _this.loading = false;
                //关闭抽屉
                _this.$emit("back");
                //清空表单为下次使用
                _this.resetForm(formName);
              } else {
                _this.loading = false;
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