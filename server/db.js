// 服务端 操作数据库基本步骤

//1.加载数据库驱动
const mysql = require('mysql')

exports.base = (sql,data,callback)=>{
    //2.创建数据库连接
    const connection = mysql.createConnection({
        host     : 'localhost',  //数据库所在服务器的域名或IP地址
        user     : 'root',       //用户名
        password : '123456',     //密码
        database : 'vshare'      //我创建的那个数据库的名字
    });

    //3.执行连接操作
    connection.connect();

    //4.操作数据库
    connection.query(sql,data,function (error, results, fields) {
    if (error) throw error;
        callback && callback(results)
    })

    //5.关闭数据库
    connection.end();
}
