<template>
    <!-- <div class="container-box"> -->
        <!-- <el-container> -->
            <!-- <el-header> -->
                <!-- <span class="title">{{dosc.doscName}}</span> -->
            <!-- </el-header> -->
            <!-- <el-main> -->
                <!-- <div v-html="dosc.html" class="doscContent"></div> -->

            <!-- </el-main> -->
            <!-- <el-footer>  -->
                <!-- <div class="footer">哈哈哈哈哈哈</div> -->

                <!-- 评论区  3.使用子组件 -->
                <!-- <comment-box></comment-box>    属性绑定id ，因为在获取评论数据时要用到它     -->
            <!-- </el-footer>          -->
        <!-- </el-container> -->
    <!-- </div> -->

    <div class="container-box">
        <div class="centerBox">
            <!-- 标题 -->
            <div class="title">{{dosc.doscName}}</div>

            <!-- 内容 -->
            <div class="content"><div v-html="dosc.html"></div></div>

            <!-- 评论 -->
            <div class="comment"><comment-box></comment-box></div>
        </div>
    </div>
</template>

<script>
//1. 导入评论子组件
import comment from './comment.vue'
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
    },    
    components:{//用来注册子组件的节点
        "comment-box":comment  //2.注册子组件
    }
}
</script>

<style lang="scss" scoped>
    .container-box{ //根盒子
        width: 100%;
        position: relative;
         //这个背景颜色，只有给.container-box设置了height才有效。
         //但是height设置了100%也就只有上方屏幕那么大的地方有效，超出屏幕的地方显示不了背景色。
         //怎样将高度设置为scrollHeight呢？
        // background-color: black;  
    }
    .centerBox{ //水平居中的盒子
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        margin-top: 10px;

    }
    .title{
        width: 100%;
        font-size: 26px;
        font-weight: 900;
        text-align: center;
        border-bottom: 1px solid rgba($color: rgb(58, 54, 57), $alpha: 0.3);
        box-sizing: border-box;
        padding: 5px 5px 10px;
        background-color: rgb(255, 252, 223);
    }
    .content{
        width: 100%;
        // border: 1px solid black;
        box-sizing: border-box;
        background-color: rgb(255, 252, 223);
        padding: 20px;

    }
    .comment{
        width: 100%;
        margin: 20px 0px;
        // border: 1px solid black;
        box-sizing: border-box;
    }



//-----------------------------------------
    // .el-main{//使得布局占满全屏
    //     //height:83.3vh;  //单位必须是vh
    //     min-height: calc(100vh - 60px); //120px是header+footer的高度之和（按实际情况改）

    //     overflow: auto;
    // }

    // .container-box{
    //     margin: 0 auto;
    //     width: 70%;
    //     // height: 100%;
    //     background-color: rgb(250, 235, 247);
    //     // background: url('../../images/bg.jpg');
    //     // background-size: cover;
    //     position: relative;

        
    // }
    // .doscContent{
    //     width: 90%;
    //     // height:100%;
    //     // background-color: rgb(236, 230, 230);
    //     position: absolute;
    //     left: 50%;
    //     transform: translateX(-50%);

    //     background-color: skyblue;
    //     padding-bottom: 60px;
    //     // overflow: auto;
    // }
    
    // .el-header{
    //     // background-color: #B3C0D1;
    //     color: #333;
    //     text-align: center;
    //     line-height: 60px;
    //     border-bottom: 1px solid rgba($color: rgb(58, 54, 57), $alpha: 0.3);
    //     box-shadow: rgba($color: #000000, $alpha: 0.3);
    // }
    // .el-footer{
    //     background-color: #B3C0D1;
    //     color: #333;
    //     // text-align: center;  //注释掉这里，内容就不会水平居中了
    //     line-height: -10%;     //如果这里是正数，就会和上面的el-main重叠
    //     // border-bottom: 1px solid rgba($color: rgb(58, 54, 57), $alpha: 0.3);
    //     box-shadow: rgba($color: #000000, $alpha: 0.3);

    //     min-height: 350px;
    // }

    // .title{
    //     font-size: 22px;
    //     font-weight: 900;
    // }

//----------------------------------------



</style>