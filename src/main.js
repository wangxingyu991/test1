// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios';
import less from 'less'
import storage from './vuex'
import Mock from './mock.js';
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import api from '@/api/api.js'
import validate from "@/utils/validate";
import dateUtil from '@/utils/dateUtil.js';
import App from './App'
import router from './router'
/**
 * @description 全局注册应用配置
 */
Vue.config.productionTip = false
/**
 * //跨域访问开关（使用gateway时候使用）
 * 0nginx代理 1跨域非gateway 2跨域gateway
 */
Vue.config.crossConfig = 0
Vue.config.authToken = Vue.config.crossConfig==2 ? "G-API-TOKEN" : "X-API-TOKEN";
/**
 * 非nginx代理模式的跨域访问地址
 */
Vue.prototype.$urls = "http://172.16.80.102:32090";
Vue.prototype.$http = axios;
Vue.prototype.$storage = storage;
Vue.prototype.$api = api;
Vue.prototype.$validate = validate;
Vue.prototype.$dateUtil = dateUtil;

ElementUI.Dialog.props.closeOnClickModal.default = false
ElementUI.Drawer.props.wrapperClosable.default = false
ElementUI.Drawer.props.withHeader.default = true
Vue.use(less)
Vue.use(ElementUI);

Vue.prototype.$apis = {
  home: "/api",
  order: "/order",
  manage: "/manage",
  permission: "/permission",
  workorder: "/workorder",
  business: "/business",
  icpmanagement: "/icpmanagement",
  icptask: "/icptask",
  usptask:"/usptask",
}

// Vue.prototype.$urls = "http://172.16.80.102:32090";
// Vue.prototype.$urls = "http://172.16.80.122:30030";
  // api: "http://172.16.80.122:30030",
  // order: "http://172.16.80.122:30070",
  // manage: "http://172.16.80.122:30050",
  // permission: "http://172.16.80.122:30040",
  // workorder: "http://172.16.80.122:30060",
  // usptask:"http://172.16.80.122:30080",
  // icpmanagement: "http://172.16.80.122:30130",
  // icptask: "http://172.16.80.122:30170",

/* eslint-disable no-new */

router.beforeEach((to,from,next) =>{
  //console.log("userName=" + localStorage.getItem("userName"));
  // if(to.path=="/main"){
  //   next({name:"Login"})
  // }
  // if(to.name == null){
  //   next({name:"Login"})
  // }
  next();
})

/*组件初始化*/
var newVue = new Vue({
  el: '#app',
  router,
  storage,
  components: { App },
  template: '<App/>'
})
export default newVue;