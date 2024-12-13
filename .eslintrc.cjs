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
    // 关闭分号规则
    "semi": true
 },
}
