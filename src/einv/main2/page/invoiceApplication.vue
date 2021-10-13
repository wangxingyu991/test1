<style lang="less">
  .fpsq{
    fieldset{
        border:1px solid #CCC;
        padding:15px 10px;
    }
    .legend{
      margin-left:10px;
    }
    .form-fieldset{
      margin-top:10px;
    }
    .bt-submit{
      text-align: center;
      padding: 15px 0px;
    }
    .lg-content{
      padding-left:0px;
      padding-right:20px;
    }
  }
</style>
<template>
  <div class="fpsq">
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
            <div class="tips-content">
                  <span class="rh-helpTip-text">
                   发票申请
                  </span>
                  <span class="rh-helpTip-icon">
                        <el-tooltip class="item" content="云数据库GaussDB(for MySQL)是华为自研的最新一代企业级高扩展海量存储分布式数据库，完全兼容MySQL">
                              <i class="el-icon-info"></i>
                        </el-tooltip>
                  </span>
            </div>
            <div class="operate-btns"  style="display:none;">
                  <el-button>操作</el-button>
            </div>
      </div>
    </div>
    <div class="rh-page-content">
      <el-form ref="form" :model = "form" label-width = "120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="付款凭证：">
              <el-input v-model = "form.fkpz" placeholder="--请上传付款凭证附件--"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票项目：">
              <el-select v-model="form.fpxm">
                <el-option value="1" label="测试费用"></el-option>
                <el-option value="2" label="电话费"></el-option>
                <el-option value="3" label="交通费"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同编号：">
              <el-input v-model = "form.htbh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <fieldset class="form-fieldset">
          <legend class="legend h6">请选择发票类型</legend>
          <div class="lg-content">
            <el-radio v-model="form.radio" label="增值税电子普通发票"></el-radio>
            <el-radio v-model="form.radio" label="增值税普通发票"></el-radio>
            <el-radio v-model="form.radio" label="增值税专用发票"></el-radio>
          </div>
        </fieldset>
        <fieldset class="form-fieldset">
          <legend class="legend h6">请录入发票抬头信息</legend>
          <div class="lg-content">
            <el-row>
              <el-col :span="12">
                <el-form-item label="客户名称：">
                  <el-input v-model="form.khmc"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="纳税人识别号：">
                  <el-input v-model="form.nsrsbh"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开户行及银行账号：">
                  <el-input v-model="form.khhjyhzh"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="地址\电话:">
                  <el-input v-model="form.location_tel"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </fieldset>
        <fieldset class="form-fieldset">
          <legend class="legend h6">请录入发票邮寄信息</legend>
          <div class="lg-content">
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人：">
                  <el-input v-model="form.lxr"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话：">
                  <el-input v-model="form.contactTel"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系地址：">
                  <el-input v-model="form.contactLocation"></el-input>
                </el-form-item>
                
              </el-col>
            </el-row>
          </div>
        </fieldset>
        <div class="bt-submit">
          <el-button onclick="submit" type="primary">申请发票</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
          form:{

          }
        }
    },
    methods:{
      submit(){

      }
    }
}
</script>

<style>

</style>