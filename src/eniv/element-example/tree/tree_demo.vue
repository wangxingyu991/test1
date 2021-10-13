<style lang="less" >
      .rh-tree{
            // width:200px;
            margin:0px;
            .rh-tree-trunk{
                  background: #FFF;
                  overflow: hidden;
                  .rh-tree-leaf{
                        div.rh-tree-node{
                              font-size: 12px;
                              color:#525252;
                              line-height:37px;
                              cursor: pointer;
                              &::before{
                                    z-index: 1;
                              }
                              &:hover{
                                    background: #e6e8ee;
                                    color: #5e7ce0;
                              }
                        }
                        div.active.rh-tree-node{
                              color:#5e7ce0;
                              &::before{
                                    position: absolute;
                                    //left:30px;
                                    top: 8px;
                                    content: "";
                                    height: calc(100% - 18px);
                                    background: #5e7ce0;
                                    z-index: 3;
                              }
                        }
                  }
                  &.last::before{
                        position: absolute;
                  }
            }
      }
      .rh-tree-leaf.leaf_0 .rh-tree-trunk.last::before{
            position: absolute;
            left: 6px;
            top: 46px;
            content: "";
            width: 2px;
            height: calc(100% - 57px);
            background: #d9e0f7;
            z-index: 2;
      }
      .rh-tree-leaf.leaf_1 .rh-tree-trunk.last::before{
            position: absolute;
            left: 30px;
            top: 43px;
            content: "";
            width: 2px;
            height: calc(100% - 52px);
            background: #d9e0f7;
            z-index: 2;
      }
      .flotR{
            float:right;
            margin-right: 10px;
            margin-top: 10px;
      }
      .leaf_1{
            position: relative;
      }
      .rh-tree-leaf.leaf_0{
            position: relative;
      }
      .leaf_1 div.active.rh-tree-node::before{
            position: absolute;
            left:6px;
            top: 8px;
            content: "";
            width: 2px;
            height: calc(100% - 18px);
            background: #5e7ce0;
            z-index: 3;           
      }
      .leaf_2{
            position: relative;
      }
      .leaf_2 div.active.rh-tree-node::before{
            position: absolute;
            left:30px;
            top: 8px;
            content: "";
            width: 2px;
            height: calc(100% - 18px);
            background: #5e7ce0;
            z-index: 3;           
      }
      .leaf_0>.rh-tree-node{
            padding-left:10px;
            font-weight:700;
      }
      .leaf_0>.rh-tree-node{
            padding-left:17px;
            font-weight:700;
      }
      .leaf_1 .rh-tree-node{
            padding-left:17px;
      }
      .leaf_2 .rh-tree-node{
            padding-left:45px;
      }
</style>
<template>
 <div style="height:100%;">
      <el-scrollbar style="height:100%">
            <div class="rh-tree" id="tree_template">
                  <!-- <el-divider>nav系列</el-divider> -->
                  <ul class="rh-tree-trunk">
                        <li class="rh-tree-leaf leaf_0"  v-for="(treeN1,index) in treeData" :key='index'>
                        <div class="rh-tree-node" >
                              {{treeN1.label}}  
                              <!-- <i v-if = "!(treeN1.isDropdown==undefined)" :class="{ 'el-icon-caret-bottom' :treeN1.isDropdown, 'el-icon-caret-top' :!(treeN1.isDropdown) }" class="flotR"></i> -->
                        </div>
                        <ul class="rh-tree-trunk" v-if="('children' in treeN1)" >
                              <li class="rh-tree-leaf leaf_1" v-for="(treeN2,index_2) in treeN1.children" :key="index_2">
                                    <div class="rh-tree-node" @click="a($event,treeN2)">
                                          {{treeN2.label}} 
                                          <i v-if = "('isDropdown' in treeN2)" :class="{ 'el-icon-caret-bottom' : treeN2.isDropdown, 'el-icon-caret-top' :!(treeN2.isDropdown) }" class="flotR"></i>
                                    </div>
                                    <ul class="rh-tree-trunk" v-if="('children' in treeN2)" :class="{last:('LastChildren' in treeN2)&&(treeN2.LastChildren)}">
                                          <li class="rh-tree-trunk leaf_2" v-for="(treeN3,index_3) in treeN2.children" :key="index_3">
                                                <div class="rh-tree-node" @click="a($event,treeN3)">
                                                      {{treeN3.label}}
                                                </div>
                                          </li>
                                    </ul>
                              </li>
                        </ul>
                        </li>
                  </ul>
            </div>
      </el-scrollbar>
</div>
</template>

<script>
export default {
      props:{
            TreeData:{
                  type:Array
            }
      },
      data(){
            return{
                  isActive:false,
                  isDropdown:true,
                  isDropdown2:true,
                  treeData:[],
            }
      },
      methods:{
            a(el,data){
                  data.isDropdown = !(data.isDropdown);
                  if('children' in data){
                        this.parentsNode(el);
                  }else{
                        this.TreeNode(el)
                  };
            },
            TreeNode(el){
                    var obj = document.getElementById("tree_template");

                  var arr = obj.getElementsByClassName("rh-tree-node");
                  for(var i=0; i<arr.length;i++){
                        arr[i].setAttribute("class","rh-tree-node");
                  }
                  el.target.setAttribute("class","rh-tree-node active");
            },
            parentsNode(el){

                  let dpDown_Obj = el.target.nextElementSibling;
                  let dropH = el.target.nextElementSibling.clientHeight ;//获取下拉菜单下拉内容的高度
                  let dropChild = el.target.nextElementSibling.childNodes;//获取下拉菜单下拉节点的数量
                  let newNodes=[];
                  let NodeHeight = 0;

                  for(var i = 0;i<dropChild.length;i++){//删除掉textNode节点
                        if(!(dropChild[i].nodeType==3)&&!(dropChild[i].nodeName=="#text")){
                              newNodes.push(dropChild[i]);
                        }
                  }
                  for(var i=0; i<newNodes.length;i++){
                        NodeHeight = NodeHeight + newNodes[i].clientHeight;
                  }

                  if(parseInt(dropH)>0){
                        dpDown_Obj.style.height = 0+"px";
                  }else{
                        dpDown_Obj.style.height = NodeHeight+"px"; 
                  }

                  this.isDropdown = !(this.isDropdown);
            }
      },
      mounted(){
            console.log(this.TreeData)
                  this.treeData = this.TreeData;
      }
}
</script>

<style>

</style>