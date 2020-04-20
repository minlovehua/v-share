<template>
    <div class="login-container">
        <el-card>
            <!-- 登录界面标题 -->
            <div slot="header" class="clearfix">
                <span>团队内部知识共享平台 --- 登录</span>
            </div>
            <!-- form表单 -->
            <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input prefix-icon="el-icon-s-custom" type="text" v-model="loginForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" @click="login('ruleForm')">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <div class="msg" autocomplete="off">{{loginForm.msg}}</div>    <!--   密码错误或用户不存在提示区域 -->
                    <router-link to="/register">注册</router-link>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import Cookie from 'js-cookie'
    export default {
        data() {
            return {
                loginForm: {        //登录表单的数据绑定对象
                    username: '',   //用户名
                    password: '',   //密码
                    msg:''          //接收后台返回的数据
                },
                rules:{   //登录表单的验证规则
                    username:[  //验证用户名是否合法
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    password:[  //验证密码是否合法
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            login(formName){ // 登录
                //this.$refs[formName] 拿到表单的验证对象。等价于this.$refs.ruleForm
                //validate() 接收一个回调函数，从而拿到验证的结果
                this.$refs[formName].validate((valid)=>{  //第一个形参是个布尔值
                    //验证成功时valid的值为true（仅满足登录验证规则），失败时是false
                    if(!valid) return;  //如果valid值为false，则return，不发送请求。
                    this.$axios.post(this.HOST+'/api/login',{username:this.loginForm.username,password:this.loginForm.password}).then(result=>{
                        this.loginForm.msg = result.data.msg;   
                        if(result.data.msg == '登录成功'){
                            Cookie.set('username',this.loginForm.username); //成功登录之后，将当前登录用户存储到cookie
                            Cookie.set('role',result.data.role)
                            //登录成功之后，马上初始化$store.state.username
                            this.$store.commit('initUsername',{username:Cookie.get('username'),role:Cookie.get('role')})
                            // 登陆成功，则跳转到 工作台 /platform
                            this.$router.replace('/platform').catch(data => {  });
                        }else{
                            console.log('密码错误');
                        }
                    }).catch(err=>console.log(err))   
                });
            },
            resetForm(formName) { //重置
                //this.$refs[formName] 拿到表单的验证对象。等价于this.$refs.ruleForm
                this.$refs[formName].resetFields(); //resetFields() 方法，重置表单
                this.loginForm.msg = '';
            }
        }
    }
</script>

<style lang="scss" scoped>
    body{
        //解决.box-card的height设置百分比无效果的问题
        //也是解决.box-card偏移补齐效果的问题。这样就可以顺利设置.box-card水平和垂直居中了。
        //height: 100%;    直接在全局样式 global.css里面设置即可  
        position: relative;
    }
    //card 卡片 
    .text {
        font-size: 14px;
    }
    .item {
        margin-bottom: 18px;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .el-card {         //card卡片 水平、垂直居中
        width: 480px;
        position: absolute;
        top: 50%;    //先走父元素的一半
        left: 50%;   //先走父元素的一半
        transform: translate(-50%,-70%);  //再往回走自己的一半
    }  
    .el-input{         //form 表单
        width: 80%;
    }
    .login-container{  //登录div
        background: url('../../images/bg.jpg');
        background-size: cover;
        height: 100%;
    }
    .btn{              //登录、重置 按钮 居右
        display: flex;
        justify-content: flex-start;
    }   
    .msg{              //登录错误提示信息 div
        display: inline-block;
        color:red;
        margin-right: 5px;
        width: 110px;
    }
    .clearfix span{    // 登录界面 标题
        font-size: 20px;
    }
</style>