let main = {
    //通过url调整导航高亮
    getNavByUrl(url, nav_session) {
      //从session中获取导航
      let nav = nav_session;
      let oldPath = url;
      //初始化导航样式
      for (var i = 0; i < nav.length; i++) {
        nav[i].isShow = false;
        if (('children' in nav[i]) && (nav[i].children.length > 0)) {
          for (var j = 0; j < nav[i].children.length; j++) {
            nav[i].children[j].isShow = false;
            if (('children' in nav[i].children[j]) && (nav[i].children[j].children.length > 0)) {
              for (var k = 0; k < nav[i].children[j].children.length; k++) {
                nav[i].children[j].children[k].isShow = false;
                if (('children' in nav[i].children[j].children[k]) && (nav[i].children[j].children[k].children.length > 0)) {
                  for (var z = 0; z < nav[i].children[j].children[k].children.length; z++) {
                    nav[i].children[j].children[k].children[z].isShow = false;
                  }
                }
              }
            }
          }
        }
      }
      //通过url返回导航
      for (var i = 0; i < nav.length; i++) {
        if (oldPath == nav[i].path) {
          nav[i].isShow = true;
          return nav;
        }
        if (('children' in nav[i]) && (nav[i].children.length > 0)) {
          for (var j = 0; j < nav[i].children.length; j++) {
            if (oldPath == nav[i].children[j].path) {
              nav[i].children[j].isShow = true;
              nav[i].isShow = true;
              return nav;
            }
            if (('children' in nav[i].children[j]) && (nav[i].children[j].children.length > 0)) {
              for (var k = 0; k < nav[i].children[j].children.length; k++) {
                if (oldPath == nav[i].children[j].children[k].path) {
                  nav[i].children[j].children[k].isShow = true;
                  nav[i].children[j].isShow = true;
                  nav[i].isShow = true;
                  return nav
                }
                if (('children' in nav[i].children[j].children[k]) && (nav[i].children[j].children[k].children.length > 0)) {
                  for (var z = 0; z < nav[i].children[j].children[k].children.length; z++) {
                    nav[i].children[j].children[k].children[z].isShow = true;
                    nav[i].children[j].children[k].isShow = true;
                    nav[i].children[j].isShow = true;
                    nav[i].isShow = true;
                    return nav
                  }
                }
              }
            }
          }
        }
      }
      return nav
    },
    //通过id调整导航高亮
    getNavById(id, nav_session) {
      //从session中获取导航
      let nav = nav_session;
      let oldId = id;
      //初始化导航样式
      for (var i = 0; i < nav.length; i++) {
        nav[i].isShow = false;
        if (('children' in nav[i]) && (nav[i].children.length > 0)) {
          for (var j = 0; j < nav[i].children.length; j++) {
            nav[i].children[j].isShow = false;
            if (('children' in nav[i].children[j]) && (nav[i].children[j].children.length > 0)) {
              for (var k = 0; k < nav[i].children[j].children.length; k++) {
                nav[i].children[j].children[k].isShow = false;
                if (('children' in nav[i].children[j].children[k]) && (nav[i].children[j].children[k].children.length > 0)) {
                  for (var z = 0; z < nav[i].children[j].children[k].children.length; z++) {
                    nav[i].children[j].children[k].children[z].isShow = false;
                  }
                }
              }
            }
          }
        }
      }
      //通过url返回导航
      for (var i = 0; i < nav.length; i++) {id
        if (oldId == nav[i].id) {
          nav[i].isShow = true;
          return nav;id
        }
        if (('children' in nav[i]) && (nav[i].children.length > 0)) {
          for (var j = 0; j < nav[i].children.length; j++) {
            if (oldId == nav[i].children[j].id) {
              nav[i].children[j].isShow = true;
              nav[i].isShow = true;
              return nav;
            }
            if (('children' in nav[i].children[j]) && (nav[i].children[j].children.length > 0)) {
              for (var k = 0; k < nav[i].children[j].children.length; k++) {id
                if (oldId == nav[i].children[j].children[k].id) {
                  nav[i].children[j].children[k].isShow = true;
                  nav[i].children[j].isShow = true;
                  nav[i].isShow = true;
                  return nav
                }
                if (('children' in nav[i].children[j].children[k]) && (nav[i].children[j].children[k].children.length > 0)) {
                  for (var z = 0; z < nav[i].children[j].children[k].children.length; z++) {
                    nav[i].children[j].children[k].children[z].isShow = true;
                    nav[i].children[j].children[k].isShow = true;
                    nav[i].children[j].isShow = true;
                    nav[i].isShow = true;
                    return nav
                  }
                }
              }
            }
          }
        }
      }
    },
    resetmenu(nav){
      //初始化导航样式
      for (var i = 0; i < nav.length; i++) {
        nav[i].isShow = false;
        if (('children' in nav[i]) && (nav[i].children.length > 0)) {
          for (var j = 0; j < nav[i].children.length; j++) {
            nav[i].children[j].isShow = false;
            if (('children' in nav[i].children[j]) && (nav[i].children[j].children.length > 0)) {
              for (var k = 0; k < nav[i].children[j].children.length; k++) {
                nav[i].children[j].children[k].isShow = false;
                if (('children' in nav[i].children[j].children[k]) && (nav[i].children[j].children[k].children.length > 0)) {
                  for (var z = 0; z < nav[i].children[j].children[k].children.length; z++) {
                    nav[i].children[j].children[k].children[z].isShow = false;
                  }
                }
              }
            }
          }
        }
      }
      return nav;
    }
}
export default main