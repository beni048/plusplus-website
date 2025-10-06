'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

// Monthly Bitcoin opening prices (start of month) - from attachment CSV data
const BITCOIN_MONTHLY_DATA = {
  '2009-10': 0.00076392, '2009-11': 0.00121911, '2009-12': 0.0008106,
  '2010-01': 0.00071822, '2010-02': 0.00329674, '2010-03': 0.00539695, '2010-04': 0.003, '2010-05': 0.003, '2010-06': 0.0046, '2010-07': 0.0055, '2010-08': 0.061, '2010-09': 0.062, '2010-10': 0.06189, '2010-11': 0.1925, '2010-12': 0.2095,
  '2011-01': 0.292, '2011-02': 0.5451, '2011-03': 0.8601, '2011-04': 0.77701, '2011-05': 3.5, '2011-06': 8.741, '2011-07': 16.10098, '2011-08': 13.3503, '2011-09': 8.19951, '2011-10': 5.16699, '2011-11': 3.25617, '2011-12': 2.99,
  '2012-01': 4.70785, '2012-02': 5.53423, '2012-03': 4.86, '2012-04': 4.88002, '2012-05': 4.9491, '2012-06': 5.19957, '2012-07': 6.68998, '2012-08': 9.35, '2012-09': 10.15, '2012-10': 12.35, '2012-11': 11.17963, '2012-12': 12.565,
  '2013-01': 13.51001, '2013-02': 20.50879, '2013-03': 33.37999, '2013-04': 93.25, '2013-05': 139.00004, '2013-06': 128.82506, '2013-07': 97.50888, '2013-08': 106.22691, '2013-09': 141.0, '2013-10': 143.28122, '2013-11': 211.20177, '2013-12': 1206.00001,
  '2014-01': 737.67, '2014-02': 804.8, '2014-03': 549.01, '2014-04': 456.3, '2014-05': 449.0201, '2014-06': 627.01, '2014-07': 642.26, '2014-08': 579.49, '2014-09': 477.84, '2014-10': 386.93, '2014-11': 336.72, '2014-12': 379.67,
  '2015-01': 322.31, '2015-02': 215.91, '2015-03': 255.7, '2015-04': 244.56, '2015-05': 236.18, '2015-06': 228.38, '2015-07': 262.9, '2015-08': 284.45, '2015-09': 231.06, '2015-10': 236.72, '2015-11': 316.0, '2015-12': 376.89,
  '2016-01': 429.17, '2016-02': 367.89, '2016-03': 436.41, '2016-04': 416.03, '2016-05': 454.02, '2016-06': 531.25, '2016-07': 673.5, '2016-08': 626.97, '2016-09': 572.89, '2016-10': 608.99, '2016-11': 697.07, '2016-12': 742.51,
  '2017-01': 973.37, '2017-02': 970.01, '2017-03': 1192.72, '2017-04': 1088.99, '2017-05': 1384.55, '2017-06': 2303.61, '2017-07': 2455.19, '2017-08': 2856.89, '2017-09': 4743.94, '2017-10': 4339.01, '2017-11': 6445.01, '2017-12': 9903.01,
  '2018-01': 13863.14, '2018-02': 10099.99, '2018-03': 10307.26, '2018-04': 6928.5, '2018-05': 9243.83, '2018-06': 7485.0, '2018-07': 6383.19, '2018-08': 7727.28, '2018-09': 7015.01, '2018-10': 6605.0, '2018-11': 6304.18, '2018-12': 3976.01,
  '2019-01': 3691.87, '2019-02': 3411.5, '2019-03': 3792.14, '2019-04': 4095.0, '2019-05': 5270.68, '2019-06': 8554.06, '2019-07': 10761.26, '2019-08': 10089.97, '2019-09': 9600.86, '2019-10': 8304.95, '2019-11': 9159.96, '2019-12': 7555.92,
  '2020-01': 7165.72, '2020-02': 9334.98, '2020-03': 8523.33, '2020-04': 6424.02, '2020-05': 8624.68, '2020-06': 9445.83, '2020-07': 9135.91, '2020-08': 11351.61, '2020-09': 11655.0, '2020-10': 10779.63, '2020-11': 13803.69, '2020-12': 19713.94,
  '2021-01': 28990.08, '2021-02': 33137.75, '2021-03': 45231.74, '2021-04': 58800.01, '2021-05': 57798.77, '2021-06': 37276.23, '2021-07': 35060.0, '2021-08': 41499.0, '2021-09': 47110.33, '2021-10': 43828.89, '2021-11': 61346.17, '2021-12': 56998.35,
  '2022-01': 46211.24, '2022-02': 38492.53, '2022-03': 43189.61, '2022-04': 45525.25, '2022-05': 37640.35, '2022-06': 31784.18, '2022-07': 19985.62, '2022-08': 23307.44, '2022-09': 20048.27, '2022-10': 19423.57, '2022-11': 20489.55, '2022-12': 17165.44,
  '2023-01': 16531.83, '2023-02': 23127.15, '2023-03': 23144.37, '2023-04': 28475.41, '2023-05': 29240.49, '2023-06': 27221.54, '2023-07': 30466.73, '2023-08': 29230.61, '2023-09': 25931.51, '2023-10': 26961.0, '2023-11': 34656.38, '2023-12': 37732.27,
  '2024-01': 42288.58, '2024-02': 42545.47, '2024-03': 61179.03, '2024-04': 71291.5, '2024-05': 60621.2, '2024-06': 67473.07, '2024-07': 62669.14, '2024-08': 64609.61, '2024-09': 58968.37, '2024-10': 63305.52, '2024-11': 70198.02, '2024-12': 96464.95,
  '2025-01': 93347.59, '2025-02': 102414.05, '2025-03': 84297.74, '2025-04': 82534.31, '2025-05': 94182.55, '2025-06': 104645.87, '2025-07': 107173.21, '2025-08': 115756.12, '2025-09': 108247.95, '2025-10': 114067.71
};

