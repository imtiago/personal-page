import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      { test: { name: 'unit', include: ['tests/unit/**/*.test.ts'], passWithNoTests: true } },
      { test: { name: 'build', include: ['tests/build/**/*.test.ts'] } },
    ],
  },
});
