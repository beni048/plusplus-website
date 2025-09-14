'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Building2, Home } from 'lucide-react';

export default function ProductSelect() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-12 text-center text-4xl font-medium text-black">
            {t('productSelect.title')}
          </h1>
          
          <div className="text-center mb-12">
            <p className="text-lg leading-relaxed text-neutral-dark">
              {t('productSelect.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            
            {/* Rental Solutions Option */}
            <Link 
              href={`/${locale}/rental-solutions/select`}
              className="group bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-accent-orange"
            >
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-br from-accent-orange to-accent-orange/80 p-6 rounded-full text-white group-hover:scale-105 transition-transform duration-300">
                    <Home size={48} />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-black mb-4 group-hover:text-accent-orange transition-colors">
                  {t('productSelect.rentalSolutions.title')}
                </h2>
                <p className="text-lg text-neutral-dark leading-relaxed">
                  {t('productSelect.rentalSolutions.description')}
                </p>
              </div>
            </Link>

            {/* Corporate Treasury Option */}
            <Link 
              href={`/${locale}/corporate-treasury`}
              className="group bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-accent-orange"
            >
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-br from-accent-orange to-accent-orange/80 p-6 rounded-full text-white group-hover:scale-105 transition-transform duration-300">
                    <Building2 size={48} />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-black mb-4 group-hover:text-accent-orange transition-colors">
                  {t('productSelect.corporateTreasury.title')}
                </h2>
                <p className="text-lg text-neutral-dark leading-relaxed">
                  {t('productSelect.corporateTreasury.description')}
                </p>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </main>
  );
}
