# Quick Start Guide - Contract Query Page

## 🎯 What You Can Do

Query two smart contracts directly from your app:

### 1️⃣ ZCHF Manager
**Get deposit details for any collateral token**
- Input: Collateral token Ethereum address
- Get: Deposit amount, value in CHF, interest rate

Example query:
```
Address: 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599 (WBTC)
Results: Shows deposit details for WBTC collateral
```

### 2️⃣ WBTC Manager  
**Convert WBTC amounts to CHF value**
- Input: Amount in BTC (e.g., 0.5)
- Get: Equivalent CHF value

Example query:
```
WBTC: 0.5 BTC
Result: CHF equivalent value
```

---

## 🌐 How to Access

### Via Navigation
1. Desktop: Click "Contract Query" in navbar
2. Mobile: Tap menu → "Contract Query"

### Direct URL
- English: `https://plusplus.swiss/en/contract-query`
- German: `https://plusplus.swiss/de/contract-query`

---

## 📖 Using the Page

### ZCHF Manager Tab

1. Click "ZCHF Manager" tab
2. Enter a collateral token address:
   - Example: `0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599` (WBTC)
   - Or any valid Ethereum address
3. Wait for results (usually <1 second)
4. View data in formatted cards:
   - Deposit Amount
   - Value in CHF
   - Interest Rate
5. Click "View on Etherscan" to verify contract

### WBTC Manager Tab

1. Click "WBTC Manager" tab
2. Enter WBTC amount:
   - Example: `0.5` (half BTC)
   - Supports up to 8 decimals
3. Wait for conversion (usually <1 second)
4. View results:
   - Your BTC amount
   - Equivalent CHF value
5. Click "View on Etherscan" to verify contract

---

## 🔧 Contract Details

### ZCHF Manager
- **Address**: `0x9e0569f5C3B9E8272d7876A30c81900c51D0Bf55`
- **Function**: `getDepositDetails(address collateral)`
- **Returns**: deposit amount, CHF value, interest rate
- **Network**: Ethereum Mainnet
- **Type**: Read-only (no gas fees)

### WBTC Manager
- **Address**: `0xdd78844e963c513637BEC8661de05199dE5e9322`
- **Function**: `depositValue(uint256 wbtcAmount)`
- **Returns**: CHF equivalent value
- **Network**: Ethereum Mainnet
- **Type**: Read-only (no gas fees)

---

## ❓ FAQ

**Q: Do I need a wallet connected?**
A: No! This page only reads data from contracts. No wallet needed.

**Q: Will I pay gas fees?**
A: No! Read-only queries are free. No blockchain transactions.

**Q: Which network is this on?**
A: Ethereum Mainnet only.

**Q: Can I write to contracts?**
A: Not on this version. This is read-only. Wallet integration coming soon.

**Q: What if I get an error?**
A: Check that:
- You entered a valid Ethereum address (ZCHF) or valid BTC amount (WBTC)
- The blockchain network is responding
- See error message for more details

**Q: Can I see the raw contract data?**
A: Yes! Scroll down in the results to see raw bigint values.

---

## 🔗 Related Resources

- **Etherscan**: https://etherscan.io (verify contracts)
- **ZCHF Contract**: https://etherscan.io/address/0x9e0569f5c3b9e8272d7876a30c81900c51d0bf55
- **WBTC Contract**: https://etherscan.io/address/0xdd78844e963c513637BEC8661de05199dE5e9322

---

## 🚀 Pro Tips

1. **Copy addresses easily**: Addresses are displayed in monospace font for easy copying

2. **Mobile friendly**: Works perfectly on phones - try it!

3. **Multiple queries**: Tab between ZCHF and WBTC to compare different queries

4. **Link sharing**: Share the page URL with others - it works the same for everyone

5. **Bookmark it**: Add to bookmarks for quick access

---

**Questions?** Check `CONTRACT_QUERY_DOCS.md` for technical details or `IMPLEMENTATION_SUMMARY.md` for architecture info.
