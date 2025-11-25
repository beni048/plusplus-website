const FALLBACK_PRICE = 70337; // Current fallback price in CHF
const CACHE_KEY = 'bitcoin_price_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=chf';

export interface BitcoinPrice {
  priceInCHF: number;
  timestamp: number;
  source: 'api' | 'cache' | 'fallback';
}

/**
 * Fetch current Bitcoin price in CHF from CoinGecko API
 * CoinGecko provides free real-time price data without authentication
 */
export const fetchCurrentBitcoinPrice = async (): Promise<number> => {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 60 } // Cache for 60 seconds in Next.js
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json() as { bitcoin?: { chf?: number } };
    const price = data.bitcoin?.chf;
    
    if (typeof price === 'number' && price > 0) {
      return price;
    }
    
    throw new Error('Invalid price data from API');
  } catch (error) {
    console.error('Failed to fetch Bitcoin price from CoinGecko:', error);
    return FALLBACK_PRICE;
  }
};

/**
 * Get cached Bitcoin price or fetch new one if cache expired
 */
export const getCachedBitcoinPrice = async (): Promise<BitcoinPrice> => {
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as BitcoinPrice;
      if (Date.now() - parsed.timestamp < CACHE_DURATION) {
        return parsed;
      }
    }
  }

  const priceInCHF = await fetchCurrentBitcoinPrice();
  const priceData: BitcoinPrice = {
    priceInCHF,
    timestamp: Date.now(),
    source: priceInCHF === FALLBACK_PRICE ? 'fallback' : 'api'
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(priceData));
    } catch {
      // Storage might be full, just proceed without caching
    }
  }

  return priceData;
};

/**
 * Convert satoshis to CHF
 * @param satoshis - Amount in satoshis
 * @param priceInCHF - Bitcoin price in CHF
 * @returns Amount in CHF
 */
export const convertSatoshisToCHF = (satoshis: bigint, priceInCHF: number): number => {
  // 1 BTC = 100,000,000 satoshis
  const btcAmount = Number(satoshis) / 100_000_000;
  return btcAmount * priceInCHF;
};

/**
 * Format Bitcoin price for display
 * @param priceInCHF - Bitcoin price in CHF
 * @returns Formatted price string
 */
export const formatBitcoinPrice = (priceInCHF: number): string => {
  return Math.round(priceInCHF).toLocaleString('de-CH');
};
