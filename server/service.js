//业务逻辑

const db = require('./db.js')

// 登录处理
exports.login = (req,res)=>{
    let uname = req.body.username;
    let pwd = req.body.password;
    //console.log('uname:'+uname,'pwd:'+pwd); //uname:huahua pwd:123456
    
    // 查询语句
    let sql = 'select * from user where username = ?';
    let data = uname;                         //这里uname或[uname]结果都一样
    db.base(sql,data,(result)=>{              //查询username为data的那条数据
        //console.log('result:  '+ result);   //result:  [object Object]
        if(!result.length){
            return res.json({ status: 1, msg: '该用户不存在！' });
        }else{
            if(result[0].password==pwd){
                return res.json({ status: 1, msg: '登录成功' });
            }
            return res.json({ status: 1, msg: '密码错误' });
        }
    });
 
     
   /* //测试代码
   let sql = 'select * from user';
   let data = null;
   db.base(sql,data,(result)=>{ 
        console.log('测试代码：'+result.body); //
        return res.json({status:1,msg:'查询成功'});
   });*/
   
}

// 注册处理
exports.register = (req,res)=>{
    let uname = req.body.username;
    // 查询语句
    let sql = 'select * from user where username = ?';
    let data = uname;                        
    db.base(sql,data,(result)=>{             
        if(result.length){
            return res.json({ status: 1, msg: '该用户已存在' });
        }else{
            let info = req.body;                      //获取表单提交的数据
            let sql = 'insert into user set ?';       // 插入语句
            db.base(sql,info,(result)=>{              //查询username为data的那条数据
                if(result.affectedRows == 1){
                    return res.json({ status: 1, msg: '注册成功' });
                }
            });
        }
    });
}
