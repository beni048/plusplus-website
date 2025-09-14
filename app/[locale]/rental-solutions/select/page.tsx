'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { User, Building2 } from 'lucide-react';

export default function RentalSolutionsSelect() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-12 text-center text-4xl font-medium text-black">
            {t('rentalSolutionsSelect.title')}
          </h1>
          
          <div className="text-center mb-12">
            <p className="text-lg leading-relaxed text-neutral-dark">
              {t('rentalSolutionsSelect.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            
            {/* Tenant Option */}
            <Link 
              href={`/${locale}/rental-solutions/tenant`}
              className="group bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-accent-orange"
            >
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-br from-accent-orange to-accent-orange/80 p-6 rounded-full text-white group-hover:scale-105 transition-transform duration-300">
                    <User size={48} />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-black mb-4 group-hover:text-accent-orange transition-colors">
                  {t('rentalSolutionsSelect.tenant.title')}
                </h2>
                <p className="text-lg text-neutral-dark leading-relaxed">
                  {t('rentalSolutionsSelect.tenant.description')}
                </p>
              </div>
            </Link>

            {/* Landlord/Real Estate Owner Option */}
            <Link 
              href={`/${locale}/rental-solutions/landlord`}
              className="group bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-accent-orange"
            >
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-br from-accent-orange to-accent-orange/80 p-6 rounded-full text-white group-hover:scale-105 transition-transform duration-300">
                    <Building2 size={48} />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-black mb-4 group-hover:text-accent-orange transition-colors">
                  {t('rentalSolutionsSelect.landlord.title')}
                </h2>
                <p className="text-lg text-neutral-dark leading-relaxed">
                  {t('rentalSolutionsSelect.landlord.description')}
                </p>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </main>
  );
}
