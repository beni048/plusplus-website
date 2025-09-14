'use client';

import { useTranslations } from 'next-intl';

export default function Downloads() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-12 text-center text-4xl font-medium text-black">
            {t('downloads.hero.title')}
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
              {t('downloads.hero.subtitle')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">
              {t('downloads.documentation.title')}
            </h2>
            
            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('downloads.documentation.whitepaper.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('downloads.documentation.whitepaper.description')}
            </p>
            <div className="mb-6">
              <a
                href="/downloads/plusplus-whitepaper.pdf"
                download
                className="bg-accent-orange text-white px-6 py-3 rounded-lg hover:bg-accent-orange/90 transition-all duration-300 inline-block font-medium"
              >
                {t('downloads.documentation.whitepaper.button')}
              </a>
            </div>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('downloads.documentation.factsheet.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('downloads.documentation.factsheet.description')}
            </p>
            <div className="mb-6">
              <a
                href="/downloads/plusplus-factsheet.pdf"
                download
                className="bg-accent-orange text-white px-6 py-3 rounded-lg hover:bg-accent-orange/90 transition-all duration-300 inline-block font-medium"
              >
                {t('downloads.documentation.factsheet.button')}
              </a>
            </div>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">
              {t('downloads.legal.title')}
            </h2>
            
            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('downloads.legal.terms.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('downloads.legal.terms.description')}
            </p>
            <div className="mb-6">
              <a
                href="/downloads/plusplus-terms-conditions.pdf"
                download
                className="bg-accent-orange text-white px-6 py-3 rounded-lg hover:bg-accent-orange/90 transition-all duration-300 inline-block font-medium"
              >
                {t('downloads.legal.terms.button')}
              </a>
            </div>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('downloads.legal.disclosure.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('downloads.legal.disclosure.description')}
            </p>
            <div className="mb-6">
              <a
                href="https://docs.google.com/document/d/19THRKeVhBZmGYFmygifl2NBwW5SX8L8Th2ZbOC3_K5o/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent-orange text-white px-6 py-3 rounded-lg hover:bg-accent-orange/90 transition-all duration-300 inline-block font-medium"
              >
                {t('downloads.legal.disclosure.button')}
              </a>
            </div>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">
              {t('downloads.pressKit.title')}
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              {t('downloads.pressKit.description')}
            </p>
            <div className="mb-6 space-x-4">
              <a
                href="/downloads/plusplus-logo-package.zip"
                download
                className="bg-accent-orange text-white px-6 py-3 rounded-lg hover:bg-accent-orange/90 transition-all duration-300 inline-block font-medium"
              >
                {t('downloads.pressKit.logos')}
              </a>
              <a
                href="/downloads/plusplus-brand-guidelines.pdf"
                download
                className="bg-accent-orange text-white px-6 py-3 rounded-lg hover:bg-accent-orange/90 transition-all duration-300 inline-block font-medium"
              >
                {t('downloads.pressKit.guidelines')}
              </a>
            </div>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">
              {t('downloads.contact.title')}
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              {t('downloads.contact.description')}
            </p>
            
            <div className="text-center mt-12 mb-8">
              <a
                href="mailto:hello@plusplus.swiss"
                className="bg-accent-orange text-white px-8 py-4 text-lg shadow-lg hover:bg-accent-orange/90 transition-all duration-300 rounded-lg inline-block font-medium"
              >
                {t('downloads.contact.button')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
