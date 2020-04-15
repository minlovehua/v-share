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
            return res.json({msg: '该用户不存在！'});
        }else{
            if(result[0].password==pwd){
                // console.log(result[0].role);
                return res.json({msg: '登录成功',role:result[0].role});
            }
            return res.json({msg: '密码错误'});
        }
    });

   /* //测试代码
   let sql = 'select * from user';
   let data = null;
   db.base(sql,data,(result)=>{ 
        console.log('测试代码：'+result.body); //
        res.json({status:1,msg:'查询成功'});
   });*/
   
}

// 普通注册处理
exports.register = (req,res)=>{
    db.base('select * from user where username = ?',req.body.username,(result)=>{             
        if(result.length){ //用户名无效
            return res.json({msg: '该用户已存在'});
        }else{ //用户名有效，判断邀请码（如果数据库存在该邀请码，且flag=true，则OK）。
            db.base('select * from identifycode where code = ?',req.body.code,(result)=>{
                if(!result.length){  //数据库中不存在这个邀请码
                    return res.json({msg: '邀请码无效'});
                }else{     
                    if(result[0].flag == 'false'){  //数据库中有这个邀请码但是flag为false
                        return res.json({msg: '邀请码无效'});  
                    }else{ //数据库中有这个邀请码且flag为true，邀请码有效
                        //注册成功，向user插入该用户
                        db.base('insert into user set ?',{username:req.body.username,password:req.body.password,role:'2'},(result)=>{
                            if(result.affectedRows != 1){
                                return res.json({msg: '插入数据库失败'});
                            }
                        });
                        //修改identify表中该邀请码的flag为false，表示该邀请码不再可用。（一个邀请码只邀请一个人）
                        db.base('update identifycode set flag=? where code=?',['false',req.body.code],(result)=>{
                            if(result.affectedRows != 1){
                                return res.json({msg: '修改邀请码状态失败'});
                            }
                        });
                        //返回响应给客户端
                        return res.json({msg: '注册成功'});
                    }
                }
            });
        }
    });
}

// 校验新生成的邀请码是否与数据库中的不重复
exports.isCode=(req,res)=>{
    db.base('select * from identifycode where code = ?',req.body.code,(result)=>{
        if(result.length){
            return res.json({msg:'该邀请码已存在'});
        }else{
            db.base('insert into identifycode set ?',req.body,(result)=>{              //查询username为data的那条数据
                if(result.affectedRows == 1){
                    return res.json({msg: '该邀请码可以使用'});
                }
            });
        }
    });
}

// 管理员注册处理
exports.Aregister = (req,res)=>{
    db.base('select * from user where username = ?',req.body.username,(result)=>{
        if(result.length){
            return res.json({msg:'该用户已存在'});
        }else{
            //将管理员插入数据库
            db.base('insert into user set ?',{username:req.body.username,password:req.body.password,role:req.body.role},(result)=>{
                if(result.affectedRows != 1){
                    return res.json({msg:'数据插入失败'});
                }else{
                    //将团队名称和简介插入数据库
                    db.base('insert into Agroup set ?',{groupName:req.body.groupName,description:req.body.description},(result)=>{
                        if(result.affectedRows != 1){
                            return res.json({msg:'数据插入失败'});
                        }
                    });
                }
            });
            return res.json({msg: '团队初始化成功'}); //返回响应给客户端 
        }
    });
}

//查询团队的名称和简介
exports.getGroup = (req,res)=>{
    db.base('select * from Agroup',null,(result)=>{
        if(result.length){
            return res.json({msg:'查询成功',Agroup:result[0]});
        }else{
            return res.json({msg:'查询失败'});
        }
    });
}

//新建知识库
exports.createStore = (req,res)=>{
    // console.log('进来了');
    // console.log(req.body);
    db.base('select * from storehouse where storeName = ?',req.body.storeName,(result)=>{
        if(result.length){
            return res.json({msg:'该知识库已存在'});
        }else{
            db.base('insert into storehouse set ?',req.body,(result)=>{
                if(result.affectedRows != 1){
                    return res.json({msg: '知识库新建失败'});
                }else{
                    return res.json({msg: '知识库新建成功'});
                }
            });
        }
    });
}

//获取所有知识库
exports.getAllStore = (req,res)=>{
    db.base('select * from storehouse',null,(result)=>{
        if(result.length){ //查询成功
            return res.json({msg:'知识库查询成功',result:result});
        }else{
            return res.json({msg:'知识库查询失败'});
        }
    })
}

//获取团队所有成员
exports.getAllMember = (req,res)=>{
    db.base('select * from user',null,(result)=>{
        if(result.length){ //查询成功
            return res.json({msg:'查询团队所有成员成功',result:result});
        }else{
            return res.json({msg:'查询团队所有成员失败'});
        }
    })
}

//获取所有文档
exports.getAllDosc = (req,res)=>{
    db.base('select * from dosc',null,(result)=>{
        if(result.length){ //查询成功
            return res.json({msg:'文档查询成功',result:result});
        }else{
            return res.json({msg:'文档查询失败'});
        }
    })
}

//将 新建的文档 插入数据库
exports.createDosc = (req,res)=>{
    db.base('insert into dosc set ?',req.body,(result)=>{
        if(result.affectedRows != 1){
            return res.json({msg: '新建文档失败'});
        }else{
            return res.json({msg: '新建文档成功'});
        }
    });
}