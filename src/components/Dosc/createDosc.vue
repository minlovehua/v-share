<template>
    <div class="createDosc-container">
        <!-- 编辑文档 -->
        <div class="editDoscHeader">
            <!-- 左上角显示“我的文档/知识库名称” -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/platform/document' }">我的文档</el-breadcrumb-item>
                <!-- <el-breadcrumb-item>{{doscForm.storeName}}</el-breadcrumb-item> -->
                <el-breadcrumb-item>{{storeName}}</el-breadcrumb-item>
            </el-breadcrumb> &nbsp;&nbsp;

            <!-- 这里的el-input必须给个宽度width，否则不会显示这个输入框 -->
            <el-input style="width:30%;" v-model="doscForm.doscName" placeholder="请输入文档标题"></el-input>
            <span style="color:skyblue;" id="Msg">{{this.msg}}</span>
            <button class="submitButton" @click="submit">提交</button>
        </div>     
        <div class="markdownEditor">
            <!-- markdown编辑器插件 -->
            <mavon-editor v-model="doscForm.content" ref="md" @change="change" style="min-height: 670px"/>
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
                storeName:this.$route.query.storeName,  //添加
                doscForm:{
                    store_id:this.$route.query.storeId,  //当前这篇文档所属知识库
                    doscName:'无标题',                    //文档标题  默认无标题
                    author:this.$store.state.username,    //作者
                    status:'未发布',                      //默认 未发布
                    content:'',                          //输入的markdown
                    html:'',                             //及时转的html
                    updateTime:new Date()                //提交时间
                }
            }
        },
        created(){
            // created钩子函数：实例已经在内存中创建OK，此时 data 和 methods 已经创建OK，此时还没有开始 编译模板。
            //解决主页刷新之后store中数据丢失(导致主页右上角当前登录用户名消失)的问题 --- 第三步(共三步)
            //2.在页面加载时再从localStorage里将数据取回来放到vuex里。
            //在页面加载时读取localStorage里的状态信息
            localStorage.getItem("stateMsg") && 
            this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("stateMsg"))));
            //在页面刷新时将vuex里的信息保存到localStorage里（当浏览器窗口关闭或者刷新时,会触发beforeunload事件。）
            window.addEventListener("beforeunload",()=>{
                localStorage.setItem("stateMsg",JSON.stringify(this.$store.state))
            })
        },
        methods: {
            change(value, render){// 所有操作都会被解析重新渲染到markdown
                this.doscForm.html = render; // render 为 markdown 解析后的结果[html]
            },
            submit(){             // 提交
                if(this.doscForm.content == ''){
                    this.msg = '文档内容不能为空';
                }else if(this.doscForm.doscName == '' || this.doscForm.doscName == '无标题'){
                    this.msg = '给文档起个标题吧';
                }else{
                    this.doscForm.updateTime = new Date();
                    this.$axios.post(this.HOST+'/api/createDosc',this.doscForm).then(result=>{ //将数据插入数据库
                        if(result.data.msg == '新建文档成功'){
                            this.msg = '新建文档成功'
                            this.$router.replace('/platform/document')
                            console.log('createDosc.vue 新建文档成功')
                        }else{
                            console.log('createDosc.vue 新建文档失败')
                        }
                    }).catch(err=>console.log(err))                  
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .createDosc-container{
        background-color:white;
        min-height: 100%;
        .editDoscHeader{
            height: 50px;  
            line-height: 50px;
            border-bottom: 1px solid rgba($color: grey, $alpha: 0.3);
            padding-left: 10px;
            position: relative;
            .el-breadcrumb{
                display: inline-block;
            }
            .submitButton{
                position: absolute;
                right: 1%;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
</style>