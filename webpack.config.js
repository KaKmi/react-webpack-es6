/**
 * Created by Jared on 16/1/6.
 */
 
 
 
 
 
 
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var merage = require('webpack-merge');
var webpack = require('webpack');
const  TARGET =process.env.npm_lifecycle_event;

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const  common ={
    entry:PATHS.app,
    resolve:{
        extensions:['','js','jsx']
    },
    output:{
        path:PATHS.build,
        filename:'bundle.js'
    },
    module:{
      loaders:[
          {
              test:/\.css$/,
              loaders:['style','css'],
              include:PATHS.app
          },
          {
              test:/\.jsx?$/,
              loaders:['babel'],
              include:PATHS.app
          }
      ]
    },
    plugins:[
        new HtmlwebpackPlugin({

            template: 'node_modules/html-webpack-template/index.html',
            title: 'Kanban app',
            appMountId: 'app'
        })
    ]
};

if(TARGET ==='start' ||!TARGET){
    module.exports = merage(common,{
        devtool:'eval-source-map',
        devServeer:{
            historyApiFallback:true,
            hot:true,
            inline:true,
            process:true,
            stats:'errors-only',
            host:process.env.HOST,
            port:process.env.PORT
        },
        plugins:[
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if(TARGET ==='build'){
    module.exports = merage(common,{});
}
