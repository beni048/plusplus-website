# Unused dependencies & exports analysis

Date: 2025-10-28

This file summarizes the results of a conservative, read-only analysis run in-repo using:

- depcheck (pnpm exec depcheck --json)
- ts-unused-exports (pnpm exec ts-unused-exports tsconfig.json --findCompletelyUnusedFiles --showLineNumber)
- madge (pnpm exec madge --orphans ...) — (no orphans found by this invocation)

Goal: produce a prioritized, conservative list of candidates for removal and a safe follow-up plan that uses CI + runtime (MCP) checks before merging any removals.

---

1) depcheck (summary)

Command run:
  pnpm exec depcheck --json

Key output (candidates reported as unused dependencies declared in package.json):

- dependencies (possible unused):
  - @hookform/resolvers
  - @next/swc-wasm-nodejs
  - @next/third-parties
  - autoprefixer
  - axios
  - form-data
  - mailgun.js
  - nodemailer
  - postcss
  - react-cookie-consent
  - zod

- devDependencies (reported as unused by depcheck - many are developer tools and might be expected):
  - @axe-core/playwright
  - @commitlint/cli
  - @commitlint/config-conventional
  - @types/nodemailer
  - brace-expansion
  - depcheck
  - madge
  - micromatch
  - ts-unused-exports

Notes:
- depcheck emitted warnings about Next.js webpack detection. These tools sometimes mis-detect usage in Next.js apps because imports are dynamic, used only in server runtime, or referenced by non-TS build tooling. Treat depcheck results as *candidates for manual verification*, not proof of safe removal.

2) ts-unused-exports (summary)

Command run:
  pnpm exec ts-unused-exports tsconfig.json --findCompletelyUnusedFiles --showLineNumber

Key findings:
- 67 modules reported with unused exports (too many to list exhaustively here). Tools like this are useful to find dead public APIs but can produce false-positives for files used reflectively by frameworks or pages.

- Files reported as "Completely unused files" (candidates for manual review):
  - playwright.config.ts
  - proxy.ts
  - tailwind.config.ts
  - app/api/contact/route.ts
  - app/layout.tsx
  - app/[locale]/layout.tsx
  - app/[locale]/page.tsx
  - app/[locale]/contact/page.tsx
  - app/[locale]/corporate-treasury/page.tsx
  - app/[locale]/help/page.tsx
  - app/[locale]/imprint/page.tsx
  - app/[locale]/privacy-policy/page.tsx
  - app/[locale]/privacy-settings/page.tsx
  - app/[locale]/rental-solutions/landlord/page.tsx
  - app/[locale]/rental-solutions/select/page.tsx
  - app/[locale]/rental-solutions/tenant/page.tsx
  - app/[locale]/rental-solutions/tenant/calculator/page.tsx
  - app/[locale]/select/page.tsx
  - app/[locale]/terms-and-conditions/page.tsx
  - components/ui/* (many UI components were reported as having unused exported symbols)

Notes:
- `ts-unused-exports` can flag Next.js route and page files as "unused" because those files are discovered by Next.js file conventions (not imported from other TS files). Do NOT remove page/route files flagged by this tool without manual verification. Many of the flagged files are app-route/page/layout files which are used by Next.js at runtime and are false positives here.

3) madge (--orphans)

- I ran madge --orphans on the `components`, `components/ui`, `app`, `lib`, and `hooks` directories. That invocation did not report orphans in this environment (Processed 0 files — likely because of madge config and TypeScript support nuance). We can re-run with explicit extensions or a config if you want a deeper madge pass.

---

Initial risk classification and conservative recommendations

The repository contains several classes of results. I classify them conservatively as follows:

- Low risk (safe to remove after quick confirmations):
  - Dev-only tooling packages that appear unused in depcheck but are clearly dev-only (e.g., `depcheck`, `madge`, `ts-unused-exports`) — verify they aren't referenced by local scripts or CI job steps, then remove from `devDependencies` if unused.
  - Test-related types (e.g., `@types/nodemailer`) if the corresponding runtime packages are not used and tests don't reference them.

- Medium risk (require targeted manual verification):
  - Packages like `axios`, `mailgun.js`, `nodemailer`, `form-data`, and `react-cookie-consent` — these are used by server/API code or pages in some deployments. Before removal: run a repo-wide search for imports/usages (I can do that), check API routes (app/api/), server code (`app/api/contact/route.ts`), and CI scripts.
  - Files flagged as "completely unused" by `ts-unused-exports` that are actually Next.js pages/layouts — treat as false positives until verified by Next runtime or route listing.

- High risk (do not remove automatically):
  - Any `app/` route, page or layout file. Next.js relies on these by file location; the static analysis tools often cannot detect that. Removing these will break the application.
  - Anything referenced dynamically (e.g., loaded via `import()` or via runtime config) or used by Playwright tests or other tooling that inspects the file system.

---

Recommended next steps (conservative plan)

1) Automated confirmation step (fast):
   - I will run a repo-wide import search for each depcheck-listed dependency to confirm if there are textual imports. Example command I can run:
     - pnpm exec rg "\baxios\b" --hidden || true

2) Mark low-risk devDeps for removal in a single PR (if indeed unused):
   - Remove dev-only tools that are not referenced by CI/workflow files. Keep CI working by adjusting workflows if needed.

3) For medium-risk packages (mailgun, nodemailer, axios, form-data):
   - For each package: run `rg` to find imports/usages; if not found, open a PR removing it and run CI. Use Next.js MCP runtime checks (or a temporary deployment) to validate critical routes.

4) For exported symbols flagged by `ts-unused-exports`:
   - Inspect the top 20 entries and determine whether they are intentionally public API surface (e.g., exported UI components used externally) or truly dead. For each candidate, either remove the export or add a small unit test / import to preserve API if needed.

5) Do not remove any `app/` pages, layouts, or `app/api` routes based only on these tools. Instead use Next.js runtime discovery (MCP) or a staging deploy to verify whether a page is actually unused in runtime traffic before removing.

6) Optional: run madge with explicit extensions and TS support to get a better orphan graph, e.g.:
   - pnpm exec madge --extensions ts,tsx --ts-config tsconfig.json --orphans .

---

If you want, I can now:

- (A) Run repo-wide textual searches for each depcheck candidate to confirm usage. (fast)
- (B) Produce a small, prioritized PR plan with 3 low-risk removals and CI validation steps. (medium)
- (C) Re-run madge with explicit TS config and gather a more accurate orphan list. (fast)

Tell me which of (A)/(B)/(C) to do next (or say "Do all"), and I'll proceed.
