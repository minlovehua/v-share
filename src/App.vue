<template>
    <!-- 主页 -->
    <div class="box">
        <el-container>

            <!-- 主页头部 el-header-->
            <el-header>
                <div class="groupName">团队：{{$store.state.groupName}} 简介：{{$store.state.description}}</div>
                <span class="title">团队内部知识共享平台系统</span>
                <!-- 主页右上角的“+”新建按钮 el-dropdown-->
                <el-dropdown class="create">
                    <span class="el-dropdown-link">
                        <i class="el-icon-circle-plus"></i><i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>新建文档</el-dropdown-item>
                        <el-dropdown-item>新建知识库</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!-- 主页右上角的“用户”按钮 el-dropdown-->
                <el-dropdown class="user">
                    <span class="el-dropdown-link">
                        <!-- 显示头像图标 -->
                        <!-- <i class="el-icon-user-solid"></i> -->
                        <!-- 主页右上角显示当前登录的用户名 -->
                        <span>{{$store.state.username}}</span>
                        <!-- <span>{{$store.state.role}}</span> -->
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人主页</el-dropdown-item>
                        <el-dropdown-item>账户设置</el-dropdown-item>
                        <!-- dropdown的点击事件@click无效，要@click.native才有效 -->
                        <el-dropdown-item @click.native="exit">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>

            <!-- 主页中间部分（除了页头和页脚） -->
            <el-container>
                <!-- 主页侧边栏 el-aside -->
                <el-aside width="20%">
                    <el-row class="tac">
                        <el-col :span="12">
                            <el-menu
                            :default-active="this.$route.path"
                            class="el-menu-vertical-demo"
                            router>
                            <el-menu-item index="/platform" >
                                <i class="el-icon-menu"></i>
                                <span slot="title">工作台</span>
                            </el-menu-item>
                            <el-menu-item index="/platform/document">
                                <i class="el-icon-document"></i>
                                <span slot="title">文档&nbsp;&nbsp;&nbsp;</span>
                            </el-menu-item>
                            <el-menu-item index="/platform/storehouse">
                                <i class="el-icon-school"></i>
                                <span slot="title">知识库</span>
                            </el-menu-item>
                            <el-menu-item index="/platform/groups">
                                <i class="el-icon-help"></i>
                                <span slot="title">团队&nbsp;&nbsp;&nbsp;</span>
                            </el-menu-item>
                            <el-menu-item index="/platform/collection">
                                <i class="el-icon-star-off"></i>
                                <span slot="title">收藏&nbsp;&nbsp;&nbsp;</span>
                            </el-menu-item>
                            <el-menu-item index="/platform/deletehouse">
                                <i class="el-icon-delete"></i>
                                <span slot="title">回收站</span>
                            </el-menu-item>
                            <!-- 只有管理员(role为1)才能看到“管理”功能 -->
                            <el-menu-item v-if="$store.state.role==1?true:false" index="/platform/manage">
                                <i class="el-icon-circle-plus-outline"></i>
                                <span slot="title">管理&nbsp;&nbsp;&nbsp;</span>
                            </el-menu-item>
                            </el-menu>
                        </el-col>
                    </el-row>
                </el-aside>

                <!-- 主页中间放其它组件的大块区域 el-main -->
                <el-container>
                    <el-main>
                        <router-view></router-view> 
                    </el-main>
                </el-container>
            </el-container>

            <!-- 主页页脚部分 el-footer -->
            <!-- <el-footer>Footer</el-footer> -->

        </el-container>
    </div>
</template>

<script>
    import Cookie from 'js-cookie'
    export default {
        data(){
            return{

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
            
            //created() 组件一创建就调用getGroup方法向服务器发送请求来获得团队(名称和简介)数据
            this.getGroup()
        },
        mounted(){   
            // mounted钩子函数：此时，已经将编译好的模板，挂载到了页面指定的容器中显示。
            //禁止主页面浏览器“返回”键，防止从主页面返回开始页面
            if (window.history && window.history.pushState) {   
                history.pushState(null, null, document.URL); 
                window.addEventListener('popstate', function () { 
                    history.pushState(null, null, document.URL);
                }, false);      
            }
        },
        methods:{
            exit:function(){//退出登录
                //回到开始界面
                this.$router.replace('/start').catch(data => {  });  
                //禁用浏览器的“返回”按钮
                history.pushState(null, null, document.URL);
                window.addEventListener("popstate",function(e) {  
                    history.pushState(null, null, document.URL);
                }, false);    
            },
            getGroup(){ //向服务器端发送请求，获取团队(名称和简介)数据
                this.$axios.get(this.HOST+'/api/getGroup',null).then(result=>{
                    // console.log(result.data) //测试
                    if(result.data.msg == '查询成功'){
                        // 将团队名称和团队简介存储到vuex的store的state中
                        this.$store.commit('initGroup',{groupName:result.data.Agroup.groupName,description:result.data.Agroup.description})
                    }else{//查询失败
                        this.$store.commit('initGroup',{groupName:'查询失败',description:'查询失败'})
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    // Container布局容器样式
    #app {  //使得布局全屏的条件之一
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .box{
        height: 100%;
    }
    .box>.el-container{
        height: 100%;
    }
    .el-aside { //使得布局全屏的条件之二
        height:100vh;
    }
    .el-header, .el-footer {
        background-color: white;
        border-bottom: 1px solid rgba($color: #000000, $alpha:0.1);
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-aside {
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    .el-main {
        // background-color: #E9EEF3;
        background: url('images/bg.jpg');
        background-size: cover; //让背景图片充满整个页面
        color: #333;
        text-align: center;
        // line-height: 160px;
        //解决el-main中放Element-UI 的table时，表头高度设置不了的问题
        line-height: 30px !important;
    }
    // body > .el-container {
    //     margin-bottom: 40px;
    // }
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }


    //侧栏 NavMenu导航菜单
    .el-col-12{
        height: 100%;
        width: 100%;
    }


    //el-header里面的el-dropdown 下拉菜单
    .el-header{
        position: relative;
        // background-color: #f9f5ef;
    }
    .el-dropdown{
        position: absolute;
    }
    .create{
        right: 15%;
    }
    .user{
        right: 5%;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
        font-size: 18px;  //设置子元素icon（i）的图标的大小
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }

    //主页右上角 当前登录用户名 样式
    .el-dropdown-link span{
        font-size: 16px;
    }

    //主页左上角 团队的名称
    .groupName{
        width: 500px;
        display: inline-block;
        position: absolute;
        left: 20px;
        border-radius: 5px;
    }

    .el-header{
        position: relative;
    }

    .el-aside{ //解决了因为el-aside太长，导致页面出现滚动条的问题
        height: 100%;
        // background-color: #e3eefa;
    }

    //.el-menu{  
        // background-color: #e3eefa;
    //}

    .title{
        font-size: 20px;
        font-weight: 900;
    }
</style>



