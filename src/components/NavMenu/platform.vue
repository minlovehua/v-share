<template>
    <div>
        <div class="cardBox">
            <div class="tip">团队最新发布</div>
            <el-card class="box-card" v-for="item in doscForm" :key="item.id">
                <div class="xx">
                    <div class="title">
                        <span><i class="el-icon-document"></i>&nbsp;{{item.doscName}}</span>                 
                    </div>
                    <div class="doscMsg">
                        <span><i class="el-icon-folder"></i>&nbsp;{{item.storeName}}</span>&nbsp;&nbsp;
                        <span><i class="el-icon-user"></i>&nbsp;{{item.author}}</span>&nbsp;&nbsp;
                        <span><i class="el-icon-time"></i>&nbsp;{{item.updateTime|dateFormat}}</span> &nbsp;&nbsp;
                        <el-button class="edit" type="text" @click="look(item)">查看全文</el-button>
                    </div>
                </div>                             
            </el-card>
        </div>
    </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
    data(){
        return{
            doscForm:[]
        }
    },
    created(){
        this.getAllGroupDosc() //页面一旦创建，就获取团队的所有已发布的文档
    },
    methods:{
        getAllGroupDosc(){ //获取团队的所有已发布的文档
          this.$axios.get(this.HOST+'/api/getAllGroupDosc').then(result=>{
              if(result.data.msg == '获取文档失败'){
                  console.log(result.data.msg);
              }else{
                  this.doscForm = result.data.result;
              }
          }).catch(err=>console.log(err))
        },
        look(dosc){        //点击“查看全文”,显示文章内容
            //解决了直接用this.$route.query.dosc时页面刷新之后数据会丢失的问题（第一步）。第二步在lookDosc.vue
            sessionStorage.setItem("dosc",JSON.stringify(dosc))
            this.$router.push({ name: '/lookDosc', query:{dosc:dosc}}).catch(data=>{});
        }
    }
}
</script>

<style lang="scss" scoped>
    .cardBox{
        width: 70%;
        // background-color: bisque;
        box-sizing: border-box;
        padding: 10px;
    }
    .el-card{
        padding: 0px;
        margin: 10px;
        background-color: rgba($color: white, $alpha: 0.6);  //设置背景颜色和透明度
    }
    .xx{
        height: 30px;  //必须给高度，否则不会垂直居中对齐，而是偏下
        position: relative;
    }
    .title{
        float: left;
    }
    .doscMsg{
        position: absolute;
        right: 10px;
    }
    .title span{
        font-size: 20px;
        font-weight: 900;
        text-align: left;
    }
    .edit{
        color:rgb(6, 65, 241)
    }
    .tip{
        font-size: 22px;
        color: rgb(189, 192, 8);
        font-weight: 900;
        text-align: left;
        margin-left: 10px;
    }
</style>