<template>
    <!-- 文档界面 -->
    <div class="Box">
      <div class="tableBox">
          <div class="title">我的文档<el-button class="newDosc" type="primary" size="small" @click="flag=!flag">新建文档</el-button></div>
          <el-table
          :data="doscForm"
          @row-click="lookDosc"
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
              prop="storeName"
              label="所属知识库">
          </el-table-column>
          <el-table-column label="操作" class="caozuo">
            <!-- 文字按钮 <el-button type="text">编辑</el-button>-->
            <template slot-scope="scope">
                <el-button class="edit" type="primary" size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
                <el-button class="delete" @click.stop="deleteVisible = true" type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
          </el-table>

          <!-- 弹框确认是否删除文档 -->
          <el-dialog
            title="确定要删除这篇文档吗？"
            :visible.sync="dialogVisible"
            width="30%">
            <span>您删除的文档将被移动到回收站！</span>
            <span slot="footer" class="dialog-footer">
              <el-button class="cancelButton" type="primary" size="mini" @click="dialogVisible = false">取 消</el-button>
              <el-button class="sureButton" type="primary" size="mini" @click="sureDelete()">确 定</el-button>
            </span>
          </el-dialog>         
      </div>
      <div class="createDoscBox" v-if="flag">
        <div class="title">
          新建文档<br/><span>请先选择一个知识库</span>
        </div>
        <div class="tag"  v-for="item in storehouse" :key="item.storeName">
          <el-tag type="info" @click="createDosc(item.storeName)">{{item.storeName}}</el-tag>
        </div>

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
          dialogVisible: false, //控制是否弹框确认删除
          row:{}          //当前被点击的行对应的文档对象
        }
      },
      created(){
        this.getAllStore();  //页面一旦创建就展示所有知识库
        this.getMyAllDosc();
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
        getMyAllDosc(){ //获取我的所有文档
          // console.log(this.$store.state.username) //输出一下当前用户名
          this.$axios.get(this.HOST+'/api/getMyAllDosc/'+this.$store.state.username).then(result=>{
              if(result.data.msg == '文档查询失败'){
                  // console.log('我的所有文档数为0篇(已发布+未发布=0)');
                  //因为删除文档之后要调用这个getMyAllDosc函数来重新获取数据渲染页面
                  //所以，要添加这一句，来解决删除最后一条文档的时候，没有刷新页面，导致数据没有在前端删去的问题
                  this.doscForm = []; 
              }else{
                  this.doscForm = result.data.result;
              }
          })
          .catch(err=>{
              console.log(err);
          })   
        },
        edit(index,dosc){ //编辑文档
          // console.log(index,dosc)
          //this.$router.push() 方法中path不能和params一起使用，否则params将无效。只能用name来指定页面。
          this.$router.push({ name: '/updateDosc', params:{dosc:dosc}}).catch(data => {  }); //测试代码
        },
        lookDosc(row, event, column){  //点击行，查看文档详情
          //解决了直接用this.$route.query.dosc时页面刷新之后数据会丢失的问题（第一步）。第二步在lookDosc.vue
          sessionStorage.setItem("dosc",JSON.stringify(row))
          //跳转到文档详情页面
          this.$router.push({ name: '/lookDosc', query:{dosc:row}}).catch(data=>{});
        },
        handleDelete(index,row){ //点击删除按钮，弹框
          this.dialogVisible = true
          this.row = row
        },
        sureDelete(){ //点击删除按钮，将文档的status设置为“已删除”
          this.dialogVisible = false; //关闭弹框
          this.row.status = '已删除'
          this.$axios.post(this.HOST+'/api/toDeletehouse',this.row).then(result=>{
              if(result.data.msg == '文档放进回收站失败'){
                  console.log(result.data.msg);
              }else{ //文档成功放进回收站
                  this.getMyAllDosc(); //刷新页面
              }
          })
          .catch(err=>{
              console.log(err);
          })
        }
      }
    }
</script>

<style lang="scss">

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
      .newDosc{
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

    //Dialog弹框
    .el-dialog{
      .el-dialog__header {
          padding: 20px !important;
          text-align: left;
      }
      .el-dialog__body {
          padding: 20px !important;
          color: #606266;
          font-size: 18px;
          word-break: break-all;
      }
      .el-dialog__footer {
          padding: 20px !important;
          text-align: right;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
      }
    }


</style>


