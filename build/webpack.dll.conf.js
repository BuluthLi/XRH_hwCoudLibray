var path = require("path");
var webpack = require("webpack");
module.exports = {
    // mode: "development || "production",
    entry: {
        iView: ['iview']
    },
    output: {
        path: path.join(__dirname, "../src/dll"),
        filename: "[name].dll.js",
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "../src/dll", "[name]-manifest.json"),
            name: "[name]",
        }),
        new webpack.optimize.UglifyJsPlugin({})
    ]
};