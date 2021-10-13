<style lang="less" >
 @import url('./carousel.less');
</style>
<template>
  <div class="content" id="content" style="height:214px">
      <div class="carousel" :style="{width:width+'px',height:height+'px'}">
          <div class="slide-wrap" :style="{transform:'translateX('+left+'px)',width:number*width+'px'}">
            <div v-for="(item,index) in imgUrl" :key="index" class="slide-item" :style="{width:width+'px',height:height+'px'}">
               <img :src="item" alt="">
            </div>
          </div>
      </div>
      <div class="arrow-group">
        <div class="turn-left" @click="tunLeft">
          <i class="el-icon-arrow-left" :style="{'margin-top':height/2-16+'px'}"></i>
        </div>
        <div class="turn-right" @click="tunRight">
           <i class="el-icon-arrow-right" :style="{'margin-top':height/2-16+'px'}"></i>
        </div>
      </div>
      <div class="page-item">
        <ul >
          <li :class="(flag==index)?'active':'li_1'" :key="index" v-for="(item,index) in imgUrl" @click="changTo(index)"></li>
        </ul>
      </div>
  </div>
</template>

<script>
    export default {
          data(){
              return{
                imgUrl:[require('@/assets/carousel/1.jpg'),require('@/assets/carousel/2.jpg'),require('@/assets/carousel/3.jpg'),require('@/assets/carousel/4.jpg')],
                width:0,
                height:0,
                left:0,
                flag:0,
                number:0,
                time:{},
              }
          },
          props: ['imgList'],
          mounted(){
            this.number = this.imgUrl.length;
            this.width = $("#content").width();
            this.height = $("#content").height();
            this.time = setInterval(this.tunLeft,6000);
            if(this.imgList!=undefined){
              this.imgUrl = imgList;
            }
          },
          methods:{
            tunRight(){
              this.flag = this.flag+1;//
              if(this.flag>=this.number){
                this.flag=0;
              }
              this.left = this.flag*this.width*-1;
              clearInterval(this.time);//消除原来的时间
              this.time = setInterval(this.tunLeft,6000);
            },
            tunLeft(){
                this.flag = this.flag-1;//
                if(this.flag<0){
                  this.flag = (this.number-1);
                }
                this.left = this.flag*this.width*-1;
                clearInterval(this.time);
                this.time = setInterval(this.tunLeft,6000);
            },
              changTo(index){
                this.left = index*this.width*-1
                this.flag = index;
              },
              autoPlay(){
                 this.left = this.flag*this.width*-1
                this.flag = this.flag+1;
                if((this.flag+1)>this.number||this.flag<0){
                  this.flag = 0;
                }
              }
          }
    }
</script>
