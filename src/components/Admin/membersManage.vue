<template>
    <!-- 团队成员管理 -->
    <div>
        <div style="height:100px;text-align:left;padding:20px;">已有成员<br/>
            <div  v-for="item in members" :key="item.username" style="display:inline-block">
                <span><i class="el-icon-user"></i>&nbsp;&nbsp;{{item.username}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>
        </div>
        <hr/>
        <div style="height:100px;text-align:left;padding:20px;">邀请新成员<br/>
            <el-button type="primary" size="small" @click="randomCode">生成邀请码</el-button>
            <span v-text="identityCode.code"></span>
        </div>
        <div>{{msg}}</div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            members:[],
            msg:'', //测试
            identityCode:{  //邀请码
                code:'',
                flag:'true'
            },
            jschars:['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
            'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        }
    },
    created(){ //组件一旦创建便获取成员数据
        this.getAllMember();
    },
    methods:{
        getAllMember(){  //查询团队成员
            this.$axios.get(this.HOST+'/api/getAllMember').then(result=>{
                if(result.data.msg == '查询团队所有成员失败'){
                    this.msg = result.data.msg;
                }else{
                    this.members = result.data.result;
                }
            }).catch(err=>console.log(err))
        },
        randomCode(){   //生成随机邀请码
            var newCode = "";
            for (var i = 0; i < 4 ; i++) {
                var id = Math.ceil(Math.random() * 35);
                newCode += this.jschars[id];
            }
            this.$axios.post(this.HOST+'/api/isCode',{code:newCode,flag:'true'}).then(result=>{  //判断数据库有没有该邀请码
                if(result.data.msg == '该邀请码可以使用'){ //如果数据库没有该邀请码，则插入数据库，并显示在页面上
                    this.identityCode.code = newCode;
                }else{
                    randomCode();  //如果数据库已经有该邀请码，重新生成邀请码
                }
            }).catch(err=>console.log(err))
        },
    }
}
</script>

<style lang="scss" scoped>

</style>