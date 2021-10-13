//前端会话过期，同时删除后端key
let logout = function (headres) {
  var _this = this;
  if(headres != undefined && headres != null){
    let myheaders = {
      'X-API-TOKEN': headres
    };
    // httpclient.post2("/login/out", {}, function (res) {},myheaders);
    // _this.$api.get(this.$apis.home+"/open/login/out", {id: id}, function (res) {});
  }
};
export default{
  TokenKey : "X-API-TOKEN",
  CurrentTime : "CURRENT-TIME",
  IsAuTh : true,
  IsSso: false,
  getTokenKey() {
    return this.TokenKey;
  },
  getToken(token) {
    var that = this;
    var curtimes = new Date().getTime();
    var oldtimes = sessionStorage.getItem(that.CurrentTime);
    if( oldtimes==null ){
      return null;
    }else if( (curtimes - oldtimes) > 35*60*1000 ){
      if(sessionStorage.getItem(that.TokenKey)!=undefined){
        logout(sessionStorage.getItem(that.TokenKey));
      }
      return that.removeToken();
    }else{
      sessionStorage.setItem(that.CurrentTime,new Date().getTime());
      return sessionStorage.getItem(that.TokenKey);
    }
  },setToken(token) {
    var that = this;
    sessionStorage.setItem(that.CurrentTime,new Date().getTime());
    // mycookie.set(that.TokenKey,token);//20190806 处理iframe vue
    return sessionStorage.setItem(that.TokenKey,token);
  },removeToken() {
    var that = this;
    sessionStorage.removeItem(that.CurrentTime);
    sessionStorage.removeItem(that.TokenKey);
    sessionStorage.clear();
    // mycookie.delete("TGC","");
    // mycookie.delete("JSESSIONID","");
    // mycookie.delete(that.TokenKey);//20190806 处理iframe vue
    return null;
  },isToken(url){
    var whiteList = ["/login"];
    if(whiteList.indexOf(url) !== -1) {
      return true;
    }else{
      return false;
    }
  },setRyxm(ryxm){
    return sessionStorage.setItem("ryxm",ryxm);
  },setJgdm(jgDm){
    return sessionStorage.setItem("jgDm",jgDm);
  },getRyxm(ryxm){
  return sessionStorage.getItem("ryxm",ryxm);
  },getJgdm(jgDm){
  return sessionStorage.getItem("jgDm",jgDm);
  },setJgmc(jgmc){
    return sessionStorage.setItem("jgmc",jgmc);
  },getJgmc(jgmc){
    return sessionStorage.getItem("jgmc",jgmc);
  },setDlzh(dlzhDm){
    return sessionStorage.setItem("dlzhDm",dlzhDm);
  },getDlzh(dlzhDm){
    return sessionStorage.getItem("dlzhDm",dlzhDm);
  },setRysfdm(rysfDm){
    return sessionStorage.setItem("rysfDm",rysfDm);
  },getRysfdm(rysfDm){
    return sessionStorage.getItem("rysfDm",rysfDm);
  },setRysfmc(rysfmc){
    return sessionStorage.setItem("rysfmc",rysfmc);
  },getRysfmc(rysfmc){
    return sessionStorage.getItem("rysfmc",rysfmc);
  },setZzjglxDm(zzjglxDm){
    return sessionStorage.setItem("zzjglxDm",zzjglxDm);
  },getZzjglxDm(zzjglxDm){
    return sessionStorage.getItem("rysfmc",zzjglxDm);
  },setItem(item){
    return sessionStorage.setItem("item",item);
  },getItem(item){
    return sessionStorage.getItem("item",item);
  },setEvent(event){
    return sessionStorage.setItem("event",event);
  },getEvent(event){
    return sessionStorage.getItem("event",event);
  }
}
