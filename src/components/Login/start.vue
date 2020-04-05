<template>
    <div>
        根路径/下的开始页面 start.vue
         <el-button type="primary" @click="login">登录</el-button> 
         <el-button type="primary" @click="register">注册</el-button>
         <div class="title">团队内部知识共享平台</div>
         <div style="width:100px;height:100px;">平台介绍</div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        login(){  //点击“登录”按钮，路由链接会跳转到/login,页面显示 “登录组件的页面”
            this.$router.push('/login').catch(data => {  });
        },
        register(){ //点击“注册”按钮，路由链接会跳转到/register,页面显示 “注册组件的页面”
            this.$router.push('/register').catch(data => {  });
        }
    }
}
</script>

<style lang="scss" scoped>
    div{
        width: 500px;
        height: 500px;
        margin: 0 auto;
        background-color: burlywood;
        text-align: center;
        position: relative;
    }
    .title{
        width: 300px;
        height: 100px;
        line-height: 100px;
        font-size: 30px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
</style>