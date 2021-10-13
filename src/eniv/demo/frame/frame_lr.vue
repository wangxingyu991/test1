<template>
  <div :style="{ height: frameSize_height-15 + 'px' }" class="clearfix" @mouseleave="mouseLeave" @mousemove="mousemove" @mouseup="mouseup2">
    <div class="rh-page-left" :style="{ height: frameSize_height- 40 + 'px', width: frameSize_width_left+'px'}">
      <slot name="left"></slot>  
    </div>
    <div class="drag-bar" @mousedown="mousedown"  @mouseup="mouseup" :style="{ left: (drageLeft - navSize_width -5)  + 'px'}">
        :
    </div>
    <!-- <div class="rh-page-right" :style="{ height: frameSize_height + 4 + 'px',width: frameSize_width -  (drageLeft - navSize_width) + 'px',left: (drageLeft - navSize_width)  + 'px'}"> -->
    <div class="rh-page-right" :style="{ height: frameSize_height-15 + 'px',width:frameSize_width_right+'px',left: (drageLeft - navSize_width)  + 'px'}">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
          //框架样式
          navSize_width : this.$storage.state.NavSize.width,
          frameSize_width: this.$storage.state.frameSize.width,
          frameSize_height:  this.$storage.state.frameSize.height,
          drageLeft: (240 + 40 + this.navSize_width),//拖拽开关距离左侧的距离（树形菜单的宽度+边距+导航菜单宽度）
          frameSize_width_left: 240,
          frameSize_width_right: this.$storage.state.frameSize.width - 280-30,
          //拖拽事件
          space: 0,
          initwidth_left:'',
          initwidth_right:'',
          right_width:0,

          flag: "",
          //移动中
          mouseX : 0,
          mouseY : 0,
          //开始结束
          startX : 0,
          startY : 0,
          endX : 0,
          endY : 0,
        }
    },
    computed:{
        // navSize_width(){
        //    alert("sadfa");
        //     return this.$storage.state.NavSize.width;
        // }
    },
    mounted(){
      //alert("safasf");
      //  console.log(this.frameSize_width_right);
    },
    watch: {
      //vuex参数监听导航宽度监听
      '$storage.state.NavSize.width'(){
        this.navSize_width = this.$storage.state.NavSize.width;
        this.drageLeft = (this.frameSize_width_left + 40 + this.navSize_width);
        this.frameSize_width = this.$storage.state.frameSize.width;
        this.endX2 = this.drageLeft;
      },
      //vuex参数监听框架高度监听
      '$storage.state.frameProp.height'(){
        this.frameSize_height = this.$storage.state.frameProp.height-50;
      },
      //watch监听
      drageLeft(newVal , oldVal){
        //console.log(this.frameSize_width_right);
          this.frameSize_width_left = newVal - 40 - this.navSize_width;
          this.frameSize_width_right =  this.frameSize_width - this.frameSize_width_left-40-30;
      },

      frameSize_width(newVal,oldVal){
        this.frameSize_width_right =  newVal - this.frameSize_width_left-40-30;
      }
    },
    methods:{
      mousedown:function(event) {
        this.flag = "down";
        //记录启示位置
        this.startX = event.clientX;
      },
      mousemove(event) {
        //鼠标移动
        if(event.clientX>380){
          //加上边界限定
          if((event.clientX<=680)&&(this.flag == "down")){
            this.drageLeft = event.clientX;
          } else if((event.clientX>680)&&(this.flag == "down")) {
            //当松开时记录下鼠标的坐标位置
            this.drageLeft = 680;
          } 
        }else if((event.clientX<=380)&&(this.flag == "down")){
          //加上边界限定
            this.drageLeft = 380;          
        }
      },
      mouseup(event) {
        this.flag = "up";
        //当松开时记录下鼠标的坐标位置
        this.endX2 = event.clientX;
      },
      mouseLeave(event){
        //当松开时记录下鼠标的坐标位置
        if(this.flag=="down"){
          this.endX2 = (event.clientX>=380)?event.clientX:380; 
          this.endX2 = (event.clientX<=680)?event.clientX :680;
          this.flag = "up";
        }
      },
      mouseup2(event) {
        //当松开时判断拖拽轴是否在跟着移动，跟着移动则需要关掉移动标记改为up
        if(this.flag == "down"){
          this.flag = "up";
          //记录下鼠标的坐标位置
          this.endX2 = event.clientX;
        }
      },
    }
}
</script>

<style>
  .drag-bar{
    position: absolute;
    left: 275px;
    top: 40%;
    width: 10px;
    height: 50px;
    border-radius: 18px;
    z-index: 99;
    background: #d2d2d2;
    text-align: center;
    vertical-align: middle;
    line-height: 47px;
    font-weight: 700;
    cursor: w-resize;
        -webkit-user-select:none;
     -moz-user-select:none;
     -ms-user-select:none;
     user-select:none;
  }
</style>