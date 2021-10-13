<template>
  <div class="main-wrap" :style="{height:WinHeight+'px'}">
    <div class="rh-top-head">
      <div class="rh-logo" :class="{'shrink':!(isNavShow)}">
        <div class="rh-logo-img">
          <i class="el-icon-s-help"></i>
        </div>
        <div class="rh-logo-text" v-show="isNavShow">增值税发票管理平台(管理端)</div>
        <div class="nav-tragge" @click="NavToggle" :class="{'active':!isNavShow}">
          <i class="el-icon-s-fold"></i>
        </div>
      </div>
      <div class="rh-party-left">
        <div class="rh-nav-horizental">
          <ul class="Horizetal-nav-items">
            <li class="horizental-nav-item" :class="item.isShow?'active':''" :id="'id_' + item.id" v-for="(item,key) in nav_all_data" @click="Nav_1_Click(item,key)" :key="key">{{item.label}}</li>
          </ul>
        </div>
      </div>
      <div class="rh-topRight-party">
        <!-- <div class="rh-search" :class="{search_focus:isFocus}" style="display:block;">
          <input type="text" class="rh-input input-primary" @focus="isFocus=true" @blur="isFocus=false" />
          <i class="el-icon-search" @click="mainSearch"></i>
        </div> -->
        <div class="vertical-line" style="display:none;"></div>
        <div class="rh-user-avatar">
          <div class="rh-avatar-img">
            <img src="../../../static/img/view/potr.png" alt="">
          </div>
          <div class="rh-user-drop">
            <ul>
              <li class="rh-li" @click="showPersonnal()">{{p_name}}</li>
              <!-- <li class="rh-li" @click="myList('1111')">我的工单信息</li> -->
              <li class="rh-li" @click="selectedProduct()">已选产品</li>
              <li class="rh-li" @click="myOrder()">我的订单</li>
              <li class="rh-li" @click="clearTocken()">注销</li>
            </ul>
          </div>
        </div>
        <div class="rh-nav">
          <ul class="nav-ul">
            <li class="rh-tax" style="margin-top:18px;">
              <span class="nav-text"><a>皮肤选择</a></span>
              <div class="rh-tax-drop">
                <ul>
                  <li class="rh-li" @click="changSkin(0)">默认皮肤</li>
                  <li class="rh-li" @click="changSkin(1)">蓝色系皮肤</li>
                  <li class="rh-li" @click="changSkin(2)">红色系皮肤</li>
                  <li class="rh-li" @click="changSkin(3)">黄色系皮肤</li>
                </ul>
              </div>
            </li>
            <li class="rh-tax" v-show="showChangeTenant"  style="margin-top:18px;">
              <a>切换租户</a>
              <div class="rh-tax-drop">
                <ul>
                  <li class="rh-li" v-for="tenant in tenantList" :key="tenant.tenantId" @click="changeTenant(tenant.tenantId, tenant.tenantName)">{{tenant.tenantName}}</li>
                </ul>
              </div>
            </li>
            <li v-show="false">
              <el-badge size="mini" class="rh-badge">
                <span class="nav-text"><a @click="forTenantApply">租户申请</a></span>
              </el-badge>
            </li>
            <!-- <li>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  产品购买
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in option" :key="item.productId" :command="item.productId">{{item.productName}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li> -->
            <li>        
              <el-badge size="mini" class="rh-badge">
                <span class="nav-text"><a @click="myWorkorder()">工单</a></span>
              </el-badge>
            </li>
            <li>
              <el-badge size="mini" :value="messageNum" class="rh-badge">
                <span class="nav-text"><a @click="myMessage()">消息</a></span>
              </el-badge>
            </li>
          </ul>
        </div>
        <div class="vertical-line" style="display:none;"></div>
      </div>
    </div>
    <div class="rh-bottom-content" v-if="!isHavNav" :style="{height:navHeight+'px'}">
        <router-view></router-view>
    </div>
    <div class="rh-bottom-content" v-if="isHavNav">
      <div class="rh-side-left" :style="{height:navHeight+'px',width:navWidth+'px'}">
        <!-- 导航树图标 -->
        <div class="rh-nav-icon-wrap" v-show="!isNavShow">
          <div class="rh-nav-icons">
            <div class="nav-icon" v-for="(icon,index) in dataMenuList" :key="index">
              <el-tooltip placement="right-start" v-if="(icon.isParent=='TRUE')">
                <div class="tooltip-nav-list" slot="content">
                  <div class="tol-nav-item" v-for="(nav,index) in icon.children" :key="index" @click="nav_click($event,nav)">{{nav.label}}</div>
                </div>
                <i :class="icon.icon"></i>
              </el-tooltip>
              <i :class="icon.icon" v-if="(icon.isParent=='FALSE')" @click="nav_click($event,icon)"></i>
            </div>
          </div>
        </div>
        <!--导航树文字模块-->
        <div class="rh-nav-wrap" v-show="isNavShow">
          <el-scrollbar style="height: 100%;" :native="false">
            <!-- 导航收索部分 -->
            <div class="rh-search" :class="{search_focus:isFocus}" style="display:none;">
              <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="Search_Nav"></el-input>
            </div>
            <!--动态显示导航内容以及单击路由跳转-->
            <div class="rh-nav-item"  v-for="(data_nav,index) in dataMenuList" :key="index">
              <div class="rh-nav-main nav-layer-1" :class="(data_nav.isShow&&data_nav.isParent=='FALSE')?'active':''" @click="nav_click($event,data_nav)">
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
                <div class="rh-nav-submain nav-layer-2" v-for="(data,index) in data_nav.children" :key="index">
                  <div class="rh-subnav-item" :class="(data.isShow&&data.isParent=='FALSE')?'active':''"  @click="nav_click($event,data)">
                    <!--下拉菜单名称-->
                    <span class="rh-subnav-name">{{data.label}}</span>
                    <!--下拉菜单箭头是否显示-->
                    <span class="rh-nav-arrow" v-show="isArrowShow(data)">
                      <!--判断children属性是否存在-->
                      <i class="el-icon-arrow-down" v-show="!(data.isShow)"></i>
                      <i class="el-icon-arrow-up" v-show="data.isShow"></i>
                    </span>
                  </div>
                  <div class="rh-subnav-drop" v-show="data.isShow">
                    <div class="rh-Ssubnav-item" v-for="(data_sub,index) in data.children" :class="(data_sub.isShow&&data_sub.isParent=='FALSE')?'active':''" :key="index" @click="nav_click($event,data_sub)">
                      <span class="rh-nav-name">{{data_sub.label}}</span>
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
          <!-- <div class="breadcrumb">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item,index) in breadCrumb" :to="{path: item.path }" :key="index">{{item.title}}</el-breadcrumb-item>
              </el-breadcrumb>
            </div> -->
          <router-view></router-view>
        </div>
      </div>
    </div>
    <el-dialog title="开通企业服务" :visible.sync="showmodel" width="55%" append-to-body :wrapperClosable=false :with-header=true>
      <el-row>
        <el-form :model="operatorForm" :rules="rules" ref="operatorForm" label-width="100px" label-position="right">
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业税号" prop="companyTaxId">
                <el-input v-model.trim="operatorForm.companyTaxId" placeholder="请输入企业税号" maxlength="100" onkeyup="value=value.replace(/[^A-Z0-9]/g,'')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业名称" prop="tenantName">
                <el-input v-model.trim="operatorForm.tenantName" placeholder="请输入企业名称" :maxlength="40"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业电话" prop="companyPhone">
                <el-input v-model.trim="operatorForm.companyPhone" placeholder="请输入企业电话" maxlength="45"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业地址" prop="companyAddress">
                <el-input v-model.trim="operatorForm.companyAddress" placeholder="请输入企业地址" maxlength="500"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人名称" prop="contact">
                <el-input v-model.trim="operatorForm.contact" placeholder="请输入联系人名称" maxlength="50"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人手机" prop="contactPhone">
                <el-input v-model.trim="operatorForm.contactPhone" placeholder="请输入联系人手机" maxlength="11"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人邮箱" prop="contactEmail">
                <el-input v-model.trim="operatorForm.contactEmail" placeholder="请输入联系人邮箱" maxlength="50"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="资质文件" prop="qualificationId">
                <!-- <el-input v-model="operatorForm.qualificationId" placeholder="资质文件"></el-input> -->
                <el-upload action="1" list-type="picture-card" ref="upload" :limit="1" accept="image/jpeg,image/gif,image/png" :multiple="false" :on-change="handleFileUpload"
                  :file-list="this.fileList" :auto-upload="false">
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}">
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" append-to-body>
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model.trim="operatorForm.remark" placeholder="请输入备注" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="rh-dialog-footer">
          <el-button type="primary" @click="saveForm('operatorForm')">提 交</el-button>
          <el-button @click="showmodel=false">关 闭 </el-button>
        </div>
      </el-row>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="showUpdatePwd" width="40%" append-to-body :wrapperClosable = false :with-header=true :show-close=false>
      <udpatePwdPage v-if="showUpdatePwd" :udpateData="udpateData"></udpatePwdPage>
    </el-dialog>
  </div>
