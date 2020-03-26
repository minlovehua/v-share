//导入 vue-router
import VueRouter from 'vue-router'

//导入开始页面组件
import start from './components/start.vue'
//导入登录、注册组件
import login from './components/Login/login.vue'
import register from './components/Login/register.vue'
//导入侧边栏对应的组件
import collection from './components/NavMenu/collection.vue'
import deletehouse from './components/NavMenu/deletehouse.vue'
import document from './components/NavMenu/document.vue'
import groups from './components/NavMenu/groups.vue'
import platform from './components/NavMenu/platform.vue'
import storehouse from './components/NavMenu/storehouse.vue'



//创建路由对象
var router = new VueRouter({
    routes:[ //配置路由规则
        {path:'/',component:start},
        {path:'/login',component:login},
        {path:'/register',component:register},
        {path:'/collection',component:collection},
        {path:'/deletehouse',component:deletehouse},
        {path:'/document',component:document},
        {path:'/groups',component:groups},
        {path:'/platform',component:platform},
        {path:'/storehouse',component:storehouse}
    ]
})

//把路由对象暴露出去
export default router;