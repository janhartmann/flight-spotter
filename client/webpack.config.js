const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  target: "web",
  devtool: "source-map",
  entry: {
    app: "./src/index.tsx"
  },
  output: {
    path: `${__dirname}/dist`,
    filename: " [name].bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|woff|ico)$/,
        exclude: /(node_modules)/,
        loader: "file-loader",
        query: {
          name: "assets/[name].[ext]?[hash]"
        }
      }
    ]
  },
  node: {
    fs: "empty"
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true
      })
    ],
    splitChunks: {
      chunks: "async",
      name: true,
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial"
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/favicon.ico"
    }),
    new Dotenv()
  ],
  resolve: {
    extensions: [".mjs", ".js", ".json", ".jsx", ".ts", ".tsx"]
  },
  devServer: {
    historyApiFallback: true,
    port: 3000
  }
};
