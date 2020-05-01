<template>
    <div>
        <div class="cardBox">
            <div class="tip">团&nbsp;队&nbsp;最&nbsp;新&nbsp;发&nbsp;布</div>
            <el-card class="box-card" v-for="item in doscForm" :key="item.id">
                <div class="eachCard">
                    <div class="title">    <!-- 左边 -->
                        <span><i class="el-icon-document"></i>&nbsp;{{item.doscName}}</span>                 
                    </div>
                    <div class="doscMsg">  <!-- 右边 -->
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

<style lang="scss">
    .cardBox{
        width: 70%;
        box-sizing: border-box;
        padding: 10px;
        .tip{
            font-size: 18px;
            // color: rgb(189, 192, 8);
            color: white;
            text-align: left;
            margin-left: 10px;
            text-shadow: 1px 1px 2px rgb(12, 12, 11); //水平位置 垂直位置 模糊距离 阴影颜色
        }
        .el-card{
            padding: 0px;
            margin: 15px 10px;
            background-color: rgba($color: white, $alpha: 1.0);  //设置背景颜色和透明度
            .el-card__body {
                padding: 15px;
            }
            .eachCard{
                height: 30px;  //必须给高度，否则不会垂直居中对齐，而是偏下
                // position: relative;
                display: flex;
                justify-content: space-between;
                .title{
                    // position: absolute;
                    // left: 10px;
                    span{
                        font-size: 18px;
                        font-weight: 600;
                        text-align: left;
                    }
                }
                .doscMsg{
                    // position: absolute;
                    // right: 10px;
                    .edit{
                        color:rgb(6, 65, 241)
                    }
                }
            }
        }
    }
</style>