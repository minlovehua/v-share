<template>
    <!-- 我的文档界面 -->
    <div class="Box">
      <div class="tableBox">
          <div class="title">
            我的文档
            <el-button class="newDosc" type="primary" size="small" @click="flag=!flag">新建文档</el-button>
          </div>
          <el-table :data="doscForm" @row-click="lookDosc" style="width: 100%" fit>
            <el-table-column prop="doscName" label="名称"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <el-select v-model="scope.row.status" @change="selectStatus($event,scope.row)" style="width:50%;">
                  <el-option 
                  v-for="item in options" 
                  :key="item.value" 
                  :label="item.label" 
                  :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="storeName" label="所属知识库"></el-table-column>
            <el-table-column label="操作" class="caozuo">
              <template slot-scope="scope">
                  <el-button class="edit" type="primary" size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
                  <el-button class="delete" @click.stop="deleteVisible = true" type="danger" size="mini" 
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 弹框确认是否删除文档 -->
          <el-dialog title="确定要删除这篇文档吗？" :visible.sync="dialogVisible" width="30%">
            <span class="tips">您删除的文档将被移动到回收站！</span>
            <span slot="footer" class="dialog-footer">
              <el-button class="cancelButton" type="primary" size="mini" @click="dialogVisible = false">取 消</el-button>
              <el-button class="sureButton" type="primary" size="mini" @click="sureDelete()">确 定</el-button>
            </span>
          </el-dialog>         
      </div>
      <!-- 新建文档 -->
      <div class="createDoscBox" v-if="flag">
        <div class="title">
          <i class="el-icon-plus"></i>&nbsp;新建文档<br/><span>请先选择一个知识库吧</span>
        </div>
        <div class="tag"  v-for="item in storehouse" :key="item.storeName">
          <el-tag @click="createDosc(item.id,item.storeName)">{{item.storeName}}</el-tag>
        </div>
        <div class="nullMsg">{{nullMsg}}</div>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          nullMsg:'',           //‘管理员还没有创建知识库’
          storehouse:[],        //存储所有知识库的数组，默认为空
          flag:false,           // flag为true 则右边的“选择知识库”框框显示，否则隐藏      
          doscForm:[],          // 用于存储获取到的所有文档，展示在界面的Table中
          dialogVisible: false, //控制是否弹框确认删除
          row:{},                //当前被点击的行对应的文档对象
          options:[{
            value: '未发布',
            label:'未发布'
          },{
            value: '已发布',
            label:'已发布'
          }]
        }
      },
      created(){
        this.getAllStore();  //页面一旦创建就展示所有知识库
        this.getMyAllDosc(); 
      },
      methods:{
        createDosc(storeId,storeName){         //点击知识库标签之后，跳转到文档编辑页面同时将这个知识库的名字通过query传递过去
          this.$router.push({path:'/createDosc',query:{storeId:storeId,storeName:storeName}}).catch(data => {  });
        },
        getAllStore(){                 //展示知识库
            this.$axios.get(this.HOST+'/api/getAllStore').then(result=>{
                if(result.data.msg == '知识库查询失败'){
                    this.nullMsg = '请管理员先创建知识库!';
                }else{
                    this.storehouse = result.data.result;
                }
            })
        },
        getMyAllDosc(){                //获取我的所有文档
          this.$axios.get(this.HOST+'/api/getMyAllDosc/'+this.$store.state.username).then(result=>{
              if(result.data.msg == '文档查询失败'){  //没有查询到符合条件的文档
                  //因为删除文档之后要调用这个getMyAllDosc函数来重新获取数据渲染页面
                  //所以，要添加这一句，来解决删除最后一条文档的时候，没有刷新页面，导致数据没有在前端删去的问题
                  this.doscForm = []; 
              }else{
                  this.doscForm = result.data.result;
              }
          }).catch(err=>console.log(err))   
        },
        edit(index,dosc){              //编辑文档
          //this.$router.push() 方法中path不能和params一起使用，否则params将无效。只能用name来指定页面。
          this.$router.push({ name: '/updateDosc', params:{dosc:dosc}}).catch(data => {  });
        },
        lookDosc(row, event, column){  //点击行，查看文档详情
          //解决了直接用this.$route.query.dosc时页面刷新之后数据会丢失的问题（第一步）。第二步在lookDosc.vue
          sessionStorage.setItem("dosc",JSON.stringify(row))
          this.$router.push({ name: '/lookDosc', query:{dosc:row}}).catch(data=>{});  //跳转到文档详情页面
        },
        handleDelete(index,row){       //点击删除按钮，弹框
          this.dialogVisible = true
          this.row = row
        },
        sureDelete(){                  //点击删除按钮，将文档的status设置为“已删除”
          this.dialogVisible = false; //关闭弹框
          this.$axios.post(this.HOST+'/api/toDeletehouse',{id:this.row.id,status:'已删除'}).then(result=>{
              if(result.data.msg == '文档放进回收站失败'){
                  console.log(result.data.msg);
              }else{ //文档成功放进回收站
                  this.getMyAllDosc(); //刷新页面
              }
          }).catch(err=>console.log(err))
        },
        selectStatus(event,row){       //修改文档的status   参数val的值为“已发布”或“未发布”
          //触发el-select的change事件后，表格的行对象row的status值会变成选中的那个值
          this.$axios.post(this.HOST+'/api/selectStatus',{id:row.id,status:row.status}).then(result=>{
              if(result.data.msg == '修改文档状态失败'){
                console.log('修改文档的发布状态失败')
              }else{
                // console.log('修改文档的发布状态成功')
              }
          }).catch(err=>console.log(err))   
        }
      }
    }
