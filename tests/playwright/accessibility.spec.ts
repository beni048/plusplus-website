import { test, expect } from '@playwright/test';
import fs from 'fs';
import { resolve as resolvePath, join as joinPath } from 'path';

const paths = [
  '/en',
  '/en/contact',
  '/en/help',
  '/en/privacy-policy',
];

for (const path of paths) {
  test(`accessibility: ${path}`, async ({ page }) => {
    const base = process.env.PW_BASE_URL || process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
    await page.goto(`${base}${path}`);
    // Inject axe-core script and run accessibility checks
    const axePath = require.resolve('axe-core/axe.min.js');
    await page.addScriptTag({ path: axePath });
    const results = await page.evaluate(async () => {
      // Temporarily disable certain rules that are known and tracked for remediation
      type AxeRunResult = { violations?: unknown[] };
      type AxeWindow = { axe: { run: (root: Node, options?: { rules?: Record<string, { enabled: boolean }> }) => Promise<AxeRunResult> } };
      return await (window as unknown as AxeWindow).axe.run(document, {
        rules: {
          'color-contrast': { enabled: false },
          'region': { enabled: false },
          'page-has-heading-one': { enabled: false }
        }
      });
    });

    // Ensure test-results directory exists and write the raw axe JSON for later inspection
  const resultsDir = resolvePath(process.cwd(), 'test-results');
  try { fs.mkdirSync(resultsDir, { recursive: true }); } catch { /* ignore */ }
    const safeName = path.replace(/[^a-z0-9-_]/gi, '_').replace(/^_+/, '');
  const outPath = joinPath(resultsDir, `axe-${safeName}.json`);
    fs.writeFileSync(outPath, JSON.stringify(results, null, 2));

    // Fail the test if there are any accessibility violations (after the temporary exemptions above)
    if (results.violations && results.violations.length > 0) {
      // Attach a short failure summary for Playwright test output before failing
      console.error(`Axe violations found for ${path}: ${results.violations.length} issues. See ${outPath}`);
    }
    expect(results.violations).toEqual([]);
  });
}
