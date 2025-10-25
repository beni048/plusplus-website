# Accessibility Remediation Plan — 2025-10-25

Context
- We added Playwright+axe tests that write their raw JSON outputs to `test-results/axe-<page>.json`.
- Some accessibility rules were temporarily disabled in tests while we remediate UI issues:
  - `color-contrast` (color contrast failures)
  - `region` (landmark/region role coverage)
  - `page-has-heading-one` (missing H1 on some pages)

Files produced by tests
- `test-results/axe-<sanitized-path>.json` — raw axe reports for each page.

Remediation steps (concrete)
1. Create triage issues from each `test-results/axe-*.json` file including:
   - Page path
   - Rule id (e.g., color-contrast)
   - Selector(s) for failing nodes
   - Suggested remediation (adjust color tokens, add ARIA landmarks, ensure a top-level H1 per page)
2. Prioritize fixes: color contrast and missing H1s first (affect many users and automated checks).
3. For color-contrast: prefer adjusting the design tokens (Tailwind / CSS variables) so fixes are global where possible.
4. For landmarks/headings: update layout templates (e.g., `app/layout.tsx` or localized layouts) to ensure each route includes a top-level H1 or ARIA landmark.
5. Remove temporary axe exemptions once pages are remediated and enforce axe in CI for pull requests.

Suggested next immediate actions I can take for you
- Create `remediation/ACCESSIBILITY-issues.md` listing issues extracted from `test-results/` (I can auto-parse and create one file per failing page).
- Create PR with small CSS/token changes to improve contrast for worst offenders (I can propose fixes after you confirm visual acceptance path).

Signed-off-by: automated remediation script
