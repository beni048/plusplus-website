# PR: audit/phase1-fixes — repository hardening & i18n remediation

Summary
-------
This PR contains a conservative, safety-first audit and a set of changes to make the Next.js app more production-ready while preserving behavior. Changes are limited to server-side hardening, i18n restoration, small refactors for testability, and CI additions.

Key changes
-----------
- i18n: sanitized backup JSONs and restored missing translation keys (7 keys). Added a safer restore script in `scripts/restore-i18n-keys.js`.
- Instrumentation: added a runtime instrumentation wrapper in `i18n/request.ts` (optional via I18N_INSTRUMENT) to record used translation keys to `REMEDIATION/runtime_used_translation_keys.txt`.
- Logger: added a structured server-side logger and replaced risky console.* usage in server APIs (see `lib/logger.ts`).
- Deposit calculator: extracted computation and data into `lib/deposit-calculator.ts` and `data/bitcoin-historical.json` and added focused unit tests `tests/deposit-calculator.test.ts`.
- ESLint/TS: fixed a set of linting issues (unused variables, anonymous default exports) and tightened some types. Kept a narrow `any` for the Proxy helper where required to avoid runtime regressions.
- MCP: updated `.vscode/mcp.json` to avoid `npx` picking up repository overrides when launching the MCP helper CLI (uses `/tmp` wrapper). This fixes EOVERRIDE seen when starting MCP helper tools.
- CI: added `.github/workflows/ci.yml` for lint/typecheck/unit tests and `.github/workflows/e2e.yml` for on-demand Playwright E2E runs.

Files added/changed (high level)
--------------------------------
- Added: `lib/logger.ts`, `lib/deposit-calculator.ts`, `data/bitcoin-historical.json`
- Edited: `components/DepositCalculator.tsx`, `i18n/request.ts`, `messages/*.json` (restored keys), `scripts/restore-i18n-keys.js`, `.vscode/mcp.json`
- Tests: `tests/deposit-calculator.test.ts` (unit), Playwright specs remain in `tests/playwright/` (unchanged)
- CI: `.github/workflows/ci.yml`, `.github/workflows/e2e.yml`

Verification performed
----------------------
- `pnpm build` (production build) — succeeded and static/SSG pages were generated.
- `pnpm exec tsc --noEmit` — passes.
- `pnpm exec eslint . --ext .ts,.tsx` — no errors/warnings after fixes.
- Unit test: `pnpm exec vitest run tests/deposit-calculator.test.ts` — passed.

Notes & rationale
-----------------
- Playwright tests are kept separate because they must run with the Playwright runner; CI runs unit tests only by default. E2E runs are provided as an on-demand workflow (workflow_dispatch) to avoid slowing PR feedback loops.
- The instrumentation proxy uses a narrow `any` to avoid breaking runtime behavior — this is intentional and documented in `i18n/request.ts`.
- I avoided broad automatic pruning of exports or dependencies. That should be a follow-up once usage is verified in production and more test coverage exists.

Recommended follow-ups (low-risk)
---------------------------------
1. Run the on-demand Playwright workflow to exercise E2E scenarios on CI. Adjust base URLs/credentials as needed.
2. Add a GitHub Actions job that runs Playwright on merge to main if desired (can be gated behind a schedule or manual approval).
3. Gradually tighten types where `any` is used, starting with the Proxy helper by adding a typed wrapper if runtime instrumentation remains enabled.
4. Add a small CI step to run `pnpm exec vitest --run` for all unit tests (if more are added) and split Playwright into a separate matrix.

If you'd like, I can open or update the draft PR for `audit/phase1-fixes` and include this description.

Checklist for reviewers
----------------------
- [ ] Confirm i18n keys and translations restored are correct.
- [ ] Verify server logs and run the MCP helper if you rely on it locally.
- [ ] Run the E2E workflow (or run Playwright locally) and verify major flows.
- [ ] Review `lib/deposit-calculator.ts` logic for correctness (tests included).
