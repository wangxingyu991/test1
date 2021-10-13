// 树

//获取导航菜单列表-----复制1
export function getMenuList(routers) {
      // console.log("routers:请见下面");
      // console.log(routers);
      let menuList = [];


      function children(children){//获取子组件的内容发现内容和父组件一样的
            let menuList = [];
            children.forEach((elment,index) =>{
                  if (!elment.meta.hideInMenu) {
                        let obj = { id: 0, label: '', layer: 0, icon: '', children: {} }; 
                        obj.id = index;
                        obj.label = elment.meta.title;
                        obj.layer = 'layer-' + index;
                        if (elment.meta.icon) {
                              obj.icon = elment.meta.icon;
                        } else {
                              obj.icon = ''
                        }
                        menuList.push(obj);
                  }
            })
            return menuList
      }
      routers.forEach((element, index) => {
            let obj = { id: 0, label: '', layer: 0, icon: '', children: {} };
            if (!element.meta.hideInMenu) {
                  obj.id = index;
                  obj.label = element.meta.title;
                  obj.layer = 'layer-' + index;
                  if (element.meta.icon) {
                        obj.icon = element.meta.icon;
                  } else {
                        obj.icon = ''
                  }
                  if (element.children) {
                        obj.children = children(element.children);
                  }
                  menuList.push(obj);
            };
      });
      // console.log("menuList如下");
      // console.log(menuList);
      return menuList
}
