/**
 * ZCHF Manager Contract ABI
 * Address: 0x9e0569f5C3B9E8272d7876A30c81900c51D0Bf55
 * https://etherscan.io/address/0x9e0569f5c3b9e8272d7876a30c81900c51d0bf55#readContract#F9
 * 
 * getDepositDetails(bytes32 identifier) returns (uint192 initialAmount, uint192 netInterest)
 * Returns the current principal and net interest for a given deposit
 */

export const ZCHF_MANAGER_ABI = [
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'identifier',
        type: 'bytes32',
      },
    ],
    name: 'getDepositDetails',
    outputs: [
      {
        internalType: 'uint192',
        name: 'initialAmount',
        type: 'uint192',
      },
      {
        internalType: 'uint192',
        name: 'netInterest',
        type: 'uint192',
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
        internalType: 'uint192',
        name: 'principal',
        type: 'uint192',
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
        internalType: 'uint192',
        name: 'amount',
        type: 'uint192',
      },
    ],
    name: 'DepositCreated',
    type: 'event',
  },
] as const;

export const ZCHF_MANAGER_ADDRESS = '0x9e0569f5C3B9E8272d7876A30c81900c51D0Bf55' as const;
