<template>
    <!-- 文档界面 -->
    <div class="tableBox">
        <div class="title">文档<el-button type="primary" size="small">新建文档</el-button></div>
        <el-table
        :data="tableData"
        style="width: 100%"
        fit>
        <el-table-column
            prop="name"
            label="名称">
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态">
        </el-table-column>
        <el-table-column
            prop="whose"
            label="归属">
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
            name:'web前端开发haha',
            status:'未发布',
            whose:'花花',
            edit:'编辑'
          }, {
            name:'web前端开发',
            status:'未发布',
            whose:'花花',
            edit:'编辑'
          },{
            name:'web前端开发',
            status:'未发布',
            whose:'花花ddddddddddd',
            edit:'编辑'
          }, {
            name:'web前端开发',
            status:'未发布',
            whose:'花花',
            edit:'编辑'
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

    .el-button{
      position: absolute;
      right: 10px;
    }
</style>


