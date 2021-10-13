<style lang="less">
      .newguide{
            .bread-wrap{
                  padding:20px 0px;
                  padding-top:5px;
            }
            .rh-page-content{
                  min-height: 600px;
                  margin-bottom: 39px;
                  .dt-title{
                        font-size: 24px;
                        line-height: 52px;
                        text-align: center;
                        font-weight: 700;
                  }
                  .dt-time{
                        color: #9a9a9a;
                        text-align: center;
                        line-height: 32px;
                        font-size: 14px;
                  }
                  .dt-content{
                        p{
                              font-size: 14px;
                              line-height: 28px;
                              text-indent: 20px;
                              color: #000;
                              font-family: 微软雅黑;
                              margin-bottom:14px;
                        }
                  }
            }
      }
</style>
<template>
  <div class="newguide">
      <div class="bread-wrap">
            <el-breadcrumb separator="/">
                  <el-breadcrumb-item :to="{path:'/main/home'}">首页</el-breadcrumb-item>
                  <el-breadcrumb-item :to="{path:'/main/notice_list'}">通知公告</el-breadcrumb-item>
                  <el-breadcrumb-item>公告详情</el-breadcrumb-item>
            </el-breadcrumb>
      </div>

      <div class="rh-page-content">
            <div class="dt-title">{{title}}</div>
            <div class="dt-time">{{releaseTimeFull}}</div>
            <div class="dt-content" v-html="content">
            </div>
      </div>
  </div>
</template>

<script>
export default {
      data(){
            return{
                  title:'',
                  content:'',
                  releaseTimeFull:this.$route.params.releaseTimeFull
            }
      } ,
      methods:{
            handleClick:function(tab,event){
                  console.log(tab,event);
                  //tab节点查找el-tabs__content节点
                  event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.transform="translateX("+tab.index*(-100)+"%)";
                  //console.log(event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling);
            }
      },
      created(){
            var _this  = this;
            if(_this.$route.params.newGuideId != null && _this.$route.params.newGuideId != undefined){
            _this.$api.get( this.$apis.home+"/rest/home/newguide/getbyid/"+_this.$route.params.newGuideId, {},
                  function (res) {
                        if (res.success) {
                              _this.title = res.data.title;  
                              _this.content = res.data.content;
                        } else {
                        _this.$message({
                              message: "查询失败," + res.errorMsg,
                              type: "error",
                              });
                        }
                  });
            }
      }
}
</script>

<style>

</style>