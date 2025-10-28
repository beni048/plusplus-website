#!/usr/bin/env node
const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

const base = process.env.E2E_BASE_URL || 'http://localhost:3000';
const collector = path.join(__dirname, 'collect-i18n-http.js');

function checkServer(url, timeout = 1000) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      res.resume();
      resolve(true);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(timeout, () => {
      req.abort();
      resolve(false);
    });
  });
}

async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i++) {
    const ok = await checkServer(url);
    if (ok) return true;
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

async function run() {
  const ready = await checkServer(base + '/');
  let serverProcess = null;
  let startedByUs = false;

  if (!ready) {
    console.log('Dev server not running — starting `I18N_INSTRUMENT=true pnpm dev`...');
    serverProcess = spawn('pnpm', ['dev'], {
      env: { ...process.env, I18N_INSTRUMENT: 'true' },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    startedByUs = true;

    serverProcess.stdout.on('data', (d) => {
      process.stdout.write('[dev] ' + d.toString());
    });
    serverProcess.stderr.on('data', (d) => {
      process.stderr.write('[dev] ' + d.toString());
    });

    const ok = await waitForServer(base + '/', 90);
    if (!ok) {
      console.error('Dev server did not become ready in time. Aborting.');
      if (serverProcess) serverProcess.kill('SIGINT');
      process.exit(2);
    }
    console.log('Dev server is ready.');
  } else {
    console.log('Dev server already running.');
  }

  // Run collector: either server-side HTTP collector or Playwright flows if requested.
  const usePlaywright = process.env.COLLECTOR === 'playwright'
  if (usePlaywright) {
    console.log('Running Playwright collector...');
    try {
      // Run Playwright tests (project chromium) to exercise client interactions
      const args = ['exec', 'playwright', 'test', 'tests/playwright/collect-i18n.spec.ts', '--project=chromium', '--reporter=list']
      const r = spawn('pnpm', args, { stdio: 'inherit', env: process.env });
      await new Promise((resolve, reject) => {
        r.on('exit', (code) => (code === 0 ? resolve() : reject(code)));
      });
    } catch (e) {
      console.error('Playwright collector failed with', e);
    }
  } else {
    console.log('Running server-side collector...');
    try {
      const r = spawn(process.execPath, [collector], { stdio: 'inherit' });
      await new Promise((resolve, reject) => {
        r.on('exit', (code) => (code === 0 ? resolve() : reject(code)));
      });
    } catch (e) {
      console.error('Collector failed with', e);
    }
  }

  if (startedByUs && serverProcess) {
    console.log('Shutting down the dev server we started...');
    serverProcess.kill('SIGINT');
    // give it a moment
    await new Promise((r) => setTimeout(r, 500));
  }

  const out = path.join(process.cwd(), 'REMEDIATION', 'runtime_used_translation_keys.txt');
  if (fs.existsSync(out)) {
    console.log('Collected runtime keys written to', out);
  } else {
    console.log('No runtime keys were written — check REMEDIATION/runtime_used_translation_keys.txt');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
