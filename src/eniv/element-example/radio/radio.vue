<template>
      <div class="components">
            <el-scrollbar  style="height:100%">
                  <div class="card">
                        <el-divider>块状按钮（）</el-divider>
                        <el-radio-group v-model="radio" size="small">
                              <el-radio :label="3">备选项</el-radio>
                              <el-radio :label="6">备选项</el-radio>
                              <el-radio :label="9">备选项</el-radio>
                        </el-radio-group>
                        <el-divider>禁用radio</el-divider>
                        <el-radio-group v-model="radio2" size="small">
                              <el-radio disabled  label="禁用">备选项</el-radio>
                              <el-radio disabled  label="选中且禁用">备选项</el-radio>
                        </el-radio-group>
                        <el-divider>button单选按钮组</el-divider>
                        <el-radio-group v-model = "radio3" size="small">
                              <el-radio-button label="上海"></el-radio-button>
                              <el-radio-button label="北京"></el-radio-button>
                              <el-radio-button label="广州"></el-radio-button>
                              <el-radio-button label="深圳"></el-radio-button>
                        </el-radio-group>
                        <el-radio-group v-model = "radio4" size="small">
                              <el-radio-button label="上海"></el-radio-button>
                              <el-radio-button label="北京"></el-radio-button>
                              <el-radio-button label="广州"></el-radio-button>
                              <el-radio-button label="深圳"></el-radio-button>
                        </el-radio-group>
                        <el-radio-group v-model = "radio5" size="small">
                              <el-radio-button label="上海"></el-radio-button>
                              <el-radio-button label="北京"></el-radio-button>
                              <el-radio-button label="广州"></el-radio-button>
                              <el-radio-button label="深圳"></el-radio-button>
                        </el-radio-group>

                        <el-radio-group v-model = "radio6" size="mini">
                              <el-radio-button label="上海"></el-radio-button>
                              <el-radio-button label="北京"></el-radio-button>
                              <el-radio-button label="广州"></el-radio-button>
                              <el-radio-button label="深圳"></el-radio-button>
                        </el-radio-group>
                  </div>
                  <div class="card">
                        <el-divider>多选按钮默认</el-divider>
                        <el-checkbox v-model="checked1" size="small">备选项1</el-checkbox>
                        <el-checkbox v-model="checked1" size="small">备选项1</el-checkbox>
                        <el-checkbox v-model="checked1" size="small">备选项1</el-checkbox>
                        <el-checkbox v-model="checked1" size="small">备选项1</el-checkbox>
                        <el-checkbox v-model="checked2" disabled>备选项</el-checkbox>
                        <el-divider>多选框组</el-divider>
                        <el-checkbox-group v-model="checkList" size="small">
                              <el-checkbox label="复选框 A"></el-checkbox>
                              <el-checkbox label="复选框 B"></el-checkbox>
                              <el-checkbox label="复选框 C"></el-checkbox>
                              <el-checkbox label="禁用" disabled></el-checkbox>
                              <el-checkbox label="选中且禁用" disabled></el-checkbox>
                        </el-checkbox-group>
                        <el-divider>按钮样式</el-divider>
                        <el-checkbox-group v-model="checkboxGroup1" size="small">
                              <el-checkbox-button v-for= "city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
                        </el-checkbox-group>
                        <el-divider>media按钮样式</el-divider>
                        <el-checkbox-group v-model="checkboxGroup1" size="small">
                              <el-checkbox-button v-for= "city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
                        </el-checkbox-group>

                        <el-divider>small按钮样式</el-divider>
                        <el-checkbox-group v-model="checkboxGroup3" size="small">
                              <el-checkbox-button v-for= "city in cities" :label="city" :disabled="city === '北京'" :key="city">{{city}}</el-checkbox-button>
                        </el-checkbox-group>
                        <el-divider>mini按钮样式</el-divider>
                        <el-checkbox-group v-model="checkboxGroup4" size="mini">
                              <el-checkbox-button v-for= "city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
                        </el-checkbox-group>
                  </div>
            </el-scrollbar>
      </div>
</template>
<script>
const cityOptions = ['上海','北京','广州','深圳'];
export default {
      name:'Radio',
      data(){
            return{
                  radio:6,
                  radio2:'禁用',
                  radio3:'北京',
                  radio4:'北京',
                  radio5:'北京',
                  radio6:'北京',
                  checked1:true,
                  checked2:true,
                  checkList:['复选框 A','复选框 B'],
                  checkboxGroup1:['北京'],
                  checkboxGroup2:[],
                  checkboxGroup3:[],
                  checkboxGroup4:[],
                  cities:cityOptions
            }
      }
}
</script>   