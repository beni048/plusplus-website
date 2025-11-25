'use client';

import { useReadContract } from 'wagmi';
import { ZCHF_MANAGER_ABI, ZCHF_MANAGER_ADDRESS } from '@/lib/contracts/zchf-abi';
import { mainnet } from 'wagmi/chains';
import { Address } from 'viem';

export interface ZCHFDepositDetails {
  depositAmount: bigint;
  valueInCHF: bigint;
  interestRate: bigint;
}

/**
 * Hook to query ZCHF Manager contract for deposit details
 * @param collateralAddress - The collateral token address to query
 */
export const useZCHFDepositDetails = (collateralAddress?: Address) => {
  const { data, isLoading, error, isError } = useReadContract({
    address: ZCHF_MANAGER_ADDRESS,
    abi: ZCHF_MANAGER_ABI,
    functionName: 'getDepositDetails',
    args: collateralAddress ? [collateralAddress] : undefined,
    chainId: mainnet.id,
    query: {
      enabled: !!collateralAddress,
    },
  });

  return {
    depositDetails: data as ZCHFDepositDetails | undefined,
    isLoading,
    error,
    isError,
  };
};
