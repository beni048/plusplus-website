# Contract Query Page Documentation

## Overview

The Contract Query page allows users to query two smart contracts on the Ethereum mainnet:

1. **ZCHF Manager** - Query deposit details for collateral tokens
2. **WBTC Manager** - Convert WBTC amounts to CHF equivalent values

## Features

### ZCHF Manager Query
- **Contract Address**: `0x9e0569f5C3B9E8272d7876A30c81900c51D0Bf55`
- **Function**: `getDepositDetails(address collateral)`
- **Returns**:
  - `depositAmount`: Amount of collateral deposited (bigint)
  - `valueInCHF`: Value of the deposit in CHF (bigint)
  - `interestRate`: Interest rate percentage (bigint)

**Usage**:
1. Enter a collateral token address (e.g., WBTC, USDC, etc.)
2. The page automatically queries the contract
3. Results display in formatted cards with raw data

### WBTC Manager Query
- **Contract Address**: `0xdd78844e963c513637BEC8661de05199dE5e9322`
- **Function**: `depositValue(uint256 wbtcAmount)`
- **Returns**:
  - `valueInCHF`: The equivalent CHF value (bigint)

**Usage**:
1. Enter a WBTC amount in BTC (up to 8 decimal places)
2. The page automatically converts and queries
3. Results show both the original amount and CHF equivalent

## Technical Details

### File Structure

```
/lib/contracts/
  ├── zchf-abi.ts          # ZCHF Manager ABI and address
  └── wbtc-abi.ts          # WBTC Manager ABI and address

/hooks/
  ├── use-zchf-deposit.ts  # Hook for ZCHF contract queries
  └── use-wbtc-deposit.ts  # Hook for WBTC contract queries

/components/
  └── Web3Provider.tsx     # Wagmi and React Query configuration

/app/[locale]/
  └── contract-query/
      └── page.tsx         # Main contract query page
```

### Dependencies

- **wagmi** v3.0.1 - Web3 library for Ethereum interactions
- **viem** v2.40.2 - Ethereum utilities and types
- **@tanstack/react-query** - Data fetching and caching
- **@wagmi/core** v3.0.0 - Core wagmi functionality

### Implementation

1. **Web3Provider**: Wraps the application with Wagmi and React Query providers
   - Configured for Ethereum mainnet
   - Uses public HTTP transport (no RPC key needed)
   - Located in root layout

2. **Custom Hooks**: 
   - `useZCHFDepositDetails()` - Reads ZCHF contract
   - `useWBTCDepositValue()` - Reads WBTC contract
   - Both use Wagmi's `useReadContract` hook
   - Auto-enable/disable based on input validity

3. **Page Component**: 
   - Tab-based interface for switching between contracts
   - Real-time input validation
   - Loading and error states
   - Formatted output with raw data display
   - Links to Etherscan for verification

## Usage Examples

### Querying ZCHF Deposit Details

```typescript
const { depositDetails, isLoading, error } = useZCHFDepositDetails(
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' // WBTC address
);

// Result:
// {
//   depositAmount: 5000000000n,
//   valueInCHF: 250000000000000000000n,
//   interestRate: 50000000000000000n
// }
```

### Converting WBTC to CHF

```typescript
const { valueInCHF, isLoading, error } = useWBTCDepositValue('0.5');

// Result:
// valueInCHF: 25000000000000000000n (25000 CHF in wei)
```

## Navigation

The page is accessible from:
- **Desktop**: Navigation bar → "Contract Query"
- **Mobile**: Mobile menu → "Contract Query"
- **Direct URL**: `/en/contract-query` or `/de/contract-query`

## Styling

The page uses the project's design system:
- **Colors**: Primary teal, accent red, neutral palette
- **Components**: Shadcn/ui Card, Button, Input, Tabs, Badge
- **Typography**: Outfit (primary), Mulish (secondary) fonts
- **Responsive**: Mobile-first design with Tailwind CSS

## Error Handling

- **Invalid Address**: Form validation checks for valid Ethereum addresses
- **Contract Errors**: Displays error messages from contract calls
- **Network Issues**: Graceful error display with retry capability
- **Type Safety**: Full TypeScript support with viem types

## Future Enhancements

- Add wallet connection for write operations
- Support for multiple chains
- Historical data tracking
- CSV/JSON export functionality
- Advanced filtering and sorting
- Transaction simulation
