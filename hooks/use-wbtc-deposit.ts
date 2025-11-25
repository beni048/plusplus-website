'use client';

import { useReadContract } from 'wagmi';
import { WBTC_MANAGER_ABI, WBTC_MANAGER_ADDRESS } from '@/lib/contracts/wbtc-abi';
import { mainnet } from 'wagmi/chains';
import { Hex } from 'viem';

/**
 * Hook to query WBTC Manager contract for deposit value
 * @param depositIdentifier - The deposit identifier (bytes32) to query
 */
export const useWBTCDepositValue = (depositIdentifier?: Hex) => {
  const { data, isLoading, error, isError } = useReadContract({
    address: WBTC_MANAGER_ADDRESS,
    abi: WBTC_MANAGER_ABI,
    functionName: 'depositValue',
    args: depositIdentifier ? [depositIdentifier] : undefined,
    chainId: mainnet.id,
    query: {
      enabled: !!depositIdentifier,
    },
  });

  // data is the currentValue in satoshis (uint256)
  const valueInSatoshis = data as bigint | undefined;

  return {
    valueInSatoshis,
    isLoading,
    error,
    isError,
  };
};
