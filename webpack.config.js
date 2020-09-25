const webpack                        = require('webpack');
const MiniCSSExtractPlugin           = require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin                   = require('terser-webpack-plugin');

const terserPlugin = new TerserPlugin({
  terserOptions: {
    compress: {
      drop_console: true
    }
  }
});

module.exports = [{
  mode: 'development',
  entry: {
    app: [
      './src/main.tsx',
      './src/main.css'
    ]
  },
  output: {
    globalObject: 'this',
    filename: '[name].js',
    path: `${__dirname}/assets`,
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.png$/,
        use: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json']
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        config: {
          path: './postcss.config.js'
        }
      }
    }),
    new MiniCSSExtractPlugin({
      filename: 'app.css',
      path: `${__dirname}/assets/`
    }),
    new OptimizeCSSAssetsWebpackPlugin({
      cssProcessorOptions: {
        map: {
          inline: false
        }
      }
    })
  ],
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      terserPlugin
    ],
    splitChunks: {
      chunks: 'all',
      name: 'vendor'
    }
  },
  devtool: 'source-map',
  devServer: {
    contentBase: __dirname
  }
},
{
  mode: 'development',
  entry: {
    register: [
      './src/register-service-worker.ts'
    ],
    sw: [
      './src/service-worker.ts'
    ]
  },
  output: {
    globalObject: 'this',
    filename: '[name].js',
    path: __dirname,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      terserPlugin
    ]
  }
}];
