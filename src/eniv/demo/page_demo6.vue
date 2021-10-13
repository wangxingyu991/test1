<style lang="less" scoped>
    .el-item-wrap{
        padding:0px 20px;
        .item-icon-text{
          display: flex;
          .left{
              flex-shrink: 0;
              width: 50px;
              line-height: 50px;
              text-align: center;
            .icon{
              font-size: 24px;
            }
          }
          .right{
            .title-name{
              font-size: 14px;
              font-weight: 700;
            }
            .detail-content{
              font-size: 12px;
            }
          }
        }
    }
    .collapse-wrap{
      padding:0px 15px;
        .name{
          cursor: pointer;
        }
    }
    .bar-wrap{
      .bar-item{
        width: 25%;
        float: left;
        input{
          visibility: hidden;
        }
        .row-bar{
          margin:0px 10px 10px 0px;
          &.selected{
            background: #5e6c79;
            color:#FFF;
          }
        }
        &:nth-child(4n){
          .row-bar{
            margin-right:0px;
          }
        };
      }

    }
    .bt-collapse{
      padding: 15px;
      width: 300px;
      height: 40px;
      display: flex;
      justify-content:space-between;
      background: #5e7ce0;
      color:rgb(255, 255, 255);
      float:right;
      cursor: pointer;
      .left{
        flex-shrink: 0;
      }
      .right{
        flex-shrink: 0;
        line-height: 50px;
        text-align: center;
        width:60px;
        i{
            color: #FFF;
            font-size: 35px;
            line-height: 45px;
        }
      }
    }
    .steps{
        margin-bottom: 0px;
        height: 26px;
        margin-top: 15px;
        background: #fff;
        padding: 15px;
    }
    .el-step__title {
      font-size: 16px;
      line-height: 38px;
    }
    .step-bt-group{
      text-align: center;
    }
