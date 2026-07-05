import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    ignores: [".next/**", "node_modules/**", "public/**"]
  },
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        document: "readonly",
        window: "readonly",
        process: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn"
    }
  }
];
