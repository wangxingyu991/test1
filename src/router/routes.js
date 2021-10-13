import  Main  from "@/einv/main/main.vue"
import  Main2  from "@/einv/main2/main2.vue"
import Login from "@/view/login/login.vue"
import Components from "./components.js"
import Secrency from "./Secrency.js"
const routes = [
  {
    path: '/',
    name: '_Main',
    component: Main
  },{
    path:'/main',
    name: 'Main', //main页面
    component: Main,
    children: [...Components]
  }, {
    path: '/login',
    name: 'Login', //登录页面
    component: Login
  },
  {
    path: '/main2',
    name: 'Main2', //保密局项目
    component: Main2,
    children: [...Secrency]
  }
]
export default routes