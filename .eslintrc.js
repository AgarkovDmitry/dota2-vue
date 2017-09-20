module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'dot-notation': 1,
    'block-scoped-var': 1,
    'object-curly-spacing': [1, 'always'],
    'array-bracket-spacing': [1, 'never'],
    'key-spacing': [1, {'beforeColon': false, 'afterColon': true, 'mode': 'strict'}],
    'keyword-spacing': [1, { 'after': true }],
    'comma-dangle': 0,
    'quotes': [1, 'single'],
    'no-undef': 1,
    'global-strict': 0,
    'semi': [1, 'never'],
    'no-extra-semi': 1,
    'no-underscore-dangle': 0,
    'no-console': 1,
    'no-unused-vars': 1,
    'no-trailing-spaces': [1, { 'skipBlankLines': true }],
    'no-unreachable': 1,
    'no-alert': 0,
    'no-var': 1,

    'eqeqeq': 0,
    'eol-last': 0,
  },
  globals: {}
}
