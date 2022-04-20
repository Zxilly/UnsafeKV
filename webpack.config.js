const path = require("path");

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    node: false,
    mode: 'production',
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            "path": require.resolve("path-browserify"),
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
    },
};