</template>
<script>

import { getMeunLeft, checkPhone, checkEmail,ColorUtil} from "@/utils/tools.js"
import menu from "@/utils/menu.js";
import defaultMenu from "./menu.js";
import myauth from "@/utils/auth.js";
import storage from "@/localstorage/index.js"
import main from "@/kits/main.js"
import udpatePwdPage from "./updatepwd.vue";
import validate from "@/utils/validate.js";
export default {
  name: 'HelloWorld',
  components: { udpatePwdPage},
  data() {
    let queryData = (rule, value, callback) => {
      var _this = this;
      _this.$api.get(_this.$apis.home + "/rest/home/tenant/" + value, {}, function (res) {
        if (res.success == true) {
          callback(new Error('该企业税号已申请，请重新输入'));
        } else {
          callback();
        }
      });
    };
    return {
      nav_all_data: [{icon: "el-icon-user",id: '1000',isShow: true,label: "首页",path: "/main/home",isParent: "FALSE"},],//导航全部数据
      isNavShow: true,//导航是否显示
      isHavNav:true,
      p_name: '', //获取用户名称
      p_id :'default',
      Search_Nav: '',//search导航菜单
      isFocus: false,//菜单搜索标志符
      navHeight: 0,//导航高度
      navWidth: 50,//导航宽度
      WinHeight: 0,//浏览器窗口高度
      contentWidth: 1920,//内容区宽度
      contentLeft: 50,//内容去距离左侧位置距离、

      horizental_Nav: [],//水平数据
      dataMenuList: [],//最左侧菜单导航列表数据
      breadCrumb: [],//面包屑导航
      is_contentNav_show: false,
      dialogImageUrl: "",
      dialogVisible: false,
      showmodel: false,
      showChangeTenant: false,
      tenantList:[],
      userInfo: {},
      showUpdatePwd:false,
      udpateData:{},
      messageNum:this.$storage.state.messageNum,
      workOrderNum:0,
      operatorForm: {
        fileName: '',
        fileBase64: '',
        companyTaxId: '',
        tenantName: '',
        companyPhone: '',
        companyAddress: '',
        contact: '',
        contactPhone: '',
        contactEmail: '',
        qualificationId: '',
        remark: '',
        isDeleted: '0'
      },
      rules: {
        companyTaxId: [{ required: true, message: '请输入企业税号', trigger: 'blur' },
        { validator: queryData, trigger: 'blur' },
        {validator: function(rule, value, callback) {            
          if (value.length==15 || value.length==18||value.length==20) {
              callback();
          } else {
              callback(new Error("税号只能是15位或18位或20位"));
          }
        }
        }],
        tenantName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        companyPhone: [{ required: true, message: '请输入企业电话', trigger: 'blur' },
        { validator: checkPhone, trigger: 'blur' }],
        companyAddress: [{ required: true, message: '请输入企业地址', trigger: 'blur' }],
        contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        contactPhone: [{ required: true, message: '请输入联系人电话', trigger: 'blur' },
        { validator: checkPhone, trigger: 'blur' }],
        contactEmail: [{ required: true, message: '请输入联系人邮箱', trigger: 'blur' },
        { validator: this.$validate.isEmail, trigger: 'blur' }],
        qualificationId: [{ required: true, message: '请选择资质文件', trigger: 'change' }]
      },
      fileList: [],
      //option:[],
      disabled: false
    }
  },
  watch: {
    '$storage.state.messageNum'(){
      var parament = this.$storage.state.messageNum;
      if(parament > 99){
            this.messageNum = '99+';
      }else{
            this.messageNum = parament;
      }
    },
  },
  computed: {
    //获取用户信息
  },
  methods: {
    changSkin(index){
           let skinsVarious = [{
            '@themeColor':'#367ee8',
            '@headColor':'#282b33',
            '@defaultTextColor':'#fff',
            '@defaultBtHoverColor':'#7cb0ff',
            '@defaultBtBorderHoverColor':'#639ff8',
            '@defaultBtDisableColor':'#a0cfff',
            '@defaultBtTxtDisableColor':'#fff',
            '@headNavBgColorActive':'#000',
            '@navBgColorActive':'#8b9cac',
            '@navBgColorHover':'#bcc6cf',
            '@navBorderColorActive':'#303133'
      },{
            '@themeColor':'#367ee8',
            '@headColor':'#367ee8',
            '@defaultTextColor':'#fff',
            '@defaultBtHoverColor':'#7cb0ff',
            '@defaultBtBorderHoverColor':'#639ff8',
            '@defaultBtDisableColor':'#a0cfff',
            '@defaultBtTxtDisableColor':'#fff',
            '@headNavBgColorActive':'#1054b8',
            '@navBgColorActive':'#6bb7ff',
            '@navBgColorHover':'#9ed0ff',
            '@navBorderColorActive':'#425d93'
      },{
            '@themeColor':'#eb410b',
            '@headColor':'#eb410b',
            '@defaultTextColor':'#fff',
            '@defaultBtHoverColor':'#ffbd5b',
            '@defaultBtBorderHoverColor':'#ffb64a',
            '@defaultBtDisableColor':'#ffcd84',
            '@defaultBtTxtDisableColor':'#fff',
            '@headNavBgColorActive':'#f46233',
            '@navBgColorActive':'#ff7d54',
            '@navBgColorHover':'#ff9675',
            '@navBorderColorActive':'#aa4b2d'
      },{
            '@themeColor':'#aa6e17',
            '@headColor':'#aa6e17',
            '@defaultTextColor':'#fff',
            '@defaultBtHoverColor':'#ffbd5b',
            '@defaultBtBorderHoverColor':'#ffb64a',
            '@defaultBtDisableColor':'#ffcd84',
            '@defaultBtTxtDisableColor':'#fff',
            '@headNavBgColorActive':'#b8853b',
            '@navBgColorActive':'#ca8115',
            '@navBgColorHover':'#e99821',
            '@navBorderColorActive':'#997739'
      }];
      less.modifyVars(skinsVarious[index]).then(()=>{console.log('修改成功')});
    },
    myList(id){
      let url = '/main/template_collapse';
      this.initMenu(menu.arry, url);
    },
    //我的消息
    myMessage(){
      let url = '/main/messageinfo';
      this.initMenu(menu.arry_message, url);
    },
    //我的工单
    myWorkorder(){
      let url = '/main/MyWorkOrderUser';
      this.initMenu(menu.arry_workorder, url);
    },
      //个人中心
    showPersonnal(){
      this.initMenu(menu.arry_personnal, "/main/personnal");
    },
    //已选产品
    selectedProduct() {
      // this.$router.push({ path: '/main/Selected' });
      this.initMenu(menu.arry_order, "/main/Selected");
    },

    //我的订单
    myOrder() {
      // this.$router.push({ path: '/main/OrderInfo' });
      this.initMenu(menu.arry_order, "/main/OrderInfo");
    },
    initMenu(dataMenuList, url){
      //顶部导航初始化
      this.nav_all_data = main.resetmenu(this.nav_all_data);
      //初始化二级菜单
      this.dataMenuList = main.getNavByUrl(url,dataMenuList);
      //左侧导航默认打开第一个
      this.$router.push({path:url});
      if(dataMenuList.length>0){this.isHavNav = true;this.isNavShow = true;}else{this.isHavNav = false;this.isNavShow = false;}
      this.setFrame(this.isNavShow);
      storage.set("isHavNav",this.isHavNav);
      storage.set("nav",this.dataMenuList);
      //storage.set("dataMenuList_"+this.p_id,this.dataMenuList);
    },
    //一级导航菜单点击
    Nav_1_Click(item, index) {
        if(item.isParent == "TRUE"){this.isHavNav = true;this.isNavShow = true;}else{this.isHavNav = false;this.isNavShow = false;}
        //导航宽度
        this.setFrame(this.isNavShow);
        storage.set("isHavNav",this.isHavNav);
        //根据id获取最新的导航样式
        this.nav_all_data = main.getNavById(item.id, this.nav_all_data);

        //点击一级菜单设置二级菜单高亮
        this.nav_side_data(item,this.nav_all_data);
        //初始化界面框架
    },
      //二级菜单高亮默认选中第一个菜单
    nav_side_data(item,nav){
      let newId = item.id;
      //初始化导航样式
      for(var i = 0;i<nav.length;i++){
        nav[i].isShow = false;
        if(('children' in nav[i])&&(nav[i].children.length>0)){
          for(var j =0 ; j<nav[i].children.length; j++){
              nav[i].children[j].isShow = false;
            if(('children' in nav[i].children[j])&&(nav[i].children[j].children.length>0)){
              for(var k = 0 ; k<nav[i].children[j].children.length;k++){
                nav[i].children[j].children[k].isShow = false;
                if(('children' in nav[i].children[j].children[k])&&(nav[i].children[j].children[k].children.length>0)){
                    for(var z = 0; z<nav[i].children[j].children[k].children.length;z++){
                        nav[i].children[j].children[k].children[z].isShow = false;
                    }
                }
              }
            }
          }
        }
      }
      //通过id修改返回导航data
      for(var i = 0;i<nav.length;i++){
        if(nav[i].id == newId){
          //第一步一级菜单点击高亮
          nav[i].isShow = true;
          //第二步加载二三级菜单
          if(('children' in nav[i])&&(nav[i].children.length>0)){
            //第二级菜单第一高亮
            nav[i].children[0].isShow =true;
            if(('children' in nav[i].children[0])&&(nav[i].children[0].children.length>0)){
              //三级菜单高亮
              nav[i].children[0].children[0].isShow = true;
                if(('children' in nav[i].children[0].children[0])&&(nav[i].children[0].children[0].children.length>0)){
                  //四级菜单高亮
                  nav[i].children[0].children[0].children[0].isShow = true;
                  this.$router.push( nav[i].children[0].children[0].children[0].path);
                }else{
                  this.$router.push(nav[i].children[0].children[0].path);
                }
            }else{
                this.$router.push(nav[i].children[0].path);
            };
          }else{
              this.$router.push(nav[i].path);
          }
            this.dataMenuList = nav[i].children;
            storage.set("dataMenuList_"+this.p_id,nav[i].children);
        }
      }
    },
    //导航菜单点击功能dom以及当前数据列
    nav_click($event, data_nav) {
      let exisChildren = ('children' in data_nav)&&(data_nav.children.length > 0);//判断是否是最后一级
      let temUrl = this.$route.path;
      if (!(exisChildren) && (temUrl != data_nav.path)) {
        //确保最后一级菜单并且避免路由重定向以及保证最后一级菜单
        this.$router.push(data_nav.path);
        //设置导航菜单高亮
        console.log(storage.get("nav"));
        this.dataMenuList = main.getNavByUrl(data_nav.path,storage.get("nav"));
        //this.dataMenuList = main.getNavByUrl(data_nav.path,storage.get("dataMenuList_"+this.p_id));
        console.log(this.dataMenuList);
        //存储导航
        storage.set("nav",this.dataMenuList);
        //storage.set("dataMenuList_"+this.p_id,this.dataMenuList);
      }
      // console.log($event.target);
      data_nav.isShow = !data_nav.isShow;
    },
    // menu导航菜单开关
    NavToggle() {
      //头部logo区域导航开关
      this.isNavShow = !(this.isNavShow);
     // this.isHavNav = !( this.isHavNav);
      this.setFrame(this.isNavShow);
      //将框架样式信息存储导航到session
      storage.set("isNavShow",this.isNavShow);
      storage.set("isHavNav",this.isHavNav);
    },
    //菜单收索功能待开发
    mainSearch() {
      console.log("菜单检索功能");
    },


    // 箭头显示判断，导航菜单对象里面是否含有子元素集合
    isArrowShow(NavDate) {
      var prop = "children";
      if (NavDate.isParent == "TRUE") {
        return true;
      } else {
        return false;
      }
    },
    //注销掉清除tocken
    clearTocken() {
      var _this = this;
      this.$confirm('确认退出吗?', '系统', {
        type: 'warning',
        cancelButtonClass: 'btn-custom-cancel'
      }).then(() => {
        _this.$api.post(this.$apis.home + "/open/home/login/out", {}, function (res) {
          myauth.removeToken();
          storage.remove(); 
          if (res.success) {
            _this.$router.push({ path: '/login' });
          } else {
            _this.$router.push({ path: '/login' });
          }
        });

      }).catch(() => {

      });
    },
    //图片上传
    handleFileUpload(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 1MB!");
        this.$refs.upload.clearFiles();
        return false;
      }
      this.operatorForm.fileName = file.name;
      this.operatorForm.qualificationId = file.name;
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
      this.getBase64(file.raw)
        .then((res) => {
          this.operatorForm.fileBase64 = res;
          this.$refs["operatorForm"].validateField("fileName");
        }).catch((e) => {
          console.log(e);
        });
      if (fileList.length >= 1) {
        //添加一个图片后隐藏图片添加
        $(".el-upload--picture-card").css("display", "none");
      }
    },
    //图片转bas64
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },
    //移除图片
    handleRemove(file) {
      this.fileList = [];
      this.dialogImageUrl = "";
      //移除图片后显示图片添加
      $(".el-upload--picture-card").css("display", "block");
    },
    //图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //表单提交
    saveForm(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        //校验完成后进行提交
        if (valid) {
          _this.loading = true;
          let para = Object.assign({}, _this.operatorForm);
          if (para != null) {
                        if (validate.checkForbiddenWordForm(JSON.stringify(para))) {
                          _this.$message({
                            showClose: true,
                            message: "不允许有特殊字符",
                            type: "error",
                          });
                          return;
                        }
          }
          _this.$api.post(_this.$apis.home + "/rest/home/home/savetenant", para, function (res) {
            if (res.success) {
              _this.$message({
                message: "提交成功",
                type: "success",
              });
              _this.showmodel = false;
              // _this.resetForm(formName);
              _this.resetForm('queryForm');
              _this.search();
            } else {
              _this.$message({
                message: "保存失败," + res.errorMsg,
                type: "error",
              });
            }
          }
          );
        }
      });
    },
    changeTenant(tenantId, tenantName){
      let _this = this;
      _this.$confirm('是否将默认租户切换为【'+tenantName+'】，切换后用户需要重新登陆', '提示', {
        type: 'warning',
        cancelButtonClass: 'btn-custom-cancel'
      }).then(() => {
        _this.$api.post(_this.$apis.home + "/rest/home/home/changetenant", {tenantId: tenantId}, function (res) {
          if (res.success) {
            // _this.clearTocken();
              _this.$message({ message: "切换成功，请重新登陆",  type: 'success' });
              myauth.removeToken();
              storage.remove(); 
              _this.$router.push({ path: '/login' });
          } else {
            _this.$message({
              message: "切换租户失败："+res.errorMsg,
              type: "error",
            });
          }
        });
      }).catch(() => {
      });
    },
    forTenantApply() {
      var _this = this;
      _this.$api.get(_this.$apis.home + "/rest/home/home/checktenant", {}, function (res) {
        if (res.success) {
          _this.showmodel = true;
        } else {
           _this.$message({
            message: res.errorMsg,
            type: "error",
          });
        }
      });
    },
    setFrame(IsNavShow) {
      //导航宽度
      this.navWidth = (IsNavShow) ? 240 : 50;
      //计算内容宽度
      this.contentWidth = (IsNavShow) ? (window.innerWidth - 240) : (window.innerWidth - 50);
      this.contentLeft = (IsNavShow) ? 240 : 50;
      //content区域大小尺寸
      let frameSize = {
        width: this.contentWidth,
        height: this.navHeight
      };
      let NavSize = {
        width: this.navWidth,
        height: 0
      };
      this.$storage.commit('setframeSize', frameSize);
      this.$storage.commit('setNavSize', NavSize);
      //将框架样式信息存储导航到session
      storage.set("isNavShow", IsNavShow);
    },
  },
  created() {
    //初始化左侧默认导航
    this.dataMenuList = defaultMenu;
    storage.set("nav",this.dataMenuList);
    if(this.$route.path=="/main/home"){
      this.isHavNav = true;
    }
    //首次刷新后台获取数据并把数据储存到session
    var _this = this;
    let temUrl = this.$route.path;
    // console.log(_this.nav_all_data);
    // _this.$api.get(_this.$apis.home + "/rest/home/home/menu", {}, function (res) {
    //   if (res.success) {
    //     var data = res.data;
    //     var userInfo = data.userInfo;
    //     var changePwdFlag = data.changePwdFlag;
    //     if(changePwdFlag == "Y"){
    //       _this.udpateData = userInfo;
    //       _this.showUpdatePwd = true;
    //       return;
    //     }
    //     var tenantId = data.userInfo.tenantId;
    //     if (tenantId == null || tenantId == "") {
    //       _this.showmodel = true;
    //     }
    //     _this.userInfo = userInfo;
    //     _this.p_id = userInfo.tgtId;
    //     storage.set("p_id",userInfo.tgtId);
    //     if (userInfo.personnelName != null && userInfo.personnelName != "") {
    //       _this.p_name = userInfo.personnelName;
    //     } else if (userInfo.personnelCode != null && userInfo.personnelCode != "") {
    //       _this.p_name = userInfo.personnelCode;
    //     } else if (userInfo.userName != null && userInfo.userName != "") {
    //       _this.p_name = userInfo.userName;
    //     } else {
    //       _this.p_name = userInfo.userAccount;
    //     }
    //     var tenantList = data.tenantList;
    //     if(tenantList != null && tenantList.length > 1){
    //       for ( var i=0; i<tenantList.length; i++ ){
    //         if(tenantList[i].tenantId != tenantId){
    //             _this.tenantList.push(tenantList[i]);
    //         }
    //       }
    //       _this.showChangeTenant = true;
    //     }
    //     var messageNum = data.messageNum;
    //     if(messageNum > 99){
    //       _this.messageNum = '99+';
    //     }else{
    //       _this.messageNum = messageNum;
    //     }
    //     var workOrderNum = data.workOrderNum;
    //     if(workOrderNum > 99){
    //       _this.workOrderNum = '99+';
    //     }else{
    //       _this.workOrderNum = workOrderNum;
    //     }
    //     _this.nav_all_data = _this.nav_all_data.concat(data.menuTree);
    //     //根据url设置
    //     _this.nav_all_data = main.getNavByUrl(temUrl,_this.nav_all_data);
    //     //判断是否是首次登录
    //       if(storage.get("dataMenuList_"+userInfo.tgtId)){
    //         //非首次登录则取session数据
    //         // _this.isHavNav =storage.get("isHavNav");
    //          _this.isNavShow =storage.get("isNavShow");
    //         // //左侧导航信息高亮
    //          _this.dataMenuList =  storage.get("dataMenuList_"+userInfo.tgtId);
    //         //全部导航内容来高亮一级菜单
    //           this.nav_all_data = main.getNavByUrl(temUrl,storage.get("nav"));
    //       }
    //   } else { 
    //       _this.$message.error("获取权限失败");
    //       myauth.removeToken();
    //       storage.remove(); 
    //       _this.$router.push({ path: '/login' });
    //   }
    // });

    //初始化样式
    this.navHeight = window.innerHeight - 50;

    this.WinHeight = window.innerHeight;
    let obj = {};
    obj.height = window.innerHeight-50;
    if (this.isNavShow) {//判断是否展开导航菜单默认true
      this.contentWidth = window.innerWidth - 240;
      obj.width = window.innerWidth - 240;
    } else {
      this.contentWidth = window.innerWidth - 50;
      obj.width = window.innerWidth - 50;
    }
    this.$storage.commit('setFrameProp', obj);
    //内容content区域大小尺寸
    let frameSize = {
      width: this.contentWidth,
      height: this.navHeight
    };
    //添加屏幕自适应监听
    window.onresize = () => {
      let props = {};
      let frame_Size = {}; 
      this.WinHeight = window.innerHeight;
      if (this.isNavShow) {
        this.contentWidth = window.innerWidth - 240;
        props.width = this.contentWidth;
        frame_Size.width = this.contentWidth;
      } else {
        this.contentWidth = window.innerWidth - 50;
        props.width = this.contentWidth;
        frame_Size.width = this.contentWidth;
      }
      this.navHeight = window.innerHeight - 50;
      props.height = window.innerHeight;
      frame_Size.height = window.innerHeight-50;
      this.$storage.commit('setFrameProp', props);//框架样式
      this.$storage.commit('setframeSize', frame_Size);//content样式
      //console.log(props);
    };

    this.$storage.commit('setframeSize', frameSize);
    //初始化导航样式
    if(storage.get("isHavNav")){
      this.setFrame(storage.get("isHavNav"));
      this.isNavShow = storage.get("isNavShow");
    }
  },
  mounted() {
    // 获取vuex中的用户信息
    // this.p_name = this.$storage.state.userName;
    // 获取导航信息
    // this.dataMenuList = this.$storage.getters.menuList;
    // 获取导航信息初始化面包屑导航
    // console.log("this.$route=初始化面包屑导航main.vue 235行")
    // let Array = this.$route.matched;
    // let breadList = [];
    // Array.forEach((item) => {
    //   let obj = {};
    //   obj.title = item.meta.title;
    //   obj.path = item.path;
    //   breadList.push(obj);
    // })
    // this.breadCrumb = breadList;
    //保持面包屑导航
    //this.$storage.commit('setBreadCrumb',this.breadCrumb);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
