<template>
    <div class="register-container">
        <el-card>
            <!-- 注册界面标题 -->
            <div slot="header" class="clearfix">
                <span>团队内部知识共享平台 --- 注册</span> 
            </div>
            <!-- form表单 -->
            <el-form :model="registerForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input prefix-icon="el-icon-s-custom" type="text" v-model="registerForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input prefix-icon="el-icon-lock" type="password" v-model="registerForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邀请码" prop="code">
                    <el-input prefix-icon="el-icon-s-flag" type="text" v-model="registerForm.code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" @click="register('ruleForm')">注册</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <div class="msg"  autocomplete="off">{{registerForm.msg}}</div>    <!--   用户已经存在提示区域 -->
                    <router-link to="/login">登录</router-link>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
      return {
        registerForm: {   //注册表单的数据绑定对象
          username: '',   //用户名
          password: '',   //密码
          code:'',        //邀请码
          msg:''          //接收后台返回的数据 "该用户已存在"
        },
        rules:{           //登录表单的验证规则
            username:[    //验证用户名是否合法
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
            ],
            password:[    //验证密码是否合法
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
            ],
            code:[        //验证邀请码是否合法
                { required: true, message: '请输入邀请码', trigger: 'blur' }
            ]
        }
      };
    },
    methods: {
        register(formName){   //注册
            this.$refs[formName].validate((valid)=>{
                //验证成功时valid的值为true（仅满足注册验证规则），失败时是false
                if(!valid) return;  //如果valid值为false，则return，不发送请求。
                this.$axios.post(this.HOST+'/api/register',this.registerForm).then(result=>{
                    if(result.data.msg == '注册成功'){
                        this.$router.replace('/login').catch(data => {  }); // 注册成功，则跳转到 登录界面 /login
                    }else{
                        this.registerForm.msg = result.data.msg; 
                    }
                }).catch(err=>console.log(err))   
            });
        },
        resetForm(formName) { //重置
            this.$refs[formName].resetFields();
            this.registerForm.msg = '';
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
    .el-card {          //card卡片 水平、垂直居中
        width: 480px;
        position: absolute;
        top: 50%;    //先走父元素的一半
        left: 50%;   //先走父元素的一半
        transform: translate(-50%,-70%);  //再往回走自己的一半
    }
    .el-input{          //form 表单
        width: 80%;
    }
    .register-container{//注册div
        background: url('../../images/bg3.jpg');
        background-size: cover;
        // background: #809477;   //#566b32  darkolivegreen
        height: 100%;
    }
    .btn{               //注册、重置 按钮 居右
        display: flex;
        justify-content: flex-start;
    }
    .msg{               //注册错误提示信息 div
        display: inline-block;
        color:red;
        margin-right: 5px;
        width: 110px;
    }
    .clearfix span{     // 注册界面 标题
        font-size: 20px;
    }
</style>