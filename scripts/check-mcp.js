#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/*
Simple MCP-style guard script.
Tries to call the Next.js MCP endpoint if present, otherwise falls back to requesting critical routes
and ensuring they return 200 and don't contain obvious error markers.

Usage: node scripts/check-mcp.js --base http://localhost:3000 --routes /,/,/contact
*/
const http = require('http')
const https = require('https')
const { URL } = require('url')

function fetchUrl(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url)
    const lib = u.protocol === 'https:' ? https : http
    const req = lib.request(u, { method: opts.method || 'GET', headers: opts.headers || {} }, (res) => {
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString('utf8')
        resolve({ status: res.statusCode, headers: res.headers, body })
      })
    })
    req.on('error', reject)
    if (opts.body) req.write(opts.body)
    req.end()
  })
}

async function main() {
  const argv = require('minimist')(process.argv.slice(2))
  const base = argv.base || argv.b || 'http://localhost:3000'
  const routesArg = argv.routes || argv.r || '/' 
  const routes = routesArg.split(',').map((s) => s.trim()).filter(Boolean)

  console.log('MCP guard: base=', base, 'routes=', routes)

  // Try MCP endpoint if present
  try {
    const mcpUrl = new URL('/_next/mcp', base).toString()
    const mcpRes = await fetchUrl(mcpUrl)
    if (mcpRes.status === 200) {
      console.log('Found MCP endpoint at', mcpUrl)
      // Print a short excerpt of the response for diagnostics
      console.log('MCP response (truncated):', mcpRes.body.slice(0, 1000))
    } else {
      console.log('No MCP endpoint (status', mcpRes.status + ') — falling back to route checks')
    }
  } catch (err) {
    console.log('Could not reach MCP endpoint — falling back to route checks:', err.message)
  }

  // Check routes
  const failures = []
  for (const r of routes) {
    const url = new URL(r, base).toString()
    try {
      const res = await fetchUrl(url)
      if (res.status >= 500) {
        failures.push({ route: r, reason: `status ${res.status}` })
        console.error(`Route ${r} returned status ${res.status}`)
        continue
      }
      const body = (res.body || '').toLowerCase()
      const errorSignatures = ['error', 'server error', 'an error occurred', 'internal server error', 'stack trace']
      if (errorSignatures.some((sig) => body.includes(sig))) {
        failures.push({ route: r, reason: 'body contains error signature' })
        console.error(`Route ${r} appears to contain an error signature`)
      } else {
        console.log(`Route ${r} OK (status ${res.status})`)
      }
    } catch (err) {
      failures.push({ route: r, reason: `request failed: ${err.message}` })
      console.error(`Request to ${url} failed: ${err.message}`)
    }
  }

  if (failures.length > 0) {
    console.error('MCP guard: failures detected:', failures)
    process.exit(1)
  }

  console.log('MCP guard: all routes OK')
  process.exit(0)
}

main().catch((err) => {
  console.error('MCP guard fatal error:', err)
  process.exit(2)
})
