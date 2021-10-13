<script>

var template = "<div class='nav-menu'><slot></slot></div>";
Vue.component("nav-menu",{template:template,})

var template2 = "<div class='nav-menu-item' key='{{index}}'>{{index}}<slot></slot></div>";
vue.component("nav-menu-item",{
      props:['index'],
      template:template2,
      });

var template3 = "<div class='nav-menu-submenu'><solt name='title'></solt></div>";
Vue.component("nav-menu-submenu",{template:template3});


export default {
      
}
</script>
<template>
  <div class="rh-nav-wrap">
        <ul>
              <li>
                    <span class="rh-item-name">这是选项一</span>
                    <slot></slot>
              </li>
        </ul>

      <div class="nav-menu">
            <slot></slot>
            <div class="nav-menu-submenu">
                  <div class="nav-menu-title">标题一</div>
                  <div class="nav-menu-submenu">
                        <div class="nav-menu-title">标题二</div>
                        <div class="nav-menu-submenu">
                              <div class="nav-menu-item">标题三</div>
                              <div class="nav-menu-item">标题三</div>
                              <div class="nav-menu-item">标题三</div>
                              <div class="nav-menu-item">标题三</div>
                        </div>
                        <div class="nav-menu-item">标题二</div>
                        <div class="nav-menu-item">标题二</div>
                  </div>
                  <div class="nav-menu-item">标题一</div>
            </div>
            <div class="nav-menu-item">
                  最后一级目录
            </div>
      </div>

      <el-menu>
            <el-submenu>

            </el-submenu>
            <el-menu-item>

            </el-menu-item>
      </el-menu>


      <el-menu>
            <el-submenu index="1">
                  <span slot="title">一级菜单</span>
                  <el-submenu index="1-1">
                        <span slot="title">二级菜单</span>
                        <el-menu-item>三级菜单</el-menu-item>
                         <el-menu-item>三级菜单</el-menu-item>
                         <el-submenu index="1-1-3">
                               <el-menu-item index="1-1-3-1">四级菜单</el-menu-item>
                         </el-submenu>
                  </el-submenu>

                  <el-menu-item-group>
                        <template slot="title">
                              二级级菜单
                        </template>
                        <el-menu-item-group>
                              <template>三级菜单</template>
                              <el-menu-item-group>
                                    <el-menu-item>四级菜单</el-menu-item>
                                    <el-menu-item>四级菜单</el-menu-item>
                                    <el-menu-item>四级菜单</el-menu-item>
                              </el-menu-item-group>
                        </el-menu-item-group>
                        <span slot="title">二级菜单</span>
                        <el-menu-item>三级菜单</el-menu-item>
                        <el-menu-item>三级菜单</el-menu-item>
                  </el-menu-item-group>
            </el-submenu>
            <el-menu-item>
                  一级菜单
            </el-menu-item>
            <el-menu-item>
                  一级菜单
            </el-menu-item>
            <el-menu-item>
                  一级菜单
            </el-menu-item>       
      </el-menu>
  </div>
</template>

<script>
export default {
      name:'NavSideLeft',
      prop:{
            data:{
                  id:1,
                  text:'这是选项01',

            },
      },
      
}
</script>

<style>

</style>