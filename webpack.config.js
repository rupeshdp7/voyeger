const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: __dirname + '/src/common_core/player/player.js',
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },{
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'}
            ]
        }, {
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        }, {
            test: /\.(jpg|png|gif|icon|cur)$/,
            use: {
                loader: "file-loader",
                options: {
                    name: "[hash].[ext]",
                    outputPath: "images/"
                }
            }
        }]
    }
};
