const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.join(__dirname , "src"),
  resolve: {
    modules: [
      path.join(__dirname , "src"),
      "node_modules"
    ],
  },
  entry: {
    index: "./js/index.js",
  },
  output: {
    filename: "./prod/js/[name].js",
    path: __dirname,
    publicPath: ""
  },
  module: {
    rules: [
      {
        test: /\.styl$/, 
         use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary 
          use: [
          {
            loader: 'css-loader',
            options: {
              //url: false
            }
          },
          'postcss-loader',
          'stylus-loader'
        ]
      })
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./prod/[name].html"
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "html-loader"
          },
          {
            loader: 'pug-html-loader',
            options: {
              // basedir: "./src/pug/common",
              basedir: "/",
              // options to pass to the compiler same as: https://pugjs.org/api/reference.html
              data: {env: "development"} // set of data to pass to the pug render.
            }
          }
        ]
      }
      ,
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              useRelativePath: true,
              name: '[name].[ext]'
            }
          },
          {
            loader: "image-webpack-loader",
            query: {
              progressive: true,
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              mozjpeg: {
                quality: 25,
              }
            }
          }
        ]
      }
    ]
  },
/*  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "public"),
    publicPath: '/',
    compress: true,
  },*/
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("./prod/css/[name].css")

/*    new CompressionPlugin({
      asset: "[path].gz",
      algorithm: "gzip",
      test: /\.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8
    })*/
  ],
}