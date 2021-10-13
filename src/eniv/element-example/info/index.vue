<style lang="less">
      .info{
            background: #fff;
            //display: flex;
            justify-content:flex-start;

            .nav-left{
                  width:200px;
                  height:100%;
                  padding: 10px 15px;
                  border-right: 1px solid #f0f0f0;
                  border-left: 1px solid #f0f0f0;
                  position: absolute;
                  left:0px;
                  top:0px;
                  background: #FFF;
                  z-index: 999;
            }
            .nav-right{
                  height:600px;
                  background: #eef0f5;
                  padding: 10px 20px;
                  position: absolute;
                  left:0px;
                  top:0px;
                  right:0px;
                  height: 100%;
            }
      }
</style>
<template>
  <div class="info">
       <!--  <div class="nav-left">
            <Tree v-bind:TreeData="TreeData"></Tree>   
        </div>-->
        <div class="nav-right">
            <div class="breadcrumb">
                  <el-breadcrumb separator="/">
                        <el-breadcrumb-item v-for="(item,index) in breadCrumb" :to="{path: item.path }" :key="index">{{item.title}}</el-breadcrumb-item>
                  </el-breadcrumb>
            </div>           
            <router-view></router-view>
        </div>
  </div>
</template>

<script>
export default {
      data(){
            return{
                  breadCrumb:[],
                  TreeData:[{
                        id:1,
                        label:'弹性公网IP和宽带 ',
                        isDropdown:true,
                        LastChildren:false,
                        children:[{
                              id:9,
                              label:'弹性公网IP',
                              isDropdown:true,
                              LastChildren:true,
                              children:[{
                                    id:11,
                                    label:'弹性公网IP'
                              },{
                                    id:12,
                                    label:'共享宽带'
                              },{
                                    id:13,
                                    label:'共享宽带'
                              },{
                                    id:14,
                                    label:'共享宽带'
                              },{
                                    id:15,
                                    label:'共享宽带'
                              }]
                        },
                        {
                              id:10,
                              label:'共享宽带'
                        },
                        {
                              id:11,
                              label:'共享宽带2'
                        },
                        {
                              id:11,
                              label:'共享宽带3'
                        }]
                  }]
            }
      },
      mounted(){
      let Array = this.$route.matched;
      let breadList=[];
      Array.forEach((item)=>{
      let obj = {};
      obj.title = item.meta.title;
      obj.path = item.path;
      breadList.push(obj);
      })
      this.breadCrumb = breadList;
      //this.$storage.dispatch('setConNav',true);
      //let flag = this.$storage.state.is_contentNav_show;
      //this.breadCrumb = this.$storage.state.breadCrumb;
      }
}
</script>

<style>

</style>