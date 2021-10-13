<template>
  <div class="demo">
        <tree_demo  v-bind:TreeData="TreeData"></tree_demo>
  </div>
</template>

<script>
import tree_demo from './tree_demo.vue'
export default {
  components: { tree_demo },
          data(){
              return{
                  TreeData:[
                  {
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
                  },{
                              id:2,
                              label:'虚拟私有云',
                              isDropdown:false,
                              LastChildren:false,
                              children:[{
                              id:11,
                              label:'共享宽带',
                              isDropdown:false,
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
                              
                              },{
                              id:11,
                              label:'弹性公网IP'
                              }]
                  },{
                              id:3,
                              label:'子网'
                  },{
                              id:4,
                              label:'子网2'
                  }
                  ],
              }
          }
}
</script>

<style>

</style>