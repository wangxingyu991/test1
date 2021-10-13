<style  lang="less">
@import url("./fpkj/fpkj.less");
</style>
<template>
<div class="fpkj">
      <div class="kp-bt">
        <div class="rh-pull-left">
          <el-button type="danger">开票</el-button>
          <el-button>清单</el-button>
          <el-button>重置</el-button>
          
        </div>
        <div class="rh-pull-right">
         <span class="title">保存购买方: </span> <el-switch v-model="bcgmf"></el-switch>
        </div>
        <div class="clear"></div>
    </div>
    <div class="main fpys">
      <!--top-->
      <div class="top">
        <div class="top_f1">
          <p>征&nbsp;税&nbsp;&nbsp;方&nbsp;式:</p>
          <p>收票方手机:</p>
          <p>收票方邮箱:</p>
          <p>机&nbsp;器&nbsp;&nbsp;编&nbsp;码:</p>
        </div>
        <div class="top_center_pic">
          
        </div>
        <div class="top_center">
          <h1>北京电子增值税普通发票</h1>
          <d></d>
          <d></d>
        </div>
        <div class="top_fr">
          <p>发票代码:</p>
          <p>发票号码:</p>
          <p>开票日期:</p>
          <p>效&nbsp; 验&nbsp; 码:</p>
        </div>
      </div>
      <!--text_center-->
      <div class="text_center">
        <table class="table_1">
          <tr class="tr_1">
            <td style="width: 5%; line-height: 30px; text-align: center">
              购<br />买<br />方
            </td>
            <td style="width: 45%; padding: 0 5px">
              <p>
                名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
              </p>
              <p>纳税人识别号：</p>
              <p>地&nbsp;址、电&nbsp;&nbsp;话：</p>
              <p>开户行及账号：</p>
            </td>
            <td style="width: 5%; text-align: center; line-height: 30px">
              密<br />码<br />区
            </td>
            <td style="width: 45%"></td>
          </tr>
        </table>
        <table class="table_2" style="height:192px;">
          <tr class="tr_2" style="text-align: center">
            <td style="width:5%">行号</td>
            <td style="width: 25%">货物或应税劳务、服务名称</td>
            <td style="width: 10%">规格型号</td>
            <td style="width: 5%">单位</td>
            <td style="width: 10%">数量</td>
            <td style="width: 10%">单价（含税）</td>
            <td style="width: 10%">金额（含税）</td>
            <td style="width: 5%">税&nbsp;&nbsp;率</td>
            <td style="width: 10%">税&nbsp;&nbsp;额</td>
            <td style="width: 15%">操作</td>
          </tr>
        </table>
        <table class="table_5">
          <tr class="tr_5" style="text-align: center; line-height: 30px">
            <td style="width: 20%;padding-left: 10px">合&nbsp;&nbsp;&nbsp;&nbsp;计</td>
            <td style="width: 80%;padding-left: 10px">
              <p style="text-align: left;float:left;width:50%;">总金额：</p>
              <p style="text-align: left;float:left;width:50%;">总税额：</p>
            </td>
          </tr>
        </table>
        <table class="table_3">
          <tr class="tr_3" style="line-height: 32px">
            <td style="width: 20%; padding-left: 10px">价税合计(大写)</td>
            <td style="width: 80%; padding-left: 10px">
              <p style="padding-left: 50%;text-align: left;">小写</p>
            </td>
          </tr>
        </table>
        <table class="table_4">
          <tr class="tr_4">
            <td style="width: 5%; text-align: center; line-height: 30px">
              销<br />售<br />方
            </td>
            <td style="width: 45%; padding: 0 5px">
              <p>
                名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称:
              </p>
              <p>纳税人识别号:</p>
              <p>地&nbsp;址&nbsp;、电&nbsp;话:</p>
              <p>开户行及账号:</p>
            </td>
            <td style="width: 5%; line-height: 30px; text-align: center">
              备<br /><br />注
            </td>
            <td style="width: 45%"></td>
          </tr>
        </table>
      </div>
      <div class="bottom">
        <span style="width: 20%">收款人:</span
        ><span style="width: 15%">复核:</span
        ><span style="width: 15%">开票人:</span
        ><span style="width: 30%">销货单位:(章)</span>
      </div>
      <div class="goodInfo">
        <el-scrollbar style="height:100%">
            <div class="tr">
              <div class="td good_no">1</div>
              <div class="td good_name"> 支持苹果iphone ipad三星小米手机平板</div>
              <div class="td good_size">UFT900</div>
              <div class="td good_unit">台</div>
              <div class="td good_number">数量</div>
              <div class="td good_price">单价</div>
              <div class="td good_total">金额</div>
              <div class="td good_taxm">税率</div>
              <div class="td good_taxp">税额</div>
              <div class="td good_oprea">
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
            </div>
            <div class="clear"></div>
            <div class="tr">
              <div class="td good_no">2</div>
              <div class="td good_name">苹果iphone ipad三星小米手机平板</div>
              <div class="td good_size">U4500</div>
              <div class="td good_unit">台</div>
              <div class="td good_number">数量</div>
              <div class="td good_price">单价</div>
              <div class="td good_total">金额</div>
              <div class="td good_taxm">税率</div>   
              <div class="td good_taxp">税额</div>
              <div class="td good_oprea">
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
            </div>
            <div class="clear"></div>
            <div class="tr">
              <div class="td good_no">3</div>
              <div class="td good_name"> 支持苹果iphone ipad三星小米手机平板支持</div>
              <div class="td good_size">UFT900</div>
              <div class="td good_unit">台</div>
              <div class="td good_number">数量</div>
              <div class="td good_price">单价</div>
              <div class="td good_total">金额</div>
              <div class="td good_taxm">税率</div>
              <div class="td good_taxp">税额</div>
              <div class="td good_oprea">
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
            </div>
            <div class="clear"></div>
            <div class="tr">
              <div class="td good_no">4</div>
              <div class="td good_name">苹果iphone ipad三星小米手机平板支持</div>
              <div class="td good_size">U4500</div>
              <div class="td good_unit">台</div>
              <div class="td good_number">数量</div>
              <div class="td good_price">单价</div>
              <div class="td good_total">金额</div>
              <div class="td good_taxm">税率</div>   
              <div class="td good_taxp">税额</div>
              <div class="td good_oprea">
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
            </div>
            <div class="clear"></div>
            <div class="tr">
              <div class="td good_no">5</div>
              <div class="td good_name">苹果iphone ipad三星小米手机平板支持</div>
              <div class="td good_size">U4500</div>
              <div class="td good_unit">台</div>
              <div class="td good_number">数量</div>
              <div class="td good_price">单价</div>
              <div class="td good_total">金额</div>
              <div class="td good_taxm">税率</div>   
              <div class="td good_taxp">税额</div>
              <div class="td good_oprea">
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
            </div>
            <div class="clear"></div>
        </el-scrollbar>
      </div>
      <div class="inputVal-wrap">
          <div class="table_nr">
            <div class="top_left_1" id="jqbh">661545422666</div>
            <div class="top_left_2" id="jqbh">661545422666</div>
            <div class="top_left_3" id="jqbh">661545422666</div>
            <div class="top_left_4" id="jqbh">661545422666</div>

            <div class="top_right_1" id="fpdm">111001571071</div>
            <div class="top_right_2" id="fphm">00800659</div>
            <div class="top_right_3" id="kprq">2015年08月01日</div>
            <div class="top_right_4" id="xym">56630 38837 39755 55396</div>

            <div class="head_item_1" id="gmfmc">个人</div>
            <div  class="head_item_2" id="gmfsbh">个人</div>
            <div  class="head_item_3" id="gmfdzdh">个人</div>
            <div  class="head_item_4" id="gmfzh">个人</div>


            <div class="head_item_5" id="mmq" style="font-size: 16px">
              3/*22*2*29910511/52&lt;7872+-+<br />
              9416&lt;+&gt;8&lt;9&lt;521893**&lt;98*3-*&lt;<br />
              &lt;0784/6*2/*-33548/219/247&lt;7<br />
              2+-+9/86&lt;+&gt;8&lt;9&lt;521893**88+*<br />
            </div>

            <div class="body_items" id="gmxx">
              <ul class="item_1">
                <li style="width: 24%; padding: 5px 0.5%; text-align: left">
                  绿联（Ugreen） 10598 AUX 车用直对弯头3.5mm音频线1.5米 支持苹果iphone
                  ipad三星小米手机平板
                </li>
                <li style="width: 10%">无</li>
                <li style="width: 5%"></li>
                <li style="width: 10%">1</li>
                <li style="width: 10%">25.64</li>
                <li style="width: 15%">25.64</li>
                <li style="width: 10%">0.17</li>
                <li style="width: 5%">4.36</li>
                <li style="width: 10%">4.36</li>
              </ul>
            </div>
            <div class="body_hj" id="zongjine">21.36</div>
            <div class="body_zse" id="zongshuie">3.64</div>
            <div class="body_jshj_dx" id="jehjdx">贰拾伍元整</div>
            <div id="jehjxx">25.00</div>
            <div id="xsfmc">北京京东世纪信息技术有限公司</div>
            <div id="xsfsbh">110192562134916</div>
            <div id="xsfdh">
              北京市北京经济技术开发区科创十四街99号2号楼B168室 010-56754036
            </div>
            <div id="xsfzh">1111</div>
            <div id="beizhu">1111</div>
            <div id="skr">京东商城</div>
            <div id="fh">1111</div>
            <div id="kpr">京东商城</div>
          </div>
      </div> 
    </div>
</div>
</template>

<script>
export default {
      data(){
          return{
            lineNumber:4,
            bcgmf:true,
            goodInfo:[
            {
              good_no: 1,
              good_name:'iphone12苹果手机pro',
              good_size:'apple-12',
              good_unit:'台',
              good_number:'数量',
              good_price:'单价',
              good_total:'金额',
              good_taxm:'税率',
              good_taxp:'税额',
              good_operat:'obj'
            },{
              good_no: 2,
              good_name:'iphone12苹果手机pro',
              good_size:'apple-12',
              good_unit:'台',
              good_number:'数量',
              good_price:'单价',
              good_total:'金额',
              good_taxm:'税率',
              good_taxp:'税额',
              good_operat:'obj2'
            }]
          }
      } 
};
</script>

<style>
</style>