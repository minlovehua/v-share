<template>
    <div class="comment-container">
        <h3>发表评论</h3>
        <!-- <hr> -->
        <textarea placeholder="请输入评论内容(最多输入120字)" maxlength="120" v-model="msg"></textarea><br/>
        <el-button type="primary" size="small" @click="postComment">发表评论</el-button>
        <div class="comment-list">
            <div class="comment-item" v-for="(item,i) in comments" :key="i">
                <span class="user"><i class="el-icon-user"></i>&nbsp;{{item.user_name}}</span> &nbsp;
                <span class="time"><i class="el-icon-time"></i>&nbsp;{{item.add_time|dateFormat}}</span> &nbsp;&nbsp; 
                <span>{{item.content === 'undefined'?'此用户很懒，啥也没说。' : item.content}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            pageIndex:1, //默认展示第1页数据
            comments:[],  //所有的评论数据
            msg:'',        //评论框输入的内容
            comment:{
                doscId:this.id,                        //评论所属文档的ID
                user_name:this.$store.state.username,  //评论人
                add_time:new Date(),
                //add_time:Date.now(),                    //评论时间
                content:''                              //评论的内容
            }
        };
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


        this.getComments(); //别老是忘记前面的 this.
    },
    methods:{
        getComments(){ //获取评论
            // console.log(this.id)
            this.$axios.get(this.HOST+'/api/getComment/'+this.id)
            .then(result=>{
                if(result.data.msg == '获取评论成功'){
                    console.log(result.data.comments)
                   this.comments=result.data.comments;
                }else{
                    Toast("获取评论数据失败！");
                }
            })
            .catch(err=>{
                console.log(err);
            })   
        },
        postComment(){ //发表评论
            //校验评论内容是否为空
            if(this.msg.trim().length === 0){
                return Toast("评论内容不能为空！");
            }
            this.comment.content = this.msg.trim();
            // this.comment.add_time = Date.now();
            this.comment.add_time = new Date();
            //将数据插入数据库
            this.$axios.post(this.HOST+'/api/postComment',{comment:this.comment})
            .then(result=>{
                if(result.data.msg == '评论插入数据库成功'){
                    this.getComments();
                    this.msg = "";  //清空评论输入框
                }else{
                    console.log(result.data.msg);
                }
            })
            .catch(err=>{
                console.log(err);
            })   
        }
    },
    props:["id"]  //props 是子组件拿取父组件数据的唯一通道
}
</script>

<style lang="scss" scoped>
    .comment-container{
        background-color: rgb(232, 247, 181);
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        min-height: 300px;
        margin-bottom: 20px;
        border-radius: 5px;
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;  //让textarea和“发表评论”按钮之后的间隙小一点
            width: 80%;
        }
        .comment-list{
            margin: 5px 0;
            .comment-item{
                font-size: 16px;
                border-bottom: 1px dashed rgb(187, 186, 186);
                padding: 15px;
                .user{
                    font-weight: 900;
                }
                .time{
                    color: grey;
                    font-size: 14px;
                }
            }
        }
    }
</style>
