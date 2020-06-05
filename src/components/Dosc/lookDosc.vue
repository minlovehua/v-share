<template>
    <div class="container-box">
        <div @click="$router.replace('/platform');" style="float:left;color:white;padding:10px;">团队发布</div>
        <div class="centerBox">
            <!-- 标题 -->
            <div class="title">{{dosc.doscName}} 
                <div class="rightButton">
                    <el-button class="editButton" type="primary" size="mini" @click="edit()">修改</el-button>&nbsp;
                    <el-popconfirm v-if="$store.state.role==1?true:false" class="deleteButton" title="确定要删除这篇文档吗？" @onConfirm="deleteIt()">
                        <el-button slot="reference" type="danger" size="mini">删除</el-button>
                    </el-popconfirm>
                </div>
            </div>
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
        }
    },
    created(){
        //解决主页刷新之后store中数据丢失(导致主页右上角当前登录用户名消失)的问题 --- 第三步(共三步)
        //2.在页面加载时再从localStorage里将数据取回来放到vuex里。
        localStorage.getItem("stateMsg") && 
        this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("stateMsg"))));
        //在页面刷新时将vuex里的信息保存到localStorage里（当浏览器窗口关闭或者刷新时,会触发beforeunload事件。）
        window.addEventListener("beforeunload",()=>{
            localStorage.setItem("stateMsg",JSON.stringify(this.$store.state))
        })

        this.getDosc();
    },
    methods:{
        getDosc(){
            //解决了直接用this.$route.query.dosc时页面刷新之后数据会丢失的问题（第二步）。第一步在platform.vue
            this.dosc = JSON.parse(sessionStorage.getItem("dosc"))
        },
        edit(){
            sessionStorage.setItem("updateDosc",JSON.stringify(this.dosc))
            this.$router.push({ name: '/updateDosc', params:{dosc:this.dosc,flag:'1'}}).catch(data => {  });
        },
        deleteIt(){ 
          this.$axios.post(this.HOST+'/api/toDeletehouse',{id:this.dosc.id,status:'已删除'}).then(result=>{
              if(result.data.msg == '文档放进回收站失败'){
                  console.log(result.data.msg);
              }else{ //文档成功放进回收站
                  this.$router.replace('/platform');
              }
          }).catch(err=>console.log(err))
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
        .centerBox{ //水平居中的盒子
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            margin-top: 10px;
            .title{
                width: 100%;
                font-size: 26px;
                text-align: center;
                border-bottom: 1px solid rgba($color: rgb(58, 54, 57), $alpha: 0.3);
                box-sizing: border-box;
                padding: 10px 10px;
                background-color: snow;
                border-radius: 5px 5px 0 0;
                .rightButton{
                    float: right;
                }
            }
            .content{
                width: 100%;
                box-sizing: border-box;
                background-color:white;
                padding: 20px;
                border-radius: 5px;
                .who{  //文档信息（作者和更新时间）的样式
                    margin-top: 10px;
                    text-align: right;
                    .from{ //文档信息（作者和更新时间）的样式
                        color:rgba($color: grey, $alpha: 1.0);
                        background-color: white;
                        padding: 5px;
                        border-radius: 3px;
                    }
                }
            }
            .comment{
                width: 100%;
                margin: 20px 0px;
                box-sizing: border-box;
            }
        }
    }
</style>