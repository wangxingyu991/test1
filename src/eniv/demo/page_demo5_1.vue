<style lang="less">
  @import url('shop.less');
</style>
<template>
  <div class="shop">
    <el-form :model="form" ref="search" :inline="false" label-width="200px" >
      <el-row>
        <el-col :span="24">
          <el-form-item label="单选按钮类型:">
              <el-radio-group v-model="form.data1">
                <el-radio-button label="基础版"></el-radio-button>
                <el-radio-button label="专业版"></el-radio-button>
                <el-radio-button label="专家版"></el-radio-button>
                <el-radio-button label="PLus版"></el-radio-button>
                <el-radio-button label="基础01.1"></el-radio-button>
                <el-radio-button label="基础01.2"></el-radio-button>
                <el-radio-button label="基础01.3"></el-radio-button>
                <el-radio-button label="基础01.4"></el-radio-button>
                <el-radio-button label="基础01.5"></el-radio-button>
                <el-radio-button label="基础01.6"></el-radio-button>
                <el-radio-button label="基础01.7"></el-radio-button>
                <el-radio-button label="基础01.8"></el-radio-button>
                <el-radio-button label="基础01.9"></el-radio-button>
                <el-radio-button label="基础01.10"></el-radio-button>
                <el-radio-button label="基础01.11"></el-radio-button>
                <el-radio-button label="基础01.12"></el-radio-button>
              </el-radio-group>
          </el-form-item>
          <div class="p-content" style="padding-left:200px;">
              {{form.pInfo1}}
              <p>我的资源当前仅支持如下服务类型及区域的查询，更多服务及区域持续上线中。</p>
              <p>iView Admin Pro 企业级中台前端/设计解决方案</p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="多选按钮类型:">
            <el-checkbox-group v-model="form.checkboxGroup1" size = "mini">
              <el-checkbox-button v-for="city in items" :label="city" :key="city">{{city}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>

          
          <div class="p-content" style="padding-left:200px;">
              {{form.pInfo1}}
              <p>我的资源当前仅支持如下服务类型及区域的查询，更多服务及区域持续上线中。</p>
              <p>iView Admin Pro 企业级中台前端/设计解决方案</p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="开票类型:" style=" margin-bottom: 0px;">
            <el-row :gutter="12">
                <el-col :span="8">
                  <div class="border-dotted">
                    <div class="select-item">
                        <el-checkbox v-model="kplx.checked1" label="虚拟UKEY"></el-checkbox>
                    </div>
                    <div class="number-item">
                       <el-input-number size="mini" v-model="kplx.num1" :disabled="false"></el-input-number>
                    </div>
                    <div class="unit-item">
                      <span class="uint">单位/个</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="border-dotted">
                    <div class="select-item">
                        <el-checkbox v-model="kplx.checked2" label="UKEY"></el-checkbox>
                    </div>
                    <div class="number-item">
                       <el-input-number size="mini" v-model="kplx.num2" :disabled="false"></el-input-number>
                    </div>
                    <div class="unit-item">
                      <span class="uint">单位/个</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="border-dotted">
                    <div class="select-item">
                        <el-checkbox v-model="kplx.checked3" label="金税卡"></el-checkbox>
                    </div>
                    <div class="number-item">
                       <el-input-number size="mini" v-model="kplx.num3" :disabled="false"></el-input-number>
                    </div>
                    <div class="unit-item">
                      <span class="uint">单位/个</span>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="12">
                <el-col :span="8">
                  <div class="border-dotted">
                    <div class="select-item">
                        <el-checkbox v-model="kplx.checked4" label="金税盘"></el-checkbox>
                    </div>
                    <div class="number-item">
                       <el-input-number size="mini" v-model="kplx.num4" :disabled="false"></el-input-number>
                    </div>
                    <div class="unit-item">
                      <span class="uint">单位/个</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="border-dotted">
                    <div class="select-item">
                        <el-checkbox v-model="kplx.checked5" label="税控盘"></el-checkbox>
                    </div>
                    <div class="number-item">
                       <el-input-number size="mini" v-model="kplx.num5" :disabled="false"></el-input-number>
                    </div>
                    <div class="unit-item">
                      <span class="uint">单位/个</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="border-dotted">
                    <div class="select-item">
                        <el-checkbox v-model="kplx.checked6" label="报税盘"></el-checkbox>
                    </div>
                    <div class="number-item">
                       <el-input-number size="mini" v-model="kplx.num6" :disabled="false"></el-input-number>
                    </div>
                    <div class="unit-item">
                      <span class="uint">单位/个</span>
                    </div>
                  </div>
                </el-col>
            </el-row>
          </el-form-item>
          <div class="p-content" style="padding-left:200px;">
              {{form.pInfo2}}
              <p>我的资源当前仅支持如下服务类型及区域的查询，更多服务及区域持续上线中。</p>
              <p>iView Admin Pro 企业级中台前端/设计解决方案</p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="开票类型:">
            <el-input v-model="form.inputVal"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" plain size="small" icon="el-icon-search">查询</el-button>
            <el-button type="info" plain size="small" icon="el-icon-refresh-left">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span = "24">
          <el-form-item label="总金额:">
              <span class="icon-monney floatL">
                <svg t="1616031581196" class="icon" viewBox="0 0 1024 1024" fill="#f00" p-id="2066" width="20" height="20"><path d="M857.599993 12.8C844.799994 0 819.199994 0 806.399994 19.2L512 358.399993 217.600006 19.2C204.800006 0 179.200006 0 166.400007 12.8 147.200007 25.6 147.200007 51.199999 160.000007 63.999999l268.799995 307.199994L230.400005 371.199993C211.200006 377.599993 192.000006 390.399992 192.000006 415.999992s19.2 38.399999 38.399999 38.399999l243.199995 0 0 147.199997L230.400005 601.599988C211.200006 601.599988 192.000006 614.399988 192.000006 639.999988s19.2 38.399999 38.399999 38.399999l243.199995 0 0 307.199994C473.600001 1004.799981 492.8 1023.99998 512 1023.99998s38.399999-19.2 38.399999-38.399999l0-307.199994 243.199995 0c19.2 0 38.399999-19.2 38.399999-38.399999s-19.2-38.399999-38.399999-38.399999L550.399999 601.599988 550.399999 454.399991l243.199995 0c19.2 0 38.399999-19.2 38.399999-38.399999s-19.2-38.399999-38.399999-38.399999L595.199998 377.599993 863.999993 63.999999C876.799993 51.199999 876.799993 25.6 857.599993 12.8z" p-id="2067"></path></svg>
              </span>
              <span class="shop-total floatL">
                <el-input v-model="form.money"></el-input>
              </span>
              <span class="floatL shop-unit">
                元
              </span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
      data(){
          return{
            template1:'',
            form:{
              data1:"",
              pInof1:'',
              data2:"",
              pInof2:'',
              money:'',
             checkboxGroup1:[],
            },
            kplx:{
              num1:1,
              num2:1,
              num3:1,
              num4:1,
              num5:1,
              num6:1,
              checked1:true,
              checked2:false,
              checked3:false,
              checked4:false,
              checked5:false,
              checked6:false,
              inputVal:''
            },
            items: ['上海', '北京', '广州', '深圳']
          }
      }
}
</script>