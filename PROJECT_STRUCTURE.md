# Quick Reference - Project Structure

## 🎯 Active Development Directories

These are the directories you'll work with daily:

```
/app                 → Next.js application code
/components          → Reusable React components
/lib                 → Utility functions (logger, gtag, etc.)
/hooks               → Custom React hooks
/messages            → i18n translation files
/i18n                → i18n configuration
/tests               → All test suites (units + e2e)
/public              → Static assets (images, PDFs)
/data                → Data files
```

## 📖 Documentation & Reference

These contain valuable but non-functional files:

```
/.docs                    → Project documentation (hidden)
├── /audits              → Phase-based audit reports
├── /reports             → Session summaries & completion reports
├── /guides              → How-to guides
├── README.md            → Documentation guide
└── CLEANUP_SUMMARY.md   → This cleanup documentation

/.testing                 → Test infrastructure (hidden)
├── /results             → Test execution results
└── README.md            → Testing guide
```

## ⚙️ Configuration Files

In project root:

```
next.config.js      → Next.js configuration
tsconfig.json       → TypeScript configuration
tailwind.config.ts  → Tailwind CSS configuration
postcss.config.js   → PostCSS configuration
package.json        → Dependencies & scripts
eslint.config.mjs   → ESLint configuration
playwright.config.ts → E2E testing configuration
commitlint.config.cjs → Commit message validation
```

## 🔍 Finding Things

| What I Need | Where to Look |
|---|---|
| React components | `/components` |
| Application pages | `/app/[locale]/` |
| Utility functions | `/lib/` |
| Tests | `/tests/` |
| Translations | `/messages/` |
| Static assets | `/public/` |
| **Audit reports** | `/.docs/audits/` |
| **Completion reports** | `/.docs/reports/` |
| **How-to guides** | `/.docs/guides/` |
| **Test results** | `/.testing/results/` |

## 🚀 Common Commands

```bash
# Development
npm run dev              → Start dev server
npm run build            → Build for production
npm run lint             → Run ESLint

# Testing
npm test                 → Run unit tests
npm run test:e2e         → Run Playwright tests
npm run test:a11y        → Run accessibility tests

# Cleanup
npm run clean            → Clean build artifacts
```

## 📝 Hidden vs Visible

**Hidden directories** (dot-prefix like `.docs/`):
- Won't show in typical `ls` output
- Won't appear in IDE sidebars by default
- Won't interfere with git ignore patterns
- Perfect for reference material

**Regular directories**:
- Always visible
- All active/functional code

## ✅ No Code Was Changed

All your actual code remains exactly as it was:
- ✓ `/app` - Untouched
- ✓ `/components` - Untouched
- ✓ `/lib` - Untouched
- ✓ `/tests` - Untouched
- ✓ All config files - Untouched

Only non-functional documentation was reorganized!
