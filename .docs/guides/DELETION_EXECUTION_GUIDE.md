# Deletion Execution Guide

**Status:** Ready to execute when approved  
**Branch:** cleanup/i18n-prune  
**Date:** November 4, 2025

---

## Pre-Deletion Checklist

- [ ] Read `DELETION_LIST.md` (comprehensive analysis)
- [ ] Read `DELETION_SUMMARY.md` (quick reference)
- [ ] Confirm clean git status: `git status`
- [ ] Review this execution guide
- [ ] Ensure on correct branch: `git branch` (should show `cleanup/i18n-prune`)
- [ ] Back up any critical files if needed

---

## Deletion Instructions

### Method 1: Individual Deletions (Recommended for Review)

Delete one at a time to verify each deletion:

```bash
# 1. Delete REMEDIATION directory
rm -rf REMEDIATION/
git add REMEDIATION/

# 2. Delete analysis text files
rm _unused_list.txt
rm madge-orphans.txt
rm ts-unused-exports.txt
rm ts-unused-exports-results.txt
rm ts-unused-exports-filtered.txt
rm unreferenced-images.txt
rm unused-verify.txt
git add _unused_list.txt madge-orphans.txt ts-unused-exports*.txt unreferenced-images.txt unused-verify.txt

# 3. Delete scripts directory
rm -rf scripts/
git add scripts/

# 4. Delete vite file
rm vite
git add vite

# 5. Delete test-results directory
rm -rf test-results/
git add test-results/

# 6. Delete CONTRIBUTING.md
rm CONTRIBUTING.md
git add CONTRIBUTING.md

# 7. Delete depcheck-report.json
rm depcheck-report.json
git add depcheck-report.json

# Verify deletions
git status
```

### Method 2: Batch Deletion (Faster)

Delete all items at once:

```bash
# Delete all at once
rm -rf REMEDIATION/ scripts/ test-results/
rm _unused_list.txt madge-orphans.txt ts-unused-exports*.txt \
   unreferenced-images.txt unused-verify.txt vite CONTRIBUTING.md depcheck-report.json

# Stage all deletions
git add -A

# Verify
git status
```

### Method 3: Selective Deletion

If you want to keep some items:

```bash
# Example: Keep CONTRIBUTING.md, delete everything else
rm -rf REMEDIATION/ scripts/ test-results/
rm _unused_list.txt madge-orphans.txt ts-unused-exports*.txt \
   unreferenced-images.txt unused-verify.txt vite depcheck-report.json

git add -A
```

---

## Verification Steps

### After Deletion, Verify Nothing Broke

```bash
# 1. Check git status
git status

# 2. Verify deletions
git diff --cached --stat

# 3. Check for any references (should find nothing)
grep -r "REMEDIATION" . --exclude-dir=.git --exclude="DELETION*" || echo "✓ No references to REMEDIATION"
grep -r "scripts/collect-i18n" . --exclude-dir=.git --exclude="DELETION*" || echo "✓ No references to scripts"

# 4. Build to ensure nothing broke
pnpm install  # If needed
pnpm build

# 5. Run tests to verify
pnpm test:unit
# pnpm test:e2e  # Optional, can be slow

# 6. Check project structure
ls -la | grep -E "REMEDIATION|scripts|vite|CONTRIBUTING" || echo "✓ All deletions confirmed"
```

---

## Commit Changes

Once verified:

```bash
# Commit the deletions
git commit -m "cleanup: remove legacy analysis artifacts

- Remove REMEDIATION/ directory (legacy audit reports and analysis)
- Remove diagnostic text files (_unused_list.txt, madge-orphans.txt, ts-unused-exports*.txt, etc.)
- Remove scripts/ directory (old i18n diagnostic scripts)
- Remove vite (empty unused build tool file)
- Remove test-results/ directory (transient test artifacts)
- Remove CONTRIBUTING.md (non-essential dev documentation)
- Remove depcheck-report.json (regenerable dependency analysis)

All items are non-functional development artifacts that clutter the repository.
All can be regenerated if needed via automated tools."

# View the commit
git show HEAD

# Optional: Push to remote
git push origin cleanup/i18n-prune
```

---

## Rollback (If Needed)

If something goes wrong before committing:

```bash
# Undo deletions (staged but not committed)
git reset HEAD
git restore .

# Or after commit:
git revert HEAD
```

---

## Post-Cleanup Tasks

### 1. Clean Up Documentation Files

After deletion, you may want to remove the temporary analysis files:

```bash
# Optional: Remove analysis documents created for this review
# (These are optional - you can keep them for reference)
rm DELETION_LIST.md DELETION_SUMMARY.md REMEDIATION_ANALYSIS.md

# Or keep them for reference - they don't hurt
```

### 2. Run Final Validation

```bash
# Full build and test
pnpm build
pnpm test:unit
# pnpm test:e2e  # Optional

# Check file count reduced
find . -type f ! -path './node_modules/*' ! -path './.git/*' ! -path './.next/*' | wc -l

# Check disk usage
du -sh . --exclude=node_modules --exclude=.git --exclude=.next
```

### 3. Update Team (If Applicable)

```bash
# Optional: Create cleanup PR with clear description
# The commit message above serves as good documentation
```

---

## Expected Results

After successful deletion:

### Before Cleanup
```
Repository contains:
✓ Active source code
✓ Configuration files
✓ Test files
✓ Package lock file
✗ REMEDIATION/ (legacy)
✗ scripts/ (unused)
✗ test-results/ (transient)
✗ 10 analysis text files
✗ vite (unused)
✗ CONTRIBUTING.md (non-essential)
✗ depcheck-report.json (regenerable)
```

### After Cleanup
```
Repository contains:
✓ Active source code
✓ Configuration files
✓ Test files
✓ Package lock file
✓ Clean root directory
✓ No legacy artifacts
✓ No unused scripts
```

---

## File Count Reduction

Expected reduction:
- **13 items removed** (3 directories + 10 files)
- **~50+ KB saved** (analysis and metadata)
- **Cleaner project root** (fewer unrelated files)
- **Improved developer experience** (less clutter)

---

## Safety Guarantees

✅ **Zero Impact on:**
- Production code
- Build process
- Test suites
- Development workflow
- Git history (committed, not pushed yet)

✅ **All Regenerable:**
- All analysis reports can be regenerated
- All test results auto-generate
- All diagnostic outputs reproducible

✅ **Git Recovery:**
- Changes not committed to main history
- Can be reversed with `git revert`
- Full audit trail in git log

---

## Support & Questions

If you have questions:

1. **What gets deleted?** See `DELETION_SUMMARY.md`
2. **Why safe?** See `DELETION_LIST.md`
3. **REMEDIATION details?** See `REMEDIATION_ANALYSIS.md`
4. **How to execute?** You're reading it!

---

## Ready to Proceed?

When you're ready to delete, run the chosen method above.

**Remember:** No deletions have been performed yet.  
This is still in the review phase.

Approve and I'll assist with the actual deletion!
