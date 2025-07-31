# Google Analytics Testing Guide

## 🧪 Testing Your GA4 Implementation

### 1. **Browser Console Testing**

Open your browser's developer tools console and run these commands to test GA4:

```javascript
// Check if gtag is loaded
console.log('gtag loaded:', typeof window.gtag);

// Check current consent status
localStorage.getItem('cookie-consent');

// Check GA tracking ID
console.log('GA Tracking ID:', 'G-DNW4MX4HC1');

// Test manual event (only works if consent given)
if (typeof window.gtag === 'function') {
  window.gtag('event', 'test_event', {
    event_category: 'testing',
    event_label: 'manual_test'
  });
  console.log('Test event sent');
}
```

### 2. **Google Analytics Real-Time Reports**

1. Go to your Google Analytics property: https://analytics.google.com
2. Navigate to Reports > Real-time > Overview
3. Visit your website with analytics consent enabled
4. You should see your visit appear in real-time reports

### 3. **Browser Network Tab Testing**

1. Open Developer Tools → Network tab
2. Filter by "collect" or "google-analytics"
3. Accept cookies on your website
4. Navigate between pages
5. You should see network requests to Google Analytics

### 4. **Consent Flow Testing**

#### Test Cookie Banner:
1. Visit site in incognito/private mode
2. Cookie banner should appear
3. Test "Accept All" - analytics should start
4. Test "Decline All" - no analytics requests
5. Test "Customize" - granular controls should work

#### Test Privacy Controls:
1. Visit `/privacy-settings`
2. Toggle analytics on/off
3. Test data deletion
4. Verify preferences persist

### 5. **Debug Mode Testing**

Set debug mode in `.env.local`:
```bash
NEXT_PUBLIC_GA_DEBUG_MODE=true
```

Check browser console for debug messages:
- GA initialization confirmation
- Consent updates
- Event tracking logs

### 6. **GDPR Compliance Testing**

#### EU User Simulation:
1. Use VPN with EU location
2. Verify consent banner appears
3. Test all consent options
4. Verify analytics only runs with consent

#### Data Deletion Testing:
1. Accept cookies and browse site
2. Go to privacy settings
3. Click "Delete My Data"
4. Verify all data is cleared

### 7. **Expected Network Requests**

When analytics is enabled, you should see requests to:
- `www.googletagmanager.com/gtag/js` (script loading)
- `www.google-analytics.com/g/collect` (event tracking)

### 8. **Common Issues & Solutions**

#### No Analytics Data:
- Check tracking ID is correct: `G-DNW4MX4HC1`
- Verify user has accepted cookies
- Check browser console for errors
- Ensure debug mode is enabled for testing

#### Consent Not Working:
- Check localStorage: `localStorage.getItem('cookie-consent')`
- Verify consent updates are firing
- Check browser console for consent logs

#### Real-time Not Showing:
- Wait 30-60 seconds for data to appear
- Verify GA4 property is correctly configured
- Check filters aren't blocking your traffic

### 9. **Production Checklist**

Before going live:
- [ ] Set `NEXT_PUBLIC_GA_DEBUG_MODE=false`
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Verify EU compliance
- [ ] Test all consent scenarios
- [ ] Verify privacy controls work
- [ ] Check GA4 real-time reports

### 10. **Monitoring Commands**

```javascript
// Check if user has opted out
localStorage.getItem('ga-opt-out');

// Check cookie preferences
JSON.parse(localStorage.getItem('cookie-preferences') || '{}');

// Check if analytics is active
// (consent given and not opted out)
const consent = localStorage.getItem('cookie-consent');
const optOut = localStorage.getItem('ga-opt-out');
const isActive = consent === 'accepted' && optOut !== 'true';
console.log('Analytics active:', isActive);
```

Your Google Analytics 4 implementation with GDPR compliance is now properly configured and ready for testing!
