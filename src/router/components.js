/*************组件demo 目录**********************/
/* 1、按钮 
 * 2、输入框表单
 * 3、弹出层
 * 4、表格
 * 5、树型结构
 * 6、手风琴
 * 
 * 
 * /
/***************目录************************/
const componentRouters = [
      {
            path: 'rh_button',
            name: 'rh_button',
            meta: {
                  title: 'button按钮',
                  icon: 'el-icon-c-scale-to-original',
                  hideInMenu: false
            },
            component: () => import("@/eniv/element-example/button/button.vue"),
      },
      {
            name: 'rh_radio',
            path: 'rh_radio',
            meta: {
                  title: '单选按钮',
                  icon: 'el-icon-c-scale-to-original',
                  hideInMenu: false
            },
            component: () => import("@/eniv/element-example/radio/radio.vue"),
      },
      {
            path: 'rh_form',
            name: 'rh_form',
            meta: {
                  title: 'form表单',
                  icon: 'el-icon-c-scale-to-original',
                  hideInMenu: false
            },
            component: () => import("@/eniv/element-example/form/form.vue"),
      },
      {
            name: 'rh_input',
            path: 'rh_input',
            meta: {
                  title: 'input模板输入框',
                  icon: 'el-icon-c-scale-to-original',
                  hideInMenu: false
            },
            component: () => import("@/eniv/element-example/input/input.vue"),
      },
      {
            name: 'rh_selectInput',
            path: 'rh_selectInput',
            meta: {
                  title: '模板下拉框',
                  icon: 'el-icon-c-scale-to-original',
                  hideInMenu: false
            },
            component: () => import("@/eniv/element-example/selectInput/selectInput.vue"),
      },
      {
            name: 'rh_loadding',
            path: 'rh_loadding',
            meta: {
                  title: 'Loading',
                  icon: 'el-icon-c-scale-to-original',
                  hideInMenu: false
            },
            component: () => import("@/eniv/element-example/loading/loading.vue"),
      },
      {
            name: 'rh_collapse',
            path: 'rh_collapse',
            meta: {
                  title: '手风琴',
                  icon: 'el-icon-c-scale-to-original',
                  hideInMenu: false
            },
            component: () => import("@/eniv/element-example/collapse/collapse.vue"),
      },
      {
            name: 'rh_tree',
            path: 'rh_tree',
            meta: {
                  title: 'tree树',
                  icon: 'el-icon-c-scale-to-original',
                  hideInMenu: false
            },
            component: () => import("@/eniv/element-example/tree/element-tree.vue"),
      },

      {
            name: 'rh_table',
            path: 'rh_table',
            meta: {
                  title: '模板表格',
                  icon: 'el-icon-c-scale-to-original',
                  hideInMenu: false
            },
            component: () => import("@/eniv/element-example/table/table.vue"),
      }, {
            path: 'rh_dialog',
            name: 'rh_dailog',
            meta: {
                  title: '模板弹出层',
                  icon: 'el-icon-c-scale-to-original',
                  hideInMenu: false
            },
            component: () => import("@/eniv/element-example/message/index.vue"),
      },

      {
            path: 'rh_tree2',
            name: 'rh_tree2',
            meta: {
                  title: '二级树菜单',
                  icon: 'el-icon-c-scale-to-original',
                  hideInMenu: false
            },
            component: () => import("@/eniv/element-example/tree/index.vue"),
      },

      {
            path: 'rh_bread',
            name: 'rh_bread',
            meta: {
                  title: 'breadcrumb面包屑导航',
                  icon: 'el-icon-c-scale-to-original',
                  hideInMenu: false
            },
            component: () => import("@/eniv/element-example/breadcrumb/breadcrumb.vue"),
      },
      {
            path: 'rh_progress',
            name: 'rh_progress',
            meta: {
                  title: 'progress进度条插件',
                  icon: 'el-icon-c-scale-to-original',
                  hideInMenu: false
            },
            component: () => import("@/eniv/element-example/progress/progress.vue"),
      },
      {
            path: 'rh_steps',
            name: 'rh_steps',
            meta: {
                  title: 'steps步进条插件',
                  icon: 'el-icon-c-scale-to-original',
                  hideInMenu: false
            },
            component: () => import("@/eniv/element-example/steps/step.vue"),
      },
      {
            path: 'rh_card',
            name: 'rh_card',
            meta: {
                  title: 'card卡片',
                  icon: 'el-icon-c-scale-to-original',
                  hideInMenu: false
            },
            component: () => import("@/eniv/element-example/card/card.vue"),
      },
      {
            path: 'rh_pageHead',
            name: 'rh_pageHead',
            meta: {
                  title: 'title组件',
                  icon: 'el-icon-c-scale-to-original',
                  hideInMenu: false
            },
            component: () => import("@/eniv/element-example/page-header/page-header.vue"),
      },
      {
            path: 'rh_searchContainer',
            name: 'rh_searchContainer',
            meta: {
                  title: 'search头部',
                  icon: 'el-icon-c-scale-to-original',
                  hideInMenu: false
            },
            component: () => import("@/eniv/element-example/search-container/search-bar-container.vue"),
      },
      {
            name: 'rh_carousel',
            path: 'rh_carousel',
            meta: {
                  title: '轮播功能',
                  icon: 'el-icon-c-scale-to-original',
                  hideInMenu: false
            },
            component: () => import("@/eniv/element-example/carousel/carousel.vue"),
      },
      {
            name: 'rh_transfer',
            path: 'rh_transfer',
            meta: {
                  title: '穿梭框',
                  icon: 'el-icon-c-scale-to-original',
                  hideInMenu: false
            },
            component: () => import("@/eniv/element-example/transfer/transfer.vue"),
      },
/**************
 * demo页面
 * 
 * 
 */
      {
            path: 'demo1',
            name: 'demo1',//demo1页面
            component: () => import('@/eniv/demo/page_demo1.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '测试页面1',
                  hideInMenu: false,
            }
      },
      {
            path: 'demo1_1',
            name: 'demo1_1',//demo1页面
            component: () => import('@/eniv/demo/page_demo1_1.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '测试页面1-1',
                  hideInMenu: false,
            }
      },
      {
            path: 'demo2',
            name: 'demo2',//demo2页面
            component: () => import('@/eniv/demo/page_demo2.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '测试页面2',
                  hideInMenu: false,
            }
      },
      {
            path: 'demo3',
            name: 'demo3',//demo2页面
            component: () => import('@/eniv/demo/page_demo3.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '测试页面3',
                  hideInMenu: false,
            }
      },
      {
            path: 'demo3_1',
            name: 'demo3_1',//demo3-1页面
            component: () => import('@/eniv/demo/page_demo3_1.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '测试页面3-1',
                  hideInMenu: false,
            }
      },
      {
            path: 'demo3_2',
            name: 'demo3_2',//demo3-1页面
            component: () => import('@/eniv/demo/page_demo3_2.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '测试页面3-2',
                  hideInMenu: false,
            }
      },
      {
            path: 'demo4',
            name: 'demo4',//demo2页面
            component: () => import('@/eniv/demo/page_demo4.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '测试页面4',
                  hideInMenu: false,
            }
      },
      {
            path: 'demo5',
            name: 'demo5',//demo2页面
            component: () => import('@/eniv/demo/page_demo5.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '测试页面5',
                  hideInMenu: false,
            }
      },
      {
            path: 'demo6',
            name: 'demo6',//demo2页面
            component: () => import('@/eniv/demo/page_demo6.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '测试页面6',
                  hideInMenu: false,
            }
      },
      {
            path: 'demo7',
            name: 'demo7',//demo2页面
            component: () => import('@/eniv/demo/page_demo7.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '测试页面7',
                  hideInMenu: false,
            }
      },
      {
            path: 'demo8',
            name: 'demo8',//demo2页面
            component: () => import('@/eniv/demo/page_demo8.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '测试页面8',
                  hideInMenu: false,
            }
      },
      {
            path: 'demo8_1',
            name: 'demo8_1',//demo2页面
            component: () => import('@/eniv/demo/page_demo8_1.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '测试页面8_1',
                  hideInMenu: false,
            }
      },
      {
            path: 'demo9',
            name: 'demo9',//demo9页面
            component: () => import('@/eniv/demo/page_demo9.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '发票开具清单',
                  hideInMenu: false,
            }
      },
      {
            path: 'demo9_1',
            name: 'demo9_1',//demo9页面
            component: () => import('@/eniv/demo/page_demo9_1.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '发票开具清单',
                  hideInMenu: false,
            }
      },
      {
            path: 'demo10',
            name: 'demo10',//demo9页面
            component: () => import('@/eniv/demo/page_demo10.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '单位基本情况',
                  hideInMenu: false,
            }
      },
      {
            path: 'demo11',
            name: 'demo11',//demo9页面
            component: () => import('@/eniv/demo/page_demo11.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '单位基本情况',
                  hideInMenu: false,
            }
      }, {
            path: 'demo12',
            name: 'demo12',//demo9页面
            component: () => import('@/eniv/demo/page_demo12.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '单位基本情况',
                  hideInMenu: false,
            }
      }, {
            path: 'demo13',
            name: 'demo13',//demo13页面
            component: () => import('@/eniv/demo/page_demo13.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '',
                  hideInMenu: false,
            }
      }, {
            path: 'demo14',
            name: 'demo14',//demo14页面注册
            component: () => import('@/eniv/demo/page_demo14.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '注册密码校验',
                  hideInMenu: false,
            }
      },{
            path: 'demo12_1',
            name: 'demo12_1',//demo14页面注册
            component: () => import('@/eniv/demo/page_demo12_1.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '注册页面',
                  hideInMenu: false,
            }
      }, {
            path: 'demo12_2',
            name: 'demo12_2',//demo14页面注册
            component: () => import('@/eniv/demo/page_demo12_2.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '注册页面',
                  hideInMenu: false,
            }
      },{
            path: 'demo15',
            name: 'demo15',//demo14页面注册
            component: () => import('@/eniv/demo/page_demo15.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '销项首页',
                  hideInMenu: false,
            }
      }, {
            path: 'demo16',
            name: 'demo16',//demo14页面注册
            component: () => import('@/eniv/demo/page_demo16.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '销项首页',
                  hideInMenu: false,
            }
      },
      {
            path: 'demo17',
            name: 'demo17',//demo14页面注册
            component: () => import('@/eniv/demo/page_demo17.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '销项首页',
                  hideInMenu: false,
            }
      },
      {
            path: 'demo18',
            name: 'demo18',//demo14页面注册
            component: () => import('@/eniv/demo/page_demo18.vue'),
            meta: {
                  needLogin: true,//
                  icon: 'el-icon-news',
                  title: '销项首页',
                  hideInMenu: false,
            }
      }
]
export default componentRouters