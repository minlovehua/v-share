<template>
    <div class="box">
        <!-- 知识库管理 -->
        <!-- 知识库 -->
        <el-card v-for="item in storehouse" :key="item.storeName">
            <div slot="header" class="clearfix">
                <i class="el-icon-folder"></i>
                <span>{{item.storeName}}</span>
                <el-dropdown  style="float: right; padding: 3px 0">
                    <span class="el-dropdown-link">
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>编辑</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span class="storeDesc">{{item.storeDesc}}</span>
            </div>
            <ul>
                <li class="text item"><div><i class="el-icon-document"></i>&nbsp;&nbsp;Vue23333</div><div>2020-01-05</div></li>
                <li class="text item"><div><i class="el-icon-document"></i>&nbsp;&nbsp;React2333</div><div>2020-01-05</div></li>
                <li class="text item"><div><i class="el-icon-document"></i>&nbsp;&nbsp;Angular233333</div><div>2020-01-05</div></li>
            </ul>
        </el-card>
        <!-- 新建知识库 -->
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
                    <el-input prefix-icon="el-icon-s-custom" type="text" v-model="storeForm.storeDesc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div>{{msg}}</div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                storeForm:{
                    storeName:'', //知识库名称
                    storeDesc:'',  //知识库简介
                    storeManager:''
                },
                storehouse:[], //存储所有知识库的数组，默认为空
                msg:'', //测试
                //新建知识库的验证规则
                rules:{
                    //验证知识库名称是否合法
                    storeName:[
                        { required: true, message: '请输入知识库名称', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    //验证知识库简介是否合法
                    storeDesc:[
                        { required: true, message: '请输入知识库的简介', trigger: 'blur' },
                        { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        created(){
            this.getAllStore();  //页面一旦创建就展示所有知识库
        },
        methods:{
            createStore(formName){ //创建知识库
                // console.log(this.storeForm);
                this.$refs[formName].validate((valid)=>{
                    if(!valid) return;  //如果valid值为false，则return，不发送请求。
                    //满足登录验证规则，则向服务器端(http://localhost:3009/api/createStore)发送注册请求，同时传递参数(参数2)
                    this.$axios.post(this.HOST+'/api/createStore',this.storeForm).then(result=>{
                        this.msg = result.data.msg;
                        if(result.data.msg == '知识库新建成功'){ //清空表单
                            this.getAllStore();  //重新从数据库获取数据，同步到网页上
                            this.storeForm.storeName = '';
                            this.storeForm.storeDesc = '';
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                });
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .box{
        display: flex; //弹性布局
        flex-wrap:wrap; //换行，第一行在上方
        justify-content: space-between; //两端对齐
        padding: 1.5%;
    }
    .box::after{ //解决“justify-content: space-between;最后一行元素不放满时中间有一块空缺”的问题
        content: '';
        width: 32%; //每块子元素(这里是el-card)的宽度
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
    .add{
        background-color: honeydew;
    }
</style>
