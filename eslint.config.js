import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended,
  prettierConfig,

  {
    ignores: ["dist/**", "node_modules/**", "*.min.js"],
  },

  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": "warn",
      "no-console": "off",
      "no-debugger": "warn",
      // Desactivamos reglas de espaciado para que Prettier las maneje
      "space-before-function-paren": "off",
      "space-before-blocks": "off",
    },
  },
];
