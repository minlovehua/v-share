<template>
    <div class="container">
        <div class="v-header">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <i class="el-icon-s-grid"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="tostorehouse">返回知识库</el-dropdown-item>
                        <el-dropdown-item @click.native="toplateform">返回团队发布</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
        </div>
        <div class="v-body">
            <span class="title"><i class="el-icon-folder-opened"></i>&nbsp;{{this.storehouse.storeName}}</span>
            <span class="desc">{{this.storehouse.storeDesc}}</span>
            <div class="showbox" v-for="item in this.doscs" :key="item.id">
                <span class="doscName" @click="lookDosc(item)"><i class="el-icon-document"></i>&nbsp;&nbsp;{{item.doscName}}</span>
                <span class="authorAndTime"><i class="el-icon-user"></i>&nbsp;{{item.author}}&nbsp;&nbsp;&nbsp;<i class="el-icon-time"></i>&nbsp;{{item.updateTime|dateFormat}}</span>
            </div>
            <div class="msg">{{this.msg}}</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            storehouse:{}, //当前知识库
            doscs:[], //存储该知识库下的所有文档
            msg:''
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

        this.getStore(); //获取当前页面的知识库
        this.getDoscList(); //获取当前知识库下所有的文档
    },
    methods:{
        getStore(){ //获取当前页面的知识库
            this.storehouse = JSON.parse(sessionStorage.getItem("storehouse"))
        },
        getDoscList(){ //获取当前知识库下所有的文档
            this.$axios.get(this.HOST+'/api/getDoscList/'+this.storehouse.storeName).then(result=>{
                if(result.data.msg == '获取文档列表失败'){
                    console.log(result.data.msg);
                    this.msg = '当前知识库还没有文档哦，快去发布一篇吧！'
                }else{ //获取文档列表成功
                    this.doscs = result.data.doscs; 
                }
            }).catch(err=>console.log(err))
        },
        lookDosc(row){  //点击行，查看文档详情
          //解决了直接用this.$route.query.dosc时页面刷新之后数据会丢失的问题（第一步）。第二步在lookDosc.vue
          sessionStorage.setItem("dosc",JSON.stringify(row))
          this.$router.push({ name: '/lookDosc', query:{dosc:row}}).catch(data=>{});  //跳转到文档详情页面
        },
        toplateform(){         //返回 团队发布
            this.$router.replace('/platform').catch(data => {  });
        },
        tostorehouse(){         //返回 知识库
            this.$router.push('/platform/storehouse').catch(data => {  });
        },
    }
}
</script>

<style lang="scss" scoped>
    .container{
        width: 100%;
        height: 100%;
        min-height: 700px;
        min-width: 1500;
        background: url('../../images/bg3.jpg');
        // background-color: #809477; //#809477
        background-size: cover;

        .v-header{
            height: 50px;
            line-height: 50px;
            padding-left: 20px;
            background-color: #0000;
            border-bottom: gray;
            .el-dropdown-link { //下拉框
                cursor: pointer;
                font-size: 22px;
                i{
                    font-size: 28px;
                    color: white;
                }
            }
        }

        .v-body{
            width: 50%;
            min-height: 500px; //测试
            min-width: 390px;
            background-color: rgba($color: snow, $alpha: 0.1);
            border-radius: 5px;
            position: absolute;
            left: 30%;
            transform: translateX(-30%);
            margin-top: 50px;
            padding: 0 100px;
            .title{
                display: block;
                text-align: center;
                margin: 20px 0px 10px;
                font-size: 22px;
                color: white;
                text-shadow: 2px 2px 2px black;
            }
            .desc{
                margin: 10px 0px 20px;
                display: block;
                text-align: center;
                color: white;
                text-shadow: 2px 2px 2px black;
            }
            
            .showbox{
                display: flex;
                justify-content: space-between;
                padding: 5px 0px;
                .doscName{
                    font-size: 18px;
                    color:white;
                text-shadow: 2px 2px 2px black;
                }
                .doscName:hover{
                    color:rgb(33, 158, 231);
                }
                .authorAndTime{
                    color:white; //rgb(61, 60, 60)
                text-shadow: 2px 2px 2px black;
                }
            }
            .msg{
                margin: 50px;
                color: darksalmon;
                text-align: center;
            }
        }
    }


</style>