<template>
    <div class="container-box">
        <el-container>
            <el-header>
                <span class="title">{{dosc.doscName}}</span>
                <!-- &nbsp;&nbsp;&nbsp;/&nbsp;
                <span>{{dosc.storeName}}</span> -->
            </el-header>
            <el-main>
                <div v-html="dosc.html" class="doscContent"></div>
            </el-main>
            <!-- <el-footer>
                <hr/>
                <div class="footer"></div>
            </el-footer> -->
        </el-container>
        
        
    </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
    data(){
        return{
            dosc: {} //存储当前查看的文档
            // dosc:this.$route.query.dosc
        }
    },
    created(){
        this.getDosc();
    },
    methods:{
        getDosc(){
            // console.log(this.$route.query.dosc)
            // console.log(JSON.parse(sessionStorage.getItem("dosc")))  

            //解决了直接用this.$route.query.dosc时页面刷新之后数据会丢失的问题（第二步）。第一步在platform.vue
            this.dosc = JSON.parse(sessionStorage.getItem("dosc"))
        }
    }
}
</script>

<style lang="scss" scoped>
    .container-box{
        margin: 0 auto;
        width: 70%;
        height: 100%;
        // background-color: pink;
        position: relative;
    }
    .doscContent{
        width: 90%;
        // background-color: rgb(236, 230, 230);
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    
    .el-header,.el-footer{
        // background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
        border-bottom: 1px solid rgba($color: slategray, $alpha: 0.3);
        box-shadow: rgba($color: #000000, $alpha: 0.3);
    }

    .el-main {
        // background-color: skyblue;
        height: 80%;
    }

    .title{
        font-size: 22px;
        font-weight: 900;
    }

    .footer{
        height: 300px;
        background-color: rgb(228, 215, 215);
    }
</style>