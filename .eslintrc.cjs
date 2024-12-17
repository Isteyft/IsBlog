/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/comment-directive": 'off',
    // 强制使用分号
    "semi": ['error', 'always'] // 使用 2 或 'error' 来表示这是一个错误，并且总是要求分号
    // "semi": 'off',
  }
};