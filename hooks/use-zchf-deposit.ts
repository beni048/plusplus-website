'use client';

import { useReadContract } from 'wagmi';
import { ZCHF_MANAGER_ABI, ZCHF_MANAGER_ADDRESS } from '@/lib/contracts/zchf-abi';
import { mainnet } from 'wagmi/chains';
import { Hex } from 'viem';

export interface ZCHFDepositDetails {
  initialAmount: bigint;
  netInterest: bigint;
}

/**
 * Hook to query ZCHF Manager contract for deposit details
 * @param depositIdentifier - The deposit identifier (bytes32) to query
 */
export const useZCHFDepositDetails = (depositIdentifier?: Hex) => {
  const { data, isLoading, error, isError } = useReadContract({
    address: ZCHF_MANAGER_ADDRESS,
    abi: ZCHF_MANAGER_ABI,
    functionName: 'getDepositDetails',
    args: depositIdentifier ? [depositIdentifier] : undefined,
    chainId: mainnet.id,
    query: {
      enabled: !!depositIdentifier,
    },
  });

  // Transform array response [initialAmount, netInterest] to object
  let depositDetails: ZCHFDepositDetails | undefined;
  if (data && Array.isArray(data) && data.length === 2) {
    depositDetails = {
      initialAmount: data[0] as bigint,
      netInterest: data[1] as bigint,
    };
  }

  return {
    depositDetails,
    isLoading,
    error,
    isError,
  };
};
