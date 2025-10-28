import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/playwright',
  timeout: 30_000,
  expect: { timeout: 5000 },
  reporter: [['list']],
  use: {
    headless: true,
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:3000'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
