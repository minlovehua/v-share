<template>
    <div class="container-box">
        <div class="centerBox">
            <!-- 标题 -->
            <div class="title">{{dosc.doscName}}</div>

            <!-- 内容 -->
            <div class="content">
                <div v-html="dosc.html"></div>
                <div class="who"><span class="from"><i class="el-icon-user"></i>&nbsp;{{dosc.author}} &nbsp;&nbsp; <i class="el-icon-time"></i>&nbsp;{{dosc.updateTime|dateFormat}}</span></div>
            </div>

            <!-- 评论 -->
            <div class="comment"><comment-box :id="dosc.id"></comment-box></div>
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
        // created钩子函数：实例已经在内存中创建OK，此时 data 和 methods 已经创建OK，此时还没有开始 编译模板。
        //解决主页刷新之后store中数据丢失(导致主页右上角当前登录用户名消失)的问题 --- 第三步(共三步)
        //2.在页面加载时再从localStorage里将数据取回来放到vuex里。
        //在页面加载时读取localStorage里的状态信息
        localStorage.getItem("stateMsg") && 
        this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("stateMsg"))));
        //在页面刷新时将vuex里的信息保存到localStorage里（当浏览器窗口关闭或者刷新时,会触发beforeunload事件。）
        window.addEventListener("beforeunload",()=>{
            localStorage.setItem("stateMsg",JSON.stringify(this.$store.state))
        })


        this.getDosc();
        // this.showDosc();
    },
    methods:{
        getDosc(){
            // console.log(this.$route.query.dosc)
            // console.log(JSON.parse(sessionStorage.getItem("dosc")))  

            //解决了直接用this.$route.query.dosc时页面刷新之后数据会丢失的问题（第二步）。第一步在platform.vue
            this.dosc = JSON.parse(sessionStorage.getItem("dosc"))
        },
        showDosc(){
            console.log(this.dosc);
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
        border-radius: 5px;
    }
    .content{
        width: 100%;
        box-sizing: border-box;
        background-color: rgb(255, 252, 223);
        padding: 20px;
        border-radius: 5px;
    }
    .comment{
        width: 100%;
        margin: 20px 0px;
        box-sizing: border-box;
    }
    .who{  //文档信息（作者和更新时间）的样式
        margin-top: 10px;
        text-align: right;
    }
    .from{ //文档信息（作者和更新时间）的样式
        // margin-top: 20px;
        // border: 1px solid grey;
        color:rgba($color: grey, $alpha: 1.0);
        background-color: white;
        padding: 5px;
        border-radius: 3px;

    }
</style>