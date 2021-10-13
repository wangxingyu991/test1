<style lang="less">

</style>
<template>
        <div class="rh-dialog">
            <el-button class="rh-button" @click="isDialogShow=true">可复制demo弹框</el-button>
            <el-button class="rh-button" @click="Dshow=true">封装好dialog模板弹框</el-button>
            <el-button class="rh-button" @click="Dshow2=true">form表单dialog模板弹框</el-button>
            <!-- 表单模板弹框demo下面是复制区域-->
            <el-dialog 
            title="提示"
            :visible.sync = "isDialogShow"
            width="38.2%"
           append-to-body
            :before-close="handleClose">
                  <div class="rh-dialog-body">
                        <!--下面内容是可替换区域-->
                              内容区域
                        <!--上面内容是可替换区域-->
                  </div>
                  <div class="rh-dialog-footer" solt="footer">
                        <el-button @click="isDialogShow=false">取消</el-button>
                        <el-button @click="isDialogShow=false">确定</el-button>
                  </div>
            </el-dialog>
            
            <!--以下是封装模板 -->
            <RHDialog v-bind:Dwidth = "Dwidth" v-bind:dialogVisible = "Dshow"  @CloseBut="getClose">  
                  <div class="body">
                        ````````````````内容区域````````````````
                  </div>
                  <div class="footer" slot="footer">
                        <el-button @click="Dshow=false">取消</el-button>
                        <el-button @click="Dshow=false">确定</el-button>
                  </div>
            </RHDialog>
            <!--以下是表单弹出框 -->
            <RHDialog v-bind:Dwidth = "Dwidth2" v-bind:dialogVisible = "Dshow2"  @CloseBut="getClose2">  
                  <div class="body">
                        <el-form label-width="100px" :label-position="'right'" :model="dialog_form_cjcsmb">
                              <el-form-item :label="dialog_form_cjcsmb.sjkyqbb.label">
                                    <el-select v-model="dialog_form_cjcsmb.sjkyqbb.val">
                                          <el-option v-for="(item,index) in dialog_form_cjcsmb.sjkyqbb.optionList" :key="index" :label="item" :value="item"></el-option>
                                    </el-select>
                              </el-form-item>
                              <el-form-item :label="dialog_form_cjcsmb.sllx.label">
                                    <el-radio-group v-model="dialog_form_cjcsmb.sllx.val">
                                          <el-radio-button :key="index" v-for="(item,index) in dialog_form_cjcsmb.sllx.RadioList" :label="item"></el-radio-button>
                                    </el-radio-group>
                              </el-form-item>
                              <el-form-item :label="dialog_form_cjcsmb.csmbm.label">
                                    <el-input v-model="dialog_form_cjcsmb.csmbm.val" :placeholder="dialog_form_cjcsmb.csmbm.placeholder"></el-input>
                                    <span class="el-icon">
                                          <el-tooltip :content="dialog_form_cjcsmb.csmbm.tips" placement="right-start">
                                                <div slot='content' style="width:300px">{{dialog_form_cjcsmb.csmbm.tips}}</div>
                                                <i class="el-icon-question"></i>
                                          </el-tooltip>
                                    </span>
                              </el-form-item>
                              <el-form-item :label="dialog_form_cjcsmb.description.label">
                                    <el-input type="textarea" :rows="3"   maxlength="30" show-word-limit v-model="dialog_form_cjcsmb.description.val" :placeholder="dialog_form_cjcsmb.description.placeholder"></el-input>
                                    <span class="el-icon">
                                          <el-tooltip :content="dialog_form_cjcsmb.description.tips" placement="right-start">
                                                <div slot='content' style="width:300px">{{dialog_form_cjcsmb.description.tips}}</div>
                                                <i class="el-icon-question"></i>
                                          </el-tooltip>
                                    </span>
                              </el-form-item>
                        </el-form>
                  </div>
                  <div class="footer" slot="footer">
                        <el-button @click="Dshow2=false">取消</el-button>
                        <el-button @click="Dshow2=false">确定</el-button>
                  </div>
            </RHDialog>           
      </div>
</template>
<script>
import RHDialog from './dialog.vue'
import Demo from './demo.vue'
export default {
      components:{
            RHDialog,Demo
      },
      data(){
            return{
                  isDialogShow: false,
                  Dwidth:'61.8%',
                  Dwidth2:'61.8%',
                  Dshow:false,
                  Dshow2:false,
                  dialog_form_cjcsmb:{//数据命名规范：模板类型_数据类型_业务名称
                        sjkyqbb:{//form表单数据定义：val+描述
                              val:'',
                              label:'数据库引擎版本',
                              optionList:['MySQL8.0','MySQL5.7','MySQL5.6','Microsoft SQL 2017EE']
                        },
                        sllx:{
                              val:'',
                              label:'实用类型',
                              RadioList:['集群','副本集','单节点'],
                        },
                        jdlx:{
                              val:'',
                              label:'节点类型',
                              RadioList:['Mongos','Shard','config'],                               
                        },
                        csmbm:{
                        val:'',
                        label:'参数模板名',
                        placeholder: '请输入参数模板名',
                        tips:'参数模板名称在1到64个字符之间，区分大小写，可包含字母、数字、中划线、下划线或句点，不能包含其他特殊字符。'
                        },
                        description:{
                              val:'',
                              label:'描述',
                              placeholder:'请输入参数模板描述信息',
                              tips:'描述不能超过256位，且不能包含回车和特殊字符 ! < = '
                        }
                  },
            }
      },
      methods:{
            getClose(val){
                  this.Dshow = val;
            },
            getClose2(val){
                  this.Dshow2 = val;
            },
            handleClose(){
                  this.isDialogShow = false;
            }
      }
}
</script>

<style>

</style>