<template>
    <div class="login-container">
        <el-card>
            <!-- 注册界面标题 -->
            <div slot="header" class="clearfix">
                <span>团队内部知识共享平台 --- 初始化团队</span> 
            </div>
            <!-- form表单 -->
            <el-form :model="initForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="管理员" prop="username">
                    <el-input prefix-icon="el-icon-s-custom" type="text" v-model="initForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input prefix-icon="el-icon-lock" type="password" v-model="initForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="团队名称" prop="groupName">
                    <el-input prefix-icon="el-icon-s-home" v-model="initForm.groupName" placeholder="请输入团队的名称" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="团队简介" prop="description">
                    <el-input prefix-icon="el-icon-edit" v-model="initForm.description" type="textarea" :rows="3" placeholder="简单介绍一下你的团队吧" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" @click="register('ruleForm')">创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <div class="msg">{{initForm.msg}}</div>     <!--  用户已经存在提示区域 -->
                    <router-link to="/manage">登录</router-link>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
      return {
        //初始化团队表单的数据绑定对象
        initForm: {
          username: '',   //管理员用户名
          role: '1',         // 1 管理员，2 普通用户
          password: '',    //密码
          groupName: '',   //团队名称
          description: '',  //团队描述
          msg:''
        },
        //登录表单的验证规则
        rules:{
            //验证用户名是否合法
            username:[
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            //验证密码是否合法
            password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
            ],
            //验证团队名称是否合法
            groupName:[
                { required: true, message: '请输入团队名称', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            //验证团队简介是否合法
            description:[
                { required: true, message: '请输入团队简介', trigger: 'blur' },
                { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
            ],
        }
      };
    },
    methods: {
        register(formName){
            this.$refs[formName].validate((valid)=>{
                //验证成功时valid的值为true（仅满足注册验证规则），失败时是false
                // console.log('valid:'+valid);
                //不满足注册验证规则，则不发送请求
                if(!valid) return;  //如果valid值为false，则return，不发送请求。

                //满足登录验证规则，则向服务器端(http://localhost:3009/api/Aregister)发送注册请求，同时传递参数(参数2)
                this.$axios.post(
                    this.HOST+'/api/Aregister',this.initForm).then(result=>{
                    this.initForm.msg = result.data.msg;   
                    if(result.data.msg == '注册成功'){
                        // 初始化成功，则跳转到 后台管理界面 /manage
                        this.$router.replace('/manage').catch(data => {  });
                    }else{
                        //密码错误
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
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

    //card卡片 水平、垂直居中
    .el-card {
        width:500px;
        position: absolute;
        top: 50%;    //先走父元素的一半
        left: 50%;   //先走父元素的一半
        transform: translate(-50%,-50%);  //再往回走自己的一半
    }

    //form 表单
    .el-input{
        width: 80%;
    }

    //登录div
    .login-container{
        background: #809477;   //#566b32  darkolivegreen
        height: 100%;
    }

    //登录、重置 按钮 居右
    .btn{
        display: flex;
        justify-content: flex-start;
    }

    //登录错误提示信息 div
    .msg{
        display: inline-block;
        color:red;
        margin-right: 5px;
        width: 110px;
    }

    // 注册界面 标题
    .clearfix span{
        font-size: 20px;
    }

</style>