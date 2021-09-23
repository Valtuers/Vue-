const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'lte.js'
    },
    devServer: {
        contentBase: path.join(__dirname,'public'),
        compress: false,
        port: 5678
    }
}