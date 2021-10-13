<template>
  <div class="fplx rh-page-content" style="padding-top:0px;">
    <!-- 发票类型 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="增值税专用发票" name="first">
      <div class="selection jkglsjxx">
        <div class="page-title">监控管理基本信息</div>
        <el-row>
          <el-col :span="6">
            <el-row>
              <el-col :span="8">
                  <div class="qy-info">开票开启时间：</div>     
              </el-col>
              <el-col :span="16">
                  <div class="qy-val">2021-01-02 12：12：12</div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="8">
                  <div class="qy-info">开票开启时间：</div>
              </el-col>
              <el-col :span="16">
                  <div class="qy-val">2021-01-02 12：12：12</div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="8">
                  <div class="qy-info">开票开启时间：</div>
              </el-col>
              <el-col :span="16">
                  <div class="qy-val">2021-01-02 12：12：12</div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="8">
                  <div class="qy-info">开票开启时间：</div>
              </el-col>
              <el-col :span="16">
                  <div class="qy-val">2021-01-02 12：12：12</div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
              <el-row>
                <el-col :span="8">
                    <div class="qy-info">纳税人识别号：</div>
                </el-col>
                <el-col :span="16">
                    <div class="qy-val">11111111111111</div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row>
                <el-col :span="8">
                    <div class="qy-info">纳税人识别号：</div>
                </el-col>
                <el-col :span="16">
                    <div class="qy-val">11111111111111</div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row>
                <el-col :span="8">
                    <div class="qy-info">纳税人识别号：</div>
                </el-col>
                <el-col :span="16">
                    <div class="qy-val">11111111111111</div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
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
        <el-col :span="6">
          <el-row>
            <el-col :span="8">
                <div class="qy-info">纳税人识别号：</div>
            </el-col>
            <el-col :span="16">
                <div class="qy-val">11111111111111</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="8">
                <div class="qy-info">纳税人识别号：</div>
            </el-col>
            <el-col :span="16">
                <div class="qy-val">11111111111111</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="8">
                <div class="qy-info">纳税人识别号：</div>
            </el-col>
            <el-col :span="16">
                <div class="qy-val">11111111111111</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
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
        <el-col :span="6">
          <el-row>
            <el-col :span="8">
                <div class="qy-info">纳税人识别号：</div>
            </el-col>
            <el-col :span="16">
                <div class="qy-val">11111111111111</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="8">
                <div class="qy-info">纳税人识别号：</div>
            </el-col>
            <el-col :span="16">
                <div class="qy-val">11111111111111</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="8">
                <div class="qy-info">纳税人识别号：</div>
            </el-col>
            <el-col :span="16">
                <div class="qy-val">11111111111111</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
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
        <div class="page-title">税率信息</div>
        <div class="table-wrap">
          <el-table
            :data="tableData"
            border
            max-height ="350"
          @row-click="rows"
          :row-class-name="setIndex"
            style="width: 100%">
                <el-table-column 
                type="selection" 
                fixed ="left"
                width="50">
                </el-table-column>
                <el-table-column
                  type="index"
                  label="序号"
                  width="255"
                  :index="indexMethod">
                </el-table-column>
                <el-table-column
                  prop="date"
                  sortable
                  label="日期"
                  width="280">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="单位代码"
                 >
                    <template slot="header">
                          <span class="rh-th-text">单位代码</span>
                          <el-tooltip 
                          trigger="hover" 
                          effect = "dark"
                          content="">
                                <div slot="content" style="width:140px;">
                                      单位代码：请选择一个或多个要设置备份策略的存储库
                                </div>
                                <i class="el-icon-question rh-thead-icon" style="font-size:16px"></i>
                          </el-tooltip>
                    </template>
                </el-table-column>
          </el-table>
        </div>
      </div>
      </el-tab-pane>
      <el-tab-pane label="增值税普通发票" name="second">增值税普通发票</el-tab-pane>
      <el-tab-pane label="增值税电子普通发票" name="third">增值税电子普通发票</el-tab-pane>
      <el-tab-pane label="增值税电子专用票" name="fourth">增值税电子专用票</el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
export default {
      data(){
          return{
              activeName:'tab1',
              tableData: [
                {
                  date: '2016-05-02',
                  name: '王小虎1',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333,
                  tag: '家'
                  }, {
                  date: '2016-05-04',
                  name: '王小虎2',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1517 弄',
                  zip: 200333,
                  tag: '公司'
                  }, {
                  date: '2016-05-01',
                  name: '王小虎3',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1519 弄',
                  zip: 200333,
                  tag: '家'
                  }, {
                  date: '2016-05-03',
                  name: '王小虎4',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1516 弄',
                  zip: 200333,
                  tag: '公司'
                },{
                  date: '2016-05-02',
                  name: '王小虎1',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333,
                  tag: '家'
                  }, {
                  date: '2016-05-04',
                  name: '王小虎2',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1517 弄',
                  zip: 200333,
                  tag: '公司'
                  }, {
                  date: '2016-05-01',
                  name: '王小虎3',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1519 弄',
                  zip: 200333,
                  tag: '家'
                  }, {
                  date: '2016-05-03',
                  name: '王小虎4',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1516 弄',
                  zip: 200333,
                  tag: '公司'
                },
            ],
          }
      }   ,
      methods:{
          handleClick:function(tab,event){
                console.log(tab,event);
                //tab节点查找el-tabs__content节点
                event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.transform="translateX("+tab.index*(-100)+"%)";
                //console.log(event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling);
          },
      }
}
</script>

<style>

</style>