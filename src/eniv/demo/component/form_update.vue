<template>
    <div>
        <div class="rh-dialog-body">
        <el-form :model="update_Form" :rules="rules" ref="update_Form" label-width="100px" label-position="right">
            <el-row>
                <el-col :span = "12">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="update_Form.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span = "12">
                    <el-form-item label="组织" prop="org">
                        <el-input v-model="update_Form.org" placeholder="请输入组织"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span = "12">
                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="update_Form.sex">
                            <el-radio class="radio" label="0">男</el-radio>
                            <el-radio class="radio" label="1">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span = "12">
                    <el-form-item label="有效标志" prop="yxbz">
                        <el-select v-model="update_Form.yxbz" placeholder="请选择">
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
                        <el-checkbox-group v-model="update_Form.interest">
                            <el-checkbox label="A" >游泳</el-checkbox>
                            <el-checkbox label="B">篮球</el-checkbox>
                            <el-checkbox label="C">足球</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    </el-col>
            </el-row>
        </el-form>
        </div>
        <div class="rh-dialog-footer" solt="footer">
            <el-button @click="resetForm('update_Form')">重置</el-button>
            <el-button @click="add_submit('update_Form')">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name:'update',
    props: {
        show: Boolean,
        updateData: Object,
    },
    watch:{
        updateData(val){
            console.log(this.updateData)
            if(this.updateData){
                this.update_Form = this.updateData;
            }
        }
    },
    mounted(){

        // this.update_Form.name = this.updateData.name;
        // this.update_Form.org = this.updateData.org;
        // this.update_Form.sex = this.updateData.sex;
        // this.update_Form.yxbz = this.updateData.yxbz;
        // this.update_Form.interest = this.updateData.interest;
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
            update_Form: {
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
            let paramas = this.update_Form;
            let _this = this;
            paramas.interest = paramas.interest.join();
            if(!paramas.interest){
                paramas.interest = "";
            }
           _this.$api.put("/api2/rest/demo/user",paramas,function(res){
                if(res.success) {
                    _this.$message({
                        message: '保存成功',
                        type: 'success',
                    });
                    //关闭弹出层

                    _this.$emit("parentFn2",false);
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