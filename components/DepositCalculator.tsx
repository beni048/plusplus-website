'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

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
    rate: 0.63, // 63% average 2020-2025
    rateRange: '~63% p.a.',
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
    for (let year = 0; year <= rentalPeriod; year++) {
      const calcA = calculateProduct(deposit, productA, year);
      const calcB = calculateProduct(deposit, productB, year);
      
      data.push({
        year: year === 0 ? '0' : `${t('depositCalculator.year')} ${year}`,
        productA: productA.type === 'investment' 
          ? deposit + calcA.totalReturn 
          : -calcA.totalCost,
        productB: productB.type === 'investment' 
          ? deposit + calcB.totalReturn 
          : -calcB.totalCost
      });
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

  return (
    <div className="bg-gradient-to-br from-neutral-light to-white p-8 rounded-2xl shadow-xl border border-gray-200">
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-black">{t('depositCalculator.title')}</h2>
        <p className="text-neutral-dark text-lg max-w-2xl mx-auto">{t('depositCalculator.subtitle')}</p>
      </div>
      
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
            onChange={(e) => setRentalPeriod(Math.min(20, Number(e.target.value)))}
            onBlur={(e) => setRentalPeriod(Math.min(20, Math.max(1, Number(e.target.value))))}
            className="bg-white border-gray-300 text-neutral-black focus:border-primary-teal focus:ring-primary-teal"
            placeholder="5"
            min="1"
            max="20"
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