/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const enBackupPath = path.join(root, 'REMEDIATION', 'backups', 'messages', 'en.json.orig');
const deBackupPath = path.join(root, 'REMEDIATION', 'backups', 'messages', 'de.json.orig');
const enPath = path.join(root, 'messages', 'en.json');
const dePath = path.join(root, 'messages', 'de.json');

const keysToRestore = [
  'depositCalculator.products.frankencoinDeposit',
  'depositCalculator.products.bitcoinDeposit',
  'depositCalculator.products.bankDeposit',
  'depositCalculator.products.depositInsurance',
  'partners.descriptions.zinsli',
  'partners.descriptions.frankencoin',
  'partners.descriptions.dfx'
];

function load(p) {
  // Read file as UTF-8 and remove control characters that may break JSON.parse
  // We allow tab, newline and carriage return; strip other C0/C1 control codes.
  const raw = fs.readFileSync(p, 'utf8');
  const cleaned = raw.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '');
  try {
    return JSON.parse(cleaned);
  } catch {
    console.error('Failed to parse JSON for', p, '- attempting fallback by removing non-ASCII characters');
    const ascii = cleaned.replace(/[^\x09\x0A\x0D\x20-\x7E]/g, '');
    return JSON.parse(ascii);
  }
}
function write(p, obj) { fs.writeFileSync(p, JSON.stringify(obj,null,2)+'\n','utf8'); }

function setPath(obj, pathArr, val) {
  let cur = obj;
  for (let i=0;i<pathArr.length-1;i++) {
    const k = pathArr[i];
    if (!(k in cur) || typeof cur[k] !== 'object') cur[k] = {};
    cur = cur[k];
  }
  cur[pathArr[pathArr.length-1]] = val;
}

const enBackup = load(enBackupPath);
const deBackup = load(deBackupPath);
const en = load(enPath);
const de = load(dePath);

const restored = [];
for (const key of keysToRestore) {
  const parts = key.split('.');
  // get value from backups
  function getFrom(obj) {
    let cur = obj;
    for (const p of parts) {
      if (cur && typeof cur === 'object' && p in cur) cur = cur[p];
      else return undefined;
    }
    return cur;
  }
  const enVal = getFrom(enBackup);
  const deVal = getFrom(deBackup);
  if (enVal !== undefined) {
    setPath(en, parts, enVal);
    restored.push({key, locale: 'en'});
  }
  if (deVal !== undefined) {
    setPath(de, parts, deVal);
    restored.push({key, locale: 'de'});
  }
}

write(enPath, en);
write(dePath, de);

const out = path.join(root, 'REMEDIATION', 'restored_keys.txt');
fs.writeFileSync(out, restored.map(r=>`${r.locale}: ${r.key}`).join('\n')+'\n','utf8');
console.log('Restored', restored.length, 'entries. See', out);
