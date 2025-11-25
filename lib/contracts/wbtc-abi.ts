/**
 * WBTC Manager Contract ABI
 * Address: 0xdd78844e963c513637BEC8661de05199dE5e9322
 * https://etherscan.io/address/0xdd78844e963c513637BEC8661de05199dE5e9322
 */

export const WBTC_MANAGER_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'wbtcAmount',
        type: 'uint256',
      },
    ],
    name: 'depositValue',
    outputs: [
      {
        internalType: 'uint256',
        name: 'valueInCHF',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const WBTC_MANAGER_ADDRESS = '0xdd78844e963c513637BEC8661de05199dE5e9322' as const;
