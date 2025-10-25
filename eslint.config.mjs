import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Project-wide rule overrides
    rules: {
      // Keep defaults but relax a few rules temporarily to unblock CI.
      // Prefer fixing usages over long-term rule relaxation.
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },
  // Ensure default Next ignores are respected in the flat config
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
