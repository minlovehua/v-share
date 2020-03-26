
const path=require('path')

//导入 在内存中自动生成HTML页面的插件 html-webpack-plugin
const htmlWebpackPlugin=require('html-webpack-plugin')

//Vue Loader v15版本 需要一个插件来辅助才能正常运行
const VueLoaderPlugin = require('vue-loader/lib/plugin')

//webpack.config.js其实就是一个js文件。通过node模块操作，将配置对象暴露出去
module.exports={
    //入口：表示要使用webpack打包哪个文件
    entry:path.join(__dirname,'./src/main.js'), 
    //出口：打包好的文件输出到哪个目录中的哪个文件
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js' //如果没有这个文件，会自动生成一个
    },
    //设置mode
    mode:'development',
    //只要是插件都要放在plugins节点中去
    plugins:[      //webpack配置文件中，除了exports之外，所有以s结尾的都是数组[],而在vue中以s结尾的是对象{}。
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'), //指定页面模板
            filename:'index.html' //指定内存中生成页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']}, //css文件匹配规则
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, //sass文件匹配规则
            //{test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=33497&name=[hash:8]-[name].[ext]'}, //处理图片url地址。
            {test:/\.(jpg|png|gif|bmp|jpeg)$/, //处理图片url地址。
                use: [{
                  loader: 'url-loader',
                  // loader: 'file-loader',
                  options: {
                    esModule: false, // 这里设置为false
                    name: '[hash:8]-[name].[ext]',
                    limit: 33497
                  }
                }]
            },
            //图片小于或等于33497字节会被Base64编码，减少二次请求。规定打包后的图片url与打包前同名同后缀。通过哈希值区分开不同内容却同名的图片。
            {test:/\.(otf|ttf|eot|svg|woff|woff2)$/,use:'url-loader'},//处理字体图标
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/}, //将ES6高级语法转换为低级语法
            {test:/\.vue$/,use:'vue-loader'} //处理.vue文件的loader
        ] 
    },
    resolve:{
        alias:{  //修改vue被导入时的包的路径,解决 “runtime-only”问题
            "vue$":"vue/dist/vue.js"
        }
    }
}



//指定了entry和output属性后，使用webpack打包时，不需要通过命令“webpack entry路径 output路径”，只需要命令“webpack”即可。
//在控制台输入“webpack”命令后，webpack做了什么？
//1.首先webpack发现我们并没有通过命令的形式指定打包的入口和出口。
//2.webpack就会去项目的根目录，查找webpack.config.js的配置文件。
//3.webpack解析并执行这个配置文件，得到配置文件中导出的配置对象。
//4.webpack拿到配置对象后，就得到了配置对象中指定的入口和出口，然后进行打包构建。