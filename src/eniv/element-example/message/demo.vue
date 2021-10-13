<style lang="less">
      .rh-dialog-demo{
            .el-dialog{
                  .el-dialog__header{
                        padding:32px 32px 28px;
                        .el-dialog__title{
                              line-height: 26px;
                              color:#252b3a;
                              font-weight: 700;
                        }
                  }
                  .el-dialog__body{
                        padding:0 32px ;
                        box-sizing:border-box;
                        border-bottom:20px solid transparent;
                  }
            } 
            .rh-pargraph{
                  p{
                        line-height: 30px;
                        font-size: 12px;
                        color:#252b3a;
                  }
            }
            .rh-dialog-body{
                  padding-bottom:20px;
            }
            .rh-dialog-footer{
                  width: 161px;
                  margin: 0 auto;
                  padding:8px 32px 32px;
            }
            .el-form{
                  width:100%;
                  .el-form-item{
                        margin-bottom:20px;
                        .el-icon{
                              width: 30px;
                              height: 30px;
                              margin-top: 0px;
                              position: absolute;
                              text-align: center;
                        }
                        .el-form-item__label{
                              width:180px;
                              height:28px;
                              line-height: 26px;
                              font-size: 12px;
                        }
                        .el-form-item__content{
                              margin-right: 30px;
                              line-height: 28px;
                              font-size: 12px;
                              .el-input{
                                    width:100%;
                                    font-size: 12px;
                                    .el-input__inner{
                                          height:28px;
                                          line-height: 28px;
                                          border-radius:2px;
                                    }
                                    .el-input__suffix{
                                          .el-input__suffix-inner{
                                                .el-input__icon{
                                                      line-height:28px;
                                                }
                                          }
                                    }
                                    .el-input__prefix{
                                    .el-input__icon{
                                    line-height:28px;
                                    }
                                    }  
                              }    
                              .el-select{
                                    width:100%;
                              }
                              .el-radio-group{

                                    .el-radio-button{

                                          .el-radio-button__inner{
                                                padding: 6px 20px;
                                                font-size: 12px;
                                                height:28px;
                                                &:first-child{
                                                      border-radius: 2px 0 0 2px;
                                                }
                                                &:last-child{
                                                      border-radius: 0px 2px 2px 0px;
                                                }
                                          }

                                    }
                              }
                        }
                  }
            }
            .el-button{
                  padding: 0px 20px;
                  line-height: 26px;
                  font-size: 12px;
                  border-radius: 2px;
                  &:hover{
                        color:#5e7ce0;
                        background: #fff;
                  }
                  &:focus{
                        color:#5e7ce0;
                        background: #fff;                 
                  }
            }
      }
</style>
<template>
      <div class="rh-dialog-demo">
            <el-button class="rh-button" @click="isDialogShow=true">表单模板弹框</el-button>
            <!-- 表单模板弹框demo下面是复制区域-->
            <el-dialog 
            title="提示"
            :visible.sync = "isDialogShow"
            width="40%"
            append-to-body
            :before-close="handleClose">
                  <div class="rh-dialog-body">
                        <!--下面内容是可替换区域-->
                        <slot></slot>  
                        <el-form label-width="120px" :label-position="'left'" :model="dialog_form_cjcsmb">
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
                        <div class="rh-pargraph">
                              <p>您还可以创建100个参数组。当前项目下所有文档数据库实例类型共享参数组配额。</p>
                        </div>
                        <!--上面内容是可替换区域-->
                  </div>
                  <div class="rh-dialog-footer" solt="footer">
                        <el-button @click="isDialogShow=false">取消</el-button>
                        <el-button @click="isDialogShow=false">确定</el-button>
                  </div>
            </el-dialog>
   
      </div>
</template>

<script>
export default {
      data(){
            return{
            isDialogShow: false,
            isDialogShow2:false,
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
            handleClose(){
                  this.isDialogShow = false;
            },
      }
}
</script>

<style>

</style>