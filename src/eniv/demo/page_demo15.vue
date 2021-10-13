<style lang="less">
  @import url(./less/fpmb.less);
</style>
<template>
  <!--销项管理首页-->
  <div class="home-xxgl">
      <div class="rh-page-header">
        <div class="rh-head-and-operate">
              <div class="tips-content">
                    <span class="rh-helpTip-text">
                          销项管理首页
                    </span>
                    <span class="rh-helpTip-icon">
                          <el-tooltip class="item" content="注册页面包含用户名注册规则提示，密码设置规则以及校验">
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
        <div class="tabs-wrap">
            <el-tabs v-model="activeName" @tab-click="handleClick" class="rh-tabs" size="mini">
                  <el-tab-pane label="首页" name="tab1">
                    <div class="selection qyjbxx">
                      <div class="page-title">企业基本信息</div>
                      <el-row>
                        <el-col :span="8">
                            <el-row>
                              <el-col :span="8">
                                  <div class="qy-info">纳税人识别号：</div>
                              </el-col>
                              <el-col :span="16">
                                  <div class="qy-val">11111111111111</div>
                              </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="8">
                            <el-row>
                              <el-col :span="8">
                                  <div class="qy-info">主管税务机关：</div>
                              </el-col>
                              <el-col :span="16">
                                  <div class="qy-val">国家税务总局商河县税务局许商税务分局</div>
                              </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="8">
                            <el-row>
                              <el-col :span="8">
                                  <div class="qy-info">电子发票标识：</div>
                              </el-col>
                              <el-col :span="16">
                                  <div class="qy-val">非电子发票</div>
                              </el-col>
                            </el-row>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                            <el-row>
                              <el-col :span="8">
                                  <div class="qy-info">纳税人名称：</div>
                              </el-col>
                              <el-col :span="16">
                                  <div class="qy-val">九阳电器有限公司</div>
                              </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="8">
                            <el-row>
                              <el-col :span="8">
                                  <div class="qy-info">核定发票类型：</div>
                              </el-col>
                              <el-col :span="16">
                                  <div class="qy-val">增值税专用发票004</div>
                              </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="8">
                            <el-row>
                              <el-col :span="8">
                                  <div class="qy-info">农产品企业标识：</div>
                              </el-col>
                              <el-col :span="16">
                                  <div class="qy-val">是</div>
                              </el-col>
                            </el-row>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                            <el-row>
                              <el-col :span="8">
                                  <div class="qy-info">省份：</div>
                              </el-col>
                              <el-col :span="16">
                                  <div class="qy-val">山东</div>
                              </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="8">
                            <el-row>
                              <el-col :span="8">
                                  <div class="qy-info">纳税人识别号：</div>
                              </el-col>
                              <el-col :span="16">
                                  <div class="qy-val">11111111111111</div>
                              </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="8">
                            <el-row>
                              <el-col :span="8">
                                  <div class="qy-info">纳税人识别号：</div>
                              </el-col>
                              <el-col :span="16">
                                  <div class="qy-val">11111111111111</div>
                              </el-col>
                            </el-row>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                            <el-row>
                              <el-col :span="8">
                                  <div class="qy-info">纳税人性质：</div>
                              </el-col>
                              <el-col :span="16">
                                  <div class="qy-val">一般纳税人</div>
                              </el-col>
                            </el-row>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="selection zjfw">
                      <div class="page-title">最近访问的服务</div>
                      <div class="items clearfix">
                          <div class="bt-info">电子普票单张填开</div>
                          <div class="bt-info">普票发票单张填开</div>
                          <div class="bt-info">单据导入开具</div>
                          <div class="bt-info">发票分发管理</div>
                          <div class="bt-info">短信推送</div>
                          <div class="bt-info">销项发票查询</div>
                      </div>
                    </div>
                     <div class="selection qysjxx">
                       <div class="page-title">企业数据信息</div>
                       <div class="state-tg-wrap">
                          <table class="table_qysj">
                            <tr>
                              <td>
                                <div class="qysj-bar">
                                    <div class="qysj-icon"> 
                                        <i class="el-icon-s-grid"></i>
                                    </div>
                                    <div class="qysj-detail">
                                        <div class="qysj-name">今日开票张数</div>
                                        <div class="qysj-val"><span class="n">1526</span><span class="unit">张</span></div>
                                    </div>
                                </div>
                              </td>
                              <td>
                                <div class="qysj-bar">
                                    <div class="qysj-icon"> 
                                        <i class="el-icon-paperclip"></i>
                                    </div>
                                    <div class="qysj-detail">
                                        <div class="qysj-name">今日价税合计</div>
                                        <div class="qysj-val"><span class="n">1526</span><span class="unit">元</span></div>
                                    </div>
                                </div>
                              </td>
                              <td>
                                <div class="qysj-bar">
                                    <div class="qysj-icon"> 
                                        <i class="el-icon-magic-stick"></i>
                                    </div>
                                    <div class="qysj-detail">
                                        <div class="qysj-name">开票点总数量</div>
                                        <div class="qysj-val"><span class="n">1526</span><span class="unit">家</span></div>
                                    </div>
                                </div>
                              </td>
                              <td>
                                <div class="qysj-bar">
                                    <div class="qysj-icon"> 
                                        <i class="el-icon-mobile"></i>
                                    </div>
                                    <div class="qysj-detail">
                                        <div class="qysj-name">本月价税合计</div>
                                        <div class="qysj-val"><span class="n">1526</span><span class="unit">元</span></div>
                                    </div>
                                </div>
                              </td>
                              <td>
                                <div class="qysj-bar">
                                    <div class="qysj-icon"> 
                                        <i class="el-icon-umbrella"></i>
                                    </div>
                                    <div class="qysj-detail">
                                        <div class="qysj-name">本月开票张数</div>
                                        <div class="qysj-val"><span class="n">1526</span><span class="unit">张</span></div>
                                    </div>
                                </div>                                
                              </td>
                            </tr>
                          </table>
                       </div>
                       <div class="party-left">
                          <div class="tabs-wrap">
                            <div class="tab-item active" >高新区新泺大街店</div>
                            <div class="tab-item">高新区康虹路店</div>
                            <div class="tab-item">高新区凤凰路店</div>
                            <div class="tab-item">山大路98号店</div>
                            <div class="tab-item">历山路87号店</div>
                            <div class="tab-item">青年路店</div>
                            <div class="tab-item">英雄山路店</div>
                            <div class="tab-item">千佛山路店</div>
                          </div>
                          
                          <div class="echart-wrap">
                              <div class="echart-head">
                                  <div class="pull-left"></div>
                                  <div class="pull-right">
                                        <el-radio-group v-model="radio1">
                                          <el-radio-button label="昨天"></el-radio-button>
                                          <el-radio-button label="今日"></el-radio-button>
                                          <el-radio-button label="最近7日"></el-radio-button>
                                          <el-radio-button label="深圳"></el-radio-button>
                                        </el-radio-group>
                                           <el-date-picker
                                            v-model="value1"
                                            type="datetime"
                                            style="width:220px;"
                                            placeholder="选择日期时间">
                                          </el-date-picker>
                                  </div>
                              </div>
                              <div class="echart-body"  id="echart1" style="height:400px;"></div>
                          </div>
                       </div>
                       <div class="party-right">
                          <div class="list-head">
                            <div class="lis-left">开票点加税合计排行榜</div>
                            <div class="lis-right">
                                <el-radio-group v-model="radio1">
                                  <el-radio-button label="本月"></el-radio-button>
                                  <el-radio-button label="上月"></el-radio-button>
                                </el-radio-group>
                            </div>
                          </div>
                          <div class="list-content">
                            <div class="lis-tr">
                              <div class="lis-t1"><div class="indent">1</div></div>
                              <div class="lis-t2"><span class="name">高新区新泺大街店</span></div>
                              <div class="lis-t3"><span class="yang">￥</span><span class="money">9952</span></div>
                              <div class="lis-t4"><div class="progress red" style="width:85%">85%</div></div>
                            </div>
                            <div class="lis-tr">
                              <div class="lis-t1"><div class="indent">2</div></div>
                              <div class="lis-t2"><span class="name">高新区新泺大街店</span></div>
                              <div class="lis-t3"><span class="yang">￥</span><span class="money">9952</span></div>
                              <div class="lis-t4"><div class="progress yellow" style="width:75%">35%</div></div>
                            </div>
                            <div class="lis-tr">
                              <div class="lis-t1"><div class="indent">3</div></div>
                              <div class="lis-t2"><span class="name">高新区新泺大街店</span></div>
                              <div class="lis-t3"><span class="yang">￥</span><span class="money">9952</span></div>
                              <div class="lis-t4"><div class="progress blue"  style="width:65%">35%</div></div>
                            </div>
                            <div class="lis-tr">
                              <div class="lis-t1"><div class="indent">4</div></div>
                              <div class="lis-t2"><span class="name">高新区新泺大街店</span></div>
                              <div class="lis-t3"><span class="yang">￥</span><span class="money">9952</span></div>
                              <div class="lis-t4"><div class="progress blue" style="width:35%">35%</div></div>
                            </div>
                            <div class="lis-tr">
                              <div class="lis-t1"><div class="indent">5</div></div>
                              <div class="lis-t2"><span class="name">高新区新泺大街店</span></div>
                              <div class="lis-t3"><span class="yang">￥</span><span class="money">9952</span></div>
                              <div class="lis-t4"><div class="progress" style="width:45%">45%</div></div>
                            </div>
                            <div class="lis-tr">
                              <div class="lis-t1"><div class="indent">6</div></div>
                              <div class="lis-t2"><span class="name">高新区新泺大街店</span></div>
                              <div class="lis-t3"><span class="yang">￥</span><span class="money">9952</span></div>
                              <div class="lis-t4"><div class="progress" style="width:55%">55%</div></div>
                            </div>
                            <div class="lis-tr">
                              <div class="lis-t1"><div class="indent">7</div></div>
                              <div class="lis-t2"><span class="name">高新区新泺大街店</span></div>
                              <div class="lis-t3"><span class="yang">￥</span><span class="money">9952</span></div>
                              <div class="lis-t4"><div class="progress"  style="width:65%">65%</div></div>
                            </div>
                            <div class="lis-tr">
                              <div class="lis-t1"><div class="indent">8</div></div>
                              <div class="lis-t2"><span class="name">高新区新泺大街店</span></div>
                              <div class="lis-t3"><span class="yang">￥</span><span class="money">9952</span></div>
                              <div class="lis-t4"><div class="progress">35%</div></div>
                            </div>
                            <div class="lis-tr">
                              <div class="lis-t1"><div class="indent">9</div></div>
                              <div class="lis-t2"><span class="name">高新区新泺大街店</span></div>
                              <div class="lis-t3"><span class="yang">￥</span><span class="money">9952</span></div>
                              <div class="lis-t4"><div class="progress">35%</div></div>
                            </div>
                            <div class="lis-tr">
                              <div class="lis-t1"><div class="indent">10</div></div>
                              <div class="lis-t2"><span class="name">高新区新泺大街店</span></div>
                              <div class="lis-t3"><span class="yang">￥</span><span class="money">9952</span></div>
                              <div class="lis-t4"><div class="progress">35%</div></div>
                            </div>
                          </div>
                       </div>
                     </div>
                  </el-tab-pane>
                  <el-tab-pane label="流程指引" name="tab2">
