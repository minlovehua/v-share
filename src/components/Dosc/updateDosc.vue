<template>
    <div class="update-container">
        <!-- 编辑文档 -->
        <div class="editDoscHeader">
            <!-- 面包屑 左上角显示“我的文档/知识库”-->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/platform/document' }">我的文档</el-breadcrumb-item>
                <el-breadcrumb-item>{{doscForm.storeName}}</el-breadcrumb-item>
            </el-breadcrumb> &nbsp;&nbsp;

            <!-- 这里的el-input必须给个宽度width，否则不会显示这个输入框 -->
            <el-input style="width:30%;" v-model="doscForm.doscName" placeholder="请输入内容"></el-input>
            <span style="color:skyblue;" id="Msg">{{this.msg}}</span>
            <button class="submitButton" @click="submit">更新</button>
        </div>
        <!-- markdown编辑器 -->
        <div>   
            <mavon-editor v-model="doscForm.content" ref="md" @change="change" style="min-height: 600px"/>
        </div>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        components: {
            mavonEditor,
        },
        data() {
            return {
                msg:'',
                doscForm:{},
                flag:this.$route.params.flag
            }
        },
        created(){
            this.getDosc();
        },
        methods: {
            getDosc(){
                //解决了直接用this.$route.query.dosc时页面刷新之后数据会丢失的问题（第二步）。第一步在platform.vue
                this.doscForm = JSON.parse(sessionStorage.getItem("updateDosc"))
            },
            change(value, render){ // markdown编辑器的所有操作都会被解析重新渲染
                this.doscForm.html = render;  // render 为 markdown 解析后的结果[html]
            },
            submit(){              // 提交修改后的文档
                if(this.doscForm.content == ''){
                    this.msg = '文档内容不能为空';
                }else if(this.doscForm.doscName == '' || this.doscForm.doscName == '无标题'){
                    this.msg = '给文档起个标题吧';
                }else{
                    this.$axios.post(this.HOST+'/api/updateDosc',this.doscForm).then(result=>{ //将数据插入数据库
                        if(result.data.msg == '更新文档成功'){
                            this.msg = '更新文档成功';
                            if(this.flag == '1'){ //其它人修改，回到lookDosc界面
                                // 修改完后，回到查看全文界面
                                sessionStorage.setItem("dosc",JSON.stringify(this.doscForm))
                                this.$router.push({ name: '/lookDosc', query:{dosc:this.doscForm}}).catch(data=>{});
                                // 修改完后,回到团队发布界面
                                // this.$router.replace('/platform');
                            }else{ //作者修改，回到“我的文档界面”
                                this.$router.replace('/platform/document');
                            }
                        }else{
                            console.log(result.data.msg);
                        }
                    }).catch(err=>console.log(err))                    
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .update-container{
        min-height: 100%;
        background-color: #fff;
        .editDoscHeader{
            height: 50px;  
            line-height: 50px;
            border-bottom: 1px solid rgba($color: grey, $alpha: 0.3);
            padding-left: 10px;
            position: relative;
            .submitButton{
                position: absolute;
                right: 1%;
                top: 50%;
                transform: translateY(-50%);
            }
            .el-breadcrumb{
                display: inline-block;
            }
        }
    }
</style>