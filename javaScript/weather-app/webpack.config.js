const path = require("path");

module.exports = {
  mode: "development",   // fixes the warning
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    static: "./dist",
    hot: true,
    watchFiles: {
      paths: ["src/**/*"],
      options: {
        usePolling: true, // fixes Termux permission error
      },
    },
  },
};
