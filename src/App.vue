<template>
    <!-- 主页 -->
    <div class="box">
        <el-container>
            <el-header>
                团队内部知识共享平台系统  
                <el-dropdown class="create">
                    <span class="el-dropdown-link">
                        <i class="el-icon-circle-plus"></i><i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>新建文档</el-dropdown-item>
                        <el-dropdown-item>新建团队</el-dropdown-item>
                        <el-dropdown-item>新建知识库</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown class="user">
                    <span class="el-dropdown-link">
                        <i class="el-icon-user-solid"></i><i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人主页</el-dropdown-item>
                        <el-dropdown-item>账户设置</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="20%">
                    <el-row class="tac">
                        <el-col :span="12">
                            <el-menu
                            :default-active="this.$route.path"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
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
                            </el-menu>
                        </el-col>
                    </el-row>
                </el-aside>
                <el-container>
                <el-main>
                    <router-view></router-view> 
                </el-main>
                </el-container>
            </el-container>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>

<script>
export default {
    data(){
        return{
            
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
        background-color: white;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        // line-height: 160px;
        //解决el-main中放Element-UI 的table时，表头高度设置不了的问题
        line-height: 30px !important;
    }
    body > .el-container {
        margin-bottom: 40px;
    }
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

</style>