// Function to get Bitcoin price for a specific year/month
const getBitcoinPriceForMonth = (year: number, month: number): number => {
  const key = `${year}-${month.toString().padStart(2, '0')}`;
  return BITCOIN_MONTHLY_DATA[key as keyof typeof BITCOIN_MONTHLY_DATA] || 114067.71; // fallback to Oct 2025 price
};

// Function to calculate Bitcoin return based on historical data with percentage gains
const calculateBitcoinHistorical = (deposit: number, years: number): any => {
  const endDate = new Date(2025, 9, 1); // October 1, 2025
  const startDate = new Date(2009, 9, 1); // October 1, 2009
  
  // Calculate actual start date based on years back from Oct 2025
  const actualStartDate = new Date(endDate);
  actualStartDate.setFullYear(actualStartDate.getFullYear() - years);
  
  // Get prices - ensure we don't go before Oct 2009
  const limitedStartDate = actualStartDate < startDate ? startDate : actualStartDate;
  const startPrice = getBitcoinPriceForMonth(limitedStartDate.getFullYear(), limitedStartDate.getMonth() + 1);
  const endPrice = getBitcoinPriceForMonth(2025, 10); // October 2025
  
  // Calculate percentage gain from initial deposit
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
    percentageGain: percentageGain * 100 // Store percentage for display
  };
};

// Product definitions with Swiss market rates (October 2025)
export const PRODUCTS = {
  bankDeposit: {
    id: 'bankDeposit',
    nameKey: 'depositCalculator.products.bankDeposit',
    rate: 0.0025, // 0.25% average
    rateRange: '0.1-0.4%',
    type: 'investment',
    color: '#9CA3AF', // gray-400 - boring bank color
    hasDeposit: true
  },
  depositInsurance: {
    id: 'depositInsurance',
    nameKey: 'depositCalculator.products.depositInsurance',
    rate: 0.045, // 4.5% average
    rateRange: '4-5%',
    type: 'cost',
    color: '#6B7280', // gray-500 - boring insurance color
    hasDeposit: false
  },
  bitcoinDeposit: {
    id: 'bitcoinDeposit',
    nameKey: 'depositCalculator.products.bitcoinDeposit',
    rate: 0.63, // 63% average 2020-2025 (not used for historical calculation)
    rateRange: 'Historical',
    type: 'investment',
    color: '#F97316', // orange-500 - keep bitcoin orange
    hasDeposit: true
  },
  frankencoinDeposit: {
    id: 'frankencoinDeposit',
    nameKey: 'depositCalculator.products.frankencoinDeposit',
    rate: 0.03, // 3% current
    rateRange: '3%',
    type: 'investment',
    color: '#10B981', // emerald-500 - keep green
    hasDeposit: true
  }
};

