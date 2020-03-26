<template>
    <!-- 团队界面 -->
    <div class="tableBox">
        <div class="title">我参与的团队<el-button type="primary" size="small">新建团队</el-button></div>
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

</template>

<script>
    export default {
      data() {
        return {
          tableData: [{
            name:'Locus',
            introduction:'这是一个有爱的强大的团队',
            member:'13人'
          }]
        }
      }
    }
</script>

<style lang="scss" scoped>
    //给table弄一个浅灰色外边框
    .tableBox{  
        border: 1px solid rgb(214, 214, 214);
        width: 70%;
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

    //'新建团队'按钮
    .el-button{
      position: absolute;
      right: 10px;
    }
</style>


