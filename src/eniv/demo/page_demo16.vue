 <style  lang="less">
    @import url('./less/pro_list.less');
 </style>
 <template>
  <div class="goods_list">
    <h1 class="text-title">销售货物或者提供应税劳务清单</h1>
    <div class="table_1">
      <div class="td td1">购货单位名称：</div>
      <div class="td td2">北京市朝阳区安贞社区卫生服务中心</div>
      <div class="clear"></div>
    </div>
    <div class="table_1">
      <div class="td td1">销货单位名称：</div>
      <div class="td td2">华润医药商业集团有限公司</div>
      <div class="clear"></div>
    </div>
      <table class="table_0">
        <tr>
          <td class="td1">所属增值税普通发票代码：</td>
          <td class="td2">011001800311</td>
          <td class="td3">号码：</td>
          <td class="td4">669636673</td>
          <td class="td5" style="max-width: 345px;">                
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage2"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="sizes, prev, pager, next"
                :total="1000">
              </el-pagination>
          </td>
        </tr>
      </table>
      <div class="table_2">
        <div class="head">
            <div class="td td1">
              序号
            </div>
            <div class="td td2">
            商品名称
            </div>
            <div class="td td2_1">
            商品规格
            </div>
            <div class="td td3">
              单位
            </div>
            <div class="td td4">
              数量
            </div>
            <div class="td td5">
              单价(无税)
            </div>
            <div class="td td6">
              金额(无税)
            </div>
            <div class="td td7">
              税率
            </div>
            <div class="td td8">
              税额
            </div>
        </div>
        <div class="body">
          <div class="tr" v-for="(item,index) in list" :key="index">
          <div class="td td1">
            {{index+1}}
          </div>
          <div class="td td2">
            {{item.por_name}}
          </div>
          <div class="td td2_1">
            {{item.pro_size}}
          </div>
          <div class="td td3">
            {{item.pro_unit}}
          </div>
          <div class="td td4">
          {{ item.pro_number}}
          </div>
          <div class="td td5">
            {{item.pro_priceSingle}}
          </div>
          <div class="td td6">
            {{item.pro_priceAll}}
          </div>
          <div class="td td7">
          {{item.pro_taxRatio}}
          </div>
          <div class="td td8">
            {{item.pro_tax}}
          </div>
          </div>
          <div class="tr xiaoji">
            <div class="td td1">
            小计
            </div>
            <div class="td td2"></div>
            <div class="td td2_1"></div>
            <div class="td td3"></div>
            <div class="td td4"></div>
            <div class="td td5"></div>
            <div class="td td6">
              1，591,55
            </div>
            <div class="td td7"></div>
            <div class="td td8">
              254.65
            </div>
          </div>
          <div class="tr zongji">
            <div class="td td1">
            合计
            </div>
            <div class="td td2"></div>
            <div class="td td2_1"></div>
            <div class="td td3"></div>
            <div class="td td4"></div>
            <div class="td td5"></div>
            <div class="td td6">
              1，591,55
            </div>
            <div class="td td7"></div>
            <div class="td td8">
              254.65
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="tr">
            <div class="td td1">
                备注
            </div>
            <div class="td td2">
              
            </div>
          </div>
        </div>
      </div>
      <table class="table_3">
        <tr>
          <td class="t1">销货方(章)：</td>
          <td class="t2"></td>
          <td class="t3">填开日期：</td>
          <td class="t4">2018年11月27日</td>
        </tr>
      </table>
    </div>
</template>

<script>
export default {
      data(){
          return{
            list:[
              {por_name:'醒脑静注射液*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'甘精胰岛素*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'甘精胰岛素*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'醒脑静注射液*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'甘精胰岛素*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'甘精胰岛素*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'醒脑静注射液*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'甘精胰岛素*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'甘精胰岛素*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'醒脑静注射液*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'甘精胰岛素*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'甘精胰岛素*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'醒脑静注射液*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'甘精胰岛素*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'甘精胰岛素*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'醒脑静注射液*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'甘精胰岛素*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'甘精胰岛素*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'醒脑静注射液*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'甘精胰岛素*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'甘精胰岛素*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'醒脑静注射液*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'甘精胰岛素*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'甘精胰岛素*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},
              {por_name:'醒脑静注射液*中成药注射液*',pro_size:'10ml*6支',pro_unit:'盒',pro_number:'5,000',pro_priceSingle:'339.3103448276',pro_priceAll:'1,969.55',pro_taxRatio:'16%',pro_tax:'271.45'},  ],
            page:{
              total:'10',
              size: '20',
              current:'1'
            },
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4
          }
      },
      methods:{
            //初始化分页
            init_page() {
              this.page.total = this.tableData.total;
              this.page.size = this.tableData.size;
              this.page.current = this.tableData.current;
            },
            handleSizeChange(val) {
              console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
              console.log(`当前页: ${val}`);
            },
            //分页页码操作
            handleSelectionChange(val) {
              this.tr_sels = val;
            },
            //分页操作
            handleCurrentChange(val) {
              this.queryForm.pageNo = val;
              //更改分页后重新初始化页面
              this.init_Table();
            },
      }
}
</script>

<style>

</style>