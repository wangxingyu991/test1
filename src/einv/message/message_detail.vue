<style  lang="less">
  .message-template{
      padding:20px 20px;
      .ms-title{
        font-size: 24px;
        font-weight: 700;
        line-height:34px;
      }
      .ms-subtitle{
        font-size: 14px;
        color:#CCC;
        line-height:24px;
      }
      .ms-header{
        background: #000;
        padding:20px 10px;
        color:#FFF;
        margin-top:15px;
        .log{
            float: left;
            margin-top: 8px;
            padding: 0px 10px;
            img{
              width:20px;
            }
        }
        .produce-name{
          float:left;
          font-size: 24px;
          font-weight: 700;
          color:rgb(27, 133, 255);
        }
      }
      .ms-content{
          color: #000;
          padding: 20px 15px;
          font-size: 14px;
          line-height: 24px;
      }
      .ms-footer{
        background: #000;
        padding:20px 20px;
        font-size:20px;
        .ms-fo-header{
          color:#FFF;
          .blue{
            color:rgb(19, 153, 243);
          }
        }
      }
  }
</style>
<template>
    <div class="message-template">
        <div class="ms-title">{{detailData.title}}</div>
        <div class="ms-subtitle">发布于{{detailData.createTime}}|{{detailData.messageCateName}}</div>
        <div class="ms-header">
          <div class="log"><img src="../../assets/logo.png" alt=""></div>
          <div class="produce-name">瑞宏云</div>
          <div class="clear"></div>
        </div>
        <div class="ms-content">
            <p>{{detailData.content}}</p>
        </div>
        <div class="ms-footer">
          <div class="ms-fo-header">瑞宏云| <span class="blue">+</span>智</div>
        </div>
    </div>
    
</template>

<script>
export default {
  props: ["detailData"]
}
</script>

<style>

</style>