<template>
    <el-card class="box-card">
        <!-- 登录界面标题 -->
        <div slot="header" class="clearfix">
            <span>团队内部知识共享平台</span>
        </div>
        <!-- form表单 -->
        <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
                <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    data() {
      return {
        ruleForm: {
          name: '',
          pass: ''
        }
      };
    },
    methods: {
        login(){ //登录
            // 假设登陆成功，则跳转到 工作台 /platform
            this.$router.replace('/platform').catch(data => {  });
        },
        resetForm(formName) {  //重置
            this.$refs[formName].resetFields();
        }
    }
  }
</script>

<style lang="scss" scoped>
    body{
        //解决.box-card的height设置百分比无效果的问题
        //也是解决.box-card偏移补齐效果的问题。这样就可以顺利设置.box-card水平和垂直居中了。
        height: 100%;     

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
    .box-card {
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

</style>