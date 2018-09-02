const path = require("path");
const webpack = require("webpack");

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
    filename: "[name].js",
    path: path.join(__dirname, "public"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.styl$/, 
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              //url: false
            }
          },
          'postcss-loader',
          'stylus-loader'
        ]
      },

      {
        test: /\.pug$/,
        use: [
          // {
          //   loader: "file-loader",
          //   options: {
          //     name: "[name].html"
          //   }
          // },
          // {
          //   loader: "extract-loader"
          // },
          {
            loader: "html-loader"
          },
          {
            loader: 'pug-html-loader',
            options: {
              basedir: "/",
              // options to pass to the compiler same as: https://pugjs.org/api/reference.html
              data: {env: "development"} // set of data to pass to the pug render.
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff)$/i,
        use: [
          {
            loader: "file-loader?name=[path][name].[ext]"
          }
          // ,
          // {
          //   loader: "image-webpack-loader",
          //   query: {
          //     progressive: true,
          //     optimizationLevel: 1,
          //     pngquant: {
          //       quality: '65-90',
          //       speed: 4
          //     },
          //     gifsicle: {
          //       optimizationLevel: 1
          //     },
          //     mozjpeg: {
          //       quality: 25,
          //     },
          //     optipng: {
          //       optimizationLevel: 1
          //     },
          //     pngquant: {

          //     }
          //   }
          // }
        ]
      }
    ]
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "public"),
    publicPath: '/',
    compress: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery'
    })
    //new webpack.optimize.UglifyJsPlugin()
  ],
}