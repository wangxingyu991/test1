
<template>
<div>
    <div class="rh-page-header">
        <div class="rh-head-and-operate">
              <div class="tips-content">
                    <span class="rh-helpTip-text">
                    手风琴效果
                    </span>
                    <span class="rh-helpTip-icon">
                          <el-tooltip class="item" content="云数据库GaussDB(for MySQL)是华为自研的最新一代企业级高扩展海量存储分布式数据库，完全兼容MySQL">
                                <i class="el-icon-info"></i>
                          </el-tooltip>
                    </span>
              </div>
              <div class="operate-btns">
                    <el-button>操作</el-button>
              </div>
        </div>
        
    </div>
    <div class="rh-page-content">

      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="审核进度" name="1">
          <div>
            为您推荐了8条热门案例
          </div>
          <div>
                <el-row>
                  <el-col :span="8">
                    <span class="name">
                      1.如何在weblogic上安装SSL证书?
                    </span>
                  </el-col>
                  <el-col :span="8">
                    <span class="name">
                      2.如何在IIS上安装SSL证书?
                    </span>
                  </el-col>
                  <el-col :span="8">
                    <span class="name">
                      2.如何在IIS上安装SSL证书?
                    </span>
                  </el-col>
                </el-row>
          </div>

        </el-collapse-item>
        <el-collapse-item title="申请证书/域名验证/组织验证" name="2">
          <div>
            控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
          </div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="费用/证书有效期" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>
            清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
          </div>
          <div>
            帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
          </div>
        </el-collapse-item>
        <el-collapse-item title="证书配置" name="4">
          <div>
            用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
          </div>
          <div>
            结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ['1']
    };
  },
  methods:{
    handleChange(val){
        console.log(val);
    }
  }
};
</script>

<style>
</style>