<template>
  <div class="my-order">
    <div class="rh-page-header">
      <div class="rh-head-and-operate">
        <div class="tips-content">
              <span class="rh-helpTip-text">
                    我的订单
              </span>
              <span class="rh-helpTip-icon">
                    <el-tooltip class="item" content="云数据库GaussDB(for MySQL)是华为自研的最新一代企业级高扩展海量存储分布式数据库，完全兼容MySQL">
                          <i class="el-icon-info"></i>
                    </el-tooltip>
              </span>
        </div>
        <div class="operate-btns"  style="display:none;">
              <el-button>操作</el-button>
        </div>
      </div>
    </div>
    <div class="rh-page-content">
      <div class="rh-operate clearfix">
        <div class="rh-pull-right">
              <el-button type="warning">在线开票</el-button>
              <el-button type="danger">申请开票</el-button>
              <el-button type="primary">查看发票</el-button>
        </div>
      </div>
      <div class="rh-table">
        <el-table :data="tableData" height="500"  @selection-change="handleSelectionChange"
                        style="width: 100%">
          <el-table-column type="selection" align="center" label="选择"></el-table-column>
          <el-table-column align="center" prop="ddbh" label="订单编号"></el-table-column>
          <el-table-column align="center" prop="hth" label="合同号"></el-table-column>
          <el-table-column align="center" prop="je" label="金额" width="120"></el-table-column>
          <el-table-column align="center" prop="jfsj" label="缴费时间" width="120"></el-table-column>
          <el-table-column align="center" prop="zfzt" label="支付状态" width="120"></el-table-column>
          <el-table-column align="center" prop="fpzt" label="发票状态" width="120"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
          tableData:[{
            ddbh: '2016-05-03',
            hth: 'HTAA20210901',
            je: '150',
            jfsj:'2021-08-02',
            zfzt:'已支付',
            fpzt:'已开票'
          }]
        }
    },
    methods:{
      handleSelectionChange(){

      }
    }
}
</script>

<style>

</style>