2                     
                  </el-tab-pane>
                  <el-tab-pane label="发票类型" name="tab3">
                      <fpkjFplxxx></fpkjFplxxx>
                  </el-tab-pane>
                  <el-tab-pane label="发票领购信息" name="tab3">
3
                  </el-tab-pane>
            </el-tabs>
        </div>
     </div>
  </div>
</template>

<script>
var echarts = require('echarts');
import fpkjFplxxx from './fplx.vue'
export default {
      data(){
          return{
              activeName:'tab1',
              radio1:'',
              radio1:'',
              value1:''
          }
      },
      components:{fpkjFplxxx},
      mounted(){
          this.setEChart('echart1');
      },
      methods:{
            handleClick:function(tab,event){
                  console.log(tab,event);
                  //tab节点查找el-tabs__content节点
                  event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.transform="translateX("+tab.index*(-100)+"%)";
                  //console.log(event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling);

            },
            setEChart(id){
              var myChart = echarts.init(document.getElementById(id));
               var   option = {
                      tooltip: {
                          trigger: 'axis',
                          axisPointer: { 
                              type: 'shadow' ,
                              textStyle: {
                                  color: '#fff',
                                  fontSize: '26'
                              },
                          }
                      },
                      legend: {
                          top:'0%',
                          left:'0%',
                          data: ['增值税发票', '普通发票'],
                          textStyle:{
                              fontSize:12,
                              color:'#808080'
                          },
                          icon:'rect'
                      },
                      grid: {
                          top:60,
                          left:50,
                          bottom:60,
                          right:60
                      },
                      xAxis: [{
                          type: 'category',
                          axisTick:{
                              show:false
                          },
                          axisLine:{
                              show:false
                          },
                          axisLabel:{
                              color:'#4D4D4D',
                              fontSize:14,
                              margin:21,
                              fontWeight:'bold'
                          },
                          data: ['1', '2', '3', '4','1', '2', '3', '4'],
                        
                      }],
                      yAxis: [{
                          name:'单位：万',
                          nameTextStyle:{
                              color:'#808080',
                              fontSize:12,
                              padding:[0, 0, 0, -5]
                          },
                          max: function(value) {
                              if(value.max<5){
                                  return 5
                              }else{
                                  return value.max
                              }
                          },
                          type: 'value',
                          axisLine:{
                              show:false
                          },
                          axisLabel:{
                              color:'#808080',
                              fontSize:12,
                              margin:5
                          },
                          splitLine:{
                              show:false
                          },
                          axisTick:{
                              show:false
                          }
                      }],
                      series: [
                          {
                              name: '增值税发票',
                              type: 'bar',
                              label:{
                                  show:true,
                                  position:'top',
                                  fontSize:14,
                                  color:'#3DC3F0',
                                  fontWeight:'bold'
                              },
                              barMaxWidth:60,
                              itemStyle:{
                                  color: {
                                      type: 'linear',
                                      x: 0,
                                      y: 0,
                                      x2: 0,
                                      y2: 1,
                                      colorStops: [{
                                          offset: 0, color: '#3DC3F0' // 0% 处的颜色
                                      }, {
                                          offset: 1, color: '#CCF2FF' // 100% 处的颜色
                                      }]
                                  }
                              },
                              data: [60, 110, 180, 100,60, 110, 180, 100]
                          }, 
                          {
                              name: '普通发票',
                              type: 'bar',
                              label:{
                                  show:true,
                                  position:'top',
                                  fontSize:14,
                                  color:'#3D8BF0',
                                  fontWeight:'bold'
                              },
                              barMaxWidth:60,
                              itemStyle:{
                                  color: {
                                      type: 'linear',
                                      x: 0,
                                      y: 0,
                                      x2: 0,
                                      y2: 1,
                                      colorStops: [{
                                          offset: 0, color: '#3D8BF0' // 0% 处的颜色
                                      }, {
                                          offset: 1, color: '#CCE2FF' // 100% 处的颜色
                                      }]
                                  }
                              },
                              data: [90, 130, 170, 130,90, 130, 170, 130]
                          }
                      ]
                  };
              myChart.setOption(option);
            }
      }
}
</script>
<style lang="less">
  .home-xxgl{
    .el-tabs__content{
          overflow: inherit;
    }
    .tabs-wrap{
          width:100%;
          overflow: hidden;
    }
  }
</style>