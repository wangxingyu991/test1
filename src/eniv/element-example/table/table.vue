<style lang="less" scoped>
      .table-wrap{
        padding:20px;
        background-color:#FFF;
      }
</style>
<template>
<div>
  <div class="rh-page-header">
        <div class="rh-head-and-operate">
              <div class="tips-content">
                    <span class="rh-helpTip-text">
                    table表格
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
          width="255">
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
            width="280">
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
          <el-table-column
            prop="address"
            show-overflow-tooltip
            width="280"
             fixed ="right"
            label="地址">
          </el-table-column>
          <el-table-column
          width="300"
          fixed ="right"
          label="操作">
            <template solt-scope="scope">
                <el-button type="text" size="mini">比较</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" size="mini">应用</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" size="mini">应用记录</el-button>
            </template>
          </el-table-column>
    </el-table>
    <div class="rh-pagination">
        <el-pagination
              class="rh-pagination-in"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="sizes,total, prev, pager, next, jumper"
              :total="120">
        </el-pagination>           
    </div>
    <div class="rh-page-layout-section">
      <el-table
        border
        max-height ="250"
        :data="selfTable"
        style="width: 100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>

        <el-table-column prop="goodName" label="物品名称" width="250">
            <template   slot-scope="scope">
              <el-input style="display:none"  placeholder="请输入物品" @blur="hideInput($event,scope.row)" v-model="scope.row.goodName"></el-input>
              <div class="inputText" style="display:block" @click="showInput($event,scope.row)">{{ scope.row.goodName }}</div>
            </template>
        </el-table-column>

        <el-table-column prop="price" label="价格" width="250">
            <template   slot-scope="scope">
              <el-input v-show="scope.row.show" style="display:none" placeholder="请输入价格" @blur="hideInput($event,scope.row)" v-model="scope.row.price"></el-input>
              <div class="inputText" style="display:block" @click="showInput($event,scope.row)">{{ scope.row.price }}</div>
            </template>
        </el-table-column>
        <el-table-column  label="操作" prop="opreater">
            <template  slot-scope="scope">
              <div>
                <el-button  type="text" size="mini" @click="deleteRow(scope.$index,selfTable)">{{scope.row.opreater}}</el-button>
                <el-button  type="text" size="mini" @click="editRow(scope.$index,scope)">修改</el-button>
              </div>
            </template>
          </el-table-column>
      </el-table>
      <div class="rh-operate clearfix" style="margin-top: 10px;">
        <el-button @click="addRow">新增行</el-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
      data(){
            return{
            currentPage4:2,
            selfTable:[
                {
                    goodName:"打印机",
                    price: 150,
                    id:"a1",
                    opreater:'删除'
                },{
                    goodName:'文具',
                    price: 200,
                    id:"a2",
                    opreater:'删除'
                },{
                    goodName:'座椅',
                    price: 0,
                    id:"a2",

                    opreater:'删除'
                }
              ],
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
                },              {
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
      },
      methods:{
            indexMethod(index) {
                  return index;
            },
            setIndex({row,rowIndex}){
                row.Index = rowIndex;
                return ''
            },
            rows(row, column, event){
              console.log(row);
              
            },
            handleSizeChange(val){
                  console.log("每一页显示${val}条");
            },
            handleCurrentChange(val){
                  console.log("当前页面显示${val}条");
            },
            showInput(event,row) {
              //row.show = true;
              console.log(event);
              event.srcElement.style.display="none";
              event.srcElement.previousElementSibling.style.display = "block";
              //let $event = event;
                this.$nextTick(function () {
                  event.srcElement.previousElementSibling.firstElementChild.focus();
                  console.log(event.srcElement.previousElementSibling);
                })
                
            },
            hideInput(event,row) {
              event.srcElement.parentElement.style.display="none";
              event.srcElement.parentElement.nextElementSibling.style.display = "block";
            },
            addRow(){
              let oldTable =[];
              oldTable =  this.selfTable;
              let newRow = {
                  goodName:"111",
                  price: 0,
                  opreater:'删除'
              }
              oldTable.push(newRow);
              this.selfTable = oldTable;
              console.log(oldTable);
            },
            deleteRow(index, rows) {
              rows.splice(index, 1);
            },
            editRow(index, rows){
              rows.row.opreater = "del";
              console.log(rows);
            }
      },
      mounted(){

      }
}
</script>

