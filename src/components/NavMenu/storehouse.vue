<template>
    <!-- 文档界面 -->
    <div class="tableBox">
        <div class="title">知识库</div>
        <!-- <div class="title">知识库<el-button type="primary" size="small">新建知识库</el-button></div> -->
        <el-table :data="storehouse" style="width: 100%" @row-click="lookStore" fit>
        <el-table-column prop="storeName" label="名称"></el-table-column>
        <el-table-column prop="storeDesc" label="简介"></el-table-column>
        </el-table>
    </div>

</template>

<script>
    export default {
      data() {
        return {
          storehouse: [] //存储所有知识库
        }
      },
      created(){
        this.getAllStore();
      },
      methods:{
        getAllStore(){         //展示知识库
            this.$axios.get(this.HOST+'/api/getAllStore').then(result=>{
                if(result.data.msg == '知识库查询失败'){
                    this.msg = result.data.msg;
                }else{
                    this.storehouse = result.data.result;
                }
            }).catch(err=>console.log(err))
        },
        lookStore(row, event, column){  //点击行，查看该知识库的所有文档列表
          //解决了直接用this.$route.query.storehouse时页面刷新之后数据会丢失的问题（第一步）。第二步在showDoscList.vue
          sessionStorage.setItem("storehouse",JSON.stringify(row))
          this.$router.push({ name: '/showDoscList', query:{storehouse:row}}).catch(data=>{});
        },
      }
    }
</script>

<style lang="scss" scoped>
    //给table弄一个浅灰色外边框
    .tableBox{  
        border: 1px solid rgb(214, 214, 214);
        width: 90%;
    }

    //标题
    .title{
      width: 100%;
      height: 50px;
      padding: 10px;
      text-align: left;
      background-color: snow;
      box-sizing: border-box;
      border-bottom: 1px solid #eaeaea;
      position: relative;
    }

    //'新建文档'按钮
    .el-button{
      position: absolute;
      right: 10px;
    }
</style>