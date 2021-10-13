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
                                :value="item.val"  @click.native="Alert"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span = "12">
                        <el-form-item label="爱好" prop="interest">
                            <el-checkbox-group v-model="add_Form.interest">
                                <el-checkbox label="A">游泳</el-checkbox>
                                <el-checkbox label="B">篮球</el-checkbox>
                                <el-checkbox label="C">足球</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        </el-col>
                </el-row>
                <div class="form-search colum-center">

                </div>
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
    name:'dailog',
    props:["dailog"],
    data(){
        //表单字符串
        let form = {
            name:'',
            sex: '0',
            org: '',
            yxbz: '',
            interest:[]
        };
        //校验年龄
        let checkAge = (rule,value,callback) =>{
             if(!value){
                return callback(new Error('名称不能为空'))
            }
            //进一步判断是否为数字
            setTimeout(() => {
                //判断是否为整数
                if(!Number.isInteger(value)){
                    callback(new Error('请输入整数'))
                } else {
                    //判断年龄是否为小于18岁
                    if(value < 18){
                        callback(new Error('年龄必须大于18岁'));
                    } else {
                        callback();
                    }
                }
            },1000)           
        };
        //校验名称
        let checkName = (rule,value,callback) => {
            if(!value){
                return callback(new Error('名称不能为空'))
            }
        };
        let rules = {
            name: [
                { required: true, message: "请输入用户名称", trigger: "blur" },
                { min: 1, max:5, message: "长度1到50个字符", trigger: "blur" },
            ],
            sex: [
                { required: true, validator: this.checkGnmkDm, trigger: "blur" }
            ],
            org: [{ required: true, validator: this.checkUri, trigger: "blur" }],
            yxbz:[],
            interest:[]

        };
        let data = {
            showLoading: true,
            showBtnLoading: false,
            einvtypeCodeOptions: [],
            typeVisible: true,
            scfsBzVisible: false,
            gnmkDmVisible: false,
            form,
            rules
        };
        return data;
    }
}
</script>

<style>

</style>