'use client';

import { createPublicClient, http, fallback } from 'viem';
import { mainnet } from 'viem/chains';
import { ZCHF_MANAGER_ADDRESS, ZCHF_MANAGER_ABI } from './contracts/zchf-abi';
import { WBTC_MANAGER_ADDRESS, WBTC_MANAGER_ABI } from './contracts/wbtc-abi';
import type { Hex } from 'viem';

// Create a public client for reading blockchain data
const publicClient = createPublicClient({
  chain: mainnet,
  transport: fallback([
    http('https://eth.llamarpc.com'),
    http('https://rpc.flashbots.net'),
    http('https://1rpc.io/eth'),
    http('https://rpc.mevblocker.io'),
  ], { rank: true }),
});

export interface DepositDate {
  timestamp: number;
  formattedDate: string;
}

export interface DepositStats {
  depositDate: DepositDate;
  daysSinceDeposit: number;
  yearsAndDays: { years: number; days: number };
  formattedTimeSinceDeposit: string;
}

export interface BitcoinDepositStats extends DepositStats {
  priceAtCreation: number;
  valueAtCreation: number;
  currentValue: number;
  valueGain: number;
  percentageGain: number;
  principalInSatoshis: bigint;
}

/**
 * Fetch Bitcoin price from CoinGecko for a specific date
 * @param date - Date object to fetch price for
 * @returns Bitcoin price in CHF for that date
 */
export const fetchBitcoinPriceForDate = async (date: Date): Promise<number> => {
  try {
    const dateStr = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${dateStr}&localization=false`,
      { next: { revalidate: 60 * 60 * 24 } } // Cache for 24 hours
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json() as { market_data?: { current_price?: { chf?: number } } };
    const price = data.market_data?.current_price?.chf;

    if (typeof price === 'number' && price > 0) {
      return price;
    }

    throw new Error('Invalid price data from API');
  } catch (error) {
    console.error('Failed to fetch Bitcoin price for date:', error);
    return 0;
  }
};

/**
 * Calculate time since deposit in days and years/days format
 * @param depositTimestamp - Unix timestamp of deposit in seconds
 * @returns Object with days, years, and formatted string
 */
export const calculateTimeSinceDeposit = (depositTimestamp: number): { daysSinceDeposit: number; yearsAndDays: { years: number; days: number }; formattedTimeSinceDeposit: string } => {
  const now = Math.floor(Date.now() / 1000);
  const secondsSinceDeposit = now - depositTimestamp;
  const daysSinceDeposit = Math.floor(secondsSinceDeposit / (24 * 60 * 60));

  const years = Math.floor(daysSinceDeposit / 365);
  const remainingDays = daysSinceDeposit % 365;

  let formattedTimeSinceDeposit = '';
  if (years > 0) {
    formattedTimeSinceDeposit = `${years}y ${remainingDays}d`;
  } else {
    formattedTimeSinceDeposit = `${daysSinceDeposit}d`;
  }

  return {
    daysSinceDeposit,
    yearsAndDays: { years, days: remainingDays },
    formattedTimeSinceDeposit,
  };
};

/**
 * Helper function to fetch deposit date from any contract
 * @param depositIdentifier - The bytes32 deposit identifier
 * @param contractAddress - The contract address
 * @param contractAbi - The contract ABI
 * @returns DepositStats with date and time metrics, or null if not found
 */
const fetchDepositDateByAddress = async (
  depositIdentifier: Hex,
  contractAddress: `0x${string}`,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contractAbi: any
): Promise<DepositStats | null> => {
  try {
    const result = await publicClient.readContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'deposits',
      args: [depositIdentifier],
    });

    const [, startTime] = result as [bigint, bigint];

    if (startTime === BigInt(0)) {
      return null; // Deposit not found
    }

    const timestamp = Number(startTime);
    const date = new Date(timestamp * 1000);
    const depositDate: DepositDate = {
      timestamp,
      formattedDate: date.toLocaleDateString('de-CH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    };

    const timeSinceDeposit = calculateTimeSinceDeposit(timestamp);

    return {
      depositDate,
      ...timeSinceDeposit,
    };
  } catch (error) {
    console.error('Failed to fetch deposit date:', error);
    return null;
  }
};

/**
 * Fetch ZCHF deposit date and stats using the deposits mapping
 * @param depositIdentifier - The bytes32 deposit identifier
 * @returns DepositStats with date and time metrics, or null if not found
 */
export const fetchZCHFDepositDate = async (depositIdentifier: Hex): Promise<DepositStats | null> => {
  return fetchDepositDateByAddress(depositIdentifier, ZCHF_MANAGER_ADDRESS, ZCHF_MANAGER_ABI);
};

/**
 * Fetch WBTC deposit date and stats using the deposits mapping
 * @param depositIdentifier - The bytes32 deposit identifier
 * @returns DepositStats with date and time metrics, or null if not found
 */
export const fetchWBTCDepositDate = async (depositIdentifier: Hex): Promise<DepositStats | null> => {
  return fetchDepositDateByAddress(depositIdentifier, WBTC_MANAGER_ADDRESS, WBTC_MANAGER_ABI);
};
