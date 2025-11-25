'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useZCHFDepositDetails } from '@/hooks/use-zchf-deposit';
import { useWBTCDepositValue } from '@/hooks/use-wbtc-deposit';
import { useZCHFDepositDate } from '@/hooks/use-deposit-date';
import { useWBTCDepositDate } from '@/hooks/use-deposit-date';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { convertCustomerNumber, isValidCustomerNumber } from '@/lib/utils/customer-number';
import { getCachedBitcoinPrice, convertSatoshisToCHF, formatBitcoinPrice } from '@/lib/bitcoin-price';

export default function ContractQueryPage() {
  const t = useTranslations();

  const [zchfCustomerNumber, setZchfCustomerNumber] = useState<string>('');
  const [wbtcCustomerNumber, setWbtcCustomerNumber] = useState<string>('');
  const [zchfAddress, setZchfAddress] = useState<string>('');
  const [wbtcQueryAmount, setWbtcQueryAmount] = useState<string>('');
  const [zchfConversionError, setZchfConversionError] = useState<string>('');
  const [wbtcConversionError, setWbtcConversionError] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  const [bitcoinPrice, setBitcoinPrice] = useState<number>(70337); // Default current price in CHF

  // Ensure component is mounted before rendering Web3 content
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Load Bitcoin price asynchronously
  useEffect(() => {
    const loadPrice = async () => {
      const priceData = await getCachedBitcoinPrice();
      setBitcoinPrice(priceData.priceInCHF);
    };
    loadPrice();
  }, []);

  // Query hooks - only execute after mount to avoid hydration issues
  const zchfQuery = useZCHFDepositDetails(
    (mounted && zchfAddress && zchfAddress.startsWith('0x')) ? (zchfAddress as `0x${string}`) : undefined
  );
  const wbtcQuery = useWBTCDepositValue(
    (mounted && wbtcQueryAmount && wbtcQueryAmount.startsWith('0x')) ? (wbtcQueryAmount as `0x${string}`) : undefined
  );

  // Fetch deposit dates
  const zchfDateQuery = useZCHFDepositDate(
    (mounted && zchfAddress && zchfAddress.startsWith('0x')) ? (zchfAddress as `0x${string}`) : undefined
  );
  const wbtcDateQuery = useWBTCDepositDate(
    (mounted && wbtcQueryAmount && wbtcQueryAmount.startsWith('0x')) ? (wbtcQueryAmount as `0x${string}`) : undefined,
    wbtcQuery.valueInSatoshis,
    bitcoinPrice
  );

  // Handle ZCHF form submission
  const handleZchfSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!mounted) {
      setZchfConversionError('Component still initializing, please try again');
      return;
    }

    if (zchfCustomerNumber && isValidCustomerNumber(zchfCustomerNumber)) {
      try {
        const converted = convertCustomerNumber(zchfCustomerNumber, 'stablecoin');
        if (!converted || !converted.startsWith('0x')) {
          setZchfConversionError(t('contractQuery.actions.invalidCustomerNumber'));
          setZchfAddress('');
          return;
        }
         
        setZchfAddress(converted);
        setZchfConversionError('');
      } catch (error) {
        setZchfConversionError(error instanceof Error ? error.message : 'Conversion error');
        setZchfAddress('');
      }
    } else {
      setZchfConversionError(t('contractQuery.actions.invalidCustomerNumber'));
      setZchfAddress('');
    }
  };

  // Handle WBTC form submission
  const handleWbtcSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!mounted) {
      setWbtcConversionError('Component still initializing, please try again');
      return;
    }

    if (wbtcCustomerNumber && isValidCustomerNumber(wbtcCustomerNumber)) {
      try {
        const converted = convertCustomerNumber(wbtcCustomerNumber, 'stablecoin');
        if (!converted || !converted.startsWith('0x')) {
          setWbtcConversionError(t('contractQuery.actions.invalidCustomerNumber'));
          setWbtcQueryAmount('');
          return;
        }
         
        setWbtcQueryAmount(converted);
        setWbtcConversionError('');
      } catch (error) {
        setWbtcConversionError(error instanceof Error ? error.message : 'Conversion error');
        setWbtcQueryAmount('');
      }
    } else {
      setWbtcConversionError(t('contractQuery.actions.invalidCustomerNumber'));
      setWbtcQueryAmount('');
    }
  };

  return (
    <main className="min-h-screen bg-neutral-light pt-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-16">
            <h1 className="mb-4 sm:mb-12 text-center text-3xl sm:text-5xl lg:text-6xl font-medium text-black px-4">
              {t('contractQuery.title')}
            </h1>
            <p className="text-lg sm:text-xl font-secondary text-neutral-dark max-w-3xl mx-auto leading-relaxed px-4">
              {t('contractQuery.description')}
            </p>
          </div>
        </div>
      </div>

      <section className="bg-neutral-light pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            <Tabs defaultValue="zchf" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="zchf" className="text-base">{t('contractQuery.stablecoin.label')}</TabsTrigger>
                <TabsTrigger value="wbtc" className="text-base">{t('contractQuery.bitcoin.label')}</TabsTrigger>
              </TabsList>

              {/* ZCHF Tab */}
              <TabsContent value="zchf">
            <Card className="p-8 border-primary-teal/20 shadow-lg">
              <div className="space-y-6">
                {/* Input Section */}
                <form onSubmit={handleZchfSubmit}>
                  <label className="block text-sm font-medium text-black mb-3 font-secondary">
                    {t('contractQuery.stablecoin.inputLabel')}
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="e.g., xK9mNp2vQr5jLs8T"
                      value={zchfCustomerNumber}
                      onChange={(e) => setZchfCustomerNumber(e.target.value)}
                      className="flex-1 font-mono text-sm focus-visible:ring-neutral-dark/30"
                    />
                    <Button 
                      type="submit"
                      className="bg-black hover:bg-neutral-dark text-white font-secondary"
                    >
                      {t('contractQuery.actions.query')}
                    </Button>
                  </div>
                  <p className="text-xs text-neutral-dark mt-2 font-secondary">
                    {t('contractQuery.stablecoin.inputDescription')}
                  </p>
                  {zchfConversionError && (
                    <div className="text-xs text-red-600 mt-2 font-secondary">
                      {zchfConversionError}
                    </div>
                  )}
                </form>

                {/* Results Section */}
                {zchfQuery.isLoading && (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="animate-spin w-6 h-6 text-primary-teal mr-3" />
                    <span className="text-neutral-dark font-secondary">Loading deposit details...</span>
                  </div>
                )}

                {zchfQuery.isError && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-red-900 font-secondary">Error</p>
                      <p className="text-sm text-red-800 font-secondary mt-1">
                        {zchfQuery.error?.message || 'Failed to fetch deposit details'}
                      </p>
                      {zchfQuery.error && typeof zchfQuery.error === 'object' && 'cause' in zchfQuery.error && (
                        <p className="text-xs text-red-700 font-mono mt-2 break-all">
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          Details: {String((zchfQuery.error as any).cause)}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {zchfQuery.depositDetails && !zchfQuery.isLoading && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-green-700 font-secondary">{t('contractQuery.actions.querySuccessful')}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* 1. Deposit Date */}
                      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                        <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2 font-secondary">
                          {t('contractQuery.fields.depositDate')}
                        </p>
                        {zchfDateQuery.isLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                            <span className="text-sm text-blue-700 font-secondary">Loading...</span>
                          </div>
                        ) : zchfDateQuery.depositStats?.depositDate ? (
                          <p className="text-2xl font-bold text-blue-900 font-mono">
                            {zchfDateQuery.depositStats.depositDate.formattedDate}
                          </p>
                        ) : (
                          <p className="text-sm text-blue-700 font-secondary">Not available</p>
                        )}
                      </Card>

                      {/* 2. Principal (Initial Amount) */}
                      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                        <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2 font-secondary">
                          {t('contractQuery.fields.principal')}
                        </p>
                        {zchfQuery.depositDetails ? (
                          <p className="text-2xl font-bold text-blue-900 font-mono">
                            {(Number(zchfQuery.depositDetails.initialAmount) / 10 ** 18).toLocaleString('de-CH', { maximumFractionDigits: 2 })}
                          </p>
                        ) : (
                          <p className="text-sm text-blue-700 font-secondary">Loading...</p>
                        )}
                        <p className="text-xs text-blue-700 mt-1 font-secondary">CHF</p>
                      </Card>

                      {/* 3. Time Since Deposit */}
                      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                        <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2 font-secondary">
                          {t('contractQuery.fields.timeSinceDeposit')}
                        </p>
                        {zchfDateQuery.isLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                            <span className="text-sm text-blue-700 font-secondary">Loading...</span>
                          </div>
                        ) : zchfDateQuery.depositStats ? (
                          <p className="text-2xl font-bold text-blue-900 font-mono">
                            {zchfDateQuery.depositStats.formattedTimeSinceDeposit}
                          </p>
                        ) : (
                          <p className="text-sm text-blue-700 font-secondary">Not available</p>
                        )}
                      </Card>

                      {/* 4. Current Value */}
                      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                        <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2 font-secondary">
                          {t('contractQuery.fields.currentValue')}
                        </p>
                        {zchfQuery.depositDetails ? (
                          <p className="text-2xl font-bold text-blue-900 font-mono">
                            {((Number(zchfQuery.depositDetails.initialAmount) + Number(zchfQuery.depositDetails.netInterest)) / 10 ** 18).toLocaleString('de-CH', { maximumFractionDigits: 2 })}
                          </p>
                        ) : (
                          <p className="text-sm text-blue-700 font-secondary">Loading...</p>
                        )}
                        <p className="text-xs text-blue-700 mt-1 font-secondary">CHF</p>
                      </Card>

                      {/* 5. Gain Since Deposit */}
                      <Card className={`p-4 bg-gradient-to-br border-2 ${
                        zchfQuery.depositDetails && Number(zchfQuery.depositDetails.netInterest) / 10 ** 18 >= 0
                          ? 'from-emerald-50 to-emerald-100/50 border-emerald-300'
                          : 'from-red-50 to-red-100/50 border-red-300'
                      }`}>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-2 font-secondary" style={{
                          color: zchfQuery.depositDetails && Number(zchfQuery.depositDetails.netInterest) / 10 ** 18 >= 0 ? '#065f46' : '#7f1d1d'
                        }}>
                          {t('contractQuery.fields.gainSinceDeposit')}
                        </p>
                        {zchfQuery.depositDetails ? (
                          <>
                            <p className="text-2xl font-bold font-mono" style={{
                              color: Number(zchfQuery.depositDetails.netInterest) / 10 ** 18 >= 0 ? '#065f46' : '#7f1d1d'
                            }}>
                              {Number(zchfQuery.depositDetails.netInterest) / 10 ** 18 >= 0 ? '+' : ''}{((Number(zchfQuery.depositDetails.netInterest)) / 10 ** 18).toLocaleString('de-CH', { maximumFractionDigits: 2 })}
                            </p>
                            <p className="text-xs mt-1 font-secondary" style={{
                              color: Number(zchfQuery.depositDetails.netInterest) / 10 ** 18 >= 0 ? '#065f46' : '#7f1d1d'
                            }}>
                              CHF ({zchfQuery.depositDetails.initialAmount && Number(zchfQuery.depositDetails.initialAmount) > 0 ? (Number(zchfQuery.depositDetails.netInterest) / 10 ** 18 >= 0 ? '+' : '') + ((Number(zchfQuery.depositDetails.netInterest) / 10 ** 18) / (Number(zchfQuery.depositDetails.initialAmount) / 10 ** 18) * 100).toFixed(2) : '0.00'}%)
                            </p>
                          </>
                        ) : (
                          <p className="text-sm text-red-700 font-secondary">Loading...</p>
                        )}
                      </Card>
                    </div>
                  </div>
                )}

                {!zchfQuery.isLoading && !zchfQuery.isError && !zchfQuery.depositDetails && zchfAddress && (
                  <div className="flex items-center justify-center p-8 text-neutral-dark">
                    <span className="font-secondary">No deposit details found for this address</span>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* WBTC Tab */}
          <TabsContent value="wbtc">
            <Card className="p-8 border-primary-teal/20 shadow-lg">
              <div className="space-y-6">
                {/* Input Section */}
                <form onSubmit={handleWbtcSubmit}>
                  <label className="block text-sm font-medium text-black mb-3 font-secondary">
                    {t('contractQuery.bitcoin.inputLabel')}
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="e.g., aB7dGh3kMq1Uw9Fy"
                      value={wbtcCustomerNumber}
                      onChange={(e) => setWbtcCustomerNumber(e.target.value)}
                      className="flex-1 font-mono text-sm focus-visible:ring-neutral-dark/30"
                    />
                    <Button 
                      type="submit"
                      className="bg-black hover:bg-neutral-dark text-white font-secondary"
                    >
                      {t('contractQuery.actions.query')}
                    </Button>
                  </div>
                  <p className="text-xs text-neutral-dark mt-2 font-secondary">
                    {t('contractQuery.bitcoin.inputDescription')}
                  </p>
                  {wbtcConversionError && (
                    <div className="text-xs text-red-600 mt-2 font-secondary">
                      {wbtcConversionError}
                    </div>
                  )}
                </form>

                {/* Results Section */}
                {wbtcQuery.isLoading && (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="animate-spin w-6 h-6 text-primary-teal mr-3" />
                    <span className="text-neutral-dark font-secondary">Loading deposit details...</span>
                  </div>
                )}

                {wbtcQuery.isError && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-red-900 font-secondary">Error</p>
                      <p className="text-sm text-red-800 font-secondary">
                        {wbtcQuery.error?.message || 'Failed to convert WBTC to CHF'}
                      </p>
                    </div>
                  </div>
                )}

                {wbtcQuery.valueInSatoshis !== undefined && !wbtcQuery.isLoading && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-green-700 font-secondary">{t('contractQuery.actions.querySuccessful')}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* 1. Deposit Date */}
                      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                        <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2 font-secondary">
                          {t('contractQuery.fields.depositDate')}
                        </p>
                        {wbtcDateQuery.isLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                            <span className="text-sm text-blue-700 font-secondary">Loading...</span>
                          </div>
                        ) : wbtcDateQuery.depositStats?.depositDate ? (
                          <p className="text-2xl font-bold text-blue-900 font-mono">
                            {wbtcDateQuery.depositStats.depositDate.formattedDate}
                          </p>
                        ) : (
                          <p className="text-sm text-blue-700 font-secondary">Not available</p>
                        )}
                      </Card>

                      {/* 2. Principal (Value at Deposit in CHF) */}
                      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                        <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2 font-secondary">
                          {t('contractQuery.fields.principal')}
                        </p>
                        {wbtcDateQuery.depositStats ? (
                          <>
                            <p className="text-2xl font-bold text-blue-900 font-mono">
                              {Math.round(wbtcDateQuery.depositStats.valueAtCreation).toLocaleString('de-CH')}
                            </p>
                            <p className="text-xs text-blue-700 mt-1 font-secondary">CHF</p>
                          </>
                        ) : (
                          <p className="text-sm text-blue-700 font-secondary">Loading...</p>
                        )}
                      </Card>

                      {/* 3. Time Since Deposit */}
                      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                        <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2 font-secondary">
                          {t('contractQuery.fields.timeSinceDeposit')}
                        </p>
                        {wbtcDateQuery.isLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                            <span className="text-sm text-blue-700 font-secondary">Loading...</span>
                          </div>
                        ) : wbtcDateQuery.depositStats ? (
                          <p className="text-2xl font-bold text-blue-900 font-mono">
                            {wbtcDateQuery.depositStats.formattedTimeSinceDeposit}
                          </p>
                        ) : (
                          <p className="text-sm text-blue-700 font-secondary">Not available</p>
                        )}
                      </Card>

                      {/* 4. Current Value */}
                      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                        <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2 font-secondary">
                          {t('contractQuery.fields.currentValue')}
                        </p>
                        {wbtcQuery.valueInSatoshis !== undefined ? (
                          <p className="text-2xl font-bold text-blue-900 font-mono">
                            {Math.round(convertSatoshisToCHF(wbtcQuery.valueInSatoshis, bitcoinPrice)).toLocaleString('de-CH')}
                          </p>
                        ) : (
                          <p className="text-sm text-blue-700 font-secondary">Loading...</p>
                        )}
                        <p className="text-xs text-blue-700 mt-1 font-secondary">CHF</p>
                      </Card>

                      {/* 5. Bitcoin Amount */}
                      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                        <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2 font-secondary">
                          {t('contractQuery.fields.bitcoinAmount')}
                        </p>
                        {wbtcQuery.valueInSatoshis !== undefined ? (
                          <p className="text-2xl font-bold text-blue-900 font-mono">
                            {(Number(wbtcQuery.valueInSatoshis) / 10 ** 8).toLocaleString('de-CH', { maximumFractionDigits: 8 })} BTC
                          </p>
                        ) : (
                          <p className="text-sm text-blue-700 font-secondary">Loading...</p>
                        )}
                        <p className="text-xs text-blue-700 mt-1 font-secondary">
                          @ {formatBitcoinPrice(bitcoinPrice)} CHF
                        </p>
                      </Card>

                      {/* 6. Gain Since Deposit */}
                      <Card className={`p-4 bg-gradient-to-br border-2 ${
                        wbtcDateQuery.depositStats && wbtcDateQuery.depositStats.valueGain >= 0
                          ? 'from-emerald-50 to-emerald-100/50 border-emerald-300'
                          : 'from-red-50 to-red-100/50 border-red-300'
                      }`}>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-2 font-secondary" style={{
                          color: wbtcDateQuery.depositStats && wbtcDateQuery.depositStats.valueGain >= 0 ? '#065f46' : '#7f1d1d'
                        }}>
                          {t('contractQuery.fields.gainSinceDeposit')}
                        </p>
                        {wbtcDateQuery.depositStats ? (
                          <>
                            <p className="text-2xl font-bold font-mono" style={{
                              color: wbtcDateQuery.depositStats.valueGain >= 0 ? '#065f46' : '#7f1d1d'
                            }}>
                              {wbtcDateQuery.depositStats.valueGain >= 0 ? '+' : ''}{Math.round(wbtcDateQuery.depositStats.valueGain).toLocaleString('de-CH')}
                            </p>
                            <p className="text-xs mt-1 font-secondary" style={{
                              color: wbtcDateQuery.depositStats.valueGain >= 0 ? '#065f46' : '#7f1d1d'
                            }}>
                              CHF ({wbtcDateQuery.depositStats.percentageGain >= 0 ? '+' : ''}{wbtcDateQuery.depositStats.percentageGain.toFixed(2)}%)
                            </p>
                          </>
                        ) : (
                          <p className="text-sm text-red-700 font-secondary">Loading...</p>
                        )}
                      </Card>
                    </div>

                    {/* CoinGecko Attribution */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg">
                      <p className="text-xs text-amber-900 font-secondary">
                        <span className="font-semibold">{t('contractQuery.dataSources')}</span>
                      </p>
                    </div>
                  </div>
                )}

                {!wbtcQuery.isLoading && !wbtcQuery.isError && wbtcQuery.valueInSatoshis === undefined && wbtcQueryAmount && (
                  <div className="flex items-center justify-center p-8 text-neutral-dark">
                    <span className="font-secondary">No deposit value found for this address</span>
                  </div>
                )}
              </div>
            </Card>
            </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <section className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          {/* Contract Info */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border-primary-teal/20">
            <h3 className="text-lg font-semibold text-black mb-3 font-primary">ZCHF Manager</h3>
            <div className="space-y-2 text-sm font-secondary text-neutral-dark">
              <p><span className="font-medium text-black">{t('contractQuery.contractInfo.address')}:</span></p>
              <code className="block bg-gray-100 p-2 rounded text-xs break-all text-gray-700">
                0x9e0569f5C3B9E8272d7876A30c81900c51D0Bf55
              </code>
              <a 
                href="https://etherscan.io/address/0x9e0569f5c3b9e8272d7876a30c81900c51d0bf55"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-neutral-dark font-medium inline-block mt-3"
              >
                {t('contractQuery.contractInfo.viewOnEtherscan')} ↗
              </a>
            </div>
          </Card>

          <Card className="p-6 border-primary-teal/20">
            <h3 className="text-lg font-semibold text-black mb-3 font-primary">WBTC Manager</h3>
            <div className="space-y-2 text-sm font-secondary text-neutral-dark">
              <p><span className="font-medium text-black">{t('contractQuery.contractInfo.address')}:</span></p>
              <code className="block bg-gray-100 p-2 rounded text-xs break-all text-gray-700">
                0xdd78844e963c513637BEC8661de05199dE5e9322
              </code>
              <a 
                href="https://etherscan.io/address/0xdd78844e963c513637BEC8661de05199dE5e9322"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-neutral-dark font-medium inline-block mt-3"
              >
                {t('contractQuery.contractInfo.viewOnEtherscan')} ↗
              </a>
            </div>
          </Card>
        </div>
        </div>
      </section>
    </main>
  );
}
