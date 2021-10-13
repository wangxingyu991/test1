<style lang="less">
@import url(./page_demo18.less);
</style>
<template>
  <div class="tjkpsq">
    <div class="rh-page-header">
          <div class="rh-head-and-operate">
                <div class="tips-content">
                      <span class="rh-helpTip-text">
                            提交开票申请
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
    <div class="form">
      <el-form ref="form" :model="form" label-width = "80px" label-position="left" >
        <el-form-item label="机构名称">
          
          <el-select v-model="form.jgmc">
            <el-option label = "山东商盟1111"></el-option>
            <el-option label = "山东周盟1111"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发票类型">
          <el-select v-model="form.fplx">
            <el-option label = "增值税专用发票"></el-option>
            <el-option label = "增值税普通发票"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-content">
      <table class="table table_title">
        <tr>
          <td>
            购方公司信息<span class="red">*</span>
          </td>
        </tr>
      </table>
      <table class="table table_content cont1">
        <tr>
          <td class="t-td t-td-1">购方公司名称</td>
          <td  class="t-td t-td-2">
            <div class="cell">
              <input type="text">
              <el-button icon="el-icon-school"></el-button>
            </div>
          </td>
          <td   class="t-td t-td-3">纳税人识别号</td>
          <td   class="t-td t-td-4"><input type="text"></td>
        </tr>
        <tr>
          <td class="t-td t-td-1" >地址、电话</td>
          <td class="t-td t-td-col-3" colspan="3">
              <input type="text">
          </td>
        </tr>
        <tr>
          <td class="t-td t-td-1" >开户行及账号</td>
          <td class="t-td t-td-col-3" colspan="3">
              <input type="text">
          </td>
        </tr>
      </table>
      <table class="table table_title tabt2">
        <tr>
          <td class="t-td t-td-1">
            开票内容<span class="red">*</span>
          </td>
          <td  class="t-td t-td-2">
            <el-radio-group v-model='radio'>
              <el-radio-button  class="rh-radio-button" label="含税"></el-radio-button>
              <el-radio-button class="rh-radio-button" label="不含税"></el-radio-button>
            </el-radio-group>
          </td>
          <td class="t-td t-td-3">
            开票人
          </td>
          <td class="t-td t-td-4">
            <el-select v-model="form.kpr">
              <el-option label = "张****"></el-option>
              <el-option label = "张****"></el-option>
            </el-select>
          </td>
        </tr>
      </table>
      <table class="table table_content cont2">
        <tr class="thead">
          <td class="t-td t-td-1">行号</td>
          <td class="t-td t-td-2">货物或应税劳务。服务名称</td>
          <td class="t-td t-td-3">规格型号</td>
          <td class="t-td t-td-4">单位</td>
          <td class="t-td t-td-5">数量</td>
          <td class="t-td t-td-6">单价(不含税)</td>
          <td class="t-td t-td-7">金额(不含税)</td>
          <td class="t-td t-td-8">税率</td>
          <td class="t-td t-td-9">税额(元)</td>
          <td class="t-td t-td-10">操作</td>
        </tr>
      </table>
      <div class="table-scroll">
        <el-scrollbar style="height:100%">
        <table class="table table_content cont2 border">
          <tr>
            <td class="t-td t-td-1">1</td>
            <td class="t-td t-td-2">
              <div class="cell">
                <input type="text" v-model="table.hwmc"/>
                <el-button icon="el-icon-school"></el-button>
              </div>
            </td>
            <td class="t-td t-td-3">
              <div class="cell">
                <input type="text"  v-model="table.ggxh"/>
              </div>
            </td>
            <td class="t-td t-td-4">
              <div class="cell">
                <input type="text" v-model="table.dw"/>
              </div>
            </td>
            <td class="t-td t-td-5">
              <div class="cell">
                <input type="text"  v-model="table.number"/>
              </div>
            </td>
            <td class="t-td t-td-6">            
              <div class="cell">
                <input type="text" v-model="table.price"/>
              </div>
            </td>
            <td class="t-td t-td-7">
              <div class="cell">
                <input type="text"  v-model="table.jine"/>
              </div>
            </td>
            <td class="t-td t-td-8">
              <el-select v-model="table.shuilv">
                <el-option label = "3%"></el-option>
                <el-option label = "6%"></el-option>
                <el-option label = "12%"></el-option>
                <el-option label = "15%"></el-option>
                <el-option label = "18%"></el-option>
              </el-select>
            </td>
            <td class="t-td t-td-9">
              <input type="text" v-model="table.jine">
            </td>
            <td class="t-td t-td-10">
              <el-button type="primary" icon="el-icon-plus"></el-button>
              <el-button type="primary" icon="el-icon-minus"></el-button>
            </td>
          </tr>
          <tr>
            <td class="t-td t-td-1">2</td>
            <td class="t-td t-td-2">
              <div class="cell">
                <input type="text" v-model="table.hwmc"/>
                <el-button icon="el-icon-school"></el-button>
              </div>
            </td>
            <td class="t-td t-td-3">
              <div class="cell">
                <input type="text"  v-model="table.ggxh"/>
              </div>
            </td>
            <td class="t-td t-td-4">
              <div class="cell">
                <input type="text" v-model="table.dw"/>
              </div>
            </td>
            <td class="t-td t-td-5">
              <div class="cell">
                <input type="text"  v-model="table.number"/>
              </div>
            </td>
            <td class="t-td t-td-6">            
              <div class="cell">
                <input type="text" v-model="table.price"/>
              </div>
            </td>
            <td class="t-td t-td-7">
              <div class="cell">
                <input type="text"  v-model="table.jine"/>
              </div>
            </td>
            <td class="t-td t-td-8">
              <el-select v-model="table.shuilv">
                <el-option label = "3%"></el-option>
                <el-option label = "6%"></el-option>
                <el-option label = "12%"></el-option>
                <el-option label = "15%"></el-option>
                <el-option label = "18%"></el-option>
              </el-select>
            </td>
            <td class="t-td t-td-9">
              <input type="text" v-model="table.jine">
            </td>
            <td class="t-td t-td-10">
              <el-button type="primary" icon="el-icon-plus"></el-button>
              <el-button type="primary" icon="el-icon-minus"></el-button>
            </td>
          </tr>
          <tr>
            <td class="t-td t-td-1">3</td>
            <td class="t-td t-td-2">
              <div class="cell">
                <input type="text" v-model="table.hwmc"/>
                <el-button icon="el-icon-school"></el-button>
              </div>
            </td>
            <td class="t-td t-td-3">
              <div class="cell">
                <input type="text"  v-model="table.ggxh"/>
              </div>
            </td>
            <td class="t-td t-td-4">
              <div class="cell">
                <input type="text" v-model="table.dw"/>
              </div>
            </td>
            <td class="t-td t-td-5">
              <div class="cell">
                <input type="text"  v-model="table.number"/>
              </div>
            </td>
            <td class="t-td t-td-6">            
              <div class="cell">
                <input type="text" v-model="table.price"/>
              </div>
            </td>
            <td class="t-td t-td-7">
              <div class="cell">
                <input type="text"  v-model="table.jine"/>
              </div>
            </td>
            <td class="t-td t-td-8">
              <el-select v-model="table.shuilv">
                <el-option label = "3%"></el-option>
                <el-option label = "6%"></el-option>
                <el-option label = "12%"></el-option>
                <el-option label = "15%"></el-option>
                <el-option label = "18%"></el-option>
              </el-select>
            </td>
            <td class="t-td t-td-9">
              <input type="text" v-model="table.jine">
            </td>
            <td class="t-td t-td-10">
              <el-button type="primary" icon="el-icon-plus"></el-button>
              <el-button type="primary" icon="el-icon-minus"></el-button>
            </td>
          </tr>
          <tr>
            <td class="t-td t-td-1">4</td>
            <td class="t-td t-td-2">
              <div class="cell">
                <input type="text" v-model="table.hwmc"/>
                <el-button icon="el-icon-school"></el-button>
              </div>
            </td>
            <td class="t-td t-td-3">
              <div class="cell">
                <input type="text"  v-model="table.ggxh"/>
              </div>
            </td>
            <td class="t-td t-td-4">
              <div class="cell">
                <input type="text" v-model="table.dw"/>
              </div>
            </td>
            <td class="t-td t-td-5">
              <div class="cell">
                <input type="text"  v-model="table.number"/>
              </div>
            </td>
            <td class="t-td t-td-6">            
              <div class="cell">
                <input type="text" v-model="table.price"/>
              </div>
            </td>
            <td class="t-td t-td-7">
              <div class="cell">
                <input type="text"  v-model="table.jine"/>
              </div>
            </td>
            <td class="t-td t-td-8">
              <el-select v-model="table.shuilv">
                <el-option label = "3%"></el-option>
                <el-option label = "6%"></el-option>
                <el-option label = "12%"></el-option>
                <el-option label = "15%"></el-option>
                <el-option label = "18%"></el-option>
              </el-select>
            </td>
            <td class="t-td t-td-9">
              <input type="text" v-model="table.jine">
            </td>
            <td class="t-td t-td-10">
              <el-button type="primary" icon="el-icon-plus"></el-button>
              <el-button type="primary" icon="el-icon-minus"></el-button>
            </td>
          </tr>
          <tr>
            <td class="t-td t-td-1">5</td>
            <td class="t-td t-td-2">
              <div class="cell">
                <input type="text" v-model="table.hwmc"/>
                <el-button icon="el-icon-school"></el-button>
              </div>
            </td>
            <td class="t-td t-td-3">
              <div class="cell">
                <input type="text"  v-model="table.ggxh"/>
              </div>
            </td>
            <td class="t-td t-td-4">
              <div class="cell">
                <input type="text" v-model="table.dw"/>
              </div>
            </td>
            <td class="t-td t-td-5">
              <div class="cell">
                <input type="text"  v-model="table.number"/>
              </div>
            </td>
            <td class="t-td t-td-6">            
              <div class="cell">
                <input type="text" v-model="table.price"/>
              </div>
            </td>
            <td class="t-td t-td-7">
              <div class="cell">
                <input type="text"  v-model="table.jine"/>
              </div>
            </td>
            <td class="t-td t-td-8">
              <el-select v-model="table.shuilv">
                <el-option label = "3%"></el-option>
                <el-option label = "6%"></el-option>
                <el-option label = "12%"></el-option>
                <el-option label = "15%"></el-option>
                <el-option label = "18%"></el-option>
              </el-select>
            </td>
            <td class="t-td t-td-9">
              <input type="text" v-model="table.jine">
            </td>
            <td class="t-td t-td-10">
              <el-button type="primary" icon="el-icon-plus"></el-button>
              <el-button type="primary" icon="el-icon-minus"></el-button>
            </td>
          </tr>
        </table>
        </el-scrollbar>
      </div>
      <table class="table table_content cont3">
        <tr>
          <td class="t-td t-td-1">
            <span class="cell">合计</span>
          </td>
          <td class="t-td t-td-2">
            <span class="cell">金额(不含税):0.00</span>
          </td>
          <td class="t-td t-td-3">
            <span class="cell">税额(不含税):0.00</span>
          </td>
        </tr>
      </table>
      <table class="table table_content cont4">
        <tr>
          <td class="t-td t-td-1">
            <span class="cell">税价合计(大写 )</span>
          </td>
          <td class="t-td t-td-2">
            <span class="cell">零元整</span>
          </td>
          <td class="t-td t-td-3">
            <span class="cell">小写</span>
          </td>
          <td class="t-td t-td-4">
            <span class="cell">0.00</span>
          </td>
        </tr>
      </table>
    </div>
    <div class="form2">
      <el-form ref="form2" :model="form2" label-width = "100px" label-position="left" >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="申请人:">
                <el-input v-model="form2.sqr"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系邮箱">
                <el-input v-model="form2.lxyx"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系电话:">
                <el-input v-model="form2.bz"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注:">
                <el-input v-model="form2.bz"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="申请说明">
                <el-input v-model="form2.sqsm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上传附件">
              <el-select v-model="form2.fplx">
                <el-option label = "增值税专用发票"></el-option>
                <el-option label = "增值税普通发票"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
      data(){
          return{
            form:{
              jgmc:"",
              fplx:'', 
            },
            form2:{
              sqr:"",
              lxyx:'', 
              lxdh:'', 
              bz:'', 
              sqsm:'', 
              ccfj:'', 
            },
            table:{
              hwmc:'',
              ggxh:"",
              dw:'',
              jine:"",
              shuilv:'',
              jine:""
            }
          }
      },
      methods:{

      }
}
</script>

