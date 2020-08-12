import Vue from 'vue'
import App from './App'
import router from './router'
// 移动端适配
import 'amfe-flexible'
// axios
import axios from 'axios'
// 按需导入vant
import { Swipe, SwipeItem, Icon ,Field, Actionsheet, Toast ,Panel,Uploader, Button   } from "vant"
// vantui的样式文件
import 'vant/lib/index.css'
// 引入util.js
import util from '../src/assets/js/util'
// 注册
Vue.use(Swipe).use(SwipeItem).use(Icon).use(Field).use(Actionsheet).use(Toast).use(Panel).use(Uploader).use(Button)

Vue.config.productionTip = false
// 挂载到vue原型得以全局使用axios
Vue.prototype.$http = axios
// 把公共js放到原型上 跨域
Vue.prototype.$util = util
router.beforeEach((to,from,next)=>{
  document.title = to.meta.title // 把路由中meta的title赋值给页面标题
  next()
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
