'use client';

import { useTranslations } from 'next-intl';

export default function ImpressumPage() {
  const t = useTranslations('impressum');

  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-12 text-center text-3xl sm:text-4xl lg:text-5xl font-primary font-medium text-black px-4">
            {t('title')}
          </h1>
          
          <div className="space-y-8 text-neutral-dark leading-relaxed px-4">
            <section>
              <h2 className="text-2xl font-primary font-medium text-black mb-4">{t('company.title')}</h2>
              <div className="space-y-2">
                <p className="font-secondary"><strong className="font-primary">{t('company.name')}:</strong> {t('company.companyName')}</p>
                <p className="font-secondary"><strong className="font-primary">{t('company.address')}:</strong></p>
                <p className="font-secondary">{t('company.street')}</p>
                <p className="font-secondary">{t('company.city')}</p>
                <p className="font-secondary">{t('company.country')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-primary font-medium text-black mb-4">{t('contact.title')}</h2>
              <div className="space-y-2">
                <p className="font-secondary"><strong className="font-primary">{t('contact.email')}:</strong> {t('contact.emailAddress')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-primary font-medium text-black mb-4">{t('legal.title')}</h2>
              <div className="space-y-2">
                <p className="font-secondary"><strong className="font-primary">{t('legal.registry')}:</strong> {t('legal.registryValue')}</p>
                <p className="font-secondary"><strong className="font-primary">{t('legal.uid')}:</strong> {t('legal.uidValue')}</p>
                <p className="font-secondary"><strong className="font-primary">{t('legal.vatNumber')}:</strong> {t('legal.vatValue')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-primary font-medium text-black mb-4">{t('disclaimer.title')}</h2>
              <div className="space-y-4">
                <p className="font-secondary text-justify">{t('disclaimer.content')}</p>
                <p className="font-secondary text-justify">{t('disclaimer.liability')}</p>
                <p className="font-secondary text-justify">{t('disclaimer.links')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-primary font-medium text-black mb-4">{t('copyright.title')}</h2>
              <p className="font-secondary text-justify">{t('copyright.text')}</p>
            </section>

            {/* Effective Date */}
            <div className="text-right mt-8">
              <p className="text-sm text-gray-600 font-secondary italic">
                {t('effective.title')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}