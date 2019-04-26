module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: "module"
  },
  parser: "babel-eslint",
  plugins: ["react", "prettier", "flowtype"],
  rules: {
    "no-debugger": 0,
    indent: [
      "error",
      2,
      {
        SwitchCase: 1,
        FunctionExpression: { body: 1, parameters: 1 },
        CallExpression: { arguments: 1 },
        ObjectExpression: 1,
        ArrayExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: true
      }
    ],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-console": 0,
    "no-undef": 0,
    "no-process-env": 0,
    "prefer-const": 1,
    "no-useless-escape": 0,
    "react/jsx-uses-vars": 1,
    "react/jsx-uses-react": 1
  }
};
