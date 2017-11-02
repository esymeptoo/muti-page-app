var path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    OpenBrowserPlugin = require('open-browser-webpack-plugin');

let entry = {}
if (process.env.NODE_ENV === 'production') {
    Object.assign(entry, {
        index: [
            './src/main.js'
        ],
        bar: [
            './src/bar.js'
        ]
    })
} else {
    Object.assign(entry, {
        index: [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './src/main.js'
        ],
        bar: [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './src/bar.js'
        ]
    })
}
module.exports = {
    entry: entry,
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './build'),
        publicPath: ''
    },
    context: __dirname,
    module: {
        rules: [{
            test: /\.less$/, // 解析scss文件
            use: process.env.NODE_ENV === 'production' ? ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "less-loader"]
            }) : ['style-loader', 'css-loader?sourceMap', 'less-loader?sourceMap']
        }, {
            test: /\.(jpg|png)$/,
            use: [
                'url-loader?limit=10000&name=img/[name].[ext]'
            ]
        }, {
            test: /\.html$/,
            use: {
                loader: 'html-loader',
                options: {
                    interpolate: 'require'
                }
            }
        }, {
            test: /\.ejs$/,
            loader: 'ejs-loader'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    },
    plugins: process.env.NODE_ENV === 'production' ? [
        new HtmlWebpackPlugin({
            template: './views/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './views/bar.html',
            filename: 'bar.html',
            chunks: ['bar']
        }),
        new ExtractTextPlugin("style.css"),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        // 压缩js文件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),

        // 给打包文件加上你的签名
        new webpack.BannerPlugin({
            banner: 'This is created by little e'
        }),
        new webpack.optimize.CommonsChunkPlugin("vendor.bundle.js")
    ] : [
        new HtmlWebpackPlugin({
            template: './views/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './views/bar.html',
            filename: 'bar.html',
            chunks: ['bar']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        // new OpenBrowserPlugin({
        //     url: 'http://localhost:8080/'
        // }) // 自动在浏览器中打开 http://localhost:8080/
    ],
    //开发环境devServer和proxxy代理
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        hot: true,
        noInfo: false,
        proxy: {
            '/users': {
                target: 'http://lln.adminad.com/',
                secure: false
            }
        }
    },
    devtool: 'source-map',

    // 打包时将不会把以下第三方库打包进webpack.bundle.js中但可被webpack全局调用，比如说jquery，但需要在html文件中用script引入jquery
    externals: {
        zepto: 'zepto'
    },

    // 改变模块的处理方式
    resolve: {
        extensions: ['.js', '.scss', '.html', '.ejs', '.less'], // eg：入口文件改成webpack.entry，打包时webpack会先检索webpack.entry文件，返回结果为空时给文件补上.js文件尾缀再继续检索，依此类推。
        alias: {
            // 这里可以给一些常用的模块添加别名，可以减少webpack查找该模块的时间，比如说：vue
            // 'vue': 'vue/dist/vue.common.js'
        }
    }
};
