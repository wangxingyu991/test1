<style  lang="less">
@import url("./fpkj/escfp.less");
</style>
<template>
  <div class="escfp">
      <div class="rh-page-header">
            <div class="rh-head-and-operate">
                  <div class="tips-content">
                        <span class="rh-helpTip-text">
                        二手车发票开具
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
      <div class="padding_20">
        <div class="main fp_esc">
          <!--top-->
          <div class="top">
            <div class="top_f1">
              <p  class="swRadio"> <span class="title">保存购买方: </span> <el-switch v-model="bcgmf"></el-switch></p>
              <p>收票方手机:</p>
              <p>收票方邮箱:</p>
              <p>机&nbsp;器&nbsp;&nbsp;编&nbsp;码:</p>
            </div>
            <div class="top_center_pic">
              
            </div>
            <div class="top_center">
              <h1>二手车销售销售统一发票</h1>
              <div class="d"></div>
              <div class="d"></div>
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
                <tr>
                  <td class="td_1">
                    <div class="text_1">机打代码<i></i></div>
                    <div class="text_2">机打号码<i></i></div>
                    <div class="text_3">机器编号<i></i></div>
                  </td>
                  <td class="td_2">
                      
                  </td>
                  <td class="td_3">
                    <div class="text_row">
                      税<i></i>
                    </div>
                    <div class="text_row">
                      控<i></i>
                    </div>
                    <div class="text_row">
                      码<i></i>
                    </div>
                  </td>
                  <td class="td_4">

                  </td>
                </tr>
              </table>
              <table class="table_2">
                <tr>
                  <td class="td_1">
                    <div class="text_row">
                    买房单位/个人<i></i>
                    </div>
                  </td>
                  <td class="td_2">

                  </td>
                  <td class="td_3">
                    <div class="text_row">
                      单位代码/身份证号码
                      <i></i>
                    </div>
                  </td>
                  <td class="td_4">

                  </td>
                </tr>
              </table>
              <table class="table_3">
                <tr>
                  <td class="td_1">
                    <div class="text_row">
                      买方单位/个人住址<i></i>
                    </div>
                  </td>
                  <td class="td_2">

                  </td>
                  <td class="td_3">
                    <div class="text_row">
                      电话
                      <i></i>
                    </div>
                  </td>
                  <td class="td_4"></td>
                </tr>
              </table>
              <table class="table_4">
                <tr>
                  <td class="td_1">
                    <div class="text_row">
                    卖方单位/个人<i></i>
                    </div>
                  </td>
                  <td class="td_2">

                  </td>
                  <td class="td_3">
                    <div class="text_row">
                        单位代码/身份证号码<i></i>
                    </div>
                  
                  </td>
                  <td class="td_4"></td>
                </tr>
              </table>
              <table class="table_5">
                <tr>
                  <td class="td_1">
                    <div class="text_row">
                      卖方单位/个人住址<i></i>
                      </div>
                  </td>
                  <td class="td_2">

                  </td>
                  <td class="td_3">
                    <div class="text_row">
                    电话<i></i>
                    </div>
                  </td>
                  <td class="td_4">

                  </td>
                </tr>
              </table>

              <table class="table_6">
                <tr>
                  <td class="td_1">
                    <div class="text_row">
                    车牌照号<i></i>
                    </div>
                  </td>
                  <td class="td_2">

                  </td>
                  <td class="td_3">
                    <div class="text_row">
                    登记证号<i></i>
                    </div>
                  </td>
                  <td class="td_6">

                  </td>
                  <td class="td_4">
                      <div class="text_row">
                      车辆类型<i></i>
                      </div>
                  </td>
                  <td class="td_5">
                      <div class="td_5">

                      </div>
                  </td>
                </tr>
              </table>
              <table class="table_7">
                <tr>
                  <td class="td_1">
                    <div class="text_row">
                      车架号/车辆识别代码<i></i>
                    </div>
                  </td>
                  <td class="td_2">

                  </td>
                  <td class="td_3">
                    <div class="text_row">
                      厂牌型号<i></i>
                    </div>
                  </td>
                  <td class="td_4">

                  </td>
                  <td class="td_5">
                    <div class="text_row">
                      转入地车辆<i></i>
                    </div>
                    <div class="text_row">
                      管理所名称<i></i>
                    </div>
                  </td>
                  <td class="td_6">

                  </td>
                </tr>
              </table>
              <table class="table_8">
                <tr>
                  <td class="td_1">
                    <div class="text_row">
                      车价合计( 大写 )<i></i>
                    </div>
                  </td>
                  <td class="td_2">

                  </td>
                  <td class="td_3">
                    <div class="text_row">
                    小写<i></i>
                    </div>
                  </td>
                  <td class="td_4">
                    
                  </td>
                </tr>
              </table>
              <table class="table_9">
                <tr>
                  <td class="td_1">                  
                    <div class="text_row">
                      经营，拍卖单位<i></i>
                    </div>
                  </td>
                  <td class="td_2"></td>
                </tr>
              </table>
              <table class="table_10">
                <tr >
                  <td class="td_1">
                    <div class="text_row">
                      经营，拍卖单位地址<i></i>
                    </div>
                  </td>
                  <td class="td_2">

                  </td>
                  <td class="td_3">
                    <div class="text_row">
                      电话<i></i>
                    </div>
                  </td>
                  <td class="td_4">

                  </td>
                </tr>
              </table>
              <table class="table_11">
                <tr >
                  <td class="td_1">
                    <div class="text_row">
                      开户银行，账号<i></i>
                    </div>
                  </td>
                  <td class="td_2">

                  </td>
                  <td class="td_3">
                    <div class="text_row">
                      纳税人<i></i>
                    </div>
                    
                  </td>
                  <td class="td_4">
                    
                  </td>
                </tr>
              </table>
              <table class="table_12">
                <tr >
                  <td class="td_1">
                    <div class="text_row">
                      二手车市场<i></i>
                    </div>
                  </td>
                  <td class="td_2">

                  </td>
                  <td class="td_3">
                    <table class="table_13">
                      <tr>
                        <td class="td_1">
                          <div class="text_row">
                            纳税人识别号<i></i>
                          </div>
                        </td>
                        <td class="td_2">

                        </td>
                      </tr>
                      <tr>
                        <td class="td_1">
                          <div class="text_row">
                            地址<i></i>
                          </div>
                        </td>
                        <td class="td_2">

                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table class="table_14">
                <tr>
                  <td class="td_1">
                      <div class="text_row">
                      开户银行、账号<i></i>
                      </div>
                  </td>
                  <td class="td_2">

                  </td>
                <td class="td_3">
                      <div class="text_row">
                      电话<i></i>
                      </div>
                  </td>
                  <td class="td_4">

                  </td>
                </tr>
              </table>
              <table class="table_15">
                <tr>
                  <td class="td_1">
                      <div class="text_row">
                        备注<i></i>
                      </div>
                  </td>
                  <td class="td_2">

                  </td>
                </tr>
              </table>
          </div>
          <div class="bottom">
            <span style="width: 42%">开票单位(盖章)</span>
            <span style="width: 26%">开票人</span
            ><span style="width: 30%">手写无效</span>
          </div>
          <div class="goodInfo" style="display:none;">
            <el-scrollbar style="height:100%">
                <div class="tr">
                  <div class="td good_no">1</div>
                  <div class="td good_name">
                    <input class="good_input1 default-input" type="text" value="" />
                    <i class="el-icon-school"></i>
                  </div>
                  <div class="td good_size">
                    <input  class="good_input2 default-input" type="text" value="" />
                  </div>
                  <div class="td good_unit"><input class="good_input3 default-input" type="text" value="" /></div>
                  <div class="td good_number"><input class="good_input4 default-input" type="text" value="" /></div>
                  <div class="td good_price"><input class="good_input5 default-input" type="text" value="" /></div>
                  <div class="td good_total"><input class="good_input6 default-input" type="text" value="" /></div>
                  <div class="td good_taxm">
                    <select class="good_input7 default-input" type="text" value="">
                      <option value="1">3%</option>
                      <option value="2">5%</option>
                      <option value="3">7%</option>
                    </select>
                  </div>
                  <div class="td good_taxp"><input class="good_input8 default-input" type="text" value="" /></div>
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
                  <div class="td good_name"><input class="good_input1 default-input" type="text" value="" /><i class="el-icon-school"></i></div>
                  <div class="td good_size"><input  class="good_input2 default-input" type="text" value="" /></div>
                  <div class="td good_unit"><input class="good_input3 default-input" type="text" value="" /></div>
                  <div class="td good_number"><input class="good_input4 default-input" type="text" value="" /></div>
                  <div class="td good_price"><input class="good_input5 default-input" type="text" value="" /></div>
                  <div class="td good_total"><input class="good_input6 default-input" type="text" value="" /></div>
                  <div class="td good_taxm">
                      <select class="good_input7 default-input" type="text" value="">
                        <option value="1">3%</option>
                        <option value="2">5%</option>
                        <option value="3">7%</option>
                      </select>
                  </div>
                  <div class="td good_taxp"><input class="good_input8 default-input" type="text" value="" /></div>
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
                  <div class="td good_name"><input class="good_input1 default-input" type="text" value="" /><i class="el-icon-school"></i></div>
                  <div class="td good_size"><input  class="good_input2 default-input" type="text" value="" /></div>
                  <div class="td good_unit"><input class="good_input3 default-input" type="text" value="" /></div>
                  <div class="td good_number"><input class="good_input4 default-input" type="text" value="" /></div>
                  <div class="td good_price"><input class="good_input5 default-input" type="text" value="" /></div>
                  <div class="td good_total"><input class="good_input6 default-input" type="text" value="" /></div>
                  <div class="td good_taxm">
                      <select class="good_input7 default-input" type="text" value="">
                        <option value="1">3%</option>
                        <option value="2">5%</option>
                        <option value="3">7%</option>
                      </select>
                  </div>
                  <div class="td good_taxp"><input class="good_input8 default-input" type="text" value="" /></div>
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
                  <div class="td good_name"><input class="good_input1 default-input" type="text" value="" /><i class="el-icon-school"></i></div>
                  <div class="td good_size"><input  class="good_input2 default-input" type="text" value="" /></div>
                  <div class="td good_unit"><input class="good_input3 default-input" type="text" value="" /></div>
                  <div class="td good_number"><input class="good_input4 default-input" type="text" value="" /></div>
                  <div class="td good_price"><input class="good_input5 default-input" type="text" value="" /></div>
                  <div class="td good_total"><input class="good_input6 default-input" type="text" value="" /></div>
                  <div class="td good_taxm">
                      <select class="good_input7 default-input" type="text" value="">
                        <option value="1">3%</option>
                        <option value="2">5%</option>
                        <option value="3">7%</option>
                      </select>
                  </div>
                  <div class="td good_taxp"><input class="good_input8 default-input" type="text" value="" /></div>
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
                  <div class="td good_name"><input class="good_input1 default-input" type="text" value="" /><i class="el-icon-school"></i></div>
                  <div class="td good_size"><input  class="good_input2 default-input" type="text" value="" /></div>
                  <div class="td good_unit"><input class="good_input3 default-input" type="text" value="" /></div>
                  <div class="td good_number"><input class="good_input4 default-input" type="text" value="" /></div>
                  <div class="td good_price"><input class="good_input5 default-input" type="text" value="" /></div>
                  <div class="td good_total"><input class="good_input6 default-input" type="text" value="" /></div>
                  <div class="td good_taxm">
                      <select class="good_input7 default-input" type="text" value="">
                        <option value="1">3%</option>
                        <option value="2">5%</option>
                        <option value="3">7%</option>
                      </select>
                  </div>
                  <div class="td good_taxp"><input class="good_input8 default-input" type="text" value="" /></div>
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
                  <div class="td good_name"><input class="good_input1 default-input" type="text" value="" /><i class="el-icon-school"></i></div>
                  <div class="td good_size"><input  class="good_input2 default-input" type="text" value="" /></div>
                  <div class="td good_unit"><input class="good_input3 default-input" type="text" value="" /></div>
                  <div class="td good_number"><input class="good_input4 default-input" type="text" value="" /></div>
                  <div class="td good_price"><input class="good_input5 default-input" type="text" value="" /></div>
                  <div class="td good_total"><input class="good_input6 default-input" type="text" value="" /></div>
                  <div class="td good_taxm">
                      <select class="good_input7 default-input" type="text" value="">
                        <option value="1">3%</option>
                        <option value="2">5%</option>
                        <option value="3">7%</option>
                      </select>
                  </div>
                  <div class="td good_taxp"><input class="good_input8 default-input" type="text" value="" /></div>
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
                  <div class="td good_no">6</div>
                  <div class="td good_name"><input class="good_input1 default-input" type="text" value="" /><i class="el-icon-school"></i></div>
                  <div class="td good_size"><input  class="good_input2 default-input" type="text" value="" /></div>
                  <div class="td good_unit"><input class="good_input3 default-input" type="text" value="" /></div>
                  <div class="td good_number"><input class="good_input4 default-input" type="text" value="" /></div>
                  <div class="td good_price"><input class="good_input5 default-input" type="text" value="" /></div>
                  <div class="td good_total"><input class="good_input6 default-input" type="text" value="" /></div>
                  <div class="td good_taxm">
                      <select class="good_input7 default-input" type="text" value="">
                        <option value="1">3%</option>
                        <option value="2">5%</option>
                        <option value="3">7%</option>
                      </select>
                  </div>
                  <div class="td good_taxp"><input class="good_input8 default-input" type="text" value="" /></div>
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
          <div class="inputVal-wrap" >
              <div class="table_nr">
                <div class="top_left top_left_1" id="jqbh">
                  <div class="tg">
                  </div>
                </div>
                <div class="top_left top_left_2" id="jqbh">
                    <input class="input_option" type="text" value="1" />
                </div>
                <div class="top_left top_left_3" id="jqbh">
                    <input class="input_option" type="text" value="1" />
                </div>
                <div class="top_left top_left_4" id="jqbh">
                  <input class="input_option" type="text" value="1" />
                </div>

                <div class="top_right_1" id="fpdm">111001571071</div>
                <div class="top_right_2" id="fphm">00800659</div>
                <div class="top_right_3" id="kprq">2015年08月01日</div>
                <div class="top_right_4" id="xym">56630 38837 39755 55396</div>
                <div class="head_item item-1" id="gmfmc_esc" style="display:none;"><input class="input_option" type="text" value="1" /></div>
                <div  class="head_item item-2" id="gmfsbh_esc"><input class="input_option" type="text" value="1" /></div>
                <div  class="head_item item-3" id="gmfdzdh_esc"><input class="input_option" type="text" value="1" /></div>
                <div  class="head_item item-4" id="gmfzh_esc"><input class="input_option" type="text" value="1" /></div>
                <div class="head_item item-5" id="mmq_esc" style="font-size: 16px">
                    036217*58061791879+57641717&lt;56&lt;82/9*09 <br/>
                    90>/>&lt;&lt;95113/1**01/3319+0//48/*4/58-18<br/>
                    234/84—0/618V97&lt;4 34+ 3C6&lt;3+4 3&lt;2184825<br/>
                    x-l-j-24+&lt;00v42&lt;3/O9*8V2288Ol38+6-&gt;<br/>
                </div>
                <div class="head_item item-6">
                  <input class="input_option" type="text" value="" />
                </div>
                <div class="head_item item-7">
                  <input class="input_option" type="text" value="" />
                </div>
                <div class="head_item item-8">
                  <input class="input_option" type="text" value=""  />
                </div>
                <div class="head_item item-9" >
                  <input class="input_option" type="text" value="" style="width:409px"/>
                </div>
                <div class="head_item item-10" >
                  <input class="input_option" type="text" value="" style="width:300px"/>
                </div>
                <div class="head_item item-11">
                  <input class="input_option" type="text" value=""  style="width:300px" />
                </div>
                <div class="head_item item-12">
                  <input class="input_option" type="text" value="" />
                </div>
                <div class="head_item item-13">
                  <input class="input_option" type="text" value="" style="width:230px"/>
                </div>
                <div class="head_item item-14">
                  <input class="input_option" type="text" value="" style="width:400px" />
                </div>
                <div class="head_item item-15">
                  <input class="input_option" type="text" value="" />
                </div>
                <div class="head_item item-16">
                  <input class="input_option" type="text" value="" style="width:100px" />
                </div>
                <div class="head_item item-17">
                  <span class="text">ⓧ</span>
                  <span class="daxie">壹仟叁佰贰拾伍万玖千玖佰玖拾柒元捌角肆分</span>
                </div>
                <div class="head_item item-18">
                  <span class="text">￥</span>
                  <span class="xiaoxie">5266,5885,3691.026</span>
                </div>
              <div class="head_item item-19">
                  <input class="input_option" type="text" value="" style="width:101px" />
                </div>
              <div class="head_item item-20">
                  <input class="input_option" type="text" value="" style="width:240px" />
                </div>
              <div class="head_item item-21">
                  <input class="input_option" type="text" value="" style="width:140px" />
                </div>
              <div class="head_item item-22">
                  <input class="input_option" type="text" value="" style="width:150px" />
                </div>
              <div class="head_item item-23">
                  <input class="input_option" type="text" value="" style="width: 418px;" />
                </div>
              <div class="head_item item-24">
                  <input class="input_option" type="text" value="" style="width:260px" />
                </div>
              <div class="head_item item-25">
                  <input class="input_option" type="text" value="" style="width:319px" />
                </div>
              <div class="head_item item-26">
                  <input class="input_option" type="text" value="" style="width:299px" />
                </div>
              <div class="head_item item-27">
                  <input class="input_option" type="text" value="" style="width:213px" />
                </div>
              <div class="head_item item-28">
                  <input class="input_option" type="text" value="" style="width:213px" />
                </div>
              <div class="head_item item-29">
                  <input class="input_option" type="text" value="" style="width:187px" />
                </div>
              <div class="head_item item-30">
                  <input class="input_option" type="text" value="" style="width:380px" />
                </div>
              <div class="head_item item-31">
                  <input class="input_option" type="text" value="" style="width:380px" />
                </div>
              <div class="head_item item-32">
                  <input class="input_option" type="text" value="" style="width:240px" />
                </div>
              <div class="head_item item-33">
                  <input class="input_option" type="text" value="" style="width:240px" />
                </div>
              <div class="head_item item-34">
                  <input class="input_option" type="text" value="" style="width:385px" />
                </div>
              <div class="head_item item-35">
                  <input class="input_option" type="text" value="" style="width:734px" />
                </div>
              <div class="head_item item-36">
                  <input class="input_option" type="text" value="" style="width:380px" />
                </div>
              <div class="head_item item-37">
                  <input class="input_option" type="text" value="" style="width:134px" />
                </div>
              <div class="head_item item-38">
                  <input class="input_option" type="text" value="" style="width:180px" />
                </div>
              <div class="head_item item-39">
                  <input class="input_option" type="text" value="" style="width:180px" />
                </div>
              </div>
          </div> 
        </div>
      </div>
  </div>
</template>

<script>
export default {
      data(){
        return{
            radio:'含税',
            radio1:'普通征收',
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