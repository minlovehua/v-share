<template>
    <div class="login-container">
        <el-card>
            <!-- 登录界面标题 -->
            <div slot="header" class="clearfix">
                <span>团队内部知识共享平台</span>
            </div>
            <!-- form表单 -->
            <el-form :model="loginForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input prefix-icon="el-icon-s-custom" type="text" v-model="loginForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
      return {
        //登录表单的数据绑定对象
        loginForm: {
          username: 'huahua',
          password: '520'
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
            ]
        }
      };
    },
    methods: {
        login(){ //登录
            // 登录前表单数据预验证
            //this.$refs[formName] 拿到表单的验证对象。等价于this.$refs.ruleForm
            //validate() 接收一个回调函数，从而拿到验证的结果
            this.$refs.ruleForm.validate(async valid=>{  //第一个形参是个布尔值
                console.log(valid); //验证成功时valid的值为true，失败时是false

                //验证不成功，则不发送请求
                if(!valid) return;  //如果valid值为false，则return，不发送请求。
                //验证成功，则发送登录请求
                //参数1：请求的地址。参数2：传入的参数
                // const result = this.$http.post("login",this.loginForm); 
                // console.log(result);
                //解构赋值 {data:res}
                //data才是服务器返回的真实数据，将它重命名为res
                // const {data:res} = await this.$http.post("login",this.loginForm);
                // if(res.meta.status!==200) return console.log("登录失败")
                // console.log("登录成功");
            });

            // 假设登陆成功，则跳转到 工作台 /platform
            this.$router.replace('/platform').catch(data => {  });
        },
        resetForm(formName) {  //重置
            console.log(this); //测试代码
            //this.$refs[formName] 拿到表单的验证对象。等价于this.$refs.ruleForm
            //resetFields() 方法，重置表单
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
        width: 480px;
        position: absolute;
        top: 50%;    //先走父元素的一半
        left: 50%;   //先走父元素的一半
        transform: translate(-50%,-70%);  //再往回走自己的一半
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
</style>