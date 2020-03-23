//导入 vue-router
import VueRouter from 'vue-router'

//导入组件
import collection from './components/collection.vue'
import deletehouse from './components/deletehouse.vue'
import document from './components/document.vue'
import groups from './components/groups.vue'
import platform from './components/platform.vue'
import storehouse from './components/storehouse.vue'

//创建路由对象
var router = new VueRouter({
    routes:[ //配置路由规则
        {path:'/',redirect:'platform'},   //根路径/时也是进入工作台
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