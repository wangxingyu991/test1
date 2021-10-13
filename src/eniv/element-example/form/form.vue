<style lang="less">
  .form-demo{
    .rh-card{
      background:#fff;
      padding:20px 0px;
    }
  }
</style>
<template>
  <div class="components form-demo">
    <el-scrollbar  style="height: 100%">
         <el-divider content-position="left">单列表单</el-divider>
        <div class="rh-card">
          <el-form ref="form" :label-position="labelPosition" :model="form" label-width="120px" style="width:50%">
            <el-form-item label="基本输入" id="jbsr" :class="'jbsr'">
              <el-input v-model="form.name"></el-input>
              <span class="el-icon">
                <el-tooltip :content="form.description" placement="right-start">
                  <div slot='content' style="width:300px">{{form.description}}</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </span>
            </el-form-item>
            <el-form-item label="下拉框">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
              <span class="el-icon">
                <el-tooltip :content="form.description" placement="right-start">
                  <div slot='content' style="width:300px">{{form.description}}</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </span>
            </el-form-item>
            <el-form-item label="组织机构树">
              <el-select v-model="form.tree" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
              <span class="el-icon">
                <el-tooltip :content="form.description2" placement="right-start">
                  <div slot='content' style="width:300px">{{form.description}}</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </span>
            </el-form-item>
            <el-form-item label="日期输入">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" :style="{'text-align':'center'}">——</el-col>
              <el-col :span="11">
                <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="开关按钮">
              <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="多选按钮">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="单选按钮">
              <el-radio-group v-model="form.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="按钮型radio选择">
              <el-radio-group v-model="form.resource2">
                <el-radio-button label="线上品牌商赞助"></el-radio-button>
                <el-radio-button label="线下场地免费"></el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-divider content-position="left">双列表单</el-divider>
        <div class="rh-page-content">
           <el-form ref="form2" :model="form2" label-width="100px" :label-position="labelPosition">
            <el-row>
              <el-col :span = "12">
                  <el-form-item label="单位代码">
                    <el-input v-model="form2.val_dwdm"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span = "12">
                  <el-form-item label="单位名称">
                    <el-input v-model="form2.val_dwmc"></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span = "12">
                  <el-form-item label="权限机关">
                    <el-input v-model="form2.val_qxjg"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span = "12">
                  <el-form-item label="主管机关代码">
                    <el-input v-model="form2.val_zgjgdm"></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span = "12">
                  <el-form-item label="单位所属机构">
                    <el-input v-model="form2.val_qxjg"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span = "12">
                  <el-form-item label="行政区划">
                    <el-input v-model="form2.val_zgjgdm"></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span = "12">
                  <el-form-item label="机关类型">
                    <el-input v-model="form2.val_qxjg"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span = "12">
                  <el-form-item label="开票方式">
                    <el-input v-model="form2.val_zgjgdm"></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
           </el-form>
        </div>
        <el-divider content-position="left">三列表单</el-divider>
        <div class="rh-page-content">
           <el-form ref="form2" :model="form2" label-width="100px" :label-position="labelPosition">
            <el-row>
              <el-col :span = "8">
                  <el-form-item label="单位代码">
                    <el-input v-model="form2.val_dwdm"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span = "8">
                  <el-form-item label="单位名称">
                    <el-input v-model="form2.val_dwmc"></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span = "8">
                  <el-form-item label="权限机关">
                    <el-input v-model="form2.val_qxjg"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span = "8">
                  <el-form-item label="主管机关代码">
                    <el-input v-model="form2.val_zgjgdm"></el-input>
                  </el-form-item>
              </el-col>

              <el-col :span = "8">
                  <el-form-item label="开票方式">
                    <el-input v-model="form2.val_zgjgdm"></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span = "8">
                  <el-form-item label="单位所属机构">
                    <el-input v-model="form2.val_qxjg"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span = "8">
                  <el-form-item label="行政区划">
                    <el-input v-model="form2.val_zgjgdm"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span = "8">
                  <el-form-item label="机关类型">
                    <el-input v-model="form2.val_qxjg"></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row>

            </el-row>
           </el-form>

        </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
        return {
          labelPosition:'right',
          form: {
            description:'1个或多个下面的关键词，迅雷会员一天免费送吃鸡好迅雷有没有ios迅雷会员一天体验卡注册账号在哪里迅雷超级会员租专业的男人福利网站',
            description:'下拉选择组织机构树',
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            resource2: '',
            desc: '',
            ruleForm:{
              name:'',
            }
          },
          form2:{
            val_dwdm: '',//单位代码
            val_dwmc: '',//单位名称
            val_qxjg: '',//权限机关
            val_zgjgdm: '',//主管机关代码
            val_dwssjg: '',//单位所属机构
            val_xzqh: '',//行政区划
            val_jglx: '',//机关类型
            val_kpfs: ''//开票方式
          }
        }
  },
  methods:{
    method:function(){
      console.log("sddd");
    },
    onSubmit:function(el){
      console.log(el.path);
      console.log("Asdfsadf");
    }
  }
}
</script>
