//导入 vue-router
import VueRouter from 'vue-router'

//导入团队初始化组件【队长/管理员】
import groupInit from './components/Admin/groupInit.vue'

//导入开始页面组件
import start from './components/Login/start.vue'
//导入登录、注册组件
import login from './components/Login/login.vue'
import register from './components/Login/register.vue'

//导入登录之后的主页面组件
import app from './App.vue'  //这个是要的
// import app from './test.vue'     //测试

//导入侧边栏对应的组件
import collection from './components/NavMenu/collection.vue'
import deletehouse from './components/NavMenu/deletehouse.vue'
import document from './components/NavMenu/document.vue'
import groups from './components/NavMenu/groups.vue'
import platform from './components/NavMenu/platform.vue'
import storehouse from './components/NavMenu/storehouse.vue'

//导入编辑文档组件
import createDosc from './components/Dosc/createDosc.vue'
//导入修改(更新)文档组件
import updateDosc from './components/Dosc/updateDosc.vue'
//导入“查看全文”组件
import lookDosc from './components/Dosc/lookDosc.vue'
//导入“展示知识库内所有已发布文档”组件
import showDoscList from './components/StoreHouse/showDoscList.vue'

//创建路由对象
var router = new VueRouter({
    routes:[ //配置路由规则
        //管理员
        {path:'/',component:groupInit}, //团队初始化页面 【这个是要的】
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
                {path:'/platform/manage',redirect:'/platform/manage/storehouse'}
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