let webpack = require('webpack')
let path = require('path')
let nodeExternals = require('webpack-node-externals')

const rootPath = path.resolve(__dirname)
const sourcePath = path.join(rootPath, 'src')
const distPath = path.join(rootPath, 'dist')

module.exports = {
  context: __dirname, // needed?
  entry: {
    'server': path.join(sourcePath, 'index.ts')
  },
  target: 'node',
  devtool: '#source-map', // or eval-source-map
  output: {
    path: distPath,
    filename: '[name].js',
  },
  resolve: {
    alias: {
      '@': sourcePath
    },
    // modules: [sourcePath, "node_modules"],
    extensions: [
      '.js',
      '.vue',
      '.json',
      '.ts',
    ],
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: '/node_modules/',
      use: [
        // If only ts-loader is listed here, not babel-loader, then typescript
        // is converted to ES6. If babel-loader is included then ES5 is output.
        // { loader: 'babel-loader' },
        {
          loader: 'ts-loader',
          options: {
            // transpileOnly: true,
            // happyPackMode: false
          }
        }
      ]
    }]
  },
  plugins: [
    // new CleanWebpackPlugin({root: rootPath})
  ],
  externals: [nodeExternals()],
  watchOptions: {
    ignored: /node_modules/
  }
}
