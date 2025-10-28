const fs = require('fs');
const path = require('path');

const root = process.cwd();
const unusedPath = path.join(root, 'REMEDIATION', 'unused_translation_keys.txt');
const locales = [
  path.join(root, 'messages', 'en.json'),
  path.join(root, 'messages', 'de.json')
];

function readUnused() {
  if (!fs.existsSync(unusedPath)) return [];
  return fs.readFileSync(unusedPath, 'utf8')
    .split(/\r?\n/)
    .map(s => s.trim())
    .filter(Boolean);
}

function loadJson(p) {
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    console.error('Failed to parse', p, e.message);
    process.exit(2);
  }
}

function writeJson(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

function deletePath(rootObj, pathArr) {
  let cur = rootObj;
  const parents = [];
  for (let i = 0; i < pathArr.length; i++) {
    const key = pathArr[i];
    parents.push([cur, key]);
    if (!(key in cur)) {
      return false;
    }
    if (i === pathArr.length - 1) break;
    cur = cur[key];
    if (typeof cur !== 'object' || cur === null) {
      return false;
    }
  }
  // delete last
  const [parentObj, lastKey] = parents[parents.length - 1];
  if (parentObj && lastKey in parentObj) {
    delete parentObj[lastKey];
  } else return false;
  // cleanup empty ancestors
  for (let i = parents.length - 2; i >= 0; i--) {
    const [pObj, k] = parents[i];
    if (pObj[k] && typeof pObj[k] === 'object' && Object.keys(pObj[k]).length === 0) {
      delete pObj[k];
    } else break;
  }
  return true;
}

(async function main(){
  const unused = readUnused();
  if (unused.length === 0) {
    console.log('No unused keys file or file is empty. Nothing to do.');
    process.exit(0);
  }
  const report = {};
  for (const localePath of locales) {
    const relative = path.relative(root, localePath);
    const obj = loadJson(localePath);
    if (obj === null) {
      console.warn('Locale file missing:', relative);
      continue;
    }
    const removed = [];
    for (const key of unused) {
      const parts = key.split('.');
      const ok = deletePath(obj, parts);
      if (ok) removed.push(key);
    }
    writeJson(localePath, obj);
    report[relative] = removed;
    console.log(`Updated ${relative}: removed ${removed.length} keys`);
  }

  const outPath = path.join(root, 'REMEDIATION', 'pruned_keys_applied.txt');
  const lines = [];
  for (const [file, keys] of Object.entries(report)) {
    lines.push(`# ${file} — ${keys.length} keys removed`);
    for (const k of keys) lines.push(k);
    lines.push('');
  }
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
  console.log('Wrote report to', outPath);
})();
