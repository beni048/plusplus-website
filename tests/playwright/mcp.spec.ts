import { test, expect } from '@playwright/test';

const ROUTES = [
  '/en',
  '/de',
  '/en/help',
  '/en/privacy-policy',
  '/en/select',
];

test.describe('MCP/runtime smoke', () => {
  for (const route of ROUTES) {
    test(`no console errors or page errors on ${route}`, async ({ page }) => {
      const errors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(`console:${msg.text()}`);
      });

      page.on('pageerror', (err) => {
        errors.push(`pageerror:${err.message}`);
      });

      await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle' });
      // give some time for runtime async errors
      await page.waitForTimeout(500);

      expect(errors, `runtime errors on ${route}: ${errors.join(', ')}`).toEqual([]);
    });
  }
});
