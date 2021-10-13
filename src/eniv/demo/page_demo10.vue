<template>
  <div class="editor">
    <div ref="toolbar" class="toolbar">
    </div>
    <div ref="editor" class="text" style="height:500px"
    >
    </div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  export default {
    name: 'editoritem',
    data() {
      return {
        // uploadPath,
        editor: null,
        info_: null
      }
    },
    mounted() {
      this.seteditor()
      this.editor.txt.html(this.value)
    },
    methods: {
      seteditor() {
        this.editor = new E(this.$refs.toolbar, this.$refs.editor);
        this.editor.config.uploadImgServer = "/api/upload-img";
        this.editor.create()
      }
    }
  }
</script>

<style lang="less" scoped>
  .text {
    border: 1px solid rgb(236, 236, 236);
  }
</style>