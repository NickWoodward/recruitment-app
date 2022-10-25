const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");

module.exports = {
    entry: { 
        index: "./src/js/controllers/indexController.js",
        admin: "./src/js/controllers/adminController.js",
        common: './src/js/controllers/commonController.js',
    },

    module: {
        rules: [
            {
                // test: /\.tsx?$/,
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/,
                type: 'javascript/auto',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: 'asset/resource'
              },
              {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: 'svg/spritesheet.svg'
                        },
                    },
                    'svgo-loader',
                ],
                type: 'javascript/auto',
            },
            {
                test: /\.html$/,
                use: 'html-loader',
                type: 'javascript/auto',
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        // clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index', 'common'],
            // publicPath: 'auto',
            // cache: false
        }),
        new HtmlWebpackPlugin({
            filename: 'admin.html',
            template: './src/admin.html',
            chunks: ['admin', 'common'],
            // publicPath: 'auto',
            // cache: false
        }),
        new SpriteLoaderPlugin()
    ]
}