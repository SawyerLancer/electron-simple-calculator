const MinifyHtmlWebpackPlugin = require('minify-html-webpack-plugin');
let mix = require('laravel-mix');
let fs = require('fs');

mix.copy('resources/views/index.html','src/index.html');
mix.copy('resources/scripts/functions.js','src/dist.js');
mix.copy('resources/fonts/sf-pro-display-cufonfonts/SFPRODISPLAYMEDIUM.OTF','src/SFPRODISPLAYMEDIUM.OTF');
mix.copy('resources/styles/style.css','src/dist.css');
mix.copy('resources/icons/calculator.png','build/icon.png');
mix.copy('resources/icons/calculator.icns','build/icon.icns');
mix.copy('resources/icons/calculator.ico','build/icon.ico');
mix.minify('src/dist.js');
mix.minify('src/dist.css');

mix.webpackConfig({
plugins: [
    new MinifyHtmlWebpackPlugin({
        afterBuild: true,
        src: './resources/views',
        dest: './src',
        rules: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            minifyJS: true,
        }
    })
]
});