<template>
    <div>
        <el-button type="primary" @click.stop="refreshCode">生成邀请码</el-button>
        <div class="s-canvas">
            <canvas ref="sCanvas" :width="contentWidth" :height="contentHeight"></canvas>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'SIdentify',
    props: {
      identifyCode: {
        type: String,
        default: '3128'
      },
      fontSizeMin: {
        type: Number,
        default: 16
      },
      fontSizeMax: {
        type: Number,
        default: 40
      },
      backgroundColorMin: {
        type: Number,
        default: 180
      },
      backgroundColorMax: {
        type: Number,
        default: 240
      },
      colorMin: {
        type: Number,
        default: 50
      },
      colorMax: {
        type: Number,
        default: 160
      },
      lineColorMin: {
        type: Number,
        default: 40
      },
      lineColorMax: {
        type: Number,
        default: 180
      },
      dotColorMin: {
        type: Number,
        default: 0
      },
      dotColorMax: {
        type: Number,
        default: 255
      },
      contentWidth: {
        type: Number,
        default: 112
      },
      contentHeight: {
        type: Number,
        default: 38
      }
    },
    methods: {
        refreshCode(){
            this.drawPic();
        },
      // 生成一个随机数
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      // 生成一个随机的颜色
      randomColor(min, max) {
        // let r = this.randomNum(min, max)
        // let g = this.randomNum(min, max)
        // let b = this.randomNum(min, max)
        return 'rgb(' + this.randomNum(min, max) + ',' + this.randomNum(min, max) + ',' + this.randomNum(min, max) + ')'
      },
      drawPic() {
        // let canvas = this.$refs.sCanvas
        const cTx = this.$refs.sCanvas.getContext('2d')
        cTx.textBaseline = 'bottom'
        // 绘制背景
        cTx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax)
        cTx.fillRect(0, 0, this.contentWidth, this.contentHeight)
        // 绘制文字
        for (let i = 0; i < this.identifyCode.length; i++) {
          this.drawText(cTx, this.identifyCode[i], i)
        }
        this.drawLine(cTx)
        this.drawDot(cTx)
      },
      drawText(ctx, txt, i) {
        ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax)
        ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
        const x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
        const y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
        // var deg = this.randomNum(-45, 45)
        var deg = this.randomNum(-0, 0)
        // 修改坐标原点和旋转角度
        ctx.translate(x, y)
        ctx.rotate(deg * Math.PI / 180)
        ctx.fillText(txt, 0, 0)
        // 恢复坐标原点和旋转角度
        ctx.rotate(-deg * Math.PI / 180)
        ctx.translate(-x, -y)
      },
      drawLine(ctx) {
        // 绘制干扰线
        for (let i = 0; i < 0; i++) {
          ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax)
          ctx.beginPath()
          ctx.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
          ctx.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
          ctx.stroke()
        }
      },
      drawDot(ctx) {
        // 绘制干扰点
        for (let i = 0; i < 10; i++) {
          ctx.fillStyle = this.randomColor(0, 255)
          ctx.beginPath()
          ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI)
          ctx.fill()
        }
      }
    },
    watch: {
    identifyCode() {
        this.drawPic()
    }
    },
    mounted() {
        this.drawPic()
    }
  }
</script>

<style lang="scss" scoped>
    .refreshCode{
        width: 100px;
        height: 100px;
        background-color: cadetblue;
    }
</style>