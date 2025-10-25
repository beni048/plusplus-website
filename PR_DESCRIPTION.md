Branch: mcp-audit/20251025-safe-audit-fixes

Summary
- Removes security vulnerabilities found by local audit (see `test-results/pnpm-audit-2025-10-25.json`).
- Upgrades `lint-staged` and pins transitive modules to patched versions.
- Adds a small TypeScript lint fix for Playwright accessibility tests.

Files changed (high-level)
- `package.json` — bumped/added:
  - axios -> ^1.12.2
  - postcss -> 8.4.31
  - lint-staged -> 16.2.6
  - devDeps: micromatch@4.0.8, brace-expansion@1.1.12
  - overrides: axios, postcss, micromatch, brace-expansion
- `tests/playwright/accessibility.spec.ts` — replaced `any` usage with explicit minimal types
- `REMEDIATION/SECURITY-2025-10-25.md` — security summary and verification steps
- `REMEDIATION/ACCESSIBILITY-2025-10-25.md` — accessibility remediation plan
- `test-results/pnpm-audit-2025-10-25.json` — audit snapshot

Verification performed locally
- `pnpm install` ran successfully
- `pnpm audit` — no vulnerabilities reported (0 critical/high/moderate/low)
- `pnpm run build` — production build succeeded
- `pnpm run lint` — no errors/warnings after accessibility test fix

Reviewer notes
- Peer-dependency warnings for some packages remain (React/Next vs package peer ranges). These are informational only.
- The `brace-expansion` pin is the pragmatic way to resolve nested dev-tool vulnerabilities without large tool upgrades; follow-up PR should upgrade `eslint`/`eslint-config-next` in a separate change when time allows.

Testing
- Run `pnpm install && pnpm run build && pnpm run lint` locally.
- To run Playwright suite (optional): `pnpm exec playwright test` (may take longer).

Merge guidance
- This PR is low-risk and intended to be merged quickly.
- After merge, run CI and verify Playwright smoke tests in CI. Consider scheduling full Playwright+axe runs on main/nightly.

Signed-off-by: automated remediation script
