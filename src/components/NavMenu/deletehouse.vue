<template>
    <!-- 文档界面 -->
    <div class="Box">
      <div class="tableBox">
          <div class="title">被遗弃的文档</div>
          <el-table
          :data="doscForm"
          style="width: 100%"
          fit>
          <el-table-column
              prop="doscName"
              label="名称">
          </el-table-column>
          <el-table-column
              prop="status"
              label="状态">
          </el-table-column>
          <el-table-column
              prop="author"
              label="作者">
          </el-table-column>
          <el-table-column label="操作" class="caozuo">
            <!-- 文字按钮 <el-button type="text">编辑</el-button>-->
            <template slot-scope="scope">
                <el-button class="edit" type="primary" size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
                <el-button class="delete" type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
          </el-table>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          storehouse:[], //存储所有知识库的数组，默认为空
          flag:false,     // flag为true 则右边的“选择知识库”框框显示，否则隐藏
          clickStore:'',  // 所选择的知识库
          doscForm:[],    // 用于存储获取到的所有文档
          // time:new Date()  //测试
        }
      },
      created(){
        this.getAllStore();  //页面一旦创建就展示所有知识库
        this.getAllDosc();
      },
      methods:{
        createDosc(storeName){ //点击知识库标签之后，跳转到文档编辑页面同时将这个知识库的名字通过query传递过去
          this.clickStore = storeName;
          // console.log(this.time|dateFormat('YYYY-MM-DD'));
          //这个知识库的名字可以通过啥传递给编辑页面呢??? URL地址。那么URL地址可以带有中文吗
          // this.$router.push('/createDosc/'+this.clickStore).catch(data => {  });
          this.$router.push({path:'/createDosc',query:{storeName:this.clickStore}}).catch(data => {  });
        },
        getAllStore(){ //展示知识库
            this.$axios.get(this.HOST+'/api/getAllStore').then(result=>{
                if(result.data.msg == '知识库查询失败'){
                    this.msg = result.data.msg;
                }else{
                    // console.log(result.data.result);
                    this.storehouse = result.data.result;
                }
            })
        },
        getAllDosc(){ //获取所有文档
          this.$axios.get(this.HOST+'/api/getAllDosc').then(result=>{
              if(result.data.msg == '文档查询失败'){
                  console.log(result.data.msg);
              }else{
                  // console.log(result.data.result);
                  // console.log(result.data.msg);
                  this.doscForm = result.data.result;
              }
          })
        },
        edit(index,dosc){ //编辑文档
          // console.log(index,dosc)
          //this.$router.push() 方法中path不能和params一起使用，否则params将无效。只能用name来指定页面。
          this.$router.push({ name: '/updateDosc', params:{dosc:dosc}}).catch(data => {  }); //测试代码
        },
        handleDelete(index,dosc){

        }
      }
    }
</script>

<style lang="scss" scoped>
    .Box{
      width: 100%;
    }

    //给table弄一个浅灰色外边框
    .tableBox{  
        border: 1px solid rgb(214, 214, 214);
        width: 70%;
        float:left;
        background-color: rgba($color: white, $alpha: 0.1);

      //标题
      .title{
        width: 100%;
        height: 50px;
        padding: 10px;
        text-align: left;
        font-size: 18px;
        background-color: snow;
        // background-color: rgba($color: white, $alpha: 0.1);
        box-sizing: border-box;
        border-bottom: 1px solid #eaeaea;
        position: relative;
      }

      //'新建文档'按钮
      .el-button{
        position: absolute;
        right: 10px;
      }

      .caozuo{ //"编辑"按钮的父元素，即“操作”
        position: relative;
      }

      .edit{ //“编辑”按钮
        position: absolute;
        left: 9px;
        top: 5px;
      }
      .delete{
        position: absolute;
        left: 69px;
        top: 5px;
      }
    }
    
    //右侧“新建文档”操作框
    .createDoscBox{
      width: 25%;
      float: right;
      // height: 300px;
      border-radius: 5px 5px;
      // border: 1px solid #eaeaea;
      border: 1px solid #c7c6c6;

      .title{
        width: 100%;
        height: 70px;
        padding: 10px;
        text-align: left;
        font-size: 18px;
        box-sizing: border-box;
        border-bottom: 1px solid #c7c6c6;
        position: relative;

        span{
          font-size: 14px;
          color: rgb(17, 15, 19);
        }
      }

      .tag{
        display: inline-block;
        margin: 5px;
        padding: 5px;

        .el-tag{
          background-color: white;
        }
      }
    }

</style>


