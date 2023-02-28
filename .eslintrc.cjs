module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript'
    ],
    overrides: [
    ],
    parserOptions: {
        project: ['./tsconfig.json'],
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    settings: {
        react: {
            version: 'detect'
        }
    },
    rules: {
        indent: ['error', 4],
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off'
    }
}
