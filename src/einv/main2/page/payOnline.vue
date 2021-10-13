<template>
  <div class="pay_online">
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
            <div class="tips-content">
                  <span class="rh-helpTip-text">
                    线上缴费
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
      <el-form ref="form" :model="form" label-width="100px">
        <div class="form-wrap">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="费用项目：">
                  <el-select v-model="form.name" placeholder="请选择">
                    <el-option v-for="item in options" :value="item.value" :key="item.value" :label="item.label">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同编号：">
                  <el-input v-model = "form.number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="费用金额：">
                  <el-input v-model = "form.money"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
        </div>
        <div class="ticket-info">
          <fieldset>
            <legend class="legend h6">
              发票抬头信息
            </legend>
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item label="客户名称：">
                    <el-input v-model = "form.khmc"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="纳税人识别号：">
                    <el-input v-model = "form.nsrsbh"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item label="纳税人识别号：">
                    <el-input v-model = "form.nsrsbh"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="地址、电话：">
                  <el-input v-model = "form.telephone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item label="开户银行账号：">
                    <el-input v-model = "form.khyh"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="地址、电话：">
                  <el-input v-model = "form.telephone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </fieldset> 
        </div>
        <div class="pay_bt">
          <el-button type="warning">去支付</el-button>
        </div>
        <div class="warm-hint">
          <fieldset>
            <legend class="legend h6">
              温馨提示
            </legend>
            <div class="content">
              1、您在支付平台完成支付后请不要关闭浏览器,等待支付平台返回本页面,以确认支付完成。
            </div>
          </fieldset>
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
            name:'',
            number:'',
            money:'',
            fyxm:'',
            khmc:'',
            telephone:'',
            nsrsbh:'',
            khyh:''
          },
          value:'',
          options:[{
            value:'1',
            label:'测试费用',
          },{
            value:'2',
            label:'开发费用',
          },{
            value:'3',
            label:'其他费用',
          }]
        }
    }
}
</script>

<style>

</style>