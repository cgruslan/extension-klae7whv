module.exports = {
  entry: {
    background: './src/background',
    popup: './src/popup',
    content: './src/content',
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist`,
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
};
