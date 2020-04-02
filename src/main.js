// 入口文件
console.log('ok'); //测试代码

//导入全局样式
import './css/global.css'

//导入 Vue
import Vue from 'vue'

//完整引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//1.1导入路由包
//(通过npm下载的包在node_modules，import VueRouter from 'vue-router' 会自动去node_modules中去找vue-router这个包)
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)
//1.3导入自己的 router.js路由模块
import router from './router.js'

//配置axios
import axios from 'axios'
//配置请求根路径
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//这样的话，每个vue的组件都可以通过this直接访问到$axios，从而发起axios请求。
Vue.prototype.$axios = axios

Vue.prototype.HOST = 'http://localhost:3009'
Vue.config.productionTip = false


var vm = new Vue({
    el:'#app',
    //render:c=>c(start),
    router  //1.4 挂载路由对象到VM实例
})


