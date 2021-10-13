<template>
  <div >
      <div class="rh-page-header">
            <div class="rh-head-and-operate">
                  <div class="tips-content">
                        <span class="rh-helpTip-text">
                        测试页面1-1
                        </span>
                        <span class="rh-helpTip-icon">
                              <el-tooltip class="item" content="云数据库GaussDB(for MySQL)是华为自研的最新一代企业级高扩展海量存储分布式数据库，完全兼容MySQL">
                                    <i class="el-icon-info"></i>
                              </el-tooltip>
                        </span>
                  </div>
                  <div class="operate-btns" v-show="false">
                        <el-button >帮助</el-button>
                  </div>
            </div>
      </div>
      <div class="rh-page-hint" v-show="HintShow">
            <div class="page-hint-content">
                  <span class="page-hint-icon">
                        <i class="el-icon-info"></i>
                  </span>
                  <span class="page-hint-text">
                        我的资源当前仅支持如下服务类型及区域的查询，更多服务及区域持续上线中。
                  </span>
            </div>
            <div class="operate-bts">
                  <div class="bt-close" @click="HintShow=false"><i class="el-icon-close"></i></div>
            </div>
      </div>
      <div class="rh-page-content">
            <div class="rh-operate clearfix" style="display:none;">
                <el-button type="primary" @click="add_Operate('add_Form')">新增</el-button>
                <el-button type="primary" @click="del_Group" :disabled="tr_sels.length == 0">批量删除</el-button>
                <div class="rh-pull-right">
                    <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
                        <el-row :gutter="10">
                            <el-col :span="8">
                                <el-form-item label="" prop="name">
                                    <el-input v-model="queryForm.name" placeholder="姓名"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="" prop="sex">
                                    <el-select v-model="queryForm.sex" placeholder="性别">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option label="男" value="0"></el-option>
                                        <el-option label="女" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-button v-on:click="searchWrap=!searchWrap">更多<i class="el-icon-arrow-down" v-show="!searchWrap"></i><i class="el-icon-arrow-up" v-show="searchWrap"></i></el-button>
                                <el-button icon="el-icon-search"   type="primary" @click="searchForm"></el-button>
                            </el-col>
                        </el-row>
                    </el-form>                       
                </div>
            </div>
            <div class="rh-search-wrap" v-show="true">
                <el-form :model="queryForm" ref="queryForm" :inline="false" label-width="0px" label-position="right">
                    <el-row :gutter="10">
                        <el-col :span="4">
                            <el-form-item label="" prop="name">
                                <el-input v-model="queryForm.name" placeholder="姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="" prop="org">
                                <el-input v-model="queryForm.org" placeholder="组织"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="" prop="sex">
                                <el-select v-model="queryForm.sex" placeholder="性别">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="男" value="0"></el-option>
                                    <el-option label="女" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="" prop="yxbz">
                                <el-select v-model="queryForm.yxbz" placeholder="有效标志">
                                    <el-option 
                                    v-for="item in option_yxbz" 
                                    :key="item.key" 
                                    :label="item.label"
                                    :value="item.val">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-button v-on:click="searchWrap=!searchWrap"><i class="el-icon-arrow-down" v-show="!searchWrap"></i><i class="el-icon-arrow-up" v-show="searchWrap"></i></el-button>
                           <el-button icon="el-icon-search"   type="primary" @click="searchForm"></el-button>
                            <el-button  type="info" @click="resetForm('queryForm')"><i class="ump-zhongzhi"></i>重 置</el-button>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" v-show="searchWrap">
                        <el-col :span="5">
                            <el-form-item label="" prop="name">
                                <el-input v-model="queryForm.name" placeholder="手机号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="" prop="name">
                                <el-input v-model="queryForm.name" placeholder="身份证"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="" prop="name">
                                <el-input v-model="queryForm.name" placeholder="家庭住址"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="" prop="name">
                                <el-input v-model="queryForm.name" placeholder="收入"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="" prop="name">
                                <el-input v-model="queryForm.name" placeholder="级别"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                 </el-form>
            </div>
            <div class="rh-table">
                <el-table :data="tableData.records" stripe border @selection-change="handleSelectionChange" height="400">
                    <template slot="empty">
                        <div class="pic_nodata">
                            
                        </div>
                    </template>
                    <el-table-column align="center" type="selection" width="55"></el-table-column>
                    <el-table-column :show-overflow-tooltip="true" align="left" prop="name" label="姓名"></el-table-column>
                    <el-table-column align="left" prop="org" label="组织"></el-table-column>
                    <el-table-column align="center" prop="sex" label="性别"></el-table-column>
                    <el-table-column align="center" prop="yxbz" label="有效标志"></el-table-column>
                    <el-table-column align="center" show-overflow-tooltip prop="createTime" label="创建时间"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button class="table_btn" type="text" @click="updateById(scope.row.id,'add_Form')">修改</el-button>
                            <el-button class="table_btn" type="text" v-if="scope.row.yxbz === '有效'" @click="onDisRow(scope.row.id)">禁用</el-button>
                            <el-button class="table_btn" type="text" v-if="scope.row.yxbz === '无效'" @click="onEnaRow(scope.row.id)">启用</el-button>
                            <el-button class="table_btn" type="text" @click="delate_fn(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="rh-pagination">
                  <el-pagination
                    layout="total, sizes, prev, pager, next, jumper"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  :total="tableData.total"
                  :current-page.sync="tableData.current"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="tableData.size"
                  >
                  </el-pagination>
            </div>
      </div>
      <div class="dailog">
            <el-dialog 
            title="新增用户"
            append-to-body
            :visible.sync = "add_Dialog"
            width="50%">
                  <!--下面内容是可替换区域-->
                
                  <!--上面内容是可替换区域-->
            </el-dialog>
      </div>
      <div class="dailog">
            <el-dialog 
            title="修改用户"
            :visible.sync = "update_Dialog"
            append-to-body
            width="50%">
    
            </el-dialog>
      </div>
  </div>
