import { test } from '@playwright/test';

// This test is a helper to exercise pages so that server-side i18n instrumentation
// records which translation keys are actually used at runtime. Run with the dev
// server running and with I18N_INSTRUMENT=true in the environment.

const routes = [
  '/',
  '/en',
  '/de',
  '/en/contact',
  '/en/rental-solutions/tenant',
  '/en/rental-solutions/tenant/calculator',
  '/en/rental-solutions/landlord',
  '/en/select',
  '/en/corporate-treasury',
  '/en/help',
  '/en/downloads',
  '/en/downloads/documentation',
  '/en/downloads/press-kit',
  '/en/partners',
  '/en/team',
  '/en/terms-and-conditions',
  '/en/privacy-policy'
];

test('visit routes to collect i18n keys', async ({ page }) => {
  // Increase the overall test timeout — some pages and client-side loads can be slow
  // when running locally or in CI. Default Playwright test timeout is 30s.
  test.setTimeout(120000);
  const base = process.env.E2E_BASE_URL || 'http://localhost:3000';
  // allow overriding the per-navigation timeout in CI if needed
  const GOTO_TIMEOUT = parseInt(process.env.PW_GOTO_TIMEOUT || '60000', 10);
  for (const r of routes) {
    const url = new URL(r, base).toString();
    // console.log for debugging if running locally
    console.log('visiting', url);
    try {
      // Use 'load' instead of 'networkidle' to avoid hangs from long-polling
      await page.goto(url, { waitUntil: 'load', timeout: GOTO_TIMEOUT });
    } catch (err) {
      const errMsg = err && err instanceof Error ? err.message : String(err);
      console.warn('page.goto failed or timed out for', url, errMsg);
      // continue — we still want to exercise other routes
    }
    // allow any client-side lazy loads to run
    await page.waitForTimeout(900);

    // Try some safe, best-effort interactions to trigger client-only translations.
    // We intentionally swallow errors so the collector continues even if a selector
    // isn't present on a page.
    try {
      // Click the first visible button (e.g., expanders, CTAs) if any.
      const btn = page.locator('button:visible').first();
      if (await btn.count()) {
        await btn.click({ timeout: 1000 }).catch(() => {});
        await page.waitForTimeout(300);
      }
    } catch {
      // ignore
    }

    try {
      // Click the first internal link if present to navigate deeper (but don't loop).
      const link = page.locator('a[href^="/en"]:visible').first();
      if (await link.count()) {
        // open in same tab to exercise client navigation where applicable
        await link.click({ timeout: 1000 }).catch(() => {});
        await page.waitForTimeout(700);
        // navigate back for the main loop — use 'load' to avoid long-polling/networkidle hangs
        await page.goBack({ waitUntil: 'load' }).catch(() => {});
        await page.waitForTimeout(300);
      }
    } catch {
      // ignore
    }
  }
});
