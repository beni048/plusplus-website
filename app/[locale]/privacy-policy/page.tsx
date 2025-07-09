"use client";

import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
  const t = useTranslations('privacy');

  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-12 text-center text-4xl font-medium text-black">{t('title')}</h1>
          
          <div className="prose prose-lg max-w-none text-neutral-dark">
            <p className="text-lg leading-relaxed mb-8">
              {t('intro')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">{t('section1.title')}</h2>
            <p className="text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t('section1.content') }} />

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">{t('section2.title')}</h2>
            
            <h3 className="text-xl font-medium text-black mb-3 mt-6">{t('section2.subsection1.title')}</h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('section2.subsection1.content')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">{t('section2.subsection2.title')}</h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('section2.subsection2.content')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">{t('section2.subsection3.title')}</h3>
            <p className="text-lg leading-relaxed mb-4">
              {t('section2.subsection3.content1')}
            </p>
            <ul className="text-lg leading-relaxed mb-6 ml-6 list-disc">
              <li>{t('section2.subsection3.list.item1')}</li>
              <li>{t('section2.subsection3.list.item2')}</li>
            </ul>
            <p className="text-lg leading-relaxed mb-6">
              {t('section2.subsection3.content2')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">{t('section2.subsection4.title')}</h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('section2.subsection4.content')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">{t('section2.subsection5.title')}</h3>
            <p className="text-lg leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: t('section2.subsection5.content1') }} />
            <p className="text-lg leading-relaxed mb-6">
              {t('section2.subsection5.content2')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">{t('section3.title')}</h2>
            <ul className="text-lg leading-relaxed mb-6 ml-6 list-disc">
              <li>{t('section3.list.item1')}</li>
              <li>{t('section3.list.item2')}</li>
              <li>{t('section3.list.item3')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">{t('section4.title')}</h2>
            <p className="text-lg leading-relaxed mb-6">
              {t('section4.content')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">{t('section5.title')}</h2>
            <p className="text-lg leading-relaxed mb-6">
              {t('section5.content')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">{t('section6.title')}</h2>
            <p className="text-lg leading-relaxed mb-6">
              {t('section6.content')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">{t('section7.title')}</h2>
            <p className="text-lg leading-relaxed mb-6">
              {t('section7.content')}
            </p>

            <p className="text-lg leading-relaxed font-medium text-black mt-8">
              {t('lastUpdated')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
