<template>
    <div class="comment-container">
        <h3>发表评论</h3>
        <!-- <hr> -->
        <textarea placeholder="请输入评论内容(最多输入120字)" maxlength="120" v-model="msg"></textarea><br/>
        <el-button type="primary" size="small" @click="postComment">发表评论</el-button>
        <div class="comment-list">
            <div class="comment-item">   <!-- v-for="(item,i) in comments" :key="i" -->
                <span class="user"><i class="el-icon-user"></i>&nbsp;评论人</span> &nbsp;&nbsp; <span class="time">评论时间</span> &nbsp;&nbsp; <span>评论内容</span>
                <!-- 第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|dateFormat}} -->
                <!-- <div class="comment-body">{{item.content === 'undefined'?'此用户很懒，啥也没说。' : item.content}}</div> -->
            </div>
            <div class="comment-item">   <!-- v-for="(item,i) in comments" :key="i" -->
                <span class="user"><i class="el-icon-user"></i>&nbsp;评论人</span> &nbsp;&nbsp; <span class="time">评论时间</span> &nbsp;&nbsp; <span>评论内容</span>
                <!-- 第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|dateFormat}} -->
                <!-- <div class="comment-body">{{item.content === 'undefined'?'此用户很懒，啥也没说。' : item.content}}</div> -->
            </div>
            <div class="comment-item">   <!-- v-for="(item,i) in comments" :key="i" -->
                <span class="user"><i class="el-icon-user"></i>&nbsp;评论人</span> &nbsp;&nbsp; <span class="time">评论时间</span> &nbsp;&nbsp; <span>评论内容</span>
                <!-- 第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|dateFormat}} -->
                <!-- <div class="comment-body">{{item.content === 'undefined'?'此用户很懒，啥也没说。' : item.content}}</div> -->
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
            msg:''  //评论框输入的内容
        };
    },
    created(){
        // this.getComments(); //别老是忘记前面的 this.
    },
    methods:{
        getComments(){ //获取评论
            //http://www.liulongbin.top:3005/api/getcomments/:artid?pageindex=1
            this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result=>{
                if(result.body.status === 0){
                    //console.log(result.body);
                    //this.comments = result.body.message;
                    //每当获取新评论，不要把旧数据清空，而是新数据拼接到旧数据后面
                    this.comments=this.comments.concat(result.body.message);
                }else{
                    Toast("获取评论数据失败！");
                }
            });
        },
        postComment(){ //发表评论
            //校验评论内容是否为空
            if(this.msg.trim().length === 0){
                return Toast("评论内容不能为空！");
            }

            //请求的url地址(完整)：http://www.liulongbin.top:3005/api/postcomment/:artid
            //参数1：请求的url地址  api/postcomment/:artid
            //参数2：提交给服务器的数据对象{content:this.msg}
            //参数3：定义提交时候，表单中数据的格式 {emulateJSON:true} 
            //每次发post请求都要{emulateJSON:true} 这样子指定很麻烦。可以在main.js中全局配置,而不在这里传参数3
            //.trim() 去掉字符串首尾的空格
            this.$http.post("api/postcomment/"+this.$route.params.id,{content:this.msg.trim()})
            .then(function(result){
                if(result.body.status === 0){
                    //拼接处一个新评论的对象
                    var newCommet = {
                        user_name:"匿名用户",
                        add_time:Date.now(),
                        content:this.msg.trim()
                    };
                    this.comments.unshift(newCommet); //将新评论添加到评论数组开头
                    this.msg = "";  //清空评论输入框
                }
            });
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
                border-bottom: 1px dashed grey;
                padding: 15px;
                // .comment-title{
                //     line-height: 30px;
                //     background-color: #ccc;
                // }
                // .comment-body{
                //     line-height: 35px;
                //     text-indent: 2em; //缩进2em
                // }
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
