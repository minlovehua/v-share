// 入口文件
// console.log('ok'); //测试代码

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

//导入cookie
import Cookie from 'js-cookie'

//解决主页刷新之后store中数据丢失(导致主页右上角当前登录用户名消失)的问题 --- 第一步(共三步)
//声明一个将store中的state存储到localStorage中的方法
function storeLocalStore (state) {
    window.localStorage.setItem("stateMsg",JSON.stringify(state));
}

//2.1 导入 vuex
import Vuex from 'vuex'
//2.2 注册 vuex
Vue.use(Vuex)
//2.3 创建store实例
var store = new Vuex.Store({
    state:{  //获取state中数据的方式 this.$store.state.xxx
        username:'',    //用户名
        role:'',        //角色  管理员1  普通用户2
        groupName:'',       //团队
        description:''  //团队简介
    },
    mutations:{  //调用mutations中方法的方式 this.$store.commit('方法名','按需传递的参数')
        initUsername(state,obj){  //登录之后，再初始化$store.state.username
            state.username = obj.username;
            state.role = obj.role;
            //解决主页刷新之后store中数据丢失(导致主页右上角当前登录用户名消失)的问题 --- 第二步(共三步)
            //1.将store的state保存到localStorage中
            storeLocalStore (state);
        },
        initGroup(state,obj){
            state.groupName = obj.groupName;
            state.description = obj.description;
            //解决主页刷新之后store中数据丢失(导致主页右上角当前登录用户名消失)的问题 --- 第二步(共三步)
            //1.将store的state保存到localStorage中
            storeLocalStore (state);
        }
    },
    getters:{    //获取getters提供的数据的方式 this.$store.getters.xxx

    }
});

var vm = new Vue({
    el:'#app',
    //render:c=>c(start),
    router,  //1.4 挂载路由对象到VM实例
    store    //2.4 挂载store状态管理对象到VM实例
})



