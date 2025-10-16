import { FlatCompat } from '@eslint/eslintrc';
import { flatConfig as pluginNext } from '@next/eslint-plugin-next';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsESLint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import promisePlugin from 'eslint-plugin-promise';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

const compat = new FlatCompat({
    flatConfig: true,
});

export default [
    {
        ignores: [
            'node_modules/**',
            '.next/**',
            '*.js',
            'build/**',
            'public/**',
            'next-env.d.ts',
            'next.config.mjs',
            'src/components/ui/**/*.{ts,tsx}',
        ],
    },
    // Next.js core web vitals rules
    pluginNext.coreWebVitals,

    // Apply these rules to all JS/TS/JSX/TSX files
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.es2021,
            },
            parserOptions: {
                project: ['./tsconfig.json'],
                tsconfigRootDir: import.meta.url
                    ? new URL('.', import.meta.url).pathname
                    : undefined,
                ecmaVersion: 2021,
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
            },
        },
        plugins: {
            '@typescript-eslint': tsESLint.plugin,
            prettier: prettierPlugin,
            promise: promisePlugin,
            import: importPlugin,
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            'jsx-a11y': jsxA11yPlugin,
        },
        rules: {
            // ───────────────────────────────────────────────────────────────
            // TypeScript strictly-typed rules (spread from strictTypeChecked)
            // ───────────────────────────────────────────────────────────────
            ...tsESLint.configs.strictTypeChecked[0].rules,

            // ───────────────────────────────────────────────────────────────
            // Unused variables & expressions
            // ───────────────────────────────────────────────────────────────
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
            '@typescript-eslint/no-unused-expressions': [
                'error',
                { allowShortCircuit: true },
            ],

            // ───────────────────────────────────────────────────────────────
            // Promises
            // ───────────────────────────────────────────────────────────────
            '@typescript-eslint/no-floating-promises': [
                'error',
                { ignoreVoid: true, ignoreIIFE: true },
            ],
            '@typescript-eslint/no-misused-promises': 1,
            'promise/no-nesting': 0,

            // ───────────────────────────────────────────────────────────────
            // Import rules (classic + import-ordering)
            // ───────────────────────────────────────────────────────────────
            'import/no-unresolved': ['error', { ignore: ['^@/.+'] }],
            'import/order': [
                'error',
                {
                    alphabetize: { order: 'asc' },
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    'newlines-between': 'never',
                },
            ],

            // ───────────────────────────────────────────────────────────────
            // React & JSX accessibility rules
            // ───────────────────────────────────────────────────────────────
            'react/prop-types': 0,
            'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
            'react/react-in-jsx-scope': 0,
            'react/destructuring-assignment': 2,
            'react/jsx-curly-brace-presence': [
                2,
                { props: 'never', children: 'never' },
            ],
            'react/jsx-newline': 'off',
            'react/self-closing-comp': 1,
            'react/display-name': 0,
            'jsx-a11y/no-autofocus': 0,
            'jsx-a11y/click-events-have-key-events': 'off',
            'jsx-a11y/no-static-element-interactions': 'off',

            // ───────────────────────────────────────────────────────────────
            // Explicit function return types
            // ───────────────────────────────────────────────────────────────
            '@typescript-eslint/explicit-function-return-type': [
                'error',
                {
                    allowTypedFunctionExpressions: true,
                    allowHigherOrderFunctions: true,
                },
            ],

            // ───────────────────────────────────────────────────────────────
            // Strict 'any' type restrictions
            // ───────────────────────────────────────────────────────────────
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unsafe-assignment': 'error',
            '@typescript-eslint/no-unsafe-call': 'error',
            '@typescript-eslint/no-unsafe-member-access': 'error',
            '@typescript-eslint/no-unsafe-return': 'error',
            '@typescript-eslint/no-unsafe-argument': 'error',

            // ───────────────────────────────────────────────────────────────
            // Comments & formatting
            // ───────────────────────────────────────────────────────────────
            'spaced-comment': ['warn', 'always', { block: { balanced: true } }],
            'no-console': 'off',
            'prettier/prettier': ['error', { endOfLine: 'auto' }],

            // ───────────────────────────────────────────────────────────────
            // Restricted keywords and syntax
            // ───────────────────────────────────────────────────────────────
            'no-restricted-syntax': [
                'error',
                // Restrict 'var' keyword - use 'let' or 'const' instead
                {
                    selector: 'VariableDeclaration[kind="var"]',
                    message: "Use 'let' or 'const' instead of 'var'.",
                },
                // Restrict 'any' type in TypeScript - use specific types
                {
                    selector: 'TSAnyKeyword',
                    message:
                        "Don't use 'any' type. Use specific types instead.",
                },
                // Restrict console.log in production code (uncomment if needed)
                {
                    selector:
                        'CallExpression[callee.object.name="console"][callee.property.name="log"]',
                    message: 'Remove console.log statements before committing.',
                },
                // Example: Restrict specific function names (customize as needed)
                {
                    selector: 'CallExpression[callee.name="eval"]',
                    message: 'eval() is dangerous and should not be used.',
                },
            ],
        },
        settings: {
            react: { version: 'detect' },
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
            },
            'import/resolver': {
                node: {
                    extensions: [
                        '.js',
                        '.jsx',
                        '.ts',
                        '.tsx',
                        '.d.ts',
                        '.json',
                    ],
                },
                typescript: {
                    project: './tsconfig.json',
                },
            },
        },
    },
];
