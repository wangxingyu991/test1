<style lang="less">
@import url('./less/hzkj.less');
</style>
<template>
  <div class="hzfp">
      <div class="bt-group clearfix">
        <div class="radio_bt">
          <el-radio-group v-model='radio'>
              <el-radio-button  class="rh-radio-button" label="普通征税"></el-radio-button>
              <el-radio-button class="rh-radio-button" label="差额征税"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="pull-left" style="margin-left:14px;">
          <el-button type="primary">保存</el-button>
          <el-button type="primary">打印</el-button>
          <el-button type="primary">返回上一页</el-button>
        </div>
      </div>
      <div class="hzfpkj-wrap">
          <table class="table_0">
            <tr>
              <td class="td td1">填开日期：</td>
              <td class="td td2">2021-07-28</td>
              <td class="td td3">申请方经办人：</td>
              <td class="td td4">Alvin</td>
              <td class="td td5">申请单号：</td>
              <td class="td td6">499111000560210728084507</td>
            </tr>
          </table>
          <table class="_table table_1">
            <tr>
              <td class="td td1" rowspan="2">销</br>方</td>
              <td class="td td2">
                名称：
              </td>
              <td class="td td3">
                <el-input style="width:80%;float:left;"></el-input>
                <el-button style="width:20%;float:left;">...</el-button>
              </td>
              <td class="td td4" rowspan="2">购</br>方</td>
              <td class="td td5">名称：</td>
              <td class="td td6">山东鲁商联盟02</td>
            </tr>
            <tr>
              <td class="td td2">纳税人识别号：</td>
              <td class="td td3"><el-input></el-input></td>
              <td class="td td5">纳税人识别号：</td>
              <td class="td td6">91500000747150305</td>
            </tr>
          </table>
          <table class="_table table_2">
            <tr>
              <td class="td td1" rowspan="10">开</br>具</br>红</br>字</br>专</br>用</br>发</br>票</br>内</br>容</br>方</td>
              <td class="td td2">行号</td>
              <td class="td td3">货物或者应税劳务、服务名称</td>
              <td class="td td4">规格型号</td>
              <td class="td td5">单位</td>
              <td class="td td6">数量</td>
              <td class="td td7">单价(不含税)</td>
              <td class="td td8">金额(不含税)</td>
              <td class="td td9">税率</td>
              <td class="td td10">税额</td>
            </tr>
            <tr v-for="(item,index) in arry" :key="index">
              <td class="td td2">{{++index}}</td>
              <td class="td td3"><el-input style="width:80%;float:left;"></el-input><el-button type="primary" style="width:20%;float:left;padding:0px;">...</el-button></td>
              <td class="td td4"><el-input></el-input></td>
              <td class="td td5"><el-input></el-input></td>
              <td class="td td6"><el-input></el-input></td>
              <td class="td td7"><el-input></el-input></td>
              <td class="td td8"><el-input></el-input></td>
              <td class="td td9"><el-select v-model="select"  placeholder="请选择"><el-option :value="12">12%</el-option><el-option :value="24">24%</el-option></el-select></td>
              <td class="td td10"><el-input></el-input></td>
            </tr>
            <tr>
              <td class="td td2"><span class="cell_name">合计</span></td>
              <td class="td td3"></td>
              <td class="td td4"></td>
              <td class="td td5"></td>
              <td class="td td6"></td>
              <td class="td td7"></td>
              <td class="td td8"><el-input></el-input></td>
              <td class="td td9"></td>
              <td class="td td10"><el-input></el-input></td>
            </tr>
          </table>
          <table class="_table table_3">
            <tr>
              <td class="td td1"><span class="cell_name">说明</span></td>
              <td class="td td2">
                <div class="cell-wrap">
                  <div class="sect">
                    <el-radio v-model="radio1" label="1">购买方申请</el-radio>
                  </div>
                  <div class="sect_">
                     <el-radio disabled  v-model="radio3" label="2">已抵扣</el-radio>
                  </div>
                  <div class="sect_">
                     <el-radio disabled  v-model="radio3" label="3">未抵扣</el-radio>
                  </div>
                  <div class="sect">
                    <el-radio v-model="radio1" label="2">销货方申请</el-radio>
                  </div>
                </div>
              </td>
              <td class="td td3">
                <span class="hint" style="font-size:14px;line-height:50px;">对应蓝字专用发票密码打印的发票信息</span>
                <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="100px" label-position="right">
                  <el-form-item label="发票类型：" prop="name">
                      <el-input v-model="queryForm.item" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="发票代码：" prop="name">
                      <el-input v-model="queryForm.name" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="发票号码：" prop="name">
                      <el-input v-model="queryForm.type" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话：" prop="name">
                      <el-input v-model="queryForm.tel" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="申请理由：" prop="name">
                      <el-input v-model="queryForm.reason"  type="textarea" ></el-input>
                  </el-form-item>
                </el-form> 
              </td>
            </tr>
          </table>
      </div>
  </div>
</template>

<script>
export default {
  data(){
      return{
            radio:'2',
            obj:{},
            select:"",
            radio3:'2',
            radio1:'',
            radio2:'',
            arry:['1','2','3','4','5','6','7','8'],
            queryForm:{},
      }
  } 
}
</script>

<style>

</style>