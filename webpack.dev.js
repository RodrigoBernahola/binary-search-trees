import { merge } from "webpack-merge";
import common from "./webpack.common.js";

export default merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 600,
    poll: 2000,
  },
  devServer: {
    open: true,
    hot: true,
    watchFiles: ["./src/template.html"],
  },
});
