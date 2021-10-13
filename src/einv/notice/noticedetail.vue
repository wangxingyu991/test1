<style lang="less">
    .editor-head{
            font-size: 24px;
            font-weight: 800;
            text-align: center;
            line-height: 63px;
    }
</style>
<template>
  <div class="drawer-wrap" v-loading="showLoading" >
    <div class="rh-drawer-head">
      <div class="drawer-title" >通知公告信息</div>
    </div>
    <div class="rh-drawer-body">
        <div class="editor-head" v-html="title">
            <!-- {{title}} -->
        </div>    
        <div v-html="content">
            <!-- {{content}} -->
        </div>    
    </div>
  </div>
</template>

<script>
  export default {
    name: 'editoritem',
    props: ["noticeinfo"],
    data() {
      return {
          title:"",
          content:"",
          showLoading:false
      }
    },
    mounted() {
    },
    created(){
      var _this  = this;
      if(_this.noticeinfo.notifyId != null && _this.noticeinfo.notifyId != undefined){
        _this.$api.get( this.$apis.manage+"/rest/manage/notice/getbyid/"+_this.noticeinfo.notifyId, {},
          function (res) {
            if (res.success) {
              _this.title = res.data.title;  
              _this.content = res.data.content;
            //   document.getElementById('title').innerHTML =   res.data.title; 
            //   document.getElementById('content').innerHTML =   res.data.content; 
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
    }
  }
</script>