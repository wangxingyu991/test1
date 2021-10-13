
let arry = [
      {
        id: 33,
        label: "组件2",
        layer: "layer-8",
        isShow: false,
        icon: "el-icon-c-scale-to-original",
        path: "",
        isParent: 'TRUE',
        children: [
          {
            id: 34,
            label: "手风琴",
            layer: "layer-0",
            isShow: false,
            icon: "el-icon-c-scale-to-original",
            path: "/main/template_collapse",
            isParent: 'FALSE',
            children: []
          },
        ],
      },
      {
        id: 53,
        label: "测试demo页面",
        layer: "layer-9",
        isShow: false,
        icon: "el-icon-setting",
        path: "",
        isParent: 'TRUE',
        children: [
          {
            id: 54,
            label: "测试页面1",
            layer: "layer-0",
            isShow: false,
            icon: "el-icon-news",
            path: "/main/demo1",
            isParent: 'FALSE',
            children: []
          },
          {
            id: 55,
            label: "测试页面1-1",
            layer: "layer-1",
            isShow: false,
            icon: "el-icon-news",
            path: "/main/demo1_1",
            isParent: 'FALSE',
            children: []
          }
        ],
      },{
        id:34,
        label:'demo1页面',
        isShow: false,
        icon: "el-icon-c-scale-to-original",
        path: "/main/demo1",
        isParent:'FALSE',
        children:[]
      }
    ];
let arry_message = [
  {
    id: 1,
    label: "我的消息",
    layer: "layer-8",
    isShow: false,
    icon: "el-icon-c-scale-to-original",
    path: "",
    isParent: 'TRUE',
    children: [
      {
        id: 11,
        label: "全部消息",
        layer: "layer-0",
        isShow: false,
        icon: "el-icon-c-scale-to-original",
        path: "/main/messageinfo",
        isParent: 'FALSE',
        children: []
      },
      {
        id: 12,
        label: "未读消息",
        layer: "layer-0",
        isShow: false,
        icon: "el-icon-c-scale-to-original",
        path: "/main/messageinfounread",
        isParent: 'FALSE',
        children: []
      },
      {
        id: 13,
        label: "已读消息",
        layer: "layer-0",
        isShow: false,
        icon: "el-icon-c-scale-to-original",
        path: "/main/messageinforead",
        isParent: 'FALSE',
        children: []
      },
      {
        id: 14,
        label: "历史消息查询",
        layer: "layer-0",
        isShow: false,
        icon: "el-icon-c-scale-to-original",
        path: "/main/message",
        isParent: 'FALSE',
        children: []
      },
    ],
  }
]
let arry_personnal = [
  {
    id: 2,
    label: "个人中心",
    layer: "layer-8",
    isShow: false,
    icon: "el-icon-c-scale-to-original",
    path: "",
    isParent: 'TRUE',
    children: [
      {
        id: 21,
        label: "基本信息",
        layer: "layer-0",
        isShow: false,
        icon: "el-icon-c-scale-to-original",
        path: "/main/personnal",
        isParent: 'FALSE',
        children: []
      }
    ],
  }
]
let arry_order = [
  {
    id: 3,
    label: "订单中心",
    layer: "layer-8",
    isShow: false,
    icon: "el-icon-c-scale-to-original",
    path: "",
    isParent: 'TRUE',
    children: [
      {
        id: 31,
        label: "已选产品",
        layer: "layer-0",
        isShow: false,
        icon: "el-icon-c-scale-to-original",
        path: "/main/Selected",
        isParent: 'FALSE',
        children: []
      },
      {
        id: 32,
        label: "我的订单",
        layer: "layer-0",
        isShow: false,
        icon: "el-icon-c-scale-to-original",
        path: "/main/OrderInfo",
        isParent: 'FALSE',
        children: []
      },
      {
        id: 33,
        label: "续费",
        layer: "layer-0",
        isShow: false,
        icon: "el-icon-c-scale-to-original",
        path: "/main/Renew",
        isParent: 'FALSE',
        children: []
      },
      {
        id: 34,
        label: "退款",
        layer: "layer-0",
        isShow: false,
        icon: "el-icon-c-scale-to-original",
        path: "/main/Refund",
        isParent: 'FALSE',
        children: []
      }
    ],
  }
]

let arry_workorder = [
  {
    id: 4,
    label: "工单中心",
    layer: "layer-8",
    isShow: false,
    icon: "el-icon-c-scale-to-original",
    path: "",
    isParent: 'TRUE',
    children: [
      {
        id: 41,
        label: "我的工单",
        layer: "layer-0",
        isShow: false,
        icon: "el-icon-c-scale-to-original",
        path: "/main/MyWorkOrderUser",
        isParent: 'FALSE',
        children: []
      },
      {
        id: 42,
        label: "新建工单",
        layer: "layer-0",
        isShow: false,
        icon: "el-icon-c-scale-to-original",
        path: "/main/WorkOrderUserMain",
        isParent: 'FALSE',
        children: []
      }
    ],
  }
]

export default {arry, arry_message, arry_personnal,arry_order,arry_workorder}