<template>
    <!-- 主页 -->
    <div class="appBox">
        <el-container>

            
            <!-- 主页头部 el-header-->
            <el-header>
                <span class="title">团&nbsp;队&nbsp;内&nbsp;部&nbsp;知&nbsp;识&nbsp;共&nbsp;享&nbsp;平&nbsp;台</span>

                <!-- 主页右上角的“+”新建按钮 el-dropdown-->
                 <!--<el-dropdown class="create">
                    <span class="el-dropdown-link">
                        <i class="el-icon-circle-plus"></i><i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>新建文档</el-dropdown-item>
                        <el-dropdown-item>新建知识库</el-dropdown-item>
                    </el-dropdown-menu> 
                </el-dropdown>-->     <!--待实现 -->


                <!-- 主页右上角的“用户”按钮 el-dropdown-->
                <el-dropdown class="user">
                    <span class="el-dropdown-link">
                        <!-- 显示头像图标 -->
                        <i class="el-icon-user"></i>&nbsp;
                        <!-- 主页右上角显示当前登录的用户名 -->
                        <span style="text-shadow: 2px 1px 1px rgb(22, 22, 22);">{{$store.state.username}}</span>
                        <!-- <span>{{$store.state.role}}</span> -->
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!-- <el-dropdown-item>个人主页</el-dropdown-item> -->  <!--待实现 -->
                        <!-- <el-dropdown-item>账户设置</el-dropdown-item> -->  <!--待实现 -->
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
                            background-color="#0000"
                            text-color="#fff"
                            active-text-color="#0af7d6"
                            router>
                            <el-menu-item index="/platform" >
                                <i class="el-icon-menu"></i>
                                <span slot="title">团队发布</span>
                            </el-menu-item>
                            <el-menu-item index="/platform/document">
                                <i class="el-icon-document"></i>
                                <span slot="title">我的文档</span>
                            </el-menu-item>
                            <el-menu-item index="/platform/storehouse">
                                <i class="el-icon-school"></i>
                                <span slot="title">知识库&nbsp;&nbsp;&nbsp;</span>
                            </el-menu-item>
                            <el-menu-item index="/platform/groups">
                                <i class="el-icon-help"></i>
                                <span slot="title">团队&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </el-menu-item>
                            <el-menu-item index="/platform/collection">
                                <i class="el-icon-star-off"></i>
                                <span slot="title">收藏&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </el-menu-item>
                            <el-menu-item index="/platform/deletehouse">
                                <i class="el-icon-delete"></i>
                                <span slot="title">回收站&nbsp;&nbsp;&nbsp;</span>
                            </el-menu-item>
                            <!-- 只有管理员(role为1)才能看到“管理”功能 -->
                            <el-menu-item v-if="$store.state.role==1?true:false" index="/platform/manage">
                                <i class="el-icon-circle-plus-outline"></i>
                                <span slot="title">管理&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
            <el-footer>Finished By Wmm-2020</el-footer>
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
            getGroup(){     //向服务器端发送请求，获取团队(名称和简介)数据
                this.$axios.get(this.HOST+'/api/getGroup',null).then(result=>{
                    if(result.data.msg == '查询成功'){
                        // 将团队名称和团队简介存储到vuex的store的state中
                        this.$store.commit('initGroup',{groupName:result.data.Agroup.groupName,description:result.data.Agroup.description})
                    }else{//查询失败
                        this.$store.commit('initGroup',{groupName:'查询失败',description:'查询失败'})
                    }
                }).catch(err=>console.log(err))
            }
        }
    }
</script>

<style lang="scss">
    #app {  //使得布局全屏的条件之一
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .appBox{
        height: 100%;
        min-width: 1500px;
        min-height: 700px;
    }
    .appBox>.el-container{
        height: 100%;
        background: url('images/bg3.jpg');
        background-size: cover;
        background-attachment: fixed;
    }
    .el-header{
        color: white;
        text-align: center;
        line-height: 60px;
        position: relative;
        border-bottom: 1px solid rgb(151, 149, 149);
        .title{
            font-size: 26px;
            text-shadow: 2px 2px 2px rgb(12, 12, 11); //水平位置 垂直位置 模糊距离 阴影颜色
        }
    }
    .el-footer {
        color: white;
        text-align: center;
        line-height: 60px;
    }
    .el-aside {
        text-align: center;
        line-height: 200px;
        border-right: 1px solid rgb(151, 149, 149);
        // height:100vh; //使得布局全屏的条件之二
        height: 100%; //解决了因为el-aside太长，导致页面出现滚动条的问题
    }
    .el-main {
        background-size: cover; //让背景图片充满整个页面
        color: #333;
        text-align: center;
        //解决el-main中放Element-UI 的table时，表头高度设置不了的问题
        line-height: 30px !important;
    }
    .el-menu {
        border-right: solid 0px #0000;
        list-style: none;
        position: relative;
        margin: 0;
        padding-left: 0;
        i{
            color: white;
        }
    }
    .el-col-12{//侧栏 NavMenu导航菜单(重要)
        height: 100%;
        width: 100%;
    }
    .el-dropdown{
        position: absolute;
    }
    .create{
        right: 15%;
        margin-right: 30px;
    }
    .user{
        right: 5%;
    }
    .el-dropdown-link {
        cursor: pointer;
        // color: #409EFF;
        color: white;
        font-size: 18px;  //设置子元素icon（i）的图标的大小
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .el-dropdown-link span{//主页右上角 当前登录用户名 样式
        font-size: 16px;
    }

</style>