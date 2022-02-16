const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: __dirname + '/src/app.ts',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
        library: "modules"
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['./dist'] }
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'portfolio-webpack',
            template: './src/index.html',
            filename: './index.html',
            templateParameters: {
                myTitle: 'Hello freeCodeCamp!',
                myColor: '#42ff87',
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader'
                }]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}