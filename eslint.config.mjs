import parser from '@typescript-eslint/parser';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    ...compat.extends('plugin:@typescript-eslint/recommended'),
    {
        languageOptions: {
            parser: parser,
            ecmaVersion: 2020,
            sourceType: 'module',
        },
    },
];
