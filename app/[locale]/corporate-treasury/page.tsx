'use client';

import { useTranslations } from 'next-intl';

export default function CorporateTreasury() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-12 text-center text-4xl font-medium text-black">
            {t('corporateTreasury.hero.title')}
          </h1>
          
          {/* Development Notice */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8 rounded-r-lg">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-amber-700">
                  <strong>Note:</strong> This page is currently in development. All content shown is placeholder text and subject to change.
                </p>
              </div>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none text-neutral-dark">
            <p className="text-lg leading-relaxed mb-8">
              {t('corporateTreasury.hero.subtitle')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">
              {t('corporateTreasury.overview.title')}
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              {t('corporateTreasury.overview.description')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">
              {t('corporateTreasury.services.title')}
            </h2>
            
            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('corporateTreasury.services.liquidity.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-4">
              {t('corporateTreasury.services.liquidity.description')}
            </p>
            <ul className="text-lg leading-relaxed mb-6 ml-6 list-disc">
              <li>{t('corporateTreasury.services.liquidity.feature1')}</li>
              <li>{t('corporateTreasury.services.liquidity.feature2')}</li>
            </ul>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('corporateTreasury.services.yield.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-4">
              {t('corporateTreasury.services.yield.description')}
            </p>
            <ul className="text-lg leading-relaxed mb-6 ml-6 list-disc">
              <li>{t('corporateTreasury.services.yield.feature1')}</li>
              <li>{t('corporateTreasury.services.yield.feature2')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">
              {t('corporateTreasury.benefits.title')}
            </h2>
            
            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('corporateTreasury.benefits.efficiency.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('corporateTreasury.benefits.efficiency.description')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('corporateTreasury.benefits.security.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('corporateTreasury.benefits.security.description')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('corporateTreasury.benefits.transparency.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('corporateTreasury.benefits.transparency.description')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">
              {t('corporateTreasury.clients.title')}
            </h2>
            
            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('corporateTreasury.clients.sme.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('corporateTreasury.clients.sme.description')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('corporateTreasury.clients.institutions.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('corporateTreasury.clients.institutions.description')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('corporateTreasury.clients.startups.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('corporateTreasury.clients.startups.description')}
            </p>

            <div className="text-center mt-12 mb-8">
              <a
                href="mailto:hello@plusplus.swiss"
                className="bg-accent-orange text-white px-8 py-4 text-lg shadow-lg hover:bg-accent-orange/90 transition-all duration-300 rounded-lg inline-block font-medium"
              >
                {t('corporateTreasury.cta.button')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}