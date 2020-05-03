<template>
    <!-- 知识库界面 -->
    <div class="tableBox">
      <!-- 展示所有知识库及简介 -->
        <div class="show">  
          <div class="title">知识库<el-button type="primary" size="small" v-if="$store.state.role==1?true:false"  @click="flag=!flag">新建知识库</el-button></div>
          <el-table :data="storehouse" style="width: 100%" @row-click="lookStore" fit>
          <el-table-column prop="storeName" label="名称"></el-table-column>
          <el-table-column prop="storeDesc" label="简介"></el-table-column>
          </el-table>
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
                      <el-input prefix-icon="el-icon-s-custom" type="text" v-model="storeForm.storeName" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="简介" prop="storeDesc">
                      <el-input prefix-icon="el-icon-edit" type="text" v-model="storeForm.storeDesc" autocomplete="off"></el-input>
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
          msg:'',            //新建知识库失败时显示提示
          rules:{            //新建知识库的验证规则
              storeName:[    //验证知识库名称是否合法
                  { required: true, message: '请输入知识库名称', trigger: 'blur' },
                  { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
              ],
              storeDesc:[    //验证知识库简介是否合法
                  { required: true, message: '请输入知识库的简介', trigger: 'blur' },
                  { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
              ],
          }
        }
      },
      created(){
        this.getAllStore();
      },
      methods:{
        getAllStore(){                  //展示知识库
            this.$axios.get(this.HOST+'/api/getAllStore').then(result=>{
                if(result.data.msg == '知识库查询失败'){
                    this.msg = result.data.msg;
                }else{
                    this.storehouse = result.data.result;
                }
            }).catch(err=>console.log(err))
        },
        lookStore(row, event, column){  //点击行，查看该知识库的所有已发布文档列表
          //解决了直接用this.$route.query.storehouse时页面刷新之后数据会丢失的问题（第一步）。第二步在showDoscList.vue
          sessionStorage.setItem("storehouse",JSON.stringify(row))
          this.$router.push({ name: '/showDoscList', query:{storehouse:row}}).catch(data=>{});
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
      }
    }
</script>

<style lang="scss" scoped>
  //给table弄一个浅灰色外边框
  .tableBox{  
    width: 100%;
    border: 1px solid #0000;  //必须
    background-color: rgba(255, 255, 255, 0); //必须


    .show{  //展示知识库及简介
      width: 70%;
      float: left;
      .title{ //标题
        width: 100%;
        height: 50px;
        padding: 10px;
        text-align: left;
        background-color: snow;
        box-sizing: border-box;
        border-bottom: 1px solid #eaeaea;
        position: relative;
      }
      .el-button{ //'新建文档'按钮
        position: absolute;
        right: 10px;
      }
    }

    .create{ //新建知识库
      width: 25%;
      float: right;
      margin-right: 5px;
      .el-card{
        width: 100%;
        background-color: snow;  //honeydew
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