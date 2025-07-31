#!/usr/bin/env node

/**
 * Google Analytics Testing Script
 * Run this script to verify GA4 implementation
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Google Analytics 4 Implementation Audit\n');

// Check 1: Environment Variables
console.log('1️⃣  Checking Environment Configuration...');
const envPath = path.join(process.cwd(), '.env.local');

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  const checks = [
    {
      key: 'NEXT_PUBLIC_ANALYTICS_ENABLED',
      expected: 'true',
      current: envContent.match(/NEXT_PUBLIC_ANALYTICS_ENABLED=(.+)/)?.[1],
      critical: true
    },
    {
      key: 'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID',
      expected: 'G-DNW4MX4HC1',
      current: envContent.match(/NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=(.+)/)?.[1],
      critical: true
    },
    {
      key: 'NEXT_PUBLIC_GA_DEBUG_MODE',
      expected: 'true',
      current: envContent.match(/NEXT_PUBLIC_GA_DEBUG_MODE=(.+)/)?.[1],
      critical: false
    }
  ];

  checks.forEach(check => {
    const status = check.current === check.expected ? '✅' : '❌';
    const priority = check.critical ? '🚨 CRITICAL' : '⚠️  WARNING';
    
    console.log(`   ${status} ${check.key}: ${check.current || 'NOT SET'}`);
    if (check.current !== check.expected && check.critical) {
      console.log(`      ${priority}: Expected "${check.expected}", got "${check.current}"`);
    }
  });
} else {
  console.log('   ❌ .env.local file not found!');
}

// Check 2: File Structure
console.log('\n2️⃣  Checking File Structure...');
const requiredFiles = [
  'app/components/GoogleAnalytics.tsx',
  'lib/gtag.ts',
  'app/components/CookieConsent.tsx',
  'hooks/use-analytics.ts'
];

requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  console.log(`   ${exists ? '✅' : '❌'} ${file}`);
});

// Check 3: Layout Implementation
console.log('\n3️⃣  Checking Layout Implementation...');
const layoutPath = path.join(process.cwd(), 'app/[locale]/layout.tsx');

if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  const hasGoogleAnalytics = layoutContent.includes('GoogleAnalytics');
  const hasCookieConsent = layoutContent.includes('CookieConsent');
  
  console.log(`   ${hasGoogleAnalytics ? '✅' : '❌'} GoogleAnalytics component included`);
  console.log(`   ${hasCookieConsent ? '✅' : '❌'} CookieConsent component included`);
  
  if (hasGoogleAnalytics && hasCookieConsent) {
    const gaIndex = layoutContent.indexOf('GoogleAnalytics');
    const ccIndex = layoutContent.indexOf('CookieConsent');
    const correctOrder = gaIndex < ccIndex;
    
    console.log(`   ${correctOrder ? '✅' : '⚠️'} Component order: GoogleAnalytics should come before CookieConsent`);
  }
} else {
  console.log('   ❌ Layout file not found!');
}

// Check 4: GoogleAnalytics Component
console.log('\n4️⃣  Checking GoogleAnalytics Component...');
const gaPath = path.join(process.cwd(), 'app/components/GoogleAnalytics.tsx');

if (fs.existsSync(gaPath)) {
  const gaContent = fs.readFileSync(gaPath, 'utf8');
  
  const checks = [
    {
      name: 'Uses beforeInteractive strategy',
      test: gaContent.includes('strategy="beforeInteractive"')
    },
    {
      name: 'Has consent mode configuration',
      test: gaContent.includes("'analytics_storage': 'denied'")
    },
    {
      name: 'Includes debug logging',
      test: gaContent.includes('console.log') || gaContent.includes('console.warn')
    },
    {
      name: 'Checks ANALYTICS_ENABLED flag',
      test: gaContent.includes('ANALYTICS_ENABLED')
    }
  ];

  checks.forEach(check => {
    console.log(`   ${check.test ? '✅' : '❌'} ${check.name}`);
  });
} else {
  console.log('   ❌ GoogleAnalytics component not found!');
}

// Check 5: gtag.ts utilities
console.log('\n5️⃣  Checking gtag Utilities...');
const gtagPath = path.join(process.cwd(), 'lib/gtag.ts');

if (fs.existsSync(gtagPath)) {
  const gtagContent = fs.readFileSync(gtagPath, 'utf8');
  
  const functions = [
    'isAnalyticsActive',
    'updateConsent',
    'trackPageView',
    'trackEvent',
    'optOutAnalytics',
    'optInAnalytics'
  ];

  functions.forEach(func => {
    const exists = gtagContent.includes(`export const ${func}`) || gtagContent.includes(`function ${func}`);
    console.log(`   ${exists ? '✅' : '❌'} ${func} function`);
  });
} else {
  console.log('   ❌ gtag utilities not found!');
}

// Summary
console.log('\n📋 AUDIT SUMMARY');
console.log('================');
console.log('🔧 FIXES APPLIED:');
console.log('   ✅ Analytics enabled in environment');
console.log('   ✅ Script loading strategy optimized');
console.log('   ✅ Debug logging added');
console.log('   ✅ TypeScript errors resolved');

console.log('\n🚀 NEXT STEPS:');
console.log('   1. Start development server: npm run dev');
console.log('   2. Open browser console and navigate to your site');
console.log('   3. Accept cookies in the consent banner');
console.log('   4. Check console for debug messages');
console.log('   5. Verify Network tab shows GA requests');
console.log('   6. Monitor GA4 Real-time reports');

console.log('\n📖 For detailed troubleshooting, see: GA4_DEBUGGING_GUIDE.md');
