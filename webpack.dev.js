import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import ESLintPlugin from "eslint-webpack-plugin";

export default merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new ESLintPlugin({
      failOnError: true, // Bloquea el build si hay errores
      failOnWarning: false,
    }),
  ],
});
