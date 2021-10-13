
<template>
  <div>
      <el-dialog 
      title="提示"
      :visible.sync = "Visible"
      width="width"
      append-to-body
      :before-close="handleClose">
            <!--下面内容是可替换区域-->
            <div class="rh-dialog-body">
                        <slot></slot>  
            </div>
            <div class="rh-dialog-footer" solt="footer">
                  <slot name="footer"></slot>
            </div>
            <!--上面内容是可替换区域-->
      </el-dialog>
  </div>
</template>

<script>
export default {
      props:{
            Dwidth:{
                  type:String
            },
            dialogVisible:{
                  type :Boolean,
            }
      },
      data() {
            return {
                  Visible:false,
                  width:'40%',
            };
      },
      watch: {
            dialogVisible(oldV,newV){
                  this.Visible = this.dialogVisible;
            },
            Dwidth(oldV,newV){
                  this.width = this.Dwidth;
            }
      },
      mounted() {
            this.Visible = this.dialogVisible;
            this.width = this.Dwidth;
      },
      methods: {
            handleClose(){
                  this.Visible = false;
                  this.$emit('CloseBut', this.Visible);
            },
      },
}
</script>