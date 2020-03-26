// 入口文件
console.log('ok'); //测试代码

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


var vm = new Vue({
    el:'#app',
    //render:c=>c(start),
    router  //1.4 挂载路由对象到VM实例
})


