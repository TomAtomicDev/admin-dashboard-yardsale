module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:jsx-a11y/recommended', 'plugin:prettier/recommended', 'next', 'next/core-web-vitals'],
  plugins: ["prettier", "jsx-a11y"],
  rules: {
    semi: ['error', 'always'],
    "@next/next/no-img-element": 'off',
    "jsx-a11y/anchor-is-valid": 'off',
    "react-hooks/exhaustive-deps": 'off',

  },
};
