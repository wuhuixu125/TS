const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.ts',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        //告诉webpack不使用箭头函数
        environment:{
            arrowFunction:false
        }
    },
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    //兼容目标浏览器
                                    targets: {
                                        'chrome': '58',
                                        'ie':'11'
                                    },
                                    //corejs版本
                                    'corejs': '3',
                                    //使用corejs的方式'usage'按需加载
                                    'useBuiltIns': 'usage'
                                }
                            ]
                        ]
                    }
                }, 'ts-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({ template: './src/index.html' }
        )
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
}