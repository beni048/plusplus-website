'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import DepositCalculator from '../../../../../components/DepositCalculator';

export default function DepositCalculatorPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-neutral-light pt-32">
      <div className="container mx-auto px-0 sm:px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-8 px-4 sm:px-0">
            <Link 
              href="/rental-solutions/tenant"
              className="inline-flex items-center text-neutral-dark hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('depositCalculator.backToTenant')}
            </Link>
          </div>
          
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-16">
            <h1 className="mb-4 sm:mb-6 text-center text-3xl sm:text-5xl lg:text-6xl font-medium text-black px-4">
              {t('depositCalculator.title')}
            </h1>
            <p className="text-lg sm:text-xl font-secondary text-neutral-dark max-w-3xl mx-auto leading-relaxed px-4 block sm:hidden">
              {t('depositCalculator.subtitle')}
            </p>
            <p className="text-lg sm:text-xl font-secondary text-neutral-dark max-w-3xl mx-auto leading-relaxed px-4 hidden sm:block">
              {t('depositCalculator.subtitleFull')}
            </p>
          </div>
          
          {/* Deposit Calculator Section */}
          <div className="mb-16 px-0 sm:px-0">
            <DepositCalculator />
          </div>
        </div>
      </div>

      {/* Final Call to Action Section */}
      <section className="bg-neutral-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-primary font-medium text-black mb-6">
              {t('rentalSolutionsTenant.finalCta.title')}
            </h2>
            <p className="text-lg leading-relaxed text-neutral-dark mb-8 font-secondary">
              {t('rentalSolutionsTenant.finalCta.description')}
            </p>
            <Link
              href="/rental-solutions/tenant#email-template"
              className="bg-accent-orange text-white px-8 py-4 text-lg shadow-lg hover:bg-accent-orange/90 transition-all duration-300 rounded-lg inline-block font-medium"
            >
              {t('rentalSolutionsTenant.finalCta.button')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}