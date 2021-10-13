<style lang="less">
    @import url('./fpkj/fpkj_new.less');
</style>
<template>
  <div class="fpkj_new">
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
            <div class="tips-content">
                  <span class="rh-helpTip-text">
                  测试页面8-1
                  </span>
                  <span class="rh-helpTip-icon">
                        <el-tooltip class="item" content="云数据库GaussDB(for MySQL)是华为自研的最新一代企业级高扩展海量存储分布式数据库，完全兼容MySQL">
                              <i class="el-icon-info"></i>
                        </el-tooltip>
                  </span>
            </div>
            <div class="operate-btns">
                  <el-button>帮助</el-button>
            </div>
      </div>
    </div>
    <div class="kp-bt">
        <div class="radio_bt">
          <el-radio-group v-model='radio'>
              <el-radio-button  class="rh-radio-button" label="含税"></el-radio-button>
              <el-radio-button class="rh-radio-button" label="不含税"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="radio_bt">
          <el-radio-group v-model='radio'>
              <el-radio-button  class="rh-radio-button" label="含税"></el-radio-button>
              <el-radio-button class="rh-radio-button" label="不含税"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="radio_bt">
          <el-radio-group v-model="radio1">
            <el-radio-button class="rh-radio-button" label="普通征收"></el-radio-button>
            <el-radio-button class="rh-radio-button"  label="差额征收"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="clear"></div>
    </div>
    <div class="kp-bt">
        <div class="rh-pull-left">
          <el-button type="danger">开票</el-button>
          <el-button>清单</el-button>
          <el-button>重置</el-button>
        </div>
        <div class="rh-pull-right" style="display:none;">
         <span class="title">保存购买方: </span> <el-switch v-model="bcgmf"></el-switch>
        </div>
        <div class="clear"></div>
    </div>
    <div class="operate-area">
      <div class="space20"></div>
      <div class="top">
        <div class="top_f1">
          <table class="table_head">
            <tr>
              <td class="td td1"><span class="title">保存购买方: </span></td>
              <td class="td td2"><el-switch v-model="bcgmf"></el-switch></td>
            </tr>
            <tr>
              <td  class="td td1"><span class="title">收票方手机：</span></td>
              <td  class="td td2"><input class="default_input" type="text"></td>
            </tr>
            <tr>
              <td  class="td td1"><span class="title">收票方邮箱：</span></td>
              <td  class="td td2"><input class="default_input" type="text"></td>
            </tr>
            <tr>
              <td  class="td td1"><span class="title">机&nbsp;器&nbsp;编&nbsp;码：</span></td>
              <td  class="td td2"><input class="default_input" type="text"></td>
            </tr>
          </table>
        </div>
        <div class="top_center_pic">
          
        </div>
        <div class="top_center">
          <h1>重庆电子增值税普通发票</h1>
          <span></span>
          <span></span>
        </div>
        <div class="top_fr">
          <table class="table_head">
            <tr>
              <td class="td td1"><span class="title">发票代码: </span></td>
              <td class="td td2">111001571071</td>
            </tr>
            <tr>
              <td  class="td td1"><span class="title">发票号码：</span></td>
              <td  class="td td2">111001571071</td>
            </tr>
            <tr>
              <td  class="td td1"><span class="title">开票日期：</span></td>
              <td  class="td td2">2015年08月01日</td>
            </tr>
            <tr>
              <td  class="td td1"><span class="title">校&nbsp;&nbsp;验&nbsp;码：</span></td>
              <td  class="td td2">111001571071</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="middle">
          <table class="ti-table ti-table1">
            <tr>
              <td class="ti-td ti-td-1">
                购
                </br>
                买
                </br>
                方
              </td>
              <td class="ti-td ti-td-2">
                  <table class="table_gmf">
                    <tr>
                      <td class="td td1">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</td>
                      <td class="td td2"><input type="text"></td>
                    </tr>
                    <tr>
                      <td class="td td1">纳税人识别号：</td>
                      <td class="td td2"><input type="text"></td>
                    </tr>
                    <tr>
                      <td class="td td1">地址、&nbsp;&nbsp;电话：</td>
                      <td class="td td2"><input type="text"></td>
                    </tr>
                    <tr>
                      <td class="td td1">开户行及账号：</td>
                      <td class="td td2"><input type="text"></td>
                    </tr>
                  </table>
              </td>
              <td class="ti-td ti-td-3"><span class="title">密 </br>码 </br>区</span></td>
              <td class="ti-td ti-td-4">
                <div id="mmq" class="head_item_5" style="font-size: 16px;">
                3/*22*2*29910511/52&lt;7872+-+<br data-v-602e5b91="">
                9416&lt;+&gt;8&lt;9&lt;521893**&lt;98*3-*&lt;<br data-v-602e5b91="">
                &lt;0784/6*2/*-33548/219/247&lt;7<br data-v-602e5b91="">
                2+-+9/86&lt;+&gt;8&lt;9&lt;521893**88+*<br data-v-602e5b91=""></div>
              </td>
            </tr>
          </table>
          <table class="ti-table ti-table2">
            <tr>
              <td class="ti-td ti-td-1"><span class="title">行号</span></td>
              <td class="ti-td ti-td-2"><span class="title">货物或应税劳务、服务名称</span></td>
              <td class="ti-td ti-td-3"><span class="title">规格型号</span></td>
              <td class="ti-td ti-td-4"><span class="title">单位</span></td>
              <td class="ti-td ti-td-5"><span class="title">数量</span></td>
              <td class="ti-td ti-td-6"><span class="title">单价(含税)</span></td>
              <td class="ti-td ti-td-7"><span class="title">金额(含税)</span></td>
              <td class="ti-td ti-td-8"><span class="title">税率</span></td>
              <td class="ti-td ti-td-9"><span class="title">税额</span></td>
              <td class="ti-td ti-td-10"><span class="title">操作</span></td>
            </tr>
          </table>
          <el-scrollbar style="height:154px;" :native="false">
          <table class="ti-table ti-table3">
            <tr>
              <td class="ti-td ti-td-1">1</td>
              <td class="ti-td ti-td-2">
                <div class="cell">
                  <input type="text">
                  <el-button icon="el-icon-school"></el-button>
                </div>
              </td>
              <td class="ti-td ti-td-3"><div class="cell"><input type="text"></div></td>
              <td class="ti-td ti-td-4"><div class="cell"><input type="text"></div></td>
              <td class="ti-td ti-td-5"><div class="cell"><input type="text"></div></td>
              <td class="ti-td ti-td-6"><div class="cell"><input type="text"></div></td>
              <td class="ti-td ti-td-7"><div class="cell"><input type="text"></div></td>
              <td class="ti-td ti-td-8">
                <div class="cell">
                  <el-select v-model="value">
                    <el-option label="5%"  :value="1"></el-option>
                    <el-option label="10%" :value="2"></el-option>
                    <el-option label="15%" :value="3"></el-option>
                    <el-option label="20%" :value="4"></el-option>
                  </el-select>
                </div>
              </td>
              <td class="ti-td ti-td-9"><div class="cell"><input type="text"></div></td>
              <td class="ti-td ti-td-10">
                <div class="cell good_oprea">
                  <span class="add">
                    <i class="el-icon-circle-plus-outline"></i> 
                  </span>
                  <span class="del">
                    <i class="el-icon-remove-outline"></i>
                  </span>
                  <span class="discount">
                    <span class="circle">折</span>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td class="ti-td ti-td-1">2</td>
              <td class="ti-td ti-td-2">
                <div class="cell">
                  <input type="text">
                  <el-button icon="el-icon-school"></el-button>
                </div>
              </td>
              <td class="ti-td ti-td-3"><div class="cell"><input type="text"></div></td>
              <td class="ti-td ti-td-4"><div class="cell"><input type="text"></div></td>
              <td class="ti-td ti-td-5"><div class="cell"><input type="text"></div></td>
              <td class="ti-td ti-td-6"><div class="cell"><input type="text"></div></td>
              <td class="ti-td ti-td-7"><div class="cell"><input type="text"></div></td>
              <td class="ti-td ti-td-8">
                <div class="cell">
                  <el-select v-model="value">
                    <el-option label="5%"  :value="1"></el-option>
                    <el-option label="10%" :value="2"></el-option>
                    <el-option label="15%" :value="3"></el-option>
                    <el-option label="20%" :value="4"></el-option>
                  </el-select>
                </div>
              </td>
              <td class="ti-td ti-td-9"><div class="cell"><input type="text"></div></td>
              <td class="ti-td ti-td-10">
                <div class="cell good_oprea">
                  <span class="add">
                    <i class="el-icon-circle-plus-outline"></i> 
                  </span>
                  <span class="del">
                    <i class="el-icon-remove-outline"></i>
                  </span>
                  <span class="discount">
                    <span class="circle">折</span>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td class="ti-td ti-td-1">3</td>
              <td class="ti-td ti-td-2">
                <div class="cell">
                  <input type="text">
                  <el-button icon="el-icon-school"></el-button>
                </div>
              </td>
              <td class="ti-td ti-td-3"><div class="cell"><input type="text"></div></td>
              <td class="ti-td ti-td-4"><div class="cell"><input type="text"></div></td>
              <td class="ti-td ti-td-5"><div class="cell"><input type="text"></div></td>
              <td class="ti-td ti-td-6"><div class="cell"><input type="text"></div></td>
              <td class="ti-td ti-td-7"><div class="cell"><input type="text"></div></td>
              <td class="ti-td ti-td-8">
                <div class="cell">
                  <el-select v-model="value">
                    <el-option label="5%"  :value="1"></el-option>
                    <el-option label="10%" :value="2"></el-option>
                    <el-option label="15%" :value="3"></el-option>
                    <el-option label="20%" :value="4"></el-option>
                  </el-select>
                </div>
              </td>
              <td class="ti-td ti-td-9"><div class="cell"><input type="text"></div></td>
              <td class="ti-td ti-td-10">
                <div class="cell good_oprea">
                  <span class="add">
                    <i class="el-icon-circle-plus-outline"></i> 
                  </span>
                  <span class="del">
                    <i class="el-icon-remove-outline"></i>
                  </span>
                  <span class="discount">
                    <span class="circle">折</span>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td class="ti-td ti-td-1">&nbsp;</td>
              <td class="ti-td ti-td-2">
              </td>
              <td class="ti-td ti-td-3"></td>
              <td class="ti-td ti-td-4"></td>
              <td class="ti-td ti-td-5"></td>
              <td class="ti-td ti-td-6"></td>
              <td class="ti-td ti-td-7"></td>
              <td class="ti-td ti-td-8">
              </td>
              <td class="ti-td ti-td-9"></td>
              <td class="ti-td ti-td-10">
              </td>
            </tr>
            <tr>
              <td class="ti-td ti-td-1">&nbsp;</td>
              <td class="ti-td ti-td-2">
              </td>
              <td class="ti-td ti-td-3"></td>
              <td class="ti-td ti-td-4"></td>
              <td class="ti-td ti-td-5"></td>
              <td class="ti-td ti-td-6"></td>
              <td class="ti-td ti-td-7"></td>
              <td class="ti-td ti-td-8">
              </td>
              <td class="ti-td ti-td-9"></td>
              <td class="ti-td ti-td-10">
              </td>
            </tr>
            <tr>
              <td class="ti-td ti-td-1">&nbsp;</td>
              <td class="ti-td ti-td-2">
              </td>
              <td class="ti-td ti-td-3"></td>
              <td class="ti-td ti-td-4"></td>
              <td class="ti-td ti-td-5"></td>
              <td class="ti-td ti-td-6"></td>
              <td class="ti-td ti-td-7"></td>
              <td class="ti-td ti-td-8">
              </td>
              <td class="ti-td ti-td-9"></td>
              <td class="ti-td ti-td-10">
              </td>
            </tr>
          </table>
          </el-scrollbar>
          <table class="ti-table ti-table4">
            <tr>
              <td class="ti-td ti-td-1">
                <div class="cell title">价税合计</div>
              </td>
              <td class="ti-td ti-td-2">
                <div class="cell title">大写</div>
              </td>
              <td class="ti-td ti-td-3">
                <span class="icon"></span>
                贰拾伍元整
              </td>
              <td class="ti-td ti-td-4">
                <span class="title">小写</span>
              </td>
              <td class="ti-td ti-td-5">
                ￥25.00
              </td>
            </tr>
          </table>
          <table class="ti-table ti-table5">
            <tr>
              <td class="ti-td ti-td-1">
                <span class="title">销</br>售</br>方</span>
              </td>
              <td class="ti-td ti-td-2">
                <table class="innerTable">
                  <tr>
                    <td class="td_inner1"><span class="cell_name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span></td>
                    <td class="td_inner2">北京京东世纪信息技术有限公司</td>
                  </tr>
                  <tr>
                    <td class="td_inner1"><span class="cell_name">纳税人识别号：</span></td>
                    <td class="td_inner2">110192562134916</td>                   
                  </tr>
                  <tr>
                    <td class="td_inner1">
                      <span class="cell_name">
                        地址、&nbsp;&nbsp;&nbsp;&nbsp;电话：
                      </span>
                    </td>
                    <td class="td_inner2">
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td  class="td_inner1">
                      <span class="cell_name">开户行及账号：</span>
                    </td>
                    <td  class="td_inner2">
                        <input type="text" />
                    </td>
                  </tr>
                </table>
              </td>
              <td class="ti-td ti-td-3">
                备
                </br>
                注
              </td>
              <td class="ti-td ti-td-4">
                  <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
              </td>
            </tr>
          </table>
      </div>
      <div class="bottom">

      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
          radio:'',
          radio1:'',
          bcgmf:'',
          value:''
        }
    }
}
</script>

<style>

</style>