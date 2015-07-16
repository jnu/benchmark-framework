var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var path = require('path');


// Base config

var config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        "benchmark-framework": "./main"
    },
    plugins: [],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ],
        noParse: [/node_modules[\/\\]benchmark/]
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    }
};


// Prod config

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new UglifyJsPlugin());

    config.output.filename = "[name].min.js";
}

module.exports = config;