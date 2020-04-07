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
                identityCode:{  //邀请码
                    code:'',
                    flag:'true'
                },
                jschars:['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                activeIndex: '1',
                activeIndex2: '1'
            }
        },
        methods:{
            randomCode(){ //生成随机邀请码
                //生成邀请码
                var newCode = "";
                for (var i = 0; i < 4 ; i++) {
                    var id = Math.ceil(Math.random() * 35);
                    newCode += this.jschars[id];
                }
                //判断数据库有没有该邀请码（参数1：要请求的后台接口。参数2：交给后台处理的数据。）
                this.$axios.post(this.HOST+'/api/isCode',{code:newCode,flag:'true'})
                .then(result=>{
                    //console.log(result.data)  //{status: 1, msg: "该邀请码已存在"}
                    if(result.data.msg == '该邀请码可以使用'){ //如果数据库没有该邀请码，则插入数据库，并显示在页面上
                        this.identityCode.code = newCode;
                    }else{
                        randomCode();  //如果数据库已经有该邀请码，重新生成邀请码
                    }
                })
                

            },
            toStoreManage(){ //跳转到 知识库管理
                this.$router.push('/platform/manage/storehouse').catch(data => {  });
            },
            toMemberManage(){ //跳转到 成员管理
                this.$router.push('/platform/manage/members').catch(data => {  });
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
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