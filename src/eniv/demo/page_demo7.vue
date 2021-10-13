<style lang="less">
    @import url('./home.less');
</style>
<template>
  <div class="homeWrap">
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
        <div class="bt-close" @click="HintShow = false">
          <i class="el-icon-close"></i>
        </div>
      </div>
    </div>
    <div class="space14"></div>
    <div class="rh-page-content">
      <div class="tabs-wrap">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          class="rh-tabs"
          size="mini"
        >
          <el-tab-pane label="我的控制台" name="first">
            <div class="tab-item-wrap">
                <div class="box-item-wrap">
                    <div class="box-item-section w70">
                        <div class="box-item-content">
                          <div class="page-title home">我的企业</div>
                          <div class="item-content" style="width:80%;margin:0 auto;">
                              <div class="it-bar">
                                <div class="icon left">
                                    <i class="el-icon-star-off"></i>
                                </div>
                                <div class="text right">
                                    <div class="name">纳税人数量</div>
                                    <div class="number fontS24 ff-abc" >5万户</div>
                                </div>
                                <div class="clear"></div>
                              </div>
                              <div class="it-bar">
                                <div class="icon left">
                                    <i class="el-icon-star-off"></i>
                                </div>
                                <div class="text right">
                                    <div class="name">纳税人数量</div>
                                    <div class="number fontS24 ff-abc" >5万户</div>
                                </div>
                                <div class="clear"></div>
                              </div>
                              <div class="it-bar">
                                <div class="icon left">
                                    <i class="el-icon-star-off"></i>
                                </div>
                                <div class="text right">
                                    <div class="name">纳税人数量</div>
                                    <div class="number fontS24 ff-abc" >5万户</div>
                                </div>
                                <div class="clear"></div>
                              </div>
                              <div class="it-bar">
                                <div class="icon left">
                                    <i class="el-icon-star-off"></i>
                                </div>
                                <div class="text right">
                                    <div class="name">纳税人数量</div>
                                    <div class="number fontS24 ff-abc" >5万户</div>
                                </div>
                                <div class="clear"></div>
                              </div>
                               <div class="clear"></div>
                              <div class="it-bar">
                                <div class="icon left">
                                    <i class="el-icon-star-off"></i>
                                </div>
                                <div class="text right">
                                    <div class="name">纳税人数量</div>
                                    <div class="number fontS24 ff-abc" >5万户</div>
                                </div>
                                <div class="clear"></div>
                              </div>
                              <div class="it-bar">
                                <div class="icon left">
                                    <i class="el-icon-star-off"></i>
                                </div>
                                <div class="text right">
                                    <div class="name">纳税人数量</div>
                                    <div class="number fontS24 ff-abc" >5万户</div>
                                </div>
                                <div class="clear"></div>
                              </div>
                              <div class="it-bar">
                                <div class="icon left">
                                    <i class="el-icon-star-off"></i>
                                </div>
                                <div class="text right">
                                    <div class="name">纳税人数量</div>
                                    <div class="number fontS24 ff-abc" >5万户</div>
                                </div>
                                <div class="clear"></div>
                              </div>
                              <div class="it-bar">
                                <div class="icon left">
                                    <i class="el-icon-star-off"></i>
                                </div>
                                <div class="text right">
                                    <div class="name">纳税人数量</div>
                                    <div class="number fontS24 ff-abc" >5万户</div>
                                </div>
                                <div class="clear"></div>
                              </div>
                              <div class="clear"></div>
                          </div>
                        </div>
                    </div>
                    <div class="box-item-section w30">
                        <div class="box-item-content right">
                          <div class="top">
                              <div class="thumb left">
                                  <img src="../../assets/logo.png" alt="">
                              </div>
                              <div class="info right">
                                  <span class="p">上午好</span>
                                  <span class="userNumber">登录账号:18615218892</span>
                                  <span class="text">
                                    您当前未实名，<span class="link">点击这里</span>进行实名认证
                                  </span>
                              </div>
                          </div>
                          <div class="bottom">
                           <table>
                             <tr>
                               <td class="align-right">当前机构名称：</td>
                               <td>山东新华书店集团有限公司济南分公司</td>
                             </tr>
                             <tr>
                               <td class="align-right">机构号码：</td>
                               <td>91500000000747150305B</td>
                             </tr>
                           </table>
                          </div>
                        </div>
                    </div>
                      <div class="box-item-section w70">
                        <div class="box-item-content">
                          <div class="page-title">云产品</div>
                          <div class="item-content">
                              <div class="item-card">
                                <div class="margin">
                                  <div class="item-title">销项发票管理产品</div>
                                  <div class="p-context">
                                    <p>提供销项基础版和销项专业版</p>
                                    <p>全票种\全设备\全场景开票新体验</p>
                                  </div>
                                  <div class="bt-group">
                                    <el-button type="danger">立即购买</el-button>
                                  </div>
                                </div>
                              </div>
                              <div class="item-card">
                                <div class="margin">
                                  <div class="item-title">销项发票管理产品</div>
                                  <div class="p-context">
                                    <p>提供销项基础版和销项专业版</p>
                                    <p>全票种\全设备\全场景开票新体验</p>
                                  </div>
                                  <div class="bt-group">
                                    <el-button type="primary">立即进入</el-button>
                                     <el-button >查看详情</el-button>
                                  </div>
                                </div>
                              </div>
                              <div class="item-card">
                                <div class="margin">
                                  <div class="item-title">销项发票管理产品</div>
                                  <div class="p-context">
                                    <p>提供销项基础版和销项专业版</p>
                                    <p>全票种\全设备\全场景开票新体验</p>
                                  </div>
                                  <div class="bt-group">
                                    <el-button type="primary">立即进入</el-button>
                                     <el-button >查看详情</el-button>
                                  </div>
                                </div>
                              </div>
                              <div class="item-card">
                                <div class="margin">
                                  <div class="item-title">销项发票管理产品</div>
                                  <div class="p-context">
                                    <p>提供销项基础版和销项专业版</p>
                                    <p>全票种\全设备\全场景开票新体验</p>
                                  </div>
                                  <div class="bt-group">
                                    <el-button type="primary">立即进入</el-button>
                                     <el-button >查看详情</el-button>
                                  </div>
                                </div>
                              </div>
                              <div class="clear"></div>
                          </div>
                        </div>
                    </div>
                    <div class="box-item-section w30">
                      <div class="box-item-content right">
                        <div class="head">
                            <div class="h-title">新手入门</div>
                            <div class="h-more">更多</div>
                            <div class="clear"></div>
                        </div>
                        <div class="content">
                            <ul>
                              <li>
                                <span class="icon">
                                  <i class="el-icon-document"></i>  
                                </span>
                                <span class="context">购买弹性可可扩展的ECS</span>
                              </li>
                              <li>
                                <span class="icon">
                                  <i class="el-icon-document"></i>  
                                </span>
                                <span class="context">购买弹性可可扩展的ECS</span>
                              </li>
                              <li>
                                <span class="icon">
                                  <i class="el-icon-document"></i>  
                                </span>
                                <span class="context">购买弹性可可扩展的ECS</span>
                              </li>
                              <li>
                                <span class="icon">
                                  <i class="el-icon-document"></i>  
                                </span>
                                <span class="context">购买弹性可可扩展的ECS</span>
                              </li>
                              <li>
                                <span class="icon">
                                  <i class="el-icon-document"></i>  
                                </span>
                                <span class="context">购买弹性可可扩展的ECS</span>
                              </li>
                            </ul>
                        </div>
                        <div class="head">
                            <div class="h-title">新手入门</div>
                            <div class="h-more">更多</div>
                            <div class="clear"></div>
                        </div>
                        <div class="content">
                            <ul>
                              <li>
                                <span class="icon">
                                  <i class="el-icon-document"></i>  
                                </span>
                                <span class="context">购买弹性可可扩展的ECS</span>
                              </li>
                              <li>
                                <span class="icon">
                                  <i class="el-icon-document"></i>  
                                </span>
                                <span class="context">购买弹性可可扩展的ECS</span>
                              </li>
                              <li>
                                <span class="icon">
                                  <i class="el-icon-document"></i>  
                                </span>
                                <span class="context">购买弹性可可扩展的ECS</span>
                              </li>
                              <li>
                                <span class="icon">
                                  <i class="el-icon-document"></i>  
                                </span>
                                <span class="context">购买弹性可可扩展的ECS</span>
                              </li>
                              <li>
                                <span class="icon">
                                  <i class="el-icon-document"></i>  
                                </span>
                                <span class="context">购买弹性可可扩展的ECS</span>
                              </li>
                            </ul>
                        </div>
                      </div>

                    </div>
                </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="企业服务管理" name="second">
              222222222222222
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      HintShow: true,
      activeName:'first'
    };
  },
  methods: {
    handleClick: function (tab, event) {
      console.log(tab, event);
      //tab节点查找el-tabs__content节点
      event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.transform =
        "translateX(" + tab.index * -100 + "%)";
      //console.log(event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling);
    },
  },
};
</script>