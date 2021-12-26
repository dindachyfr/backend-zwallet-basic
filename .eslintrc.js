module.exports = {
  env: {
    commonjs: true,
    es2021: true
  },
  extends: [
    "standard"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13
  },
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"]
  }
};
