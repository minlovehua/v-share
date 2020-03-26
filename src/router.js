//导入 vue-router
import VueRouter from 'vue-router'

//导入开始页面组件
import start from './components/start.vue'
//导入登录、注册组件
import login from './components/Login/login.vue'
import register from './components/Login/register.vue'

//导入登录之后的主页面组件
import app from './App.vue'
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
        {path:'/index',component:app,
            children:[
                {path:'/platform',component:platform},
                {path:'/platform/collection',component:collection},
                {path:'/platform/deletehouse',component:deletehouse},
                {path:'/platform/document',component:document},
                {path:'/platform/groups',component:groups},
                {path:'/platform/storehouse',component:storehouse}
            ]
        }
    ]
})

//把路由对象暴露出去
export default router;