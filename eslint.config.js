import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended,
  prettierConfig, // Desactiva reglas que chocan con Prettier

  {
    ignores: ["dist/**", "node_modules/**", "*.min.js"],
  },

  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        // Definimos manualmente las globales de navegador y Node
        // NOTA: NO agregamos __dirname ni __filename porque en ESM no son globales.
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
      "no-unused-vars": "warn", // Cambiado a warn para ser menos agresivo en desarrollo
      "no-console": "off",
      "no-debugger": "warn",
    },
  },
];
