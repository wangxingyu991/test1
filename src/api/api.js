import axios from 'axios'
import { Message } from 'element-ui';
import router from '../router';
import myauth from "@/utils/auth.js";
import Vue from 'vue'
/*请求拦截器*/
axios.interceptors.request.use(
    config => {
    //   if (myauth.getToken()==null) {
    //     if(myauth.IsAuTh){
    //       router.push({"path":"/login"});
    //     }
    //   }
    //   if(Vue.config.crossConfig != 0){
    //     if (config.method === 'get') {
    //       //  给data赋值以绕过if判断
    //       config.data = true 
    //     }
    //     config.headers['Content-Type'] = 'application/json'
    //   }
      return config;
    },err=>{
      console.log(err);
    }
  )
  
//错误信息整理反馈
function errorInfo(url,error,fun){
    if (error != null && error != undefined) {
        
        if (error.response != null && error.response.status != '200') {
            //构建反馈信息
            let data = { 'success': false, "errorCode": error.response.status, 'errorMsg': error.message, 'data': '' }
            fun(data);
        }
    }
}
function checkInfo(data,fun){
    if(data.errorCode == '06004'){
        Message.error('账号身份过期，请重新登录');
        router.push({"path":"/login"});
    } else {
        fun(data);
    }
}
//白名单
let white = ['/login','/register','/register','/retrievePassword']
//获取session中token，拦截
let getSession = function (url) {
    var _this = this;
    for(var i=0;i<white.length; i++){
        if(url.indexOf(white[i])>=0){
            return true;
        }
    }
    if (myauth.getToken()==null) {
        Message.error('帐号身份己过期,请重新登录')
        if(myauth.IsAuTh){
            router.push({"path":"/login"});
        }
    }else{
        return true;
    }
    return false;
}
//请求实列创建
let instance = axios.create({
    timeout: 6000
    //创建一个新的axios实列
}) 
let getUrlByTop = function(url){
    let topUrl = url.substring(1);
    var top = topUrl.substring(0, topUrl.indexOf("/"));
    // return Vue.prototype.$urls + topUrl.substring(topUrl.indexOf("/"));
    if(Vue.config.crossConfig == 0){
        return url;
    }else if(Vue.config.crossConfig == 1){
        return Vue.prototype.$urls + topUrl.substring(topUrl.indexOf("/"));
    }else if(Vue.config.crossConfig == 2){
        return Vue.prototype.$urls + url;
    }
};
//api实列创建
const api = {
    get(url,params,fun){
        let authTokenArray = {};
        if(getSession(url)){
            let _url = url;
            authTokenArray[Vue.config.authToken] = myauth.getToken();
            let _params = {
                params: params,
                headers: authTokenArray
            }
            //get请求
            instance.get(getUrlByTop(_url),_params).then((response) => {
                let data = response.data;
                checkInfo(data, fun)
            }).catch((error) => {
                errorInfo(url,error,fun);
            })
        }
    },
    post(url, params, fun, headers){
        let authTokenArray = {};
        if(getSession(url)){
            let _url = url;
            authTokenArray[Vue.config.authToken] = myauth.getToken();
            let newHeaders = {
                headers: authTokenArray
            }
            if( arguments.length == 4){
                newHeaders["headers"] = headers;
            }
            //post请求
            instance.post(getUrlByTop(_url), params,newHeaders).then((response) => {
                let data = response.data;
                checkInfo(data, fun)
            }).catch((error) => {
                errorInfo(url, error, fun);
            })
        }
    },
    put(url,params,fun){
        let authTokenArray = {};
        if(getSession(url)){
            let _url = url;
            authTokenArray[Vue.config.authToken] = myauth.getToken();
            let headers = {
                headers: authTokenArray
            }
            instance.put(getUrlByTop(_url),params,headers).then((response)=>{
                let data = response.data;
                checkInfo(data, fun)
            }).catch((error) =>{
                errorInfo(url, error, fun);
            })
        }
    },
    delete(url,params,fun){
        let authTokenArray = {};
        if(getSession(url)){
            let _url = url;
            authTokenArray[Vue.config.authToken] = myauth.getToken();
            let _params = {
                params: params,
                headers: authTokenArray
            };
            instance.delete(getUrlByTop(_url), _params).then((response) => {
                let data = response.data;
                checkInfo(data, fun)
            }).catch((error) => {
                errorInfo(url, error, fun);
            })   
        }    
    }
}
export default api