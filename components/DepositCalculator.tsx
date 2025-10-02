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
    color: '#76DBD3', // primary-teal
    hasDeposit: true
  },
  depositInsurance: {
    id: 'depositInsurance',
    nameKey: 'depositCalculator.products.depositInsurance',
    rate: 0.045, // 4.5% average
    rateRange: '4-5%',
    type: 'cost',
    color: '#5069E2', // primary-blue
    hasDeposit: false
  },
  bitcoinDeposit: {
    id: 'bitcoinDeposit',
    nameKey: 'depositCalculator.products.bitcoinDeposit',
    rate: 0.63, // 63% average 2020-2025
    rateRange: '~63% p.a.',
    type: 'investment',
    color: '#F97316', // orange-500
    hasDeposit: true
  },
  frankencoinDeposit: {
    id: 'frankencoinDeposit',
    nameKey: 'depositCalculator.products.frankencoinDeposit',
    rate: 0.03, // 3% current
    rateRange: '3% (historically 3-5%)',
    type: 'investment',
    color: '#10B981', // emerald-500
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
  return `${Math.round(amount).toLocaleString()} ${currency}`;
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

  return (
    <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-neutral-black">
          <div 
            className="w-3 h-3 rounded-full mr-3" 
            style={{ backgroundColor: product.color }}
          ></div>
          <span className="text-lg font-semibold">{title}</span>
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
          <span 
            className="font-bold text-lg"
            style={{ color: product.type === 'investment' ? product.color : '#EF4444' }}
          >
            {product.type === 'investment' ? '+' : '-'} 
            {formatCurrency(product.type === 'investment' ? calc.totalReturn : calc.totalCost)}
          </span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-neutral-dark font-medium">{t('depositCalculator.perYear')}</span>
          <span 
            className="font-bold"
            style={{ color: product.type === 'investment' ? product.color : '#EF4444' }}
          >
            {product.type === 'investment' ? '+' : '-'} 
            {formatCurrency(product.type === 'investment' ? calc.annualReturn : calc.annualCost)}/Jahr
          </span>
        </div>

        <div className="pt-4 bg-neutral-light/50 -mx-6 -mb-6 px-6 pb-6 rounded-b-lg">
          <div className="flex justify-between items-center">
            <span className="text-neutral-dark font-medium">{t('depositCalculator.capitalAtEnd')}</span>
            <span className="text-neutral-black font-semibold">
              {product.hasDeposit 
                ? (product.type === 'investment' 
                    ? formatCurrency(calc.finalAmount)
                    : t('depositCalculator.fullyAvailable')
                  )
                : t('depositCalculator.noDepositBound')
              }
            </span>
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
        year: year === 0 ? '0' : `Jahr ${year}`,
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
        <CardTitle className="flex justify-between items-center text-neutral-black">
          <span className="text-xl font-semibold">{t('depositCalculator.capitalDevelopment')}</span>
          <div className="flex space-x-6">
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
              tickFormatter={(value) => `${Math.round(value / 1000)}k CHF`}
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
  const [productA, setProductA] = useState('depositInsurance');
  const [productB, setProductB] = useState('bitcoinDeposit');

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
            onChange={(e) => setGrossRent(Number(e.target.value))}
            className="bg-white border-gray-300 text-neutral-black focus:border-primary-teal focus:ring-primary-teal"
            placeholder="2000"
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
            onChange={(e) => setRentalPeriod(Number(e.target.value))}
            className="bg-white border-gray-300 text-neutral-black focus:border-primary-teal focus:ring-primary-teal"
            placeholder="5"
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
          <p className="text-xs text-neutral-dark">
            {depositMultiplier}× {t('depositCalculator.monthlyRent')}
          </p>
        </div>
      </div>

      {/* Product Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="space-y-2">
          <Label className="text-neutral-dark font-medium">{t('depositCalculator.productA')}</Label>
          <Select value={productA} onValueChange={setProductA}>
            <SelectTrigger className="bg-white border-gray-300 focus:border-primary-teal focus:ring-primary-teal">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(PRODUCTS).map(([key, product]) => (
                <SelectItem key={key} value={key}>
                  {t(product.nameKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-neutral-dark font-medium">{t('depositCalculator.productB')}</Label>
          <Select value={productB} onValueChange={setProductB}>
            <SelectTrigger className="bg-white border-gray-300 focus:border-primary-teal focus:ring-primary-teal">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(PRODUCTS).map(([key, product]) => (
                <SelectItem key={key} value={key}>
                  {t(product.nameKey)}
                </SelectItem>
              ))}
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