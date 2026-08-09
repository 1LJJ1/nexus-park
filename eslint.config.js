import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'build']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      // 关键：关闭eslint内置格式化规则，必须放在extends最后！
      prettierConfig,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      prettier,
    },
    rules: {
      // 将prettier检查作为eslint规则，报错提示
      'prettier/prettier': 'error',

      'no-undef': 'off', // 关闭未定义变量检测，TS本身可校验
      'vue/require-default-prop': 'off', // 关闭props强制要求默认值
      'vue/multi-word-component-names': 'off', // 关闭组件必须多单词命名限制
      '@typescript-eslint/no-explicit-any': 'off', // 关闭禁止使用any类型限制
      '@typescript-eslint/explicit-function-return-type': 'off', // 关闭函数必须显式声明返回类型
    },
  },
]);
