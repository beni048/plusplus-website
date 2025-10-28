#!/usr/bin/env node
// Simple server-side collector: issues HTTP GETs for key routes so server-side
// rendering triggers translation loads. This is useful when Playwright/browser
// runs are inconvenient.

const routes = [
  '/',
  '/en',
  '/de',
  '/en/contact',
  '/en/rental-solutions/tenant',
  '/en/rental-solutions/tenant/calculator',
  '/en/select',
  '/en/corporate-treasury',
  '/en/help',
  '/en/terms-and-conditions',
  '/en/privacy-policy'
];

const base = process.env.E2E_BASE_URL || 'http://localhost:3000';
const outFile = 'REMEDIATION/runtime_used_translation_keys.txt';

(async function main(){
  try{
    console.log('Collecting routes against', base);
    for(const r of routes){
      const url = new URL(r, base).toString();
      try{
        console.log('GET', url);
        const res = await fetch(url, {method: 'GET'});
        console.log('  ->', res.status, res.statusText);
        // small delay to let server-side instrumentation flush
        await new Promise(s=>setTimeout(s, 200));
      }catch(e){
        console.error('  Request failed for', url, e && e.message ? e.message : e);
      }
    }
    console.log('Done. If instrumentation is enabled, check', outFile);
  }catch(e){
    console.error('Collector failed:', e && e.message ? e.message : e);
    console.error('Make sure the dev server is running and instrumentation is enabled:');
    console.error('  I18N_INSTRUMENT=true pnpm dev');
    process.exit(2);
  }
})();
