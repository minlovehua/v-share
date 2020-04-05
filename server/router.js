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

module.exports = router