</script>

<style lang="scss">
  .Box{
    width: 100%;

    .tableBox{       //展示所有文档
      width: 75%;
      float:left;
      .title{  //标题
        width: 100%;
        height: 50px;
        padding: 10px;
        text-align: left;
        font-size: 18px;
        background-color: snow;
        box-sizing: border-box;
        border-bottom: 1px solid #eaeaea;
        position: relative;
        .newDosc{ //'新建文档'按钮
          position: absolute;
          right: 10px;
        }
      }
      .el-table td, .el-table th {
          padding: 15px 5px;  //第一个：将table的行高变大一点。第二个：让文字不要靠太近表格左边。
          min-width: 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          text-overflow: ellipsis;
          vertical-align: middle;
          position: relative;
          text-align: left;
          font-size: 16px;  //table中字体调大一点
      }
      .el-select{
        .el-input__inner {  //改变el-select框的高度
            -webkit-appearance: none;
            background-color: #FFF;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #DCDFE6;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: 23px;          //改变el-select框的高度
            line-height: 23px;
            outline: 0;
            padding: 0 10px;
            -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            width: 100%;
        }
        .el-input__icon {  //改小，使得el-select右侧小箭头垂直居中
            height: 100%;
            width: 25px;
            text-align: center;
            -webkit-transition: all .3s;
            transition: all .3s;
            line-height: 23px;    //改小，使得el-select右侧小箭头垂直居中
        }
      }
      .el-dialog{ //Dialog弹框
        .el-dialog__header {
            padding: 20px !important;
            text-align: left;
        }
        .el-dialog__body {
            padding: 20px !important;
            color: black;
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
      .caozuo{ //"编辑"按钮的父元素，即“操作”
        position: relative;
        .edit{ //“编辑”按钮
          position: absolute;
          left: 9px;
          // top: 15px;
        }
        .delete{
          position: absolute;
          left: 69px;
          // top: 15px;
        }
      }
    }

    .createDoscBox{  //右侧“新建文档”操作框
      margin-top: 20px;
      width: 20%;
      float: right;
      border-radius: 5px 5px;
      border: 1px solid snow; //#c7c6c6
      // border: 5px solid snow; //#c7c6c6
      .title{
        width: 100%;
        height: 70px;
        padding: 10px;
        text-align: left;
        font-size: 18px;
        color:white;
        text-shadow: 2px 2px 2px rgb(8, 8, 8);
        box-sizing: border-box;
        border-bottom: 1px solid #c7c6c6;
        // background-color: rgba($color: snow, $alpha: 1);
        position: relative;
        span{
          font-size: 14px;
        }
      }
      .tag{
        display: inline-block;
        margin: 5px;
        padding: 5px;
        .el-tag {
          background-color: #ecf5ff;
          border-color: #d9ecff;
          display: inline-block;
          height: 32px;
          padding: 0 10px;
          line-height: 30px;
          font-size: 14px;
          color: rgb(12, 13, 14);
          border-width: 1px;
          border-style: solid;
          border-radius: 4px;
          box-sizing: border-box;
          white-space: nowrap;
        }
      }
      .nullMsg{
        margin: 10px 0px;
        color:orange;
        text-shadow: 2px 2px 2px rgb(8, 8, 8);
      }
    }
  }
</style>