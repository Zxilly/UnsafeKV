const path = require("path");
const fs = require("fs");

module.exports = {
    entry: './src/index.ts',
    devtool: 'cheap-module-source-map',
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            "path": false,
            "fs": false
        }
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
