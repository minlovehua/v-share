<template>
    <div>
        <!-- 编辑文档 -->
        <div class="editDoscHeader">
            <!-- 返回工作台、文档列表 -->
            <el-dropdown>
                <span class="el-dropdown-link">
                    <i class="el-icon-s-grid"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="toplateform">返回团队发布</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>&nbsp;&nbsp;&nbsp;
            <span>{{doscForm.storeName}}</span>
            &nbsp;&nbsp;&nbsp;/&nbsp;
            <!-- 这里的el-input必须给个宽度width，否则不会显示这个输入框 -->
            <el-input style="width:30%;" v-model="doscForm.doscName" placeholder="请输入内容"></el-input>
            <span style="color:skyblue;" id="Msg">{{this.msg}}</span>
            <button class="submitButton" @click="submit">更新</button>
        </div>
        
        <div>   <!-- markdown编辑器 -->
            <mavon-editor 
                v-model="doscForm.content" 
                ref="md" 
                @change="change" 
                style="min-height: 600px"/>
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
                doscForm:{
                    id:this.$route.params.dosc.id,              //唯一标识一个文档
                    doscName:this.$route.params.dosc.doscName,  //文档标题  默认无标题
                    content:this.$route.params.dosc.content,    //输入的markdown
                    html:this.$route.params.dosc.html,          //及时转的html
                    storeName:this.$route.params.dosc.storeName,//当前这篇文档所属知识库
                    author:this.$route.params.dosc.author,      //作者
                    status:'未发布',                            //默认 未发布
                }
            }
        },
        methods: {
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
                            this.$router.replace('/platform/document');
                        }else{
                            console.log(result.data.msg);
                        }
                    }).catch(err=>console.log(err))                    
                }
            },
            toplateform(){         //返回 团队发布
                this.$router.replace('/platform').catch(data => {  });
            },
        }
    }
</script>

<style lang="scss" scoped>
    .title{
        font-weight: 900;
    }
    .editDoscHeader{
        height: 50px;  
        line-height: 50px;
        border-bottom: 1px solid rgba($color: grey, $alpha: 0.3);
        padding-left: 10px;
        position: relative;
    }
    .time{
        font-size: 14px;
        color:grey;
    }
    .el-dropdown-link { //下拉框
        cursor: pointer;
        color: gray;
        font-size: 22px;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .submitButton{
        position: absolute;
        right: 1%;
        top: 50%;
        transform: translateY(-50%);
    }
</style>