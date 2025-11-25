'use client';

import { useState } from 'react';
import { useZCHFDepositDetails } from '@/hooks/use-zchf-deposit';
import { useWBTCDepositValue } from '@/hooks/use-wbtc-deposit';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { formatUnits, isAddress } from 'viem';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

export default function ContractQueryPage() {
  const [zchfCollateralAddress, setZchfCollateralAddress] = useState<string>('');
  const [wbtcAmount, setWbtcAmount] = useState<string>('');

  // Query hooks
  const zchfQuery = useZCHFDepositDetails(
    isAddress(zchfCollateralAddress) ? zchfCollateralAddress : undefined
  );
  const wbtcQuery = useWBTCDepositValue(wbtcAmount || undefined);

  const handleZchfAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZchfCollateralAddress(e.target.value);
  };

  const handleWbtcAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWbtcAmount(e.target.value);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-light to-neutral-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-primary font-bold text-black mb-4">
            Contract Query Tools
          </h1>
          <p className="text-lg text-neutral-dark font-secondary">
            Query ZCHF and WBTC manager contracts for deposit values and details
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="zchf" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="zchf" className="text-base">ZCHF Manager</TabsTrigger>
            <TabsTrigger value="wbtc" className="text-base">WBTC Manager</TabsTrigger>
          </TabsList>

          {/* ZCHF Tab */}
          <TabsContent value="zchf">
            <Card className="p-8 border-primary-teal/20 shadow-lg">
              <div className="space-y-6">
                {/* Input Section */}
                <div>
                  <label className="block text-sm font-medium text-black mb-3 font-secondary">
                    Collateral Token Address
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="0x..."
                      value={zchfCollateralAddress}
                      onChange={handleZchfAddressChange}
                      className="flex-1 font-mono text-sm"
                    />
                  </div>
                  <p className="text-xs text-neutral-dark mt-2 font-secondary">
                    Enter the Ethereum address of the collateral token to query deposit details
                  </p>
                </div>

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
                    <div>
                      <p className="font-medium text-red-900 font-secondary">Error</p>
                      <p className="text-sm text-red-800 font-secondary">
                        {zchfQuery.error?.message || 'Failed to fetch deposit details'}
                      </p>
                    </div>
                  </div>
                )}

                {zchfQuery.depositDetails && !zchfQuery.isLoading && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-green-700 font-secondary">Query Successful</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Deposit Amount */}
                      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                        <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2 font-secondary">
                          Deposit Amount
                        </p>
                        <p className="text-2xl font-bold text-blue-900 font-mono">
                          {formatUnits(zchfQuery.depositDetails.depositAmount, 18).slice(0, 12)}
                        </p>
                        <Badge className="mt-2 bg-blue-200 text-blue-900 font-secondary">Tokens</Badge>
                      </Card>

                      {/* Value in CHF */}
                      <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
                        <p className="text-xs font-semibold text-green-900 uppercase tracking-wider mb-2 font-secondary">
                          Value in CHF
                        </p>
                        <p className="text-2xl font-bold text-green-900 font-mono">
                          {formatUnits(zchfQuery.depositDetails.valueInCHF, 18).slice(0, 12)}
                        </p>
                        <Badge className="mt-2 bg-green-200 text-green-900 font-secondary">CHF</Badge>
                      </Card>

                      {/* Interest Rate */}
                      <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
                        <p className="text-xs font-semibold text-purple-900 uppercase tracking-wider mb-2 font-secondary">
                          Interest Rate
                        </p>
                        <p className="text-2xl font-bold text-purple-900 font-mono">
                          {(Number(formatUnits(zchfQuery.depositDetails.interestRate, 18)) * 100).toFixed(2)}%
                        </p>
                        <Badge className="mt-2 bg-purple-200 text-purple-900 font-secondary">Rate</Badge>
                      </Card>
                    </div>

                    {/* Raw Data */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3 font-secondary">
                        Raw Data
                      </p>
                      <div className="space-y-2 font-mono text-xs text-gray-600">
                        <p><span className="font-semibold">depositAmount:</span> {zchfQuery.depositDetails.depositAmount.toString()}</p>
                        <p><span className="font-semibold">valueInCHF:</span> {zchfQuery.depositDetails.valueInCHF.toString()}</p>
                        <p><span className="font-semibold">interestRate:</span> {zchfQuery.depositDetails.interestRate.toString()}</p>
                      </div>
                    </div>
                  </div>
                )}

                {!zchfQuery.isLoading && !zchfQuery.isError && !zchfQuery.depositDetails && zchfCollateralAddress && (
                  <div className="flex items-center justify-center p-8 text-neutral-dark">
                    <span className="font-secondary">Enter a valid Ethereum address to query</span>
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
                <div>
                  <label className="block text-sm font-medium text-black mb-3 font-secondary">
                    WBTC Amount (in BTC)
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="0.5"
                      value={wbtcAmount}
                      onChange={handleWbtcAmountChange}
                      step="0.00000001"
                      min="0"
                      className="flex-1"
                    />
                    <span className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 font-mono font-medium rounded-md">
                      BTC
                    </span>
                  </div>
                  <p className="text-xs text-neutral-dark mt-2 font-secondary">
                    Enter the WBTC amount (max 8 decimal places) to get the equivalent CHF value
                  </p>
                </div>

                {/* Results Section */}
                {wbtcQuery.isLoading && (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="animate-spin w-6 h-6 text-primary-teal mr-3" />
                    <span className="text-neutral-dark font-secondary">Converting WBTC to CHF...</span>
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

                {wbtcQuery.valueInCHF !== undefined && !wbtcQuery.isLoading && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-green-700 font-secondary">Conversion Successful</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* WBTC Amount */}
                      <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200">
                        <p className="text-xs font-semibold text-orange-900 uppercase tracking-wider mb-2 font-secondary">
                          WBTC Amount
                        </p>
                        <p className="text-2xl font-bold text-orange-900 font-mono">
                          {wbtcAmount || '0'}
                        </p>
                        <Badge className="mt-2 bg-orange-200 text-orange-900 font-secondary">BTC</Badge>
                      </Card>

                      {/* Value in CHF */}
                      <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
                        <p className="text-xs font-semibold text-green-900 uppercase tracking-wider mb-2 font-secondary">
                          Value in CHF
                        </p>
                        <p className="text-2xl font-bold text-green-900 font-mono">
                          {formatUnits(wbtcQuery.valueInCHF, 18).slice(0, 12)}
                        </p>
                        <Badge className="mt-2 bg-green-200 text-green-900 font-secondary">CHF</Badge>
                      </Card>
                    </div>

                    {/* Raw Data */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3 font-secondary">
                        Raw Data
                      </p>
                      <div className="space-y-2 font-mono text-xs text-gray-600">
                        <p><span className="font-semibold">wbtcAmount:</span> {wbtcAmount} BTC</p>
                        <p><span className="font-semibold">valueInCHF:</span> {wbtcQuery.valueInCHF.toString()}</p>
                        <p><span className="font-semibold">valueInCHF (formatted):</span> {formatUnits(wbtcQuery.valueInCHF, 18)}</p>
                      </div>
                    </div>
                  </div>
                )}

                {!wbtcQuery.isLoading && !wbtcQuery.isError && !wbtcQuery.valueInCHF && wbtcAmount && (
                  <div className="flex items-center justify-center p-8 text-neutral-dark">
                    <span className="font-secondary">Enter a valid WBTC amount to query</span>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contract Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border-primary-teal/20">
            <h3 className="text-lg font-semibold text-black mb-3 font-primary">ZCHF Manager</h3>
            <div className="space-y-2 text-sm font-secondary text-neutral-dark">
              <p><span className="font-medium text-black">Address:</span></p>
              <code className="block bg-gray-100 p-2 rounded text-xs break-all text-gray-700">
                0x9e0569f5C3B9E8272d7876A30c81900c51D0Bf55
              </code>
              <p className="mt-3"><span className="font-medium text-black">Function:</span> getDepositDetails(address collateral)</p>
              <a 
                href="https://etherscan.io/address/0x9e0569f5c3b9e8272d7876a30c81900c51d0bf55"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-teal hover:text-primary-teal/80 font-medium inline-block mt-3"
              >
                View on Etherscan ↗
              </a>
            </div>
          </Card>

          <Card className="p-6 border-primary-teal/20">
            <h3 className="text-lg font-semibold text-black mb-3 font-primary">WBTC Manager</h3>
            <div className="space-y-2 text-sm font-secondary text-neutral-dark">
              <p><span className="font-medium text-black">Address:</span></p>
              <code className="block bg-gray-100 p-2 rounded text-xs break-all text-gray-700">
                0xdd78844e963c513637BEC8661de05199dE5e9322
              </code>
              <p className="mt-3"><span className="font-medium text-black">Function:</span> depositValue(uint256 wbtcAmount)</p>
              <a 
                href="https://etherscan.io/address/0xdd78844e963c513637BEC8661de05199dE5e9322"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-teal hover:text-primary-teal/80 font-medium inline-block mt-3"
              >
                View on Etherscan ↗
              </a>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
