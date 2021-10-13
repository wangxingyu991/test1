//获取cookie
export function getCookie(name) {
      var arr, reg =new RegExp("(^|)"+name+"=([^;])(;|$)");
      if(arr = document.cookie.match(reg)){
            return (arr[2]) ;
      }else{
            return null;
      }
}

//获取cookie
export function setCookie (c_name,value,expiredays) {
      var exdate = new Date();
      exdate.setTime(expdate.getDate()+expiredays);
      document.cookie = c_name  + "="+escape(value) + ((expiredays == null) ? "":";expires=" + exdate.toGMTString());
}

//删除cookie
export function delCookie (name) {
      var exp =new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = getCookie(name);
      if(cval != null){
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
      }
}

//通过路由routes获取导航菜单列表
let Menu_id = 0
export function getMenuList(routers,beforeRoute){
      let _route = '';
      let menuList =[];
      if(beforeRoute){//beforeRoute父级的path字符串的连接,如：'main/component/table'+self.patch获取完整路径
          _route = beforeRoute;
      }
      routers.forEach((element,index) => {
            let obj = {};
            if (!element.meta.hideInMenu){
                  Menu_id++;
                  obj.id = Menu_id;
                  obj.label = element.meta.title;
                  obj.layer = 'layer-'+index;
                  obj.isShow = false;
                  if(element.meta.icon){
                        obj.icon = element.meta.icon;
                  } else{
                        obj.icon = ''
                  }
                  //路由patch连接判断是否是第一级路由
                  if (_route){
                        obj.path = _route+"/"+element.path;
                  } else {
                        obj.path = element.path;
                  }
                  //检测路由对象中是否含有children子路由
      
                  if('children' in element){
                        //对象中添加children重新生成子菜单路由对象
                        obj.children = getMenuList(element.children,obj.path);
                  }
                  menuList.push(obj);
                 
            };
      });
      return menuList
}

//通过后台获取导航一级导航菜单列表
export function getMenuList1(){}

