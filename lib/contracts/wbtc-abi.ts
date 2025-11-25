/**
 * WBTC Manager Contract ABI
 * Address: 0xdd78844e963c513637BEC8661de05199dE5e9322
 * https://etherscan.io/address/0xdd78844e963c513637BEC8661de05199dE5e9322
 * 
 * depositValue(bytes32 identifier) returns (uint256 currentValue)
 * Returns the current value of a single deposit after applying linear custody fees
 * Value is returned in satoshis (BTC with 8 decimals)
 */

export const WBTC_MANAGER_ABI = [
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'identifier',
        type: 'bytes32',
      },
    ],
    name: 'depositValue',
    outputs: [
      {
        internalType: 'uint256',
        name: 'currentValue',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'identifier',
        type: 'bytes32',
      },
    ],
    name: 'deposits',
    outputs: [
      {
        internalType: 'uint256',
        name: 'principal',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'startTime',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'identifier',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'DepositCreated',
    type: 'event',
  },
] as const;

export const WBTC_MANAGER_ADDRESS = '0xdd78844e963c513637BEC8661de05199dE5e9322' as const;
