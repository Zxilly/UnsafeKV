const path = require("path");
module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-cheap-module-source-map',
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    stats: {
        colors: true,
        reasons: true
    },
    target: "webworker",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'worker.js',
        sourceMapFilename: "worker.js.map",
    },
};
