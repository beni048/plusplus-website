import bitcoinMonthly from '@/data/bitcoin-historical.json';

export type CalculationResult = {
  totalReturn: number;
  annualReturn: number;
  finalAmount: number;
  totalCost: number;
  annualCost: number;
  availability: 'fully_available' | 'no_deposit_required';
  isHistorical?: boolean;
  percentageGain?: number;
};

export type Product = {
  id: string;
  nameKey: string;
  rate: number;
  rateRange: string;
  type: 'investment' | 'cost';
  color: string;
  hasDeposit: boolean;
};

const FALLBACK_PRICE = 114067.71; // Oct 2025 fallback

export const getBitcoinPriceForMonth = (year: number, month: number): number => {
  const key = `${year}-${month.toString().padStart(2, '0')}`;
  return (bitcoinMonthly as Record<string, number>)[key] ?? FALLBACK_PRICE;
};

export const calculateBitcoinHistorical = (deposit: number, years: number): CalculationResult => {
  const endDate = new Date(2025, 9, 1); // October 1, 2025
  const startDate = new Date(2009, 9, 1); // October 1, 2009
  const actualStartDate = new Date(endDate);
  actualStartDate.setFullYear(actualStartDate.getFullYear() - years);

  const limitedStartDate = actualStartDate < startDate ? startDate : actualStartDate;
  const startPrice = getBitcoinPriceForMonth(limitedStartDate.getFullYear(), limitedStartDate.getMonth() + 1);
  const endPrice = getBitcoinPriceForMonth(2025, 10);

  const percentageGain = ((endPrice - startPrice) / startPrice);
  const totalReturn = deposit * percentageGain;
  const finalAmount = deposit + totalReturn;
  const annualReturn = years > 0 ? totalReturn / years : 0;

  return {
    totalReturn,
    annualReturn,
    finalAmount,
    totalCost: 0,
    annualCost: 0,
    availability: 'fully_available',
    isHistorical: true,
    percentageGain: percentageGain * 100
  };
};

export const PRODUCTS: Record<string, Product> = {
  kautionskonto: {
    id: 'kautionskonto',
    nameKey: 'depositCalculator.products.kautionskonto',
    rate: 0.0025,
    rateRange: '0.25%',
    type: 'investment',
    color: '#9CA3AF',
    hasDeposit: true
  },
  kautionsversicherung: {
    id: 'kautionsversicherung',
    nameKey: 'depositCalculator.products.kautionsversicherung',
    rate: 0.045,
    rateRange: '4.5%',
    type: 'cost',
    color: '#6B7280',
    hasDeposit: false
  },
  bitcoinDeposit: {
    id: 'bitcoinDeposit',
    nameKey: 'depositCalculator.products.bitcoinDeposit',
    rate: 0.63,
    rateRange: 'Historical',
    type: 'investment',
    color: '#F97316',
    hasDeposit: true
  },
  chfStablecoin: {
    id: 'chfStablecoin',
    nameKey: 'depositCalculator.products.chfStablecoin',
    rate: 0.03,
    rateRange: '3%',
    type: 'investment',
    color: '#10B981',
    hasDeposit: true
  }
};

export const calculateProduct = (deposit: number, product: Product, years: number): CalculationResult => {
  if (product.id === 'bitcoinDeposit') {
    return calculateBitcoinHistorical(deposit, years);
  }

  if (product.type === 'investment') {
    if (product.id === 'chfStablecoin') {
      const totalReturn = deposit * product.rate * years;
      const finalAmount = deposit + totalReturn;
      const annualReturn = deposit * product.rate;

      return {
        totalReturn,
        annualReturn,
        finalAmount,
        totalCost: 0,
        annualCost: 0,
        availability: product.hasDeposit ? 'fully_available' : 'no_deposit_required'
      };
    } else {
      const finalAmount = deposit * Math.pow(1 + product.rate, years);
      const totalReturn = finalAmount - deposit;
      const annualReturn = years > 0 ? totalReturn / years : 0;

      return {
        totalReturn,
        annualReturn,
        finalAmount,
        totalCost: 0,
        annualCost: 0,
        availability: product.hasDeposit ? 'fully_available' : 'no_deposit_required'
      };
    }
  } else {
    const totalCost = deposit * product.rate * years;
    return {
      totalReturn: 0,
      annualReturn: 0,
      finalAmount: 0,
      totalCost,
      annualCost: deposit * product.rate,
      availability: 'no_deposit_required'
    };
  }
};

export const formatCurrency = (amount: number, currency: string = 'CHF') => {
  return `${Math.round(amount).toLocaleString('de-CH')} ${currency}`;
};

export const formatCurrencyWithOverflow = (amount: number, currency: string = 'CHF') => {
  if (Math.abs(amount) >= 99000000) {
    return '🚀 CHF';
  }
  return formatCurrency(amount, currency);
};

export const formatCurrencyMobileWithOverflow = (amount: number, currency: string = 'CHF') => {
  if (Math.abs(amount) >= 99000000) {
    return { amount: '🚀', currency: 'CHF' };
  }
  const formatted = Math.round(amount).toLocaleString('de-CH');
  return { amount: formatted, currency };
};

const depositCalculator = {
  getBitcoinPriceForMonth,
  calculateBitcoinHistorical,
  PRODUCTS,
  calculateProduct,
  formatCurrency,
  formatCurrencyWithOverflow,
  formatCurrencyMobileWithOverflow
};

export default depositCalculator;
