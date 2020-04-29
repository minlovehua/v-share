<template>
    <div class="container">
        <div class="v-header">
            <!-- <el-button> -->
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <i class="el-icon-s-grid"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="tostorehouse">返回知识库</el-dropdown-item>
                        <el-dropdown-item @click.native="toplateform">返回团队发布</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            <!-- </el-button> -->

        </div>
        <div class="v-body">
            <span class="title">{{this.storehouse.storeName}}</span>
            <span class="desc">{{this.storehouse.storeDesc}}</span>
            <div class="box" v-for="item in this.doscs" :key="item.id">
                <span class="doscName" @click="lookDosc(item)">{{item.doscName}}</span>
                <span class="haha">{{item.author}}&nbsp;&nbsp;&nbsp;{{item.updateTime|dateFormat}}</span>
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
        // background: url('../../images/bg.jpg');
        background-color: #809477; //#809477
        background-size: cover;

        .v-header{
            height: 50px;
            line-height: 50px;
            padding-left: 20px;
            background-color: white;
            border-bottom: gray;
            .el-dropdown-link { //下拉框
                cursor: pointer;
                color: gray;
                font-size: 22px;
            }
        }

        .v-body{
            width: 50%;
            height: 500px; //测试
            background-color: white;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 50px;
            padding: 0 100px;
            .title{
                display: block;
                text-align: center;
                margin: 10px;
                font-size: 22px;
            }
            .desc{
                margin: 10px;
                display: block;
                text-align: center;
                color: darkgrey;
            }
            
            .box{
                display: flex;
                justify-content: space-between;
                margin-top: 30px;
                .doscName{
                    font-size: 18px;
                    color:rgb(99, 97, 97)
                }
                .doscName:hover{
                    color: rgb(46, 132, 243);
                }
                .haha{
                    color:rgb(180, 176, 175);
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