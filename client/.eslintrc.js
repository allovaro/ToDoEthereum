module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    parser: 'babel-eslint',
    plugins: [
        'react',
    ],
    rules: {
        'react/jsx-filename-extension': [0],
        'import/extensions': 'off',
        'arrow-body-style': ['error', 'as-needed'],
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': 'off',
        'arrow-parens': ['error', 'as-needed'],
        'array-callback-return': 'off',
        'no-plusplus': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/destructuring-assignment': 'off',
        'class-methods-use-this': 'off',
        'react/no-unused-state': 'warn',
        'react/prefer-stateless-function': 'warn',
        'no-useless-constructor': 'warn',
        'no-empty-function': 'warn',
        'no-unused-vars': 'warn',
        'no-return-await': 'off',
        'no-underscore-dangle': 'off',
        'react/self-closing-comp': 'off',
        'max-len': 'warn',
        'react/jsx-closing-tag-location': 'warn',
        // Indent with 4 spaces
        indent: ['error', 4],
        // Indent JSX with 4 spaces
        'react/jsx-indent': ['error', 4],
        // Indent props with 4 spaces
        'react/jsx-indent-props': ['error', 4],
        'react/state-in-constructor': 'off',
        'consistent-return': 'off',
    },
};
