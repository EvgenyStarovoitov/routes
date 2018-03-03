import path from 'path';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const publicPath         = 'http://localhost:8050/dist';
const cssName            = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';
const jsName             = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js';

module.exports = {
  entry: ['babel-polyfill', './src/client.js'],
  plugins: [
    new CleanWebpackPlugin([ 'dist' ]),
    new ExtractTextPlugin({
      filename: cssName,
      disable: false,
      allChunks: true
    })
    // new HtmlWebpackPlugin({
    //   title: 'Output Management'
    // })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: jsName,
    publicPath
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:[
          { loader: 'babel-loader' },
          { loader: 'eslint-loader',
            options: {
              fix: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          { loader: 'url-loader'}
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};
