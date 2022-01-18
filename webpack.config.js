const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'dist', 'src', 'server.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist', 'bundle'),
    clean: true,
  },
  mode: 'production',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js'],
  },
  target: 'node',
};
