<style lang="less">
      .rh-page-hint{
            display: flex;
            background: #f2f5fc;
            border:1px solid #5e7ce0;
            justify-content: space-between;
            border-radius: 2px;
            .page-hint-content{
                  display: flex;
                  padding:12px 16px;
                  .page-hint-icon{
                        font-size: 24px;
                        // margin-top: 20px;
                        margin-left: 0px;
                        color:#5e7ce0;
                        height: 24px;
                  }
                  .page-hint-text{
                        font-size: 12px;
                        // margin-top: 26px;
                        margin-left: 10px;
                        line-height: 26px;
                  }
            }
            .operate-bts{
                  padding:0px;
                  .bt-close{
                    padding-right: 14px;
                    font-size: 16px;
                    cursor: pointer;
                    padding-top: 17px;
                  }
            }
      }
</style>
<template>
  <div class="rh-page-content">
        <div class="rh-page-hint" v-show="HintShow">
              <div class="page-hint-content">
                    <span class="page-hint-icon">
                          <i class="el-icon-info"></i>
                    </span>
                    <span class="page-hint-text">
                          我的资源当前仅支持如下服务类型及区域的查询，更多服务及区域持续上线中。
                    </span>
              </div>
              <div class="operate-bts">
                    <div class="bt-close" @click="HintShow=false"><i class="el-icon-close"></i></div>
              </div>
        </div>
  </div>
</template>

<script>
export default {
      data(){
          return{
            HintShow:true
          }
      }
}
</script>

<style>

</style>