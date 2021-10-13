<template>
  <div class="main-wrap">
      <div class="rh-side-left" :style="{height:navHeight+'px',width:navWidth+'px'}">
        <!-- 导航树图标 -->
        <div class="rh-nav-icon-wrap"  v-show="!isShow">
          <div class="rh-nav-icons">
            <div class="nav-icon" v-for="(icon,index) in dataMenuList" :key="index">
              <el-tooltip placement="right-start" v-if="('children' in icon)">
                <div class="tooltip-nav-list"  slot="content">
                    <div class="tol-nav-item" v-for="(nav,index) in icon.children" :key="index"  @click="nav_click($event,nav)">{{nav.label}}</div>
                </div>
                <i :class="icon.icon"></i>
              </el-tooltip>
              <i :class="icon.icon" v-if="!('children' in icon)"></i>
            </div>
          </div>
        </div>
        <!--导航树文字模块-->
        <div class="rh-nav-wrap" v-show="isShow">
          <el-scrollbar  style="height: 100%;" :native="false">
            <!-- 导航收索部分 -->
            <div class="rh-search" :class="{search_focus:isFocus}" style="display:block;">
              <el-input  placeholder="请输入内容" suffix-icon="el-icon-search" v-model="Search_Nav"></el-input>
            </div>
            <!--动态显示导航内容以及单击路由跳转-->
            <div class="rh-nav-item" v-for="(data_nav,index) in dataMenuList" :key="index" :layer="data_nav.layer">
                <div class="rh-nav-main nav-layer-1"  :id="'id_' + data_nav.id"  :class="data_nav.isShow ? 'active':''" @click="nav_click($event,data_nav)">
                <!--导航图标-->
                  <span class="rh-nav-icon">
                    <i :class="data_nav.icon"></i>
                  </span>
                <!--导航名称-->
                  <span class="rh-nav-name">{{data_nav.label}}</span>
                <!--导航箭头-->
                  <span class="rh-nav-arrow" v-show='isArrowShow(data_nav)'>
                    <i class="el-icon-arrow-down" v-show="!(data_nav.isShow)"></i>
                    <i class="el-icon-arrow-up" v-show="data_nav.isShow"></i>
                  </span>
                </div>
                <!--下拉菜单-->
                <div class="rh-nav-drop" v-show="data_nav.isShow">
                  <div class="rh-nav-submain nav-layer-2"  v-for="(data,index) in data_nav.children" :key="index" :layer="data.layer">
                    <div class="rh-subnav-item" :class="data.isShow ? 'active':''" @click="nav_click($event,data)" :id="'id_' + data.id">
                      <!--下拉菜单名称-->
                      <span class="rh-subnav-name">{{data.label}}</span>
                      <!--下拉菜单箭头是否显示-->
                      <span class="rh-nav-arrow" v-show="isArrowShow(data)">
                        <!--判断children属性是否存在-->
                          <i class="el-icon-arrow-down"  v-show="!(data.isShow)"></i>
                          <i class="el-icon-arrow-up"  v-show="data.isShow"></i>
                      </span>
                    </div>
                    <div class="rh-subnav-drop" v-show="data.isShow">
                      <div class="rh-Ssubnav-item" v-for="(data_sub,index) in data.children" :key="index"  @click="nav_click($event,data_sub)">
                        <span class="rh-nav-name" :id="'id_' + data_sub.id"  :class="data_sub.isShow ? 'active':''" >{{data_sub.label}}</span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
      <div class="rh-side-content" :style="{height:(navHeight)+'px',width:contentWidth+'px',left:contentLeft+'px'}">
        <div class="right-content" :style="{'padding-left':(is_contentNav_show ? 308:15)+'px'}">
          <router-view></router-view>
        </div>
      </div>
  </div>
</template>

<script>
export default {
      data(){
          return{
            Search_Nav: "", //search导航菜单
            isNavShow:this.$storage.state.isNavShow, //导航是否显示
            p_name: "用户名", //获取用户名称
            navHeight: 0, //导航高度
            navWidth:250, //导航宽度
            isFocus: false, //菜单搜索标志符
            WinHeight: 0, //浏览器窗口高度
            contentWidth: 1920, //内容区宽度
            contentLeft: 250, //内容去距离左侧位置距离、
            horizental_Nav: [], //水平数据
            dataMenuList2: [], //最左侧菜单导航列表数据
            dataMenuList: [],
            breadCrumb: [], //面包屑导航
            is_contentNav_show: false,
          }
      },
      computed:{
          isShow(){
            this.isNavShow = this.$storage.state.isNavShow;
            this.navWidth = this.$storage.state.NavSize.width;
            this.contentWidth = this.$storage.state.frameSize.width;
            this.contentLeft = this.$storage.state.NavSize.width;
            return this.$storage.state.isNavShow;
          }
      },
      watch:{

      },
      created(){
          //样式初始化
          this.navHeight = window.innerHeight - 50;//初始化导航高度
          this.navWidth = this.$storage.state.NavSize.width;//初始化导航高度
          //this.isNavShow = this.$storage.state.isNavShow;
          this.WinHeight = window.innerHeight;
          let obj = {};
          obj.height = window.innerHeight;
          if (this.isNavShow) {
            //判断是否展开导航菜单
            this.contentWidth = window.innerWidth - 240;
            obj.width = this.contentWidth;
          } else {
            this.contentWidth = window.innerWidth - 50;
            obj.width = this.contentWidth;
          }
          this.$storage.commit("setFrameProp", obj);
          //内容content区域大小尺寸
          let frameSize = {
            width: this.contentWidth,
            height: this.navHeight,
          };
          //添加屏幕自适应监听
          window.onresize = () => {
            let props = {};
            this.WinHeight = window.innerHeight;
            if (this.isNavShow) {
              this.contentWidth = window.innerWidth - 240;
              props.width = this.contentWidth;
            } else {
              this.contentWidth = window.innerWidth - 50;
              props.width = this.contentWidth;
            }
            this.navHeight = window.innerHeight - 50;
            props.height = window.innerHeight;
            this.$storage.commit("setFrameProp", props);
            this.$storage.commit("setframeSize", frameSize);
            //console.log(props);
          };
          this.$storage.commit("setframeSize", frameSize);
      },
      mounted(){
          this.dataMenuList = this.$storage.state.navListAll[1].children;
          console.log("navList:");
          console.log(this.dataMenuList);
      },
      methods:{
          //导航菜单点击功能dom以及当前数据列
          nav_click($event, data_nav) {
            let exisChildren = "children" in data_nav;
            let temUrl = window.location.href.split("#")[1];
            if (!exisChildren && temUrl != data_nav.path) {
              //避免路由重定向以及保证最后一级菜单
              this.$router.push({path:data_nav.path,params:{navid:1}});
              //在vuex中设置breadcrumb内容
              //this.$storage
              $(".rh-subnav-item").attr("class", "rh-subnav-item");
              $(".rh-Ssubnav-item").attr("class", "rh-Ssubnav-item");
              $($event.target).addClass("active");
            }
            if(exisChildren&&(data_nav.children.length>0)){
              data_nav.isShow = !data_nav.isShow;
            }
          },

          // 箭头显示判断，导航菜单对象里面是否含有子元素集合
          isArrowShow(NavDate) {
            var prop = "children";
            if (prop in NavDate) {
              return true;
            } else {
              return false;
            }
          },
      }
}
</script>

<style>

</style>