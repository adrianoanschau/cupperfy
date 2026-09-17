import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/**
 * Padronização estilo Airbnb sobre eslint-config-next (flat / ESLint 9).
 *
 * `eslint-config-airbnb` clássico não é compatível de forma estável com
 * ESLint 9 + configs flat do Next 16 (conflito/circularidade de plugins).
 * Mantemos a tipografia Airbnb via Prettier e as regras equivalentes abaixo.
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',

      // —— estilo Airbnb (subconjunto prático) ——
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: [
            'acc',
            'draft',
            'state',
            'req',
            'request',
            'res',
            'reply',
          ],
        },
      ],
      'no-underscore-dangle': 'off',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'no-nested-ternary': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],

      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-no-useless-fragment': 'error',
      'react/self-closing-comp': 'error',

      'import/prefer-default-export': 'off',
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
    'public/sw.js',
    'public/swe-worker*',
  ]),
]);

export default eslintConfig;
