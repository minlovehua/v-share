//导入 vue-router
import VueRouter from 'vue-router'

//导入团队初始化组件【队长/管理员】
import groupInit from './components/Admin/groupInit.vue'
//导入团队后台管理组件
import groupManage from './components/Admin/groupManage.vue'


//导入开始页面组件
import start from './components/Login/start.vue'
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

//管理页面 子组件
import membersManage from './components/Admin/membersManage.vue'
import storehouseManage from './components/Admin/storehouseManage.vue'

//导入编辑文档组件
import createDosc from './components/Dosc/createDosc.vue'
//导入修改(更新)文档组件
import updateDosc from './components/Dosc/updateDosc.vue'
//导入“查看全文”组件
import lookDosc from './components/Dosc/lookDosc.vue'

import showDoscList from './components/StoreHouse/showDoscList.vue'

//创建路由对象
var router = new VueRouter({
    routes:[ //配置路由规则
        //管理员
        // {path:'/',redirect:'/platform/document'},  //测试入口
        {path:'/',component:groupInit}, //团队初始化页面 【这个是要的】
        // {path:'/',component:login},  //测试入口
        //用户注册、登录
        {path:'/start',component:start},
        {path:'/login',component:login},
        {path:'/register',component:register},
        //团队主页
        {path:'/index',component:app,
            children:[
                {path:'/platform',component:platform},
                {path:'/platform/collection',component:collection},
                {path:'/platform/deletehouse',component:deletehouse},
                {path:'/platform/document',component:document},
                {path:'/platform/groups',component:groups},
                {path:'/platform/storehouse',component:storehouse},
                {path:'/platform/manage',redirect:'/platform/manage/storehouse'}, //这个是要的
                // {path:'/platform/manage',redirect:'/platform/manage/members'},  //测试
                {path:'/platform/manage',component:groupManage,
                    children:[
                        {path:'/platform/manage/members',component:membersManage},
                        {path:'/platform/manage/storehouse',component:storehouseManage}
                    ]
                }
                
            ]
        },
        {path:'/createDosc',name:'/createDosc',component:createDosc},
        {path:'/updateDosc',name:'/updateDosc',component:updateDosc},
        {path:'/lookDosc',name:'/lookDosc',component:lookDosc},
        {path:'/showDoscList',name:'/showDoscList',component:showDoscList}
    ]
})

//把路由对象暴露出去
export default router;