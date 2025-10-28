import { describe, it, expect, vi } from 'vitest'

// Vitest doesn't know the project's '@' path alias by default. Mock the JSON
// import used by the lib so tests can run without resolver config.
vi.mock('@/data/bitcoin-historical.json', () => ({ default: require('../data/bitcoin-historical.json') }))

import {
  getBitcoinPriceForMonth,
  calculateBitcoinHistorical,
  PRODUCTS,
  calculateProduct
} from '../lib/deposit-calculator'

describe('deposit-calculator helpers', () => {
  it('returns known bitcoin monthly price for Oct 2025', () => {
    const p = getBitcoinPriceForMonth(2025, 10)
    expect(p).toBeCloseTo(114067.71, 2)
  })

  it('returns known bitcoin monthly price for Oct 2009', () => {
    const p = getBitcoinPriceForMonth(2009, 10)
    expect(p).toBeCloseTo(0.00076392, 8)
  })

  it('calculates historical bitcoin returns for 1 year', () => {
    const res = calculateBitcoinHistorical(1000, 1)
    // start: 2024-10 = 63305.52, end: 2025-10 = 114067.71
    // percentage gain ~ (114067.71-63305.52)/63305.52 ~ 0.802
    expect(res.isHistorical).toBe(true)
    expect(res.percentageGain).toBeGreaterThan(70)
    expect(res.finalAmount).toBeGreaterThan(1600)
  })

  it('calculates frankencoin product correctly', () => {
    const product = PRODUCTS.frankencoinDeposit
    const res = calculateProduct(1000, product, 2)
    expect(res.totalReturn).toBeCloseTo(1000 * product.rate * 2)
    expect(res.finalAmount).toBeCloseTo(1000 + 1000 * product.rate * 2)
    expect(res.annualReturn).toBeCloseTo(1000 * product.rate)
  })

  it('calculates bank deposit compound interest correctly', () => {
    const product = PRODUCTS.bankDeposit
    const res = calculateProduct(1000, product, 3)
    const expectedFinal = 1000 * Math.pow(1 + product.rate, 3)
    expect(res.finalAmount).toBeCloseTo(expectedFinal)
  })
})
