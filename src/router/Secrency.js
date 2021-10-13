const routers = [
  {
    path: 'pay_online',
    name: 'pay_online',//线上缴费
    component:()=> import("@/einv/main2/page/payOnline.vue")
  }, {
    path: 'invoice_application',
    name: 'invoice_application',//线上缴费
    component: () => import("@/einv/main2/page/invoiceApplication.vue")
  },{
    path: 'my_order',
    name: 'my_order',//线上缴费
    component: () => import("@/einv/main2/page/myOrder.vue")
  },{
    path: 'system_info',
    name: 'system_info',//线上缴费
    component: () => import("@/einv/main2/page/systemInfo.vue")
  },
]
export default routers