// Calculation functions
export const calculateProduct = (deposit: number, product: any, years: number) => {
  // Use historical data for Bitcoin
  if (product.id === 'bitcoinDeposit') {
    return calculateBitcoinHistorical(deposit, years);
  }
  
  if (product.type === 'investment') {
    if (product.id === 'frankencoinDeposit') {
      // Simple interest for Frankencoin only
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
      // Compound interest for all other investments
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
    // Simple annual cost for insurance/costs
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

// Handle large numbers with fun messages
export const formatCurrencyWithOverflow = (amount: number, currency: string = 'CHF') => {
  if (Math.abs(amount) >= 99000000) { // 99M+
    return "🚀 CHF";
  }
  return formatCurrency(amount, currency);
};

export const formatCurrencyMobileWithOverflow = (amount: number, currency: string = 'CHF') => {
  if (Math.abs(amount) >= 99000000) { // 99M+
    return { amount: "🚀", currency: "CHF" };
  }
  const formatted = Math.round(amount).toLocaleString('de-CH');
  return { amount: formatted, currency };
};

interface ProductCardProps {
  title: string;
  product: any;
  grossRent: number;
  rentalPeriod: number;
  depositMultiplier: number;
  t: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  title, 
  product, 
  grossRent, 
  rentalPeriod, 
  depositMultiplier,
  t 
}) => {
  const deposit = grossRent * depositMultiplier;
  const calc = calculateProduct(deposit, product, rentalPeriod);

  // Split title into provider and product
  const titleParts = title.split(' - ');
  const provider = titleParts[0] || '';
  const productName = titleParts[1] || title;

  return (
    <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-neutral-black">
          <div className="flex-1">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-3" 
                style={{ backgroundColor: product.color }}
              ></div>
              <span className="text-lg font-semibold">{productName}</span>
            </div>
            <div className="text-sm italic text-gray-500 ml-6">{provider}</div>
          </div>
          <span className="ml-auto text-xs bg-neutral-light text-neutral-dark px-2 py-1 rounded-full">
            {product.rateRange}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-neutral-dark font-medium">
            {product.type === 'investment' 
              ? t('depositCalculator.totalReturn') 
              : t('depositCalculator.totalCost')
            }
          </span>
          <div 
            className="font-bold text-lg text-right"
            style={{ color: product.type === 'investment' ? product.color : '#EF4444' }}
          >
            <span className="hidden sm:inline">
              {product.type === 'investment' ? '+' : '-'} 
              {formatCurrencyWithOverflow(product.type === 'investment' ? calc.totalReturn : calc.totalCost)}
            </span>
            <div className="sm:hidden">
              <div>{product.type === 'investment' ? '+' : '-'}{formatCurrencyMobileWithOverflow(product.type === 'investment' ? calc.totalReturn : calc.totalCost).amount}</div>
              <div className="text-sm">{formatCurrencyMobileWithOverflow(product.type === 'investment' ? calc.totalReturn : calc.totalCost).currency}</div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-neutral-dark font-medium">{t('depositCalculator.perYear')}</span>
          <div 
            className="font-bold text-right"
            style={{ color: product.type === 'investment' ? product.color : '#EF4444' }}
          >
            <span className="hidden sm:inline">
              {product.type === 'investment' ? '+' : '-'} 
              {formatCurrencyWithOverflow(product.type === 'investment' ? calc.annualReturn : calc.annualCost)}/Jahr
            </span>
            <div className="sm:hidden">
              <div>{product.type === 'investment' ? '+' : '-'}{formatCurrencyMobileWithOverflow(product.type === 'investment' ? calc.annualReturn : calc.annualCost).amount}</div>
              <div className="text-sm">{formatCurrencyMobileWithOverflow(product.type === 'investment' ? calc.annualReturn : calc.annualCost).currency}/Jahr</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ChartData {
  year: string;
  productA: number;
  productB: number;
}

interface CapitalDevelopmentChartProps {
  grossRent: number;
  rentalPeriod: number;
  depositMultiplier: number;
  productA: any;
  productB: any;
  t: any;
}

const CapitalDevelopmentChart: React.FC<CapitalDevelopmentChartProps> = ({ 
  grossRent, 
  rentalPeriod, 
  depositMultiplier,
  productA,
  productB,
  t 
}) => {
  const deposit = grossRent * depositMultiplier;
  
  const generateData = (): ChartData[] => {
    const data: ChartData[] = [];
    const hasBitcoin = productA.id === 'bitcoinDeposit' || productB.id === 'bitcoinDeposit';
    
    if (hasBitcoin) {
      // For Bitcoin: generate monthly data points for volatility but label only years
      const monthsTotal = Math.round(rentalPeriod * 12);
      const endDate = new Date(2025, 9, 1); // October 1, 2025
      
      for (let month = 0; month <= monthsTotal; month++) {
        const currentYear = month / 12;
        
        // Calculate target date for this data point
        const targetDate = new Date(endDate);
        targetDate.setMonth(targetDate.getMonth() - (monthsTotal - month));
        
        const minDate = new Date(2009, 9, 1); // October 1, 2009
        if (targetDate < minDate) targetDate.setTime(minDate.getTime());
        
        let valueA, valueB;
        
        if (productA.id === 'bitcoinDeposit') {
          const bitcoinPrice = getBitcoinPriceForMonth(targetDate.getFullYear(), targetDate.getMonth() + 1);
          const initialDate = new Date(endDate);
          initialDate.setFullYear(initialDate.getFullYear() - rentalPeriod);
          if (initialDate < minDate) initialDate.setTime(minDate.getTime());
          const initialPrice = getBitcoinPriceForMonth(initialDate.getFullYear(), initialDate.getMonth() + 1);
          const percentageGain = ((bitcoinPrice - initialPrice) / initialPrice);
          valueA = deposit * (1 + percentageGain);
        } else {
          const calcA = calculateProduct(deposit, productA, currentYear);
          valueA = productA.type === 'investment' ? deposit + calcA.totalReturn : -calcA.totalCost;
        }
        
        if (productB.id === 'bitcoinDeposit') {
          const bitcoinPrice = getBitcoinPriceForMonth(targetDate.getFullYear(), targetDate.getMonth() + 1);
          const initialDate = new Date(endDate);
          initialDate.setFullYear(initialDate.getFullYear() - rentalPeriod);
          if (initialDate < minDate) initialDate.setTime(minDate.getTime());
          const initialPrice = getBitcoinPriceForMonth(initialDate.getFullYear(), initialDate.getMonth() + 1);
          const percentageGain = ((bitcoinPrice - initialPrice) / initialPrice);
          valueB = deposit * (1 + percentageGain);
        } else {
          const calcB = calculateProduct(deposit, productB, currentYear);
          valueB = productB.type === 'investment' ? deposit + calcB.totalReturn : -calcB.totalCost;
        }
        
        // Only show year labels at exact year boundaries, empty labels for monthly points
        const isYearBoundary = month === 0 || (month % 12 === 0 && month <= monthsTotal);
        const yearLabel = isYearBoundary ? 
          (currentYear === 0 ? '0' : `${t('depositCalculator.year')} ${Math.round(currentYear)}`) : '';
        
        data.push({
          year: yearLabel,
          productA: valueA,
          productB: valueB
        });
      }
    } else {
      // Standard yearly calculation for non-Bitcoin products
      for (let year = 0; year <= rentalPeriod; year++) {
        const calcA = calculateProduct(deposit, productA, year);
        const calcB = calculateProduct(deposit, productB, year);
        
        data.push({
          year: year === 0 ? '0' : `${t('depositCalculator.year')} ${year}`,
          productA: productA.type === 'investment' ? deposit + calcA.totalReturn : -calcA.totalCost,
          productB: productB.type === 'investment' ? deposit + calcB.totalReturn : -calcB.totalCost
        });
      }
    }
    return data;
  };

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-lg">
          <p className="text-neutral-black font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
              {entry.dataKey === 'productA' 
                ? t(productA.nameKey) 
                : t(productB.nameKey)
              }: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-neutral-black">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <span className="text-xl font-semibold mb-3 sm:mb-0">{t('depositCalculator.capitalDevelopment')} (CHF)</span>
            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: productA.color }}
              ></div>
              <span className="text-sm font-medium text-neutral-dark">
                {t(productA.nameKey)}
              </span>
            </div>
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: productB.color }}
              ></div>
              <span className="text-sm font-medium text-neutral-dark">
                {t(productB.nameKey)}
              </span>
            </div>
          </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={generateData()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="year" 
              stroke="#6B7280" 
              fontSize={12}
              fontFamily="var(--font-mulish)"
            />
            <YAxis 
              stroke="#6B7280" 
              fontSize={12}
              fontFamily="var(--font-mulish)"
              width={30}
              tickFormatter={(value) => {
                if (Math.abs(value) >= 99000000) {
                  return value < 0 ? "-🚀" : "🚀";
                }
                if (Math.abs(value) >= 1000000) {
                  return `${(value / 1000000).toFixed(1)}M`.replace('.0M', 'M');
                }
                if (Math.abs(value) >= 1000) {
                  return `${(value / 1000).toFixed(1)}k`.replace('.0k', 'k');
                }
                return Math.round(value).toString();
              }}
            />
            <Tooltip content={customTooltip} />
            <Line 
              type="monotone" 
              dataKey="productA" 
              stroke={productA.color}
              strokeWidth={3}
              dot={false}
              strokeDasharray="0"
            />
            <Line 
              type="monotone" 
              dataKey="productB" 
              stroke={productB.color}
              strokeWidth={3}
              dot={false}
              strokeDasharray="0"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default function DepositCalculator() {
  const t = useTranslations();
  const [grossRent, setGrossRent] = useState(2000);
  const [rentalPeriod, setRentalPeriod] = useState(5);
  const [depositMultiplier, setDepositMultiplier] = useState(3);
  const [productA, setProductA] = useState('bankDeposit');
  const [productB, setProductB] = useState('frankencoinDeposit');

  const selectedProductA = PRODUCTS[productA as keyof typeof PRODUCTS];
  const selectedProductB = PRODUCTS[productB as keyof typeof PRODUCTS];

  const maxRentalPeriod = 16; // Updated to 16 years (Oct 2009 to Oct 2025)

  return (
    <div className="bg-gradient-to-br from-neutral-light to-white p-8 rounded-2xl shadow-xl border border-gray-200">
      {/* Input Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="space-y-2">
          <Label htmlFor="grossRent" className="text-neutral-dark font-medium text-sm leading-tight">
            {t('depositCalculator.grossRent')}
          </Label>
          <Input 
            id="grossRent"
            type="number" 
            value={grossRent}
            onChange={(e) => setGrossRent(Math.min(50000, Number(e.target.value)))}
            onBlur={(e) => setGrossRent(Math.min(50000, Math.max(1000, Number(e.target.value))))}
            className="bg-white border-gray-300 text-neutral-black focus:border-primary-teal focus:ring-primary-teal"
            placeholder="2000"
            min="1000"
            max="50000"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rentalPeriod" className="text-neutral-dark font-medium text-sm leading-tight">
            {t('depositCalculator.rentalPeriod')}
          </Label>
          <Input 
            id="rentalPeriod"
            type="number" 
            value={rentalPeriod}
            onChange={(e) => setRentalPeriod(Math.min(maxRentalPeriod, Number(e.target.value)))}
            onBlur={(e) => setRentalPeriod(Math.min(maxRentalPeriod, Math.max(1, Number(e.target.value))))}
            className="bg-white border-gray-300 text-neutral-black focus:border-primary-teal focus:ring-primary-teal"
            placeholder="5"
            min="1"
            max={maxRentalPeriod}
            step="0.1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="depositMultiplier" className="text-neutral-dark font-medium text-sm leading-tight">
            {t('depositCalculator.depositMultiplier')}
          </Label>
          <Select value={depositMultiplier.toString()} onValueChange={(value) => setDepositMultiplier(Number(value))}>
            <SelectTrigger className="bg-white border-gray-300 focus:border-primary-teal focus:ring-primary-teal">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1× {t('depositCalculator.monthlyRent')}</SelectItem>
              <SelectItem value="2">2× {t('depositCalculator.monthlyRent')}</SelectItem>
              <SelectItem value="3">3× {t('depositCalculator.monthlyRent')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-neutral-dark font-medium text-sm leading-tight">
            {t('depositCalculator.deposit')}
          </Label>
          <div className="bg-primary-teal/10 border border-primary-teal/30 rounded-md px-3 py-2 text-neutral-black font-medium">
            {formatCurrency(grossRent * depositMultiplier)}
          </div>
        </div>
      </div>

      {/* Bitcoin Warning */}
      {(productA === 'bitcoinDeposit' || productB === 'bitcoinDeposit') && (
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-800">
            <strong>📊 {t('depositCalculator.bitcoinWarning')}</strong>
          </p>
        </div>
      )}

      {/* Product Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="space-y-2">
          <Label className="text-neutral-dark font-medium">{t('depositCalculator.productA')}</Label>
          <Select value={productA} onValueChange={setProductA}>
            <SelectTrigger className="bg-white border-gray-300 focus:border-primary-teal focus:ring-primary-teal text-left">
              <SelectValue className="text-left" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frankencoinDeposit">
                {t(PRODUCTS.frankencoinDeposit.nameKey)}
              </SelectItem>
              <SelectItem value="bitcoinDeposit">
                {t(PRODUCTS.bitcoinDeposit.nameKey)}
              </SelectItem>
              <SelectItem value="bankDeposit">
                {t(PRODUCTS.bankDeposit.nameKey)}
              </SelectItem>
              <SelectItem value="depositInsurance">
                {t(PRODUCTS.depositInsurance.nameKey)}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-neutral-dark font-medium">{t('depositCalculator.productB')}</Label>
          <Select value={productB} onValueChange={setProductB}>
            <SelectTrigger className="bg-white border-gray-300 focus:border-primary-teal focus:ring-primary-teal text-left">
              <SelectValue className="text-left" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frankencoinDeposit">
                {t(PRODUCTS.frankencoinDeposit.nameKey)}
              </SelectItem>
              <SelectItem value="bitcoinDeposit">
                {t(PRODUCTS.bitcoinDeposit.nameKey)}
              </SelectItem>
              <SelectItem value="bankDeposit">
                {t(PRODUCTS.bankDeposit.nameKey)}
              </SelectItem>
              <SelectItem value="depositInsurance">
                {t(PRODUCTS.depositInsurance.nameKey)}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <ProductCard 
          title={t(selectedProductA.nameKey)}
          product={selectedProductA}
          grossRent={grossRent}
          rentalPeriod={rentalPeriod}
          depositMultiplier={depositMultiplier}
          t={t}
        />
        <ProductCard 
          title={t(selectedProductB.nameKey)}
          product={selectedProductB}
          grossRent={grossRent}
          rentalPeriod={rentalPeriod}
          depositMultiplier={depositMultiplier}
          t={t}
        />
      </div>

      {/* Chart Component */}
      <CapitalDevelopmentChart 
        grossRent={grossRent}
        rentalPeriod={rentalPeriod}
        depositMultiplier={depositMultiplier}
        productA={selectedProductA}
        productB={selectedProductB}
        t={t}
      />

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-neutral-light/70 rounded-lg border border-gray-200">
        <p className="text-sm text-neutral-dark">
          {t('depositCalculator.disclaimer')}
        </p>
      </div>
    </div>
  );
}