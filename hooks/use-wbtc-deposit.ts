'use client';

import { useReadContract } from 'wagmi';
import { WBTC_MANAGER_ABI, WBTC_MANAGER_ADDRESS } from '@/lib/contracts/wbtc-abi';
import { mainnet } from 'wagmi/chains';
import { parseUnits } from 'viem';

/**
 * Hook to query WBTC Manager contract for deposit value conversion
 * @param wbtcAmount - The WBTC amount to query (in wei, 8 decimals)
 */
export const useWBTCDepositValue = (wbtcAmount?: bigint | string) => {
  const amount = typeof wbtcAmount === 'string' ? parseUnits(wbtcAmount, 8) : wbtcAmount;

  const { data, isLoading, error, isError } = useReadContract({
    address: WBTC_MANAGER_ADDRESS,
    abi: WBTC_MANAGER_ABI,
    functionName: 'depositValue',
    args: amount ? [amount] : undefined,
    chainId: mainnet.id,
    query: {
      enabled: !!amount,
    },
  });

  return {
    valueInCHF: data as bigint | undefined,
    isLoading,
    error,
    isError,
  };
};
