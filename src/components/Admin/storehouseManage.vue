<template>
    <div class="box">
        <!-- 知识库管理 -->
        <!-- 知识库1 -->
        <el-card>
            <div slot="header" class="clearfix">
                <i class="el-icon-folder"></i>
                <span>前端开发</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                <span class="storeDesc">关于前端的学习建议关于前端的学习建议关于前端的学习建议关于前端的学习建议</span>
            </div>
            <ul>
                <li class="text item"><div><i class="el-icon-document"></i>&nbsp;&nbsp;Vue23333</div><div>2020-01-05</div></li>
                <li class="text item"><div><i class="el-icon-document"></i>&nbsp;&nbsp;React2333</div><div>2020-01-05</div></li>
                <li class="text item"><div><i class="el-icon-document"></i>&nbsp;&nbsp;Angular233333</div><div>2020-01-05</div></li>
            </ul>
        </el-card>
        <!-- 知识库2 -->
        <el-card>
            <div slot="header" class="clearfix">
                <i class="el-icon-folder"></i>
                <span>前端开发</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button><br/>
                <span class="storeDesc">关于前端的学习建议关于前端的学习建议关于前端的学习建议关于前端的学习建议</span>
            </div>
            <ul>
                <li class="text item"><div><i class="el-icon-document"></i>&nbsp;&nbsp;Vue23333</div><div>2020-01-05</div></li>
                <li class="text item"><div><i class="el-icon-document"></i>&nbsp;&nbsp;React233</div><div>2020-01-05</div></li>
                <li class="text item"><div><i class="el-icon-document"></i>&nbsp;&nbsp;Angular2333</div><div>2020-01-05</div></li>
            </ul>
        </el-card>
        <!-- 知识库3 -->
        <el-card>
            <div slot="header" class="clearfix">
                <i class="el-icon-folder"></i>
                <span>前端开发</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                <span class="storeDesc">关于前端的学习建议关于前端的学习建议关于前端的学习建议关于前端的学习建议</span>
            </div>
            <ul>
                <li class="text item"><div><i class="el-icon-document"></i>&nbsp;&nbsp;Vue2333</div><div>2020-01-05</div></li>
                <li class="text item"><div><i class="el-icon-document"></i>&nbsp;&nbsp;React233</div><div>2020-01-05</div></li>
                <li class="text item"><div><i class="el-icon-document"></i>&nbsp;&nbsp;Angular23</div><div>2020-01-05</div></li>
            </ul>
        </el-card>
        <!-- 知识库4 -->
        <el-card>
            <div slot="header" class="clearfix">
                <i class="el-icon-folder"></i>
                <span>前端开发</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                <span class="storeDesc">关于前端的学习建议关于前端的学习建议关于前端的学习建议关于前端的学习建议</span>
            </div>
            <ul>
                <li class="text item"><div><i class="el-icon-document"></i>&nbsp;&nbsp;Vue233</div><div>2020-01-05</div></li>
                <li class="text item"><div><i class="el-icon-document"></i>&nbsp;&nbsp;React2333</div><div>2020-01-05</div></li>
                <li class="text item"><div><i class="el-icon-document"></i>&nbsp;&nbsp;Angular23</div><div>2020-01-05</div></li>
            </ul>
        </el-card>
        <div style="font-size:30px">+</div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .box{
        display: flex; //弹性布局
        flex-wrap:wrap; //换行，第一行在上方
        justify-content: space-between;
        padding: 1.5%;
    }
    .el-card{
        width: 32%;
        margin: 4px 0;
    }
    .text {
        font-size: 14px;
        text-align: left;
    }

    .item {
        margin-bottom: 5px;
    }

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
    ul{
        padding: 0px;
        margin: 0;
    }
    li{
        display: flex;
        justify-content: space-between;
    }
    .storeDesc{
        font-size:10px;
        color:gray;
        display: inline-block;
        width: 100%; //块级元素的width才有效

        white-space: nowrap; //强制一行显示
        text-overflow:ellipsis; //超出的文字隐藏并显示省略号(...)
        overflow: hidden; //搭配white-space和text-overflow使用
    }
    
    // .el-card__header {  //框架内部的代码怎么改掉它的原有样式
    //     // padding: 18px 20px;
    //     padding: 5px 5px !important;
    //     border-bottom: 1px solid #EBEEF5;
    //     -webkit-box-sizing: border-box;
    //     box-sizing: border-box;
    // }    
</style>
