<template>
    <!-- 主页的团队管理页面 -->
    <div class="manageBox">
        <!-- 管理页面导航栏 -->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <!-- <el-menu-item index="1"><router-link to="/platform/manage/storehouse" tag="span">知识库管理</router-link></el-menu-item> -->
            <!-- <el-menu-item index="2"><router-link to="/platform/manage/members" tag="span">成员管理</router-link></el-menu-item> -->
            <!-- 以上两行只有点击到文字才有效果，用户体验不好 -->
            <el-menu-item index="1" @click="toStoreManage()"><span>知识库管理</span></el-menu-item>
            <el-menu-item index="2" @click="toMemberManage()"><span>成员管理</span></el-menu-item>
        </el-menu>
        <div class="groupmanage">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                activeIndex: '1',
                activeIndex2: '1'
            }
        },
        methods:{
            toStoreManage(){ //跳转到 知识库管理
                this.$router.push('/platform/manage/storehouse').catch(data => {  });
            },
            toMemberManage(){ //跳转到 成员管理
                this.$router.push('/platform/manage/members').catch(data => {  });
            },
            handleSelect(key, keyPath) {
                // console.log(key, keyPath);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .manageBox{
        border: 1px solid rgb(214, 214, 214);
        width: 90%;
    }
    .groupmanage{
        min-height:300px;
        background-color:#f1dfe2;
    }
</style>