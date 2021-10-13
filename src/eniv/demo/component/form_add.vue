<template>
    <div>
        <div class="rh-dialog-body">
            <el-form :model="add_Form" :rules="rules" ref="add_Form" label-width="100px" label-position="right">
                <el-row>
                    <el-col :span = "12">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="add_Form.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span = "12">
                        <el-form-item label="组织" prop="org">
                            <el-input v-model="add_Form.org" placeholder="请输入组织"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span = "12">
                        <el-form-item label="性别" prop="sex">
                            <el-radio-group v-model="add_Form.sex">
                                <el-radio class="radio" label="0">男</el-radio>
                                <el-radio class="radio" label="1">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span = "12">
                        <el-form-item label="有效标志" prop="yxbz">
                            <el-select v-model="add_Form.yxbz" placeholder="请选择">
                                <el-option v-for="item in option_yxbz" 
                                :key="item.key" 
                                :label="item.label"
                                :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span = "12">
                        <el-form-item label="爱好" prop="interest">
                            <el-checkbox-group v-model="add_Form.interest">
                                <el-checkbox label="A" @click.native="Alert">游泳</el-checkbox>
                                <el-checkbox label="B">篮球</el-checkbox>
                                <el-checkbox label="C">足球</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="rh-dialog-footer" solt="footer">
            <el-button @click="resetForm('add_Form')">重置</el-button>
            <el-button @click="add_submit('add_Form')">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name:'layer',
    props: {
        show: Boolean,
        initData: Object,
    },
    watch: {
        show(oldV,newV){
            //如果是首次展示列表需要清空
            if(newV) {
                this.$refs["add_Form"] != null ? this.$refs["add_Form"].resetFields() : 1;
            }
        },
        initData(oldV,newV){
            if(newV){
                console.log(newV);
            }
        }
    },
    data(){
        let option = [{
            key:0,
            value:'',
            label:'全部'
        },{
            key:1,
            value:'Y',
            label:'有效'   
        },{
            key:2,
            value:'N',
            label:'无效'   
        }];
        let rules = {
            name:[{ required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
            org:[{
                required: true, message :'请输入组织', trigger:'blur'
            }],
            sex:[{ required: true, message: '请选择性别', trigger: 'change' }],
            date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
            yzbz:[{required: true, message:'请选择有效标志',trigger:'change'}],

        }
        return{
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
            rules: rules,
            option_yxbz: option,//有效标志
        }
    },
    methods: {
        resetForm(val){
            this.$refs[val].resetFields();
        },
        add_submit(formName){
            let paramas = this.add_Form;
            let _this = this;
            paramas.interest = paramas.interest.join();
            if(!paramas.interest){
                paramas.interest = ""
            }
            let para = paramas;
            let{id,...pdata} = para;
            _this.$api.post("/api2/rest/demo/user",pdata,function(res){
                if(res.success) {
                    _this.$message({
                        message: '保存成功',
                        type: 'success',
                    });
                    //关闭弹出层
                    _this.$emit("parentFn",false);
                    //清空表单为下次使用
                    _this.resetForm(formName);
                }else{
                    _this.$message({
                            message: '保存失败,' + res.errorMsg,
                            type: 'error'
                    })
                }
            })
        }
    }
}
</script>

<style>

</style>