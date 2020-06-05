// 服务端 入口文件

// 创建express服务器
const express = require('express')
const app = express()
// 注册解析 表单数据的 body-parser
const bodyParser = require('body-parser')
//导入路由文件
const router = require('./router.js')


// 将请求响应设置content-type设置为application/json
app.use('/api/*', function (req, res, next) {
	// 设置请求头为允许跨域
    res.header("Access-Control-Allow-Origin", "*");
    // 设置服务器支持的所有头信息字段
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    // 设置服务器支持的所有跨域请求的方法
    res.header("Access-Control-Allow-Methods", "POST,GET");
    // next()方法表示进入下一个路由
    next();
});


// 挂载参数处理中间件
// app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({limit: '1000mb', extended: true}));
// 处理json格式的参数
// app.use(bodyParser.json())
app.use(bodyParser.json({limit: '1000mb'}));

//启动服务器功能
app.use(router)               //配置路由
app.listen('3009',function(){ //监听端口
    console.log('服务器已启动...')
})
