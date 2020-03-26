<template>
    <!-- 文档界面 -->
    <div class="tableBox">
        <div class="title">知识库<el-button type="primary" size="small">新建知识库</el-button></div>
        <el-table
        :data="tableData"
        style="width: 100%"
        fit>
        <el-table-column
            prop="name"
            label="名称">
        </el-table-column>
        <el-table-column
            prop="whose"
            label="归属">
        </el-table-column>
        <el-table-column
            prop="introduction"
            label="简介">
        </el-table-column>
        <el-table-column
            prop="edit"
            label="操作">
        </el-table-column>
        </el-table>
    </div>

</template>

<script>
    export default {
      data() {
        return {
          tableData: [{
            name:'后端开发',
            whose:'locus',
            introduction:'包括C++服务端, java web之类的',
            edit:'管理'
          }, {
            name:'信安开发',
            whose:'locus',
            introduction:'学习信息安全的建议',
            edit:'管理'
          },{
            name:'算法',
            whose:'locus',
            introduction:'包括数据结构, 算法分析',
            edit:'管理'
          }]
        }
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


