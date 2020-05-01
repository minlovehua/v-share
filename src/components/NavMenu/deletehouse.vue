<template>
    <!-- 回收站 -->
    <div class="Box">
      <div class="tableBox">
          <div class="title">回收站
            <el-button class="newDosc" type="danger" size="small" v-if="multipleSelection.length" 
            @click="deleteSelected = true">删除选中</el-button>
          </div>
          <el-table :data="doscForm" @row-click="lookDosc" style="width: 100%" fit @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="doscName" label="名称"></el-table-column>
            <el-table-column prop="storeName" label="所属知识库"></el-table-column>
            <el-table-column label="操作" class="caozuo">
              <template slot-scope="scope">
                  <el-button class="edit" @click.stop="deleteVisible = true" type="primary" size="mini" 
                  @click="handleReturn(scope.$index, scope.row)">恢复</el-button>
                  <el-button class="delete" @click.stop="deleteVisible = true" type="danger" size="mini" 
                  @click="handleDelete(scope.$index, scope.row)">彻底删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 弹框确认是否恢复文档 -->
          <el-dialog title="确定要恢复文档吗？" :visible.sync="returnVisible" width="30%">
            <span class="tips">文档将恢复到【我的文档】模块</span>
            <span slot="footer" class="dialog-footer">
              <el-button class="cancelButton" type="primary" size="mini" @click="returnVisible = false">取 消</el-button>
              <el-button class="sureButton" type="primary" size="mini" @click="returnTOMyDosc()">确 定</el-button>
            </span>
          </el-dialog> 
          <!-- 弹框确认是否彻底删除文档 -->
          <el-dialog title="确定要彻底删除此文档吗？" :visible.sync="dialogVisible" width="30%">
            <span class="tips">慎重考虑哦！</span>
            <span slot="footer" class="dialog-footer">
              <el-button class="cancelButton" type="primary" size="mini" @click="dialogVisible = false">取 消</el-button>
              <el-button class="sureButton" type="primary" size="mini" @click="verySureDelete()">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 弹框确认是否彻底删除多选框选中的文档 -->
          <el-dialog title="确定要彻底删除选中的文档吗？" :visible.sync="deleteSelected" width="30%">
            <span>删除将不可恢复！</span>
            <span slot="footer" class="dialog-footer">
              <el-button class="cancelButton" type="primary" size="mini" @click="deleteSelected = false">取 消</el-button>
              <el-button class="sureButton" type="primary" size="mini" @click="deleteAllSelected()">确 定</el-button>
            </span>
          </el-dialog>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          doscForm:[],                 // 用于存储获取到的所有文档
          dialogVisible: false,        //控制是否弹框确认 彻底删除
          returnVisible:false,         //控制是否弹框确认 恢复文档
          row:{},                      //当前被点击的行对应的文档对象
          deleteSelected:false,        //控制是否弹框确认 删除选中
          multipleSelection: []        //被选中的文档对象组成的数组(多选框Checkbox选中的文档)
        }
      },
      created(){
        this.getMyAllDeleteDosc()      //组件一旦创建完成，就获取数据渲染到页面是
      },
      methods:{
        lookDosc(row, event, column){  //点击行，查看文档详情
          //解决了直接用this.$route.query.dosc时页面刷新之后数据会丢失的问题（第一步）。第二步在lookDosc.vue
          sessionStorage.setItem("dosc",JSON.stringify(row))
          //跳转到文档详情页面
          this.$router.push({ name: '/lookDosc', query:{dosc:row}}).catch(data=>{});
        },
        getMyAllDeleteDosc(){ 
          this.$axios.get(this.HOST+'/api/getMyAllDeleteDosc/'+this.$store.state.username).then(result=>{
              if(result.data.msg == '文档查询失败'){
                  this.doscForm = []; 
              }else{
                  this.doscForm = result.data.result;
              }
          }).catch(err=>console.log(err))   
        },
        handleReturn(index,row){       //确定恢复文档吗
          this.returnVisible = true
          this.row = row
        },
        returnTOMyDosc(){              //恢复文档
          this.returnVisible = false; //关闭弹框
          this.row.status = '未发布'
          this.$axios.post(this.HOST+'/api/returnTOMyDosc',this.row).then(result=>{
              if(result.data.msg == '文档恢复失败'){
                  console.log(result.data.msg);
              }else{ //文档成功放进回收站
                  this.getMyAllDeleteDosc(); //刷新页面
              }
          }).catch(err=>console.log(err))   
        },
        handleDelete(index,row){       //确定彻底删除吗
          this.dialogVisible = true
          this.row = row
        },
        verySureDelete(){              //彻底删除
          this.dialogVisible = false; //关闭弹框
          this.$axios.post(this.HOST+'/api/verySureDelete/'+this.row.id).then(result=>{
            if(result.data.msg == '彻底删除失败'){
              console.log(result.data.msg);
            }else{
              this.getMyAllDeleteDosc(); //刷新页面
            }
          }).catch(err=>console.log(err))   
        },
        handleSelectionChange(val) {   //获取多选框选中的文档
          this.multipleSelection = val;//参数val 是被选中的文档对象组成的数组
        },
        deleteAllSelected(){           //彻底删除多选框选中的文档
          this.deleteSelected = false; //关闭弹框
          this.$axios.post(this.HOST+'/api/deleteAllSelected',this.multipleSelection).then(result=>{
            if(result.data.msg == '彻底删除多选框选中文档失败'){
              console.log(result.data.msg);
            }else{
              this.getMyAllDeleteDosc(); //刷新页面
            }
          }).catch(err=>console.log(err))
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
      .el-dialog .tips{
        color: black;
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
        top: 10px;
      }
      .delete{
        position: absolute;
        left: 69px;
        top: 10px;
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
          font-size: 14px;
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