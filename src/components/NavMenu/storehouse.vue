<template>
    <!-- 知识库界面 -->
    <div class="storehouseBox">
      <!-- 展示所有知识库及简介 -->
        <div class="show"> 
          <!-- 展示知识库 --> 
          <div class="showTable">  
            <div class="title">
              知识库
              <!-- 搜索功能 -->
              <el-input class="searchInput" placeholder="请输入搜索内容" suffix-icon="el-icon-search" size="mini"
              v-model="searchInput" @change="handleSearch"></el-input>
              <!-- 新建知识库 -->
              <el-button class="createStoreButton" type="primary" size="small" v-if="$store.state.role==1?true:false"  
              @click="flag=!flag;editFlag=false;">新建知识库</el-button>
            </div>
            <el-table :data="storehouse" style="width: 100%" @row-click="lookStore" fit>
              <el-table-column prop="storeName" label="名称" width="280px"></el-table-column>
              <el-table-column prop="storeDesc" label="简介"></el-table-column>
              <!-- 只有管理员才能删改知识库！！！-->
              <el-table-column label="操作" class="caozuo" width="200px" v-if="$store.state.role==1?true:false">
                <template slot-scope="scope">
                    <el-button class="edit" type="primary" size="mini" @click="showEditBox(scope.$index, scope.row)"
                    @click.stop="deleteVisible = true">修改</el-button>
                    <el-button class="delete" @click.stop="deleteVisible = true" type="danger" size="mini" 
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 修改知识库 -->
          <div class="editStore" v-if="editFlag">
            <el-card class="add">
                <div slot="header" class="clearfix">
                    <i class="el-icon-edit"></i>
                    <span>修改知识库</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="editStore('ruleForm')">确定</el-button>
                </div>
                <el-form :model="editStoreForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
                    <el-form-item label="名称" prop="storeName">
                        <el-input prefix-icon="el-icon-folder" type="text" v-model="editStoreForm.storeName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="简介" prop="storeDesc">
                        <el-input prefix-icon="el-icon-reading" type="text" v-model="editStoreForm.storeDesc" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div>{{editMsg}}</div>  <!--如果新建知识库失败，会在这里提示用户-->
            </el-card>
          </div>
          <!-- 弹框确认是否确定要删除知识库 -->
          <el-dialog class="storeDialog" title="确定要删除此知识库？" :visible.sync="dialogVisible" width="350px">
            <span class="tips">知识库内的文档也会被删除</span>
            <span slot="footer" class="dialog-footer">
              <el-button class="cancelButton" type="primary" size="mini" @click="dialogVisible = false">取 消</el-button>
              <el-button class="sureButton" type="primary" size="mini" @click="verySureDelete()">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      <!-- 新建知识库 仅管理员可操作-->
        <div class="create" v-if="flag">
          <el-card class="add">
              <div slot="header" class="clearfix">
                  <i class="el-icon-plus"></i>
                  <span>新建知识库</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="createStore('ruleForm')">确定</el-button>
              </div>
              <el-form :model="storeForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
                  <el-form-item label="名称" prop="storeName">
                      <el-input prefix-icon="el-icon-folder" type="text" v-model="storeForm.storeName" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="简介" prop="storeDesc">
                      <el-input prefix-icon="el-icon-reading" type="text" v-model="storeForm.storeDesc" autocomplete="off"></el-input>
                  </el-form-item>
              </el-form>
              <div>{{msg}}</div>  <!--如果新建知识库失败，会在这里提示用户-->
          </el-card>
        </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          storehouse: [],    //存储所有知识库 【展示知识库模块】
          storeForm:{        //【新建知识库模块】
              storeName:'',  //知识库名称
              storeDesc:'',  //知识库简介
          },
          flag:false,        //flag 为false时，不展示新建知识库模块
          editFlag:false,    //editFlag 为false时，不展示修改知识库模块
          msg:'',            //新建知识库失败时显示提示
          editMsg:'',        //修改知识库失败时显示提示
          rules:{            //新建知识库的验证规则
              storeName:[    //验证知识库名称是否合法
                  { required: true, message: '请输入知识库名称', trigger: 'blur' },
                  { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
              ],
              storeDesc:[    //验证知识库简介是否合法
                  { required: true, message: '请输入知识库的简介', trigger: 'blur' },
                  { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
              ],
          },
          row:{},             //要删除的行对应的知识库对象
          dialogVisible:false, //控制删除确认框的显示和隐藏
          editStoreForm:{        //【修改知识库模块】
              id:'',
              storeName:'',    //知识库名称
              storeDesc:'',    //知识库简介
          },
          searchInput:'',      //搜索框的内容
          searchStore:[]       //存放搜索到的知识库
        }
      },
      created(){
        this.getAllStore();
      },
      methods:{
        getAllStore(){                  //展示知识库
            this.$axios.get(this.HOST+'/api/getAllStore').then(result=>{
                if(result.data.msg == '知识库查询失败'){  //暂时没有知识库
                    this.storehouse = [];
                }else{
                    this.storehouse = result.data.result;
                }
            }).catch(err=>console.log(err))
        },
        lookStore(row, event, column){  //点击行，查看该知识库的所有已发布文档列表
          //解决了直接用this.$route.query.storehouse时页面刷新之后数据会丢失的问题（第一步）。第二步在showDoscList.vue
          sessionStorage.setItem("storehouse",JSON.stringify(row))
          // this.$router.push({ name: '/showDoscList', query:{storehouse:row}}).catch(data=>{});
          this.$router.push('/showDoscList').catch(data=>{});
        },
        createStore(formName){          //创建知识库
            this.$refs[formName].validate((valid)=>{
                if(!valid) return;  //如果valid值为false，则return，不发送请求。
                this.$axios.post(this.HOST+'/api/createStore',this.storeForm).then(result=>{
                    if(result.data.msg == '知识库新建成功'){ //清空表单
                        this.getAllStore();  //重新从数据库获取数据，同步到网页上
                        this.storeForm.storeName = '';
                        this.storeForm.storeDesc = '';
                        this.flag = false;
                    }else{
                      this.msg = result.data.msg;
                    }
                }).catch(err=>console.log(err))
            });
        },
        showEditBox(index,storehouse){              //修改知识库1
          this.editStoreForm.id = storehouse.id
          this.editStoreForm.storeName = storehouse.storeName
          this.editStoreForm.storeDesc = storehouse.storeDesc 
          this.flag = false  //显示修改模块之前，先关闭新建模块
          this.editFlag=!this.editFlag       //控制显示或隐藏 修改知识库模块
        },
        editStore(formName){ //修改知识库2
            this.$refs[formName].validate((valid)=>{
                if(!valid) return;  //如果valid值为false，则return，不发送请求。
                this.$axios.post(this.HOST+'/api/editStore',this.editStoreForm).then(result=>{
                    if(result.data.msg == '知识库修改成功'){
                      
                        console.log(result.data)
                        this.getAllStore();  //重新从数据库获取数据，同步到网页上
                        this.editFlag = false;  //隐藏修改知识库模块
                    }else{
                      this.editMsg = result.data.msg;
                    }
                }).catch(err=>console.log(err))
            });
        },
        handleDelete(index,row){       //点击删除按钮，弹框
          this.dialogVisible = true
          this.row = row
        },
        verySureDelete(){              //点击删除按钮，删除知识库
          this.dialogVisible = false; //关闭弹框
          this.$axios.post(this.HOST+'/api/deleteStorehouse/'+this.row.id).then(result=>{
              if(result.data.msg == '删除知识库失败'){
                  console.log(result.data.msg);
              }else{ //删除知识库成功
                  this.getAllStore(); //刷新页面
              }
          }).catch(err=>console.log(err))
        },
        handleSearch(){                //搜索功能
          this.storehouse.forEach(item => {
              // indexOf(int ch): 在母串中搜子串，返回子串在母字符串中第一次出现处的索引，没找到则返回 -1。
              if(item.storeName.indexOf(this.searchInput)>=0){
                  this.searchStore.push(item)
              }
          });
          this.storehouse = this.searchStore;
        }
      }
    }
