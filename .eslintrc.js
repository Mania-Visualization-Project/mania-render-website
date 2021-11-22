module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 13,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'import',
  ],
  'ignorePatterns': [
    'dist/**/*',
    'script/**/*',
  ],
  'rules': {
    'indent': [
      'error',
      2,
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
    'no-console': 'error',
    'no-alert': 'error',
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'always-multiline',
    }],
    'brace-style': ['error', '1tbs'],
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/no-unused-vars': ['error', {
      'vars': 'all',
      'args': 'after-used',
      'ignoreRestSiblings': false,
    }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-multi-spaces': ['error', {
      'ignoreEOLComments': true,
    }],
    'max-len': ['error', {
      'code': 120,
      'ignoreUrls': true,
      'ignoreStrings': true,
      'ignoreRegExpLiterals': true,
    }],
    'eol-last': ['error', 'always'],
    'no-trailing-spaces': ['error', {
      'ignoreComments': true,
    }],
    'curly': ['error', 'all'],
    '@typescript-eslint/no-explicit-any': ['off'],
    'prefer-destructuring': ['error'],
    'arrow-spacing': ['error', {
      before: true,
      after: true,
    }],
    'react/jsx-no-undef': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/self-closing-comp': ['error', {
      'component': true,
      'html': true,
    }],
    'react/jsx-tag-spacing': ['error', {
      'closingSlash': 'never',
      'beforeSelfClosing': 'always',
      'afterOpening': 'never',
      'beforeClosing': 'never',
    }],
    'react/no-array-index-key': ['error'],
    'react/jsx-props-no-multi-spaces': ['error'],
    'react/jsx-max-props-per-line': ['error', {
      'maximum': 3,
    }],
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'import/order': 'error',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
  },
  'settings': {
    'import/parser': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      'typescript': {
        'alwaysTryTypes': true,
      },
    },
  },
};
