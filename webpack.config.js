import path from 'path' // Import path module

export default {
  entry: './src/index.js', // Adjust the entry point to your project's main file
  output: {
    filename: 'bundle.js', // Output file name
    path: path.resolve(new URL(import.meta.url).pathname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
}
