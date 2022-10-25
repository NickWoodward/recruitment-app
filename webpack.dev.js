const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(common, { 
    mode: "development",
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 4500,
        open: {
            app: {
              name: 'chrome',
            },
          },
        hot: true,
        compress: true,
        historyApiFallback: true,
        watchFiles: ["src/**/*"]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 
                    'css-loader', 
                    'sass-loader'
                ],
                type: 'javascript/auto',
            },
        ]
    }
});