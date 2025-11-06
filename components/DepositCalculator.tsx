 'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

import {
  getBitcoinPriceForMonth,
  PRODUCTS,
  calculateProduct,
  formatCurrency,
  formatCurrencyWithOverflow,
  formatCurrencyMobileWithOverflow,
  Product
} from '@/lib/deposit-calculator';

// Function to get Bitcoin price for a specific year/month
// bitcoin data and helpers moved to `lib/deposit-calculator`


// Function to calculate Bitcoin return based on historical data with percentage gains
// historical bitcoin calculation moved to lib/deposit-calculator

// Product definitions and calculation helpers are provided by `lib/deposit-calculator`

// Calculation functions
// calculateProduct moved to lib/deposit-calculator and imported above

// formatCurrency and helpers moved to lib/deposit-calculator

interface ProductCardProps {
  title: string;
  provider: string;
  product: Product;
  deposit: number;
  rentalPeriod: number;
  t: (key: string) => string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  title, 
  provider,
  product, 
  deposit, 
  rentalPeriod,
  t 
}) => {
  const calc = calculateProduct(deposit, product, rentalPeriod);

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
              <span className="text-lg font-semibold text-black">{title}</span>
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
  deposit: number;
  rentalPeriod: number;
  productA: Product;
  productB: Product;
  t: (key: string) => string;
}

