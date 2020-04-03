<template>
    <!-- 团队界面 -->
    <div class="group-container">
      <div class="tableBox">
          <div class="title">我参与的团队<el-button type="primary" size="small" @click="createGroup">新建团队</el-button></div>
          <el-table
          :data="tableData"
          style="width: 100%"
          fit>
          <el-table-column
              prop="name"
              label="名称">
          </el-table-column>
          <el-table-column
              prop="introduction"
              label="简介">
          </el-table-column>
          <el-table-column
              prop="member"
              label="成员">
          </el-table-column>
          </el-table>
      </div>

      <!-- 点击“新建团队”后的弹框 -->
      <div class="editCreateGroup" v-if="dialogVisible">
        <div class="dialogTitle">新建团队 <span> 一起编写文档、交流想法、沉淀经验</span>
        <el-button type="primary" size="small" @click="dialogVisible = false">确定新建</el-button></div>
        <el-form :label-position="labelPosition" label-width="60px" :model="formLabelAlign">
          <el-form-item label="名称">
            <el-input v-model="formLabelAlign.name" placeholder="请输入团队的名称"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="formLabelAlign.description" type="textarea" :rows="2" placeholder="简单介绍一下你的团队吧"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          tableData: [{
            name:'Locus',
            introduction:'这是一个有爱的强大的团队',
            member:'13人'
          }],
          dialogVisible: false,
          labelPosition: 'right',
          formLabelAlign: {
            name: '',
            description: ''
          }
        };
      },
      methods:{
        createGroup(){
          //点击“新建团队”后显示弹框
          this.dialogVisible = true;
        }
      }
    }
</script>

<style lang="scss" scoped>
    .group-container{
      width: 90%;
      background-color: rosybrown;
      position: relative;
    }

    //给table弄一个浅灰色外边框
    .tableBox{  
        border: 1px solid rgb(214, 214, 214);
        width: 100%;
    }

    //点击“新建团队”后的弹框
    .editCreateGroup{
      width: 100%;
      // height: 100px;
      background-color: rgba($color: snow, $alpha: 1.0);
      margin-top: 20px;

      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    //table的标题
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

    //'新建团队'按钮
    .el-button{
      position: absolute;
      right: 10px;
    }

    //新建团队弹框的 标题
    .dialogTitle{
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #eaeaea;
      span{
        font-size: 14px;
        color: rgba($color: rgb(102, 99, 99), $alpha: 0.7);
      }
    }

  .el-form{  //让form的输入框不要贴到右边
    padding-right: 20px;
  }

  .el-form-item {
    margin-top: 20px;
  }
</style>


