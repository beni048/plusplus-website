import { useQuery } from '@tanstack/react-query';
import { 
  fetchZCHFDepositDate, 
  fetchWBTCDepositDate,
  fetchBitcoinPriceForDate,
  type DepositStats,
  type BitcoinDepositStats,
} from '@/lib/deposit-date';
import type { Hex } from 'viem';

/**
 * Hook to fetch ZCHF deposit creation date and time since deposit
 */
export const useZCHFDepositDate = (depositIdentifier?: Hex) => {
  const { data: depositStats, isLoading, error, isError } = useQuery({
    queryKey: ['zchf-deposit-date', depositIdentifier],
    queryFn: async (): Promise<DepositStats | null> => {
      if (!depositIdentifier) return null;
      return await fetchZCHFDepositDate(depositIdentifier);
    },
    enabled: !!depositIdentifier,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    depositStats,
    isLoading,
    error: error as Error | null,
    isError,
  };
};

/**
 * Hook to fetch WBTC deposit creation date, time since deposit, and gain calculations
 */
export const useWBTCDepositDate = (depositIdentifier?: Hex, currentValueInSatoshis?: bigint, currentBitcoinPrice?: number) => {
  const { data: depositStats, isLoading, error, isError } = useQuery({
    queryKey: ['wbtc-deposit-date', depositIdentifier, currentValueInSatoshis?.toString(), currentBitcoinPrice],
    queryFn: async (): Promise<BitcoinDepositStats | null> => {
      if (!depositIdentifier) return null;
      const stats = await fetchWBTCDepositDate(depositIdentifier);
      if (!stats) return null;

      // Fetch Bitcoin price at creation date
      const creationDate = new Date(stats.depositDate.timestamp * 1000);
      const priceAtCreation = await fetchBitcoinPriceForDate(creationDate);

      // Calculate values and gains
      const currentValue = currentValueInSatoshis && currentBitcoinPrice 
        ? (Number(currentValueInSatoshis) / 100_000_000) * currentBitcoinPrice
        : 0;

      const valueAtCreation = currentValueInSatoshis && priceAtCreation
        ? (Number(currentValueInSatoshis) / 100_000_000) * priceAtCreation
        : 0;

      const valueGain = currentValue - valueAtCreation;
      const percentageGain = valueAtCreation > 0 ? (valueGain / valueAtCreation) * 100 : 0;

      return {
        ...stats,
        priceAtCreation,
        valueAtCreation,
        currentValue,
        valueGain,
        percentageGain,
        principalInSatoshis: currentValueInSatoshis || BigInt(0),
      };
    },
    enabled: !!depositIdentifier && !!currentValueInSatoshis && !!currentBitcoinPrice,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    depositStats,
    isLoading,
    error: error as Error | null,
    isError,
  };
};