const CapitalDevelopmentChart: React.FC<CapitalDevelopmentChartProps> = ({ 
  deposit, 
  rentalPeriod,
  productA,
  productB,
  t 
}) => {
  
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

  type TooltipPayloadEntry = { dataKey?: string | number; value?: number | string; color?: string };
  const customTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<TooltipPayloadEntry> | undefined; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-lg">
          <p className="text-neutral-black font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
              {entry.dataKey === 'productA' 
                ? t(productA.nameKey) 
                : t(productB.nameKey)
              }: {formatCurrency(Number(entry.value ?? 0))}
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
  const [rentalPeriod, setRentalPeriod] = useState(5);
  const [deposit, setDeposit] = useState(6000);
  const [productA, setProductA] = useState('kautionskonto');
  const [productB, setProductB] = useState('chfStablecoin');

  const selectedProductA = PRODUCTS[productA as keyof typeof PRODUCTS] as Product;
  const selectedProductB = PRODUCTS[productB as keyof typeof PRODUCTS] as Product;

  const maxRentalPeriod = 16; // Updated to 16 years (Oct 2009 to Oct 2025)

  return (
    <div className="bg-gradient-to-br from-neutral-light to-white p-0 sm:p-8 rounded-none sm:rounded-2xl shadow-xl border-0 sm:border border-gray-200">
      {/* Input Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 bg-white p-4 sm:p-6 rounded-none sm:rounded-xl shadow-sm border-0 sm:border border-gray-100">
        <div className="space-y-2">
          <Label htmlFor="rentalPeriod" className="text-neutral-dark font-medium text-sm leading-tight">
            {t('depositCalculator.rentalPeriod')}
          </Label>
          <Input 
            id="rentalPeriod"
            type="number" 
            value={rentalPeriod === 0 ? '' : rentalPeriod}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '') {
                setRentalPeriod(0);
              } else {
                let num = parseFloat(val);
                if (!isNaN(num)) {
                  // Clamp immediately to prevent excessive renders
                  if (num > maxRentalPeriod) num = maxRentalPeriod;
                  if (num < 1 && num !== 0) num = 1;
                  setRentalPeriod(num);
                }
              }
            }}
            onBlur={(e) => {
              const value = parseFloat(e.target.value);
              if (isNaN(value) || value === 0) {
                setRentalPeriod(1);
              } else if (value < 1) {
                setRentalPeriod(1);
              } else if (value > maxRentalPeriod) {
                setRentalPeriod(maxRentalPeriod);
              }
            }}
            className="bg-white border-gray-300 text-neutral-black focus:border-primary-teal focus:ring-primary-teal"
            placeholder="5"
            min="1"
            max={maxRentalPeriod}
            step="0.1"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="deposit" className="text-neutral-dark font-medium text-sm leading-tight">
            {t('depositCalculator.deposit')} (CHF)
          </Label>
          <Input 
            id="deposit"
            type="number" 
            value={deposit === 0 ? '' : deposit}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '') {
                setDeposit(0);
              } else {
                const num = parseInt(val, 10);
                if (!isNaN(num)) {
                  setDeposit(num);
                }
              }
            }}
            onBlur={(e) => {
              const value = parseInt(e.target.value, 10);
              if (isNaN(value) || value === 0) {
                setDeposit(1000);
              } else if (value < 1000) {
                setDeposit(1000);
              } else if (value > 150000) {
                setDeposit(150000);
              }
            }}
            onInvalid={(e) => {
              e.preventDefault();
              if (deposit > 150000) {
                setDeposit(150000);
              } else if (deposit < 1000) {
                setDeposit(1000);
              }
            }}
            className="bg-white border-gray-300 text-neutral-black focus:border-primary-teal focus:ring-primary-teal"
            placeholder="6000"
            min="1000"
            max="150000"
          />
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

      {/* CHF-Stablecoin Warning */}
      {(productA === 'chfStablecoin' || productB === 'chfStablecoin') && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>📈 {t('depositCalculator.stablecoinWarning')}</strong>
          </p>
        </div>
      )}

      {/* Product Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white p-4 sm:p-6 rounded-none sm:rounded-xl shadow-sm border-0 sm:border border-gray-100">
        <div className="space-y-2">
          <Label className="text-neutral-dark font-medium">{t('depositCalculator.productA')}</Label>
          <Select value={productA} onValueChange={setProductA}>
            <SelectTrigger className="bg-white border-gray-300 focus:border-primary-teal focus:ring-primary-teal text-left">
              <SelectValue className="text-left" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kautionskonto">
                {t('depositCalculator.products.kautionskonto')} - Tradition Bank
              </SelectItem>
              <SelectItem value="chfStablecoin">
                {t('depositCalculator.products.chfStablecoin')} - Plusplus
              </SelectItem>
              <SelectItem value="bitcoinDeposit">
                {t('depositCalculator.products.bitcoinDeposit')} - Plusplus
              </SelectItem>
              <SelectItem value="kautionsversicherung">
                {t('depositCalculator.products.kautionsversicherung')} - Oldcautio
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
              <SelectItem value="kautionskonto">
                {t('depositCalculator.products.kautionskonto')} - Tradition Bank
              </SelectItem>
              <SelectItem value="chfStablecoin">
                {t('depositCalculator.products.chfStablecoin')} - Plusplus
              </SelectItem>
              <SelectItem value="bitcoinDeposit">
                {t('depositCalculator.products.bitcoinDeposit')} - Plusplus
              </SelectItem>
              <SelectItem value="kautionsversicherung">
                {t('depositCalculator.products.kautionsversicherung')} - Oldcautio
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <ProductCard 
          title={t(selectedProductA.nameKey)}
          provider={selectedProductA.id === 'kautionskonto' ? 'Tradition Bank' : selectedProductA.id === 'chfStablecoin' ? 'Plusplus' : selectedProductA.id === 'bitcoinDeposit' ? 'Plusplus' : 'Oldcautio'}
          product={selectedProductA}
          deposit={deposit}
          rentalPeriod={rentalPeriod}
          t={t}
        />
        <ProductCard 
          title={t(selectedProductB.nameKey)}
          provider={selectedProductB.id === 'kautionskonto' ? 'Tradition Bank' : selectedProductB.id === 'chfStablecoin' ? 'Plusplus' : selectedProductB.id === 'bitcoinDeposit' ? 'Plusplus' : 'Oldcautio'}
          product={selectedProductB}
          deposit={deposit}
          rentalPeriod={rentalPeriod}
          t={t}
        />
      </div>

      {/* Chart Component */}
      <CapitalDevelopmentChart 
        deposit={deposit}
        rentalPeriod={rentalPeriod}
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