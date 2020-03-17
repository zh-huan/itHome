const webpack = require("webpack");

const path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {

    //页面入口文件配置
    entry: {
        index: "./app/index.js",
        login: "./app/login.js"
    },
    //入口文件输出配置
    output: {
        path: path.resolve(__dirname, ""),
        publicPath:"http://localhost:8901/",
        filename: "dist/app/script/[name].min.js",
        chunkFilename: "dist/app/script/[name].[chunkhash:8].min.js"
    },
    devtool: "source-map",
    //source-map 把映射文件生成到单独的文件，最完整最慢
    //cheap-module-source-map 在一个单独的文件中产生一个不带列映射的Map
    //eval-source-map 使用eval打包源文件模块,在同一个文件中生成完整sourcemap
    //cheap-module-eval-source-map sourcemap和打包后的JS同行显示，没有映射列
    devServer: {
        //contentBase: './static_dev',
        port: 8901,
        compress: true, // 服务器压缩
        open: false, // 自动打开浏览器
        host: '0.0.0.0',
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    module: {
        //加载器配置
        rules: [{
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
			{
                test:/\.js$/,
                exclude:/(node_modules|static_dev\vue_frame\script\lib)/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env'],
                        plugins:[
						    "@babel/syntax-dynamic-import",
						    "@babel/plugin-transform-runtime",
						]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.styl(us)?$/,
                use: ['vue-style-loader', 'css-loader', 'stylus-loader'],
            },
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/,
                loader: 'url-loader'
                // use: [
                //     {
                //         loader: 'url-loader',
                //         options: {
                //             limit: 1,
                //             fallback: 'file-loader',
                //             name: '[name].[hash:7].[ext]',
                //             outputPath:'dist/app/images/',
                //         }
                //     }
                // ],
            }
        ]
    },
    resolve: {
        //模块别名定义
        alias: {
            'vue': 'vue/dist/vue.js',
            '@': path.join(__dirname, './app/src')
        }
    }
};