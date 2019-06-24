var path = require('path');
var SRC_DIR = path.join(__dirname, '/react-client/src');
var DIST_DIR = path.join(__dirname, '/react-client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',      
        query: {
          presets: ['react', 'es2015']
       }
      },
      {
              test: [/\.css$/],
              include: path.join(__dirname, '/react-client/src/'),
              use: [{ loader: 'style-loader' }, { loader: 'css-loader', options: { sourceMap: true, modules: true, localIdentName: '[local]___[hash:base64:5]' } }],
            },
    ]
  }
};