</template>

<script>
import formAdd from "./component/form_add.vue"
import formUpdate from "./component/form_add.vue"
import {formateDate} from "@/utils/tools.js"
export default {
        data(){
            return{
                HintShow:true,
                radio:'',
                src:'@/assets/nodata.png',
                //查询表单
                selectVal:'',
                queryForm: {
                    name: '',
                    sex: '',
                    org: '',
                    yxbz: [],
                    pageNo: 1,
                    pageSize: 10
                },
                //下拉有效标志位
            option_yxbz:[
                {
                    val:'',
                    key: 2,
                    label:'全部'
                },{
                    val:'Y',
                    key: 0,
                    label:'有效'
                },{
                    val:'N',
                    key: 1,
                    label:'无效'
                }],
                //校验规则
                rules:{
                    name: [{required: true, message: '请输入姓名', trigger:'blur'}],
                    org: [{required: true, message: '请输入组织', trigger:'blur'}],
                    sex: [{required: false, message: '请选择性别', trigger:'change'}],
                    yxbz: [{required: false, message: '请选择有效标志位', trigger:'change'}],
                    interest: [{required: false, message: '请选择爱好', trigger:'change'}]
                },
                //新增和修改判断标志
                add_flag :'',
                //新增表单内容
                add_Form: {
                    createTime: "",
                    deleteTime: "",
                    deleted: "",
                    id: "",
                    interest: [],
                    lastTime: '',
                    name: '',
                    org: "",
                    sex: "",
                    sortno: "",
                    version: "",
                    yxbz:[]
                },
                add_Dialog:false,
                page:{
                    Total:100,
                    Size:[10,20,30],
                    currentPage:1,
                },
                tableData:[],
                //搜索下拉
                searchWrap:false,
                //表格选择
                tr_sels:[],
                update_Dialog:false,
            }
        },
        components:{
            formAdd,formUpdate
        },
        created(){
            var time = new Date('2021-03-04T00:48:58.000+00:00');
            console.log(time);
            console.log(formateDate(time));
        },
        mounted(){
            this.init_Table()
        },
        methods:{
            //初始化表格
            init_Table(){
                let _this = this;
                let params = this.queryForm;
                this.$api.get(this.$apis.home + "/rest/demo/user/plist",params,function(res){
                    if(res.success){

                        _this.tableData = res.data;
                        let list = _this.tableData.records;
                        //对数据进行解析处理
                        for(let i = 0; i<list.length; i++){
                            //性别解析
                            if(list[i].sex == '0') {
                                list[i].sex = "男"
                            } else {
                                list[i].sex = "女"
                            }
                            //标志位解析
                            if(list[i].yxbz == 'Y') {
                                list[i].yxbz = "有效";
                            } else {
                                list[i].yxbz = "无效";
                            }
                            //日期解析
                            if(list[i].createTime!== undefined && list[i]!== "" && list[i].createTime!==null){
                                list[i].createTime = formateDate(list[i].createTime);
                            }
                        }
                        _this.tableData.records = list;
                    } else {
                        _this.$message({
                            message: '查询失败,' + res.errorMsg,
                            type: 'error'
                        });                 
                    }
                })
            },
            //初始化分页
            init_page(){
                this.page.total = this.tableData.total;
                this.page.size = this.tableData.size;
                this.page.current = this.tableData.current;
            },
            //分页页码操作
            handleSelectionChange(val){
                this.tr_sels = val;
            },
            //分页操作
            handleCurrentChange(val){
                this.queryForm.pageNo = val;
                //更改分页后重新初始化页面
                this.init_Table();
            },
            handleSizeChange(val){
                this.queryForm.pageSize = val;
                //更改分页后重新初始化页面
               this.init_Table();
            },
           //新增操作
            add_Operate(formName){
                this.add_Dialog = true;
                this.add_flag = "add";//标志
                this.$refs[formName] !=null ? this.$refs[formName].resetFields() : 1;
                //弹出层内容置空
            },
            //修改操作
            updateById(id,formName){
                //获取当前行数据
                this.add_flag = "update";
                let _this = this;
                //置空原有表单内容
                _this.resetForm(formName);
                //打开弹出层
                this.add_Dialog = true;
                _this.$api.get("/rest/demo/user/"+id,{},function(res){
                    if(res){
                        let data = res.data;
                        //console.log(data)
                        _this.add_Form.id = data.id;
                        _this.add_Form.name = data.name;
                        _this.add_Form.org = data.org;
                        _this.add_Form.yxbz = data.yxbz;
                        _this.add_Form.sex = data.sex;
                        if(data.interest!=null && data.interest!==undefined && data.interest!==''){
                            _this.add_Form.interest = data.interest.split(',');
                        }
                        _this.add_Form.createTime=data.createTime;
                        
                    }else{
                        _this.message({
                            message:'查询失败.' + res.errorMsg,
                            type: 'error'
                        })
                    }     
                })    
            },
             //下拉框内容搜索
            searchForm(){
                this.queryForm.pageNo = 1;
                this.init_Table();
            },

            //弹出表单提交
            add_submit(formName){
                let _this = this;
                let flag = this.add_flag;
                _this.$refs[formName].validate((valid) => {
                    //校验完成后进行提交
                    if(valid){
                        //页面对象有数组需要转换string后再传给后台

                        _this.add_Form.interest = _this.add_Form.interest.join();
       
                        let para = _this.add_Form;
                        console.log(para)
                        
                        let{id,...addparams} = para;
                        console.log(addparams);
                        if(flag =='add'){
                            _this.$api.post("/rest/demo/user",addparams,function(res){
                                    //console.log(res);
                                    if(res.success){
                                        _this.$message({
                                            message: '保存成功',
                                            type: 'success'
                                        });
                                        //关闭弹出层
                                        _this.add_Dialog = false;
                                        //清空表单为下次使用
                                        _this.resetForm(formName);
                                        //清空查询
                                        _this.resetForm('queryForm');
                                        //全部查询
                                        _this.searchForm()
                                    } else{
                                        _this.$message({
                                                message: '保存失败,' + res.errorMsg,
                                                type: 'error'
                                        })
                                    }
                                })

                        } 
                        else if( flag == "update") {
                            console.log("put请求");
                            console.log(para);
                            _this.$api.put("/rest/demo/user",para,function(res){
                                console.log(res);
                                if(res.success){
                                    //关闭弹出层
                                    _this.add_Dialog = false;
                                    //清空表单为下次使用
                                    _this.resetForm(formName);
                                    //清空查询
                                    _this.resetForm('queryForm');
                                    //全部查询
                                    _this.searchForm()
                                    _this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    })
                                } else {
                                    _this.$message({
                                        message: '保存失败,' + res.errorMsg,
                                        type: 'error'
                                    })
                                }
                                //console.log(res)
                            })
                        }

                    }
                })
            },
            //删除
            delate_fn(id){
                let _this = this;

                _this.$confirm("确定要删除记录吗?",'提示',{
                    type: 'warning'
                    }).then(()=>{
                    _this.$api.delete("/rest/demo/user/"+id,{},function(res){
                        if(res.success){
                            _this.searchForm()
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        } else {
                            _this.$message({
                                message: '查询失败,' + res.errorMsg,
                                type: 'error'
                            })
                        }
                    })
                })
            },
            //批量删除
            del_Group(){
                let _this = this;
                _this.$confirm('确定要删除所选记录吗？','提示',{
                    type: 'warning'
                }).then(() => {
                    
                    let ids =_this.tr_sels.map(item => item.id).join();

                    let para = Object.assign({},{});
                    _this.$api.delete("/rest/demo/user/"+ids,para,function(res){
                    if(res.success == true) {
                        _this.$message({
                            message: '批量删除成功',
                            type: 'success'
                        });
                       _this.searchForm();
                    } else {
                        _this.$message({
                            message: '批量删除失败,' + res.errorMsg,
                            type: 'error'
                        });
                    }
                    })
                })
            },
            //启用
            onDisRow(id){
                let _this = this;
                let para = Object.assign({}, {});
                _this.$api.post("/rest/demo/user/disable/" + id, para, function(res) {
                if(res.success == true) {
                    _this.$message({
                    message: '禁用成功',
                    type: 'success'
                    });
                    _this.searchForm();
                } else {
                    _this.$message({
                    message: '禁用失败,' + res.errorMsg,
                    type: 'error'
                    });
                }
                })
            },
            //禁用
            onEnaRow(id){
                let _this = this;
                let para = Object.assign({}, {});
                _this.$api.post("/rest/demo/user/enable/" + id, para, function(res) {
                    if(res.success == true) {
                        _this.$message({
                        message: '启用成功',
                        type: 'success'
                        });
                        _this.searchForm();
                    } else {
                        _this.$message({
                        message: '启用失败,' + res.errorMsg,
                        type: 'error'
                        });
                    }
                })
            },
            //重置
            resetForm(formName){
                // console.log(this.$refs[formName]);
                // this.$refs[formName].resetFields();
                if(this.$refs[formName]!==undefined) {
                    this.$refs[formName].resetFields();
                }
            },
            indexMethod(data){
                return data;
            }
        },
        
}
</script>

<style scoped>

    .rh-page-hint{
        margin-bottom:15px;
    }
</style>


