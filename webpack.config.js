module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    target: "webworker",
    output: {
        path: __dirname,
        filename: "index.js"
    }
};