</style>
<template>
  <div>
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
          <span class="rh-helpTip-text"> 新建工单 </span>
          <span class="rh-helpTip-icon">
            <el-tooltip
              class="item"
              content="云数据库GaussDB(for MySQL)是华为自研的最新一代企业级高扩展海量存储分布式数据库，完全兼容MySQL"
            >
              <i class="el-icon-info"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="operate-btns">
          <el-button>帮助</el-button>
        </div>
      </div>
    </div>
    <div class="steps" >
      <el-steps :space="200" :active="active" finish-status="success" >
        <el-step title="选择问题所属产品"  @click.native="a(1)"></el-step>
        <el-step title="选择问题类型"  @click.native="a(2)"></el-step>
        <el-step title="智能客服/新建工单" @click.native="a(3)"></el-step>
      </el-steps>
    </div>
    <div class="rh-page-content">
      <div class="step" v-if="active == 0">
          <div class="rh-page-hint">
            <div class="page-hint-content">
              <span class="page-hint-icon">
                <i class="el-icon-info"></i>
              </span>
              <span class="page-hint-text">
                温馨提示：售前咨询请点击这里联系华为云售前服务团队
              </span>
            </div>
            <div class="operate-bts">
              <div class="bt-close" @click="HintShow = false">
                <i class="el-icon-close"></i>
              </div>
            </div>
          </div>
          <div class="space20"></div>
          <div class="page-title">产品类</div>
          <div class="space20"></div>
          <div class="bar-wrap clearfix">
            <div class="bar-item " v-for="(item,index) in arryRadio" :key ="index">
                <label class="row-bar" name="" :class="{'selected':radioVal==index}">
                      {{item.keyName}}
                      <input type="radio" :value="index" v-model="radioVal" @change="getRadio"  name="p_type">
                </label>
            </div>
          </div>
          <div class="space20"></div>
          <div class="step-bt-group">
            <el-button type="primary" @click="active=1">下一步</el-button>
          </div>
      </div>
      <div class="step"  v-if="active==1">
          <div class="rh-page-hint">
            <div class="page-hint-content">
              <span class="page-hint-icon">
                <i class="el-icon-info"></i>
              </span>
              <span class="page-hint-text">
                温馨提示：售前咨询请点击这里联系华为云售前服务团队
              </span>
            </div>
            <div class="operate-bts">
              <div class="bt-close" @click="HintShow = false">
                <i class="el-icon-close"></i>
              </div>
            </div>
          </div>
          <div class="space20"></div>
          <div class="page-title">选择问题类型</div>
          <div class="space20"></div>
          <div class="collapse-wrap">
              <el-collapse v-model = "activeNames" @change="handleChange" accordion>
                <el-collapse-item title="审核进度" name="1">
                  <div>
                    为您推荐了<span class="colorGreen">8条</span>热门案例
                  </div>
                  <div>
                      <el-row>
                        <el-col :span="8">
                          <span class="name colorBlue" @click="$router.push('/main/demo5')">
                            1.如何在weblogic上安装SSL证书?
                          </span>
                        </el-col>
                        <el-col :span="8">
                          <span class="name colorBlue">
                            2.如何在IIS上安装SSL证书?
                          </span>
                        </el-col>
                        <el-col :span="8">
                          <span class="name colorBlue">
                            3.如何在IIS上安装SSL证书?
                          </span>
                        </el-col>
                      </el-row>
                  </div>
                  <div class="space14"></div>
                  <div class="bt-collapse">
                    <div class="left">
                      <div class="text">新建工单</div>
                      <div class="text">华为云工程师为您解答，请您耐心等待</div>
                    </div>
                    <div class="right">
                        <i class="el-icon-folder-add"></i>
                    </div>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="申请证书/域名验证/组织验证" name="2">
                  <div>
                    控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
                  </div>
                  <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                  <div class="bt-collapse">
                    <div class="left">
                      <div class="text">新建工单</div>
                      <div class="text">华为云工程师为您解答，请您耐心等待</div>
                    </div>
                    <div class="right">
                        <i class="el-icon-folder-add"></i>
                    </div>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="费用/证书有效期" name="3">
                  <div>简化流程：设计简洁直观的操作流程；</div>
                  <div>
                    清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
                  </div>
                  <div>
                    帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
                  </div>
                  <div class="bt-collapse">
                    <div class="left">
                      <div class="text">新建工单</div>
                      <div class="text">华为云工程师为您解答，请您耐心等待</div>
                    </div>
                    <div class="right">
                        <i class="el-icon-folder-add"></i>
                    </div>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="证书配置" name="4">
                  <div>
                    用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
                  </div>
                  <div>
                    结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
                  </div>
                  <div class="bt-collapse">
                    <div class="left">
                      <div class="text">新建工单</div>
                      <div class="text">华为云工程师为您解答，请您耐心等待</div>
                    </div>
                    <div class="right">
                        <i class="el-icon-folder-add"></i>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
          </div>
           <div class="space20"></div>
          <div class="step-bt-group">
            <el-button type="primary" @click="active=2">下一步</el-button>
          </div>
      </div>
      <div class="step" v-if="active==2">
        <div class="rh-page-hint">
          <div class="page-hint-content">
            <span class="page-hint-icon">
              <i class="el-icon-info"></i>
            </span>
            <span class="page-hint-text">
              温馨提示：22222售前咨询请点击这里联系华为云售前服务团队
            </span>
          </div>
          <div class="operate-bts">
            <div class="bt-close" @click="HintShow = false">
              <i class="el-icon-close"></i>
            </div>
          </div>
        </div>
           <div class="space20"></div>
          <div class="step-bt-group">
            <el-button type="primary" @click="active=3">下一步</el-button>
          </div>
      </div>
      <div class="step" v-if="active==3">
          完成
      </div>
    </div>
  </div>
</template>

<script>
export default {
      data(){
          return{
              active:0,
              activeNames:["1","2"],
              radioVal: '',
              arryRadio:[
              {
                keyName:'弹性云服务器',
                data:'1',
                value:'',
              },{
                keyName:'华为云WeLink',
                data:'2',
                value:'',
              },{
                keyName:'云速建站',
                data:'3',
                value:'',
              },{
                keyName:'对象存储服务器',
                data:'4',
                value:'',
              },{
                keyName:'云容器引擎',
                data:'5',
                value:'',
              },{
                keyName:'云数据库MySQL',
                data:'6',
                value:'',
              },{
                keyName:'弹性公网IP',
                data:'7',
                value:'',
              },{
                keyName:'内容发布网络',
                data:'8',
                value:'',
              }]
          }
      },
      methods:{
          handleChange(){

          },
          a(n){
            this.active = n; 
          },
          getRadio(){
            console.log(this.radioVal);
          }
      }
};
</script>

<style>
</style>