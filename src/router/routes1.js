import Main from '@/einv/main/main.vue'
import Login from '@/view/login/login.vue'
import Register from '@/view/login/Register.vue'
import ForgetPassword from '@/view/login/forgetPassword.vue'
import componentRouters from './components.js'
const routes = [
      
      {
            path: '/',
            name: '_Login',
            redirect: '/login',
            component: Login,
            meta: {
                  hideInMenu: true,
                  notCache: true,
                  needLogin: false//需要加校验判断的路由
            }
      },
      {
            path: '/login',
            name: 'Login',
            meta: {
                  title: 'Login-登录',
                  hideInMenu: true,
                  icon: 'el-icon-user'
            },
            component: Login
      },
      {
            path: '/register',
            name: 'Register',
            meta: {
                  title: '注册',
                  hideInMenu: true,
                  icon: 'el-icon-user'
            },
            component: Register
      },
      {
            path: '/production',
            name: 'production',
            meta: {
                  title: '产品详情',
                  hideInMenu: true,
                  icon: 'el-icon-user'
            },
            component: () => import('@/eniv/demo/production.vue'),
      },
      {
            path: '/ProductDetail',
            name: 'ProductDetail',
            meta: {
                  title: '产品详情',
                  hideInMenu: true,
                  icon: 'el-icon-user'
            },
            component: () => import('@/einv/manage/product/info/ProductDetail.vue'),
      },
      {
            path: '/forgetPassword',
            name: 'ForgetPassword',
            meta: {
                  title: '忘记密码',
                  hideInMenu: true,
                  icon: 'el-icon-user'
            },
            component: ForgetPassword
      },
      {
            path: '/main',
            name: 'main',
            component: Main,
            meta: {
                  needLogin: true,
                  title:'业务组织管理',
                  icon:'el-icon-setting',
                  hideInMenu: false,
            },
            children: [
                  ...componentRouters,
                  {
                        path: 'home',
                        name: 'home',//机构分类管理
                        component: () => import('../einv/home/home.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title:'首页',
                              hideInMenu: false,
                        }           
                  },
                  {
                        path: 'organtype',
                        name: 'Organtype',//机构分类管理
                        component: () => import('../einv/permission/organmanage/organtype.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title:'机构分类管理',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'organ',
                        name: 'Organ',//组织机构管理
                        component: () => import('../einv/permission/organmanage/organ.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '组织机构管理',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'personnel',
                        name: 'Personnel',
                        component: () => import('../einv/permission/organmanage/personnel.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title: '机构人员管理',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'function',
                        name: 'Function',//系统功能管理
                        component: () => import('../einv/permission/usermanage/function.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '系统功能管理',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'functionlist',
                        name: 'Functionlist',
                        component: () => import('../einv/permission/usermanage/functionlist.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title: '功能集管理',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'post',
                        name: 'Post',
                        component: () => import('../einv/permission/usermanage/post.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title: '岗位维护管理',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'organpost',
                        name: 'Organpost',
                        component: () => import('../einv/permission/usermanage/organpost.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title: '机构岗位设置',
                              hideInMenu: false,
                        }
                  },  
                  {
                        path: 'tenant',
                        name: 'Tenant',
                        component: () => import('../einv/manage/system/tenant/tenant.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title: '租户信息管理',
                              hideInMenu: false,
                        }
                  },  
                  {
                        path: 'messageinfo',
                        name: 'Messageinfo',
                        component: () => import('../einv/message/messageinfo.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title: '我的消息',
                              hideInMenu: false,
                        }
                  },  
                  {
                        path: 'messageinfounread',
                        name: 'Messageinfounread',
                        component: () => import('../einv/message/messageinfounread.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title: '未读消息',
                              hideInMenu: false,
                        }
                  },  
                  {
                        path: 'messageinforead',
                        name: 'Messageinforead',
                        component: () => import('../einv/message/messageinforead.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title: '已读消息',
                              hideInMenu: false,
                        }
                  },  
                  {
                        path: 'message',
                        name: 'message',
                        component: () => import('../einv/message/message.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title: '历史消息查询',
                              hideInMenu: false,
                        }
                  }, 
                  {
                        path: 'personnal',
                        name: 'Personnal',
                        component: () => import('../einv/main/personnal.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title: '基本信息',
                              hideInMenu: false,
                        }
                  }, 
                  {
                        path: 'noticemanage',
                        name: 'Noticemanage',
                        component: () => import('../einv/notice/noticemanage.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title: '通知公告管理',
                              hideInMenu: false,
                        }
                  }, 
                  {
                        path: 'newguidemanage',
                        name: 'Newguidemanage',
                        component: () => import('../einv/newguide/newguidemanage.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title: '新手指导管理',
                              hideInMenu: false,
                        }
                  }, 
                  {
                        path: 'invoiceconfig',
                        name: 'invoiceconfig',
                        component: () => import('../einv/manage/invoice/InvoiceConfigList.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title: '开票方基本信息配置',
                              hideInMenu: false,
                        }
                  }, 
                  {
                        name: 'notice_list',
                        path: 'notice_list',
                        meta: {
                              title: 'notice_list',
                              icon: 'el-icon-c-scale-to-original',
                              hideInMenu: false
                        },
                        component: () => import("@/einv/home/notice_list.vue"),
                  },
                  {
                        name: 'notice_detail',
                        path: 'notice_detail',
                        meta: {
                              title: 'notice_list',
                              icon: 'el-icon-c-scale-to-original',
                              hideInMenu: false
                        },
                        component: () => import("@/einv/home/notice_detail.vue"),
                  },
                  {
                        name: 'newguide_list',
                        path: 'newguide_list',
                        meta: {
                              title: 'newguide_list',
                              icon: 'el-icon-c-scale-to-original',
                              hideInMenu: false
                        },
                        component: () => import("@/einv/home/newguide_list.vue"),
                  },
                  {
                        name: 'newguide_detail',
                        path: 'newguide_detail',
                        meta: {
                              title: 'newguide_detail',
                              icon: 'el-icon-c-scale-to-original',
                              hideInMenu: false
                        },
                        component: () => import("@/einv/home/newguide_detail.vue"),
                  },
                  {
                        path: 'messagetemplate',
                        name: 'Messagetemplate',
                        component: () => import('../einv/manage/template/messagetemplate/Messagetemplate.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title: '消息模板管理',
                              hideInMenu: false,
                        }
                  }, 
                  {
                        path: 'ds',
                        name: 'Ds',
                        component: () => import('../einv/manage/ds/ds.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title: '数据源管理',
                              hideInMenu: false,
                        }
                  }, 
                  {
                        path: 'warnsetting',
                        name: 'Warnsetting',
                        component: () => import('../einv/manage/warn/warnsetting/warnsetting.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title: '平台预警设置',
                              hideInMenu: false,
                        }
                  }, 
                  {
                        path: 'warnquery',
                        name: 'Warnquery',
                        component: () => import('../einv/manage/warn/warnquery/warnquery.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title: '预警信息查询',
                              hideInMenu: false,
                        }
                  }, 
                  {
                        path: 'taskconfig',
                        name: 'Taskconfig',
                        component: () => import('@/einv/manage/usptask/taskConf/taskOpe/taskOpeList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '定时任务配置',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'tasklog',
                        name: 'Tasklog',
                        component: () => import('@/einv/manage/usptask/taskConf/taskRecords/taskRecordsList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '任务执行记录',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'InfoList',
                        name: 'InfoList',
                        component: () => import('@/einv/manage/product/info/InfoList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '产品信息配置',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'mainclassList',
                        name: 'mainclassList',
                        component: () => import('@/einv/manage/product/mainclass/MainclassList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '产品大类配置',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'subclassList',
                        name: 'subclassList',
                        component: () => import('@/einv/manage/product/subclass/SubclassList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '产品小类配置',
                              hideInMenu: false,
                        }
                  }, {
                        path: 'priceList',
                        name: 'priceList',
                        component: () => import('@/einv/manage/product/price/PriceList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '计费规则配置',
                              hideInMenu: false,
                        }
                  }, {
                        path: 'discountList',
                        name: 'discountList',
                        component: () => import('@/einv/manage/product/discount/DiscountList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '产品折扣配置',
                              hideInMenu: false,
                        }
                  }, {
                        path: 'reductionList',
                        name: 'reductionList',
                        component: () => import('@/einv/manage/product/reduction/ReductionList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '满减配置',
                              hideInMenu: false,
                        }
                  }, {
                        path: 'smsList',
                        name: 'smsList',
                        component: () => import('@/einv/manage/product/sms/SmsList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '短信包配置',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'BuySMS',
                        name: 'BuySMS',
                        component: () => import('@/einv/order/productchoice/BuySMS.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '短信包购买',
                              hideInMenu: true,
                        }
                  },
                  {
                        path: 'ProductChoice',
                        name: 'ProductChoice',
                        component: () => import('@/einv/order/productchoice/ProductChoice.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '产品选择',
                              hideInMenu: true,
                        }
                  },
                  {
                        path: 'Selected',
                        name: 'Selected',
                        component: () => import('@/einv/order/selected/Selected.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '已选产品列表',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'Pay',
                        name: 'Pay',
                        component: () => import('@/einv/order/pay/Pay.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '支付',
                              hideInMenu: true,
                        }
                  },
                  {
                        path: 'Renew',
                        name: 'Renew',
                        component: () => import('@/einv/order/renew/RenewList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '续费',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'Refund',
                        name: 'Refund',
                        component: () => import('@/einv/order/refund/RefundList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '退款',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'accountList',
                        name: 'accountList',
                        component: () => import('@/einv/manage/order/account/AccountList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '收款账户配置',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'payTypeList',
                        name: 'payTypeList',
                        component: () => import('@/einv/manage/order/paytype/PayTypeList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '付款方式配置',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'FinanceReview',
                        name: 'FinanceReview',
                        component: () => import('@/einv/manage/order/review/FinanceReview.vue'),
                        meta: {
                        needLogin: true, //
                        icon: 'el-icon-news',
                        title: '财务审核',
                        hideInMenu: false,
                        }
                  },
                  {
                        path: 'AdminReview',
                        name: 'AdminReview',
                        component: () => import('@/einv/manage/order/review/AdminReview.vue'),
                        meta: {
                        needLogin: true, //
                        icon: 'el-icon-news',
                        title: '管理员审核',
                        hideInMenu: false,
                        }
                  },
                  {
                        path: 'OrderInfo',
                        name: 'OrderInfo',
                        component: () => import('@/einv/order/info/Info.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '我的订单',
                              hideInMenu: false,
                        }
                  },
                  {
                    path: 'WorkOrderClassList',
                    name: 'WorkOrderClassList',
                    component: () => import('@/einv/manage/workorder/class/WorkOrderClassList.vue'),
                    meta: {
                      needLogin: true, //
                      icon: 'el-icon-news',
                      title: '工单类型配置',
                      hideInMenu: false,
                    }
                  },
                  {
                    path: 'WorkOrderHotMain',
                    name: 'WorkOrderHotMain',
                    component: () => import('@/einv/manage/workorder/hot/WorkOrderHotMain.vue'),
                    meta: {
                      needLogin: true, //
                      icon: 'el-icon-news',
                      title: '工单热点问题配置',
                      hideInMenu: false,
                    }
                  },
                  {
                    path: 'WorkOrderUserStaffList',
                    name: 'WorkOrderUserStaffList',
                    component: () => import('@/einv/manage/workorder/user/WorkOrderUserStaffList.vue'),
                    meta: {
                      needLogin: true, //
                      icon: 'el-icon-news',
                      title: '用户工单人员配置',
                      hideInMenu: false,
                    }
                  },
                  {
                    path: 'WorkOrderManage',
                    name: 'WorkOrderManage',
                    component: () => import('@/einv/manage/workorder/management/WorkOrderUserManage.vue'),
                    meta: {
                      needLogin: true, //
                      icon: 'el-icon-news',
                      title: '工单管理',
                      hideInMenu: false,
                    }
                  },
                  {
                    path: 'WorkOrderUserMain',
                    name: 'WorkOrderUserMain',
                    component: () => import('@/einv/manage/workorder/userupload/WorkOrderUserMain.vue'),
                    meta: {
                      needLogin: true, //
                      icon: 'el-icon-news',
                      title: '工单提交',
                      hideInMenu: false,
                    }
                  },
                  {
                    path: 'MyWorkOrderUser',
                    name: 'MyWorkOrderUser',
                    component: () => import('@/einv/manage/workorder/workorderuser/MyWorkOrderUser.vue'),
                    meta: {
                      needLogin: true, //
                      icon: 'el-icon-news',
                      title: '我的工单',
                      hideInMenu: false,
                    }
                  },
                  {
                        path: 'demo11',
                        name: 'Demo11',
                        component: () => import('@/eniv/demo/page_demo11.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '测试页面11',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'tenantList',
                        name: 'tenantList',
                        component: () => import('@/einv/icpmanagement/tenant/tenantList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '租户列表',
                              hideInMenu: false,
                        }
                  },
			{
                        path: 'invoicetypeList',
                        name: 'invoicetypeList',
                        component: () => import('@/einv/icpmanagement/basic/invoicetype/invoicetypeList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '发票类型码表维护',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'taxcodeList',
                        name: 'taxcodeList',
                        component: () => import('@/einv/icpmanagement/basic/taxcode/taxcodeList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '税收分类编码维护',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'invoicelayoutList',
                        name: 'invoicelayoutList',
                        component: () => import('@/einv/icpmanagement/basic/invoicelayout/invoicelayoutList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '发票票样配置维护',
                              hideInMenu: false,
                        }
                  },
				  {
                        path: 'taxdevicesList',
                        name: 'taxdevicesList',
                        component: () => import('@/einv/icpmanagement/basic/taxdevices/taxdevicesList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '税控设备类型维护',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'systemconfList',
                        name: 'systemconfList',
                        component: () => import('@/einv/icpmanagement/basic/systemconf/systemconfList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '系统参数配置',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'taxPayermanagementList',
                        name: 'taxPayermanagementList',
                        component: () => import('@/einv/icpmanagement/taxpayer/taxpayermanagement/taxPayerList.vue'),
                        meta: {
                              needLogin: true,
                              icon: 'el-icon-news',
                              title: '纳税人信息管理',
                              hideInMenu: false,
                        }
                  },{
                        path: 'taskdownload',
                        name: 'taskdownload',
                        component: () => import('@/einv/icpmanagement/query/taskdownload/taskdownload.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '任务下载',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'certmanagementList',
                        name: 'certmanagementList',
                        component: () => import('@/einv/icpmanagement/taxpayer/certmanagement/certmanagementList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '纳税人证书管理',
                              hideInMenu: false,
                        }
                  },
			{
                        path: 'sealmanagementList',
                        name: 'sealmanagementList',
                        component: () => import('@/einv/icpmanagement/taxpayer/sealmanagement/sealmanagementList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '纳税人印章管理',
                              hideInMenu: false,
                        }
                  },
			{
                        path: 'invoicetemplateList',
                        name: 'invoicetemplateList',
                        component: () => import('@/einv/icpmanagement/taxpayer/invoicetemplate/invoicetemplateList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '纳税人发票模板',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'imptemplateList',
                        name: 'imptemplateList',
                        component: () => import('@/einv/icpmanagement/taxpayer/imptemplate/imptemplateList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '导入模板',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'provinceList',
                        name: 'provinceList',
                        component: () => import('@/einv/icpmanagement/basic/province/provinceList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '省份编码信息管理',
                              hideInMenu: false,
                        }
                  }, 
                  {
                        path: 'securityproxy',
                        name: 'securityproxy',
                        component: () => import('@/einv/icpmanagement/taxcontrol/securityproxy/securityproxyList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '安全代理管理',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'digitalsignature',
                        name: 'digitalsignature',
                        component: () => import('@/einv/icpmanagement/taxcontrol/digitalsignature/digitalsignatureList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '电子签章管理',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'taxServer',
                        name: 'taxServer',
                        component: () => import('@/einv/icpmanagement/taxcontrol/taxserver/taxserverList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '税控服务器管理',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'virtualdevices',
                        name: 'virtualdevices',
                        component: () => import('@/einv/icpmanagement/taxcontrol/virtualdevices/virtualdevicesList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '虚拟设备管理',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'taxSet',
                        name: 'taxSet',
                        component: () => import('@/einv/icpmanagement/taxcontrol/taxset/taxsetList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '盘组设备管理',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'terminal',
                        name: 'terminal',
                        component: () => import('@/einv/icpmanagement/taxcontrol/terminal/terminalList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '开票终端管理',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'typesearch',
                        name: 'typesearch',
                        component: () => import('@/einv/icpmanagement/taxcontrol/typesearch/typesearchList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '发票类型管理',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'taxrate',
                        name: 'taxrate',
                        component: () => import('@/einv/icpmanagement/taxcontrol/taxrate/taxrateList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '核定税率管理',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'taxcert',
                        name: 'taxcert',
                        component: () => import('@/einv/icpmanagement/taxcontrol/taxcert/taxcertList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '制证信息查询',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'taxversion',
                        name: 'taxversion',
                        component: () => import('@/einv/icpmanagement/taxcontrol/taxversion/taxversionList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '税控服务器版本管理',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'taskOpe',
                        name: 'taskOpe',
                        component: () => import('@/einv/icptask/taskConf/taskOpe/taskOpeList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '定时任务配置',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'taskRecords',
                        name: 'taskRecords',
                        component: () => import('@/einv/icptask/taskConf/taskRecords/taskRecordsList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '任务执行记录',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'platformWarnSetting',
                        name: 'platformWarnSetting',
                        component: () => import('@/einv/icpmanagement/warning/platformWarnSetting/platformWarnSettingList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '平台预警设置',
                              hideInMenu: false,
                        }
                  },
                  {
                        path: 'platformWarnSettingQuery',
                        name: 'platformWarnSettingQuery',
                        component: () => import('@/einv/icpmanagement/warning/platformWarnSettingQuery/platformWarnSettingQueryList.vue'),
                        meta: {
                              needLogin: true,//
                              icon: 'el-icon-news',
                              title: '平台预警信息查询',
                              hideInMenu: false,
                        }
                  },



            ]
      }
]
export default routes
