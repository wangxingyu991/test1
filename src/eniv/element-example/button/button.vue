
<template>
      <div class="rh-page-content">
            <div class="card" v-show="false">
                  <el-divider>element块状按钮（）</el-divider>
                  <el-row>
                        <el-button >element默认按钮</el-button>
                        <el-button type="primary">element主要按钮</el-button>
                        <el-button type="success">element成功按钮</el-button>
                        <el-button type="info">element信息按钮</el-button>
                        <el-button type="warning">element警告按钮</el-button>
                        <el-button type="danger">element危险按钮</el-button>
                  </el-row>
                  <el-divider>element朴素按钮</el-divider>
                  <el-row>
                  <el-button plain>element朴素按钮</el-button>
                  <el-button type="primary" plain>element主要按钮</el-button>
                  <el-button type="success" plain>element成功按钮</el-button>
                  <el-button type="info" plain>element信息按钮</el-button>
                  <el-button type="warning" plain>element警告按钮</el-button>
                  <el-button type="danger" plain>element危险按钮</el-button>
                  </el-row>
                  <el-divider>圆角按钮</el-divider>
                  <el-row>
                  <el-button round>element圆角按钮</el-button>
                  <el-button type="primary" round>element主要按钮</el-button>
                  <el-button type="success" round>element成功按钮</el-button>
                  <el-button type="info" round>element信息按钮</el-button>
                  <el-button type="warning" round>element警告按钮</el-button>
                  <el-button type="danger" round>element危险按钮</el-button>
                  </el-row>
                  <el-divider>element图标按钮</el-divider>
                  <el-row>
                        <el-button icon="el-icon-search">element搜索</el-button>
                        <el-button type="primary" icon="el-icon-edit" circle>element编辑</el-button>
                        <el-button type="success" icon="el-icon-check" circle>element通过</el-button>
                        <el-button type="info" icon="el-icon-message" circle>element信息</el-button>
                        <el-button type="warning" icon="el-icon-star-off" circle>element关注</el-button>
                        <el-button type="danger" icon="el-icon-delete" circle>element移除</el-button>
                  </el-row>
            </div>
            <div class="card">
                  <el-divider>rh-button块状按钮</el-divider>
                  <el-row>
                        <el-button class="rh-button" >默认按钮</el-button>
                        <el-button class="rh-button" disabled type="primary">主要按钮</el-button>
                        <el-button class="rh-button" type="success">成功按钮</el-button>
                        <el-button class="rh-button" type="info">信息按钮</el-button>
                        <el-button class="rh-button" type="warning">警告按钮</el-button>
                        <el-button class="rh-button" type="danger">危险按钮</el-button>
                  </el-row>

                  <el-divider>rh-button朴素按钮</el-divider>
                  <el-row>
                        <el-button class="rh-button" plain>朴素按钮</el-button>
                        <el-button class="rh-button" type="primary" plain>主要按钮</el-button>
                        <el-button class="rh-button" type="success" plain>成功按钮</el-button>
                        <el-button class="rh-button" type="info" plain>信息按钮</el-button>
                        <el-button class="rh-button" type="warning" plain>警告按钮</el-button>
                        <el-button class="rh-button" type="danger" plain>危险按钮</el-button>
                  </el-row>

                  <el-divider>rh-button图标按钮</el-divider>
                  <el-row>
                        <el-button class="rh-button"  type="primary" icon="el-icon-search">搜索</el-button>
                        <el-button class="rh-button" type="primary" icon="el-icon-edit" >自定义</el-button>
                        <el-button class="rh-button" type="primary" icon="el-icon-plus" >新建</el-button>
                        <el-button class="rh-button" icon="el-icon-check" >选择</el-button>
                        <el-button class="rh-button" icon="el-icon-message" >发送邮箱</el-button>
                        <el-button class="rh-button" icon="el-icon-star-off" >想关注</el-button>
                        <el-button class="rh-button" icon="el-icon-delete">删除按钮</el-button>
                  </el-row>
                  <el-divider>tooltips提示信息按钮</el-divider>
                  <el-row>
                        <div class="pull-left">
                              <el-tooltip class="item" effect="dark" content='请选择一台或多台需要开机的云端服务器'>
                                    <el-button class="rh-button">开机</el-button>
                              </el-tooltip>
                              <el-tooltip class="item" effect="dark" content='请选择一台或多台需要关机的云端服务器'>
                                    <el-button class="rh-button">关机</el-button>
                              </el-tooltip>
                              <el-tooltip class="item" effect="dark" content='请选择一台或多台需要关机的云端服务器'>
                                    <el-button disabled class="rh-button">重置密码</el-button>
                              </el-tooltip>
                              <el-tooltip content="请单击选择个下拉菜单" placement="top">

                                    <el-dropdown trigger="click">
                                          <el-button class="rh-button">
                                                下拉菜单 <i class="el-icon-caret-bottom el-icon-right"></i> 
                                          </el-button>
                                          <el-dropdown-menu slot="dropdown" >
                                                <el-tooltip class="item" effect = "dark" content = "请选择一个网络服务器" placement="right">
                                                      <el-dropdown-item>重启</el-dropdown-item>
                                                </el-tooltip>
                                                <el-dropdown-item>删除</el-dropdown-item>
                                                <el-dropdown-item>转包周期</el-dropdown-item>
                                                <el-dropdown-item>续费</el-dropdown-item>
                                                <el-dropdown-item>修改名称</el-dropdown-item>
                                                <el-dropdown-item>修改带宽</el-dropdown-item>
                                                <el-dropdown-item>退订</el-dropdown-item>
                                          </el-dropdown-menu>
                                    </el-dropdown>
                              </el-tooltip>
                        </div>
                        <div class="pull-right">
                              <el-tooltip class="item" effect = "dark" content = "刷新" placement="top">
                                    <el-button class="rh-iconBtn" icon="el-icon-refresh-right"></el-button>
                              </el-tooltip>
                              <el-tooltip class="item" effect = "dark" content = "设置" placement="top">
                                    <el-button class="rh-iconBtn" icon="el-icon-setting"></el-button>
                              </el-tooltip>
                              <el-tooltip class="item" effect = "dark" content = "导出弹性云服务器列表" placement="top">
                                    <el-button class="rh-iconBtn" icon="el-icon-setting"></el-button>
                              </el-tooltip>
                              <el-tooltip class="item" effect = "dark" content = "精简视图" placement="top">
                                    <el-button class="rh-iconBtn" disabled icon="el-icon-c-scale-to-original"></el-button>
                              </el-tooltip>
                              <el-tooltip class="item" effect = "dark" content = "列表视图" placement="top">
                                    <el-button class="rh-iconBtn"  icon="el-icon-document"></el-button>
                              </el-tooltip>                              
                        </div>
                  </el-row>
            </div>
            <div class="card" v-show="false">
                  <el-divider>larger按钮</el-divider>
                  <el-row>
                        <el-button size="large">默认按钮</el-button>
                        <el-button size="large" type="primary" >主要按钮</el-button>
                        <el-button size="large" type="success">成功按钮</el-button>
                        <el-button size="large" type="info">信息按钮</el-button>
                        <el-button size="large" type="warning">警告按钮</el-button>
                        <el-button size="large" type="danger">危险按钮</el-button>
                  </el-row>
                  <el-divider>medium按钮</el-divider>
                  <el-row>
                        <el-button size="medium">默认按钮</el-button>
                        <el-button size="medium" type="primary">主要按钮</el-button>
                        <el-button size="medium" type="success">成功按钮</el-button>
                        <el-button size="medium" type="info">信息按钮</el-button>
                        <el-button size="medium" type="warning">警告按钮</el-button>
                        <el-button size="medium" type="danger">危险按钮</el-button>
                  </el-row>

                  <el-divider>small按钮</el-divider>
                  <el-row>
                        <el-button size="small">默认按钮</el-button>
                        <el-button size="small" type="primary">主要按钮</el-button>
                        <el-button size="small" type="success">成功按钮</el-button>
                        <el-button size="small" type="info">信息按钮</el-button>
                        <el-button size="small" type="warning">警告按钮</el-button>
                        <el-button size="small" type="danger">危险按钮</el-button>
                  </el-row>

                  <el-divider>mini按钮</el-divider>
                  <el-row>
                        <el-button size="mini" >默认按钮</el-button>
                        <el-button size="mini" type="primary">主要按钮</el-button>
                        <el-button size="mini" type="success">成功按钮</el-button>
                        <el-button size="mini" type="info">信息按钮</el-button>
                        <el-button size="mini" type="warning">警告按钮</el-button>
                        <el-button size="mini" type="danger">危险按钮</el-button>
                  </el-row>
            </div>
            <div class="card">
                  <el-divider>radio_button单选按钮系列</el-divider>
                  <el-row>
                        <el-radio-group v-model='radio'>
                              <el-radio-button  class="rh-radio-button" label="自定义网络"></el-radio-button>
                              <el-radio-button class="rh-radio-button" label="自定义网络ACL"></el-radio-button>
                              <el-radio-button class="rh-radio-button" label="自定义网络22"></el-radio-button>
                        </el-radio-group>
                  </el-row>
                  <el-divider>tab按钮系列</el-divider>
                  <el-row style="text-align:center">
                        <div class="tabs-wrap">
                              <el-tabs v-model="activeName" @tab-click="handleClick" class="rh-tabs" size="mini">
                                    <el-tab-pane label="金属服务器" name="first">
                                          <div class="info">通过创建自定义网络，使得裸金属服务器的自定义网络和vpc互通；通过创建自定义网络ACL，进行对子网的访问控制。了解更多</div>
                                          <p>1、开通回收站功能后，删除的磁盘将放入到回收站中最多保存7天，以防止误操作导致数据丢失。您可以从回收站内恢复或彻底销毁已删除的磁盘。</p>
                                          <p>2、在公测期间，可免费使用磁盘回收站功能。</p>
                                          <el-row style="padding-top:20px;">
                                                <el-button class="rh-button" type="danger">申请公测</el-button>
                                          </el-row>
                                    </el-tab-pane>
                                    <el-tab-pane label="自定义网络" name="second">
                                          <div class="info">通过创建自定义网络，使得裸金属服务器的自定义网络和vpc互通；通过创建自定义网络ACL，进行对子网的访问控制。了解更多</div>
                                          <p>1、开通回收站功能后，删除的磁盘将放入到回收站中最多保存7天，以防止误操作导致数据丢失。您可以从回收站内恢复或彻底销毁已删除的磁盘。</p>
                                          <p>2、在公测期间，可免费使用磁盘回收站功能。</p>
                                          <el-row style="padding-top:20px;">
                                                <el-button class="rh-button" type="danger">申请公测</el-button>
                                          </el-row>
                                    </el-tab-pane>
                                    <el-tab-pane label="自定义软件服务" name="third">
                                          <div class="info">22222222222222222222222222222222通过创建自定义网络，使得裸金属服务器的自定义网络和vpc互通。了解更多</div>
                                          <p>1、开通回收站功能后，删除的磁盘将放入到回收站中最多保存7天，以防止误操作导致数据丢失。您可以从回收站内恢复或彻底销毁已删除的磁盘。</p>
                                          <p>2、在公测期间，可免费使用磁盘回收站功能。</p>
                                          <el-row style="padding-top:20px;">
                                                <el-button class="rh-button" type="danger">申请公测</el-button>
                                          </el-row>
                                    </el-tab-pane>
                              </el-tabs>
                        </div>
                  </el-row>
            </div>
      </div>
</template>

<script>
export default {
      name:'Button',
          data(){
              return{
                  radio:'',
                  activeName:'first'
              }
          },
      components:{
            //Form_button
      },
      methods:{
            handleClick:function(tab,event){
                  console.log(event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling);
                  //tab节点查找el-tabs__content节点
                  // event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.transform="translateX("+tab.index*(-100)+"%)";
                  event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.transform="translateX("+tab.index*(-100)+"%)";
            }
      }
}
</script>

<style scoped>
      .el-tabs__content{
            overflow: inherit;
      }
      .tabs-wrap{
            width:100%;
            overflow: hidden;
      }
</style>