</script>

<style lang="scss" scoped>
  //给table弄一个浅灰色外边框
  .storehouseBox{  
    width: 100%;
    border: 1px solid #0000;  //必须
    background-color: rgba(255, 255, 255, 0); //必须

    .show{  //展示知识库及简介
      width: 73%;
      float: left;
      .showTable{  //展示知识库的table
        .title{ //标题
          width: 100%;
          height: 50px;
          padding: 10px;
          text-align: left;
          background-color: snow;
          box-sizing: border-box;
          border-bottom: 1px solid #eaeaea;
          position: relative;
          .searchInput{
            width: 180px;
            margin-left: 20px;
          }
          .createStoreButton{ //'新建知识库'按钮
            position: absolute;
            right: 10px;
          }
        }
        .el-table{   
          .caozuo{ //"删除"按钮的父元素，即“操作”
            position: relative;
            .edit{ //“修改”按钮
              position: absolute;
              left: 9px;
              // top: 15px;
            }
            .delete{  //"删除"按钮
              position: absolute;
              left: 69px;
              // top: 15px;
            }
          }
        }
      }

      .editStore{  //修改知识库
        margin-top: 50px;
        .clearfix{
          color: black;
        }
      }

      .storeDialog{ //Dialog弹框
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
        .el-dialog .tips{
          color: black;
        }
      }
    }

    .create{ //新建知识库
      width: 23%;
      float: right;
      // margin-right: 5px;
      .el-card{
        width: 100%;
        background-color: white;  //honeydew snow
        margin-top: 5px;
        .add{
          .clearfix:before,
          .clearfix:after {
            display: table;
            content: "";
          }
          .clearfix:after {
            clear: both
          }
          .clearfix{
            text-align: left;
          }
        }
      }
    }
  }
</style>