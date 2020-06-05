<template>
    <!-- 团队界面 -->
    <div class="group-container">
      <div class="groupbox">
        <!-- 展示团队 -->
        <div class="left">
          <div class="leftson">
            <i class="el-icon-s-home"></i>
            <div class="groupName">{{$store.state.groupName}}</div>
            <span>{{$store.state.description}}</span>
          </div>
        </div>
        <!-- 展示团队成员 -->
        <div class="right">
          <div class="members">
            <h3>已有成员</h3>
            <div  v-for="item in members" :key="item.username" style="display:inline-block">
                <span><i class="el-icon-user"></i>&nbsp;&nbsp;{{item.username}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>
          </div>
          <div class="codes"  v-if="$store.state.role==1?true:false">
            <h3>邀请新成员</h3>
            可用邀请码<br/>
            <div v-for="item in useCode" :key="item.id" style="display:inline-block;margin-bottom: 5%;">
              <span>{{item.code}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>
            <br/>
            <el-button type="primary" size="small" @click="randomCode" style="foat: left;">生成邀请码</el-button>
            <span v-text="identityCode.code"></span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          members:[], //团队成员
          msg:'',     //测试
          identityCode:{  //邀请码
              code:'',
              flag:'true'
          },
          jschars:['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
          'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
          useCode:[] //可用邀请码
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
        
        this.getAllMember(); //获取团队所有成员
        this.getUseCode();   //获取可用邀请码
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
        randomCode(){   //生成随机邀请码 (将0-9，A-Z放在一个数组里。6次随机生成数组下标，将下标对应的数字或字符进行拼接。)
            var newCode = "";
            for (var i = 0; i < 6 ; i++) {
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
        getUseCode(){   //获取可用邀请码
          this.$axios.get(this.HOST+'/api/getUseCode').then(result=>{
            if(result.data.msg == '查询可用邀请码失败'){
              this.msg = result.data.msg;
            }else{
              this.useCode = result.data.code;
              console.log(result.data)
            }
          }).catch(err=>console.log(err))
        }
      }
    }
</script>

<style lang="scss" scoped>
    .group-container{
      width: 100%;
      height: 100%;
      position: relative;
      background-size: cover;
      color: white;

      .groupbox{
        width: 70%;
        min-height: 500px;
        border: 1px solid rgb(12, 12, 11);
        background-color: rgba($color: snow, $alpha: 0.1);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        display: flex;
        justify-content: space-between;
        .left{
          width: 40%;
          border-right: 1px solid rgb(211, 209, 209);
          padding: 50px 20px;
          position: relative;
          background: url('../../images/groupLeft.jpg');
          background-size: cover;
          .leftson{
            width: 80%;
            position: absolute;
            left: 50%;
            top: 30%;
            transform: translate(-50%,-50%);
            .groupName{
              font-weight: 900;
              font-size: 22px;
              margin-bottom: 18%;
            }
          }
        }
        .right{
          width: 60%;
          background: url('../../images/groupRight.jpg');
          background-size: cover;
          .members{
            text-align:left;
            padding:50px 20px;
          }
          .codes{
            text-align:left;
            padding:50px 20px;
          }
        }
      }
    }
</style>