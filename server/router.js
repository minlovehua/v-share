//服务端 路由

const express = require('express')
const router = express.Router()
const service = require('./service.js')

// 登录功能
// 匹配路由(参数1)时则执行参数2。访问service.js里面的login方法
router.post('/api/login',service.login)

// 普通用户注册功能
// 参数2：匹配路由时要执行的函数。访问service.js里面的register方法
router.post('/api/register',service.register)

//管理员注册功能
router.post('/api/Aregister',service.Aregister)

// 校验新生成的邀请码是否与数据库中的不重复
router.post('/api/isCode',service.isCode)

//获取团队信息
router.get('/api/getGroup',service.getGroup)

//新建知识库
router.post('/api/createStore',service.createStore)

//获取所有知识库
router.get('/api/getAllStore',service.getAllStore)

//获取团队所有成员
router.get('/api/getAllMember',service.getAllMember)

//获取所有文档
router.get('/api/getAllDosc',service.getAllDosc)

//将 新建的文档 插入数据库
router.post('/api/createDosc',service.createDosc)

//修改文档  put 不行？
router.post('/api/updateDosc',service.updateDosc)


module.exports = router
