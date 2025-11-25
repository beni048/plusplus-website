/**
 * ZCHF Manager Contract ABI
 * Address: 0x9e0569f5C3B9E8272d7876A30c81900c51D0Bf55
 * https://etherscan.io/address/0x9e0569f5c3b9e8272d7876a30c81900c51d0bf55
 */

export const ZCHF_MANAGER_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'collateral',
        type: 'address',
      },
    ],
    name: 'getDepositDetails',
    outputs: [
      {
        internalType: 'uint256',
        name: 'depositAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'valueInCHF',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'interestRate',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const ZCHF_MANAGER_ADDRESS = '0x9e0569f5C3B9E8272d7876A30c81900c51D0Bf55' as const;
