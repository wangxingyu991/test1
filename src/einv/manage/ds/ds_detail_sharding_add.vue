<template>
  <div class="drawer-wrap ds_add">
    <div class="rh-drawer-head">
        <div class="drawer-title">新增sharding组</div>
    </div>
    <div class="rh-operate clearfix">
        <div class="rh-pull-left">
            <el-button type="primary" @click="onAddDs()" style="margin-left:30px">新增明细</el-button>
        </div>
    </div>
    <div class="rh-drawer-body">
        <el-row>
            <el-row>
                <el-col :span="24">
                        <el-table :data="tableShardingInfo" stripe border height="400">
                            <template slot="empty">
                              <div class="pic_nodata"></div>
                            </template>
                            <el-table-column  align="left" prop="groupId" label="组名"></el-table-column>
                            <el-table-column  align="left" prop="username" label="用户名"></el-table-column>
                            <el-table-column  align="left" prop="driverClassName" label="驱动名"></el-table-column>
                            <el-table-column  align="left" prop="readWriteType" label="读写标志"></el-table-column>
                             <el-table-column align="center" label="操作">
                                <template slot-scope="scope">
                                <el-button class="table_btn" type="text" @click="onUpdate(scope.row, scope.$index)">修改</el-button>
                                <el-button class="table_btn" type="text" @click="deleteDs(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-row>
      <div class="rh-dialog-footer">
        <el-button type="primary" @click="save()" v-loading="loading">保 存</el-button>
        <el-button @click="close()">关 闭 </el-button>
      </div>
    <el-drawer size="73%" :close-on-click-modal='false' :visible.sync="showmodel" append-to-body :wrapperClosable = false :with-header=true>
        <addDetailPage v-if="showmodel" @back="pageBack" @loadDetail="loadDetail" @loadUpdateDetail="loadUpdateDetail" :detailData="detailData"></addDetailPage>
    </el-drawer>
    </div>
  </div>
</template>

<script>
import addDetailPage from "./ds_detail_add.vue";
export default { 
  components: { addDetailPage},
  props: ["shardingDetailData"],
  data() {      
    return {
      loading: false, 
      showmodel:false,
      groupId:'',
      updateIndex:'',
      detailData:{},
      tableShardingInfo: [],
      //校验规则
      rules: { 
      }
    };
  },

  created() {
    var _this = this;
    if(_this.shardingDetailData == undefined || _this.shardingDetailData.tableShardingInfo == undefined){
        _this.getGroupId();
        _this.tableShardingInfo = [];
    }else{
        _this.tableShardingInfo = _this.shardingDetailData.tableShardingInfo;
    }
  },

  mounted() {
  },

  methods: {
    getGroupId(){
        var _this = this;
        _this.$api.get(_this.$apis.manage+"/rest/manage/ds/getgroupid/",{},function(res){
            if(res.success) {
                _this.groupId = res.data;
            }
        });
    },
    onAddDs(){
      this.showmodel = true;
      this.detailData = {};
    },
    onUpdate(row, index){
      this.showmodel = true;
      this.detailData = row;
      this.updateIndex = index;
    },
    save(){
        let _this = this;
        if(this.tableShardingInfo.length <= 0){
          _this.$message({
              message: '请填写数据源组明细',
              type: 'error'
            });
          return;
        }else{
          var flag1 = 0, flag2 = 0;
          for(var i = 0; i<_this.tableShardingInfo.length; i++){
            if(_this.tableShardingInfo[i].readWriteType == "write"){
              flag1 ++;
            }
            if(_this.tableShardingInfo[i].readWriteType == "read"){
              flag2 ++;
            }
          }
          if(flag1 !=1 || flag2 < 1){
            _this.$message({
              message: '数据源组明细中需要存在一个写和至少一个读',
              type: 'error'
            });
            return;
          }
        }
        if(_this.shardingDetailData == undefined || _this.shardingDetailData.tableShardingInfo == undefined){
            _this.close();
            _this.reload();
        }else{
            _this.close();
            _this.reloadUpdate();
        }
    },
    //关闭
    close() {
        this.$emit("back");
    },
    reload() {
        var _this = this;
        this.$emit("loadShardingDetail", _this.tableShardingInfo);
    },
    reloadUpdate() {
        var _this = this;
        this.$emit("loadShardingUpdateDetail", _this.tableShardingInfo);
    },
    pageBack(){
        this.showmodel = false;
    },
    loadDetail(data){
        data.groupId = this.groupId;
        this.tableShardingInfo.push(data);
    },
    loadUpdateDetail(data){
      var _this = this;
      _this.tableShardingInfo[_this.updateIndex]=data;
    },
    deleteDs(index){
      this.tableShardingInfo.splice(index, 1);
    }
  },
};
</script>