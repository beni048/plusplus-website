/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')

const remediationDir = path.resolve(__dirname, '..', 'REMEDIATION')
const usagePath = path.join(remediationDir, 'translation_key_usage.json')
const runtimePath = path.join(remediationDir, 'runtime_used_translation_keys.txt')
const outPath = path.join(remediationDir, 'high_confidence_unused_translation_keys.txt')

function loadJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'))
  } catch (e) {
    console.error('Failed to read/parse', p, e.message)
    process.exit(2)
  }
}

function loadRuntimeKeys(p) {
  if (!fs.existsSync(p)) return new Set()
  const raw = fs.readFileSync(p, 'utf8')
  const lines = raw.split(/\r?\n/)
  const keys = new Set()
  for (let l of lines) {
    l = l.trim()
    if (!l) continue
    // Accept typical translation key shapes: letters, numbers, dots, underscores, hyphens
    if (/^[A-Za-z0-9_.-]+$/.test(l)) {
      keys.add(l)
    }
  }
  return keys
}

function main() {
  const usage = loadJson(usagePath)
  const unused = Array.isArray(usage.unused) ? usage.unused : []
  const used = new Set(Array.isArray(usage.used) ? usage.used : [])
  const runtime = loadRuntimeKeys(runtimePath)

  const candidates = []
  for (const k of unused) {
    if (used.has(k)) continue
    if (runtime.has(k)) continue
    candidates.push(k)
  }

  fs.writeFileSync(outPath, candidates.join('\n') + (candidates.length ? '\n' : ''))
  console.log('Wrote', candidates.length, 'high-confidence unused keys to', outPath)
}

main()
